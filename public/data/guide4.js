window.GUIDE = Object.assign(window.GUIDE || {}, {

"lisp": `
<p class="lead">ACSL uses a small LISP dialect for evaluating expressions. Lists, arithmetic, and function calls all use parentheses, so part of the work is distinguishing a list of data from an expression that should be evaluated.</p>

<h2>Atoms, lists, and evaluation</h2>
<p>A function call is a list whose first element names a function and whose remaining elements are
the arguments to it. Evaluation works from the inside out, so you reduce every nested call to a
value before applying the function that contains it.</p>

<p>A list of data, as opposed to a function call, is written with a leading apostrophe, as in
'(1 2 3). The apostrophe means take this literally rather than run it, and without it the
parentheses would be read as a call to a function named 1. Elements may be numbers, symbols, or
other lists, so '(2 (3 4) 5) is a list of three things whose middle element happens to be a list of
two.</p>

<h2>Arithmetic</h2>
<p>ADD and MULT take any number of arguments and fold across them from left to right, so
(ADD 1 2 3 4) is 10. SUB and DIV take exactly two, written (SUB a b) and (DIV a b), so nest instead of reaching for a third argument when you need to subtract twice: 20 minus 5 minus 3 is
(SUB (SUB 20 5) 3).</p>

<p>DIV uses ordinary division: (DIV 7 2) is 3.5. Java and C++ divide integer operands differently, so do not import that rule into ACSL LISP. SQUARE takes one argument, and EXP takes a base and an exponent: (EXP 2 5) is 32.</p>

<p>Working inside out is not optional advice, it is how the language is defined, and the fastest
way to do it on paper is to find the innermost complete pair of parentheses, replace the whole
thing with its value, and repeat. Take (MULT (ADD 6 5 0) (MULT 5 1 2 2) (DIV 6 (SUB 2 5))). The
ADD gives 11, the inner MULT gives 20, the SUB gives -3, and dividing 6 by -3 gives -2. The outer
MULT is then 11 times 20 times -2, or -440.</p>

<h2>Taking lists apart and putting them together</h2>
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

<h2>The shorthand chains</h2>
<p>CAR and CDR combine into single names, and the letters between the C and the R are read from
right to left. CADR is therefore CAR of CDR, which picks out the second element, and CADDR is CAR
of CDR of CDR, which picks the third. A chain like CAADDAR looks alarming and means nothing more
than applying the operations from the rightmost letter inward.</p>

<p>Write the chain out before you evaluate it. For CADR of '(A B C), the CDR gives (B C) and the
CAR of that gives B. Trying to do it in one leap is how people end up one element off.</p>

<h2>Variables and definitions</h2>
<p>SETQ assigns a value without evaluating the variable name, as in (SETQ x '(a b c)). SET evaluates its first argument, so the corresponding form is (SET 'x '(a b c)). ATOM returns true for an atom and NIL for a nonempty list. NIL, also written (), is the exception: it is both an atom and the empty list.</p>

<p>DEF, sometimes written DEFUN, defines a function. After (DEF f (x) (MULT x x)), the expression (f 5) evaluates to 25. If a function calls itself, track its arguments and base case as in the Recursive Functions category.</p>

<h2>Evaluating stored expressions and testing signs</h2>
<p>After (SETQ p '(ADD 2 3)), p holds the list (ADD 2 3). (EVAL p) evaluates that list and returns 5. (EVAL 'p) instead resolves the quoted name p and returns its stored list. Quoting determines whether an argument is evaluated before EVAL receives it.</p>
<p>POS and NEG test a number's sign: (POS 3) is true, (NEG -2) is true, and both (POS 0) and (NEG 0) return NIL. (ATOM NIL) is true, while (ATOM '(1 2)) is NIL. EQ tests equality: (EQ 3 3) is true and (EQ 3 4) is NIL.</p>
<h2>Counting your brackets</h2>
<p>Check the final parentheses: ((4 5)) is a list containing one list, while (4 5) contains two numbers. CAR returns the first element, while CDR returns the remaining list. REVERSE changes only the top-level order. Keep the two arguments of SUB and DIV in their original order, and read a composed selector such as CADDR from right to left.</p>
`,

"wdtpd-looping": `
<p class="lead">Contest 2 for Junior. This is the same tracing skill as branching, with the
difficulty moved into how many times a loop body runs and what the variables look like at the
moment it stops. Record the loop condition and count every iteration, including the last one.</p>

<h2>Counted loops</h2>
<pre><code>for i = 1 to 5
    statements
next i</code></pre>
<p>The counter takes the values 1, 2, 3, 4, and 5. Both bounds are inclusive, so the body runs five times.</p>

<p>Adding a step changes the counter by that amount each time, and the loop stops as soon as the
next value would go past the limit. So for i = 1 to 10 step 3 gives 1, 4, 7, and 10, which is four
passes. Change the step to 4 and you get 1, 5, and 9, three passes, because 13 is past 10. A
negative step counts downward, so for i = 10 to 1 step -3 gives 10, 7, 4, and 1. And a loop written
for i = 5 to 1 never runs at all, since the step defaults to 1 and 5 is already past the limit
before the first pass.</p>

<p>For a loop from a to b with positive step s, the number of iterations is max(0, floor((b - a) / s) + 1). The maximum with 0 handles a starting value beyond the bound. For example, a = 5, b = 1, s = 1 gives zero iterations.</p>

<p>What the counter holds once the loop has finished is a different question, and one the ACSL
reference does not answer. Many languages leave it one step past the limit, so that for i = 1 to 5
ends with i at 6, but that is a property of those languages and not a rule ACSL states.</p>

<p>So if a program prints the counter after its loop, read what the problem itself tells you. If it
tells you nothing, say so in your working instead of assuming a value: a question that depends on
this will define it.</p>

<h2>Conditional loops</h2>
<pre><code>while condition
    statements
end while</code></pre>
<p>The condition is checked before every pass, including the very first, so a condition that starts
out false means the body never runs and every variable keeps its initial value. Whenever the answer
looks like the starting value, that is the first thing to check.</p>

<p>The other thing to watch is that the condition reads the current values, which the body has just
changed. Give the condition its own column in your trace table instead of evaluating it in your head between rows.</p>

<h2>Nested loops</h2>
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

<h2>Recognizing what a loop is for</h2>
<p>Most of these programs are doing one of a handful of things, and naming the pattern tells you
roughly what answer to expect before you have finished tracing, which is a useful check on your own
arithmetic. A running sum or product starts at 0 or 1 and combines something in on each pass. A
counter advances only when a condition inside the loop holds. A running maximum or minimum starts
either at the first element or at an extreme value. And a variable that halves or doubles each pass
means the loop count is logarithmic, so the trace is far shorter than the numbers suggest.</p>

<h2>Counting the passes</h2>
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
