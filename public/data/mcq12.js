window.MCQ = (window.MCQ || []).concat([

{ id:"as-01", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>A   DC    5
B   DC    3
    LOAD  A
    MULT  B
    STORE C
    PRINT C
    END</code></pre>What is printed?`,
  choices:["15","8","2","53","None of the above"], ans:0,
  check:`machine("A DC 5; B DC 3; LOAD A; MULT B; STORE C; PRINT C; END#")`,
  why:`The two DC lines set their constants up before the program begins running, so by the time
execution starts A holds 5 and B holds 3. LOAD then puts 5 in the accumulator, MULT multiplies it by
the contents of B, and STORE copies the resulting 15 into C. DC is a directive rather than an executed
instruction, which is why it never disturbs the accumulator.` },

{ id:"as-02", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    LOAD  =20
    DIV   =6
    STORE Q
    PRINT Q
    END</code></pre>What is printed?`,
  choices:["3","3.33","4","2","None of the above"], ans:0,
  check:`machine("LOAD =20; DIV =6; STORE Q; PRINT Q; END#")`,
  why:`The equals sign marks an immediate value, so both operands here are literal numbers rather
than names of memory words. DIV keeps the signed integer part, so 20 divided by 6 is 3 and the
remainder is simply discarded. There is no floating point anywhere on this machine.` },

{ id:"as-03", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    LOAD  =7
    MULT  =-3
    STORE X
    PRINT X
    DIV   =2
    STORE Y
    PRINT Y
    END</code></pre>What is printed?`,
  choices:["-21 -10","-21 -11","-21 -10.5","21 10","None of the above"], ans:0,
  check:`machine("LOAD =7; MULT =-3; STORE X; PRINT X; DIV =2; STORE Y; PRINT Y; END#")`,
  why:`7 times -3 is -21, which is stored and printed. The accumulator still holds -21 at that
point, so the DIV that follows divides it by 2. The signed integer part of -10.5 truncates toward
zero, giving -10 rather than -11. Flooring would give -11, which is what Python does by default and
what the ACSL rule specifically does not.` },

{ id:"as-04", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  N
    LOAD  N
    SUB   =3
    BG    BIG
    PRINT N
    BU    DONE
BIG LOAD  =99
    STORE N
    PRINT N
DONE END</code></pre>The input value is 10. What is printed?`,
  choices:["99","10","3","7","None of the above"], ans:0,
  check:`machine("READ N; LOAD N; SUB =3; BG BIG; PRINT N; BU DONE; BIG LOAD =99; STORE N; PRINT N; DONE END#10")`,
  why:`There is no compare instruction on this machine, so a comparison is made by subtracting
and then testing the sign of what is left. Here 10 minus 3 is 7, which is greater than 0, so BG jumps
to BIG, and that block overwrites N with 99 and prints it. The unconditional BU exists purely to skip
the BIG block when the branch does not fire, and leaving it out is one of the classic bugs in this
language.` },

{ id:"as-05", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  N
    LOAD  =1
    STORE F
TOP LOAD  N
    BE    OUT
    LOAD  F
    MULT  N
    STORE F
    LOAD  N
    SUB   =1
    STORE N
    BU    TOP
OUT PRINT F
    END</code></pre>The input value is 6. What is printed?`,
  choices:["720","120","6","5040","None of the above"], ans:0,
  check:`machine("READ N; LOAD =1; STORE F; TOP LOAD N; BE OUT; LOAD F; MULT N; STORE F; LOAD N; SUB =1; STORE N; BU TOP; OUT PRINT F; END#6")`,
  why:`This is the standard factorial loop, where each pass multiplies F by the current N and
then decrements N, exiting once N reaches 0. F therefore becomes 6 times 5 times 4 times 3 times 2
times 1, or 720. Note that the exit test is a BE on N, so the loop stops at zero rather than at one,
which means the final multiplication by 1 happens and is harmless.` },

{ id:"as-06", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  A
    READ  B
    LOAD  A
    SUB   B
    BL    SMALL
    PRINT A
    BU    DONE
SMALL PRINT B
DONE  END</code></pre>The input values are 4 and 9. What is printed?`,
  choices:["9","4","-5","5","None of the above"], ans:0,
  check:`machine("READ A; READ B; LOAD A; SUB B; BL SMALL; PRINT A; BU DONE; SMALL PRINT B; DONE END#4 9")`,
  why:`A minus B is 4 minus 9, which is -5, so BL fires and control jumps to SMALL, which prints
B and therefore prints 9. The naming is deliberately misleading and worth reading carefully: the label
says SMALL and the branch does fire when A is the smaller value, but the block prints B, so what the
program actually reports is the larger of the two.` },

{ id:"as-07", kind:"concept", topic:"assembly", level:"s",
  q:`In the ACSL machine, what does SUB X do?`,
  choices:["the accumulator becomes the accumulator minus X","the accumulator becomes X minus the accumulator","X becomes X minus the accumulator","X becomes the accumulator minus X","None of the above"], ans:0,
  why:`Every arithmetic instruction puts the accumulator on the left and the operand on the
right, leaving the result in the accumulator, and nothing in memory changes until a STORE executes.
Operand order changes the result of SUB and DIV. ADD and MULT give the same result either way.` },

{ id:"as-08", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>VALUE DC    5
      LOAD  =0
      PRINT VALUE
      END</code></pre>What is printed?`,
  choices:["5","nothing","an error","0","None of the above"], ans:0,
  check:`machine("VALUE DC 5; LOAD =0; PRINT VALUE; END#")`,
  why:`DC gives VALUE its initial value of 5. LOAD =0 changes the accumulator, but it does not
write to VALUE. PRINT reads VALUE, so the output is 5. The accumulator starts at zero under ACSL's
rules, but that does not make every unassigned memory word zero.` },

{ id:"as-09", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  N
    LOAD  =0
    STORE S
TOP LOAD  N
    BE    OUT
    LOAD  S
    ADD   N
    STORE S
    LOAD  N
    SUB   =1
    STORE N
    BU    TOP
OUT PRINT S
    END</code></pre>The input value is 100. What is printed?`,
  choices:["5051", "100", "4950", "10000", "None of the above"], ans:4,
  check:`machine("READ N; LOAD =0; STORE S; TOP LOAD N; BE OUT; LOAD S; ADD N; STORE S; LOAD N; SUB =1; STORE N; BU TOP; OUT PRINT S; END#100")`,
  why:`The loop adds N to a running sum and then decrements N, so it computes 100 + 99 + ... + 1,
which is 100 times 101 over 2. Recognizing the shape of a program lets you reach for the closed form
instead of tracing a hundred passes, and that recognition is most of the skill in this category. Since
5050 is not among the four choices offered, the answer is None of the above.` },

{ id:"as-10", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  N
TOP LOAD  N
    BE    OUT
    PRINT N
    LOAD  N
    SUB   =2
    STORE N
    BG    TOP
OUT END</code></pre>The input value is 8. What is printed?`,
  choices:["8 6 4 2","8 6 4 2 0","8 7 6 5 4 3 2 1","8","None of the above"], ans:0,
  check:`machine("READ N; TOP LOAD N; BE OUT; PRINT N; LOAD N; SUB =2; STORE N; BG TOP; OUT END#8")`,
  why:`N is printed, then dropped by 2, and the loop continues while the new value is greater
than 0. After 2 is printed N becomes 0, the BG does not fire, and the program falls through to OUT
without printing that 0. The BE at the top of the loop would have caught it too, but the BG at the
bottom gets there first, which is why both exit tests need reading rather than just the one you notice
first.` },

{ id:"as-11", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  A
    READ  B
    READ  C
    LOAD  A
    ADD   B
    ADD   C
    STORE T
    PRINT T
    DIV   =3
    STORE M
    PRINT M
    END</code></pre>The input values are 5, 8, and 14. What is printed?`,
  choices:["27 9","27 9.0","27 8","9 27","None of the above"], ans:0,
  check:`machine("READ A; READ B; READ C; LOAD A; ADD B; ADD C; STORE T; PRINT T; DIV =3; STORE M; PRINT M#5 8 14")`,
  why:`The three input values sum to 27, which is stored and printed. The accumulator still holds
27 afterwards, so dividing by 3 gives exactly 9 with nothing discarded. Note that READ consumes the
input values in the order the READ instructions actually execute, so the first READ takes 5.` },

{ id:"as-12", kind:"concept", topic:"assembly", level:"s",
  q:`How would you compute the remainder of X divided by Y on a machine with no modulo
instruction?`,
  choices:["X minus (X divided by Y) times Y","X divided by Y then times Y","Y minus X divided by Y","X minus Y until the result is negative","None of the above"], ans:0,
  why:`The truncating divide throws away exactly the part you are trying to recover, so
multiplying the quotient back by Y and subtracting it from X brings the remainder back. Written out
that is LOAD X, DIV Y, MULT Y, STORE T, LOAD X, SUB T. Repeated subtraction of Y nearly works but
overshoots, since it stops one subtraction after the remainder appears, and it needs a loop besides.` },

{ id:"ws-01", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "PROGRAM", what is S[2:5]?`,
  choices:["OGR","ROG","OGRA","RO","None of the above"], ans:2,
  check:`substr("PROGRAM", 2, 5)`,
  why:`Positions start at 0, so the characters sit as P at 0, R at 1, O at 2, G at 3, R at 4, A at
5, and M at 6. When a substring is written with both bounds they are positions and the second one is
included, so S[2:5] collects positions 2, 3, 4 and 5, which is OGRA. Four characters, not three: if
you counted 5 minus 2 you were using the Python rule, where the second bound stops the substring
rather than joining it. OGR is what that rule would give.` },

{ id:"ws-02", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "ACSL", what does this print?
<pre><code>T = ""
for I = 0 to 3
    T = S[I] + T
next I
output T</code></pre>`,
  choices:["LSCA","ACSL","LSAC","CASL","None of the above"], ans:0,
  check:`
S = "ACSL"; T = ""
for I in range(4):
    T = S[I] + T
RESULT = T`,
  why:`The new character is placed in front of whatever is already there, so the string builds
backwards and comes out reversed. Writing t = t + s[i] instead would append and give ACSL. Those two
lines look nearly identical on the page and produce opposite answers, which is why the order is worth
reading deliberately every single time.` },

{ id:"ws-03", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "COMPUTER", what is S[:3] + S[4:]?`,
  choices:["COMTER","COMPTER","COMUTER","COMPUTER","None of the above"], ans:2,
  check:`substr("COMPUTER", None, 3) + substr("COMPUTER", 4, None)`,
  why:`A substring written with one bound is a count of characters, taken from whichever end the
colon leans toward. So S[:3] is the first three characters, COM, and S[4:] is the last four, UTER,
since COMPUTER has eight characters and the last four begin at position 4. Joining them gives
COMUTER, with P at position 3 the only character dropped. Reading S[4:] as everything from position 4
onward is the Python rule and would give the same answer here only by coincidence of length, so check
it by counting from the right instead.` },

{ id:"ws-04", kind:"concept", topic:"wdtpd-strings", level:"j",
  q:`For a nonempty string S of length N, what is the index of its last character?`,
  choices:["N - 1","N","N + 1","1","None of the above"], ans:0,
  check:`"N - 1" if "ABCDE"[len("ABCDE")-1] == "E" else "unverified"`,
  why:`Because indexing starts at 0, the valid indices run from 0 through N minus 1, and using N
itself runs off the end of the string. This is the arithmetic sitting underneath the palindrome check,
where s[i] is compared against s[N - 1 - i]. Without the minus 1, the first comparison reads past the end of the string.` },

{ id:"ws-05", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "LEVEL", what does this print?
<pre><code>C = 0
for I = 0 to 4
    if S[I] == S[4 - I] then
        C = C + 1
    end if
next I
output C</code></pre>`,
  choices:["5","2","3","0","None of the above"], ans:0,
  check:`
S = "LEVEL"
RESULT = sum(1 for I in range(5) if S[I] == S[4-I])`,
  why:`LEVEL is a palindrome, so every character matches its mirror and the condition fires on
all five passes, including the middle one where i is 2 and the character is compared against itself. A
palindrome check written this way counts every match twice, which is exactly why a real check loops
only as far as the middle.` },

{ id:"ws-06", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "BANANA", how many times does the letter A appear?`,
  choices:["5", "2", "4", "1", "None of the above"], ans:4,
  check:`str("BANANA".count("A"))`,
  why:`The letters are B, A, N, A, N, A at indices 0 through 5, so A sits at indices 1, 3, and 5,
which is three occurrences. A counting loop for this compares s[i] against the target and increments a
counter, running from 0 to the length minus 1. Since 3 is not among the four choices offered, the
answer is None of the above.` },

{ id:"ws-07", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "ABCDEFG", what does this print?
<pre><code>T = ""
for I = 0 to 6 step 2
    T = T + S[I]
next I
output T</code></pre>`,
  choices:["ACEG","BDF","AEG","ABCDEFG","None of the above"], ans:0,
  check:`
S = "ABCDEFG"
RESULT = "".join(S[I] for I in range(0,7,2))`,
  why:`A step of 2 starting from 0 visits indices 0, 2, 4, and 6, collecting A, C, E, and G.
Starting at 1 instead would give BDF, so the starting index alone decides which half of the string you
end up with. Since the body appends rather than prepends, the order in which they were collected is
preserved.` },

{ id:"ws-08", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "HELLO", what is S[1:1]?`,
  choices:["the empty string","E","H","EL","None of the above"], ans:1,
  check:`substr("HELLO", 1, 1)`,
  why:`Both bounds are positions and both ends are included, so S[1:1] runs from position 1 to
position 1 and collects the single character sitting there, which is E. A substring with equal bounds
has length 1 rather than length 0. The empty string is the answer under the Python rule, where the
second bound stops the substring before it starts, and that is the reason it appears here.` },

{ id:"ws-09", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "STRING", what does this print?
<pre><code>T = S[3:] + S[:3]
output T</code></pre>`,
  choices:["INGSTR","STRING","GNIRTS","INGRTS","None of the above"], ans:0,
  check:`substr("STRING", 3, None) + substr("STRING", None, 3)`,
  why:`S[3:] is the last three characters, ING, and S[:3] is the first three, STR, so joining them
in that order rotates the string to INGSTR. If that operation feels familiar it should, since it is
the circulate from Bit-String Flicking applied to letters rather than bits. Worth noticing that the
Python reading of S[3:], everything from position 3 onward, happens to give ING as well here, because
STRING has exactly six characters. Change the length and the two readings part company.` },

{ id:"ws-10", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "AABBA", what does this print?
<pre><code>C = 0
for I = 0 to 3
    if S[I] == S[I + 1] then
        C = C + 1
    end if
next I
output C</code></pre>`,
  choices:["2","3","1","4","None of the above"], ans:0,
  check:`
S = "AABBA"
RESULT = sum(1 for I in range(4) if S[I] == S[I+1])`,
  why:`The adjacent matching pairs are the AA at indices 0 and 1 and the BB at indices 2 and 3.
The pair at indices 1 and 2 is A followed by B, and the pair at 3 and 4 is B followed by A, so neither
of those counts. The loop stops at index 3 precisely so that s[i + 1] stays inside a string of length
5.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"as-13", kind:"concept", topic:"assembly", level:"s",
  q:`What is the difference between LOAD =5 and LOAD FIVE?`,
  choices:["the first loads the number 5, the second loads the contents of the word named FIVE","the first loads the contents of word 5, the second loads the number 5","they are the same instruction written two ways","the first is illegal, since operands must be names","None of the above"], ans:0,
  why:`The equals sign marks an immediate value, meaning the operand is the number itself rather
than the name of a place to look. Without it, the operand names a memory word and the instruction
fetches whatever is stored there. Every arithmetic instruction accepts both forms, which is why
ADD =1 and ADD ONE can do completely different things in the same program.` },

{ id:"as-14", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    LOAD  =100
    SUB   =40
    DIV   =3
    STORE X
    PRINT X
    END</code></pre>What is printed?`,
  choices:["20","33","60","0","None of the above"], ans:0,
  check:`machine("LOAD =100; SUB =40; DIV =3; STORE X; PRINT X; END#")`,
  why:`Each instruction acts on whatever the accumulator already holds, so the three arithmetic
lines chain together: 100, then 60, then 20. The division comes out even here, so the truncation never
shows itself. The distractor 33 is what dividing 100 by 3 first would give, which is what reading the
instructions out of order produces.` },

{ id:"as-15", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  A
    READ  B
    LOAD  A
    ADD   B
    DIV   =2
    STORE M
    PRINT M
    END</code></pre>The input values are 7 and 10. What is printed?`,
  choices:["8","8.5","9","17","None of the above"], ans:0,
  check:`machine("READ A; READ B; LOAD A; ADD B; DIV =2; STORE M; PRINT M; END#7 10")`,
  why:`The two values sum to 17, and DIV keeps only the signed integer part, so 17 divided by 2 is
8 and the remainder is discarded. There is no floating point anywhere on this machine, which is why
8.5 cannot be the answer however natural it looks. READ consumes the input values in the order the READ
instructions execute, so A takes 7.` },

{ id:"as-16", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  N
    LOAD  =0
    STORE C
TOP LOAD  N
    BE    OUT
    LOAD  C
    ADD   =1
    STORE C
    LOAD  N
    DIV   =2
    STORE N
    BU    TOP
OUT PRINT C
    END</code></pre>The input value is 40. What is printed?`,
  choices:["5", "20", "40", "7", "None of the above"], ans:4,
  check:`machine("READ N; LOAD =0; STORE C; TOP LOAD N; BE OUT; LOAD C; ADD =1; STORE C; LOAD N; DIV =2; STORE N; BU TOP; OUT PRINT C; END#40")`,
  why:`Each pass adds 1 to the counter and halves N with the fraction discarded, and the loop exits
when N reaches 0 rather than 1. N runs 20, 10, 5, 2, 1, and then 0, which is six passes. Counting only
down to 1 gives 5, which is the distractor. Any loop that divides finishes in roughly the logarithm of
the starting value, so the count is always far smaller than the input suggests. Since 6 is not among the
four choices offered, the answer is None of the above.` },

{ id:"as-17", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  N
    LOAD  N
    DIV   =3
    MULT  =3
    STORE T
    LOAD  N
    SUB   T
    STORE R
    PRINT R
    END</code></pre>The input value is 17. What is printed?`,
  choices:["2","5","15","17","None of the above"], ans:0,
  check:`machine("READ N; LOAD N; DIV =3; MULT =3; STORE T; LOAD N; SUB T; STORE R; PRINT R; END#17")`,
  why:`This is how a remainder is computed on a machine with no modulo instruction. Dividing 17
by 3 gives 5, and multiplying back by 3 gives 15, which is the part of 17 that divides evenly.
Subtracting that from the original leaves 2. Note that N has to be loaded a second time, since the
accumulator no longer holds it once the arithmetic has run.` },

{ id:"as-18", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>     LOAD  =5
     STORE X
TOP  LOAD  X
     BE    DONE
     PRINT X
     LOAD  X
     SUB   =1
     STORE X
     BU    TOP
DONE END</code></pre>What is printed?`,
  choices:["5 4 3 2 1","5 4 3 2 1 0","1 2 3 4 5","5","None of the above"], ans:0,
  check:`machine("LOAD =5; STORE X; TOP LOAD X; BE DONE; PRINT X; LOAD X; SUB =1; STORE X; BU TOP; DONE END#")`,
  why:`The exit test runs before the print, so once X reaches 0 the BE fires and control jumps to
DONE without printing it. The values printed are therefore 5 down to 1. Printing before this zero test would include 0. A test at the bottom is not enough by itself to decide whether 0 is printed, because the position of the decrement matters too.` },

{ id:"as-19", kind:"concept", topic:"assembly", level:"s",
  q:`After STORE X executes, what does the accumulator hold?`,
  choices:["the same value it held before","zero","the previous contents of X","it is undefined","None of the above"], ans:0,
  why:`STORE copies the accumulator into memory and leaves the accumulator itself untouched,
which is what makes it possible to store the same value into two places in a row without reloading it.
LOAD is the instruction that goes the other way. Keeping this straight is what lets you read a run of
arithmetic instructions as a chain acting on one running value.` },

{ id:"as-20", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    LOAD  =999999
    ADD   =3
    STORE X
    PRINT X
    END</code></pre>What is printed?`,
  choices:["2","1000002","999999","0","None of the above"], ans:0,
  check:`machine("LOAD =999999; ADD =3; STORE X; PRINT X; END#")`,
  why:`READ, ADD, SUB, and MULT all work modulo 1,000,000 on this machine, so 1000002 wraps round
to 2. DIV is the one arithmetic instruction that does not wrap. The modulus is easy to forget precisely
because almost every program stays well below it, and it only ever bites on a question built to reach
it.` },

{ id:"as-21", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  N
    LOAD  =0
    STORE S
TOP LOAD  N
    BE    OUT
    LOAD  N
    DIV   =10
    MULT  =10
    STORE T
    LOAD  N
    SUB   T
    ADD   S
    STORE S
    LOAD  N
    DIV   =10
    STORE N
    BU    TOP
OUT PRINT S
    END</code></pre>The input value is 4821. What is printed?`,
  choices:["15","4821","1284","4","None of the above"], ans:0,
  check:`machine("READ N; LOAD =0; STORE S; TOP LOAD N; BE OUT; LOAD N; DIV =10; MULT =10; STORE T; LOAD N; SUB T; ADD S; STORE S; LOAD N; DIV =10; STORE N; BU TOP; OUT PRINT S; END#4821")`,
  why:`The block in the middle is the remainder idiom from earlier: divide by 10, multiply back by
10, and subtract, which leaves the last digit. Each pass adds that digit to a running sum and then drops
it from N, so the loop computes the digit sum: 4 plus 8 plus 2 plus 1. Recognizing the idiom is what
turns twenty lines of assembly into one sentence.` },

{ id:"as-22", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    READ  N
    LOAD  =1
    STORE P
TOP LOAD  N
    BE    OUT
    LOAD  P
    MULT  =2
    STORE P
    LOAD  N
    SUB   =1
    STORE N
    BU    TOP
OUT PRINT P
    END</code></pre>The input value is 7. What is printed?`,
  choices:["128","64","14","127","None of the above"], ans:0,
  check:`machine("READ N; LOAD =1; STORE P; TOP LOAD N; BE OUT; LOAD P; MULT =2; STORE P; LOAD N; SUB =1; STORE N; BU TOP; OUT PRINT P; END#7")`,
  why:`P starts at 1 and doubles once per pass, and the loop runs while N is nonzero, so it runs
7 times and P finishes at 2 to the seventh. The accumulator has to be reloaded before each of the two
independent updates, which is why the body is longer than the one line of arithmetic it performs. The
distractor 64 is what six passes would give.` },

{ id:"as-23", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>    LOAD  =-17
    DIV   =5
    STORE Q
    PRINT Q
    END</code></pre>What is printed?`,
  choices:["-3","-4","-3.4","3","None of the above"], ans:0,
  check:`machine("LOAD =-17; DIV =5; STORE Q; PRINT Q; END#")`,
  why:`DIV keeps the signed integer part, which truncates toward zero rather than flooring, so
-17 divided by 5 is -3 and not -4. Python's default integer division would give -4, and that difference
only ever shows on negative operands, which is why it is worth checking the sign before trusting a
division you did by habit.` },

{ id:"as-24", kind:"problem", topic:"assembly", level:"s",
  q:`<pre><code>     READ  A
     READ  B
     READ  C
     LOAD  A
     SUB   B
     BG    L1
     LOAD  B
     STORE M
     BU    L2
L1   LOAD  A
     STORE M
L2   LOAD  M
     SUB   C
     BG    DONE
     LOAD  C
     STORE M
DONE PRINT M
     END</code></pre>The input values are 3, 9, and 5. What is printed?`,
  choices:["9","5","3","17","None of the above"], ans:0,
  check:`machine("READ A; READ B; READ C; LOAD A; SUB B; BG L1; LOAD B; STORE M; BU L2; L1 LOAD A; STORE M; L2 LOAD M; SUB C; BG DONE; LOAD C; STORE M; DONE PRINT M; END#3 9 5")`,
  why:`There is no compare instruction here, so each comparison is a subtraction followed by a
test on the sign. A minus B is 3 minus 9, which is negative, so BG does not fire and M takes B, or 9.
Then M minus C is 9 minus 5, which is positive, so BG jumps straight to DONE and M keeps its 9. The
program reports the largest of the three, and the unconditional BU exists purely to skip the block
belonging to the branch that did not fire.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"ws-11", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "ALGORITHM", what is S[3:6]?`,
  choices:["ORI","ORIT","GOR","RIT","None of the above"], ans:1,
  check:`substr("ALGORITHM", 3, 6)`,
  why:`Positions start at 0, so the letters sit as A at 0, L at 1, G at 2, O at 3, R at 4, I at 5,
T at 6, H at 7, and M at 8. Both bounds are written, so they are positions and the second is included,
which collects positions 3, 4, 5, and 6. That is four characters, ORIT, not three. Counting 6 minus 3
uses the Python rule, where the second bound stops the substring rather than joining it, and gives
ORI.` },

{ id:"ws-12", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "KEYBOARD", what is S[:4] + S[3:]?`,
  choices:["KEYBARD","KEYBOARD","KEYBBOARD","KEYBOAR","None of the above"], ans:0,
  check:`substr("KEYBOARD", None, 4) + substr("KEYBOARD", 3, None)`,
  why:`A substring written with one bound is a count, taken from whichever end the colon leans
toward. So S[:4] is the first four characters, KEYB, and S[3:] is the last three, ARD, since KEYBOARD
has eight letters. Joining them gives KEYBARD, with the O at position 4 the only letter dropped.
Reading S[3:] as everything from position 3 onward would give BOARD instead.` },

{ id:"ws-13", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "ALPHABET", what does this print?
<pre><code>T = ""
for I = 1 to 7 step 2
    T = T + S[I]
next I
output T</code></pre>`,
  choices:["LHBT","APAE","ALPHABET","TBHL","None of the above"], ans:0,
  check:`
S = "ALPHABET"
RESULT = "".join(S[I] for I in range(1,8,2))`,
  why:`A step of 2 starting from 1 visits indices 1, 3, 5, and 7, collecting L, H, B, and T.
Starting at 0 instead would give APAE, so the starting index alone decides which half of the string you
end up with. Since the body appends rather than prepends, the letters appear in the order they were
collected.` },

{ id:"ws-14", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "DICTIONARY", how many of its letters are vowels, counting A, E, I, O, and U?`,
  choices:["3", "5", "6", "2", "None of the above"], ans:4,
  check:`str(sum(1 for c in "DICTIONARY" if c in "AEIOU"))`,
  why:`Walk the word one letter at a time rather than trying to see them all at once: D, I, C, T,
I, O, N, A, R, Y. The vowels are the I at index 1, the I at index 4, the O at index 5, and the A at
index 7, which is four. The Y is not counted, since the question names the five letters that count.
Since 4 is not among the four choices offered, the answer is None of the above.` },

{ id:"ws-15", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "RACECAR", what does this print?
<pre><code>C = 0
for I = 0 to 2
    if S[I] == S[6 - I] then
        C = C + 1
    end if
next I
output C</code></pre>`,
  choices:["3","7","4","0","None of the above"], ans:0,
  check:`
S = "RACECAR"
RESULT = sum(1 for I in range(3) if S[I] == S[6-I])`,
  why:`RACECAR is a palindrome, so every letter matches its mirror. The loop stops at index 2
rather than running the whole way, so it checks three pairs and never compares the middle letter with
itself. That is what a real palindrome check does: going all the way to index 6 would compare every
pair twice and report 7 rather than 3.` },

{ id:"ws-16", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "MONITOR", what is S[2:2]?`,
  choices:["N","the empty string","MO","O","None of the above"], ans:0,
  check:`substr("MONITOR", 2, 2)`,
  why:`Both bounds are positions and both ends are included, so S[2:2] runs from position 2 to
position 2 and collects the single letter sitting there, which is N. A substring with equal bounds has
length 1 rather than length 0. The empty string is the answer under the Python rule, where the second
bound stops the substring before it starts, and that is why it appears here.` },

{ id:"ws-17", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "ABCD", what does this print?
<pre><code>T = ""
for I = 0 to 3
    T = T + S[3 - I]
next I
output T</code></pre>`,
  choices:["DCBA","ABCD","ADBC","DABC","None of the above"], ans:0,
  check:`
S = "ABCD"
T = ""
for I in range(4):
    T = T + S[3-I]
RESULT = T`,
  why:`The index runs backwards even though the loop counter runs forwards, so the letters are
read D, C, B, A and appended in that order. There are two ways to reverse a string, and this is the
other one: reading backwards while appending gives the same result as reading forwards while
prepending. Doing both at once would leave the string unchanged.` },

{ id:"ws-18", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "KEYBOARD", what is the index of the first O?`,
  choices:["4","5","3","6","None of the above"], ans:0,
  check:`str("KEYBOARD".index("O"))`,
  why:`Counting from 0, the letters sit as K at 0, E at 1, Y at 2, B at 3, O at 4, A at 5, R at 6,
and D at 7. So the O is at index 4. Answering 5 means you counted from 1, which is the single most
common slip in this category and worth checking every time a question asks for a position rather than a
character.` },

{ id:"ws-19", kind:"problem", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "BANANAS", what does this print?
<pre><code>C = 0
for I = 0 to 6
    if S[I] == "A" then
        C = C + 1
    end if
next I
output C</code></pre>`,
  choices:["3","2","4","7","None of the above"], ans:0,
  check:`
S = "BANANAS"
RESULT = sum(1 for I in range(7) if S[I] == "A")`,
  why:`The letters sit as B at 0, A at 1, N at 2, A at 3, N at 4, A at 5, and S at 6, so the A
appears three times. The loop runs from 0 to 6 because a string of seven characters has its last index
at 6, and going one further would read past the end. Counting the As at a glance is where this question
goes wrong; reading the indices out loud is slower and reliable.` },

{ id:"ws-20", kind:"concept", topic:"wdtpd-strings", level:"j",
  q:`For a string S of length N, what does S[:N] give?`,
  choices:["the whole string","the whole string except the last character","an error, since N is past the end","the first character","None of the above"], ans:0,
  check:`"the whole string" if substr("MONITOR", None, 7) == "MONITOR" else "unverified"`,
  why:`A substring written with only the second bound is a count of characters taken from the
front, so S[:N] asks for the first N of them, which is all of them. The bound is a count here rather
than a position, so there is nothing out of range about it. Compare S[N] on its own, which really would
run off the end, since the last valid index is N minus 1.` }

]);
