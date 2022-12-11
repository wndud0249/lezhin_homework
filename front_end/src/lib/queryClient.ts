import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 0,
      staleTime: 0,
      cacheTime: 0,
      enabled: false,
    },
  },
});

export default queryClient;
