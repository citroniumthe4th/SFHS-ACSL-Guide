window.GUIDE = Object.assign(window.GUIDE || {}, {

"graph-theory": `
<p class="lead">A graph is a set of vertices and a set of edges joining pairs of them, which is
almost aggressively simple as definitions go, and yet it models road networks, dependencies between
tasks, friendships, and the structure of a program. ACSL tests two things here: whether you know the
vocabulary exactly, and whether you can count paths using powers of an adjacency matrix.</p>

<h3>Vocabulary, stated precisely</h3>
<p>In an undirected graph an edge works in both directions, while in a directed graph, or digraph,
each edge points one way. The degree of a vertex is the number of edges touching it, and in a
digraph that splits into indegree for arrows coming in and outdegree for arrows going out.</p>

<p>A walk is any sequence of edges laid end to end, with vertices and edges free to repeat. A path
is a walk that never repeats a vertex, and a cycle is a path that returns to where it started. That
distinction between a walk and a path is not pedantry, and the section on matrix powers below is
where it starts to matter.</p>

<p>A graph is connected when some path joins every pair of vertices, and a connected component is a
maximal piece that is connected. A tree is a connected graph with no cycles, and a tree on N
vertices has exactly N minus 1 edges, which means adding any edge to a tree creates exactly one
cycle and removing any edge disconnects it. A forest is a collection of trees, so an acyclic graph
that need not be connected. A complete graph has an edge between every pair of vertices, which comes
to N(N - 1) / 2 edges. A graph is bipartite when its vertices split into two groups with every edge
crossing between them, and a graph is bipartite exactly when it contains no cycle of odd length.</p>

<p>One fact earns its keep more than any other. The sum of all the degrees equals twice the number
of edges, because each edge contributes one to the degree of each of its two endpoints. That single
observation answers a large share of the counting questions in this category in one line, and it
also tells you that the number of vertices of odd degree is always even.</p>

<h3>Adjacency matrices</h3>
<p>Label the vertices A, B, C, and so on, and build an N by N grid with a 1 in row i, column j
whenever an edge runs from vertex i to vertex j, and a 0 otherwise. An undirected graph gives a
symmetric matrix, and a graph with no loops has zeros down the main diagonal.</p>

<p>The row sum is the degree of that vertex in an undirected graph, or its outdegree in a digraph,
and the column sum is the indegree. Those two agree only when the matrix is symmetric, which is
another way of saying the graph is undirected.</p>

<h3>Powers of the matrix count walks</h3>
<p>This is the one real technique in the category. If M is the adjacency matrix, then the entry in
row i, column j of M raised to the power p is the number of walks of length exactly p from vertex i
to vertex j.</p>

<p>The reason is worth understanding rather than memorising, because it also tells you what the
counts mean. Entry (i, j) of M squared is the sum over every vertex m of M(i, m) times M(m, j). Each
of those products is 1 exactly when both edges exist and 0 otherwise, so the sum counts the middle
vertices that complete a two step route from i to j. Applying the same argument one step at a time
gives every higher power.</p>

<p>Take the triangle on A, B, and C, whose matrix has zeros on the diagonal and ones everywhere
else. Squaring it puts 2 on the diagonal and 1 off it, which says there are two walks of length 2
from A back to A, one through B and one through C, and one walk of length 2 from A to B, namely
through C.</p>

<p>Notice the word walk. These counts allow vertices to repeat, so they are not path counts, and a
question asking for paths of length 4 with no repeated vertex cannot be answered with matrix powers
at all. Those problems are always small enough to enumerate by hand, and the setter knows it.</p>

<p>One practical note for doing this on paper. To get a single entry of M cubed you do not need the
whole matrix. Compute M squared once, then take the dot product of row i of M squared with column j
of M, which is one row against one column instead of a full multiplication.</p>

<h3>Counting cycles</h3>
<p>Questions that ask for the number of cycles almost always mean distinct cycles as sets of edges,
so going round a triangle clockwise and anticlockwise counts once, and starting from a different
vertex of the same triangle also counts once. Read the problem in case it says otherwise, then
enumerate by length, taking all the triangles first, then the four cycles, and so on. Counting them
all at once is how duplicates creep in.</p>

<h3>Walks, paths, and other things worth rereading</h3>
<p>Confusing walks with paths, since matrix powers count walks. Reading a matrix as directed when
the problem says undirected or the reverse, which its symmetry will tell you. Counting the same
cycle several times because it was traced from different starting points. Forgetting that a tree on
N vertices has N minus 1 edges, which is often the fastest route to an answer. And ordinary
arithmetic slips inside a matrix multiplication, which is worth guarding against by recomputing one
entry a second way.</p>
`,

"digital-electronics": `
<p class="lead">This category is Boolean algebra drawn as a picture. A circuit diagram is an
expression written in a different notation, and once you have written it back out as an expression,
everything from the Boolean Algebra category applies unchanged.</p>

<h3>The eight gates</h3>
<table class="tbl">
<tr><th>Gate</th><th>Expression</th><th>Output is 1 when</th></tr>
<tr><td>BUFFER</td><td>A</td><td>the input is 1</td></tr>
<tr><td>NOT</td><td>A'</td><td>the input is 0</td></tr>
<tr><td>AND</td><td>AB</td><td>both inputs are 1</td></tr>
<tr><td>NAND</td><td>(AB)'</td><td>at least one input is 0</td></tr>
<tr><td>OR</td><td>A + B</td><td>at least one input is 1</td></tr>
<tr><td>NOR</td><td>(A + B)'</td><td>both inputs are 0</td></tr>
<tr><td>XOR</td><td>AB' + A'B</td><td>the inputs differ</td></tr>
<tr><td>XNOR</td><td>AB + A'B'</td><td>the inputs agree</td></tr>
</table>
<p>In a diagram, AND is a D shape and OR is a curved shield. The N versions use the same shape with
a small circle on the output, and that circle always means complement wherever it appears, so a
circle drawn on an input means that signal is inverted before it enters the gate.</p>

<p>NAND on its own can build every other gate, and so can NOR, which is why real hardware is full of
them. Tying both inputs of a NAND together gives a NOT, and once you have a NOT you can build an AND
from a NAND, and so on up. That fact occasionally appears as a question in its own right.</p>

<h3>Reading a circuit</h3>
<p>Work left to right and label every wire as you go, writing the Boolean expression for each gate
output directly onto the diagram. By the time you reach the right hand edge you have the expression
for the whole circuit, and you never had to hold anything in your head.</p>

<p>Suppose A and B feed an AND gate, that output feeds a NOT gate, and the NOT output goes into an
OR gate along with C. Label the AND output AB, label the NOT output (AB)', and the final OR is
(AB)' + C. DeMorgan turns that into A' + B' + C, which is 1 unless A and B are both 1 while C is 0.
That is one row out of eight, so seven of the eight input combinations drive the output high.</p>

<h3>The three kinds of question</h3>
<p>The first kind gives you a required output and asks which inputs produce it. Work backwards from
the output gate, because each step is forced: if the final gate is an AND and the output must be 1,
then both of its inputs must be 1, and you now have two smaller versions of the same question. If it
is an OR and the output must be 0, both inputs must be 0. Backwards reasoning through forced gates is
much faster than building the whole table.</p>

<p>The second kind asks how many input combinations produce a 1, and here a truth table is usually
right. Three inputs means eight rows and four means sixteen, and you give each gate its own column
and fill the table left to right. With five or six inputs, simplify the expression first and count
from the simplified form instead.</p>

<p>The third kind asks you to simplify the circuit, which means writing the expression, applying
DeMorgan and the absorption laws, and reporting the result either as an expression with the fewest
operators or as a redrawn circuit with the fewest gates.</p>

<h3>Counting shortcuts</h3>
<p>An expression that is a single OR of several terms is 1 unless every term is 0, so counting the
zeros is often one short calculation rather than sixteen rows. A chain of XOR gates over n inputs is
1 on exactly half the rows, namely the ones with an odd number of inputs high. And when a variable
cancels during simplification, it doubles the count, so an expression over three variables that
reduces to C alone is true on four rows rather than one.</p>


<p>Missing an inversion bubble on a gate is the biggest one, which is why scanning for them before
you start labelling is worth the five seconds. After that: mixing up NAND and NOR, remembering that
NAND is 1 unless both inputs are 1 while NOR is 1 only when both are 0. Treating XOR as OR, when
they differ on exactly one row, the one where both inputs are high. Losing a wire where one gate
output feeds two later gates, so trace every branch of a fork. And counting rows over the wrong
number of variables after one has cancelled out.</p>
`

});
