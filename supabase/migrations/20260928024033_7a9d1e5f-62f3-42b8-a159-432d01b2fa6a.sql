CREATE TABLE public.cheer_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text NOT NULL,
  message text NOT NULL,
  emoji text NOT NULL DEFAULT '💛',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.cheer_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cheer_messages TO authenticated;
GRANT ALL ON public.cheer_messages TO service_role;

ALTER TABLE public.cheer_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read messages"
ON public.cheer_messages FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can send a message"
ON public.cheer_messages FOR INSERT TO anon, authenticated WITH CHECK (true);