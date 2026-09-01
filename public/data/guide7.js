window.GUIDE = Object.assign(window.GUIDE || {}, {

"graph-theory": `
<p class="lead">Contest 4. Vocabulary, adjacency matrices, and counting. Most of the points in
this category come from knowing definitions exactly and from one computational trick involving
matrix powers.</p>

<h3>Vocabulary, stated precisely</h3>
<ul>
<li>A <b>graph</b> is a set of vertices and a set of edges joining pairs of them. In an
<b>undirected</b> graph an edge works both ways. In a <b>directed</b> graph, or digraph, each
edge points one way.</li>
<li>The <b>degree</b> of a vertex is the number of edges touching it. In a digraph, indegree
counts arrows coming in and outdegree counts arrows going out.</li>
<li>A <b>walk</b> is any sequence of edges laid end to end. Vertices and edges may repeat.</li>
<li>A <b>path</b> is a walk with no repeated vertex. A <b>cycle</b> is a path that returns to
where it started.</li>
<li>A graph is <b>connected</b> when there is a path between every pair of vertices. A
<b>connected component</b> is a maximal piece that is connected.</li>
<li>A <b>tree</b> is a connected graph with no cycles. A tree on N vertices has exactly N - 1
edges, and adding any edge to a tree creates exactly one cycle.</li>
<li>A <b>forest</b> is a collection of trees, so a graph with no cycles that need not be
connected.</li>
<li>A <b>complete</b> graph on N vertices has an edge between every pair, which is N(N - 1) / 2
edges.</li>
<li>A graph is <b>bipartite</b> when the vertices split into two groups with every edge going
between groups. A graph is bipartite exactly when it has no cycle of odd length.</li>
</ul>
<p>The handshake fact is worth carrying: the sum of all degrees equals twice the number of
edges, since each edge contributes to two vertices. It answers a lot of counting questions in
one line.</p>

<h3>Adjacency matrices</h3>
<p>Label the vertices A, B, C, and so on, and build an N by N grid. Put a 1 in row i, column j
when there is an edge from vertex i to vertex j, and a 0 otherwise. An undirected graph gives a
symmetric matrix. A graph with no loops has zeros down the main diagonal.</p>
<p>The row sum is the degree of that vertex in an undirected graph, or the outdegree in a
digraph. The column sum is the indegree.</p>

<h3>Matrix powers count walks</h3>
<p>This is the one real technique in the category. If M is the adjacency matrix, then entry
(i, j) of M raised to the power p is the number of walks of length exactly p from vertex i to
vertex j.</p>
<p>The reason is worth a minute. Entry (i, j) of M squared is the sum over every middle vertex
m of M(i, m) times M(m, j). That product is 1 exactly when both edges exist, so the sum counts
the two step routes from i to j. The same argument, applied one more step at a time, gives
every higher power.</p>
<p>Take the triangle on A, B, and C. Its matrix has zeros on the diagonal and ones everywhere
else. Squaring it gives 2 on the diagonal and 1 off it, which says there are two walks of
length 2 from A back to A, namely through B and through C, and one walk of length 2 from A to
B, namely through C.</p>
<p>Note the word walk. These counts allow repeated vertices, so they are not path counts. A
question that asks for paths of length 4 with no repeated vertex cannot be answered with matrix
powers alone, and those problems are small enough to enumerate by hand.</p>

<h4>Doing it by hand without errors</h4>
<p>To compute one entry of M cubed, you do not need the whole matrix. Compute M squared once,
then take the dot product of row i of M squared with column j of M. That is one row and one
column instead of a full multiplication, which is about a quarter of the work.</p>

<h3>Counting cycles</h3>
<p>Problems that ask for the number of cycles usually mean distinct cycles as sets of edges, so
that going around a triangle clockwise and counterclockwise counts once, and starting at a
different vertex of the same triangle counts once. Read the problem for whether it says
otherwise, then enumerate by length: all the triangles first, then the four cycles, and so on.
Trying to count them all at once is how you get duplicates.</p>

<h3>Where points get lost</h3>
<ul>
<li>Confusing walks with paths. Matrix powers count walks.</li>
<li>Reading a matrix as directed when the problem says undirected, or the reverse. Symmetry
tells you which.</li>
<li>Counting the same cycle several times because it was traced from different starting
points.</li>
<li>Forgetting that a tree on N vertices has N - 1 edges, which is often the fastest way to
answer a question about whether something is a tree.</li>
<li>Arithmetic slips inside a matrix multiplication. Recompute one entry as a check.</li>
</ul>
`,

"digital-electronics": `
<p class="lead">Contest 4. This is Boolean algebra drawn as a picture. A circuit diagram is
just an expression, and once you write it down as one, everything you know about simplifying
applies.</p>

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
<p>In a diagram, AND is a D shape and OR is a curved shield. The N versions are the same shape
with a small circle on the output, and that circle always means complement. A circle drawn on
an input means the input is complemented before it enters the gate.</p>
<p>NAND and NOR each on their own can build every other gate, which is why real hardware is
full of them. That fact occasionally shows up as a question.</p>

<h3>Reading a circuit</h3>
<p>Work left to right and label every wire as you go. Write the Boolean expression for each
gate output directly on the diagram. By the time you reach the right edge, you have the
expression for the whole circuit and you never had to hold anything in your head.</p>
<p>Suppose A and B feed an AND gate, that output feeds a NOT gate, and the NOT output goes into
an OR gate along with C. Label the AND output AB, label the NOT output (AB)', and the final OR
is (AB)' + C. By DeMorgan that is A' + B' + C, which is 1 unless A and B are both 1 and C is 0.
So seven of the eight input combinations produce a 1.</p>

<h3>The three question types</h3>
<p><b>Find inputs that give a stated output.</b> Work backwards from the output gate. If the
final gate is an AND and the output must be 1, both of its inputs must be 1, and you now have
two smaller questions. If the final gate is an OR and the output must be 0, both inputs must be
0. Backwards reasoning through AND and OR gates with a forced output is usually faster than a
truth table, because each step is forced.</p>
<p><b>Count the combinations that give a 1.</b> Here a truth table is usually the right call.
With three inputs it is eight rows, with four it is sixteen. Add a column per gate and fill the
table left to right. If the circuit has five or six inputs, simplify the expression first and
count from the simplified form instead.</p>
<p><b>Simplify the circuit.</b> Write the expression, apply DeMorgan and the absorption laws,
and report the result. The answer is usually asked for as an expression with the fewest
operators, sometimes as a redrawn circuit with the fewest gates.</p>

<h3>Counting shortcuts</h3>
<ul>
<li>An expression that is a single OR of terms is 1 unless every term is 0, which is often one
row to check rather than sixteen.</li>
<li>An XOR chain of n inputs is 1 on exactly half of the 2 to the n rows, namely the ones with
an odd number of 1s.</li>
<li>If a variable cancels out during simplification, it doubles the count. An expression that
reduces to C alone over three variables is true on four of the eight rows, not one.</li>
</ul>

<h3>Where points get lost</h3>
<ul>
<li>Missing an inversion bubble on a gate output or input.</li>
<li>Mixing up NAND and NOR. NAND is 1 unless both inputs are 1. NOR is 1 only when both are
0.</li>
<li>Treating XOR as OR. They differ on exactly one row, the one where both inputs are 1.</li>
<li>Losing a wire in a diagram where one gate output feeds two later gates. Trace every branch
of a fork.</li>
<li>Counting rows over the wrong number of variables after a variable cancels.</li>
</ul>
`

});
