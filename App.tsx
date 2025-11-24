import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Palette, 
  Gamepad2, 
  BrainCircuit, 
  Menu, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  PlayCircle, 
  Star,
  Smile,
  Calendar,
  BookOpen,
  Award,
  Users,
  Gift,
  Headphones,
  Zap,
  Rocket,
  Terminal,
  Download,
  Flag,
  Mail,
  MessageCircle,
  Send,
  Loader2,
  Quote,
  CreditCard
} from 'lucide-react';

// --- Reusable Components ---

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  disabled = false
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variants = {
    primary: "bg-brand-orange text-white hover:bg-orange-600 shadow-orange-200",
    secondary: "bg-brand-yellow text-brand-navy hover:bg-yellow-400 shadow-yellow-200",
    outline: "bg-white text-brand-navy border-2 border-brand-navy hover:bg-brand-navy hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-12 max-w-3xl mx-auto">
    <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-navy mb-4 leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg md:text-xl text-gray-600 font-medium">
        {subtitle}
      </p>
    )}
  </div>
);

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-3xl p-8 shadow-xl border-b-8 border-brand-blue/20 ${className}`}>
    {children}
  </div>
);

// --- Main Landing Page ---

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const testimonials = [
    {
      quote: "My daughter used to just watch YouTube. Now she's making her own art and games. The monthly themes keep her coming back!",
      author: "Sarah Jenkins",
      role: "Mom of 8-year-old",
      color: "bg-brand-yellow"
    },
    {
      quote: "I was worried AI would be too complex, but the bite-sized lessons are perfect. My son loves earning badges!",
      author: "Michael Chen",
      role: "Dad of 10-year-old",
      color: "bg-brand-blue"
    },
    {
      quote: "Finally, screen time I don't feel guilty about. The family challenges have brought us closer together.",
      author: "Jessica Martinez",
      role: "Mom of 7-year-old",
      color: "bg-brand-orange"
    },
    {
      quote: "The resource vault is a goldmine. My kids are constantly finding new projects to try on weekends.",
      author: "David Thompson",
      role: "Dad of 9-year-old",
      color: "bg-brand-navy"
    },
    {
      quote: "I love the safe community aspect. Seeing what other kids create inspires my daughter to try harder.",
      author: "Emily Wilson",
      role: "Mom of 11-year-old",
      color: "bg-brand-blue"
    }
  ];

  // Testimonial Playlist Logic
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gumroad Payment Logic
  const handleJoinClick = () => {
    // 🟢 TODO: 替换下面的链接为你真实的 Gumroad 产品链接
    // 格式通常是: https://username.gumroad.com/l/product_slug
    const GUMROAD_ANNUAL_URL = "https://gumroad.com/l/YOUR_ANNUAL_PRODUCT_ID";
    const GUMROAD_MONTHLY_URL = "https://gumroad.com/l/YOUR_MONTHLY_PRODUCT_ID";

    const targetUrl = isAnnual ? GUMROAD_ANNUAL_URL : GUMROAD_MONTHLY_URL;

    // 如果链接包含 placeholder，提示用户
    if (targetUrl.includes("YOUR_ANNUAL_PRODUCT_ID") || targetUrl.includes("YOUR_MONTHLY_PRODUCT_ID")) {
        alert("Setup Required:\nPlease replace the GUMROAD URLs in the code (App.tsx) with your actual Gumroad product links.");
        return;
    }
    
    // 打开 Gumroad 链接
    // 由于我们在 index.html 中引入了 Gumroad.js，如果这些链接是标准的 Gumroad 链接，
    // 它们通常会自动以 overlay 形式打开。如果没有，这里会打开新窗口。
    window.open(targetUrl, '_blank');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/Aimee.zhangai@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          _subject: `New Inquiry from ${contactForm.name} (Aimee Academy)`,
          _cc: "Aimee.zhang.ai@gmail.com", 
          _replyto: contactForm.email,
          _captcha: "false",
          _template: "box"
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setContactForm({ name: '', email: '', message: '' }); 
      } else {
        console.error("Form submission failed", response);
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Network error", error);
      setFormStatus('error');
    }
  };

  // Helper to get the 3 visible testimonials
  const getVisibleTestimonials = () => {
    const i1 = activeTestimonial % testimonials.length;
    const i2 = (activeTestimonial + 1) % testimonials.length;
    const i3 = (activeTestimonial + 2) % testimonials.length;
    return [
        { ...testimonials[i1], active: false, key: i1 },
        { ...testimonials[i2], active: true, key: i2 }, // Middle one is active
        { ...testimonials[i3], active: false, key: i3 },
    ];
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-gray-800 selection:bg-brand-yellow selection:text-brand-navy">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
              <BrainCircuit size={24} />
            </div>
            <span className="font-display font-bold text-xl md:text-2xl text-brand-navy tracking-tight">
              Aimee <span className="text-brand-orange">Academy</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('curriculum')} className="font-semibold text-gray-600 hover:text-brand-navy transition">Core Course</button>
            <button onClick={() => scrollToSection('pricing')} className="font-semibold text-gray-600 hover:text-brand-navy transition">Pricing</button>
            <button onClick={() => scrollToSection('contact')} className="font-semibold text-gray-600 hover:text-brand-navy transition">Contact</button>
            <Button variant="primary" onClick={() => scrollToSection('pricing')}>Join the Club</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-brand-navy"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-lg">
            <button onClick={() => scrollToSection('curriculum')} className="text-lg font-medium py-2">Core Course</button>
            <button onClick={() => scrollToSection('pricing')} className="text-lg font-medium py-2">Pricing</button>
            <button onClick={() => scrollToSection('contact')} className="text-lg font-medium py-2">Contact</button>
            <Button variant="primary" className="w-full" onClick={() => scrollToSection('pricing')}>Join the Club</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-20 right-[-100px] w-96 h-96 bg-brand-yellow/30 rounded-full blur-3xl -z-10 opacity-60" />
        <div className="absolute bottom-0 left-[-100px] w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl -z-10 opacity-60" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
            
            {/* Hero Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-block px-4 py-2 bg-orange-100 text-brand-orange rounded-full font-bold text-sm mb-6 uppercase tracking-wide">
                More Than Just A Course
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold text-brand-navy mb-6 leading-[1.1]">
                The Ultimate <span className="text-brand-blue relative">
                  AI Creativity
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-yellow -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span> Club for Kids
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                Unlock the full potential of AI with a membership that offers continuous learning, monthly fun, and a safe community.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Button variant="primary" onClick={() => scrollToSection('pricing')}>Join Aimee Academy <ArrowRight size={20} /></Button>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-10 flex items-center justify-center md:justify-start gap-6">
                 <p className="text-sm font-semibold text-gray-400">Trusted by 1,000+ Families</p>
                 <div className="flex gap-1 text-brand-yellow">
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
              </div>
            </div>

            {/* Hero Image / Graphic */}
            <div className="w-full md:w-1/2 relative">
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform md:rotate-2 hover:rotate-0 transition-transform duration-500 bg-gradient-to-br from-brand-blue to-brand-navy group">
                {/* Illustration - replace img with robust css composition */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <Rocket size={140} className="text-white/20 absolute top-10 right-10 animate-pulse" />
                   <BrainCircuit size={200} className="text-white/10 absolute -bottom-10 -left-10" />
                   <div className="relative z-10 text-center p-8">
                      <div className="w-32 h-32 bg-brand-yellow rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                         <Sparkles size={60} className="text-brand-navy" />
                      </div>
                      <h3 className="text-white text-2xl font-display font-bold">Start Creating!</h3>
                      <p className="text-white/80">Art, Games, Code & Fun</p>
                   </div>
                </div>
                
                {/* Floating Badges */}
                <div className="absolute top-6 right-6 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-2 animate-bounce duration-[3000ms] z-20">
                   <div className="bg-brand-yellow p-1 rounded-full text-brand-navy"><Award size={20}/></div>
                   <span className="font-bold text-sm text-brand-navy">Creative Skills</span>
                </div>
                <div className="absolute bottom-8 left-6 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-2 animate-pulse z-20">
                   <div className="bg-brand-orange p-1 rounded-full text-white"><Users size={20}/></div>
                   <span className="font-bold text-sm text-brand-navy">Parent Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Core Course Included Section */}
      <section id="curriculum" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="inline-block px-3 py-1 bg-brand-navy text-white text-xs font-bold rounded mb-4">INCLUDED WITH MEMBERSHIP</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-6 leading-tight">
                Start with our Core <br/>
                <span className="text-brand-orange decoration-wavy underline decoration-brand-yellow">Creative Course</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Every member gets full access to our foundational creative journey. It's the perfect place to start learning at your own pace.
              </p>
              
              <div className="space-y-4">
                {[
                  "AI Art & Digital Painting",
                  "Storytelling with Chatbots",
                  "Music & Sound Design",
                  "Build Your Own Mini-Game"
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-brand-cream rounded-xl border border-orange-100">
                    <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <span className="font-bold text-brand-navy">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Illustrated Grid (CSS Replacement for Images) */}
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                 <div className="rounded-2xl shadow-md w-full h-48 bg-gradient-to-br from-pink-100 to-brand-orange flex flex-col items-center justify-center text-brand-navy p-4 text-center hover:scale-105 transition-transform">
                    <Palette size={48} className="mb-3 text-white drop-shadow-md" />
                    <span className="font-bold text-sm">Digital Art</span>
                 </div>
                 <div className="rounded-2xl shadow-md w-full h-48 bg-gradient-to-br from-blue-100 to-brand-blue flex flex-col items-center justify-center text-brand-navy p-4 text-center mt-8 hover:scale-105 transition-transform">
                    <Gamepad2 size={48} className="mb-3 text-white drop-shadow-md" />
                    <span className="font-bold text-sm">Game Design</span>
                 </div>
                 <div className="rounded-2xl shadow-md w-full h-48 bg-gradient-to-br from-yellow-100 to-brand-yellow flex flex-col items-center justify-center text-brand-navy p-4 text-center hover:scale-105 transition-transform">
                    <BookOpen size={48} className="mb-3 text-white drop-shadow-md" />
                    <span className="font-bold text-sm">Storytelling</span>
                 </div>
                 <div className="rounded-2xl shadow-md w-full h-48 bg-gradient-to-br from-slate-200 to-brand-navy flex flex-col items-center justify-center text-white p-4 text-center mt-8 hover:scale-105 transition-transform">
                    <Terminal size={48} className="mb-3 text-white/80" />
                    <span className="font-bold text-sm">Basic Coding</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Pricing Section */}
      <section id="pricing" className="py-20 bg-brand-navy relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Simple Pricing for Endless Creativity
            </h2>
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-lg font-bold ${!isAnnual ? 'text-white' : 'text-white/50'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-16 h-8 bg-white/20 rounded-full p-1 relative transition-colors"
              >
                <div className={`w-6 h-6 bg-brand-yellow rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`} />
              </button>
              <span className={`text-lg font-bold ${isAnnual ? 'text-white' : 'text-white/50'}`}>
                Yearly <span className="text-xs bg-brand-orange text-white px-2 py-0.5 rounded ml-1">LIMITED OFFER</span>
              </span>
            </div>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
            
            {/* Plan Card */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex-1 flex flex-col relative z-10">
              <div className="p-8 md:p-10 flex-1">
                {isAnnual && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                    SPECIAL PROMO
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">
                  Aimee Academy {isAnnual ? 'Annual' : 'Monthly'}
                </h3>
                <p className="text-gray-500 text-sm mb-6">Full access to everything.</p>
                
                <div className="mb-8">
                   {isAnnual && (
                     <div className="flex items-center gap-2 mb-1">
                       <span className="text-gray-400 line-through text-xl font-semibold">$199</span>
                       <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">SAVE 75%</span>
                     </div>
                   )}
                   <div className="flex items-baseline gap-1">
                     <span className="text-5xl font-extrabold text-brand-navy">${isAnnual ? '49' : '29'}</span>
                     <span className="text-gray-500 font-medium">/{isAnnual ? 'year' : 'month'}</span>
                   </div>
                </div>

                <div className="grid grid-cols-1 gap-y-2 mb-8">
                  {[
                    "Core Course Access",
                    "Resource Vault",
                    "Private Community",
                    "Member Discounts",
                    "Themed Months",
                    "Achievement Badges",
                    "Early Access",
                    "Exclusive Podcast",
                    "Holiday Specials",
                    "Family Challenges",
                    "Member Newsletter",
                    "Feedback Loop"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 pt-0">
                <Button variant="primary" className="w-full justify-center text-lg" onClick={handleJoinClick}>
                  {isAnnual ? 'Claim Offer & Join' : 'Start Monthly Subscription'}
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4">30-day money-back guarantee. Cancel anytime.</p>
              </div>
            </div>

            {/* Value Props / Testimonials List (Playlist Style) */}
            <div className="hidden md:flex md:w-2/5 flex-col pl-4 py-4 h-auto relative justify-center">
              <h3 className="text-white font-display text-xl mb-6 opacity-90 flex items-center gap-2 shrink-0">
                <Star className="text-brand-yellow fill-brand-yellow" size={20}/> 
                Why Parents Love Us
              </h3>
              
              <div className="relative flex-1 overflow-hidden pr-2">
                <div className="space-y-4">
                  {visibleTestimonials.map((testimonial, index) => (
                    <div 
                      key={testimonial.key}
                      className={`p-5 rounded-2xl transition-all duration-500 ${
                        testimonial.active 
                          ? 'bg-white/10 border border-white/40 scale-105 shadow-xl opacity-100' 
                          : 'bg-transparent border border-white/5 opacity-40 scale-95'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`shrink-0 w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center text-brand-navy font-bold text-sm shadow-sm`}>
                          {testimonial.author[0]}
                        </div>
                        <div>
                           {/* 5-Star Rating */}
                          <div className="flex gap-1 mb-2">
                             {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-brand-yellow fill-brand-yellow" />)}
                          </div>
                          <p className={`text-white text-sm italic leading-relaxed mb-2`}>
                            "{testimonial.quote}"
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-white">{testimonial.author}</span>
                            <span className="text-white/50">•</span>
                            <span className="text-white/70">{testimonial.role}</span>
                          </div>
                        </div>
                      </div>
                      {/* Active Indicator Bar */}
                      {testimonial.active && (
                        <div className="w-12 h-1 bg-brand-yellow rounded-full mt-3 opacity-80" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <SectionHeader title="Have Questions?" subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible." />
          
          <div className="bg-brand-cream rounded-3xl p-8 md:p-12 shadow-lg border border-orange-100 relative overflow-hidden">
            {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-2">Thank you for reaching out. We'll get back to you shortly.</p>
                    <p className="text-sm text-orange-500 font-medium bg-orange-50 px-4 py-2 rounded-full">
                        Note: Please check your Spam folder if you don't receive our reply.
                    </p>
                    <Button variant="primary" className="mt-8" onClick={() => setFormStatus('idle')}>Send Another Message</Button>
                </div>
            ) : (
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-brand-navy mb-2">Parent's Name</label>
                            <input 
                              type="text" 
                              name="name"
                              required
                              value={contactForm.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition" 
                              placeholder="Jane Doe" 
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-brand-navy mb-2">Email Address</label>
                            <input 
                              type="email" 
                              name="email"
                              required
                              value={contactForm.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition" 
                              placeholder="jane@example.com" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-brand-navy mb-2">Message</label>
                        <textarea 
                          rows={4} 
                          name="message"
                          required
                          value={contactForm.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition" 
                          placeholder="How can we help?" 
                        />
                    </div>
                    <Button variant="primary" className="w-full justify-center" disabled={formStatus === 'submitting'}>
                        {formStatus === 'submitting' ? (
                          <>Sending... <Loader2 className="animate-spin" size={18} /></>
                        ) : (
                          <>Send Message <Send size={18} /></>
                        )}
                    </Button>
                    {formStatus === 'error' && (
                        <p className="text-red-500 text-center text-sm bg-red-50 p-2 rounded">Something went wrong. Please try again later.</p>
                    )}
                </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center text-white">
                <BrainCircuit size={18} />
              </div>
              <span className="font-display font-bold text-xl text-gray-800">
                Aimee Academy
              </span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-brand-navy">Club Rules</a>
              <a href="#" className="hover:text-brand-navy">Curriculum</a>
              <a href="#" className="hover:text-brand-navy">Privacy Policy</a>
              <a href="#" className="hover:text-brand-navy">Member Login</a>
            </div>
            <div className="text-sm text-gray-400">
              &copy; 2025 Aimee Academy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}