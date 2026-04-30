import { SharekitOption } from "../types";

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
    isExhibitor?: boolean;
    is_exhibitor?: boolean;
  };
};

export async function getExhibitorOptions(): Promise<SharekitOption[]> {
  const token = process.env.STORYBLOK_TOKEN;

  function toCanvasSafeImageUrl(src?: string) {
    if (!src) return undefined;

    if (src.startsWith("https://a.storyblok.com/")) {
      return `/api/sharekit-image?url=${encodeURIComponent(src)}`;
    }

    return src;
  }

  if (!token) {
    throw new Error("Missing STORYBLOK_TOKEN");
  }

  const params = new URLSearchParams({
    token,
    version: "published",
    "filter_query[isExhibitor][in]": "true",
  });

  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?${params.toString()}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Storyblok companies could not be loaded");
  }

  const data = await res.json();

  return data.stories.map((story: StoryblokCompanyStory) => ({
    id: story.uuid,
    name: story.content.name ?? story.name ?? story.slug,
    imageUrl: toCanvasSafeImageUrl(story.content.logo?.filename),
  }));
}
