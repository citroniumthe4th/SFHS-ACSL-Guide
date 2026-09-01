window.GUIDE = Object.assign(window.GUIDE || {}, {

"lisp": `
<p class="lead">Contest 2 for Senior. ACSL uses a small, made up LISP. You never write a
program in it. You evaluate one expression and report the value, which is either a number or a
list.</p>

<h3>Everything is a list</h3>
<p>An expression is a parenthesized list whose first element is the function and whose
remaining elements are the arguments. Evaluation is innermost first: reduce every nested call
to a value, then apply the outer function.</p>
<p>A list of data, as opposed to a call, is written with a leading apostrophe, as in
'(1 2 3). Without the apostrophe the parentheses would mean a function call. Elements can be
numbers, symbols, or other lists, so '(2 (3 4) 5) is a three element list whose middle element
is itself a list.</p>

<h3>Arithmetic</h3>
<p>ADD, SUB, MULT, and DIV take two or more arguments and fold left to right. So (SUB 20 5 3)
is (20 - 5) - 3, which is 12, and (DIV 100 5 2) is (100 / 5) / 2, which is 10. Division keeps
the integer part.</p>
<p>SQUARE and EXP show up as well. SQUARE takes one argument. EXP takes a base and an
exponent, so (EXP 2 5) is 32.</p>
<p>Evaluate (MULT (ADD 6 5 0) (MULT 5 1 2 2) (DIV 6 (SUB 2 5))). Work from the inside: ADD
gives 11, the inner MULT gives 20, SUB gives -3, and DIV of 6 by -3 gives -2. The outer MULT is
11 times 20 times -2, which is -440.</p>

<h3>List surgery</h3>
<ul>
<li>CAR returns the first element of a list. (CAR '(2 3 4)) is 2.</li>
<li>CDR returns the list with the first element removed. (CDR '(2 3 4)) is (3 4).</li>
<li>CONS puts a value on the front of a list. (CONS 1 '(2 3)) is (1 2 3).</li>
<li>REVERSE reverses the top level elements and leaves nested lists alone. (REVERSE
'(1 (2 3) 4)) is (4 (2 3) 1), not (4 (3 2) 1).</li>
</ul>
<p>The distinction between CAR and CDR is worth being pedantic about. CAR returns an element,
which might be a number or might be a list. CDR always returns a list, even when that list has
one element or none. (CDR '(7)) is (), the empty list, and not the number 7.</p>
<p>Take (CDR '((2 (3)) (4 (5 6) 7))). The outer list has exactly two elements, and CDR removes
the first, leaving a one element list. The answer is ((4 (5 6) 7)) with two layers of
parentheses, because the surviving element was itself a list.</p>

<h3>The shorthand combinations</h3>
<p>CAR and CDR chain into single names. The letters between the C and the R are read right to
left, so CADR is CAR of CDR, which is the second element. CADDR is CAR of CDR of CDR, which is
the third. CAADDAR looks intimidating and just means apply the operations from the rightmost
letter inward.</p>
<p>Write the chain out before you evaluate it. For CADR of '(1 2 3), first do CDR to get
(2 3), then CAR to get 2.</p>

<h3>Variables and definitions</h3>
<p>SETQ binds a name to a value, as in (SETQ X '(A B C)), and after that X stands for that
list wherever it appears. SET is the same idea with its first argument evaluated. ATOM asks
whether something is a single item rather than a list, and EQ tests equality.</p>
<p>DEF, sometimes written DEFUN, defines a function. A definition looks like
(DEF F (X) (MULT X X)), and after that (F 5) is 25. Contest problems that use DEF usually
define a small recursive function and ask for one value, so unwind it the same way you would
in the Recursive Functions category.</p>

<h3>Where points get lost</h3>
<ul>
<li>Losing a layer of parentheses. Count them in your answer against the structure you
computed, since ((4 5)) and (4 5) are different answers.</li>
<li>Returning an element where a list was asked for, or the reverse. That is the CAR versus
CDR trap.</li>
<li>Reversing the inside of a nested list. REVERSE only touches the top level.</li>
<li>Folding SUB or DIV right to left.</li>
<li>Reading a CADDR chain left to right.</li>
</ul>
`,

"wdtpd-looping": `
<p class="lead">Contest 2 for Junior. Same tracing skill as branching, with the difficulty
moved into how many times the loop body runs and what the variables look like when it
stops.</p>

<h3>FOR loops</h3>
<pre><code>for I = 1 to 5
    statements
next I</code></pre>
<p>I takes the values 1, 2, 3, 4, and 5. Both bounds are inclusive, so this runs five times,
not four.</p>
<p>With a step, the counter changes by that amount each pass and the loop stops when the next
value would go past the limit:</p>
<ul>
<li>for i = 1 to 10 step 3 gives 1, 4, 7, and 10. Four passes.</li>
<li>for i = 1 to 10 step 4 gives 1, 5, and 9. Three passes, because 13 is past 10.</li>
<li>for i = 10 to 1 step -3 gives 10, 7, 4, and 1. Four passes.</li>
<li>for i = 5 to 1 gives nothing at all. The step defaults to 1, and 5 is already past 1.</li>
</ul>
<p>A quick count for a loop from a to b with step s, when s is positive and b is at least a, is
the integer part of (b - a) / s, plus one.</p>
<p>After the loop finishes, the counter holds the first value that failed the test, not the
last one that passed. After for i = 1 to 5, the counter i holds 6. Problems that print the counter after
the loop ends are testing exactly this.</p>

<h3>WHILE loops</h3>
<pre><code>while condition
    statements
end while</code></pre>
<p>The condition is checked before every pass, including the first. A condition that starts out
false means the body never runs and the variables keep their starting values.</p>
<p>The other thing to watch is that the condition uses the current values, which the body just
changed. Trace the test separately from the body, and put the test in its own column.</p>

<h3>Nested loops</h3>
<p>The inner loop runs completely for each single pass of the outer loop. Two nested loops of 4
and 3 passes run the inner body 12 times.</p>
<p>When the inner bound depends on the outer counter, count carefully:</p>
<pre><code>C = 0
for I = 1 to 4
    for J = I to 4
        C = C + 1
    next J
next I</code></pre>
<p>The inner loop runs 4 times when I is 1, then 3, then 2, then 1. C ends at 10. Whenever the
inner bound is tied to the outer counter, expect a triangular count like this rather than a
product.</p>

<h3>Accumulator patterns</h3>
<p>Most of these programs are doing one of a few things, and naming the pattern tells you what
answer to expect:</p>
<ul>
<li>A running sum or product, where a variable starts at 0 or 1 and gets combined with
something each pass.</li>
<li>A counter that only advances when a condition inside the loop holds.</li>
<li>A running maximum or minimum, usually started at the first element or at an extreme
value.</li>
<li>A value that gets halved or doubled each pass, which usually means the loop count is
logarithmic and the trace is shorter than it looks.</li>
</ul>

<h3>Where points get lost</h3>
<ul>
<li>Being off by one on an inclusive FOR bound.</li>
<li>Forgetting that the counter is one step past the limit after the loop ends.</li>
<li>Running a WHILE body once when the condition was false from the start.</li>
<li>Missing the final pass that pushes a variable negative, which is what the table in the
Senior guide is built to prevent.</li>
<li>Resetting an accumulator inside the outer loop when it was declared outside it, or the
reverse. Check the indentation.</li>
</ul>
`

});
