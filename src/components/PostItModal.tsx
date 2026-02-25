import { motion, AnimatePresence } from "framer-motion";
import { CheerMessage } from "@/types/message";
import { X } from "lucide-react";

interface PostItModalProps {
  message: CheerMessage | null;
  onClose: () => void;
}

export default function PostItModal({ message, onClose }: PostItModalProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Post-it */}
          <motion.div
            className="relative z-10 w-full max-w-xs bg-postit text-postit-foreground rounded-sm p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.15)]"
            initial={{ scale: 0.3, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 2, opacity: 1 }}
            exit={{ scale: 0.3, rotate: 15, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
          >
            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-accent/60 rounded-sm rotate-1" />

            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-postit-foreground/40 hover:text-postit-foreground transition-colors"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-3">
              <span className="text-4xl">{message.emoji}</span>
            </div>

            <p className="font-display text-center text-lg leading-relaxed mb-4 whitespace-pre-wrap">
              {message.message}
            </p>

            <p className="text-right font-display text-sm text-postit-foreground/60">
              To. {message.to}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
