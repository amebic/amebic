/**
 * @fileoverview Example compositions - import to trigger registration.
 * @module @amebic/templates/compositions
 */

import { registerSet } from "@amebic/core";
import "./SocialCard.js";
import "./AppIcon.js";

/** Product branding set: social card + app icon */
registerSet("ProductBranding", ["SocialCard", "AppIcon"]);
