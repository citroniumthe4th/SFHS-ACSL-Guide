window.GUIDE = Object.assign(window.GUIDE || {}, {

"graph-theory": `
<p class="lead">A graph consists of vertices and edges connecting them. In this category, practice reading directed and undirected graphs, building adjacency matrices, and counting routes of a given length.</p>

<figure class="diagram"><img src="/assets/diagrams/graph.svg" width="333" height="220" alt="Undirected graph on vertices 1 through 6. Edges join 1 to 2 and 5, 2 to 3 and 5, 3 to 4, and 4 to 5 and 6." loading="lazy"><figcaption><a href="https://commons.wikimedia.org/wiki/File:6n-graf.svg">AzaToth, based on the graph by Booyabazooka</a>. Public domain.</figcaption></figure>
<p>In this graph, vertex 4 has neighbors 3, 5, and 6. With rows and columns ordered 1 through 6, row 4 of its adjacency matrix is 0 0 1 0 1 1.</p>

<h2>Vocabulary, stated precisely</h2>
<p>In an undirected graph an edge works in both directions, while in a directed graph, or digraph,
each edge points one way. The degree of a vertex is the number of edges touching it, and in a
digraph that splits into indegree for arrows coming in and outdegree for arrows going out.</p>

<p>ACSL calls a sequence of adjacent vertices a <em>path</em>, even if a vertex repeats, and a
<em>simple path</em> is one that repeats no vertex. This guide follows ACSL throughout. Be warned
that many textbooks reserve <em>path</em> for the stricter idea and call the looser one a
<em>walk</em>, so a definition you find elsewhere may be the other way round. A cycle starts and
ends at the same vertex without repeating another vertex.</p>

<p>For contest questions, check whether the problem says "simple" or explicitly forbids repeated
vertices. Matrix powers count paths with repetition allowed.</p>

<p>A graph is connected when some path joins every pair of vertices, and a connected component is a
maximal piece that is connected. A tree is a connected graph with no cycles, and a tree on N
vertices has exactly N minus 1 edges, which means adding any edge to a tree creates exactly one
cycle and removing any edge disconnects it. A forest is a collection of trees, so an acyclic graph
that need not be connected. A complete graph has an edge between every pair of vertices, which comes
to N(N - 1) / 2 edges. A graph is bipartite when its vertices split into two groups with every edge
crossing between them, and a graph is bipartite exactly when it contains no cycle of odd length.</p>

<p>In an undirected graph, every edge contributes two to the total degree, with a loop contributing twice at its vertex. Thus the sum of the degrees is twice the edge count. It also follows that the number of odd-degree vertices is even.</p>

<h2>Adjacency matrices</h2>
<p>Label the vertices A, B, C, and so on, and build an N by N grid with a 1 in row i, column j
whenever an edge runs from vertex i to vertex j, and a 0 otherwise. An undirected graph gives a
symmetric matrix, and a graph with no loops has zeros down the main diagonal.</p>

<p>In a loop-free undirected graph, a row sum gives the degree of its vertex. In a digraph, the row sum is the outdegree and the column sum is the indegree. Equal sums do not imply an undirected graph: in a directed cycle, every vertex has one incoming and one outgoing edge.</p>

<h2>Powers of the matrix count paths</h2>
<p>If M is the adjacency matrix, then the entry in
row i, column j of M raised to the power p is the number of paths of length exactly p from vertex i
to vertex j.</p>

<p>The reason is worth understanding rather than memorizing, because it also tells you what the
counts mean. Entry (i, j) of M squared is the sum over every vertex m of M(i, m) times M(m, j). Each
of those products is 1 exactly when both edges exist and 0 otherwise, so the sum counts the middle
vertices that complete a two step route from i to j. Applying the same argument one step at a time
gives every higher power.</p>

<p>Take the triangle on A, B, and C, whose matrix has zeros on the diagonal and ones everywhere
else. Squaring it puts 2 on the diagonal and 1 off it, which says there are two paths of length 2
from A back to A, one through B and one through C, and one path of length 2 from A to B, namely
through C.</p>

<p>These counts allow repeated vertices and edges, which is what makes them paths in ACSL's sense
and not simple paths. If a question asks for simple paths, or says that vertices cannot repeat,
enumerate the allowed routes or track the visited vertices yourself.</p>

<p>One practical note for doing this on paper. To get a single entry of M cubed you do not need the
whole matrix. Compute M squared once, then take the dot product of row i of M squared with column j
of M, which is one row against one column instead of a full multiplication.</p>

<h2>Counting cycles</h2>
<p>For an undirected graph, count a cycle once regardless of its starting vertex or direction around the same edges. In a directed graph, follow the arrows. Check the problem's definition, then enumerate cycles by length to help avoid duplicates.</p>

<h2>Paths, simple paths, and other things worth rereading</h2>
<p>Check whether repetition is allowed, whether edges are directed, and whether cycles count once regardless of their starting vertex. When multiplying matrices, label the row and column order and check one entry by counting its routes directly.</p>
`,

"digital-electronics": `
<p class="lead">This category is Boolean algebra drawn as a picture. A circuit diagram is an
expression written in a different notation, and once you have written it back out as an expression,
everything from the Boolean Algebra category applies unchanged.</p>

<figure class="diagram"><img src="/assets/diagrams/half-adder.svg" width="360" height="200" alt="A and B each feed both gates. The upper XOR gate outputs S, and the lower AND gate outputs C." loading="lazy"><figcaption><a href="https://commons.wikimedia.org/wiki/File:Half_Adder.svg">Inductiveload, SVG condensed by Aflafla1</a>. Public domain.</figcaption></figure>
<p>Both gates receive A and B. The XOR gate produces S, while the AND gate produces C. A connection dot joins wires. A crossing without a dot does not.</p>

<h2>The eight gates</h2>
<figure class="diagram"><div class="diagram-scroll" tabindex="0" role="region" aria-label="Gate symbols, scroll horizontally on small screens"><img src="/assets/diagrams/logic-gates.svg" width="908" height="110" loading="lazy" alt="From left to right: AND has a flat left edge and a rounded right edge. OR has a curved left edge and a pointed right edge. NOT is a triangle with a small circle on its output."></div><figcaption>AND, OR, and NOT symbols by Vaughan Pratt. <a href="https://commons.wikimedia.org/wiki/File:LogicGates.svg">Source</a>, <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Unmodified. The symbols &and;, &or;, and &not; mean AND, OR, and NOT.</figcaption></figure>
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

<h2>Reading a circuit</h2>
<p>Work left to right and label every wire as you go, writing the Boolean expression for each gate
output directly onto the diagram. By the time you reach the right hand edge you have the expression
for the whole circuit, and you never had to hold anything in your head.</p>

<p>Suppose A and B feed an AND gate, that output feeds a NOT gate, and the NOT output goes into an
OR gate along with C. Label the AND output AB, label the NOT output (AB)', and the final OR is
(AB)' + C. DeMorgan turns that into A' + B' + C, which is 1 unless A and B are both 1 while C is 0.
That is one row out of eight, so seven of the eight input combinations drive the output high.</p>

<h2>The three kinds of question</h2>
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

<h2>Counting shortcuts</h2>
<p>An expression that is a single OR of several terms is 1 unless every term is 0, so counting the
zeros is often one short calculation rather than sixteen rows. A chain of XOR gates over n inputs is
1 on exactly half the rows, namely the ones with an odd number of inputs high. And when a variable
cancels during simplification, it doubles the count, so an expression over three variables that
reduces to C alone is true on four rows rather than one.</p>


<p>Mark inversion bubbles before evaluating a circuit. NAND is 0 only when both inputs are 1. NOR is 1 only when both inputs are 0. XOR and OR differ on input 11. Follow every branch of a wire, and count assignments over all original inputs even if a variable disappears during simplification.</p>
`

});
