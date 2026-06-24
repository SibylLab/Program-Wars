## Overview

MVC-ARENA is a two-player game. You can play against another person or against the
computer. The goal is to build a complete and secure **MVC architecture** before
your opponent does.


- After starting, two players are added: **two human players**, or **one human
player and a computer opponent**.
- Each player builds in three lanes: **Model**, **View**, and **Controller**.
- The score limit is **25**. To win, you also need a minimum number of components.



#### Quick Guide

When the game starts, each player has **five cards**. At the end of every turn you
draw one new card. On your turn you can:

- **Play** a card (drag it onto the board; a playable card glows green),
- **Discard** a single card, or
- **Redraw** your whole hand.

**Building your program**

- Drag a **component** card into its lane (Model, View, or Controller), or onto the
**inheritance stack** at the top of the lane to add points.
- An inheritance stack can hold up to **6 cards** and a maximum of **9 points**.
- Each component is worth **1 point**.
- **Defensive** cards (Interface, Git, Error Handling, Logger) **double** the points
of the stack you play them on.
- **Polymorphism** is a wildcard: drop it into a lane and choose which component it
becomes.

**Attacks and hazards**

- **Attack** cards reduce a player's points. If the target has the matching
defending component, the attack is **blocked** (an "encounter" animation plays) and
the defending card is used up instead.
- **Destructive events** (Bug and Disaster) take effect immediately when drawn. If
you have no protecting card, you lose **half of your points** and your next turn is
restricted. A **Logger** protects against Bugs, and **Git** protects against
Disasters.



#### How to win

To win, a player must collect the required components **and** reach the score limit:

| **Requirement** | **Needed** |
| --------------- | ---------- |
| Model components | 4 |
| View components | 2 |
| Controller components | 5 |
| Defensive cards | 2 |
| Score | 25 |
|||

The **requirement tracker** on screen shows your progress. Each group fills as you
collect cards, and your status changes from **Pending** to **Done** when all the
card requirements are met.
