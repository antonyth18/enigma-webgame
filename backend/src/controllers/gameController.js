const prisma = require('../config/client');

const PORTAL_MAP = {
    'hawkins_lab': 'HAWKINS',
    'upside_down': 'UPSIDE_DOWN'
};

exports.getQuestions = async (req, res) => {
    try {
        const { portal, teamId } = req.user;

        if (!portal || !PORTAL_MAP[portal]) {
            return res.status(400).json({ error: 'Invalid or missing portal in session' });
        }

        const world = PORTAL_MAP[portal];

        // 1. Fetch questions and hints
        const questions = await prisma.question.findMany({
            where: { world },
            include: {
                hints: true
            }
        });

        // 2. Fetch completed questions for this team
        const completedAnswers = await prisma.answer.findMany({
            where: {
                teamId,
                isCorrect: true
            },
            select: { questionId: true }
        });

        const completedQuestionIds = new Set(completedAnswers.map(a => a.questionId));

        // 3. Sanitize and mark completion
        const sanitizedQuestions = questions.map(q => {
            const { correctAnswer, ...rest } = q;
            return {
                ...rest,
                isCompleted: completedQuestionIds.has(q.id)
            };
        });

        res.json(sanitizedQuestions);
    } catch (error) {
        console.error('Get Questions Error:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

exports.submitAnswer = async (req, res) => {
    try {
        const { portal, teamId } = req.user;
        const { questionId, answer } = req.body;
        console.log('DEBUG: submitAnswer', { user: req.user, body: req.body });

        if (portal !== 'upside_down') {
            return res.status(403).json({ error: 'Only Upside Down users can submit answers' });
        }

        if (!questionId || !answer) {
            return res.status(400).json({ error: 'Missing questionId or answer' });
        }

        const qId = parseInt(questionId);
        if (isNaN(qId)) {
            return res.status(400).json({ error: 'Invalid questionId' });
        }

        // 1. Fetch Question
        const question = await prisma.question.findUnique({
            where: { id: qId }
        });

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // 2. Normalize and Validation
        const isCorrect = question.correctAnswer.trim().toLowerCase() === answer.trim().toLowerCase();

        // 3. Check if ALREADY solved by this team (to determine points)
        const alreadySolved = await prisma.answer.findFirst({
            where: {
                teamId,
                questionId: qId,
                isCorrect: true
            }
        });

        // 4. Record the attempt
        const newAnswer = await prisma.answer.create({
            data: {
                content: answer,
                isCorrect,
                teamId,
                questionId: qId
            }
        });

        if (!isCorrect) {
            return res.json({ success: false, message: 'Incorrect answer', isCorrect: false });
        }

        // 5. If correct and NOT previously solved, award points
        let pointsAwarded = 0;
        let message = 'Correct! (Already solved, no new points)';

        if (!alreadySolved) {
            await prisma.team.update({
                where: { id: teamId },
                data: {
                    score: { increment: question.points }
                }
            });
            pointsAwarded = question.points;
            message = 'Correct! Points awarded.';
        }

        return res.json({ success: true, message, isCorrect: true, pointsAwarded });

    } catch (error) {
        console.error('Submit Answer Error:', error);
        if (error.message === 'Question not found') {
            res.status(404).json({ error: 'Question not found' });
        } else {
            res.status(500).json({ error: 'Failed to submit answer' });
        }
    }
};

exports.submitHint = async (req, res) => {
    try {
        const { portal, teamId } = req.user;
        const { questionId, content } = req.body;

        if (portal !== 'hawkins_lab') {
            return res.status(403).json({ error: 'Only Hawkins Lab users can submit hints' });
        }

        if (!content || !questionId) {
            return res.status(400).json({ error: 'Missing content or questionId' });
        }

        const hint = await prisma.hint.create({
            data: {
                content,
                questionId: parseInt(questionId),
                teamId: teamId
            },
            include: {
                team: { select: { name: true } }
            }
        });

        res.status(201).json(hint);

    } catch (error) {
        console.error('Submit Hint Error:', error);
        res.status(500).json({ error: 'Failed to submit hint' });
    }
};

exports.getHints = async (req, res) => {
    try {
        const { portal, teamId } = req.user;
        const { questionId, since } = req.query;

        if (!questionId) {
            return res.status(400).json({ error: 'Missing questionId parameter' });
        }

        const qId = parseInt(questionId);

        // 1. Find the current question to determine its order/index
        const currentQuestion = await prisma.question.findUnique({
            where: { id: qId }
        });

        if (!currentQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // 2. Find all questions for the current world to find the index
        const worldQuestions = await prisma.question.findMany({
            where: { world: currentQuestion.world },
            orderBy: { id: 'asc' }
        });

        const qIndex = worldQuestions.findIndex(q => q.id === qId);

        // 3. Find the corresponding question in the other world
        const otherWorld = currentQuestion.world === 'HAWKINS' ? 'UPSIDE_DOWN' : 'HAWKINS';
        const otherWorldQuestions = await prisma.question.findMany({
            where: { world: otherWorld },
            orderBy: { id: 'asc' }
        });

        const otherQuestionId = otherWorldQuestions[qIndex]?.id;

        // 4. Build query to hit both IDs
        const qIds = [qId];
        if (otherQuestionId) qIds.push(otherQuestionId);

        const whereClause = {
            teamId,
            questionId: { in: qIds }
        };

        if (since) {
            whereClause.createdAt = {
                gt: new Date(since)
            };
        }

        const hints = await prisma.hint.findMany({
            where: whereClause,
            include: {
                team: {
                    select: { name: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(hints);

    } catch (error) {
        console.error('Get Hints Error:', error);
        res.status(500).json({ error: 'Failed to fetch hints' });
    }
};
