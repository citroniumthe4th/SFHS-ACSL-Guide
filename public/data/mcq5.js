window.MCQ = (window.MCQ || []).concat([

{ id:"bs-01", kind:"problem", topic:"bit-string-flicking", level:"b",
  q:`Evaluate (LSHIFT-2 11010) | (RCIRC-3 01011).`,
  choices:["01101","01001","11101","01111","None of the above"], ans:0,
  check:`flick('(LSHIFT-2 11010) | (RCIRC-3 01011)')`,
  why:`Take the two movers separately before combining anything. Shifting 11010 left by two
drops the leading 11 and pads two zeros onto the right, giving 01000, while circulating 01011 right
by three carries the trailing 011 round to the front, giving 01101. Writing those two results one
above the other and reading down the columns, the OR comes out as 01101.` },

{ id:"bs-02", kind:"problem", topic:"bit-string-flicking", level:"b",
  q:`Evaluate 10110 | 01001 &amp; 11100.`,
  choices:["11110","11111","10110","01000","None of the above"], ans:0,
  check:`flick('10110 | 01001 & 11100')`,
  why:`And binds more tightly than or, so the line means 10110 | (01001 &amp; 11100). The and
gives 01000, and 10110 or 01000 is 11110. Evaluating strictly left to right instead produces 11111,
and that wrong answer appears among the choices on essentially every version of this question,
because it is what almost everyone reaches when hurrying.` },

{ id:"bs-03", kind:"problem", topic:"bit-string-flicking", level:"b",
  q:`What is RCIRC-9 applied to 1011?`,
  choices:["1101","0101","1110","1011","None of the above"], ans:0,
  check:`flick('RCIRC-9 1011')`,
  why:`Reduce the count modulo the length before doing anything else. The string is 4 bits long
and 9 modulo 4 is 1, so the whole instruction collapses to RCIRC-1, which carries the trailing 1 round
to the front and gives 1101. Attempting to count nine positions round a four bit string without
reducing first is precisely where bits go missing.` },

{ id:"bs-04", kind:"problem", topic:"bit-string-flicking", level:"j",
  q:`What is LSHIFT-2 applied to 10110?`,
  choices:["11000","01011","11010","00101","None of the above"], ans:0,
  check:`flick('LSHIFT-2 10110')`,
  why:`A shift discards whatever falls off the end, unlike a circulate. Dropping the leading 10
leaves 110, and padding two zeros onto the right to preserve the length gives 11000. The distractor
11010 is what LCIRC-2 would produce, where those same two bits wrap round to the back instead of
vanishing.` },

{ id:"bs-05", kind:"problem", topic:"bit-string-flicking", level:"j",
  q:`What is RCIRC-2 applied to 10110?`,
  choices:["10101","00101","11010","01101","None of the above"], ans:0,
  check:`flick('RCIRC-2 10110')`,
  why:`Circulating right by two takes the last two bits, which are 10, and places them in front
of the remaining 101, giving 10101. It is worth setting this beside RSHIFT-2 on the same string, which
would throw those two bits away and pad with zeros to give 00101, since the difference between the two
operations is exactly the difference between those two answers.` },

{ id:"bs-06", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate ~(11010 &amp; 01110).`,
  choices:["10101","01010","11110","00101","None of the above"], ans:0,
  check:`flick('~(11010 & 01110)')`,
  why:`The brackets say to do the and first, and 11010 and 01110 agree on a 1 only in the second
and third positions, giving 01010, whose complement is 10101. DeMorgan gets you there by another route
if you prefer, since the complement of an and is the or of the complements, and 00101 or 10001 is the
same 10101.` },

{ id:"bs-07", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate (LCIRC-4 10110) ^ (RSHIFT-1 10110).`,
  choices:["00000","10101","01011","11111","None of the above"], ans:0,
  check:`flick('LCIRC-4 10110 ^ RSHIFT-1 10110')`,
  why:`Evaluate both operands fully before touching the exclusive or, because the shortcut here
only becomes visible once they are written side by side. LCIRC-4 on a five bit string carries the
leading 1011 round to the back and gives 01011, while RSHIFT-1 drops the trailing 0 and pads a zero in
front, which also gives 01011. The two sides are identical, and anything exclusive-ored with itself is
all zeros.` },

{ id:"bs-08", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`How many 5 bit strings X satisfy (X &amp; 10110) equal to 10110?`,
  choices:["5", "1", "8", "2", "None of the above"], ans:4,
  check:`str(len([x for x in ['{:05b}'.format(i) for i in range(32)] if flick(x + ' & 10110') == '10110']))`,
  why:`An and can only ever turn bits off, never on, so wherever the required result holds a 1,
X must hold a 1 as well, and that pins positions 1, 3, and 4. The remaining two positions are anded
against 0 and therefore give 0 regardless of what X holds, which leaves them free. Two free positions
means 2 squared, or 4 strings. Since 4 is not among the four choices offered, the answer is None of
the above.` },

{ id:"bs-09", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`How many 4 bit strings X satisfy (X | 1010) equal to 1110?`,
  choices:["4","2","1","8","None of the above"], ans:0,
  check:`str(len([x for x in ['{:04b}'.format(i) for i in range(16)] if flick(x + ' | 1010') == '1110']))`,
  why:`Work position by position, comparing the mask 1010 against the required result 1110. Where
the mask holds a 1 and the result is 1, the or is already satisfied and X is free, which covers
positions 1 and 3. Where the mask holds a 0, X alone decides the outcome, so position 2 must be 1 and
position 4 must be 0. Two free positions gives 4 strings. Had any position required a 0 in the result
where the mask already holds a 1, there would have been no solutions at all.` },

{ id:"bs-10", kind:"problem", topic:"bit-string-flicking", level:"b",
  q:`Evaluate ~~1100 ^ 1010.`,
  choices:["0110","1001","1110","0000","None of the above"], ans:0,
  check:`flick('~~1100 ^ 1010')`,
  why:`A double complement cancels, so ~~1100 is simply 1100 and can be crossed out on sight.
Exclusive or with 1010 then gives a 1 wherever the two bits differ: the first pair agree, the second
and third differ, and the fourth agree, producing 0110.` },

{ id:"bs-11", kind:"concept", topic:"bit-string-flicking", level:"b",
  q:`Which single operation has the same effect as XOR with a string of all 1s?`,
  choices:["complement with ~","LCIRC by the length","AND with all 1s","OR with all 0s","None of the above"], ans:0,
  why:`Exclusive or gives 1 exactly where the two bits differ, and against a solid row of ones
every bit differs from its own inverse, so every position flips. That is precisely what the complement
does. The other three choices all leave the string exactly as it was, which makes them worth knowing
for the opposite reason: they are the identity operations you can recognize and skip.` },

{ id:"bs-12", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate (11110000 | 00001111) &amp; ~10101010.`,
  choices:["01010101","10101010","11111111","00000000","None of the above"], ans:0,
  check:`flick('(11110000 | 00001111) & ~10101010')`,
  why:`The two strings 11110000 and 00001111 cover every position between them, so their or is
11111111, and the complement of 10101010 is 01010101. Anding a string of all ones against anything
returns that thing unchanged, so the answer is 01010101. Spotting that the left side collapses to all
ones saves the columnwise work on the final and.` },

{ id:"bs-13", kind:"problem", topic:"bit-string-flicking", level:"j",
  q:`Start with 10110 and apply LCIRC-2, then XOR-11111, then RSHIFT-1. What is the result?`,
  choices:["00010","00101","11010","10100","None of the above"], ans:0,
  check:`mask_run('10110', ['LCIRC-2','XOR-11111','RSHIFT-1'])`,
  why:`Apply the operations strictly in order, handing each result to the next step. LCIRC-2
carries the leading 10 round to the back, giving 11010. Exclusive or against a row of ones flips every
bit, giving 00101. RSHIFT-1 then drops the trailing 1 and pads a zero in front, leaving 00010.` },

{ id:"bs-14", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate 1010 ^ 0110 ^ 1111 | 0001.`,
  choices:["0011","0010","1111","0001","None of the above"], ans:0,
  check:`flick('1010 ^ 0110 ^ 1111 | 0001')`,
  why:`Exclusive or binds more tightly than or, so both exclusive ors resolve first and they do so
from left to right. 1010 xor 0110 is 1100, and 1100 xor 1111 is 0011. Only then does the or against
0001 apply, and it changes nothing, since that bit was already set. Noticing that the final or is
inert is a useful check that the earlier steps were right.` },

{ id:"bs-15", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate RCIRC-1 LCIRC-1 1101101.`,
  choices:["1101101","1011011","0110110","1110110","None of the above"], ans:0,
  check:`flick('RCIRC-1 LCIRC-1 1101101')`,
  why:`Unary operators associate from the right, so LCIRC-1 is applied first and RCIRC-1 acts on
its result. Circulating left by one and then right by one puts every bit back where it started, so the
string is returned unchanged. Recognizing that on sight is worth doing, because working it through
arithmetically takes twice as long and offers twice as many chances to slip.` },

{ id:"bs-16", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate ~(LSHIFT-1 (RSHIFT-1 111000111000)).`,
  choices:["000111000111","111000111001","011100011100","111000111000","None of the above"], ans:0,
  check:`flick('~(LSHIFT-1 (RSHIFT-1 111000111000))')`,
  why:`RSHIFT-1 drops the trailing 0 and pads a zero in front, giving 011100011100, and LSHIFT-1
then drops that leading 0 and pads a zero at the end, returning 111000111000, which is the original
string. That only happened because the bits discarded at each end were both zeros, so a shift followed
by its opposite is not generally an identity and the discarded bits are worth checking before you
assume it is. Complementing what remains gives 000111000111.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"bs-17", kind:"problem", topic:"bit-string-flicking", level:"b",
  q:`Evaluate (RCIRC-2 10011) &amp; (LSHIFT-1 11100).`,
  choices:["11000","11100","10000","01100","None of the above"], ans:0,
  check:`flick('(RCIRC-2 10011) & (LSHIFT-1 11100)')`,
  why:`Resolve each mover on its own before combining them. Circulating 10011 right by two
carries the trailing 11 round to the front, giving 11100, while shifting 11100 left by one drops the
leading 1 and pads a zero on the right, giving 11000. Writing the two results one above the other and
reading down the columns, the and gives 11000.` },

{ id:"bs-18", kind:"problem", topic:"bit-string-flicking", level:"b",
  q:`Evaluate ~1010 | 0110.`,
  choices:["0111","1111","0101","0010","None of the above"], ans:0,
  check:`flick('~1010 | 0110')`,
  why:`The complement is a unary operator and binds tighter than any of the binary ones, so it
applies to 1010 alone rather than to the whole line. That gives 0101, and 0101 ored with 0110 sets a
bit wherever either operand has one, producing 0111. Complementing the result of the or instead would
give 0000, which is a different answer entirely.` },

{ id:"bs-19", kind:"problem", topic:"bit-string-flicking", level:"j",
  q:`What is LCIRC-7 applied to 1100?`,
  choices:["0110","1001","0011","1100","None of the above"], ans:0,
  check:`flick('LCIRC-7 1100')`,
  why:`Reduce the count modulo the length first. The string is 4 bits long and 7 modulo 4 is 3,
so the instruction collapses to LCIRC-3, which carries the leading 110 round to the back and leaves
0110. Circulating by a multiple of the length returns the string unchanged, which is the fact that
makes the reduction legitimate.` },

{ id:"bs-20", kind:"problem", topic:"bit-string-flicking", level:"j",
  q:`What is RSHIFT-3 applied to 10111?`,
  choices:["00010","11110","10100","11101","None of the above"], ans:0,
  check:`flick('RSHIFT-3 10111')`,
  why:`A shift throws away whatever falls off the end rather than wrapping it round. Dropping the
trailing 111 leaves 10, and padding three zeros onto the front to preserve the length gives 00010. The
distractor 11110 is what RCIRC-3 would produce, where those three bits reappear at the front instead
of vanishing.` },

{ id:"bs-21", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate (11011 ^ 10101) | ~11110.`,
  choices:["01111","01110","11111","00001","None of the above"], ans:0,
  check:`flick('(11011 ^ 10101) | ~11110')`,
  why:`The exclusive or sets a bit wherever the two operands differ, and 11011 against 10101
differ in the second, third and fourth positions, giving 01110. The complement of 11110 is 00001.
Oring those together sets the last bit as well, producing 01111. Doing both bracketed halves in full
before touching the or is what keeps a line with three operators manageable.` },

{ id:"bs-22", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Start with 11001 and apply NOT, then RCIRC-1, then AND-10111. What is the result?`,
  choices:["00110", "10011", "00001", "10110", "None of the above"], ans:4,
  check:`mask_run('11001', ['NOT','RCIRC-1','AND-10111'])`,
  why:`Apply the operations strictly in order, handing each result to the next step.
Complementing 11001 gives 00110. Circulating right by one carries the trailing 0 to the front, giving
00011. Anding that against 10111 leaves 00011, since the mask has ones everywhere the string does.
Since 00011 is not among the four choices offered, the answer is None of the above.` },

{ id:"bs-23", kind:"concept", topic:"bit-string-flicking", level:"b",
  q:`In the ACSL precedence table, which list orders the operators from most tightly binding to
least?`,
  choices:["NOT and the movers, then AND, then XOR, then OR","AND, then OR, then XOR, then NOT","OR, then XOR, then AND, then NOT","NOT, then OR, then AND, then XOR","None of the above"], ans:0,
  why:`The unary operators bind tightest, which covers the complement and every shift and
circulate, and among the binary operators the order is and, then exclusive or, then or. Operators at
the same level are evaluated from left to right. This is the single fact that decides questions like
10110 | 01001 &amp; 11100, where reading strictly left to right gives the wrong answer.` },

{ id:"bs-24", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate LCIRC-3 RCIRC-5 110010.`,
  choices:["101100","110010","010110","011001","None of the above"], ans:0,
  check:`flick('LCIRC-3 RCIRC-5 110010')`,
  why:`Unary operators associate from the right, so RCIRC-5 goes first and LCIRC-3 acts on its
result. Circulating 110010 right by five gives 100101, and circulating that left by three gives
101100. There is a shortcut worth noticing: on a 6 bit string, right by 5 is the same as left by 1, so
the pair together is a left circulate by 4.` },

{ id:"bs-25", kind:"problem", topic:"bit-string-flicking", level:"b",
  q:`Evaluate ~(10101 | 01010).`,
  choices:["00000","11111","10101","01010","None of the above"], ans:0,
  check:`flick('~(10101 | 01010)')`,
  why:`The two operands are complements of one another, so between them they cover every
position and their or is 11111. Complementing a solid row of ones gives a solid row of zeros. DeMorgan
reaches the same place by another route, since the complement of an or is the and of the complements,
and 01010 anded with 10101 has no position where both are set.` },

{ id:"bs-26", kind:"problem", topic:"bit-string-flicking", level:"b",
  q:`Evaluate 1111 &amp; 1010 ^ 0101.`,
  choices:["1111","0000","1010","0101","None of the above"], ans:0,
  check:`flick('1111 & 1010 ^ 0101')`,
  why:`And binds more tightly than exclusive or, so the line means (1111 &amp; 1010) ^ 0101. The
and leaves 1010, since anding against a row of ones changes nothing, and 1010 exclusive-ored with 0101
sets every position, because the two disagree everywhere. Evaluating strictly left to right would give
1111 &amp; 1111, which is also 1111 here by coincidence, so this one is worth working through properly
rather than trusting the matching answer.` },

{ id:"bs-27", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`How many 4 bit strings X satisfy (X &amp; 1100) equal to 1000?`,
  choices:["4","1","2","8","None of the above"], ans:0,
  check:`str(len([x for x in ['{:04b}'.format(i) for i in range(16)] if flick(x + ' & 1100') == '1000']))`,
  why:`Work position by position against the mask 1100 and the required result 1000. The first
position has a mask bit of 1 and needs a 1, so X must hold a 1 there. The second has a mask bit of 1
and needs a 0, so X must hold a 0. The last two are anded against 0 and give 0 whatever X holds, which
leaves them free. Two free positions gives 2 squared, or 4 strings.` },

{ id:"bs-28", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate (LSHIFT-2 111111) ^ (RSHIFT-2 111111).`,
  choices:["000000", "111111", "001100", "110000", "None of the above"], ans:4,
  check:`flick('(LSHIFT-2 111111) ^ (RSHIFT-2 111111)')`,
  why:`Shifting 111111 left by two drops the leading pair and pads on the right, giving 111100,
while shifting right by two pads on the left, giving 001111. Those two differ in the first two and the
last two positions and agree in the middle two, so the exclusive or is 110011. A shift and its opposite
are not inverses of one another, because each discards bits the other cannot restore. Since 110011 is
not among the four choices offered, the answer is None of the above.` },

{ id:"bs-29", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Start with 101010 and apply LSHIFT-2, then OR-110000, then NOT. What is the result?`,
  choices:["000111","111000","010111","001000","None of the above"], ans:0,
  check:`mask_run('101010', ['LSHIFT-2','OR-110000','NOT'])`,
  why:`Shifting 101010 left by two drops the leading 10 and pads two zeros on the right, giving
101000. Oring that against 110000 sets the second position as well, giving 111000. Complementing that
gives 000111. Each step feeds the next, so a mistake in the first operation propagates all the way
through, which is why it is worth writing each intermediate string on its own line.` },

{ id:"bs-30", kind:"problem", topic:"bit-string-flicking", level:"j",
  q:`What is RCIRC-4 applied to 10110000?`,
  choices:["00001011","00001101","10110000","00000101","None of the above"], ans:0,
  check:`flick('RCIRC-4 10110000')`,
  why:`Circulating right by four on an 8 bit string takes the last four bits, which are 0000, and
places them in front of the first four, which are 1011, giving 00001011. On a string of even length, a
circulate by half the length simply swaps the two halves, and recognizing that saves counting positions
one at a time.` },

{ id:"bs-31", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`Evaluate ~~~1001.`,
  choices:["0110","1001","1111","0000","None of the above"], ans:0,
  check:`flick('~~~1001')`,
  why:`Complements cancel in pairs, so a run of them reduces to a single complement when the
count is odd and to nothing at all when it is even. Three is odd, so this is just ~1001, which is 0110.
Counting the tildes before doing anything else turns what looks like three operations into one.` },

{ id:"bs-32", kind:"problem", topic:"bit-string-flicking", level:"s",
  q:`For how many 4 bit strings X does LCIRC-1 X equal RCIRC-1 X?`,
  choices:["4","2","1","16","None of the above"], ans:0,
  check:`str(len([x for x in ['{:04b}'.format(i) for i in range(16)] if flick('LCIRC-1 ' + x) == flick('RCIRC-1 ' + x)]))`,
  why:`Write X as abcd. Circulating left by one gives bcda and circulating right by one gives
dabc, and setting those equal position by position forces a to equal c and b to equal d. Both halves
are then free but must match, so there are 2 times 2 strings: 0000, 0101, 1010, and 1111. Read another
way, these are exactly the strings that a circulate by two leaves unchanged.` }

]);
