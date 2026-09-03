window.GUIDE = Object.assign(window.GUIDE || {}, {

"fsa-regex": `
<p class="lead">A finite state automaton and a regular expression are two ways of describing the
same thing, namely a set of strings, and the fact that they are equivalent is one of the genuinely
deep results in computer science. ACSL asks you to translate between them, or to decide which
strings a given description accepts.</p>

<h3>The operators</h3>
<p>Writing two patterns next to each other concatenates them, so ab means an a followed by a b. A
vertical bar between two patterns means either one will do. A star means zero or more copies of the
pattern immediately in front of it, a plus means one or more, and a question mark means zero or one.
A dot matches any single character. Character classes appear as well: [abc] matches one of those
three, [a-z] matches any lowercase letter, and [^abc] matches any single character that is not one
of the three. Parentheses group, as everywhere else.</p>

<p>Precedence runs the star and its relatives first, then concatenation, then the vertical bar. So
ab|cd means the whole of ab or the whole of cd, and a|bc* means a or else b followed by any number
of c characters.</p>

<p>The star binds only to the token directly in front of it, which is the detail that trips people
in both directions. In ab*, the star applies to the b alone, so the pattern matches a, ab, abb, and
so on. To repeat the pair you have to write (ab)*.</p>

<h3>Reading a machine</h3>
<p>A finite state automaton is drawn as circles for states, an arrow from nowhere marking the start
state, double circles for accepting states, and labelled arrows for transitions. You feed a string
in one character at a time, follow the arrow that matches, and accept if you are standing on a
double circle when the string runs out.</p>

<p>Before tracing anything, check two things. Does every state have a transition for every
character, or can the machine get stuck partway through a string? And is the start state itself
accepting? If it is, the machine accepts the empty string, and any regular expression you write for
it has to accept the empty string too, which usually means a star somewhere at the top level.</p>

<h3>Turning a machine into an expression</h3>
<p>For the small machines ACSL uses, the most reliable approach is to describe the paths from the
start state to each accepting state and then account for the loops along the way. Find the shortest
route to an accepting state and write down its labels as a skeleton, then for every loop hanging off
a state on that route, insert a starred expression at that point. If more than one route reaches an
accepting state, join the descriptions with a vertical bar.</p>

<p>Suppose a machine has states S and F, with S as the start and F as the only accepting state. From
S, reading 0 goes to F. At F, reading 1 stays at F, and reading 0 goes back to S. The trip out is a
single 0, and once at F you may absorb any number of 1s, giving 01* as the skeleton. From F you can
also leave on 0 and come straight back on another 0, picking up more 1s, and that whole round trip
can repeat, which gives 01*(001*)*. Test it on a few short strings: 0 and 01 and 0100 are all
accepted, while 00 and 010 are not, since both of those leave you sitting on S.</p>

<h3>Deciding whether two descriptions agree</h3>
<p>The reliable move is to test short strings rather than to reason abstractly. Write down the five
or six shortest strings each description accepts, in order of length, and compare the lists. If they
agree up to length four they almost always agree everywhere, and if they disagree you have found the
counterexample the question was fishing for.</p>

<p>Always test the empty string. It is the single most common difference between two otherwise
identical expressions, since a* accepts it and a+ does not, and it costs about two seconds to
check.</p>

<h3>Simplifying expressions</h3>
<p>A handful of identities cover most contest simplifications: (a*)* is a*, a*a* is a*, a|a is a,
and a+ is the same as aa* and as a*a. Two plausible-looking equalities are false and appear as wrong
answers constantly. The pattern (a|b)* is not a*b*, because the first accepts abab and the second
insists that every a come before every b. For the same reason (ab)* is not a*b*. Both are worth
memorising specifically as false.</p>

<h3>Counting matches</h3>
<p>Some problems ask how many strings of a given length a pattern accepts, and the method is to
multiply the choices position by position. Where a pattern has several starred parts, you have to
split by how many characters each part takes and add the products for each split, which is fiddly
enough that being systematic about listing the splits matters more than the arithmetic.</p>


<p>Applying a star to more than the token in front of it is the most common error, closely followed
by forgetting that a star includes zero copies and so admits the empty string. Reading ab|cd as
a(b|c)d is next. On the machine side, the two failures are missing a transition while tracing, so
that you accept a string the machine actually gets stuck on, and treating the state you happen to
finish on as accepting when it is drawn with a single circle.</p>
`,

"wdtpd-arrays": `
<p class="lead">Contest 3 for Junior. Arrays add one thing to loop tracing, which is the index, and
nearly every question in this category turns on knowing precisely which slot you are reading and
which one you are writing.</p>

<h3>One dimensional arrays</h3>
<p>An array is a numbered row of boxes, and a(3) or a[3] refers to the box at index 3. Read the
problem to find out whether the indexing starts at 0 or at 1, because ACSL uses both and the
statement always makes it clear, usually in the declaration or in the bounds of the first loop.</p>

<p>Draw the array as a row of boxes with the index written underneath each one before you trace
anything, and update values by crossing out rather than erasing so you can retrace. Holding six
numbers in your head across ten passes of a loop does not work, and the people who score well in
this category are the ones who stopped trying.</p>

<h3>The patterns that keep coming back</h3>
<p>A fill loop writes a(i) for every i, usually from a formula in i, and sometimes from a formula
involving a(i - 1), which quietly makes it a running total instead. A scan loop reads every element
and maintains a sum, count, maximum, or minimum. A swap exchanges two elements using a temporary
variable, and a swap written without one destroys a value and copies the other over both slots.</p>

<p>The two patterns worth studying properly are shifting and reversing, because both hinge on the
direction of the loop rather than on the body.</p>

<p>Suppose a holds 1, 2, 3, 4, 5 and the program runs for i = 1 to 4 with the body a(i) = a(i + 1).
Because the loop moves left to right, each read happens before the value it wants has been
overwritten, so the array becomes 2, 3, 4, 5, 5, which is a correct left shift. Run that identical
assignment from i = 4 down to 1 and you get 2, 2, 2, 2, 5, because every read now sees a slot that
was already changed. Same body, opposite results, and the loop direction is the entire question.</p>

<p>Reversal has the same flavour. Swapping a(i) with a(n + 1 - i) as i runs across the array
performs every exchange twice, once from each end, so the array comes back exactly as it started. A
correct reversal loops only to the middle, and a problem whose answer is the original array is
usually testing whether you noticed.</p>

<h3>Two dimensional arrays</h3>
<p>The notation a(i, j) means row i and column j. Draw the grid, label the rows down the side and
the columns across the top, and fill cells in as they are assigned.</p>

<p>Which subscript sits on the outer loop decides whether the program walks the grid row by row or
column by column, and that matters whenever the body carries a running value from one cell to the
next. The main diagonal is the set of cells where the row equals the column, and the other diagonal
is where the two subscripts sum to a constant, though which constant depends on whether your indices
start at 0 or 1. Transposing swaps a(i, j) with a(j, i), and looping over the whole square transposes
twice and therefore changes nothing, so a genuine transpose only visits the cells where j is greater
than i.</p>

<h3>Off by one, and the three places it hides</h3>
<p>It hides in the loop bound, where for i = 1 to n touches n elements while for i = 1 to n - 1
touches one fewer, which is exactly right for a loop comparing a(i) with a(i + 1). It hides in the
subscript arithmetic, where a(i + 1) on the final pass has to still be inside the array. And it
hides in the base of the array, since a(n) runs off the end when indexing starts at 0.</p>

<p>When a program appears to read past the end of an array, the explanation is nearly always that
you misread the starting index rather than that the problem is broken.</p>


<p>Shifting in the wrong loop direction and reporting the smeared array instead of the shifted one,
or the other way round. Reversing with a loop that runs the whole way across. Reading a row index as
a column index in two dimensions. And, above all, tracing in your head. Draw the boxes.</p>
`

});
