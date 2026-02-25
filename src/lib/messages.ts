import { CheerMessage } from "@/types/message";

const STORAGE_KEY = "cheer-messages";

export function getMessages(): CheerMessage[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addMessage(msg: Omit<CheerMessage, "id" | "createdAt">): CheerMessage {
  const messages = getMessages();
  const newMsg: CheerMessage = {
    ...msg,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  messages.unshift(newMsg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  return newMsg;
}
