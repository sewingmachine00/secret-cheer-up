import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { getMessages } from "@/lib/messages";
import { CheerMessage } from "@/types/message";
import Envelope from "@/components/Envelope";
import PostItModal from "@/components/PostItModal";
import WriteMessageForm from "@/components/WriteMessageForm";

export default function Index() {
  const [messages, setMessages] = useState<CheerMessage[]>(getMessages);
  const [selected, setSelected] = useState<CheerMessage | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const refresh = useCallback(() => setMessages(getMessages()), []);

  return (
    <div className="min-h-screen bg-background px-4 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <motion.header
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
          💌 우리 반 응원함
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          익명으로 친구에게 따뜻한 한마디를 전해보세요
        </p>
      </motion.header>

      {/* Envelope grid */}
      {messages.length === 0 ? (
        <motion.div
          className="text-center py-20 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-5xl mb-4">📭</p>
          <p className="font-display text-lg">아직 메시지가 없어요</p>
          <p className="text-sm mt-1">첫 번째 응원 메시지를 남겨보세요!</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {messages.map((msg, i) => (
            <Envelope
              key={msg.id}
              message={msg}
              index={i}
              onClick={() => setSelected(msg)}
            />
          ))}
        </div>
      )}

      {/* FAB */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setFormOpen(true)}
      >
        <Plus size={28} />
      </motion.button>

      {/* Modals */}
      <PostItModal message={selected} onClose={() => setSelected(null)} />
      <WriteMessageForm open={formOpen} onClose={() => setFormOpen(false)} onSent={refresh} />
    </div>
  );
}
