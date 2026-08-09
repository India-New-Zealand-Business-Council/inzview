import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { ContentItems } from '@/entities';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContentListPage() {
  const [items, setItems] = useState<ContentItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [nextSkip, setNextSkip] = useState<number | null>(null);

  useEffect(() => {
    loadContent();
  }, [skip]);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<ContentItems>('contentitems', {}, { limit: 12, skip });
      if (skip === 0) {
        setItems(result.items);
      } else {
        setItems(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
      setNextSkip(result.nextSkip);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (nextSkip !== null) {
      setSkip(nextSkip);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="w-full bg-secondary">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-20 md:py-28">
          <motion.h1 
            className="font-heading text-5xl md:text-6xl lg:text-7xl text-secondary-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Collection
          </motion.h1>
          <motion.p 
            className="font-paragraph text-lg md:text-xl text-secondary-foreground max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our comprehensive archive of stories, insights, and perspectives that inspire and inform.
          </motion.p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-24 md:py-32">
        <div className="min-h-[600px]">
          {isLoading && skip === 0 ? null : items.length > 0 ? (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {items.map((item, index) => (
                  <motion.article
                    key={item._id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Link to={`/content/${item._id}`} className="group block">
                      <div className="mb-6 overflow-hidden">
                        <Image 
                          src={item.mainImage || 'https://static.wixstatic.com/media/dd8066_6c4e8f4937654cde89f64e36c9c97386~mv2.png?originWidth=384&originHeight=256'}
                          alt={item.title || 'Content image'}
                          className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                          width={400}
                        />
                      </div>
                      <div className="space-y-3">
                        {item.publishDate && (
                          <time className="font-paragraph text-sm text-primary opacity-70">
                            {new Date(item.publishDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </time>
                        )}
                        <h2 className="font-heading text-2xl md:text-3xl text-primary group-hover:opacity-70 transition-opacity">
                          {item.title}
                        </h2>
                        {item.shortDescription && (
                          <p className="font-paragraph text-base text-primary leading-relaxed">
                            {item.shortDescription}
                          </p>
                        )}
                        {item.author && (
                          <p className="font-paragraph text-sm text-primary opacity-70">
                            By {item.author}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {/* Load More Button */}
              {hasNext && (
                <div className="mt-16 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="inline-block px-10 py-4 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-primary">
                No content available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
