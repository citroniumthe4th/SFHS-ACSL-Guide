window.MCQ = (window.MCQ || []).concat([

{ id:"rf-01", kind:"problem", topic:"recursive-functions", level:"b",
  q:`Find f(21), given:
<div class="cases"><div class="fn">f(x) =</div><div class="rows">
<div><span>f(x &minus; 4) + 3</span><span>if x &gt; 6</span></div>
<div><span>2x</span><span>otherwise</span></div>
</div></div>`,
  choices:["22","19","25","16","None of the above"], ans:0,
  check:`
def f(x):
    return f(x-4)+3 if x > 6 else 2*x
RESULT = f(21)`,
  why:`Rather than writing all five lines out, notice that every level does the same two things:
it drops the argument by 4 and adds 3 on the way back. Stepping down from 21 gives 17, 13, 9, and 5,
at which point the argument is no longer above 6 and the second rule answers with 2 times 5, or 10.
Four levels each contribute a 3, so the answer is 10 plus 12. Counting the steps like this is faster
than tracing, but only once you have confirmed where the chain actually stops.` },

{ id:"rf-02", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(10, 7), given:
<div class="cases"><div class="fn">f(x, y) =</div><div class="rows">
<div><span>f(x &minus; y, y &minus; 1) + 2</span><span>if x &gt; y</span></div>
<div><span>x + y</span><span>otherwise</span></div>
</div></div>`,
  choices:["11","9","13","7","None of the above"], ans:0,
  check:`
def f(x,y):
    return f(x-y,y-1)+2 if x > y else x+y
RESULT = f(10,7)`,
  why:`Since 10 is greater than 7, the first rule applies and f(10, 7) becomes f(3, 6) + 2. Now
3 is not greater than 6, so the second rule answers outright with 3 plus 6, or 9, and adding the
single 2 that was left waiting gives 11. The chain is short here, which is the danger: with two
arguments it is easy to move one and forget the other, so write both on every line even when one of
them does not change.` },

{ id:"rf-03", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(f(f(f(14)))), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>[n / 3] + 2</span><span>if n &gt; 5</span></div>
<div><span>n &minus; 1</span><span>otherwise</span></div>
</div></div>
<p class="note">Note: [y] is the greatest integer less than or equal to y.</p>`,
  choices:["2","5","8","10","None of the above"], ans:0,
  check:`
def f(n):
    return n//3 + 2 if n > 5 else n - 1
RESULT = f(f(f(f(14))))`,
  why:`The function is applied four times, working from the innermost call outward. f(14) takes
the first rule and gives 4 plus 2, which is 6, and f(6) takes it again to give 2 plus 2, which is 4.
At that point 4 is no longer greater than 5, so the second rule takes over and f(4) is 3, then f(3)
is 2. The boundary is doing real work here, since 6 still qualifies for the first rule and 5 would
not.` },

{ id:"rf-04", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Recursion works on strings as well as numbers. Using the rules of ACSL pseudocode, what is
the value of f("python")?
<div class="cases"><div class="fn">f(s) =</div><div class="rows">
<div><span>s</span><span>if len(s) &le; 1</span></div>
<div><span>f(s&prime;) + s[1] + s[0]</span><span>otherwise</span></div>
</div></div>
<p class="note">Here s&prime; means s with its first two characters removed.</p>`,
  choices:["nohtyp","python","pnyoth","npoyht","None of the above"], ans:0,
  check:`
def f(s):
    return s if len(s) <= 1 else f(s[2:]) + s[1] + s[0]
RESULT = f("python")`,
  why:`The definition peels two characters off the front and hangs them back on the end in
swapped order, so work inward first. f("python") is f("thon") followed by "yp", f("thon") is f("on")
followed by "ht", and f("on") is f("") followed by "no", which is just "no". Winding back up gives
"no", then "noht", then "nohtyp". Notice that the base case fires on the empty string rather than on
a single character, which it can do only because "python" has even length.` },

{ id:"rf-05", kind:"problem", topic:"recursive-functions", level:"b",
  q:`Find f(11), given:
<div class="cases"><div class="fn">f(x) =</div><div class="rows">
<div><span>f(x &minus; 3) + 1</span><span>if x &gt; 0</span></div>
<div><span>3x</span><span>otherwise</span></div>
</div></div>`,
  choices:["1","4","-2","5","None of the above"], ans:0,
  check:`
def f(x):
    return f(x-3)+1 if x > 0 else 3*x
RESULT = f(11)`,
  why:`The chain runs 11, 8, 5, 2, and then -1, and only that last value fails the condition, so
the base case gives 3 times -1, or -3. Four levels each add 1 on the way back up, bringing the total
to 1. Had the condition read greater than or equal to 0, the chain would have stopped at 2 instead
and the answer would have been completely different, which is why the inequality deserves a look
before you start.` },

{ id:"rf-06", kind:"problem", topic:"recursive-functions", level:"b",
  q:`Find f(10), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + f(n &minus; 2)</span><span>if n &gt; 1</span></div>
<div><span>n</span><span>otherwise</span></div>
</div></div>`,
  choices:["56", "89", "34", "64", "None of the above"], ans:4,
  check:`
def f(n):
    return f(n-1)+f(n-2) if n > 1 else n
RESULT = f(10)`,
  why:`This is the Fibonacci shape, and the sensible response is to build a table from the
bottom rather than draw a tree, since every value depends only on smaller ones. Starting from f(0)
equal to 0 and f(1) equal to 1, the values run 1, 2, 3, 5, 8, 13, 21, 34, and 55. For scale, a tree
for f(10) has 177 nodes while the table has eleven entries. Since 55 is not among the four choices
offered, the answer is None of the above.` },

{ id:"rf-07", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(9), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + f(n &minus; 3)</span><span>if n &gt; 2</span></div>
<div><span>1</span><span>otherwise</span></div>
</div></div>`,
  choices:["19","28","25","16","None of the above"], ans:0,
  check:`
def f(n):
    return f(n-1)+f(n-3) if n > 2 else 1
RESULT = f(9)`,
  why:`With three base values of 1 and each later term the previous one plus the one three
places back, a table is again the right tool. It runs f(3) equal to 2, f(4) equal to 3, f(5) equal
to 4, f(6) equal to 6, f(7) equal to 9, f(8) equal to 13, and finally f(9) equal to 13 plus 6.
Keeping three columns and reading across is what makes a definition that reaches back three steps no
harder than one that reaches back two.` },

{ id:"rf-08", kind:"problem", topic:"recursive-functions", level:"b",
  q:`Find f(8), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>2 f(n &minus; 1) + 1</span><span>if n &gt; 0</span></div>
<div><span>0</span><span>if n = 0</span></div>
</div></div>`,
  choices:["255","256","127","511","None of the above"], ans:0,
  check:`
def f(n):
    return 2*f(n-1)+1 if n > 0 else 0
RESULT = f(8)`,
  why:`Building the values upward gives 0, 1, 3, 7, 15, 31, 63, 127, and 255, and the pattern
should be recognisable well before you reach the end: every one of them is a power of two minus 1,
so f(n) is 2 to the n minus 1. This is the number of moves in the Tower of Hanoi, and spotting the
closed form saves the entire trace whenever the argument is large.` },

{ id:"rf-09", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find g(48, 18), given:
<div class="cases"><div class="fn">g(x, y) =</div><div class="rows">
<div><span>g(y, x &minus; y)</span><span>if x &gt; y</span></div>
<div><span>g(y, x)</span><span>if y &gt; x</span></div>
<div><span>x</span><span>otherwise</span></div>
</div></div>`,
  choices:["6","12","18","3","None of the above"], ans:0,
  check:`
def g(x,y):
    if x > y: return g(y,x-y)
    if y > x: return g(y,x)
    return x
RESULT = g(48,18)`,
  why:`Tracing gives g(48, 18), then g(18, 30), g(30, 18), g(18, 12), g(12, 6), and finally
g(6, 6), which returns 6. If the shape looks familiar it should, because this is the subtraction form
of the Euclidean algorithm and the value it computes is the greatest common divisor of the two
arguments. Recognizing that answers the question in a single step, provided you also check that the
base case returns x itself rather than something derived from it.` },

{ id:"rf-10", kind:"problem", topic:"recursive-functions", level:"s",
  q:`A square of side 27 is painted by this rule. Divide it into nine equal subsquares, paint the
center one, then apply the same rule to the four corner subsquares only. Stop at side 1 and paint
nothing at that size. What total area is painted?`,
  choices:["133","121","145","81","None of the above"], ans:0,
  check:`
def a(s):
    return 0 if s == 1 else (s//3)**2 + 4*a(s//3)
RESULT = a(27)`,
  why:`Turn the description into a formula before computing anything. A square of side s paints
a center of area s squared over 9 and then repeats on four subsquares of side s over 3, so A(s) is
(s / 3) squared plus 4 times A(s / 3), with A(1) equal to 0. That gives A(3) equal to 1, then A(9)
equal to 9 plus 4, then A(27) equal to 81 plus 52. The stopping rule is what decides the answer, so
read it carefully before you start.` },

{ id:"rf-11", kind:"problem", topic:"recursive-functions", level:"j",
  q:`Find f(64), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 10) + 2</span><span>if n &gt; 9</span></div>
<div><span>n</span><span>otherwise</span></div>
</div></div>`,
  choices:["16","12","14","18","None of the above"], ans:0,
  check:`
def f(n):
    return f(n-10)+2 if n > 9 else n
RESULT = f(64)`,
  why:`Every step drops n by 10 and adds 2 on the way back, so the chain from 64 runs 54, 44,
34, 24, 14, and 4. That is six steps ending on a base value of 4, and six 2s brings the total to 16.
Counting the steps is much safer than writing seven lines out, since the only thing that can go
wrong is miscounting them.` },

{ id:"rf-12", kind:"problem", topic:"recursive-functions", level:"j",
  q:`Find f(20), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + n</span><span>if n &gt; 0</span></div>
<div><span>0</span><span>otherwise</span></div>
</div></div>`,
  choices:["211", "200", "190", "220", "None of the above"], ans:4,
  check:`
def f(n):
    return f(n-1)+n if n > 0 else 0
RESULT = f(20)`,
  why:`This definition adds up the integers from 1 to n, so f(20) is 20 times 21 over 2. Tracing
twenty levels by hand is where arithmetic errors breed, and recognizing the closed form removes them
entirely. Since 210 is not among the four choices offered, the answer is None of the above.` },

{ id:"rf-13", kind:"problem", topic:"recursive-functions", level:"s",
  q:`How many times is f called in total, counting the first call, when f(6) is evaluated with no
caching?
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + f(n &minus; 2)</span><span>if n &gt; 1</span></div>
<div><span>1</span><span>otherwise</span></div>
</div></div>`,
  choices:["25","13","21","41","None of the above"], ans:0,
  check:`
calls = [0]
def f(n):
    calls[0] += 1
    return f(n-1)+f(n-2) if n > 1 else 1
f(6)
RESULT = calls[0]`,
  why:`Count the calls the same way you would count the values. If C(n) is the number of calls,
then C(0) and C(1) are 1 each and C(n) is 1 plus C(n - 1) plus C(n - 2), which gives 3, 5, 9, 15,
and 25. There is a tidy identity hiding in that table, since the call count always comes to 2 f(n)
minus 1 and f(6) is 13. This is the concrete reason plain recursion on Fibonacci becomes unusable
long before n gets large.` },

{ id:"rf-14", kind:"problem", topic:"recursive-functions", level:"j",
  q:`Find f(7), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + f(n &minus; 1)</span><span>if n &gt; 0</span></div>
<div><span>3</span><span>otherwise</span></div>
</div></div>`,
  choices:["384","192","768","343","None of the above"], ans:0,
  check:`
def f(n):
    return f(n-1)+f(n-1) if n > 0 else 3
RESULT = f(7)`,
  why:`Adding a value to itself is doubling it, so each level of this definition multiplies by 2
rather than adding anything. Starting from a base value of 3 and doubling seven times gives 3 times
128, or 384. The distractor 192 is what you get from doubling only six times, which is the natural
slip when you count levels rather than steps.` },

{ id:"rf-15", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(7), given:
<div class="cases"><div class="fn">f(x) =</div><div class="rows">
<div><span>f(x &minus; 3) + 2</span><span>if x &ge; 0</span></div>
<div><span>x</span><span>otherwise</span></div>
</div></div>`,
  choices:["4","3","6","1","None of the above"], ans:0,
  check:`
def f(x):
    return f(x-3)+2 if x >= 0 else x
RESULT = f(7)`,
  why:`The condition here is greater than or equal to 0, which means 1 still recurses rather
than falling to the base case. The chain therefore runs 7, 4, 1, and then -2, and -2 is what the
second rule finally answers. Winding back up gives -2, then 0, then 2, then 4. With a strict greater
than instead, f(1) would have returned 1 and the answer would have been 5.` },

{ id:"rf-16", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f("ACSL"), given:
<div class="cases"><div class="fn">f(s) =</div><div class="rows">
<div><span>""</span><span>if len(s) = 0</span></div>
<div><span>f(s&prime;) + f(s&prime;) + s[0]</span><span>otherwise</span></div>
</div></div>
<p class="note">Here s&prime; means s with its first character removed.</p>
<p class="note">What is the length of the result?</p>`,
  choices:["11","15","8","4","None of the above"], ans:1,
  check:`
def f(s):
    return "" if len(s) == 0 else f(s[1:]) + f(s[1:]) + s[0]
RESULT = len(f("ACSL"))`,
  why:`You are asked for a length rather than a string, so track lengths. If L(n) is the length
of the result for a string of length n, then L(0) is 0 and L(n) is 2 L(n - 1) plus 1, giving 1, 3, 7,
and 15. The recursive call appears twice in the definition, which is why the work doubles at every
level instead of staying flat, and it is also why the answer is nowhere near the original length of
4.` },

{ id:"rf-17", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(2, 3), given:
<div class="cases"><div class="fn">f(m, n) =</div><div class="rows">
<div><span>n + 1</span><span>if m = 0</span></div>
<div><span>f(m &minus; 1, 1)</span><span>if n = 0</span></div>
<div><span>f(m &minus; 1, f(m, n &minus; 1))</span><span>otherwise</span></div>
</div></div>`,
  choices:["9","7","11","13","None of the above"], ans:0,
  check:`
def f(m,n):
    if m == 0: return n + 1
    if n == 0: return f(m-1, 1)
    return f(m-1, f(m, n-1))
RESULT = f(2,3)`,
  why:`This is the Ackermann function, and the skill it tests is recognizing when not to trace.
Each row has a closed form that you can build from the row below it. The m equal to 0 row is n + 1,
feeding that back in gives f(1, n) equal to n + 2, and feeding that in again gives f(2, n) equal to
2n + 3, so f(2, 3) is 9. Unwinding downward is not merely slow but impossible, since even f(4, 2) has
19729 digits and every row past m equal to 3 grows faster than anything you could write out.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"rf-18", kind:"problem", topic:"recursive-functions", level:"b",
  q:`Find f(20), given:
<div class="cases"><div class="fn">f(x) =</div><div class="rows">
<div><span>f(x &minus; 2) + 5</span><span>if x &gt; 10</span></div>
<div><span>3x</span><span>otherwise</span></div>
</div></div>`,
  choices:["55","50","45","60","None of the above"], ans:0,
  check:`
def f(x):
    return f(x-2)+5 if x > 10 else 3*x
RESULT = f(20)`,
  why:`Count the steps rather than writing out six lines. The argument drops by 2 each time,
running 20, 18, 16, 14, 12, and then 10, which is five steps, and 10 is the first value that fails the
condition. The base case answers with 3 times 10, or 30, and the five waiting additions contribute 25.
Miscounting the steps is the only real risk here, so it is worth writing the chain of arguments down
before adding anything.` },

{ id:"rf-19", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(4, 1), given:
<div class="cases"><div class="fn">f(x, y) =</div><div class="rows">
<div><span>f(x &minus; 1, y + 2) + 1</span><span>if x &gt; 0</span></div>
<div><span>y</span><span>otherwise</span></div>
</div></div>`,
  choices:["13","9","11","5","None of the above"], ans:0,
  check:`
def f(x,y):
    return f(x-1,y+2)+1 if x > 0 else y
RESULT = f(4,1)`,
  why:`Only x controls when the recursion stops, so the chain runs four levels down to x equal to
0 while y climbs 1, 3, 5, 7, and 9. The base case then answers with the y it was handed, which is 9,
and the four waiting additions of 1 bring the total to 13. Track both arguments on every line even
though only one of them is being tested, since a question like this exists precisely to see whether
you dropped the other.` },

{ id:"rf-20", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(100), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f([n / 2]) + 1</span><span>if n &gt; 1</span></div>
<div><span>0</span><span>otherwise</span></div>
</div></div>
<p class="note">Note: [y] is the greatest integer less than or equal to y.</p>`,
  choices:["6","7","5","50","None of the above"], ans:0,
  check:`
def f(n):
    return f(n//2)+1 if n > 1 else 0
RESULT = f(100)`,
  why:`Halving with the fraction discarded, the chain runs 100, 50, 25, 12, 6, 3, and 1, which is
six halvings before the base case fires. What this function computes is the position of the highest
bit, or the floor of the base 2 logarithm, and that is why the answer is so much smaller than the
argument. A definition that divides finishes in roughly the logarithm of n steps rather than n.` },

{ id:"rf-21", kind:"problem", topic:"recursive-functions", level:"b",
  q:`Find f(6), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>n &sdot; f(n &minus; 1)</span><span>if n &gt; 1</span></div>
<div><span>1</span><span>otherwise</span></div>
</div></div>`,
  choices:["720","120","36","46656","None of the above"], ans:0,
  check:`
def f(n):
    return n*f(n-1) if n > 1 else 1
RESULT = f(6)`,
  why:`This is the factorial, and building it upward is safer than unwinding it downward: 1, 2,
6, 24, 120, and 720. The distractor 120 is 5 factorial, which is what you get by stopping one level
early, and that off by one is by far the most common way this question goes wrong. Recognizing the
definition on sight also tells you the answer will grow far faster than the argument.` },

{ id:"rf-22", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(9), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + 2n &minus; 1</span><span>if n &gt; 0</span></div>
<div><span>0</span><span>otherwise</span></div>
</div></div>`,
  choices:["81","72","45","90","None of the above"], ans:0,
  check:`
def f(n):
    return f(n-1)+2*n-1 if n > 0 else 0
RESULT = f(9)`,
  why:`Each level adds the next odd number, so f(n) is the sum 1 + 3 + 5 + ... up to the nth odd
number, and that sum is always n squared. The table runs 1, 4, 9, 16, 25, 36, 49, 64, and 81, which
confirms it. Spotting the closed form is what turns a nine level trace into one multiplication, and it
is worth looking for whenever the added term depends on n rather than being fixed.` },

{ id:"rf-23", kind:"problem", topic:"recursive-functions", level:"j",
  q:`Find f(43), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 5) + 4</span><span>if n &gt; 20</span></div>
<div><span>n</span><span>otherwise</span></div>
</div></div>`,
  choices:["38","36","42","20","None of the above"], ans:0,
  check:`
def f(n):
    return f(n-5)+4 if n > 20 else n
RESULT = f(43)`,
  why:`The argument drops by 5 each time, running 43, 38, 33, 28, 23, and then 18. That is five
steps, and 18 is the first value that is not greater than 20, so the base case answers with 18 itself.
Five waiting additions of 4 give 20 more, for a total of 38. The value 23 still recurses because it is above 20. The chain stops at 18, not at the threshold itself.` },

{ id:"rf-24", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(5), given the pair of definitions:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>g(n &minus; 1) + 1</span><span>if n &gt; 0</span></div>
<div><span>0</span><span>otherwise</span></div>
</div></div>
<div class="cases"><div class="fn">g(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + 2</span><span>if n &gt; 0</span></div>
<div><span>1</span><span>otherwise</span></div>
</div></div>`,
  choices:["8","7","9","6","None of the above"], ans:0,
  check:`
def f(n):
    return g(n-1)+1 if n > 0 else 0
def g(n):
    return f(n-1)+2 if n > 0 else 1
RESULT = f(5)`,
  why:`Two definitions that call each other are traced exactly like one, provided you write down
which function you are in on every line. f(5) needs g(4), which needs f(3), which needs g(2), which
needs f(1), which needs g(0), and g(0) is 1. Winding back up gives f(1) equal to 2, g(2) equal to 4,
f(3) equal to 5, g(4) equal to 7, and f(5) equal to 8. Note that the two base cases differ, so
finishing in the wrong one changes the answer.` },

{ id:"rf-25", kind:"problem", topic:"recursive-functions", level:"b",
  q:`Find f(5), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>3 f(n &minus; 1) &minus; 2</span><span>if n &gt; 0</span></div>
<div><span>2</span><span>otherwise</span></div>
</div></div>`,
  choices:["244","242","486","82","None of the above"], ans:0,
  check:`
def f(n):
    return 3*f(n-1)-2 if n > 0 else 2
RESULT = f(5)`,
  why:`Build upward from the base case: 2, then 4, then 10, then 28, then 82, then 244. Both
operations at each level matter, and the subtraction is easy to lose when the multiplication is doing
the visible work. The distractor 486 is 2 times 3 to the fifth, which is what tripling five times with
no subtraction would give, and 82 is what you get by stopping one level early.` },

{ id:"rf-26", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f("RECURSE"), given:
<div class="cases"><div class="fn">f(s) =</div><div class="rows">
<div><span>s</span><span>if len(s) &le; 1</span></div>
<div><span>last(s) + f(s&Prime;) + s[0]</span><span>otherwise</span></div>
</div></div>
<p class="note">Here last(s) is the final character of s, and s&Prime; means s with both its first
and its last character removed.</p>`,
  choices:["ESRUCER","RECURSE","ERUCESR","ESURCER","None of the above"], ans:0,
  check:`
def f(s):
    return s if len(s) <= 1 else s[-1] + f(s[1:-1]) + s[0]
RESULT = f("RECURSE")`,
  why:`Each level swaps the outermost pair of characters and hands the middle back to itself, so
the whole string comes out reversed. Working inward, f("RECURSE") is E + f("ECURS") + R, f("ECURS") is
S + f("CUR") + E, and f("CUR") is R + "U" + C, which is RUC. Winding back up gives SRUCE and then
ESRUCER. Since RECURSE is not a palindrome, the answer differs from the input, which rules out the choice RECURSE without any tracing at all.` },

{ id:"rf-27", kind:"problem", topic:"recursive-functions", level:"s",
  q:`How many times is f called in total, counting the first call, when f(8) is evaluated with no
caching?
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + f(n &minus; 3)</span><span>if n &gt; 2</span></div>
<div><span>1</span><span>otherwise</span></div>
</div></div>`,
  choices:["17","31","13","21","None of the above"], ans:4,
  check:`
calls = [0]
def f(n):
    calls[0] += 1
    return f(n-1)+f(n-3) if n > 2 else 1
f(8)
RESULT = calls[0]`,
  why:`Count calls with a definition of their own. If C(n) is the number of calls, then C(0),
C(1), and C(2) are each 1, and C(n) is 1 plus C(n - 1) plus C(n - 3) for larger n, the extra 1 being
the call you are inside. That gives 3, 5, 7, 11, 17, and 25. The distractor 17 is C(7), which is what
you get by stopping one level early. Since 25 is not among the four choices offered, the answer is
None of the above.` },

{ id:"rf-28", kind:"problem", topic:"recursive-functions", level:"j",
  q:`Find f(6), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>2 f(n &minus; 1)</span><span>if n &gt; 0</span></div>
<div><span>5</span><span>otherwise</span></div>
</div></div>`,
  choices:["320","160","64","30","None of the above"], ans:0,
  check:`
def f(n):
    return 2*f(n-1) if n > 0 else 5
RESULT = f(6)`,
  why:`Each level doubles, so six levels multiply the base value by 2 to the sixth, which is 64,
giving 5 times 64, or 320. Building upward gives 5, 10, 20, 40, 80, 160, and 320, and the distractor
160 is what you get by doubling only five times. The base value here is 5 rather than 1, so the answer
is not a power of two, which is a useful sanity check on the arithmetic.` },

{ id:"rf-29", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(1071, 462), given:
<div class="cases"><div class="fn">f(m, n) =</div><div class="rows">
<div><span>m</span><span>if n = 0</span></div>
<div><span>f(n, m mod n)</span><span>otherwise</span></div>
</div></div>`,
  choices:["21","7","3","147","None of the above"], ans:0,
  check:`
def f(m,n):
    if n == 0: return m
    return f(n, m % n)
RESULT = f(1071, 462)`,
  why:`This is the Euclidean algorithm in its remainder form, so the value it returns is the
greatest common divisor of the two arguments. Tracing takes three lines: f(1071, 462) becomes
f(462, 147), then f(147, 21), then f(21, 0), which returns 21. Recognizing the definition is worth
more than the trace, because the same shape appears with the arguments swapped or the base case
written differently and it always computes the same thing.` },

{ id:"rf-30", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(10), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + f(n &minus; 2) + f(n &minus; 3)</span><span>if n &gt; 2</span></div>
<div><span>1</span><span>otherwise</span></div>
</div></div>`,
  choices:["105","149","274","81","None of the above"], ans:4,
  check:`
def f(n):
    return f(n-1)+f(n-2)+f(n-3) if n > 2 else 1
RESULT = f(10)`,
  why:`Three base values of 1 and each later term the sum of the previous three make this the
tribonacci sequence, and a table is the only sensible way to compute it. The values run 1, 1, 1, 3, 5,
9, 17, 31, 57, 105, and 193. The distractor 105 is f(9), one place short. Drawing the call tree
instead would mean visiting 289 calls, including 193 base-case calls. Since 193 is not among the four choices
offered, the answer is None of the above.` },

{ id:"rf-31", kind:"problem", topic:"recursive-functions", level:"b",
  q:`Three stalks are drawn at stage 0. At each later stage every stalk from the previous stage is replaced
by three stalks. How many stalks are there at stage 5, if stage 0 has three stalks?
<div class="cases"><div class="fn">p(n) =</div><div class="rows">
<div><span>3 p(n &minus; 1)</span><span>if n &gt; 0</span></div>
<div><span>3</span><span>otherwise</span></div>
</div></div>`,
  choices:["729","243","81","2187","None of the above"], ans:0,
  check:`
def p(n):
    return 3*p(n-1) if n > 0 else 3
RESULT = p(5)`,
  why:`Every stage multiplies the count by 3, so stage 5 holds 3 to the fifth times the starting
3, which is 3 to the sixth, or 729. Building upward gives 3, 9, 27, 81, 243, and 729. The distractor
243 is 3 to the fifth, which is what you get by treating stage 0 as a single stalk rather than the
three the definition actually gives it.` },

{ id:"rf-32", kind:"problem", topic:"recursive-functions", level:"j",
  q:`Find f(26), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 4) + 10</span><span>if n &gt; 6</span></div>
<div><span>n</span><span>otherwise</span></div>
</div></div>`,
  choices:["56","46","60","50","None of the above"], ans:0,
  check:`
def f(n):
    return f(n-4)+10 if n > 6 else n
RESULT = f(26)`,
  why:`The argument drops by 4 each time, so the chain runs 26, 22, 18, 14, 10, and then 6. That
is five steps, and 6 is the first value that is not greater than 6, so the base case answers with 6.
Five waiting additions of 10 bring the total to 56. Answering 46 means you counted four steps instead
of five, which is why the chain of arguments is worth writing out in full.` },

{ id:"rf-33", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(3, 3), given:
<div class="cases"><div class="fn">f(x, y) =</div><div class="rows">
<div><span>x + y</span><span>if x &le; 0 or y &le; 0</span></div>
<div><span>f(x &minus; 1, y) + f(x, y &minus; 1)</span><span>otherwise</span></div>
</div></div>`,
  choices:["30","20","36","15","None of the above"], ans:0,
  check:`
def f(x,y):
    if x <= 0 or y <= 0: return x + y
    return f(x-1,y) + f(x,y-1)
RESULT = f(3,3)`,
  why:`Build a grid rather than a tree, since every value depends only on the cell to its left and
the cell above it. The edges come from the base case, so row 0 holds 0, 1, 2, 3 and column 0 holds the
same. Filling the interior gives 2, 4, 7 across the first row, then 4, 8, 15, then 7, 15, 30. Two
recursive calls at every level make the tree enormous while the grid has sixteen cells, which is the
whole argument for building a table whenever a definition reaches back in two directions.` },

{ id:"rf-34", kind:"problem", topic:"recursive-functions", level:"s",
  q:`Find f(7), given:
<div class="cases"><div class="fn">f(n) =</div><div class="rows">
<div><span>f(n &minus; 1) + n<sup>2</sup></span><span>if n &gt; 0</span></div>
<div><span>0</span><span>otherwise</span></div>
</div></div>`,
  choices:["140","91","784","49","None of the above"], ans:0,
  check:`
def f(n):
    return f(n-1)+n*n if n > 0 else 0
RESULT = f(7)`,
  why:`Each level adds the square of its own argument, so this is the sum of the squares from 1
to 7, which runs 1, 5, 14, 30, 55, 91, and 140. The closed form is n(n + 1)(2n + 1) over 6, giving 7
times 8 times 15 over 6, or 140, and it is worth knowing when the argument is large enough that a
table becomes tedious. The distractor 784 is the square of the sum rather than the sum of the
squares.` }

]);
