window.MCQ = (window.MCQ || []).concat([

{ id:"ba-01", topic:"boolean-algebra", level:"b",
  q:`Simplify (A + B)(A + B').`,
  choices:["A","B","A+B","AB","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "(A+B)(A+B')")][0]`,
  why:`Multiply out: AA + AB' + BA + BB'. Now AA is A by idempotence and BB' is 0 by the
complement law, leaving A + AB' + AB. Factor the A out to get A(1 + B' + B), and anything ored
with 1 is 1, so the whole expression is A. The second distributive law gets there in one step:
A + BB' is A + 0, which is A.` },

{ id:"ba-02", topic:"boolean-algebra", level:"b",
  q:`Simplify A + A'B.`,
  choices:["A+B","A","B","AB","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "A+A'B")][0]`,
  why:`This is the second form of the absorption law. Check it with a truth table if you do not
trust it. When A is 1 both sides are 1. When A is 0 the left side becomes B and so does the
right. It looks like it should reduce to A, which is the plain absorption law A + AB, but the
complement bar changes the answer completely.` },

{ id:"ba-03", topic:"boolean-algebra", level:"b",
  q:`Simplify A + AB.`,
  choices:["A","A+B","AB","B","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "A+AB")][0]`,
  why:`Absorption. Factor to get A(1 + B), and 1 ored with anything is 1, so the result is A.
Put another way, every row where AB is true is a row where A is already true, so ORing it in
adds nothing. Compare this with the previous question, where the complement bar made the answer
A + B instead.` },

{ id:"ba-04", topic:"boolean-algebra", level:"b",
  q:`Apply DeMorgan to (AB)'.`,
  choices:["A'+B'","A'B'","A+B","(A+B)'","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "(AB)'")][0]`,
  why:`DeMorgan flips the operator as well as pushing the bar onto each variable. The complement
of an AND is an OR of the complements. Answering A'B' is the single most common error in this
category, and it is wrong on the row where A is 1 and B is 0.` },

{ id:"ba-05", topic:"boolean-algebra", level:"s",
  q:`Simplify A'B'C + A'BC + AB'C + ABC.`,
  choices:["C","A+C","BC","A'C","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "A'B'C+A'BC+AB'C+ABC")][0]`,
  why:`Group the first two and the last two: A'C(B' + B) + AC(B' + B). Each complement pair is
1, leaving A'C + AC, which is C(A' + A), which is C. Every one of the four terms ends in C, and
between them the pairs AB cover all four combinations, so the expression is true exactly when C
is true.` },

{ id:"ba-06", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make (A + B)' true?`,
  choices:["1","2","3","4","None of the above"], ans:0,
  check:`str(bool_count("(A+B)'"))`,
  why:`Only A and B appear, so there are four rows. By DeMorgan the expression is A'B', which is
true only when both variables are 0. That is one row. The distractor 3 is the count for
(AB)'.` },

{ id:"ba-07", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make A + BC' true?`,
  choices:["7", "4", "6", "3", "None of the above"], ans:4,
  check:`str(bool_count("A+BC'"))`,
  why:`Three variables appear, so there are eight rows. The expression is true on every row
where A is 1, which is four rows. It is also true when A is 0 with B equal to 1 and C equal to
0, which is one more. Total 5. Counting the A rows first and then only the extra rows avoids
double counting. The value 5 is not among the four choices offered, so the answer is None of the above.` },

{ id:"ba-08", topic:"boolean-algebra", level:"b",
  q:`Which expression equals A XOR B?`,
  choices:["AB'+A'B","AB+A'B'","(A+B)'","A'B'","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "AB'+A'B")][0]`,
  why:`XOR is true exactly when the inputs differ, which happens either when A is 1 and B is 0,
or when A is 0 and B is 1. Those two cases are AB' and A'B. The distractor AB + A'B' is XNOR,
true when they agree, and it is the complement of XOR.` },

{ id:"ba-09", topic:"boolean-algebra", level:"s",
  q:`Simplify ((A + B)' + (C + D)')'.`,
  choices:["(A+B)(C+D)","A'B'C'D'","(A+B)+(C+D)","AB+CD","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "((A+B)'+(C+D)')'")][0]`,
  why:`Apply DeMorgan to the outer bar. The complement of an OR is the AND of the complements,
so the expression becomes (A + B)'' times (C + D)''. Each double bar cancels, leaving
(A + B)(C + D). Peeling one bar at a time from the outside is safer than trying to push all of
them in at once.` },

{ id:"ba-10", topic:"boolean-algebra", level:"b",
  q:`Simplify AB + A'B.`,
  choices:["B","A","AB","A+B","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "AB+A'B")][0]`,
  why:`Factor the B out: B(A + A'). The complement pair is 1, so the result is B times 1, which
is B. Whenever two terms differ in exactly one variable and that variable appears both plain and
complemented, the variable drops out. Spotting that pattern is the single most useful habit in this whole
category, because most simplification questions are built out of it.` },

{ id:"ba-11", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make (A + B)(A + C)(B + C) true?`,
  choices:["6", "3", "5", "2", "None of the above"], ans:4,
  check:`str(bool_count("(A+B)(A+C)(B+C)"))`,
  why:`Three variables gives eight rows. Each factor fails only when both of its variables are
0, so the whole expression is false whenever at least two of the three are 0. The rows with two
or more zeros are the all zero row and the three rows with exactly one 1, which is four rows.
That leaves four rows true, namely the rows with at least two ones. The value 4 is not among the four choices offered, so the answer is None of the above.` },

{ id:"ba-12", topic:"boolean-algebra", level:"s",
  q:`Simplify A(A' + B).`,
  choices:["AB","A","B","A+B","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "A(A'+B)")][0]`,
  why:`Distribute: AA' + AB. The first term is 0 by the complement law, leaving AB. This is the
AND version of the second absorption law, and it mirrors A + A'B equaling A + B. Notice the
pattern: the complemented copy disappears and the other variable survives.` },

{ id:"ba-13", topic:"boolean-algebra", level:"b",
  q:`What does A + A'  simplify to?`,
  choices:["1","A","0","A'","None of the above"], ans:0,
  why:`The complement law. Every variable is either 0 or 1, so exactly one of A and A' is true on
every row, and their OR is always true. The AND version is the mirror image: A times A' is 0.
These two are what make whole terms vanish during simplification, so spot them early.` },

{ id:"ba-14", topic:"boolean-algebra", level:"s",
  q:`Simplify A'B'C'D'.`,
  choices:["(A+B+C+D)'","(ABCD)'","A'+B'+C'+D'","(A'+B'+C'+D')'","None of the above"], ans:0,
  check:`[c for c in CHOICES if same(c, "A'B'C'D'")][0]`,
  why:`Run DeMorgan backwards. An AND of complements is the complement of the OR, so
A'B'C'D' equals (A + B + C + D)'. Both forms are true only on the single row where all four
variables are 0. The distractor (ABCD)' is true on fifteen of the sixteen rows, which is the
opposite situation.` },

{ id:"ba-15", topic:"boolean-algebra", level:"s",
  q:`How many rows make AB'C + A'BC' + ABC + E true?`,
  choices:["11","20","22","16","None of the above"], ans:0,
  check:`str(bool_count("AB'C+A'BC'+ABC+E"))`,
  why:`Count the variables that actually appear. They are A, B, C, and E, which is four
variables and 16 rows, not 32. Whenever E is 1 the expression is true, and that is 8 rows. Among
the 8 rows with E equal to 0, the three product terms describe the ABC patterns 101, 010, and
111, which are three distinct rows. So the total is 8 plus 3, or 11. Counting rows over
variables the expression never mentions is the mistake this question is built around.` },

{ id:"ba-16", topic:"boolean-algebra", level:"b",
  q:`Which one of these is NOT equal to the other three?`,
  choices:["A'B'","(AB)'","A'+B'","((AB))'","None of the above"], ans:0,
  why:`DeMorgan says (AB)' equals A' + B', and the fourth choice is just (AB)' with an extra
pair of parentheses, so those three are the same expression. A'B' is different. It is true only
when both variables are 0, while the other three are true on three rows out of four. Building
the two columns side by side settles it in about fifteen seconds, and the rows where exactly one
variable is 1 are where they part ways.` }

]);
