import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Youtube, Instagram, Menu, X, Mail, ArrowRight, ChevronRight,
  Film, Search, Feather, Sparkles, Compass, Music2, MapPin
} from 'lucide-react';

/* ---------------------------------------------------------------
   FONTS
--------------------------------------------------------------- */
function useCinemaFonts() {
  useEffect(() => {
    const id = 'cinesynapse-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital@1&display=swap';
    document.head.appendChild(link);
  }, []);
}

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };
const sans = { fontFamily: "'Inter', system-ui, sans-serif" };

/* ---------------------------------------------------------------
   FILM GRAIN
--------------------------------------------------------------- */
const grainSvg =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
  );

function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage: `url("${grainSvg}")`,
        opacity: 0.05,
        mixBlendMode: 'overlay',
      }}
    />
  );
}

/* ---------------------------------------------------------------
   REVEAL ON SCROLL
--------------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   SECTION HEADING
--------------------------------------------------------------- */
function SectionHeading({ eyebrow, title, align = 'left', light }) {
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <div
        className={`flex items-center gap-3 mb-5 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="w-8 h-px" style={{ backgroundColor: '#c9974a' }} />
        <span
          className="text-xs"
          style={{ color: '#c9974a', letterSpacing: '0.35em' }}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className="text-4xl md:text-6xl leading-tight"
        style={{ ...serif, color: light ? '#0a0908' : '#f6ecd9' }}
      >
        {title}
      </h2>
    </Reveal>
  );
}

/* ---------------------------------------------------------------
   INTRO SEQUENCE — film countdown leader
--------------------------------------------------------------- */
function IntroSequence({ onDone }) {
  const [count, setCount] = useState(3);
  useEffect(() => {
    if (count > 1) {
      const t = setTimeout(() => setCount((c) => c - 1), 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 850);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#000' }}
    >
      <style>{`
        @keyframes csSpin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @keyframes csFlicker { 0%,100%{opacity:1} 50%{opacity:.86} }
        .cs-sweep { animation: csSpin 0.65s linear infinite; }
        .cs-flicker { animation: csFlicker 0.15s steps(2) infinite; }
      `}</style>
      <div
        className="cs-flicker relative flex items-center justify-center rounded-full"
        style={{
          width: 140,
          height: 140,
          border: '1px solid rgba(201,151,74,0.35)',
        }}
      >
        <div
          className="cs-sweep absolute inset-0 rounded-full"
          style={{ borderTop: '1px solid #c9974a' }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 100,
            height: 100,
            border: '1px solid rgba(201,151,74,0.2)',
          }}
        />
        <span className="text-5xl" style={{ ...serif, color: '#c9974a' }}>
          {count}
        </span>
      </div>
      <p
        className="mt-10 text-xs"
        style={{ color: 'rgba(246,236,217,0.4)', letterSpacing: '0.4em' }}
      >
        CINESYNAPSE STUDIO
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------
   NAVBAR
--------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Home', '#home'],
    ['Stories', '#stories'],
    ['About', '#about'],
    ['Blog', '#blog'],
    ['Contact', '#contact'],
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(10,9,8,0.92)' : 'transparent',
        borderBottom: scrolled
          ? '1px solid rgba(201,151,74,0.15)'
          : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div
        className={`max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <a
          href="#home"
          className="text-lg md:text-xl flex items-baseline gap-2"
          style={{ ...serif, color: '#f6ecd9' }}
        >
          Cine<span style={{ color: '#c9974a' }}>Synapse</span>
          <span
            className="hidden sm:inline text-xs"
            style={{ ...sans, color: 'rgba(246,236,217,0.5)', letterSpacing: '0.3em' }}
          >
            STUDIO
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm relative group"
              style={{ ...sans, color: 'rgba(246,236,217,0.75)' }}
            >
              {label}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: '#c9974a' }}
              />
            </a>
          ))}
          <a
            href="#showreel"
            className="px-5 py-2 text-sm transition-colors duration-300"
            style={{
              ...sans,
              border: '1px solid #c9974a',
              color: '#c9974a',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c9974a';
              e.currentTarget.style.color = '#0a0908';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#c9974a';
            }}
          >
            Watch Now
          </a>
        </div>

        <button
          className="md:hidden"
          style={{ color: '#f6ecd9' }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5"
          style={{
            backgroundColor: 'rgba(10,9,8,0.98)',
            borderTop: '1px solid rgba(201,151,74,0.15)',
          }}
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{ ...sans, color: 'rgba(246,236,217,0.85)' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#showreel"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-2 text-center text-sm"
            style={{ ...sans, border: '1px solid #c9974a', color: '#c9974a' }}
          >
            Watch Now
          </a>
        </div>
      )}
    </nav>
  );
}

/* ---------------------------------------------------------------
   HERO
--------------------------------------------------------------- */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 3600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-end overflow-hidden"
      style={{ backgroundColor: '#0a0908' }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(160,120,55,0.16), transparent 65%), linear-gradient(180deg,#0a0908 0%,#171009 45%,#0a0908 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, rgba(212,175,110,0.035) 0px, transparent 2px, transparent 46px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, #0a0908 0%, rgba(10,9,8,0.55) 35%, rgba(10,9,8,0.35) 100%)',
          }}
        />
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-32 w-full transition-all duration-1000"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <p
          className="text-xs md:text-sm mb-6 flex items-center gap-3"
          style={{ ...sans, color: '#c9974a', letterSpacing: '0.4em' }}
        >
          <span className="w-8 h-px inline-block" style={{ backgroundColor: '#c9974a' }} />
          A CINESYNAPSE PRODUCTION
        </p>
        <h1
          className="text-5xl sm:text-6xl md:text-8xl leading-[0.95] mb-6"
          style={{ ...serif, color: '#f6ecd9' }}
        >
          CineSynapse
          <br />
          <span style={{ color: '#c9974a', fontStyle: 'italic' }}>Studio</span>
        </h1>
        <p
          className="text-xl md:text-2xl mb-6"
          style={{ ...serif, fontStyle: 'italic', color: 'rgba(246,236,217,0.85)' }}
        >
          History, Reimagined.
        </p>
        <p
          className="max-w-xl text-base md:text-lg leading-relaxed mb-10"
          style={{ ...sans, color: 'rgba(246,236,217,0.55)' }}
        >
          We transform history, stories, and forgotten moments into cinematic
          experiences that make the past feel alive.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#stories"
            className="px-8 py-4 text-sm font-medium transition-colors duration-300"
            style={{ ...sans, backgroundColor: '#c9974a', color: '#0a0908' }}
          >
            Explore Our Stories
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-sm flex items-center gap-2 transition-colors duration-300"
            style={{
              ...sans,
              border: '1px solid rgba(246,236,217,0.3)',
              color: '#f6ecd9',
            }}
          >
            <Youtube size={18} /> Watch on YouTube
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-10 right-8 hidden md:flex flex-col items-center gap-3"
        style={{ color: 'rgba(246,236,217,0.35)' }}
      >
        <span
          className="w-px h-16"
          style={{ background: 'linear-gradient(180deg,#c9974a,transparent)' }}
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SOCIAL LINKS
--------------------------------------------------------------- */
const SOCIAL_LINKS = {
  youtube: 'https://www.youtube.com/channel/UCIIfTE19V3Pg3jHXmYV_w9Q',
  tiktok: 'https://www.tiktok.com/@cinesynapseai',
  instagram: '#',
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzepgzpo';

/* ---------------------------------------------------------------
   DATA
--------------------------------------------------------------- */
const featuredStories = [
  {
    category: 'EMPIRES',
    title: 'The Rise of Mansa Musa',
    description:
      "Africa's richest emperor and one of history's most fascinating rulers.",
    gradient: 'linear-gradient(160deg,#2c1c0d,#0d0a07)',
  },
  {
    category: 'MARITIME',
    title: 'Titanic: The Final Voyage',
    description:
      'The story of the ship, the people aboard it, and the night history changed forever.',
    gradient: 'linear-gradient(160deg,#0c1620,#050a0f)',
    thumbnail: 'https://img.youtube.com/vi/9y8sBHLr9bY/hqdefault.jpg',
    watchUrl: 'https://youtu.be/9y8sBHLr9bY?si=tpFr3Oa4XmB5TDwY',
  },
  {
    category: 'CIVILIZATIONS',
    title: 'Ancient Civilizations',
    description: 'Stories of civilizations that shaped the world.',
    gradient: 'linear-gradient(160deg,#1d160a,#080604)',
  },
  {
    category: 'UNTOLD AFRICA',
    title: 'Untold Africa',
    description:
      'Exploring forgotten people, kingdoms, inventions, and events from African history.',
    gradient: 'linear-gradient(160deg,#231508,#0a0603)',
  },
];

const youtubeVideos = [
  { title: 'The Man Who Was Richer Than Kings', length: '14:32' },
  { title: 'The Night the Unsinkable Sank', length: '21:07' },
  { title: 'Kingdoms Lost to Time', length: '18:45' },
  { title: 'The City That Disappeared', length: '12:56' },
];

const shortVideos = [
  { title: 'The Man Who Was Richer Than Kings', url: null },
  {
    title: 'What Really Happened on the Titanic?',
    url: 'https://www.tiktok.com/@cinesynapseai/video/7672470364508802321',
  },
  { title: 'The African Empire You Were Never Taught About', url: null },
  { title: 'A City That Disappeared From History', url: null },
];

const historyBlogPosts = [
  {
    date: 'AUG 02, 2026',
    category: 'Empires',
    title: 'The Wealth of Mansa Musa',
    description:
      'How one pilgrimage to Mecca reshaped the gold economies of the medieval world.',
    readTime: '6 min read',
    summary:
      'This article traces how Mansa Musa turned a single journey into a geopolitical event, influencing trade, wealth, and the global perception of West African power.',
    paragraphs: [
      'When Mansa Musa traveled to Mecca in the 14th century, he did more than make a pilgrimage. He carried the image of an empire that was wealthy, organized, and connected to the wider world.',
      'His journey moved through trade routes that linked West Africa to North Africa and the Mediterranean. Gold, salt, scholarship, and diplomacy all traveled along those same networks, proving that African history was never isolated or small.',
      'The story matters because it challenges a common mistake: assuming power only existed in places written about the most. Mansa Musa’s legacy reminds us that history is full of civilizations whose influence stretched far beyond the pages they were given.',
    ],
    takeaway:
      'The best history stories are not just about famous names. They are about the systems, choices, and connections that shaped the world.',
  },
  {
    date: 'JUL 21, 2026',
    category: 'Mysteries',
    title: '10 Historical Mysteries That Still Fascinate Us',
    description:
      'From lost cities to vanished expeditions, the questions history has never answered.',
    readTime: '5 min read',
    summary:
      'From Atlantis to lost expeditions, this piece explores why unresolved stories continue to shape the way we imagine the past.',
    paragraphs: [
      'People are drawn to mysteries because they leave space for imagination. A missing city or an unexplained disappearance becomes more than a fact pattern; it becomes a question that outlives the era in which it began.',
      'Historical mysteries endure because they sit at the border between evidence and possibility. New discoveries can sharpen the picture, but they rarely remove all uncertainty, which is part of what makes the past feel alive.',
      'The value of these stories is not just in solving them. It is in what they reveal about human ambition, fear, exploration, and the limits of what records can preserve.',
    ],
    takeaway:
      'Mystery is not a weakness in history. Sometimes it is the doorway that keeps people reading.',
  },
  {
    date: 'JUL 09, 2026',
    category: 'Africa',
    title: 'Forgotten African Kingdoms',
    description:
      'The dynasties, trade routes, and cities written out of the mainstream story.',
    readTime: '7 min read',
    summary:
      'A look at the kingdoms, merchants, and cities that powered African history long before colonial narratives narrowed the story.',
    paragraphs: [
      'African kingdoms were not side notes to world history. They were centers of trade, governance, learning, and architecture, with networks that linked oceans, deserts, and inland cities.',
      'From Mali to Great Zimbabwe, these societies built wealth through administration and exchange, not chaos or isolation. Their stories show how power can be rooted in culture, commerce, and long-term planning.',
      'Remembering them is important because history shapes identity. When we recover these stories, we recover a fuller and more accurate picture of human achievement.',
    ],
    takeaway:
      'A history worth reading is one that makes room for every civilization that helped build the world we live in.',
  },
  {
    date: 'JUN 28, 2026',
    category: 'Maritime',
    title: 'How Titanic Became a Legend',
    description:
      'The wreck, the myths, and the century-long fascination with a single night at sea.',
    readTime: '4 min read',
    summary:
      'Why one disaster became a cultural legend: the ship, the passengers, the media frenzy, and the myths that followed.',
    paragraphs: [
      'Titanic became legendary not only because it sank, but because it exposed the fragility of human confidence. It was built to symbolize progress, yet its fate reminded the world that innovation never removes risk.',
      'The ship’s story grew through newspaper coverage, survivor testimony, later films, and public fascination with class, luxury, and tragedy. Over time, the event became both a disaster narrative and a cultural mirror.',
      'That is why Titanic still matters: it is not simply a shipwreck. It is a story about ambition, inequality, memory, and the way societies turn tragedy into meaning.',
    ],
    takeaway:
      'Some events last because they help people understand themselves, not just the past.',
  },
  {
    date: 'JUN 14, 2026',
    category: 'Leadership',
    title: 'The Greatest Leaders of the Ancient World',
    description:
      'What separated the rulers we still study from the ones history forgot.',
    readTime: '8 min read',
    summary:
      'This article compares leadership, strategy, and legacy across ancient civilizations to uncover what makes a ruler endure in memory.',
    paragraphs: [
      'The rulers history remembers are rarely the ones with the biggest armies alone. They are the ones who understood timing, symbolism, infrastructure, and how to turn power into something that lasted.',
      'Ancient leadership was built on more than conquest. It relied on administration, diplomacy, public trust, and the ability to shape a story people believed in.',
      'That is why some rulers remain studied while others fade. Lasting leadership leaves behind institutions, records, and ideas that continue to matter after the crown is gone.',
    ],
    takeaway:
      'Real leadership is measured by what survives after the moment of victory passes.',
  },
];

/* ---------------------------------------------------------------
   STORY CARD
--------------------------------------------------------------- */
function StoryCard({ story, index }) {
  const [ref, visible] = useReveal();
  const WatchAction = story.watchUrl ? 'a' : 'button';
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden transition-all duration-700"
      style={{
        border: '1px solid rgba(201,151,74,0.15)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative h-[420px] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={
            story.thumbnail
              ? {
                  backgroundImage: `url("${story.thumbnail}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : { background: story.gradient }
          }
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(100deg, rgba(212,175,110,0.05) 0px, transparent 1px, transparent 60px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, #0a0908 5%, rgba(10,9,8,0.25) 45%, transparent 75%)',
          }}
        />
        <div className="absolute top-5 left-5">
          <span
            className="text-xs px-3 py-1"
            style={{
              ...sans,
              color: '#c9974a',
              border: '1px solid rgba(201,151,74,0.4)',
              letterSpacing: '0.25em',
            }}
          >
            {story.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl md:text-3xl mb-2" style={{ ...serif, color: '#f6ecd9' }}>
            {story.title}
          </h3>
          <p
            className="text-sm mb-4 leading-relaxed"
            style={{ ...sans, color: 'rgba(246,236,217,0.55)' }}
          >
            {story.description}
          </p>
          <WatchAction
            {...(story.watchUrl
              ? { href: story.watchUrl, target: '_blank', rel: 'noopener noreferrer' }
              : { type: 'button' })}
            className="inline-flex items-center gap-2 text-sm"
            style={{ ...sans, color: '#c9974a' }}
          >
            Watch Story{' '}
            <Play
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </WatchAction>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   FEATURED STORIES
--------------------------------------------------------------- */
function FeaturedStories() {
  return (
    <section id="stories" className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0a0908' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="FEATURED STORIES" title="Stories Worth Retelling." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {featuredStories.map((s, i) => (
            <StoryCard key={s.title} story={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   ABOUT
--------------------------------------------------------------- */
function About() {
  const items = [
    'Historical research',
    'Cinematic storytelling',
    'AI-assisted visual production',
    'Narration',
    'Motion graphics',
    'Documentary-style editing',
  ];
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0d0b09' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div
            className="relative h-[420px] overflow-hidden"
            style={{
              background:
                'linear-gradient(155deg,#1c130a 0%,#0a0806 100%)',
              border: '1px solid rgba(201,151,74,0.15)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(70deg, rgba(212,175,110,0.05) 0px, transparent 1.5px, transparent 50px)',
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ color: 'rgba(201,151,74,0.5)' }}
            >
              <Film size={72} strokeWidth={0.75} />
            </div>
            <div
              className="absolute bottom-6 left-6 text-xs"
              style={{ ...sans, color: 'rgba(246,236,217,0.4)', letterSpacing: '0.3em' }}
            >
              EST. CINESYNAPSE STUDIO
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px" style={{ backgroundColor: '#c9974a' }} />
            <span className="text-xs" style={{ color: '#c9974a', letterSpacing: '0.35em' }}>
              ABOUT CINESYNAPSE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl leading-tight mb-6" style={{ ...serif, color: '#f6ecd9' }}>
            Stories That Deserve
            <br />
            To Be Remembered.
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{ ...sans, color: 'rgba(246,236,217,0.55)' }}
          >
            CineSynapse Studio turns historical events into engaging visual
            stories for modern audiences &mdash; combining rigorous research
            with the craft of cinema.
          </p>
          <ul className="grid grid-cols-2 gap-4">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm"
                style={{ ...sans, color: 'rgba(246,236,217,0.7)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#c9974a' }} />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   APPROACH
--------------------------------------------------------------- */
const processSteps = [
  { n: '01', title: 'Research', icon: Search, desc: 'We uncover the people, events, and details behind the story.' },
  { n: '02', title: 'Story', icon: Feather, desc: 'We transform historical information into compelling narratives.' },
  { n: '03', title: 'Visualize', icon: Sparkles, desc: 'We use cinematic visuals, AI-assisted production, animation, and archival-inspired imagery.' },
  { n: '04', title: 'Experience', icon: Compass, desc: "The final story becomes an immersive documentary designed for today's audience." },
];

function Approach() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0a0908' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="OUR APPROACH" title="From History to Cinema" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-16">
          {processSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 120}>
              <div
                className="pt-6"
                style={{ borderTop: '1px solid rgba(201,151,74,0.25)' }}
              >
                <span className="text-sm" style={{ ...serif, color: 'rgba(201,151,74,0.55)' }}>
                  {step.n}
                </span>
                <step.icon size={26} strokeWidth={1} style={{ color: '#c9974a', margin: '18px 0' }} />
                <h3 className="text-xl mb-3" style={{ ...serif, color: '#f6ecd9' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ ...sans, color: 'rgba(246,236,217,0.5)' }}>
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SHOWREEL
--------------------------------------------------------------- */
function Showreel() {
  const [ref, visible] = useReveal();
  return (
    <section id="showreel" className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: '#050403' }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(160,120,55,0.12), transparent 70%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto text-center" ref={ref}>
        <p className="text-xs mb-6" style={{ ...sans, color: '#c9974a', letterSpacing: '0.4em' }}>
          THE CINESYNAPSE SHOWREEL
        </p>
        <h2
          className="text-3xl md:text-5xl mb-14 transition-all duration-1000"
          style={{
            ...serif,
            fontStyle: 'italic',
            color: '#f6ecd9',
            opacity: visible ? 1 : 0,
          }}
        >
          Every frame tells a story.
        </h2>
        <div
          className="relative mx-auto max-w-4xl h-[300px] md:h-[480px] overflow-hidden"
          style={{ border: '1px solid rgba(201,151,74,0.2)' }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(160deg,#181008,#050403 70%)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(120deg, rgba(212,175,110,0.04) 0px, transparent 2px, transparent 44px)',
            }}
          />
          <button
            className="absolute inset-0 flex items-center justify-center group"
            aria-label="Play showreel"
          >
            <span
              className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
              style={{
                width: 84,
                height: 84,
                border: '1px solid #c9974a',
                backgroundColor: 'rgba(10,9,8,0.5)',
              }}
            >
              <Play size={28} style={{ color: '#c9974a' }} fill="#c9974a" />
            </span>
          </button>
          <div
            className="absolute bottom-6 left-6 text-xs"
            style={{ ...sans, color: 'rgba(246,236,217,0.4)', letterSpacing: '0.3em' }}
          >
            SHOWREEL &middot; 02:14
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   YOUTUBE SECTION
--------------------------------------------------------------- */
function VideoCard({ video, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden transition-all duration-700"
      style={{
        border: '1px solid rgba(201,151,74,0.15)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 90}ms`,
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{
            background: `linear-gradient(150deg, hsl(${28 + index * 6},45%,${14 + index * 2}%), #0a0806)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ color: 'rgba(246,236,217,0.85)' }}>
          <span
            className="flex items-center justify-center rounded-full"
            style={{ width: 48, height: 48, border: '1px solid rgba(246,236,217,0.5)' }}
          >
            <Play size={16} fill="#f6ecd9" />
          </span>
        </div>
        <span
          className="absolute bottom-2 right-2 text-xs px-2 py-0.5"
          style={{ ...sans, backgroundColor: 'rgba(10,9,8,0.7)', color: '#f6ecd9' }}
        >
          {video.length}
        </span>
      </div>
      <div className="p-4">
        <p className="text-sm leading-snug" style={{ ...sans, color: 'rgba(246,236,217,0.85)' }}>
          {video.title}
        </p>
      </div>
    </div>
  );
}

function YouTubeSection() {
  return (
    <section id="youtube" className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0a0908' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <SectionHeading eyebrow="ON YOUTUBE" title="Watch CineSynapse" />
          <Reveal delay={150}>
            <p className="max-w-sm text-sm leading-relaxed mb-6" style={{ ...sans, color: 'rgba(246,236,217,0.5)' }}>
              Dive deeper into history through cinematic documentaries, forgotten
              stories, legendary figures, and moments that changed the world.
            </p>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm"
              style={{ ...sans, color: '#c9974a' }}
            >
              Visit YouTube <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {youtubeVideos.map((v, i) => (
            <VideoCard key={v.title} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SHORTS SECTION
--------------------------------------------------------------- */
function ShortCard({ title, url, index }) {
  const [ref, visible] = useReveal();
  const Wrapper = url ? 'a' : 'div';
  const wrapperProps = url
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <Wrapper
      ref={ref}
      {...wrapperProps}
      className="group relative overflow-hidden flex-shrink-0 block transition-all duration-700"
      style={{
        width: 200,
        height: 340,
        border: '1px solid rgba(201,151,74,0.18)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`,
        cursor: url ? 'pointer' : 'default',
      }}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        style={{
          background: `linear-gradient(200deg, hsl(${32 + index * 10},40%,${13 + index}%), #060504)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(0deg,#0a0908 10%,transparent 55%)' }}
      />
      <div className="absolute top-3 left-3" style={{ color: '#c9974a' }}>
        <Music2 size={16} />
      </div>
      {url && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: 'rgba(10,9,8,0.35)' }}
        >
          <span
            className="flex items-center justify-center rounded-full"
            style={{ width: 56, height: 56, border: '1px solid #c9974a', backgroundColor: 'rgba(10,9,8,0.6)' }}
          >
            <Play size={20} style={{ color: '#c9974a' }} fill="#c9974a" />
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-sm leading-snug mb-1" style={{ ...serif, color: '#f6ecd9' }}>
          {title}
        </p>
        <span
          className="text-xs"
          style={{ ...sans, color: url ? '#c9974a' : 'rgba(246,236,217,0.35)', letterSpacing: '0.15em' }}
        >
          {url ? 'WATCH ON TIKTOK' : 'COMING SOON'}
        </span>
      </div>
    </Wrapper>
  );
}

function ShortsSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0d0b09' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="SHORT-FORM" title="History in Seconds." />
        <Reveal delay={150}>
          <p className="max-w-xl text-sm md:text-base leading-relaxed mt-6 mb-12" style={{ ...sans, color: 'rgba(246,236,217,0.5)' }}>
            CineSynapse also creates short cinematic stories designed for
            TikTok, YouTube Shorts, and other social platforms.
          </p>
        </Reveal>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {shortVideos.map((short, i) => (
            <ShortCard key={short.title} title={short.title} url={short.url} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   WHY CINESYNAPSE
--------------------------------------------------------------- */
const whyFeatures = [
  { title: 'Cinematic Storytelling', desc: 'History presented like a film, not a textbook.', icon: Film },
  { title: 'Research-Driven', desc: 'Stories built around historical context and credible information.', icon: Search },
  { title: 'Immersive Visuals', desc: 'Cinematic AI-assisted imagery, animation, and visual effects.', icon: Sparkles },
  { title: 'Made for Modern Audiences', desc: 'Long-form documentaries and short-form content designed for today\u2019s viewers.', icon: Compass },
];

function WhySection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0a0908' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="WHY CINESYNAPSE" title="Why CineSynapse?" align="center" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {whyFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 120} className="text-center">
              <div className="flex justify-center mb-5">
                <f.icon size={30} strokeWidth={1} style={{ color: '#c9974a' }} />
              </div>
              <h3 className="text-lg mb-3" style={{ ...serif, color: '#f6ecd9' }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ ...sans, color: 'rgba(246,236,217,0.5)' }}>
                {f.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   JOURNAL
--------------------------------------------------------------- */
function BlogCard({ post, index, onOpen }) {
  const [ref, visible] = useReveal();
  return (
    <button
      type="button"
      ref={ref}
      onClick={() => onOpen(post)}
      className="group overflow-hidden transition-all duration-700 text-left cursor-pointer"
      style={{
        border: '1px solid rgba(201,151,74,0.15)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 90}ms`,
        backgroundColor: 'transparent',
        width: '100%',
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{
            background: `linear-gradient(155deg, hsl(${30 + index * 8},38%,${13 + index}%), #080604)`,
          }}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 text-xs" style={{ ...sans, color: 'rgba(246,236,217,0.4)' }}>
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#c9974a' }} />
          <span style={{ color: '#c9974a' }}>{post.category}</span>
          <span className="ml-auto" style={{ color: 'rgba(246,236,217,0.3)' }}>{post.readTime}</span>
        </div>
        <h3 className="text-xl mb-2" style={{ ...serif, color: '#f6ecd9' }}>
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ ...sans, color: 'rgba(246,236,217,0.5)' }}>
          {post.description}
        </p>
        <span className="inline-flex items-center gap-1 text-sm" style={{ ...sans, color: '#c9974a' }}>
          Read Article <ChevronRight size={14} />
        </span>
      </div>
    </button>
  );
}

function HistoryBlog() {
  const [activePost, setActivePost] = useState(null);
  const featuredPost = historyBlogPosts[0];
  const recentPosts = historyBlogPosts.slice(1);
  return (
    <section id="blog" className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0d0b09' }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="HISTORY BLOG" title="Stories From the Archive." />
        <p className="max-w-2xl text-sm md:text-base leading-relaxed mt-6" style={{ ...sans, color: 'rgba(246,236,217,0.5)' }}>
          Deep dives into the people, events, and forgotten details behind the stories we bring to life on screen.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-14">
          <Reveal className="lg:col-span-5">
            <div
              className="h-full p-8 flex flex-col justify-between"
              style={{
                border: '1px solid rgba(201,151,74,0.18)',
                background: 'linear-gradient(155deg,#1b1209 0%,#0a0806 100%)',
              }}
            >
              <div>
                <p className="text-xs mb-4" style={{ ...sans, color: '#c9974a', letterSpacing: '0.35em' }}>
                  FEATURED ARTICLE
                </p>
                <h3 className="text-3xl md:text-4xl leading-tight mb-5" style={{ ...serif, color: '#f6ecd9' }}>
                  {featuredPost.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed mb-6" style={{ ...sans, color: 'rgba(246,236,217,0.55)' }}>
                  {featuredPost.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs" style={{ ...sans, color: 'rgba(246,236,217,0.4)' }}>
                <span>{featuredPost.date}</span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#c9974a' }} />
                <span>{featuredPost.category}</span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#c9974a' }} />
                <span>{featuredPost.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setActivePost(featuredPost)}
                className="inline-flex items-center gap-2 mt-8 text-sm"
                style={{ ...sans, color: '#c9974a' }}
              >
                Read Full Article <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recentPosts.map((post, i) => (
              <BlogCard key={post.title} post={post} index={i} onOpen={setActivePost} />
            ))}
          </div>
        </div>
      </div>

      {activePost && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(10,9,8,0.88)' }}
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative max-w-3xl w-full p-8 md:p-10"
            style={{ backgroundColor: '#0d0b09', border: '1px solid rgba(201,151,74,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4"
              aria-label="Close article"
              style={{ color: '#f6ecd9' }}
            >
              <X size={20} />
            </button>
            <p className="text-xs mb-4" style={{ ...sans, color: '#c9974a', letterSpacing: '0.35em' }}>
              {activePost.category} · {activePost.readTime}
            </p>
            <h3 className="text-3xl md:text-5xl leading-tight mb-4" style={{ ...serif, color: '#f6ecd9' }}>
              {activePost.title}
            </h3>
            <p className="text-sm mb-6" style={{ ...sans, color: 'rgba(246,236,217,0.45)' }}>
              {activePost.date}
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ ...sans, color: 'rgba(246,236,217,0.62)' }}>
              {activePost.summary}
            </p>
            <div className="space-y-5 mb-8">
              {activePost.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm md:text-base leading-relaxed" style={{ ...sans, color: 'rgba(246,236,217,0.56)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div
              className="p-5 mb-8"
              style={{ backgroundColor: 'rgba(201,151,74,0.08)', borderLeft: '2px solid #c9974a' }}
            >
              <p className="text-xs mb-2" style={{ ...sans, color: '#c9974a', letterSpacing: '0.3em' }}>
                TAKEAWAY
              </p>
              <p className="text-sm md:text-base leading-relaxed" style={{ ...sans, color: '#f6ecd9' }}>
                {activePost.takeaway}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActivePost(null)}
              className="px-5 py-3 text-sm"
              style={{ ...sans, backgroundColor: '#c9974a', color: '#0a0908' }}
            >
              Close Article
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------
   MISSION
--------------------------------------------------------------- */
function Mission() {
  const [ref, visible] = useReveal();
  return (
    <section className="py-28 md:py-40 px-6 md:px-10 text-center" style={{ backgroundColor: '#050403' }} ref={ref}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-6xl leading-tight mb-8 transition-all duration-1000"
          style={{
            ...serif,
            color: '#f6ecd9',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          We believe history should
          <br />
          not feel distant.
        </h2>
        <p
          className="text-base md:text-lg leading-relaxed max-w-xl mx-auto transition-all duration-1000"
          style={{
            ...sans,
            color: 'rgba(246,236,217,0.5)',
            opacity: visible ? 1 : 0,
            transitionDelay: '200ms',
          }}
        >
          Our mission is to make history accessible, emotional, visually
          compelling, and unforgettable.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   CONTACT
--------------------------------------------------------------- */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(e.currentTarget),
    });

    if (response.ok) {
      setSent(true);
    } else {
      setError('Message could not be sent right now. Please try again.');
    }

    setSubmitting(false);
  };

  const inputStyle = {
    ...sans,
    backgroundColor: 'transparent',
    border: '1px solid rgba(201,151,74,0.25)',
    color: '#f6ecd9',
    padding: '14px 16px',
    width: '100%',
    outline: 'none',
  };

  if (sent) {
    return (
      <div className="p-10 text-center" style={{ border: '1px solid rgba(201,151,74,0.25)' }}>
        <p style={{ ...serif, color: '#c9974a' }} className="text-2xl mb-2">
          Message received.
        </p>
        <p style={{ ...sans, color: 'rgba(246,236,217,0.55)' }} className="text-sm">
          We&rsquo;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <input type="hidden" name="_subject" value="New CineSynapse Studio message" />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={inputStyle} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} required />
      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        style={{ ...inputStyle, gridColumn: '1 / -1' }}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        rows={5}
        style={{ ...inputStyle, gridColumn: '1 / -1', resize: 'none' }}
        required
      />
      <button
        type="submit"
        className="sm:col-span-2 justify-self-start px-8 py-4 text-sm"
        style={{
          ...sans,
          backgroundColor: submitting ? 'rgba(201,151,74,0.6)' : '#c9974a',
          color: '#0a0908',
          cursor: submitting ? 'wait' : 'pointer',
        }}
        disabled={submitting}
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
      {error && (
        <p className="sm:col-span-2 text-sm" style={{ ...sans, color: '#d48c6a' }}>
          {error}
        </p>
      )}
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10" style={{ backgroundColor: '#0a0908' }}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="GET IN TOUCH" title="Have a Story Worth Telling?" align="center" />
        <Reveal delay={150}>
          <p
            className="text-sm md:text-base text-center max-w-xl mx-auto mt-6 mb-14 leading-relaxed"
            style={{ ...sans, color: 'rgba(246,236,217,0.5)' }}
          >
            Whether you&rsquo;re interested in collaboration, documentary
            production, partnerships, or creative projects, we&rsquo;d love to
            hear from you.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <ContactForm />
        </Reveal>
        <Reveal delay={320}>
          <div className="flex justify-center mt-10">
            <a
              href="mailto:bdernestina5@gmail.com"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-300"
              style={{ ...sans, color: 'rgba(246,236,217,0.6)' }}
            >
              <Mail size={16} style={{ color: '#c9974a' }} /> bdernestina5@gmail.com
            </a>
          </div>
        </Reveal>
        <Reveal delay={350}>
          <div className="flex justify-center gap-8 mt-8">
            {[
              [Youtube, 'YouTube', SOCIAL_LINKS.youtube],
              [Music2, 'TikTok', SOCIAL_LINKS.tiktok],
              [Instagram, 'Instagram', SOCIAL_LINKS.instagram],
            ].map(([Icon, label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors duration-300"
                style={{ ...sans, color: 'rgba(246,236,217,0.55)' }}
              >
                <Icon size={18} /> {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   FOOTER
--------------------------------------------------------------- */
function Footer() {
  const links = [
    ['Home', '#home'],
    ['Stories', '#stories'],
    ['About', '#about'],
    ['Blog', '#blog'],
    ['Contact', '#contact'],
  ];
  return (
    <footer className="pt-20 pb-10 px-6 md:px-10" style={{ backgroundColor: '#050403', borderTop: '1px solid rgba(201,151,74,0.12)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-14">
          <div>
            <p className="text-2xl mb-2" style={{ ...serif, color: '#f6ecd9' }}>
              CineSynapse Studio
            </p>
            <p className="text-sm italic" style={{ ...serif, color: '#c9974a' }}>
              History, Reimagined.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="text-sm" style={{ ...sans, color: 'rgba(246,236,217,0.55)' }}>
                {label}
              </a>
            ))}
          </div>
          <div className="flex gap-6">
            {[
              [Youtube, 'YouTube', SOCIAL_LINKS.youtube],
              [Music2, 'TikTok', SOCIAL_LINKS.tiktok],
              [Instagram, 'Instagram', SOCIAL_LINKS.instagram],
            ].map(([Icon, label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: 'rgba(246,236,217,0.55)' }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div
          className="pt-8 flex flex-col items-center gap-2 text-center"
          style={{ borderTop: '1px solid rgba(201,151,74,0.1)' }}
        >
          <p className="text-xs" style={{ ...sans, color: 'rgba(246,236,217,0.35)' }}>
            &copy; 2026 CineSynapse Studio. All rights reserved.
          </p>
          <p className="text-xs" style={{ ...sans, color: 'rgba(246,236,217,0.3)' }}>
            Created by <span style={{ color: '#c9974a' }}>TinaCode-b</span> &middot; Built by
            Ernestina Boakye Dankwah &middot;{' '}
            <a href="mailto:bdernestina5@gmail.com" style={{ color: 'rgba(246,236,217,0.3)' }}>
              bdernestina5@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------
   APP
--------------------------------------------------------------- */
export default function App() {
  useCinemaFonts();
  const [introDone, setIntroDone] = useState(false);

  return (
    <div style={{ backgroundColor: '#0a0908', ...sans }} className="min-h-screen w-full">
      <FilmGrain />
      {!introDone && <IntroSequence onDone={() => setIntroDone(true)} />}
      <Navbar />
      <Hero />
      <FeaturedStories />
      <About />
      <Approach />
      <Showreel />
      <YouTubeSection />
      <ShortsSection />
      <WhySection />
      <HistoryBlog />
      <Mission />
      <Contact />
      <Footer />
    </div>
  );
}