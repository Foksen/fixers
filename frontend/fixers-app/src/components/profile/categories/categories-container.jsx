"use client";

import { ProfilePageView } from "../profile-page-view";
import { CategoriesContent } from "./categories-content";

export function CategoriesContainer({ initialCategoriesInfos, session }) {
  return (
    <ProfilePageView
      title="Виды ремонта"
      description="На этой страницы собрана информация о существующих видах ремонта"
      content={<CategoriesContent initialCategoriesInfos={initialCategoriesInfos} session={session} />}
    />
  );
}
