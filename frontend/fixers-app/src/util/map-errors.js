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
