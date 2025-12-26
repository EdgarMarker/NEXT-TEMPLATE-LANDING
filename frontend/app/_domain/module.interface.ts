/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Image {
  _type: "image";
  media: {
    url: string;
  };
  alt: {
    altText: string;
  };
}

export type IconPackage = "lucide" | "custom";

export interface Block {
  _type: "block" | "image";
  children?: Array<{
    _type: "span";
    text: string;
    marks?: string[];
  }>;
  style?: string;
  media?: {
    url: string;
  };
  alt?: {
    altText: string;
  };
}

export interface SEO {
  string_titleSeo: string;
  text_descSeo: string;
  text_keySeo: string;
}

export interface SLUG {
  _type: "slug";
  current: string;
}

export class BaseModel {
  DEFAULT_STRING: string;
  DEFAULT_IMAGE: Image;
  DEFAULT_NUMBER: number;
  DEFAULT_ICON: Image;
  DEFAULT_SEO: SEO;
  DEFAULT_SLUG: SLUG;

  constructor() {
    this.DEFAULT_STRING = "";
    this.DEFAULT_NUMBER = 0;
    this.DEFAULT_IMAGE = {
      _type: "image",
      media: { url: "https://picsum.photos/id/1/1440/900" },
      alt: { altText: "Image Example" },
    };
    this.DEFAULT_ICON = {
      _type: "image",
      media: { url: "https://picsum.photos/id/1/1440/900" },
      alt: { altText: "Icon Example" },
    };
    this.DEFAULT_SEO = {
      string_titleSeo: "",
      text_descSeo: "",
      text_keySeo: "",
    };
    this.DEFAULT_SLUG = {
      _type: "slug",
      current: "",
    };
  }

  serialize<T>(this: T): T {
    return JSON.parse(JSON.stringify(this));
  }

  safeString(value: unknown): string {
    if (typeof value === "string" && value.trim()) {
      return value;
    }
    return this.DEFAULT_STRING;
  }

  safeImage(value: Image): Image {
    return {
      ...value,
      media: {
        url: value?.media?.url || this.DEFAULT_IMAGE.media.url,
      },
      alt: {
        altText: value?.alt?.altText || this.DEFAULT_IMAGE.alt.altText,
      },
    };
  }

  safeIcon(value: Image): Image {
    return {
      ...value,
      media: {
        url: value?.media?.url || this.DEFAULT_ICON.media.url,
      },
      alt: {
        altText: value?.alt?.altText || this.DEFAULT_ICON.alt.altText,
      },
    };
  }

  safeBlockText(blocks: any): Block[] {
    if (!Array.isArray(blocks)) {
      return [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: this.DEFAULT_STRING,
              marks: [],
            },
          ],
          style: "normal",
        },
      ];
    }

    return blocks.map((block: any) => {
      if (block._type === "image") {
        return {
          _type: "image",
          media: {
            url: block.media?.url || this.DEFAULT_IMAGE,
          },
          alt: {
            altText: block.alt?.altText || this.DEFAULT_IMAGE,
          },
        };
      }

      return {
        _type: "block",
        children:
          Array.isArray(block.children) && block.children.length > 0
            ? block.children.map((child: any) => ({
                _type: "span",
                text: child.text || this.DEFAULT_STRING,
                marks: child.marks || [],
              }))
            : [
                {
                  _type: "span",
                  text: this.DEFAULT_STRING,
                  marks: [],
                },
              ],
        style: block.style || "normal",
      };
    });
  }

  safeArray<T>(value: unknown, itemHandler: (item: any) => T): T[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.map((item) => itemHandler(item));
  }

  safeNumber(value: unknown): number {
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "string" && !Number.isNaN(Number(value))) {
      return Number(value);
    }
    return this.DEFAULT_NUMBER;
  }

  safeSEO(value: unknown): SEO {
    if (typeof value === "object" && value !== null) {
      const seoValue = value as Partial<SEO>;
      return {
        string_titleSeo: this.safeString(seoValue.string_titleSeo),
        text_descSeo: this.safeString(seoValue.text_descSeo),
        text_keySeo: this.safeString(seoValue.text_keySeo),
      };
    }
    return this.DEFAULT_SEO;
  }

  safeSlug(value: unknown): SLUG {
    if (typeof value === "object" && value !== null) {
      const slugValue = value as Partial<SLUG>;
      return {
        _type: "slug",
        current: this.safeString(slugValue.current),
      };
    }
    return this.DEFAULT_SLUG;
  }

  safeReference<T>(value: unknown, ModelClass: new (data: any) => T): T | null {
    if (typeof value === "object" && value !== null) {
      return new ModelClass(value);
    }
    return null;
  }

  safeReferenceArray<T>(value: unknown, ModelClass: new (data: any) => T): T[] {
    return this.safeArray(value, (item) => new ModelClass(item));
  }

  safeBool(value: unknown): boolean {
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      return value.toLowerCase() === "true";
    }
    return false;
  }

  safeAny(value: unknown): any {
    return value || null;
  }

  safeDate(
    value: unknown,
    options?: Intl.DateTimeFormatOptions,
    locale = "es-MX"
  ): string {
    const dateString = this.safeString(value);
    if (!dateString) return this.DEFAULT_STRING;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return this.DEFAULT_STRING;
    return date.toLocaleDateString(
      locale,
      options || { year: "numeric", month: "long", day: "numeric" }
    );
  }
}
