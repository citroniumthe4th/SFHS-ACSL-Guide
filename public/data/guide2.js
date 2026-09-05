window.GUIDE = Object.assign(window.GUIDE || {}, {

"wdtpd": `
<p class="lead">These questions give you a short program and ask what it prints or what value a variable holds. Track assignments and conditions in order, using the ACSL pseudocode rules below.</p>

<h2>The dialect</h2>
<p>ACSL pseudocode is deliberately close to Python, Java, and C without committing to any of them,
so anyone who has written a loop in any language can read it. Assignment uses a single equals sign
and comparison uses a double one, with != for not equal alongside the usual four inequalities.
Arithmetic runs on + - * / and %, with ^ for exponentiation. Logic uses &amp;&amp; for and, || for
or, and ! for not. Three functions appear regularly: abs for absolute value, sqrt for square root,
and int, which the ACSL reference defines as the greatest integer less than or equal to its
argument. That is a floor, not a truncation, and the two part company on negatives: int(3.8) is 3,
which either reading gives, but int(-3.8) is -4 rather than -3.</p>

<p>Control flow is if, then, and else for branching, while for conditional loops, and for with an
optional step for counted ones. Arrays take one or two subscripts, and strings index from zero and
take substrings with a colon, under the rules set out below, not Python's.</p>

<p>Division needs the same care. Unless the problem says otherwise, treat a slash as ordinary real
division and rely on int wherever a whole number is wanted. If a program computes 7 / 2 and then
uses the result as a subscript, look for an int nearby, because the author almost certainly put one
there and you may have skimmed past it. Remember while you are checking that int floors, so a
negative intermediate value lands one lower than truncation would put it.</p>

<h2>Trace on paper, not in your head</h2>
<p>Draw a column for each variable and a row for each loop iteration. Record the condition as well, including the final failed test. This keeps the stopping point separate from the last iteration that changed a value.</p>
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
<p>The program prints -2. Stopping at 14 skips the final iteration: A is still greater than 0, so the body runs again and subtracts 16. The next test is false.</p>

<h2>Loop mechanics that decide answers</h2>
<p>A loop written for i = 1 to 5 runs with i equal to 1, 2, 3, 4, and 5, since both bounds are
inclusive. Add a step and the counter moves by that amount, stopping as soon as the next value
would pass the limit, so for i = 10 to 1 step -3 gives 10, 7, 4, and 1. A limit the step never
lands on is not a problem: for i = 1 to 10 step 4 gives 1, 5, and 9, then stops because 13 is past
10.</p>

<p>What the counter holds once the loop has finished is a different question, and one the ACSL
reference does not answer. Many languages leave it one step past the limit, so that for i = 1 to 5
ends with i at 6, but that is a property of those languages and not a rule ACSL states.</p>

<p>So if a program prints the counter after its loop, read what the problem itself tells you. If it
tells you nothing, say so in your working instead of assuming a value: a question that depends on
this will define it.</p>

<p>A while loop tests before its body, which means a condition that starts out false gives zero
passes and leaves every variable untouched. Whenever the answer to a while question looks
suspiciously like the starting value, check whether the loop ever ran at all before assuming you
made an arithmetic error.</p>

<h2>Arrays</h2>
<p>Check the declaration and loop bounds to determine where array indexing starts. ACSL pseudocode uses both zero-based and one-based arrays.</p>

<p>Two dimensional arrays are written with the row first, so A(i, j) means row i and column j. When
a program walks a matrix and swaps A(i, j) with A(j, i) it is transposing, and the loop bounds
decide whether it does each swap once or twice. Swapping across the entire square performs every
exchange twice and therefore leaves the matrix exactly as it was, which is a favourite trick and
looks like a bug in your own working, when it is the point of the question.</p>

<h2>Strings</h2>
<p>Strings index from zero, so for S = "PROGRAM" the first character is S[0] and the last is S[6].
The substring notation is where ACSL differs from the languages you have written in, and it differs
in two ways. A single bound is a count of characters taken from the end the colon leans towards, so
S[:3] is the first three characters, PRO, and S[4:] is the last four, GRAM. Two bounds are positions
and the second is included, so S[2:5] is positions 2 through 5, which is OGRA, not OGR.</p>

<p>The official page states it with S = "ACSL WDTPD": S[:3] is ACS, S[4:] is DTPD, and S[2:6] is
SL WD. Check any substring you are unsure about against those three before you commit to it.</p>

<p>Concatenation uses a plus sign, and the pattern worth watching for is a loop that builds a
string one character at a time. Writing t = t + s[i] appends and preserves the order, while
t = s[i] + t prepends and reverses it. Those two lines look nearly identical on a printed page and
produce opposite answers, so read the order every time and write out the value of t after each
pass.</p>

<h2>Working one under time pressure</h2>
<p>Read the whole program before computing anything, and try to work out what it is meant to do,
because knowing the intent catches your own arithmetic slips before they reach the answer line.
Then write down the initial values, build the trace table with a column for the loop condition,
and finally answer exactly the question that was asked. Some problems want the final value of a
variable, some want the number of times a loop ran, and some want what was printed inside the loop instead of after it, and those are three different answers to the same trace.</p>

<p>If a trace is long, look for a running sum, repeated multiplication, or a repeating state. A pattern can shorten the calculation, but check that conditions and assignments do not change it partway through.</p>
`,

"wdtpd-branching": `
<p class="lead">Contest 1 for Junior focuses on branching. Evaluate each condition using the values the variables hold at that point, then trace only the branch that runs.</p>

<h2>The shape of a branch</h2>
<pre><code>if condition then
    statements
else
    statements
end if</code></pre>
<p>The else part is optional. When the condition is false and no else exists, nothing at all
happens and the program simply continues after end if, which sounds obvious until it is buried
three levels deep in a nested structure.</p>

<h2>Conditions</h2>
<p>A condition compares two values with one of &lt;, &gt;, &lt;=, &gt;=, ==, or !=, and note that
the comparison is a double equals sign while a single one assigns. Conditions combine with
&amp;&amp; for and, || for or, and ! for not.</p>

<p>Precedence runs not first, then the comparisons, then and, then or. So the condition
a &gt; 5 || b &lt; 2 &amp;&amp; c == 0 means a greater than 5, or else both of the other two at
once. When a problem mixes and with or and leaves out the parentheses, that grouping is the entire
point of the question, and evaluating strictly left to right will land you on the wrong branch.</p>

<h2>Nesting, and which else belongs to which if</h2>
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
<p>There are three outcomes here, and the first else belongs to the inner if and the second belongs to the outer if. With x equal to 5
and y equal to 50, z comes out as 3, because the outer condition failed and the inner if never ran
at all, which makes the value of y irrelevant no matter how tempting it looks. Answering 2 means
you attached that inner else to the outer if.</p>

<p>A chain written as if, else if, else if, else is not the same as a run of separate if
statements. In the chain at most one branch ever runs. In a run of separate ifs several can run
one after another, and an earlier one can change the very value a later one is about to test.</p>

<h2>Order of assignment and test</h2>
<p>Compare two separate IF statements with an IF followed by ELSE IF:</p>
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

<h2>How to trace one</h2>
<p>Write the variables in a row and update them line by line, crossing old values out instead of erasing them so that you can retrace your steps when the answer looks wrong. When you reach a
condition, write it out with the current numbers substituted in, decide true or false, and note
which branch you took. Inside a nested structure, note which if you are currently inside as well,
since that is the piece most often dropped.</p>

<p>Then answer the question that was asked. Some of these programs produce output inside a branch,
so a branch that never runs means nothing is printed at all, and the answer is that there is no output, not a number.</p>

<h2>Before you commit to a trace</h2>
<p>Run these four over your trace before you commit to it. Read every condition and confirm you
have a comparison and not an assignment. Draw a line from each else to the if it belongs to. Check
that each condition was evaluated against the value the variable held at that moment, not the one it
started with. And confirm that every not covers only the thing immediately after it, unless
parentheses widen it.</p>

<p>Keep the conditions and their results beside your trace so you can check where each branch was taken.</p>
`

});
