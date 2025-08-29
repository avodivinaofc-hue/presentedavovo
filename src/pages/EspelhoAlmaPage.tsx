import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MysticalButton } from "@/components/MysticalButton";
import { MysticalCard } from "@/components/MysticalCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Eye, Clock, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EspelhoAlmaPage = () => {
  const location = useLocation();
  const { name = "querida", isPaid = false } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: name,
    birthDate: "",
    birthTime: "",
    question: "",
    focus: ""
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAnalysis = async () => {
    if (!formData.birthDate || !formData.question) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha sua data de nascimento e sua pergunta.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simular análise por IA
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Análise personalizada baseada nos dados
    const mockAnalysis = {
      passado: {
        titulo: "Suas Raízes Energéticas",
        carta: "A Sacerdotisa",
        significado: "Você carrega uma conexão profunda com sua intuição, mas tem permitido que as opiniões externas abafem sua voz interior. Seu passado recente mostra um período de introspecção necessária."
      },
      presente: {
        titulo: "Seu Momento Atual", 
        carta: "O Mago",
        significado: "Todas as ferramentas para manifestar seus desejos estão em suas mãos agora. É um momento de ação consciente e direcionada. Confie no seu poder pessoal."
      },
      futuro: {
        titulo: "Seu Caminho À Frente",
        carta: "O Sol",
        significado: "Clareza, alegria e sucesso estão chegando. O período de incerteza está terminando e uma fase de realização e felicidade genuína se aproxima."
      },
      conselho: "Confie mais na sua intuição. O universo está conspirando a seu favor, mas é preciso que você dê o primeiro passo com coragem e determinação."
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    
    toast({
      title: "Análise completa! ✨",
      description: "Sua leitura personalizada foi gerada com sucesso."
    });
  };

  if (!isPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FloatingParticles />
        <MobileNavigation />
        <MysticalCard variant="glowing" className="p-6 sm:p-8 text-center max-w-md mx-4">
          <h2 className="text-xl sm:text-2xl font-bold text-mystical-gradient mb-4">Acesso Restrito</h2>
          <p className="text-foreground/90 mb-6 text-sm sm:text-base">
            Esta ferramenta é exclusiva para membros que adquiriram o acesso.
          </p>
          <MysticalButton variant="gold" onClick={() => window.history.back()}>
            Voltar
          </MysticalButton>
        </MysticalCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      <MobileNavigation />
      
      <div className="container mx-auto spacing-section pt-16 md:pt-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-mystical-gradient mb-4">
            🔮 O Espelho da Alma
          </h1>
          <p className="text-lg sm:text-xl text-foreground/90 px-4">
            Bem-vinda, {name}! Vamos revelar as energias que cercam sua jornada atual.
          </p>
        </div>

        {!analysis ? (
          /* Formulário */
          <MysticalCard variant="ethereal" className="max-w-2xl mx-auto p-6 sm:p-8 mx-4">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-mystic-gold/20 rounded-full mb-4">
                  <Eye className="w-8 h-8 text-mystic-gold" />
                </div>
                <h2 className="text-2xl font-bold text-mystical-gradient mb-2">
                  Prepare-se para Sua Revelação
                </h2>
                <p className="text-mystic-cream/80">
                  Preencha os dados abaixo para receber sua análise personalizada
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-mystic-gold">Seu Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream"
                    placeholder="Como você gostaria de ser chamada?"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="birthDate" className="text-mystic-gold">Data de Nascimento *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="birthTime" className="text-mystic-gold">Horário de Nascimento (opcional)</Label>
                    <Input
                      id="birthTime"
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => handleInputChange("birthTime", e.target.value)}
                      className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="focus" className="text-mystic-gold">Área de Foco</Label>
                  <Select onValueChange={(value) => handleInputChange("focus", value)}>
                    <SelectTrigger className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream">
                      <SelectValue placeholder="Selecione a área que mais te preocupa" />
                    </SelectTrigger>
                    <SelectContent className="bg-mystic-blue border-mystic-purple-light">
                      <SelectItem value="amor">Amor e Relacionamentos</SelectItem>
                      <SelectItem value="carreira">Carreira e Trabalho</SelectItem>
                      <SelectItem value="financas">Finanças e Prosperidade</SelectItem>
                      <SelectItem value="saude">Saúde e Bem-estar</SelectItem>
                      <SelectItem value="familia">Família</SelectItem>
                      <SelectItem value="espiritualidade">Espiritualidade</SelectItem>
                      <SelectItem value="proposito">Propósito de Vida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="question" className="text-mystic-gold">Sua Pergunta *</Label>
                  <Textarea
                    id="question"
                    value={formData.question}
                    onChange={(e) => handleInputChange("question", e.target.value)}
                    className="bg-mystic-blue/30 border-mystic-purple-light text-mystic-cream min-h-[100px]"
                    placeholder="Descreva o que mais te inquieta ou o que você gostaria de compreender melhor neste momento da sua vida..."
                    required
                  />
                </div>
              </div>

              <MysticalButton
                variant="gold"
                size="lg"
                onClick={generateAnalysis}
                disabled={isAnalyzing}
                className="w-full text-xl font-bold"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Consultando o Oráculo...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Revelar Minha Análise
                  </>
                )}
              </MysticalButton>

              <p className="text-xs text-mystic-cream/60 text-center">
                Sua análise será gerada com base nas energias astrológicas e simbólicas do momento
              </p>
            </div>
          </MysticalCard>
        ) : (
          /* Resultado da Análise */
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-mystical-gradient mb-4">
                ✨ Sua Análise Está Pronta, {formData.name}!
              </h2>
              <p className="text-mystic-cream/90">
                As energias foram consultadas. Aqui está o que o Oráculo revelou sobre sua jornada:
              </p>
            </div>

            {/* Análise do Passado */}
            <MysticalCard variant="glowing" className="p-8">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-mystic-gold mr-3" />
                <h3 className="text-2xl font-bold text-mystical-gradient">{analysis.passado.titulo}</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-mystic-purple/30 p-6 rounded-lg mb-4">
                    <h4 className="font-bold text-mystic-gold text-lg">{analysis.passado.carta}</h4>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-mystic-cream/90 leading-relaxed">{analysis.passado.significado}</p>
                </div>
              </div>
            </MysticalCard>

            {/* Análise do Presente */}
            <MysticalCard variant="glowing" className="p-8">
              <div className="flex items-center mb-6">
                <Zap className="w-8 h-8 text-mystic-gold mr-3" />
                <h3 className="text-2xl font-bold text-mystical-gradient">{analysis.presente.titulo}</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-mystic-purple/30 p-6 rounded-lg mb-4">
                    <h4 className="font-bold text-mystic-gold text-lg">{analysis.presente.carta}</h4>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-mystic-cream/90 leading-relaxed">{analysis.presente.significado}</p>
                </div>
              </div>
            </MysticalCard>

            {/* Análise do Futuro */}
            <MysticalCard variant="glowing" className="p-8">
              <div className="flex items-center mb-6">
                <Sparkles className="w-8 h-8 text-mystic-gold mr-3" />
                <h3 className="text-2xl font-bold text-mystical-gradient">{analysis.futuro.titulo}</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-mystic-purple/30 p-6 rounded-lg mb-4">
                    <h4 className="font-bold text-mystic-gold text-lg">{analysis.futuro.carta}</h4>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-mystic-cream/90 leading-relaxed">{analysis.futuro.significado}</p>
                </div>
              </div>
            </MysticalCard>

            {/* Conselho Final */}
            <MysticalCard variant="ethereal" className="p-8 text-center">
              <h3 className="text-2xl font-bold text-mystical-gradient mb-4">💫 Conselho do Oráculo</h3>
              <p className="text-lg text-mystic-cream/90 leading-relaxed italic">
                "{analysis.conselho}"
              </p>
            </MysticalCard>

            {/* Call to Action */}
            <div className="text-center">
              <MysticalButton 
                variant="gold" 
                size="lg"
                onClick={() => window.print()}
                className="mr-4"
              >
                📄 Salvar Análise
              </MysticalButton>
              <MysticalButton 
                variant="ethereal"
                onClick={() => setAnalysis(null)}
              >
                🔮 Nova Consulta
              </MysticalButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EspelhoAlmaPage;