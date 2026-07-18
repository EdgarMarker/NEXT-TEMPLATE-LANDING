/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseModel, Block, IconPackage, Image, SEO, SLUG } from "../module.interface";

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

export class ProductoModel extends BaseModel {
  public _id!: string;
  public _type!: string;

  public general!: {
    list_block_title_general_description: Block[];
    list_gallery: Image[];
    string_line_general_category: string;
    string_line_general_title: string;
  };

  constructor(data: any) {
    super();

    Object.assign(this, {
      _id: this.safeString(data?._id),
      _type: this.safeString(data?._type),

      general: {
        list_block_title_general_description: this.safeBlockText(
          data?.general?.list_block_title_general_description
        ),
        list_gallery: this.safeArray(data?.general?.list_gallery, (img: any) =>
          this.safeImage(img)
        ),
        string_line_general_category: this.safeString(
          data?.general?.string_line_general_category
        ),
        string_line_general_title: this.safeString(
          data?.general?.string_line_general_title
        ),
      },
    });
  }
}

///////////////////////////////////////////////////////////////////////

export class HomePageModel extends BaseModel {
  public _id!: string;
  public _type!: string;

  public general!: {
    string_line_general_nombre: string;
    slug: SLUG;
  };
  public amenities!: {
    bool_amenities_show: boolean;
    list_block_title_amenities_amenitiesTitle: Block[];
    list_ref_amenities_amenitiesList: AmenityModel[];
  };
  public gallery!: {
    bool_gallery_show: boolean;
    list_block_title_gallery_galleryTitle: Block[];
    list_images: Image[];
  };
  public divider_1!: {
    bool_divider_1_show: boolean;
    img_divider_1_dividerImage: Image;
  };
  public divider_2!: {
    bool_divider_2_show: boolean;
    img_divider_2_dividerImage: Image;
  };
  public quote!: {
    bool_quote_show: boolean;
    list_block_title_quote_quoteText: Block[];
  };
  public hero!: {
    bool_hero_show: boolean;
    file_video: {
      media: {
        url: string;
      };
    };
    img_hero_banner: Image;
    list_block_title_hero_title: Block[];
    string_h1: string;
    string_line_hero_button: string;
  };
  public intro!: {
    bool_intro_show: boolean;
    img_intro_introImage: Image;
    list_block_title_intro_introTitle: Block[];
  };
  public models!: {
    bool_models_show: boolean;
    list_block_title_models_modelsTitle: Block[];
    list_ref_models_modelsList: ProductoModel[];
  };
  public location!: {
    bool_location_show: boolean;
    icon_location_pin: Image;
    img_location_svg: Image;
    list_block_title_location_locationTitle: Block[];
  };
  public testy!: {
    bool_testy_show: boolean;
    list_block_title_testy_testyTitle: Block[];
    list_ref_testy_testyList: TestimonialModel[];
  };
  public seo!: SEO;

  constructor(data: any) {
    super();

    Object.assign(this, {
      _id: this.safeString(data?._id),
      _type: this.safeString(data?._type),

      general: {
        string_line_general_nombre: this.safeString(
          data?.general?.string_line_general_nombre
        ),
        slug: this.safeSlug(data?.general?.slug),
      },
      amenities: {
        bool_amenities_show: this.safeBool(data?.amenities?.bool_amenities_show, true),
        list_block_title_amenities_amenitiesTitle: this.safeBlockText(
          data?.amenities?.list_block_title_amenities_amenitiesTitle
        ),
        list_ref_amenities_amenitiesList: this.safeReferenceArray(
          data?.amenities?.list_ref_amenities_amenitiesList,
          AmenityModel
        ),
      },
      gallery: {
        bool_gallery_show: this.safeBool(data?.gallery?.bool_gallery_show, true),
        list_block_title_gallery_galleryTitle: this.safeBlockText(
          data?.gallery?.list_block_title_gallery_galleryTitle
        ),
        list_images: this.safeArray(data?.gallery?.list_images, (img: any) =>
          this.safeImage(img)
        ),
      },
      quote: {
        bool_quote_show: this.safeBool(data?.quote?.bool_quote_show, true),
        list_block_title_quote_quoteText: this.safeBlockText(
          data?.quote?.list_block_title_quote_quoteText
        ),
      },
      divider_1: {
        bool_divider_1_show: this.safeBool(data?.divider_1?.bool_divider_1_show, true),
        img_divider_1_dividerImage: this.safeImage(
          data?.divider_1?.img_divider_1_dividerImage
        ),
      },
      divider_2: {
        bool_divider_2_show: this.safeBool(data?.divider_2?.bool_divider_2_show, true),
        img_divider_2_dividerImage: this.safeImage(
          data?.divider_2?.img_divider_2_dividerImage
        ),
      },
      hero: {
        bool_hero_show: this.safeBool(data?.hero?.bool_hero_show, true),
        img_hero_banner: this.safeImage(data?.hero?.img_hero_banner),
        list_block_title_hero_title: this.safeBlockText(
          data?.hero?.list_block_title_hero_title
        ),
        string_h1: this.safeString(data?.hero?.string_h1),
        string_line_hero_button: this.safeString(
          data?.hero?.string_line_hero_button
        ),
        file_video: {
          media: {
            url: this.safeString(data?.hero?.file_video?.media?.url),
          },
        },
      },
      intro: {
        bool_intro_show: this.safeBool(data?.intro?.bool_intro_show, true),
        img_intro_introImage: this.safeImage(data?.intro?.img_intro_introImage),
        list_block_title_intro_introTitle: this.safeBlockText(
          data?.intro?.list_block_title_intro_introTitle
        ),
      },
      location: {
        bool_location_show: this.safeBool(data?.location?.bool_location_show, true),
        icon_location_pin: this.safeIcon(data?.location?.icon_location_pin),
        img_location_svg: this.safeImage(data?.location?.img_location_svg),
        list_block_title_location_locationTitle: this.safeBlockText(
          data?.location?.list_block_title_location_locationTitle
        ),
      },
      models: {
        bool_models_show: this.safeBool(data?.models?.bool_models_show, true),
        list_block_title_models_modelsTitle: this.safeBlockText(
          data?.models?.list_block_title_models_modelsTitle
        ),
        list_ref_models_modelsList: this.safeReferenceArray(
          data?.models?.list_ref_models_modelsList,
          ProductoModel
        ),
      },
      testy: {
        bool_testy_show: this.safeBool(data?.testy?.bool_testy_show, true),
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
