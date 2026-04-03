/**
 * @fileoverview Example compositions - import to trigger registration.
 * @module @amebic/templates/compositions
 */

import { registerSet } from "@amebic/core";
import "./SocialCard.js";
import "./AppIcon.js";
import "./GradientHero.js";
import "./Badge.js";
import "./PodcastCover.js";
import "./NeonCard.js";
import "./BlobLogo.js";

/** Product branding set: social card + app icon */
registerSet("ProductBranding", ["SocialCard", "AppIcon"]);

/** Creative set: hero, badge, podcast, neon */
registerSet("Creative", ["GradientHero", "Badge", "PodcastCover", "NeonCard"]);

/** Branding set: blob logo for brand assets */
registerSet("Branding", ["BlobLogo"]);
