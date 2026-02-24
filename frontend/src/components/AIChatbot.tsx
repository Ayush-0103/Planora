import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Paperclip, Mic, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickActions = [
  "Create my study plan",
  "Adjust my schedule",
  "Explain this topic",
  "Generate revision notes",
  "Suggest resources",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm your Planora AI assistant 👋\n\nI can help you create your study plan, adjust your schedule, explain topics, and generate revision notes. What would you like to do today?",
  timestamp: new Date(),
};

const mockResponses: Record<string, string> = {
  "Create my study plan":
    "I'd love to help you create a study plan! Could you tell me which subjects you're studying and when your exams are? I'll build a personalized schedule for you.",
  "Adjust my schedule":
    "Sure! I can see your current schedule. What changes would you like to make — shift timings, add breaks, or re-prioritize subjects?",
  "Explain this topic":
    "Of course! Which topic would you like me to explain? Share the subject and concept, and I'll break it down step by step.",
  "Generate revision notes":
    "Great idea! Which subject and topic should I create revision notes for? I'll keep them concise and exam-focused.",
  "Suggest resources":
    "I can recommend textbooks, videos, and practice problems. Which subject are you looking for resources in?",
};

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply =
        mockResponses[text.trim()] ||
        "That's a great question! Let me look into that for you. In a full version, I'd connect to the Planora engine to give you a detailed answer.";
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply, timestamp: new Date() },
      ]);
      setTyping(false);
    }, 1200);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full gradient-primary shadow-elevated flex items-center justify-center text-primary-foreground"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel Overlay + Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/10 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] flex flex-col bg-card border-l border-border shadow-elevated"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center shrink-0">
                  <Bot className="h-4.5 w-4.5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-foreground">Planora AI Assistant</h2>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success inline-block" />
                    Online · Your personal study strategist
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 px-4 py-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                          msg.role === "user"
                            ? "gradient-primary text-primary-foreground rounded-br-md"
                            : "bg-secondary text-foreground rounded-bl-md"
                        )}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1 px-1">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {typing && (
                    <div className="flex items-start max-w-[85%]">
                      <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              {/* Quick Actions */}
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => sendMessage(action)}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground hover:bg-secondary transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-4 pb-4 pt-2 border-t border-border">
                <div className="flex items-center gap-2 rounded-xl bg-background border border-border px-3 py-2">
                  <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                    placeholder="Ask me anything about your study plan..."
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                  <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <Mic className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim()}
                    className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
