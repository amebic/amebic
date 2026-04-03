/**
 * @fileoverview Experimental Amebic compositions.
 * @module @amebic/examples
 */

import { registerSet } from "@amebic/core";
import "./compositions/TransparentWatermark.js";
import "./compositions/TransparentOverlay.js";
import "./compositions/GlassBadge.js";

/** Transparency examples set */
registerSet("TransparencyExamples", ["TransparentWatermark", "TransparentOverlay", "GlassBadge"]);
