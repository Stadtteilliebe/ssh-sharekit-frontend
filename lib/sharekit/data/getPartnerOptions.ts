import type { SharekitOption } from "../types";
import {
  partnerLabelAssets,
  type PartnerSponsorType,
} from "./../assets/partnerAssets";

type StoryblokCompanyStory = {
  uuid: string;
  slug: string;
  full_slug: string;
  name: string;
  content: {
    name?: string;
    logo?: {
      filename?: string;
    };
    isSponsor?: string;
  };
};

function toCanvasSafeImageUrl(src?: string) {
  if (!src) return undefined;

  if (src.startsWith("https://a.storyblok.com/")) {
    return `/api/sharekit-image?url=${encodeURIComponent(src)}`;
  }

  return src;
}

function normalizeSponsor(value?: string): PartnerSponsorType | null {
  const normalized = value?.toLowerCase().trim();

  if (
    normalized === "coffee" ||
    normalized === "gold" ||
    normalized === "silver" ||
    normalized === "bronze"
  ) {
    return normalized;
  }

  return null;
}

export async function getPartnerOptions(): Promise<SharekitOption[]> {
  const token = process.env.STORYBLOK_TOKEN;

  if (!token) {
    throw new Error("Missing STORYBLOK_TOKEN");
  }

  const params = new URLSearchParams({
    token,
    version: "published",
    "filter_query[isSponsor][in]": "gold,silver,bronze,coffee",
  });

  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?${params.toString()}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Storyblok partners could not be loaded");
  }

  const data = await res.json();

return data.stories
  .map((story: StoryblokCompanyStory): SharekitOption | null => {
    const sponsorType = normalizeSponsor(story.content.isSponsor);

    if (!sponsorType) return null;

    return {
      id: story.uuid,
      name: story.content.name ?? story.name ?? story.slug,
      imageUrl: toCanvasSafeImageUrl(story.content.logo?.filename),
      label: sponsorType,
      labelAssetSrc: partnerLabelAssets[sponsorType],
    };
  })
  .filter((item: SharekitOption | null): item is SharekitOption => item !== null)};