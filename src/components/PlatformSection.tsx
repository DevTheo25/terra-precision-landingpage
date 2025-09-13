import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import {
  BarChart3,
  Clock,
  Shield,
  Zap,

} from "lucide-react";
import FreeTrialModal from "./FreeTrialModal"; // Importado o modal

// Componente de Número Animado
const AnimatedNumber = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
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
    <span ref={ref} className="font-bold text-4xl text-primary">
      {prefix}{count}{suffix}
    </span>
  );
};

// Componente de Card de Feature Flutuante
const FloatingFeatureCard = ({ icon: Icon, title, description, delay = 0 }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

// Componente de Dashboard Mock
const DashboardMock = () => {
  return (
    <div className="w-full h-full bg-white rounded-lg p-4 shadow-inner">
      {/* Header do Dashboard */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-200 rounded"></div>
            <div className="text-xs text-gray-400">Terra Precision Dashboard</div>
          </div>
        </div>
      </div>

      {/* Métricas Superior */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "Área Total", value: "867.06 ha", color: "bg-primary" },
          { label: "Processados", value: "3", color: "bg-blue-500" },
          { label: "Em Análise", value: "5", color: "bg-yellow-500" },
          { label: "Concluídos", value: "12", color: "bg-green-500" }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="p-2 bg-gray-50 rounded-lg"
          >
            <div className="text-[8px] text-gray-500 mb-1">{metric.label}</div>
            <div className="text-sm font-bold text-gray-800">{metric.value}</div>
            <div className={`h-1 ${metric.color} rounded-full mt-1 opacity-60`}></div>
          </motion.div>
        ))}
      </div>

      {/* Tabela de Ordens */}
      <div className="bg-gray-50 rounded-lg p-2 mb-3">
        <div className="text-[10px] font-semibold text-gray-600 mb-2">Ordens Recentes</div>
        <div className="space-y-1">
          {[
            { fazenda: "Fazenda Bela Vista", status: "Em Processamento", data: "15/07/2025" },
            { fazenda: "Fazenda União", status: "Concluído", data: "14/07/2025" },
            { fazenda: "Fazenda Esperança", status: "Análise", data: "13/07/2025" }
          ].map((ordem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
              className="flex items-center justify-between bg-white p-1.5 rounded text-[9px]"
            >
              <span className="text-gray-700">{ordem.fazenda}</span>
              <span className={`px-2 py-0.5 rounded-full ${
                ordem.status === "Concluído" ? "bg-green-100 text-green-600" :
                ordem.status === "Em Processamento" ? "bg-blue-100 text-blue-600" :
                "bg-yellow-100 text-yellow-600"
              }`}>
                {ordem.status}
              </span>
              <span className="text-gray-400">{ordem.data}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-[10px] font-semibold text-gray-600 mb-2">Hectares Processados</div>
          <div className="flex items-end space-x-1 h-16">
            {[40, 65, 45, 70, 85, 60, 90].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.05 + 1, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t"
              />
            ))}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-[10px] font-semibold text-gray-600 mb-2">Ordens Concluídas</div>
          <div className="relative h-16 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="relative"
            >
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                <motion.circle
                  cx="28" cy="28" r="24"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 24 * 0.25 }}
                  transition={{ delay: 1.3, duration: 1 }}
                />
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="hsl(120, 85%, 35%)" />
                    <stop offset="100%" stopColor="hsl(120, 85%, 45%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800">75%</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Mobile Dashboard Mock
const MobileDashboardMock = () => {
  return (
    <div className="w-full h-full bg-white rounded-2xl p-3 shadow-inner">
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-3 text-[8px] text-gray-400">
        <span>9:41</span>
        <div className="flex space-x-1">
          <div className="w-3 h-2 bg-gray-400 rounded-sm"></div>
          <div className="w-3 h-2 bg-gray-400 rounded-sm"></div>
          <div className="w-3 h-2 bg-gray-400 rounded-sm"></div>
        </div>
      </div>

      {/* App Header */}
      <div className="bg-primary rounded-lg p-2 mb-3">
        <div className="text-white text-xs font-semibold">Terra Precision</div>
        <div className="text-white/80 text-[8px]">Dashboard Mobile</div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-green-50 rounded-lg p-2"
        >
          <div className="text-green-600 text-lg font-bold">867</div>
          <div className="text-[8px] text-green-600">Hectares</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 rounded-lg p-2"
        >
          <div className="text-blue-600 text-lg font-bold">12</div>
          <div className="text-[8px] text-blue-600">Projetos</div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-50 rounded-lg p-2 mb-2">
        <div className="text-[9px] font-semibold text-gray-600 mb-1">Atividade Recente</div>
        <div className="space-y-1">
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
              className="flex items-center justify-between bg-white p-1 rounded"
            >
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span className="text-[8px] text-gray-600">Nova análise</span>
              </div>
              <span className="text-[7px] text-gray-400">2h atrás</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mini Chart */}
      <div className="bg-gray-50 rounded-lg p-2">
        <div className="flex items-end space-x-0.5 h-12">
          {[30, 50, 40, 60, 45, 70, 55].map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.05 + 0.8 }}
              className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlatformSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const notebookRotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const notebookRotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

    // Função para redirecionar para a plataforma
  const handleLogin = () => {
    console.log('Login clicado');
    const platformUrl = import.meta.env.VITE_PLATFORM_URL || 'https://terra-precision-platform.onrender.com';
    
    // Pequeno delay para permitir animação antes do redirecionamento
    setTimeout(() => {
      window.location.href = platformUrl;
    }, 200);
  };

  const features = [
    {
      icon: Zap,
      title: "Solicite Serviços Rápido",
      description: "Solicite serviços de forma rápida e fácil"
    },
    {
      icon: Shield,
      title: "Centralização dos Dados",
      description: "Acompanhe e gerencie suas ordens de serviços em um só lugar"
    },
    {
      icon: Clock,
      title: "Acesso 24/7",
      description: "Plataforma disponível quando e onde você precisar"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Métricas detalhadas e insights para tomada de decisão"
    }
  ];

  return (
    <>
      <section
        ref={sectionRef}
        id="plataforma"
        className="py-20 bg-gradient-to-b from-white via-muted/20 to-white overflow-hidden relative"
        onMouseMove={handleMouseMove}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
            >
              Plataforma Digital
            </motion.span>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Toda sua operação em uma
              <span className="block text-primary">única plataforma</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gerencie, acompanhe e otimize todos os seus serviços agrícolas em tempo real.
              Interface intuitiva, resultados precisos.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
            {/* Left Features */}
            <motion.div
              className="lg:col-span-3 space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {features.slice(0, 2).map((feature, index) => (
                <FloatingFeatureCard
                  key={index}
                  {...feature}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </motion.div>

            {/* Center - Devices Mockup */}
            <motion.div
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-3xl animate-pulse"></div>

              {/* Notebook Mockup */}
              <motion.div
                className="relative z-10"
                style={{
                  rotateX: notebookRotateX,
                  rotateY: notebookRotateY,
                  transformPerspective: 1000
                }}
              >
                <div className="relative mx-auto max-w-2xl">
                  {/* Notebook Frame */}
                  <div className="bg-gray-900 rounded-t-2xl p-2">
                    <div className="bg-gray-800 rounded-t-xl px-4 py-1 flex items-center justify-center">
                      <div className="w-16 h-1 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gray-900 p-2 rounded-b-2xl shadow-2xl">
                    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[16/10]">
                      <DashboardMock />
                    </div>
                  </div>
                  <div className="bg-gray-800 h-4 rounded-b-2xl shadow-lg">
                    <div className="h-0.5 bg-gray-700 mx-auto w-32"></div>
                  </div>
                </div>

                {/* Mobile Mockup - Positioned beside notebook */}
                <motion.div
                  className="absolute -right-1 top-1/3 -translate-y-1/2 w-32 md:w-40"
                  initial={{ opacity: 0, x: 50, rotate: 5 }}
                  animate={isInView ? { opacity: 1, x: 0, rotate: 8 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <div className="bg-gray-900 rounded-3xl p-1.5 shadow-2xl">
                    <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[9/19]">
                      <MobileDashboardMock />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Features */}
            <motion.div
              className="lg:col-span-3 space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {features.slice(2, 4).map((feature, index) => (
                <FloatingFeatureCard
                  key={index}
                  {...feature}
                  delay={0.6 + index * 0.1}
                />
              ))}
            </motion.div>
          </div>


          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-lg text-muted-foreground mb-6">
              Experimente a diferença de uma gestão verdadeiramente digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleLogin}
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Acessar Plataforma
              </motion.button>
              <motion.button
                onClick={handleOpenModal}
                className="px-8 py-4 bg-white border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar Teste Gratuito
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <FreeTrialModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default PlatformSection;