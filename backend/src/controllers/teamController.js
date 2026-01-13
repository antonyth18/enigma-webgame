const prisma = require('../config/client');

exports.getLeaderboard = async (req, res) => {
    try {
        const teams = await prisma.team.findMany({
            select: {
                id: true,
                name: true,
                score: true,
                createdAt: true,
            },
            orderBy: [
                { score: 'desc' },
                { createdAt: 'asc' }
            ]
        });

        let currentRank = 1;
        let lastScore = null;

        const leaderboard = teams.map((team, index) => {
            if (lastScore !== null && team.score < lastScore) {
                currentRank = index + 1;
            }
            lastScore = team.score;
            return {
                id: team.id,
                rank: currentRank,
                teamName: team.name,
                score: team.score
            };
        });

        res.json(leaderboard);
    } catch (error) {
        console.error('Get Leaderboard Error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
};

exports.getTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await prisma.team.findUnique({
            where: { id: parseInt(id) },
            include: { members: { select: { username: true } } }
        });

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        res.json(team);
    } catch (error) {
        console.error('Get Team Error:', error);
        res.status(500).json({ error: 'Failed to fetch team' });
    }
};

exports.getMyTeam = async (req, res) => {
    try {
        const { teamId } = req.user;
        if (!teamId) {
            return res.status(404).json({ error: 'User has no team' });
        }

        const team = await prisma.team.findUnique({
            where: { id: teamId }
        });

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        res.json(team);
    } catch (error) {
        console.error('Get My Team Error:', error);
        res.status(500).json({ error: 'Failed to fetch your team data' });
    }
};
