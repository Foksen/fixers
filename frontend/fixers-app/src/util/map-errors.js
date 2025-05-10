export function mapCategoryNameError(error) {
  const errorLc = error.toLowerCase();
  if (errorLc.includes("category with this name already exists")) {
    return "Вид ремонта с таким названием уже существует";
  }
  return "Ошибка при сохранении имени вида ремонта";
}

export function mapServiceCenterNameError(error) {
  const errorLc = error.toLowerCase();
  if (errorLc.includes("service center with this name already exists")) {
    return "Сервисный центр с таким названием уже существует";
  }
  return "Ошибка при сохранении имени сервисного центра";
}

export function mapCredentialsError(message) {
  const errorLc = message.toLowerCase();
  if (errorLc == null) {
    return "Неизвестная ошибка";
  }
  if (errorLc.includes("user with that username already exists")) {
    return "Указанное имя уже занято";
  }
  if (errorLc.includes("user with this email already exists")) {
    return "Указанная почта уже занята";
  }
  if (errorLc.includes("enter a valid email address")) {
    return "Введите корректную почту";
  }
  if (errorLc.includes("enter a valid username")) {
    return "Введите корректное имя";
  }
  return errorLc;
}
