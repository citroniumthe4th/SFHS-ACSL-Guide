window.GUIDE = Object.assign(window.GUIDE || {}, {

"lisp": `
<p class="lead">LISP is one of the oldest programming languages still in use, and its defining
idea is that a program and the data it works on have exactly the same shape: a parenthesised list.
ACSL uses a small dialect of it, and you are never asked to write a program. You are given one
expression and asked what it evaluates to.</p>

<h3>Everything is a list</h3>
<p>An expression is a list whose first element names a function and whose remaining elements are
the arguments to it. Evaluation works from the inside out, so you reduce every nested call to a
value before applying the function that contains it.</p>

<p>A list of data, as opposed to a function call, is written with a leading apostrophe, as in
'(1 2 3). The apostrophe means take this literally rather than run it, and without it the
parentheses would be read as a call to a function named 1. Elements may be numbers, symbols, or
other lists, so '(2 (3 4) 5) is a list of three things whose middle element happens to be a list of
two.</p>

<h3>Arithmetic</h3>
<p>ADD and MULT take any number of arguments and fold across them from left to right, so
(ADD 1 2 3 4) is 10. SUB and DIV take exactly two, written (SUB a b) and (DIV a b), so nest instead of reaching for a third argument when you need to subtract twice: 20 minus 5 minus 3 is
(SUB (SUB 20 5) 3).</p>

<p>DIV is ordinary division and keeps the fractional part. (DIV 7 2) is 3.5, not 3. This is the
single most common place to lose a LISP question, because every language most students have written
in gives 3 for integer operands. If a problem wants the integer part it will say so. SQUARE takes one
argument, and EXP takes a base and an exponent, so (EXP 2 5) is 32.</p>

<p>Working inside out is not optional advice, it is how the language is defined, and the fastest
way to do it on paper is to find the innermost complete pair of parentheses, replace the whole
thing with its value, and repeat. Take (MULT (ADD 6 5 0) (MULT 5 1 2 2) (DIV 6 (SUB 2 5))). The
ADD gives 11, the inner MULT gives 20, the SUB gives -3, and dividing 6 by -3 gives -2. The outer
MULT is then 11 times 20 times -2, or -440.</p>

<h3>Taking lists apart and putting them together</h3>
<p>CAR returns the first element of a list and CDR returns the list with its first element removed.
The names are historical, from the machine registers on the IBM 704 where LISP was first
implemented, and there is no point trying to derive them.</p>

<p>At every step, ask what type came back. CAR hands back an element, which may be a number or may
itself be a list. CDR hands back a list, even when that list holds one element or none, so
(CDR '(7)) is the empty list written (), and not the number 7. Writing each intermediate result with
its brackets intact keeps the distinction visible on the page.</p>

<p>CONS puts a value on the front of a list, so (CONS 1 '(2 3)) gives (1 2 3), flat and not nested. REVERSE reverses the top level elements and leaves anything nested inside them alone, which
means (REVERSE '(1 (2 3) 4)) gives (4 (2 3) 1) and not (4 (3 2) 1).</p>

<p>Here is the kind of question that separates people. Evaluate (CDR '((2 (3)) (4 (5 6) 7))). The
outer list has exactly two elements, and both of them are themselves lists. CDR removes the first,
which leaves a list of one element, and that element is (4 (5 6) 7). So the answer is
((4 (5 6) 7)), with two layers of brackets. Count the brackets in your answer against the structure
you actually computed, because losing a layer is far easier than it sounds.</p>

<h3>The shorthand chains</h3>
<p>CAR and CDR combine into single names, and the letters between the C and the R are read from
right to left. CADR is therefore CAR of CDR, which picks out the second element, and CADDR is CAR
of CDR of CDR, which picks the third. A chain like CAADDAR looks alarming and means nothing more
than applying the operations from the rightmost letter inward.</p>

<p>Write the chain out before you evaluate it. For CADR of '(A B C), the CDR gives (B C) and the
CAR of that gives B. Trying to do it in one leap is how people end up one element off.</p>

<h3>Variables and definitions</h3>
<p>SETQ binds a name to a value, as in (SETQ x '(a b c)), after which x stands for that list
wherever it appears. SET does the same with its first argument evaluated first. ATOM asks whether
something is a single item and not a list, and EQ tests equality.</p>

<p>DEF, sometimes written DEFUN, defines a function, so after (DEF f (x) (MULT x x)) the expression
(f 5) is 25. Problems that use DEF nearly always define a small recursive function and ask for one
value, at which point you are back in the Recursive Functions category and should unwind it the
same way.</p>

<h3>Counting your brackets</h3>
<p>Losing or gaining a layer of parentheses is the most common error, and it is worth a deliberate
check, since ((4 5)) and (4 5) are different answers. Next comes returning an element where a list
was wanted or the reverse, which is the CAR and CDR trap in a different costume. After those:
reversing the contents of a nested list when REVERSE only ever touches the top level, folding SUB
or DIV from the right instead of the left, and reading a CADDR chain left to right.</p>
`,

"wdtpd-looping": `
<p class="lead">Contest 2 for Junior. This is the same tracing skill as branching, with the
difficulty moved into how many times a loop body runs and what the variables look like at the
moment it stops. Almost every wrong answer in this category is off by exactly one pass.</p>

<h3>Counted loops</h3>
<pre><code>for i = 1 to 5
    statements
next i</code></pre>
<p>The counter takes the values 1, 2, 3, 4, and 5, because both bounds are inclusive. That is five
passes, not four, and it is worth saying out loud once so that it stops being a thing you have to
work out.</p>

<p>Adding a step changes the counter by that amount each time, and the loop stops as soon as the
next value would go past the limit. So for i = 1 to 10 step 3 gives 1, 4, 7, and 10, which is four
passes. Change the step to 4 and you get 1, 5, and 9, three passes, because 13 is past 10. A
negative step counts downward, so for i = 10 to 1 step -3 gives 10, 7, 4, and 1. And a loop written
for i = 5 to 1 never runs at all, since the step defaults to 1 and 5 is already past the limit
before the first pass.</p>

<p>When you want the count without listing the values, take the difference between the bounds,
divide by the step, throw away the fraction, and add one. For a loop from a to b with a positive
step s, that is int((b - a) / s) + 1.</p>

<p>What the counter holds once the loop has finished is a different question, and one the ACSL
reference does not answer. Many languages leave it one step past the limit, so that for i = 1 to 5
ends with i at 6, but that is a property of those languages and not a rule ACSL states.</p>

<p>So if a program prints the counter after its loop, read what the problem itself tells you. If it
tells you nothing, say so in your working instead of assuming a value: a question that depends on
this will define it.</p>

<h3>Conditional loops</h3>
<pre><code>while condition
    statements
end while</code></pre>
<p>The condition is checked before every pass, including the very first, so a condition that starts
out false means the body never runs and every variable keeps its initial value. Whenever the answer
looks like the starting value, that is the first thing to check.</p>

<p>The other thing to watch is that the condition reads the current values, which the body has just
changed. Give the condition its own column in your trace table instead of evaluating it in your head between rows.</p>

<h3>Nested loops</h3>
<p>The inner loop runs to completion for every single pass of the outer one, so two loops of four
and three passes execute the inner body twelve times. That much is a plain product.</p>

<p>It stops being a product the moment the inner bound depends on the outer counter:</p>
<pre><code>c = 0
for i = 1 to 4
    for j = i to 4
        c = c + 1
    next j
next i</code></pre>
<p>The inner loop runs 4 times when i is 1, then 3, then 2, then 1, so c ends at 10. Whenever you
see the outer counter appear in the inner bound, expect a triangular count like this and not a rectangle, and add the row lengths rather than multiplying.</p>

<h3>Recognising what a loop is for</h3>
<p>Most of these programs are doing one of a handful of things, and naming the pattern tells you
roughly what answer to expect before you have finished tracing, which is a useful check on your own
arithmetic. A running sum or product starts at 0 or 1 and combines something in on each pass. A
counter advances only when a condition inside the loop holds. A running maximum or minimum starts
either at the first element or at an extreme value. And a variable that halves or doubles each pass
means the loop count is logarithmic, so the trace is far shorter than the numbers suggest.</p>

<h3>Counting the passes</h3>
<p>Count the iterations on paper instead of in your head, then check five things. Is the upper
bound inclusive, and did you count that last pass? For a while loop, was the condition true on entry
at all, or does the body run zero times? Did you carry the loop through its final pass, including one
that pushes a value negative? Is the accumulator reset where the indentation actually puts it, inside
the outer loop or outside it? And if the program prints the counter after the loop, does the problem
say what it holds, since the ACSL reference does not define it?</p>

<p>The accumulator question is settled by reading the indentation, which is a good reason to redraw
a badly printed program before tracing it.</p>
`

});
