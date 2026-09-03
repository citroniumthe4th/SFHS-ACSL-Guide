window.GUIDE = Object.assign(window.GUIDE || {}, {

"boolean-algebra": `
<p class="lead">Boolean algebra is the branch of algebra where every variable takes exactly two
values, true and false, written 1 and 0. It underlies every conditional you have ever written and
every circuit in the Digital Electronics category, and ACSL asks two things of you here: simplify an
expression to the fewest operators, or find which inputs make it true.</p>

<h3>Notation</h3>
<p>AND is written by writing two things next to each other, so AB means A AND B, and it may also
appear with a dot between them. OR is written with a plus sign. NOT is a bar drawn over the thing
being negated, or an apostrophe after it when the problem has to be typed in plain text. XOR uses a
circled plus and XNOR a circled dot.</p>

<p>Precedence runs NOT first, then AND, then OR, which is why AB + C means (A AND B) OR C. The
notation is chosen so that AND looks like multiplication and OR like addition, and a surprising
amount of ordinary algebra carries over unchanged. The place the analogy breaks is that A + AB
simplifies to A, which has no arithmetic counterpart at all, and that is exactly the identity people
forget they are allowed to use.</p>

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
analogue, and it is worth staring at until it stops looking wrong. It turns A + BC into
(A + B)(A + C), which is occasionally exactly the factoring a problem is built around.</p>

<h3>Simplifying</h3>
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

<h3>Truth tables</h3>
<p>When a question asks which inputs make an expression true, or when simplification stalls, build
the table. With n variables there are 2 to the n rows, so three variables means eight rows and about
a minute of work.</p>

<p>Write the rows in binary counting order so that you cannot skip one, and give each subexpression
its own column rather than trying to evaluate the whole line in a single step. A truth table also
settles any argument about whether a simplification is right, since two expressions are equal
exactly when their columns agree on every row.</p>

<h3>XOR and XNOR</h3>
<p>XOR is true when the inputs differ and equals AB' + A'B. XNOR is true when they agree and equals
AB + A'B'. Two facts about XOR are worth carrying: it is associative, so a chain of them is true
exactly when an odd number of the inputs are true, and A XOR A is 0 while A XOR 0 is A.</p>

<h3>The half-applied DeMorgan</h3>
<p>Applying DeMorgan to only half the expression is the biggest single loss, and it happens because
people remember to move the bar and forget that the operator flips with it: (AB)' is A' + B', not
A'B'. After that comes treating A + AB as something that needs distributing when absorption kills it
outright, and reading AB + C as A(B + C) by assuming AND and OR share a precedence level. Finally,
watch for questions that ask for the fewest operators, where a correct but unsimplified answer earns
nothing.</p>
`,

"data-structures": `
<p class="lead">Four structures appear in this category, and each one is defined entirely by which
item comes out next. Get that rule right and the problems reduce to careful bookkeeping, which is
why the useful preparation here is drawing rather than reading.</p>

<h3>Stacks</h3>
<p>A stack is last in, first out. PUSH puts an item on the top and POP takes the top item off and
returns it, and popping an empty stack returns NIL. Push 3, 1, and 4 in that order and pop twice,
and you get the 4 followed by the 1, leaving the 3 behind. Draw a stack as a vertical column with
the top at the top of the page and none of this needs remembering.</p>

<p>Stacks turn up throughout the rest of ACSL. Postfix evaluation is a stack, checking that
parentheses balance is a stack, and the chain of pending calls inside a recursive function is a
stack, which is why a runaway recursion is said to overflow one.</p>

<h3>Queues</h3>
<p>A queue is first in, first out. Items join at the back and leave from the front, so the same
three items added in the order 3, 1, 4 and removed twice give the 3 and then the 1.</p>

<p>Problems that run a stack and a queue side by side on the same input are common, and the way to
survive them is to draw two clearly separated columns and update both after every command. Mixing
them up costs the whole question rather than a single step.</p>

<h3>Binary search trees</h3>
<p>Every node holds a value, and everything in its left subtree is smaller while everything in its
right subtree is larger. To insert, start at the root and go left when the new value is smaller and
right when it is larger, until you run off the bottom of the tree, and hang the new value there.</p>

<p>Insert 50, 30, 70, 20, 40, 60, and 80 into an empty tree in that order and you get a tidy,
balanced tree with 50 at the root, 30 and 70 below it, and the other four as leaves. Insert those
same seven values in sorted order and you get a chain seven nodes deep. The shape depends entirely
on the order the values arrive in, which is why you must never sort the input before building.</p>

<h4>Traversals</h4>
<p>Inorder visits the left subtree, then the root, then the right, and on a binary search tree it
always comes out sorted. That makes it useless for telling two trees apart and extremely useful as a
check that you built the tree correctly, since an inorder walk that is not in order means you went
wrong somewhere.</p>

<p>Preorder visits the root first, then the left subtree, then the right, and because it exposes the
shape it is what problems ask for when they want to know whether you built the right tree. Postorder
visits both subtrees and then the root, so the root always comes last.</p>

<p>To read a traversal off a drawing quickly, trace the outline of the tree counterclockwise and
write each node down as you pass it on the appropriate side: on the left for preorder, underneath
for inorder, and on the right for postorder. The tree above gives 50 30 20 40 70 60 80 in preorder
and 20 40 30 60 80 70 50 in postorder.</p>

<h4>Deletion</h4>
<p>There are three cases. A leaf simply disappears. A node with one child is replaced by that child.
A node with two children keeps its position but takes on either the largest value in its left
subtree or the smallest in its right, and that donor node is then deleted by the same rules.</p>

<p>Both choices of donor are legitimate and they produce different trees, so a problem that asks for
a traversal after a deletion has to tell you which convention it wants. Read that sentence before
you start, because picking the wrong one fails every question involving a two child deletion while
leaving the easy cases looking fine.</p>

<h4>Path lengths</h4>
<p>The internal path length is the sum of the depths of every node, counting the root as depth 0. In
the balanced seven node tree above, the root contributes 0, the two nodes below it contribute 1
each, and the four leaves contribute 2 each, for a total of 10. The external path length counts the
depths of the empty positions where a new node would attach, and for a tree of N nodes it always
equals the internal path length plus 2N, which is a quick check on your arithmetic.</p>

<h3>Priority queues and heaps</h3>
<p>A priority queue lets you insert anything but only ever remove the smallest item. The usual
implementation is a min heap, a nearly complete binary tree in which every parent is smaller than
both of its children.</p>

<p>To insert, put the new value in the next open position at the bottom and swap it upward with its
parent for as long as it is smaller. To remove the minimum, take the root, move the last item in the
tree into the root position, and swap it downward with its smaller child until it settles. Inserting
5, 3, 8, 1, and 4 one at a time gives 1 3 8 5 4 read level by level.</p>

<p>A heap is not sorted, and that sentence is worth rereading. All you know is the relation between
each parent and its own children, so the second smallest item is one of the root's two children but
could be either of them. Reading a heap as though it were a sorted array is the most common mistake
in this part of the category.</p>

<p>Heaps are usually stored in an array with the root at index 1, where the children of index i sit
at 2i and 2i + 1 and the parent of index i sits at i over 2 with the fraction dropped. If a problem
hands you an array and asks whether it is a heap, check that relation at every index rather than
trying to picture the tree.</p>

<h3>The errors that survive knowing the material</h3>
<p>Building a binary search tree from sorted input and drawing a balanced tree instead of a chain is
the biggest one. After that: confusing preorder with postorder, using the wrong donor on a two child
deletion, assuming a heap is sorted, and forgetting that popping an empty stack yields NIL rather
than nothing at all, which matters whenever the problem is counting outputs.</p>
`

});
