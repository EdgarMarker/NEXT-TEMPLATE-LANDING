import type { Metadata } from "next";
import type { SEO } from "@/app/_domain/module.interface";

type ModelConstructor<T> = new (data: unknown) => T;

type FetchFunction<TData = unknown, TParams = void> = TParams extends void
  ? () => Promise<TData>
  : (params: TParams) => Promise<TData>;

export const createMetadata = (seo: SEO): Metadata => ({
  title: seo.string_titleSeo,
  description: seo.text_descSeo,
  keywords: seo.text_keySeo,
});

export const generateMetadataFromContract = async <
  T extends { seo: SEO },
  TParams = void,
>(
  fetchFunction: FetchFunction<unknown, TParams>,
  ModelClass: ModelConstructor<T>,
  ...[params]: TParams extends void ? [] : [TParams]
): Promise<Metadata> => {
  try {
    const rawData =
      params !== undefined
        ? await (fetchFunction as (p: TParams) => Promise<unknown>)(params)
        : await (fetchFunction as () => Promise<unknown>)();
    const data = new ModelClass(rawData);
    return createMetadata(data.seo);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
};
