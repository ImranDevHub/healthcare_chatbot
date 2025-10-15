import { Elysia, t } from 'elysia';
import { auth } from '../utils/firebase';

export const isAuthenticated = (app: Elysia) =>
    app.derive(async ({ headers }) => {
        const authHeader = headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Unauthorized');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Unauthorized');
        }

        try {
            const decodedToken = await auth.verifyIdToken(token);
            return { user: decodedToken };
        } catch (error) {
            throw new Error('Unauthorized');
        }
    });

export const isOptionalAuth = (app: Elysia) =>
    app.derive(async ({ headers }) => {
        const authHeader = headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            if (token) {
                try {
                    const decodedToken = await auth.verifyIdToken(token);
                    return { user: decodedToken };
                } catch (error) {
                    // Ignore invalid tokens for optional auth
                    return { user: null };
                }
            } else {
                return { user: null };
            }
        } else {
            return { user: null };
        }
    });
