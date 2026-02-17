/**
 * @fileoverview Amebic branding assets - logo and banner.
 * @module @amebic/branding
 */

import { registerSet } from "@amebic/core";
import "./compositions/Logo.js";
import "./compositions/Banner.js";

registerSet("AmebicBranding", ["Logo", "Banner"]);
