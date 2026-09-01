window.GUIDE = Object.assign(window.GUIDE || {}, {

"assembly": `
<p class="lead">Contest 4 for Senior. ACSL defines its own assembly language for a machine with
one accumulator. You will not run it on anything. You read a short program and say what it
prints or what a memory word holds at the end.</p>

<h3>The machine</h3>
<p>There is one register, called the accumulator or ACC, and as many named memory words as the
program mentions. Everything starts at zero. Execution runs top to bottom unless a branch sends
it somewhere else.</p>
<p>Each line has up to three fields, separated by spaces: an optional label, an opcode, and an
optional operand. A label is any name that is not an opcode, and it marks the line so a branch
can jump to it. An operand is either the name of a memory word or an immediate value written
with a leading equal sign, so LOAD X reads the word X while LOAD =X would be a literal.</p>

<h3>The instruction set</h3>
<table class="tbl">
<tr><th>Opcode</th><th>Effect</th></tr>
<tr><td>LOAD LOC</td><td>copy LOC into the accumulator</td></tr>
<tr><td>STORE LOC</td><td>copy the accumulator into LOC, no immediate allowed</td></tr>
<tr><td>ADD LOC</td><td>accumulator becomes accumulator plus LOC</td></tr>
<tr><td>SUB LOC</td><td>accumulator becomes accumulator minus LOC</td></tr>
<tr><td>MULT LOC</td><td>accumulator becomes accumulator times LOC</td></tr>
<tr><td>DIV LOC</td><td>accumulator becomes the signed integer part of accumulator over LOC</td></tr>
<tr><td>BG LOC</td><td>branch to the line labeled LOC when the accumulator is greater than 0</td></tr>
<tr><td>BE LOC</td><td>branch when the accumulator equals 0</td></tr>
<tr><td>BL LOC</td><td>branch when the accumulator is less than 0</td></tr>
<tr><td>BU LOC</td><td>branch unconditionally</td></tr>
<tr><td>READ LOC</td><td>read the next input value into LOC</td></tr>
<tr><td>PRINT LOC</td><td>print the contents of LOC</td></tr>
<tr><td>DC constant</td><td>define the labeled word to hold that constant</td></tr>
<tr><td>END</td><td>stop</td></tr>
</table>
<p>Three details that decide answers. The accumulator is always the left operand, so SUB X
means ACC minus X and not the other way around. DIV truncates toward zero rather than flooring.
The branch instructions test the accumulator against zero and nothing else, so comparing two
values means subtracting first.</p>

<h3>Tracing method</h3>
<p>Number the lines before you start. Then keep a table with one column for the accumulator and
one per memory word, adding a row for each instruction that changes something. Do not skip
rows to save time. The whole reason these problems are hard is that they loop, and a loop with
an untracked variable is unreadable after four passes.</p>
<p>Here is factorial, the standard example:</p>
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
<p>With N read as 4, the loop multiplies F by N and then decrements N. The rows go F = 4 with
N = 3, then F = 12 with N = 2, then F = 24 with N = 1, then F = 24 with N = 0, at which point
the BE fires and 24 is printed.</p>
<p>Notice that the loop test is at the top and it loads N before branching. A common misread is
to think the loop runs while N is greater than zero and to stop one pass early.</p>

<h3>Idioms to recognize on sight</h3>
<ul>
<li><b>Compare two values.</b> LOAD A, SUB B, then BG or BL. The sign of the difference is the
comparison.</li>
<li><b>Count down loop.</b> LOAD counter, BE exit, do work, LOAD counter, SUB =1, STORE
counter, BU top.</li>
<li><b>Running total.</b> LOAD sum, ADD item, STORE sum.</li>
<li><b>Absolute value.</b> LOAD X, BG done, MULT =-1, then store.</li>
<li><b>Remainder.</b> There is no modulo instruction, so it is built as X minus (X / Y) times
Y, using the truncating divide.</li>
<li><b>Swap.</b> Needs a third word, since there is only one accumulator.</li>
</ul>

<h3>Where points get lost</h3>
<ul>
<li>Reversing the operand order on SUB or DIV.</li>
<li>Branching on the wrong sign, or forgetting that the accumulator has to be reloaded before a
branch because an intervening STORE did not change it but an ADD did.</li>
<li>Running the loop one extra time or one too few, which the trace table prevents.</li>
<li>Treating DC as an executed instruction. It sets up a value before the program runs.</li>
<li>Rounding a negative quotient the wrong way. -7 divided by 2 is -3 here, not -4.</li>
</ul>
`,

"wdtpd-strings": `
<p class="lead">Contest 4 for Junior. Strings in ACSL pseudocode index from 0 and support
slicing. Most of the difficulty is in the index arithmetic, not in the logic.</p>

<h3>Indexing and slicing</h3>
<p>For S = "PROGRAM", the characters sit at indices 0 through 6. S[0] is P and S[6] is M. There
is no index 7.</p>
<p>A slice S[a:b] takes the characters from index a up to but not including index b. So S[0:3]
is PRO and S[2:5] is OGR. The length of a slice is b minus a, which is the fastest way to check
one.</p>
<p>Leaving out one side means go to the end of the string on that side. S[:3] is PRO and S[4:]
is RAM. Leaving out both gives the whole string.</p>
<p>A slice where a is not less than b is empty, and it is not an error. That matters when a
loop runs a slice bound past the point where it makes sense.</p>

<h3>The operations you will see</h3>
<ul>
<li><b>Concatenation</b> with +. "AB" + "CD" is "ABCD".</li>
<li><b>Length.</b> Written as len(S) or LEN(S) depending on the problem.</li>
<li><b>Building a string in a loop.</b> T = T + S[I] appends and keeps the order. T = S[I] + T
prepends and reverses it. Those two lines look nearly identical on paper and give opposite
answers.</li>
<li><b>Searching.</b> A loop that compares S[I] to a character and counts or records the
index.</li>
<li><b>Replacing.</b> Usually done by building a new string, since a character cannot be
assigned in place.</li>
</ul>

<h3>Trace with the indices written down</h3>
<p>Write the string once across the page and write the index under each character. Every
question about S[I] or S[I:J] then becomes a matter of pointing at the paper rather than
counting in your head.</p>
<pre><code>T = ""
S = "ACSL"
for I = 0 to 3
    T = S[I] + T
next I
output T</code></pre>
<table class="tbl">
<tr><th>I</th><th>S[I]</th><th>T after</th></tr>
<tr><td>0</td><td>A</td><td>A</td></tr>
<tr><td>1</td><td>C</td><td>CA</td></tr>
<tr><td>2</td><td>S</td><td>SCA</td></tr>
<tr><td>3</td><td>L</td><td>LSCA</td></tr>
</table>
<p>The output is LSCA. Change the body to T = T + S[I] and it is ACSL. One character moved and
the whole answer flipped.</p>

<h3>Common program shapes</h3>
<ul>
<li><b>Reverse.</b> Either build backwards with prepending, or loop from the last index down to
0 and append.</li>
<li><b>Palindrome check.</b> Compare S[I] with S[len - 1 - I] as I runs to the middle. The
minus 1 is there because indexing starts at 0, and dropping it is the single most common error
in this category.</li>
<li><b>Counting occurrences.</b> A loop with an IF and a counter.</li>
<li><b>Every other character.</b> A loop with step 2, where whether it starts at 0 or 1 decides
which half you get.</li>
<li><b>Caesar shift.</b> Convert a character to a number, add a shift, wrap with a modulo, and
convert back. Watch whether the wrap uses 26 and whether the alphabet starts at A.</li>
</ul>

<h3>Where points get lost</h3>
<ul>
<li>Treating the second slice bound as inclusive. It is not.</li>
<li>Indexing from 1 out of habit.</li>
<li>Using len(S) instead of len(S) - 1 as the last valid index.</li>
<li>Appending when the program prepends.</li>
<li>Forgetting that the loop variable after a FOR is one past the limit if the program prints
it.</li>
</ul>
`

});
