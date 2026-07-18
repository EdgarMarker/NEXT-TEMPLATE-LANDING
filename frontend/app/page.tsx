import { redirect, notFound } from "next/navigation";
import { getFirstHomePageSlug } from "./_domain/services/home-page.services";

export default async function RootPage() {
  const slug = await getFirstHomePageSlug();
  if (!slug) return notFound();

  redirect(`/${slug}`);
}
