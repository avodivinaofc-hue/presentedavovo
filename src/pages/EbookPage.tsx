import { useState, useEffect } from "react";
import { MysticalCard } from "@/components/MysticalCard";
import { MysticalButton } from "@/components/MysticalButton";
import { FloatingParticles } from "@/components/FloatingParticles";
import { PageTransitionParticles } from "@/components/PageTransitionParticles";
import { MysticalGlowOverlay } from "@/components/MysticalGlowOverlay";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";

const EbookPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const pages = [
    {
      id: "cover",
      title: "Capa",
      content: (
        <div className="text-center space-y-6">
          <img 
            src="/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png" 
            alt="O Oráculo Interior" 
            className="mx-auto w-64 h-auto shadow-mystical rounded-lg" 
          />
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-mystical-gradient font-['Arial_Black']">
              O Oráculo Interior
            </h1>
            <p className="text-xl text-primary font-['Arial_Black']">
              Um Guia da Avó Divina para Você Começar a Ouvir as Respostas do seu Coração com o Tarô
            </p>
            <p className="text-lg text-muted-foreground font-['Arial_Black']">
              Autora: Avó Divina
            </p>
          </div>
        </div>
      )
    },
    {
      id: "quote",
      title: "Citação Inspiracional",
      content: (
        <div className="flex items-center justify-center min-h-[400px] text-center px-8">
          <div className="space-y-6">
            <p className="text-2xl italic text-mystic-gold font-['Arial_Black'] leading-relaxed">
              "A resposta mais importante que você procura não está nas cartas. 
              Está na alma que as segura. As cartas são apenas o eco."
            </p>
            <p className="text-xl text-primary font-['Arial_Black']">— Avó Divina</p>
          </div>
        </div>
      )
    },
    {
      id: "sumario",
      title: "Sumário",
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">Sumário</h2>
          <div className="space-y-4 text-lg">
            <div className="space-y-2">
              <h3 className="text-xl text-mystic-gold font-bold font-['Arial_Black']">Introdução: O Acolhimento da Alma</h3>
            </div>
            
            <div className="space-y-2 mt-4">
              <h3 className="text-xl text-mystic-gold font-bold font-['Arial_Black']">Parte 1: A Preparação da Alma (O Fundamento)</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-mystic-cream/90 font-['Arial_Black']">
                <li>Capítulo 1: O Tarô Não é o que te Contaram</li>
                <li>Capítulo 2: Criando o Seu Santuário Pessoal</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl text-mystic-gold font-bold font-['Arial_Black']">Parte 2: A Linguagem do Universo (Desvendando as Cartas)</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-mystic-cream/90 font-['Arial_Black']">
                <li>Capítulo 3: A Jornada do Herói Interior (Arcanos Maiores)</li>
                <li>Capítulo 4: Os Quatro Reinos da Sua Vida (Arcanos Menores)</li>
                <li>Capítulo 5: As Pessoas no Seu Espelho (As Cartas da Corte)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl text-mystic-gold font-bold font-['Arial_Black']">Parte 3: A Prática da Clareza (As Suas Leituras)</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-mystic-cream/90 font-['Arial_Black']">
                <li>Capítulo 6: Sua Primeira Conversa com o Oráculo (A Tiragem de 3 Cartas)</li>
                <li>Capítulo 7: A Arte de Perguntar</li>
                <li>Capítulo 8: Abraçando as Sombras: O que Fazer com as Cartas "Assustadoras"</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl text-mystic-gold font-bold font-['Arial_Black']">Parte 4: A Jornada Continua</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-mystic-cream/90 font-['Arial_Black']">
                <li>Conclusão: A Bússola é Sua</li>
                <li>BÓNUS: Guia Rápido dos 22 Arcanos Maiores</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "intro",
      title: "Introdução - O Acolhimento da Alma",
      content: (
        <div className="space-y-6 text-lg leading-relaxed">
          <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
            Introdução: O Acolhimento da Alma
          </h2>
          <p className="text-mystic-gold font-semibold font-['Arial_Black']">Minha querida leitora,</p>
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
          <p className="text-mystic-cream italic font-['Arial_Black']">Com carinho,<br/>Avó Divina.</p>
        </div>
      )
    },
    {
      id: "chapter1",
      title: "Capítulo 1 - O Tarô Não é o que te Contaram",
      content: (
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
              Capítulo 1: O Tarô Não é o que te Contaram
            </h2>
            <img src="/tarot-spread.jpg" alt="Cartas de Tarô" className="w-full rounded-lg shadow-ethereal mb-6" />
            <div className="space-y-4 text-lg leading-relaxed text-mystic-cream/90">
              <p className="font-['Arial_Black']">
                Esqueça as bolas de cristal e as videntes de feira. O verdadeiro poder do Tarô não está em adivinhar 
                números de loteria ou o nome do seu futuro amor. Isso é diminuir sua magia e o potencial transformador que ele oferece.
              </p>
              <p className="font-['Arial_Black']">
                O Tarô é, na verdade, um espelho de 78 facetas da alma humana. Cada carta é um arquétipo, uma emoção, uma lição, 
                um caminho. Quando você embaralha as cartas e faz uma pergunta, não está invocando espíritos; está mergulhando 
                no seu próprio inconsciente, acedendo a um vasto repositório de sabedoria que já reside em você.
              </p>
              <p className="font-['Arial_Black']">
                As cartas que aparecem são um reflexo do que você já sabe, mas ainda não admitiu. Elas organizam 
                o caos interno, trazem à tona medos e desejos ocultos e, o mais importante, mostram as energias 
                disponíveis para você no momento, as escolhas que se apresentam e os caminhos que se abrem.
              </p>
              <p className="font-['Arial_Black']">
                Pense no Tarô como um sábio conselheiro. Ele não te dá as respostas prontas, mas te ajuda a encontrar as suas próprias, 
                iluminando os cantos escuros da sua mente e do seu coração.
              </p>

              <h3 className="text-2xl font-bold text-mystic-gold mt-6 font-['Arial_Black']">
                A Diferença Crucial: Previsão vs. Orientação
              </h3>
              <p className="font-['Arial_Black']">
                É fundamental entender esta distinção. Prever o futuro nos coloca como espectadoras passivas, à mercê de um destino 
                pré-determinado, tirando de nós o poder da escolha e da cocriação.
              </p>
              <p className="font-['Arial_Black']">
                Receber orientação, por outro lado, nos coloca no centro do nosso poder. O Tarô, como guia, não te diz "o que vai acontecer", 
                mas sim "o que você precisa saber ou fazer para criar o melhor desfecho possível". Ele te capacita a influenciar o seu caminho, 
                em vez de apenas observá-lo.
              </p>
              <p className="font-['Arial_Black']">
                Este guia é sobre orientação. É sobre aprender a perguntar "Como posso criar o melhor caminho para mim?" 
                em vez de "O que vai acontecer comigo no futuro?".
              </p>

              <h3 className="text-2xl font-bold text-mystic-gold mt-6 font-['Arial_Black']">
                A Sua Intuição é o Ingrediente Secreto
              </h3>
              <p className="font-['Arial_Black']">
                O baralho de Tarô é um instrumento musical. Os significados das cartas são as notas. Mas a sua intuição, 
                minha querida, é a música. Sem ela, temos apenas teoria, um conjunto de símbolos sem vida. Com ela, temos magia, 
                uma melodia pessoal que ressoa profundamente com a sua verdade.
              </p>
              <p className="font-['Arial_Black']">
                A sua intuição é a sua capacidade inata de saber sem lógica, de sentir sem explicar. Este guia vai te ensinar 
                a afinar o seu instrumento, a silenciar o ruído externo e a tocar a sua própria melodia, permitindo que a 
                sabedoria do seu Oráculo Interior flua livremente.
              </p>
            </div>
          </div>
        </ScrollArea>
      )
    },
    {
      id: "chapter2",
      title: "Capítulo 2 - Criando o Seu Santuário Pessoal",
      content: (
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
              Capítulo 2: Criando o Seu Santuário Pessoal
            </h2>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              A clareza não floresce no caos. Para conversar com a sua alma e aceder à sabedoria do seu Oráculo Interior, 
              você precisa de criar um pequeno oásis de paz, um espaço sagrado onde possa se conectar sem interrupções. 
              Não precisa de um templo grandioso, apenas de um espaço com intenção.
            </p>

            <div className="space-y-4 mt-6">
              <h3 className="text-2xl font-bold text-mystic-gold font-['Arial_Black']">
                Passo 1: O Espaço Físico - O Seu Canto Sagrado
              </h3>
              <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
                Escolha um pequeno canto na sua casa que possa ser dedicado a este propósito. Pode ser uma mesa, uma cadeira, 
                uma almofada no chão. O importante é que seja um local onde você se sinta tranquila e segura. Declare-o mentalmente 
                ou verbalmente como o seu espaço sagrado, um local onde as preocupações do mundo esperam do lado de fora e onde 
                a sua verdade interior pode se manifestar livremente.
              </p>

              <h3 className="text-2xl font-bold text-mystic-gold mt-6 font-['Arial_Black']">
                Passo 2: A Limpeza Energética - Purificando o Ambiente
              </h3>
              <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
                Antes de cada leitura ou meditação com o Tarô, limpe a energia do seu espaço. Não precisa ser nada complicado. Você pode:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg text-mystic-cream/90 font-['Arial_Black']">
                <li>Acender um incenso de sândalo, lavanda ou palo santo.</li>
                <li>Borrifar um pouco de água com alfazema ou óleos essenciais relaxantes.</li>
                <li>Simplesmente visualize uma luz branca ou dourada a preencher o ambiente e a purificar o espaço e a si mesma, 
                    afastando qualquer energia densa ou dispersa.</li>
              </ul>

              <h3 className="text-2xl font-bold text-mystic-gold mt-6 font-['Arial_Black']">
                Passo 3: A Conexão com o Baralho - Infundindo a Sua Intenção
              </h3>
              <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
                Segure o seu baralho de Tarô firmemente nas mãos, junto ao seu coração, por pelo menos um minuto. 
                Respire fundo três vezes, sentindo a sua própria energia a fluir para as cartas. Neste momento, concentre-se 
                na sua intenção para a leitura ou na sua pergunta. Infunda as cartas com a sua energia e a sua busca por clareza. 
                Este simples ato transforma um objeto num poderoso aliado.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mt-6">
                <h4 className="text-xl text-mystic-gold font-bold mb-4 font-['Arial_Black']">
                  🌟 TAREFA DA SEMANA: O SEU RITUAL DE CLAREZA
                </h4>
                <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
                  Crie o seu pequeno ritual de preparação. Durante 7 dias, dedique 5 minutos a sentar-se no seu espaço sagrado 
                  com o seu baralho nas mãos, apenas a respirar e a conectar-se consigo mesma. Anote no seu diário (ou mentalmente) 
                  como se sentiu e se percebeu alguma mudança na sua clareza mental.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      )
    },
    {
      id: "chapter3",
      title: "Capítulo 3 - A Jornada do Herói Interior",
      content: (
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
              Capítulo 3: A Jornada do Herói Interior (Arcanos Maiores)
            </h2>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              As 22 cartas mais importantes do Tarô, os Arcanos Maiores, não são apenas símbolos isolados. 
              Elas contam uma única e profunda história: a jornada da nossa alma pela vida, os grandes ciclos de aprendizado 
              e transformação que todos nós experimentamos. É a "Jornada do Herói Interior", e você é a protagonista.
            </p>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              Ela começa com O Louco (Arcano 0), puro potencial, dando um passo no abismo da experiência, 
              e termina com O Mundo (Arcano 21), a conclusão, a integração e a realização plena.
            </p>

            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">
                  Ato 1: O Início da Jornada (O Potencial e as Primeiras Ferramentas)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">O Louco (Arcano 0)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      O espírito livre, a pureza do potencial. Representa o início de uma nova jornada, um salto de fé, 
                      a inocência e a abertura para o desconhecido.
                    </p>
                  </MysticalCard>
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">O Mago (Arcano I)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      O poder da manifestação. Ele nos ensina que temos todas as ferramentas e recursos necessários 
                      para criar a nossa realidade.
                    </p>
                  </MysticalCard>
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">A Sacerdotisa (Arcano II)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      A sabedoria interior. Ela nos pede para silenciar o mundo exterior e ouvir a nossa intuição profunda.
                    </p>
                  </MysticalCard>
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">A Imperatriz (Arcano III)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      O poder da criação e da nutrição. Representa a abundância, a fertilidade de ideias e projetos.
                    </p>
                  </MysticalCard>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">
                  Ato 2: As Provas do Caminho (Os Desafios e as Lições)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">O Eremita (Arcano IX)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      A busca interior. Convida-nos à introspecção, à solidão necessária para encontrar a nossa verdade.
                    </p>
                  </MysticalCard>
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">A Roda da Fortuna (Arcano X)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      Os ciclos da vida. Lembra-nos que tudo é movimento, que há altos e baixos.
                    </p>
                  </MysticalCard>
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">A Força (Arcano VIII)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      A coragem interior. Representa a força suave, a paciência, o domínio sobre nossos medos.
                    </p>
                  </MysticalCard>
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">A Torre (Arcano XVI)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      As transformações necessárias. O despertar chocante que precede uma grande libertação.
                    </p>
                  </MysticalCard>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">
                  Ato 3: A Conquista da Sabedoria (A Realização e a Plenitude)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">A Estrela (Arcano XVII)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      A esperança renovada. Promete cura, inspiração e a realização dos nossos maiores desejos.
                    </p>
                  </MysticalCard>
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">O Sol (Arcano XIX)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      A alegria, clareza e sucesso. É a luz que dissipa todas as sombras.
                    </p>
                  </MysticalCard>
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">O Julgamento (Arcano XX)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      O despertar e a libertação. Um chamado para a autoavaliação e perdão.
                    </p>
                  </MysticalCard>
                  <MysticalCard className="p-4">
                    <h4 className="text-mystic-gold font-bold mb-2 font-['Arial_Black']">O Mundo (Arcano XXI)</h4>
                    <p className="text-sm text-mystic-cream/90 font-['Arial_Black']">
                      A conclusão e a plenitude. O ciclo completo, a realização de um grande projeto.
                    </p>
                  </MysticalCard>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      )
    },
    {
      id: "chapter4",
      title: "Capítulo 4 - Os Quatro Reinos da Sua Vida",
      content: (
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
              Capítulo 4: Os Quatro Reinos da Sua Vida (Arcanos Menores)
            </h2>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              Se os Arcanos Maiores são os grandes eventos, os marcos e as lições espirituais da sua vida, 
              os Arcanos Menores são o nosso dia a dia. Eles representam as situações, as emoções e os desafios 
              mais comuns que enfrentamos.
            </p>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              Os 56 Arcanos Menores dividem-se em 4 naipes, que representam os 4 reinos da sua experiência como mulher, 
              os 4 elementos da natureza e os 4 pilares da sua vida.
            </p>

            <div className="space-y-6 mt-6">
              <MysticalCard className="p-6 bg-gradient-to-br from-orange-900/20 to-red-900/20">
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">
                  🔥 O Reino do Fogo (Paus)
                </h3>
                <p className="text-lg text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  O Seu Poder de Ação, Paixão e Criatividade
                </p>
                <p className="text-mystic-cream/80 mb-2 font-['Arial_Black']">
                  O naipe de Paus está ligado ao elemento Fogo, à sua energia vital, à sua força de vontade e à sua paixão.
                </p>
                <p className="text-mystic-gold font-semibold font-['Arial_Black']">
                  Palavras-Chave: Ação, Paixão, Carreira, Energia, Criatividade, Vontade
                </p>
              </MysticalCard>

              <MysticalCard className="p-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">
                  💧 O Reino da Água (Copas)
                </h3>
                <p className="text-lg text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  O Seu Poder de Sentir, Amar e Conectar
                </p>
                <p className="text-mystic-cream/80 mb-2 font-['Arial_Black']">
                  O naipe de Copas está ligado ao elemento Água, às suas emoções, aos seus relacionamentos e à sua intuição.
                </p>
                <p className="text-mystic-gold font-semibold font-['Arial_Black']">
                  Palavras-Chave: Emoções, Amor, Relações, Intuição, Sentimentos, Conexão
                </p>
              </MysticalCard>

              <MysticalCard className="p-6 bg-gradient-to-br from-gray-700/20 to-slate-600/20">
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">
                  💨 O Reino do Ar (Espadas)
                </h3>
                <p className="text-lg text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  O Seu Poder de Pensar, Comunicar e Superar Desafios
                </p>
                <p className="text-mystic-cream/80 mb-2 font-['Arial_Black']">
                  O naipe de Espadas está ligado ao elemento Ar, à sua mente, aos seus pensamentos e à sua capacidade de comunicação.
                </p>
                <p className="text-mystic-gold font-semibold font-['Arial_Black']">
                  Palavras-Chave: Mente, Desafios, Verdade, Comunicação, Lógica, Conflitos
                </p>
              </MysticalCard>

              <MysticalCard className="p-6 bg-gradient-to-br from-green-900/20 to-yellow-900/20">
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">
                  🌍 O Reino da Terra (Ouros)
                </h3>
                <p className="text-lg text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  O Seu Poder de Manifestar, Concretizar e Sustentar
                </p>
                <p className="text-mystic-cream/80 mb-2 font-['Arial_Black']">
                  O naipe de Ouros está ligado ao elemento Terra, ao seu mundo material, às suas finanças e à sua segurança.
                </p>
                <p className="text-mystic-gold font-semibold font-['Arial_Black']">
                  Palavras-Chave: Finanças, Trabalho, Corpo, Segurança, Estabilidade, Material
                </p>
              </MysticalCard>
            </div>
          </div>
        </ScrollArea>
      )
    },
    {
      id: "chapter5",
      title: "Capítulo 5 - As Pessoas no Seu Espelho",
      content: (
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
              Capítulo 5: As Pessoas no Seu Espelho (As Cartas da Corte)
            </h2>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              Dentro de cada naipe, temos as Cartas da Corte: Pajem, Cavaleiro, Rainha e Rei. Estas 16 cartas podem representar 
              pessoas na sua vida, sim, mas, mais importante ainda, elas representam as diferentes facetas da sua própria personalidade 
              e os papéis que você assume em diversas situações.
            </p>

            <div className="space-y-4 mt-6">
              <MysticalCard className="p-4">
                <h3 className="text-xl font-bold text-mystic-gold mb-2 font-['Arial_Black']">👤 O Pajem</h3>
                <p className="text-mystic-cream/90 font-['Arial_Black']">
                  É a energia do aprendiz, da curiosidade e do início. Representa um mensageiro, alguém que traz notícias 
                  ou uma nova perspetiva. Em você, é a parte que está a aprender algo novo, a explorar sem medo.
                </p>
                <p className="text-mystic-gold mt-2 font-semibold font-['Arial_Black']">
                  Palavra-chave: Curiosidade, Notícias, Início, Aprender
                </p>
              </MysticalCard>

              <MysticalCard className="p-4">
                <h3 className="text-xl font-bold text-mystic-gold mb-2 font-['Arial_Black']">🐎 O Cavaleiro</h3>
                <p className="text-mystic-cream/90 font-['Arial_Black']">
                  É a energia da ação, do movimento e da busca. Representa alguém que está em movimento, com uma missão ou objetivo. 
                  Em você, é a parte que tem coragem de ir em busca, de lutar por aquilo que acredita.
                </p>
                <p className="text-mystic-gold mt-2 font-semibold font-['Arial_Black']">
                  Palavra-chave: Ação, Busca, Determinação, Movimento
                </p>
              </MysticalCard>

              <MysticalCard className="p-4">
                <h3 className="text-xl font-bold text-mystic-gold mb-2 font-['Arial_Black']">👑 A Rainha</h3>
                <p className="text-mystic-cream/90 font-['Arial_Black']">
                  É a energia do domínio interior, da maestria e da intuição. Representa alguém que encarna plenamente a energia 
                  do seu naipe de forma madura e intuitiva. Em você, é a parte que sabe gerir e sentir a energia do naipe com sabedoria.
                </p>
                <p className="text-mystic-gold mt-2 font-semibold font-['Arial_Black']">
                  Palavra-chave: Maestria, Intuição, Sensibilidade, Cuidado
                </p>
              </MysticalCard>

              <MysticalCard className="p-4">
                <h3 className="text-xl font-bold text-mystic-gold mb-2 font-['Arial_Black']">🔱 O Rei</h3>
                <p className="text-mystic-cream/90 font-['Arial_Black']">
                  É a energia da manifestação exterior, da liderança e do controlo. Representa alguém que governa o seu reino 
                  com sabedoria, estrutura e responsabilidade. Em você, é a parte que organiza, lidera e concretiza a energia 
                  do naipe no mundo.
                </p>
                <p className="text-mystic-gold mt-2 font-semibold font-['Arial_Black']">
                  Palavra-chave: Liderança, Estrutura, Controlo, Manifestação
                </p>
              </MysticalCard>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mt-6">
                <h4 className="text-xl text-mystic-gold font-bold mb-4 font-['Arial_Black']">
                  🌟 TAREFA DA ALMA: QUEM É VOCÊ HOJE?
                </h4>
                <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
                  Pense numa situação atual na sua vida que a esteja a desafiar (na carreira, num relacionamento, numa decisão). 
                  Qual papel da corte você está a desempenhar? É a Pajem a aprender algo novo? A Rainha a dominar as suas emoções? 
                  Ou talvez o Rei a buscar liderar uma situação? Escreva sobre isso e reflita.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      )
    },
    {
      id: "chapter6",
      title: "Capítulo 6 - Sua Primeira Conversa com o Oráculo",
      content: (
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
              Capítulo 6: Sua Primeira Conversa com o Oráculo (A Tiragem de 3 Cartas)
            </h2>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              Agora chegamos ao momento mais importante: a sua primeira leitura. A Tiragem de 3 Cartas é a mais acessível, 
              poderosa e versátil que existe. Simples, mas profunda.
            </p>

            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-6">
              <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">
                🎯 A Tiragem das 3 Cartas
              </h3>
              <div className="space-y-3 text-lg text-mystic-cream/90">
                <p className="font-['Arial_Black']"><strong>1ª Carta:</strong> O que você precisa saber sobre o passado</p>
                <p className="font-['Arial_Black']"><strong>2ª Carta:</strong> O que está acontecendo no presente</p>
                <p className="font-['Arial_Black']"><strong>3ª Carta:</strong> O que o futuro está preparando</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">Passo a Passo da Sua Primeira Leitura:</h3>
            <ol className="list-decimal list-inside space-y-3 text-lg text-mystic-cream/90">
              <li className="font-['Arial_Black']">Escolha um momento tranquilo, sem pressa</li>
              <li className="font-['Arial_Black']">Formule uma pergunta clara e específica</li>
              <li className="font-['Arial_Black']">Embaralhe as cartas pensando na sua pergunta</li>
              <li className="font-['Arial_Black']">Corte o baralho em três partes</li>
              <li className="font-['Arial_Black']">Escolha uma carta de cada parte</li>
              <li className="font-['Arial_Black']">Coloque-as da esquerda para a direita</li>
              <li className="font-['Arial_Black']">Observe as cartas e sinta o que elas comunicam</li>
              <li className="font-['Arial_Black']">Anote as suas primeiras impressões</li>
            </ol>

            <p className="text-mystic-gold font-semibold mt-6 font-['Arial_Black']">
              Lembre-se: não há cartas "boas" ou "ruins". Cada uma traz uma mensagem importante para você.
            </p>
          </div>
        </ScrollArea>
      )
    },
    {
      id: "chapter7",
      title: "Capítulo 7 - A Arte de Perguntar",
      content: (
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
              Capítulo 7: A Arte de Perguntar
            </h2>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              A qualidade da sua pergunta determina a qualidade da resposta. Perguntas poderosas abrem portas para insights profundos. 
              Perguntas fracas trazem respostas confusas.
            </p>

            <div className="space-y-6 mt-6">
              <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
                <h3 className="text-xl font-bold text-red-400 mb-4 font-['Arial_Black']">❌ Perguntas Que NÃO Funcionam:</h3>
                <ul className="space-y-2 text-mystic-cream/90 font-['Arial_Black']">
                  <li>• "Ele vai voltar?"</li>
                  <li>• "Vou ficar rica?"</li>
                  <li>• "O que vai acontecer?"</li>
                </ul>
                <p className="mt-4 text-sm text-mystic-cream/80 font-['Arial_Black']">
                  Perguntas que tiram o seu poder e te colocam como vítima do destino.
                </p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
                <h3 className="text-xl font-bold text-green-400 mb-4 font-['Arial_Black']">✅ Perguntas Poderosas:</h3>
                <ul className="space-y-2 text-mystic-cream/90 font-['Arial_Black']">
                  <li>• "O que preciso saber sobre esta situação?"</li>
                  <li>• "Como posso melhorar minha relação com...?"</li>
                  <li>• "Que energia devo cultivar para atrair abundância?"</li>
                  <li>• "O que está me impedindo de avançar?"</li>
                  <li>• "Qual o melhor caminho para...?"</li>
                </ul>
                <p className="mt-4 text-sm text-mystic-cream/80 font-['Arial_Black']">
                  Perguntas que te capacitam a criar o melhor desfecho possível.
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mt-6">
                <h4 className="text-xl text-mystic-gold font-bold mb-4 font-['Arial_Black']">
                  💡 Dica de Ouro
                </h4>
                <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
                  Ao invés de perguntar "vai acontecer?", pergunte "como posso fazer acontecer?". 
                  Ao invés de "ele me ama?", pergunte "o que preciso entender sobre este relacionamento?".
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      )
    },
    {
      id: "chapter8",
      title: "Capítulo 8 - Abraçando as Sombras",
      content: (
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
              Capítulo 8: Abraçando as Sombras: O que Fazer com as Cartas "Assustadoras"
            </h2>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              A Morte. A Torre. O Diabo. Dez de Espadas. Apenas de ouvir esses nomes, muitas pessoas se assustam. 
              Mas eu preciso te dizer uma verdade: não existem cartas ruins no Tarô. Todas elas, sem exceção, 
              são mensageiras da sua própria sabedoria.
            </p>

            <div className="space-y-6 mt-6">
              <MysticalCard className="p-6">
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">A Morte (Arcano XIII)</h3>
                <p className="text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  <strong>O que parece:</strong> Fim, perda, medo.
                </p>
                <p className="text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  <strong>O que realmente significa:</strong> Transformação profunda. Algo precisa terminar para que o novo possa nascer. 
                  É o convite para soltar o que já não serve mais.
                </p>
                <p className="text-green-400 font-semibold font-['Arial_Black']">
                  Mensagem: Abrace a mudança. O que está morrendo já cumpriu o seu papel.
                </p>
              </MysticalCard>

              <MysticalCard className="p-6">
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">A Torre (Arcano XVI)</h3>
                <p className="text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  <strong>O que parece:</strong> Destruição, caos, desastre.
                </p>
                <p className="text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  <strong>O que realmente significa:</strong> O despertar necessário. Quando a vida derruba estruturas falsas 
                  para que você possa construir algo autêntico sobre bases sólidas.
                </p>
                <p className="text-green-400 font-semibold font-['Arial_Black']">
                  Mensagem: Deixe desmoronar o que precisa cair. A reconstrução será mais forte.
                </p>
              </MysticalCard>

              <MysticalCard className="p-6">
                <h3 className="text-2xl font-bold text-mystic-gold mb-4 font-['Arial_Black']">O Diabo (Arcano XV)</h3>
                <p className="text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  <strong>O que parece:</strong> Mal, vício, escravidão.
                </p>
                <p className="text-mystic-cream/90 mb-3 font-['Arial_Black']">
                  <strong>O que realmente significa:</strong> As correntes que você mesma criou. Padrões viciantes, 
                  medos que te prendem. Mas veja bem: as correntes são soltas. Você pode sair a qualquer momento.
                </p>
                <p className="text-green-400 font-semibold font-['Arial_Black']">
                  Mensagem: Reconheça onde você se prende. A libertação está nas suas mãos.
                </p>
              </MysticalCard>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mt-6">
                <h4 className="text-xl text-mystic-gold font-bold mb-4 font-['Arial_Black']">
                  🌟 A Verdade Sobre as Cartas "Sombrias"
                </h4>
                <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
                  Elas não são avisos de tragédia. São convites para a cura, para a transformação, para a libertação. 
                  São as professoras mais sábias do baralho, porque nos forçam a olhar para o que evitamos e, 
                  ao fazer isso, nos libertam.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      )
    },
    {
      id: "conclusion",
      title: "Conclusão - A Bússola é Sua",
      content: (
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-mystical-gradient mb-6 font-['Arial_Black']">
              Conclusão: A Bússola é Sua
            </h2>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              Minha querida leitora, chegamos ao fim deste guia. Mas, na verdade, você está apenas começando. 
              O verdadeiro caminho se abre agora, à sua frente, iluminado pela luz do seu Oráculo Interior.
            </p>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              Você aprendeu que o Tarô não é sobre prever um futuro fixo, mas sobre criar o futuro que a sua alma deseja. 
              Você descobriu que as cartas são espelhos da sua própria sabedoria, ferramentas para organizar o caos interior 
              e iluminar os caminhos possíveis.
            </p>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              Aprendeu a preparar o seu espaço sagrado, a fazer perguntas poderosas, a interpretar os símbolos com a sua intuição 
              e a abraçar até as cartas mais sombrias como mensageiras de transformação.
            </p>
            <p className="text-mystic-gold font-semibold text-xl mt-6 font-['Arial_Black']">
              Mas, acima de tudo, você aprendeu isto: a bússola é sua. Sempre foi.
            </p>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              O Tarô apenas te ajuda a lembrar do que já sabes. A clareza que procura não vem das cartas, 
              vem de dentro de você. As cartas são apenas o eco da sua própria alma.
            </p>
            <p className="text-lg text-mystic-cream/90 font-['Arial_Black']">
              Então, confie na sua intuição. Confie nas mensagens que recebe. Confie no seu poder de criar 
              a vida que deseja, uma escolha consciente de cada vez.
            </p>
            <p className="text-mystic-cream italic text-lg mt-8 font-['Arial_Black']">
              Que as cartas te guiem sempre para dentro,<br/>
              onde reside a verdade que nunca te abandonou.<br/>
              <br/>
              Com todo o meu amor e confiança em você,<br/>
              Avó Divina
            </p>

            <div className="text-center mt-12">
              <MysticalButton 
                variant="gold" 
                size="lg" 
                className="animate-pulse h-14 text-lg font-['Arial_Black']"
                onClick={() => window.open('https://santuario-da-divina.netlify.app/', '_blank')}
              >
                🌟 Continuar Sua Jornada - Nível 2
              </MysticalButton>
              <p className="text-white text-base mt-4 font-['Poppins'] px-4">
                Desbloqueie agora a sua prosperidade, melhor vida amorosa e paz divina
              </p>
            </div>
          </div>
        </ScrollArea>
      )
    }
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection('next');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection('prev');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      <PageTransitionParticles isActive={isTransitioning} direction={direction} />
      <MysticalGlowOverlay isActive={isTransitioning} />
      
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
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              initial={{ 
                opacity: 0,
                scale: 0.95,
                rotateY: direction === 'next' ? 15 : -15,
                x: direction === 'next' ? 100 : -100
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                rotateY: 0,
                x: 0
              }}
              exit={{ 
                opacity: 0,
                scale: 0.95,
                rotateY: direction === 'next' ? -15 : 15,
                x: direction === 'next' ? -100 : 100
              }}
              transition={{
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              style={{ perspective: 1000 }}
            >
              <MysticalCard variant="ethereal" className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] mx-2 sm:mx-4">
                {pages[currentPage].content}
              </MysticalCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-4 sm:mt-6 lg:mt-8 max-w-4xl mx-auto px-2 sm:px-4">
            <MysticalButton 
              variant="ethereal" 
              onClick={prevPage} 
              disabled={currentPage === 0}
              className="flex items-center space-x-2 text-xs sm:text-sm lg:text-base h-10 sm:h-12 font-['Arial_Black'] text-white"
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
              className="flex items-center space-x-2 text-xs sm:text-sm lg:text-base h-10 sm:h-12 font-['Arial_Black'] text-white"
            >
              <span className="hidden sm:inline">Próxima</span>
              <span className="sm:hidden">Próx.</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </MysticalButton>
          </div>

          {/* Floating Action */}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EbookPage;