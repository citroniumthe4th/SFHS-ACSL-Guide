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

window.MCQ = (window.MCQ || []).concat([

{ id:"ds-21", kind:"concept", topic:"data-structures", level:"b",
  q:`The same set of distinct values is inserted into two empty binary search trees in two
different orders. Which traversal is guaranteed to give the same output for both trees?`,
  choices:["inorder","preorder","postorder","level order","None of the above"], ans:0,
  why:`An inorder walk of a binary search tree always produces the values in sorted order,
whatever shape the insertions happened to build, so two trees holding the same values agree on it. The
other three all begin or end at the root, and the root is decided by whichever value was inserted
first. That makes inorder useless for telling two trees apart and very useful as a check on your own
work, since an inorder walk that is not sorted means the tree itself is wrong.` },

{ id:"ds-22", kind:"problem", topic:"data-structures", level:"b",
  q:`The values 15, 9, 23, 4, 12, 19, 30, 2 are inserted into an empty binary search tree in that
order. What is the preorder traversal?`,
  choices:["15 9 4 2 12 23 19 30","2 4 9 12 15 19 23 30","2 12 4 9 19 30 23 15","15 9 23 4 12 19 30 2","None of the above"], ans:0,
  check:`trav("+15 +9 +23 +4 +12 +19 +30 +2".split(), "pre")`,
  why:`Build the tree first: 15 at the root, 9 and 23 below it, 4 and 12 under 9, 19 and 30 under
23, and 2 as the left child of 4. Preorder writes the root, then the entire left subtree, then the
entire right, so it reads 15, then 9 4 2 12, then 23 19 30. The sorted sequence is the inorder walk and
the fourth choice is simply the insertion order, which is level order only by coincidence here.` },

{ id:"ds-23", kind:"problem", topic:"data-structures", level:"s",
  q:`Using the same tree built from 15, 9, 23, 4, 12, 19, 30, 2, what is the postorder traversal?`,
  choices:["2 4 12 9 19 30 23 15","15 9 4 2 12 23 19 30","2 4 9 12 19 23 30 15","2 4 12 19 30 9 23 15","None of the above"], ans:0,
  check:`trav("+15 +9 +23 +4 +12 +19 +30 +2".split(), "post")`,
  why:`Postorder visits both subtrees before the root, which means the root is always the last
value written. Working from the inside out, the left subtree gives 2 4 12 9 and the right gives
19 30 23, with 15 finishing the sequence. If your answer does not end on the root, whatever you did it
was not postorder.` },

{ id:"ds-24", kind:"problem", topic:"data-structures", level:"b",
  q:`The values 7, 3, 9, 1, 5, 8, 11, 2 are inserted into an empty binary search tree in that
order. What is the height of the tree, counting the root as height 0?`,
  choices:["3","4","2","8","None of the above"], ans:0,
  check:`str(trav("+7 +3 +9 +1 +5 +8 +11 +2".split(), "height"))`,
  why:`Seven of the eight values form a balanced tree three levels deep, and the last value, 2,
goes right of 1 and sits one level below it. The deepest node is therefore three edges from the root.
Height counts edges rather than nodes here, so a single node alone has height 0, and a tree of eight
nodes could have any height from 3 up to 7 depending on the order they arrived in.` },

{ id:"ds-25", kind:"problem", topic:"data-structures", level:"s",
  q:`The values 40, 20, 60, 10, 30, 50, 70 are inserted into an empty binary search tree in that
order. What is its internal path length, counting the root at depth 0?`,
  choices:["12", "8", "14", "7", "None of the above"], ans:4,
  check:`str(trav("+40 +20 +60 +10 +30 +50 +70".split(), "ipl"))`,
  why:`Internal path length is the sum of the depths of every node. The insertions build a
perfectly balanced tree, so the root contributes 0, the two nodes below it contribute 1 each, and the
four leaves contribute 2 each, for a total of 10. As a check, the external path length of a tree with N
nodes is always the internal path length plus 2N, which here is 10 plus 14. Since 10 is not among the
four choices offered, the answer is None of the above.` },

{ id:"ds-26", kind:"problem", topic:"data-structures", level:"s",
  q:`Insert 50, 30, 70, 20, 40, 60, 80 into an empty binary search tree, then delete 70 using
ACSL's deletion rule: promote the left subtree and attach the original right subtree at its rightmost
node. What is the preorder traversal?`,
  choices:["50 30 20 40 60 80","50 30 20 40 80 60","50 30 20 40 60","50 30 20 40 70 60 80","None of the above"], ans:0,
  check:`trav("+50 +30 +70 +20 +40 +60 +80 -70".split(), "pre")`,
  why:`The node holding 70 has two children, so its left child 60 is promoted into its place and
the old right subtree, which is just 80, is attached at the rightmost node of the promoted subtree.
Since 60 has no right child, 80 becomes its right child directly. Preorder then reads 50, 30, 20, 40,
60, 80. Copying the successor into the node instead, which is what most textbooks do, would leave 80 in
that position and give the second choice.` },

{ id:"ds-27", kind:"problem", topic:"data-structures", level:"b",
  q:`Insert 9, 4, 7, 1, 8, 2 into a min heap one at a time, sifting each new value up from the
bottom. What does the heap array look like, reading level by level?`,
  choices:["1 4 2 9 8 7","1 2 4 7 8 9","1 4 2 7 8 9","1 2 4 9 8 7","None of the above"], ans:0,
  check:`minheap([9,4,7,1,8,2])`,
  why:`Insert 9. Insert 4, which beats 9 and swaps to the root, giving 4 9. Insert 7, which stays
put, giving 4 9 7. Insert 1 under 9, and it swaps with 9 and then with 4, giving 1 4 7 9. Insert 8
under 4, which stays put, giving 1 4 7 9 8. Insert 2 under 7, and it swaps with 7, giving 1 4 2 9 8 7.
A heap is not sorted, which is why the tidy sorted choice is wrong; it only promises that every parent
beats its children.` },

{ id:"ds-28", kind:"problem", topic:"data-structures", level:"b",
  q:`Insert 3, 6, 1, 9, 2 into a min heap one at a time, sifting each new value up from the
bottom. What does the heap array look like, reading level by level?`,
  choices:["1 2 3 9 6","1 2 3 6 9","1 3 2 9 6","1 6 3 9 2","None of the above"], ans:0,
  check:`minheap([3,6,1,9,2])`,
  why:`Insert 3, then 6 as its left child, which stays put. Insert 1 as the right child, and it
beats 3 and swaps to the root, giving 1 6 3. Insert 9 under 6, which stays put, giving 1 6 3 9. Insert
2 as the right child of 6, where it swaps with 6 and then stops, since its new parent 1 is smaller,
giving 1 2 3 9 6. Sifting halts as soon as the parent no longer loses, which is why a value does not
always travel all the way to the root.` },

{ id:"ds-29", kind:"problem", topic:"data-structures", level:"s",
  q:`Run these commands, where S pushes onto a stack, Q adds to a queue, P pops the stack, and D
removes from the front of the queue. A removal from an empty structure writes X.
For SA SB SC P QD QE D P D, what is written, in order?`,
  choices:["C D B E","A D B E","C D E B","C B D E","None of the above"], ans:0,
  check:`stack_queue("SA SB SC P QD QE D P D".split())`,
  why:`The three pushes leave C on top of the stack, so the first P writes C. D and E then join
the queue in that order, and the first D writes D from the front. The second P writes B, which is now
on top, and the final D writes E. The two structures are entirely independent, so it helps to draw them
side by side and update only the one each command names.` },

{ id:"ds-30", kind:"problem", topic:"data-structures", level:"s",
  q:`Using the same commands, where P and D write X when the structure is empty, what does
Q1 S2 Q3 S4 P D P D D write, in order?`,
  choices:["4 1 2 3 X","4 2 1 3 X","1 2 3 4 X","4 1 2 3","None of the above"], ans:0,
  check:`stack_queue("Q1 S2 Q3 S4 P D P D D".split())`,
  why:`The queue receives 1 and then 3, and the stack receives 2 and then 4. The first P takes 4
from the top of the stack, the first D takes 1 from the front of the queue, the second P takes 2, and
the second D takes 3. The last D finds the queue empty, and the rule is to write X rather than to stop,
so the output ends with an X. Forgetting that final step is what produces the fourth choice.` },

{ id:"ds-31", kind:"problem", topic:"data-structures", level:"b",
  q:`In a heap stored in an array with the root at index 1, where do the two children of the node
at index 6 sit?`,
  choices:["12 and 13","7 and 8","3 and 12","11 and 12","None of the above"], ans:0,
  check:`str(2*6)+' and '+str(2*6+1)`,
  why:`With the root at index 1, the children of index i sit at 2i and 2i + 1, so the children of
6 are 12 and 13. Checking backwards is quicker than trusting the formula: the parent of 12 is 12
divided by 2, which is 6, and the parent of 13 is 13 divided by 2 with the fraction discarded, which is
also 6. This arithmetic is why a heap needs no pointers at all.` },

{ id:"ds-32", kind:"problem", topic:"data-structures", level:"b",
  q:`The value 5 is inserted into an empty binary search tree three times. Under ACSL's rule that
a value equal to the node it is compared against goes left, what is the height of the resulting tree,
counting the root as height 0?`,
  choices:["2","0","1","3","None of the above"], ans:0,
  check:`str(trav("+5 +5 +5".split(), "height"))`,
  why:`Duplicates are kept rather than discarded, and each one goes left, so the three nodes form
a chain leaning to the left and the deepest sits two edges below the root. Some textbooks and libraries
send equal keys right, and some drop them entirely, which would give a height of 0 here. ACSL's own
page is explicit about which convention applies, and it is worth checking before building any tree that
contains a repeat.` },

{ id:"ds-33", kind:"problem", topic:"data-structures", level:"s",
  q:`Insert 60, 40, 80, 20, 50, 70, 90 into an empty binary search tree, then delete 40 using
ACSL's deletion rule. What is the inorder traversal?`,
  choices:["20 50 60 70 80 90","20 50 60 80 70 90","50 20 60 70 80 90","20 40 50 60 70 80 90","None of the above"], ans:0,
  check:`trav("+60 +40 +80 +20 +50 +70 +90 -40".split(), "in")`,
  why:`An inorder walk of a binary search tree is always sorted, and a correct deletion leaves it
a binary search tree, so the answer is simply the remaining six values in order. That makes this
question a check on whether the deletion was done legally rather than on the traversal itself: if your
inorder walk is not sorted, the tree you built is not a search tree. The preorder would have told the
two deletion conventions apart; the inorder cannot.` },

{ id:"ds-34", kind:"problem", topic:"data-structures", level:"b",
  q:`The values 1, 2, 3, 4, 5, 6 are inserted into an empty binary search tree in that order. What
is its internal path length, counting the root at depth 0?`,
  choices:["21", "10", "6", "12", "None of the above"], ans:4,
  check:`str(trav("+1 +2 +3 +4 +5 +6".split(), "ipl"))`,
  why:`Each value is larger than everything already present, so every one hangs off the right of
the previous and the tree is a chain of six nodes. The depths run 0, 1, 2, 3, 4, and 5, which add to 15.
A chain is the worst case for internal path length, and a balanced tree on the same six values would
give 8 instead. Since 15 is not among the four choices offered, the answer is None of the above.` },

{ id:"ds-35", kind:"problem", topic:"data-structures", level:"s",
  q:`Insert 10, 5, 15, 3, 7 into an empty binary search tree, then delete 10 using ACSL's deletion
rule. What is the preorder traversal?`,
  choices:["5 3 7 15","15 5 3 7","5 3 15 7","7 5 3 15","None of the above"], ans:0,
  check:`trav("+10 +5 +15 +3 +7 -10".split(), "pre")`,
  why:`Deleting the root lands on the two child case. ACSL promotes the left child, so 5 becomes
the root, and the old right subtree, which is the single node 15, is attached at the rightmost node of
the promoted subtree, which is 7. The tree is therefore 5 with left child 3 and right child 7, and 7
carries 15 on its right. Preorder reads 5, 3, 7, 15. Note that the result is legal but no longer
balanced, which is a general side effect of this rule.` },

{ id:"ds-36", kind:"problem", topic:"data-structures", level:"j",
  q:`Push 4, then 8, then 15 onto a stack, then pop twice. What is written, in order?`,
  choices:["15 8","4 8","8 15","15 4","None of the above"], ans:0,
  check:`stack_queue("S4 S8 S15 P P".split())`,
  why:`A stack is last in, first out, so the values come off in the reverse of the order they
went on. The most recent push was 15, so it leaves first, and 8 follows. The 4 is still sitting at the
bottom untouched. Drawing the stack as a column with the top of the stack at the top of the page keeps
this obvious rather than something to reason about.` },

{ id:"ds-37", kind:"problem", topic:"data-structures", level:"b",
  q:`Insert 10, 20, 30, 5, 1 into a min heap one at a time, sifting each new value up from the
bottom. What does the heap array look like, reading level by level?`,
  choices:["1 5 30 20 10","1 5 10 20 30","1 5 30 10 20","1 10 30 20 5","None of the above"], ans:0,
  check:`minheap([10,20,30,5,1])`,
  why:`The first three values arrive in increasing order and each stays where it lands, giving
10 20 30. Inserting 5 puts it under 20, where it swaps with 20 and then with 10, giving 5 10 30 20.
Inserting 1 puts it under 10, where it swaps with 10 and then with 5, giving 1 5 30 20 10. Each of the
last two values travels all the way to the root, which is the worst case for an insertion and takes
about the height of the heap in swaps.` },

{ id:"ds-38", kind:"problem", topic:"data-structures", level:"b",
  q:`The values 50, 25, 75, 12, 37, 62, 87, 6 are inserted into an empty binary search tree in that
order. What is the height of the tree, counting the root as height 0?`,
  choices:["3","2","4","8","None of the above"], ans:0,
  check:`str(trav("+50 +25 +75 +12 +37 +62 +87 +6".split(), "height"))`,
  why:`The first seven values build a perfectly balanced tree two levels deep, and the last value,
6, goes left of 12 and sits one level below it. The deepest node is therefore three edges from the
root. Only one node lives at depth 3, and height is decided by the single deepest node rather than by
how many nodes are down there.` },

{ id:"ds-39", kind:"problem", topic:"data-structures", level:"b",
  q:`The values 8, 4, 12, 2, 6, 10, 14 are inserted into an empty binary search tree in that order.
What is the postorder traversal?`,
  choices:["2 6 4 10 14 12 8","8 4 2 6 12 10 14","2 4 6 8 10 12 14","2 6 10 14 4 12 8","None of the above"], ans:0,
  check:`trav("+8 +4 +12 +2 +6 +10 +14".split(), "post")`,
  why:`The insertions build a perfectly balanced tree with 8 at the root. Postorder finishes each
subtree before writing its root, so the left side gives 2 6 4, the right gives 10 14 12, and 8 comes
last. The second choice is the preorder and the third is the inorder, so all three walks of this one
tree are sitting in the choices together.` },

{ id:"ds-40", kind:"problem", topic:"data-structures", level:"j",
  q:`Add A, then B, then C to a queue, then remove twice. What is written, in order?`,
  choices:["A B","C B","B A","A C","None of the above"], ans:0,
  check:`stack_queue("QA QB QC D D".split())`,
  why:`A queue is first in, first out, so the values leave in the order they arrived. A was added
first and so leaves first, then B, while C is still waiting at the back. Set this beside the same three
values on a stack, which would come off C then B, and the two structures differ in exactly that one
respect.` }

]);
