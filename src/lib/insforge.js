import { createClient } from '@insforge/sdk';

const insforgeUrl = 'https://m5quat3a.us-east.insforge.app';
const insforgeKey = 'ik_797a80be7e43767e0c41c16f14d11d0f';

export const insforge = createClient({
  baseUrl: insforgeUrl,
  anonKey: insforgeKey
});
