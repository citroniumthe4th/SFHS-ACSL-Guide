window.MCQ = (window.MCQ || []).concat([

{ id:"gt-01", kind:"problem", topic:"graph-theory", level:"b",
  q:`A triangle joins A, B, and C, so every pair is connected. How many paths of length 2 go from
A back to A?`,
  choices:["2","1","3","0","None of the above"], ans:0,
  check:`str(walks(3,2,'A','A','011101110'))`,
  why:`A path of length 2 that starts and ends at A must leave along one edge and return along
one, and from A those options are out to B and back or out to C and back, giving 2. There is a general
fact behind that particular number: the diagonal entry of the squared adjacency matrix is always the
degree of that vertex, which is exactly what a there-and-back path counts.` },

{ id:"gt-02", kind:"problem", topic:"graph-theory", level:"b",
  q:`In an undirected triangle on A, B, and C, how many paths of length 2 go from A to B?`,
  choices:["1","2","3","0","None of the above"], ans:0,
  check:`str(walks(3,2,'A','B','011101110'))`,
  why:`Two steps from A to B means passing through exactly one middle vertex adjacent to both,
and the only candidate is C. Going A to B and then B to B would need a loop at B, and the graph has
none, so the count is 1.` },

{ id:"gt-03", kind:"problem", topic:"graph-theory", level:"s",
  q:`In a triangle on A, B, and C, how many paths of length 4 go from A to C?`,
  choices:["5","3","6","8","None of the above"], ans:0,
  check:`str(walks(3,4,'A','C','011101110'))`,
  why:`Cubing and then taking a fourth power of a matrix by hand is more work than this needs.
Let d(k) be the number of length k paths from A to a fixed other vertex and s(k) the number that
return to A. On a triangle, s(k + 1) is 2 d(k) and d(k + 1) is s(k) + d(k). Starting from s(0) equal
to 1 and d(0) equal to 0, the values run d(1) equal to 1, d(2) equal to 1, d(3) equal to 3, and d(4)
equal to 5.` },

{ id:"gt-04", kind:"problem", topic:"graph-theory", level:"s",
  q:`Vertices A, B, C, and D form a 4-cycle in the order A, B, D, C, back to A. How many paths of
length 3 go from A to D?`,
  choices:["0","2","3","4","None of the above"], ans:0,
  check:`str(walks(4,3,'A','D','0110100110010110'))`,
  why:`The graph is bipartite, with A and D on one side and B and C on the other, and every edge
crosses between the two sides. A path of odd length therefore always finishes on the opposite side
from where it began, and since A and D sit on the same side, no odd length path can connect them at
all. Recognizing the bipartite structure answers the question without any arithmetic.` },

{ id:"gt-05", kind:"problem", topic:"graph-theory", level:"b",
  q:`How many edges does a tree with 12 vertices have?`,
  choices:["11","12","13","24","None of the above"], ans:0,
  check:`str(12-1)`,
  why:`A tree on N vertices always has exactly N minus 1 edges. Adding any further edge creates a
cycle and removing any edge disconnects the graph, which is a compact way of saying that a tree sits
exactly on the boundary between being connected and being acyclic. That single fact settles a
surprising share of the counting questions in this category.` },

{ id:"gt-06", kind:"problem", topic:"graph-theory", level:"b",
  q:`How many edges does the complete graph on 8 vertices have?`,
  choices:["29", "56", "64", "36", "None of the above"], ans:4,
  check:`str(8*7//2)`,
  why:`Every pair of distinct vertices contributes one edge, and there are 8 times 7 over 2 such
pairs, which is 28. The division by two is there because the pair A and B describes the same edge as
the pair B and A. Omitting it gives 56, which would be the count for a directed graph carrying an
arrow each way. Since 28 is not among the four choices offered, the answer is None of the above.` },

{ id:"gt-07", kind:"problem", topic:"graph-theory", level:"b",
  q:`An undirected graph has 10 edges. What is the sum of the degrees of all its vertices?`,
  choices:["20","10","5","depends on the number of vertices","None of the above"], ans:0,
  check:`str(2*10)`,
  why:`Each edge touches two vertices and therefore adds 1 to each of their degrees, so the total
of all the degrees is always twice the number of edges however the edges happen to be arranged. A
useful corollary falls straight out of that: since the total is even, the number of vertices of odd
degree must itself be even.` },

{ id:"gt-08", kind:"problem", topic:"graph-theory", level:"s",
  q:`Five vertices A, B, C, D, and E form a chain, each joined to the next. How many paths of
length 2 go from A to E?`,
  choices:["-1", "1", "2", "4", "None of the above"], ans:4,
  check:`str(walks(5,2,'A','E','0100010100010100010100010'))`,
  why:`A and E sit four edges apart, and a path of length k can only connect vertices whose
distance is at most k, so no path of length 2 has any chance of reaching from one to the other. The
parity argument gives the same conclusion from another direction, since a chain is bipartite and
A and E fall on the same side, meaning only even lengths of at least 4 can connect them. Since 0 is
not among the four choices offered, the answer is None of the above.` },

{ id:"gt-09", kind:"problem", topic:"graph-theory", level:"s",
  q:`In the complete graph on 4 vertices, how many paths of length 10 start and end at A?`,
  choices:["14763","19683","59049","14762","None of the above"], ans:0,
  check:`str(walks(4,10,'A','A','0111101111011110'))`,
  why:`Track two numbers rather than a whole matrix. Let r be the number of length k paths that
end back at A and o the number ending at any one particular other vertex. At each step r becomes 3o
and o becomes r plus 2o. Starting from r equal to 1 and o equal to 0, ten steps give 14763. There is
also a closed form for the complete graph on n vertices, where the return count after k steps is
((n - 1) to the k, plus (n - 1) times (-1) to the k) divided by n, which here is (59049 + 3) over 4.
The distractor 59049 is the total number of length 10 paths from A to anywhere at all.` },

{ id:"gt-10", kind:"concept", topic:"graph-theory", level:"b",
  q:`In an adjacency matrix for an undirected graph with no loops, what does the sum of row 3
tell you?`,
  choices:["the degree of vertex C","the number of vertices","the number of edges","the length of the longest simple path from C","None of the above"], ans:0,
  why:`Row 3 holds a 1 in every column matching a vertex adjacent to vertex C, so summing the row
counts the edges touching C, which is its degree. In a directed graph that same row sum is the
outdegree while the column sum is the indegree, but equal indegree and outdegree do not require a symmetric matrix. For example, in the directed cycle A to B to C to A, every vertex has indegree 1 and outdegree 1.` },

{ id:"gt-11", kind:"problem", topic:"graph-theory", level:"s",
  q:`A graph has 6 vertices and 4 edges, and no cycles. How many connected components does it
have?`,
  choices:["2","1","3","4","None of the above"], ans:0,
  check:`str(6-4)`,
  why:`An acyclic graph is a forest and each of its components is a tree, so if a tree on k
vertices has k minus 1 edges, then a forest on N vertices with C components has N minus C edges.
Setting 6 minus C equal to 4 gives C equal to 2. The same relation works in any direction, so it will
recover whichever of the three numbers a question leaves out.` },

{ id:"gt-12", kind:"concept", topic:"graph-theory", level:"s",
  q:`A graph is bipartite if and only if it has no cycle of which length?`,
  choices:["odd","even","length 3 only","length 4 only","None of the above"], ans:0,
  why:`If the vertices split into two sides with every edge crossing between them, then any path
alternates sides at each step, and returning to your starting vertex therefore takes an even number of
steps. No odd cycle can survive that. The converse holds as well, which is why the result is stated as
an if and only if rather than in one direction only.` },

{ id:"gt-13", kind:"concept", topic:"graph-theory", level:"b",
  q:`In ACSL terminology, what distinguishes a simple path from an ordinary path?`,
  choices:["a simple path visits no vertex twice","a simple path must be shorter than an ordinary path","a simple path must be a cycle, an ordinary path need not be","there is no difference","None of the above"], ans:0,
  why:`ACSL uses path for any sequence of edges laid end to end, with vertices and edges free to
repeat, and reserves simple path for one that visits no vertex twice. Watch for this, because plenty
of textbooks use path for the stricter idea and call the looser one a walk. Matrix powers count paths
in ACSL's sense, repeats and all, so they cannot count simple paths directly.` },

{ id:"gt-14", kind:"problem", topic:"graph-theory", level:"s",
  q:`Six vertices A through F form a cycle in alphabetical order, with F joined back to A. How
many paths of length 3 go from A to F?`,
  choices:["3","1","2","0","None of the above"], ans:0,
  check:`str(walks(6,3,'A','F','010001101000010100001010000101100010'))`,
  why:`A and F are adjacent, so the distance between them is 1 and odd lengths can reach. The
paths of length 3 are A to B to A to F, A to F to A to F, and A to F to E to F, which is 3. Drawing
the cycle and enumerating is considerably quicker here than building a 6 by 6 matrix and cubing
it.` },

{ id:"gt-15", kind:"problem", topic:"graph-theory", level:"s",
  q:`In a graph on 5 vertices where A is joined to every other vertex and there are no other
edges, how many paths of length 2 go from B to C?`,
  choices:["1","0","2","4","None of the above"], ans:0,
  check:`str(walks(5,2,'B','C','0111110000100001000010000'))`,
  why:`This is a star with A at the center, so every edge touches A and any two step path between
two leaves has to pass through it. There is exactly one such route between any given pair of leaves,
and the same reasoning gives a count of 1 from a leaf back to itself as well.` },

{ id:"gt-16", kind:"concept", topic:"graph-theory", level:"b",
  q:`Why does entry (i, j) of the adjacency matrix squared count paths of length 2?`,
  choices:["it sums M(i,m) times M(m,j) over every middle vertex m","it doubles every edge count","matrix multiplication reverses the arrows","it counts the vertices adjacent to both i and j only when they are also adjacent to each other","None of the above"], ans:0,
  why:`It follows straight from the definition of matrix multiplication, which puts the sum over
m of M(i, m) times M(m, j) in that position. Each of those products is 1 exactly when both the edge
from i to m and the edge from m to j exist, so the sum counts the middle vertices that complete a two
step route. Applying the same argument one step at a time gives every higher power, and it is worth
following rather than memorizing, because it is what tells you the counts allow repeats, making
them paths in ACSL's sense rather than simple paths.` },

{ id:"gt-17", kind:"problem", topic:"graph-theory", level:"b",
  q:`<figure class="diagram"><img src="/assets/diagrams/graph.svg" width="333" height="220" alt="Undirected graph on vertices 1 through 6. Edges join 1 to 2 and 5, 2 to 3 and 5, 3 to 4, and 4 to 5 and 6." loading="lazy"><figcaption><a href="https://commons.wikimedia.org/wiki/File:6n-graf.svg">AzaToth, based on the graph by Booyabazooka</a>. Public domain.</figcaption></figure>
<p>Rows and columns of the adjacency matrix are ordered 1, 2, 3, 4, 5, 6. What is row 4?</p>`,
  choices:["0 0 1 0 1 1","0 0 1 1 1 1","0 1 1 0 1 1","0 0 1 0 1 0","None of the above"], ans:0,
  check:`' '.join(str(walks(6, 1, 'D', w, '010010101010010100001011110100000100')) for w in 'ABCDEF')`,
  why:`Vertex 4 connects to 3, 5, and 6, so columns 3, 5, and 6 contain 1. It has no loop to itself, so
column 4 contains 0. The row is 0 0 1 0 1 1.` },

{ id:"gt-18", kind:"problem", topic:"graph-theory", level:"b",
  q:`<figure class="diagram"><img src="/assets/diagrams/graph.svg" width="333" height="220" alt="Undirected graph on vertices 1 through 6. Edges join 1 to 2 and 5, 2 to 3 and 5, 3 to 4, and 4 to 5 and 6." loading="lazy"><figcaption><a href="https://commons.wikimedia.org/wiki/File:6n-graf.svg">AzaToth, based on the graph by Booyabazooka</a>. Public domain.</figcaption></figure>
<p>How many paths of length exactly 2 lead from vertex 1 to vertex 4? A path may repeat vertices and
edges.</p>`,
  choices:["1","2","3","0","None of the above"], ans:0,
  check:`str(walks(6, 2, 'A', 'D', '010010101010010100001011110100000100'))`,
  why:`A two-edge path has one intermediate vertex. The neighbors of 1 are 2 and 5, and the neighbors of
4 are 3, 5, and 6. Only 5 appears in both sets, so the only path is 1 to 5 to 4. This is also the
row 1, column 4 entry of the squared adjacency matrix.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"gt-19", kind:"problem", topic:"graph-theory", level:"s",
  q:`Five vertices A through E form a cycle in alphabetical order, with E joined back to A. How
many paths of length 3 go from A back to A?`,
  choices:["2", "3", "5", "6", "None of the above"], ans:4,
  check:`str(walks(5,3,'A','A','0100110100010100010110010'))`,
  why:`Every step around a cycle moves one position clockwise or counterclockwise, so after three
steps the net displacement is 3, 1, -1, or -3. Returning to A needs a displacement that is a multiple
of 5, and none of those four is, so no such path exists. The count is 0. On an odd cycle the parity
argument that settles even cycles does not apply, and this displacement argument is the one that does.
Since 0 is not among the four choices offered, the answer is None of the above.` },

{ id:"gt-20", kind:"problem", topic:"graph-theory", level:"b",
  q:`Five vertices A through E form a cycle in alphabetical order, with E joined back to A. How
many paths of length 2 go from A to C?`,
  choices:["1","2","0","3","None of the above"], ans:0,
  check:`str(walks(5,2,'A','C','0100110100010100010110010'))`,
  why:`A two step path needs a single middle vertex adjacent to both endpoints. The neighbors of A
are B and E, and the neighbors of C are B and D, so B is the only vertex in both sets and the route
A to B to C is the only one. Intersecting the two neighbor sets is the fastest way to answer any
question about paths of length 2.` },

{ id:"gt-21", kind:"problem", topic:"graph-theory", level:"s",
  q:`In the complete graph on 4 vertices, how many paths of length 3 go from A to B?`,
  choices:["7","6","9","27","None of the above"], ans:0,
  check:`str(walks(4,3,'A','B','0111101111011110'))`,
  why:`Track two numbers rather than a whole matrix. Let r be the number of paths of a given
length ending back at A and o the number ending at one particular other vertex. At each step r becomes
3o and o becomes r plus 2o. Starting from r equal to 1 and o equal to 0, three steps give o equal to 7.
There is a closed form for the complete graph on n vertices too: the count between distinct vertices
after k steps is ((n - 1) to the k, minus (-1) to the k) divided by n, which here is (27 + 1) over 4.` },

{ id:"gt-22", kind:"problem", topic:"graph-theory", level:"b",
  q:`Four vertices A, B, C, and D form a chain, each joined to the next. How many paths of length 3
go from A to D?`,
  choices:["1","2","3","0","None of the above"], ans:0,
  check:`str(walks(4,3,'A','D','0100101001010010'))`,
  why:`A and D sit three edges apart, which is exactly the length allowed, so the only way to get
there is to walk straight down the chain without ever doubling back. That is A to B to C to D, and
there is one such route. Whenever the path length equals the distance between the endpoints, the count
is the number of shortest routes, and on a chain there is only ever one.` },

{ id:"gt-23", kind:"problem", topic:"graph-theory", level:"b",
  q:`Vertices A and B are each joined to every one of C, D, and E, and there are no other edges.
How many paths of length 2 go from A to B?`,
  choices:["3","1","6","2","None of the above"], ans:0,
  check:`str(walks(5,2,'A','B','0011100111110001100011000'))`,
  why:`This is the complete bipartite graph with A and B on one side and C, D, and E on the other.
A two step path from A to B passes through a single vertex adjacent to both, and all three of C, D, and
E qualify, so the count is 3. In general the number of two step paths between two vertices is the
number of common neighbors they have.` },

{ id:"gt-24", kind:"problem", topic:"graph-theory", level:"b",
  q:`In a graph on 5 vertices where A is joined to every other vertex and there are no other edges,
how many paths of length 3 go from A to B?`,
  choices:["4","1","3","8","None of the above"], ans:0,
  check:`str(walks(5,3,'A','B','0111110000100001000010000'))`,
  why:`This is a star with A at the center, so every edge touches A and any walk alternates
between A and a leaf. A path of length 3 from A therefore goes out to some leaf, back to A, and out to
B, and the first leaf may be any of the four including B itself. That gives 4. Every walk on a star is
forced into this alternating shape, which is why the counts are so easy to reason about directly.` },

{ id:"gt-25", kind:"problem", topic:"graph-theory", level:"s",
  q:`Six vertices A through F form a cycle in alphabetical order, with F joined back to A. How many
paths of length 4 go from A to C?`,
  choices:["5","4","6","2","None of the above"], ans:0,
  check:`str(walks(6,4,'A','C','010001101000010100001010000101100010'))`,
  why:`Count by how many of the four steps go clockwise. With p clockwise steps and 4 minus p the
other way, the net displacement is 2p minus 4, and reaching C needs that to be 2 more than a multiple
of 6, which happens for p equal to 0 and p equal to 3. Those contribute 1 and 4 arrangements
respectively, giving 5. This displacement count is far quicker than raising a 6 by 6 matrix to the
fourth power.` },

{ id:"gt-26", kind:"problem", topic:"graph-theory", level:"s",
  q:`In the complete graph on 4 vertices, how many paths of length 4 start and end at A?`,
  choices:["27", "24", "18", "81", "None of the above"], ans:4,
  check:`str(walks(4,4,'A','A','0111101111011110'))`,
  why:`Track the return count r and the count o ending at one particular other vertex. At each
step r becomes 3o and o becomes r plus 2o. Starting from r equal to 1 and o equal to 0, four steps give
r equal to 21. The closed form for the complete graph on n vertices agrees: the return count after k
steps is ((n - 1) to the k, plus (n - 1) times (-1) to the k) divided by n, which here is (81 + 3) over
4. The distractor 81 is the total number of length 4 paths from A to anywhere at all. Since 21 is not
among the four choices offered, the answer is None of the above.` },

{ id:"gt-27", kind:"problem", topic:"graph-theory", level:"s",
  q:`Five vertices A through E form a cycle in alphabetical order, with E joined back to A. How
many paths of length 5 go from A back to A?`,
  choices:["2","5","10","0","None of the above"], ans:0,
  check:`str(walks(5,5,'A','A','0100110100010100010110010'))`,
  why:`With p of the five steps going clockwise, the net displacement is 2p minus 5, and returning
to A needs that to be a multiple of 5. That forces p to be 0 or 5, meaning the walk goes all the way
round in one direction or the other. Each of those can happen in exactly one way, so the count is 2.
The distractor 10 counts the walks with p equal to 1 or 4, which end at C or D rather than A.` },

{ id:"gt-28", kind:"problem", topic:"graph-theory", level:"s",
  q:`Vertices A and B are each joined to every one of C, D, and E, and there are no other edges.
How many paths of length 3 go from A to C?`,
  choices:["6","3","9","2","None of the above"], ans:0,
  check:`str(walks(5,3,'A','C','0011100111110001100011000'))`,
  why:`The graph is bipartite with A and B on one side and C, D, and E on the other, and every
edge crosses between the sides, so a walk alternates sides at every step. A length 3 walk from A ends
on the far side, which is where C lives, so odd lengths are allowed here. The route is A to one of C,
D, E, then back to A or B, then to C, giving 3 times 2 choices.` },

{ id:"gt-29", kind:"problem", topic:"graph-theory", level:"b",
  q:`Four vertices A, B, C, and D form a chain, each joined to the next. How many paths of length 2
go from B back to B?`,
  choices:["2","1","3","0","None of the above"], ans:0,
  check:`str(walks(4,2,'B','B','0100101001010010'))`,
  why:`A there-and-back path leaves along one edge and returns along the same one, so the number
of them is exactly the degree of the vertex. B is joined to A and to C, so its degree is 2 and the count
is 2. That is the general fact behind the squared adjacency matrix of an undirected graph without loops: each diagonal entry equals the degree of its vertex.` },

{ id:"gt-30", kind:"problem", topic:"graph-theory", level:"s",
  q:`Six vertices A through F form a cycle in alphabetical order, with F joined back to A. How many
paths of length 3 go from A to D?`,
  choices:["2","1","3","0","None of the above"], ans:0,
  check:`str(walks(6,3,'A','D','010001101000010100001010000101100010'))`,
  why:`A and D sit directly opposite each other on the cycle, three steps apart in either
direction, and three is exactly the length allowed. So the only routes are the two that walk straight
round without doubling back, one clockwise and one counterclockwise. Doubling back anywhere would waste
two of the three steps and leave the walk short.` },

{ id:"gt-31", kind:"problem", topic:"graph-theory", level:"b",
  q:`How many edges does the complete graph on 12 vertices have?`,
  choices:["66","132","144","78","None of the above"], ans:0,
  check:`str(12*11//2)`,
  why:`Every pair of distinct vertices contributes exactly one edge, and there are 12 times 11
over 2 such pairs, which is 66. The division by two is there because the pair A and B describes the
same edge as the pair B and A. Omitting it gives 132, which would be the count for a directed graph
carrying an arrow each way.` },

{ id:"gt-32", kind:"problem", topic:"graph-theory", level:"b",
  q:`A graph has 7 vertices and every vertex has degree 4. How many edges does it have?`,
  choices:["14","28","7","11","None of the above"], ans:0,
  check:`str(7*4//2)`,
  why:`The degrees add to 7 times 4, or 28, and the sum of all the degrees is always twice the
number of edges, since each edge adds 1 to each of its two endpoints. So the edge count is 28 over 2.
The handshake lemma turns every question about degrees into a question about edges, and it works in
either direction.` },

{ id:"gt-33", kind:"problem", topic:"graph-theory", level:"b",
  q:`A graph on 10 vertices has no cycles and exactly 3 connected components. How many edges does
it have?`,
  choices:["7","9","10","3","None of the above"], ans:0,
  check:`str(10-3)`,
  why:`An acyclic graph is a forest and each component is a tree, and a tree on k vertices has
k minus 1 edges. Summing over the three components, a forest on N vertices with C components has N
minus C edges, so this one has 10 minus 3. The relation works in any direction, so it will recover
whichever of the three numbers a question leaves out.` },

{ id:"gt-34", kind:"concept", topic:"graph-theory", level:"b",
  q:`In the adjacency matrix of a directed graph, what does the sum of a column tell you?`,
  choices:["the indegree of that vertex","the outdegree of that vertex","the number of edges","the number of vertices reachable from it","None of the above"], ans:0,
  why:`Entry (i, j) is 1 when an arrow runs from vertex i to vertex j, so a column collects every
arrow arriving at one vertex and its sum is the indegree. The row sum is the outdegree by the same
argument. Equal indegree and outdegree do not require a symmetric matrix. For example, in the directed cycle A to B to C to A, every vertex has indegree 1 and outdegree 1.` },

{ id:"gt-35", kind:"concept", topic:"graph-theory", level:"s",
  q:`For an undirected graph with no loops or parallel edges, what does the sum of the diagonal entries of the
squared adjacency matrix equal?`,
  choices:["twice the number of edges","the number of edges","the number of vertices","the number of triangles","None of the above"], ans:0,
  why:`A diagonal entry of the squared matrix counts the paths of length 2 from a vertex back to
itself, and each of those leaves along an edge and returns along the same one, so it equals the degree
of that vertex. Summing the diagonal therefore adds up all the degrees, which the handshake lemma makes
twice the number of edges. Triangles are counted by the diagonal of the cubed matrix instead, and each
one is counted six times there.` },

{ id:"gt-36", kind:"concept", topic:"graph-theory", level:"b",
  q:`Why can an undirected graph on exactly five vertices not have degrees 1, 2, 3, 4, and 5, even if loops or parallel edges are allowed?`,
  choices:["the degrees add to an odd number","5 is too large for a graph on 5 vertices","no two vertices may share a degree","the degrees must be consecutive","None of the above"], ans:0,
  why:`The degrees add to 15, but every edge contributes 2 to the total degree. A loop contributes 2 at its single endpoint, so allowing loops or parallel edges does not change the requirement that the total be even. A degree of 5 is possible with those edges allowed, so the odd total is the reason this particular sequence is impossible.` }

]);
