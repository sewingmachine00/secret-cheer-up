import { motion } from "framer-motion";
import { CheerMessage } from "@/types/message";

interface EnvelopeProps {
  message: CheerMessage;
  index: number;
  onClick: () => void;
}

export default function Envelope({ message, index, onClick }: EnvelopeProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative w-full aspect-[4/3] cursor-pointer focus:outline-none"
    >
      {/* Envelope body */}
      <div className="absolute inset-0 bg-envelope rounded-lg shadow-md group-hover:shadow-lg transition-shadow" />

      {/* Envelope flap (triangle) */}
      <div
        className="absolute top-0 left-0 right-0 h-[45%] bg-envelope-flap rounded-t-lg transition-colors"
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
        }}
      />

      {/* Inner peek line */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-envelope-inner rounded-b-lg" />

      {/* Heart seal */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 z-10 text-2xl">
        {message.emoji}
      </div>

      {/* To label */}
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <span className="font-display text-sm text-foreground/70">To. {message.to}</span>
      </div>
    </motion.button>
  );
}
