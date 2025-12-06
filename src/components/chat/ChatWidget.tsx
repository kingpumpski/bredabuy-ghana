import React, { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const quickReplies = [
  "Track my order",
  "Payment options",
  "Return policy",
  "Speak to staff",
];

const botResponses: Record<string, string> = {
  "track my order": "To track your order, please visit our Track Order page or provide your order ID. Would you like me to guide you there?",
  "payment options": "We accept Mobile Money (MTN, Vodafone, AirtelTigo), Bank Transfer, and Cash on Delivery. Which payment method would you like to know more about?",
  "return policy": "You can return products within 7 days of delivery. Items must be unused and in original packaging. Shall I explain the return process?",
  "speak to staff": "I'll connect you with our customer service team. Please hold on while I transfer you to an available representative.",
  default: "Thank you for your message! I'm Breda, your shopping assistant. How can I help you today? You can ask about orders, payments, returns, or products.",
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 I'm Breda, your shopping assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerText.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center transition-all duration-300 hover:scale-110",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-card rounded-2xl shadow-float border border-border overflow-hidden transition-all duration-300 transform origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-gold p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-primary-foreground">Breda</h3>
              <p className="text-sm text-primary-foreground/80">Online • Ready to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex animate-slide-up",
                message.isBot ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                  message.isBot
                    ? "bg-muted text-foreground rounded-tl-none"
                    : "bg-primary text-primary-foreground rounded-tr-none"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 border-t border-border flex gap-2 overflow-x-auto">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleSend(reply)}
              className="flex-shrink-0 px-3 py-1.5 text-xs font-medium bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors duration-200"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="p-4 border-t border-border flex gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-muted rounded-full text-sm focus:ring-2 focus:ring-primary outline-none"
          />
          <Button type="submit" size="icon" className="rounded-full">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
