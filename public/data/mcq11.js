window.MCQ = (window.MCQ || []).concat([

{ id:"de-01", kind:"concept", topic:"digital-electronics", level:"b",
  q:`A NAND gate outputs 1 in which case?`,
  choices:["whenever at least one input is 0","only when both inputs are 1","only when both inputs are 0","whenever the inputs differ","None of the above"], ans:0,
  check:`"whenever at least one input is 0" if circuit("G1 = NAND A B") == 3 else "unverified"`,
  why:`NAND is an AND followed by an inversion, so it goes low only on the single row where both
inputs are high and stays high on the other three. The choice describing both inputs at 0 belongs to
NOR, and the one about differing inputs belongs to XOR, so all three are worth keeping distinct in
your head rather than reconstructing each time.` },

{ id:"de-02", kind:"problem", topic:"digital-electronics", level:"b",
  q:`Inputs A and B feed an AND gate, that output feeds a NOT gate, and the NOT output goes into
an OR gate with input C. For how many of the eight input combinations does the circuit output 1?`,
  choices:["7","5","4","6","None of the above"], ans:0,
  check:`str(circuit("G1 = AND A B, G2 = NOT G1, G3 = OR G2 C"))`,
  why:`The circuit is (AB)' + C, which DeMorgan turns into A' + B' + C. Written that way it
clearly fails only when A and B are both 1 while C is 0, and that is one row out of eight, leaving
seven that drive the output high. Simplifying before counting is considerably faster than filling in
the whole table row by row.` },

{ id:"de-03", kind:"problem", topic:"digital-electronics", level:"b",
  q:`How many of the four input combinations make a single XOR gate output 1?`,
  choices:["2","1","3","4","None of the above"], ans:0,
  check:`str(circuit("G1 = XOR A B"))`,
  why:`XOR is high exactly when the inputs differ, which happens on the rows 01 and 10, so two of
the four. It is worth noting that XOR and OR agree on three of those four rows and part company only
where both inputs are high, which is the single row that distinguishes them.` },

{ id:"de-04", kind:"problem", topic:"digital-electronics", level:"s",
  q:`A circuit computes A XOR B, then that result XOR C, then that result XOR D. For how many of
the sixteen input combinations does it output 1?`,
  choices:["9", "4", "12", "16", "None of the above"], ans:4,
  check:`str(circuit("G1 = XOR A B, G2 = XOR G1 C, G3 = XOR G2 D"))`,
  why:`A chain of XOR gates goes high exactly when an odd number of its inputs are high, so the
question becomes how many of the sixteen four bit combinations contain an odd number of ones, and that
is precisely half of them. This parity reading works for a chain of any length and spares you a
sixteen row table. Since 8 is not among the four choices offered, the answer is None of the above.` },

{ id:"de-05", kind:"problem", topic:"digital-electronics", level:"s",
  q:`Gate G1 is NOT A, gate G2 is NOT B, gate G3 is the AND of G1 and G2, and gate G4 is the OR of
G3 and C. For how many of the eight input combinations is the output 1?`,
  choices:["5","4","6","3","None of the above"], ans:0,
  check:`str(circuit("G1 = NOT A, G2 = NOT B, G3 = AND G1 G2, G4 = OR G3 C"))`,
  why:`The circuit is A'B' + C, which is true on all four rows where C is high, and true on one
further row where C is low with A and B both 0, giving 5 in all. Worth noticing along the way: A'B' is
the same as (A + B)', so what this diagram actually draws is a NOR gate feeding an OR gate.` },

{ id:"de-06", kind:"problem", topic:"digital-electronics", level:"s",
  q:`Gate G1 is the AND of A and B, gate G2 is the OR of C and D, and gate G3 is the NAND of G1
and G2. For how many of the sixteen input combinations is the output 1?`,
  choices:["13","3","12","4","None of the above"], ans:0,
  check:`str(circuit("G1 = AND A B, G2 = OR C D, G3 = NAND G1 G2"))`,
  why:`The output goes low only when both inputs to the NAND are high, which means A and B are
both 1 while at least one of C and D is 1. There is one way to satisfy the first condition and three
ways to satisfy the second, so 3 rows give a 0 and the remaining 13 give a 1. Counting the zeros
rather than the ones is nearly always less work when the final gate is a NAND.` },

{ id:"de-07", kind:"concept", topic:"digital-electronics", level:"b",
  q:`What does a small circle drawn on the output of a gate symbol mean?`,
  choices:["the output is complemented","the input is ignored","the gate is a buffer","the gate has three inputs","None of the above"], ans:0,
  why:`The circle, often called a bubble, always means inversion wherever it appears. On an
output it turns AND into NAND and OR into NOR, and on an input it means that signal is complemented
before entering the gate. Check which wire carries the bubble before evaluating that signal.` },

{ id:"de-08", kind:"problem", topic:"digital-electronics", level:"s",
  q:`Gate G1 is BUFFER A, gate G2 is NOT G1, and gate G3 is the XOR of G2 and A. What is the
output?`,
  choices:["always 1","always 0","A","A complemented","None of the above"], ans:0,
  check:`"always 1" if circuit("G1 = BUFFER A, G2 = NOT G1, G3 = XOR G2 A") == 2 else "unverified"`,
  why:`A buffer passes its input through untouched, so G1 is A and G2 is A complemented. The
exclusive or of a signal with its own complement is high on every row, since the two always differ, so
the circuit is a constant 1 regardless of the input. The buffer looks pointless in a diagram like this
one, but it exists in real circuits for timing reasons and ACSL includes it among the eight gates.` },

{ id:"de-09", kind:"problem", topic:"digital-electronics", level:"s",
  q:`Gate G1 is NOR A B, gate G2 is NOR C D, gate G3 is NOR G1 G2, and gate G4 is NOT G3. For how
many of the sixteen input combinations is the output 1?`,
  choices:["7","9","6","10","None of the above"], ans:0,
  check:`str(circuit("G1 = NOR A B, G2 = NOR C D, G3 = NOR G1 G2, G4 = NOT G3"))`,
  why:`Work outward one gate at a time. G1 is high only when A and B are both 0, and G2 is high
only when C and D are both 0. G3 is therefore high only when both of those are low, meaning at least
one of A and B is high and at least one of C and D is high, which is 3 times 3, or 9 rows. G4 inverts
that, leaving 16 minus 9.` },

{ id:"de-10", kind:"concept", topic:"digital-electronics", level:"b",
  q:`Which gate outputs 1 exactly when its two inputs are equal?`,
  choices:["XNOR","XOR","NAND","NOR","None of the above"], ans:0,
  check:`"XNOR" if circuit("G1 = XNOR A B") == 2 else "unverified"`,
  why:`XNOR is the complement of XOR, so it is high when the inputs agree and low when they
differ, which puts it high on the rows 00 and 11. Read another way it is the one bit equality test,
which is exactly why it turns up inside comparator circuits.` },

{ id:"de-11", kind:"problem", topic:"digital-electronics", level:"s",
  q:`Six inputs A through F feed three AND gates in pairs, and those three outputs are combined by
two OR gates. For how many of the 64 input combinations is the output 1?`,
  choices:["38", "27", "64", "32", "None of the above"], ans:4,
  check:`str(circuit("GA = AND A B, GB = AND C D, GC = AND E F, GD = OR GA GB, GE = OR GD GC"))`,
  why:`The circuit computes AB + CD + EF, which goes low only when none of the three pairs is
fully high. Each pair fails on 3 of its 4 combinations, so the failing rows number 3 times 3 times 3,
or 27, leaving 64 minus 27. Counting the complement rather than the successes is much less work here,
and that is generally true whenever the expression is an or of several terms. Since 37 is not among the
four choices offered, the answer is None of the above.` },

{ id:"de-12", kind:"concept", topic:"digital-electronics", level:"b",
  q:`Which single gate type can be wired to build every other gate?`,
  choices:["NAND","AND","OR","XOR","None of the above"], ans:0,
  why:`NAND on its own is functionally complete. Tying both of its inputs together produces a
NOT, and a NAND followed by that NOT produces an AND, and everything else follows from there. NOR is
functionally complete in the same way. Plain AND and OR are not, because neither can produce an
inversion, and without an inversion there is no way to build a NOT at all.` },

{ id:"de-13", kind:"problem", topic:"digital-electronics", level:"s",
  q:`Gate G1 is XNOR A B, gate G2 is XNOR C D, gate G3 is the AND of G1 and G2, gate G4 is NOT G3,
and gate G5 is the OR of G4 and E. For how many of the 32 input combinations is the output 1?`,
  choices:["28","24","16","20","None of the above"], ans:0,
  check:`str(circuit("G1 = XNOR A B, G2 = XNOR C D, G3 = AND G1 G2, G4 = NOT G3, G5 = OR G4 E"))`,
  why:`Whenever E is high the output is high, which accounts for 16 of the 32 rows. Among the 16
rows with E low, the output is whatever G4 gives, and G4 is high unless both XNOR gates fire. Each
XNOR fires on 2 of its 4 combinations, so both fire together on 2 times 2, or 4 rows, leaving G4 high
on the other 12. The total is 16 plus 12.` },

{ id:"de-14", kind:"concept", topic:"digital-electronics", level:"b",
  q:`A NOR gate has both of its inputs tied to the same signal A. What does it output?`,
  choices:["A complemented","A","always 0","always 1","None of the above"], ans:0,
  why:`NOR of A with A is (A + A)', and idempotence says A ored with itself is just A, so the
output is A complemented. Tying the two inputs of a NAND together gives exactly the same result. That
trick is the first step in building any other gate out of NAND or NOR alone, which is why it is worth
knowing rather than deriving.` },

{ id:"de-15", kind:"problem", topic:"digital-electronics", level:"s",
  q:`How many input combinations make the expression for a two input OR gate feeding a NOT gate
output 1?`,
  choices:["1","2","3","4","None of the above"], ans:0,
  check:`str(circuit("G1 = OR A B, G2 = NOT G1"))`,
  why:`An OR followed by a NOT is simply a NOR gate, which goes high only when both inputs are
low, so one row of the four. Recognising that pairing, along with an AND followed by a NOT being a
NAND, saves a step every time a diagram spells one of them out the long way.` },

{ id:"de-16", kind:"concept", topic:"digital-electronics", level:"s",
  q:`In a diagram, one gate output branches and feeds two different downstream gates. What is the
usual consequence of missing that branch while tracing?`,
  choices:["one downstream gate ends up with an undefined input","the circuit becomes a buffer","the output is inverted","nothing, since a branch carries the same value","None of the above"], ans:0,
  why:`A branch carries the same value to both destinations, and that is precisely why it is easy
to overlook, but following only one leg leaves the other gate with an input you never assigned. In
practice it shows up as a truth table with the wrong number of variables in it. The fix is entirely
mechanical: label every wire on the diagram before evaluating anything, then check that every gate
input carries a label.` },

{ id:"de-17", kind:"problem", topic:"digital-electronics", level:"b",
  q:`<figure class="diagram"><img src="/assets/diagrams/half-adder.svg" width="360" height="200" alt="A and B each feed both gates. The upper XOR gate outputs S, and the lower AND gate outputs C." loading="lazy"><figcaption><a href="https://commons.wikimedia.org/wiki/File:Half_Adder.svg">Inductiveload, SVG condensed by Aflafla1</a>. Public domain.</figcaption></figure>
<p>For A = 1 and B = 1, what are the outputs S and C, in that order?</p>`,
  choices:["0 1","1 0","1 1","0 0","None of the above"], ans:0,
  check:`str(int(bool_eval("AB'+A'B", {'A':1,'B':1}))) + ' ' + str(int(bool_eval('AB', {'A':1,'B':1})))`,
  why:`The upper gate is XOR, which outputs 0 when both inputs are 1. The lower gate is AND, which
outputs 1 for these inputs. Thus S = 0 and C = 1. The two gates share their inputs but have
separate outputs.` },

{ id:"de-18", kind:"problem", topic:"digital-electronics", level:"b",
  q:`<figure class="diagram"><img src="/assets/diagrams/half-adder.svg" width="360" height="200" alt="A and B each feed both gates. The upper XOR gate outputs S, and the lower AND gate outputs C." loading="lazy"><figcaption><a href="https://commons.wikimedia.org/wiki/File:Half_Adder.svg">Inductiveload, SVG condensed by Aflafla1</a>. Public domain.</figcaption></figure>
<p>Feed S and C into an additional OR gate. For how many input pairs (A, B) is that final output 1?</p>`,
  choices:["3","1","2","4","None of the above"], ans:0,
  check:`str(circuit('G1 = XOR A B, G2 = AND A B, G3 = OR G1 G2'))`,
  why:`For 00, both outputs are 0. For 01 and 10, S is 1 and C is 0. For 11, S is 0 and C is 1. Their OR
is therefore 1 on three of the four rows. The final output equals A OR B.` }

]);
