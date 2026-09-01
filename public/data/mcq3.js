window.MCQ = (window.MCQ || []).concat([

{ id:"wd-01", topic:"wdtpd", level:"s",
  q:`<pre><code>A = 50
B = 10
while A &gt; 0
    A = A - B
    B = B + 2
end while
output A</code></pre>What is printed?`,
  choices:["-2","14","0","2","None of the above"], ans:0,
  check:`
A, B = 50, 10
while A > 0:
    A = A - B
    B = B + 2
RESULT = A`,
  why:`Trace with a table. A goes 50, 40, 28, 14, then -2, while B goes 10, 12, 14, 16, 18. The
loop condition is checked before each pass, so the pass that starts with A equal to 14 still
runs and drives A negative. Answering 14 means you stopped when A was still positive instead of
letting the last pass finish.` },

{ id:"wd-02", topic:"wdtpd", level:"s",
  q:`<pre><code>S = "PROGRAM"
T = ""
for I = 0 to 6 step 2
    T = T + S[I]
next I
output T</code></pre>What is printed?`,
  choices:["PORM","PRGA","RORM","PORA","None of the above"], ans:0,
  check:`
S = "PROGRAM"
T = ""
for I in range(0, 7, 2):
    T = T + S[I]
RESULT = T`,
  why:`Strings index from 0, so the characters are P at 0, R at 1, O at 2, G at 3, R at 4, A at
5, and M at 6. The loop visits 0, 2, 4, and 6, picking up P, O, R, and M. Since the body
appends rather than prepends, the order is preserved and the result is PORM.` },

{ id:"wd-03", topic:"wdtpd", level:"s",
  q:`<pre><code>N = 0
for I = 1 to 4
    for J = I to 4
        N = N + 1
    next J
next I
output N</code></pre>What is printed?`,
  choices:["11", "16", "12", "6", "None of the above"], ans:4,
  check:`
N = 0
for I in range(1, 5):
    for J in range(I, 5):
        N += 1
RESULT = N`,
  why:`The inner loop runs 4 times when I is 1, then 3, then 2, then 1, so the body executes
4 + 3 + 2 + 1 times. Whenever the inner bound is tied to the outer counter, expect a triangular
count like this rather than the product 16. The value 10 is not among the four choices offered, so the answer is None of the above.` },

{ id:"wd-04", topic:"wdtpd", level:"s",
  q:`<pre><code>A = 1
B = 1
for I = 1 to 5
    T = A + B
    A = B
    B = T
next I
output B</code></pre>What is printed?`,
  choices:["13","8","21","5","None of the above"], ans:0,
  check:`
A = B = 1
for I in range(5):
    T = A + B
    A = B
    B = T
RESULT = B`,
  why:`This is Fibonacci with a temporary. After the passes, the pairs (A, B) go (1, 2),
(2, 3), (3, 5), (5, 8), and (8, 13). Five passes leaves B at 13. Dropping the temporary and
writing A = B before computing T would give a completely different sequence, which is why the
order of the three assignments matters.` },

{ id:"wd-05", topic:"wdtpd", level:"s",
  q:`<pre><code>X = 100
C = 0
while X &gt; 1
    X = int(X / 3)
    C = C + 1
end while
output C</code></pre>What is printed?`,
  choices:["4","5","3","6","None of the above"], ans:0,
  check:`
X, C = 100, 0
while X > 1:
    X = X // 3
    C += 1
RESULT = C`,
  why:`The int function throws away the fraction, so X goes 100, 33, 11, 3, 1 and the loop stops
when X reaches 1. That is four passes. A loop that divides each time has a count near the
logarithm, so it will always be short. Trace it rather than guessing, because whether the exit
test is greater than 1 or greater than 0 changes the count.` },

{ id:"wd-06", topic:"wdtpd", level:"s",
  q:`<pre><code>A(1) = 3
A(2) = 1
A(3) = 4
A(4) = 1
A(5) = 5
for I = 1 to 4
    A(I) = A(I) + A(I + 1)
next I
output A(1) + A(4)</code></pre>What is printed?`,
  choices:["10","9","11","12","None of the above"], ans:0,
  check:`
A = {1:3, 2:1, 3:4, 4:1, 5:5}
for I in range(1, 5):
    A[I] = A[I] + A[I+1]
RESULT = A[1] + A[4]`,
  why:`Each pass reads a neighbor that has not been changed yet, since the loop moves left to
right and writes only at I. A(1) becomes 3 + 1 = 4, A(2) becomes 1 + 4 = 5, A(3) becomes
4 + 1 = 5, and A(4) becomes 1 + 5 = 6. So A(1) + A(4) is 4 + 6, which is 10. If the loop ran
right to left the reads would hit already updated values and the answer would differ.` },

{ id:"wd-07", topic:"wdtpd", level:"s",
  q:`<pre><code>S = "ABCDEFG"
T = S[2:5] + S[:2]
output T</code></pre>What is printed?`,
  choices:["CDEAB","CDEFAB","BCDAB","CDAB","None of the above"], ans:0,
  check:`
S = "ABCDEFG"
RESULT = S[2:5] + S[:2]`,
  why:`A slice runs from the first index up to but not including the second, so S[2:5] takes
indices 2, 3, and 4, which is CDE. The slice S[:2] takes indices 0 and 1, which is AB.
Concatenating gives CDEAB. Reading the second bound as inclusive would give CDEFAB, which is
the distractor.` },

{ id:"wd-08", topic:"wdtpd", level:"s",
  q:`<pre><code>N = 1234
R = 0
while N &gt; 0
    R = R * 10 + N % 10
    N = int(N / 10)
end while
output R</code></pre>What is printed?`,
  choices:["4321","1234","10","4","None of the above"], ans:0,
  check:`
N, R = 1234, 0
while N > 0:
    R = R*10 + N % 10
    N = N // 10
RESULT = R`,
  why:`This is the standard digit reversal. Each pass peels the last digit off N with the
modulo and pushes it onto R by multiplying R by 10 first. R goes 4, 43, 432, 4321 while N goes
123, 12, 1, 0. Recognizing the pattern lets you answer without tracing, but confirm the loop
runs while N is greater than 0 rather than greater than 9, since the latter would drop the
leading digit.` },

{ id:"wd-09", topic:"wdtpd", level:"s",
  q:`<pre><code>C = 0
for I = 1 to 20
    if I % 3 == 0 &amp;&amp; I % 5 != 0 then
        C = C + I
    end if
next I
output C</code></pre>What is printed?`,
  choices:["49", "63", "45", "33", "None of the above"], ans:4,
  check:`
RESULT = sum(I for I in range(1,21) if I % 3 == 0 and I % 5 != 0)`,
  why:`The multiples of 3 up to 20 are 3, 6, 9, 12, 15, and 18, adding to 63. The condition
also demands that the number is not a multiple of 5, which removes 15. So the total is 63 minus
15, which is 48. The distractor 63 is what you get by ignoring the second half of the
condition. The value 48 is not among the four choices offered, so the answer is None of the above.` },

{ id:"wd-10", topic:"wdtpd", level:"s",
  q:`<pre><code>A = 7
B = 3
A = A + B
B = A - B
A = A - B
output A * 10 + B</code></pre>What is printed?`,
  choices:["37","73","107","70","None of the above"], ans:0,
  check:`
A, B = 7, 3
A = A + B
B = A - B
A = A - B
RESULT = A*10 + B`,
  why:`This is the swap without a temporary variable. After the three lines, A holds 3 and B
holds 7. So A times 10 plus B is 30 plus 7, which is 37. The point of the question is
recognizing the idiom, because tracing it blindly is easy to get backwards.` },

{ id:"wd-11", topic:"wdtpd", level:"s",
  q:`<pre><code>S = "MISSISSIPPI"
C = 0
for I = 0 to 9
    if S[I] == S[I + 1] then
        C = C + 1
    end if
next I
output C</code></pre>What is printed?`,
  choices:["3","4","2","5","None of the above"], ans:0,
  check:`
S = "MISSISSIPPI"
RESULT = sum(1 for I in range(10) if S[I] == S[I+1])`,
  why:`The word has eleven letters at indices 0 through 10, and the loop compares each letter
with the next one, stopping at index 9 so that S[I + 1] stays in range. The adjacent equal
pairs are SS at indices 2 and 3, SS at 5 and 6, and PP at 8 and 9. That is three. The loop
bound of 9 rather than 10 is the detail that makes this program legal.` },

{ id:"wd-12", topic:"wdtpd", level:"s",
  q:`<pre><code>M = 0
for I = 1 to 3
    for J = 1 to 3
        A(I, J) = I * 3 + J
    next J
next I
for I = 1 to 3
    M = M + A(I, I)
next I
output M</code></pre>What is printed?`,
  choices:["24","18","30","15","None of the above"], ans:0,
  check:`
A = {}
for I in range(1,4):
    for J in range(1,4):
        A[(I,J)] = I*3 + J
RESULT = sum(A[(I,I)] for I in range(1,4))`,
  why:`The second loop sums the main diagonal, where the row equals the column. Those cells are
A(1, 1) = 4, A(2, 2) = 8, and A(3, 3) = 12, adding to 24. Build the whole three by three grid
on paper before summing, since it takes ten seconds and removes any chance of grabbing the
wrong cells.` },

{ id:"wb-01", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>A = 5
if A &gt; 3 then
    A = A - 4
end if
if A &gt; 3 then
    A = A * 10
end if
output A</code></pre>What is printed?`,
  choices:["1","10","50","5","None of the above"], ans:0,
  check:`
A = 5
if A > 3: A = A - 4
if A > 3: A = A * 10
RESULT = A`,
  why:`The first IF is true, so A becomes 1. The second IF tests the new value of A, not the
original 5, and 1 is not greater than 3, so nothing happens. The answer is 1. Two separate IF
statements are not the same as an IF and an ELSE, because the first one can change the value
the second one tests.` },

{ id:"wb-02", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>X = 5
Y = 50
if X &gt; 10 then
    if Y &gt; 10 then
        Z = 1
    else
        Z = 2
    end if
else
    Z = 3
end if
output Z</code></pre>What is printed?`,
  choices:["3","2","1","0","None of the above"], ans:0,
  check:`
X, Y = 5, 50
if X > 10:
    Z = 1 if Y > 10 else 2
else:
    Z = 3
RESULT = Z`,
  why:`X is 5, so the outer condition fails and control goes straight to the outer ELSE, making
Z equal to 3. The inner IF never runs at all, so the value of Y is irrelevant. Answering 2
means you attached the inner ELSE to the outer IF.` },

{ id:"wb-03", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>A = 4
B = 1
C = 0
if A &gt; 5 || B &lt; 2 &amp;&amp; C == 0 then
    output "YES"
else
    output "NO"
end if</code></pre>What is printed?`,
  choices:["YES","NO","YESNO","nothing","None of the above"], ans:0,
  check:`
A, B, C = 4, 1, 0
RESULT = "YES" if (A > 5 or (B < 2 and C == 0)) else "NO"`,
  why:`AND binds tighter than OR, so the condition means A greater than 5, OR the pair of B less
than 2 and C equal to 0. The first part is false since 4 is not greater than 5. The second part
is true since 1 is less than 2 and C is 0. A false OR a true is true, so YES is printed.
Evaluating strictly left to right instead would give NO.` },

{ id:"wb-04", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>N = 17
if N % 2 == 0 then
    R = N / 2
else if N % 3 == 0 then
    R = N / 3
else
    R = N + 1
end if
output R</code></pre>What is printed?`,
  choices:["18","8.5","17","6","None of the above"], ans:0,
  check:`
N = 17
if N % 2 == 0: R = N / 2
elif N % 3 == 0: R = N / 3
else: R = N + 1
RESULT = R`,
  why:`17 is odd, so the first test fails. 17 is not a multiple of 3, so the second fails too.
Control reaches the final ELSE and R becomes 18. In a chain like this at most one branch runs,
which is the difference between ELSE IF and a run of separate IF statements.` },

{ id:"wb-05", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>A = 3
B = 8
if !(A &gt; B) then
    C = A + B
else
    C = A - B
end if
output C</code></pre>What is printed?`,
  choices:["11","-5","5","-11","None of the above"], ans:0,
  check:`
A, B = 3, 8
C = A + B if not (A > B) else A - B
RESULT = C`,
  why:`A is 3 and B is 8, so A greater than B is false, and the exclamation point flips that to
true. The THEN branch runs and C becomes 11. Dropping the negation would send you to the ELSE
and give -5.` },

{ id:"wb-06", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>S = 0
for I = 1 to 6
    if I % 2 == 0 then
        S = S + I
    else
        S = S - 1
    end if
next I
output S</code></pre>What is printed?`,
  choices:["10", "12", "6", "15", "None of the above"], ans:4,
  check:`
S = 0
for I in range(1,7):
    S = S + I if I % 2 == 0 else S - 1
RESULT = S`,
  why:`The even values 2, 4, and 6 add up to 12, and the odd values 1, 3, and 5 each subtract 1,
for a total of -3. So S ends at 9. Notice the ELSE subtracts a fixed 1 rather than the value of
I, which is exactly the kind of detail these problems hinge on. The value 9 is not among the four choices offered, so the answer is None of the above.` },

{ id:"wb-07", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>A = 10
B = 20
if A &lt; B then
    T = A
    A = B
    B = T
end if
if A &lt; B then
    output "SWAPPED TWICE"
else
    output A - B
end if</code></pre>What is printed?`,
  choices:["10","-10","SWAPPED TWICE","20","None of the above"], ans:0,
  check:`
A, B = 10, 20
if A < B:
    A, B = B, A
RESULT = "SWAPPED TWICE" if A < B else A - B`,
  why:`The first IF is true, so the three lines swap the values and leave A at 20 and B at 10.
The second IF now tests 20 less than 10, which is false, so the ELSE prints A minus B, which is
10. The program is a compact way of printing the positive difference.` },

{ id:"wb-08", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>X = 0
if X == 0 then
    X = 1
end if
if X == 1 then
    X = 2
end if
if X == 2 then
    X = 3
end if
output X</code></pre>What is printed?`,
  choices:["3","1","2","0","None of the above"], ans:0,
  check:`
X = 0
if X == 0: X = 1
if X == 1: X = 2
if X == 2: X = 3
RESULT = X`,
  why:`Each IF sees the value the previous one just set, so all three fire in a chain and X ends
at 3. Rewrite the same three tests as IF, ELSE IF, ELSE IF and only the first would run, leaving
X at 1. This pair of programs is the cleanest illustration of why the distinction matters.` },

{ id:"wb-09", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>A = 12
B = 5
if A % B == 0 then
    output "DIVIDES"
else if A &gt; B then
    output A % B
else
    output B % A
end if</code></pre>What is printed?`,
  choices:["2","DIVIDES","5","0","None of the above"], ans:0,
  check:`
A, B = 12, 5
if A % B == 0: RESULT = "DIVIDES"
elif A > B: RESULT = A % B
else: RESULT = B % A
RESULT = RESULT`,
  why:`12 modulo 5 is 2, not 0, so the first branch fails. 12 is greater than 5, so the second
branch runs and prints 2. The third branch, which would print 5 modulo 12, is never reached.` },

{ id:"wb-10", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>C = 0
for I = 1 to 5
    for J = 1 to 5
        if I + J == 6 then
            C = C + 1
        end if
    next J
next I
output C</code></pre>What is printed?`,
  choices:["5","4","6","25","None of the above"], ans:0,
  check:`
RESULT = sum(1 for I in range(1,6) for J in range(1,6) if I+J == 6)`,
  why:`For each I from 1 to 5 there is exactly one J that makes the sum 6, namely 6 minus I, and
every one of those falls between 1 and 5. So the condition fires five times. The pairs are
(1, 5), (2, 4), (3, 3), (4, 2), and (5, 1), and (3, 3) counts once even though both values
match.` }

]);
