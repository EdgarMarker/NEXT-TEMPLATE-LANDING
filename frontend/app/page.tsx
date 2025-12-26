
import { generateMetadataFromContract } from "./common/utils/helper-seo";
import { getHomePageData } from "./_domain/services/home-page.services";
import { HomePageModel } from "./_domain/model/home-page.model";
import { createContract } from "./common/utils/helper-contract";

export const generateMetadata = async () => {
  return generateMetadataFromContract(getHomePageData, HomePageModel);
};

export default async function Home() {
  const data = await createContract(getHomePageData, HomePageModel);
  if (!data) return null;
  return (
    <main>
      <section></section>
    </main>
  );
}
