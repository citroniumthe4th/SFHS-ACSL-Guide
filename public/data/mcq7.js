window.MCQ = (window.MCQ || []).concat([

{ id:"ba-01", kind: "problem", topic:"boolean-algebra", level:"b",
  q:`Simplify (A + B)(A + B').`,
  choices:["A","B","A+B","AB","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "(A+B)(A+B')")])`,
  why:`Multiplying out gives AA + AB' + BA + BB', and two of those four terms collapse
immediately, since idempotence turns AA into A and the complement law turns BB' into 0. What remains
is A + AB' + AB, and factoring the A out gives A(1 + B' + B), where anything ored with 1 is 1, so the
whole expression is A. The second distributive law reaches the same place in a single step, since
A + BB' is A + 0.` },

{ id:"ba-02", kind: "problem", topic:"boolean-algebra", level:"b",
  q:`Simplify A + A'B.`,
  choices:["A+B","A","B","AB","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A+A'B")])`,
  why:`This is the second form of the absorption law, and it is worth confirming with a truth
table rather than taking on trust. When A is 1 both sides come out 1, and when A is 0 the left side
reduces to B and so does the right. The expression looks as though it ought to collapse to A, which is
what the plain absorption law A + AB does, and the complement bar is the one difference that changes
the answer completely.` },

{ id:"ba-03", kind: "problem", topic:"boolean-algebra", level:"b",
  q:`Simplify A + AB.`,
  choices:["A","A+B","AB","B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A+AB")])`,
  why:`This is plain absorption. Factoring gives A(1 + B), and 1 ored with anything is 1, so the
result is A. Put another way, every row on which AB is true is already a row on which A is true, so
ORing it in adds nothing. Compare A + A'B: the complement allows B to matter when A is 0,
so that expression simplifies to A + B instead.` },

{ id:"ba-04", kind: "problem", topic:"boolean-algebra", level:"b",
  q:`Apply DeMorgan to (AB)'.`,
  choices:["A'+B'","A'B'","A+B","(A+B)'","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "(AB)'")])`,
  why:`DeMorgan flips the operator as well as pushing the bar down onto each variable, so the
complement of an and is the or of the complements. The row where A is 1 and B is 0 disproves A'B': the correct expression is
true there and A'B' is not.` },

{ id:"ba-05", kind: "problem", topic:"boolean-algebra", level:"s",
  q:`Simplify A'B'C + A'BC + AB'C + ABC.`,
  choices:["C","A+C","BC","A'C","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A'B'C+A'BC+AB'C+ABC")])`,
  why:`Group the first two terms and the last two, giving A'C(B' + B) plus AC(B' + B). Each
complement pair is 1, which leaves A'C + AC, and that factors to C(A' + A), or simply C. Looking back
at the four original terms with the answer in hand, every one of them ends in C and between them the
AB pairs cover all four combinations, so the expression is true exactly when C is.` },

{ id:"ba-06", kind: "problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make (A + B)' true?`,
  choices:["1","2","3","4","None of the above"], ans:0,
  check:`str(bool_count("(A+B)'"))`,
  why:`Only A and B appear, so there are four rows to consider rather than eight. DeMorgan turns
the expression into A'B', which is true only when both variables are 0, and that is a single row. The
distractor 3 is the count you would get for (AB)', which is the other DeMorgan form.` },

{ id:"ba-07", kind: "problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make A + BC' true?`,
  choices:["7", "4", "6", "3", "None of the above"], ans:4,
  check:`str(bool_count("A+BC'"))`,
  why:`Three variables appear, so there are eight rows. The expression is true on every row where
A is 1, which accounts for four of them, and it is true on one further row where A is 0 with B equal
to 1 and C equal to 0, bringing the total to 5. Counting the A rows first and then only the extra ones
is what stops you double counting. Since 5 is not among the four choices offered, the answer is None
of the above.` },

{ id:"ba-08", kind: "problem", topic:"boolean-algebra", level:"b",
  q:`Which expression equals A XOR B?`,
  choices:["AB'+A'B","AB+A'B'","(A+B)'","A'B'","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "AB'+A'B")])`,
  why:`Exclusive or is true exactly when the inputs differ, which happens either with A at 1 and
B at 0, or with A at 0 and B at 1, and those two cases are AB' and A'B. The distractor AB + A'B' is
XNOR, which is true when the inputs agree and is therefore the complement of what was asked for.` },

{ id:"ba-09", kind: "problem", topic:"boolean-algebra", level:"s",
  q:`Simplify ((A + B)' + (C + D)')'.`,
  choices:["(A+B)(C+D)","A'B'C'D'","(A+B)+(C+D)","AB+CD","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "((A+B)'+(C+D)')'")])`,
  why:`Take the outer bar off first with DeMorgan. The complement of an or is the and of the
complements, so the expression becomes (A + B)'' times (C + D)'', and each double bar then cancels to
leave (A + B)(C + D). Peeling one bar at a time from the outside in is considerably safer than trying
to push every complement inward at once.` },

{ id:"ba-10", kind: "problem", topic:"boolean-algebra", level:"b",
  q:`Simplify AB + A'B.`,
  choices:["B","A","AB","A+B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "AB+A'B")])`,
  why:`Factoring the B out gives B(A + A'), and the complement pair is 1, so the result is B
times 1, or B. The pattern generalises: whenever two terms differ in exactly one variable and that
variable appears plain in one and complemented in the other, the variable drops out entirely.
Recognising that is the most useful habit in this category, since most simplification questions are
built from it.` },

{ id:"ba-11", kind: "problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make (A + B)(A + C)(B + C) true?`,
  choices:["6", "3", "5", "2", "None of the above"], ans:4,
  check:`str(bool_count("(A+B)(A+C)(B+C)"))`,
  why:`Three variables gives eight rows. Each factor fails only when both of its variables are 0,
so the expression as a whole is false whenever at least two of the three variables are 0. The rows
with two or more zeros are the all zero row plus the three rows holding exactly one 1, which is four
rows, leaving four rows true, namely those with at least two ones. Since 4 is not among the four
choices offered, the answer is None of the above.` },

{ id:"ba-12", kind: "problem", topic:"boolean-algebra", level:"s",
  q:`Simplify A(A' + B).`,
  choices:["AB","A","B","A+B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A(A'+B)")])`,
  why:`Distributing gives AA' + AB, and the complement law kills the first term outright, leaving
AB. This is the and version of the second absorption law, mirroring the way A + A'B reduces to A + B.
The pattern is the same in both directions: the complemented copy disappears and the other variable
survives.` },

{ id:"ba-13", kind: "concept", topic:"boolean-algebra", level:"b",
  q:`What does A + A'  simplify to?`,
  choices:["1","A","0","A'","None of the above"], ans:0,
  why:`This is the complement law. Every variable is either 0 or 1, so on every row exactly one
of A and A' is true and their or is therefore always true. The and version is its mirror image, since
A times A' is 0 on every row. These two identities are what make whole terms vanish during
simplification, so they are worth looking for early.` },

{ id:"ba-14", kind: "problem", topic:"boolean-algebra", level:"s",
  q:`Simplify A'B'C'D'.`,
  choices:["(A+B+C+D)'","(ABCD)'","A'+B'+C'+D'","(A'+B'+C'+D')'","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A'B'C'D'")])`,
  why:`Run DeMorgan in reverse. An and of complements is the complement of the or, so A'B'C'D'
equals (A + B + C + D)', and both forms are true only on the single row where all four variables are
0. The distractor (ABCD)' is true on fifteen of the sixteen rows, which is as close to the opposite as
an expression can get.` },

{ id:"ba-15", kind: "problem", topic:"boolean-algebra", level:"s",
  q:`How many rows make AB'C + A'BC' + ABC + E true?`,
  choices:["11","20","22","16","None of the above"], ans:0,
  check:`str(bool_count("AB'C+A'BC'+ABC+E"))`,
  why:`Start by counting which variables actually appear, because that decides the size of the
table. They are A, B, C, and E, which is four variables and sixteen rows rather than thirty two. The
expression is true on every row where E is 1, which is eight rows, and among the eight rows with E at
0 the three product terms describe the ABC patterns 101, 010, and 111, which are three further rows.
The total is 8 plus 3. Counting rows over variables the expression never mentions is the mistake this
question is built around.` },

{ id:"ba-16", kind: "concept", topic:"boolean-algebra", level:"b",
  q:`Which one of these is NOT equal to the other three?`,
  choices:["A'B'","(AB)'","A'+B'","((AB))'","None of the above"], ans:0,
  why:`DeMorgan makes (AB)' the same as A' + B', and ((AB))' is that same expression
with a redundant pair of brackets, so three of the four are one expression written three ways. A'B' is
the odd one out: it is true only when both variables are 0, while the other three are true on three
rows of the four. Building two truth-table columns checks the difference, and the rows
where exactly one variable is 1 are where they part company.` }

]);
