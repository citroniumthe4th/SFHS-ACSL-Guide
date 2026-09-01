window.MCQ = (window.MCQ || []).concat([

{ id:"ds-01", topic:"data-structures", level:"b",
  q:`The values 50, 30, 70, 20, 40, 60, 80 are inserted into an empty binary search tree in that
order. What is the preorder traversal?`,
  choices:["50 30 20 40 70 60 80","20 30 40 50 60 70 80","20 40 30 60 80 70 50","50 30 70 20 40 60 80","None of the above"], ans:0,
  check:`trav("+50 +30 +70 +20 +40 +60 +80".split(), "pre")`,
  why:`The tree has 50 at the root, 30 and 70 as its children, and the other four as leaves.
Preorder writes the root, then the whole left subtree, then the whole right subtree, so it goes
50, then 30 20 40, then 70 60 80. The second choice is the inorder traversal, which is always
sorted, and the fourth is level order, which reads across each row.` },

{ id:"ds-02", topic:"data-structures", level:"b",
  q:`Using the same tree built from 50, 30, 70, 20, 40, 60, 80, what is the postorder traversal?`,
  choices:["20 40 30 60 80 70 50","50 30 20 40 70 60 80","20 30 40 50 60 70 80","80 60 70 40 20 30 50","None of the above"], ans:0,
  check:`trav("+50 +30 +70 +20 +40 +60 +80".split(), "post")`,
  why:`Postorder writes both subtrees before the root, so the root comes dead last. Working
inside out, the left subtree gives 20 40 30, the right gives 60 80 70, and 50 finishes. If your
answer does not end at the root, you did not do postorder.` },

{ id:"ds-03", topic:"data-structures", level:"s",
  q:`Insert 50, 30, 70, 20, 40 into an empty binary search tree, then delete 30, replacing it
with the largest value in its left subtree. What is the preorder traversal?`,
  choices:["50 20 40 70","50 40 20 70","50 30 20 40 70","50 40 70","None of the above"], ans:0,
  check:`trav("+50 +30 +70 +20 +40 -30".split(), "pre")`,
  why:`Deleting 30 hits the two child case. The largest value in its left subtree is 20, so the
node holding 30 takes the value 20 and the old 20 leaf goes away. The node now holding 20 keeps
its position with 40 still hanging on its right. Preorder gives 50, 20, 40, 70. Had the rule
been to pull up the smallest value in the right subtree instead, the answer would be 50 40 20 70,
which is the first distractor.` },

{ id:"ds-04", topic:"data-structures", level:"b",
  q:`The values 1, 2, 3, 4, 5 are inserted into an empty binary search tree in that order. What
is the height of the tree, counting the root as height 0?`,
  choices:["6", "2", "3", "5", "None of the above"], ans:4,
  check:`str(trav("+1 +2 +3 +4 +5".split(), "height"))`,
  why:`Every new value is larger than everything already in the tree, so each one hangs off the
right of the previous. The result is a chain of five nodes with no branching at all, and the
deepest node sits four edges below the root. Insertion order is what decides shape, which is why
you must never sort the input before building. The value 4 is not among the four choices offered, so the answer is None of the above.` },

{ id:"ds-05", topic:"data-structures", level:"b",
  q:`Push 3, 1, 4, 1, 5 onto a stack, then pop three times. What is the last value popped?`,
  choices:["4","1","3","5","None of the above"], ans:0,
  check:`stack_queue("S3 S1 S4 S1 S5 P P P".split()).split()[-1]`,
  why:`A stack is last in, first out, so the pops come off in the reverse of the push order: 5,
then 1, then 4. The third pop returns 4. Draw the stack as a column with the top at the top of
the page and it stays obvious.` },

{ id:"ds-06", topic:"data-structures", level:"b",
  q:`Add 3, 1, 4, 1, 5 to a queue in that order, then remove three times. What is the last value
removed?`,
  choices:["4","1","3","5","None of the above"], ans:0,
  check:`stack_queue("Q3 Q1 Q4 Q1 Q5 D D D".split()).split()[-1]`,
  why:`A queue is first in, first out, so the removals come out in the order they went in: 3,
then 1, then 4. The third removal returns 4. It happens to match the stack answer here by
coincidence, which is a good reason to always run the two structures in separate columns rather
than assuming they agree.` },

{ id:"ds-07", topic:"data-structures", level:"s",
  q:`Run these commands, where S pushes onto a stack, Q adds to a queue, P pops the stack, and D
removes from the front of the queue: SA SB QC P D P P. What is written, in order?`,
  choices:["B C A X","A C B X","B C A","A B C X","None of the above"], ans:0,
  check:`stack_queue("SA SB QC P D P P".split())`,
  why:`Pushing A then B leaves B on top. C goes into the queue. The first P writes B, the D
writes C, and the next P writes A. The last P finds the stack empty, which writes X rather than
stopping the program. Forgetting the X is what turns this into the third choice.` },

{ id:"ds-08", topic:"data-structures", level:"s",
  q:`The values 8, 3, 10, 1, 6, 14, 4, 7, 13 are inserted into an empty binary search tree in
that order. What is the inorder traversal?`,
  choices:["1 3 4 6 7 8 10 13 14","8 3 1 6 4 7 10 14 13","1 4 7 6 3 13 14 10 8","8 3 10 1 6 14 4 7 13","None of the above"], ans:0,
  check:`trav("+8 +3 +10 +1 +6 +14 +4 +7 +13".split(), "in")`,
  why:`Inorder on a binary search tree always produces the values in sorted order, no matter
what shape the tree took. That makes inorder useless for telling two trees apart and extremely
useful as a check that you built the tree correctly. If your inorder is not sorted, the tree is
wrong.` },

{ id:"ds-09", topic:"data-structures", level:"s",
  q:`Insert 5, 3, 8, 1, 4 into a min heap one at a time, sifting each new value up from the
bottom. What does the heap array look like, reading level by level?`,
  choices:["1 3 8 5 4","1 3 4 5 8","1 4 8 5 3","1 3 5 4 8","None of the above"], ans:0,
  check:`minheap([5,3,8,1,4])`,
  why:`Insert 5 as the root. Insert 3 at the bottom, and it beats 5 so they swap, giving 3 5.
Insert 8, which stays put, giving 3 5 8. Insert 1 as the left child of 5, and it swaps with 5
and then with 3, giving 1 3 8 5. Insert 4 as the right child of 3, and 4 is larger so it stays,
giving 1 3 8 5 4. A heap is not sorted, so the sorted looking second choice is wrong.` },

{ id:"ds-10", topic:"data-structures", level:"b",
  q:`In a min heap stored in an array with the root at index 1, where does the parent of the node
at index 11 sit?`,
  choices:["5","6","10","22","None of the above"], ans:0,
  check:`str(11//2)`,
  why:`With the root at index 1, the children of index i sit at 2i and 2i + 1, so the parent of
index i is at i divided by 2 with the fraction dropped. For 11 that gives 5. Check it forwards:
the children of 5 are 10 and 11, so 11 is the right child of 5.` },

{ id:"ds-11", topic:"data-structures", level:"s",
  q:`A binary search tree contains 50 at the root, 30 and 70 as its children, and 20, 40, 60, and
80 as leaves. What is its internal path length, counting the root at depth 0?`,
  choices:["11", "8", "12", "14", "None of the above"], ans:4,
  check:`str(trav("+50 +30 +70 +20 +40 +60 +80".split(), "ipl"))`,
  why:`Internal path length is the sum of the depths of every node. The root is at depth 0, two
nodes are at depth 1, and four are at depth 2, so the total is 0 + 2 + 8, which is 10. The
external path length for a tree with N nodes is always the internal path length plus 2N, which
here would be 10 plus 14, or 24, and that identity is a fast check on your arithmetic. The value 10 is not among the four choices offered, so the answer is None of the above.` },

{ id:"ds-12", topic:"data-structures", level:"s",
  q:`Insert 100, 50, 150, then delete 50 and then delete 150. What is the preorder traversal of
what remains?`,
  choices:["100","100 50","EMPTY","50 100 150","None of the above"], ans:0,
  check:`trav("+100 +50 +150 -50 -150".split(), "pre")`,
  why:`Both 50 and 150 are leaves, so each simply disappears when deleted. The root survives on
its own, and its preorder is a single value. The leaf case is the easy one, but it still has to
be handled separately from the one child and two child cases in any code you write.` },

{ id:"ds-13", topic:"data-structures", level:"b",
  q:`Which traversal of a binary search tree writes the root before anything else?`,
  choices:["preorder","inorder","postorder","level order","None of the above"], ans:0,
  why:`Preorder means root, then left subtree, then right subtree, so the root is always the
first value written. Inorder puts it in the middle and postorder puts it last. Level order also
starts with the root, but it is not one of the three traversals ACSL defines for this category,
and it reads across rows rather than descending recursively.` },

{ id:"ds-14", topic:"data-structures", level:"s",
  q:`Insert 20, 10, 30, 5, 15, 25, 35 into a binary search tree, then delete 10 using the largest
value in the left subtree. What is the preorder traversal?`,
  choices:["20 5 15 30 25 35","20 15 5 30 25 35","20 5 30 25 35","20 10 15 30 25 35","None of the above"], ans:0,
  check:`trav("+20 +10 +30 +5 +15 +25 +35 -10".split(), "pre")`,
  why:`The node holding 10 has two children, 5 and 15. The largest value in its left subtree is
5, since that subtree is a single node. So 10 becomes 5, the old 5 leaf is removed, and 15 stays
on the right. Preorder then reads 20, 5, 15, 30, 25, 35. Using the smallest value on the right
instead would give 20 15 5 30 25 35.` },

{ id:"ds-15", topic:"data-structures", level:"j",
  q:`Push 7, then push 2, then pop, then push 9, then pop, then pop. What is written, in order?`,
  choices:["2 9 7","7 2 9","2 7 9","9 2 7","None of the above"], ans:0,
  check:`stack_queue("S7 S2 P S9 P P".split())`,
  why:`After pushing 7 and 2, the top is 2, so the first pop writes 2. Pushing 9 puts it on top,
so the second pop writes 9. The last pop writes 7, which had been sitting at the bottom the
whole time. Interleaving pushes and pops is where stack questions get their difficulty, so track
the column after every single command.` },

{ id:"ds-16", topic:"data-structures", level:"j",
  q:`A queue holds A, B, C with A at the front. Remove one item, add D, then remove one item.
What is left in the queue, front first?`,
  choices:["C D","B C","D C","B D","None of the above"], ans:0,
  check:`
q = ['A','B','C']
q.pop(0); q.append('D'); q.pop(0)
RESULT = " ".join(q)`,
  why:`The first removal takes A off the front, leaving B and C. D joins the back, giving B, C,
D. The second removal takes B, leaving C at the front and D behind it. Additions always happen
at the back and removals always at the front, which is the only rule a queue has.` }

]);
