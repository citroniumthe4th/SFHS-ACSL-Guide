window.GUIDE = Object.assign(window.GUIDE || {}, {

"number-systems": `
<p class="lead">Read 3204 in base 5 as 3&nbsp;&times;&nbsp;125 + 2&nbsp;&times;&nbsp;25
+ 0&nbsp;&times;&nbsp;5 + 4&nbsp;&times;&nbsp;1, which is 429. Each digit is worth itself multiplied
by a power of the base, and which power depends on how far left the digit sits.</p>

<p>That one line is the whole category. Every conversion, and every piece of arithmetic done without
leaving a base, is an application of it, so if a question stops making sense, expand the number that
way and work from there.</p>

<h3>Place value</h3>
<p>In base b, a digit sitting k places to the left of the point is worth that digit multiplied by
b raised to the k. Nothing else is going on. The number 3204 in base 5 means three 125s, two 25s,
no 5s, and four 1s, which comes to 375 + 50 + 0 + 4, or 429 in decimal.</p>

<p>ACSL works in four bases, and you should be equally comfortable in all of them. Base 2 uses
only 0 and 1, base 8 uses 0 through 7, base 10 is the one you grew up with, and base 16 runs 0
through 9 and then borrows the letters A through F to stand for ten through fifteen. The letters
are the only genuinely new notation here, and marks in this category are rarely lost them on the concept.</p>

<h3>What to have memorized</h3>
<p>Thirty minutes for six problems does not leave room to derive things you could have known. Come
in knowing the powers of 2 at least as far as 4096, and preferably to 65536, along with the powers
of 8 and 16 over the same range. Know the six hex letters in both directions without pausing. Most
important of all, know that each octal digit is exactly three bits and each hex digit is exactly
four, because that single fact is what makes the conversions fast.</p>

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

<h3>Moving between binary, octal, and hexadecimal</h3>
<p>Because 8 is 2 cubed and 16 is 2 to the fourth, binary sits underneath both of the other two,
and you can pass through it mechanically. To turn binary into octal, group the bits into threes
starting from the right, padding the leftmost group with zeros if it comes up short, and read each
group as a single digit. For hexadecimal you do the same thing with groups of four. Going the
other way you simply expand each digit back into its bits.</p>

<p>Suppose you are asked to convert 3676 in base 8 to hexadecimal. Expanding each octal digit into
three bits gives 011 110 111 110. Those same twelve bits regrouped into fours from the right are
0111, 1011, and 1110, which read as 7, B, and E. The answer is 7BE, and you never had to think
about what the number actually is.</p>

<p>Students routinely convert 3676 to 1982 in decimal and then convert 1982 to hex, which takes
three times as long and gives arithmetic three separate chances to go wrong. Decimal is a detour
whenever both bases are powers of two.</p>

<h3>Decimal in and decimal out</h3>
<p>When decimal genuinely is one of the two bases, you have no shortcut and you fall back on
division. Divide by the target base repeatedly, writing down each remainder, and then read the
remainders from the bottom upward, since they come out least significant first.</p>
<pre><code>1000 / 16 = 62 remainder 8
  62 / 16 =  3 remainder 14 (E)
   3 / 16 =  0 remainder 3
answer, read upward: 3E8</code></pre>

<p>Coming back the other way, most people write out the powers and add, but Horner's method is
faster and much harder to botch. Start with the leading digit, then repeatedly multiply by the
base and add the next digit. For 3E8 that is 3, then 3 times 16 plus 14 is 62, then 62 times 16
plus 8 is 1000. You never write down a power and you never lose your place.</p>

<h3>Arithmetic without leaving the base</h3>
<p>Addition and subtraction behave exactly as they do in decimal, except that you carry when a
column reaches the base rather than when it reaches ten, and a borrow brings over the base rather
than ten. Working F5AD minus 69EB in hexadecimal, column by column from the right: D minus B is 2.
A minus E will not go, so borrow, making it 26 minus 14, which is 12, or C, and the 5 above drops
to 4. Then 4 minus 9 borrows again, giving 20 minus 9, which is 11, or B, and the F drops to E.
Finally E minus 6 is 8, so the answer is 8BC2. If you have time, checking in decimal is cheap:
62893 minus 27115 is 35778, and 8BC2 is 35778.</p>

<p>One quick sanity check catches most slips. The last digit of a sum or difference depends only
on the last digits of the operands, taken modulo the base, so if your final digit is wrong the mistake is arithmetic and not a misread of the problem.</p>

<h3>Digits after the point</h3>
<p>Positions to the right of the point are worth negative powers of the base, which means 0.101 in
binary is one half plus one eighth, or 0.625. Converting a fraction the other way is repeated
multiplication instead of repeated division: multiply the fractional part by the base, write down
the integer part that pops out, and carry on with what is left. Starting from 0.625, doubling
gives 1.25 so the first bit is 1, doubling 0.25 gives 0.5 so the next bit is 0, and doubling 0.5
gives 1.0 so the last bit is 1, producing 0.101.</p>

<p>Some fractions never terminate. One third in binary is 0.010101 forever, in the same way that
one third in decimal is 0.333 forever, so a problem asking for a fixed number of places will say
how many.</p>

<h3>What the questions actually look like</h3>
<p>Straight conversions are the most common, and they are almost always between two bases that are
both powers of two, which is the setter telling you to use the grouping shortcut. After those come
arithmetic problems, usually hexadecimal subtraction with borrows, since that is where the letters
and the borrowing interfere with each other most.</p>

<p>A third kind gives you an equation and asks for the base. If 34 in base b equals 28, then
3b + 4 = 28, so b is 8, and you should confirm that every digit used is legal in the base you
found. Counting problems turn up as well, asking how many three digit numbers in some base have no
repeated digit, or how many numbers in a range look a particular way in two bases at once. Finally
there are application problems, most often RGB colour codes, where you split six hex digits into
three pairs and treat each pair as its own number between 0 and 255.</p>
`,

"recursive-functions": `
<p class="lead">These questions test careful tracing rather than insight. You are given a function
defined in terms of itself and asked for one value: expand the calls until you reach a case that
answers itself, then substitute the results back in, one line at a time.</p>

<p>There is no code to write and nothing hidden to spot. What decides the answer is whether your
paper stays legible enough to substitute back without dropping a term.</p>

<h3>Reading the definition</h3>
<p>ACSL writes a recursive function as a set of rules with a condition attached to each one, like
this:</p>
<pre><code>f(x) = f(x - 3) + 2      if x &gt; 0
f(x) = 3x                otherwise</code></pre>
<p>You read the conditions from the top and take the first one that fits. Most definitions are
written so that exactly one rule can ever apply, but you should not count on that, and where two
could apply the earlier line wins. Before computing anything, look hard at the inequality signs,
because whether a rule says greater than or greater than or equal to decides where the whole chain
stops.</p>

<h3>Unwinding and winding back</h3>
<p>Write the chain of calls downward, one per line, until you reach a value the definition answers
outright, and only then start filling values in on the way back up. The discipline of writing every
line is what stops you from losing a term, and it costs you perhaps twenty seconds.</p>
<pre><code>f(11) = f(8) + 2
f(8)  = f(5) + 2
f(5)  = f(2) + 2
f(2)  = f(-1) + 2
f(-1) = 3(-1) = -3      base case

f(2)  = -3 + 2 = -1
f(5)  = -1 + 2 = 1
f(8)  =  1 + 2 = 3
f(11) =  3 + 2 = 5</code></pre>
<p>Notice where the chain stopped. The condition was x greater than 0, so 0 itself would have
fallen to the second rule, and the chain kept going until -1. Had the condition read greater than
or equal to 0, the answer would have come out differently, which is why reading the inequality
first is not fussiness.</p>

<p>The other thing this trace shows is that the plus 2 appears four times, once per level. Adding
it once at the end is the single most common way to get these wrong, and it happens because the
constant looks like part of the definition and not part of each step.</p>

<h3>Two arguments instead of one</h3>
<p>Nothing changes when a second variable appears except that you now have two numbers to keep
straight. Take:</p>
<pre><code>f(x, y) = f(x - y, y - 1) + 2    if x &gt; y
f(x, y) = x + y                  otherwise</code></pre>
<p>For f(12, 6), since 12 is greater than 6 the first rule applies and gives f(6, 5) + 2. Then 6 is
greater than 5, so that becomes f(1, 4) + 2. Now 1 is not greater than 4, the second rule answers
with 5, and winding back up gives 7 and then 9. Write both arguments on every single line, even
when one of them does not move, because the moment you start carrying one of them in your head is
the moment it goes wrong.</p>

<h3>When the definition calls itself twice</h3>
<p>A rule that refers to the function more than once turns the chain into a tree, and the tree
grows faster than you can draw it. The Fibonacci shape is the usual example:</p>
<pre><code>g(n) = g(n - 1) + g(n - 2)   if n &gt; 1
g(n) = n                     otherwise</code></pre>
<p>Do not draw it. Because every value depends only on smaller ones, you can build a table from the
bottom instead: g(0) is 0, g(1) is 1, and from there the values run 1, 2, 3, 5, 8, 13, 21, 34, 55,
so g(10) is 55. Tracing that as a tree means 177 separate calls, while the table means eleven
entries and about a minute.</p>

<p>The same trick works for any definition that only ever reaches downward. If g(n) depends on
g(n - 1) and g(n - 3), keep those three columns and read across. What you are doing by hand is
exactly what a programmer means by memoisation, and it is worth recognising that connection,
because the same problem shows up in the programming half of the contest.</p>

<h3>Definitions disguised as pictures</h3>
<p>Some problems in this category describe a process instead of writing a formula. A square gets
divided into smaller squares, some of them get painted, and the rule is applied again to the ones
that were not. A segment gets split and a piece thrown away. A pattern of dots grows by a stated
rule.</p>

<p>Turn the description into a formula before you compute a single number. If a square of side s
paints one ninth of its area and then repeats on four subsquares of side s over 3, then A(s) is s
squared over 9 plus 4 times A(s / 3), with the recursion stopping at whatever size the problem
states. Once it is a formula it is the same unwinding as everything else in this category.</p>

<p>Read the stopping rule with real care in these. Whether the process halts when a side drops
below 1 or when it reaches 1 changes the answer by an entire level, and because the levels grow
geometrically, that last level is often where most of the quantity being asked about lives.</p>

<h3>A note on when to stop tracing</h3>
<p>If a problem asks for a value that would take more than about fifteen lines to unwind, that is
a deliberate signal that you are meant to find a pattern instead. Compute the first four or five
values, look for a closed form, then test the form against a value you already worked out by hand.
The definitions that reward this are common: doubling at each step, adding a fixed amount at each
step, or summing the integers up to n all have closed forms that turn a page of tracing into one
multiplication.</p>
`

});
