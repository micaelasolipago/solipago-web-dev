// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configuración por defecto: los datos se consideran 'stale' (obsoletos) después de 5 minutos.
      staleTime: 1000 * 60 * 5, 
      // Número de reintentos en caso de fallo.
      retry: 2, 
    },
  },
});
