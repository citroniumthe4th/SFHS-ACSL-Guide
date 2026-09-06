"""Two progressively more specific hints per programming problem. Plain text only."""
HINTS = {
    "digit-chain": [
        "A chain can stop at 1 or at a value it has visited before. What must you remember between replacements?",
        "Store the starting value in a set. Count a replacement before testing its result, but return 0 immediately if the start is 1.",
    ],
    "locker-hallway": [
        "Which students touch locker 12? Relate their numbers to the divisors of 12.",
        "A locker stays open after an odd number of toggles. Divisors pair up except when a divisor is the square root of the locker number.",
    ],
    "elevator-trips": [
        "You cannot reorder the queue. Track the current load as you read each weight.",
        "Start a new trip when adding the next person would exceed the limit. Count the last occupied trip after the loop, too.",
    ],
    "spiral-word": [
        "After reading the outside ring, the remaining letters form a smaller rectangle.",
        "Track top, bottom, left, and right boundaries. Recheck them before traversing the bottom and left sides so a center row or column is not read twice.",
    ],
    "roman-addition": [
        "Convert both inputs to integers first. When should a Roman symbol subtract rather than add?",
        "For the output, try values from largest to smallest. Include the six subtractive pairs, such as CM for 900, in that table.",
    ],
    "change-machine": [
        "Follow the machine's greedy rule even when another combination of coins could work.",
        "For each denomination, integer division gives the count and the remainder gives the unpaid amount. Keep zero counts in the output.",
    ],
    "stamp-combinations": [
        "Let ways[k] count combinations totaling k. There is one way to make zero: select no stamps.",
        "Process one stamp value at a time. For that value, update totals upward using ways[k - value]. This allows repeated stamps without counting different orders separately.",
    ],
    "expression-target": [
        "There are only three choices in each gap. Can you try every combination while keeping a running value?",
        "Recurse on the next digit with three updated values: add, subtract, or multiply. Evaluate left to right, as the statement requires, and check the target only after the last digit.",
    ],
    "maze-routes": [
        "A route into an open square must come from immediately above it or immediately to its left.",
        "Add those two route counts for each open square. Blocked squares get zero. Initialize the start to one only if it is open.",
    ],
    "number-safari": [
        "Generate each adjacent substring of length 2, 3, or 4 before testing its properties. Reject substrings that begin with zero.",
        "Write a separate predicate for each number category. A candidate can satisfy several predicates, so do not use an else-if chain between categories.",
    ],
    "knight-moves": [
        "All legal moves have the same cost. Explore squares one move away, then two moves away, and so on.",
        "Use a queue for breadth-first search with the eight knight offsets. Record a square's distance when first adding it, and discard destinations outside the board.",
    ],
    "shuffle-cycles": [
        "Label each card by its original position so you can recognize the original order after a shuffle.",
        "Interleave the two halves into a new deck, count that shuffle, then compare with the initial deck. The initial unshuffled state should not count as the answer.",
    ],
    "bowling-night": [
        "Keep a roll index separate from the frame number. A strike uses fewer rolls than an ordinary frame.",
        "For each of ten frames, add the frame's pins and any bonus from the next rolls. Bonus rolls can contribute to an earlier frame without advancing its roll index.",
    ],
    "hot-potato": [
        "The current holder is word one. How far forward is the child eliminated after K words?",
        "With m children left, remove index (current + K - 1) modulo m. The next child now occupies that index, wrapping to zero if necessary.",
    ],
    "salvo": [
        "Associate each occupied square with its ship, and remember which squares have already been hit.",
        "Maintain an undamaged-square count for each ship. Decrease it only on a new hit. A hit is S when that count reaches zero, while repeated shots are M.",
    ],
    "chutes-race": [
        "Track both positions and whose turn it is. A roll that overshoots 100 still consumes a turn.",
        "After a legal move, look up one ladder or slide destination. Apply that transfer once, then check for a win before switching players.",
    ],
    "yahtzee-roll": [
        "Count occurrences of each face and collect the distinct faces. Those two views answer different category tests.",
        "Score every qualifying category, then keep the highest score. Process categories in the stated priority order and replace the winner only for a strictly larger score.",
    ],
    "traffic-lights": [
        "Arrival time includes both driving and all earlier waits. Each light repeats after green + red seconds.",
        "Take arrival time modulo the cycle length. A phase below the green duration passes through. Otherwise, wait for the remainder of the cycle and carry that delay forward.",
    ],
    "card-war": [
        "Each deck is a queue: cards leave from the front and won cards join the back.",
        "Append the winner's own card before the loser's card, and discard ties. Check both decks after each round so simultaneous empty decks produce a draw.",
    ],
    "robot-vacuum": [
        "Position and direction are separate state. A blocked step changes only the direction.",
        "Use four direction offsets in clockwise order. Track cleaned positions in a set starting with R, and count a turn as one step without moving.",
    ],
    "mancala-move": [
        "Empty the selected pit first. Advance around the board while skipping the opponent's store without consuming a stone.",
        "Remember the final hollow. A capture requires your own pit to contain exactly one stone after sowing and its opposite to be nonempty. Landing in your store instead earns a free turn.",
    ],
    "minesweeper-click": [
        "Separate counting neighboring mines from deciding whether the opening should spread.",
        "Use a queue and a visited set. Reveal each safe square, but add its neighbors only when its mine count is zero. Numbered boundary squares open without spreading further.",
    ],
    "rotor-cipher": [
        "The wheels turn before encoding a capital letter. Other characters neither change nor turn the wheels.",
        "Represent wheel positions as 0 through 25. Carry to the next wheel only when a wheel wraps to zero, then use the sum of the updated positions as the letter shift.",
    ],
    "tetris-drop": [
        "Column heights help place a bar, but they cannot represent the holes under a horizontal bar.",
        "Keep the filled cells by row. Place each piece above the tallest column it spans, then remove every full row together and rebuild the remaining rows in order.",
    ],
    "stair-hops": [
        "What was the very last move of a climb? There are only two possibilities.",
        "The count for N is the count for N-1 plus the count for N-2. Both 0 steps and 1 step have exactly one climb. Use a loop, not plain recursion.",
    ],
    "digit-persistence": [
        "The loop should keep going while the value has more than one digit. What test is that?",
        "Repeat while the value is 10 or more. Take the product with modulo 10 and integer division, and do not skip zero digits.",
    ],
    "base-parade": [
        "You never need to build the converted string. What do you actually need from it?",
        "Tally sixteen counters indexed by digit value while dividing down by the base. Sweep the tally from 15 downward so ties go to the larger digit.",
    ],
    "bus-route": [
        "The order of the two operations at each stop is given in the statement. Which one comes first?",
        "Subtract those getting off before adding those boarding. Start the best load below zero so the first stop always sets it, and update only on a strictly larger load.",
    ],
    "bracket-depth": [
        "Which bracket does a closing bracket have to match? Only one is a candidate at any moment.",
        "Push openers on a stack and pop on a closer, checking the stack is not empty first. After the loop, anything still on the stack means the string was unbalanced.",
    ],
    "skip-counting": [
        "Record where you are before hopping, or the loop stops immediately.",
        "Add the stride and take the result modulo the track size. Count the slot, hop, then test for slot 0. The tour always closes within one lap of distinct slots.",
    ],
    "seat-map": [
        "Splitting the line at the semicolons gives you the rows. What do you need from each one?",
        "Count the full stops per row, keeping the best count and its row number. Update only on a strictly larger count so ties go to the earlier row.",
    ],
    "hot-streak": [
        "You need two lengths at once: the streak you are in and the best you have seen.",
        "Reset the current length to 1 whenever a value is not strictly larger than the one before it. Record the ending value at the same moment you record a new best.",
    ],
    "magic-square": [
        "There are four things to check, not two. Which ones are easy to forget?",
        "Take the target from the first row, then check every row, every column, and both diagonals. The columns need the two subscripts swapped relative to the rows.",
    ],
    "run-length": [
        "Advance past a whole run at a time rather than one character at a time.",
        "From position i, run j forward while the character matches, then write the letter and j minus i. Setting i to j means there is no final run left to flush.",
    ],
    "acronym-maker": [
        "The rule is 4 or more letters. Which words in the samples sit right on that line?",
        "Take the first letter of each word of length 4 or more and uppercase it. Decide on NONE after the whole phrase has been read, not during it.",
    ],
    "word-search-row": [
        "Where is the last position at which the word could still start?",
        "Loop while i plus the word length is at most the row length, comparing at every position. Never skip forward past a match, or overlaps go uncounted.",
    ],
    "collatz-peak": [
        "Where should the running maximum start? Think about a chain that only goes down.",
        "Seed the maximum with the starting value, and hold the running value in a 64 bit integer. Chains under a million pass twenty million on the way.",
    ],
    "divisor-champion": [
        "Divisors come in pairs. How far do you actually have to search for one of each pair?",
        "Loop d while d*d <= n, adding 2 per divisor found and 1 when d*d equals n. Update the best only on a strictly larger count so ties go to the smallest number.",
    ],
    "base-palindrome": [
        "One palindrome test, used twice with a different base. What does it need as a parameter?",
        "Peel digits with modulo and integer division and compare the sequence against its reverse. The order they come off in does not matter. Start the search strictly above the input.",
    ],
    "postfix-machine": [
        "Which of the two popped values is the left operand? It matters for two of the four operators.",
        "The value popped first is the right operand. Check the stack holds two values before popping and the divisor is nonzero before dividing, and check for exactly one value left after the loop.",
    ],
    "gray-code": [
        "The value is one expression. The formatting is the part that takes work.",
        "The entry is index XOR (index >> 1). Write it out bit by bit from the highest position down so the leading zeros appear and the length is right.",
    ],
    "circulate-cycle": [
        "An amount larger than the string is not impossible. What does a circulate by the length do?",
        "Reduce the amount modulo the length first. Record the current string, apply the circulate, then test for the original, so the loop does not stop before it starts.",
    ],
    "bst-traversal": [
        "ACSL sends a value equal to the node it is compared against to the left. What does that do to duplicates?",
        "Hold the tree in parallel arrays with -1 for a missing child. On a two child deletion, promote the left child and hang the right subtree on its rightmost descendant.",
    ],
    "expression-height": [
        "You do not need the tree itself, only how deep it would be.",
        "Convert to postfix with the shunting yard, then walk it with a stack of heights: a letter pushes 0 and an operator pushes one more than the larger of the two it pops.",
    ],
    "priority-desk": [
        "Two people can share a priority. What extra piece of information settles which one goes first?",
        "Store an arrival counter alongside each person. Scan for the smallest priority, breaking ties on the smaller arrival number, and handle an empty room and an empty output separately.",
    ],
    "shortest-hops": [
        "Which search order guarantees you reach a vertex by its shortest route first?",
        "Breadth first search with a queue. Record every edge in both directions, and stop as soon as the target is first marked. An empty queue means -1.",
    ],
    "gate-network": [
        "How do you tell a circuit input from a gate name when both appear in the same position?",
        "A circuit input is a single character that is not a gate name. Enumerate the input combinations with a counter, evaluate the gates in the order given, and take the last gate's value.",
    ],
    "path-counter": [
        "The kth power of the adjacency matrix is the textbook answer, but you only need one row of it.",
        "Carry a vector holding a 1 at the starting vertex and multiply it by the matrix once per unit of length. A length of 0 needs no special case.",
    ],
}
