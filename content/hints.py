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
        "Label each card by its original position so you can recognise the original order after a shuffle.",
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
        "Separate counting neighbouring mines from deciding whether the opening should spread.",
        "Use a queue and a visited set. Reveal each safe square, but add its neighbours only when its mine count is zero. Numbered boundary squares open without spreading further.",
    ],
    "rotor-cipher": [
        "The wheels turn before encoding a capital letter. Other characters neither change nor turn the wheels.",
        "Represent wheel positions as 0 through 25. Carry to the next wheel only when a wheel wraps to zero, then use the sum of the updated positions as the letter shift.",
    ],
    "tetris-drop": [
        "Column heights help place a bar, but they cannot represent the holes under a horizontal bar.",
        "Keep the filled cells by row. Place each piece above the tallest column it spans, then remove every full row together and rebuild the remaining rows in order.",
    ],
}
