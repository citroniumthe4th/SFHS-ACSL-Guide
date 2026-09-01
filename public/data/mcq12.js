window.MCQ = (window.MCQ || []).concat([

{ id:"as-01", topic:"assembly", level:"s",
  q:`<pre><code>A   DC    5
B   DC    3
    LOAD  A
    MULT  B
    STORE C
    PRINT C
    END</code></pre>What is printed?`,
  choices:["15","8","2","53","None of the above"], ans:0,
  check:`machine("A DC 5; B DC 3; LOAD A; MULT B; STORE C; PRINT C; END#")`,
  why:`The two DC lines set up constants before the program runs. LOAD puts 5 in the accumulator,
MULT multiplies it by the contents of B, and STORE copies the 15 into C. DC is a directive rather
than an executed instruction, so it never touches the accumulator.` },

{ id:"as-02", topic:"assembly", level:"s",
  q:`<pre><code>    LOAD  =20
    DIV   =6
    STORE Q
    PRINT Q
    END</code></pre>What is printed?`,
  choices:["3","3.33","4","2","None of the above"], ans:0,
  check:`machine("LOAD =20; DIV =6; STORE Q; PRINT Q; END#")`,
  why:`The equal sign marks an immediate value, so these are literal numbers rather than memory
names. DIV keeps the signed integer part, so 20 divided by 6 is 3 and the remainder is discarded.
There is no floating point on this machine.` },

{ id:"as-03", topic:"assembly", level:"s",
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
  why:`7 times -3 is -21, which gets stored and printed. The accumulator still holds -21, so the
DIV divides it by 2. The signed integer part of -10.5 truncates toward zero, giving -10. Flooring
would give -11, which is what Python does by default and what this rule specifically does not.` },

{ id:"as-04", topic:"assembly", level:"s",
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
  why:`There is no compare instruction, so a comparison is done by subtracting and testing the
sign. Here 10 minus 3 is 7, which is greater than 0, so BG jumps to BIG. That branch overwrites N
with 99 and prints it. The unconditional BU exists to skip the BIG block when the branch does not
fire, and leaving it out is a classic bug.` },

{ id:"as-05", topic:"assembly", level:"s",
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
  why:`This is the standard factorial loop. Each pass multiplies F by the current N and then
decrements N, exiting when N reaches 0. So F becomes 6 times 5 times 4 times 3 times 2 times 1,
which is 720. Note that the exit test is BE on N, so the loop stops at zero rather than at one,
and the final multiplication by 1 is harmless.` },

{ id:"as-06", topic:"assembly", level:"s",
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
B. That gives 9. Read the branch carefully: the label is called SMALL but the branch fires when A
is the smaller value, and the block prints B, so the program prints the larger of the two.` },

{ id:"as-07", topic:"assembly", level:"s",
  q:`In the ACSL machine, what does SUB X do?`,
  choices:["the accumulator becomes the accumulator minus X","the accumulator becomes X minus the accumulator","X becomes X minus the accumulator","X becomes the accumulator minus X","None of the above"], ans:0,
  why:`Every arithmetic instruction puts the accumulator on the left and the operand on the right,
and leaves the result in the accumulator. Nothing in memory changes until a STORE. Getting the
operand order backwards is the single most common source of wrong answers in this category, and
it only shows up on SUB and DIV since ADD and MULT are symmetric.` },

{ id:"as-08", topic:"assembly", level:"s",
  q:`<pre><code>    LOAD  =0
    PRINT ZERO
    END</code></pre>What is printed, given that ZERO is never assigned?`,
  choices:["0","nothing","an error","the accumulator value","None of the above"], ans:0,
  check:`machine("LOAD =0; PRINT ZERO; END#")`,
  why:`Every memory word starts at 0, so reading one that was never written gives 0 rather than an
error. Note also that PRINT takes a memory location and not the accumulator, so the LOAD on the
first line has no effect on what gets printed.` },

{ id:"as-09", topic:"assembly", level:"s",
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
  why:`The loop adds N to a running sum and then decrements N, so it computes 100 + 99 + ... + 1.
That is 100 times 101 over 2, which is 5050. Recognizing the shape of a program lets you use the
closed form instead of tracing a hundred passes. The value 5050 is not among the four choices offered, so the answer is None of the above.` },

{ id:"as-10", topic:"assembly", level:"s",
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
  why:`N prints, then drops by 2, and the loop continues while the new value is greater than 0.
After printing 2, N becomes 0, and BG does not fire, so the program falls through to OUT without
printing 0. The BE at the top would also have caught it, but the BG at the bottom gets there
first, which is why reading both exit tests matters.` },

{ id:"as-11", topic:"assembly", level:"s",
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
  why:`The three values sum to 27, which is stored and printed. The accumulator still holds 27, so
dividing by 3 gives exactly 9 with no remainder. READ consumes input values in the order the READ
instructions execute, so the first READ takes 5.` },

{ id:"as-12", topic:"assembly", level:"s",
  q:`How would you compute the remainder of X divided by Y on a machine with no modulo
instruction?`,
  choices:["X minus (X divided by Y) times Y","X divided by Y then times Y","Y minus X divided by Y","X minus Y until the result is negative","None of the above"], ans:0,
  why:`The truncating divide throws away exactly the part you want, so multiplying the quotient
back by Y and subtracting recovers it. In instructions that is LOAD X, DIV Y, MULT Y, STORE T,
LOAD X, SUB T. The last option almost works but overshoots, since it stops one subtraction after
the remainder appears and it also needs a loop.` },

{ id:"ws-01", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "PROGRAM", what is S[2:5]?`,
  choices:["OGR","ROG","OGRA","RO","None of the above"], ans:0,
  check:`"PROGRAM"[2:5]`,
  why:`Indexing starts at 0, so the characters are P at 0, R at 1, O at 2, G at 3, R at 4, A at 5,
and M at 6. The slice takes indices 2, 3, and 4 and stops before index 5, giving OGR. The length
of a slice is always the second bound minus the first, which is a fast check.` },

{ id:"ws-02", topic:"wdtpd-strings", level:"j",
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
  why:`The new character goes in front of what is already there, so the string builds backwards
and the result is reversed. Writing T = T + S[I] instead would append and give ACSL. Those two
lines look nearly identical and give opposite answers, so read the order every time.` },

{ id:"ws-03", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "COMPUTER", what is S[:3] + S[5:]?`,
  choices:["COMTER","COMPTER","COMUTER","COMPUTER","None of the above"], ans:0,
  check:`"COMPUTER"[:3] + "COMPUTER"[5:]`,
  why:`Leaving out a bound means run to that end of the string. S[:3] takes indices 0, 1, and 2,
which is COM. S[5:] takes index 5 onward, which is TER since T sits at index 5. Concatenating
gives COMTER, and the characters at indices 3 and 4, P and U, are dropped.` },

{ id:"ws-04", topic:"wdtpd-strings", level:"j",
  q:`For a string S of length N, what is the index of its last character?`,
  choices:["N - 1","N","N + 1","1","None of the above"], ans:0,
  check:`CHOICES[0] if "ABCDE"[len("ABCDE")-1] == "E" else "unverified"`,
  why:`Indexing starts at 0, so the valid indices run from 0 through N minus 1. Using N itself
runs off the end. This is the arithmetic behind the palindrome check, where S[I] is compared with
S[N - 1 - I], and dropping the minus 1 there is the most common error in the whole category.` },

{ id:"ws-05", topic:"wdtpd-strings", level:"j",
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
  why:`LEVEL is a palindrome, so every character matches its mirror and the condition fires on all
five passes, including the middle one where I is 2 and the character is compared with itself. A
palindrome check that loops all the way across counts each match twice, which is why a real check
only loops to the middle.` },

{ id:"ws-06", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "BANANA", how many times does the letter A appear?`,
  choices:["5", "2", "4", "1", "None of the above"], ans:4,
  check:`str("BANANA".count("A"))`,
  why:`The letters are B, A, N, A, N, A at indices 0 through 5, so A sits at indices 1, 3, and 5.
That is three. A counting loop for this compares S[I] with the target and increments a counter,
running from 0 to the length minus 1. The value 3 is not among the four choices offered, so the answer is None of the above.` },

{ id:"ws-07", topic:"wdtpd-strings", level:"j",
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
  why:`The loop visits indices 0, 2, 4, and 6, picking up A, C, E, and G. Starting at 1 instead
would give BDF, so which half you get depends entirely on the starting index. Since the body
appends rather than prepends, the order is preserved.` },

{ id:"ws-08", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "HELLO", what is S[1:1]?`,
  choices:["the empty string","E","H","EL","None of the above"], ans:0,
  check:`CHOICES[0] if "HELLO"[1:1] == "" else "unverified"`,
  why:`A slice runs up to but not including the second bound, so when the two bounds are equal the
slice has length 0. This is not an error, it is simply empty, which matters when a loop pushes a
slice bound to a point where it no longer makes sense. Any slice where the first bound is not less
than the second comes out empty.` },

{ id:"ws-09", topic:"wdtpd-strings", level:"j",
  q:`For S equal to "STRING", what does this print?
<pre><code>T = S[3:] + S[:3]
output T</code></pre>`,
  choices:["INGSTR","STRING","GNIRTS","INGRTS","None of the above"], ans:0,
  check:`"STRING"[3:] + "STRING"[:3]`,
  why:`S[3:] takes index 3 onward, which is ING, and S[:3] takes indices 0 through 2, which is
STR. Concatenating in that order rotates the string. This is exactly the circulate operation from
Bit-String Flicking applied to letters instead of bits.` },

{ id:"ws-10", topic:"wdtpd-strings", level:"j",
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
  why:`The adjacent equal pairs are AA at indices 0 and 1, and BB at indices 2 and 3. The pair at
indices 1 and 2 is A and B, and the pair at 3 and 4 is B and A, so neither counts. The loop stops
at index 3 so that S[I + 1] stays inside a string of length 5.` }

]);
