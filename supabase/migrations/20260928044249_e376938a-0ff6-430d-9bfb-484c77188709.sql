CREATE TABLE IF NOT EXISTS public.cheer_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient TEXT NOT NULL,
  message TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '💛',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.cheer_messages TO anon;
GRANT SELECT, INSERT ON public.cheer_messages TO authenticated;
GRANT ALL ON public.cheer_messages TO service_role;
ALTER TABLE public.cheer_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read cheer messages" ON public.cheer_messages FOR SELECT USING (true);
CREATE POLICY "Anyone can write cheer messages" ON public.cheer_messages FOR INSERT WITH CHECK (true);