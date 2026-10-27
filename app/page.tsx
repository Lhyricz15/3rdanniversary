"use client";

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Camera,
  FileText,
  Gift,
  Lock,
  Menu,
  Music2,
  Sparkles,
  X
} from 'lucide-react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

type MemoryType = 'image' | 'video' | 'audio' | 'file';

type MemoryItem = {
  id: string;
  name: string;
  type: MemoryType;
  caption: string;
  data: string;
  createdAt: string;
  storageMode: 'local' | 'private' | 'shared';
};

const navItems = [
  { label: 'Our Story', href: '#story' },
  { label: 'Anniversary Letter', href: '#letter' },
  { label: 'Our Memories', href: '#gallery' },
  { label: 'Secret Message', href: '#secret' },
  { label: 'Our Future', href: '#future' },
  { label: 'Final Surprise', href: '#finale' }
];

const storyChapters = [
  {
    title: 'The Kweikrom Camp Days',
    date: '17–22 October 2023',
    description:
      'This period became part of the beginning of our story and a meaningful chapter in the journey that followed. We did not invent a new history, but we honor the path that led us here.'
  },
  {
    title: 'The Day We Chose Us',
    date: '27 October 2023',
    description:
      'One date, two hearts, and a story that was only just opening its first page. This was the day we officially became a couple and began writing our own chapter together.'
  },
  {
    title: 'Three Years of Us',
    date: '27 October 2026',
    description:
      'Three years later, we stand in a beautiful place: grateful for shared growth, patient love, laughter, understanding, and the future still unfolding before us.'
  }
];

const futureCards = [
  {
    title: 'Keep choosing each other',
    text: 'Honest conversations, patience, respect, and the quiet decision to keep loving each other well.'
  },
  {
    title: 'Build a peaceful home',
    text: 'A future shaped by trust, kindness, understanding, and the comfort of being safe in each other’s presence.'
  },
  {
    title: 'Discover more of the world',
    text: 'New experiences, beautiful memories, and the joy of growing through life together.'
  },
  {
    title: 'Never lose our friendship',
    text: 'The deep companionship that keeps love steady, warm, and genuinely rooted in care.'
  }
];

const letterText = `My dearest Rosetta Nana Adwoa Fosimaa Amponsah,

Happy third anniversary, my love.

When I look back to the beginning of our story, I feel grateful that life brought us to the same chapter. Since 27 October 2023, we have been writing something that belongs to us, made of memories, conversations, lessons, laughter, and the little moments that mean more than words can explain.

I cannot promise that every day will be perfect, but I can promise to keep learning how to love you well: to listen, to respect you, to celebrate your wins, to stand beside you through hard days, and to keep choosing us with a sincere heart.

May the years ahead bring us deeper understanding, good health, peace, joy, growth, and countless reasons to smile at the life we are building together.

May we never become too busy to appreciate each other, too proud to say sorry, or too familiar to say thank you.

Thank you for being part of my life and for sharing this journey with me. Three years are a beautiful milestone, but in my heart they are also a reminder that there is still so much love to give, so much to discover, and so many memories waiting for us.

Today, tomorrow, and in all the chapters still to come, I hope we keep making room for kindness, friendship, patience, romance, and the joy of simply being us.

With all my love,

Benjamin.`;

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 text-center">
      <p className={`mb-3 text-xs font-medium uppercase tracking-[0.28em] ${light ? 'text-navy' : 'text-gold'}`}>
        {eyebrow}
      </p>
      <h2 className={`font-serif text-4xl md:text-5xl ${light ? 'text-navy' : 'text-white'}`}>{title}</h2>
      {subtitle ? (
        <p className={`mx-auto mt-4 max-w-2xl text-base md:text-lg ${light ? 'text-slate-700' : 'text-slate-200'}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function Home() {
  const [introClosed, setIntroClosed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretFeedback, setSecretFeedback] = useState('');
  const [giftOpened, setGiftOpened] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [celebrateBurst, setCelebrateBurst] = useState(0);
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem('benjamin-rosetta-memories');
    if (saved) {
      try {
        setMemoryItems(JSON.parse(saved));
      } catch {
        setMemoryItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (!memoryItems.length) {
      window.localStorage.removeItem('benjamin-rosetta-memories');
      return;
    }
    window.localStorage.setItem('benjamin-rosetta-memories', JSON.stringify(memoryItems));
  }, [memoryItems]);

  const siteUrl = useMemo(() => process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com', []);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(siteUrl);
      } else {
        const copyArea = document.createElement('textarea');
        copyArea.value = siteUrl;
        document.body.appendChild(copyArea);
        copyArea.select();
        document.execCommand('copy');
        document.body.removeChild(copyArea);
      }
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1400);
    } catch {
      setCopyState('failed');
      window.setTimeout(() => setCopyState('idle'), 1800);
    }
  };

  const validateSecret = () => {
    if (!secretKey.trim()) {
      setSecretFeedback('Please enter the key.');
      return;
    }

    if (secretKey.trim() === '27102023') {
      setSecretUnlocked(true);
      setSecretFeedback('Unlocked.');
      return;
    }

    setSecretUnlocked(false);
    setSecretFeedback('That key is not quite right yet.');
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    Promise.all(
      files.map(
        (file) =>
          new Promise<MemoryItem>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const type: MemoryType = file.type.startsWith('video/')
                ? 'video'
                : file.type.startsWith('audio/')
                  ? 'audio'
                  : file.type === 'application/pdf' || file.type.includes('document')
                    ? 'file'
                    : 'image';

              resolve({
                id: `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                name: file.name,
                type,
                caption: file.name,
                data: String(reader.result ?? ''),
                createdAt: new Date().toISOString(),
                storageMode: 'local'
              });
            };
            reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
            reader.readAsDataURL(file);
          })
      )
    )
      .then((items) => {
        setMemoryItems((current) => [...items, ...current]);
      })
      .catch(() => {
        window.alert('One of the files could not be processed. Please try another memory.');
      })
      .finally(() => {
        event.target.value = '';
      });
  };

  const updateMemoryCaption = (id: string, nextCaption: string) => {
    setMemoryItems((current) =>
      current.map((item) => (item.id === id ? { ...item, caption: nextCaption } : item))
    );
  };

  const deleteMemory = (id: string) => {
    setMemoryItems((current) => current.filter((item) => item.id !== id));
  };

  const localPreviewCount = memoryItems.filter((item) => item.storageMode === 'local').length;

  return (
    <div className="min-h-screen bg-navy text-white">
      <AnimatePresence>
        {!introClosed ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-50 grid place-items-center bg-[radial-gradient(circle_at_center,_rgba(36,86,164,0.95),_rgba(7,27,73,1))] px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-gold/60 bg-white/5 p-8 text-center shadow-glow backdrop-blur-md md:p-14"
            >
              <div className="mb-4 text-5xl text-gold">♡</div>
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-slate-200">A little surprise, made with love</p>
              <h1 className="mt-6 font-serif text-4xl leading-tight text-white md:text-6xl">
                BENJAMIN &amp; ROSETTA
              </h1>
              <p className="mt-4 font-serif text-xl text-silver md:text-2xl">OUR LITTLE FOREVER</p>
              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-gold">27 OCTOBER 2023 — 27 OCTOBER 2026</p>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-200">
                Three years of choosing each other, learning each other, and discovering that love can make an ordinary day feel like a beautiful beginning.
              </p>
              <button
                type="button"
                onClick={() => setIntroClosed(true)}
                className="mt-9 inline-flex items-center gap-2 rounded-full border border-gold bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-navy transition hover:scale-[1.02] hover:bg-[#f5d98c]"
              >
                Open your surprise <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#top" className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-white">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-gold/10 text-lg text-gold">B</span>
            <span className="hidden sm:inline">Benjamin &amp; Rosetta</span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm uppercase tracking-[0.18em] text-slate-200 transition hover:text-gold">
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen ? (
          <div className="border-t border-white/10 bg-navy/95 px-4 py-4 lg:hidden">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.15em] text-slate-100"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(36,86,164,0.75),_rgba(7,27,73,1)_55%)] px-4 pb-16 pt-16 md:px-8 md:pb-24">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            {[...Array(14)].map((_, index) => (
              <span
                key={index}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: `${(index % 3) + 2}px`,
                  height: `${(index % 3) + 2}px`,
                  left: `${(index * 13) % 100}%`,
                  top: `${(index * 17) % 100}%`,
                  boxShadow: '0 0 18px rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">Benjamin &amp; Rosetta</p>
            <h1 className="mt-6 font-serif text-5xl leading-[0.9] text-white md:text-7xl">
              Our little <span className="text-gold">forever</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 md:text-xl">
              Three years of choosing each other, learning each other, and discovering that love can make an ordinary day feel like a beautiful beginning.
            </p>
            <div className="mt-8 inline-flex items-center rounded-full border border-gold/60 bg-gold/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold">
              27 OCTOBER 2023 — 27 OCTOBER 2026
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
              <button
                type="button"
                onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-navy transition hover:scale-[1.02] hover:bg-[#f5d98c]"
              >
                Open your surprise <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-12 grid gap-4 text-left md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-xs uppercase tracking-[0.28em] text-gold">Our official date</p>
                <p className="mt-4 font-serif text-3xl text-white">27 October 2023</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-xs uppercase tracking-[0.28em] text-gold">Third anniversary</p>
                <p className="mt-4 font-serif text-3xl text-white">27 October 2026</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 text-navy md:px-8" id="story">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Our love story"
              title="Every forever has a beginning."
              subtitle="Three meaningful chapters shaped the journey we now celebrate — beginning in Kweikrom, becoming official on 27 October 2023, and arriving here at our third anniversary."
              light={true}
            />

            <div className="grid gap-6 md:grid-cols-3">
              {storyChapters.map((chapter, index) => (
                <motion.article
                  key={chapter.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="rounded-[2rem] border border-slate-200 bg-ivory p-6 shadow-soft"
                >
                  <div className="mb-5 inline-flex items-center rounded-full border border-gold/70 bg-gold/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-navy">
                    {chapter.date}
                  </div>
                  <h3 className="font-serif text-3xl text-navy">{chapter.title}</h3>
                  <p className="mt-5 leading-7 text-slate-700">{chapter.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f7fb] px-4 py-20 text-navy md:px-8" id="letter">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="A letter to Rosetta"
              title="To my Rosetta"
              subtitle="A sincere message from Benjamin to the woman who made this chapter so beautiful."
              light={true}
            />

            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-10 shadow-soft">
              <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                <span>Benjamin</span>
                <span>27 October 2026</span>
              </div>
              <div className="space-y-5 whitespace-pre-line text-base leading-8 text-slate-700 md:text-lg">
                {letterText}
              </div>
            </article>
          </div>
        </section>

        <section className="bg-navy px-4 py-20 md:px-8" id="gallery">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Our little corner of forever"
              title="Memories live here."
              subtitle="A private, personal space for the moments that tell our story. Local previews are kept in this browser, while any persistent or shared storage remains clearly marked and handled only when configured."
            />

            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-gold/50 bg-gold/10 p-5 text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">Local preview</p>
                <p className="mt-4 text-3xl font-semibold text-white">{localPreviewCount}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-200">Private upload</p>
                <p className="mt-4 text-base text-slate-200">Configured only with a secure backend</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-200">Shared memory</p>
                <p className="mt-4 text-base text-slate-200">Requires Supabase login and policies</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">Add a memory</p>
                  <p className="mt-2 text-slate-200">Choose from images, videos, voice notes, songs, PDFs, or letters.</p>
                </div>
                <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gold bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:bg-[#f5d98c]">
                  Upload memory
                  <input type="file" accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt" multiple onChange={handleUpload} className="hidden" />
                </label>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {memoryItems.length ? (
                  memoryItems.map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1f52] p-3">
                      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-gold">
                        <span>{item.storageMode}</span>
                        <span>{item.type}</span>
                      </div>

                      {item.type === 'image' ? (
                        <img src={item.data} alt={item.caption} className="h-52 w-full rounded-xl object-cover" />
                      ) : item.type === 'video' ? (
                        <video src={item.data} controls className="h-52 w-full rounded-xl bg-black object-cover" />
                      ) : item.type === 'audio' ? (
                        <div className="flex h-52 items-center justify-center rounded-xl bg-white/5">
                          <Music2 size={42} className="text-gold" />
                        </div>
                      ) : (
                        <div className="flex h-52 items-center justify-center rounded-xl bg-white/5">
                          <FileText size={42} className="text-gold" />
                        </div>
                      )}

                      <label className="mt-4 block text-xs uppercase tracking-[0.18em] text-slate-300">Caption</label>
                      <input
                        value={item.caption}
                        onChange={(event) => updateMemoryCaption(item.id, event.target.value)}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#112a63] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400"
                        placeholder="Write a caption"
                      />

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                        <button
                          type="button"
                          onClick={() => deleteMemory(item.id)}
                          className="rounded-full border border-red-400/40 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-red-200 transition hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full rounded-[1.5rem] border border-dashed border-slate-500 bg-[#10285e] p-8 text-center text-slate-200">
                    <Camera className="mx-auto mb-4 text-gold" size={42} />
                    <p className="text-xl font-medium text-white">No memories yet.</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Upload your first memory, and it will stay here in local preview mode until Supabase is configured for private shared storage.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 text-navy md:px-8" id="secret">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="A little secret awaits"
              title="Some words are sweeter when you know the little key."
              subtitle="This is a playful, date-based reveal — not a true security barrier. It can be replaced with a real server-validated secret later if desired."
              light={true}
            />

            <div className="rounded-[2rem] border border-slate-200 bg-ivory p-6 md:p-8 shadow-soft">
              <label className="mb-2 block text-xs uppercase tracking-[0.28em] text-navy">Enter the date key</label>
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  inputMode="numeric"
                  value={secretKey}
                  onChange={(event) => setSecretKey(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      validateSecret();
                    }
                  }}
                  placeholder="27102023"
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg text-navy outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={validateSecret}
                  className="rounded-full bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-sapphire"
                >
                  Unlock
                </button>
              </div>

              {secretFeedback ? (
                <p className={`mt-4 text-sm ${secretUnlocked ? 'text-emerald-600' : 'text-slate-700'}`}>
                  {secretFeedback}
                </p>
              ) : null}

              <AnimatePresence>
                {secretUnlocked ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 rounded-[1.5rem] border border-gold/50 bg-white p-6"
                  >
                    <div className="mb-4 flex items-center gap-3 text-gold">
                      <Lock size={20} />
                      <span className="text-xs uppercase tracking-[0.28em]">Secret unlocked</span>
                    </div>
                    <p className="font-serif text-xl leading-8 text-navy md:text-2xl">
                      “My favourite place is beside you. No matter how many pages life gives us, I hope we keep finding our way back to the simple joy of being on the same team. You are not just part of my story; you are one of the reasons it is beautiful.”
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="bg-[#edf2fb] px-4 py-20 text-navy md:px-8" id="future">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="The chapters still unwritten"
              title="To all the tomorrows."
              subtitle="A love story is never only about the past. It is also about the future we keep choosing, together."
              light={true}
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {futureCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-serif text-2xl text-navy">{card.title}</h3>
                  <p className="mt-4 leading-7 text-slate-700">{card.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy px-4 py-20 md:px-8" id="gift">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="A little surprise"
              title="The gift reveal."
              subtitle="This section honors the feeling of a carefully wrapped promise — a heartfelt message, a moment of pause, and an invitation to hold the love between us just a little longer."
            />

            <div className="rounded-[2rem] border border-gold/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-glow md:p-10">
              <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-gold/50 bg-ivory p-8 text-center text-navy">
                <Gift size={44} className="mx-auto text-gold" />
                <p className="mt-6 text-xs uppercase tracking-[0.28em] text-navy/70">A promise for Rosetta</p>
                <h3 className="mt-5 font-serif text-4xl leading-snug text-navy">For the woman I love.</h3>
                <p className="mt-5 text-base leading-7 text-slate-700">
                  I do not need a perfect day to know that my heart is grateful for you. I just need this moment, and the quiet certainty that the person across from me is a gift I will keep choosing.
                </p>
                <button
                  type="button"
                  onClick={() => setGiftOpened(true)}
                  className="mt-8 rounded-full bg-navy px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-sapphire"
                >
                  Reveal your gift
                </button>

                <AnimatePresence>
                  {giftOpened ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-8 rounded-[1.5rem] border border-gold/50 bg-white p-6 text-left"
                    >
                      <p className="font-serif text-2xl text-navy">My dearest Rosetta,</p>
                      <p className="mt-4 leading-8 text-slate-700">
                        Thank you for being the soft place in my heart, the steady encouragement in my life, and the beautiful beginning of a story I want to keep living with you. You are my favourite chapter and my best future. Happy third anniversary, my love.
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[radial-gradient(circle_at_top,_rgba(36,86,164,0.8),_rgba(7,27,73,1)_55%)] px-4 py-20 md:px-8" id="finale">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">A forever in progress</p>
            <h2 className="mt-6 font-serif text-5xl text-white md:text-6xl">
              THREE YEARS DOWN.<br />
              <span className="text-gold">A LIFETIME OF MEMORIES TO GO.</span>
            </h2>
            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-slate-200">27 OCTOBER 2026 — OUR THIRD ANNIVERSARY</p>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-200">
              Rosetta, my heart is grateful for the story we have lived so far, and full of hope for every chapter still waiting to be written. Thank you for being my favourite person, my safe place, and the beautiful beginning of all my future hopes.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
              <button
                type="button"
                onClick={() => {
                  setCelebrateBurst((current) => current + 1);
                }}
                className="rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-navy transition hover:bg-[#f5d98c]"
              >
                Hold this moment ♡
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-white/10"
              >
                {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy link'}
              </button>
            </div>

            <AnimatePresence>
              {celebrateBurst > 0 ? (
                <motion.div
                  key={celebrateBurst}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none fixed inset-0 z-40"
                >
                  {[...Array(22)].map((_, index) => (
                    <motion.span
                      key={index}
                      initial={{ x: '50vw', y: '50vh', opacity: 0, scale: 0.2 }}
                      animate={{
                        x: `${(index % 5) * 18 - 30}vw`,
                        y: `${Math.floor(index / 5) * -14 - 10}vh`,
                        opacity: [0, 1, 0],
                        scale: [0.2, 1, 0.5],
                        rotate: index * 28
                      }}
                      transition={{ duration: 1.8, ease: 'easeOut', delay: index * 0.04 }}
                      className="absolute left-1/2 top-1/2 text-3xl text-gold"
                    >
                      ✦
                    </motion.span>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#071430] px-4 py-8 text-center text-sm text-slate-300 md:px-8">
        Made with love for Benjamin &amp; Rosetta • 27 October 2023 — 27 October 2026
      </footer>
    </div>
  );
}
