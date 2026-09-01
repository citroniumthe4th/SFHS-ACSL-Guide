window.GUIDE = Object.assign(window.GUIDE || {}, {

"wdtpd": `
<p class="lead">Contest 1 for Senior. You are handed a short program in pseudocode and asked
what it prints or what a variable ends up holding. No writing, no debugging, just accurate
tracing under time pressure.</p>

<h3>The dialect</h3>
<p>ACSL pseudocode is deliberately close to Python, Java, and C without being any of them.
The pieces you will meet:</p>
<ul>
<li>Assignment with = and comparison with ==. Also != for not equal, plus &lt;, &gt;, &lt;=,
and &gt;=.</li>
<li>Arithmetic with + - * / and %, and ^ for exponentiation. Note that ^ is a power here, not
exclusive or.</li>
<li>Logic with &amp;&amp; for and, || for or, and ! for not.</li>
<li>Three functions: abs(x) for absolute value, sqrt(x) for square root, and int(x), which
throws away the fractional part.</li>
<li>IF, THEN, and ELSE for branching, WHILE for conditional loops, and FOR with an optional
step for counted loops.</li>
<li>Arrays with one or two subscripts, and strings that index from 0 and support slicing with
a colon.</li>
</ul>
<p>Division is the one place where the dialect can bite. Unless a problem says otherwise,
treat / as real division and use int() when the program asks for truncation. If a program
computes 7 / 2 and stores it in something used as a subscript, look for an int() nearby,
because the problem author almost certainly put one there.</p>

<h3>Trace with a table, not in your head</h3>
<p>This is the single highest value habit in the whole category. Draw a column for every
variable the program touches, add a row per iteration, and fill it in. It feels slow for the
first two rows and then it is faster than anything else, because you never have to remember a
value you already wrote down.</p>
<pre><code>A = 50
B = 10
while A &gt; 0
    A = A - B
    B = B + 2
end while
output A</code></pre>
<table class="tbl">
<tr><th>pass</th><th>A at top</th><th>A &gt; 0</th><th>A after</th><th>B after</th></tr>
<tr><td>1</td><td>50</td><td>yes</td><td>40</td><td>12</td></tr>
<tr><td>2</td><td>40</td><td>yes</td><td>28</td><td>14</td></tr>
<tr><td>3</td><td>28</td><td>yes</td><td>14</td><td>16</td></tr>
<tr><td>4</td><td>14</td><td>yes</td><td>-2</td><td>18</td></tr>
<tr><td>5</td><td>-2</td><td>no</td><td>-</td><td>-</td></tr>
</table>
<p>The output is -2. Someone tracing in their head almost always answers 14, because that is
the last positive value and the loop feels like it should stop there. The table makes the
extra pass impossible to miss.</p>

<h3>Loop mechanics that decide answers</h3>
<p>A loop written for i = 1 to 5 runs with i equal to 1, 2, 3, 4, and 5. The bound is
inclusive on both ends. With a step, as in for i = 10 to 1 step -3, the values are 10, 7, 4, and
1, and the loop stops when the next value would pass the limit.</p>
<p>A loop with a bound the step never lands on still runs. The loop for i = 1 to 10 step 4 gives
1, 5, and 9, then stops because 13 is past 10.</p>
<p>A while loop tests before the body, so a false condition on entry means zero passes. If a
problem seems to have an answer equal to its starting value, check whether the loop ever ran
at all.</p>

<h3>Arrays</h3>
<p>Read the problem for where indexing starts. ACSL problems usually index from 1 in
pseudocode that declares an array of size N, but they sometimes index from 0. The declaration
or the first loop tells you which.</p>
<p>Two dimensional arrays are written A(I, J) or A[I][J], with the row first. When a program
walks a matrix and swaps A(I, J) with A(J, I), it is transposing, and the loop bounds tell you
whether it does the swap once or twice. Swapping over the full square undoes itself and
leaves the matrix unchanged, which is a favorite trick question.</p>

<h3>Strings</h3>
<p>Strings index from 0. For S = "PROGRAM", S[0] is P and S[6] is M. A slice S[a:b] takes
characters from index a up to but not including index b, so S[0:3] is PRO. Leaving out a side
means go to the end, so S[:3] is PRO and S[4:] is RAM.</p>
<p>Concatenation uses +. Building a string backwards one character at a time, with something
like T = S[I] + T, is a common pattern and a common place to reverse the answer by accident.
Write out the value of T after each pass.</p>

<h3>How to attack one under time pressure</h3>
<ol>
<li>Read the whole program before computing anything. Decide what it is trying to do, because
knowing the intent catches your own arithmetic slips.</li>
<li>Write down the initial values.</li>
<li>Build the trace table. Add a column for the loop condition, not just the variables.</li>
<li>Answer exactly what was asked. Some problems ask for the number of times a loop ran, some
ask for the final value, and some ask what is printed inside the loop rather than after it.</li>
</ol>
<p>If the loop clearly runs thirty or more times, stop tracing and look for the pattern. These
problems are written so that a shortcut exists, usually an arithmetic sequence or a value that
settles into a cycle after three or four passes.</p>
`,

"wdtpd-branching": `
<p class="lead">Contest 1 for Junior. The programs here are short and the control flow is all
in the IF statements. Everything comes down to evaluating conditions correctly and following
the right branch.</p>

<h3>The shape of an if</h3>
<pre><code>if condition then
    statements
else
    statements
end if</code></pre>
<p>The ELSE part is optional. When the condition is false and there is no ELSE, nothing happens
and the program continues after end if.</p>

<h3>Conditions</h3>
<p>A condition compares two values with &lt;, &gt;, &lt;=, &gt;=, ==, or !=. Note that == is
the comparison and = is the assignment. Conditions combine with &amp;&amp; for and, || for or,
and ! for not.</p>
<p>Precedence runs ! first, then the comparisons, then &amp;&amp;, then ||. So the condition
A &gt; 5 || B &lt; 2 &amp;&amp; C == 0 means A &gt; 5 OR (B &lt; 2 AND C == 0). When a problem
mixes and with or and does not use parentheses, that grouping is usually the point of the
question.</p>

<h3>Nested and chained</h3>
<p>An if inside an if is the standard way these problems get their difficulty. Indentation is
your friend, and if the problem is printed with sloppy indentation, redraw it.</p>
<pre><code>if X &gt; 10 then
    if Y &gt; 10 then
        Z = 1
    else
        Z = 2
    end if
else
    Z = 3
end if</code></pre>
<p>Three outcomes, and the second ELSE belongs to the inner IF. With X = 5 and Y = 50, Z is 3,
because the outer condition failed and the inner IF never ran at all. Getting Z = 2 there means
you attached the inner ELSE to the outer IF.</p>
<p>A chain written as IF, ELSE IF, ELSE IF, ELSE is different from a run of separate IF
statements. In a chain, at most one branch runs. In separate IFs, several can run in a row, and
an earlier one can change the value that a later one tests.</p>

<h3>The order of assignment and test</h3>
<p>This catches people constantly:</p>
<pre><code>A = 5
if A &gt; 3 then
    A = A - 4
end if
if A &gt; 3 then
    A = A * 10
end if
output A</code></pre>
<p>The first IF is true and leaves A at 1. The second IF tests the new value of 1, which is not
greater than 3, so nothing happens and the output is 1. If those had been an IF and an ELSE IF,
the answer would be the same here, but reverse the two blocks and it would not.</p>

<h3>How to trace</h3>
<p>Write the variables in a row and update them line by line, crossing out old values rather
than erasing them. When you reach an IF, write the condition out with the current numbers
substituted in, decide true or false, and note which branch you took. On a nested IF, write
which IF you are inside.</p>
<p>The last step is to answer the question asked. Some of these problems output inside a
branch, so a branch that never runs means nothing is printed at all.</p>

<h3>Common traps</h3>
<ul>
<li>Reading = as a comparison. In a condition it is ==.</li>
<li>Attaching an ELSE to the wrong IF.</li>
<li>Evaluating a condition against the original value of a variable after an earlier branch
already changed it.</li>
<li>Forgetting that ! applies only to the thing right after it unless parentheses say
otherwise.</li>
<li>Assuming both sides of an || get evaluated. For tracing purposes it does not matter, since
these programs have no side effects inside conditions, but the truth value still needs the
whole expression.</li>
</ul>
`

});
