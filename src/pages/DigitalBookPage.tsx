import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CrystalParticles } from '@/components/crystal/CrystalParticles';
import { ReadingProgressBar } from '@/components/crystal/ReadingProgressBar';
import { ProgressMandala } from '@/components/crystal/ProgressMandala';
import { BreathingCircle } from '@/components/crystal/BreathingCircle';
import { HoldToReveal } from '@/components/crystal/HoldToReveal';
import { JournalInput } from '@/components/crystal/JournalInput';
import { useJournalStorage } from '@/hooks/useJournalStorage';
import { ChevronLeft, ChevronRight, Menu, X, Download } from 'lucide-react';

// Chapter content data - O ORÁCULO INTERIOR
const chapters = [
    {
        id: 'welcome',
        title: 'Bem-vinda ao Templo de Cristal',
        type: 'breathing',
        content: {
            intro: 'Antes de iniciarmos esta jornada sagrada pelo seu Oráculo Interior, vamos acalmar a mente e preparar o coração.',
            instruction: 'O conhecimento que você busca já vive dentro de você. Este livro é para limpar a poeira da sua bússola.',
        }
    },
    {
        id: 'intro',
        title: 'Introdução: A Bússola Esquecida',
        type: 'content',
        content: {
            paragraphs: [
                'Minha neta, sente-se aqui.',
                'Quantas vezes, nesta semana, você pegou o celular para perguntar a opinião de alguém sobre a sua vida? "Devo mandar mensagem para ele?" "Essa roupa ficou boa?" "Será que aceito esse emprego?"',
                'Nós vivemos em uma era viciada em validação externa. Desaprendemos a confiar no nosso "estômago". Ficamos surdas para aquela voz sussurrada que diz "não vá por aí" ou "é este o caminho".',
                'Você nasceu com uma bússola de ouro dentro do peito. Mas, ao longo dos anos, o barulho do mundo, as opiniões dos pais, os medos dos amigos e a ansiedade da internet cobriram essa bússola de poeira.',
                'Este livro não é para te dar respostas prontas. Para isso, existem as cartas. Este livro é para limpar a poeira da sua bússola.',
                'Vou te ensinar a ser o seu próprio Oráculo. Porque, no final do dia, quando você deita a cabeça no travesseiro, a única pessoa que sabe a verdade sobre a sua vida... é você.',
            ],
            highlight: 'Vamos acordar a sábia que dorme aí dentro.',
        }
    },
    {
        id: 'chapter1',
        title: 'Capítulo 1: O Ruído vs. O Sinal',
        subtitle: 'Diferenciando Medo de Intuição',
        type: 'content',
        content: {
            paragraphs: [
                'A maior dúvida que recebo é: "Vovó, como eu sei se é intuição ou se é só minha ansiedade inventando coisas?"',
                'É vital saber a diferença. A ansiedade mente. A intuição nunca erra.',
            ],
            comparison: {
                title: 'Tabela da Verdade',
                left: {
                    title: '🌀 A VOZ DA ANSIEDADE (EGO)',
                    items: [
                        'É barulhenta, grita, é urgente.',
                        'Diz: "Rápido, senão você vai perder!"',
                        'Traz sensação de aperto, pânico, nó na garganta.',
                        'É cheia de "E SE...?" (E se der errado?).',
                        'Justifica muito, dá mil explicações.',
                    ]
                },
                right: {
                    title: '✨ A VOZ DA INTUIÇÃO (ALMA)',
                    items: [
                        'É um sussurro, calma, constante.',
                        'Diz: "É melhor esperar" ou "Vá agora".',
                        'Traz sensação de certeza fria, clareza, neutralidade.',
                        'É direta: "Não faça isso."',
                        'Não dá explicação. Você só sabe.',
                    ]
                }
            },
            exercise: {
                title: '🎯 Exercício Prático: O Teste do "E Se"',
                text: 'Quando vier um pensamento, pergunte: "Isso me traz paz ou me traz caos?". A intuição, mesmo quando dá uma notícia ruim (ex: "saia desse emprego"), traz uma estranha sensação de paz no fundo. A ansiedade traz caos.'
            },
            journalPrompt: 'Pense em uma decisão recente. A voz que você ouviu era calma ou ansiosa? O que ela disse exatamente?'
        }
    },
    {
        id: 'chapter2',
        title: 'Capítulo 2: O Corpo é a Antena',
        subtitle: 'Sinais Somáticos',
        type: 'content',
        content: {
            paragraphs: [
                'Sua mente pode mentir para você. Seu corpo não consegue.',
                'Antes do seu cérebro processar que um homem é perigoso, seu estômago já contraiu. Antes de você saber que aquele projeto é bom, seu peito já expandiu.',
                'Neste capítulo, vamos calibrar sua antena física.',
            ],
            concept: {
                title: 'O Conceito de Expansão vs. Contração',
                items: [
                    { label: '✅ SIM (Verdade)', text: 'O corpo relaxa, os ombros descem, o peito abre, a respiração flui. Sensação de leveza.' },
                    { label: '❌ NÃO (Mentira/Perigo)', text: 'O estômago trava, a mandíbula aperta, a respiração fica curta, sensação de peso ou náusea sutil.' }
                ]
            },
            exercise: {
                title: '🧍 Exercício: Calibrando o Pêndulo Humano',
                steps: [
                    'Fique em pé, pés descalços, olhos fechados.',
                    'Diga em voz alta: "Meu nome é [Seu Nome Verdadeiro]". Observe seu corpo balançar levemente para frente (atração/verdade).',
                    'Diga em voz alta: "Meu nome é [Nome Falso]". Observe seu corpo balançar levemente para trás ou ficar rígido (repulsão/mentira).',
                    'Agora, faça a pergunta sobre sua dúvida atual e veja para onde seu corpo te leva.'
                ]
            },
            journalPrompt: 'Faça o exercício do Pêndulo Humano. Para qual direção seu corpo foi quando pensou na sua dúvida atual?'
        }
    },
    {
        id: 'chapter3',
        title: 'Capítulo 3: O Ritual do Espelho',
        subtitle: 'Encarando a Verdade',
        type: 'reveal',
        content: {
            intro: 'Olhar nos próprios olhos é uma das magias mais antigas e difíceis. O espelho não mostra só a pele, ele reflete a alma. Muitas vezes, evitamos nos olhar profundamente porque temos medo do que vamos ouvir.',
            ritual: {
                title: '🪞 O Ritual',
                steps: [
                    'Vá para um espelho onde ninguém te interrompa.',
                    'Apague a luz forte, acenda uma vela (ou use a luz suave do celular virado).',
                    'Olhe fixamente na pupila do seu olho esquerdo (o olho da lua/intuição).',
                    'Respire fundo 10 vezes.',
                    'Pergunte em voz alta a pergunta poderosa.',
                    'Não force a resposta. Fique olhando. A resposta virá como uma memória, uma palavra solta ou uma emoção súbita.'
                ]
            },
            revealText: 'O que eu estou fingindo que não sei?',
            afterReveal: 'Este é o Oráculo Interior quebrando as barreiras da mentira que contamos para nós mesmas. A vontade de chorar é comum — é sinal de que a verdade está emergindo.',
            journalPrompt: 'Faça o Ritual do Espelho. O que surgiu para você? Qual verdade emergiu?'
        }
    },
    {
        id: 'chapter4',
        title: 'Capítulo 4: Decodificando Sinais e Sincronicidades',
        type: 'content',
        content: {
            paragraphs: [
                'O Universo fala através de coincidências.',
                'Sabe quando você pensa em alguém e a pessoa liga? Ou quando você pede um sinal e vê uma borboleta azul três vezes no mesmo dia?',
                'Isso não é acaso. É Sincronicidade.',
            ],
            method: {
                title: '🦋 Como pedir um sinal (Do jeito certo)',
                wrong: 'Não peça: "Me mostre se devo namorar ele". Isso é confuso.',
                right: 'Peça: "Universo/Deus, se for para o meu bem maior ficar com ele, me mostre um Girassol Amarelo nas próximas 24 horas. Se não for, me mostre uma Coruja."'
            },
            rules: [
                '✅ Se viu o sinal: É um SIM.',
                '⏸️ Se não viu nada: É um NÃO. (O silêncio também é resposta).',
                '🚫 Não fique "caçando" o sinal no Google Imagens. Ele tem que aparecer naturalmente (na rua, na TV, no Instagram de alguém aleatório).'
            ],
            journalPrompt: 'Escolha dois símbolos (um para SIM, outro para NÃO). Peça um sinal sobre sua dúvida atual. Anote o que aparecer nas próximas 24h.'
        }
    },
    {
        id: 'chapter5',
        title: 'Capítulo 5: O Oráculo dos Sonhos',
        subtitle: 'Como Receber Respostas Dormindo',
        type: 'content',
        content: {
            paragraphs: [
                'Enquanto você dorme, seu ego descansa e sua alma viaja. Os sonhos são cartas que o seu subconsciente te envia toda noite.',
            ],
            technique: {
                title: '🌙 Técnica da Incubação de Sonhos',
                steps: [
                    'Tenha papel e caneta ao lado da cama (não serve o celular, a luz azul corta a conexão).',
                    'Antes de dormir, escreva a pergunta no topo da folha. Ex: "Qual é o meu próximo passo profissional?"',
                    'Repita a pergunta mentalmente até adormecer como um mantra.',
                    'Ao acordar (mesmo que seja de madrugada para ir ao banheiro), anote qualquer fragmento. Uma cor, um animal, uma sensação.',
                    'Não tente entender na hora. Leia depois do café da manhã. O significado geralmente se revela na luz do dia.'
                ]
            },
            journalPrompt: 'Pratique a Incubação de Sonhos esta noite. Qual pergunta você fará? Anote aqui e depois registre os fragmentos do sonho.'
        }
    },
    {
        id: 'chapter6',
        title: 'Capítulo 6: A Técnica da Pergunta Poderosa',
        type: 'content',
        content: {
            paragraphs: [
                'O Oráculo Interior responde mal a perguntas ruins.',
                'Perguntas de "Sim ou Não" são limitadas. Perguntas de "Por quê" geram vitimização.',
                'Mude seu vocabulário:',
            ],
            examples: {
                bad: [
                    { q: '"Por que isso está acontecendo comigo?"', note: '(Gera culpa)' },
                    { q: '"Ele vai voltar?"', note: '(Gera ansiedade)' },
                ],
                good: [
                    { q: '"O que eu preciso aprender com essa situação para que ela não se repita?"', note: '' },
                    { q: '"O que eu preciso curar em mim para atrair um amor que fique?"', note: '' },
                ]
            },
            exercise: {
                title: '✍️ Exercício de Escrita Automática',
                steps: [
                    'Escreva a Pergunta Poderosa no topo de um papel.',
                    'Coloque um timer de 3 minutos.',
                    'Comece a escrever sem tirar a caneta do papel.',
                    'Não pense, não corrija a gramática. Apenas deixe a mão fluir.',
                    'Muitas vezes, a "Voz" assume a caneta e escreve verdades que você nem sabia que pensava.'
                ]
            },
            journalPrompt: 'Transforme sua dúvida atual em uma Pergunta Poderosa. Faça o exercício de escrita automática de 3 minutos.'
        }
    },
    {
        id: 'chapter7',
        title: 'Capítulo 7: Limpeza do Canal',
        subtitle: 'Detox Espiritual',
        type: 'reveal',
        content: {
            intro: 'Você não consegue ver o reflexo na água se a água estiver agitada. Se você come mal, dorme mal e vive no TikTok, sua intuição estará bloqueada.',
            protocol: {
                title: '🧹 O Protocolo de Limpeza de 24h',
                items: [
                    { name: 'Jejum de Opinião', desc: 'Passe 24h sem perguntar a opinião de ninguém sobre nada. Decida tudo sozinha, desde a roupa até o almoço.' },
                    { name: 'Banho de Ervas', desc: 'Do pescoço para baixo, visualizando uma lama cinza saindo do seu corpo. Pode usar sal grosso.' },
                    { name: 'Silêncio Digital', desc: 'Pelo menos 1 hora antes de dormir sem telas.' },
                ]
            },
            revealText: 'Quando limpamos o corpo e a mente, o "rádio" da intuição pega a estação com clareza cristalina.',
            afterReveal: 'Este protocolo simples de 24 horas pode transformar completamente sua capacidade de ouvir a voz interior.',
            journalPrompt: 'Quando você fará o seu Detox de 24h? Anote a data e comprometa-se consigo mesma.'
        }
    },
    {
        id: 'chapter8',
        title: 'Capítulo 8: Tomando Decisões Difíceis',
        subtitle: 'O Teste da Expansão',
        type: 'content',
        content: {
            paragraphs: [
                'Chegamos ao momento da decisão. Você tem dois caminhos. Qual escolher?',
            ],
            visualization: {
                title: '🔮 A Visualização do Futuro',
                steps: [
                    'Feche os olhos. Imagine que você escolheu o Caminho A.',
                    'Avance o filme 6 meses. Como você acorda? Como é seu rosto no espelho? Você está cansada ou energizada?',
                    'Volte ao presente. Limpe a tela mental.',
                    'Imagine que você escolheu o Caminho B.',
                    'Avance 6 meses. Observe os mesmos detalhes.',
                ]
            },
            insight: 'Geralmente, um caminho parece "correto logicamente", mas no futuro ele te mostra cinza e triste. O outro pode parecer "arriscado", mas no futuro te mostra vibrante.',
            highlight: 'Siga a vibração, não a lógica.',
            journalPrompt: 'Faça a Visualização do Futuro com sua decisão atual. Descreva o que viu em cada caminho após 6 meses.'
        }
    },
    {
        id: 'conclusion',
        title: 'Você Nunca Mais Estará Sozinha',
        type: 'conclusion',
        content: {
            paragraphs: [
                'Minha neta, agora você tem as ferramentas.',
                'O Oráculo Interior não é mágica. É um músculo. Quanto mais você usa, mais forte ele fica.',
                'Comece com coisas pequenas. Use a intuição para escolher o caminho para o trabalho. Use para escolher o prato no restaurante. Quando a confiança crescer, você estará pronta para as grandes decisões da vida.',
                'E lembre-se: se um dia o barulho for muito alto e você não conseguir se ouvir... A Avó estará aqui. Às vezes, precisamos de uma mão amiga para segurar o espelho para nós. Mas a imagem refletida será sempre a sua força.',
            ],
            signature: 'Vá e confie em si mesma.\n\nCom todo o meu amor,\nA Matriarca (Avó Divina)',
            cta: {
                text: 'Conseguiu se ouvir, mas ainda precisa de uma confirmação profunda? Às vezes, nossas emoções estão tão intensas que nublam a visão. Se precisar de uma segunda opinião sábia e imparcial, o Espelho da Alma está aberto 24h.',
                buttonText: '🪞 Acessar o Espelho da Alma',
                link: 'https://espelhoda-alma-lp.netlify.app/'
            }
        }
    },
    {
        id: 'bonus',
        title: 'Bônus: O Diário de Intuição de 7 Dias',
        type: 'diary',
        content: {
            intro: 'Um modelo prático para fortalecer seu músculo intuitivo ao longo de uma semana. Responda uma pergunta por dia:',
            days: [
                { day: 1, question: 'Qual foi a "primeira impressão" que tive de alguém hoje? Eu estava certa?' },
                { day: 2, question: 'Pedi um sinal? Qual foi a resposta?' },
                { day: 3, question: 'O que meu corpo me disse ao entrar naquele ambiente? (Conforto ou Desconforto?)' },
                { day: 4, question: 'Sonhei com o quê? (Palavras-chave).' },
                { day: 5, question: 'Fiz o teste do Pêndulo Humano para qual decisão?' },
                { day: 6, question: 'Momento de Sincronicidade do dia.' },
                { day: 7, question: 'Mensagem final da minha Alma para a próxima semana.' },
            ]
        }
    }
];

const ChapterContent = ({
    chapter,
    onComplete,
    saveEntry
}: {
    chapter: typeof chapters[0];
    onComplete: () => void;
    saveEntry: (id: string, content: string) => void;
}) => {
    const [breathingDone, setBreathingDone] = useState(false);
    const content = chapter.content as any;

    if (chapter.type === 'breathing') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Marcellus', serif" }}>
                    {chapter.title}
                </h2>
                <p className="text-lg mb-8 max-w-md text-[#E0D8F0]/80">
                    {content.intro}
                </p>

                {!breathingDone ? (
                    <BreathingCircle
                        cycles={2}
                        onComplete={() => {
                            setBreathingDone(true);
                            setTimeout(onComplete, 2000);
                        }}
                    />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <p className="text-xl text-[#A78BFA] mb-6">
                            ✨ Você está pronta para a jornada
                        </p>
                        <p className="text-[#E0D8F0]/60 text-sm">
                            {content.instruction}
                        </p>
                    </motion.div>
                )}
            </div>
        );
    }

    if (chapter.type === 'reveal') {
        return (
            <div className="max-w-2xl mx-auto px-6 py-12">
                <h2 className="text-3xl md:text-4xl mb-4 text-center" style={{ fontFamily: "'Marcellus', serif" }}>
                    {chapter.title}
                </h2>
                {(chapter as any).subtitle && (
                    <p className="text-center text-[#A78BFA] mb-8">{(chapter as any).subtitle}</p>
                )}

                <p className="text-lg mb-8 text-[#E0D8F0]/80 leading-relaxed">
                    {content.intro}
                </p>

                {/* Ritual steps if present */}
                {content.ritual && (
                    <div className="crystal-glass-card my-8">
                        <h4 className="text-[#A78BFA] font-semibold mb-4">{content.ritual.title}</h4>
                        <ol className="space-y-3 text-[#E0D8F0]/80">
                            {content.ritual.steps.map((step: string, i: number) => (
                                <li key={i} className="flex gap-3">
                                    <span className="text-[#A78BFA] font-semibold">{i + 1}.</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Protocol if present */}
                {content.protocol && (
                    <div className="crystal-glass-card my-8">
                        <h4 className="text-[#A78BFA] font-semibold mb-4">{content.protocol.title}</h4>
                        <div className="space-y-4">
                            {content.protocol.items.map((item: any, i: number) => (
                                <div key={i} className="border-l-2 border-[#A78BFA]/30 pl-4">
                                    <h5 className="text-[#FDF4FF] font-semibold">{item.name}</h5>
                                    <p className="text-[#E0D8F0]/70 text-sm mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-12">
                    <HoldToReveal
                        instruction="Segure para limpar o espelho e ver a verdade"
                        onReveal={() => {
                            if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
                        }}
                    >
                        <div className="crystal-glass-card text-center py-12">
                            <p className="text-2xl md:text-3xl text-[#A78BFA] italic" style={{ fontFamily: "'Marcellus', serif" }}>
                                "{content.revealText}"
                            </p>
                        </div>
                    </HoldToReveal>
                </div>

                <p className="text-lg mb-8 text-[#E0D8F0]/80">
                    {content.afterReveal}
                </p>

                <div className="crystal-divider" />

                <div className="mt-8">
                    <p className="text-sm text-[#A78BFA] mb-4">📝 Sua Reflexão:</p>
                    <JournalInput
                        chapterId={chapter.id}
                        placeholder={content.journalPrompt}
                        onSave={(value) => saveEntry(chapter.id, value)}
                    />
                </div>

                <div className="mt-8 text-center">
                    <button onClick={onComplete} className="crystal-btn-primary crystal-btn">
                        Guardar Verdade e Continuar
                    </button>
                </div>
            </div>
        );
    }

    if (chapter.type === 'conclusion') {
        return (
            <div className="max-w-2xl mx-auto px-6 py-12 text-center">
                <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Marcellus', serif" }}>
                    {chapter.title}
                </h2>

                {content.paragraphs?.map((p: string, i: number) => (
                    <p key={i} className="text-lg mb-6 text-[#E0D8F0]/90 text-left">
                        {p}
                    </p>
                ))}

                <div className="crystal-divider my-8" />

                <p className="text-lg italic text-[#A78BFA] whitespace-pre-line" style={{ fontFamily: "'Marcellus', serif" }}>
                    {content.signature}
                </p>

                {/* CTA for Espelho da Alma */}
                {content.cta && (
                    <div className="crystal-glass-card my-12 text-left">
                        <p className="text-[#E0D8F0]/80 mb-6">{content.cta.text}</p>
                        <div className="text-center">
                            <a
                                href={content.cta.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="crystal-btn-primary crystal-btn inline-block"
                            >
                                {content.cta.buttonText}
                            </a>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <button onClick={onComplete} className="crystal-btn-primary crystal-btn">
                        <Download className="w-5 h-5 inline mr-2" />
                        Baixar O Livro da Sua Alma
                    </button>
                </div>
            </div>
        );
    }

    if (chapter.type === 'diary') {
        return (
            <div className="max-w-2xl mx-auto px-6 py-12">
                <h2 className="text-3xl md:text-4xl mb-8 text-center" style={{ fontFamily: "'Marcellus', serif" }}>
                    {chapter.title}
                </h2>

                <p className="text-lg mb-8 text-[#E0D8F0]/80 text-center">
                    {content.intro}
                </p>

                <div className="space-y-6">
                    {content.days?.map((day: any) => (
                        <div key={day.day} className="crystal-glass-card">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] flex items-center justify-center font-bold text-[#1E1B2E]">
                                    {day.day}
                                </span>
                                <h4 className="text-[#FDF4FF] font-semibold">Dia {day.day}</h4>
                            </div>
                            <p className="text-[#E0D8F0]/80 mb-4">{day.question}</p>
                            <JournalInput
                                chapterId={`diary-day-${day.day}`}
                                placeholder="Escreva sua reflexão aqui..."
                                onSave={(value) => saveEntry(`diary-day-${day.day}`, value)}
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button onClick={onComplete} className="crystal-btn-primary crystal-btn">
                        <Download className="w-5 h-5 inline mr-2" />
                        Concluir e Baixar Jornada Completa
                    </button>
                </div>
            </div>
        );
    }

    // Default content type
    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
                {chapter.title}
            </h2>
            {(chapter as any).subtitle && (
                <p className="text-[#A78BFA] mb-8">{(chapter as any).subtitle}</p>
            )}

            {content.paragraphs?.map((p: string, i: number) => (
                <p key={i} className="text-lg mb-6 text-[#E0D8F0]/90 leading-relaxed">
                    {p}
                </p>
            ))}

            {content.highlight && (
                <div className="crystal-glass-card my-8 text-center">
                    <p className="text-xl text-[#A78BFA] italic" style={{ fontFamily: "'Marcellus', serif" }}>
                        "{content.highlight}"
                    </p>
                </div>
            )}

            {/* Comparison table */}
            {content.comparison && (
                <div className="my-8">
                    <h4 className="text-[#FDF4FF] font-semibold mb-4 text-center">{content.comparison.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="crystal-glass-card border-red-500/20">
                            <h5 className="text-red-400 font-semibold mb-3">{content.comparison.left.title}</h5>
                            <ul className="space-y-2 text-[#E0D8F0]/70 text-sm">
                                {content.comparison.left.items.map((item: string, i: number) => (
                                    <li key={i}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="crystal-glass-card border-green-500/20">
                            <h5 className="text-green-400 font-semibold mb-3">{content.comparison.right.title}</h5>
                            <ul className="space-y-2 text-[#E0D8F0]/70 text-sm">
                                {content.comparison.right.items.map((item: string, i: number) => (
                                    <li key={i}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Concept (Expansion vs Contraction) */}
            {content.concept && (
                <div className="crystal-glass-card my-8">
                    <h4 className="text-[#A78BFA] font-semibold mb-4">{content.concept.title}</h4>
                    <div className="space-y-4">
                        {content.concept.items.map((item: any, i: number) => (
                            <div key={i} className="flex gap-3">
                                <span className="text-xl">{item.label.split(' ')[0]}</span>
                                <div>
                                    <span className="font-semibold text-[#FDF4FF]">{item.label}</span>
                                    <p className="text-[#E0D8F0]/70 text-sm mt-1">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Method (how to ask for signs) */}
            {content.method && (
                <div className="crystal-glass-card my-8">
                    <h4 className="text-[#A78BFA] font-semibold mb-4">{content.method.title}</h4>
                    <div className="space-y-3">
                        <p className="text-red-400/80"><span className="font-semibold">❌ Errado:</span> {content.method.wrong}</p>
                        <p className="text-green-400/80"><span className="font-semibold">✅ Certo:</span> {content.method.right}</p>
                    </div>
                </div>
            )}

            {/* Rules list */}
            {content.rules && (
                <div className="crystal-glass-card my-8">
                    <h4 className="text-[#A78BFA] font-semibold mb-4">As Regras:</h4>
                    <ul className="space-y-3 text-[#E0D8F0]/80">
                        {content.rules.map((rule: string, i: number) => (
                            <li key={i}>{rule}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Technique (dream incubation) */}
            {content.technique && (
                <div className="crystal-glass-card my-8">
                    <h4 className="text-[#A78BFA] font-semibold mb-4">{content.technique.title}</h4>
                    <ol className="space-y-3 text-[#E0D8F0]/80">
                        {content.technique.steps.map((step: string, i: number) => (
                            <li key={i} className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#A78BFA]/20 flex items-center justify-center text-sm text-[#A78BFA] flex-shrink-0">{i + 1}</span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {/* Visualization */}
            {content.visualization && (
                <div className="crystal-glass-card my-8">
                    <h4 className="text-[#A78BFA] font-semibold mb-4">{content.visualization.title}</h4>
                    <ol className="space-y-3 text-[#E0D8F0]/80">
                        {content.visualization.steps.map((step: string, i: number) => (
                            <li key={i} className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#A78BFA]/20 flex items-center justify-center text-sm text-[#A78BFA] flex-shrink-0">{i + 1}</span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {/* Insight text */}
            {content.insight && (
                <p className="text-[#E0D8F0]/80 my-6 italic">
                    {content.insight}
                </p>
            )}

            {/* Exercise with text */}
            {content.exercise?.text && (
                <div className="crystal-glass-card my-8">
                    <h4 className="text-[#A78BFA] font-semibold mb-3">{content.exercise.title}</h4>
                    <p className="text-[#E0D8F0]/80">{content.exercise.text}</p>
                </div>
            )}

            {/* Exercise with steps */}
            {content.exercise?.steps && (
                <div className="crystal-glass-card my-8">
                    <h4 className="text-[#A78BFA] font-semibold mb-4">{content.exercise.title}</h4>
                    <ol className="space-y-3 text-[#E0D8F0]/80">
                        {content.exercise.steps.map((step: string, i: number) => (
                            <li key={i} className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#A78BFA]/20 flex items-center justify-center text-sm text-[#A78BFA] flex-shrink-0">{i + 1}</span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {/* Examples (good vs bad questions) */}
            {content.examples && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="crystal-glass-card border-red-500/30">
                        <h4 className="text-red-400 font-semibold mb-3">❌ Evite:</h4>
                        <ul className="space-y-2 text-[#E0D8F0]/70 text-sm">
                            {content.examples.bad.map((ex: any, i: number) => (
                                <li key={i}>
                                    {typeof ex === 'string' ? ex : <>{ex.q} <span className="text-red-400/60">{ex.note}</span></>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="crystal-glass-card border-green-500/30">
                        <h4 className="text-green-400 font-semibold mb-3">✅ Prefira:</h4>
                        <ul className="space-y-2 text-[#E0D8F0]/70 text-sm">
                            {content.examples.good.map((ex: any, i: number) => (
                                <li key={i}>
                                    {typeof ex === 'string' ? ex : <>{ex.q} <span className="text-green-400/60">{ex.note}</span></>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {content.journalPrompt && (
                <>
                    <div className="crystal-divider" />
                    <div className="mt-8">
                        <p className="text-sm text-[#A78BFA] mb-4">📝 Sua Reflexão:</p>
                        <JournalInput
                            chapterId={chapter.id}
                            placeholder={content.journalPrompt}
                            onSave={(value) => saveEntry(chapter.id, value)}
                        />
                    </div>
                </>
            )}

            <div className="mt-8 text-center">
                <button onClick={onComplete} className="crystal-btn">
                    Continuar Jornada →
                </button>
            </div>
        </div>
    );
};

const DigitalBookPage = () => {
    const [currentChapter, setCurrentChapter] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const { completedChapters, markChapterComplete, saveEntry, downloadSoulBook } = useJournalStorage();

    // Focus mode: hide header on scroll down
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsFocusMode(currentScrollY > 100 && currentScrollY > lastScrollY);
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleChapterComplete = useCallback(() => {
        markChapterComplete(currentChapter);

        if (currentChapter === chapters.length - 1) {
            // Final chapter - download soul book
            downloadSoulBook();
        } else {
            // Move to next chapter
            setCurrentChapter(prev => Math.min(prev + 1, chapters.length - 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentChapter, markChapterComplete, downloadSoulBook]);

    const navigateToChapter = (index: number) => {
        setCurrentChapter(index);
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="crystal-temple min-h-screen relative">
            <CrystalParticles count={25} />
            <ReadingProgressBar />

            {/* Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${isFocusMode ? 'crystal-focus-hidden' : 'crystal-focus-visible'
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-4 bg-[#1E1B2E]/80 backdrop-blur-md border-b border-[#A78BFA]/10">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="crystal-btn p-3"
                        aria-label="Menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <h1
                        className="text-lg truncate max-w-[50%]"
                        style={{ fontFamily: "'Marcellus', serif" }}
                    >
                        O Oráculo Interior
                    </h1>

                    <div className="text-sm text-[#A78BFA]">
                        {currentChapter + 1}/{chapters.length}
                    </div>
                </div>
            </header>

            {/* Side Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-50"
                            onClick={() => setMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#1E1B2E] z-50 overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 style={{ fontFamily: "'Marcellus', serif" }} className="text-xl">
                                        Sua Jornada
                                    </h2>
                                    <button
                                        onClick={() => setMenuOpen(false)}
                                        className="crystal-btn p-2"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Mandala Progress */}
                                <div className="mb-8">
                                    <ProgressMandala
                                        completedChapters={completedChapters}
                                        totalChapters={chapters.length}
                                    />
                                </div>

                                {/* Chapter List */}
                                <nav className="space-y-2">
                                    {chapters.map((chapter, index) => {
                                        const isComplete = completedChapters.includes(index);
                                        const isCurrent = index === currentChapter;

                                        return (
                                            <button
                                                key={chapter.id}
                                                onClick={() => navigateToChapter(index)}
                                                className={`w-full text-left p-3 rounded-xl transition-all ${isCurrent
                                                    ? 'bg-[#A78BFA]/20 border border-[#A78BFA]/40'
                                                    : 'hover:bg-[#A78BFA]/10'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isComplete
                                                        ? 'bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] text-[#1E1B2E]'
                                                        : 'border border-[#A78BFA]/30 text-[#A78BFA]/50'
                                                        }`}>
                                                        {isComplete ? '✓' : index + 1}
                                                    </span>
                                                    <span className={`text-sm ${isCurrent ? 'text-[#FDF4FF]' : 'text-[#E0D8F0]/70'}`}>
                                                        {chapter.title.split(':')[0]}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="pt-20 pb-24 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentChapter}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <ChapterContent
                            chapter={chapters[currentChapter]}
                            onComplete={handleChapterComplete}
                            saveEntry={saveEntry}
                        />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Bottom Navigation */}
            <nav
                className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-400 ${isFocusMode ? 'crystal-focus-hidden' : 'crystal-focus-visible'
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-4 bg-[#1E1B2E]/80 backdrop-blur-md border-t border-[#A78BFA]/10">
                    <button
                        onClick={() => {
                            if (currentChapter > 0) {
                                setCurrentChapter(prev => prev - 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        disabled={currentChapter === 0}
                        className="crystal-btn p-3 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-1">
                        {chapters.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentChapter
                                    ? 'bg-[#A78BFA] w-6'
                                    : completedChapters.includes(index)
                                        ? 'bg-[#A78BFA]/50'
                                        : 'bg-[#A78BFA]/20'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (currentChapter < chapters.length - 1) {
                                setCurrentChapter(prev => prev + 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        disabled={currentChapter === chapters.length - 1}
                        className="crystal-btn p-3 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default DigitalBookPage;
