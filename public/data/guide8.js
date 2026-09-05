window.GUIDE = Object.assign(window.GUIDE || {}, {

"assembly": `
<p class="lead">ACSL defines its own assembly language for a machine with a single accumulator. Questions give you a short program to trace and ask what it prints, what a memory location holds, or what calculation it performs.</p>

<h2>The machine</h2>
<p>There is one register, called the accumulator, and as many named memory words as the program
mentions. The accumulator starts at zero. DC declarations supply the initial values of named memory words. Execution runs top to bottom unless a branch sends it
elsewhere.</p>

<p>Each line has up to three fields separated by spaces: an optional label, an opcode, and an
optional operand. A label is any name that is not itself an opcode, and it marks the line so that a
branch can jump to it. An operand is either the name of a memory word or an immediate value written
with a leading equals sign, so LOAD X reads the word X while LOAD =7 loads the number seven
itself.</p>

<h2>The instruction set</h2>
<table class="tbl">
<tr><th>Opcode</th><th>Effect</th></tr>
<tr><td>LOAD LOC</td><td>copy LOC into the accumulator</td></tr>
<tr><td>STORE LOC</td><td>copy the accumulator into LOC, no immediate allowed</td></tr>
<tr><td>ADD LOC</td><td>accumulator becomes accumulator plus LOC</td></tr>
<tr><td>SUB LOC</td><td>accumulator becomes accumulator minus LOC</td></tr>
<tr><td>MULT LOC</td><td>accumulator becomes accumulator times LOC</td></tr>
<tr><td>DIV LOC</td><td>accumulator becomes the signed integer part of accumulator over LOC</td></tr>
<tr><td>BG LOC</td><td>branch to the line labelled LOC when the accumulator is greater than 0</td></tr>
<tr><td>BE LOC</td><td>branch when the accumulator equals 0</td></tr>
<tr><td>BL LOC</td><td>branch when the accumulator is less than 0</td></tr>
<tr><td>BU LOC</td><td>branch unconditionally</td></tr>
<tr><td>READ LOC</td><td>read the next input value into LOC</td></tr>
<tr><td>PRINT LOC</td><td>print the contents of LOC</td></tr>
<tr><td>DC constant</td><td>define the labelled word to hold that constant</td></tr>
<tr><td>END</td><td>stop</td></tr>
</table>

<p>The accumulator is the left operand: SUB X computes ACC - X. DIV keeps the signed integer part of the quotient, so it truncates toward zero. BG, BE, and BL compare ACC with zero. To compare two stored values, load one, subtract the other, and branch on the sign of the result.</p>

<p>The fourth is easy to miss because nothing on screen announces it: <strong>READ, ADD, SUB and
MULT all work modulo 1,000,000</strong>. A sum that would reach 1,000,000 wraps to 0, and a value
read in is reduced the same way. DIV is the exception, taking the integer part of the quotient with
no wrap. Reduce after every arithmetic instruction rather than at the end, since the wrap changes
what a later comparison sees.</p>

<h2>How to trace one</h2>
<p>Number the lines before you start, then keep a table with a column for the accumulator and one
for each memory word, adding a row for every instruction that changes something. Do not skip rows to
save time. These programs loop, and a loop with an untracked variable becomes unreadable after four
passes.</p>

<p>This program multiplies a running product by N, N - 1, and so on down to 1. For positive N, it computes N! using the machine's modulo 1,000,000 arithmetic:</p>
<pre><code>       READ  N
       LOAD  =1
       STORE F
TOP    LOAD  N
       BE    OUT
       LOAD  F
       MULT  N
       STORE F
       LOAD  N
       SUB   =1
       STORE N
       BU    TOP
OUT    PRINT F
       END</code></pre>
<p>With N read as 4, the loop multiplies F by N and then decrements N, so the rows go F equal to 4
with N at 3, then F at 12 with N at 2, then F at 24 with N at 1, then F still 24 with N at 0, at
which point the BE fires and the program prints 24.</p>

<p>Notice that the loop test sits at the top and reloads N before branching. A common misreading is
to assume the loop runs while N is greater than zero and to stop one pass early, and the only
defence is to trace the reload rather than the intent.</p>

<h2>Idioms worth recognising on sight</h2>
<p>Comparing two values is LOAD A, SUB B, then BG or BL, since the sign of the difference is the
comparison. A count down loop is LOAD counter, BE exit, do the work, then LOAD counter, SUB =1,
STORE counter, BU top. A running total is LOAD sum, ADD item, STORE sum. Absolute value is LOAD X,
BG done, MULT =-1, then store.</p>

<p>There is no modulo instruction, so a remainder is built as X minus (X divided by Y) times Y,
relying on the truncating divide. And a swap needs a third memory word, because there is only one
accumulator to hold a value in transit.</p>

<h2>What the trace table is for</h2>
<p>With the trace table beside you, check these six. On every SUB and DIV, is the accumulator the
left operand? Before each branch, does the accumulator still hold the value you meant to test, or has
an instruction since then overwritten it? Does the loop run the number of passes your table shows
rather than the number you expected? Is every DC treated as a value set up before the program starts
rather than as an instruction that executes? On a negative quotient, did you truncate toward zero, so
that -7 divided by 2 is -3? And after each READ, ADD, SUB and MULT, did you reduce modulo 1,000,000
before carrying the value forward?</p>
`,

"wdtpd-strings": `
<p class="lead">Contest 4 for Junior covers strings. ACSL pseudocode indexes strings from zero and has its own substring notation. Label the character positions, then check whether each bracket form specifies one index, two endpoints, or a starting index and a count.</p>

<h2>Indexing and substrings</h2>
<p>Positions start at 0. For S equal to "PROGRAM" the characters sit at positions 0 through 6, so
S[0] is P and S[6] is M, and there is no position 7. Reading a single character is the easy half.</p>

<p>ACSL uses three substring forms. The examples below use S = "ACSL WDTPD", a ten-character string from the official topic page.</p>

<table class="ex">
<tr><th>Written</th><th>Means</th><th>Result</th></tr>
<tr><td><code>S[:3]</code></td><td>the first 3 characters</td><td><code>ACS</code></td></tr>
<tr><td><code>S[4:]</code></td><td>the last 4 characters</td><td><code>DTPD</code></td></tr>
<tr><td><code>S[2:6]</code></td><td>positions 2 through 6, both ends included</td><td><code>SL WD</code></td></tr>
<tr><td><code>S[0]</code></td><td>the character at position 0</td><td><code>A</code></td></tr>
</table>

<p>Two things there will catch you if you read them at speed. When only one bound is written it is a
<em>count</em> of characters, not a position, and it counts from whichever end the colon leans
towards: S[4:] is the last four characters, not everything from position 4 onward. When both bounds
are written they are <em>positions</em>, and the second one is included, so S[2:6] is five characters
rather than four.</p>

<p>If you have written Python, note that only the first of those forms means the same thing in both.
Python reads S[4:] as everything from index 4 and S[2:6] as stopping before index 6. Work an example
before you rely on a habit: for S = "PROGRAM", S[2:5] is positions 2, 3, 4 and 5, which is OGRA.</p>

<h2>The operations you will meet</h2>
<p>Concatenation uses a plus sign, so "AB" + "CD" is "ABCD". The function len(s) gives the length. A search can loop through characters and record a matching index or count. To replace characters, follow the assignments in the problem, or build a new string one character at a time.</p>

<p>The operation that matters most is building a string inside a loop, because two nearly identical
lines behave oppositely. Writing t = t + s[i] appends and preserves the order, while t = s[i] + t
prepends and reverses it. On a printed page those look the same at a glance, so read the order
deliberately every time.</p>

<h2>Trace with the indices written down</h2>
<p>Write the string once across the page and put the index under each character before you start.
Every question about s[i] or s[i:j] then becomes a matter of pointing at the paper instead of
counting in your head.</p>
<pre><code>t = ""
s = "ACSL"
for i = 0 to 3
    t = s[i] + t
next i
output t</code></pre>
<table class="tbl">
<tr><th>i</th><th>s[i]</th><th>t after</th></tr>
<tr><td>0</td><td>A</td><td>A</td></tr>
<tr><td>1</td><td>C</td><td>CA</td></tr>
<tr><td>2</td><td>S</td><td>SCA</td></tr>
<tr><td>3</td><td>L</td><td>LSCA</td></tr>
</table>
<p>The program prints LSCA. Change the body to t = t + s[i] and it prints ACSL instead. One
character moved and the whole answer flipped, so the order of concatenation changes the result.</p>

<h2>Program shapes that keep coming back</h2>
<p>A reversal either builds backwards by prepending, or loops from the last index down to 0 and
appends. A palindrome check compares s[i] with s[len - 1 - i] as i runs to the middle, and the minus
1 is there because indexing starts at 0, so dropping it is the most common error in the whole
category. Counting occurrences is a loop with a condition and a counter. Taking every other character
is a loop with step 2, where the starting index decides which half you get. And a Caesar shift
converts a character to a number, adds a shift, wraps with a modulo, and converts back, so check
whether the wrap uses 26 and where the alphabet is taken to start.</p>

<h2>Before you write the substring down</h2>
<p>Before you write anything down, run these four checks on your work. Did you count positions from
0 rather than 1? Did you use len(s) - 1 as the last valid position rather than len(s)? For a
two-bound substring, did you include the character at the second position? And did you read the
order of the concatenation, since t = t + s[i] appends while t = s[i] + t prepends and reverses?</p>

<p>One more, about loop counters. If a program prints the counter after its loop has finished, do
not assume a value for it. The ACSL reference does not define what a FOR counter holds once the loop
ends, so read what the problem itself tells you and, if it tells you nothing, take the counter as
undefined rather than guessing at one past the limit.</p>
`

});
