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
