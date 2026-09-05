window.GUIDE = Object.assign(window.GUIDE || {}, {

"boolean-algebra": `
<p class="lead">Boolean variables take the values 0 and 1. ACSL questions ask you to simplify expressions or determine which assignments make an expression true. The same operations appear as gates in Digital Electronics.</p>

<h2>Notation</h2>
<p>AND is written by writing two things next to each other, so AB means A AND B, and it may also
appear with a dot between them. OR is written with a plus sign. NOT is a bar drawn over the thing
being negated, or an apostrophe after it when the problem has to be typed in plain text. XOR uses a
circled plus and XNOR a circled dot.</p>

<p>Precedence runs NOT first, then AND, then XOR and XNOR, then OR. Evaluate operators at the same level from left to right. Thus AB + C means (A AND B) OR C. The notation resembles arithmetic, but its laws differ: for example, A + AB simplifies to A.</p>

<h2>The laws</h2>
<table class="tbl">
<tr><th>Name</th><th>Statement</th></tr>
<tr><td>Commutative</td><td>A + B = B + A and AB = BA</td></tr>
<tr><td>Associative</td><td>A + (B + C) = (A + B) + C and A(BC) = (AB)C</td></tr>
<tr><td>Idempotent</td><td>A + A = A and AA = A</td></tr>
<tr><td>Identity</td><td>A + 0 = A and A &middot; 1 = A</td></tr>
<tr><td>Annihilator</td><td>A + 1 = 1 and A &middot; 0 = 0</td></tr>
<tr><td>Complement</td><td>A + A' = 1 and A &middot; A' = 0</td></tr>
<tr><td>Double negation</td><td>(A')' = A</td></tr>
<tr><td>Absorption</td><td>A + AB = A and A(A + B) = A</td></tr>
<tr><td>Absorption, second form</td><td>A + A'B = A + B and A(A' + B) = AB</td></tr>
<tr><td>Distributive</td><td>A(B + C) = AB + AC and A + BC = (A + B)(A + C)</td></tr>
<tr><td>DeMorgan</td><td>(A + B)' = A'B' and (AB)' = A' + B'</td></tr>
</table>
<p>OR distributes over AND in Boolean algebra: A + BC = (A + B)(A + C). If A is 1, both sides are 1. If A is 0, both sides reduce to BC. That checks all possible assignments of A, B, and C.</p>

<p>Once you trust it, use it as a factoring rule. An expression of the form A + BC can be turned
into a product, which is often the step a simplification problem is built around.</p>

<h2>Simplifying</h2>
<p>A workable order of attack is to push every NOT inward with DeMorgan until the bars sit only on
single variables, cancel any double negations that appear, then multiply out or factor depending on
which direction moves you toward common terms. After that, look specifically for absorption, which
collapses expressions faster than anything else and is the law most often missed, and for a
complement pair, since anything of the form X + X' becomes 1 and the annihilator law then wipes out
whatever it was multiplying.</p>

<p>Simplify (A + B)(A + B'). Multiplying out gives AA + AB' + BA + BB'. Idempotence turns AA into
A, the complement law turns BB' into 0, and what remains is A + AB' + AB. Factoring the A out of
everything gives A(1 + B' + B), and anything ored with 1 is 1, so the whole expression is just A.
The second distributive law reaches the same place in one step, since A + BB' is A + 0.</p>

<p>Simplify A'B'C + A'BC + AB'C + ABC. Group the first two and the last two to get A'C(B' + B) plus
AC(B' + B). Each complement pair is 1, leaving A'C + AC, which factors to C(A' + A), which is C.
Looking at the four terms again with that answer in hand, notice that every one of them ends in C
and that between them the four AB combinations are all present, so the expression is true exactly
when C is true and nothing else matters.</p>

<h2>Truth tables</h2>
<p>When a question asks which inputs make an expression true, or when simplification stalls, build
the table. With n variables there are 2 to the n rows, so three variables means eight rows and about
a minute of work.</p>

<p>Write the rows in binary counting order so that you cannot skip one, and give each subexpression
its own column instead of trying to evaluate the whole line in a single step. A truth table also
settles any argument about whether a simplification is right, since two expressions are equal
exactly when their columns agree on every row.</p>

<h2>XOR and XNOR</h2>
<p>XOR is true when the inputs differ and equals AB' + A'B. XNOR is true when they agree and equals
AB + A'B'. Two facts about XOR are worth carrying: it is associative, so a chain of them is true
exactly when an odd number of the inputs are true, and A XOR A is 0 while A XOR 0 is A.</p>

<h2>The half-applied DeMorgan</h2>
<p>DeMorgan changes both the operator and the complements: (AB)' = A' + B'. Check for absorption before distributing, since A + AB is already A. Keep AND ahead of OR when grouping an expression. If a problem asks for the fewest operators, continue simplifying after you have found an equivalent expression.</p>
`,

"data-structures": `
<p class="lead">This category covers stacks, queues, binary search trees, and priority queues. For stacks and queues, track which item is removed next. For trees and heaps, draw the structure after each insertion or deletion.</p>

<h2>Stacks</h2>
<p>A stack is last in, first out. PUSH adds an item to the top. POP removes and returns the top item. Under ACSL's convention, popping an empty stack returns NIL. Push 3, 1, and 4, then pop twice: the outputs are 4 and 1, leaving 3 on the stack.</p>

<p>Stacks turn up throughout the rest of ACSL. Postfix evaluation is a stack, checking that
parentheses balance is a stack, and the chain of pending calls inside a recursive function is a
stack, which is why a runaway recursion is said to overflow one.</p>

<h2>Queues</h2>
<p>A queue is first in, first out. Items join at the back and leave from the front, so the same
three items added in the order 3, 1, 4 and removed twice give the 3 and then the 1.</p>

<p>When a problem uses both a stack and a queue, keep separate columns for them. For each command, update the named structure and record any value it outputs.</p>

<h2>Binary search trees</h2>
<p>Every node holds a value. The key at a node is greater than or equal to everything in its left
subtree and strictly less than everything in its right subtree. To insert, start at the root and go
left when the new value is less than or equal to the node you are standing on, right when it is
greater, until you run off the bottom of the tree, and hang the new value there.</p>

<p>ACSL inserts duplicate keys to the <em>left</em>. Some textbooks and libraries use another convention. Insert A, M, E, R, I, C, A, N in that order: the second A becomes the left child of the first. The eight-node tree has inorder traversal A A C E I M N R.</p>

<p>Insert 50, 30, 70, 20, 40, 60, and 80 into an empty tree in that order and you get a tidy,
balanced tree with 50 at the root, 30 and 70 below it, and the other four as leaves. Insert those
same seven values in sorted order and you get a chain of seven nodes with maximum depth 6. The shape depends entirely
on the order the values arrive in, which is why you must never sort the input before building.</p>

<h3>Traversals</h3>
<p>Inorder visits the entire left subtree, the root, and then the entire right subtree. For a binary search tree, it lists the keys in sorted order. Use that as a check, but remember that different tree shapes can have the same inorder traversal.</p>

<p>Preorder visits the root, the entire left subtree, and then the entire right subtree. Postorder visits the left subtree, the right subtree, and then the root. In postorder, the root is the final value.</p>

<p>To read a traversal off a drawing quickly, trace the outline of the tree counterclockwise and
write each node down as you pass it on the appropriate side: on the left for preorder, underneath
for inorder, and on the right for postorder. The tree above gives 50 30 20 40 70 60 80 in preorder
and 20 40 30 60 80 70 50 in postorder.</p>

<h3>A tree to trace</h3>
<figure class="diagram"><img src="/assets/diagrams/binary-search-tree.svg" width="300" height="250" loading="lazy" alt="Binary search tree. Root 8 has children 3 and 10. Node 3 has children 1 and 6. Node 6 has children 4 and 7. Node 10 has right child 14, whose left child is 13."><figcaption>Binary search tree by Derrick Coetzee, reworked by Booyabazooka and Inductiveload. <a href="https://commons.wikimedia.org/wiki/File:Binary_search_tree.svg">Source and public-domain dedication</a>. Unmodified.</figcaption></figure>
<p>For this tree, preorder is 8, 3, 1, 6, 4, 7, 10, 14, 13. Postorder is 1, 4, 7, 6, 3, 13, 14, 10, 8. Inorder gives the sorted sequence 1, 3, 4, 6, 7, 8, 10, 13, 14.</p>

<h3>Deletion</h3>
<p>There are three cases, and the third is another place ACSL does its own thing. A leaf simply
disappears. A node with one child is replaced by that child. A node with two children is replaced by
its <em>left</em> child, and its entire right subtree is then reattached to that left child's tree,
which lands it at the rightmost position, since every key in it is larger than every key already
there.</p>

<p>Another deletion algorithm replaces a key with its inorder predecessor or successor. That can produce a different tree from ACSL's rule. In the earlier A, M, E, R, I, C, A, N example, deleting M promotes E with its children C and I, then attaches R as the right child of I.</p>

<h3>Path lengths</h3>
<p>The internal path length is the sum of the depths of every node, counting the root as depth 0. In
the balanced seven node tree above, the root contributes 0, the two nodes below it contribute 1
each, and the four leaves contribute 2 each, for a total of 10. The external path length counts the
depths of the empty positions where a new node would attach, and for a tree of N nodes it always
equals the internal path length plus 2N, which is a quick check on your arithmetic.</p>

<h2>Priority queues and heaps</h2>
<p>A priority queue removes items according to priority. ACSL uses the convention that the smallest item comes out first. A min heap implements this with a complete binary tree filled from left to right, where each parent is less than or equal to its children. Insert at the next open position and swap upward while the new value is smaller than its parent. To remove the minimum, replace the root with the last item, then swap downward with the smaller child until the heap order is restored.</p>

<p>To insert, put the new value in the next open position at the bottom and swap it upward with its
parent for as long as it is smaller. To remove the minimum, take the root, move the last item in the
tree into the root position, and swap it downward with its smaller child until it settles. Inserting
5, 3, 8, 1, and 4 one at a time gives 1 3 8 5 4 read level by level.</p>

<p>Heap order compares parents with their children. It does not sort an entire level. In a heap with at least three nodes, the second item removed is the smaller of the root's two children, and that child may be on either side.</p>

<p>Heaps are usually stored in an array with the root at index 1, where the children of index i sit
at 2i and 2i + 1 and the parent of index i sits at i over 2 with the fraction dropped. If a problem
hands you an array and asks whether it is a heap, check that relation at every index rather than
trying to picture the tree.</p>

<h2>Checking a tree you have drawn</h2>
<p>Check the tree first. If the keys arrived sorted, does your drawing show the chain that produces
rather than a balanced tree? Did every duplicate key go left? For a two child deletion, did you
promote the left child and reattach the right subtree, which is ACSL's rule and not the donor swap
taught elsewhere?</p>

<p>Then two that come up constantly. A heap is not sorted, so read a level order listing off your
drawing rather than assuming it comes out in order. And popping an empty stack or queue yields NIL,
which is a value and appears in the output, so it counts whenever the question is counting.</p>
`

});
