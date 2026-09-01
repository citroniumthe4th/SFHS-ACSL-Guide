window.MCQ = (window.MCQ || []).concat([

{ id:"de-01", topic:"digital-electronics", level:"b",
  q:`A NAND gate outputs 1 in which case?`,
  choices:["whenever at least one input is 0","only when both inputs are 1","only when both inputs are 0","whenever the inputs differ","None of the above"], ans:0,
  check:`CHOICES[0] if circuit("G1 = NAND A B") == 3 else "unverified"`,
  why:`NAND is AND followed by an inversion, so it is 0 only on the single row where both inputs
are 1 and it is 1 on the other three. The distractor about both inputs being 0 describes NOR, and
the one about differing inputs describes XOR.` },

{ id:"de-02", topic:"digital-electronics", level:"b",
  q:`Inputs A and B feed an AND gate, that output feeds a NOT gate, and the NOT output goes into
an OR gate with input C. For how many of the eight input combinations does the circuit output 1?`,
  choices:["7","5","4","6","None of the above"], ans:0,
  check:`str(circuit("G1 = AND A B, G2 = NOT G1, G3 = OR G2 C"))`,
  why:`The expression is (AB)' + C. By DeMorgan that is A' + B' + C, which fails only when A and
B are both 1 and C is 0. That is one row out of eight, so seven rows give a 1. Simplifying first
is much faster than filling in the whole table.` },

{ id:"de-03", topic:"digital-electronics", level:"b",
  q:`How many of the four input combinations make a single XOR gate output 1?`,
  choices:["2","1","3","4","None of the above"], ans:0,
  check:`str(circuit("G1 = XOR A B"))`,
  why:`XOR is 1 exactly when the inputs differ, which happens on the rows 01 and 10. That is two
of the four. XOR and OR agree on three of the four rows and differ only where both inputs are 1,
which is the single row that separates them.` },

{ id:"de-04", topic:"digital-electronics", level:"s",
  q:`A circuit computes A XOR B, then that result XOR C, then that result XOR D. For how many of
the sixteen input combinations does it output 1?`,
  choices:["9", "4", "12", "16", "None of the above"], ans:4,
  check:`str(circuit("G1 = XOR A B, G2 = XOR G1 C, G3 = XOR G2 D"))`,
  why:`A chain of XOR gates outputs 1 exactly when an odd number of its inputs are 1. Among the
sixteen combinations of four bits, exactly half have an odd number of ones, which is 8. This
parity reading works for any length of chain and saves you from a sixteen row table. The value 8 is not among the four choices offered, so the answer is None of the above.` },

{ id:"de-05", topic:"digital-electronics", level:"s",
  q:`Gate G1 is NOT A, gate G2 is NOT B, gate G3 is the AND of G1 and G2, and gate G4 is the OR of
G3 and C. For how many of the eight input combinations is the output 1?`,
  choices:["5","4","6","3","None of the above"], ans:0,
  check:`str(circuit("G1 = NOT A, G2 = NOT B, G3 = AND G1 G2, G4 = OR G3 C"))`,
  why:`The expression is A'B' + C. It is true on all four rows where C is 1. Among the four rows
where C is 0, it also holds when A and B are both 0, which is one more. So the count is 5. Notice
that A'B' equals (A + B)', so this circuit is a NOR gate feeding an OR gate.` },

{ id:"de-06", topic:"digital-electronics", level:"s",
  q:`Gate G1 is the AND of A and B, gate G2 is the OR of C and D, and gate G3 is the NAND of G1
and G2. For how many of the sixteen input combinations is the output 1?`,
  choices:["13","3","12","4","None of the above"], ans:0,
  check:`str(circuit("G1 = AND A B, G2 = OR C D, G3 = NAND G1 G2"))`,
  why:`The output is 0 only when both inputs to the NAND are 1, meaning A and B are both 1 and at
least one of C and D is 1. There is one way for AB and three ways for C or D, so 3 rows give a 0
and the other 13 give a 1. Counting the zeros is easier than counting the ones whenever the final
gate is a NAND.` },

{ id:"de-07", topic:"digital-electronics", level:"b",
  q:`What does a small circle drawn on the output of a gate symbol mean?`,
  choices:["the output is complemented","the input is ignored","the gate is a buffer","the gate has three inputs","None of the above"], ans:0,
  why:`The circle, sometimes called a bubble, always means inversion. On an output it turns AND
into NAND and OR into NOR. On an input it means that signal is complemented before it enters the
gate. Missing a bubble is the most common way to misread a circuit diagram, so scan for them
before you start labeling wires.` },

{ id:"de-08", topic:"digital-electronics", level:"s",
  q:`Gate G1 is BUFFER A, gate G2 is NOT G1, and gate G3 is the XOR of G2 and A. What is the
output?`,
  choices:["always 1","always 0","A","A complemented","None of the above"], ans:0,
  check:`CHOICES[0] if circuit("G1 = BUFFER A, G2 = NOT G1, G3 = XOR G2 A") == 2 else "unverified"`,
  why:`A buffer passes its input through unchanged, so G1 is A and G2 is A complemented. XOR of A
with its own complement is always 1, since the two always differ. There are two input rows, both
give 1, so the circuit is a constant. The buffer looks pointless but it appears in real diagrams
for timing reasons and ACSL includes it in the gate list.` },

{ id:"de-09", topic:"digital-electronics", level:"s",
  q:`Gate G1 is NOR A B, gate G2 is NOR C D, gate G3 is NOR G1 G2, and gate G4 is NOT G3. For how
many of the sixteen input combinations is the output 1?`,
  choices:["7","9","6","10","None of the above"], ans:0,
  check:`str(circuit("G1 = NOR A B, G2 = NOR C D, G3 = NOR G1 G2, G4 = NOT G3"))`,
  why:`Work outward. G1 is 1 only when A and B are both 0, and G2 is 1 only when C and D are both
0. G3 is 1 only when both G1 and G2 are 0, meaning at least one of A and B is 1 and at least one
of C and D is 1. That is 3 times 3, which is 9 rows. G4 inverts it, so the answer is 16 minus 9,
which is 7.` },

{ id:"de-10", topic:"digital-electronics", level:"b",
  q:`Which gate outputs 1 exactly when its two inputs are equal?`,
  choices:["XNOR","XOR","NAND","NOR","None of the above"], ans:0,
  check:`CHOICES[0] if circuit("G1 = XNOR A B") == 2 else "unverified"`,
  why:`XNOR is the complement of XOR, so it is 1 when the inputs agree and 0 when they differ.
That means it is 1 on the rows 00 and 11. It is also the one bit equality test, which is why it
turns up inside comparator circuits.` },

{ id:"de-11", topic:"digital-electronics", level:"s",
  q:`Six inputs A through F feed three AND gates in pairs, and those three outputs are combined by
two OR gates. For how many of the 64 input combinations is the output 1?`,
  choices:["38", "27", "64", "32", "None of the above"], ans:4,
  check:`str(circuit("GA = AND A B, GB = AND C D, GC = AND E F, GD = OR GA GB, GE = OR GD GC"))`,
  why:`The expression is AB + CD + EF. It is 0 only when none of the three pairs is both 1. Each
pair fails on 3 of its 4 combinations, so the failing rows number 3 times 3 times 3, which is 27.
That leaves 64 minus 27, or 37. Counting the complement is much less work than counting the
successes directly. The value 37 is not among the four choices offered, so the answer is None of the above.` },

{ id:"de-12", topic:"digital-electronics", level:"b",
  q:`Which single gate type can be wired to build every other gate?`,
  choices:["NAND","AND","OR","XOR","None of the above"], ans:0,
  why:`NAND alone is functionally complete. Tying both of its inputs together makes a NOT gate,
and a NAND followed by that NOT makes an AND, and so on for the rest. NOR is functionally complete
in the same way. Plain AND and OR are not, because neither can produce an inversion, and without
inversion you can never build NOT.` },

{ id:"de-13", topic:"digital-electronics", level:"s",
  q:`Gate G1 is XNOR A B, gate G2 is XNOR C D, gate G3 is the AND of G1 and G2, gate G4 is NOT G3,
and gate G5 is the OR of G4 and E. For how many of the 32 input combinations is the output 1?`,
  choices:["28","24","16","20","None of the above"], ans:0,
  check:`str(circuit("G1 = XNOR A B, G2 = XNOR C D, G3 = AND G1 G2, G4 = NOT G3, G5 = OR G4 E"))`,
  why:`Whenever E is 1 the output is 1, which is 16 rows. Among the 16 rows with E at 0, the
output is G4, which is 1 unless both XNOR gates fire. Each XNOR fires on 2 of its 4 combinations,
so both fire on 2 times 2, which is 4 rows, and G4 is 1 on the other 12. Total 16 plus 12, which
is 28.` },

{ id:"de-14", topic:"digital-electronics", level:"b",
  q:`A NOR gate has both of its inputs tied to the same signal A. What does it output?`,
  choices:["A complemented","A","always 0","always 1","None of the above"], ans:0,
  why:`NOR of A with A is (A + A)', and A ored with itself is just A by idempotence, so the output
is A complemented. Tying the inputs of a NAND together gives the same result. That trick is the
first step in building any gate out of NAND or NOR alone.` },

{ id:"de-15", topic:"digital-electronics", level:"s",
  q:`How many input combinations make the expression for a two input OR gate feeding a NOT gate
output 1?`,
  choices:["1","2","3","4","None of the above"], ans:0,
  check:`str(circuit("G1 = OR A B, G2 = NOT G1"))`,
  why:`That combination is a NOR gate, which is 1 only when both inputs are 0. One row out of
four. Recognizing that an OR followed by a NOT is just NOR, and an AND followed by a NOT is just
NAND, saves a step every time a diagram spells them out the long way.` },

{ id:"de-16", topic:"digital-electronics", level:"s",
  q:`In a diagram, one gate output branches and feeds two different downstream gates. What is the
usual consequence of missing that branch while tracing?`,
  choices:["one downstream gate ends up with an undefined input","the circuit becomes a buffer","the output is inverted","nothing, since a branch carries the same value","None of the above"], ans:0,
  why:`A branch carries the same value to both destinations, which is exactly why it is easy to
overlook, but if you follow only one leg then the other gate has an input you never assigned. In
practice that shows up as a truth table with the wrong number of variables. The fix is mechanical:
label every wire on the diagram before evaluating anything, and check that every gate input has a
label.` }

]);
