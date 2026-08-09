import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { ContentItems } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ContentItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [id]);

  const loadContent = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<ContentItems>('contentitems', id);
      setItem(data);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-12 md:py-16 min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !item ? (
          <div className="text-center py-32">
            <h1 className="font-heading text-4xl text-primary mb-6">
              Content Not Found
            </h1>
            <p className="font-paragraph text-lg text-primary mb-8">
              The content you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/content"
              className="inline-block px-10 py-4 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              Back to Content
            </Link>
          </div>
        ) : (
          <>
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Link 
                to="/content"
                className="inline-flex items-center gap-2 font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
              >
                <ArrowLeft size={20} />
                Back to Collection
              </Link>
            </motion.div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto">
              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                {item.publishDate && (
                  <time className="font-paragraph text-sm text-primary opacity-70 block mb-4">
                    {new Date(item.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                )}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
                  {item.title}
                </h1>
                {item.author && (
                  <p className="font-paragraph text-lg text-primary opacity-70">
                    By {item.author}
                  </p>
                )}
              </motion.header>

              {/* Featured Image */}
              {item.mainImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-12"
                >
                  <Image 
                    src={item.mainImage}
                    alt={item.title || 'Content image'}
                    className="w-full aspect-[16/9] object-cover"
                    width={1200}
                  />
                </motion.div>
              )}

              {/* Short Description */}
              {item.shortDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-12"
                >
                  <p className="font-paragraph text-xl md:text-2xl text-primary leading-relaxed">
                    {item.shortDescription}
                  </p>
                </motion.div>
              )}

              {/* Full Content */}
              {item.fullContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="prose prose-lg max-w-none"
                >
                  <div className="font-paragraph text-lg text-primary leading-relaxed whitespace-pre-wrap">
                    {item.fullContent}
                  </div>
                </motion.div>
              )}
            </article>

            {/* Bottom Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-4xl mx-auto mt-20 pt-12 border-t border-primary/10"
            >
              <Link 
                to="/content"
                className="inline-block px-10 py-4 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                Explore More Content
              </Link>
            </motion.div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
