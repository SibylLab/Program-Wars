# Card Types

There are five groups of cards in MVC-ARENA: **Components**, the **Inheritance**
card, **Defensive** cards, **Attack** cards, and **Destructive events**.



## Component cards

Components are the building blocks of your program. Each is worth **1 point** and
belongs to one lane: Model, View, or Controller. Play a component into its lane to
start a stack, or onto the lane's **inheritance stack** to add points.

| **Lane** | **Components** |
| -------- | -------------- |
| **Model** | Caching, Data Validation, Database, File Storage Adapter, ORM, Secrets Manager |
| **View** | Web View, Mobile View, CLI View, Input Validation |
| **Controller** | Authentication, Authorization, Routing, Middleware, Rate Limiting, CSRF Protection |
|||

Some components also **defend** against specific attacks (see the Attacks section).
For example, an ORM defends against SQL Injection.

**Relation to software:** In the MVC pattern, the **Model** holds the data and
business logic, the **View** shows the interface to the user, and the
**Controller** handles requests and connects the two.



## Inheritance card

![Inheritance card](static/cardImages/method.png)


The Inheritance card starts a stack in a lane. Component cards placed on an
inheritance stack add up to a maximum of **9 points** (up to **6 cards**).

**Relation to software:** Inheritance lets one class reuse and extend the behaviour
of another class, a core idea in object-oriented programming.



## Defensive cards (multipliers)

Defensive cards **double** the points of the stack you play them on:
**Interface**, **Error Handling**, **Git**, and **Logger**.

Some also protect you from events: **Git** protects against Disaster (and helps
against Ransomware) and **Logger** protects against Bugs.

**Relation to software:** These are good engineering practices. For example, an
*Interface* lets components be swapped freely, and a *Logger* records what happens
so problems can be found and fixed.



## Polymorphism (wildcard component)

When you drop a Polymorphism card into a lane, a picker opens and you choose **any
component of that lane** for it to become. It then counts as that component.

**Relation to software:** Polymorphism means one interface can take many forms, so
the same code can work with different types.



## Attack cards

Attack cards reduce a target player's points. If the target holds the matching
**defending component**, the attack is **blocked** (an encounter animation plays)
and the defending card is used up instead of the player losing points.

| **Attack** | **Defended by** |
| ---------- | --------------- |
| DoS | Rate Limiting, Caching, Input Validation |
| SQL Injection | ORM |
| XSS | Data Validation |
| CSRF | CSRF Protection |
| Malware | File Storage Adapter |
| Unauthorized Access | Authentication, Authorization |
| Ransomware | Secrets Manager, Git |
|||

**Relation to security:** These are common web-application attacks, and each is
stopped by the matching defensive practice, just like in real systems. You can read
more at <a href="https://owasp.org/" target="_blank">OWASP</a>.



## Destructive events

![Bug](static/cardImages/destructive/bug.png)
![Disaster](static/cardImages/destructive/disaster.png)


Destructive events take effect **immediately** when drawn; they are not placed on
the board. If you have no protecting card, you lose **half of your points** and your
next turn is restricted.

| **Event** | **Effect** | **Protected by** |
| --------- | ---------- | ---------------- |
| Bug | Lose half your score and your next turn is restricted | Logger |
| Disaster | Lose half your score and your next turn is restricted | Git |
|||

**Relation to software:** A **Bug** is a defect in the code (a Logger helps you find
and fix it), and a **Disaster** is a catastrophic failure or data loss (Git backups
let you recover).
