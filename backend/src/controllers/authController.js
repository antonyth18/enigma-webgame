const prisma = require('../config/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateTeamCode } = require('../utils/generateCode');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

exports.signup = async (req, res) => {
    try {
        let { email, password, teamName, teamCode, portal } = req.body;
        email = email.trim().toLowerCase();

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

        // Create Team (Use provided code or generate new one)
        let finalCode = teamCode;

        if (!finalCode) {
            // Generate unique code with retries
            let retries = 5;
            while (retries > 0) {
                finalCode = generateTeamCode();
                const existing = await prisma.team.findUnique({ where: { code: finalCode } });
                if (!existing) break;
                retries--;
            }
            if (retries === 0) throw new Error('Failed to generate unique team code');
        } else {
            // Validation for provided custom code
            const existingTeam = await prisma.team.findUnique({ where: { code: finalCode } });
            if (existingTeam) {
                return res.status(400).json({ error: 'Team code already taken' });
            }
        }

        const team = await prisma.team.create({
            data: {
                name: teamName || `Team-${finalCode}`,
                code: finalCode,
                score: 0,
            }
        });

        // Create User
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                teamId: team.id,
            }
        });

        const token = jwt.sign(
            { userId: user.id, teamId: team.id, portal },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: { id: user.id, username: user.username, email: user.email },
            team: { id: team.id, name: team.name, code: team.code }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Signup failed', details: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        let { email, password, teamCode, portal } = req.body;
        email = email.trim().toLowerCase();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.log(`Login failed: User not found for email ${email}`);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Login failed: Password mismatch for email ${email}`);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        let teamId = user.teamId;
        const normalizedTeamCode = teamCode ? teamCode.trim().toUpperCase() : null;

        if (normalizedTeamCode) {
            console.log(`[DEBUGLOG] Attempting team lookup with: ${normalizedTeamCode}`);
            // Flexible lookup: try to find the team using either prefix if it's an ENIG- code
            let team = await prisma.team.findUnique({ where: { code: normalizedTeamCode } });

            if (!team && normalizedTeamCode.startsWith('ENIG-')) {
                const parts = normalizedTeamCode.split('-');
                console.log(`[DEBUGLOG] Team not found by direct match. Parts: ${JSON.stringify(parts)}`);
                if (parts.length === 4) { // ENIG, A/B, PART1, PART2
                    const prefix = parts[0]; // ENIG
                    const subteam = parts[1]; // A or B
                    const randomPart = `${parts[2]}-${parts[3]}`;

                    const otherSubteam = subteam === 'A' ? 'B' : 'A';
                    const alternateCode = `${prefix}-${otherSubteam}-${randomPart}`;
                    console.log(`[DEBUGLOG] Trying alternate code: ${alternateCode}`);

                    team = await prisma.team.findUnique({ where: { code: alternateCode } });
                    if (team) {
                        console.log(`[DEBUGLOG] Team found with alternate code! Original ID: ${team.id}`);
                    }
                }
            }

            if (!team) {
                console.log(`[DEBUGLOG] Team NOT found after all attempts for: ${normalizedTeamCode}`);
                return res.status(400).json({ error: 'Team not found. Please check your team code.' });
            }

            if (user.teamId !== team.id) {
                console.log(`[DEBUGLOG] Updating user's teamId from ${user.teamId} to ${team.id}`);
                await prisma.user.update({
                    where: { id: user.id },
                    data: { teamId: team.id }
                });
                teamId = team.id;
            }
        }

        // Determine portal: Code Prefix > Request > Database > undefined
        const worldMap = { 'hawkins_lab': 'HAWKINS', 'upside_down': 'UPSIDE_DOWN' };
        const revWorldMap = { 'HAWKINS': 'hawkins_lab', 'UPSIDE_DOWN': 'upside_down' };

        let portalFromCode = null;
        if (normalizedTeamCode && normalizedTeamCode.startsWith('ENIG-')) {
            const parts = normalizedTeamCode.split('-');
            if (parts.length >= 2) {
                const subteam = parts[1];
                portalFromCode = subteam === 'A' ? 'upside_down' : (subteam === 'B' ? 'hawkins_lab' : null);
            }
        }

        // If code implies a portal, force update user's world
        if (portalFromCode && worldMap[portalFromCode]) {
            console.log(`[DEBUGLOG] Portal detected from code: ${portalFromCode}. Updating user world.`);
            await prisma.user.update({
                where: { id: user.id },
                data: { currentWorld: worldMap[portalFromCode] }
            });
            user.currentWorld = worldMap[portalFromCode];
        }

        let effectivePortal = portalFromCode || portal;
        if (!effectivePortal && user.currentWorld) {
            effectivePortal = revWorldMap[user.currentWorld];
        }

        const token = jwt.sign(
            { userId: user.id, teamId, portal: effectivePortal },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        const team = teamId ? await prisma.team.findUnique({ where: { id: teamId } }) : null;

        // Return the portal so frontend can redirect if needed
        res.json({
            token,
            user: { id: user.id, username: user.username, email: user.email, portal: effectivePortal },
            team
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.selectPortal = async (req, res) => {
    try {
        const { portal } = req.body;
        const { userId, teamId } = req.user;

        const worldMap = { 'hawkins_lab': 'HAWKINS', 'upside_down': 'UPSIDE_DOWN' };

        if (!worldMap[portal]) {
            return res.status(400).json({ error: 'Invalid portal' });
        }

        // Update user in DB
        await prisma.user.update({
            where: { id: userId },
            data: { currentWorld: worldMap[portal] }
        });

        // Refresh token with new portal
        const token = jwt.sign(
            { userId, teamId, portal },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, portal });
    } catch (error) {
        console.error('Select Portal Error:', error);
        res.status(500).json({ error: 'Failed to select portal' });
    }
};
