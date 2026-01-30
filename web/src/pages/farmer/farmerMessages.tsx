import React, { useState, useRef, useEffect } from "react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Send,
  Image as ImageIcon,
  Phone,
  Video,
  MoreVertical,
  Search,
  ArrowLeft,
  CheckCheck,
  Check,
  Paperclip,
  Smile,
  ShieldCheck,
  User,
  Settings as SettingsIcon,
  Package,
  AlertCircle,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

/* ============================================
   TYPES & INTERFACES
============================================ */

type ChatType = "buyer" | "admin" | "system";
type MessageType = "text" | "image" | "system-event";
type ContextType = "ORDER" | "PRODUCT" | "SYSTEM";

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: "farmer" | "buyer" | "admin" | "system";
  content: string;
  messageType: MessageType;
  timestamp: Date;
  seen: boolean;
  delivered: boolean;
  imageUrl?: string;
}

interface Conversation {
  id: string;
  type: ChatType;
  contextType: ContextType;
  contextId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  contextLabel: string;
  status?: string;
  isOnline?: boolean;
}

/* ============================================
   MOCK DATA
============================================ */

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    type: "buyer",
    contextType: "ORDER",
    contextId: "ORD123",
    participantName: "Rajesh Kumar",
    participantAvatar: undefined,
    lastMessage: "When will the tomatoes be delivered?",
    lastMessageTime: new Date(Date.now() - 5 * 60000), // 5 mins ago
    unreadCount: 2,
    contextLabel: "Order #ORD123 • Tomatoes",
    status: "Packed",
    isOnline: true,
  },
  {
    id: "conv-2",
    type: "admin",
    contextType: "SYSTEM",
    contextId: "VER456",
    participantName: "AgriAdmin Support",
    participantAvatar: undefined,
    lastMessage: "Your KYC documents have been verified",
    lastMessageTime: new Date(Date.now() - 2 * 3600000), // 2 hours ago
    unreadCount: 0,
    contextLabel: "Verification Support",
    isOnline: false,
  },
  {
    id: "conv-3",
    type: "buyer",
    contextType: "ORDER",
    contextId: "ORD124",
    participantName: "Priya Sharma",
    participantAvatar: undefined,
    lastMessage: "Thank you for the fresh vegetables!",
    lastMessageTime: new Date(Date.now() - 24 * 3600000), // 1 day ago
    unreadCount: 0,
    contextLabel: "Order #ORD124 • Mixed Vegetables",
    status: "Delivered",
    isOnline: false,
  },
  {
    id: "conv-4",
    type: "system",
    contextType: "SYSTEM",
    contextId: "SYS001",
    participantName: "System Notifications",
    participantAvatar: undefined,
    lastMessage: "Payment of ₹5,400 credited to your account",
    lastMessageTime: new Date(Date.now() - 3 * 3600000), // 3 hours ago
    unreadCount: 1,
    contextLabel: "Automated Updates",
    isOnline: false,
  },
  {
    id: "conv-5",
    type: "buyer",
    contextType: "PRODUCT",
    contextId: "PROD789",
    participantName: "Amit Patel",
    participantAvatar: undefined,
    lastMessage: "Is organic cabbage available?",
    lastMessageTime: new Date(Date.now() - 6 * 3600000), // 6 hours ago
    unreadCount: 1,
    contextLabel: "Product Inquiry • Cabbage",
    isOnline: false,
  },
];

const mockMessages: { [key: string]: Message[] } = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      senderId: "buyer-1",
      senderRole: "buyer",
      content: "Hi! I placed an order for 10kg tomatoes yesterday.",
      messageType: "text",
      timestamp: new Date(Date.now() - 30 * 60000),
      seen: true,
      delivered: true,
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      senderId: "farmer-1",
      senderRole: "farmer",
      content: "Yes, I've packed your order. It will be shipped today.",
      messageType: "text",
      timestamp: new Date(Date.now() - 25 * 60000),
      seen: true,
      delivered: true,
    },
    {
      id: "msg-3",
      conversationId: "conv-1",
      senderId: "system",
      senderRole: "system",
      content: "Order #ORD123 has been marked as Packed",
      messageType: "system-event",
      timestamp: new Date(Date.now() - 20 * 60000),
      seen: true,
      delivered: true,
    },
    {
      id: "msg-4",
      conversationId: "conv-1",
      senderId: "buyer-1",
      senderRole: "buyer",
      content: "Great! When will the tomatoes be delivered?",
      messageType: "text",
      timestamp: new Date(Date.now() - 5 * 60000),
      seen: false,
      delivered: true,
    },
    {
      id: "msg-5",
      conversationId: "conv-1",
      senderId: "buyer-1",
      senderRole: "buyer",
      content: "Please let me know the estimated time.",
      messageType: "text",
      timestamp: new Date(Date.now() - 4 * 60000),
      seen: false,
      delivered: true,
    },
  ],
  "conv-2": [
    {
      id: "msg-6",
      conversationId: "conv-2",
      senderId: "admin-1",
      senderRole: "admin",
      content: "Hello! We are reviewing your KYC documents.",
      messageType: "text",
      timestamp: new Date(Date.now() - 4 * 3600000),
      seen: true,
      delivered: true,
    },
    {
      id: "msg-7",
      conversationId: "conv-2",
      senderId: "farmer-1",
      senderRole: "farmer",
      content: "Thank you! Please let me know if you need any additional documents.",
      messageType: "text",
      timestamp: new Date(Date.now() - 3 * 3600000),
      seen: true,
      delivered: true,
    },
    {
      id: "msg-8",
      conversationId: "conv-2",
      senderId: "admin-1",
      senderRole: "admin",
      content: "Your KYC documents have been verified. You can now list products.",
      messageType: "text",
      timestamp: new Date(Date.now() - 2 * 3600000),
      seen: true,
      delivered: true,
    },
  ],
  "conv-4": [
    {
      id: "msg-9",
      conversationId: "conv-4",
      senderId: "system",
      senderRole: "system",
      content: "Payment of ₹5,400 credited to your account",
      messageType: "system-event",
      timestamp: new Date(Date.now() - 3 * 3600000),
      seen: false,
      delivered: true,
    },
  ],
  "conv-5": [
    {
      id: "msg-10",
      conversationId: "conv-5",
      senderId: "buyer-2",
      senderRole: "buyer",
      content: "Hi! Is organic cabbage available?",
      messageType: "text",
      timestamp: new Date(Date.now() - 6 * 3600000),
      seen: false,
      delivered: true,
    },
  ],
};

/* ============================================
   UTILITY FUNCTIONS
============================================ */

const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getChatIcon = (type: ChatType) => {
  switch (type) {
    case "admin":
      return <ShieldCheck className="w-4 h-4" />;
    case "system":
      return <SettingsIcon className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

/* ============================================
   CHAT LIST ITEM COMPONENT
============================================ */

interface ChatListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 p-4 border-b border-emerald-100 dark:border-slate-800 transition-all hover:bg-emerald-50 dark:hover:bg-slate-800/50",
        isActive && "bg-emerald-50 dark:bg-slate-800 border-l-4 border-l-emerald-500"
      )}
    >
      {/* Avatar with online indicator */}
      <div className="relative shrink-0">
        <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-slate-900">
          <AvatarImage src={conversation.participantAvatar} />
          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold">
            {getChatIcon(conversation.type)}
          </AvatarFallback>
        </Avatar>
        {conversation.isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
            {conversation.participantName}
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
            {formatTimestamp(conversation.lastMessageTime)}
          </span>
        </div>

        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1 truncate">
          {conversation.contextLabel}
        </p>

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-slate-600 dark:text-slate-400 truncate flex-1">
            {conversation.lastMessage}
          </p>
          {conversation.unreadCount > 0 && (
            <Badge className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full shrink-0">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};

/* ============================================
   MESSAGE BUBBLE COMPONENT
============================================ */

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  showAvatar = true,
}) => {
  if (message.messageType === "system-event") {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 max-w-md">
          <Package className="w-3.5 h-3.5" />
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2 mb-4", isOwn ? "justify-end" : "justify-start")}>
      {/* Avatar for received messages */}
      {!isOwn && showAvatar && (
        <Avatar className="w-8 h-8 shrink-0 mt-1">
          <AvatarFallback className="bg-emerald-500 text-white text-xs">
            {message.senderRole === "admin" ? "A" : "B"}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message content */}
      <div className={cn("max-w-[70%] space-y-1", isOwn && "items-end flex flex-col")}>
        {/* Message bubble */}
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl shadow-sm",
            isOwn
              ? "bg-emerald-500 text-white rounded-br-sm"
              : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-emerald-100 dark:border-slate-700 rounded-bl-sm"
          )}
        >
          {message.messageType === "image" && message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="Shared"
              className="rounded-lg mb-2 max-w-full"
            />
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        {/* Timestamp and status */}
        <div className={cn("flex items-center gap-1.5 px-1", isOwn && "flex-row-reverse")}>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {formatMessageTime(message.timestamp)}
          </span>
          {isOwn && (
            <span>
              {message.seen ? (
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              ) : message.delivered ? (
                <CheckCheck className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <Check className="w-3.5 h-3.5 text-slate-400" />
              )}
            </span>
          )}
        </div>
      </div>

      {/* Spacer for sent messages */}
      {isOwn && showAvatar && <div className="w-8 shrink-0" />}
    </div>
  );
};

/* ============================================
   MAIN COMPONENT
============================================ */

export default function FarmerMessages() {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(
    mockConversations[0]
  );
  const [messages, setMessages] = useState<Message[]>(mockMessages["conv-1"] || []);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatList, setShowChatList] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when conversation changes
  useEffect(() => {
    if (activeConversation && !isMobile) {
      inputRef.current?.focus();
    }
  }, [activeConversation, isMobile]);

  // Handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setMessages(mockMessages[conversation.id] || []);
    
    // Mark as read
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversation.id ? { ...c, unreadCount: 0 } : c
      )
    );

    // Hide chat list on mobile
    if (isMobile) {
      setShowChatList(false);
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversation.id,
      senderId: user?.id || "farmer-1",
      senderRole: "farmer",
      content: messageInput.trim(),
      messageType: "text",
      timestamp: new Date(),
      seen: false,
      delivered: false,
    };

    // Add message
    setMessages((prev) => [...prev, newMessage]);

    // Update conversation last message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              lastMessage: messageInput.trim(),
              lastMessageTime: new Date(),
            }
          : c
      )
    );

    // Clear input
    setMessageInput("");

    // Simulate delivery & seen status
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, delivered: true } : m
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, seen: true } : m
        )
      );
    }, 2000);
  };

  // Handle back on mobile
  const handleBack = () => {
    setShowChatList(true);
    setActiveConversation(null);
  };

  // Filter conversations
  const filteredConversations = conversations.filter(
    (c) =>
      c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contextLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort conversations (unread first, then by time)
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
    if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
    return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
  });

  // Total unread count
  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  /* ============================================
     MOBILE VIEW
  ============================================ */

  if (isMobile) {
    return (
      <ResponsiveLayout title="Messages" showBack={false}>
        {/* Chat List */}
        {showChatList && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-800 border-emerald-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            {/* Conversations */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden">
              {sortedConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No conversations found</p>
                </div>
              ) : (
                sortedConversations.map((conversation) => (
                  <ChatListItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={activeConversation?.id === conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* Active Chat */}
        {!showChatList && activeConversation && (
          <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-emerald-100 dark:border-slate-800 px-4 py-3 flex items-center gap-3">
              <button onClick={handleBack} className="text-slate-600 dark:text-slate-400">
                <ArrowLeft className="w-5 h-5" />
              </button>

              <Avatar className="w-10 h-10">
                <AvatarImage src={activeConversation.participantAvatar} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                  {getChatIcon(activeConversation.type)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                  {activeConversation.participantName}
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">
                  {activeConversation.contextLabel}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Order</DropdownMenuItem>
                  <DropdownMenuItem>Report User</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-emerald-50/30 dark:bg-slate-950">
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.senderRole === "farmer"}
                  showAvatar={
                    index === 0 ||
                    messages[index - 1].senderRole !== message.senderRole
                  }
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {activeConversation.type !== "system" && (
              <div className="bg-white dark:bg-slate-900 border-t border-emerald-100 dark:border-slate-800 p-4">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="w-5 h-5" />
                  </Button>

                  <Input
                    ref={inputRef}
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-emerald-50 dark:bg-slate-800 border-emerald-200 dark:border-slate-700 rounded-xl"
                  />

                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="shrink-0 bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </ResponsiveLayout>
    );
  }

  /* ============================================
     DESKTOP VIEW
  ============================================ */

  return (
    <ResponsiveLayout title="Messages" showBack={false}>
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* CHAT LIST */}
        <div className="col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden flex flex-col">
          {/* Search Header */}
          <div className="p-4 border-b border-emerald-100 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-emerald-50 dark:bg-slate-800 border-emerald-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {sortedConversations.length === 0 ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No conversations found</p>
              </div>
            ) : (
              sortedConversations.map((conversation) => (
                <ChatListItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={activeConversation?.id === conversation.id}
                  onClick={() => handleSelectConversation(conversation)}
                />
              ))
            )}
          </div>
        </div>

        {/* ACTIVE CHAT */}
        <div className="col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-emerald-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-11 h-11 ring-2 ring-emerald-100 dark:ring-slate-800">
                    <AvatarImage src={activeConversation.participantAvatar} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                      {getChatIcon(activeConversation.type)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {activeConversation.participantName}
                    </h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {activeConversation.contextLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Video className="w-5 h-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-xl">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Order Details</DropdownMenuItem>
                      <DropdownMenuItem>View Product</DropdownMenuItem>
                      <DropdownMenuItem>Report Conversation</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Block User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-emerald-50/30 to-white dark:from-slate-950 dark:to-slate-900">
                {/* Date separator */}
                <div className="flex justify-center mb-6">
                  <span className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-1 rounded-full border border-emerald-100 dark:border-slate-700">
                    Today
                  </span>
                </div>

                {messages.map((message, index) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.senderRole === "farmer"}
                    showAvatar={
                      index === 0 ||
                      messages[index - 1].senderRole !== message.senderRole
                    }
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {activeConversation.type !== "system" ? (
                <div className="px-6 py-4 border-t border-emerald-100 dark:border-slate-800">
                  <div className="flex items-end gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 rounded-xl text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      <Smile className="w-5 h-5" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 rounded-xl text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    >
                      <Paperclip className="w-5 h-5" />
                    </Button>

                    <Input
                      ref={inputRef}
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1 bg-emerald-50 dark:bg-slate-800 border-emerald-200 dark:border-slate-700 rounded-xl min-h-[44px] resize-none"
                    />

                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="shrink-0 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl h-11 px-6"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                    Messages are linked to orders and products for security
                  </p>
                </div>
              ) : (
                <div className="px-6 py-4 border-t border-emerald-100 dark:border-slate-800 bg-emerald-50/50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    System notifications are read-only
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Select a conversation
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Choose a conversation from the left to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}