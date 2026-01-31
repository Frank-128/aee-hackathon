import { useState, useEffect } from "react";

import {
  Phone,
  Paperclip,
  Send,
  MessageCircle,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/* ============ BUYER MESSAGES ============ */

type Conversation = {
  id: number;
  farmerId: number;
  farmerName: string;
  farmerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
};

type Message = {
  id: number;
  sender: "buyer" | "farmer";
  text: string;
  timestamp: string;
};

/* ============ BUYER MESSAGES ============ */
import { useLocation } from "react-router-dom";

export default function BuyerMessages() {
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messageText, setMessageText] = useState("");

  const conversations = [
    {
      id: 1,
      farmerId: 1,
      farmerName: "Kumar Farm Estate",
      farmerAvatar: "K",
      lastMessage: "Yes, we have 500kg available for immediate dispatch.",
      timestamp: "10:30 AM",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      farmerId: 2,
      farmerName: "Green Valley Farms",
      farmerAvatar: "G",
      lastMessage: "Price negotiation accepted. Proceeding with order.",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      farmerId: 3,
      farmerName: "Organic Harvest Co.",
      farmerAvatar: "O",
      lastMessage: "Thank you for your order! Delivery scheduled.",
      timestamp: "2 days ago",
      unread: 0,
      online: true,
    },
  ];

  // Auto-select chat from navigation state
  useEffect(() => {
    if (location.state && location.state.farmerId) {
      const { farmerId, farmerName } = location.state;
      const existing = conversations.find(c => c.farmerId == farmerId || c.farmerName === farmerName);

      if (existing) {
        setSelectedChat(existing);
      } else {
        // Create a temporary mock conversation object if not found
        // In a real app, this would fetch from backend or create a new channel
        setSelectedChat({
          id: Date.now(),
          farmerId,
          farmerName: farmerName || "Farmer",
          farmerAvatar: (farmerName || "F").charAt(0).toUpperCase(),
          lastMessage: "Start a conversation...",
          timestamp: "Now",
          unread: 0,
          online: true
        });
      }
    }
  }, [location.state]);

  const messages = [
    {
      id: 1,
      sender: "buyer",
      text: "Hello, is Premium Basmati Rice still available?",
      timestamp: "10:15 AM",
    },
    {
      id: 2,
      sender: "farmer",
      text: "Hello! Yes, we have fresh stock available.",
      timestamp: "10:18 AM",
    },
    {
      id: 3,
      sender: "buyer",
      text: "Great! I need 500kg. Can you deliver to Delhi?",
      timestamp: "10:20 AM",
    },
    {
      id: 4,
      sender: "farmer",
      text: "Yes, we have 500kg available for immediate dispatch. Delivery to Delhi will take 2-3 days.",
      timestamp: "10:30 AM",
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle send message logic
      setMessageText("");
    }
  };

  return (
    <ResponsiveLayout title="Messages">
      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 space-y-2 overflow-y-auto">
          {conversations.map((conv) => (
            <Card
              key={conv.id}
              className={`card-hover cursor-pointer ${selectedChat?.id === conv.id ? "border-emerald-500 border-2" : ""
                }`}
              onClick={() => setSelectedChat(conv)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-lg">
                      {conv.farmerAvatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold truncate">{conv.farmerName}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {conv.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="bg-emerald-600">{conv.unread}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-lg">
                          {selectedChat.farmerAvatar}
                        </div>
                        {selectedChat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold">{selectedChat.farmerName}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedChat.online ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card className="flex-1 mb-4 overflow-hidden">
                <CardContent className="p-4 h-full overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "buyer" ? "justify-end" : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender === "buyer"
                            ? "bg-emerald-600 text-white"
                            : "bg-muted"
                            }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${msg.sender === "buyer"
                              ? "text-emerald-100"
                              : "text-muted-foreground"
                              }`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Message Input */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="gap-2"
                      disabled={!messageText.trim()}
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="flex-1 flex items-center justify-center">
              <CardContent className="text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold mb-2">No Chat Selected</p>
                <p className="text-muted-foreground">
                  Select a conversation to start messaging
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
