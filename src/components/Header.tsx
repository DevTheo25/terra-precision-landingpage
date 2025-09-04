import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import logoImage from '../assets/TP_Logo.png'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detecta scroll baseado na altura da Hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('inicio');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > heroHeight * 0.8);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Função para redirecionar para a plataforma
  const handleLogin = () => {
    // Em produção, usar o domínio real
    const platformUrl = import.meta.env.VITE_PLATFORM_URL || 'http://localhost:5173';
    window.location.href = platformUrl;
  };

  // Variantes de animação
  const headerVariants: Variants = {
    transparent: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(4px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.19)",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    solid: {
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid hsl(120, 20%, 90%)",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const logoVariants: Variants = {
    initial: { opacity: 0, x: -30 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const navItemVariants: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const mobileItemVariants: Variants = {
    closed: { opacity: 0, x: -20 },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const menuItems = [
    { label: "Início", id: "inicio" },
    { label: "Soluções", id: "solucoes" },
    { label: "Sobre", id: "sobre" },
    { label: "Contato", id: "contato" }
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      variants={headerVariants}
      animate={isScrolled ? "solid" : "transparent"}
      initial="transparent"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollToSection('inicio')}
            >
              <img 
                src={logoImage} 
                alt="Logo da Terra Precision" 
                className="h-14 md:h-14"
              />
            </motion.div>
          </motion.div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors relative font-medium ${
                  isScrolled 
                    ? 'text-foreground hover:text-primary' 
                    : 'text-white hover:text-white drop-shadow-md'
                }`}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <span className="relative">
                  {item.label}
                  <motion.div
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      isScrolled ? 'bg-primary' : 'bg-white'
                    }`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.button>
            ))}
          </nav>

          {/* Botões de Ação Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Botão de Login */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Button 
                variant="ghost"
                size="lg"
                onClick={handleLogin}
                className={`relative group transition-all duration-300 ${
                  isScrolled 
                    ? 'text-foreground hover:text-primary' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <LogIn className="h-4 w-4 mr-2" />
                <span>Acessar Plataforma</span>
              </Button>
            </motion.div>

            {/* Botão CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <Button 
                variant="cta" 
                size="lg"
                onClick={() => scrollToSection('contato')}
                className={`relative overflow-hidden group transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-primary text-primary-foreground hover:bg-primary-dark' 
                    : 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white hover:text-primary'
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Solicite um Orçamento</span>
              </Button>
            </motion.div>
          </div>

          {/* Menu Mobile Button */}
          <motion.button
            className={`md:hidden p-2 relative z-10 transition-colors ${
              isMenuOpen ? 'text-white drop-shadow-lg' : (isScrolled ? 'text-foreground' : 'text-white drop-shadow-lg')
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Menu Content */}
              <motion.div
                className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-border shadow-2xl z-50"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <nav className="flex flex-col p-6 space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-lg font-medium text-white hover:text-primary transition-colors"
                      variants={mobileItemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  
                  {/* Botão de Login Mobile */}
                  <motion.div
                    variants={mobileItemVariants}
                    custom={menuItems.length}
                    className="pt-4 border-t border-white/20"
                  >
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={handleLogin}
                      className="w-full mb-4 text-white border-white hover:bg-white hover:text-primary"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Acessar Plataforma
                    </Button>
                    
                    <Button 
                      variant="cta" 
                      size="lg"
                      onClick={() => scrollToSection('contato')}
                      className="w-full"
                    >
                      Solicite um Orçamento
                    </Button>
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;