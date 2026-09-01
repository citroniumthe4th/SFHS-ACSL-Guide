window.GUIDE = Object.assign(window.GUIDE || {}, {

"boolean-algebra": `
<p class="lead">Contest 3. Two kinds of question show up. Simplify an expression to the fewest
operators, or find every input assignment that makes it true. The laws below do the first and
a truth table does the second.</p>

<h3>Notation</h3>
<p>ACSL writes AND as juxtaposition or a dot, so AB and A &middot; B mean the same thing. OR is
a plus sign. NOT is a bar over the variable, or an apostrophe after it when a problem is typed
in plain text. XOR appears as a circled plus and XNOR as a circled dot.</p>
<p>Precedence is NOT first, then AND, then OR, which is why AB + C means (A AND B) OR C. The
notation is chosen so that AND looks like multiplication and OR looks like addition, and most
of the algebra you already know carries over. The one place the analogy breaks is that
A + AB simplifies to A, which has no arithmetic counterpart.</p>

<h3>The laws</h3>
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
<p>The second distributive law, where OR distributes over AND, is the one with no arithmetic
analogue, and it is the one people forget they are allowed to use. It turns A + BC into
(A + B)(A + C), which is sometimes exactly the factoring a problem wants.</p>

<h3>Simplifying</h3>
<p>A workable order of attack:</p>
<ol>
<li>Push every NOT inward with DeMorgan until the bars sit on single variables.</li>
<li>Cancel double negations.</li>
<li>Multiply out or factor, whichever moves toward common terms.</li>
<li>Look for absorption. It is the law that collapses expressions fastest and the one most
often missed.</li>
<li>Look for a complement pair, since anything of the form X + X' becomes 1 and then the
annihilator law wipes out a whole term.</li>
</ol>
<p>Simplify (A + B)(A + B'). Distribute: AA + AB' + BA + BB'. Now AA is A by idempotence, and
BB' is 0 by complement, leaving A + AB' + AB. Factor the A out of everything: A(1 + B' + B),
and anything ored with 1 is 1, so the whole thing is A.</p>
<p>Simplify A'B'C + A'BC + AB'C + ABC. Group the first two and the last two: A'C(B' + B) +
AC(B' + B). Each complement pair is 1, so this is A'C + AC, which is C(A' + A), which is C.</p>

<h3>Truth tables</h3>
<p>When the question asks which inputs make an expression true, or when simplification stalls,
build the table. With n variables there are 2 to the n rows, and with three variables that is
eight rows, which takes about a minute.</p>
<p>Write the rows in binary counting order so you never skip one. Add a column for each
subexpression rather than trying to evaluate the whole thing in one step.</p>
<p>A truth table also settles simplification disputes. Two expressions are equal exactly when
their columns match on every row, so if you are unsure whether your simplified form is right,
tabulate both.</p>

<h3>XOR and XNOR</h3>
<p>XOR is 1 when the inputs differ, and it equals AB' + A'B. XNOR is 1 when they agree, and it
equals AB + A'B'. Two facts worth carrying: XOR is associative, so a chain of them is 1 exactly
when an odd number of inputs are 1, and A XOR A is 0 while A XOR 0 is A.</p>

<h3>Where points get lost</h3>
<ul>
<li>Applying DeMorgan to only half the expression. (AB)' is A' + B', and the operator has to
flip too.</li>
<li>Treating A + AB as if it needs distribution. Absorption kills it in one step.</li>
<li>Assuming AND and OR have the same precedence and reading AB + C as A(B + C).</li>
<li>Answering with a correct but not minimal expression when the problem asked for the fewest
operators.</li>
</ul>
`,

"data-structures": `
<p class="lead">Contest 3. Four structures, and each one is defined by which item comes out
next. Get that right and the problems are bookkeeping.</p>

<h3>Stacks</h3>
<p>Last in, first out. PUSH adds to the top and POP removes from the top and returns it.
Popping an empty stack returns NIL.</p>
<p>Push 3, 1, 4, then pop twice. The 4 comes off, then the 1, and the 3 is still there. Draw a
stack as a vertical column with the top at the top of the page and it stays obvious.</p>
<p>Stacks show up everywhere else in ACSL. Postfix evaluation is a stack, checking balanced
parentheses is a stack, and the call chain in a recursive function is a stack.</p>

<h3>Queues</h3>
<p>First in, first out. Items are added at the back and removed from the front. Same three
items, 3, 1, 4, added in that order and removed twice, gives 3 then 1.</p>
<p>A problem that runs a stack and a queue side by side on the same input is common. Track them
in two separate columns, since mixing them up costs the whole question rather than one step.</p>

<h3>Binary search trees</h3>
<p>Every node has a value, and everything in its left subtree is smaller while everything in
its right subtree is larger. To insert, start at the root and go left when the new value is
smaller and right when it is larger, until you fall off the tree, and hang the new value
there.</p>
<p>Insert 50, 30, 70, 20, 40, 60, 80 into an empty tree in that order and you get a tidy tree
with 50 at the root, 30 and 70 as its children, and the other four as leaves. Insert the same
seven values in sorted order and you get a chain seven deep. Shape depends entirely on
insertion order, so never sort the input before building.</p>

<h4>Traversals</h4>
<ul>
<li>Inorder is left, root, right. On a binary search tree this always comes out sorted, which
makes it a free check on your tree.</li>
<li>Preorder is root, left, right. This one exposes the shape, so it is what problems ask for
when they want to know whether you built the right tree.</li>
<li>Postorder is left, right, root.</li>
</ul>
<p>To read a traversal off a drawing quickly, walk the outline of the tree counterclockwise and
write each node down as you pass it on the correct side. Pass on the left for preorder,
underneath for inorder, and on the right for postorder.</p>

<h4>Deletion</h4>
<p>Three cases. A leaf just disappears. A node with one child is replaced by that child. A node
with two children keeps its position but takes the value of either the largest node in its left
subtree or the smallest node in its right subtree, and that node is then deleted.</p>
<p>Both choices are legal, and they give different trees. A problem that asks for a traversal
after a deletion has to tell you which one to use, so read the statement before assuming.</p>

<h4>Path lengths</h4>
<p>The internal path length is the sum of the depths of every node, counting the root as
depth 0. The external path length counts the depths of the empty positions where a new node
would attach, and for a tree with N nodes it always equals the internal path length plus 2N.
That identity is a fast check on your arithmetic.</p>

<h3>Priority queues and heaps</h3>
<p>A priority queue lets you insert anything but only ever remove the smallest item. The usual
implementation is a min heap, a nearly complete binary tree where every parent is smaller than
both of its children.</p>
<p>To insert, put the new value in the next open position at the bottom, then swap it upward
with its parent as long as it is smaller. To delete the minimum, take the root, move the last
item in the tree into the root, then swap it downward with its smaller child until it settles.</p>
<p>A heap is not sorted. All you know is the parent to child relation, so the second smallest
item is one of the root's two children and could be either one. Reading a heap as if it were a
sorted array is the most common mistake in this part of the category.</p>
<p>Heaps are usually stored in an array with the root at index 1, where the children of index i
sit at 2i and 2i + 1 and the parent of index i is at i over 2 rounded down. If a problem hands
you an array and asks whether it is a heap, check that relation at every index.</p>

<h3>Where points get lost</h3>
<ul>
<li>Building a binary search tree from sorted input and getting a balanced tree instead of a
chain.</li>
<li>Mixing up preorder and postorder. Preorder writes the root first.</li>
<li>Using the wrong replacement rule on a two child deletion.</li>
<li>Assuming a heap is sorted.</li>
<li>Forgetting that popping an empty stack yields NIL rather than nothing at all, when the
problem counts outputs.</li>
</ul>
`

});
