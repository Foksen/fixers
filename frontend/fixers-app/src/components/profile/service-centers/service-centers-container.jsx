"use client";

import { ProfilePageView } from "../profile-page-view";
import { ServiceCentersContent } from "./service-centers-content";

export function ServiceCentersContainer({
  initialServiceCentersInfos,
  session,
}) {
  return (
    <ProfilePageView
      title="Сервисные центры"
      description="На этой страницы собрана информация о существующих сервисных центрах"
      content={
        <ServiceCentersContent
          initialServiceCentersInfos={initialServiceCentersInfos}
          session={session}
        />
      }
    />
  );
}
