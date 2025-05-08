import { ProfilePageView } from "../profile-page-view";
import { SettingsContent } from "./settings-content";

export function SettingsContainer({ session }) {
  return (
    <ProfilePageView
      title="Настройки"
      description="На этой странице вы можете изменить настройки своего аккаунта"
      content={<SettingsContent session={session}/>}
    />
  );
}
