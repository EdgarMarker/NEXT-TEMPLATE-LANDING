import { BaseModel, Block, Image } from "../module.interface";

export class CompanyModel extends BaseModel {
  public _id!: string;
  public _type!: string;

  public contact!: {
    string_line_contact_address: string;
    string_line_contact_email: string;
    string_line_contact_line_contact_wa: string;
    string_line_contact_phone: string;
    string_textarea_contact_hours: string;
  };
  public general!: {
    icon_general_footerLogo: Image;
    icon_general_navLogo: Image;
    string_line_general_brand: string;
    string_line_general_name: string;
    string_line_general_slogan: string;
  };
  public location!: {
    number_location_latitude: number;
    number_location_longitude: number;
    url_location_googleMaps: string;
  };
  public policy!: {
    list_block_post_policy_privacyNotice: Block[];
  };
  public social!: {
    arr_list: {
      icon_social_icon: Image;
      string_line_social_name: string;
      url_social_url: string;
    }[];
  };

  constructor(data: any) {
    super();

    Object.assign(this, {
      _id: this.safeString(data?._id),
      _type: this.safeString(data?._type),

      contact: {
        string_line_contact_address: this.safeString(
          data?.contact?.string_line_contact_address
        ),
        string_line_contact_email: this.safeString(
          data?.contact?.string_line_contact_email
        ),
        string_line_contact_line_contact_wa: this.safeString(
          data?.contact?.string_line_contact_line_contact_wa
        ),
        string_line_contact_phone: this.safeString(
          data?.contact?.string_line_contact_phone
        ),
        string_textarea_contact_hours: this.safeString(
          data?.contact?.string_textarea_contact_hours
        ),
      },
      general: {
        icon_general_footerLogo: this.safeIcon(
          data?.general?.icon_general_footerLogo
        ),
        icon_general_navLogo: this.safeIcon(
          data?.general?.icon_general_navLogo
        ),
        string_line_general_brand: this.safeString(
          data?.general?.string_line_general_brand
        ),
        string_line_general_name: this.safeString(
          data?.general?.string_line_general_name
        ),
        string_line_general_slogan: this.safeString(
          data?.general?.string_line_general_slogan
        ),
      },
      location: {
        number_location_latitude: this.safeNumber(
          data?.location?.number_location_latitude
        ),
        number_location_longitude: this.safeNumber(
          data?.location?.number_location_longitude
        ),
        url_location_googleMaps: this.safeString(
          data?.location?.url_location_googleMaps
        ),
      },
      policy: {
        list_block_post_policy_privacyNotice: this.safeBlockText(
          data?.policy?.list_block_post_policy_privacyNotice
        ),
      },
      social: {
        arr_list: this.safeArray(data?.social?.arr_list, (item: any) => ({
          icon_social_icon: this.safeIcon(item?.icon_social_icon),
          string_line_social_name: this.safeString(
            item?.string_line_social_name
          ),
          url_social_url: this.safeString(item?.url_social_url),
        })),
      },
    });
  }
}
