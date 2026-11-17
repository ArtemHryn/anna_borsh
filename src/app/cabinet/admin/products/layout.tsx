import AdminWrapper from "@/components/Common/AdminWrapper/AdminWrapper";
import { ReactNode, Suspense } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminWrapper
      title={"Продукти"}
      description="Програми, практикуми та лекційні матеріали"
    >
      <Suspense fallback={<div>Завантаження...</div>}>{children}</Suspense>
    </AdminWrapper>
  );
};

export default layout;
