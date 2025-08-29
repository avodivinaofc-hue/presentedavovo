// Configuração de ambiente para o projeto
export const config = {
  supabase: {
    url: "https://eywqybkwinmbpxkmdfkj.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d3F5Ymt3aW5tYnB4a21kZmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNzA3MTQsImV4cCI6MjA2Njc0NjcxNH0.IzloGBQNXbb1bjvaarF8OcT9QKmpt-m9GXFoIS4rez0",
    serviceRoleKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5d3F5Ymt3aW5tYnB4a21kZmtqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTE3MDcxNCwiZXhwIjoyMDY2NzQ2NzE0fQ.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8"
  },
  app: {
    name: "Oráculo Divino Quest",
    version: "1.0.0"
  }
};

// Verificar se as configurações estão presentes
export const validateConfig = () => {
  const required = ['url', 'anonKey'];
  const missing = required.filter(key => !config.supabase[key as keyof typeof config.supabase]);
  
  if (missing.length > 0) {
    console.error('Missing Supabase configuration:', missing);
    return false;
  }
  
  return true;
};
