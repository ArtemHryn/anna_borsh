import AddProductButton from "./AddProductButton/AddProductButton";
import Search from "./Search/Search";

import styles from "./Products.module.scss";

const Products = () => {
  return (
    <div>
      <div className={styles.actions_wrapper}>
        <Search />
        <AddProductButton />
      </div>
    </div>
  );
};

export default Products;
