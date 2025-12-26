import { BaseModel } from "../module.interface";

export class MarketingModel extends BaseModel {
  public _id!: string;
  public _type!: string;

  public google!: {
    gtmId: string;
    apiMapsKey?: string;
  };
  public meta!: {
    enableCapi: boolean;
    pixelId: string;
    testEventCode: string;
  };

  constructor(data: any) {
    super();

    Object.assign(this, {
      _id: this.safeString(data?._id),
      _type: this.safeString(data?._type),

      google: {
        gtmId: this.safeString(data?.google?.string_line_google_gtmId),
        apiMapsKey: this.safeString(
          data?.google?.string_line_google_apiMapsKey
        ),
      },
      meta: {
        enableCapi: this.safeString(data?.meta?.bool_meta_enableCapi),
        pixelId: this.safeString(data?.meta?.string_line_meta_pixelId),
        testEventCode: this.safeString(
          data?.meta?.string_line_meta_testEventCode
        ),
      },
    });
  }
}
