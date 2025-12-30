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

export const HOMEPAGE_FIELDS = `
  _id,
  _type,
  amenities {
    list_block_title_amenities_amenitiesTitle,
    list_ref_amenities_amenitiesList[] -> {
      ${AMENITY_FIELDS}
    }
  },
  gallery {
    list_block_title_gallery_galleryTitle,
    list_images[]{
      "media": asset -> { url },
      "alt": asset -> { altText }
    }
  },
  hero {
    img_hero_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_hero_title,
    string_h1,
    string_line_hero_button
  },
  intro {
    img_intro_introImage {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_intro_introTitle
  },
  location {
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
  testy {
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

export const getHomePageData = async () => {
  const QUERY = `
    *[_type == "homePage"][0] {
      ${HOMEPAGE_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};
