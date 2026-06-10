/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { MagneticCursor } from './components/MagneticCursor';
import { Hero } from './components/Hero';

const SITE_URL = 'https://abdullah-sany.github.io/';
const SITE_TITLE = 'MD Abdullah Sany | AI-Hybrid Developer & Automation Specialist';
const SITE_DESCRIPTION =
  'Portfolio of MD Abdullah Sany, an AI-Hybrid Developer, automation specialist, prompt engineer, and generative AI creator building intelligent web systems and digital experiences.';
const PREVIEW_IMAGE = 'https://raw.githubusercontent.com/abdullah-sany/Asset/main/Sany.png';
const SAME_AS_LINKS = [
  'https://github.com/abdullah-sany',
  'https://www.linkedin.com/in/abdullah-sany-1449363b5',
  'https://x.com/ma_sany_01',
];
const FAQ_SCHEMA_ITEMS = [
  {
    question: 'What is your main structural stack?',
    answer:
      'I primarily architect applications using Next.js, Node.js, MongoDB, Tailwind CSS, and motion-rich React interfaces.',
  },
  {
    question: 'How do you integrate AI into products?',
    answer:
      'I integrate LLMs and generative AI systems for intelligent search, automated workflows, prompt-driven experiences, and secure server-side AI features.',
  },
  {
    question: 'Do you design or just engineer?',
    answer:
      'I work across both engineering and UI/UX, combining modern application architecture with polished, cinematic product interfaces.',
  },
  {
    question: 'Are you available for freelance collaboration?',
    answer:
      'Yes. I collaborate on SaaS products, AI automation platforms, web systems, and intelligent digital experiences.',
  },
];

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'MD Abdullah Sany',
    url: SITE_URL,
    image: PREVIEW_IMAGE,
    jobTitle: 'AI-Hybrid Developer',
    description: SITE_DESCRIPTION,
    knowsAbout: [
      'AI automation',
      'Prompt engineering',
      'Generative AI',
      'Python development',
      'React development',
      'Robotics',
      'Web systems',
    ],
    sameAs: SAME_AS_LINKS,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SANY.AI',
    alternateName: 'MD Abdullah Sany Portfolio',
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Person',
      name: 'MD Abdullah Sany',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_SCHEMA_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
];

// Lazy load below-the-fold components to improve Lighthouse Performance
const About = lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Skills = lazy(() => import('./components/Skills').then(module => ({ default: module.Skills })));
const Education = lazy(() => import('./components/Education').then(module => ({ default: module.Education })));
const BentoGrid = lazy(() => import('./components/BentoGrid').then(module => ({ default: module.BentoGrid })));
const Services = lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Stats = lazy(() => import('./components/Stats').then(module => ({ default: module.Stats })));
const FAQ = lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const Chatbot = lazy(() => import('./components/Chatbot').then(module => ({ default: module.Chatbot })));
const BookCollabModal = lazy(() => import('./components/BookCollabModal').then(module => ({ default: module.BookCollabModal })));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadChatbot, setLoadChatbot] = useState(false);
  const [isBookCollabOpen, setIsBookCollabOpen] = useState(false);

  useEffect(() => {
    if (loading) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let interactionOccurred = false;

    const startLoading = () => {
      if (!interactionOccurred) {
        interactionOccurred = true;
        setLoadChatbot(true);
        cleanup();
      }
    };

    const cleanup = () => {
      clearTimeout(timeoutId);
      ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach((event) =>
        window.removeEventListener(event, startLoading)
      );
    };

    // Load after 5 seconds idle
    timeoutId = setTimeout(() => {
      startLoading();
    }, 5000);

    // Load on user interaction
    ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach((event) =>
      window.addEventListener(event, startLoading, { once: true, passive: true })
    );

    return cleanup;
  }, [loading]);

  return (
    <div className="min-h-screen font-sans selection:bg-electric-blue/30 selection:text-white antialiased overflow-x-hidden">
      <Helmet>
        <html lang="en" />
        <title>{SITE_TITLE}</title>
        <link rel="canonical" href={SITE_URL} />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="author" content="MD Abdullah Sany" />
        <meta name="keywords" content="MD Abdullah Sany, AI-Hybrid Developer, AI automation specialist, prompt engineer, generative AI creator, Python developer, React developer, robotics projects, Bangladesh developer portfolio" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#050816" />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={PREVIEW_IMAGE} />
        <meta property="og:image:alt" content="MD Abdullah Sany portfolio preview" />
        <meta property="og:site_name" content="SANY.AI" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={PREVIEW_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <MagneticCursor />
          <BackgroundEffects />
          <Navbar onBookCollab={() => setIsBookCollabOpen(true)} />
          
          <main className="relative z-10 flex flex-col gap-8 md:gap-16 pb-0">
            <Hero />
            <Suspense fallback={<div className="h-32 flex items-center justify-center opacity-50"><span className="w-6 h-6 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" /></div>}>
              <Stats />
              <About />
              <Skills />
              <Education />
              <Services />
              <Projects />
              <BentoGrid />
              <FAQ />
              <div className="h-12" /> {/* Spacer */}
              <Contact />
            </Suspense>
          </main>
          
          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          {loadChatbot && (
            <Suspense fallback={null}>
              <Chatbot />
            </Suspense>
          )}

          <Suspense fallback={null}>
            <BookCollabModal 
              isOpen={isBookCollabOpen} 
              onClose={() => setIsBookCollabOpen(false)} 
            />
          </Suspense>
        </>
      )}
    </div>
  );
}
