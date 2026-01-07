import "./page.css";
import { generateMetadataFromContract } from "./common/utils/helper-seo";
import { getHomePageData } from "./_domain/services/home-page.services";
import { HomePageModel } from "./_domain/model/home-page.model";
import { createContract } from "./common/utils/helper-contract";
import CustomPortableText from "./common/components/text/CustomPortableText";
import Button from "./common/components/btn/Button";
import ResponsiveImage from "./common/components/img/ResponsiveImage";
import Icon from "./common/components/img/Icon";
import HomeTestySliderSection from "./components/HomeTestySliderSection";
import HomeGalleryLightBoxSection from "./components/HomeGalleryLightBoxSection";
import PreFooter from "./common/components/footer/PreFooter";
import Footer from "./common/components/footer/Footer";
import HomeModelsSection from "./components/HomeModelsSection";

export const generateMetadata = async () => {
  return generateMetadataFromContract(getHomePageData, HomePageModel);
};

export default async function Home() {
  const data = await createContract(getHomePageData, HomePageModel);
  if (!data) return null;

  console.log(data.amenities.list_ref_amenities_amenitiesList[0].iconSet);
  return (
    <main id="home-page">
      <section className="section__hero">
        <div className="column__2">
          <div className="col__left">
            <h1>{data.hero.string_h1}</h1>
            <CustomPortableText
              hasImg={false}
              data={data.hero.list_block_title_hero_title}
            />
            <Button variant="link" href="/">
              Ver más
            </Button>
          </div>
          <div className="col__right">
            <ResponsiveImage imageData={data.hero.img_hero_banner} />
            <video src={data.hero.file_video.media.url} loop muted autoPlay />
          </div>
        </div>
      </section>

      <section className="section__quote">
        <div className="column__1">
          <CustomPortableText
            hasImg={false}
            data={data.quote.list_block_title_quote_quoteText}
          />
        </div>
      </section>

      <section className="section__intro" id="Intro">
        <div className="column__2">
          <div className="col__left">
            <CustomPortableText
              hasImg={false}
              data={data.intro.list_block_title_intro_introTitle}
            />
          </div>
          <div className="col__right">
            <ResponsiveImage imageData={data.intro.img_intro_introImage} />
          </div>
        </div>
      </section>

      <section className="section__amenity" id="Amenities">
        <div className="column__1">
          <CustomPortableText
            hasImg={false}
            data={data.amenities.list_block_title_amenities_amenitiesTitle}
          />

          <ul>
            {data.amenities.list_ref_amenities_amenitiesList.map(
              (amenity, idx) => (
                <li key={idx ?? ""}>
                  <Icon data={amenity} iconPackage={amenity.iconSet} />
                  <span>{amenity.name}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <section className="divider__1">
        <div className="column__1">
          <ResponsiveImage
            imageData={data.divider_1.img_divider_1_dividerImage}
          />
        </div>
      </section>

      <section className="section__location" id="Location">
        <div className="column__2">
          <div className="col__left">
            <CustomPortableText
              hasImg={false}
              data={data.location.list_block_title_location_locationTitle}
            />
          </div>
          <div className="col__right">
            <ResponsiveImage imageData={data.location.img_location_svg} />
            <ResponsiveImage imageData={data.location.icon_location_pin} />
          </div>
        </div>
      </section>

      <HomeModelsSection data={data.serialize()} />

      <section className="divider__2">
        <div className="column__1">
          <ResponsiveImage
            imageData={data.divider_2.img_divider_2_dividerImage}
          />
        </div>
      </section>

      <HomeTestySliderSection data={data.serialize()} />

      <HomeGalleryLightBoxSection data={data.serialize()} />

      <PreFooter />
      <Footer />
    </main>
  );
}
