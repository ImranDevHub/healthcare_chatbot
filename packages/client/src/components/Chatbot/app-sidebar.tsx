import { useState } from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Pencil, SquarePlus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Conversation } from '../../services/conversationService';
import logo from '/logo/SHEGAAsset-7@4x.png';
import './app-sidebar.css';

interface AppSidebarProps {
    conversations: Conversation[];
    activeConversation: Conversation | null;
    handleNewConversation: () => void;
    handleSelectConversation: (conversation: Conversation) => void;
    handleRenameConversation: (id: number, title: string) => void;
    handleDeleteConversation: (id: number) => void;
}

export function AppSidebar({
    conversations,
    activeConversation,
    handleNewConversation,
    handleSelectConversation,
    handleRenameConversation,
    handleDeleteConversation,
}: AppSidebarProps) {
    const [editingConvoId, setEditingConvoId] = useState<number | null>(null);
    const [newTitle, setNewTitle] = useState('');

    const startEditing = (convo: Conversation) => {
        setEditingConvoId(convo.id);
        setNewTitle(convo.title);
    };

    const cancelEditing = () => {
        setEditingConvoId(null);
        setNewTitle('');
    };

    const saveTitle = (id: number) => {
        if (newTitle.trim()) {
            handleRenameConversation(id, newTitle.trim());
        }
        cancelEditing();
    };

    return (
        <Sidebar variant="floating" className="border-0">
            <SidebarHeader className="w-full">
                <Link to="/">
                    <div className="text-lg font-bold text-gray-300 flex">
                        <img src={logo} className="size-6" />
                        <span className="inline-block ml-0.5">ሸጋ-Health</span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent className=" text-gray-300">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={handleNewConversation}
                                    className=" hover:bg-gray-700 hover:text-gray-50"
                                >
                                    <SquarePlus />
                                    <span>New Chat</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white font-bold text-lg">
                        Chats
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {conversations.map(convo => (
                                <SidebarMenuItem
                                    key={convo.id}
                                    className="group relative"
                                >
                                    {editingConvoId === convo.id ? (
                                        <input
                                            type="text"
                                            value={newTitle}
                                            onChange={e =>
                                                setNewTitle(e.target.value)
                                            }
                                            onBlur={() => saveTitle(convo.id)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter')
                                                    saveTitle(convo.id);
                                                if (e.key === 'Escape')
                                                    cancelEditing();
                                            }}
                                            className="w-full bg-gray-700 text-white rounded p-1.5 text-sm"
                                            autoFocus
                                        />
                                    ) : (
                                        <SidebarMenuButton
                                            onClick={() =>
                                                handleSelectConversation(convo)
                                            }
                                            className={`w-full justify-start hover:text-gray-50 hover:bg-gray-700 ${
                                                activeConversation?.id ===
                                                convo.id
                                                    ? 'bg-gray-900'
                                                    : ''
                                            }`}
                                        >
                                            <span className="truncate">
                                                {convo.title}
                                            </span>
                                        </SidebarMenuButton>
                                    )}
                                    {editingConvoId !== convo.id && (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() =>
                                                    startEditing(convo)
                                                }
                                                className="p-1 hover:text-white"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteConversation(
                                                        convo.id
                                                    )
                                                }
                                                className="p-1 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
