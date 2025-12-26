import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";

export const MARKETING_FIELDS = `
  _id,
  _type,
  google {
    string_line_google_gtmId,
    string_line_google_apiMapsKey
  },
  meta {
    bool_meta_enableCapi,
    string_line_meta_pixelId,
    string_line_meta_testEventCode
  }
`;

export const getMarketingData = async () => {
  const QUERY = `
    *[_type == "marketing"][0] {
      ${MARKETING_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};
