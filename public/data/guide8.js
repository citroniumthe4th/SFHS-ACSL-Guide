window.GUIDE = Object.assign(window.GUIDE || {}, {

"assembly": `
<p class="lead">ACSL defines its own assembly language for a machine with a single accumulator. You
will never run it on anything, and you are never asked to write a program in it. You read a short
program and say what it prints or what a memory word holds when it stops, which makes this a tracing
category with an unfamiliar vocabulary rather than a programming one.</p>

<h3>The machine</h3>
<p>There is one register, called the accumulator, and as many named memory words as the program
mentions. Everything starts at zero. Execution runs top to bottom unless a branch sends it
elsewhere.</p>

<p>Each line has up to three fields separated by spaces: an optional label, an opcode, and an
optional operand. A label is any name that is not itself an opcode, and it marks the line so that a
branch can jump to it. An operand is either the name of a memory word or an immediate value written
with a leading equals sign, so LOAD X reads the word X while LOAD =7 loads the number seven
itself.</p>

<h3>The instruction set</h3>
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

<p>Three details decide most answers. The accumulator is always the left operand, so SUB X means the
accumulator minus X rather than the other way round. DIV truncates toward zero rather than flooring,
which matters as soon as anything goes negative. And the branch instructions test the accumulator
against zero and nothing else, so comparing two values means subtracting one from the other first
and reading the sign of the result.</p>

<h3>How to trace one</h3>
<p>Number the lines before you start, then keep a table with a column for the accumulator and one
for each memory word, adding a row for every instruction that changes something. Do not skip rows to
save time. These programs loop, and a loop with an untracked variable becomes unreadable after four
passes.</p>

<p>Here is factorial, which is the example worth knowing by heart because so many contest programs
are variations on it:</p>
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

<h3>Idioms worth recognising on sight</h3>
<p>Comparing two values is LOAD A, SUB B, then BG or BL, since the sign of the difference is the
comparison. A count down loop is LOAD counter, BE exit, do the work, then LOAD counter, SUB =1,
STORE counter, BU top. A running total is LOAD sum, ADD item, STORE sum. Absolute value is LOAD X,
BG done, MULT =-1, then store.</p>

<p>There is no modulo instruction, so a remainder is built as X minus (X divided by Y) times Y,
relying on the truncating divide. And a swap needs a third memory word, because there is only one
accumulator to hold a value in transit.</p>

<h3>Operand order, and what else bites</h3>
<p>Reversing the operand order on SUB or DIV is the most common. Then branching on the wrong sign,
or forgetting that the accumulator must be reloaded before a branch when an intervening instruction
has changed it. Running a loop one pass too many or too few, which the trace table prevents.
Treating DC as an executed instruction rather than a value set up before the program runs. And
rounding a negative quotient the wrong way, since -7 divided by 2 is -3 under the ACSL rule and not
-4.</p>
`,

"wdtpd-strings": `
<p class="lead">Contest 4 for Junior. Strings in ACSL pseudocode index from zero and support
slicing, and almost all of the difficulty in this category is index arithmetic rather than logic.</p>

<h3>Indexing and slicing</h3>
<p>For s equal to "PROGRAM", the characters sit at indices 0 through 6, so s[0] is P and s[6] is M,
and there is no index 7. A slice s[a:b] takes the characters from index a up to but not including
index b, which makes s[2:5] equal to OGR. The length of a slice is always the second bound minus the
first, which is the quickest way to check one you are unsure about.</p>

<p>Leaving out one side of a slice means run to that end of the string, so s[:3] is PRO and s[4:] is
RAM, and leaving out both gives the whole string. A slice where the first bound is not less than the
second comes out empty, and that is not an error, which matters when a loop pushes a bound past the
point where it still makes sense.</p>

<h3>The operations you will meet</h3>
<p>Concatenation uses a plus sign, so "AB" + "CD" is "ABCD". Length is written len(s) or LEN(s)
depending on the problem. Searching is a loop comparing s[i] against a character and either counting
or recording the index. Replacing is done by building a new string, since a single character cannot
be assigned in place.</p>

<p>The operation that matters most is building a string inside a loop, because two nearly identical
lines behave oppositely. Writing t = t + s[i] appends and preserves the order, while t = s[i] + t
prepends and reverses it. On a printed page those look the same at a glance, so read the order
deliberately every time.</p>

<h3>Trace with the indices written down</h3>
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
character moved and the whole answer flipped, which is the entire lesson of this category compressed
into two lines.</p>

<h3>Program shapes that keep coming back</h3>
<p>A reversal either builds backwards by prepending, or loops from the last index down to 0 and
appends. A palindrome check compares s[i] with s[len - 1 - i] as i runs to the middle, and the minus
1 is there because indexing starts at 0, so dropping it is the most common error in the whole
category. Counting occurrences is a loop with a condition and a counter. Taking every other character
is a loop with step 2, where the starting index decides which half you get. And a Caesar shift
converts a character to a number, adds a shift, wraps with a modulo, and converts back, so check
whether the wrap uses 26 and where the alphabet is taken to start.</p>

<h3>The minus one</h3>
<p>Treating the second slice bound as inclusive. Indexing from 1 out of habit. Using len(s) rather
than len(s) - 1 as the last valid index. Appending where the program prepends. And forgetting that
the loop counter sits one past the limit once the loop has ended, which matters whenever the program
prints it afterwards.</p>
`

});
