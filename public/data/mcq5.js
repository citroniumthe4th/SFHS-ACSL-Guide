window.MCQ = (window.MCQ || []).concat([

{ id:"bs-01", topic:"bit-string-flicking", level:"b",
  q:`Evaluate (LSHIFT-2 11010) | (RCIRC-3 01011).`,
  choices:["01101","01001","11101","01111","None of the above"], ans:0,
  check:`flick('(LSHIFT-2 11010) | (RCIRC-3 01011)')`,
  why:`LSHIFT-2 on 11010 drops the leading 11 and pads two zeros on the right, giving 01000.
RCIRC-3 on 01011 moves the trailing 011 around to the front, giving 01101. Now OR them column by
column: 01000 or 01101 is 01101.` },

{ id:"bs-02", topic:"bit-string-flicking", level:"b",
  q:`Evaluate 10110 | 01001 &amp; 11100.`,
  choices:["11110","11111","10110","01000","None of the above"], ans:0,
  check:`flick('10110 | 01001 & 11100')`,
  why:`AND binds tighter than OR, so this is 10110 | (01001 &amp; 11100). The AND gives 01000,
and then 10110 or 01000 is 11110. Reading left to right instead would give 11111, which is the
distractor that appears on nearly every version of this question.` },

{ id:"bs-03", topic:"bit-string-flicking", level:"b",
  q:`What is RCIRC-9 applied to 1011?`,
  choices:["1101","0101","1110","1011","None of the above"], ans:0,
  check:`flick('RCIRC-9 1011')`,
  why:`Reduce the count modulo the length first. The string has 4 bits, and 9 modulo 4 is 1, so
this is just RCIRC-1. Moving the trailing 1 around to the front gives 1101. Trying to circulate
nine places without reducing is where people lose track.` },

{ id:"bs-04", topic:"bit-string-flicking", level:"j",
  q:`What is LSHIFT-2 applied to 10110?`,
  choices:["11000","01011","11010","00101","None of the above"], ans:0,
  check:`flick('LSHIFT-2 10110')`,
  why:`A shift throws bits away. Drop the leading 10, leaving 110, then pad two zeros on the
right to keep the length at 5. The result is 11000. The distractor 11010 is LCIRC-2, where the
dropped bits wrap around instead of vanishing.` },

{ id:"bs-05", topic:"bit-string-flicking", level:"j",
  q:`What is RCIRC-2 applied to 10110?`,
  choices:["10101","00101","11010","01101","None of the above"], ans:0,
  check:`flick('RCIRC-2 10110')`,
  why:`Circulating right by 2 takes the last two bits, which are 10, and puts them in front of
the remaining 101. That gives 10101. Compare with RSHIFT-2, which would discard those two bits
and pad with zeros to give 00101.` },

{ id:"bs-06", topic:"bit-string-flicking", level:"s",
  q:`Evaluate ~(11010 &amp; 01110).`,
  choices:["10101","01010","11110","00101","None of the above"], ans:0,
  check:`flick('~(11010 & 01110)')`,
  why:`Do the AND first because the parentheses say so: 11010 and 01110 agree on a 1 only in the
second and third positions, giving 01010. Complementing that gives 10101. DeMorgan gives the
same answer the other way, since ~(X and Y) equals ~X or ~Y, which is 00101 or 10001.` },

{ id:"bs-07", topic:"bit-string-flicking", level:"s",
  q:`Evaluate (LCIRC-4 10110) ^ (RSHIFT-1 10110).`,
  choices:["00000","10101","01011","11111","None of the above"], ans:0,
  check:`flick('LCIRC-4 10110 ^ RSHIFT-1 10110')`,
  why:`LCIRC-4 on a 5 bit string moves the leading 1011 to the back, giving 01011. RSHIFT-1
drops the trailing 0 and pads a zero in front, which also gives 01011. The two sides happen to
agree, and anything exclusive-ored with itself is all zeros. This one rewards evaluating both
operands fully before touching the XOR, since the shortcut only appears once you have written
them down side by side.` },

{ id:"bs-08", topic:"bit-string-flicking", level:"s",
  q:`How many 5 bit strings X satisfy (X &amp; 10110) equal to 10110?`,
  choices:["5", "1", "8", "2", "None of the above"], ans:4,
  check:`str(len([x for x in ['{:05b}'.format(i) for i in range(32)] if flick(x + ' & 10110') == '10110']))`,
  why:`An AND can only turn bits off, so a 1 in the result forces a 1 in X at that position.
That pins positions 1, 3, and 4 to 1. The other two positions are anded with 0, which gives 0
no matter what X holds, so both are free. Two free positions means 2 squared, which is 4. The value 4 is not among the four choices offered, so the answer is None of the above.` },

{ id:"bs-09", topic:"bit-string-flicking", level:"s",
  q:`How many 4 bit strings X satisfy (X | 1010) equal to 1110?`,
  choices:["4","2","1","8","None of the above"], ans:0,
  check:`str(len([x for x in ['{:04b}'.format(i) for i in range(16)] if flick(x + ' | 1010') == '1110']))`,
  why:`Work position by position, left to right, comparing the mask 1010 with the required
result 1110. Where the mask is 1 and the result is 1, the OR is already satisfied and X is free.
That covers positions 1 and 3. Where the mask is 0, X alone decides the result, so position 2
must be 1 and position 4 must be 0. Two free positions gives 2 squared, which is 4. Had any
position needed a 0 in the result where the mask holds a 1, there would be no solutions at
all.` },

{ id:"bs-10", topic:"bit-string-flicking", level:"b",
  q:`Evaluate ~~1100 ^ 1010.`,
  choices:["0110","1001","1110","0000","None of the above"], ans:0,
  check:`flick('~~1100 ^ 1010')`,
  why:`A double complement cancels, so ~~1100 is just 1100. Then XOR with 1010 gives a 1 wherever
the bits differ: the first bits agree, the second differ, the third differ, and the fourth agree.
The result is 0110.` },

{ id:"bs-11", topic:"bit-string-flicking", level:"b",
  q:`Which single operation has the same effect as XOR with a string of all 1s?`,
  choices:["complement with ~","LCIRC by the length","AND with all 1s","OR with all 0s","None of the above"], ans:0,
  why:`XOR gives 1 exactly when the two bits differ. Against a 1, every bit differs from itself
inverted, so every position flips. That is the definition of the complement. The other three
options all leave the string unchanged, which makes them useful for the opposite reason: they
are the identity operations to recognize and skip.` },

{ id:"bs-12", topic:"bit-string-flicking", level:"s",
  q:`Evaluate (11110000 | 00001111) &amp; ~10101010.`,
  choices:["01010101","10101010","11111111","00000000","None of the above"], ans:0,
  check:`flick('(11110000 | 00001111) & ~10101010')`,
  why:`The OR of 11110000 and 00001111 is 11111111, since between them the two strings cover
every position. The complement of 10101010 is 01010101. Anding all ones with anything returns
that thing, so the answer is 01010101.` },

{ id:"bs-13", topic:"bit-string-flicking", level:"j",
  q:`Start with 10110 and apply LCIRC-2, then XOR-11111, then RSHIFT-1. What is the result?`,
  choices:["00010","00101","11010","10100","None of the above"], ans:0,
  check:`mask_run('10110', ['LCIRC-2','XOR-11111','RSHIFT-1'])`,
  why:`LCIRC-2 moves the leading 10 to the back, giving 11010. XOR with all ones flips every
bit, giving 00101. RSHIFT-1 drops the trailing 1 and pads a zero in front, giving 00010. Apply
the operations strictly in order and hand each result to the next step.` },

{ id:"bs-14", topic:"bit-string-flicking", level:"s",
  q:`Evaluate 1010 ^ 0110 ^ 1111 | 0001.`,
  choices:["0011","0010","1111","0001","None of the above"], ans:0,
  check:`flick('1010 ^ 0110 ^ 1111 | 0001')`,
  why:`XOR binds tighter than OR, so the two XORs happen first and left to right. 1010 xor 0110
is 1100, and 1100 xor 1111 is 0011. Then 0011 or 0001 is 0011. Note that ORing with 0001 changed
nothing here, since that bit was already set.` },

{ id:"bs-15", topic:"bit-string-flicking", level:"s",
  q:`Evaluate RCIRC-1 LCIRC-1 1101101.`,
  choices:["1101101","1011011","0110110","1110110","None of the above"], ans:0,
  check:`flick('RCIRC-1 LCIRC-1 1101101')`,
  why:`Unary operators associate right to left, so LCIRC-1 applies first and RCIRC-1 applies to
its result. Circulating left by 1 and then right by 1 undoes itself, so the string comes back
unchanged. This is worth recognizing on sight, because the arithmetic version takes twice as
long and gives twice as many chances to slip.` },

{ id:"bs-16", topic:"bit-string-flicking", level:"s",
  q:`Evaluate ~(LSHIFT-1 (RSHIFT-1 111000111000)).`,
  choices:["000111000111","111000111001","011100011100","111000111000","None of the above"], ans:0,
  check:`flick('~(LSHIFT-1 (RSHIFT-1 111000111000))')`,
  why:`RSHIFT-1 drops the trailing 0 and pads a zero in front, giving 011100011100. LSHIFT-1
then drops that leading 0 and pads a zero at the end, giving 111000111000, which is the original
string. That happens because the bits lost at each end were both zeros. Complementing gives
000111000111. A shift followed by the opposite shift only restores the string when the discarded
bits were zeros, so check them before assuming the pair cancels.` }

]);
