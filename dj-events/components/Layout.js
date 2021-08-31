import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import Showcase from "./Showcase";
import styles from "../styles/Layout.module.css";
import NextNprogress from "nextjs-progressbar";
const Layout = ({ children, description, keywords, title }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <NextNprogress
        color='#FF6347'
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Header />
      {router.pathname === "/" && <Showcase />}

      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Dj Events",
  keywords: "dj,events,music,songs",
  description: "The best dj events in town",
};
