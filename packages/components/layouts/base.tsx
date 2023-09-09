import type { PageProps } from '@components/types';
import Head from 'next/head';
import { FC } from 'react';

// import Footer from '@/components/footer';
// import Header from '@/components/header';
// import { globalStyles } from '@/themes/global';
// import { mq } from '@/themes/settings/breakpoints';
// import { themeDark, themeLight } from '@/themes/settings/color';

export const metadata = {
  title: {
    template: '%s | admin@UNCHAIN_events',
    default: 'UNCHAIN events NFT mint page (admin)',
  },
  description: 'UNCHAIN events NFT mint page (admin)',
  keywords: ['UNCHAIN', 'events', 'NFTs'],
  category: 'technology',
  authors: [{ name: 'neila', url: 'https://github.com/neila' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'UNCHAIN events NFT mint page',
    description: 'UNCHAIN events NFT mint page (admin)',
    // url: 'https://ethereumjapan.org',
    // siteName: 'ethereumjapan.org',
    images: [
      {
        //  url: 'https://ethereumjapan.org/logo/ej.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNCHAIN events NFT mint page',
    description: 'Mint your proof of attendance to an UNCHAIN event.',
    siteId: '1511737631948034048',
    creator: '@zsh0x',
    creatorId: '1511737631948034048',
    // images: ['https://ethereumjapan.org/ej.png'],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#B8FAF6' },
    { media: '(prefers-color-scheme: dark)', color: '#C9B3F5' },
  ],
  // icons: {
  //   icon: '/logo/unchain.png',
  // },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

// const styleCache = createCache({ key: 'next' });

const RootLayout: FC<PageProps> = ({ pageTitle, children }) => {
  const siteTitle = 'UNCHAIN_events';

  return (
    <>
      <Head>
        <title>{pageTitle ? `${pageTitle}@${siteTitle}` : siteTitle}</title>
      </Head>

      <div>
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default RootLayout;
