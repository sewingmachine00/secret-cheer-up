import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addMessage } from "@/lib/messages";
import { Send, X } from "lucide-react";

const EMOJI_OPTIONS = ["💛", "🌟", "🍀", "🌈", "🎉", "💪", "✨", "🦋", "🌸", "🐣", "☀️", "💌"];

interface WriteMessageFormProps {
  open: boolean;
  onClose: () => void;
  onSent: () => void;
}

export default function WriteMessageForm({ open, onClose, onSent }: WriteMessageFormProps) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("💛");
  const [sending, setSending] = useState(false);

  const canSubmit = to.trim() && message.trim() && !sending;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSending(true);
    const saved = await addMessage({ to: to.trim(), message: message.trim(), emoji });
    setSending(false);
    if (!saved) return;
    setTo("");
    setMessage("");
    setEmoji("💛");
    onSent();
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-sm bg-popover rounded-2xl p-6 shadow-xl"
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 250 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="font-display text-2xl font-bold text-foreground mb-5 text-center">
              💌 응원 메시지 쓰기
            </h2>

            {/* To */}
            <label className="block mb-1 text-sm font-medium text-muted-foreground">받는 사람</label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="이름 또는 별명"
              maxLength={20}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-ring"
            />

            {/* Message */}
            <label className="block mb-1 text-sm font-medium text-muted-foreground">메시지</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="따뜻한 응원의 말을 남겨주세요 ✏️"
              maxLength={200}
              rows={4}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />

            {/* Emoji picker */}
            <label className="block mb-2 text-sm font-medium text-muted-foreground">이모지 선택</label>
            <div className="flex flex-wrap gap-2 mb-5">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`text-2xl p-1 rounded-lg transition-all ${
                    emoji === e
                      ? "bg-primary/20 scale-110 ring-2 ring-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 font-medium text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              {sending ? "보내는 중..." : "보내기"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
