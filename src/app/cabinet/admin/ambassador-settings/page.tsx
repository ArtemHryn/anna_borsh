import AmbassadorSettings from "@/components/Cabinet/Admin/AmbassadorSettings/AmbassadorSettings";
import AdminWrapper from "@/components/Common/AdminWrapper/AdminWrapper";

const AmbassadorSettingsPage = () => {
  return (
    <AdminWrapper
      title="Амбасадорська програма"
      description="Умови та строки"
    >
      <AmbassadorSettings />
    </AdminWrapper>
  );
};

export default AmbassadorSettingsPage;
