const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const hawkinsQuestions = [
    { title: 'Access Code Decryption', description: 'Decrypt the security access code to unlock the first containment chamber. Time is running out.', points: 100, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Specimen Database Query', description: 'Query the corrupted specimen database. Find the pattern in the chaos before the system purges.', points: 150, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Power Grid Restoration', description: 'Restore power to the emergency containment systems. Calculate the correct circuit configuration.', points: 200, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Biometric Override', description: 'Override the biometric security protocols. The specimens are escaping - act fast.', points: 250, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Neural Network Analysis', description: 'Analyze the neural network patterns from Experiment 001. The data is fragmenting.', points: 300, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Chemical Formula Sequence', description: 'Decode the chemical formula sequence. One wrong calculation could be catastrophic.', points: 350, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Memory Reconstruction', description: 'Reconstruct fragmented memory patterns from the test subjects. Find the hidden message.', points: 400, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Security Clearance Escalation', description: 'Escalate your security clearance through the multi-layered authentication system.', points: 450, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'AI Core Logic Puzzle', description: 'Solve the AI core logic puzzle. The Director is watching your every move.', points: 500, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Facility Lockdown Override', description: 'Override the facility-wide lockdown. All exits are sealed - find the master code.', points: 600, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Quantum Encryption Break', description: 'Break through the quantum encryption protecting the core systems. Time and space are unstable.', points: 700, correctAnswer: 'test', world: 'HAWKINS' },
    { title: 'Final Shutdown Sequence', description: 'Execute the final shutdown sequence. The fate of Hawkins depends on your success.', points: 1000, correctAnswer: 'test', world: 'HAWKINS' },
];

const upsideDownQuestions = [
    { title: 'String Reversal in the Void', description: 'Write a function that reverses a string. The darkness consumes all forward motion - only backwards can you escape.', points: 100, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Array Manipulation Through Darkness', description: 'Find the maximum value in an array corrupted by the Upside Down. Numbers shift and change - locate the strongest.', points: 150, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Loop Through the Upside Down', description: 'Create a loop that traverses a nested structure. Each layer is darker than the last. Navigate wisely.', points: 200, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Conditional Logic in Corrupted Space', description: 'Implement conditional branching where truth itself is unstable. The Mind Flayer distorts reality - find the correct path.', points: 250, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Recursive Descent into the Void', description: 'Build a recursive function that explores infinite depth. Each call takes you deeper into the Upside Down.', points: 300, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Binary Search Through Dimensions', description: 'Search through parallel dimensions using binary search. Time is fracturing - find the target before it is too late.', points: 350, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Dynamic Programming in Chaos', description: 'Optimize a chaotic system using dynamic programming. Memory itself is corrupted - cache your solutions carefully.', points: 400, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Graph Traversal Through Portals', description: 'Navigate a graph where edges are unstable portals. Find the shortest path before the connections collapse.', points: 450, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Advanced Tree Traversal in Darkness', description: 'Traverse a corrupted binary tree where nodes shift between dimensions. Balance is lost - restore order.', points: 500, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Complex System Design Under Pressure', description: 'Design a system that can withstand the Mind Flayer corruption. Architecture must be resilient against supernatural forces.', points: 600, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'Optimization Through Supernatural Forces', description: 'Optimize an algorithm under impossible constraints. Time and space itself are warping - efficiency is survival.', points: 700, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
    { title: 'The Final Algorithm', description: 'Face the ultimate challenge. The Mind Flayer essence is encoded in this algorithm. Solve it to close the portal forever.', points: 1000, correctAnswer: 'test', world: 'UPSIDE_DOWN' },
];

async function main() {
    console.log('Start seeding ...');

    // Clear existing
    await prisma.answer.deleteMany();
    await prisma.hint.deleteMany();
    await prisma.question.deleteMany();

    // Insert Hawkins
    for (const q of hawkinsQuestions) {
        await prisma.question.create({ data: q });
    }

    // Insert Upside Down
    for (const q of upsideDownQuestions) {
        await prisma.question.create({ data: q });
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
