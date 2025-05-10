import { ProfilePageView } from "../profile-page-view";
import { UsersTable } from "./users-table";

export function UsersContainer({ initialUserInfos, session }) {
  return (
    <ProfilePageView
      title="Пользователи"
      description="Страница для управления пользователями сервиса"
      content={
        <UsersTable initialUserInfos={initialUserInfos} session={session} />
      }
    />
  );
}
