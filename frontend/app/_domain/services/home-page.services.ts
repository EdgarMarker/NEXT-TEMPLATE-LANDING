import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";

export const TESTIMONIAL_FIELDS = `
  _id,
  _type,
  grade,
  string_line_testimonial_authorLocation,
  string_line_testimonial_authorName,
  string_textarea_testimonial_content
`;

export const getTestimonialData = async () => {
  const QUERY = `
    *[_type == "testimonial"][0] {
      ${TESTIMONIAL_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};

//////////////////////////////////////////////////////////////////////

export const AMENITY_FIELDS = `
  _id,
  _type,
  iconName,
  iconSet,
  name,
  customIcon {
    "media": asset -> { url },
    "alt": asset -> { altText }
  }
`;

export const getAmenityData = async () => {
  const QUERY = `
    *[_type == "amenity"][0] {
      ${AMENITY_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};

//////////////////////////////////////////////////////////////////////

export const PRODUCTO_FIELDS = `
  _id,
  _type,
  general {
    list_block_title_general_description,
    list_gallery[]{
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    string_line_general_category,
    string_line_general_title
  }
`;

export const getProductoData = async () => {
  const QUERY = `
    *[_type == "producto"][0] {
      ${PRODUCTO_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};

//////////////////////////////////////////////////////////////////////

export const HOMEPAGE_FIELDS = `
  _id,
  _type,
  general {
    string_line_general_nombre,
    slug
  },
  amenities {
    bool_amenities_show,
    list_block_title_amenities_amenitiesTitle,
    list_ref_amenities_amenitiesList[] -> {
      ${AMENITY_FIELDS}
    }
  },
  gallery {
    bool_gallery_show,
    list_block_title_gallery_galleryTitle,
    list_images[]{
      "media": asset -> { url },
      "alt": asset -> { altText }
    }
  },
  hero {
    bool_hero_show,
    file_video{
      "media": asset -> { url }
    },
    img_hero_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_hero_title,
    string_h1,
    string_line_hero_button
  },
  quote {
    bool_quote_show,
    list_block_title_quote_quoteText
  },
  intro {
    bool_intro_show,
    img_intro_introImage {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_intro_introTitle
  },
  divider_1 {
    bool_divider_1_show,
    img_divider_1_dividerImage {
      "media": asset -> { url },
      "alt": asset -> { altText }
    }
  },
  divider_2 {
    bool_divider_2_show,
    img_divider_2_dividerImage {
      "media": asset -> { url },
      "alt": asset -> { altText }
    }
  },
  location {
    bool_location_show,
    icon_location_pin {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    img_location_svg {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_location_locationTitle
  },
  models {
    bool_models_show,
    list_block_title_models_modelsTitle,
    list_ref_models_modelsList[] -> {
      ${PRODUCTO_FIELDS}
    }
  },
  testy {
    bool_testy_show,
    list_block_title_testy_testyTitle,
    list_ref_testy_testyList[] -> {
      ${TESTIMONIAL_FIELDS}
    }
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  },
`;

export const getHomePageDataBySlug = async (slug: string) => {
  const QUERY = `
    *[_type == "homePage" && general.slug.current == $slug][0] {
      ${HOMEPAGE_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY, { slug });
  return data;
};

export const getFirstHomePageSlug = async (): Promise<string | null> => {
  const QUERY = `
    *[_type == "homePage" && defined(general.slug.current)] | order(_createdAt asc) [0] {
      "slug": general.slug.current
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data?.slug ?? null;
};

export const getAllHomePageSlugs = async (): Promise<string[]> => {
  const QUERY = `
    *[_type == "homePage" && defined(general.slug.current)] | order(_createdAt asc) {
      "slug": general.slug.current
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return (data ?? []).map((item: { slug: string }) => item.slug);
};
