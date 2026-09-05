window.MCQ = (window.MCQ || []).concat([

{ id:"pp-01", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression (A + B) * C - D ^ E ^ F to postfix.`,
  choices:["A B + C * D E F ^ ^ -","A B + C * D E ^ F ^ -","A B C + * D E F ^ ^ -","A B + C D E F ^ ^ * -","None of the above"], ans:0,
  check:`to_postfix('(A+B)*C-D^E^F')`,
  why:`Fully parenthesising first turns this into bookkeeping, and the expression becomes
(((A + B) * C) - (D ^ (E ^ F))). The nesting on the right comes from exponentiation grouping toward
the right, so E ^ F resolves before D is raised to anything. Moving each operator out to its own
closing bracket and then dropping the brackets gives the answer. The distractor containing
D E ^ F ^ is what appears if you treat the caret as left associative like the other operators.` },

{ id:"pp-02", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression A + B * C to postfix.`,
  choices:["A B C * +","A B + C *","A B * C +","+ A * B C","None of the above"], ans:0,
  check:`to_postfix('A+B*C')`,
  why:`Multiplication binds tighter than addition, so the expression is really A + (B * C). The
multiplication resolves first and its operator therefore lands immediately after B and C, leaving the
addition to come last. Remember also that the operands never move between notations, so any choice
that reorders A, B, and C can be dismissed without working anything out.` },

{ id:"pp-03", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression A ^ B ^ C ^ D to postfix.`,
  choices:["A B C D ^ ^ ^","A B ^ C ^ D ^","A B C ^ D ^ ^","A B C ^ ^ D ^","None of the above"], ans:0,
  check:`to_postfix('A^B^C^D')`,
  why:`Exponentiation associates to the right, which makes this A ^ (B ^ (C ^ D)). The innermost
operation is C ^ D, so its caret is written first, then the one joining B, then the one joining A,
producing a run of operands followed by a run of operators. Reading the carets left associatively
instead would give A B ^ C ^ D ^, and both forms are sitting in the choices.` },

{ id:"pp-04", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression A - (B - C) to postfix.`,
  choices:["A B C - -","A B - C -","A B C - +","B C - A -","None of the above"], ans:0,
  check:`to_postfix('A-(B-C)')`,
  why:`The brackets force B - C to resolve first, so that minus is written immediately after B
and C. The outer subtraction then combines A with the result, which puts the second minus at the very
end. It is worth comparing this against A - B - C without brackets, which groups as (A - B) - C and
comes out as A B - C - instead.` },

{ id:"pp-05", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression (A + B) * C to prefix.`,
  choices:["* + A B C","+ A * B C","* A + B C","+ * A B C","None of the above"], ans:0,
  check:`to_prefix('(A+B)*C')`,
  why:`In prefix notation each operator is written in front of the two operands it joins. The
multiplication is the last operation actually performed, so its symbol comes first, followed by the
prefix form of A + B, which is + A B, and then C. As in postfix, the operands keep their original
left to right order and only the operators move.` },

{ id:"pp-06", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Evaluate the postfix expression 5 1 2 + 4 * + 3 -.`,
  choices:["15", "10", "20", "8", "None of the above"], ans:4,
  check:`postfix_eval('5 1 2 + 4 * + 3 -'.split())`,
  why:`Work the stack down the page. Push 5, 1, and 2, then the plus pops 1 and 2 and pushes 3.
Push 4, and the times pops 3 and 4 to push 12. The next plus pops 5 and 12 to push 17. Push 3, and the
minus pops 17 and 3 to push 14. Writing the stack as a column rather than holding it in your head is
what keeps a long expression like this honest. Since 14 is not among the four choices offered, the
answer is None of the above.` },

{ id:"pp-07", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Evaluate the postfix expression 8 3 - 2 /.`,
  choices:["2","-2","5","3","None of the above"], ans:0,
  check:`postfix_eval('8 3 - 2 /'.split())`,
  why:`The value popped first is the right operand, so 8 3 - means 8 minus 3, which is 5, and
then 5 2 / means 5 divided by 2, which is 2 once the fraction is dropped. Reversing the pop order
would turn the first step into 3 minus 8, and the reason that bug is so hard to spot is that it never
shows up on addition or multiplication, only on subtraction and division.` },

{ id:"pp-08", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the postfix expression A B C * + D - to infix.`,
  choices:["((A+(B*C))-D)","((A+B)*(C-D))","(A+((B*C)-D))","((A*B)+(C-D))","None of the above"], ans:0,
  check:`post_to_infix('A B C * + D -')`,
  why:`Scan from the left for the first operator with two operands sitting immediately in front
of it. That is the star with B and C, so B C * becomes (B * C). The plus now has A and that group in
front of it, giving (A + (B * C)), and the minus finally combines that with D. Always restarting the
scan from the left is what keeps the grouping correct.` },

{ id:"pp-09", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the prefix expression - * A B / C D to infix.`,
  choices:["((A*B)-(C/D))","((A-B)*(C/D))","(A*(B-(C/D)))","((A*B)/(C-D))","None of the above"], ans:0,
  check:`pre_to_infix('- * A B / C D')`,
  why:`Prefix works the same way with the scan looking for an operator followed immediately by
two operands. The star with A and B gives (A * B), the slash with C and D gives (C / D), and the minus
then has two operands available and produces the whole expression. Scanning from the right instead is
often quicker, because the last operator you meet that way is always the outermost one.` },

{ id:"pp-10", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression A * B / C * D to postfix.`,
  choices:["A B * C / D *","A B C D * / *","A B * C D * /","A B C * / D *","None of the above"], ans:0,
  check:`to_postfix('A*B/C*D')`,
  why:`Multiplication and division share a precedence level and group to the left, so the
expression is ((A * B) / C) * D, and each operator lands immediately after whichever operand completed
it. Reading them as right associative would give A B C D * / *, which is the first distractor and
looks plausible enough that it is worth ruling out deliberately.` },

{ id:"pp-11", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Evaluate the postfix expression 6 2 / 3 - 4 *.`,
  choices:["0","8","-4","12","None of the above"], ans:0,
  check:`postfix_eval('6 2 / 3 - 4 *'.split())`,
  why:`Working left to right, 6 divided by 2 is 3, then 3 minus 3 is 0, then 0 times 4 is 0, so
the infix form is ((6 / 2) - 3) * 4. There is a shortcut available here that is worth noticing before
you finish the arithmetic: once a running value reaches zero, everything remaining in a chain of
multiplications is zero as well.` },

{ id:"pp-12", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`How many operators does the postfix form of an infix expression contain if the infix form
has 7 operands and no unary operators?`,
  choices:["6","7","8","depends on the expression","None of the above"], ans:0,
  check:`str(7-1)`,
  why:`Each binary operator joins two separate pieces into one, so every operator reduces the
number of loose pieces by exactly one. Starting from 7 operands and finishing with a single
expression therefore takes 6 operators, whatever the parenthesisation happens to be. It is the same
counting argument that gives a full binary tree with 7 leaves exactly 6 internal nodes.` },

{ id:"pp-13", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression X ^ (Y + Z) * W - Q / R to postfix.`,
  choices:["X Y Z + ^ W * Q R / -","X Y Z ^ + W * Q R / -","X Y Z + W ^ * Q R / -","X Y Z + ^ W Q R / * -","None of the above"], ans:0,
  check:`to_postfix('X^(Y+Z)*W-Q/R')`,
  why:`Fully parenthesised, this reads (((X ^ (Y + Z)) * W) - (Q / R)). The brackets around Y + Z
force that addition to finish before the exponentiation can use it, which is why the plus is written
before the caret even though the caret binds more tightly in general. After that come the
multiplication by W, then the division, and finally the subtraction.` },

{ id:"pp-14", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Evaluate the postfix expression 2 3 4 + *.`,
  choices:["15", "10", "20", "9", "None of the above"], ans:4,
  check:`postfix_eval('2 3 4 + *'.split())`,
  why:`The plus is reached first and so fires first, popping 3 and 4 to push 7, after which the
times pops 2 and 7 to push 14, making the infix form 2 * (3 + 4). Set that beside 2 3 * 4 +, which is
(2 * 3) + 4, or 10: identical operands in identical order, and only the operator positions differ.
Since 14 is not among the four choices offered, the answer is None of the above.` },

{ id:"pp-15", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression (P - (Q - (R - S))) * T to postfix.`,
  choices:["P Q R S - - - T *","P Q - R - S - T *","P Q R S - - T * -","P Q R S T * - - -","None of the above"], ans:0,
  check:`to_postfix('(P-(Q-(R-S)))*T')`,
  why:`The nesting runs inward, so R - S resolves first, then Q minus that result, then P minus
that, and each minus is written immediately after the pair it joins, which stacks all three operators
together at the end. Compare it with P - Q - R - S, which carries no brackets, groups to the left, and
comes out as P Q - R - S - with the operators interleaved instead.` },

{ id:"pp-16", kind:"problem", topic:"prefix-postfix", level:"j",
  q:`Evaluate the postfix expression 9 5 - 2 - 1 -.`,
  choices:["1","5","3","-1","None of the above"], ans:0,
  check:`postfix_eval('9 5 - 2 - 1 -'.split())`,
  why:`Working left to right, 9 minus 5 is 4, then 4 minus 2 is 2, then 2 minus 1 is 1. Written
in infix this is ((9 - 5) - 2) - 1, which is exactly what a plain left to right chain of subtractions
means, so the postfix form here is simply that chain with the brackets removed.` }

]);
