// app/api/sharekit-image/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const sourceUrl = request.nextUrl.searchParams.get("url");

  if (!sourceUrl) {
    return new Response("Missing url", { status: 400 });
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(sourceUrl);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  if (parsedUrl.hostname !== "a.storyblok.com") {
    return new Response("Invalid image host", { status: 400 });
  }

  try {
    const imageResponse = await fetch(parsedUrl.toString(), {
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0",
      },
      cache: "force-cache",
    });

    if (!imageResponse.ok) {
      const text = await imageResponse.text();

      return new Response(
        `Image could not be loaded: ${imageResponse.status}\n${text}`,
        { status: imageResponse.status },
      );
    }

    const contentType =
      imageResponse.headers.get("content-type") ?? "image/jpeg";

    if (!contentType.startsWith("image/")) {
      return new Response(`Invalid content type: ${contentType}`, {
        status: 415,
      });
    }

    const body = await imageResponse.arrayBuffer();

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Proxy failed", { status: 500 });
  }
}