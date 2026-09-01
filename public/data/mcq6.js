window.MCQ = (window.MCQ || []).concat([

{ id:"lp-01", topic:"lisp", level:"s",
  q:`Evaluate (MULT (ADD 6 5 0) (MULT 5 1 2 2) (DIV 6 (SUB 2 5))).`,
  choices:["-440","440","-220","-44","None of the above"], ans:0,
  check:`lisp('(MULT (ADD 6 5 0) (MULT 5 1 2 2) (DIV 6 (SUB 2 5)))')`,
  why:`Work innermost first. ADD 6 5 0 is 11. MULT 5 1 2 2 is 20. SUB 2 5 is -3, and DIV 6 by
-3 is -2. The outer MULT is 11 times 20 times -2, which is -440. The functions fold left to
right, which only matters for SUB and DIV.` },

{ id:"lp-02", topic:"lisp", level:"s",
  q:`Evaluate (CDR '((2 (3)) (4 (5 6) 7))).`,
  choices:["((4 (5 6) 7))","(4 (5 6) 7)","(2 (3))","((2 (3)))","None of the above"], ans:0,
  check:`lisp("(CDR '((2 (3)) (4 (5 6) 7)))")`,
  why:`The outer list has exactly two elements, and both of them are lists. CDR removes the
first element and returns what is left, which is a one element list whose single element is
(4 (5 6) 7). That is why the answer carries two layers of parentheses. Returning (4 (5 6) 7)
would be the answer to CAR of CDR, not CDR alone.` },

{ id:"lp-03", topic:"lisp", level:"s",
  q:`Evaluate (CAR (CDR (REVERSE '(1 2 (3 4) 5)))).`,
  choices:["(3 4)","5","(4 3)","2","None of the above"], ans:0,
  check:`lisp("(CAR (CDR (REVERSE '(1 2 (3 4) 5))))")`,
  why:`REVERSE flips the top level only, giving (5 (3 4) 2 1). The nested list (3 4) keeps its
own order, so (4 3) is wrong. CDR drops the 5, leaving ((3 4) 2 1). CAR then returns the first
element, which is the list (3 4).` },

{ id:"lp-04", topic:"lisp", level:"s",
  q:`Evaluate (CONS 9 '(1 2)).`,
  choices:["(9 1 2)","((9) 1 2)","(1 2 9)","(9 (1 2))","None of the above"], ans:0,
  check:`lisp("(CONS 9 '(1 2))")`,
  why:`CONS puts its first argument on the front of the list given as its second argument. The
result is a flat three element list. It does not nest the new value and it does not append to
the end, which rules out the other three.` },

{ id:"lp-05", topic:"lisp", level:"s",
  q:`Evaluate (CDR '(7)).`,
  choices:["()","7","(7)","NIL","None of the above"], ans:0,
  check:`lisp("(CDR '(7))")`,
  why:`CDR always returns a list, even when there is nothing left in it. Removing the only
element of a one element list leaves the empty list, written (). Answering 7 confuses CDR with
CAR, and answering (7) forgets that anything was removed.` },

{ id:"lp-06", topic:"lisp", level:"s",
  q:`Evaluate (SUB (ADD 1 2 3 4) (MULT 2 2 2) (DIV -9 2)).`,
  choices:["6","2","-6","10","None of the above"], ans:0,
  check:`lisp('(SUB (ADD 1 2 3 4) (MULT 2 2 2) (DIV -9 2))')`,
  why:`ADD gives 10, MULT gives 8, and DIV of -9 by 2 keeps the integer part rounding toward
zero, which is -4. Then SUB folds left to right: 10 minus 8 is 2, and 2 minus -4 is 6. The
rounding direction on the negative quotient is the whole difficulty here, since flooring would
give -5 and change the answer.` },

{ id:"lp-07", topic:"lisp", level:"s",
  q:`Evaluate (REVERSE '(1 (2 3) (4 (5)))).`,
  choices:["((4 (5)) (2 3) 1)","((5) 4) (3 2) 1)","(1 (3 2) ((5) 4))","((4 5) (2 3) 1)","None of the above"], ans:0,
  check:`lisp("(REVERSE '(1 (2 3) (4 (5))))")`,
  why:`REVERSE reorders the top level elements and leaves everything inside them alone. The
three elements are 1, (2 3), and (4 (5)), so reversed they are (4 (5)), (2 3), and 1. The
distractors all reverse the contents of the nested lists as well, which REVERSE never does.` },

{ id:"lp-08", topic:"lisp", level:"s",
  q:`If X is bound to the list (A B C D), what does (CADDR X) return?`,
  choices:["C","B","D","(C D)","None of the above"], ans:0,
  check:`lisp("(CAR (CDR (CDR '(A B C D))))")`,
  why:`Read the letters between the C and the R from right to left. CADDR is CAR of CDR of CDR.
The first CDR gives (B C D), the second gives (C D), and the CAR then gives C. In general CADDR
picks the third element of a list.` },

{ id:"lp-09", topic:"lisp", level:"s",
  q:`Evaluate (CONS (CAR '(8 9)) (CDR '(1 2 3))).`,
  choices:["(8 2 3)","(8 9 2 3)","((8) 2 3)","(8 1 2 3)","None of the above"], ans:0,
  check:`lisp("(CONS (CAR '(8 9)) (CDR '(1 2 3)))")`,
  why:`Evaluate the arguments first. CAR of (8 9) is 8, and CDR of (1 2 3) is (2 3). CONS then
puts 8 on the front of (2 3). The distractor (8 1 2 3) comes from forgetting that CDR already
removed the 1.` },

{ id:"lp-10", topic:"lisp", level:"s",
  q:`Evaluate (DIV 100 3 3).`,
  choices:["11","12","10","33","None of the above"], ans:0,
  check:`lisp('(DIV 100 3 3)')`,
  why:`DIV folds left to right and keeps the integer part at each step. 100 divided by 3 is
33, and 33 divided by 3 is 11. The folding habit matters most on SUB, where (SUB 20 5 3) is 12
and not 18, and on any DIV whose intermediate value goes negative, since the truncation happens
at every step rather than once at the end.` },

{ id:"lp-11", topic:"lisp", level:"s",
  q:`Evaluate (REVERSE (CONS '(1 2) '(3 4))).`,
  choices:["(4 3 (1 2))","((2 1) 4 3)","(4 3 1 2)","((1 2) 3 4)","None of the above"], ans:0,
  check:`lisp("(REVERSE (CONS '(1 2) '(3 4)))")`,
  why:`CONS puts the list (1 2) on the front of (3 4) as a single element, so the result is
((1 2) 3 4), a three element list. Reversing the top level gives (4 3 (1 2)). The nested list
stays in its own order, which rules out ((2 1) 4 3).` },

{ id:"lp-12", topic:"lisp", level:"s",
  q:`Which of these returns a list rather than an atom, no matter what nonempty list L holds?`,
  choices:["(CDR L)","(CAR L)","(CADR L)","(CAAR L)","None of the above"], ans:0,
  why:`CDR removes the first element and hands back what remains, which is always a list, even
when it is empty. CAR returns an element, which might be an atom or might itself be a list, so
its type depends on the contents of L. CADR and CAAR both end in a CAR, so they have the same
problem.` },

{ id:"wl-01", topic:"wdtpd-looping", level:"j",
  q:`How many times does the body run in for i = 1 to 10 step 4?`,
  choices:["3","2","4","10","None of the above"], ans:0,
  check:`str(len(list(range(1,11,4))))`,
  why:`The counter takes the values 1, 5, and 9. The next value would be 13, which is past 10,
so the loop stops. The formula is the integer part of (10 minus 1) divided by 4, plus one, which
is 2 plus 1.` },

{ id:"wl-02", topic:"wdtpd-looping", level:"j",
  q:`After for i = 1 to 5 finishes, what value does i hold?`,
  choices:["6","5","1","0","None of the above"], ans:0,
  check:`str(5+1)`,
  why:`The counter is incremented and then tested, so the loop exits with the first value that
fails the test. That value is 6, one past the limit. Problems that print the counter after the loop ends
are testing exactly this, and answering 5 is the most common mistake in the category.` },

{ id:"wl-03", topic:"wdtpd-looping", level:"j",
  q:`<pre><code>S = 0
for I = 10 to 1 step -3
    S = S + I
next I
output S</code></pre>What is printed?`,
  choices:["23", "21", "19", "25", "None of the above"], ans:4,
  check:`str(sum(range(10,0,-3)))`,
  why:`With a negative step the counter runs 10, 7, 4, and 1, stopping when the next value would
drop below 1. Those four values add to 22. A negative step means the loop stops when the counter
goes past the limit going down rather than up. The value 22 is not among the four choices offered, so the answer is None of the above.` },

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
  why:`A WHILE tests before the body, and 3 is not greater than 5, so the body never runs at all
and X keeps its starting value. If the answer to a WHILE question equals the starting value,
that is usually because the loop was never entered.` },

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
  why:`This is a running product, so it computes 1 times 2 times 3 times 4, which is 24. Note
that P starts at 1 rather than 0. A product accumulator started at 0 stays 0 forever, which is a
favorite trap in a related version of this question.` },

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
  why:`The inner loop runs completely for each pass of the outer loop, so the body executes 3
times 4 times. When the inner bound does not depend on the outer counter, the count is a plain
product.` },

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
  why:`N goes 40, 20, 10, 5, 2, 1, which is five halvings. The loop stops when N reaches 1
because the test demands greater than 1. A loop that divides rather than subtracts always
finishes in far fewer passes than the starting value suggests.` },

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
  why:`The inner loop adds 1 through I. For I equal to 1 through 5 those sums are 1, 3, 6, 10,
and 15, which total 35. Build a small table of the inner sums rather than tracking one running
total across fifteen passes. The value 35 is not among the four choices offered, so the answer is None of the above.` },

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
  why:`A runs 1, 3, 9, 27, 81, then 243. The pass that starts with A at 81 still runs, because
81 is less than 100, and it pushes A past the limit. The loop stops after the value exceeds the
bound, not when it reaches it.` },

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
  why:`The multiples of 4 up to 20 are 4, 8, 12, 16, and 20, which is five values. Since the
FOR bound is inclusive, 20 counts. Making the bound exclusive would drop it and give 4.` }

]);
