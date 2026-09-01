window.MCQ = (window.MCQ || []).concat([

{ id:"rf-01", topic:"recursive-functions", level:"b",
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
  why:`Step down by 4 until the argument drops to 6 or below: 21, 17, 13, 9, 5. That is four
steps, and 5 falls to the base case giving 10. Winding back up adds 3 four times, so the answer
is 10 plus 12. Counting the steps is faster and safer than writing all five lines, but only once
you have confirmed where the chain stops.` },

{ id:"rf-02", topic:"recursive-functions", level:"s",
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
  why:`f(10, 7) has 10 greater than 7, so it becomes f(3, 6) + 2. Now 3 is not greater than 6, so
the base case gives 9. Adding the single 2 gives 11. With two variables it is easy to move one and
forget the other, so write both arguments on every line even when one does not change.` },

{ id:"rf-03", topic:"recursive-functions", level:"s",
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
  why:`Apply the function four times from the inside out. f(14) uses the first rule, giving 4 plus
2, which is 6. f(6) also uses the first rule, giving 2 plus 2, which is 4. Now 4 is not greater
than 5, so f(4) is 3 and f(3) is 2. The boundary matters: 6 still takes the first rule and 5 would
not.` },

{ id:"rf-04", topic:"recursive-functions", level:"s",
  q:`Recursion works on strings as well as numbers. Using the rules of ACSL pseudocode, what is
the value of f("python")?
<div class="cases"><div class="fn">f(s) =</div><div class="rows">
<div><span>s</span><span>if len(s) &le; 1</span></div>
<div><span>f(s[2:]) + s[1] + s[0]</span><span>otherwise</span></div>
</div></div>`,
  choices:["nohtyp","python","pnyoth","npoyht","None of the above"], ans:0,
  check:`
def f(s):
    return s if len(s) <= 1 else f(s[2:]) + s[1] + s[0]
RESULT = f("python")`,
  why:`Peel two characters at a time and hang the swapped pair on the end. f("python") is
f("thon") followed by "yp". f("thon") is f("on") followed by "ht". f("on") is f("") followed by
"no", which is just "no". Winding back up gives "no", then "noht", then "nohtyp". The base case
fires on the empty string, not on a single character, because "python" has even length.` },

{ id:"rf-05", topic:"recursive-functions", level:"b",
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
  why:`The chain runs 11, 8, 5, 2, then -1, and only -1 fails the condition. The base case gives 3
times -1, which is -3, and four levels each add 1. The answer is 1. Reading the condition as
greater than or equal to 0 would stop the chain at 2 and give a different answer entirely.` },

{ id:"rf-06", topic:"recursive-functions", level:"b",
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
  why:`Build a table upward instead of drawing a tree, since every value depends only on smaller
ones. Starting at f(0) equal to 0 and f(1) equal to 1, the values run 1, 2, 3, 5, 8, 13, 21, 34,
55. A tree for f(10) has 177 nodes and a table has 11 entries. The value 55 is not among the four choices offered, so the answer is None of the above.` },

{ id:"rf-07", topic:"recursive-functions", level:"s",
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
  why:`Three base values of 1, then each term is the previous one plus the one three back. The
table runs f(3) = 2, f(4) = 3, f(5) = 4, f(6) = 6, f(7) = 9, f(8) = 13, and f(9) = 13 plus 6.
Keep three columns and read across.` },

{ id:"rf-08", topic:"recursive-functions", level:"b",
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
  why:`The values run 0, 1, 3, 7, 15, 31, 63, 127, 255, each one less than a power of two. So f(n)
is 2 to the n minus 1. This is the Tower of Hanoi count, and knowing the closed form saves the
whole trace when the argument is large.` },

{ id:"rf-09", topic:"recursive-functions", level:"s",
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
  why:`Trace it: g(48, 18), g(18, 30), g(30, 18), g(18, 12), g(12, 6), g(6, 6), which returns 6.
This is the subtraction form of the Euclidean algorithm, so the value is the greatest common
divisor of 48 and 18. Spotting that answers it in one step, provided you also check that the base
case returns x rather than something derived from it.` },

{ id:"rf-10", topic:"recursive-functions", level:"s",
  q:`A square of side 27 is painted by this rule. Divide it into nine equal subsquares, paint the
center one, then apply the same rule to the four corner subsquares only. Stop at side 1 and paint
nothing at that size. What total area is painted?`,
  choices:["133","121","145","81","None of the above"], ans:0,
  check:`
def a(s):
    return 0 if s == 1 else (s//3)**2 + 4*a(s//3)
RESULT = a(27)`,
  why:`Turn the description into a formula first. A square of side s paints a center of area s
squared over 9, then recurses on four subsquares of side s over 3, so A(s) = (s / 3) squared plus
4 A(s / 3) with A(1) equal to 0. Then A(3) is 1, A(9) is 9 plus 4, and A(27) is 81 plus 52. The
stopping rule decides the answer, so read it before computing anything.` },

{ id:"rf-11", topic:"recursive-functions", level:"j",
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
  why:`Each step drops n by 10 and adds 2. From 64 the chain goes 54, 44, 34, 24, 14, 4, which is
six steps ending at the base value 4. So the answer is 4 plus 12.` },

{ id:"rf-12", topic:"recursive-functions", level:"j",
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
  why:`This adds up 1 through n, so f(20) is 20 times 21 over 2. Tracing twenty levels by hand is
where arithmetic errors come from, and recognizing the closed form removes them. The value 210 is not among the four choices offered, so the answer is None of the above.` },

{ id:"rf-13", topic:"recursive-functions", level:"s",
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
  why:`Let C(n) be the call count. C(0) and C(1) are 1 each, and C(n) is 1 plus C(n - 1) plus
C(n - 2), giving 3, 5, 9, 15, 25. There is a tidy identity behind it: the call count is always
2 f(n) minus 1, and f(6) is 13. This is the concrete reason plain recursion on Fibonacci is
unusable for large n.` },

{ id:"rf-14", topic:"recursive-functions", level:"j",
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
  why:`Adding a value to itself doubles it, so each level multiplies by 2. Starting at 3 and
doubling seven times gives 3 times 128. The distractor 192 comes from doubling only six times.` },

{ id:"rf-15", topic:"recursive-functions", level:"s",
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
  why:`The condition is greater than or equal to 0, so 1 still recurses. The chain is 7, 4, 1,
then -2, which is the base case. Winding up gives -2, 0, 2, 4. With a strict greater than, f(1)
would have returned 1 and the answer would be 5 instead.` },

{ id:"rf-16", topic:"recursive-functions", level:"s",
  q:`Find f("ACSL"), given:
<div class="cases"><div class="fn">f(s) =</div><div class="rows">
<div><span>""</span><span>if len(s) = 0</span></div>
<div><span>f(s[1:]) + f(s[1:]) + s[0]</span><span>otherwise</span></div>
</div></div>
<p class="note">What is the length of the result?</p>`,
  choices:["11","15","8","4","None of the above"], ans:1,
  check:`
def f(s):
    return "" if len(s) == 0 else f(s[1:]) + f(s[1:]) + s[0]
RESULT = len(f("ACSL"))`,
  why:`Let L(n) be the length for a string of length n. Then L(0) is 0 and L(n) is 2 L(n - 1) plus
1, which gives 1, 3, 7, 15. So the result for a four character string has length 15. Careful: the
recursive call appears twice, so the work doubles at each level rather than staying flat, which is
also why the answer is not 4.` },

{ id:"rf-17", topic:"recursive-functions", level:"s",
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
  why:`This is the Ackermann function, and the whole skill is finding the pattern in each row
rather than unwinding. The m = 0 row is n + 1. Feeding that into the recursion gives f(1, n) equal
to n + 2, and feeding that in again gives f(2, n) equal to 2n + 3. So f(2, 3) is 9. Do not try to
trace this one downward: even f(4, 2) has 19729 digits, and every row after m = 3 grows faster
than anything you can write out.` }

]);
