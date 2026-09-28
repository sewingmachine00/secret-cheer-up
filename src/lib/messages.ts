import { supabase } from "@/integrations/supabase/client";
import { CheerMessage } from "@/types/message";

export async function getMessages(): Promise<CheerMessage[]> {
  const { data, error } = await supabase
    .from("cheer_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load messages:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    to: row.recipient,
    message: row.message,
    emoji: row.emoji,
    createdAt: new Date(row.created_at).getTime(),
  }));
}

export async function addMessage(
  msg: Omit<CheerMessage, "id" | "createdAt">
): Promise<CheerMessage | null> {
  const { data, error } = await supabase
    .from("cheer_messages")
    .insert({ recipient: msg.to, message: msg.message, emoji: msg.emoji })
    .select()
    .single();

  if (error) {
    console.error("Failed to save message:", error);
    return null;
  }

  return {
    id: data.id,
    to: data.recipient,
    message: data.message,
    emoji: data.emoji,
    createdAt: new Date(data.created_at).getTime(),
  };
}
