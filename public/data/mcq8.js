window.MCQ = (window.MCQ || []).concat([

{ id:"ds-01", kind:"problem", topic:"data-structures", level:"b",
  q:`The values 50, 30, 70, 20, 40, 60, 80 are inserted into an empty binary search tree in that
order. What is the preorder traversal?`,
  choices:["50 30 20 40 70 60 80","20 30 40 50 60 70 80","20 40 30 60 80 70 50","50 30 70 20 40 60 80","None of the above"], ans:0,
  check:`trav("+50 +30 +70 +20 +40 +60 +80".split(), "pre")`,
  why:`Inserting those seven values in that order gives a balanced tree with 50 at the root, 30
and 70 below it, and the remaining four as leaves. Preorder writes the root, then the entire left
subtree, then the entire right, so it reads 50, then 30 20 40, then 70 60 80. The sorted sequence 20 30 40 50 60 70 80 is inorder. The sequence 50 30 70 20 40 60 80 is level order, which reads across each row.` },

{ id:"ds-02", kind:"problem", topic:"data-structures", level:"b",
  q:`Using the same tree built from 50, 30, 70, 20, 40, 60, 80, what is the postorder traversal?`,
  choices:["20 40 30 60 80 70 50","50 30 20 40 70 60 80","20 30 40 50 60 70 80","80 60 70 40 20 30 50","None of the above"], ans:0,
  check:`trav("+50 +30 +70 +20 +40 +60 +80".split(), "post")`,
  why:`Postorder visits both subtrees before the root, which means the root is always the last
value written. Working from the inside out, the left subtree gives 20 40 30 and the right gives
60 80 70, with 50 finishing the sequence. If your answer does not end on the root, whatever you did it
was not postorder.` },

{ id:"ds-03", kind:"problem", topic:"data-structures", level:"s",
  q:`Insert 50, 30, 70, 20, 40 into an empty binary search tree, then delete 30, replacing it
with the largest value in its left subtree. What is the preorder traversal?`,
  choices:["50 20 40 70","50 40 20 70","50 30 20 40 70","50 40 70","None of the above"], ans:0,
  check:`trav("+50 +30 +70 +20 +40 -30".split(), "pre")`,
  why:`Deleting 30 lands on the two child case, and the rule given is to pull up the largest
value in the left subtree, which is 20. The node holding 30 therefore takes the value 20, the old 20
leaf disappears, and 40 stays hanging on the right of that node, so the preorder reads 50, 20, 40, 70.
Had the convention been to pull up the smallest value from the right subtree instead, the answer would
be 50 40 20 70, which is sitting in the choices for that reason.` },

{ id:"ds-04", kind:"problem", topic:"data-structures", level:"b",
  q:`The values 1, 2, 3, 4, 5 are inserted into an empty binary search tree in that order. What
is the height of the tree, counting the root as height 0?`,
  choices:["6", "2", "3", "5", "None of the above"], ans:4,
  check:`str(trav("+1 +2 +3 +4 +5".split(), "height"))`,
  why:`Each new value is larger than everything already in the tree, so every one of them hangs
off the right of the previous, and the result is a chain of five nodes with no branching anywhere. The
deepest node therefore sits four edges below the root. Insertion order alone decides the shape, which
is why sorting the input before building is never harmless. Since 4 is not among the four choices
offered, the answer is None of the above.` },

{ id:"ds-05", kind:"problem", topic:"data-structures", level:"b",
  q:`Push 3, 1, 4, 1, 5 onto a stack, then pop three times. What is the last value popped?`,
  choices:["4","1","3","5","None of the above"], ans:0,
  check:`stack_queue("S3 S1 S4 S1 S5 P P P".split()).split()[-1]`,
  why:`A stack is last in, first out, so the values come off in the reverse of the order they
went on, which is 5, then 1, then 4, making the third pop 4. Drawing the stack as a column with the
top of the stack at the top of the page keeps this obvious rather than something to reason about.` },

{ id:"ds-06", kind:"problem", topic:"data-structures", level:"b",
  q:`Add 3, 1, 4, 1, 5 to a queue in that order, then remove three times. What is the last value
removed?`,
  choices:["4","1","3","5","None of the above"], ans:0,
  check:`stack_queue("Q3 Q1 Q4 Q1 Q5 D D D".split()).split()[-1]`,
  why:`A queue is first in, first out, so the values leave in the order they arrived, which is 3,
then 1, then 4, making the third removal 4. Drawing the queue from front to back makes the removal order explicit.` },

{ id:"ds-07", kind:"problem", topic:"data-structures", level:"s",
  q:`Run these commands, where S pushes onto a stack, Q adds to a queue, P pops the stack, and D
removes from the front of the queue. A removal from an empty structure writes X.
For SA SB QC P D P P, what is written, in order?`,
  choices:["B C A X","A C B X","B C A","A B C X","None of the above"], ans:0,
  check:`stack_queue("SA SB QC P D P P".split())`,
  why:`Pushing A and then B leaves B on top of the stack, while C goes into the queue. The first
P therefore writes B, the D writes C, and the next P writes A. The final P finds the stack empty, and
the rule is to write X rather than to stop, so the output ends with an X. Forgetting that last step is
what produces B C A, with the final result missing.` },

{ id:"ds-08", kind:"problem", topic:"data-structures", level:"s",
  q:`The values 8, 3, 10, 1, 6, 14, 4, 7, 13 are inserted into an empty binary search tree in
that order. What is the inorder traversal?`,
  choices:["1 3 4 6 7 8 10 13 14","8 3 1 6 4 7 10 14 13","1 4 7 6 3 13 14 10 8","8 3 10 1 6 14 4 7 13","None of the above"], ans:0,
  check:`trav("+8 +3 +10 +1 +6 +14 +4 +7 +13".split(), "in")`,
  why:`An inorder walk of a binary search tree always produces the values in sorted order, and
that holds no matter what shape the insertions happened to build. It makes inorder useless for telling
two trees apart and extremely useful as a check on your own work, because an inorder walk that is not
sorted means the tree itself is wrong.` },

{ id:"ds-09", kind:"problem", topic:"data-structures", level:"s",
  q:`Insert 5, 3, 8, 1, 4 into a min heap one at a time, sifting each new value up from the
bottom. What does the heap array look like, reading level by level?`,
  choices:["1 3 8 5 4","1 3 4 5 8","1 4 8 5 3","1 3 5 4 8","None of the above"], ans:0,
  check:`minheap([5,3,8,1,4])`,
  why:`Insert 5 as the root. Insert 3 at the bottom, and since it beats 5 the two swap, giving
3 5. Insert 8, which stays where it lands, giving 3 5 8. Insert 1 as the left child of 5, and it swaps
first with 5 and then with 3, giving 1 3 8 5. Insert 4 as the right child of 3, and since 4 is larger
it stays put, giving 1 3 8 5 4. A heap is not sorted, which is why the tidy looking sorted choice is
wrong.` },

{ id:"ds-10", kind:"problem", topic:"data-structures", level:"b",
  q:`In a min heap stored in an array with the root at index 1, where does the parent of the node
at index 11 sit?`,
  choices:["5","6","10","22","None of the above"], ans:0,
  check:`str(11//2)`,
  why:`With the root at index 1, the children of index i sit at 2i and 2i + 1, so the parent of
index i sits at i divided by 2 with the fraction discarded, which for 11 gives 5. Checking it forwards
is quicker than trusting the formula: the children of 5 are 10 and 11, so 11 is indeed the right child
of 5.` },

{ id:"ds-11", kind:"problem", topic:"data-structures", level:"s",
  q:`A binary search tree contains 50 at the root, 30 and 70 as its children, and 20, 40, 60, and
80 as leaves. What is its internal path length, counting the root at depth 0?`,
  choices:["11", "8", "12", "14", "None of the above"], ans:4,
  check:`str(trav("+50 +30 +70 +20 +40 +60 +80".split(), "ipl"))`,
  why:`Internal path length is the sum of the depths of every node, with the root counted as
depth 0. Here the root contributes nothing, the two nodes below it contribute 1 each, and the four
leaves contribute 2 each, for a total of 10. As a check, the external path length of a tree with N
nodes is always the internal path length plus 2N, which would be 10 plus 14, or 24. Since 10 is not
among the four choices offered, the answer is None of the above.` },

{ id:"ds-12", kind:"problem", topic:"data-structures", level:"s",
  q:`Insert 100, 50, 150, then delete 50 and then delete 150. What is the preorder traversal of
what remains?`,
  choices:["100","100 50","EMPTY","50 100 150","None of the above"], ans:0,
  check:`trav("+100 +50 +150 -50 -150".split(), "pre")`,
  why:`Both 50 and 150 are leaves, and a leaf simply disappears when it is deleted, so the root
is left standing alone and its preorder is a single value. The leaf case is the easy one of the three,
but it still needs handling separately from the one child and two child cases in any code you
write.` },

{ id:"ds-13", kind:"concept", topic:"data-structures", level:"b",
  q:`Which traversal visits the root, then the entire left subtree, then the entire right subtree?`,
  choices:["preorder","inorder","postorder","level order","None of the above"], ans:0,
  why:`Preorder means root, then left subtree, then right subtree, so the root is always the
first value written. Inorder places it in the middle and postorder places it last. Level order also starts at the root, but then visits nodes by depth. It does not finish the left subtree before starting the right subtree.` },

{ id:"ds-14", kind:"problem", topic:"data-structures", level:"s",
  q:`Insert 20, 10, 30, 5, 15, 25, 35 into a binary search tree, then delete 10 using the largest
value in the left subtree. What is the preorder traversal?`,
  choices:["20 5 15 30 25 35","20 15 5 30 25 35","20 5 30 25 35","20 10 15 30 25 35","None of the above"], ans:0,
  check:`trav("+20 +10 +30 +5 +15 +25 +35 -10".split(), "pre")`,
  why:`The node holding 10 has two children, 5 and 15, and the largest value in its left subtree
is 5, since that subtree is a single node. The node therefore takes the value 5, the old 5 leaf is
removed, and 15 stays on the right, so the preorder reads 20, 5, 15, 30, 25, 35. Pulling up the
smallest value from the right subtree instead would have given 20 15 5 30 25 35.` },

{ id:"ds-15", kind:"problem", topic:"data-structures", level:"j",
  q:`Push 7, then push 2, then pop, then push 9, then pop, then pop. What is written, in order?`,
  choices:["2 9 7","7 2 9","2 7 9","9 2 7","None of the above"], ans:0,
  check:`stack_queue("S7 S2 P S9 P P".split())`,
  why:`After pushing 7 and then 2, the top of the stack is 2, so the first pop writes 2. Pushing
9 puts it on top, so the second pop writes 9. The final pop writes 7, which has been sitting at the
bottom the whole time. Interleaving pushes with pops is where stack questions get their difficulty,
which is why it pays to redraw the column after every single command rather than every few.` },

{ id:"ds-16", kind:"problem", topic:"data-structures", level:"j",
  q:`A queue holds A, B, C with A at the front. Remove one item, add D, then remove one item.
What is left in the queue, front first?`,
  choices:["C D","B C","D C","B D","None of the above"], ans:0,
  check:`
q = ['A','B','C']
q.pop(0); q.append('D'); q.pop(0)
RESULT = " ".join(q)`,
  why:`The first removal takes A off the front, leaving B and C. D then joins at the back, giving
B, C, D. The second removal takes B, leaving C at the front with D behind it. Additions always happen
at the back and removals always at the front, and that single rule is the whole of a queue.` },

{ id:"ds-17", kind:"problem", topic:"data-structures", level:"b",
  q:`<figure class="diagram"><img src="/assets/diagrams/binary-search-tree.svg" width="300" height="250" loading="lazy" alt="Binary search tree. Root 8 has children 3 and 10. Node 3 has children 1 and 6. Node 6 has children 4 and 7. Node 10 has right child 14, whose left child is 13."><figcaption>Binary search tree by Derrick Coetzee, reworked by Booyabazooka and Inductiveload. <a href="https://commons.wikimedia.org/wiki/File:Binary_search_tree.svg">Source and public-domain dedication</a>. Unmodified.</figcaption></figure>
<p>What is the postorder traversal of the tree shown?</p>`,
  choices:["1 4 7 6 3 13 14 10 8","8 3 1 6 4 7 10 14 13","1 3 4 6 7 8 10 13 14","1 4 7 3 6 13 10 14 8","None of the above"], ans:0,
  check:`trav("+8 +3 +10 +1 +6 +14 +4 +7 +13".split(), "post")`,
  why:`Postorder visits the entire left subtree, then the entire right subtree, then the root. The
subtree rooted at 3 gives 1 4 7 6 3. The subtree rooted at 10 gives 13 14 10. Append the root, 8.` },

{ id:"ds-18", kind:"problem", topic:"data-structures", level:"b",
  q:`<figure class="diagram"><img src="/assets/diagrams/binary-search-tree.svg" width="300" height="250" loading="lazy" alt="Binary search tree. Root 8 has children 3 and 10. Node 3 has children 1 and 6. Node 6 has children 4 and 7. Node 10 has right child 14, whose left child is 13."><figcaption>Binary search tree by Derrick Coetzee, reworked by Booyabazooka and Inductiveload. <a href="https://commons.wikimedia.org/wiki/File:Binary_search_tree.svg">Source and public-domain dedication</a>. Unmodified.</figcaption></figure>
<p>How many leaves does the tree shown have?</p>`,
  choices:["4","3","5","9","None of the above"], ans:0,
  check:`str(sum(1 for children in [(3,10),(1,6),(None,14),(None,None),(4,7),(13,None),(None,None),(None,None),(None,None)] if children == (None,None)))`,
  why:`A leaf has no children. Here the leaves are 1, 4, 7, and 13, giving four. Node 14 has only one
child, but it still is not a leaf.` },

{ id:"ds-19", kind:"problem", topic:"data-structures", level:"b",
  q:`<figure class="diagram"><img src="/assets/diagrams/binary-search-tree.svg" width="300" height="250" loading="lazy" alt="Binary search tree. Root 8 has children 3 and 10. Node 3 has children 1 and 6. Node 6 has children 4 and 7. Node 10 has right child 14, whose left child is 13."><figcaption>Binary search tree by Derrick Coetzee, reworked by Booyabazooka and Inductiveload. <a href="https://commons.wikimedia.org/wiki/File:Binary_search_tree.svg">Source and public-domain dedication</a>. Unmodified.</figcaption></figure>
<p>Starting with this tree, insert 5, then delete 3 using ACSL's deletion rule: promote the left
subtree and attach the original right subtree at its rightmost node. What is the preorder
traversal?</p>`,
  choices:["8 1 6 4 5 7 10 14 13","8 4 1 6 5 7 10 14 13","1 4 5 6 7 8 10 13 14","8 1 4 5 6 7 10 14 13","None of the above"], ans:0,
  check:`trav(['+8', '+3', '+10', '+1', '+6', '+14', '+4', '+7', '+13', '+5', '-3'], "pre")`,
  why:`5 becomes the right child of 4. Deleting 3 promotes its left child, 1, and attaches the subtree
rooted at 6 as the right child of 1. Preorder visits each root before its left and right subtrees,
giving 8, 1, 6, 4, 5, 7, 10, 14, 13.` },

{ id:"ds-20", kind:"problem", topic:"data-structures", level:"b",
  q:`<figure class="diagram"><img src="/assets/diagrams/binary-search-tree.svg" width="300" height="250" loading="lazy" alt="Binary search tree. Root 8 has children 3 and 10. Node 3 has children 1 and 6. Node 6 has children 4 and 7. Node 10 has right child 14, whose left child is 13."><figcaption>Binary search tree by Derrick Coetzee, reworked by Booyabazooka and Inductiveload. <a href="https://commons.wikimedia.org/wiki/File:Binary_search_tree.svg">Source and public-domain dedication</a>. Unmodified.</figcaption></figure>
<p>Starting with this tree, delete 8 using ACSL's deletion rule, then insert 9. What is the preorder
traversal?</p>`,
  choices:["3 1 6 4 7 10 9 14 13","10 3 1 6 4 7 9 14 13","3 1 6 4 7 9 10 14 13","1 3 4 6 7 9 10 13 14","None of the above"], ans:0,
  check:`trav(['+8', '+3', '+10', '+1', '+6', '+14', '+4', '+7', '+13', '-8', '+9'], "pre")`,
  why:`ACSL promotes the left subtree, making 3 the root. The old right subtree rooted at 10 attaches to
7, the rightmost node in the promoted subtree. Inserting 9 follows 3, 6, 7, and 10, then becomes
the left child of 10. Read the resulting tree in root-left-right order.` }

]);
