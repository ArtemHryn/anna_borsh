import ResetPassword from "@/components/Cabinet/Auth/ResetPassword/ResetPassword";
import Container from "@/components/Common/Container/Container";

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { token } = await searchParams;

  return (
    <main>
      <Container>
        <ResetPassword token={typeof token === "string" ? token : undefined} />
      </Container>
    </main>
  );
};

export default ResetPasswordPage;
