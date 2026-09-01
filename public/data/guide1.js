window.GUIDE = Object.assign(window.GUIDE || {}, {

"number-systems": `
<p class="lead">Contest 1. Everything in this category comes back to one idea: a number is a
string of digits, and the base tells you what each position is worth. Get comfortable moving
between bases and the rest is arithmetic you already know.</p>

<h3>Place value</h3>
<p>In base b, the digit d sitting k places left of the point is worth d times b to the k.
That is the whole definition. The number 3204 in base 5 is 3(125) + 2(25) + 0(5) + 4(1),
which is 375 + 50 + 0 + 4, or 429 in decimal.</p>
<p>ACSL uses four bases. Base 2 has digits 0 and 1. Base 8 has digits 0 through 7. Base 10 is
the usual one. Base 16 has digits 0 through 9 followed by A through F, where A is ten and F
is fifteen.</p>

<h3>What to memorize before the contest</h3>
<p>You will not have time to derive these. Know them cold:</p>
<ul>
<li>Powers of 2 up to 4096, and ideally up to 65536.</li>
<li>Powers of 8 up to 4096, and powers of 16 up to 65536.</li>
<li>The hex digits A through F as 10 through 15, in both directions.</li>
<li>Each octal digit as 3 bits, and each hex digit as 4 bits.</li>
</ul>
<table class="tbl">
<tr><th>Hex</th><th>Binary</th><th>Dec</th><th>Hex</th><th>Binary</th><th>Dec</th></tr>
<tr><td>0</td><td>0000</td><td>0</td><td>8</td><td>1000</td><td>8</td></tr>
<tr><td>1</td><td>0001</td><td>1</td><td>9</td><td>1001</td><td>9</td></tr>
<tr><td>2</td><td>0010</td><td>2</td><td>A</td><td>1010</td><td>10</td></tr>
<tr><td>3</td><td>0011</td><td>3</td><td>B</td><td>1011</td><td>11</td></tr>
<tr><td>4</td><td>0100</td><td>4</td><td>C</td><td>1100</td><td>12</td></tr>
<tr><td>5</td><td>0101</td><td>5</td><td>D</td><td>1101</td><td>13</td></tr>
<tr><td>6</td><td>0110</td><td>6</td><td>E</td><td>1110</td><td>14</td></tr>
<tr><td>7</td><td>0111</td><td>7</td><td>F</td><td>1111</td><td>15</td></tr>
</table>

<h3>Binary to octal and hex, and back</h3>
<p>This is the conversion you should never do the long way. Because 8 is 2 cubed, every octal
digit is exactly 3 bits. Because 16 is 2 to the fourth, every hex digit is exactly 4 bits.</p>
<p>To go from binary to octal, group the bits into threes starting at the right and pad the
left group with zeros. To go to hex, group into fours. To come back, expand each digit.</p>
<p>Convert 3676 in base 8 to hex. Expand each octal digit into 3 bits: 011 110 111 110.
Regroup those twelve bits into fours from the right: 0111 1011 1110. Read them off as hex: 7,
B, E. The answer is 7BE.</p>
<p>Never route this through decimal. Going 3676 to 1982 to 7BE takes three times as long and
gives arithmetic mistakes three chances to happen.</p>

<h3>Decimal to any base</h3>
<p>Divide by the base over and over, writing down the remainders. The remainders come out
least significant first, so read them bottom to top.</p>
<pre><code>1000 / 16 = 62 remainder 8
  62 / 16 =  3 remainder 14 (E)
   3 / 16 =  0 remainder 3
answer, read upward: 3E8</code></pre>
<p>The other direction, base to decimal, is fastest with Horner's method. For 3E8 in hex,
start with 3, multiply by 16 and add 14 to get 62, multiply by 16 and add 8 to get 1000. No
powers to remember and no place to lose track.</p>

<h3>Arithmetic inside a base</h3>
<p>Adding and subtracting work exactly as in decimal, except that you carry when a column
reaches the base instead of ten, and you borrow the base instead of ten.</p>
<p>Subtract 69EB from F5AD in hex, column by column from the right:</p>
<ul>
<li>D minus B is 13 minus 11, which is 2.</li>
<li>A minus E needs a borrow. Borrow 16 from the next column, so 26 minus 14 is 12, which is
C. The next column is now 4 instead of 5.</li>
<li>4 minus 9 needs a borrow too. 20 minus 9 is 11, which is B. The next column is now E.</li>
<li>E minus 6 is 14 minus 6, which is 8.</li>
</ul>
<p>The answer is 8BC2. Check it in decimal if you have time: 62893 minus 27115 is 35778, and
8BC2 is 35778.</p>
<p>A quick sanity check that catches most slips: the last digit of a sum or difference in base
b depends only on the last digits of the operands, modulo b. If your final digit is wrong,
you made an arithmetic error rather than a conversion error.</p>

<h3>Fractions</h3>
<p>Digits to the right of the point are worth negative powers of the base. In base 2, 0.101 is
one half plus one eighth, which is 0.625. Going the other way, multiply the fractional part by
the base repeatedly and read off the integer parts from the top down. For 0.625 in binary,
0.625 times 2 is 1.25 so the first bit is 1, 0.25 times 2 is 0.5 so the next bit is 0, and 0.5
times 2 is 1.0 so the last bit is 1, giving 0.101.</p>
<p>Some fractions never terminate. One third in base 2 is 0.010101 repeating forever, the same
way one third in base 10 is 0.333 repeating. If a contest problem asks for a fixed number of
places, it will say so.</p>

<h3>Question types to expect</h3>
<ul>
<li>Straight conversions, usually between two non-decimal bases, where the grouping shortcut
is the intended method.</li>
<li>Arithmetic in a base, most often hex subtraction with borrows.</li>
<li>Solve for the base. If 34 in base b equals 28 in decimal, then 3b + 4 = 28, so b is 8.</li>
<li>Counting problems. How many three digit base 5 numbers have no repeated digit, or how many
numbers between 100 and 200 look a certain way in two different bases at once.</li>
<li>Applications, most often RGB colors, where a hex pair like FF is 255.</li>
</ul>
`,

"recursive-functions": `
<p class="lead">Contest 1. These are mathematical recursive definitions, not programs. There
is no code to write and nothing clever to find. The whole skill is bookkeeping: unwind the
calls until you hit a base case, then wind back up without dropping anything.</p>

<h3>Reading the notation</h3>
<p>ACSL writes recursive functions as a piecewise definition. Each line gives a rule and the
condition under which it applies:</p>
<pre><code>f(x) = f(x - 3) + 2      if x &gt; 0
f(x) = 3x                otherwise</code></pre>
<p>Read the conditions top to bottom and take the first one that fits. Some definitions have
three or four cases, and the cases are usually written so that exactly one can apply, but do
not count on it. If two could apply, the earlier line wins.</p>

<h3>The unwind and rewind method</h3>
<p>Write the chain of calls going down, one per line, until a call lands on a base case. Then
fill in values going back up. The discipline of writing every line is what keeps you from
losing a term.</p>
<p>Evaluate f(11) for the definition above:</p>
<pre><code>f(11) = f(8) + 2
f(8)  = f(5) + 2
f(5)  = f(2) + 2
f(2)  = f(-1) + 2
f(-1) = 3(-1) = -3      base case

f(2)  = -3 + 2 = -1
f(5)  = -1 + 2 = 1
f(8)  =  1 + 2 = 3
f(11) =  3 + 2 = 5</code></pre>
<p>Notice that the base case fired at -1, not at 0. The condition was x greater than 0, so 0
itself falls to the otherwise branch. Reading the boundary as x greater than or equal to 0
would have given a different answer. Check the inequality signs before you start.</p>

<h3>Two variable functions</h3>
<p>Nothing changes except that you carry two numbers. Take:</p>
<pre><code>f(x, y) = f(x - y, y - 1) + 2    if x &gt; y
f(x, y) = x + y                  otherwise</code></pre>
<p>For f(12, 6): 12 is greater than 6, so f(12, 6) = f(6, 5) + 2. Then 6 is greater than 5, so
f(6, 5) = f(1, 4) + 2. Now 1 is not greater than 4, so f(1, 4) = 5. Winding back up, f(6, 5)
is 7 and f(12, 6) is 9.</p>
<p>With two variables it is easy to update one and forget the other. Write both arguments on
every line even when one of them does not move.</p>

<h3>Branching recursion</h3>
<p>When a rule calls the function more than once, the chain becomes a tree and the work grows
fast. The Fibonacci style definition is the usual example:</p>
<pre><code>g(n) = g(n - 1) + g(n - 2)   if n &gt; 1
g(n) = n                     otherwise</code></pre>
<p>Do not draw the tree. Build a table from the bottom instead, since every value you need
depends only on smaller ones. Write g(0) = 0, g(1) = 1, g(2) = 1, g(3) = 2, g(4) = 3, and keep
going until you reach the argument you were asked about. Tracing g(10) as a tree means about
177 additions. Filling a table means 9.</p>
<p>The same trick works whenever the recursion only reaches downward. If a definition has
g(n) depending on g(n - 1) and g(n - 3), build the table with those three columns and read
across.</p>

<h3>Algorithmic and geometric problems</h3>
<p>Some problems in this category describe a process instead of writing a formula. A square
gets divided into smaller squares, some get painted, and the rule is applied again to the ones
that were not. Or a segment gets split and one piece is thrown away.</p>
<p>Turn the description into a formula before you compute anything. If a square of side s
paints one ninth of its area and then recurses on four subsquares of side s over 3, then
A(s) = s squared over 9 plus 4 times A(s / 3), with the recursion stopping at some stated
size. Once it is a formula, it is the same unwind and rewind as everything else.</p>
<p>Read the stopping rule with care. Whether the process stops when the side is below 1 or at
1 changes the answer by a whole level, and that level is usually where most of the remaining
area is.</p>

<h3>Where points get lost</h3>
<ul>
<li>Using the wrong branch at the boundary, because the condition was strict and you read it
as inclusive.</li>
<li>Adding the constant term once instead of once per level. In the first example, the plus 2
appears four times, not once.</li>
<li>Sign errors when arguments go negative, especially with multiplication in the base case.</li>
<li>Stopping one level early because a call looked like a base case when it was not.</li>
</ul>
<p>If a problem asks for a value that would take more than about fifteen lines to unwind, that
is a hint that you are meant to find a pattern instead. Compute the first four or five values,
look for a closed form, then check it against one value you already know.</p>
`

});
