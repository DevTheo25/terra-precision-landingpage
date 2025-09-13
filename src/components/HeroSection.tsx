import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
// Importar todas as imagens
import heroImage1 from "@/assets/hero-tech-agriculture_5.svg";
import heroImage2 from "@/assets/hero-tech-agriculture_4.svg";
import heroImage3 from "@/assets/hero-tech-agriculture_3.svg";
import heroImage5 from "@/assets/hero-tech-agriculture.svg";
import FreeTrialModal from "@/components/FreeTrialModal";


declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}


// Array das imagens
const heroImages = [heroImage5, heroImage1, heroImage2, heroImage3];

// Função para pré-carregar imagens
const preloadImages = (images: string[]) => {
  return Promise.all(
    images.map(src => 
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = src;
      })
    )
  );
};

// Hook para counter animation
const useCounter = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return count;
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect no background
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -100]);

  // Counters animados
  const precisionCount = useCounter(95, 2.5);
  const costReductionCount = useCounter(30, 2);
  const productivityCount = useCounter(25, 2.2);

  // Pré-carregar todas as imagens
  useEffect(() => {
    preloadImages(heroImages)
      .then(() => {
        setImagesLoaded(true);
        setIsVisible(true);
      })
      .catch((error) => {
        console.error("Erro ao carregar imagens:", error);
        // Mesmo com erro, permite continuar
        setImagesLoaded(true);
        setIsVisible(true);
      });
  }, []);

  // Efeito para trocar imagens automaticamente
  useEffect(() => {
    if (!imagesLoaded) return; // Só inicia o slideshow após carregar as imagens
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModal = () => {
    window.gtag('event', 'click', {
      event_category: 'CTA', 
      event_label: 'Teste Grátis'
    });
    
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Variantes de animação (corrigidas para TypeScript)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.6
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  } as const;

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  } as const;

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  } as const;

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
        staggerChildren: 0.2
      }
    }
  } as const;

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  } as const;

  return (
    <>
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images com Slideshow e Zoom */}
        <div className="absolute inset-0">
          <AnimatePresence>
            {imagesLoaded && heroImages.map((image, index) => (
              index === currentImageIndex && (
                <motion.div
                  key={`${index}-${currentImageIndex}`}
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: `url(${image})`,
                    y: backgroundY 
                  }}
                  initial={{ 
                    opacity: 0, 
                    scale: 1.05
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1.15, // Zoom lento mais pronunciado
                    transition: {
                      opacity: { duration: 1.2, ease: "easeOut" },
                      scale: { duration: 5, ease: "linear" }
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 1.2,
                    transition: { 
                      opacity: { duration: 0.8, ease: "easeIn" },
                      scale: { duration: 0.8, ease: "easeIn" }
                    }
                  }}
                >
                  {/* Overlay escuro */}
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/60 to-transparent"></div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Content com Parallax */}
        <motion.div 
          className="relative z-10 container mx-auto px-4"
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <motion.span 
                className="inline-block px-4 py-2 bg-primary/20 text-primary font-bold rounded-full text-sm mb-4 border border-primary/40"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Inteligência Artificial na Agricultura
              </motion.span>
            </motion.div>
            
            {/* Título Principal com Animação Palavra por Palavra */}
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              variants={titleVariants}
            >
              {["Transformando", "dados", "em"].map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-4"
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="text-primary inline-block"
                variants={wordVariants}
              >
                produtividade
              </motion.span>
            </motion.h1>
            
            {/* Subtítulo */}
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Tecnologia em Agricultura de Precisão para aumentar eficiência e reduzir custos na sua propriedade rural
            </motion.p>

            {/* Botões */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              variants={itemVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  variant="default"
                  size="lg"
                  onClick={scrollToContact}
                  className="text-lg px-8 py-4 h-auto bg-primary hover:bg-primary-dark text-primary-foreground relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary-dark"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    Fale Conosco
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleOpenModal}
                  className="text-lg px-8 py-4 h-auto border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-secondary font-semibold shadow-lg group"
                >
                  Solicitar Teste Gratuito
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="ml-2"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Animados */}
            <motion.div 
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20"
              variants={statsVariants}
            >
              <motion.div 
                className="text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: 2 }}
                >
                  {isVisible ? `+${precisionCount}%` : "+95%"}
                </motion.div>
                <div className="text-white/80 text-sm">Precisão nos dados</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: 2.2 }}
                >
                  {isVisible ? `-${costReductionCount}%` : "-30%"}
                </motion.div>
                <div className="text-white/80 text-sm">Redução de custos</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: 2.4 }}
                >
                  {isVisible ? `+${productivityCount}%` : "+25%"}
                </motion.div>
                <div className="text-white/80 text-sm">Aumento produtividade</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator Animado */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 3, duration: 0.5 }
          }}
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-white transition-colors">
              <motion.div 
                className="w-1 h-3 bg-white/50 rounded-full mt-2"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Modal de Teste Gratuito */}
      <FreeTrialModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default HeroSection;