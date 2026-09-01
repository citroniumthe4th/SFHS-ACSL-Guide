window.MCQ = (window.MCQ || []).concat([

{ id:"pp-01", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression (A + B) * C - D ^ E ^ F to postfix.`,
  choices:["A B + C * D E F ^ ^ -","A B + C * D E ^ F ^ -","A B C + * D E F ^ ^ -","A B + C D E F ^ ^ * -","None of the above"], ans:0,
  check:`to_postfix('(A+B)*C-D^E^F')`,
  why:`Fully parenthesize first: (((A + B) * C) - (D ^ (E ^ F))). Exponentiation groups right to
left, so E ^ F happens before D is raised to it. Now move each operator to its own closing
parenthesis and drop the brackets. The distractor with D E ^ F ^ is what you get by treating ^
as left associative.` },

{ id:"pp-02", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression A + B * C to postfix.`,
  choices:["A B C * +","A B + C *","A B * C +","+ A * B C","None of the above"], ans:0,
  check:`to_postfix('A+B*C')`,
  why:`Multiplication binds tighter than addition, so the expression is A + (B * C). The
multiplication finishes first and its operator lands right after B and C. Then the addition
comes last. Operands never move, so any answer that reorders A, B, and C is wrong on sight.` },

{ id:"pp-03", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression A ^ B ^ C ^ D to postfix.`,
  choices:["A B C D ^ ^ ^","A B ^ C ^ D ^","A B C ^ D ^ ^","A B C ^ ^ D ^","None of the above"], ans:0,
  check:`to_postfix('A^B^C^D')`,
  why:`Exponentiation is right associative, so this is A ^ (B ^ (C ^ D)). The innermost
operation is C ^ D, so its operator appears first, then B, then A. The result is a run of
operands followed by a run of operators. A left associative reading would give A B ^ C ^ D ^
instead.` },

{ id:"pp-04", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression A - (B - C) to postfix.`,
  choices:["A B C - -","A B - C -","A B C - +","B C - A -","None of the above"], ans:0,
  check:`to_postfix('A-(B-C)')`,
  why:`The parentheses force B - C to happen first, so its minus appears right after B and C.
The outer subtraction then applies to A and that result, putting the second minus at the end.
Without the parentheses, A - B - C would be (A - B) - C and would give A B - C -.` },

{ id:"pp-05", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression (A + B) * C to prefix.`,
  choices:["* + A B C","+ A * B C","* A + B C","+ * A B C","None of the above"], ans:0,
  check:`to_prefix('(A+B)*C')`,
  why:`In prefix each operator goes in front of its two operands. The multiplication is the last
operation performed, so its symbol comes first, followed by the prefix form of A + B, which is
+ A B, and then C. The operands stay in their original left to right order in prefix just as
they do in postfix.` },

{ id:"pp-06", topic:"prefix-postfix", level:"b",
  q:`Evaluate the postfix expression 5 1 2 + 4 * + 3 -.`,
  choices:["15", "10", "20", "8", "None of the above"], ans:4,
  check:`postfix_eval('5 1 2 + 4 * + 3 -'.split())`,
  why:`Push 5, 1, and 2. The plus pops 1 and 2 and pushes 3. Push 4. The times pops 3 and 4 and
pushes 12. The plus pops 5 and 12 and pushes 17. Push 3. The minus pops 17 and 3 and pushes 14.
The stack is the whole method, and writing it as a column keeps you honest. The value 14 is not among the four choices offered, so the answer is None of the above.` },

{ id:"pp-07", topic:"prefix-postfix", level:"b",
  q:`Evaluate the postfix expression 8 3 - 2 /.`,
  choices:["2","-2","5","3","None of the above"], ans:0,
  check:`postfix_eval('8 3 - 2 /'.split())`,
  why:`The value popped first is the right operand, so 8 3 - means 8 minus 3, which is 5. Then
5 2 / means 5 divided by 2, which is 2 after dropping the fraction. Reversing the pop order
would give 3 minus 8 and then a very different answer, and that mistake only shows up on
subtraction and division.` },

{ id:"pp-08", topic:"prefix-postfix", level:"s",
  q:`Convert the postfix expression A B C * + D - to infix.`,
  choices:["((A+(B*C))-D)","((A+B)*(C-D))","(A+((B*C)-D))","((A*B)+(C-D))","None of the above"], ans:0,
  check:`post_to_infix('A B C * + D -')`,
  why:`Scan left to right for the first operator with two operands immediately in front of it.
That is the star with B and C, so replace B C * with (B * C). Now the plus has A and that group
in front of it, giving (A + (B * C)). Finally the minus takes that and D. Working the scan from
the left every time keeps the grouping correct.` },

{ id:"pp-09", topic:"prefix-postfix", level:"s",
  q:`Convert the prefix expression - * A B / C D to infix.`,
  choices:["((A*B)-(C/D))","((A-B)*(C/D))","(A*(B-(C/D)))","((A*B)/(C-D))","None of the above"], ans:0,
  check:`pre_to_infix('- * A B / C D')`,
  why:`For prefix, scan for the first operator with two operands immediately after it. That is
the star with A and B, giving (A * B). Then the slash with C and D gives (C / D). Now the minus
has two operands and produces the whole expression. Scanning right to left works too and is
often quicker, since the last operator you meet is always the outermost one.` },

{ id:"pp-10", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression A * B / C * D to postfix.`,
  choices:["A B * C / D *","A B C D * / *","A B * C D * /","A B C * / D *","None of the above"], ans:0,
  check:`to_postfix('A*B/C*D')`,
  why:`Multiplication and division have equal precedence and group left to right, so the
expression is ((A * B) / C) * D. Each operator lands immediately after the operand that
completes it. Treating them as right associative would give A B C D * / * instead, which is the
first distractor.` },

{ id:"pp-11", topic:"prefix-postfix", level:"s",
  q:`Evaluate the postfix expression 6 2 / 3 - 4 *.`,
  choices:["0","8","-4","12","None of the above"], ans:0,
  check:`postfix_eval('6 2 / 3 - 4 *'.split())`,
  why:`6 divided by 2 is 3, then 3 minus 3 is 0, then 0 times 4 is 0. The infix form is
((6 / 2) - 3) * 4. Once a running value hits zero the rest of a multiplication chain is zero,
which is worth noticing before you finish the arithmetic.` },

{ id:"pp-12", topic:"prefix-postfix", level:"b",
  q:`How many operators does the postfix form of an infix expression contain if the infix form
has 7 operands and no unary operators?`,
  choices:["6","7","8","depends on the expression","None of the above"], ans:0,
  check:`str(7-1)`,
  why:`Every binary operator joins two subexpressions into one, so it reduces the count of
separate pieces by one. Starting from 7 pieces and ending with 1 takes 6 operators. This is the
same reason a full binary tree with 7 leaves has 6 internal nodes, and it holds no matter how
the expression is parenthesized.` },

{ id:"pp-13", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression X ^ (Y + Z) * W - Q / R to postfix.`,
  choices:["X Y Z + ^ W * Q R / -","X Y Z ^ + W * Q R / -","X Y Z + W ^ * Q R / -","X Y Z + ^ W Q R / * -","None of the above"], ans:0,
  check:`to_postfix('X^(Y+Z)*W-Q/R')`,
  why:`Fully parenthesized this is (((X ^ (Y + Z)) * W) - (Q / R)). The parentheses around
Y + Z force that addition to finish before the exponentiation, which is why the plus appears
before the caret. Then the multiplication by W, then the division, then the subtraction last.` },

{ id:"pp-14", topic:"prefix-postfix", level:"b",
  q:`Evaluate the postfix expression 2 3 4 + *.`,
  choices:["15", "10", "20", "9", "None of the above"], ans:4,
  check:`postfix_eval('2 3 4 + *'.split())`,
  why:`The plus fires first because it is reached first, popping 3 and 4 and pushing 7. Then the
times pops 2 and 7 and pushes 14. The infix form is 2 * (3 + 4). Compare it with 2 3 * 4 +,
which is (2 * 3) + 4, or 10. The operands are identical and only the operator positions
differ. The value 14 is not among the four choices offered, so the answer is None of the above.` },

{ id:"pp-15", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression (P - (Q - (R - S))) * T to postfix.`,
  choices:["P Q R S - - - T *","P Q - R - S - T *","P Q R S - - T * -","P Q R S T * - - -","None of the above"], ans:0,
  check:`to_postfix('(P-(Q-(R-S)))*T')`,
  why:`The nesting runs inward, so R - S resolves first, then Q minus that, then P minus that.
Each minus lands directly after the pair it joins, which stacks all three operators together.
Compare with P - Q - R - S, which has no parentheses, groups left to right, and gives
P Q - R - S -.` },

{ id:"pp-16", topic:"prefix-postfix", level:"j",
  q:`Evaluate the postfix expression 9 5 - 2 - 1 -.`,
  choices:["1","5","3","-1","None of the above"], ans:0,
  check:`postfix_eval('9 5 - 2 - 1 -'.split())`,
  why:`Work left to right: 9 minus 5 is 4, then 4 minus 2 is 2, then 2 minus 1 is 1. This is the
postfix form of ((9 - 5) - 2) - 1, which is what plain left to right subtraction means in
infix.` }

]);
