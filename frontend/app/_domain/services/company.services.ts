import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";

export const COMPANY_FIELDS = `
  _id,
  _type,
  contact {
    string_line_contact_address,
    string_line_contact_email,
    string_line_contact_line_contact_wa,
    string_line_contact_phone,
    string_textarea_contact_hours
  },
  general {
    icon_general_footerLogo {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    icon_general_navLogo {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    string_line_general_brand,
    string_line_general_name,
    string_line_general_slogan
  },
  location {
    number_location_latitude,
    number_location_longitude,
    url_location_googleMaps
  },
  policy {
    list_block_post_policy_privacyNotice[]{
      ...,
      _type == "image" => {
        "media": asset -> { url },
        "alt": asset -> { altText }
      }
    }
  },
  social {
    arr_list[] {
      icon_social_icon {
        "media": asset -> { url },
        "alt": asset -> { altText }
      },
      string_line_social_name,
      url_social_url
    }
  }
`;

export const getCompanyData = async () => {
  const QUERY = `
    *[_type == "company"][0] {
      ${COMPANY_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};
