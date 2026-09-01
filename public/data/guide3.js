window.GUIDE = Object.assign(window.GUIDE || {}, {

"prefix-postfix": `
<p class="lead">Contest 2. The same expression, written three ways. Infix puts the operator
between its operands and needs precedence rules and parentheses. Prefix puts it in front and
postfix puts it behind, and neither needs a single parenthesis or a precedence rule.</p>

<h3>The three forms</h3>
<table class="tbl">
<tr><th>Infix</th><th>Prefix</th><th>Postfix</th></tr>
<tr><td>A + B</td><td>+ A B</td><td>A B +</td></tr>
<tr><td>A + B * C</td><td>+ A * B C</td><td>A B C * +</td></tr>
<tr><td>(A + B) * C</td><td>* + A B C</td><td>A B + C *</td></tr>
<tr><td>A ^ B ^ C</td><td>^ A ^ B C</td><td>A B C ^ ^</td></tr>
</table>
<p>Prefix is also called Polish notation and postfix is also called reverse Polish. The
operands stay in the same left to right order in all three forms. Only the operators move.</p>

<h3>Precedence and associativity</h3>
<p>You need these to read the infix form in the first place:</p>
<ul>
<li>^ binds tightest and groups right to left, so A ^ B ^ C is A ^ (B ^ C).</li>
<li>* and / come next and group left to right, so A / B * C is (A / B) * C.</li>
<li>+ and - come last and group left to right, so A - B - C is (A - B) - C.</li>
<li>Unary minus, when a problem uses it, binds tighter than * and /.</li>
</ul>
<p>The right associativity of ^ is the detail that separates a 4 out of 5 from a 5 out of 5 on
this category. A ^ B ^ C in postfix is A B C ^ ^, not A B ^ C ^.</p>

<h3>The parenthesize and move method</h3>
<p>This is the hand method and it is reliable enough that you should use it even when you
think you can see the answer.</p>
<ol>
<li>Fully parenthesize the infix expression so that every operator has its own pair of
parentheses, following precedence and associativity.</li>
<li>Move each operator to the position of its own closing parenthesis for postfix, or its own
opening parenthesis for prefix.</li>
<li>Drop all the parentheses.</li>
</ol>
<p>Convert (A + B) * C - D ^ E ^ F to postfix. Fully parenthesized it is
(((A + B) * C) - (D ^ (E ^ F))). Now move each operator outward to its closing parenthesis and
strip the brackets, giving A B + C * D E F ^ ^ -.</p>

<h3>The stack method</h3>
<p>If you would rather run an algorithm, this is the one, and it is also what you would code.
Scan the infix expression left to right with an output list and an operator stack.</p>
<ul>
<li>An operand goes straight to the output.</li>
<li>A left parenthesis is pushed.</li>
<li>A right parenthesis pops operators to the output until the matching left parenthesis
appears, then both parentheses are discarded.</li>
<li>An operator pops any operator of higher precedence, and also pops equal precedence
operators when the incoming operator is left associative, then gets pushed.</li>
</ul>
<p>At the end, pop everything remaining. That single associativity clause is the only place ^
is treated differently from the rest.</p>

<h3>Going backwards</h3>
<p>To turn postfix back into infix, scan left to right and find the first operator that has two
operands immediately to its left. Replace those three tokens with a parenthesized infix
expression, then keep going. For prefix, find the first operator that has two operands
immediately to its right and do the same.</p>
<p>Take the postfix A B C * + D -. The first operator with two operands in front of it is the
star, with B and C, so replace B C * with (B * C). The string is now A (B * C) + D -. The plus
now has A and (B * C) in front of it, giving (A + (B * C)). Then the minus gives
((A + (B * C)) - D).</p>

<h3>Evaluating without converting</h3>
<p>To evaluate postfix directly, push operands on a stack and let each operator pop two values
and push the result. The value popped first is the right operand. That order matters for
subtraction and division and not at all for addition and multiplication, which is why a
reversed pop shows up as a bug that only some test cases catch.</p>
<p>Prefix evaluates the same way with the scan running right to left, and there the first value
popped is the left operand.</p>

<h3>Where points get lost</h3>
<ul>
<li>Treating ^ as left associative.</li>
<li>Reordering operands. They never move.</li>
<li>Popping operands in the wrong order for - and /.</li>
<li>Forgetting to drain the operator stack at the end of the scan.</li>
<li>Answering in prefix when the problem asked for postfix. Read the question twice.</li>
</ul>
`,

"bit-string-flicking": `
<p class="lead">Contest 2. Bit strings and eight operators. The operations themselves are easy.
The category is really a test of whether you apply the precedence table correctly and whether
you can circulate a string without dropping a bit.</p>

<h3>The operators</h3>
<p>Complement, written ~, flips every bit. It takes one operand.</p>
<p>AND (&amp;), OR (|), and XOR (^) work bit by bit on two strings of the same length. AND
gives 1 only when both bits are 1. OR gives 1 when at least one is 1. XOR gives 1 when the bits
differ. If the two strings are different lengths, the shorter one is padded on the left with
zeros, though contest problems usually keep them equal.</p>
<p>LSHIFT-n and RSHIFT-n move every bit n places. Bits that fall off the end are gone, and
zeros fill in behind. LCIRC-n and RCIRC-n move every bit n places too, but bits that fall off
one end reappear at the other. All four keep the length the same.</p>
<table class="tbl">
<tr><th>Operation on 10110</th><th>Result</th><th>Why</th></tr>
<tr><td>~10110</td><td>01001</td><td>every bit flipped</td></tr>
<tr><td>LSHIFT-2</td><td>11000</td><td>drop the leading 10, pad two zeros on the right</td></tr>
<tr><td>RSHIFT-2</td><td>00101</td><td>drop the trailing 10, pad two zeros on the left</td></tr>
<tr><td>LCIRC-2</td><td>11010</td><td>the leading 10 wraps around to the back</td></tr>
<tr><td>RCIRC-2</td><td>10101</td><td>the trailing 10 wraps around to the front</td></tr>
</table>

<h3>Precedence</h3>
<p>From tightest to loosest:</p>
<ol>
<li>~ and the four shift and circulate operators</li>
<li>&amp;</li>
<li>^</li>
<li>|</li>
</ol>
<p>Operators at the same level go left to right, except the unary ones, which go right to left
because they stack in front of their operand. Parentheses override everything.</p>
<p>So 10110 | 01001 &amp; 11100 is 10110 | (01001 &amp; 11100), which is 10110 | 01000, which
is 11110. Reading it left to right instead gives 11111, and that wrong answer appears as a
choice on every test that asks this.</p>

<h3>Shortcuts worth knowing</h3>
<ul>
<li>LCIRC-n and RCIRC-(L - n) are the same operation on a string of length L. Circulating a
five bit string left by 3 is the same as circulating it right by 2, and the shorter one is
less error prone.</li>
<li>Reduce a circulate count modulo the length before you do anything. RCIRC-9 on a four bit
string is just RCIRC-1.</li>
<li>A shift by the length or more gives all zeros.</li>
<li>X ^ X is all zeros, X ^ 000...0 is X, and X ^ 111...1 is ~X. That last one turns an XOR
with all ones into a complement, which is often faster.</li>
<li>X &amp; ~X is all zeros and X | ~X is all ones.</li>
<li>~~X is X, so a double complement can be crossed out on sight.</li>
</ul>

<h3>Working an expression</h3>
<p>Evaluate (RCIRC-3 (LSHIFT-1 01101)) ^ (~01010 &amp; 11011).</p>
<ol>
<li>LSHIFT-1 of 01101 drops the leading 0 and pads one zero on the right, giving 11010.</li>
<li>RCIRC-3 of 11010 moves the trailing 010 to the front, giving 01011.</li>
<li>~01010 is 10101.</li>
<li>10101 &amp; 11011 is 10001.</li>
<li>01011 ^ 10001 is 11010.</li>
</ol>
<p>Line up the two strings vertically when you do a two operand step. Writing them one above
the other and going column by column takes five seconds and removes an entire class of
mistake.</p>

<h3>Solve for the unknown string</h3>
<p>The harder contest problems give an equation and ask how many bit strings satisfy it. The
method is to work bit position by bit position and count the choices at each one.</p>
<p>How many five bit strings X satisfy (X &amp; 10110) == 10110? An AND can only turn bits off,
so the result having a 1 in a position forces X to have a 1 there. That pins positions 1, 3,
and 4. Positions 2 and 5 are anded with 0, which gives 0 no matter what X holds, so both are
free. Two free positions means 2 squared, which is 4 strings.</p>
<p>The same reasoning for OR runs the other way: a 0 in the result forces a 0 in X, and a 1
where the mask already has a 1 leaves X free. For XOR nothing is ever free, since each
position determines X exactly, so an XOR equation has exactly one solution or none.</p>

<h3>Where points get lost</h3>
<ul>
<li>Ignoring precedence and evaluating left to right.</li>
<li>Confusing a shift with a circulate. Only one of them loses bits.</li>
<li>Circulating the wrong direction. LCIRC moves bits toward the front of the string and the
ones that fall off the front come back at the end.</li>
<li>Changing the length of the string. Every operation here preserves length.</li>
<li>Forgetting that ^ here is XOR, while in the What Does This Program Do category the same
symbol means exponentiation.</li>
</ul>
`

});
