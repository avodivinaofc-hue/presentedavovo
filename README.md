# 🔮 Oráculo Divino Quest - Avó Divina

Uma landing page mística e responsiva para captura de leads e conversão de vendas, focada em esoterismo e tarô.

## ✨ Características Principais

### 🎯 **Funnel de Vendas Simplificado**
- **Landing Page** (`/`) - Captura emails com oferta gratuita
- **Ebook Page** (`/ebook`) - Entrega do produto gratuito

### 📱 **Design Mobile-First**
- **100% Responsivo** - Otimizado para todos os dispositivos
- **Mobile-First** - Desenvolvido pensando primeiro em dispositivos móveis
- **Touch-Friendly** - Botões e inputs otimizados para toque
- **Performance Mobile** - Partículas reduzidas e animações otimizadas

### 🎨 **Sistema de Design Místico**
- **Paleta de Cores Esotérica** - Roxos, dourados e azuis místicos
- **Gradientes Mágicos** - Efeitos visuais únicos
- **Animações Suaves** - Transições e efeitos de flutuação
- **Tipografia Responsiva** - Escala automática para diferentes telas

## 🚀 Tecnologias Utilizadas

- **React 18** + **TypeScript**
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes UI de alta qualidade
- **Supabase** - Backend e autenticação
- **Lucide React** - Ícones modernos

## 📱 Melhorias de Responsividade Mobile

### ✅ **Problemas Corrigidos**
- **Layout Quebrado** - Grid responsivo corrigido para mobile
- **Espaçamento Inadequado** - Padding e margins otimizados
- **Textos Desproporcionais** - Tamanhos de fonte responsivos
- **Elementos Descentralizados** - Alinhamento corrigido
- **Menu Mobile Removido** - Interface limpa sem navegação desnecessária

### 🎯 **Otimizações Implementadas**
- **Breakpoints Responsivos** - sm (640px), md (768px), lg (1024px), xl (1280px)
- **Espaçamento Adaptativo** - Padding e margins que se ajustam ao dispositivo
- **Tipografia Escalável** - Textos que crescem proporcionalmente
- **Grid Flexível** - Layouts que se reorganizam automaticamente
- **Touch Targets** - Botões com altura mínima de 44px para mobile

### 🔧 **Componentes Otimizados**
- **MysticalButton** - Tamanhos responsivos e touch-friendly
- **MysticalCard** - Padding adaptativo para diferentes telas
- **CountdownTimer** - Texto escalável para mobile
- **FloatingParticles** - Performance otimizada para dispositivos móveis
- **Formulários** - Inputs com altura adequada para touch

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone [url-do-repositorio]
cd oraculo-divino-quest

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Variáveis de Ambiente
Crie um arquivo `.env.local`:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── MysticalButton.tsx
│   ├── MysticalCard.tsx
│   ├── CountdownTimer.tsx
│   └── FloatingParticles.tsx
├── pages/              # Páginas da aplicação
│   ├── LandingPage.tsx
│   └── EbookPage.tsx
├── integrations/       # Integrações externas
│   └── supabase/      # Cliente Supabase
├── hooks/             # Hooks customizados
├── lib/               # Utilitários
└── assets/            # Imagens e recursos
```

## 🎨 Sistema de Cores

### **Cores Principais**
- `--mystic-purple`: 270 50% 25% (Roxo místico)
- `--mystic-gold`: 45 100% 65% (Dourado místico)
- `--mystic-blue`: 240 60% 20% (Azul místico)
- `--mystic-cream`: 45 20% 95% (Creme místico)

### **Gradientes**
- `--gradient-mystical`: Roxo para azul
- `--gradient-gold`: Dourado para dourado brilhante
- `--gradient-ethereal`: Background para roxo transparente

## 📱 Breakpoints Responsivos

```css
/* Mobile First */
.sm: 640px   /* Small devices */
.md: 768px   /* Medium devices */
.lg: 1024px  /* Large devices */
.xl: 1280px  /* Extra large devices */
.2xl: 1536px /* 2X large devices */
```

## 🚀 Deploy

### Netlify
```bash
npm run build
# Fazer upload da pasta dist/
```

### Vercel
```bash
npm run build
# Conectar repositório Git
```

## 📊 Performance

- **Lighthouse Score**: 90+ em todas as métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔮 Funcionalidades Especiais

### **Captura de Leads**
- Formulário otimizado para conversão
- Integração com Supabase
- Rastreamento UTM automático
- Validação em tempo real

### **Countdown Timer**
- Timer de urgência configurável
- Design responsivo
- Animações suaves

### **Sistema de Partículas**
- Efeito visual mágico
- Performance otimizada para mobile
- Redução automática em dispositivos menores

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **Avó Divina** - Inspiração e conteúdo
- **Shadcn/ui** - Componentes de alta qualidade
- **Tailwind CSS** - Framework CSS utilitário
- **Supabase** - Backend serverless

---

**Desenvolvido com 💜 e ✨ para trazer clareza e magia ao mundo digital.**
