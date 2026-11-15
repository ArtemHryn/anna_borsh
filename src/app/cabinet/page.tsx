import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CabinetPage() {
  const session = await auth();

  redirect(
    session?.user?.role === "ADMIN"
      ? "/cabinet/admin/products"
      : "/cabinet/user",
  );
}
