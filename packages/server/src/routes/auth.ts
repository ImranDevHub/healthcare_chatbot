import { Elysia, t } from 'elysia';
import {
    signup,
    login,
    logout,
    guestLogin,
    protectedRoute,
} from '../controllers/auth';
import { isAuthenticated } from '../middlewares/auth';

export const authRoutes = new Elysia({ prefix: '/auth' })
    .post('/signup', signup, {
        body: t.Object({
            email: t.String(),
            password: t.String(),
        }),
    })
    .post('/login', login)
    .post('/logout', logout)
    .post('/guest', guestLogin)
    .use(isAuthenticated)
    .get('/protected', protectedRoute);
