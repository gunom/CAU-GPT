import express from 'express';
import { initializeChatModule } from './middleware/initialChatModule';
require('dotenv').config();
import cors from 'cors';

const app = express();

// cors allow all
app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Wrap the server setup in an async function to await initializeChatModule
const startServer = async () => {
    try {
        await initializeChatModule();
        app.use('/api', require('./routers'));

        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    } catch (error) {
        console.error('Error initializing chat module:', error);
    }
};

startServer();
