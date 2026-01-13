const app = require('./app');
const prisma = require('./config/client');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await prisma.$connect();
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

start();
