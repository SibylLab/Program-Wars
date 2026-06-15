/**
 * Catalog of the concrete card variants that exist for each card type.
 *
 * The distribution config (see {@link module:distributionConfig}) only decides
 * *how many* of each type to put in the deck. This catalog decides *which
 * variants* those copies are spread across. For component cards the variant is
 * the component name (passed to the CardFactory as the card value); for every
 * other type it is the card's numeric value.
 *
 * Each type listed here must be creatable by the {@link CardFactory}.
 *
 * @module cardCatalog
 */

const cardCatalog = {
  // Component cards - variant is the component name
  MODEL: ['caching', 'data_validation', 'database', 'file_storage_adapter', 'orm', 'secrets_manager'],
  VIEW: ['cli_view', 'input_validation', 'mobile_view', 'web_view'],
  CONTROLLER: ['Middleware', 'Routing', 'authentication', 'authorization', 'csrf_protection', 'rate_limiting'],

  // Inheritance / stack-starter card
  METHOD: [0],

  // Defensive multiplier cards (value 2)
  INTERFACE: [2],
  POLYMORPHISM: [2],
  GIT: [2],
  ERROR_HANDLING: [2],
  LOGGER: [2],

  // Attacking cards
  CSRF: [0],
  DOS: [0],
  MALWARE: [0],
  SQL_INJECTION: [0],
  UNAUTHORIZED_ACCESS: [0],
  XSS: [0],

  // Destructive / hazard cards
  RANSOM: [0],
  BUG: [0],
  DISASTER: [0]
}

export default cardCatalog
