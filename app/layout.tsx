import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Benjamin & Rosetta — Our Little Forever',
  description:
    'A romantic third-anniversary tribute celebrating Benjamin and Rosetta, with story chapters, a secret message, a memory gallery, and a loving future.'
  openGraph: {
    title: 'Benjamin & Rosetta — Our Little Forever',
    description:
      '27 October 2023 — 27 October 2026. Three years of love, laughter, and a future still being written.',
    url: 'https://example.com',
    siteName: 'Benjamin & Rosetta',
    images: [
      {
        url: '/social-preview.svg',
        width: 1200,
        height: 630,
        alt: 'Benjamin & Rosetta — Our Little Forever'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benjamin & Rosetta — Our Little Forever',
    description:
      'Three years down. A lifetime of memories to go.',
    images: ['/social-preview.svg']
  },
  icons: {
    icon: '/social-preview.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
