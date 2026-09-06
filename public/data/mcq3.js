window.MCQ = (window.MCQ || []).concat([

{ id:"wd-01", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`Build the table and the answer stops being a judgment call. A runs 50, 40, 28, 14, and
then -2, while B runs 10, 12, 14, 16, and 18. Because the condition is tested before each pass
rather than after, the pass that begins with A holding 14 still runs and is what drives A negative.
Answering 14 means you stopped at the last value that looked reasonable instead of letting the final
pass finish.` },

{ id:"wd-02", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`Strings index from zero, so the characters sit as P at 0, R at 1, O at 2, G at 3, R at 4,
A at 5, and M at 6. A step of 2 visits indices 0, 2, 4, and 6, collecting P, O, R, and M. Since the
body appends the new character rather than prepending it, the order in which they were collected is
the order they appear, giving PORM.` },

{ id:"wd-03", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`The inner bound is tied to the outer counter, so the inner loop runs 4 times when I is 1,
then 3, then 2, then 1, and the body executes 4 + 3 + 2 + 1 times in all. Whenever you see the outer
counter appear in the inner bound, expect a triangular count of this kind rather than the product of
16 that two independent loops would give. Since 10 is not among the four choices offered, the answer
is None of the above.` },

{ id:"wd-04", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`This is Fibonacci written with a temporary variable, and the order of the three
assignments is doing all the work. Following the pairs (A, B) through the passes gives (1, 2), then
(2, 3), (3, 5), (5, 8), and finally (8, 13), so five passes leave B holding 13. Drop the temporary
and write A = B before computing T and you get a different sequence entirely, which is exactly why
the temporary is there.` },

{ id:"wd-05", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`The int function discards the fraction rather than rounding, so X runs 100, 33, 11, 3,
and 1, and the loop stops the moment X reaches 1. That is four passes. Any loop that divides rather
than subtracts finishes in a number of passes close to the logarithm, so it will always be far
shorter than the starting value suggests. Trace it anyway, because whether the exit test reads
greater than 1 or greater than 0 changes the count.` },

{ id:"wd-06", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`Because the loop moves left to right and only ever writes at I, every read reaches a
neighbor that has not been touched yet. A(1) becomes 3 plus 1, or 4, then A(2) becomes 1 plus 4, or
5, then A(3) becomes 4 plus 1, or 5, and A(4) becomes 1 plus 5, or 6. The sum asked for is therefore
4 plus 6. Had the loop run right to left, the reads would have hit already updated values and the
array would have come out differently.` },

{ id:"wd-07", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>S = "ABCDEFG"
T = S[2:5] + S[:2]
output T</code></pre>What is printed?`,
  choices:["CDEAB","CDEFAB","BCDAB","CDAB","None of the above"], ans:1,
  check:`substr("ABCDEFG", 2, 5) + substr("ABCDEFG", None, 2)`,
  why:`Both bounds are written, so they are positions and the second is included: S[2:5] collects
positions 2, 3, 4 and 5, which is CDEF. S[:2] has one bound, so it is a count, the first two
characters, AB. Joining them gives CDEFAB. CDEAB is what you get by stopping before position 5, which
is how Python reads the same notation and is not the rule ACSL uses.` },

{ id:"wd-08", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`This is the standard digit reversal, and recognizing it saves the trace. Each pass peels
the last digit off N with the modulo and pushes it onto R by multiplying R by 10 first, so R runs 4,
43, 432, and 4321 while N runs 123, 12, 1, and 0. Do confirm that the loop continues while N is
greater than 0 rather than greater than 9, since the second version would stop early and drop the
leading digit.` },

{ id:"wd-09", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`The multiples of 3 up to 20 are 3, 6, 9, 12, 15, and 18, which add to 63, but the
condition has a second half that also demands the number not be a multiple of 5. That removes 15 and
leaves 63 minus 15, or 48. The distractor 63 is what you get by reading only the first half of the
condition. Since 48 is not among the four choices offered, the answer is None of the above.` },

{ id:"wd-10", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`These three lines are the classic swap without a temporary variable, and recognizing the
idiom is safer than tracing it, because tracing it blind is easy to get backwards. Afterwards A holds
3 and B holds 7, so A times 10 plus B is 30 plus 7.` },

{ id:"wd-11", kind:"problem", topic:"wdtpd", level:"s",
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
with the one after it, which is why it stops at index 9 rather than 10: any further and S[I + 1]
would run off the end. The adjacent matching pairs are the SS at indices 2 and 3, the SS at 5 and 6,
and the PP at 8 and 9, so the count is 3.` },

{ id:"wd-12", kind:"problem", topic:"wdtpd", level:"s",
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
  why:`The second loop walks the main diagonal, meaning the cells where the row and column
subscripts are equal, so it picks up A(1, 1) equal to 4, A(2, 2) equal to 8, and A(3, 3) equal to 12.
Those add to 24. Draw the full three by three grid before summing anything, since it costs about ten
seconds and removes any chance of reaching for the wrong cells.` },

{ id:"wb-01", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`The first branch fires and leaves A holding 1. The second one then tests that new value
rather than the original 5, and since 1 is not greater than 3 nothing happens, so the program prints
1. Two separate if statements are not the same as an if with an else attached, precisely because the
first is free to change the value the second is about to test.` },

{ id:"wb-02", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`X is 5, so the outer condition fails and control passes straight to the outer else,
setting Z to 3. The inner branch never runs at all, which makes the value of Y irrelevant no matter
how deliberately the question sets it to 50. Answering 2 means you attached the inner else to the
outer if rather than to the if directly above it.` },

{ id:"wb-03", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`And binds tighter than or, so the condition reads as A greater than 5, or else the pair
of B less than 2 and C equal to 0 both holding. The first part is false, since 4 is not greater than
5, but the second part is true, since 1 is less than 2 and C is 0. A false or a true is true, so YES
is printed. Evaluating the line strictly left to right would give NO instead, which is what the
question is checking.` },

{ id:"wb-04", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`17 is odd, so the first test fails, and it is not a multiple of 3 either, so the second
fails as well. Control therefore reaches the final else and R becomes 18. In a chain of this shape at
most one branch ever runs, which is the whole difference between an else if and a run of separate if
statements.` },

{ id:"wb-05", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`A is 3 and B is 8, so A greater than B is false, and the exclamation point in front of it
turns that false into a true. The first branch therefore runs and C becomes 11. Overlook the negation
and you land in the else instead, which would give -5.` },

{ id:"wb-06", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`The even values 2, 4, and 6 add 12 between them, while each of the odd values 1, 3, and 5
subtracts a fixed 1 rather than subtracting itself, taking away 3 in total. S therefore ends at 9.
That fixed 1 in the else branch is exactly the sort of detail these problems turn on, since
subtracting I instead would give a very different answer. Since 9 is not among the four choices
offered, the answer is None of the above.` },

{ id:"wb-07", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`The first condition holds, so the three lines beneath it swap the values and leave A at 20
and B at 10. The second condition then tests 20 less than 10, which is false, so the else runs and
prints A minus B, or 10. Read as a whole, the program is a compact way of printing the positive
difference between two numbers whichever order they arrived in.` },

{ id:"wb-08", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`Each branch sees the value the previous one has just set, so all three fire one after
another and X finishes at 3. Rewrite those same three tests as an if followed by two else ifs and
only the first would ever run, leaving X at 1. Put side by side, this pair of programs is the
cleanest demonstration of why the distinction is worth keeping straight.` },

{ id:"wb-09", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`12 modulo 5 is 2 rather than 0, so the first branch fails. 12 is greater than 5, so the
second branch runs and prints that same remainder of 2. The third branch, which would have printed 5
modulo 12, is never reached at all.` },

{ id:"wb-10", kind:"problem", topic:"wdtpd-branching", level:"j",
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
  why:`For each value of I from 1 to 5 there is exactly one J that makes the sum 6, namely 6
minus I, and every one of those happens to fall inside the range 1 to 5, so the condition fires five
times. The pairs are (1, 5), (2, 4), (3, 3), (4, 2), and (5, 1), and it is worth noting that (3, 3)
counts once rather than twice even though both subscripts agree.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"wd-13", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>T = ""
for I = 1 to 3
    for J = 1 to I
        T = T + I
    next J
next I
output T</code></pre>What is printed?`,
  choices:["122333","123","111222333","321","None of the above"], ans:0,
  check:`
T = ""
for I in range(1,4):
    for J in range(1,I+1):
        T = T + str(I)
RESULT = T`,
  why:`The inner bound is tied to the outer counter, so the body runs once when I is 1, twice
when I is 2, and three times when I is 3, and each pass appends the current value of I. That gives one
1, two 2s, and three 3s in order. Note that J never appears in the body at all; its only job is to
control how many copies are written.` },

{ id:"wd-14", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>A = 1
B = 100
C = 0
while A &lt; B
    A = A * 2
    B = B - 10
    C = C + 1
end while
output C</code></pre>What is printed?`,
  choices:["6","5","7","10","None of the above"], ans:0,
  check:`
A, B = 1, 100
C = 0
while A < B:
    A = A * 2
    B = B - 10
    C += 1
RESULT = C`,
  why:`Two variables move at once, so the table needs two columns. A runs 2, 4, 8, 16, 32, and
64 while B runs 90, 80, 70, 60, 50, and 40. After the sixth pass A is 64 and B is 40, so the condition
fails and the loop stops. One value climbing while the other falls means they cross much sooner than
either would reach the other alone, which is why the count is far below what watching A on its own
would suggest.` },

{ id:"wd-15", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>A(1..5) = 5, 2, 9, 1, 7
for I = 1 to 4
    if A(I) &gt; A(I + 1) then
        swap A(I) and A(I + 1)
    end if
next I
output A</code></pre>What is printed?`,
  choices:["2 5 1 7 9","1 2 5 7 9","2 5 9 1 7","5 2 9 1 7","None of the above"], ans:0,
  check:`
A = [5,2,9,1,7]
for I in range(4):
    if A[I] > A[I+1]:
        A[I], A[I+1] = A[I+1], A[I]
RESULT = " ".join(str(x) for x in A)`,
  why:`This is a single pass of a bubble sort, not a full sort, so the array does not come out
ordered. Following it through, 5 and 2 swap, 5 and 9 do not, 9 and 1 swap, and 9 and 7 swap, leaving
2 5 1 7 9. What one pass does guarantee is that the largest value has been carried to the end, which
is why a complete bubble sort needs a pass for every element.` },

{ id:"wd-16", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>N = 987
S = 0
while N &gt; 0
    S = S + N % 10
    N = int(N / 10)
end while
output S</code></pre>What is printed?`,
  choices:["24","987","9","21","None of the above"], ans:0,
  check:`
N = 987
S = 0
while N > 0:
    S = S + N % 10
    N = N // 10
RESULT = S`,
  why:`Taking N modulo 10 peels off the last digit and dividing by 10 with the fraction discarded
removes it, so the loop visits 7, then 8, then 9, adding each to S. The total is 24. This digit sum
idiom appears constantly, and the pairing to remember is modulo to read a digit and integer division
to drop it.` },

{ id:"wd-17", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>S = "ABABABA"
C = 0
for I = 0 to 5
    if S[I] == "A" &amp;&amp; S[I + 1] == "B" then
        C = C + 1
    end if
next I
output C</code></pre>What is printed?`,
  choices:["3","4","2","6","None of the above"], ans:0,
  check:`
S = "ABABABA"
C = 0
for I in range(6):
    if S[I] == "A" and S[I+1] == "B":
        C += 1
RESULT = C`,
  why:`The loop counts places where an A is immediately followed by a B, and those start at
indices 0, 2, and 4. The A at index 6 is the last character, and the loop stops at index 5 precisely so
that S[I + 1] never runs off the end. Any loop that looks one place ahead has to stop one place early,
which is where the upper bound of 5 comes from.` },

{ id:"wd-18", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>N = 50
K = 0
while K * K &lt;= N
    K = K + 1
end while
output K - 1</code></pre>What is printed?`,
  choices:["7","8","6","25","None of the above"], ans:0,
  check:`
N, K = 50, 0
while K*K <= N:
    K = K + 1
RESULT = K - 1`,
  why:`The loop keeps raising K while its square still fits inside 50, so it exits the moment K
reaches 8, since 64 is over the limit while 49 is not. Printing K minus 1 therefore reports 7, which is
the integer square root. The subtraction at the end is the whole point: the loop always overshoots by
one before it can discover it has gone too far.` },

{ id:"wd-19", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>A = 84
B = 36
while B &gt; 0
    T = B
    B = A % B
    A = T
end while
output A</code></pre>What is printed?`,
  choices:["12","6","4","3024","None of the above"], ans:0,
  check:`
A, B = 84, 36
while B > 0:
    T = B
    B = A % B
    A = T
RESULT = A`,
  why:`This is the Euclidean algorithm written with a temporary, and what it computes is the
greatest common divisor. The pairs run (84, 36), then (36, 12), then (12, 0), at which point the loop
stops and A holds 12. The three assignments have to happen in that order, since computing A modulo B
after A has already been overwritten would use the wrong value.` },

{ id:"wd-20", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>A(1..5) = 3, 9, 2, 9, 4
M = 1
for I = 2 to 5
    if A(I) &gt; A(M) then
        M = I
    end if
next I
output M</code></pre>What is printed?`,
  choices:["2","4","9","5","None of the above"], ans:0,
  check:`
A = [3,9,2,9,4]
M = 0
for I in range(1,5):
    if A[I] > A[M]:
        M = I
RESULT = M + 1`,
  why:`M tracks the position of the largest value rather than the value itself, so the output is
a subscript. The 9 at position 2 replaces the initial 3, and the second 9 at position 4 does not
replace it, because the test is strictly greater than rather than greater than or equal to. The
program therefore reports the first of the tied maxima, and changing that one comparison would make it
report the last.` },

{ id:"wd-21", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>N = 91
C = 0
for D = 1 to N
    if N % D == 0 then
        C = C + 1
    end if
next D
output C</code></pre>What is printed?`,
  choices:["4","2","91","6","None of the above"], ans:0,
  check:`
N = 91
C = 0
for D in range(1, N+1):
    if N % D == 0:
        C += 1
RESULT = C`,
  why:`The loop counts the divisors of 91, and the answer is 4 because 91 is 7 times 13 rather
than prime, so its divisors are 1, 7, 13, and 91. Answering 2 means you took 91 for a prime, which is
the trap: it is odd, it is not a multiple of 3 or 5, and 7 is the first divisor anyone has to actually
test for.` },

{ id:"wd-22", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>S = 0
for I = 1 to 4
    for J = 1 to 4
        if I != J then
            S = S + I * J
        end if
    next J
next I
output S</code></pre>What is printed?`,
  choices:["100", "30", "60", "50", "None of the above"], ans:4,
  check:`
S = 0
for I in range(1,5):
    for J in range(1,5):
        if I != J:
            S = S + I*J
RESULT = S`,
  why:`Rather than adding twelve products one at a time, take the whole grid and subtract what
the condition excludes. The sum over every pair is (1 + 2 + 3 + 4) squared, which is 100, and the
excluded diagonal contributes 1 + 4 + 9 + 16, or 30, leaving 70. Subtracting the exceptions from a
total you can compute in one step is nearly always faster than enumerating what remains. Since 70 is
not among the four choices offered, the answer is None of the above.` },

{ id:"wd-23", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>S = "COMPUTER"
T = ""
for I = 0 to 7
    if S[I] is not a vowel then
        T = T + S[I]
    end if
next I
output T</code></pre>What is printed?`,
  choices:["CMPTR","OUE","COMPUTER","CMPTER","None of the above"], ans:0,
  check:`
S = "COMPUTER"
T = ""
for I in range(8):
    if S[I] not in "AEIOU":
        T = T + S[I]
RESULT = T`,
  why:`The vowels in COMPUTER are the O at index 1, the U at index 4, and the E at index 6, so
the surviving characters are C, M, P, T, and R in their original order. Because the body appends
rather than prepends, the order is preserved. The distractor CMPTER is what you get by missing the E,
which is easy to do when scanning quickly for vowels near the end of a word.` },

{ id:"wd-24", kind:"problem", topic:"wdtpd", level:"s",
  q:`<pre><code>X = 0
Y = 1
for I = 1 to 6
    X = X + Y
    Y = Y + X
next I
output X, Y</code></pre>What is printed?`,
  choices:["144 233","89 144","21 34","233 377","None of the above"], ans:0,
  check:`
X, Y = 0, 1
for I in range(1,7):
    X = X + Y
    Y = Y + X
RESULT = str(X) + " " + str(Y)`,
  why:`The second assignment uses the value the first has just produced, so each pass advances
the Fibonacci sequence by two places rather than one. Tracing the pairs gives (1, 2), (3, 5), (8, 13),
(21, 34), (55, 89), and (144, 233). Reordering those two lines would produce a completely different
sequence, which is exactly what makes this shape worth reading carefully rather than recognizing.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"wb-11", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>A = 7
B = 7
C = 7
if A == B then
    if B == C then
        output "ALL"
    else
        output "TWO"
    end if
else if A == C || B == C then
    output "TWO"
else
    output "NONE"
end if</code></pre>What is printed?`,
  choices:["ALL","TWO","NONE","ALLTWO","None of the above"], ans:0,
  check:`
A, B, C = 7, 7, 7
if A == B:
    if B == C:
        R = "ALL"
    else:
        R = "TWO"
elif A == C or B == C:
    R = "TWO"
else:
    R = "NONE"
RESULT = R`,
  why:`All three values agree, so the outer condition holds and control enters the inner branch
rather than testing the else if at all. Inside, B equals C as well, so ALL is printed. Exactly one
output line ever runs in a structure like this, which is why ALLTWO can be ruled out before doing any
work.` },

{ id:"wb-12", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>N = 0
for I = 1 to 10
    if I % 2 == 0 || I % 3 == 0 then
        N = N + 1
    end if
next I
output N</code></pre>What is printed?`,
  choices:["7","8","5","3","None of the above"], ans:0,
  check:`
N = 0
for I in range(1,11):
    if I % 2 == 0 or I % 3 == 0:
        N += 1
RESULT = N`,
  why:`Count each group and then remove the overlap. The multiples of 2 up to 10 are 2, 4, 6, 8,
and 10, which is five, and the multiples of 3 are 3, 6, and 9, which is three, but 6 belongs to both
and would otherwise be counted twice. So the answer is 5 plus 3 minus 1. Adding the two counts without
removing the overlap gives 8, which is the distractor sitting right beside the answer.` },

{ id:"wb-13", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>X = 15
if X &gt; 10 then
    X = X - 10
end if
if X &gt; 10 then
    X = X - 10
else
    X = X + 100
end if
output X</code></pre>What is printed?`,
  choices:["105","5","-5","115","None of the above"], ans:0,
  check:`
X = 15
if X > 10:
    X = X - 10
if X > 10:
    X = X - 10
else:
    X = X + 100
RESULT = X`,
  why:`The first branch fires and leaves X holding 5. The second structure then tests that new
value, and since 5 is not greater than 10 the else runs instead, adding 100 to give 105. The else
belongs to the second if only, so it is not an alternative to the first one, and reading it that way is
what produces the distractor 5.` },

{ id:"wb-14", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>A = 6
B = 4
if !(A &lt; B || A == B) then
    output A * B
else
    output A + B
end if</code></pre>What is printed?`,
  choices:["24","10","2","64","None of the above"], ans:0,
  check:`
A, B = 6, 4
if not (A < B or A == B):
    R = A * B
else:
    R = A + B
RESULT = R`,
  why:`Work inside the brackets first: A less than B is false and A equal to B is false, so the
or is false, and the negation in front of it makes the whole condition true. The first branch therefore
runs and prints 24. Read another way, the condition says not less and not equal, which is simply A
greater than B, and rewriting it that way is quicker than evaluating it piece by piece.` },

{ id:"wb-15", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>S = 0
for I = 1 to 7
    if I % 2 == 1 then
        S = S + I
    else if I % 4 == 0 then
        S = S - I
    end if
next I
output S</code></pre>What is printed?`,
  choices:["12","16","10","28","None of the above"], ans:0,
  check:`
S = 0
for I in range(1,8):
    if I % 2 == 1:
        S = S + I
    elif I % 4 == 0:
        S = S - I
RESULT = S`,
  why:`The odd values 1, 3, 5, and 7 add 16 between them. Among the even values only 4 is a
multiple of 4, so it subtracts 4, while 2 and 6 match neither test and change nothing at all. The total
is 16 minus 4. A chain of this shape leaves values that match no branch untouched, and forgetting that
is what produces 10.` },

{ id:"wb-16", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>G = 83
if G &gt;= 90 then
    output "A"
else if G &gt;= 80 then
    output "B"
else if G &gt;= 70 then
    output "C"
else
    output "F"
end if</code></pre>What is printed?`,
  choices:["B","A","C","BC","None of the above"], ans:0,
  check:`
G = 83
if G >= 90: R = "A"
elif G >= 80: R = "B"
elif G >= 70: R = "C"
else: R = "F"
RESULT = R`,
  why:`83 fails the first test and passes the second, so B is printed and the rest of the chain
is skipped entirely. The 83 also satisfies the third condition, and the only reason C is not printed as
well is that an else if chain stops at the first match. Written as three separate if statements the
same program would print both B and C.` },

{ id:"wb-17", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>A = 4
B = 9
C = 2
if A &gt; B then
    M = A
else
    M = B
end if
if C &gt; M then
    M = C
end if
output M</code></pre>What is printed?`,
  choices:["9","4","2","15","None of the above"], ans:0,
  check:`
A, B, C = 4, 9, 2
if A > B:
    M = A
else:
    M = B
if C > M:
    M = C
RESULT = M`,
  why:`The first structure picks the larger of A and B, which is 9, and the second gives C a
chance to displace it, which it does not, since 2 is smaller. The program is therefore the maximum of
three values built two at a time. Extending it to a fourth value needs one more if of the same shape,
which is why the pattern is worth recognizing rather than tracing.` },

{ id:"wb-18", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>C = 0
for I = 1 to 6
    for J = 1 to 6
        if I &lt; J &amp;&amp; (I + J) % 3 == 0 then
            C = C + 1
        end if
    next J
next I
output C</code></pre>What is printed?`,
  choices:["5","6","10","3","None of the above"], ans:0,
  check:`
C = 0
for I in range(1,7):
    for J in range(1,7):
        if I < J and (I+J) % 3 == 0:
            C += 1
RESULT = C`,
  why:`The first half of the condition means each unordered pair is counted at most once, with
the smaller value in I. Listing the pairs whose total is a multiple of 3 gives (1, 2), (1, 5), (2, 4),
(3, 6), and (4, 5), which is 5. Dropping the I less than J test would count every pair twice and give
10, which is the distractor.` },

{ id:"wb-19", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>X = 12
if X % 2 == 0 &amp;&amp; X % 3 == 0 then
    output X / 6
else if X % 2 == 0 then
    output X / 2
else
    output X
end if</code></pre>What is printed?`,
  choices:["2","6","12","4","None of the above"], ans:0,
  check:`
X = 12
if X % 2 == 0 and X % 3 == 0:
    R = X // 6
elif X % 2 == 0:
    R = X // 2
else:
    R = X
RESULT = R`,
  why:`12 is divisible by both 2 and 3, so the first branch runs and prints 12 divided by 6,
which is 2. The second branch would also have matched, since 12 is even, and the only reason it never
runs is that the chain stops at the first true condition. Ordering matters in a chain like this: put the
more specific test second and it can never fire.` },

{ id:"wb-20", kind:"problem", topic:"wdtpd-branching", level:"j",
  q:`<pre><code>A = 5
B = 0
if A &gt; 0 then
    B = B + 1
end if
if A &gt; 3 then
    B = B + 2
end if
if A &gt; 7 then
    B = B + 4
else
    B = B + 8
end if
output B</code></pre>What is printed?`,
  choices:["3", "7", "15", "9", "None of the above"], ans:4,
  check:`
A = 5
B = 0
if A > 0:
    B = B + 1
if A > 3:
    B = B + 2
if A > 7:
    B = B + 4
else:
    B = B + 8
RESULT = B`,
  why:`These are three separate structures rather than a chain, so every one of them is
evaluated. The first two conditions hold, adding 1 and then 2, and the third fails, so its else adds 8.
The total is 11. The distractor 3 is what you get by treating the three as a chain in which only the
first match runs. Since 11 is not among the four choices offered, the answer is None of the above.` }

]);
