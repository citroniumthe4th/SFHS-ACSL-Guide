window.GUIDE = Object.assign(window.GUIDE || {}, {

"number-systems": `
<p class="lead">Read 3204 in base 8 as 3 &times; 512 + 2 &times; 64 + 0 &times; 8 + 4 &times; 1, which is 1668. Each digit contributes its value multiplied by a power of the base.</p>

<p>Place value is the starting point for converting numbers and doing arithmetic in another base. If a conversion is unclear, expand the number as a sum of digits times powers of the base.</p>

<h2>Place value</h2>
<p>Number the positions from the right, starting at 0 for the units digit. In base b, the digit at position k contributes its value times b<sup>k</sup>. For example, 3204<sub>8</sub> = 3 &times; 8<sup>3</sup> + 2 &times; 8<sup>2</sup> + 0 &times; 8 + 4 = 1668<sub>10</sub>.</p>

<p>ACSL focuses on binary, octal, decimal, and hexadecimal. They use digits 0 through 1, 7, 9, and 15 respectively, with A through F standing for 10 through 15 in hexadecimal. This site also includes a few extension questions in other bases, marked separately in practice.</p>

<h2>What to have memorized</h2>
<p>The ACSL wiki recommends knowing powers of 2 and 8 through 4096, powers of 16 through 65,536, and the binary values of octal and hexadecimal digits. Each octal digit corresponds to three bits, and each hexadecimal digit to four. Start with the table below and practice converting small numbers without looking.</p>

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

<h2>Moving between binary, octal, and hexadecimal</h2>
<p>Because 8 is 2 cubed and 16 is 2 to the fourth, binary sits underneath both of the other two,
and you can pass through it mechanically. To turn binary into octal, group the bits into threes
starting from the right, padding the leftmost group with zeros if it comes up short, and read each
group as a single digit. For hexadecimal you do the same thing with groups of four. Going the
other way you simply expand each digit back into its bits.</p>

<p>Suppose you are asked to convert 3676 in base 8 to hexadecimal. Expanding each octal digit into
three bits gives 011 110 111 110. Those same twelve bits regrouped into fours from the right are
0111, 1011, and 1110, which read as 7, B, and E. The answer is 7BE, and you never had to think
about what the number actually is.</p>

<p>Converting through decimal is valid, but grouping bits avoids that extra conversion when both bases are powers of two.</p>

<h2>Decimal in and decimal out</h2>
<p>To convert a nonnegative integer from decimal, divide repeatedly by the target base and record each remainder. Read the remainders from bottom to top because the least significant digit comes out first.</p>
<pre><code>1000 / 16 = 62 remainder 8
  62 / 16 =  3 remainder 14 (E)
   3 / 16 =  0 remainder 3
answer, read upward: 3E8</code></pre>

<p>To convert to decimal, expand the place values or use Horner's method: start with the leading digit, then multiply by the base and add the next digit. For 3E8<sub>16</sub>, the running values are 3, then 3 &times; 16 + 14 = 62, then 62 &times; 16 + 8 = 1000.</p>

<h2>Arithmetic without leaving the base</h2>
<p>Addition and subtraction behave exactly as they do in decimal, except that you carry when a
column reaches the base rather than when it reaches ten, and a borrow brings over the base rather
than ten. Working F5AD minus 69EB in hexadecimal, column by column from the right: D minus B is 2.
A minus E will not go, so borrow, making it 26 minus 14, which is 12, or C, and the 5 above drops
to 4. Then 4 minus 9 borrows again, giving 20 minus 9, which is 11, or B, and the F drops to E.
Finally E minus 6 is 8, so the answer is 8BC2. If you have time, checking in decimal is cheap:
62893 minus 27115 is 35778, and 8BC2 is 35778.</p>

<p>One quick sanity check catches most slips. The last digit of a sum or difference depends only
on the last digits of the operands, taken modulo the base, so if your final digit is wrong the mistake is arithmetic and not a misread of the problem.</p>

<h2>Digits after the point</h2>
<p>Positions to the right of the point are worth negative powers of the base, which means 0.101 in
binary is one half plus one eighth, or 0.625. Converting a fraction the other way is repeated
multiplication instead of repeated division: multiply the fractional part by the base, write down
the integer part that pops out, and carry on with what is left. Starting from 0.625, doubling
gives 1.25 so the first bit is 1, doubling 0.25 gives 0.5 so the next bit is 0, and doubling 0.5
gives 1.0 so the last bit is 1, producing 0.101.</p>

<p>Some fractions never terminate. One third in binary is 0.010101 forever, in the same way that
one third in decimal is 0.333 forever, so a problem asking for a fixed number of places will say
how many.</p>

<h2>What the questions actually look like</h2>
<p>Practice conversions between bases and arithmetic within a base. For conversions between binary, octal, and hexadecimal, grouping bits is useful. For subtraction, write each borrow above the column it changes.</p>

<p>A third kind gives you an equation and asks for the base. If 34 in base b equals 28, then
3b + 4 = 28, so b is 8, and you should confirm that every digit used is legal in the base you
found. Counting problems turn up as well, asking how many three digit numbers in some base have no
repeated digit, or how many numbers in a range look a particular way in two bases at once. Finally
there are application problems, most often RGB color codes, where you split six hex digits into
three pairs and treat each pair as its own number between 0 and 255.</p>
`,

"recursive-functions": `
<p class="lead">A recursive function defines some values in terms of other values of the same function. To evaluate it, follow the applicable rule until you reach a base case, then substitute the results back into the pending calls.</p>

<p>Keep each call and its pending arithmetic on a separate line. This makes it possible to check both the arguments and the return values.</p>

<h2>Reading the definition</h2>
<p>ACSL writes a recursive function as a set of rules with a condition attached to each one, like
this:</p>
<pre><code>f(x) = f(x - 3) + 2      if x &gt; 0
f(x) = 3x                otherwise</code></pre>
<p>Choose the rule whose condition is satisfied. In a mathematical piecewise definition, overlapping conditions must give consistent values unless the problem explicitly states a priority. Check the inequality signs before tracing: x > 0 and x >= 0 differ at x = 0.</p>

<h2>Unwinding and winding back</h2>
<p>To evaluate f(11), expand each call until its argument meets the base case. Keep the pending additions beside their calls, then work back up:</p>
<pre><code>f(11) = f(8) + 2
f(8)  = f(5) + 2
f(5)  = f(2) + 2
f(2)  = f(-1) + 2
f(-1) = 3(-1) = -3      base case

f(2)  = -3 + 2 = -1
f(5)  = -1 + 2 = 1
f(8)  =  1 + 2 = 3
f(11) =  3 + 2 = 5</code></pre>
<p>This trace reaches -1 without visiting 0, so changing the condition to x >= 0 would not change f(11). To see the difference, evaluate f(3): the original definition gives f(0) + 2 = 2. With x >= 0, it gives f(-3) + 2 + 2 = -5.</p>

<p>The +2 appears four times in this trace, once for each call that used the recursive rule. Add it at every level on the way back up.</p>

<h2>Two arguments instead of one</h2>
<p>Nothing changes when a second variable appears except that you now have two numbers to keep
straight. Take:</p>
<pre><code>f(x, y) = f(x - y, y - 1) + 2    if x &gt; y
f(x, y) = x + y                  otherwise</code></pre>
<p>For f(12, 6), since 12 is greater than 6 the first rule applies and gives f(6, 5) + 2. Then 6 is
greater than 5, so that becomes f(1, 4) + 2. Now 1 is not greater than 4, the second rule answers
with 5, and winding back up gives 7 and then 9. Write both arguments on every single line, even
when one of them does not move, because the moment you start carrying one of them in your head is
the moment it goes wrong.</p>

<h2>When the definition calls itself twice</h2>
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
exactly what a programmer means by memoisation, and it is worth recognizing that connection,
because the same problem shows up in the programming half of the contest.</p>

<h2>Definitions disguised as pictures</h2>
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

<h2>A note on when to stop tracing</h2>
<p>For a long trace, compute a few values and look for a pattern, such as a constant increase, repeated doubling, or a cycle. Check any proposed shortcut against the definition and base cases before using it. A long trace alone does not guarantee a simple formula.</p>
`

});
