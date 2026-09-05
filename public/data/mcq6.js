window.MCQ = (window.MCQ || []).concat([

{ id:"lp-01", topic:"lisp", level:"s",
  q:`Evaluate (MULT (ADD 6 5 0) (MULT 5 1 2 2) (DIV 6 (SUB 2 5))).`,
  choices:["-440","440","-220","-44","None of the above"], ans:0,
  check:`lisp('(MULT (ADD 6 5 0) (MULT 5 1 2 2) (DIV 6 (SUB 2 5)))')`,
  why:`Reduce the innermost complete brackets first and work outward. ADD 6 5 0 is 11, the inner
MULT 5 1 2 2 is 20, SUB 2 5 is -3, and dividing 6 by -3 gives -2. The outer MULT is then 11 times 20
times -2, or -440. Note the two shapes in play here: ADD and MULT are written (ADD x1 x2 ...) and take
as many arguments as you give them, while SUB and DIV are written (SUB a b) and (DIV a b) and take
exactly two.` },

{ id:"lp-02", topic:"lisp", level:"s",
  q:`Evaluate (CDR '((2 (3)) (4 (5 6) 7))).`,
  choices:["((4 (5 6) 7))","(4 (5 6) 7)","(2 (3))","((2 (3)))","None of the above"], ans:0,
  check:`lisp("(CDR '((2 (3)) (4 (5 6) 7)))")`,
  why:`The outer list has exactly two elements and both of them happen to be lists themselves.
CDR removes the first and hands back what remains, which is a list of one element, and that element
is (4 (5 6) 7). That is where the second layer of brackets comes from. Answering (4 (5 6) 7) would be
right for CAR of CDR, but CDR alone always returns a list rather than an element.` },

{ id:"lp-03", topic:"lisp", level:"s",
  q:`Evaluate (CAR (CDR (REVERSE '(1 2 (3 4) 5)))).`,
  choices:["(3 4)","5","(4 3)","2","None of the above"], ans:0,
  check:`lisp("(CAR (CDR (REVERSE '(1 2 (3 4) 5))))")`,
  why:`REVERSE only touches the top level, so it turns the list into (5 (3 4) 2 1) while leaving
the nested (3 4) in its own order, which is why (4 3) is wrong. CDR then drops the 5 to leave
((3 4) 2 1), and CAR returns the first element of that, which is the list (3 4) rather than a
number.` },

{ id:"lp-04", topic:"lisp", level:"s",
  q:`Evaluate (CONS 9 '(1 2)).`,
  choices:["(9 1 2)","((9) 1 2)","(1 2 9)","(9 (1 2))","None of the above"], ans:0,
  check:`lisp("(CONS 9 '(1 2))")`,
  why:`CONS places its first argument on the front of the list given as its second, producing a
flat list of three elements. It does not wrap the new value in brackets of its own and it does not
append to the end, which is enough to rule out the other three choices without evaluating anything.` },

{ id:"lp-05", topic:"lisp", level:"s",
  q:`Evaluate (CDR '(7)).`,
  choices:["()","7","(7)","NIL","None of the above"], ans:0,
  check:`lisp("(CDR '(7))")`,
  why:`CDR always hands back a list, even when nothing is left in it, so removing the only
element of a one element list leaves the empty list, written (). Answering 7 confuses CDR with CAR,
which would return the element itself, and answering (7) overlooks that anything was removed at
all.` },

{ id:"lp-06", topic:"lisp", level:"s",
  q:`Evaluate (SUB (ADD 1 2 3 4) (DIV -9 2)).`,
  choices:["14.5","5.5","10","-14.5","None of the above"], ans:0,
  check:`lisp('(SUB (ADD 1 2 3 4) (DIV -9 2))')`,
  why:`ADD takes as many arguments as you give it, so (ADD 1 2 3 4) is 10. DIV takes exactly two and
performs ordinary division, so (DIV -9 2) is -4.5 and not -4: nothing is truncated unless a problem
says so. Subtracting a negative adds, so 10 minus -4.5 is 14.5. Reading DIV as integer division gives
-4 and a final answer of 14, which is the assumption most students bring in from other languages.` },

{ id:"lp-07", topic:"lisp", level:"s",
  q:`Evaluate (REVERSE '(1 (2 3) (4 (5)))).`,
  choices:["((4 (5)) (2 3) 1)","((5) 4) (3 2) 1)","(1 (3 2) ((5) 4))","((4 5) (2 3) 1)","None of the above"], ans:0,
  check:`lisp("(REVERSE '(1 (2 3) (4 (5))))")`,
  why:`REVERSE reorders the top level elements and leaves whatever is inside them exactly as it
was. The three elements here are 1, then (2 3), then (4 (5)), so reversing gives (4 (5)), (2 3), and 1.
Every distractor reverses the contents of the nested lists as well, which REVERSE never does at any
depth.` },

{ id:"lp-08", topic:"lisp", level:"s",
  q:`If X is bound to the list (A B C D), what does (CADDR X) return?`,
  choices:["C","B","D","(C D)","None of the above"], ans:0,
  check:`lisp("(CAR (CDR (CDR '(A B C D))))")`,
  why:`Read the letters between the C and the R from right to left, so CADDR is CAR of CDR of
CDR. Applying that to the list, the first CDR gives (B C D), the second gives (C D), and the CAR then
returns C. Read generally, CADDR picks out the third element, and the pattern extends to longer chains
the same way.` },

{ id:"lp-09", topic:"lisp", level:"s",
  q:`Evaluate (CONS (CAR '(8 9)) (CDR '(1 2 3))).`,
  choices:["(8 2 3)","(8 9 2 3)","((8) 2 3)","(8 1 2 3)","None of the above"], ans:0,
  check:`lisp("(CONS (CAR '(8 9)) (CDR '(1 2 3)))")`,
  why:`Evaluate the two arguments before applying CONS. CAR of (8 9) is 8, and CDR of (1 2 3) is
(2 3), so CONS puts 8 on the front of (2 3). The distractor (8 1 2 3) comes from forgetting that the
CDR has already removed the 1 before CONS ever sees the list.` },

{ id:"lp-10", topic:"lisp", level:"s",
  q:`Evaluate (DIV 100 8).`,
  choices:["12.5","12","13","800","None of the above"], ans:0,
  check:`lisp('(DIV 100 8)')`,
  why:`DIV is ordinary division and keeps the fraction, so (DIV 100 8) is 12.5. Every language most
students have written in returns 12 for integer operands, which is why 12 sits in the choices, but
ACSL only gives you a whole number when the division happens to come out even. DIV also takes exactly
two arguments, so if you ever want 100 divided by 4 and then by 2, nest it as (DIV (DIV 100 4) 2).` },

{ id:"lp-11", topic:"lisp", level:"s",
  q:`Evaluate (REVERSE (CONS '(1 2) '(3 4))).`,
  choices:["(4 3 (1 2))","((2 1) 4 3)","(4 3 1 2)","((1 2) 3 4)","None of the above"], ans:0,
  check:`lisp("(REVERSE (CONS '(1 2) '(3 4)))")`,
  why:`CONS places the list (1 2) on the front of (3 4) as a single element, so the result is
((1 2) 3 4), which is a list of three things rather than four. Reversing the top level of that gives
(4 3 (1 2)), with the nested list still reading in its original order, which is what rules out
((2 1) 4 3).` },

{ id:"lp-12", topic:"lisp", level:"s",
  q:`Which of these always returns a list for every nonempty list L?`,
  choices:["(CDR L)","(CAR L)","(CADR L)","(CAAR L)","None of the above"], ans:0,
  why:`CDR removes the first element and returns everything that remains, and what remains is
always a list. For a one-element input, it is NIL, which is both an atom and the empty list. CAR returns an element
instead, and that element might be an atom or might itself be a list. CADR and CAAR both finish with a
CAR, so they inherit the same uncertainty.` },

{ id:"wl-01", topic:"wdtpd-looping", level:"j",
  q:`How many times does the body run in for i = 1 to 10 step 4?`,
  choices:["3","2","4","10","None of the above"], ans:0,
  check:`str(len(list(range(1,11,4))))`,
  why:`The counter takes the values 1, 5, and 9, and stops there because the next value would be
13, which is past the limit of 10. If you would rather not list them, the count is the integer part of
10 minus 1 divided by 4, plus one, which comes to the same three.` },

{ id:"wl-02", topic:"wdtpd-looping", level:"j",
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

{ id:"wl-03", topic:"wdtpd-looping", level:"j",
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

{ id:"wl-04", topic:"wdtpd-looping", level:"j",
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

{ id:"wl-05", topic:"wdtpd-looping", level:"j",
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

{ id:"wl-06", topic:"wdtpd-looping", level:"j",
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

{ id:"wl-07", topic:"wdtpd-looping", level:"j",
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

{ id:"wl-08", topic:"wdtpd-looping", level:"j",
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

{ id:"wl-09", topic:"wdtpd-looping", level:"j",
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

{ id:"wl-10", topic:"wdtpd-looping", level:"j",
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
