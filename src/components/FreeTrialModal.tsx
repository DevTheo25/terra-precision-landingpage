import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Leaf } from "lucide-react";
import logoIcon from "@/assets/Icon-Png.png"; // Import da imagem
import ToastNotification from "./ToastNotification"; // Import do toast

// Schema de validação
const formSchema = z.object({
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  sobrenome: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  empresa: z.string().optional(), // Não obrigatório
  telefone: z.string().min(10, "Número de telefone inválido"),
  cultura: z.string().min(1, "Selecione uma cultura"),
  hectares: z.string().min(1, "Selecione uma opção de hectares"), // Mudou para string única
  privacidade: z.boolean().refine((val) => val === true, "Você deve aceitar a política de privacidade")
});

type FormData = z.infer<typeof formSchema>;

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FreeTrialModal = ({ isOpen, onClose }: FreeTrialModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedHectares, setSelectedHectares] = useState<string>(""); // Mudou para string única
  
  // Estados para o toast
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hectares: "", // Mudou para string vazia
      privacidade: false
    }
  });

  const culturas = [
    "Soja",
    "Milho", 
    "Cana-de-açúcar",
    "Algodão",
    "Café",
    "Trigo",
    "Feijão",
    "Arroz",
    "Pastagem",
    "Outros"
  ];

  const opcoesHectares = [
    { value: "ate-1000", label: "Até 1.000 ha" },
    { value: "1001-2000", label: "De 1.001 a 2.000 ha" },
    { value: "acima-2000", label: "Acima de 2.001 ha" }
  ];

  const handleHectaresChange = (value: string) => {
    setSelectedHectares(value);
    setValue("hectares", value);
  };

  // Funções para mostrar toast
  const showSuccessToast = (title: string, message: string) => {
    setToastType('success');
    setToastTitle(title);
    setToastMessage(message);
    setShowToast(true);
  };

  const showErrorToast = (title: string, message: string) => {
    setToastType('error');
    setToastTitle(title);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xrbakkqa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          subject: 'Nova Solicitação de Teste Gratuito - Terra Precision',
          message: `
            Nova solicitação de teste gratuito:
            
            Nome: ${data.nome} ${data.sobrenome}
            Email: ${data.email}
            Telefone: ${data.telefone}
            Empresa: ${data.empresa || 'Não informado'}
            Cultura Principal: ${data.cultura}
            Área (Hectares): ${data.hectares}
            
            Enviado em: ${new Date().toLocaleString('pt-BR')}
          `,
          _replyto: data.email,
          _subject: 'Nova Solicitação de Teste Gratuito'
        }),
      });

      if (response.ok) {
        showSuccessToast(
          'Solicitação Enviada!',
          'Recebemos sua solicitação de teste gratuito. Nossa equipe entrará em contato em breve para agendar a demonstração.'
        );
        reset();
        setSelectedHectares("");
        
        // Fecha o modal após 2 segundos para o usuário ver a mensagem
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error('Erro no servidor');
      }
      
    } catch (error) {
      console.error('Erro ao enviar:', error);
      showErrorToast(
        'Erro ao Enviar',
        'Não foi possível enviar sua solicitação. Por favor, tente novamente ou entre em contato via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 flex-shrink-0 bg-white rounded-lg p-1 border border-gray-200">
                    <img 
                      src={logoIcon} 
                      alt="Terra Precision Logo" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback para ícone se a imagem não carregar
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="fallback-icon w-full h-full bg-primary/10 rounded-lg items-center justify-center hidden">
                      <Leaf className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Teste Gratuito</h2>
                    <p className="text-sm text-gray-600">Terra Precision</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <p className="text-gray-600 text-center">
                Preencha os dados abaixo e nossa equipe entrará em contato para agendar uma demonstração gratuita.
              </p>

              {/* Row 1 - Email completo */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              {/* Row 2 - Nome e Sobrenome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                    Nome <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    {...register("nome")}
                    className={errors.nome ? 'border-red-500' : ''}
                  />
                  {errors.nome && <p className="text-red-500 text-xs">{errors.nome.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sobrenome" className="text-sm font-medium text-gray-700">
                    Sobrenome <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sobrenome"
                    placeholder="Seu sobrenome"
                    {...register("sobrenome")}
                    className={errors.sobrenome ? 'border-red-500' : ''}
                  />
                  {errors.sobrenome && <p className="text-red-500 text-xs">{errors.sobrenome.message}</p>}
                </div>
              </div>

              {/* Row 3 - Empresa (não obrigatório) */}
              <div className="space-y-2">
                <Label htmlFor="empresa" className="text-sm font-medium text-gray-700">
                  Nome da Empresa
                </Label>
                <Input
                  id="empresa"
                  placeholder="Nome da sua empresa/propriedade (opcional)"
                  {...register("empresa")}
                  className={errors.empresa ? 'border-red-500' : ''}
                />
                {errors.empresa && <p className="text-red-500 text-xs">{errors.empresa.message}</p>}
              </div>

              {/* Row 4 - Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                  Número de Telefone <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <div className="w-32">
                    <Select defaultValue="brazil">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brazil">🇧🇷 +55</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    {...register("telefone")}
                    className={`flex-1 ${errors.telefone ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.telefone && <p className="text-red-500 text-xs">{errors.telefone.message}</p>}
              </div>

              {/* Row 5 - Cultura */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Principal Cultura <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("cultura", value)}>
                  <SelectTrigger className={errors.cultura ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione a principal cultura" />
                  </SelectTrigger>
                  <SelectContent>
                    {culturas.map((cultura) => (
                      <SelectItem key={cultura} value={cultura.toLowerCase()}>
                        {cultura}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.cultura && <p className="text-red-500 text-xs">{errors.cultura.message}</p>}
              </div>

              {/* Row 6 - Hectares (seleção única) */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Área Total (Hectares) <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  {opcoesHectares.map((opcao) => (
                    <div key={opcao.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={opcao.value}
                        name="hectares"
                        value={opcao.value}
                        checked={selectedHectares === opcao.value}
                        onChange={() => handleHectaresChange(opcao.value)}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
                      />
                      <Label htmlFor={opcao.value} className="text-sm text-gray-700">
                        {opcao.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.hectares && <p className="text-red-500 text-xs">{errors.hectares.message}</p>}
              </div>

              {/* Privacy Policy */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacidade"
                  onCheckedChange={(checked) => setValue("privacidade", checked as boolean)}
                />
                <Label htmlFor="privacidade" className="text-xs text-gray-600 leading-relaxed">
                  Aceito receber comunicações da Terra Precision sobre produtos e serviços. Posso cancelar 
                  o recebimento a qualquer momento. Consulte nossa{" "}
                  <a href="#" className="text-primary hover:underline">
                    Política de Privacidade
                  </a>
                  .
                </Label>
              </div>
              {errors.privacidade && <p className="text-red-500 text-xs">{errors.privacidade.message}</p>}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  "Solicitar Teste Gratuito"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* Toast Notification - Renderizado fora do modal */}
    <ToastNotification
      show={showToast}
      type={toastType}
      title={toastTitle}
      message={toastMessage}
      onClose={handleCloseToast}
    />
  </>
  );
};

export default FreeTrialModal;