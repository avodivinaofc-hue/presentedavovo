import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Sun, 
  Moon, 
  Monitor, 
  Palette, 
  Leaf, 
  Settings, 
  Eye,
  Type,
  RotateCcw
} from 'lucide-react';

export const ThemeController: React.FC = () => {
  const { 
    preferences, 
    updatePreferences, 
    toggleTheme, 
    toggleColorScheme, 
    applySeasonalTheme, 
    resetToDefaults 
  } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);

  const getThemeIcon = () => {
    switch (preferences.mode) {
      case 'light': return <Sun className="w-4 h-4" />;
      case 'dark': return <Moon className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (preferences.mode) {
      case 'light': return 'Claro';
      case 'dark': return 'Escuro';
      default: return 'Automático';
    }
  };

  const getColorSchemeIcon = () => {
    switch (preferences.colorScheme) {
      case 'mystical': return <Palette className="w-4 h-4" />;
      case 'cosmic': return <Moon className="w-4 h-4" />;
      case 'earth': return <Leaf className="w-4 h-4" />;
      case 'ocean': return <Leaf className="w-4 h-4" />;
      case 'fire': return <Sun className="w-4 h-4" />;
      default: return <Palette className="w-4 h-4" />;
    }
  };

  const getColorSchemeLabel = () => {
    switch (preferences.colorScheme) {
      case 'mystical': return 'Místico';
      case 'cosmic': return 'Cósmico';
      case 'earth': return 'Terra';
      case 'ocean': return 'Oceano';
      case 'fire': return 'Fogo';
      default: return 'Místico';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-border/50 shadow-lg hover:bg-background/90 transition-all duration-300"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="w-80 p-4 space-y-4 bg-background/95 backdrop-blur-md border-border/50"
        >
          <DropdownMenuLabel className="text-lg font-bold text-center pb-2 border-b border-border/30">
            Personalização
          </DropdownMenuLabel>

          {/* Tema Claro/Escuro */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Tema
            </Label>
            <Button 
              variant="outline" 
              onClick={toggleTheme}
              className="w-full justify-between"
            >
              <span>{getThemeLabel()}</span>
              {getThemeIcon()}
            </Button>
          </div>

          {/* Esquema de Cores */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Esquema de Cores
            </Label>
            <Button 
              variant="outline" 
              onClick={toggleColorScheme}
              className="w-full justify-between"
            >
              <span>{getColorSchemeLabel()}</span>
              {getColorSchemeIcon()}
            </Button>
          </div>

          <DropdownMenuSeparator />

          {/* Tema Sazonal */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Tema Sazonal
            </Label>
            <Button 
              variant="outline" 
              onClick={applySeasonalTheme}
              className="w-full"
            >
              Aplicar Tema da Estação
            </Button>
          </div>

          <DropdownMenuSeparator />

          {/* Acessibilidade */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Acessibilidade
            </Label>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="text-sm">
                Reduzir Movimento
              </Label>
              <Switch
                id="reduced-motion"
                checked={preferences.reducedMotion}
                onCheckedChange={(checked) => 
                  updatePreferences({ reducedMotion: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="text-sm">
                Alto Contraste
              </Label>
              <Switch
                id="high-contrast"
                checked={preferences.highContrast}
                onCheckedChange={(checked) => 
                  updatePreferences({ highContrast: checked })
                }
              />
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Tamanho da Fonte */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Type className="w-4 h-4" />
              Tamanho da Fonte
            </Label>
            <div className="flex gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <Button
                  key={size}
                  variant={preferences.fontSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => updatePreferences({ fontSize: size })}
                  className="flex-1"
                >
                  {size === 'small' ? 'A' : size === 'medium' ? 'AA' : 'AAA'}
                </Button>
              ))}
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Reset */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              onClick={resetToDefaults}
              className="w-full text-destructive hover:text-destructive"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restaurar Padrões
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
