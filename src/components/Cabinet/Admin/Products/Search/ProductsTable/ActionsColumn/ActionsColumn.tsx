import Link from "next/link";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";
import ViewIcon from "../Icons/ViewIcon";

import { useMutation } from "@tanstack/react-query";
import { actionProduct } from "@/helpers/cabinet/admin/actionsProduct";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import styles from "./ActionsColumn.module.scss";

interface ActionsColumn {
  name: string;
  id: string;
}

const ActionsColumn = ({ name, id }: ActionsColumn) => {
  const { data } = useSession();
  const mutation = useMutation({
    mutationFn: () =>
      actionProduct({ id, method: "DELETE", token: data?.accessToken || "" }),
    onSuccess: () => toast.success("Продукт успішно видалено"),
    onError: (er) => toast.error(er?.message || "Помилка видалення продукту"),
  });

  return (
    <div className={styles.row_actions}>
      <button
        type="button"
        aria-label={`Переглянути ${name}`}
        title="Переглянути"
        className={styles.icon_button}
      >
        <ViewIcon />
      </button>
      <Link
        href={`/cabinet/admin/products/edit/${id}`}
        aria-label={`Редагувати ${name}`}
        title="Редагувати"
        className={styles.icon_button}
      >
        <EditIcon />
      </Link>
      <button
        type="button"
        aria-label={`Видалити ${name}`}
        title="Видалити"
        className={styles.icon_button}
        onClick={() => mutation.mutate()}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default ActionsColumn;
