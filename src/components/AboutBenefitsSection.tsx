import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Target,
  Users, 
  MapPin, 
  Award
} from "lucide-react";

// Stats da empresa
const stats = [
  {
    icon: Users,
    number: "100+",
    label: "Produtores atendidos"
  },
  {
    icon: MapPin,
    number: "50K+",
    label: "Hectares mapeados"
  },
  {
    icon: Award,
    number: "4+",
    label: "Anos de experiência"
  }
];

// Benefícios principais
const benefits = [
  {
    icon: TrendingUp,
    title: "Aumento da Produtividade",
    description: "Otimize o rendimento da sua lavoura com dados precisos e análises detalhadas",
    highlight: "+25%"
  },
  {
    icon: BarChart3,
    title: "Redução de Perdas",
    description: "Identifique problemas antes que se tornem prejuízos significativos",
    highlight: "-40%"
  },
  {
    icon: Target,
    title: "Precisão nas Decisões",
    description: "Tome decisões estratégicas baseadas em dados confiáveis e atualizados",
    highlight: "95%"
  },
  {
    icon: Zap,
    title: "Eficiência Operacional",
    description: "Automatize processos e reduza custos operacionais da sua propriedade",
    highlight: "-30%"
  }
];

const AboutBenefitsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  return (
    <section id="sobre" className="py-20 bg-muted/30" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Lado Esquerdo - Sobre a Terra Precision */}
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              Sobre a Terra Precision
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Especialidade em agricultura
              <span className="block text-primary">de precisão</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              A Terra Precision é uma empresa especializada em soluções tecnológicas para agricultura de precisão. Nossa missão é apoiar produtores rurais com tecnologia de ponta, transformando dados em decisões estratégicas que geram resultados reais.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Utilizamos as mais avançadas tecnologias de mapeamento, processamento de imagens e inteligência artificial para oferecer insights precisos que impulsionam a produtividade e sustentabilidade das propriedades rurais.
            </p>

            {/* Stats da Empresa */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  variants={statsVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <motion.div 
                    className="text-2xl font-bold text-foreground"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lado Direito - Por que escolher a Terra Precision */}
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              Por que escolher a Terra Precision?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Resultados que fazem a
              <span className="block text-primary">diferença</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nossa tecnologia avançada em agricultura de precisão oferece benefícios reais e mensuráveis para sua propriedade rural.
            </p>

            {/* Grid de Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="group cursor-pointer"
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300">
                    <motion.div 
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {benefit.title}
                        </h3>
                        <motion.span 
                          className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded-full"
                          animate={{ 
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5,
                            repeatType: "reverse"
                          }}
                        >
                          {benefit.highlight}
                        </motion.span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBenefitsSection;