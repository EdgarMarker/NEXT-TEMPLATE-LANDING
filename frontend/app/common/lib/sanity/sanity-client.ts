import { createClient } from "next-sanity";

export const getSanityClient = () => {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2023-10-17",
    useCdn: true,
  });
};
