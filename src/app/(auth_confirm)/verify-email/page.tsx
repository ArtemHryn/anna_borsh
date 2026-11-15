import Container from "@/components/Common/Container/Container";
import VerifyEmail from "@/components/Cabinet/Auth/VerifyEmail/VerifyEmail";

type VerificationPageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

const VerificationPage = async ({ searchParams }: VerificationPageProps) => {
  const { token } = await searchParams;

  return (
    <main>
      <Container>
        <VerifyEmail token={typeof token === "string" ? token : undefined} />
      </Container>
    </main>
  );
};

export default VerificationPage;
