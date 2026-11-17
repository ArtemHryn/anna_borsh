import Image from "next/image";
import { Product } from "../../Products";
import ActionsColumn from "./ActionsColumn/ActionsColumn";

import styles from "./ProductsTable.module.scss";

interface ProductsTableProps {
  products: Product[];
}

const plainText = (html = "") => {
  if (typeof document === "undefined") return html.replace(/<[^>]*>/g, " ");
  const element = document.createElement("div");
  element.innerHTML = html;
  return element.textContent || "";
};

const formatDate = (date?: string) => {
  if (!date) return "—";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? date
    : new Intl.DateTimeFormat("uk-UA").format(parsed);
};

const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Обкладинка</th>
            <th>Вид продукту</th>
            <th>Назва</th>
            <th>Опис</th>
            <th>Дата</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  {!!product.cover?.url ? (
                    <Image
                      className={styles.cover}
                      src={product.cover.url}
                      alt={`Обкладинка: ${product.name}`}
                      width={112}
                      height={112}
                    />
                  ) : (
                    <div className={styles.cover_placeholder}>Немає фото</div>
                  )}
                </td>
                <td className={styles.name}>Курс</td>
                <td className={styles.name}>{product.name}</td>
                <td>
                  <p className={styles.description}>
                    {plainText(product.description)}
                  </p>
                </td>
                <td className={styles.date}>{formatDate(product.dateStart)}</td>
                <td>
                  <ActionsColumn name={product.name} id={product._id} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className={styles.empty}>
                Продуктів не знайдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
