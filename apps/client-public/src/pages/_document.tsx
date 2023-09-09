import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

type NoncedDocument = DocumentInitialProps & { nonce: string };

const CustomDocument = (props: NoncedDocument) => {
  return (
    <Html prefix="og: https://ogp.me/ns#" lang="ja" nonce={props.nonce}>
      <Head nonce={props.nonce}>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          // content='ethereumjapan.org'
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="UNCHAIN events NFT mint page" />
        <meta
          property="og:image"
          // content='https://ethereumjapan.org/logo.png'
        />
        <meta
          property="og:description"
          content="Mint your proof of attendance to an UNCHAIN event."
        />
        <meta
          name="description"
          content="Mint your proof of attendance to an UNCHAIN event."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@zsh0x" />
        <meta property="csp-nonce" content={props.nonce} />
      </Head>

      <body nonce={props.nonce}>
        <Main />
        <NextScript nonce={props.nonce} />
      </body>
    </Html>
  );
};

CustomDocument.getInitialProps = async (
  ctx: DocumentContext,
): Promise<NoncedDocument> => {
  const initialProps = await Document.getInitialProps(ctx);
  const nonce = (ctx.req?.headers['x-csp-nonce'] as string) ?? '';

  return { ...initialProps, nonce: nonce };
};

export default CustomDocument;
