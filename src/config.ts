/**
 * Single source of truth for the brand and site settings.
 * Rename the product here. Everything in src/content.ts, the navbar, footer,
 * page titles and index.html (via the Vite plugin) reads from these constants.
 */
export const BRAND_NAME = "Casper"; // Working name.
export const TAGLINE = "From prompt to post. AI microdramas, produced and published on autopilot.";
export const DESCRIPTION =
  "AI production pipeline for short form vertical microdramas. Write, render and publish to Instagram Reels, TikTok, YouTube Shorts and Snapchat.";

// TODO: Replace with the real contact address.
export const CONTACT_EMAIL = "hello@example.com";

// TODO: Update when a custom domain is connected. Used for canonical and Open Graph URLs.
export const SITE_URL = "https://mgruen15.github.io/project-casper-website/";
