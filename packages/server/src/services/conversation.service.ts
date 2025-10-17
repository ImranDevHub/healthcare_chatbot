import { PrismaClient } from '../generated/prisma';
import { Role } from '../generated/prisma';

const prisma = new PrismaClient();

export const createConversation = async (userId: string, title: string) => {
    // Check if the user exists, if not create them
    const user = await prisma.user.upsert({
        where: { id: userId },
        update: {}, // No update needed if user exists
        create: { id: userId },
    });

    return prisma.conversation.create({
        data: {
            title,
            userId: user.id,
        },
    });
};

export const addMessage = async (
    conversationId: number,
    text: string,
    role: Role
) => {
    return prisma.message.create({
        data: {
            conversationId,
            text,
            role,
        },
    });
};

export const getHistory = async (conversationId: number) => {
    return prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
    });
};

export const listConversations = async (userId: string) => {
    const conversations = await prisma.conversation.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            },
        },
    });

    return conversations.map(convo => {
        const { messages, ...rest } = convo;
        const lastMessage = messages[0];
        return {
            ...rest,
            lastMessagePreview: lastMessage
                ? lastMessage.text.substring(0, 50)
                : null,
        };
    });
};

export const updateConversation = async (id: number, title: string) => {
    return prisma.conversation.update({
        where: { id },
        data: { title },
    });
};

export const deleteConversation = async (id: number) => {
    // Prisma will cascade delete messages if the schema is set up for it
    return prisma.conversation.delete({
        where: { id },
    });
};
