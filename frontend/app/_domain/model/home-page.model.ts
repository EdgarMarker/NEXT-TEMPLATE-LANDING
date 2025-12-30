/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseModel, Block, IconPackage, Image, SEO } from "../module.interface";

export class TestimonialModel extends BaseModel {
  public _id!: string;
  public _type!: string;

  public grade!: string;
  public string_line_testimonial_authorLocation!: string;
  public string_line_testimonial_authorName!: string;
  public string_textarea_testimonial_content!: string;

  constructor(data: any) {
    super();

    Object.assign(this, {
      _id: this.safeString(data?._id),
      _type: this.safeString(data?._type),

      grade: this.safeString(data?.grade),
      string_line_testimonial_authorLocation: this.safeString(
        data?.string_line_testimonial_authorLocation
      ),
      string_line_testimonial_authorName: this.safeString(
        data?.string_line_testimonial_authorName
      ),
      string_textarea_testimonial_content: this.safeString(
        data?.string_textarea_testimonial_content
      ),
    });
  }
}

///////////////////////////////////////////////////////////////////////

export class AmenityModel extends BaseModel {
  public _id!: string;
  public _type!: string;

  public iconName!: string;
  public iconSet!: IconPackage;
  public name!: string;
  public customIcon!: Image;

  constructor(data: any) {
    super();

    Object.assign(this, {
      _id: this.safeString(data?._id),
      _type: this.safeString(data?._type),

      iconName: this.safeString(data?.iconName),
      iconSet: this.safeString(data?.iconSet),
      name: this.safeString(data?.name),
    });
  }
}

///////////////////////////////////////////////////////////////////////

export class HomePageModel extends BaseModel {
  public _id!: string;
  public _type!: string;

  public amenities!: {
    list_block_title_amenities_amenitiesTitle: Block[];
    list_ref_amenities_amenitiesList: AmenityModel[];
  };
  public gallery!: {
    list_block_title_gallery_galleryTitle: Block[];
    list_images: Image[];
  };
  public hero!: {
    img_hero_banner: Image;
    list_block_title_hero_title: Block[];
    string_h1: string;
    string_line_hero_button: string;
  };
  public intro!: {
    img_intro_introImage: Image;
    list_block_title_intro_introTitle: Block[];
  };
  public location!: {
    icon_location_pin: Image;
    img_location_svg: Image;
    list_block_title_location_locationTitle: Block[];
  };
  public testy!: {
    list_block_title_testy_testyTitle: Block[];
    list_ref_testy_testyList: TestimonialModel[];
  };
  public seo!: SEO;

  constructor(data: any) {
    super();

    Object.assign(this, {
      _id: this.safeString(data?._id),
      _type: this.safeString(data?._type),

      amenities: {
        list_block_title_amenities_amenitiesTitle: this.safeBlockText(
          data?.amenities?.list_block_title_amenities_amenitiesTitle
        ),
        list_ref_amenities_amenitiesList: this.safeReferenceArray(
          data?.amenities?.list_ref_amenities_amenitiesList,
          AmenityModel
        ),
      },
      gallery: {
        list_block_title_gallery_galleryTitle: this.safeBlockText(
          data?.gallery?.list_block_title_gallery_galleryTitle
        ),
        list_images: this.safeArray(data?.gallery?.list_images, (img: any) =>
          this.safeImage(img)
        ),
      },
      hero: {
        img_hero_banner: this.safeImage(data?.hero?.img_hero_banner),
        list_block_title_hero_title: this.safeBlockText(
          data?.hero?.list_block_title_hero_title
        ),
        string_h1: this.safeString(data?.hero?.string_h1),
        string_line_hero_button: this.safeString(
          data?.hero?.string_line_hero_button
        ),
      },
      intro: {
        img_intro_introImage: this.safeImage(data?.intro?.img_intro_introImage),
        list_block_title_intro_introTitle: this.safeBlockText(
          data?.intro?.list_block_title_intro_introTitle
        ),
      },
      location: {
        icon_location_pin: this.safeIcon(data?.location?.icon_location_pin),
        img_location_svg: this.safeImage(data?.location?.img_location_svg),
        list_block_title_location_locationTitle: this.safeBlockText(
          data?.location?.list_block_title_location_locationTitle
        ),
      },
      testy: {
        list_block_title_testy_testyTitle: this.safeBlockText(
          data?.testy?.list_block_title_testy_testyTitle
        ),
        list_ref_testy_testyList: this.safeReferenceArray(
          data?.testy?.list_ref_testy_testyList,
          TestimonialModel
        ),
      },
      seo: this.safeSEO(data?.seo),
    });
  }
}
