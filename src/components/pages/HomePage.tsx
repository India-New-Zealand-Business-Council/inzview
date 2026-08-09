// HPI 1.7-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { ContentItems } from '@/entities';
import { Image } from '@/components/ui/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components for Animation ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const RevealLine = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ originX: 0 }}
      className={`h-[1px] bg-primary w-full ${className}`}
    />
  );
};

export default function HomePage() {
  const [items, setItems] = useState<ContentItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Data Fetching (Preserved) ---
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const result = await BaseCrudService.getAll<ContentItems>('contentitems', {}, { limit: 6 });
      setItems(result.items);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Scroll Animations ---
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax for hero images
  const y1 = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(heroScroll, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-primary selection:text-background overflow-clip">
      <Header />
      
      {/* --- HERO SECTION (Inspiration Layout) --- */}
      <section ref={heroRef} className="relative w-full max-w-[120rem] mx-auto pt-24 md:pt-32 pb-20 px-6 md:px-12 lg:px-20 min-h-[90vh] flex flex-col justify-between">
        
        {/* Massive Headline */}
        <motion.div style={{ opacity }} className="w-full mb-12 md:mb-24 z-10 relative">
          <h1 className="font-heading text-[14vw] leading-[0.85] tracking-tight text-center w-full">
            Crafting Excellence
          </h1>
        </motion.div>

        {/* Grid Layout matching inspiration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end flex-grow">
          
          {/* Left Content (Text & Button) */}
          <div className="lg:col-span-4 flex flex-col justify-end pb-4 lg:pb-12 z-10">
            <FadeIn delay={0.2}>
              <p className="font-paragraph text-lg md:text-xl max-w-sm mb-10 leading-relaxed">
                Step into a world of premium services where tradition meets innovation. Discover a curated collection of stories and insights.
              </p>
              <Link 
                to="/content"
                className="inline-flex items-center justify-center px-8 py-4 border border-primary bg-transparent text-primary font-paragraph text-sm uppercase tracking-widest hover:bg-primary hover:text-background transition-all duration-500 w-fit"
              >
                Explore Collection
              </Link>
            </FadeIn>
          </div>

          {/* Right Images (Parallax) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 h-[50vh] md:h-[60vh] lg:h-[70vh]">
            <motion.div style={{ y: y1 }} className="relative w-full h-full overflow-hidden">
              <Image 
                src="https://static.wixstatic.com/media/dd8066_78f3677908cd4a679b0777346f30ae90~mv2.png?originWidth=768&originHeight=384"
                alt="Premium service detail"
                className="w-full h-full object-cover"
                width={800}
              />
            </motion.div>
            <motion.div style={{ y: y2 }} className="relative w-full h-full overflow-hidden hidden md:block mt-12 lg:mt-24">
              <Image 
                src="https://static.wixstatic.com/media/dd8066_0115d7fb77ae4aa6a018114bfb8e3e72~mv2.png?originWidth=768&originHeight=384"
                alt="Craftsmanship in action"
                className="w-full h-full object-cover"
                width={800}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- THE PHILOSOPHY (Sticky Narrative Section) --- */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-32 lg:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          
          {/* Sticky Title */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-40">
              <FadeIn>
                <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
                  A legacy of <br className="hidden lg:block" />
                  <span className="italic">uncompromising</span> <br className="hidden lg:block" />
                  quality.
                </h2>
                <RevealLine className="w-24 mb-8" />
                <p className="font-paragraph text-lg opacity-70 max-w-md">
                  We believe that true elegance lies in the details. Every interaction, every narrative, is meticulously crafted to inspire and elevate.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="lg:col-span-7 space-y-24 lg:space-y-40 lg:pt-32">
            <FadeIn>
              <div className="aspect-[4/3] overflow-hidden relative group">
                <Image 
                  src="https://static.wixstatic.com/media/dd8066_62f4ed4e455f4e6a8bde4cfafa70eff8~mv2.png?originWidth=960&originHeight=704"
                  alt="Philosophy visual 1"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  width={1000}
                />
              </div>
            </FadeIn>
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <p className="font-paragraph text-xl leading-relaxed md:order-2">
                  Our approach is rooted in a deep respect for timeless techniques, seamlessly blended with contemporary vision.
                </p>
                <div className="aspect-square overflow-hidden relative md:order-1">
                  <Image 
                    src="https://static.wixstatic.com/media/dd8066_1c2fd61e23684dd9831fa44a7379890c~mv2.png?originWidth=960&originHeight=704"
                    alt="Philosophy visual 2"
                    className="w-full h-full object-cover"
                    width={600}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- LATEST STORIES (Data Fidelity Section) --- */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-32">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-4">Latest Stories</h2>
              <p className="font-paragraph text-lg opacity-70 max-w-xl">
                Explore our carefully curated collection of articles, insights, and narratives.
              </p>
            </div>
            <Link 
              to="/content"
              className="font-paragraph text-sm uppercase tracking-widest border-b border-primary pb-1 hover:opacity-50 transition-opacity whitespace-nowrap"
            >
              View All Content
            </Link>
          </div>
        </FadeIn>

        <RevealLine className="mb-16 opacity-30" />

        {/* Data Container - Always rendered to prevent hook crashes */}
        <div className="min-h-[400px] relative">
          <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            
            {items.length === 0 && !isLoading ? (
              <div className="text-center py-32">
                <p className="font-paragraph text-xl opacity-50">No narratives available at this time.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {items.map((item, index) => (
                  <FadeIn key={item._id} delay={index * 0.1}>
                    <Link to={`/content/${item._id}`} className="group block">
                      <article className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-primary/20 items-center relative overflow-hidden">
                        
                        {/* Hover Background Effect */}
                        <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10" />

                        {/* Meta */}
                        <div className="md:col-span-3 flex flex-col gap-2">
                          {item.publishDate && (
                            <time className="font-paragraph text-xs uppercase tracking-widest opacity-60">
                              {new Date(item.publishDate).toLocaleDateString('en-US', { 
                                year: 'numeric', month: 'long', day: 'numeric' 
                              })}
                            </time>
                          )}
                          {item.author && (
                            <span className="font-paragraph text-sm italic opacity-80">
                              By {item.author}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="md:col-span-5 lg:col-span-6">
                          <h3 className="font-heading text-3xl md:text-4xl mb-4 group-hover:italic transition-all duration-300">
                            {item.title}
                          </h3>
                          {item.shortDescription && (
                            <p className="font-paragraph text-base opacity-70 line-clamp-2">
                              {item.shortDescription}
                            </p>
                          )}
                        </div>

                        {/* Image */}
                        <div className="md:col-span-4 lg:col-span-3 h-48 md:h-40 overflow-hidden relative">
                          <Image 
                            src={item.mainImage || 'https://static.wixstatic.com/media/dd8066_b8bcffb68ddd44f6b6442c01362d7764~mv2.png?originWidth=384&originHeight=192'}
                            alt={item.title || 'Content image'}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            width={400}
                          />
                        </div>
                      </article>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION (Visual Breather & Footer Transition) --- */}
      <section className="w-full bg-secondary text-secondary-foreground mt-20">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-48 flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Background Texture/Noise (Simulated with CSS) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <FadeIn className="relative z-10 max-w-4xl">
            <h2 className="font-heading text-6xl md:text-8xl mb-8 leading-none">
              Stay Inspired
            </h2>
            <p className="font-paragraph text-xl md:text-2xl opacity-80 mb-16 font-light">
              Join our community and discover new perspectives, timeless wisdom, and innovative ideas that shape the future.
            </p>
            <Link 
              to="/content"
              className="inline-flex items-center justify-center px-12 py-5 border border-secondary-foreground bg-transparent text-secondary-foreground font-paragraph text-sm uppercase tracking-widest hover:bg-secondary-foreground hover:text-secondary transition-all duration-500"
            >
              Explore Now
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}