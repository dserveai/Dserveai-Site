import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dserve AI',
    short_name: 'Dserve AI',
    description: 'Premium AI training datasets, data annotation, and collection services for cutting-edge AI development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
