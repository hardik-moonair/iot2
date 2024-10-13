import '@/styles/globals.css'; // Tailwind CSS
import { Inter } from '@next/font/google';
import Head from 'next/head';

// Load Google Font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter', // Optional CSS variable for font family
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <Head>
        <title>Modern Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
