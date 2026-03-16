/**
 * Sistema de Logging e Monitoring
 * Centraliza logs, erros e eventos para análise
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  stack?: string;
  userId?: string;
}

class Logger {
  private isDev = import.meta.env.DEV;
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  /**
   * Log de debug (apenas em desenvolvimento)
   */
  debug(message: string, context?: Record<string, any>): void {
    if (this.isDev) {
      console.debug(`[DEBUG] ${message}`, context);
    }
  }

  /**
   * Log de informação
   */
  info(message: string, context?: Record<string, any>): void {
    const log: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "info",
      message,
      context,
    };

    this.store(log);

    if (this.isDev) {
      console.log(`[INFO] ${message}`, context);
    }
  }

  /**
   * Log de aviso
   */
  warn(message: string, context?: Record<string, any>): void {
    const log: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "warn",
      message,
      context,
    };

    this.store(log);
    console.warn(`[WARN] ${message}`, context);
  }

  /**
   * Log de erro
   */
  error(message: string, error?: Error, context?: Record<string, any>): void {
    const log: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "error",
      message,
      context,
      stack: error?.stack,
    };

    this.store(log);
    console.error(`[ERROR] ${message}`, error, context);

    // Em produção, enviar erro para serviço de monitoring
    if (!this.isDev) {
      this.reportErrorToServer(log);
    }
  }

  /**
   * Registar evento específico (ex: ação do utilizador)
   */
  event(
    eventName: string,
    eventData?: Record<string, any>,
    userId?: string
  ): void {
    const log: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "info",
      message: `Event: ${eventName}`,
      context: eventData,
      userId,
    };

    this.store(log);

    if (this.isDev) {
      console.log(`[EVENT] ${eventName}`, eventData);
    }
  }

  /**
   * Armazenar log localmente (para envio em batch)
   */
  private store(log: LogEntry): void {
    this.logs.push(log);

    // Manter apenas os últimos X logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Enviar em batch a cada 10 logs em produção
    if (!this.isDev && this.logs.length % 10 === 0) {
      this.flushLogs();
    }
  }

  /**
   * Obter todos os logs armazenados
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Limpar logs armazenados
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Enviar logs para servidor (em produção)
   */
  private flushLogs(): void {
    if (this.logs.length === 0) return;

    const logsToSend = [...this.logs];
    this.logs = [];

    // Enviar em background sem bloquear
    navigator.sendBeacon(
      "/api/logs",
      JSON.stringify({
        logs: logsToSend,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      })
    );
  }

  /**
   * Reportar erro específico para servidor
   */
  private reportErrorToServer(log: LogEntry): void {
    // Usar try-catch para não quebrar a app se o logging falhar
    try {
      const payload = JSON.stringify({
        level: log.level,
        message: log.message,
        timestamp: log.timestamp,
        userAgent: navigator.userAgent,
        url: window.location.href,
        context: log.context,
        stack: log.stack,
      });

      // Usar sendBeacon para garantir envio mesmo com página a fechar
      navigator.sendBeacon("/api/errors", payload);
    } catch {
      // Falha silenciosa se não conseguir enviar
      console.error("Falha ao reportar erro para servidor");
    }
  }

  /**
   * Registar erro e lançar novamente
   */
  catchAndRethrow(error: Error, context?: Record<string, any>): never {
    this.error(`Erro capturado: ${error.message}`, error, context);
    throw error;
  }
}

// Exportar instância única do logger
export const logger = new Logger();

/**
 * Hook para usar logger em componentes
 */
export function useLogger() {
  return logger;
}

/**
 * Error Handler para React Error Boundaries
 */
export function handleErrorBoundary(
  error: Error,
  errorInfo: { componentStack: string }
): void {
  logger.error("React Error Boundary", error, {
    componentStack: errorInfo.componentStack,
  });
}

/**
 * Handler para erros não capturados globalmente
 */
export function setupGlobalErrorHandlers(): void {
  // Erros de JavaScript não capturados
  window.addEventListener("error", (event) => {
    logger.error("Erro global não capturado", event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Promessas rejeitadas não tratadas
  window.addEventListener("unhandledrejection", (event) => {
    logger.error("Promise rejection não tratada", new Error(String(event.reason)), {
      promise: event.promise,
    });
  });
}
