import { useState } from "react";
import { MysticalCard } from "@/components/MysticalCard";
import { MysticalButton } from "@/components/MysticalButton";
import { FloatingParticles } from "@/components/FloatingParticles";
import { ChevronLeft, ChevronRight, BookOpen, Star } from "lucide-react";

const EbookPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      id: "cover",
      title: "Capa",
      content: (
        <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
          <img src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png" alt="O Oráculo Interior" className="mx-auto w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 h-auto shadow-mystical rounded-lg" />
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-mystical-gradient font-['Arial_Black']">O Oráculo Interior</h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-primary px-2 font-['Arial_Black']">Um Guia Completo da Avó Divina para Você Começar a Ouvir as Respostas do seu Coração com o Tarô</p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground font-['Arial_Black']">por Avó Divina</p>
          </div>
        </div>
      )
    },
    {
      id: "intro",
      title: "Introdução - O Acolhimento",
      content: (
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-mystical-gradient mb-4 sm:mb-6 font-['Arial_Black']">Minha querida leitora,</h2>
          <p className="text-mystic-cream/90 font-['Arial_Black']">
            Se este guia chegou até você, é porque uma busca já começou aí dentro. Uma busca por clareza em meio ao ruído. 
            Uma busca por direção quando os caminhos parecem confusos. Uma busca por uma voz de sabedoria que, muitas vezes, 
            é a sua própria, apenas um pouco abafada pela correria da vida.
          </p>
          <p className="text-mystic-cream/90 font-['Arial_Black']">
            Eu conheço essa busca. E sei que o Tarô, muito mais do que um baralho de cartas, é uma ponte sagrada 
            de volta para casa, para dentro de você.
          </p>
          <p className="text-mystic-cream/90 font-['Arial_Black']">
            Este guia não foi feito para "prever seu futuro". Ele foi criado para te entregar a chave do seu Oráculo Interior. 
            Para que você possa, com suas próprias mãos, iluminar seu presente e construir o futuro que sua alma deseja.
          </p>
          <p className="text-mystic-gold font-semibold font-['Arial_Black']">
            Respire fundo. Sua jornada de clareza começa agora.
          </p>
          <p className="text-mystic-cream italic font-['Arial_Black']">Com carinho, Avó Divina.</p>
        </div>
      )
    },
    {
      id: "chapter1",
      title: "Capítulo 1 - O Tarô Não é o que te Contaram",
      content: (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-mystical-gradient mb-4 sm:mb-6 font-['Arial_Black']">O Tarô Não é o que te Contaram</h2>
          <img src="/tarot-spread.jpg" alt="Cartas de Tarô" className="w-full rounded-lg shadow-ethereal" />
          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-mystic-cream/90">
            <p className="font-['Arial_Black']">
              Esqueça as bolas de cristal e as videntes de feira. O verdadeiro poder do Tarô não está em adivinhar 
              números de loteria ou o nome do seu futuro amor. Isso é diminuir sua magia.
            </p>
            <p className="font-['Arial_Black']">
              O Tarô é um espelho de 78 facetas da alma humana. Cada carta é um arquétipo, uma emoção, uma lição, 
              um caminho. Quando você embaralha as cartas e faz uma pergunta, não está invocando espíritos; 
              está mergulhando no seu próprio inconsciente.
            </p>
            <p className="font-['Arial_Black']">
              As cartas que aparecem são um reflexo do que você já sabe, mas ainda não admitiu. Elas organizam 
              o caos interno, trazem à tona medos e desejos ocultos e, o mais importante, mostram as energias 
              disponíveis para você no momento.
            </p>
            <p className="text-mystic-gold font-semibold font-['Arial_Black']">
              Pense no Tarô como um sábio conselheiro. Ele não te dá as respostas, mas te ajuda a encontrar as suas próprias.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "chapter2",
      title: "Capítulo 2 - A Jornada do Herói Interior",
      content: (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-mystical-gradient mb-4 sm:mb-6 font-['Arial_Black']">A Jornada do Herói Interior</h2>
          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-mystic-cream/90">
            <p className="font-['Arial_Black']">
              As 22 cartas mais importantes, os Arcanos Maiores, contam uma história: a jornada da nossa alma pela vida. 
              Ela começa com O Louco (Arcano 0), puro potencial, dando um passo no abismo da experiência, e termina 
              com O Mundo (Arcano 21), a conclusão, a integração e a realização.
            </p>
            <p className="font-['Arial_Black']">No meio do caminho, encontramos mestres e desafios:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 my-4 sm:my-6">
              <MysticalCard className="p-3 sm:p-4">
                <h4 className="text-mystic-gold font-bold mb-2 text-sm sm:text-base font-['Arial_Black']">🎭 O Mago</h4>
                <p className="text-xs sm:text-sm font-['Arial_Black']">nos ensina que temos todas as ferramentas para manifestar nossa realidade.</p>
              </MysticalCard>
              <MysticalCard className="p-3 sm:p-4">
                <h4 className="text-mystic-gold font-bold mb-2 text-sm sm:text-base font-['Arial_Black']">👑 A Sacerdotisa</h4>
                <p className="text-xs sm:text-sm font-['Arial_Black']">nos lembra de ouvir nossa intuição e sabedoria interior.</p>
              </MysticalCard>
              <MysticalCard className="p-3 sm:p-4">
                <h4 className="text-mystic-gold font-bold mb-2 text-sm sm:text-base font-['Arial_Black']">💕 A Imperatriz</h4>
                <p className="text-xs sm:text-sm font-['Arial_Black']">nos ensina a nutrir nossos sonhos e projetos.</p>
              </MysticalCard>
              <MysticalCard className="p-3 sm:p-4">
                <h4 className="text-mystic-gold font-bold mb-2 text-sm sm:text-base font-['Arial_Black']">⚖️ O Imperador</h4>
                <p className="text-xs sm:text-sm font-['Arial_Black']">nos mostra como estruturar e organizar nossa vida.</p>
              </MysticalCard>
            </div>
            <p className="font-['Arial_Black']">
              Cada carta é um convite para olhar para dentro e reconhecer essas energias em você. 
              Não se preocupe em decorar todos os significados. Comece com as que mais te chamam atenção.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "chapter3",
      title: "Capítulo 3 - Sua Primeira Tiragem",
      content: (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-mystical-gradient mb-4 sm:mb-6 font-['Arial_Black']">Sua Primeira Tiragem</h2>
          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-mystic-cream/90">
            <p className="font-['Arial_Black']">
              Agora vamos ao que interessa: sua primeira leitura! Vou te ensinar uma tiragem simples de 3 cartas 
              que você pode usar para qualquer pergunta.
            </p>
            <div className="bg-primary/10 p-4 sm:p-6 rounded-lg border border-primary/20 my-4 sm:my-6">
              <h4 className="text-mystic-gold font-bold mb-3 sm:mb-4 text-lg sm:text-xl font-['Arial_Black']">🎯 Tiragem das 3 Cartas</h4>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <p className="font-['Arial_Black']"><strong>1ª Carta:</strong> O que você precisa saber sobre o passado</p>
                <p className="font-['Arial_Black']"><strong>2ª Carta:</strong> O que está acontecendo no presente</p>
                <p className="font-['Arial_Black']"><strong>3ª Carta:</strong> O que o futuro está preparando</p>
              </div>
            </div>
            <p className="font-['Arial_Black']">
              <strong>Passo a passo:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="font-['Arial_Black']">Escolha um momento tranquilo, sem pressa</li>
              <li className="font-['Arial_Black']">Formule uma pergunta clara e específica</li>
              <li className="font-['Arial_Black']">Embaralhe as cartas pensando na sua pergunta</li>
              <li className="font-['Arial_Black']">Corte o baralho em três partes</li>
              <li className="font-['Arial_Black']">Escolha uma carta de cada parte</li>
              <li className="font-['Arial_Black']">Coloque-as da esquerda para a direita</li>
            </ol>
            <p className="text-mystic-gold font-semibold font-['Arial_Black']">
              Lembre-se: não há cartas "boas" ou "ruins". Cada uma traz uma mensagem importante para você.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "chapter4",
      title: "Capítulo 4 - Interpretando as Cartas",
      content: (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-mystical-gradient mb-4 sm:mb-6 font-['Arial_Black']">Interpretando as Cartas</h2>
          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-mystic-cream/90">
            <p className="font-['Arial_Black']">
              A interpretação é onde a magia acontece. Mas antes de tudo, esqueça os livros por um momento. 
              A melhor interpretação vem de você.
            </p>
            <div className="bg-primary/10 p-4 sm:p-6 rounded-lg border border-primary/20 my-4 sm:my-6">
              <h4 className="text-mystic-gold font-bold mb-3 sm:mb-4 text-lg sm:text-xl font-['Arial_Black']">🔍 Como Interpretar</h4>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <p className="font-['Arial_Black']"><strong>1. Primeira impressão:</strong> O que você sente ao ver a carta?</p>
                <p className="font-['Arial_Black']"><strong>2. Símbolos:</strong> Que elementos chamam sua atenção?</p>
                <p className="font-['Arial_Black']"><strong>3. Conexão:</strong> Como ela se relaciona com sua pergunta?</p>
                <p className="font-['Arial_Black']"><strong>4. Intuição:</strong> O que sua voz interior está dizendo?</p>
              </div>
            </div>
            <p className="font-['Arial_Black']">
              <strong>Dica importante:</strong> As cartas falam através de símbolos e arquétipos. 
              Se uma carta não faz sentido imediatamente, deixe-a "respirar". 
              A resposta pode vir em sonhos, conversas ou insights durante o dia.
            </p>
            <p className="font-['Arial_Black']">
              <strong>Exemplo prático:</strong> Se você perguntou sobre um relacionamento e saiu O Sol, 
              pode significar que há muita luz e alegria disponível, ou que você precisa trazer mais 
              positividade para a situação.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "chapter5",
      title: "Capítulo 5 - Próximos Passos",
      content: (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-mystical-gradient mb-4 sm:mb-6 font-['Arial_Black']">Próximos Passos</h2>
          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-mystic-cream/90">
            <p className="font-['Arial_Black']">
              Parabéns! Você acabou de dar o primeiro passo em uma jornada incrível. 
              O Tarô é como um músculo: quanto mais você pratica, mais forte fica sua intuição.
            </p>
            <div className="bg-primary/10 p-4 sm:p-6 rounded-lg border border-primary/20 my-4 sm:my-6">
              <h4 className="text-mystic-gold font-bold mb-3 sm:mb-4 text-lg sm:text-xl font-['Arial_Black']">🚀 Para Continuar Crescendo</h4>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <p className="font-['Arial_Black']">• Faça uma tiragem por semana para praticar</p>
                <p className="font-['Arial_Black']">• Mantenha um diário das suas leituras</p>
                <p className="font-['Arial_Black']">• Observe como as mensagens se manifestam na sua vida</p>
                <p className="font-['Arial_Black']">• Confie na sua intuição - ela é sua maior aliada</p>
              </div>
            </div>
            <p className="font-['Arial_Black']">
              Lembre-se: você não precisa ser perfeita. Cada leitura é uma oportunidade de aprender 
              e se conectar mais profundamente com sua sabedoria interior.
            </p>
            <p className="font-['Arial_Black']">
              São os próximos passos para quem está realmente comprometida em transformar incerteza em poder.
            </p>
            <p className="font-['Arial_Black']">
              Seja qual for sua escolha, saiba que você já está no caminho certo.
            </p>
            <p className="text-mystic-cream italic font-['Arial_Black']">
              Com todo meu carinho e confiança em sua jornada,<br />
              Avó Divina
            </p>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <MysticalButton 
              variant="gold" 
              size="lg" 
              className="animate-pulse h-12 sm:h-14 text-base sm:text-lg font-['Arial_Black']"
              onClick={() => window.open('https://wa.me/5519981765316', '_blank')}
            >
              🌟 Fazer Minha Leitura Premium
            </MysticalButton>
          </div>
        </div>
      )
    }
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 pt-20 sm:pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-mystical-gradient mb-3 sm:mb-4 px-2 font-['Arial_Black']">
              O Oráculo Interior
            </h1>
            <div className="flex items-center justify-center space-x-2 text-primary text-xs sm:text-sm lg:text-base font-['Arial_Black']">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              <span>Página {currentPage + 1} de {pages.length}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary/30 rounded-full h-2 mb-4 sm:mb-6 lg:mb-8 mx-2 sm:mx-4">
            <div 
              className="bg-gold-gradient h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
            ></div>
          </div>

          {/* Page Content */}
          <MysticalCard variant="ethereal" className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] mx-2 sm:mx-4">
            {pages[currentPage].content}
          </MysticalCard>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-4 sm:mt-6 lg:mt-8 max-w-4xl mx-auto px-2 sm:px-4">
            <MysticalButton 
              variant="ethereal" 
              onClick={prevPage} 
              disabled={currentPage === 0}
              className="flex items-center space-x-2 text-xs sm:text-sm lg:text-base h-10 sm:h-12 font-['Arial_Black']"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:w-4" />
              <span className="hidden sm:inline">Anterior</span>
              <span className="sm:hidden">Ant.</span>
            </MysticalButton>

            <div className="flex space-x-1 sm:space-x-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                    index === currentPage 
                      ? 'bg-primary shadow-gold' 
                      : 'bg-secondary/50 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <MysticalButton 
              variant="ethereal" 
              onClick={nextPage} 
              disabled={currentPage === pages.length - 1}
              className="flex items-center space-x-2 text-xs sm:text-sm lg:text-base h-10 sm:h-12 font-['Arial_Black']"
            >
              <span className="hidden sm:inline">Próxima</span>
              <span className="sm:hidden">Próx.</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </MysticalButton>
          </div>

          {/* Floating Action */}
          {currentPage === pages.length - 1 && (
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
              <MysticalButton 
                variant="gold" 
                className="shadow-mystical text-xs sm:text-sm lg:text-base h-10 sm:h-12 font-['Arial_Black']"
                onClick={() => window.open('https://wa.me/5519981765316', '_blank')}
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Explorar Mais</span>
                <span className="sm:hidden">Mais</span>
              </MysticalButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EbookPage;