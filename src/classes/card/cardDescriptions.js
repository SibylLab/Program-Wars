/**
 * Plain-language descriptions of what each card represents in the real world,
 * shown as a hover tooltip to teach players the underlying concept.
 *
 * Keys are lowercase. For component cards the key is the specific component
 * name (e.g. `authorization`); for every other card it is the card type
 * (e.g. `git`, `sql_injection`). Look-ups go through {@link describeCard},
 * which prefers a card's `componentName` and falls back to its `type`.
 *
 * @module cardDescriptions
 */

const descriptions = {
  // --- Model components ---
  caching: 'Caching: stores frequently used data in fast memory so the app responds quicker and takes load off the database.',
  data_validation: 'Data Validation: checks that data is well-formed and safe before the app stores or uses it. Defends against XSS.',
  database: 'Database: the persistent store where the application\'s data lives and is queried.',
  file_storage_adapter: 'File Storage Adapter: a layer that saves and retrieves files (local disk or cloud) behind one common interface. Defends against Malware.',
  orm: 'ORM (Object-Relational Mapping): maps database tables to code objects and builds parameterized queries instead of raw SQL. Defends against SQL Injection.',
  secrets_manager: 'Secrets Manager: securely stores and controls access to passwords, API keys and other secrets. Defends against Ransomware.',

  // --- View components ---
  cli_view: 'CLI View: a command-line interface for interacting with the app through text commands.',
  input_validation: 'Input Validation: verifies user input on the way in, rejecting malformed or malicious entries. Helps defend against DoS.',
  mobile_view: 'Mobile View: the user interface optimized for phones and tablets.',
  web_view: 'Web View: the browser-based user interface.',

  // --- Controller components ---
  middleware: 'Middleware: code that runs between a request and its handler (logging, auth checks, parsing, etc.).',
  routing: 'Routing: maps incoming URLs and requests to the code that should handle them.',
  authentication: 'Authentication: verifies WHO a user is (login and identity). Defends against Unauthorized Access.',
  authorization: 'Authorization: decides WHAT an authenticated user is allowed to do (permissions). Defends against Unauthorized Access.',
  csrf_protection: 'CSRF Protection: anti-forgery tokens that stop malicious sites from acting on a logged-in user\'s behalf. Defends against CSRF.',
  rate_limiting: 'Rate Limiting: caps how many requests a client can make in a time window to prevent abuse and overload. Defends against DoS.',

  // --- Defensive cards ---
  method: 'Inheritance: lets a class reuse and extend another class\'s behavior. In play it starts a new stack.',
  interface: 'Interface: a contract of methods a class must implement, letting components be swapped freely. Doubles a stack\'s points.',
  polymorphism: 'Polymorphism: one interface, many forms. Play it into a Model, View, or Controller lane and choose any component of that lane for it to become.',
  git: 'Git: version control that tracks code history and enables rollback and recovery. Doubles a stack\'s points; defends against Disaster and Ransomware.',
  error_handling: 'Error Handling: gracefully catches and responds to failures instead of crashing. Doubles a stack\'s points.',
  logger: 'Logger: records events and errors for debugging, monitoring and auditing. Doubles a stack\'s points; defends against Bugs.',

  // --- Attack cards ---
  dos: 'Denial of Service (DoS): floods the system with traffic to make it unavailable. Countered by Rate Limiting or Caching.',
  sql_injection: 'SQL Injection: injects malicious SQL through unsanitized input to read or alter the database. Countered by an ORM.',
  xss: 'Cross-Site Scripting (XSS): injects malicious scripts into pages other users view. Countered by Data Validation.',
  csrf: 'Cross-Site Request Forgery (CSRF): tricks a logged-in user\'s browser into sending unwanted requests. Countered by CSRF Protection.',
  ransom: 'Ransomware: encrypts your data and demands payment to release it. Countered by a Secrets Manager or Git backups.',
  malware: 'Malware: malicious software that infiltrates or damages a system. Countered by a File Storage Adapter.',
  unauthorized_access: 'Unauthorized Access: gaining entry to resources without permission. Countered by Authentication and Authorization.',

  // --- Destructive events ---
  bug: 'Bug: a defect in the code that causes incorrect behavior. Mitigated by a Logger.',
  disaster: 'Disaster: a catastrophic failure or data-loss event. Mitigated by Git backups.'
}

/**
 * Returns the plain-language description for a card, or an empty string if the
 * card has no description.
 * @param {Card} card - The card to describe.
 * @return {string} The description text, or '' when none is found.
 */
function describeCard (card) {
  if (!card) {
    return ''
  }
  const key = (card.componentName || card.type || '').toLowerCase()
  return descriptions[key] || ''
}

export { descriptions, describeCard }
export default describeCard
