import Header from "@/components/Main/Header/Header";
import styles from "./page.module.scss";
import Hero from "@/components/Main/Hero/Hero";
import About from "@/components/Main/About/About";
import Products from "@/components/Main/Products/Products";
import StudentsCase from "@/components/Main/StudentsCase/StudentsCase";
import Footer from "@/components/Main/Footer/Footer";

export default function Home() {
  return (
    <>
      <div className={styles.header_wrapper}>
        <Header />
        <Hero />
      </div>
      <main>
        <About />
        <Products />
        <StudentsCase />
      </main>
      <Footer />
    </>
  );
}
