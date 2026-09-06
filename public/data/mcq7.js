window.MCQ = (window.MCQ || []).concat([

{ id:"ba-01", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Simplify (A + B)(A + B').`,
  choices:["A","B","A+B","AB","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "(A+B)(A+B')")])`,
  why:`Multiplying out gives AA + AB' + BA + BB', and two of those four terms collapse
immediately, since idempotence turns AA into A and the complement law turns BB' into 0. What remains
is A + AB' + AB, and factoring the A out gives A(1 + B' + B), where anything ored with 1 is 1, so the
whole expression is A. The second distributive law reaches the same place in a single step, since
A + BB' is A + 0.` },

{ id:"ba-02", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Simplify A + A'B.`,
  choices:["A+B","A","B","AB","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A+A'B")])`,
  why:`This is the second form of the absorption law, and it is worth confirming with a truth
table rather than taking on trust. When A is 1 both sides come out 1, and when A is 0 the left side
reduces to B and so does the right. The expression looks as though it ought to collapse to A, which is
what the plain absorption law A + AB does, and the complement bar is the one difference that changes
the answer completely.` },

{ id:"ba-03", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Simplify A + AB.`,
  choices:["A","A+B","AB","B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A+AB")])`,
  why:`This is plain absorption. Factoring gives A(1 + B), and 1 ored with anything is 1, so the
result is A. Put another way, every row on which AB is true is already a row on which A is true, so
ORing it in adds nothing. Compare A + A'B: the complement allows B to matter when A is 0,
so that expression simplifies to A + B instead.` },

{ id:"ba-04", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Apply DeMorgan to (AB)'.`,
  choices:["A'+B'","A'B'","A+B","(A+B)'","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "(AB)'")])`,
  why:`DeMorgan flips the operator as well as pushing the bar down onto each variable, so the
complement of an and is the or of the complements. The row where A is 1 and B is 0 disproves A'B': the correct expression is
true there and A'B' is not.` },

{ id:"ba-05", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`Simplify A'B'C + A'BC + AB'C + ABC.`,
  choices:["C","A+C","BC","A'C","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A'B'C+A'BC+AB'C+ABC")])`,
  why:`Group the first two terms and the last two, giving A'C(B' + B) plus AC(B' + B). Each
complement pair is 1, which leaves A'C + AC, and that factors to C(A' + A), or simply C. Looking back
at the four original terms with the answer in hand, every one of them ends in C and between them the
AB pairs cover all four combinations, so the expression is true exactly when C is.` },

{ id:"ba-06", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make (A + B)' true?`,
  choices:["1","2","3","4","None of the above"], ans:0,
  check:`str(bool_count("(A+B)'"))`,
  why:`Only A and B appear, so there are four rows to consider rather than eight. DeMorgan turns
the expression into A'B', which is true only when both variables are 0, and that is a single row. The
distractor 3 is the count you would get for (AB)', which is the other DeMorgan form.` },

{ id:"ba-07", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make A + BC' true?`,
  choices:["7", "4", "6", "3", "None of the above"], ans:4,
  check:`str(bool_count("A+BC'"))`,
  why:`Three variables appear, so there are eight rows. The expression is true on every row where
A is 1, which accounts for four of them, and it is true on one further row where A is 0 with B equal
to 1 and C equal to 0, bringing the total to 5. Counting the A rows first and then only the extra ones
is what stops you double counting. Since 5 is not among the four choices offered, the answer is None
of the above.` },

{ id:"ba-08", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Which expression equals A XOR B?`,
  choices:["AB'+A'B","AB+A'B'","(A+B)'","A'B'","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "AB'+A'B")])`,
  why:`Exclusive or is true exactly when the inputs differ, which happens either with A at 1 and
B at 0, or with A at 0 and B at 1, and those two cases are AB' and A'B. The distractor AB + A'B' is
XNOR, which is true when the inputs agree and is therefore the complement of what was asked for.` },

{ id:"ba-09", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`Simplify ((A + B)' + (C + D)')'.`,
  choices:["(A+B)(C+D)","A'B'C'D'","(A+B)+(C+D)","AB+CD","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "((A+B)'+(C+D)')'")])`,
  why:`Take the outer bar off first with DeMorgan. The complement of an or is the and of the
complements, so the expression becomes (A + B)'' times (C + D)'', and each double bar then cancels to
leave (A + B)(C + D). Peeling one bar at a time from the outside in is considerably safer than trying
to push every complement inward at once.` },

{ id:"ba-10", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Simplify AB + A'B.`,
  choices:["B","A","AB","A+B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "AB+A'B")])`,
  why:`Factoring the B out gives B(A + A'), and the complement pair is 1, so the result is B
times 1, or B. The pattern generalises: whenever two terms differ in exactly one variable and that
variable appears plain in one and complemented in the other, the variable drops out entirely.
Recognizing that is the most useful habit in this category, since most simplification questions are
built from it.` },

{ id:"ba-11", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make (A + B)(A + C)(B + C) true?`,
  choices:["6", "3", "5", "2", "None of the above"], ans:4,
  check:`str(bool_count("(A+B)(A+C)(B+C)"))`,
  why:`Three variables gives eight rows. Each factor fails only when both of its variables are 0,
so the expression as a whole is false whenever at least two of the three variables are 0. The rows
with two or more zeros are the all zero row plus the three rows holding exactly one 1, which is four
rows, leaving four rows true, namely those with at least two ones. Since 4 is not among the four
choices offered, the answer is None of the above.` },

{ id:"ba-12", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`Simplify A(A' + B).`,
  choices:["AB","A","B","A+B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A(A'+B)")])`,
  why:`Distributing gives AA' + AB, and the complement law kills the first term outright, leaving
AB. This is the and version of the second absorption law, mirroring the way A + A'B reduces to A + B.
The pattern is the same in both directions: the complemented copy disappears and the other variable
survives.` },

{ id:"ba-13", kind:"concept", topic:"boolean-algebra", level:"b",
  q:`What does A + A'  simplify to?`,
  choices:["1","A","0","A'","None of the above"], ans:0,
  why:`This is the complement law. Every variable is either 0 or 1, so on every row exactly one
of A and A' is true and their or is therefore always true. The and version is its mirror image, since
A times A' is 0 on every row. These two identities are what make whole terms vanish during
simplification, so they are worth looking for early.` },

{ id:"ba-14", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`Simplify A'B'C'D'.`,
  choices:["(A+B+C+D)'","(ABCD)'","A'+B'+C'+D'","(A'+B'+C'+D')'","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A'B'C'D'")])`,
  why:`Run DeMorgan in reverse. An and of complements is the complement of the or, so A'B'C'D'
equals (A + B + C + D)', and both forms are true only on the single row where all four variables are
0. The distractor (ABCD)' is true on fifteen of the sixteen rows, which is as close to the opposite as
an expression can get.` },

{ id:"ba-15", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`How many rows make AB'C + A'BC' + ABC + E true?`,
  choices:["11","20","22","16","None of the above"], ans:0,
  check:`str(bool_count("AB'C+A'BC'+ABC+E"))`,
  why:`Start by counting which variables actually appear, because that decides the size of the
table. They are A, B, C, and E, which is four variables and sixteen rows rather than thirty two. The
expression is true on every row where E is 1, which is eight rows, and among the eight rows with E at
0 the three product terms describe the ABC patterns 101, 010, and 111, which are three further rows.
The total is 8 plus 3. Counting rows over variables the expression never mentions is the mistake this
question is built around.` },

{ id:"ba-16", kind:"concept", topic:"boolean-algebra", level:"b",
  q:`Which one of these is NOT equal to the other three?`,
  choices:["A'B'","(AB)'","A'+B'","((AB))'","None of the above"], ans:0,
  why:`DeMorgan makes (AB)' the same as A' + B', and ((AB))' is that same expression
with a redundant pair of brackets, so three of the four are one expression written three ways. A'B' is
the odd one out: it is true only when both variables are 0, while the other three are true on three
rows of the four. Building two truth-table columns checks the difference, and the rows
where exactly one variable is 1 are where they part company.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"ba-17", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Simplify (A + B)' + A'B'.`,
  choices:["A'B'","A'+B'","A+B","AB","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "(A+B)'+A'B'")])`,
  why:`DeMorgan turns (A + B)' into A'B', so the expression is A'B'
ored with itself, and idempotence says anything ored with itself is unchanged. The result is
A'B', true only on the single row where both variables are 0. Spotting that the two terms
are the same expression written two ways is the whole question; the alternative is a four row truth
table, which reaches the same place.` },

{ id:"ba-18", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Simplify AB + AB'.`,
  choices:["A","B","AB","A+B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "AB+AB'")])`,
  why:`Factoring the A out gives A(B + B'), and the complement pair is 1, so the result is
A. The pattern generalizes: whenever two terms differ in exactly one variable, with that variable plain
in one and complemented in the other, the variable drops out entirely. Recognizing that is the most
useful habit in this category.` },

{ id:"ba-19", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`Simplify (A + B)(A' + B).`,
  choices:["B","A","AB","A+B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "(A+B)(A'+B)")])`,
  why:`Multiplying out gives AA' + AB + A'B + BB. The first term is 0 by the
complement law and the last is B by idempotence, leaving B + AB + A'B, which absorbs down to B.
The second distributive law gets there in one step instead, since the expression has the form
B + AA', and that is B + 0.` },

{ id:"ba-20", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make (A' + B)(B' + C) true?`,
  choices:["5", "3", "6", "2", "None of the above"], ans:4,
  check:`str(bool_count("(A'+B)(B'+C)"))`,
  why:`Three variables gives eight rows, and counting the failures is less work than counting the
successes. The first factor fails only when A is 1 and B is 0, which is two rows with C free, and the
second fails only when B is 1 and C is 0, which is two more rows with A free. Those two sets are
disjoint, since they disagree about B, so four rows fail and four succeed. Since 4 is not among the
four choices offered, the answer is None of the above.` },

{ id:"ba-21", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Apply DeMorgan to (A + B)'.`,
  choices:["A'B'","A'+B'","A+B","(AB)'","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "(A+B)'")])`,
  why:`DeMorgan flips the operator as well as pushing the bar down onto each variable, so the
complement of an or is the and of the complements. The row where A is 1 and B is 0 rules out
A' + B': the correct expression is false there and A' + B' is true. This is the
mirror image of the more familiar (AB)' equals A' + B'.` },

{ id:"ba-22", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`Simplify A + A'B + A'B'C.`,
  choices:["A+B+C","A+B","A+C","ABC","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A+A'B+A'B'C")])`,
  why:`Apply the second absorption law twice from the left. A + A'B becomes A + B, and then
(A + B) + (A + B)'C, which is what the third term amounts to, becomes A + B + C. Read as a whole,
the expression is a chain of guards where each term only gets a say when all the earlier ones are 0,
and the result is simply the or of everything.` },

{ id:"ba-23", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Simplify (A')' + B.`,
  choices:["A+B","AB","A","B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "(A')'+B")])`,
  why:`A double complement cancels, since complementing a value twice returns it unchanged, so
the expression is A + B and nothing further can be done with it. Involution is the easiest law to apply
and the easiest to overlook when the bars are stacked, so counting them before doing anything else is
worth the two seconds it costs.` },

{ id:"ba-24", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make ABC + A'B'C' true?`,
  choices:["2","1","3","6","None of the above"], ans:0,
  check:`str(bool_count("ABC+A'B'C'"))`,
  why:`Each product term is true on exactly one row of the eight, since every variable appears in
it and pins its own value. The first needs all three variables at 1 and the second needs all three at
0, and no row satisfies both, so the count is 2. Read as a whole, this expression is the three input
test for whether the inputs all agree.` },

{ id:"ba-25", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Simplify AB(A + C).`,
  choices:["AB","A","ABC","A+B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "AB(A+C)")])`,
  why:`Distributing gives ABA + ABC, and idempotence turns ABA into AB, leaving AB + ABC, which
absorbs down to AB. There is a quicker route: every row where AB is true already has A true, so the
bracket is satisfied automatically and contributes nothing. Whenever a factor is implied by the terms
outside it, it can be struck out on sight.` },

{ id:"ba-26", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Which expression is true exactly when A and B are equal?`,
  choices:["AB+A'B'","AB'+A'B","(A+B)'","A'+B'","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "AB+A'B'")])`,
  why:`The inputs agree either when both are 1 or when both are 0, and those two cases are AB and
A'B'. This is XNOR, the complement of exclusive or, and it is the one bit equality test
that sits inside every comparator circuit. The distractor AB' + A'B is XOR, which is true
exactly when they differ.` },

{ id:"ba-27", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`Simplify (A + B')(A + B).`,
  choices:["A","B","AB","A+B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "(A+B')(A+B)")])`,
  why:`The second distributive law lets you factor the shared A straight out, giving
A + B'B, and the complement pair is 0, so the whole thing is A + 0, or A. Multiplying out reaches
the same place through AA + AB + AB' + B'B, but the factoring route is two lines shorter and
harder to get wrong.` },

{ id:"ba-28", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make AB' + A'B + C true?`,
  choices:["6","4","5","7","None of the above"], ans:0,
  check:`str(bool_count("AB'+A'B+C"))`,
  why:`Three variables gives eight rows. The expression is true on every row where C is 1, which
is four of them, and among the four rows with C at 0 the first two terms describe the cases where A and
B differ, which is two more. The total is 4 plus 2. Counting the C rows first and then only the extra
ones is what stops you double counting, since the two halves overlap heavily.` },

{ id:"ba-29", kind:"concept", topic:"boolean-algebra", level:"b",
  q:`Which identity holds in Boolean algebra but has no counterpart in ordinary arithmetic?`,
  choices:["A + BC = (A + B)(A + C)","A(B + C) = AB + AC","A + B = B + A","A(BC) = (AB)C","None of the above"], ans:0,
  why:`The other three are the familiar distributive, commutative, and associative laws, and all
of them behave the same way with numbers. The first is the second distributive law, where the or
distributes over the and, and it has no arithmetic counterpart at all: 2 + 3 times 4 is not
(2 + 3) times (2 + 4). It is the law that does the work in problems like A + BB', which collapses
straight to A.` },

{ id:"ba-30", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`Simplify A'BC + AB'C + ABC' + ABC.`,
  choices:["AB+AC+BC","ABC","A+B+C","AB+C","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A'BC+AB'C+ABC'+ABC")])`,
  why:`Use the last term three times, since a term may be repeated freely. Pairing it with the
first gives BC, with the second gives AC, and with the third gives AB, so the whole expression reduces
to AB + AC + BC. That is the majority function: it is true exactly when at least two of the three
variables are 1, which the four original terms confirm.` },

{ id:"ba-31", kind:"problem", topic:"boolean-algebra", level:"b",
  q:`Simplify A(B + B').`,
  choices:["A","AB","B","A+B","None of the above"], ans:0,
  check:`only([c for c in CHOICES[:4] if same(c, "A(B+B')")])`,
  why:`The complement law makes B + B' equal to 1 on every row, and anding anything with 1
leaves it unchanged, so the answer is A. A bracket that reduces to a constant can be crossed out before
any distribution is attempted, and looking for one is worth doing first whenever a variable and its
complement appear together.` },

{ id:"ba-32", kind:"problem", topic:"boolean-algebra", level:"s",
  q:`How many rows of the truth table make A'B' + CD true?`,
  choices:["8", "4", "6", "9", "None of the above"], ans:4,
  check:`str(bool_count("A'B'+CD"))`,
  why:`Four variables gives sixteen rows. The term A'B' is true on the four rows where
A and B are both 0, with C and D free, and CD is true on the four rows where C and D are both 1, with A
and B free. Those two sets overlap on the single row where all four conditions hold, so the count is
4 plus 4 minus 1. Forgetting to remove the overlap gives 8. Since 7 is not among the four choices
offered, the answer is None of the above.` }

]);
