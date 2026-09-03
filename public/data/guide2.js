window.GUIDE = Object.assign(window.GUIDE || {}, {

"wdtpd": `
<p class="lead">You are handed a short program and asked what it prints or what a variable holds
when it stops. Nothing has to be written and nothing has to be debugged, so the entire skill is
tracing accurately while a clock runs, which is a narrower and more mechanical talent than it
first appears.</p>

<h3>The dialect</h3>
<p>ACSL pseudocode is deliberately close to Python, Java, and C without committing to any of them,
so anyone who has written a loop in any language can read it. Assignment uses a single equals sign
and comparison uses a double one, with != for not equal alongside the usual four inequalities.
Arithmetic runs on + - * / and %, with ^ for exponentiation. Logic uses &amp;&amp; for and, || for
or, and ! for not. Three functions appear regularly: abs for absolute value, sqrt for square root,
and int, which discards the fractional part rather than rounding.</p>

<p>Control flow is if, then, and else for branching, while for conditional loops, and for with an
optional step for counted ones. Arrays take one or two subscripts, and strings index from zero and
support slicing with a colon.</p>

<p>Division is the one place where the dialect can bite you. Unless the problem says otherwise,
treat a slash as ordinary real division and rely on int wherever truncation is wanted. If a
program computes 7 / 2 and then uses the result as a subscript, look for an int nearby, because
the author almost certainly put one there and you may have skimmed past it.</p>

<h3>Trace on paper, not in your head</h3>
<p>This is the single habit that separates people who score well in this category from people who
know exactly as much and score badly. Draw a column for every variable the program touches, add a
row for each pass, and fill it in. It feels slow for the first two rows and is faster than any
alternative from the third onward, because you never have to remember a value you have already
written down.</p>
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
<p>The program prints -2. Almost everyone who traces this in their head answers 14, because 14 is
the last value that still looks like it belongs, and the pass that drives A negative feels like it
should not have happened. Giving the condition its own column is what makes that pass impossible
to skip.</p>

<h3>Loop mechanics that decide answers</h3>
<p>A loop written for i = 1 to 5 runs with i equal to 1, 2, 3, 4, and 5, since both bounds are
inclusive. Add a step and the counter moves by that amount, stopping as soon as the next value
would pass the limit, so for i = 10 to 1 step -3 gives 10, 7, 4, and 1. A limit the step never
lands on is not a problem: for i = 1 to 10 step 4 gives 1, 5, and 9, then stops because 13 is past
10.</p>

<p>When the loop finishes, the counter holds the first value that failed the test rather than the
last one that passed, so after for i = 1 to 5 the counter holds 6. Problems that print the counter
after the loop are testing precisely this, and there is no way to get it right by intuition.</p>

<p>A while loop tests before its body, which means a condition that starts out false gives zero
passes and leaves every variable untouched. Whenever the answer to a while question looks
suspiciously like the starting value, check whether the loop ever ran at all before assuming you
made an arithmetic error.</p>

<h3>Arrays</h3>
<p>Read the problem to find out where the indexing starts, because ACSL uses both conventions and
always tells you which one applies, usually in the declaration or in the bounds of the first
loop.</p>

<p>Two dimensional arrays are written with the row first, so A(i, j) means row i and column j. When
a program walks a matrix and swaps A(i, j) with A(j, i) it is transposing, and the loop bounds
decide whether it does each swap once or twice. Swapping across the entire square performs every
exchange twice and therefore leaves the matrix exactly as it was, which is a favourite trick and
looks like a bug in your own working rather than the point of the question.</p>

<h3>Strings</h3>
<p>Strings index from zero, so for s = "PROGRAM" the first character is s[0] and the last is s[6].
A slice s[a:b] runs from index a up to but not including index b, which makes s[0:3] equal to PRO,
and leaving out either side means run to that end, so s[:3] is PRO and s[4:] is RAM. The length of
a slice is always the second bound minus the first, which is the quickest way to check one.</p>

<p>Concatenation uses a plus sign, and the pattern worth watching for is a loop that builds a
string one character at a time. Writing t = t + s[i] appends and preserves the order, while
t = s[i] + t prepends and reverses it. Those two lines look nearly identical on a printed page and
produce opposite answers, so read the order every time and write out the value of t after each
pass.</p>

<h3>Working one under time pressure</h3>
<p>Read the whole program before computing anything, and try to work out what it is meant to do,
because knowing the intent catches your own arithmetic slips before they reach the answer line.
Then write down the initial values, build the trace table with a column for the loop condition,
and finally answer exactly the question that was asked. Some problems want the final value of a
variable, some want the number of times a loop ran, and some want what was printed inside the loop
rather than after it, and those are three different answers to the same trace.</p>

<p>If the loop is clearly going to run thirty or more times, stop tracing and look for the pattern.
These problems are written so that a shortcut exists, and it is nearly always an arithmetic
sequence, a doubling, or a value that settles into a short cycle after three or four passes.</p>
`,

"wdtpd-branching": `
<p class="lead">Contest 1 for Junior. The programs here are short, and all of the difficulty lives
in the conditions and in which branch actually runs. Get the conditions right and the arithmetic
takes care of itself.</p>

<h3>The shape of a branch</h3>
<pre><code>if condition then
    statements
else
    statements
end if</code></pre>
<p>The else part is optional. When the condition is false and no else exists, nothing at all
happens and the program simply continues after end if, which sounds obvious until it is buried
three levels deep in a nested structure.</p>

<h3>Conditions</h3>
<p>A condition compares two values with one of &lt;, &gt;, &lt;=, &gt;=, ==, or !=, and note that
the comparison is a double equals sign while a single one assigns. Conditions combine with
&amp;&amp; for and, || for or, and ! for not.</p>

<p>Precedence runs not first, then the comparisons, then and, then or. So the condition
a &gt; 5 || b &lt; 2 &amp;&amp; c == 0 means a greater than 5, or else both of the other two at
once. When a problem mixes and with or and leaves out the parentheses, that grouping is the entire
point of the question, and evaluating strictly left to right will land you on the wrong branch.</p>

<h3>Nesting, and which else belongs to which if</h3>
<p>An if inside an if is how these problems get their difficulty. Indentation is your friend, and
if the problem is printed with sloppy indentation, redraw it before you trace it.</p>
<pre><code>if x &gt; 10 then
    if y &gt; 10 then
        z = 1
    else
        z = 2
    end if
else
    z = 3
end if</code></pre>
<p>There are three outcomes here, and the second else belongs to the inner if. With x equal to 5
and y equal to 50, z comes out as 3, because the outer condition failed and the inner if never ran
at all, which makes the value of y irrelevant no matter how tempting it looks. Answering 2 means
you attached that inner else to the outer if.</p>

<p>A chain written as if, else if, else if, else is not the same as a run of separate if
statements. In the chain at most one branch ever runs. In a run of separate ifs several can run
one after another, and an earlier one can change the very value a later one is about to test.</p>

<h3>Order of assignment and test</h3>
<p>That last distinction matters more than it sounds, so it is worth seeing:</p>
<pre><code>a = 5
if a &gt; 3 then
    a = a - 4
end if
if a &gt; 3 then
    a = a * 10
end if
output a</code></pre>
<p>The first condition is true and leaves a holding 1. The second condition then tests that new
value of 1, not the original 5, so it is false and nothing happens, and the program prints 1.
Rewrite those two blocks as an if and an else if and the answer here happens to stay the same, but
reverse the order of the blocks and it will not, which is the sort of thing the setter is
checking.</p>

<h3>How to trace one</h3>
<p>Write the variables in a row and update them line by line, crossing old values out rather than
erasing them so that you can retrace your steps when the answer looks wrong. When you reach a
condition, write it out with the current numbers substituted in, decide true or false, and note
which branch you took. Inside a nested structure, note which if you are currently inside as well,
since that is the piece people lose.</p>

<p>Then answer the question that was asked. Some of these programs produce output inside a branch,
so a branch that never runs means nothing is printed at all, and the answer is that there is no
output rather than a number.</p>

<h3>The mistakes that actually happen</h3>
<p>Reading a single equals sign in a condition as a comparison is the most common, followed closely
by attaching an else to the wrong if. After those come evaluating a condition against a variable's
original value when an earlier branch has already changed it, and forgetting that a not applies
only to the thing immediately after it unless parentheses say otherwise. None of these are
conceptual gaps, which is what makes them worth guarding against deliberately rather than trusting
that you know better.</p>
`

});
