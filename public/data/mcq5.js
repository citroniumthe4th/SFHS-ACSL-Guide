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
