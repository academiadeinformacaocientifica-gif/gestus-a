/**
 * Validação de Variáveis de Ambiente
 * Valida que todas as variáveis obrigatórias estão configuradas
 */

const REQUIRED_ENV_VARS = ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"];

export function validateEnvVars(): void {
  const missingVars = REQUIRED_ENV_VARS.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    const message = `Variáveis de ambiente obrigatórias em falta: ${missingVars.join(", ")}`;
    if (import.meta.env.DEV) {
      console.error(message);
    } else {
      throw new Error(message);
    }
  }
}

// Validar ao inicializar a aplicação
validateEnvVars();

export const ENV = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL as string,
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
