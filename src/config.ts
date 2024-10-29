export default {
  inDev: import.meta.env.VITE_NODE_ENV === 'development',
  clientId: import.meta.env.VITE_CLIENT_ID,
  domain: import.meta.env.VITE_DOMAIN,
  backendUrl: import.meta.env.VITE_BACKEND_URL,
};
