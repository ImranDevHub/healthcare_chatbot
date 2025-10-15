import { t } from 'elysia';
import { auth } from '../utils/firebase';

export const signup = async ({ body }: any) => {
    const { email, password } = body;
    try {
        const userRecord = await auth.createUser({ email, password });
        return { uid: userRecord.uid };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const login = async ({ body }: any) => {
    // Firebase Admin SDK does not handle sign-ins.
    // This should be handled on the client-side.
    // This endpoint is a placeholder.
    return { message: 'Login handled by client' };
};

export const logout = async () => {
    // Firebase Admin SDK does not handle sign-outs.
    // This should be handled on the client-side.
    return { message: 'Logout handled by client' };
};

export const guestLogin = async () => {
    try {
        const userRecord = await auth.createUser({});
        const customToken = await auth.createCustomToken(userRecord.uid);
        return { token: customToken };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const protectedRoute = async ({ user }: any) => {
    return { message: `Welcome, ${user.uid}` };
};
