window.MCQ = (window.MCQ || []).concat([

{ id:"gt-01", topic:"graph-theory", level:"b",
  q:`A triangle joins A, B, and C, so every pair is connected. How many walks of length 2 go from
A back to A?`,
  choices:["2","1","3","0","None of the above"], ans:0,
  check:`str(walks(3,2,'A','A','011101110'))`,
  why:`A walk of length 2 from A to A leaves by one edge and returns by the same or another. From
A you can go to B and back, or to C and back. That is 2. In the adjacency matrix squared, the
diagonal entry for a vertex is always its degree, which is exactly what this counts.` },

{ id:"gt-02", topic:"graph-theory", level:"b",
  q:`In the same triangle on A, B, and C, how many walks of length 2 go from A to B?`,
  choices:["1","2","3","0","None of the above"], ans:0,
  check:`str(walks(3,2,'A','B','011101110'))`,
  why:`Two steps from A to B means passing through exactly one middle vertex that is adjacent to
both. The only candidate is C, since going A to B to B would need a loop at B and there is none.
So the answer is 1.` },

{ id:"gt-03", topic:"graph-theory", level:"s",
  q:`In a triangle on A, B, and C, how many walks of length 4 go from A to C?`,
  choices:["5","3","6","8","None of the above"], ans:0,
  check:`str(walks(3,4,'A','C','011101110'))`,
  why:`Compute step by step rather than multiplying whole matrices. Let d(k) be the number of
length k walks from A to a fixed other vertex, and s(k) the number back to A. Then s(k + 1) is
2 d(k) and d(k + 1) is s(k) + d(k). Starting at s(0) equal to 1 and d(0) equal to 0, the values
run d(1) = 1, d(2) = 1, d(3) = 3, d(4) = 5. The complete graph on three vertices has this tidy
alternating pattern, and it is far faster than cubing a matrix by hand.` },

{ id:"gt-04", topic:"graph-theory", level:"s",
  q:`Vertices A, B, C, and D form a 4-cycle in the order A, B, D, C, back to A. How many walks of
length 3 go from A to D?`,
  choices:["0","2","3","4","None of the above"], ans:0,
  check:`str(walks(4,3,'A','D','0110100110010110'))`,
  why:`This graph is bipartite, with A and D on one side and B and C on the other. Every edge
crosses between sides, so a walk of odd length always ends on the opposite side from where it
started. A and D are on the same side, so no odd length walk connects them. Recognizing
bipartiteness answers this without any arithmetic.` },

{ id:"gt-05", topic:"graph-theory", level:"b",
  q:`How many edges does a tree with 12 vertices have?`,
  choices:["11","12","13","24","None of the above"], ans:0,
  check:`str(12-1)`,
  why:`A tree on N vertices always has exactly N minus 1 edges. Adding any further edge creates a
cycle and removing any edge disconnects it, which is another way of saying a tree is exactly at
the boundary between connected and acyclic. This one fact answers a surprising share of the
counting questions in this category.` },

{ id:"gt-06", topic:"graph-theory", level:"b",
  q:`How many edges does the complete graph on 8 vertices have?`,
  choices:["29", "56", "64", "36", "None of the above"], ans:4,
  check:`str(8*7//2)`,
  why:`Every pair of distinct vertices gets one edge, and there are 8 times 7 over 2 pairs, which
is 28. The division by 2 is because the pair A and B is the same edge as B and A. Forgetting it
gives 56, which is the count for a directed graph with an arrow each way. The value 28 is not among the four choices offered, so the answer is None of the above.` },

{ id:"gt-07", topic:"graph-theory", level:"b",
  q:`An undirected graph has 10 edges. What is the sum of the degrees of all its vertices?`,
  choices:["20","10","5","depends on the number of vertices","None of the above"], ans:0,
  check:`str(2*10)`,
  why:`Each edge touches two vertices and so contributes 1 to each of their degrees, which means
the degree sum is always twice the edge count no matter how the edges are arranged. A useful
corollary is that the number of vertices of odd degree is always even.` },

{ id:"gt-08", topic:"graph-theory", level:"s",
  q:`In a 5 vertex path A to B to C to D to E, how many walks of length 2 go from A to E?`,
  choices:["-1", "1", "2", "4", "None of the above"], ans:4,
  check:`str(walks(5,2,'A','E','0100010100010100010100010'))`,
  why:`A and E sit four edges apart, so no walk of length 2 can reach from one to the other. A
walk of length k can only connect vertices whose distance is at most k, and here the distance is
4. The parity rule also applies: this path is bipartite, and A and E are on the same side, so
only even lengths of at least 4 can work. The value 0 is not among the four choices offered, so the answer is None of the above.` },

{ id:"gt-09", topic:"graph-theory", level:"s",
  q:`In the complete graph on 4 vertices, how many walks of length 10 start and end at A?`,
  choices:["14763","19683","59049","14762","None of the above"], ans:0,
  check:`str(walks(4,10,'A','A','0111101111011110'))`,
  why:`Track two numbers instead of a matrix. Let r be the number of length k walks ending back
at A and o the number ending at any one other vertex. Then r becomes 3o and o becomes r plus 2o
at each step. Starting from r equal to 1 and o equal to 0, ten steps give 14763. There is a
closed form for the complete graph on n vertices: the return count after k steps is
((n - 1) to the k, plus (n - 1) times (-1) to the k) divided by n, which here is
(59049 + 3) over 4. The distractor 59049 is the total number of walks of length 10 from A to
anywhere.` },

{ id:"gt-10", topic:"graph-theory", level:"b",
  q:`In an adjacency matrix for an undirected graph with no loops, what does the sum of row 3
tell you?`,
  choices:["the degree of vertex C","the number of vertices","the number of edges","the length of the longest path from C","None of the above"], ans:0,
  why:`Row 3 has a 1 in every column matching a vertex adjacent to vertex C, so the row sum counts
the edges touching C, which is its degree. In a directed graph the row sum is the outdegree and
the column sum is the indegree, and the two agree only when the graph is undirected and the
matrix is symmetric.` },

{ id:"gt-11", topic:"graph-theory", level:"s",
  q:`A graph has 6 vertices and 4 edges, and no cycles. How many connected components does it
have?`,
  choices:["2","1","3","4","None of the above"], ans:0,
  check:`str(6-4)`,
  why:`An acyclic graph is a forest, and each of its components is a tree. A tree with k vertices
has k minus 1 edges, so a forest with N vertices and C components has N minus C edges. Here 6
minus C equals 4, so C is 2. The same relation lets you find any one of the three numbers from
the other two.` },

{ id:"gt-12", topic:"graph-theory", level:"s",
  q:`A graph is bipartite if and only if it has no cycle of which length?`,
  choices:["odd","even","length 3 only","length 4 only","None of the above"], ans:0,
  why:`Splitting the vertices into two sides with every edge crossing between them means any walk
alternates sides at each step. Returning to your starting vertex therefore takes an even number
of steps, so no odd cycle can exist. The converse holds too, which is why this is stated as an if
and only if rather than just one direction.` },

{ id:"gt-13", topic:"graph-theory", level:"b",
  q:`What is the difference between a walk and a path?`,
  choices:["a path cannot repeat a vertex, a walk can","a walk must be shorter than a path","a path must be a cycle, a walk need not be","there is no difference","None of the above"], ans:0,
  why:`A walk is any sequence of edges laid end to end, with repeats allowed. A path is a walk
that visits no vertex twice. That distinction matters most when you use matrix powers, since
those count walks rather than paths. A question asking for paths of a given length in a small
graph almost always wants you to enumerate by hand.` },

{ id:"gt-14", topic:"graph-theory", level:"s",
  q:`Six vertices A through F form a cycle in alphabetical order, with F joined back to A. How
many walks of length 3 go from A to F?`,
  choices:["3","1","2","0","None of the above"], ans:0,
  check:`str(walks(6,3,'A','F','010001101000010100001010000101100010'))`,
  why:`A and F are adjacent, so the distance is 1 and odd lengths can reach. The length 3 walks
are A to B to A to F, A to F to A to F, and A to F to E to F. That is 3. Enumerating on a drawing
is quicker here than building a 6 by 6 matrix and cubing it.` },

{ id:"gt-15", topic:"graph-theory", level:"s",
  q:`In a graph on 5 vertices where A is joined to every other vertex and there are no other
edges, how many walks of length 2 go from B to C?`,
  choices:["1","0","2","4","None of the above"], ans:0,
  check:`str(walks(5,2,'B','C','0111110000100001000010000'))`,
  why:`This is a star with A at the center. Every edge touches A, so any two step walk between two
leaves has to pass through A, and there is exactly one such route. The same reasoning says the
count between any two distinct leaves is always 1, and from a leaf back to itself it is also 1.` },

{ id:"gt-16", topic:"graph-theory", level:"b",
  q:`Why does entry (i, j) of the adjacency matrix squared count walks of length 2?`,
  choices:["it sums M(i,m) times M(m,j) over every middle vertex m","it doubles every edge count","matrix multiplication reverses the arrows","it counts the vertices adjacent to both i and j only when they are also adjacent to each other","None of the above"], ans:0,
  why:`The definition of matrix multiplication puts the sum over m of M(i, m) times M(m, j) in
that position. Each product is 1 exactly when both the edge from i to m and the edge from m to j
exist, so the sum counts middle vertices that complete a two step route. Applying the same
argument one step at a time gives every higher power, which is worth understanding rather than
memorizing, because it tells you the counts are walks and not paths.` }

]);
