import { ImageResponse } from "next/og";

import { OgTemplate, ogSize } from "@/features/seo/og-template";
import { siteConfig } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;

export default function Image() {
  return new ImageResponse(
    <OgTemplate eyebrow={siteConfig.tagline} title="See inside every AI request you ship" />,
    size,
  );
}
