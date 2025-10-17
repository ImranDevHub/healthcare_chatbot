import { Elysia, t } from 'elysia';
import { isAuthenticated } from '../middlewares/auth';
import {
    createConversation,
    addMessage,
    getHistory,
    listConversations,
    updateConversation,
    deleteConversation,
} from '../services/conversation.service';
import { Role } from '../generated/prisma';

export const conversationRoutes = (app: Elysia) =>
    app.group('/conversations', group =>
        group
            .use(isAuthenticated)
            .post(
                '/',
                ({ body, user }) => createConversation(user.uid, body.title),
                {
                    body: t.Object({ title: t.String() }),
                }
            )
            .get('/', ({ user }) => listConversations(user.uid))
            .group('/:id', group =>
                group
                    .post(
                        '/messages',
                        ({ params, body, user }) =>
                            addMessage(
                                parseInt(params.id),
                                body.text,
                                body.role
                            ),
                        {
                            body: t.Object({
                                text: t.String(),
                                role: t.Enum(Role),
                            }),
                        }
                    )
                    .get('/messages', ({ params, user }) =>
                        getHistory(parseInt(params.id))
                    )
                    .put(
                        '/',
                        ({ params, body }) =>
                            updateConversation(parseInt(params.id), body.title),
                        {
                            body: t.Object({ title: t.String() }),
                        }
                    )
                    .delete('/', ({ params }) =>
                        deleteConversation(parseInt(params.id))
                    )
            )
    );
