window.GUIDE = Object.assign(window.GUIDE || {}, {

"fsa-regex": `
<p class="lead">A finite state automaton and a regular expression can describe the same set of strings. ACSL asks you to translate between them, compare descriptions, or determine which strings they accept.</p>

<h2>The operators</h2>
<p>Writing two patterns next to each other concatenates them, so ab means an a followed by a b. A
vertical bar between two patterns means either one will do. A star means zero or more copies of the
pattern immediately in front of it, a plus means one or more, and a question mark means zero or one.
A dot matches any single character. Character classes appear as well: [abc] matches one of those
three, [a-z] matches any lowercase letter, and [^abc] matches any single character that is not one
of the three. Parentheses group, as everywhere else.</p>

<p>Precedence runs the star and its relatives first, then concatenation, then the vertical bar. So
ab|cd means the whole of ab or the whole of cd, and a|bc* means a or else b followed by any number
of c characters.</p>

<p>The star binds only to the token directly in front of it, which is the detail to check in both directions. In ab*, the star applies to the b alone, so the pattern matches a, ab, abb, and
so on. To repeat the pair you have to write (ab)*.</p>

<h2>Reading a machine</h2>
<p>A finite state automaton is drawn as circles for states, an arrow from nowhere marking the start
state, double circles for accepting states, and labeled arrows for transitions. You feed a string
in one character at a time, follow the arrow that matches, and accept if you are standing on a
double circle when the string runs out.</p>

<p>Check the start state and its transitions before tracing. If the start state is accepting, the machine accepts the empty string. Any equivalent regular expression must accept it too. If there is no transition for the next input character, the machine rejects that string.</p>

<figure class="diagram"><img src="/assets/diagrams/dfa.svg" width="500" height="299" loading="lazy" alt="Two-state automaton. S1 is the start and only accepting state. A 0 switches between S1 and S2. A 1 loops at either state."><figcaption>Automaton by Cepheus, with arrow cleanup by Interiot. <a href="https://commons.wikimedia.org/wiki/File:DFAexample.svg">Source and public-domain dedication</a>. Unmodified.</figcaption></figure>
<p>Each 0 switches states, while a 1 leaves the state unchanged. The machine accepts exactly the binary strings with an even number of zeros, including no zeros. For 010, the states are S1, S2, S2, S1, so it accepts. For 01, it ends at S2 and rejects. The empty string is accepted because S1 is already an accepting state.</p>

<h2>Turning a machine into an expression</h2>
<p>Describe the routes from the start state to each accepting state, including loops and returns to earlier states. A self-loop labeled a contributes a*. A multi-state round trip must be grouped before adding a star. Combine alternative routes with a vertical bar, and check that the expression includes every allowed round trip.</p>

<p>Suppose a machine has states S and F, with S as the start and F as the only accepting state. From
S, reading 0 goes to F. At F, reading 1 stays at F, and reading 0 goes back to S. The trip out is a
single 0, and once at F you may absorb any number of 1s, giving 01* as the skeleton. From F you can
also leave on 0 and come straight back on another 0, picking up more 1s, and that whole round trip
can repeat, which gives 01*(001*)*. Test it on a few short strings: 0 and 01 and 0100 are all
accepted, while 00 and 010 are not, since both of those leave you sitting on S.</p>

<h2>Deciding whether two descriptions agree</h2>
<p>Start by testing short strings rather than reasoning abstractly. Write down the five or six
shortest strings each description accepts, in order of length, and compare the lists. A disagreement
anywhere in that list is a counterexample, and one counterexample settles the question: the two
descriptions are not equivalent, and you are done.</p>

<p>Agreement is the case to be careful with. Matching on every string up to length four tells you
that you have not yet found a difference, which is not the same as there being none, and a handful of examples does not prove two languages equal. Under contest time the short tests are still the
right first move, because a difference usually shows up early. If they all match and you need to be
sure, argue about structure instead: put both descriptions in the same form, or say directly what
each one accepts and check the two descriptions say the same thing.</p>

<p>Test the empty string as well as nonempty examples. It distinguishes a* from a+: the first accepts zero copies, while the second requires at least one.</p>

<h2>Simplifying expressions</h2>
<p>A handful of identities cover most contest simplifications: (a*)* is a*, a*a* is a*, a|a is a,
and a+ is the same as aa* and as a*a. Two plausible-looking equalities are false and appear as wrong
answers constantly. The pattern (a|b)* is not a*b*, because the first accepts abab and the second
insists that every a come before every b. For the same reason (ab)* is not a*b*. Both are worth
memorizing specifically as false.</p>

<h2>Counting matches</h2>
<p>When counting accepted strings, count distinct strings, not different ways to match them. You can split by repetition counts only when the resulting groups do not overlap. For example, a*a* accepts just one string of length 2, aa, although its two stars can split those characters in three ways.</p>


<p>Check the scope of each operator. In ab*, the star applies only to b, so the whole expression still requires an a. In ab|cd, the alternatives are ab and cd. When tracing a machine, follow one labeled transition per input character and check that the final state is accepting. A missing transition rejects that input.</p>
`,

"wdtpd-arrays": `
<p class="lead">Contest 3 for Junior adds arrays to program tracing. Track the index of each read and write, along with the value stored at that index.</p>

<h2>One dimensional arrays</h2>
<p>An array is a numbered sequence of storage locations. Check the declaration and bounds to find whether its indices start at 0 or 1. Draw and label those indices before tracing the loop.</p>

<p>Draw the array with an index under each element. After each assignment, write the changed value beside the old one so you can see whether later reads use the original value or an updated one.</p>

<h2>The patterns that keep coming back</h2>
<p>A fill loop writes a(i) for every i, usually from a formula in i, and sometimes from a formula
involving a(i - 1), which quietly makes it a running total instead. A scan loop reads every element
and maintains a sum, count, maximum, or minimum. A swap exchanges two elements using a temporary
variable, and a swap written without one destroys a value and copies the other over both slots.</p>

<p>The two patterns worth studying properly are shifting and reversing, because both hinge on the
direction of the loop rather than on the body.</p>

<p>Suppose a holds 1, 2, 3, 4, 5 and the program runs for i = 1 to 4 with the body a(i) = a(i + 1).
Because the loop moves left to right, each read happens before the value it wants has been
overwritten, so the array becomes 2, 3, 4, 5, 5, which is a correct left shift. Run that identical
assignment from i = 4 down to 1 and you get 5, 5, 5, 5, 5, because every read now sees a slot that
was already changed. Same body, opposite results, and the loop direction is the entire question.</p>

<p>Reversal has the same flavour. Swapping a(i) with a(n + 1 - i) as i runs across the array
performs every exchange twice, once from each end, so the array comes back exactly as it started. A
correct reversal loops only to the middle, and a problem whose answer is the original array is
usually testing whether you noticed.</p>

<h2>Two dimensional arrays</h2>
<p>The notation a(i, j) means row i and column j. Draw the grid, label the rows down the side and
the columns across the top, and fill cells in as they are assigned.</p>

<p>Which subscript sits on the outer loop decides whether the program walks the grid row by row or
column by column, and that matters whenever the body carries a running value from one cell to the
next. The main diagonal is the set of cells where the row equals the column, and the other diagonal
is where the two subscripts sum to a constant, though which constant depends on whether your indices
start at 0 or 1. Transposing swaps a(i, j) with a(j, i), and looping over the whole square transposes
twice and therefore changes nothing, so a genuine transpose only visits the cells where j is greater
than i.</p>

<h2>Off by one, and the three places it hides</h2>
<p>It hides in the loop bound, where for i = 1 to n touches n elements while for i = 1 to n - 1
touches one fewer, which is exactly right for a loop comparing a(i) with a(i + 1). It hides in the
subscript arithmetic, where a(i + 1) on the final pass has to still be inside the array. And it
hides in the base of the array, since a(n) runs off the end when indexing starts at 0.</p>

<p>If an index appears to be outside the array, check the starting index, loop bounds, and subscript expression. Do not invent a value for an invalid access.</p>


<p>Check the loop direction when shifting elements, the stopping point when reversing, and the row and column order in two-dimensional arrays. Keep the current array visible so each read uses the value stored at that step.</p>
`

});
