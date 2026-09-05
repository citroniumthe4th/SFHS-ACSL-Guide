window.MCQ = (window.MCQ || []).concat([

{ id:"gt-01", topic:"graph-theory", level:"b",
  q:`A triangle joins A, B, and C, so every pair is connected. How many walks of length 2 go from
A back to A?`,
  choices:["2","1","3","0","None of the above"], ans:0,
  check:`str(walks(3,2,'A','A','011101110'))`,
  why:`A walk of length 2 that starts and ends at A must leave along one edge and return along
one, and from A those options are out to B and back or out to C and back, giving 2. There is a general
fact behind that particular number: the diagonal entry of the squared adjacency matrix is always the
degree of that vertex, which is exactly what a there-and-back walk counts.` },

{ id:"gt-02", topic:"graph-theory", level:"b",
  q:`In an undirected triangle on A, B, and C, how many walks of length 2 go from A to B?`,
  choices:["1","2","3","0","None of the above"], ans:0,
  check:`str(walks(3,2,'A','B','011101110'))`,
  why:`Two steps from A to B means passing through exactly one middle vertex adjacent to both,
and the only candidate is C. Going A to B and then B to B would need a loop at B, and the graph has
none, so the count is 1.` },

{ id:"gt-03", topic:"graph-theory", level:"s",
  q:`In a triangle on A, B, and C, how many walks of length 4 go from A to C?`,
  choices:["5","3","6","8","None of the above"], ans:0,
  check:`str(walks(3,4,'A','C','011101110'))`,
  why:`Cubing and then taking a fourth power of a matrix by hand is more work than this needs.
Let d(k) be the number of length k walks from A to a fixed other vertex and s(k) the number that
return to A. On a triangle, s(k + 1) is 2 d(k) and d(k + 1) is s(k) + d(k). Starting from s(0) equal
to 1 and d(0) equal to 0, the values run d(1) equal to 1, d(2) equal to 1, d(3) equal to 3, and d(4)
equal to 5.` },

{ id:"gt-04", topic:"graph-theory", level:"s",
  q:`Vertices A, B, C, and D form a 4-cycle in the order A, B, D, C, back to A. How many walks of
length 3 go from A to D?`,
  choices:["0","2","3","4","None of the above"], ans:0,
  check:`str(walks(4,3,'A','D','0110100110010110'))`,
  why:`The graph is bipartite, with A and D on one side and B and C on the other, and every edge
crosses between the two sides. A walk of odd length therefore always finishes on the opposite side
from where it began, and since A and D sit on the same side, no odd length walk can connect them at
all. Recognising the bipartite structure answers the question without any arithmetic.` },

{ id:"gt-05", topic:"graph-theory", level:"b",
  q:`How many edges does a tree with 12 vertices have?`,
  choices:["11","12","13","24","None of the above"], ans:0,
  check:`str(12-1)`,
  why:`A tree on N vertices always has exactly N minus 1 edges. Adding any further edge creates a
cycle and removing any edge disconnects the graph, which is a compact way of saying that a tree sits
exactly on the boundary between being connected and being acyclic. That single fact settles a
surprising share of the counting questions in this category.` },

{ id:"gt-06", topic:"graph-theory", level:"b",
  q:`How many edges does the complete graph on 8 vertices have?`,
  choices:["29", "56", "64", "36", "None of the above"], ans:4,
  check:`str(8*7//2)`,
  why:`Every pair of distinct vertices contributes one edge, and there are 8 times 7 over 2 such
pairs, which is 28. The division by two is there because the pair A and B describes the same edge as
the pair B and A. Omitting it gives 56, which would be the count for a directed graph carrying an
arrow each way. Since 28 is not among the four choices offered, the answer is None of the above.` },

{ id:"gt-07", topic:"graph-theory", level:"b",
  q:`An undirected graph has 10 edges. What is the sum of the degrees of all its vertices?`,
  choices:["20","10","5","depends on the number of vertices","None of the above"], ans:0,
  check:`str(2*10)`,
  why:`Each edge touches two vertices and therefore adds 1 to each of their degrees, so the total
of all the degrees is always twice the number of edges however the edges happen to be arranged. A
useful corollary falls straight out of that: since the total is even, the number of vertices of odd
degree must itself be even.` },

{ id:"gt-08", topic:"graph-theory", level:"s",
  q:`In a 5 vertex path A to B to C to D to E, how many walks of length 2 go from A to E?`,
  choices:["-1", "1", "2", "4", "None of the above"], ans:4,
  check:`str(walks(5,2,'A','E','0100010100010100010100010'))`,
  why:`A and E sit four edges apart, and a walk of length k can only connect vertices whose
distance is at most k, so no walk of length 2 has any chance of reaching from one to the other. The
parity argument gives the same conclusion from another direction, since a path graph is bipartite and
A and E fall on the same side, meaning only even lengths of at least 4 can connect them. Since 0 is
not among the four choices offered, the answer is None of the above.` },

{ id:"gt-09", topic:"graph-theory", level:"s",
  q:`In the complete graph on 4 vertices, how many walks of length 10 start and end at A?`,
  choices:["14763","19683","59049","14762","None of the above"], ans:0,
  check:`str(walks(4,10,'A','A','0111101111011110'))`,
  why:`Track two numbers rather than a whole matrix. Let r be the number of length k walks that
end back at A and o the number ending at any one particular other vertex. At each step r becomes 3o
and o becomes r plus 2o. Starting from r equal to 1 and o equal to 0, ten steps give 14763. There is
also a closed form for the complete graph on n vertices, where the return count after k steps is
((n - 1) to the k, plus (n - 1) times (-1) to the k) divided by n, which here is (59049 + 3) over 4.
The distractor 59049 is the total number of length 10 walks from A to anywhere at all.` },

{ id:"gt-10", topic:"graph-theory", level:"b",
  q:`In an adjacency matrix for an undirected graph with no loops, what does the sum of row 3
tell you?`,
  choices:["the degree of vertex C","the number of vertices","the number of edges","the length of the longest path from C","None of the above"], ans:0,
  why:`Row 3 holds a 1 in every column matching a vertex adjacent to vertex C, so summing the row
counts the edges touching C, which is its degree. In a directed graph that same row sum is the
outdegree while the column sum is the indegree, and the two agree only when the matrix is symmetric,
which is to say only when the graph is undirected.` },

{ id:"gt-11", topic:"graph-theory", level:"s",
  q:`A graph has 6 vertices and 4 edges, and no cycles. How many connected components does it
have?`,
  choices:["2","1","3","4","None of the above"], ans:0,
  check:`str(6-4)`,
  why:`An acyclic graph is a forest and each of its components is a tree, so if a tree on k
vertices has k minus 1 edges, then a forest on N vertices with C components has N minus C edges.
Setting 6 minus C equal to 4 gives C equal to 2. The same relation works in any direction, so it will
recover whichever of the three numbers a question leaves out.` },

{ id:"gt-12", topic:"graph-theory", level:"s",
  q:`A graph is bipartite if and only if it has no cycle of which length?`,
  choices:["odd","even","length 3 only","length 4 only","None of the above"], ans:0,
  why:`If the vertices split into two sides with every edge crossing between them, then any walk
alternates sides at each step, and returning to your starting vertex therefore takes an even number of
steps. No odd cycle can survive that. The converse holds as well, which is why the result is stated as
an if and only if rather than in one direction only.` },

{ id:"gt-13", topic:"graph-theory", level:"b",
  q:`In ACSL terminology, what distinguishes a simple path from a path that may repeat vertices?`,
  choices:["a simple path cannot repeat a vertex","a walk must be shorter than a path","a path must be a cycle, a walk need not be","there is no difference","None of the above"], ans:0,
  why:`A walk is any sequence of edges laid end to end, with vertices and edges free to repeat,
and the ACSL wiki calls this a path. A simple path cannot repeat a vertex. Matrix powers count paths with repetition allowed, so they cannot directly count simple paths.` },

{ id:"gt-14", topic:"graph-theory", level:"s",
  q:`Six vertices A through F form a cycle in alphabetical order, with F joined back to A. How
many walks of length 3 go from A to F?`,
  choices:["3","1","2","0","None of the above"], ans:0,
  check:`str(walks(6,3,'A','F','010001101000010100001010000101100010'))`,
  why:`A and F are adjacent, so the distance between them is 1 and odd lengths can reach. The
walks of length 3 are A to B to A to F, A to F to A to F, and A to F to E to F, which is 3. Drawing
the cycle and enumerating is considerably quicker here than building a 6 by 6 matrix and cubing
it.` },

{ id:"gt-15", topic:"graph-theory", level:"s",
  q:`In a graph on 5 vertices where A is joined to every other vertex and there are no other
edges, how many walks of length 2 go from B to C?`,
  choices:["1","0","2","4","None of the above"], ans:0,
  check:`str(walks(5,2,'B','C','0111110000100001000010000'))`,
  why:`This is a star with A at the centre, so every edge touches A and any two step walk between
two leaves has to pass through it. There is exactly one such route between any given pair of leaves,
and the same reasoning gives a count of 1 from a leaf back to itself as well.` },

{ id:"gt-16", topic:"graph-theory", level:"b",
  q:`Why does entry (i, j) of the adjacency matrix squared count walks of length 2?`,
  choices:["it sums M(i,m) times M(m,j) over every middle vertex m","it doubles every edge count","matrix multiplication reverses the arrows","it counts the vertices adjacent to both i and j only when they are also adjacent to each other","None of the above"], ans:0,
  why:`It follows straight from the definition of matrix multiplication, which puts the sum over
m of M(i, m) times M(m, j) in that position. Each of those products is 1 exactly when both the edge
from i to m and the edge from m to j exist, so the sum counts the middle vertices that complete a two
step route. Applying the same argument one step at a time gives every higher power, and it is worth
following rather than memorising, because it is what tells you the counts are walks and not paths.` }

]);
