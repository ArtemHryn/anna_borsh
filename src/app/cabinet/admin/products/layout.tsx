import AdminWrapper from "@/components/Common/AdminWrapper/AdminWrapper";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminWrapper
      title={"Продукти"}
      description="Програми, практикуми та лекційні матеріали"
    >
      {children}
    </AdminWrapper>
  );
};

export default layout;
