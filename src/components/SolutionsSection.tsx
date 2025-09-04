import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { 
  Plane, 
  Image as ImageIcon, 
  Route, 
  Search, 
  ArrowRight,
  Zap
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

// Import solution images
import droneMapping from "@/assets/drone-mapping.png";
import imageProcessing from "@/assets/image-processing.jpg";
import harvestLines from "@/assets/harvest-lines.jpg";
import plantingFailures from "@/assets/planting-failures.jpg";
import parallelismLines from "@/assets/parallelism-lines.jpg";

// Componente para os benefícios rotativos
const RotatingBenefits = () => {
  const benefits = [
    { text: "seu campo", color: "text-primary" },
    { text: "sua equipe", color: "text-primary" },
    { text: "seu tempo", color: "text-primary" },
    { text: "seus recursos", color: "text-primary" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Inicia a animação quando entra na viewport
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Rotaciona os benefícios automaticamente
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefits.length);
    }, 2500); // Muda a cada 2.5 segundos

    return () => clearInterval(interval);
  }, [isVisible, benefits.length]);

  return (
    <span ref={ref} className="relative inline-block min-w-[140px] align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut"
          }}
          className={`font-bold ${benefits[currentIndex].color} inline-block whitespace-nowrap`}
        >
          {benefits[currentIndex].text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const solutions = [
  {
    title: "Mapeamento por Drone",
    description: "Captura de imagens aéreas de alta resolução para identificar problemas rapidamente e planejar ações com precisão estratégica.",
    features: ["Alta Qualidade de Imagem", "Análise em Tempo Real", "Mapas georeferenciados"],
    image: droneMapping
  },
  {
    title: "Processamento de Imagens",
    description: "Geração de ortomosaicos detalhados e georeferenciados para visualização completa e análise precisa da sua propriedade.",
    features: ["Ortomosaicos", "Análise multiespectral", "Modelos Digitais"],
    image: imageProcessing
  },
  {
    title: "Linhas de Colheita",
    description: "Inteligência Artificial para identificar linhas precisas de colheita, otimizando rendimento e reduzindo erros operacionais.",
    features: ["Automação completa", "Precisão centimétrica", "Otimização de rotas"],
    image: harvestLines
  },
  {
    title: "Falhas de Plantio",
    description: "Identificação altamente precisa de Falhas de Plantio através do uso de Inteligência Artificial",
    features: ["Inteligência Artificial", "Detecção Automática", "Diferentes Cenários de Solo"],
    image: plantingFailures
  },
  {
    title: "Linhas de Paralelismo",
    description: "Diagnóstico preciso de desvios no alinhamento das linhas de plantio para otimizar a colheita mecanizada.",
    features: ["Diagnóstico Rápido", "Qualidade do Plantio", "Máxima Eficiência"],
    image: parallelismLines
  }
];

const SolutionsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  // Setup do carousel API
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Função para ir para slide específico
  const goToSlide = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  }, [api]);

  // Variantes para animação dos cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="solucoes" className="py-20 bg-muted/30 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4"
            variants={itemVariants}
          >
            Nossas Soluções
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-foreground mb-6"
            variants={itemVariants}
          >
            Tecnologia que transforma
            <span className="block text-primary">sua agricultura</span>
          </motion.h2>
          
          <motion.div 
            className="text-xl text-muted-foreground max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <p className="leading-relaxed">
              Do plantio à colheita, tome decisões baseadas em dados e leve mais eficiência para{" "}
              <RotatingBenefits />.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="max-w-8xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-8">
              {solutions.map((solution, index) => (
                <CarouselItem key={index} className="pl-8 basis-full md:basis-4/5">
                  <motion.div 
                    className="p-4"
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group border-0 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 cursor-pointer">
                      <motion.div 
                        className="relative h-96 md:h-[510px] overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={solution.image} 
                          alt={solution.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Overlay content */}
                        <motion.div 
                          className="absolute bottom-8 left-8 right-8"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-2xl">
                            {solution.title}
                          </h3>
                          <p className="text-white/95 text-base md:text-lg leading-relaxed drop-shadow-lg max-w-lg">
                            {solution.description}
                          </p>
                        </motion.div>
                      </motion.div>
                      
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {solution.features.map((feature, featureIndex) => (
                            <motion.div 
                              key={featureIndex} 
                              className="flex items-center p-4 bg-gradient-to-r from-primary/10 to-primary/20 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-md group/feature"
                              whileHover={{ scale: 1.02, x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.div
                                className="group-hover/feature:animate-none"
                              >
                                <ArrowRight className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                              </motion.div>
                              <span className="text-sm font-semibold text-foreground">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Carousel Controls */}
            <CarouselPrevious className="hidden md:flex -left-20 bg-white/95 backdrop-blur-sm border-white/60 text-foreground hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl w-12 h-12" />
            <CarouselNext className="hidden md:flex -right-20 bg-white/95 backdrop-blur-sm border-white/60 text-foreground hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl w-12 h-12" />
          </Carousel>
          
          {/* Navigation indicators funcionais */}
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex space-x-4">
              {solutions.map((_, index) => {
                const isActive = current === index + 1;
                return (
                  <motion.button
                    key={index} 
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-primary scale-125' 
                        : 'bg-primary/40 hover:bg-primary/70'
                    }`}
                    whileHover={{ scale: isActive ? 1.25 : 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    animate={isActive ? { 
                      scale: [1.25, 1.35, 1.25],
                    } : {}}
                    transition={isActive ? { 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    } : { duration: 0.2 }}
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action Animado */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Deseja conhecer todas as soluções que nós oferecemos?
          </p>
          <motion.button 
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Entre em contato
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;