/**
 * Level metadata for the game modes.
 *
 * Deck *composition* is no longer defined here - it is driven by the weighted
 * distribution config in `public/cardDistribution.json` (see
 * {@link module:distributionConfig} and {@link module:distributionBuilder}).
 * This module now only describes the selectable levels.
 *
 * Each level looks like:
 * ```
 * {
 *   id          // identifier for the level
 *   name        // display name for the level
 *   description // short summary of the cards in the level
 * }
 * ```
 *
 * @module deckData
 */

// List of beginner level descriptions.
const beginnerLevels = [
  {
    id: 'malware1',
    name: 'Malware 1',
    description: 'MVC Components, Method, Ransom, and Defensive Multipliers'
  }
]

export default {
  beginner: {
    levels: beginnerLevels
  }
}
