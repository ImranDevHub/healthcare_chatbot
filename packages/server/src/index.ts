import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { authRoutes } from './routes/auth';
import { chatRoutes } from './routes/chat';
import { conversationRoutes } from './routes/conversation';

const app = new Elysia()
    .use(cors())
    .use(authRoutes)
    .use(chatRoutes)
    .use(conversationRoutes)
    .get('/', () => 'Server is running')
    .listen(3000);

console.log(
    `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
