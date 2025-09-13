import { Leaf, Phone, Mail, Globe, MapPin } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();

return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div>
                <h3 className="font-bold text-xl">Terra Precision</h3>
                <p className="text-sm text-secondary-foreground/70">Agricultura de Precisão</p>
              </div>
            </div>
            <p className="text-secondary-foreground/80 mb-6 max-w-md">
              Transformando dados em produtividade através de tecnologia avançada em agricultura de precisão. 
              Soluções que fazem a diferença na sua propriedade rural.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/5516996469093" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contato@terraprecision.com.br"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://terraprecision.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Serviços</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>Mapeamento por Drone</li>
              <li>Processamento de Imagens</li>
              <li>Linhas de Colheita</li>
              <li>Falhas de Plantio</li>
              <li>Linhas de Paralelismo</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <div className="space-y-3 text-secondary-foreground/80">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(16) 99646-9093</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contato@terraprecision.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-primary" />
                <span>terraprecision.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground/60 text-sm">
            © {currentYear} Terra Precision. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-secondary-foreground/60 hover:text-primary text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-secondary-foreground/60 hover:text-primary text-sm transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;