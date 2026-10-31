import Container from "@/components/Common/Container/Container";
import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";

import styles from "./Products.module.scss";
import ProductsList from "./ProductsList/ProductsList";
import Title from "../Title/Title";

const Products = () => {
  return (
    <Container styledSec={styles.section}>
      <SectionHeader right="03 / ПРОДУКТИ" left="03" light={true} />
      <div className={styles.text_wrapper}>
        <Title title="ОБЕРИ СВОЄ" />
        <p className={styles.about}>
          Програми, лекції та практикуми для різних етапів роботи з блогом.
        </p>
      </div>
      <ProductsList />
    </Container>
  );
};

export default Products;
