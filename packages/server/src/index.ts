import 'dotenv/config';
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { chatRoutes } from './routes/chat';

const PORT = process.env.PORT || 3000;

const app = new Elysia();

app.use(cors());
app.use(chatRoutes);

app.get('/', () => {
    return { message: 'Server is running' };
});

app.listen(PORT, () => {
    console.log(`🦊 Server is listening on http://localhost:${PORT}`);
});
