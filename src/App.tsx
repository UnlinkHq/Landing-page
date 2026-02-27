import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { Mail, ArrowRight, Github, MessageCircle } from 'lucide-react';

// Custom WhatsApp Icon
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const App = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  // Load emails from localStorage on mount
  useEffect(() => {
    const savedEmails = localStorage.getItem('unlink_waitlist');
    if (savedEmails) {
      try {
        const parsed = JSON.parse(savedEmails);
        if (Array.isArray(parsed)) setEmails(parsed);
      } catch (e) {
        console.error("Failed to parse emails", e);
      }
    }
  }, []);

  // Expose admin command to the console
  useEffect(() => {
    (window as any).showUnlinkWaitlist = () => {
      const savedEmails = localStorage.getItem('unlink_waitlist');
      const list = savedEmails ? JSON.parse(savedEmails) : [];
      if (list.length === 0) {
        console.log("%c Unlink Admin %c No signups yet.", "background: #fff; color: #000; font-weight: bold; padding: 2px 5px; border-radius: 3px;", "color: #888;");
        return;
      }
      console.log("%c Unlink Waitlist %c Found " + list.length + " signups:", "background: #fff; color: #000; font-weight: bold; padding: 2px 5px; border-radius: 3px;", "color: #fff;");
      console.table(list);
      
      const csvContent = "data:text/csv;charset=utf-8,Email\n" + list.join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "unlink_waitlist_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    console.log("%c Admin Note %c Run showUnlinkWaitlist() to export signups.", "color: #555; font-size: 10px;", "color: #333; font-size: 10px;");
  }, []);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email address", {
        className: "bg-red-500/10 text-red-500 border-red-500/20 px-4 py-2",
      });
      return;
    }

    const newEmails = [...emails, email];
    setEmails(newEmails);
    localStorage.setItem('unlink_waitlist', JSON.stringify(newEmails));
    toast.success('Waitlist Updated', {
      description: "You've successfully joined Unlink.",
      className: "bg-white text-black border-none font-sans px-4 py-2",
    });
    setEmail('');
  };

  return (
    <div className="h-screen w-full bg-[#050505] text-white font-sans selection:bg-white selection:text-black overflow-hidden relative flex flex-col">
      <Toaster position="top-center" richColors />
      
      {/* Texture Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Focus Aura Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden text-zinc-900 shadow-[inset_0_0_200px_rgba(0,0,0,1)]">
        <motion.div 
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-[800px] h-[800px] bg-white rounded-full blur-[160px]"
        />
        
        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 2000 - 1000, 
              y: Math.random() * 2000 - 1000,
              opacity: Math.random() * 0.3 
            }}
            animate={{ 
              y: [null, Math.random() * -120, Math.random() * 120],
              x: [null, Math.random() * -120, Math.random() * 120],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 20 + Math.random() * 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute w-[1.5px] h-[1.5px] bg-white/30 rounded-full blur-[0.5px]"
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-20 w-full p-8 flex justify-between items-center max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Unlink</span>
        </div>
        
        {/* Top Socials - Highly Visible */}
        <div className="flex items-center gap-6">
          <motion.a whileHover={{ scale: 1.1, color: "#fff" }} href="#" target="_blank" className="text-zinc-500 transition-colors cursor-pointer"><MessageCircle size={22} /></motion.a>
          <motion.a whileHover={{ scale: 1.1, color: "#fff" }} href="#" target="_blank" className="text-zinc-500 transition-colors cursor-pointer"><WhatsAppIcon size={22} /></motion.a>
          <motion.a whileHover={{ scale: 1.1, color: "#fff" }} href="#" target="_blank" className="text-zinc-500 transition-colors cursor-pointer"><Github size={22} /></motion.a>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-7xl mx-auto w-full pb-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <h1 className="text-7xl sm:text-[10rem] font-bold tracking-tighter leading-[0.8] text-white select-none max-w-6xl mx-auto mb-10">
            Break the <br />
            Digital <span className="italic font-serif font-light text-zinc-500">Loop</span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white text-xl sm:text-3xl font-light max-w-3xl mx-auto leading-tight"
          >
            Effortless way to reduce your <br className="hidden sm:block" />
            phone usage by <span className="font-bold">40%</span>
          </motion.p>
        </motion.div>

        {/* Input Block */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-lg mt-16"
        >
          <form 
            onSubmit={handleSubmit}
            className="group relative flex flex-col sm:flex-row items-stretch gap-3 p-1 rounded-[2.2rem] bg-white/[0.03] border border-white/10 focus-within:border-white/30 transition-all duration-500"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={20} />
              <input
                type="email"
                placeholder="Secure your focus"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent pl-16 pr-6 py-6 text-white placeholder-zinc-700 focus:outline-none transition-all text-xl font-medium"
              />
            </div>
            <motion.button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black font-black px-12 py-5 sm:py-0 rounded-[2rem] flex items-center justify-center gap-3 transition-all hover:bg-zinc-200"
            >
              <span className="text-sm uppercase tracking-[0.2em]">Join</span>
              <motion.div animate={{ x: isHovered ? 4 : 0 }}>
                <ArrowRight size={20} strokeWidth={3} />
              </motion.div>
            </motion.button>
          </form>
          
          <div className="mt-8 flex justify-center gap-8 opacity-20 pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Privacy First</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Phase 01</span>
          </div>
        </motion.div>
      </main>

     
    </div>
  );
};

export default App;
