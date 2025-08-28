import { useState } from "react";
import { MysticalCard } from "@/components/MysticalCard";
import { MysticalButton } from "@/components/MysticalButton";
import { FloatingParticles } from "@/components/FloatingParticles";
import { ChevronLeft, ChevronRight, BookOpen, Star } from "lucide-react";
import tarotSpread from "@/assets/tarot-spread.jpg";
import avoPortrait from "@/assets/avo-divina-portrait.jpg";

const EbookPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      id: "cover",
      title: "Capa",
      content: (
        <div className="text-center space-y-8">
          <img src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png" alt="O Oráculo Interior" className="mx-auto w-64 md:w-96 shadow-mystical rounded-lg" />
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-mystical-gradient">O Oráculo Interior</h1>
            <p className="text-xl md:text-2xl text-mystic-gold">Um Guia da Avó Divina para Você Começar a Ouvir as Respostas do seu Coração com o Tarô</p>
            <p className="text-lg text-mystic-cream/80">por Avó Divina</p>
          </div>
        </div>
      )
    },
    {
      id: "intro",
      title: "Introdução - O Acolhimento",
      content: (
        <div className="space-y-6 text-lg leading-relaxed">
          <h2 className="text-3xl font-bold text-mystical-gradient mb-6">Minha querida leitora,</h2>
          <p className="text-mystic-cream/90">
            Se este guia chegou até você, é porque uma busca já começou aí dentro. Uma busca por clareza em meio ao ruído. 
            Uma busca por direção quando os caminhos parecem confusos. Uma busca por uma voz de sabedoria que, muitas vezes, 
            é a sua própria, apenas um pouco abafada pela correria da vida.
          </p>
          <p className="text-mystic-cream/90">
            Eu conheço essa busca. E sei que o Tarô, muito mais do que um baralho de cartas, é uma ponte sagrada 
            de volta para casa, para dentro de você.
          </p>
          <p className="text-mystic-cream/90">
            Este guia não foi feito para "prever seu futuro". Ele foi criado para te entregar a chave do seu Oráculo Interior. 
            Para que você possa, com suas próprias mãos, iluminar seu presente e construir o futuro que sua alma deseja.
          </p>
          <p className="text-mystic-gold font-semibold">
            Respire fundo. Sua jornada de clareza começa agora.
          </p>
          <p className="text-mystic-cream italic">Com carinho, Avó Divina.</p>
        </div>
      )
    },
    {
      id: "chapter1",
      title: "Capítulo 1 - O Tarô Não é o que te Contaram",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-mystical-gradient mb-6">O Tarô Não é o que te Contaram</h2>
          <img src={tarotSpread} alt="Cartas de Tarô" className="w-full rounded-lg shadow-ethereal" />
          <div className="space-y-4 text-lg leading-relaxed text-mystic-cream/90">
            <p>
              Esqueça as bolas de cristal e as videntes de feira. O verdadeiro poder do Tarô não está em adivinhar 
              números de loteria ou o nome do seu futuro amor. Isso é diminuir sua magia.
            </p>
            <p>
              O Tarô é um espelho de 78 facetas da alma humana. Cada carta é um arquétipo, uma emoção, uma lição, 
              um caminho. Quando você embaralha as cartas e faz uma pergunta, não está invocando espíritos; 
              está mergulhando no seu próprio inconsciente.
            </p>
            <p>
              As cartas que aparecem são um reflexo do que você já sabe, mas ainda não admitiu. Elas organizam 
              o caos interno, trazem à tona medos e desejos ocultos e, o mais importante, mostram as energias 
              disponíveis para você no momento.
            </p>
            <p className="text-mystic-gold font-semibold">
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
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-mystical-gradient mb-6">A Jornada do Herói Interior</h2>
          <div className="space-y-4 text-lg leading-relaxed text-mystic-cream/90">
            <p>
              As 22 cartas mais importantes, os Arcanos Maiores, contam uma história: a jornada da nossa alma pela vida. 
              Ela começa com O Louco (Arcano 0), puro potencial, dando um passo no abismo da experiência, e termina 
              com O Mundo (Arcano 21), a conclusão, a integração e a realização.
            </p>
            <p>No meio do caminho, encontramos mestres e desafios:</p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <MysticalCard className="p-4">
                <h4 className="text-mystic-gold font-bold mb-2">🎭 O Mago</h4>
                <p className="text-sm">nos ensina que temos todas as ferramentas para manifestar nossa realidade.</p>
              </MysticalCard>
              <MysticalCard className="p-4">
                <h4 className="text-mystic-gold font-bold mb-2">🌙 A Sacerdotisa</h4>
                <p className="text-sm">nos pede para silenciar e ouvir nossa intuição profunda.</p>
              </MysticalCard>
              <MysticalCard className="p-4">
                <h4 className="text-mystic-gold font-bold mb-2">⚡ A Torre</h4>
                <p className="text-sm">representa aqueles momentos em que a vida derruba tudo o que achávamos seguro, para que possamos construir algo mais verdadeiro.</p>
              </MysticalCard>
              <MysticalCard className="p-4">
                <h4 className="text-mystic-gold font-bold mb-2">☀️ O Sol</h4>
                <p className="text-sm">nos promete alegria, clareza e sucesso após os tempos difíceis.</p>
              </MysticalCard>
            </div>
            <p className="text-mystic-gold font-semibold">
              Sua vida é essa jornada. O Tarô apenas te ajuda a saber em que capítulo você está.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "chapter3",
      title: "Capítulo 3 - Sua Primeira Conversa com o Oráculo",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-mystical-gradient mb-6">Sua Primeira Conversa com o Oráculo</h2>
          <p className="text-lg text-mystic-cream/90">
            Vamos à prática. A tiragem de 3 cartas é a mais simples e poderosa para iniciantes.
          </p>
          
          <div className="space-y-6">
            <MysticalCard className="p-6">
              <h4 className="text-xl font-bold text-mystic-gold mb-4">🕯️ Passo 1: A Preparação</h4>
              <p className="text-mystic-cream/90">
                Encontre um lugar calmo. Acenda uma vela ou um incenso, se quiser. Segure o baralho nas mãos 
                e respire fundo três vezes. Acalme sua mente.
              </p>
            </MysticalCard>

            <MysticalCard className="p-6">
              <h4 className="text-xl font-bold text-mystic-gold mb-4">❓ Passo 2: A Pergunta</h4>
              <p className="text-mystic-cream/90">
                Concentre-se na sua dúvida ou na área da sua vida que precisa de luz. 
                (Veremos como perguntar no próximo capítulo!).
              </p>
            </MysticalCard>

            <MysticalCard className="p-6">
              <h4 className="text-xl font-bold text-mystic-gold mb-4">🔀 Passo 3: Embaralhar e Cortar</h4>
              <p className="text-mystic-cream/90">
                Embaralhe as cartas enquanto pensa na sua questão. Quando sentir que é o suficiente, 
                corte o monte em três e junte-os novamente.
              </p>
            </MysticalCard>

            <MysticalCard className="p-6">
              <h4 className="text-xl font-bold text-mystic-gold mb-4">🃏 Passo 4: A Tiragem</h4>
              <p className="text-mystic-cream/90">
                Puxe as três primeiras cartas do topo do baralho e vire-as na sua frente, da esquerda para a direita.
              </p>
            </MysticalCard>

            <MysticalCard className="p-6">
              <h4 className="text-xl font-bold text-mystic-gold mb-4">💫 Passo 5: A Interpretação</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-mystic-purple/30 p-4 rounded-lg mb-2">
                    <h5 className="font-bold text-mystic-gold">Carta 1</h5>
                    <p className="text-sm">Passado/Base</p>
                  </div>
                  <p className="text-xs text-mystic-cream/80">A energia que te trouxe à situação atual. A raiz do problema.</p>
                </div>
                <div className="text-center">
                  <div className="bg-mystic-purple/30 p-4 rounded-lg mb-2">
                    <h5 className="font-bold text-mystic-gold">Carta 2</h5>
                    <p className="text-sm">Presente/Desafio</p>
                  </div>
                  <p className="text-xs text-mystic-cream/80">A energia que você está vivendo agora. O principal desafio ou lição.</p>
                </div>
                <div className="text-center">
                  <div className="bg-mystic-purple/30 p-4 rounded-lg mb-2">
                    <h5 className="font-bold text-mystic-gold">Carta 3</h5>
                    <p className="text-sm">Futuro/Conselho</p>
                  </div>
                  <p className="text-xs text-mystic-cream/80">O caminho à frente. O conselho do Oráculo sobre como agir.</p>
                </div>
              </div>
              <p className="text-mystic-gold font-semibold mt-4">
                Confie na sua primeira impressão. O que a imagem da carta te diz, antes mesmo de você saber 
                o significado "oficial"? Aí reside sua intuição.
              </p>
            </MysticalCard>
          </div>
        </div>
      )
    },
    {
      id: "chapter4",
      title: "Capítulo 4 - A Arte de Perguntar",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-mystical-gradient mb-6">A Arte de Perguntar</h2>
          <p className="text-lg text-mystic-cream/90 mb-6">
            A qualidade da sua resposta depende da qualidade da sua pergunta. Evite perguntas de "sim" ou "não". 
            Em vez disso, pergunte para receber orientação.
          </p>

          <MysticalCard className="p-6">
            <h4 className="text-xl font-bold text-mystic-gold mb-4">✨ Transforme suas Perguntas</h4>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-red-400 mb-2">❌ Em vez de perguntar...</h5>
                  <p className="text-sm text-mystic-cream/80">"Vou conseguir o emprego?"</p>
                </div>
                <div>
                  <h5 className="font-bold text-mystic-gold mb-2">✅ Pergunte...</h5>
                  <p className="text-sm text-mystic-cream/80">"O que preciso saber para ter sucesso nesta entrevista?"</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-mystic-cream/80">"Ele(a) vai voltar pra mim?"</p>
                </div>
                <div>
                  <p className="text-sm text-mystic-cream/80">"Qual é a lição que este relacionamento veio me ensinar?"</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-mystic-cream/80">"Devo me mudar de cidade?"</p>
                </div>
                <div>
                  <p className="text-sm text-mystic-cream/80">"Qual energia me ajudaria a tomar a melhor decisão sobre a mudança?"</p>
                </div>
              </div>
            </div>
            <p className="text-mystic-gold font-semibold mt-6">
              Perguntas abertas te devolvem o poder. Elas te transformam de uma espectadora passiva 
              em uma protagonista ativa da sua jornada.
            </p>
          </MysticalCard>
        </div>
      )
    },
    {
      id: "conclusion",
      title: "Conclusão e Próximos Passos",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-mystical-gradient mb-6">Conclusão e Próximos Passos</h2>
          <img src={avoPortrait} alt="Avó Divina" className="mx-auto w-48 rounded-full shadow-mystical mb-6" />
          
          <div className="space-y-4 text-lg leading-relaxed text-mystic-cream/90">
            <p>
              Minha querida, a chave que você segura agora é poderosa. Este guia é o primeiro passo. 
              Você aprendeu que a sabedoria não está nas cartas, mas dentro de você – o Tarô é apenas 
              a linguagem que a traduz.
            </p>
            <p>
              Pratique. Converse com seu Oráculo Interior. Permita-se ser guiada.
            </p>
            <p>
              Esta é uma jornada profunda e, às vezes, ter um guia experiente ao seu lado pode acelerar 
              sua transformação e te dar a segurança que você precisa. Este guia foi a ponta do iceberg.
            </p>
            <p className="text-mystic-gold font-semibold">
              Se você sentiu um chamado para ir mais fundo, para ter um acompanhamento pessoal onde eu possa 
              usar minha intuição para iluminar as suas cartas e te dar um plano de ação claro, quero te 
              convidar a conhecer a Leitura Aprofundada e a comunidade Clareza Plena.
            </p>
            <p>
              São os próximos passos para quem está realmente comprometida em transformar incerteza em poder.
            </p>
            <p>
              Seja qual for sua escolha, saiba que você já está no caminho certo.
            </p>
            <p className="text-mystic-cream italic">
              Com todo meu carinho e confiança em sua jornada,<br />
              Avó Divina
            </p>
          </div>

          <div className="text-center mt-8">
            <MysticalButton variant="gold" size="lg" className="animate-pulse">
              🌟 Concluí minha leitura! 
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-mystical-gradient mb-4">
            O Oráculo Interior
          </h1>
          <div className="flex items-center justify-center space-x-2 text-mystic-gold">
            <BookOpen className="w-5 h-5" />
            <span>Página {currentPage + 1} de {pages.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-mystic-blue/30 rounded-full h-2 mb-8">
          <div 
            className="bg-gold-gradient h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
          ></div>
        </div>

        {/* Page Content */}
        <MysticalCard variant="ethereal" className="max-w-4xl mx-auto p-8 md:p-12 min-h-[600px]">
          {pages[currentPage].content}
        </MysticalCard>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <MysticalButton 
            variant="ethereal" 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </MysticalButton>

          <div className="flex space-x-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentPage 
                    ? 'bg-mystic-gold shadow-gold' 
                    : 'bg-mystic-purple/30 hover:bg-mystic-gold/50'
                }`}
              />
            ))}
          </div>

          <MysticalButton 
            variant="ethereal" 
            onClick={nextPage} 
            disabled={currentPage === pages.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Próxima</span>
            <ChevronRight className="w-4 h-4" />
          </MysticalButton>
        </div>

        {/* Floating Action */}
        {currentPage === pages.length - 1 && (
          <div className="fixed bottom-8 right-8">
            <MysticalButton variant="gold" className="shadow-mystical">
              <Star className="w-4 h-4 mr-2" />
              Explorar Mais
            </MysticalButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default EbookPage;