window.GUIDE = Object.assign(window.GUIDE || {}, {

"fsa-regex": `
<p class="lead">Contest 3 for Senior. A finite state automaton and a regular expression are two
descriptions of the same thing: a set of strings. Most problems ask you to translate between
them, or to decide which strings a description accepts.</p>

<h3>Regular expression operators</h3>
<ul>
<li>Concatenation. Writing ab means an a followed by a b.</li>
<li>Union, written with a vertical bar. a|b matches a or b.</li>
<li>Kleene star. a* matches zero or more copies of a, and that includes the empty string.</li>
<li>Plus. a+ matches one or more copies, so it is aa*.</li>
<li>Question mark. a? matches zero or one copy.</li>
<li>Dot matches any single character.</li>
<li>Character classes. [abc] matches one of those three, [a-z] matches any lowercase letter,
and [^abc] matches any single character that is not one of those three.</li>
<li>Parentheses group.</li>
</ul>
<p>Precedence runs star and its friends first, then concatenation, then union. So ab|cd is
(ab)|(cd), and a|bc* is a|(b(c*)).</p>
<p>The star binds only to what is directly in front of it. In ab*, the star applies to the b
alone, so it matches a, ab, abb, and so on. To repeat the pair you need (ab)*.</p>

<h3>Reading a machine</h3>
<p>A finite state automaton has states drawn as circles, a start state marked with an incoming
arrow from nowhere, accepting states drawn as double circles, and labeled arrows for
transitions. Feed a string in one character at a time, follow the matching arrow, and accept
if you are sitting on a double circle when the string runs out.</p>
<p>Two things to check before you start tracing. Is there a transition for every character out
of every state, and is the start state itself accepting? If the start state is a double circle,
the machine accepts the empty string, and any regular expression you write for it has to accept
the empty string too, which usually means a star somewhere at the top level.</p>

<h3>Turning a machine into an expression</h3>
<p>For the small machines ACSL uses, the fastest reliable method is to describe the paths from
the start state to each accepting state.</p>
<ol>
<li>Find the shortest path from start to an accepting state and write down its labels. That is
your skeleton.</li>
<li>For every loop hanging off a state on that path, insert a starred expression for the loop
at that point.</li>
<li>If more than one path reaches an accepting state, join the descriptions with a vertical
bar.</li>
</ol>
<p>A machine with states S and F, where S goes to F on 0, F loops to itself on 1, and F goes
back to S on 0, with F accepting, gives the skeleton 0 for the trip to F, then 1* for the loop,
then (01*)* for round trips through S and back. Written out, that is 01*(001*)*, and you check
it by testing three or four strings against both descriptions.</p>

<h3>Deciding if two descriptions match</h3>
<p>The reliable move is to test short strings. Write down the shortest five or six strings each
description accepts, in length order, and compare. If they agree on everything up to length
four, they almost always agree everywhere, and if they disagree, you have found the
counterexample the question wanted.</p>
<p>Do not forget to test the empty string. It is the single most common difference between two
otherwise identical expressions, since a* accepts it and a+ does not.</p>

<h3>Simplifying expressions</h3>
<p>A few identities cover most contest simplifications:</p>
<ul>
<li>(a*)* is a*.</li>
<li>a*a* is a*.</li>
<li>(a|b)* is not the same as a*b*. The first accepts abab and the second does not.</li>
<li>a|a is a.</li>
<li>a+ is aa*, and also a*a.</li>
<li>(ab)* is not a*b*, for the same reason as above.</li>
</ul>
<p>Those two false equalities are worth memorizing as false, because they look plausible and
they show up as wrong answers.</p>

<h3>Counting matches</h3>
<p>Some problems ask how many strings of length n a pattern accepts. Multiply out the choices
position by position. The pattern [A-D]*[a-d]*[0-9] over strings of length 3, for example, has
to be split by how many characters each part takes, and each split contributes a product. Be
systematic about the split or you will double count.</p>

<h3>Where points get lost</h3>
<ul>
<li>Applying a star to more than the token directly in front of it.</li>
<li>Forgetting that star includes zero copies, so the empty string is in the language.</li>
<li>Reading ab|cd as a(b|c)d.</li>
<li>Missing a transition when tracing, and accepting a string that the machine actually rejects
because it had nowhere to go.</li>
<li>Treating a non accepting state that happens to be at the end of your trace as accepting.</li>
</ul>
`,

"wdtpd-arrays": `
<p class="lead">Contest 3 for Junior. Arrays add one thing to loop tracing: the index. Almost
every question here turns on knowing which slot you are reading and which one you are
writing.</p>

<h3>One dimensional arrays</h3>
<p>An array is a numbered row of boxes. A(3) or A[3] is the box at index 3. Read the problem to
find out whether indexing starts at 0 or 1, because ACSL uses both and the statement always
tells you.</p>
<p>Draw the array as a row of boxes with the index written under each one before you start
tracing. Update values by crossing out and rewriting. Trying to hold six numbers in your head
across ten loop passes does not work.</p>

<h3>The patterns that keep coming back</h3>
<ul>
<li><b>Fill.</b> A loop that writes A(I) = something for each I. Usually a formula in I, and
sometimes a formula in A(I - 1), which makes it a running total.</li>
<li><b>Scan.</b> A loop that reads every element and keeps a running sum, count, maximum, or
minimum.</li>
<li><b>Shift.</b> A loop that does A(I) = A(I + 1) or A(I) = A(I - 1). The direction of the
loop decides whether this shifts the data correctly or smears one value across the whole
array. This is the single most common trick in this category.</li>
<li><b>Swap.</b> Exchanging two elements, usually with a temporary variable. A swap written
without a temporary, as A(I) = A(J) followed by A(J) = A(I), destroys one of the values and
copies the other over both slots.</li>
<li><b>Reverse.</b> Swapping A(I) with A(N + 1 - I) as I runs across the array. If the loop
runs all the way across instead of half way, every swap gets undone and the array comes back
unchanged.</li>
</ul>
<p>Take a shift that smears. If A holds 1, 2, 3, 4, 5 and the program runs for i = 1 to 4 with
A(I) = A(I + 1), the array ends up 2, 3, 4, 5, 5, which is a correct left shift. Run the same
assignment from I = 4 down to 1 and you get 2, 2, 2, 2, 5, because each read happens after the
value it wanted was already overwritten. The loop direction is the whole question.</p>

<h3>Two dimensional arrays</h3>
<p>A(I, J) means row I, column J. Draw the grid, label the rows down the side and the columns
across the top, and fill in cells as they are assigned.</p>
<ul>
<li>A loop with I outside and J inside walks the grid row by row. Swap the nesting and it walks
column by column, which matters whenever the body uses a running value.</li>
<li>The main diagonal is where I equals J. The other diagonal is where I plus J equals a
constant, and which constant depends on whether your indices start at 0 or 1.</li>
<li>Transposing swaps A(I, J) with A(J, I). Doing that over the whole square transposes the
matrix twice and leaves it unchanged, so a correct transpose only loops over J greater than
I.</li>
</ul>

<h3>Off by one, in the three places it hides</h3>
<ol>
<li>The loop bound. for i = 1 to N touches N elements. for i = 1 to N - 1 touches one fewer,
which is exactly right for a loop that compares A(I) with A(I + 1).</li>
<li>The subscript arithmetic. A(I + 1) on the last pass has to still be inside the array.</li>
<li>The base of the array. If indexing starts at 0, then A(N) is off the end.</li>
</ol>
<p>When a problem seems to run off the end of the array, that is a signal you misread the
starting index, not that the problem is broken.</p>

<h3>Where points get lost</h3>
<ul>
<li>Shifting in the wrong loop direction and reporting the smeared array, or the reverse.</li>
<li>Reversing an array with a loop that runs the whole way across.</li>
<li>Reading a row index as a column index in a two dimensional problem.</li>
<li>Losing track of an element because the trace was done in your head. Draw the boxes.</li>
</ul>
`

});
