import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FreeTrialModal from "./FreeTrialModal";
import { 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  Calendar,
  MapPin,
  Clock
} from "lucide-react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Fale conosco agora",
    info: "(16) 99646-9093",
    link: "https://wa.me/5516996469093",
    primary: true
  },
  {
    icon: Mail,
    title: "E-mail",
    description: "Envie sua mensagem",
    info: "contato@terraprecision.com.br",
    link: "mailto:contato@terraprecision.com.br"
  },
  {
    icon: Globe,
    title: "Plataforma",
    description: "Visite nossa plataforma",
    info: "app.terraprecision.com.br",
    link: "https://app.terraprecision.com.br"
  }
];

const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    window.gtag('event', 'click', {
          event_category: 'CTA', 
          event_label: 'Teste Grátis - Contato Section'
        });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section id="contato" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              Entre em Contato
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Pronto para transformar
              <span className="block text-primary">sua agricultura?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Entre em contato conosco e descubra como nossa tecnologia pode revolucionar sua propriedade
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Methods */}
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  method.primary ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => window.open(method.link, '_blank')}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    method.primary ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                  } group-hover:scale-110 transition-transform`}>
                    <method.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {method.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{method.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-semibold text-foreground">{method.info}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Agende uma Demonstração Gratuita
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Veja na prática como nossa tecnologia pode aumentar sua produtividade
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={handleOpenModal}
                  className="text-lg px-8 py-4 h-auto bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Demonstração
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://wa.me/5516996469093', '_blank')}
                  className="text-lg px-8 py-4 h-auto border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary font-semibold shadow-lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Teste Gratuito */}
      <FreeTrialModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default ContactSection;