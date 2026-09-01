// Topic list, straight from the contest schedule on acsl.org.
// Junior and Senior share eight categories. Where they differ, Junior splits
// What Does This Program Do into four flavors while Senior picks up LISP,
// FSAs and Regular Expressions, and Assembly Language.
window.TOPICS = [
  { id: "number-systems", name: "Computer Number Systems", contest: 1, div: "both",
    blurb: "Binary, octal, and hexadecimal. Converting between bases and doing arithmetic inside them." },
  { id: "recursive-functions", name: "Recursive Functions", contest: 1, div: "both",
    blurb: "Evaluating functions defined in terms of themselves, by hand, without losing the thread." },
  { id: "wdtpd", name: "What Does This Program Do?", contest: 1, div: "senior",
    blurb: "Trace pseudocode and report what it leaves behind." },
  { id: "wdtpd-branching", name: "What Does This Program Do? - Branching", contest: 1, div: "junior",
    blurb: "Tracing IF, THEN, and ELSE, including the nested ones." },

  { id: "prefix-postfix", name: "Prefix/Infix/Postfix Notation", contest: 2, div: "both",
    blurb: "Three ways to write the same expression, and how to move between them." },
  { id: "bit-string-flicking", name: "Bit-String Flicking", contest: 2, div: "both",
    blurb: "NOT, AND, OR, XOR, shifts, and circulates, with a precedence table that matters." },
  { id: "lisp", name: "LISP", contest: 2, div: "senior",
    blurb: "Evaluating S-expressions innermost first, plus the list surgery functions." },
  { id: "wdtpd-looping", name: "What Does This Program Do? - Looping", contest: 2, div: "junior",
    blurb: "FOR and WHILE loops, STEP values, and counting iterations correctly." },

  { id: "boolean-algebra", name: "Boolean Algebra", contest: 3, div: "both",
    blurb: "The laws, DeMorgan, and simplifying an expression down to the fewest operators." },
  { id: "data-structures", name: "Data Structures", contest: 3, div: "both",
    blurb: "Stacks, queues, binary search trees, priority queues, and the three traversals." },
  { id: "fsa-regex", name: "FSAs and Regular Expressions", contest: 3, div: "senior",
    blurb: "State machines, the patterns they accept, and translating between the two." },
  { id: "wdtpd-arrays", name: "What Does This Program Do? - Arrays", contest: 3, div: "junior",
    blurb: "One and two dimensional arrays, subscripts, and off by one traps." },

  { id: "graph-theory", name: "Graph Theory", contest: 4, div: "both",
    blurb: "Vertices, edges, adjacency matrices, and counting paths with matrix powers." },
  { id: "digital-electronics", name: "Digital Electronics", contest: 4, div: "both",
    blurb: "The eight gates, reading a circuit diagram, and counting the inputs that fire it." },
  { id: "assembly", name: "Assembly Language Programming", contest: 4, div: "senior",
    blurb: "The ACSL instruction set, one accumulator, and hand tracing a loop." },
  { id: "wdtpd-strings", name: "What Does This Program Do? - Strings", contest: 4, div: "junior",
    blurb: "Indexing, slicing, concatenation, and building a string one character at a time." },

];
