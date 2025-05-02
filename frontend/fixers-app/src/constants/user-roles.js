export const USER_ROLE = {
  CLIENT: "CLIENT",
  MASTER: "MASTER",
  MODERATOR: "MODERATOR",
};

export function roleToView(role) {
  switch (role) {
    case USER_ROLE.CLIENT:
      return "Клиент";
    case USER_ROLE.MASTER:
      return "Мастер";
    case USER_ROLE.MODERATOR:
      return "Администратор";
  }
  return "Неизвестно";
}
