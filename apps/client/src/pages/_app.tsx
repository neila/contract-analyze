import type { AppProps } from 'next/app';

const Page = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default Page;
