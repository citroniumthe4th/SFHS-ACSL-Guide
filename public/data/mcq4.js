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
  choices:["2.5","-2","5","3","None of the above"], ans:0,
  check:`postfix_eval('8 3 - 2 /'.split())`,
  why:`The value popped first is the right operand, so 8 3 - means 8 minus 3, which is 5, and
then 5 2 / means 5 divided by 2, which is 2.5. The expression does not specify integer division, so keep the fraction. Reversing the pop order
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

window.MCQ = (window.MCQ || []).concat([

{ id:"pp-17", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression A + B * C - D to postfix.`,
  choices:["A B C * + D -","A B + C * D -","A B C D * + -","A B C * D - +","None of the above"], ans:0,
  check:`to_postfix('A+B*C-D')`,
  why:`Multiplication binds tighter than the two additive operators, and those group to the
left, so the expression is really (A + (B * C)) - D. The star lands immediately after B and C, the
plus follows once its right operand is complete, and the minus comes last because it is the final
operation performed. The operands never move, so any choice that reorders A, B, C, and D can be
dismissed on sight.` },

{ id:"pp-18", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression (A + B) * (C &minus; D) to postfix.`,
  choices:["A B + C D - *","A B C D + - *","A B + C - D *","A B C + D - *","None of the above"], ans:0,
  check:`to_postfix('(A+B)*(C-D)')`,
  why:`Two independent bracketed groups each resolve before the multiplication can use them, so
write each one out and then join them. A + B becomes A B +, C - D becomes C D -, and the star that
combines the two results comes last. When both operands of an operator are themselves complete
expressions, the postfix form is simply one after the other followed by the operator.` },

{ id:"pp-19", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression A * (B + C * (D &minus; E)) to postfix.`,
  choices:["A B C D E - * + *","A B C D E * - + *","A B C + D E - * *","A B C D E - + * *","None of the above"], ans:0,
  check:`to_postfix('A*(B+C*(D-E))')`,
  why:`Resolve the innermost bracket first and work outward. D - E becomes D E -, then C times
that group becomes C D E - *, then B plus that becomes B C D E - * +, and finally A times the whole
thing appends the last star. Nesting that runs inward like this always stacks its operators at the end
in the reverse of the order the brackets were opened.` },

{ id:"pp-20", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Evaluate the postfix expression 4 2 3 * +.`,
  choices:["10","18","24","14","None of the above"], ans:0,
  check:`postfix_eval('4 2 3 * +'.split())`,
  why:`Push 4, 2, and 3. The star pops 2 and 3 and pushes 6, then the plus pops 4 and 6 and
pushes 10, so the infix form is 4 + (2 * 3). Compare it against 4 2 * 3 +, which is (4 * 2) + 3, or
11: identical operands in identical order, and only the operator positions differ. The distractor 18 is
what (4 + 2) * 3 would give.` },

{ id:"pp-21", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Evaluate the postfix expression 12 3 / 2 4 * +.`,
  choices:["18", "20", "10", "24", "None of the above"], ans:4,
  check:`postfix_eval('12 3 / 2 4 * +'.split())`,
  why:`Work the stack down the page. Push 12 and 3, and the slash pops both to push 4. Push 2 and
4, and the star pops both to push 8. The plus then pops 4 and 8 to push 12, so the infix form is
(12 / 3) + (2 * 4). Two independent subexpressions each finish before the operator that joins them,
which is what the run of two operands followed by an operator, twice over, is telling you. Since 12 is
not among the four choices offered, the answer is None of the above.` },

{ id:"pp-22", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression A &minus; B / C to prefix.`,
  choices:["- A / B C","/ - A B C","- / A B C","- A B / C","None of the above"], ans:0,
  check:`to_prefix('A-B/C')`,
  why:`Division binds tighter than subtraction, so the expression is A - (B / C) and the
subtraction is the last operation performed. In prefix the last operation is written first, so the
minus leads, followed by A and then the prefix form of B / C, which is / B C. The distractor
/ - A B C is the prefix form of (A - B) / C, which is what reading the operators left to right without
regard to precedence would give.` },

{ id:"pp-23", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the infix expression (A &minus; B) * (C + D) to prefix.`,
  choices:["* - A B + C D","* + C D - A B","- A B * + C D","* - A B C + D","None of the above"], ans:0,
  check:`to_prefix('(A-B)*(C+D)')`,
  why:`The multiplication is performed last, so its symbol comes first, and it is then followed
by the prefix form of each operand in the order they appear. That gives - A B for the left group and
+ C D for the right. The operands keep their original left to right order in prefix just as they do in
postfix, which is what rules out the choice that puts C and D before A and B.` },

{ id:"pp-24", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the postfix expression A B + C D + * to infix.`,
  choices:["((A+B)*(C+D))","(A+(B*(C+D)))","(((A+B)*C)+D)","((A+B)+(C*D))","None of the above"], ans:0,
  check:`post_to_infix('A B + C D + *')`,
  why:`Scan from the left for the first operator with two operands sitting immediately in front
of it. That is the first plus with A and B, which becomes (A + B). Restarting the scan, the second plus
now has C and D in front of it and becomes (C + D). The star finally has those two groups available.
Always restarting from the left is what keeps the grouping correct on an expression with two separate
subtrees.` },

{ id:"pp-25", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the prefix expression + A * &minus; B C D to infix.`,
  choices:["(A+((B-C)*D))","((A+(B-C))*D)","(((A+B)-C)*D)","((A*B)-(C+D))","None of the above"], ans:0,
  check:`pre_to_infix('+ A * - B C D')`,
  why:`Scanning a prefix expression from the right is usually quicker, because the last operator
you meet that way is the outermost one. Working from the right, D, C, and B are operands, and the minus
takes B and C to give (B - C). The star then has that group and D, giving ((B - C) * D), and the plus
finally combines A with it.` },

{ id:"pp-26", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression A + B ^ C ^ D * E to postfix.`,
  choices:["A B C D ^ ^ E * +","A B C ^ D ^ E * +","A B C D ^ ^ * E +","A B C D E ^ ^ * +","None of the above"], ans:0,
  check:`to_postfix('A+B^C^D*E')`,
  why:`Exponentiation binds tightest and associates to the right, so B ^ C ^ D is B ^ (C ^ D) and
resolves first, giving B C D ^ ^. Multiplication comes next, taking that whole result and E, and the
addition is last. Fully parenthesized the expression reads A + ((B ^ (C ^ D)) * E). Treating the caret
as left associative would give A B C ^ D ^ E * +, which is the second choice.` },

{ id:"pp-27", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Evaluate the postfix expression 20 4 - 3 - 2 /.`,
  choices:["6.5","13","8.5","6","None of the above"], ans:0,
  check:`postfix_eval('20 4 - 3 - 2 /'.split())`,
  why:`The value popped first is the right operand, so this is ((20 - 4) - 3) / 2, which runs 16,
then 13, then 6.5. The expression does not specify integer division, so keep the fraction rather than
truncating to 6. Reversing the pop order would turn the first step into 4 minus 20, and that bug never
shows up on addition or multiplication, only on subtraction and division.` },

{ id:"pp-28", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`A postfix expression contains 9 binary operators and no unary operators. How many operands
does it contain?`,
  choices:["10","9","8","18","None of the above"], ans:0,
  check:`str(9+1)`,
  why:`Each binary operator joins two loose pieces into one, so every operator reduces the count
of loose pieces by exactly one. Finishing with a single value after 9 operators means starting with 10
operands. It is the same counting argument that gives a full binary tree with 9 internal nodes exactly
10 leaves, and it holds whatever the shape of the expression turns out to be.` },

{ id:"pp-29", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`Convert the postfix expression A B C &minus; * D + to prefix.`,
  choices:["+ - * A B C D","* A - B C + D","+ * A B - C D","+ A * - B C D","None of the above"], ans:4,
  check:`to_prefix(post_to_infix('A B C - * D +'))`,
  why:`Go through infix rather than trying to rearrange the symbols directly. Scanning the
postfix from the left, the minus takes B and C to give (B - C), the star takes A and that group to give
(A * (B - C)), and the plus adds D, so the infix form is ((A * (B - C)) + D). Writing each operator in
front of its two operands then gives + * A - B C D. Since that string is not among the four choices
offered, the answer is None of the above.` },

{ id:"pp-30", kind:"problem", topic:"prefix-postfix", level:"j",
  q:`Evaluate the postfix expression 3 4 + 5 *.`,
  choices:["35","23","17","60","None of the above"], ans:0,
  check:`postfix_eval('3 4 + 5 *'.split())`,
  why:`Push 3 and 4, and the plus pops both to push 7. Push 5, and the star pops 7 and 5 to push
35, so the infix form is (3 + 4) * 5. The distractor 23 is what 3 + (4 * 5) would give, which in
postfix is written 3 4 5 * + instead. Where the operators sit is the entire difference between the
two.` },

{ id:"pp-31", kind:"problem", topic:"prefix-postfix", level:"b",
  q:`Convert the infix expression ((A &minus; B) * C) / (D + E) to postfix.`,
  choices:["A B - C * D E + /","A B C - * D E + /","A B - C D E + * /","A B - C * D + E /","None of the above"], ans:0,
  check:`to_postfix('((A-B)*C)/(D+E)')`,
  why:`Every operation here is already bracketed, so the work is mechanical: move each operator
out past its own closing bracket and then drop the brackets. A - B becomes A B -, multiplying by C
appends the star, D + E becomes D E +, and the division that joins the two halves comes last. When an
expression is fully parenthesized there is nothing left for precedence to decide.` },

{ id:"pp-32", kind:"problem", topic:"prefix-postfix", level:"s",
  q:`What is the greatest number of values on the stack at any moment while evaluating the postfix
expression 2 3 + 4 5 + *?`,
  choices:["3","2","4","7","None of the above"], ans:0,
  check:`
depth = mx = 0
for t in '2 3 + 4 5 + *'.split():
    depth = depth - 1 if t in '+-*/' else depth + 1
    mx = max(mx, depth)
RESULT = mx`,
  why:`Each operand adds one to the stack and each binary operator removes two and pushes one,
for a net loss of one. Tracing the depth gives 1, 2, 1, 2, 3, 2, and finally 1, so the peak is 3. The
depth reached is a property of the shape of the expression rather than its length, and a well balanced
expression like this one keeps the stack far shallower than a long left leaning chain would.` }

]);
