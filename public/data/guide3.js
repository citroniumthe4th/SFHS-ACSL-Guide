window.GUIDE = Object.assign(window.GUIDE || {}, {

"prefix-postfix": `
<p class="lead">The same expression can be written three ways, and only one of them needs
parentheses. Infix puts each operator between its operands and therefore has to carry precedence
rules and brackets to say what groups with what. Prefix puts the operator in front and postfix puts
it behind, and both of those are unambiguous on their own, with no precedence rules and no brackets
needed. That is what makes them worth knowing: each one maps directly onto an expression tree, and
postfix in particular can be evaluated by a stack in a single left to right pass.</p>

<table class="tbl">
<tr><th>Infix</th><th>Prefix</th><th>Postfix</th></tr>
<tr><td>A + B</td><td>+ A B</td><td>A B +</td></tr>
<tr><td>A + B * C</td><td>+ A * B C</td><td>A B C * +</td></tr>
<tr><td>(A + B) * C</td><td>* + A B C</td><td>A B + C *</td></tr>
<tr><td>A ^ B ^ C</td><td>^ A ^ B C</td><td>A B C ^ ^</td></tr>
</table>
<p>Prefix is also called Polish notation, after the logician Jan Lukasiewicz, and postfix is
reverse Polish. Look down the columns and you will see that the operands never move: A, B, and C
appear in that order in all three forms. Only the operators travel, which is the most useful single
observation in this category, because it rules out roughly half of every set of answer choices at a
glance.</p>

<h2>Precedence and associativity</h2>
<p>You need these before you can even read the infix form, let alone convert it. Exponentiation
binds tightest and groups from the right, so A ^ B ^ C means A ^ (B ^ C). Multiplication and
division come next and group from the left, making A / B * C mean (A / B) * C. Addition and
subtraction come last and also group from the left, so A - B - C is (A - B) - C. Where a problem
uses a unary minus, it binds tighter than multiplication.</p>

<p>The right associativity of the exponent is what separates a four out of five from a five out of
five here. In postfix, A ^ B ^ C comes out as A B C ^ ^ and not as A B ^ C ^, and both of those
will be sitting in the answer choices waiting for you.</p>

<h2>The hand method</h2>
<p>Fully parenthesise the infix expression so that every operator has a pair of brackets of its own,
following precedence and associativity as you go. Then move each operator to the position of its
own closing parenthesis for postfix, or its own opening parenthesis for prefix, and rub the
brackets out. That is the whole method, and it is reliable enough that you should use it even on
expressions you think you can see through.</p>

<p>Take (A + B) * C - D ^ E ^ F. Fully parenthesised it reads (((A + B) * C) - (D ^ (E ^ F))),
where the inner grouping on the right comes from the exponent associating rightward. Moving each
operator out to its closing bracket and dropping the brackets leaves A B + C * D E F ^ ^ -.</p>

<h2>The algorithm, for when you would rather run one</h2>
<p>This is Dijkstra's shunting yard, and it is also what you would write if the programming problem
asked for a converter. Scan the infix expression from left to right, keeping an output list and a
stack of operators. An operand goes straight to the output. A left parenthesis is pushed. A right
parenthesis pops operators into the output until the matching left parenthesis surfaces, and then
both brackets are discarded.</p>

<p>An operator is the interesting case. Before pushing it, pop any operator on top of the stack
whose precedence is higher, and also pop operators of equal precedence when the incoming operator
is left associative. For the exponent, which is right associative, you do not pop the equal ones.
That single clause is the only place where the exponent is treated differently from everything
else, and it is what produces A B C ^ ^ and not A B ^ C ^. When the scan ends, pop whatever
remains on the stack into the output.</p>

<h2>Reading the notations backwards</h2>
<p>To turn postfix back into infix, scan from the left for the first operator that has two operands
sitting immediately to its left, replace those three tokens with a parenthesised infix expression,
and carry on scanning from the left again. In A B C * + D -, the first such operator is the star
with B and C, so that becomes (B * C). The plus now has A and that group in front of it, giving
(A + (B * C)), and the minus finally takes that and D to give ((A + (B * C)) - D).</p>

<p>Prefix works the same way with the scan looking for two operands immediately to the right of an
operator. Scanning prefix from the right is often quicker, because the last operator you meet is
always the outermost one.</p>

<h2>Evaluating without converting</h2>
<p>Postfix evaluates with a stack and a single pass. Push operands, and when an operator arrives,
pop two values, combine them, and push the result. The value popped first is the right operand,
which matters for subtraction and division and not at all for addition and multiplication. That
asymmetry is why a reversed pop is such a nasty bug: half your test cases still pass, and the
failures look random until you notice they are all minus signs and slashes.</p>

<p>Prefix evaluates the same way with the scan running right to left, and there the first value
popped is the left operand instead.</p>

<h2>Read the question again, then check three things</h2>
<p>Start with the question itself: read it again and confirm which notation it asked for. Answering
in prefix when it wanted postfix throws away work you have already done correctly, and it is the one
item on this list you can rule out before you begin.</p>

<p>Then three checks on the work. Confirm you grouped the exponent from the right, since that is the
one operator here that does not associate leftward. Check the operand order on every minus and
divide, where the first value popped is the right-hand operand. And confirm the operator stack is
empty, since anything still on it when the scan ends belongs on the output.</p>
`,

"bit-string-flicking": `
<p class="lead">A bit string is a string of binary digits, and this category manipulates them both
one bit at a time with the logical operators and as a whole unit with the shift and circulate
operators. The operations themselves take a minute to learn. What the category actually tests is
whether you apply the precedence table correctly and whether you can circulate a string without
losing a bit somewhere in the middle.</p>

<p>The bits on the left are called the most significant and those on the right the least
significant, which is the same convention as ordinary decimal. Programmers use bit strings to hold
a set of flags in a single variable instead of an array of booleans, to represent membership in a
set, and to multiply or divide by powers of two, so the topic connects directly to assembly
language, digital electronics, and anything close to hardware.</p>

<h2>The operators</h2>
<p>NOT, written with a tilde, is unary and flips every bit, turning each 0 into a 1 and each 1 into
a 0.</p>

<p>AND, OR, and XOR are binary and work position by position on two strings of the same length. AND
gives 1 only where both bits are 1, which makes it the natural way to isolate or clear particular
bits. OR gives 1 wherever at least one bit is 1, which is how you force a bit on. XOR gives 1
exactly where the two bits differ. If the operands are different lengths the shorter one is padded
on the left with zeros, though contest problems almost always keep them equal.</p>

<p>The four movers shift the whole string. LSHIFT-n and RSHIFT-n move every bit n places in the
named direction, discarding whatever falls off the end and filling in behind with zeros. LCIRC-n
and RCIRC-n move the bits the same way, except that what falls off one end reappears at the other.
All four preserve the length of the string, which is worth stating explicitly because an answer of
the wrong length can be discarded without further thought.</p>

<table class="tbl">
<tr><th>Operation on 10110</th><th>Result</th><th>Why</th></tr>
<tr><td>~10110</td><td>01001</td><td>every bit flipped</td></tr>
<tr><td>LSHIFT-2</td><td>11000</td><td>the leading 10 falls off, two zeros pad the right</td></tr>
<tr><td>RSHIFT-2</td><td>00101</td><td>the trailing 10 falls off, two zeros pad the left</td></tr>
<tr><td>LCIRC-2</td><td>11010</td><td>the leading 10 wraps round to the back</td></tr>
<tr><td>RCIRC-2</td><td>10101</td><td>the trailing 10 wraps round to the front</td></tr>
</table>

<h2>Precedence</h2>
<p>From tightest to loosest: the unary operators first, meaning the tilde and all four movers, then
AND, then XOR, then OR. Operators at the same level go left to right, except the unary ones, which
associate right to left because they stack up in front of their operand. Parentheses override
everything, as usual.</p>

<p>So 10110 | 01001 &amp; 11100 means 10110 | (01001 &amp; 11100). The AND gives 01000 and the OR
then gives 11110. Reading the line strictly left to right instead produces 11111, and that wrong
answer is among the choices every single time this question is asked, because it is where hurrying lands you.</p>

<h2>Shortcuts worth knowing</h2>
<p>On a string of length L, LCIRC-n and RCIRC-(L minus n) are the same operation, so circulating a
five bit string left by 3 is identical to circulating it right by 2, and you should always do
whichever is shorter. Before doing either, reduce the count modulo the length, since RCIRC-9 on a
four bit string is really RCIRC-1 and trying to count nine positions round a four bit string is how
bits go missing.</p>

<p>Shifting by the length or more gives all zeros, which is a legitimate answer and not an error. A few identities are worth recognising on sight as well: X XOR X is all zeros, X XOR with
all zeros leaves X alone, and X XOR with all ones is the complement of X, so an exclusive or
against a solid row of ones can simply be read as a tilde. Similarly X AND with the complement of X
is all zeros, X OR with the complement of X is all ones, and a double complement can be crossed out
the moment you see it.</p>

<h2>Working through an expression</h2>
<p>Evaluate (RCIRC-3 (LSHIFT-1 01101)) ^ (~01010 &amp; 11011) by taking it in pieces. Shifting
01101 left by one drops the leading zero and pads a zero on the right, giving 11010. Circulating
that right by three brings the trailing 010 round to the front, giving 01011. On the other side,
the complement of 01010 is 10101, and 10101 AND 11011 is 10001. The exclusive or of 01011 and 10001
is 11010.</p>

<p>Whenever a step combines two strings, write them one directly above the other and work down the
columns. It takes about five seconds and it removes an entire category of mistake, which is a very
good trade when six questions have to fit into thirty minutes.</p>

<h2>Solving for the unknown string</h2>
<p>The harder problems in this category give you an equation and ask how many bit strings satisfy
it. The method is to work position by position and count the choices available at each one, then
multiply.</p>

<p>Ask how many five bit strings X satisfy (X AND 10110) equal to 10110. An AND can only ever turn
bits off, so a 1 in the result forces a 1 in X at that position, which pins the first, third, and
fourth positions. The remaining two positions are anded against 0 and therefore give 0 whatever X
holds, leaving them free. Two free positions means two squared, so four strings work.</p>

<p>The same reasoning for OR runs the other way, since a 0 in the result forces a 0 in X while a 1
in the result where the mask already holds a 1 leaves X free. XOR never leaves anything free at
all, because each position determines X exactly, so an XOR equation has either one solution or
none.</p>

<h2>Precedence first, then the two confusions</h2>
<p>Evaluate the precedence explicitly before you touch a bit. Write the expression out with
brackets around every operation in the order it happens, then work outward from the innermost. Going
left to right instead is the single largest source of wrong answers here, and bracketing first is
what rules it out.</p>

<p>Then two confusions worth naming, because they look alike on paper. A shift discards the bits that
fall off the end and pads with zeros; a circulate brings them round to the other side. And LCIRC moves
bits toward the front, with whatever falls off the front reappearing at the back. One more thing to
watch: the symbol ^ means exclusive or here and exponentiation in What Does This Program Do, so check
which category you are in before you read it.</p>
`

});
