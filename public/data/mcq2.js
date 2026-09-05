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
