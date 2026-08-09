// HPI 1.7-V
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const servicesData = [
  {
    title: 'Classic Cut',
    description: 'Timeless precision haircuts tailored to your style and personality.',
    price: 'From $45'
  },
  {
    title: 'Signature Shave',
    description: 'Traditional hot towel shave with premium products for ultimate comfort.',
    price: 'From $35'
  },
  {
    title: 'Beard Sculpting',
    description: 'Expert beard trimming and styling to complement your features.',
    price: 'From $30'
  }
];

const contactInfo = {
  location: ['123 Style Avenue', 'New York, NY 10001'],
  hours: ['Monday - Friday: 9:00 AM - 8:00 PM', 'Saturday: 10:00 AM - 6:00 PM', 'Sunday: Closed'],
  contact: ['Phone: (555) 123-4567', 'Email: contact@inzbc.com']
};

const transitionEase = [0.16, 1, 0.3, 1];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const heroImageY1 = useTransform(heroScroll, [0, 1], ["0%", "15%"]);
  const heroImageY2 = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const aboutImageY = useTransform(aboutScroll, [0, 1], ["-10%", "10%"]);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground overflow-clip">
      <Header />

      <main>
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative w-full min-h-screen pt-32 pb-16 px-6 lg:px-12 flex flex-col justify-between max-w-[120rem] mx-auto">
          <div className="w-full flex justify-center items-center py-12 lg:py-24">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: transitionEase }}
              className="font-heading text-[18vw] lg:text-[14vw] leading-[0.8] tracking-tight text-primary text-center whitespace-nowrap"
            >
              Crafting Style
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end w-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: transitionEase }}
              className="lg:col-span-4 flex flex-col gap-10 pb-4 lg:pb-12 order-3 lg:order-1"
            >
              <p className="font-paragraph text-xl lg:text-2xl text-primary max-w-sm leading-relaxed">
                Step into a world of premium grooming services where tradition meets innovation.
              </p>
              <div>
                <a href="#contact" className="inline-block">
                  <button className="font-paragraph text-sm uppercase tracking-[0.2em] px-10 py-5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-500">
                    Book Appointment
                  </button>
                </a>
              </div>
            </motion.div>

            <div className="lg:col-span-4 h-[50vh] lg:h-[75vh] overflow-hidden order-1 lg:order-2">
              <motion.div style={{ y: heroImageY1 }} className="w-full h-[120%] -mt-[10%]">
                <Image
                  src="https://static.wixstatic.com/media/df219d_bae66e6ab01c4bb5b12d9d82a5838843~mv2.png?originWidth=768&originHeight=576"
                  alt="Premium barber chair in elegant setting"
                  width={800}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="lg:col-span-4 h-[50vh] lg:h-[75vh] overflow-hidden order-2 lg:order-3">
              <motion.div style={{ y: heroImageY2 }} className="w-full h-[120%] -mt-[10%]">
                <Image
                  src="https://static.wixstatic.com/media/df219d_dcdad3a7f9b3426abacf7deae12389a1~mv2.png?originWidth=768&originHeight=576"
                  alt="Professional grooming service in action"
                  width={800}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="w-full py-32 lg:py-48 px-6 lg:px-12 bg-background relative">
          <div className="absolute top-0 left-6 right-6 lg:left-12 lg:right-12 h-[1px] bg-primary/20" />
          
          <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5">
              <div className="sticky top-40">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: transitionEase }}
                  className="font-heading text-6xl lg:text-8xl text-primary mb-8 leading-none"
                >
                  Our<br/>Services
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: transitionEase }}
                  className="font-paragraph text-xl text-primary/70 max-w-md"
                >
                  Experience excellence in every detail with our curated selection of grooming services.
                </motion.p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              {servicesData.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: transitionEase }}
                  className="group border-b border-primary/20 py-12 first:pt-0 last:border-0 flex flex-col md:flex-row md:items-baseline justify-between gap-6"
                >
                  <div className="max-w-xl">
                    <h3 className="font-heading text-4xl lg:text-5xl text-primary mb-4 group-hover:translate-x-4 transition-transform duration-500 ease-out">
                      {service.title}
                    </h3>
                    <p className="font-paragraph text-lg text-primary/80 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="font-paragraph text-xl tracking-wide text-primary whitespace-nowrap">
                    {service.price}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" ref={aboutRef} className="w-full py-32 lg:py-48 px-6 lg:px-12 bg-background">
          <div className="max-w-[120rem] mx-auto relative">
            <div className="w-full lg:w-4/5 h-[60vh] lg:h-[90vh] overflow-hidden">
              <motion.div style={{ y: aboutImageY }} className="w-full h-[120%] -mt-[10%]">
                <Image
                  src="https://static.wixstatic.com/media/df219d_c9e9a55db4ac4f69b7420c2b131d8071~mv2.png?originWidth=1600&originHeight=896"
                  alt="INZBC grooming experience"
                  width={1600}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: transitionEase }}
              className="lg:absolute bottom-0 right-0 lg:-mb-24 lg:w-[55%] bg-buttonbackground p-10 lg:p-24 border border-primary/10 shadow-2xl"
            >
              <h2 className="font-heading text-5xl lg:text-7xl text-primary mb-10 leading-none">
                The INZBC<br/>Experience
              </h2>
              <div className="space-y-8">
                <p className="font-paragraph text-xl text-primary leading-relaxed">
                  At INZBC, we believe grooming is an art form. Our master stylists combine decades of experience with contemporary techniques to deliver exceptional results.
                </p>
                <p className="font-paragraph text-xl text-primary leading-relaxed">
                  Every visit is crafted to provide not just a service, but a transformative experience in an atmosphere of refined elegance.
                </p>
                <div className="pt-8">
                  <button className="font-paragraph text-sm uppercase tracking-[0.2em] px-10 py-5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-500">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full py-32 lg:py-48 px-6 lg:px-12 bg-secondary text-secondary-foreground mt-24 lg:mt-48">
          <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-5 flex flex-col justify-between">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: transitionEase }}
              >
                <h2 className="font-heading text-6xl lg:text-8xl mb-16 leading-none">
                  Visit Us
                </h2>
                
                <div className="space-y-12 font-paragraph text-lg text-secondary-foreground/80">
                  <div>
                    <p className="font-heading text-2xl text-secondary-foreground mb-4">Location</p>
                    {contactInfo.location.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                  <div>
                    <p className="font-heading text-2xl text-secondary-foreground mb-4">Hours</p>
                    {contactInfo.hours.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                  <div>
                    <p className="font-heading text-2xl text-secondary-foreground mb-4">Contact</p>
                    {contactInfo.contact.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: transitionEase }}
                className="bg-background p-10 lg:p-20 text-primary"
              >
                <h3 className="font-heading text-4xl lg:text-5xl mb-12">
                  Book Your Appointment
                </h3>
                <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      className="peer w-full bg-transparent border-b border-primary/30 py-4 font-paragraph text-lg text-primary placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                      placeholder="Name"
                    />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm font-paragraph text-primary/60 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary">
                      Name
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="peer w-full bg-transparent border-b border-primary/30 py-4 font-paragraph text-lg text-primary placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                      placeholder="Email"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm font-paragraph text-primary/60 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary">
                      Email
                    </label>
                  </div>

                  <div className="relative pt-4">
                    <label className="font-paragraph text-sm text-primary/60 block mb-2">
                      Service
                    </label>
                    <select className="w-full bg-transparent border-b border-primary/30 py-4 font-paragraph text-lg text-primary focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                      {servicesData.map((service, i) => (
                        <option key={i} value={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="pt-8">
                    <button
                      type="submit"
                      className="w-full font-paragraph text-sm uppercase tracking-[0.2em] px-10 py-6 border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-500"
                    >
                      Request Appointment
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}