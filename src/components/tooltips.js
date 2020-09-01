/**
 * Stores tooltip text for different components.
 *
 * @module tooltips
 */

/**
 * Tooltip text for each type of status effect that has a card type.
 *
 * Maps card type in all Caps to the text for the tooltip.
 *
 * @example
 * effects['SCAN']  // will return "Prevents the next CyberAttack"
 */
const effects = {
  SCAN: "Prevents the next cyber attack",
  ANTIVIRUS: "Prevents all cyber attacks",
  FIREWALL: "Prevents Trojan and Ransom attacks",
  SPYWARE: "Another player can see your hand",
  RANSOM: "Another player is stealing 10 points from you",
  SQL_INJECTION: "Reduces your method score by 2",
  STACK_OVERFLOW: "Cannot play cards on your play field",
  STACK_UNDERFLOW: "Cannot play attack or algorithm cards",
  DDOS: "You don't draw a card at the end of your turn"
}

export default {
  effects
}
