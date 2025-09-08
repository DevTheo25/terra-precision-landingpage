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
  Zap,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  BarChart3,
  Eye,
  Play
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

// Import solution images
import droneMapping from "@/assets/drone-mapping.png";
import imageProcessing from "@/assets/image-processing.jpg";
import harvestLines from "@/assets/harvest-lines.jpg";
import plantingFailures from "@/assets/planting-failures.jpg";
import parallelismLines from "@/assets/parallelism-lines.jpg";
import linesImage1 from "@/assets/lines_image_1.png";
import linesImage2 from "@/assets/lines_image_2.png";
import gapsImage1 from "@/assets/gaps_image_1.png";
import gapsImage2 from "@/assets/gaps_image_2.png";
import paraImage1 from "@/assets/para_image_1.png";
import paraImage2 from "@/assets/para_image_2.png";
import paraImage3 from "@/assets/para_image_3.png";
import paraImage4 from "@/assets/para_image_4.png";
import ortoImage from "@/assets/orto_image.png";
import ndviImage from "@/assets/ndvi_image.png";
import demImage from "@/assets/dem_image.png";
import droneVideo from "@/assets/mapeamento2.mp4";

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

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefits.length);
    }, 2500);

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

// Componente de Contador Animado
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="font-bold text-3xl text-primary">
      {count}{suffix}
    </span>
  );
};

// Componente de Alternância de Imagens (versão flexível)
const BeforeAfterImage = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Se não houver imagens ou apenas uma, não faz nada.
    if (!images || images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      // Avança para o próximo índice, voltando ao início se chegar ao fim.
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 1500); // Tempo de troca

    return () => clearInterval(interval);
  }, [images]); // O efeito depende do array de imagens

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <img
        src={images[currentIndex]}
        alt={`${title} - Passo ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
};

import React from 'react';

interface VideoPlayerProps {
  src: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title }) => {
  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <video
        src={src}
        title={title}
        className="w-full h-full object-cover"
        autoPlay // Inicia o vídeo automaticamente
        loop     // Repete o vídeo em loop
        muted    // Essencial para autoplay na maioria dos navegadores (começa mutado)
        playsInline // Importante para iOS, permite que o vídeo seja reproduzido no elemento sem ir para tela cheia
      >
        Seu navegador não suporta a tag de vídeo.
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
};

// Dados expandidos para cada solução
const solutionsDetailedData = {
  "Mapeamento por Drone": {
    impactPhrase: [
      { text: "Mapeie cada hectare com " },
      { text: "precisão", highlight: true },
      { text: " e transforme a gestão do campo em mais" },
      { text: " produtividade ", highlight: true },
      { text: " e " },
      { text: "lucro", highlight: true }
    ],
    type: "video", // Indica que é um vídeo
    mediaSrc: droneVideo, // A fonte do vídeo
    metrics: [
      { value: 500, suffix: "+", label: "Hectares/dia" },
      { value: 98, suffix: "%", label: "Precisão" },
      { value: 45, suffix: "%", label: "Redução de custos" }
    ],
    howItWorks: [
      { icon: Plane, title: "Voo Autônomo", description: "Drone mapeia área automaticamente" },
      { icon: ImageIcon, title: "GSD de 2cm", description: "Imagens de altíssima resolução" },
      { icon: Target, title: "Altíssima Precisão", description: "Imagens georreferenciadas" }
    ],
    differential: "A Terra Precision oferece uma análise completa da sua propriedade, desde o operacional até a geração de dados que apoiam decisões mais precisas.",
    results: [
      "Visão Completa e Detalhada da Propriedade",
      "Monitoramento da Produtividade",
      "Planejamento de Operações com Precisão"
    ]
  },
  "Processamento de Imagens": {
    impactPhrase: [
      { text: "Transforme sua fazenda em " },
      { text: "dados", highlight: true },
      { text: " e seus " },
      { text: "dados", highlight: true },
      { text: " em " },
      { text: "mais produtividade.", highlight: true }
    ],
    images: [ortoImage, ndviImage, demImage],
    metrics: [
      { value: 100, suffix: "%", label: "Qualidade de Imagem" },
      { value: 99, suffix: "%", label: "Acurácia" },
      { value: 12, suffix: "h", label: "Agilidade na Entrega" }
    ],
    howItWorks: [
      { icon: ImageIcon, title: "Upload em Nuvem", description: "Envie imagens de qualquer fonte" },
      { icon: Zap, title: "IA Processamento", description: "Algoritmos otimizados" },
      { icon: BarChart3, title: "Insights Precisos", description: "Mapas de calor e relatórios" }
    ],
    differential: "Nossos processamentos são realizados em servidores de altíssima capacidade computacional, garantindo máxima qualidade e precisão nos dados.",
    results: [
      "Ortomosaicos georeferenciados de alta precisão",
      "Índices vegetativos (NDVI, NDRE, etc.)",
      "Modelos 3D do terreno para planejamento"
    ]
  },
  "Linhas de Colheita": {
    impactPhrase: [
        { text: "Reduza em " },
        { text: "40%", highlight: true },
        { text: " o tempo de colheita com " },
        { text: "rotas identificadas", highlight: true },
        { text: " por Inteligência Artificial" }
    ],
    images: [linesImage2, linesImage1],
    metrics: [
      { value: 40, suffix: "%", label: "Tempo reduzido" },
      { value: 98, suffix: "%", label: "Precisão de rota" },
      { value: 35, suffix: "%", label: "Economia combustível" }
    ],
    howItWorks: [
      { icon: Route, title: "Análise do Campo", description: "Mapeamento completo da área" },
      { icon: Sparkles, title: "Inteligência Artificial", description: "Identificação automática das rotas" },
      { icon: CheckCircle2, title: "Execução Perfeita", description: "Integração com GPS do maquinário" }
    ],
    differential: "Além de contar com uma IA treinada em milhares de hectares em diferentes cenários, a nossa solução passa por um controle de qualidade, garantindo ainda mais precisão e excelência nos resultados.",
    results: [
      "Aumento da Eficiência e Produtividade",
      "Redução de Perdas",
      "Otimização do Uso de Insumos"
    ]
  },
  "Falhas de Plantio": {
    impactPhrase: [
        { text: "Identifique " },
        { text: " Falhas de Plantio ", highlight: true },
        { text: "e transforme perdas em" },
        { text: " produtividade", highlight: true }
    ],
    images: [gapsImage1, gapsImage2],
    metrics: [
      { value: 95, suffix: "%", label: "Taxa detecção" },
      { value: 5, suffix: "%", label: "Aumento de produtividade" },
      { value: 4, suffix: "h", label: "Análise rápida" }
    ],
    howItWorks: [
      { icon: Search, title: "Varredura Total", description: "100% da área analisada" },
      { icon: Target, title: "Inteligência Artificial", description: "Detecção automática de falhas" },
      { icon: TrendingUp, title: "Plano de Ação", description: "Relatório com recomendações" }
    ],
    differential: "Treinada em milhares de hectares e diversos cenários, nossa IA entrega máxima precisão e qualidade em diferentes tipos de solos e estágios da cultura",
    results: [
      "Aumento de Produtividade",
      "Otimização de Custos",
      "Tomada de Decisão Baseada em Dados"
    ]
  },
  "Linhas de Paralelismo": {
    impactPhrase: [
        { text: "Aumente em " },
        { text: "25% a eficiência operacional", highlight: true },
        { text: " com a " },
        { text: "identificação e correção", highlight: true },
        { text: " do paralelismo" },
        { text: " da sua plantação" }
    ],
    images: [paraImage1, paraImage2, paraImage3, paraImage4],
    metrics: [
      { value: 98, suffix: "%", label: "Precisão de identificação" },
      { value: 25, suffix: "%", label: "Eficiência aumentada" },
      { value: 15, suffix: "%", label: "Redução de perdas" }
    ],
    howItWorks: [
      { icon: Eye, title: "Análise Automática", description: "Análise das linhas de colheita" },
      { icon: Target, title: "Identificação Precisa", description: "Identificação do paralelismo das linhas" },
      { icon: TrendingUp, title: "Relatório Analítico", description: "Relatório com classificações do paralelismo" }
    ],
    differential: "Nossa solução identifica erros de paralelismo com precisão centimétrica, classificando-os desde o ponto mais crítico até o ideal.",
    results: [
      "Redução de Perdas",
      "Aumento da Eficiência Operacional",
      "Aumento de Produtividade"
    ]
  }
};

const solutions = [
  {
    title: "Mapeamento por Drone",
    description: "Captura de imagens aéreas de alta resolução para identificar problemas rapidamente e planejar ações com precisão estratégica.",
    features: ["Alta Qualidade de Imagem", "Análise em Tempo Real", "Mapas georeferenciados"],
    image: droneMapping,
    icon: Plane
  },
  {
    title: "Processamento de Imagens",
    description: "Geração de ortomosaicos detalhados e georeferenciados para visualização completa e análise precisa da sua propriedade.",
    features: ["Ortomosaicos", "Análise multiespectral", "Modelos Digitais"],
    image: imageProcessing,
    icon: ImageIcon
  },
  {
    title: "Linhas de Colheita",
    description: "Inteligência Artificial para identificar linhas precisas de colheita, otimizando rendimento e reduzindo erros operacionais.",
    features: ["Automação completa", "Precisão centimétrica", "Otimização de rotas"],
    image: harvestLines,
    icon: Route
  },
  {
    title: "Falhas de Plantio",
    description: "Identificação altamente precisa de Falhas de Plantio através do uso de Inteligência Artificial",
    features: ["Inteligência Artificial", "Detecção Automática", "Diferentes Cenários de Solo"],
    image: plantingFailures,
    icon: Search
  },
  {
    title: "Linhas de Paralelismo",
    description: "Diagnóstico preciso de desvios no alinhamento das linhas de plantio para otimizar a colheita mecanizada.",
    features: ["Diagnóstico Rápido", "Qualidade do Plantio", "Máxima Eficiência"],
    image: parallelismLines,
    icon: Target
  }
];

const SolutionsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
      setExpandedCard(null); // Fecha expansão ao mudar slide
    });
  }, [api]);

  // Função para ir para slide específico
  const goToSlide = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  }, [api]);

  // Toggle expansão
  const toggleExpansion = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Variantes para animação
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
  const buttonVariants = {
    pulsing: { // Estado de "tremer"
      rotate: [0, -1, 1, -1, 1, 0], // Sequência de rotações rápidas para criar o tremor
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    stopped: { // Estado quando ESTÁ expandido
      rotate: 0, // Garante que a rotação volte a zero
      y: 0,
      scale: 1,
      transition: { duration: 0.2 } // Transição suave para o estado parado
    },
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
              {solutions.map((solution, index) => {
                const detailedData = solutionsDetailedData[solution.title as keyof typeof solutionsDetailedData];
                const isExpanded = expandedCard === index;

                return (
                  <CarouselItem key={index} className="pl-8 basis-full md:basis-4/5">
                    <motion.div
                      className="p-6"
                      variants={cardVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="group border-0 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 cursor-pointer">
                        <motion.div
                          className="relative h-80 md:h-[420px] overflow-hidden"
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
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {solution.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                className="flex items-center p-4 bg-gradient-to-r from-primary/10 to-primary/20 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-md group/feature"
                                whileHover={{ scale: 1.02, x: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ArrowRight className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                <span className="text-sm font-semibold text-foreground">{feature}</span>
                              </motion.div>
                            ))}
                          </div>


                          {/* Botão de Expansão */}
                          <div className="flex justify-center mt-2">
                            <motion.button
                              onClick={() => toggleExpansion(index)}
                              className="group py-3 px-8 bg-transparent border-2 border-primary text-primary font-semibold rounded-full flex items-center justify-center space-x-3 transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/40"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              
                              // ATUALIZADO AQUI
                              variants={buttonVariants}
                              animate={isExpanded ? "stopped" : "pulsing"}
                              initial="stopped" // Define o estado inicial como parado
                            >
                              <span>{isExpanded ? 'Ver Menos' : 'Ver Detalhes'}</span>
                              <motion.div
                                className="transition-transform duration-300 ease-in-out"
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                              >
                                <ChevronDown className="h-5 w-5" />
                              </motion.div>
                            </motion.button>
                          </div>

                          {/* Área Expandida */}
                          <AnimatePresence>
                            {isExpanded && detailedData && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pt-8 space-y-8">
                                  {/* Frase de Impacto*/}
                                  <motion.div
                                    className="text-center p-6 rounded-xl"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                  >
                                    <p className="text-xl font-bold text-foreground">
                                      {detailedData.impactPhrase.map((segment, idx) => (
                                        <span key={idx} className={segment.highlight ? 'text-primary' : ''}>
                                          {segment.text}
                                        </span>
                                      ))}
                                    </p>
                                  </motion.div>

                                  {/* Antes e Depois + Métricas */}
                                  <div className="grid md:grid-cols-5 gap-6">
                                    <div className="md:col-span-3">
                                      {detailedData.type === "video" ? (
                                        <VideoPlayer src={detailedData.mediaSrc} title={solution.title} />
                                      ) : (
                                        <BeforeAfterImage images={detailedData.images} title={solution.title} />
                                      )}
                                    </div>
                                    <div className="md:col-span-2 space-y-4">
                                      <h4 className="text-lg font-bold text-foreground flex items-center">
                                        <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                                        Resultados Comprovados
                                      </h4>
                                      {detailedData.metrics.map((metric, idx) => (
                                        <motion.div
                                          key={idx}
                                          className="p-4 bg-card rounded-lg border border-border/50"
                                          initial={{ x: 20, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          transition={{ delay: 0.2 + idx * 0.1 }}
                                        >
                                          <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                                          <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Como Funciona */}
                                  <motion.div
                                    className="space-y-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <h4 className="text-lg font-bold text-foreground flex items-center">
                                      <Zap className="h-5 w-5 mr-2 text-primary" />
                                      Como Funciona
                                    </h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                      {detailedData.howItWorks.map((step, idx) => {
                                        const Icon = step.icon;
                                        return (
                                          <motion.div
                                            key={idx}
                                            className="p-4 bg-gradient-to-br from-card to-card/50 rounded-lg border border-border/50"
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                          >
                                            <Icon className="h-8 w-8 text-primary mb-3" />
                                            <h5 className="font-semibold text-foreground mb-1">{step.title}</h5>
                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                          </motion.div>
                                        );
                                      })}
                                    </div>
                                  </motion.div>

                                  {/* Resultados Esperados */}
                                  <motion.div
                                    className="grid md:grid-cols-2 gap-6"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                  >
                                    <div>
                                      <h4 className="text-lg font-bold text-foreground mb-3 flex items-center">
                                        <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                                        Benefícios Principais
                                      </h4>
                                      <ul className="space-y-2">
                                        {detailedData.results.map((result, idx) => (
                                          <motion.li
                                            key={idx}
                                            className="flex items-start"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 + idx * 0.1 }}
                                          >
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-foreground">{result}</span>
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="text-lg font-bold text-foreground mb-3 flex items-center">
                                        <Target className="h-5 w-5 mr-2 text-primary" />
                                        Nosso Diferencial
                                      </h4>
                                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                                        <p className="text-sm text-foreground italic">
                                          "{detailedData.differential}"
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>

                                  {/* CTAs */}
                                  <motion.div
                                    className="flex justify-center pt-6 border-t border-border/50"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                  >
                                    <button
                                      onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                                      className="py-4 px-8 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                      <Play className="h-5 w-5" />
                                      <span>Agendar Demonstração</span>
                                    </button>
                                  </motion.div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Carousel Controls */}
            <CarouselPrevious className="hidden md:flex -left-20 bg-white/95 backdrop-blur-sm border-white/60 text-foreground hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl w-12 h-12" />
            <CarouselNext className="hidden md:flex -right-20 bg-white/95 backdrop-blur-sm border-white/60 text-foreground hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl w-12 h-12" />
          </Carousel>

          {/* Navigation indicators */}
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

        {/* Call to Action */}
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