# Card Types

<img src="static/cardImages/sideNav/All.png" style="width: 20rem">
<img src="static/cardImages/sideNav/All2.png" style="width: 20rem">
<img src="static/cardImages/sideNav/den.png" style="width: 30rem">
<br>

There are five types of cards in this game:

1. **program building cards** 
2. **Malware cards** 
3. **Cyber security**
4. **Alogrithm/Library crads**
5. **Hack Cards**

| **CARD** | **TYPES** |
| ------| -------- |
| **program building cards** |  Instruction cards, Repeat cards , Repeat Rx , Variable cards , Method card |
| ||

-  Instruction cards:
  <br>
  <img src="static/cardImages/sideNav/instruction.gif" style="width: 10rem">
  <br>

1.	Instruction cards are the basic way by which you build your program. They contain value of 1, 2 or 3.
2.	You place maximum 6 instruction cards in the method stack until the value reaches to maximum limit of 9.
3.	You place an instruction card in the playfield to begin a stack.
4.	The value of the instruction card in the method stack is added to the total number of scores of the method card and the value of instruction card in the playfield is added to the total number of instructions for that playing field.

**Relation to computer programming:** A computer program is a collection of instructions that tell the computer what to do.
<br>

- Repeat cards:
  <br>
  <img src="static/cardImages/sideNav/repeat.gif" style="width: 10rem">
  <br>


1.	Repetition cards allow you to repeat an instruction or a method card. They contain value of 2, 3, 4 or Rx.
2.	You add a repetition card on top of an instruction card or a method card.
3.	The value of the instruction or method card is then multiplied by the value of the repetition card.
4.	You can use 2 repetition card in one stack that will complete the stack. 
5.	You can’t replace a repetition card with another repetition card unless it is a variable card. 

**Relation to computer programming:** Repetition cards represent special computer instructions called loops. Like a repetition card, a loop repeats one or more instructions. Two repetition cards on instruction or method card resembles to nested loop in programming.
To understand the different types of loops in a computer program you can go <a href="https://www.tutorialspoint.com/computer_programming/computer_programming_loops.htm" target="_blank">here</a>.
<br>

- Variable cards:
  <br>
  <img src="static/cardImages/sideNav/variable.gif" style="width: 10rem">
  <br>

1.	Variable cards are played on top of a Variable Repetition card Rx.
2.	A variable card lets you change the number of times an instruction or method card is repeated.
3.	You can replace one variable card with another variable card.
4.	A Variable Repetition card (Rx) card has no effect without a Variable.

**Relation to computer programming:** A variable in a computer program is a piece of computer memory that holds a value. Variables are given names so the computer program can either get the value or change the value at the memory location. You can think of a variable as a small box with a label on it, and the computer program can change what is in the box at anytime.
To find out more about variables you can go to <a href="https://www.tutorialspoint.com/computer_programming/computer_programming_variables.htm" target="_blank">here</a>.
<br>

- Method card:
  <br>
  <img src="static/cardImages/sideNav/method.gif" style="width: 10rem">
  <br>

1.	You add method card in the playfield, it reflects the scores that are present in the method stack.
2.	When an instruction card is added in the method stack, the score of the method card updates according to the   value of instruction card.
3.	The combined total of the method card must be the same as the value of the method stack.
4.	You place the method card in the playfield to begin the stack.
   Relation to computer programming: Computer programs are commonly broken up into functions, methods or procedures. All of these names mean the same thing - a group of instructions. This also introduces the software engineering principle of refactoring. Refactoring is restructuring code without changing what it does. Grouping refactors our code into small chunks that can be reused making it easier to change or maintain. Although our code will still do the same thing, refactoring makes it easier to change later on.
To find out more about these groups of instructions, you can go <a href="https://www.tutorialspoint.com/python/python_functions.htm" target="_blank">here</a>.
<br>



| **CARD** | **TYPES** |
| ------| -------- |
| **Malware card** |  Virus, Ransomware , Spyware , Trojan |
| ||
<br>

- Virus:
  <br>
  <img src="static/cardImages/virus.png" style="width: 10rem">
  <br>

1.	You play virus on opponent stacks like hacking. 
2.	If played on a stack starts with instruction card, it reduces a stack score to 0 and prevents any more cards from being played until it is effected by Virus, If the stack starts with a method card the reduction is by 50% instead.

**Relation to cyberattack:** Computer virus is typically a computer program that replicates itself by modifying other programs.
To find out more about Virus you can go to <a href="https://searchsecurity.techtarget.com/definition/virus" target="_blank">here</a>.
<br>

- Ransomware:
  <br>
  <img src="static/cardImages/ransom.png" style="width: 10rem">
  <br>

1.	Played on an opponent to get 10 points from their scores.
2.	Opponent player can recover their scores by playing Scan or Antivirus card.

**Relation to cyberattack:** Ransomware is a malware which threatens to publish the affected individual data unless a specific payment or penalty is paid. It also involves the user’s files being encrypted and a key only provided when the “ransom” is paid. 
To find out more about Ransomware you can go to <a href="https://spinbackup.com/blog/10-ransomware-examples-to-stay-away-from/" target="_blank">here</a>.
<br>
	
- Spyware:
  <br>
  <img src="static/cardImages/spyware.png" style="width: 10rem">
  <br>

1.	Played on an opponent to spy on the cards in their hand.
2.	A “spy” button will appear beside the opponent’s name for the next 3 turns.
3.	 It will allow you to view their hand. 
4.	Opponent can remove the effect by playing Scan or Antivirus card.

**Relation to cyberattack:** Spyware is a malware used to gather information and send that information to another party without the host’s consent
To find out more about Spyware you can go to <a href="https://www.managedsolution.com/4-common-types-of-spyware-and-how-to-detect-them/" target="_blank">here</a>.
<br>

- Trojan:
  <br>
  <img src="static/cardImages/trojan.png" style="width: 10rem">
  <br>

1.	When played on opponent it replace random card from opponent’s hand with one that mimics it.
2.	The effect of Trojan card is depend on which card is being replaced.
3.	Safety, method, and instruction will give the effect as if Ransomware is played, attack cards will mimic spyware. Repeat and variable cards will become virus cards.

**Relation to cyberattack:** Trojan is a malware that misleads users as to its true intent.
 To find out more about Trojan you can go to <a href="https://enterprise.comodo.com/what-is-the-trojan-horse-virus.php" target="_blank">here</a>.
 <br>

| **CARD** | **TYPES** |
| ------| -------- |
| **Cyber security** |  Antivirus, Firewall , Scan |
| ||
<br>

- Antivirus:
  <br>
  <img src="static/cardImages/sideNav/AV.gif" style="width: 10rem">
  <br>

1.	It protects from all malware effects.
2.	If player is already infected by malware, Antivirus will remove all the negative effects.

**Relation to protect from cyberattack:** Antivirus in general, protect you from viruses, making sure that your programs will run quickly. 
To find out more about Antivirus you can go to <a href="https://en.wikipedia.org/wiki/Antivirus_software" target="_blank">here</a>.
<br>

- Firewall:
  <br>
  <img src="static/cardImages/sideNav/FW1.gif" style="width: 10rem">
  <br>
  
1.	It protects from being hacked.
2.	If player is already infected by hack cards, Firewall will remove all the negative effects.
3.	It will recover the deducted scores.

**Relation to protect from cyberattack:**Firewalls monitor and restrict what is coming into your local network. This will help protect from hacking attacks.
To find out more about Firewall you can go to <a href="https://www.forcepoint.com/cyber-edu/firewall" target="_blank">here</a>..
<br>

- Scan:
  <br>
  <img src="static/cardImages/sideNav/scan.gif" style="width: 10rem">
  <br>
  
1.	If the player has no malware this adds the scan effect to the player and blocks the next malware played on the player. 
2.	If the player has malware the scan removes malware effect. 
3.	If the player has more than one malware or hacked effects, scan will remove any one of the effects at a time chosen by the player.
**Relation to protect from cyberattack:** Like many computer antivirus, the game has this card to scan the user stack and find out any infected cards (i.e. different malwares).
To find out more about Scan you can go to <a href="https://antivirus.comodo.com/blog/comodo-news/what-is-virus-scanner/" target="_blank">here</a>.
<br>

| **CARD** | **TYPES** |
| ------| -------- |
| **Hack card** |  Denial of Service attack (DoS), Cross-site scripting, Buffer overflow, SQL Injection|
| ||

- Buffer Overflow:
  <br>
  <img src="static/cardImages/sideNav/bufferOverflow.png" style="width: 10rem">
  <br>
  
1.	Buffer overflow blocks the affected player from playing any Instruction, Repeat, Variable, and Method cards for two turns.
2.	If player cannot play any card, there is a “pass” button besides redraw that can pass the turn to other player.

**Relation to computer programming:** if a program tries to utilize more space than is available on the call stack overflow then system protect itself by allowing no more code to be run. So in the gameplay, the stack overflow card prevents the affected player from playing cards to consume some space.
To find out more about Buffer overflow you can go to <a href="https://www.imperva.com/learn/application-security/buffer-overflow/" target="_blank">here</a>.
<br>

- Cross-site scripting:
  <br>
  <img src="static/cardImages/sideNav/css.png" style="width: 10rem">
  <br>

1.	If a player has been attacked with cross-site script cards it stops the player from playing all algorithms and attack cards. 
2.	Player can only play a firewall and scan card.
3.	If player cannot play any card from their hand, there is a “pass” button besides redraw that can pass the turn to other player.

**Relation to computer programming:** Cross-site Scripting is a code injection attack. The attack happens when the victim visits a web page or web application that administers the harmful code.
To find out more about Cross-site scripting you can go to <a href="https://www.acunetix.com/websitesecurity/cross-site-scripting/" target="_blank">here</a>.
<br>

- DoS Attack:
  <br>
  <img src="static/cardImages/sideNav/dos.png" style="width: 10rem">
  <br>

1.	A denial of service (DoS) attack card blocks a player from redrawing new cards at the end of their turn.
2.	With each turn the number of cards in affected player’s hand reduces.
3.	Player cannot redraw the card.
4.	Player can only pass the turn or play remaining cards in the hand.
5.	This effect last for three turns.
**Relation to computer programming:** Distributed Denial of Service (DDoS) attacks happen where various machines are used to target one system to slow down or completely crash that system. 
To find out more about DDoS you can go to <a href="https://us.norton.com/internetsecurity-emerging-threats-what-is-a-ddos-attack-30sectech-by-norton.html" target="_blank">here</a>.
<br>

- SQL Injection:
  <br>
  <img src="static/cardImages/sql_injection.png" style="width: 10rem">
  <br>

1.	It reduces the method stack by 2 points.
2.	Deduction from method stack effects all the method cards being played in the playfield.
3.	Safety cards remove the effect of SQL injection.

**Relation to computer programming:** SQL injection uses a harmful SQL code for the backend database to obtain information that was not intended to be disclosed. By losing points from the core method section, relate the gameplay to the real world.
To find out more about SQL injection you can go to <a href="https://www.acunetix.com/websitesecurity/sql-injection/" target="_blank">here</a>.
<br>

| **CARD** | **TYPES** |
| ------| -------- |
| **Alogrithm/Library crads** |  Search, Sort |
| ||
<br>

- Alogrithm/Library crads:
  <br>
The use of algorithms is an essential part of any computer program. Two key types of algorithms in programming are searching, and sorting is introduced into PW. Searching and sorting cards are introduced into the gameplay to make users familiar with algorithms and built-in functions.

- Search
  <br>
  <img src="static/cardImages/sideNav/search.gif" style="width: 10rem">
  <br>

This card allows the player to search for a specific card into the deck.

**Relation to computer programming:** Searching algorithm enables to locate a particular element present in a given set of elements, which is quite similar to the game's searching card.
To find out more about searching algorithm you can go to <a href="https://www.geeksforgeeks.org/searching-algorithms/" target="_blank">here</a>.
<br>

- Sort
  <br>
  <img src="static/cardImages/sideNav/sort.gif" style="width: 10rem">
  <br>

1.	Sort card allow a player to rearrange the top 5 cards of the deck. 
2.	Dragging a card onto another card will put it in the new spot.
3.	Player can use sorted cards for three turns.

**Relation to computer programming:** The use of algorithms is an essential part of any computer program.  Sorting is arranging items into an ordered sequence.
To find out more about Sorting algorithm you can go to <a href="https://www.geeksforgeeks.org/sorting-algorithms/" target="_blank">here</a>.


