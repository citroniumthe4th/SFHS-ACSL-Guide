window.MCQ = (window.MCQ || []).concat([

{ id:"lp-01", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (MULT (ADD 6 5 0) (MULT 5 1 2 2) (DIV 6 (SUB 2 5))).`,
  choices:["-440","440","-220","-44","None of the above"], ans:0,
  check:`lisp('(MULT (ADD 6 5 0) (MULT 5 1 2 2) (DIV 6 (SUB 2 5)))')`,
  why:`Reduce the innermost complete brackets first and work outward. ADD 6 5 0 is 11, the inner
MULT 5 1 2 2 is 20, SUB 2 5 is -3, and dividing 6 by -3 gives -2. The outer MULT is then 11 times 20
times -2, or -440. Note the two shapes in play here: ADD and MULT are written (ADD x1 x2 ...) and take
as many arguments as you give them, while SUB and DIV are written (SUB a b) and (DIV a b) and take
exactly two.` },

{ id:"lp-02", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CDR '((2 (3)) (4 (5 6) 7))).`,
  choices:["((4 (5 6) 7))","(4 (5 6) 7)","(2 (3))","((2 (3)))","None of the above"], ans:0,
  check:`lisp("(CDR '((2 (3)) (4 (5 6) 7)))")`,
  why:`The outer list has exactly two elements and both of them happen to be lists themselves.
CDR removes the first and hands back what remains, which is a list of one element, and that element
is (4 (5 6) 7). That is where the second layer of brackets comes from. Answering (4 (5 6) 7) would be
right for CAR of CDR, but CDR alone always returns a list rather than an element.` },

{ id:"lp-03", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CAR (CDR (REVERSE '(1 2 (3 4) 5)))).`,
  choices:["(3 4)","5","(4 3)","2","None of the above"], ans:0,
  check:`lisp("(CAR (CDR (REVERSE '(1 2 (3 4) 5))))")`,
  why:`REVERSE only touches the top level, so it turns the list into (5 (3 4) 2 1) while leaving
the nested (3 4) in its own order, which is why (4 3) is wrong. CDR then drops the 5 to leave
((3 4) 2 1), and CAR returns the first element of that, which is the list (3 4) rather than a
number.` },

{ id:"lp-04", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CONS 9 '(1 2)).`,
  choices:["(9 1 2)","((9) 1 2)","(1 2 9)","(9 (1 2))","None of the above"], ans:0,
  check:`lisp("(CONS 9 '(1 2))")`,
  why:`CONS places its first argument on the front of the list given as its second, producing a
flat list of three elements. It does not wrap the new value in brackets of its own and it does not
append to the end, which is enough to rule out the other three choices without evaluating anything.` },

{ id:"lp-05", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CDR '(7)).`,
  choices:["()","7","(7)","(())","None of the above"], ans:0,
  check:`lisp("(CDR '(7))")`,
  why:`CDR always hands back a list, even when nothing is left in it, so removing the only
element of a one element list leaves the empty list, written () or NIL. The choice (()) is different: it contains one element, an empty list. Answering 7 confuses CDR with CAR,
which would return the element itself, and answering (7) overlooks that anything was removed at
all.` },

{ id:"lp-06", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (SUB (ADD 1 2 3 4) (DIV -9 2)).`,
  choices:["14.5","5.5","10","-14.5","None of the above"], ans:0,
  check:`lisp('(SUB (ADD 1 2 3 4) (DIV -9 2))')`,
  why:`ADD takes as many arguments as you give it, so (ADD 1 2 3 4) is 10. DIV takes exactly two and
performs ordinary division, so (DIV -9 2) is -4.5 and not -4: nothing is truncated unless a problem
says so. Subtracting a negative adds, so 10 minus -4.5 is 14.5. Reading DIV as integer division gives
-4 and a final answer of 14, which is the assumption most students bring in from other languages.` },

{ id:"lp-07", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (REVERSE '(1 (2 3) (4 (5)))).`,
  choices:["((4 (5)) (2 3) 1)","((5) 4) (3 2) 1)","(1 (3 2) ((5) 4))","((4 5) (2 3) 1)","None of the above"], ans:0,
  check:`lisp("(REVERSE '(1 (2 3) (4 (5))))")`,
  why:`REVERSE reorders the top level elements and leaves whatever is inside them exactly as it
was. The three elements here are 1, then (2 3), then (4 (5)), so reversing gives (4 (5)), (2 3), and 1.
Every distractor reverses the contents of the nested lists as well, which REVERSE never does at any
depth.` },

{ id:"lp-08", kind:"problem", topic:"lisp", level:"s",
  q:`If X is bound to the list (A B C D), what does (CADDR X) return?`,
  choices:["C","B","D","(C D)","None of the above"], ans:0,
  check:`lisp("(CAR (CDR (CDR '(A B C D))))")`,
  why:`Read the letters between the C and the R from right to left, so CADDR is CAR of CDR of
CDR. Applying that to the list, the first CDR gives (B C D), the second gives (C D), and the CAR then
returns C. Read generally, CADDR picks out the third element, and the pattern extends to longer chains
the same way.` },

{ id:"lp-09", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CONS (CAR '(8 9)) (CDR '(1 2 3))).`,
  choices:["(8 2 3)","(8 9 2 3)","((8) 2 3)","(8 1 2 3)","None of the above"], ans:0,
  check:`lisp("(CONS (CAR '(8 9)) (CDR '(1 2 3)))")`,
  why:`Evaluate the two arguments before applying CONS. CAR of (8 9) is 8, and CDR of (1 2 3) is
(2 3), so CONS puts 8 on the front of (2 3). The distractor (8 1 2 3) comes from forgetting that the
CDR has already removed the 1 before CONS ever sees the list.` },

{ id:"lp-10", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (DIV 100 8).`,
  choices:["12.5","12","13","800","None of the above"], ans:0,
  check:`lisp('(DIV 100 8)')`,
  why:`DIV is ordinary division and keeps the fraction, so (DIV 100 8) is 12.5. Every language most
students have written in returns 12 for integer operands, which is why 12 sits in the choices, but
ACSL only gives you a whole number when the division happens to come out even. DIV also takes exactly
two arguments, so if you ever want 100 divided by 4 and then by 2, nest it as (DIV (DIV 100 4) 2).` },

{ id:"lp-11", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (REVERSE (CONS '(1 2) '(3 4))).`,
  choices:["(4 3 (1 2))","((2 1) 4 3)","(4 3 1 2)","((1 2) 3 4)","None of the above"], ans:0,
  check:`lisp("(REVERSE (CONS '(1 2) '(3 4)))")`,
  why:`CONS places the list (1 2) on the front of (3 4) as a single element, so the result is
((1 2) 3 4), which is a list of three things rather than four. Reversing the top level of that gives
(4 3 (1 2)), with the nested list still reading in its original order, which is what rules out
((2 1) 4 3).` },

{ id:"lp-12", kind:"concept", topic:"lisp", level:"s",
  q:`Which of these always returns a list for every nonempty list L?`,
  choices:["(CDR L)","(CAR L)","(CADR L)","(CAAR L)","None of the above"], ans:0,
  why:`CDR removes the first element and returns everything that remains, and what remains is
always a list. For a one-element input, it is NIL, which is both an atom and the empty list. CAR returns an element
instead, and that element might be an atom or might itself be a list. CADR and CAAR both finish with a
CAR, so they inherit the same uncertainty.` },

{ id:"wl-01", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`How many times does the body run in for i = 1 to 10 step 4?`,
  choices:["3","2","4","10","None of the above"], ans:0,
  check:`str(len(list(range(1,11,4))))`,
  why:`The counter takes the values 1, 5, and 9, and stops there because the next value would be
13, which is past the limit of 10. If you would rather not list them, the count is the integer part of
10 minus 1 divided by 4, plus one, which comes to the same three.` },

{ id:"wl-02", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`For i = 1 to 20 step 4, what is the last value i takes inside the loop body?`,
  choices:["17","20","21","19","None of the above"], ans:0,
  check:`
vals = list(range(1, 21, 4))
RESULT = str(vals[-1])`,
  why:`Write the values out: i takes 1, 5, 9, 13 and 17. The next would be 21, which is past the
limit of 20, so the body never runs with it and 17 is the last value used. A counted loop stops at
the largest value the step actually reaches, which need not be the limit itself, and here 20 is
skipped entirely because the step does not land on it.

Note the question asks what i holds <em>inside</em> the body. What the counter holds after the loop
has ended is a separate matter, and one the ACSL reference does not define, so no question here will
ask you for it.` },

{ id:"wl-03", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>S = 0
for I = 10 to 1 step -3
    S = S + I
next I
output S</code></pre>What is printed?`,
  choices:["23", "21", "19", "25", "None of the above"], ans:4,
  check:`str(sum(range(10,0,-3)))`,
  why:`With a negative step the counter runs 10, 7, 4, and 1, stopping when the next value would
fall below the limit rather than rise above it, and those four values add to 22. A negative step
reverses which direction counts as passing the bound, which is the only thing that changes. Since 22
is not among the four choices offered, the answer is None of the above.` },

{ id:"wl-04", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>X = 3
while X &gt; 5
    X = X + 1
end while
output X</code></pre>What is printed?`,
  choices:["3","5","6","infinite loop","None of the above"], ans:0,
  check:`
X = 3
while X > 5:
    X += 1
RESULT = X`,
  why:`A while loop tests before its body rather than after, and 3 is not greater than 5, so the
body never runs at all and X keeps the value it started with. Whenever the answer to a while question
turns out to equal the starting value, the usual explanation is that the loop was never entered rather
than that you made an arithmetic slip.` },

{ id:"wl-05", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>P = 1
for I = 1 to 4
    P = P * I
next I
output P</code></pre>What is printed?`,
  choices:["24","10","12","0","None of the above"], ans:0,
  check:`
P = 1
for I in range(1,5):
    P *= I
RESULT = P`,
  why:`This is a running product, computing 1 times 2 times 3 times 4, which is 24. Notice that P
starts at 1 rather than 0, and that this is not a stylistic choice: a product accumulator started at 0
stays 0 no matter how many passes run, which a related version of this question uses as its trap.` },

{ id:"wl-06", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>C = 0
for I = 1 to 3
    for J = 1 to 4
        C = C + 1
    next J
next I
output C</code></pre>What is printed?`,
  choices:["12","7","3","4","None of the above"], ans:0,
  check:`str(3*4)`,
  why:`The inner loop runs to completion for every single pass of the outer one, so the body
executes 3 times 4 times. Because the inner bound here does not depend on the outer counter, the count
is a plain product, which is what distinguishes this from the triangular case where it does.` },

{ id:"wl-07", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>N = 40
C = 0
while N &gt; 1
    N = int(N / 2)
    C = C + 1
end while
output C</code></pre>What is printed?`,
  choices:["5","6","4","40","None of the above"], ans:0,
  check:`
N, C = 40, 0
while N > 1:
    N //= 2
    C += 1
RESULT = C`,
  why:`N runs 40, 20, 10, 5, 2, and 1, which is five halvings, and the loop stops on reaching 1
because the test demands strictly greater than 1. Any loop that divides rather than subtracts finishes
in far fewer passes than the starting value would suggest, which is worth remembering before you begin
writing out forty rows.` },

{ id:"wl-08", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>S = 0
for I = 1 to 5
    for J = 1 to I
        S = S + J
    next J
next I
output S</code></pre>What is printed?`,
  choices:["36", "15", "25", "20", "None of the above"], ans:4,
  check:`str(sum(sum(range(1,I+1)) for I in range(1,6)))`,
  why:`The inner loop adds 1 through I, so for I running from 1 to 5 those inner sums are 1, 3, 6,
10, and 15, which total 35. Building a small table of the inner sums is much safer than trying to
carry a single running total across all fifteen passes. Since 35 is not among the four choices offered,
the answer is None of the above.` },

{ id:"wl-09", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>A = 1
while A &lt; 100
    A = A * 3
end while
output A</code></pre>What is printed?`,
  choices:["243","81","100","729","None of the above"], ans:0,
  check:`
A = 1
while A < 100:
    A *= 3
RESULT = A`,
  why:`A runs 1, 3, 9, 27, 81, and then 243. The pass that begins with A at 81 still runs, since
81 is genuinely less than 100, and it is that pass which pushes A past the limit. The loop stops after
the value has exceeded the bound rather than at the moment it reaches it, which is why the answer is
not 81.` },

{ id:"wl-10", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>C = 0
for I = 1 to 20
    if I % 4 == 0 then
        C = C + 1
    end if
next I
output C</code></pre>What is printed?`,
  choices:["5","4","6","20","None of the above"], ans:0,
  check:`str(len([I for I in range(1,21) if I % 4 == 0]))`,
  why:`The multiples of 4 up to and including 20 are 4, 8, 12, 16, and 20, so the condition fires
five times. The inclusive upper bound is what brings 20 into the count, and treating the bound as
exclusive would drop it and give 4 instead.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"lp-13", kind:"concept", topic:"lisp", level:"s",
  q:`For any list L and any value X, which expression is guaranteed to produce a list with exactly
one more element than L?`,
  choices:["(CONS X L)","(CONS L X)","(REVERSE L)","(CDR L)","None of the above"], ans:0,
  why:`CONS places its first argument on the front of the list given as its second and returns
that longer list, so the count always goes up by exactly one whatever X happens to be, list or atom.
Writing the arguments the other way round asks CONS to treat X as a list, which fails unless it
already is one. REVERSE leaves the length alone and CDR reduces it by one for a nonempty list. CDR of the empty list is still empty.` },

{ id:"lp-14", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CONS (CAR '((1 2) 3)) '(4)).`,
  choices:["((1 2) 4)","(1 2 4)","((1 2) (4))","(1 2 3 4)","None of the above"], ans:0,
  check:`lisp("(CONS (CAR '((1 2) 3)) '(4))")`,
  why:`Evaluate the argument first. CAR of ((1 2) 3) returns the first element, which is the list
(1 2) rather than a number. CONS then places that single element on the front of (4), producing a list
of two elements whose first happens to be a list. The distractor (1 2 4) is what you would get if CONS
merged the two lists, which it never does.` },

{ id:"lp-15", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (REVERSE (CDR '(A (B C) D E))).`,
  choices:["(E D (B C))","(E D (C B))","((B C) D E)","(E D C B)","None of the above"], ans:0,
  check:`lisp("(REVERSE (CDR '(A (B C) D E)))")`,
  why:`CDR removes the leading A and hands back ((B C) D E), a list of three elements. REVERSE
then reorders those three top level elements and leaves whatever is inside them exactly as it was, so
the nested (B C) keeps its own order. The other listed results either leave the outer list unchanged, reverse the nested list, or flatten it. REVERSE changes only the order of the outer elements.` },

{ id:"lp-16", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (ADD (MULT 3 4) (DIV 20 8)).`,
  choices:["14.5","14","12.5","17","None of the above"], ans:0,
  check:`lisp('(ADD (MULT 3 4) (DIV 20 8))')`,
  why:`Reduce the innermost brackets first. MULT 3 4 is 12, and DIV 20 8 is 2.5 rather than 2,
since DIV performs ordinary division and keeps the fraction. Adding gives 14.5. The distractor 14 is
what integer division would produce, and that assumption is the one most students carry in from other
languages.` },

{ id:"lp-17", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CDR (CDR '((1) (2) (3)))).`,
  choices:["((3))","(3)","3","()","None of the above"], ans:0,
  check:`lisp("(CDR (CDR '((1) (2) (3))))")`,
  why:`The outer list has three elements, each of which is itself a one element list. The first
CDR removes (1) and leaves ((2) (3)), and the second removes (2) and leaves ((3)). That is a list
holding one element, and that element is the list (3), which is where the second layer of brackets
comes from. CDR always returns a list rather than an element.` },

{ id:"lp-18", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CONS 'X (CONS 'Y '(Z))).`,
  choices:["(X Y Z)","((X Y) Z)","(X (Y Z))","(Z Y X)","None of the above"], ans:0,
  check:`lisp("(CONS 'X (CONS 'Y '(Z)))")`,
  why:`Work outward from the inner call. CONS of Y onto (Z) gives (Y Z), and CONS of X onto that
gives (X Y Z). Each CONS adds exactly one element to the front without introducing any brackets of its
own, so building a list this way produces a flat result. Nested CONS calls are the standard way a list
is assembled one element at a time.` },

{ id:"lp-19", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (SUB (DIV 45 5) (MULT 2 2 2)).`,
  choices:["1","17","-1","72","None of the above"], ans:0,
  check:`lisp('(SUB (DIV 45 5) (MULT 2 2 2))')`,
  why:`DIV 45 5 is 9 exactly, and MULT takes as many arguments as you give it, so 2 times 2 times
2 is 8. Subtracting gives 1. Note the difference in shape between the two functions: MULT and ADD
accept any number of arguments while SUB and DIV take exactly two, so (SUB 9 8 1) would not be a legal
expression at all.` },

{ id:"lp-20", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CAR (REVERSE '(P Q (R S)))).`,
  choices:["(R S)","(S R)","P","((R S))","None of the above"], ans:0,
  check:`lisp("(CAR (REVERSE '(P Q (R S))))")`,
  why:`REVERSE turns the list into ((R S) Q P), leaving the nested list in its own order, and CAR
then returns the first element of that, which is the list (R S) itself. CAR returns an element rather
than a list, so no extra brackets appear, which is what separates the answer from ((R S)). Reading it
another way, CAR of REVERSE picks out the last element of the original list.` },

{ id:"lp-21", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (CDR (CONS '(1 2) '(3 4))).`,
  choices:["((1 2))", "(4)", "(1 2)", "((1 2) 3 4)", "None of the above"], ans:4,
  check:`lisp("(CDR (CONS '(1 2) '(3 4)))")`,
  why:`CONS places the list (1 2) on the front of (3 4) as a single element, giving
((1 2) 3 4), which has three elements rather than four. CDR then removes that first element and hands
back (3 4), which is the original second argument unchanged. In general CDR undoes a CONS, and that is
worth knowing as a check on either function. Since (3 4) is not among the four choices offered, the
answer is None of the above.` },

{ id:"lp-22", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (MULT (SUB 10 12) (SUB 3 8)).`,
  choices:["10","-10","-7","7","None of the above"], ans:0,
  check:`lisp('(MULT (SUB 10 12) (SUB 3 8))')`,
  why:`SUB puts its arguments in the order they are written, so the first is 10 minus 12, or -2,
and the second is 3 minus 8, or -5. Multiplying two negatives gives a positive 10. Reversing the
operand order of either SUB would flip its sign and would change the sign of the product, which is
exactly the mistake the distractor -10 is there to catch.` },

{ id:"lp-23", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (REVERSE (CONS (CAR '(9 8)) (CDR '(1 2 3)))).`,
  choices:["(3 2 9)","(9 2 3)","(3 2 1 9)","(8 2 3)","None of the above"], ans:0,
  check:`lisp("(REVERSE (CONS (CAR '(9 8)) (CDR '(1 2 3))))")`,
  why:`Resolve the two innermost calls first. CAR of (9 8) is 9, and CDR of (1 2 3) is (2 3), so
CONS produces (9 2 3). Reversing that gives (3 2 9). The distractor (3 2 1 9) comes from forgetting
that the CDR already removed the 1 before CONS ever saw the list.` },

{ id:"lp-24", kind:"problem", topic:"lisp", level:"s",
  q:`Evaluate (DIV (ADD 3 4 5) 8).`,
  choices:["1.5","1","12","2","None of the above"], ans:0,
  check:`lisp('(DIV (ADD 3 4 5) 8)')`,
  why:`ADD takes any number of arguments, so 3 plus 4 plus 5 is 12, and DIV then divides that by
8. Since DIV keeps the fraction rather than truncating, the answer is 1.5 and not 1. ACSL only hands
you a whole number when the division happens to come out even, which is the single rule worth carrying
into every LISP question that divides.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"wl-11", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>S = 0
for I = 2 to 20 step 3
    S = S + I
next I
output S</code></pre>What is printed?`,
  choices:["77","70","55","90","None of the above"], ans:0,
  check:`
S = 0
for I in range(2, 21, 3):
    S = S + I
RESULT = S`,
  why:`Write the counter values out before adding anything: 2, 5, 8, 11, 14, 17, and 20. The next
would be 23, which is past the limit, so the loop ends there. Those seven values add to 77. The upper
bound of 20 happens to be reached exactly here, which is worth noticing, since a step of 3 starting at
2 does not land on every limit.` },

{ id:"wl-12", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>N = 1
C = 0
while N &lt; 200
    N = N * 3
    C = C + 1
end while
output C</code></pre>What is printed?`,
  choices:["5","4","6","200","None of the above"], ans:0,
  check:`
N, C = 1, 0
while N < 200:
    N = N * 3
    C += 1
RESULT = C`,
  why:`N runs 3, 9, 27, 81, and then 243. The pass that begins with N at 81 still runs, since 81
is genuinely less than 200, and it is that pass which pushes N past the limit. The loop stops after the
value has exceeded the bound rather than at the moment it reaches it, which is why the count is 5 and
not 4.` },

{ id:"wl-13", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>P = 1
for I = 1 to 5
    P = P * 2
next I
output P</code></pre>What is printed?`,
  choices:["32","10","16","64","None of the above"], ans:0,
  check:`
P = 1
for I in range(1, 6):
    P = P * 2
RESULT = P`,
  why:`The counter never appears in the body, so all five passes do exactly the same thing:
double P. Starting from 1 and doubling five times gives 2 to the fifth, which is 32. The distractor 16
is what four passes would give, and 64 is what six would give, so counting the passes is the whole
question.` },

{ id:"wl-14", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>S = 0
I = 1
while I &lt;= 5
    S = S + I * I
    I = I + 1
end while
output S</code></pre>What is printed?`,
  choices:["55","25","15","225","None of the above"], ans:0,
  check:`
S = 0
I = 1
while I <= 5:
    S = S + I * I
    I = I + 1
RESULT = S`,
  why:`Each pass adds the square of the current counter, so the sum is 1 + 4 + 9 + 16 + 25, which
is 55. The counter is advanced inside the body rather than by the loop header, and leaving that line
out is what turns a while loop into one that never ends. The distractor 225 is the square of the sum
rather than the sum of the squares.` },

{ id:"wl-15", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>C = 0
for I = 1 to 4
    for J = I to 1 step -1
        C = C + 1
    next J
next I
output C</code></pre>What is printed?`,
  choices:["10","16","4","24","None of the above"], ans:0,
  check:`
C = 0
for I in range(1, 5):
    for J in range(I, 0, -1):
        C += 1
RESULT = C`,
  why:`The inner loop counts down from I to 1, so it runs I times: once, then twice, then three
times, then four. The total is 1 + 2 + 3 + 4, or 10. A negative step reverses which direction counts as
passing the bound but changes nothing about how many values the counter takes, so this is the same
triangular count an upward loop from 1 to I would give.` },

{ id:"wl-16", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>X = 100
C = 0
while X &gt; 0
    X = X - 7
    C = C + 1
end while
output C</code></pre>What is printed?`,
  choices:["14", "13", "100", "16", "None of the above"], ans:4,
  check:`
X = 100
C = 0
while X > 0:
    X = X - 7
    C += 1
RESULT = C`,
  why:`After 14 passes X holds 100 minus 98, which is 2, and 2 is still greater than 0, so a
fifteenth pass runs and drives X to -5. The count is therefore 15 rather than 14. Dividing 100 by 7 and
taking the whole part gives 14, which is one short, because the loop keeps going until the value is
actually at or below zero. Since 15 is not among the four choices offered, the answer is None of the
above.` },

{ id:"wl-17", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>T = ""
for I = 5 to 1 step -1
    T = T + I
next I
output T</code></pre>What is printed?`,
  choices:["54321","12345","15","5","None of the above"], ans:0,
  check:`
T = ""
for I in range(5, 0, -1):
    T = T + str(I)
RESULT = T`,
  why:`The counter runs 5, 4, 3, 2, 1, and each pass appends the current value to the end of the
string, so the digits appear in the order they were visited. The plus here joins text rather than
adding numbers, which is why the answer is a five character string and not the sum 15.` },

{ id:"wl-18", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>C = 0
for I = 1 to 10
    for J = I to 10 step 2
        C = C + 1
    next J
next I
output C</code></pre>What is printed?`,
  choices:["30","55","100","25","None of the above"], ans:0,
  check:`
C = 0
for I in range(1, 11):
    for J in range(I, 11, 2):
        C += 1
RESULT = C`,
  why:`The inner loop starts at I and steps by 2, so it runs the whole part of (10 minus I) over
2, plus one. Counting down from I equal to 1 gives 5, 5, 4, 4, 3, 3, 2, 2, 1, and 1, which totals 30.
Building the small table of inner counts is much safer than trying to carry a single running total
across all thirty passes.` },

{ id:"wl-19", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>C = 0
for I = 1 to 3
    for J = 1 to 3
        for K = 1 to 3
            C = C + 1
        next K
    next J
next I
output C</code></pre>What is printed?`,
  choices:["27","9","3","6","None of the above"], ans:0,
  check:`
C = 0
for I in range(1, 4):
    for J in range(1, 4):
        for K in range(1, 4):
            C += 1
RESULT = C`,
  why:`None of the bounds depends on an outer counter, so the three loops are independent and the
body runs 3 times 3 times 3 times. Whenever the inner bounds are fixed, the count is a plain product,
and it is only when a bound mentions an outer counter that the triangular pattern appears instead.` },

{ id:"wl-20", kind:"problem", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>A = 5
B = 8
while A != B
    if A &lt; B then
        A = A + 1
    else
        B = B + 1
    end if
end while
output A</code></pre>What is printed?`,
  choices:["8","5","13","6","None of the above"], ans:0,
  check:`
A, B = 5, 8
while A != B:
    if A < B:
        A = A + 1
    else:
        B = B + 1
RESULT = A`,
  why:`Only the smaller of the two ever moves, so A climbs 6, 7, and then 8 while B stays where
it is, and the loop ends the moment they agree. The exit condition is equality rather than a
comparison, so what the loop computes is the larger of the two starting values. Had A begun above B, B
would have climbed to meet it and the answer would still have been the larger value.` }

]);
