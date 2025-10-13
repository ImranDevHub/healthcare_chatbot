const conversation = new Map<string, string>();

export function getLastConversation(conversationId: string) {
    return conversation.get(conversationId);
}
