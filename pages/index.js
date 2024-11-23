import dynamic from 'next/dynamic';
import Head from 'next/head';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  return (
    <div>
      {/* Adding meta tags and SEO for the page */}
      <Head>
        <title>SUB BUS</title>
        <meta name="description" content="Track vehicles in real-time" />
        <meta property="og:title" content="SUB BUS" />
        <meta property="og:description" content="Track vehicles in real-time" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-website.com" />
        <meta property="og:image" content="https://your-website.com/your-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@yourtwitterhandle" />
        <meta name="twitter:title" content="SUB BUS" />
        <meta name="twitter:description" content="Track vehicles in real-time" />
        <meta name="twitter:image" content="https://your-website.com/your-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Dynamically loading the Map component */}
      <Map />
    </div>
  );
}
