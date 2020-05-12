
{Multi tier questions }
{function with loop of instructions 1}
var 
	firstFactor, secondFactor, totalReturned : integer;

function findTotal(first, second): integer;
var 
	total: integer;  
begin
	total := 0
	for 1 to first do
	begin
	total = total + second;
	end;
	findTotal := total
end;

begin
	firstFactor := 5; {changes the value of firstFactor to 5}
	secondFactor := 4; {changes the value of secondFactor to 4}
	totalReturned := findTotal;
end
(*
Use the follow code segment as an example:
1) What line(s) creates a group?
2) What lines(s) create a variable?
3) what line(s) represent a repeat card?
*)


{function with nested for loop of instructions}
var 
	firstFactor, secondFactor, totalReturned : integer;

function findTotal(first, second): integer;
var 
	total: integer;  
begin
	total := 0
	for 1 to first do
	begin
		for 1 to 4 do
		begin 
		total = total + second;
		end;
	end;
	findTotal := total;
end;

begin
	firstFactor := 5 {changes the value of firstFactor to 5}
	secondFactor := 4 {changes the value of secondFactor to 4}
	totalReturned := findTotal
end

(*
Use the follow code segment as an example:
1) What line(s) creates a group?
2) What lines(s) create a variable?
3) what line(s) represent a repeat card?
4) What concept does lines 41 to 47 represent? (stacking repeat cards on top of an instruction)
*)


{function with nested for loops looping through running another function}
var 
	firstFactor, secondFactor, totalReturned : integer;

function addToTotal(total, addedNumber): integer;
begin
	total = total + addedNumber;
	findTotal := total;
end;

function findTotal(first, second): integer;
var 
	total: integer;  
begin
	total := 0
	for 1 to first do
	begin
		for 1 to 4 do
		begin 
		total := addToTotal(total, second)
		end;
	end;
	findTotal := total;
end;

begin
	firstFactor := 5 {changes the value of firstFactor to 5}
	secondFactor := 4 {changes the value of secondFactor to 4}
	totalReturned := findTotal
end

(*
Use the follow code segment as an example:
1) What line(s) creates a group?
2) What lines(s) create a variable?
3) what line(s) represent a repeat card?
4) What line(s) call a group? 
5) This is a really complicated example so I'm not sure how to ask questions for this or if its appropriate. 
*)




{BASIC QUESTIONS}
{An instruction with variables 1}
var 
	firstFactor, secondFactor, total : integer;
begin
	firstFactor := 11
	secondFactor := 15
	total := firstFactor * secondFactor
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)


{An instruction with variables 2}
var 
	firstFactor, secondFactor, total : integer;
begin
	firstFactor := 10
	secondFactor := 2
	total := firstFactor / secondFactor
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{An instruction 1}
var 
	total : integer;
begin
	total := 5 * 2
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{An instruction 2}
var 
	total : integer;
begin
	total := 6 / 3
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{basic for loop RepeatX 1} 
var 
	firstFactor, secondFactor, total : integer;
begin
	total := 0
	firstFactor := 11
	secondFactor := 15
	for 1 to firstFactor do
	begin
		total := total + secondFactor
	end
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{basic for loop RepeatX 2}
var 
	first, secondFactor, total : integer;
begin
	total := 0
	first := 10
	last := 15
	factor := 15
	for first to last do
	begin
		total := total + factor
	end
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{basic for loop Repeat 1}
var 
	firstFactor, secondFactor, total : integer;
begin
	total := 0
	firstFactor := 11
	secondFactor := 15
	for 1 to 5 do
	begin
		total := total + secondFactor
	end
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{basic for loop Repeat 2}
var 
	firstFactor, secondFactor, total : integer;
begin
	total := 0
	firstFactor := 11
	secondFactor := 15
	for 10 to 20 do
	begin
		total := total + firstFactor
	end
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{function with instructions 1}
var 
	firstFactor, secondFactor, totalReturned : integer;

function findTotal(first, second): integer;
var 
	total: integer;  
begin
	total := 0
	total = first * second
	findTotal := total
end;

begin
	firstFactor := 5 {changes the value of firstFactor to 5}
	secondFactor := 4 {changes the value of secondFactor to 4}
	totalReturned := findTotal
end;
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{function with instructions 2}
var 
	firstFactor, secondFactor, totalReturned : integer;

function findTotal(first, second): integer;
var 
	total: integer;  
begin
	total := 0
	total = first + second
	findTotal := total
end;

begin
	firstFactor := 5 {changes the value of firstFactor to 5}
	secondFactor := 4 {changes the value of secondFactor to 4}
	totalReturned := findTotal
end;
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{basic nested for loop Repeat 1}
var 
	total : integer;
begin
	total := 0
	for 1 to 5 do
	begin
		for 1 to 10
		begin
			total := total + 1
		end
	end
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)

{basic nested for loop Repeat 2}
var 
	total : integer;
begin
	total := 0
	for 1 to 5 do
	begin
		for 1 to 10
		begin
			total := total * 2
		end
	end
end
(*
Use the follow code segment as an example:
1) What concept(s) does the following code example represent? 
*)




{IF questions}
{goes through true path 1}
var 
	firstFactor, secondFactor, total : integer;
begin
	firstFactor := 10
	secondFactor := 15
	if(firstFactor < 15) then 
		total := 50
	else 
		total := 15
end

{goes through true path 2}
var 
	firstFactor, secondFactor, total : integer;
begin
	firstFactor := 10
	secondFactor := 15
	if(firstFactor = 10) then 
		total := 50
	else 
		total := 15
end

{goes through false path 1}
var 
	firstFactor, secondFactor, total : integer;
begin
	firstFactor := 10
	secondFactor := 15
	if(firstFactor < 5) then 
		total := 50
	else 
		total := 15
end
{goes through false path 2}
var 
	firstFactor, secondFactor, total : integer;
begin
	firstFactor := 10
	secondFactor := 15
	if(firstFactor = 15) then 
		total := 50
	else 
		total := 15
end

(*
Questions for the if path questions could be whether the true or false path passes?
*)



