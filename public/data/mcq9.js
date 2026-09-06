window.MCQ = (window.MCQ || []).concat([

{ id:"fr-01", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string does the regular expression (ab)*c NOT match, where a match must cover the
whole string?`,
  choices:["abab","c","abc","ababc","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('(ab)*c',[w]) == 'N'])`,
  why:`The c at the end of the pattern is required rather than optional, so every accepted
string has to finish with one, and abab has no c anywhere in it. The other three are zero, one, and
two copies of ab followed by that required c. The bare c is the case worth pausing on, since it is a
reminder that the star permits zero copies as readily as it permits many.` },

{ id:"fr-02", kind:"problem", topic:"fsa-regex", level:"s",
  q:`How many of these strings does a*b*c* match: the empty string, abc, aabbcc, acb, and cba?`,
  choices:["3","4","2","5","None of the above"], ans:0,
  check:`str(regex_match('a*b*c*', ['-','abc','aabbcc','acb','cba']).split().count('Y'))`,
  why:`The pattern asks for some a characters, then some b characters, then some c characters, in
that order, with any count including none. The empty string qualifies because all three stars may take
zero copies, and abc and aabbcc qualify in the obvious way, while acb and cba both have letters out of
order. The contrast worth drawing is with (a|b|c)*, which would accept all five, since it imposes no
ordering at all.` },

{ id:"fr-03", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string does x+y? match?`,
  choices:["xxx","y","xy y","yx","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('x+y?',[w.replace(' ','')]) == 'Y'])`,
  why:`The plus insists on at least one x, while the question mark permits either zero or one y
after it, so xxx matches perfectly well with no y at all. A bare y fails because nothing supplies the
required x in front of it, and yx has the two letters the wrong way round.` },

{ id:"fr-04", kind:"concept", topic:"fsa-regex", level:"s",
  q:`Does ab|cd match the string abcd?`,
  choices:["no, because the bar splits the whole expression","yes, since it contains both ab and cd","yes, because concatenation binds tighter","no, because the bar only applies to b and c","None of the above"], ans:0,
  check:`"no, because the bar splits the whole expression" if regex_match('ab|cd',['abcd']) == 'N' else "unverified"`,
  why:`Union has the loosest precedence of all the operators, so ab|cd means the whole of ab or
the whole of cd rather than a followed by b-or-c followed by d. For a full match against abcd, one of
the two branches would have to cover all four characters, and neither comes close. Getting a followed
by either b or c followed by d requires the brackets to be written explicitly, as a(b|c)d.` },

{ id:"fr-05", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string is NOT matched by (a?b)+?`,
  choices:["a","b","ab","abab","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('(a?b)+',[w]) == 'N'])`,
  why:`Each repetition of the group is an optional a followed by a required b, so every copy ends
in a b and therefore no accepted string can end in an a. A single a is not even a legal copy of the
group. The other three break down as one copy without the a, one copy with it, and two copies.` },

{ id:"fr-06", kind:"concept", topic:"fsa-regex", level:"s",
  q:`Which of these is a true statement about regular expressions?`,
  choices:["(a|b)* accepts abab but a*b* does not","(a*)* is different from a*","a+ accepts the empty string","a*a* accepts fewer strings than a*","None of the above"], ans:0,
  why:`The pattern a*b* forces every a to come before every b, so it rejects abab, while (a|b)*
accepts any arrangement of the two letters whatever. The other three claims are all false: (a*)* is
the same language as a*, a+ insists on at least one copy, and a*a* accepts exactly what a* accepts.
The first two of those false claims look plausible enough that they turn up as distractors
regularly.` },

{ id:"fr-07", kind:"problem", topic:"fsa-regex", level:"s",
  q:`How many of these strings does (ab|a)*b match: ab, b, abb, aab, and ababb?`,
  choices:["5","4","3","2","None of the above"], ans:0,
  check:`str(regex_match('(ab|a)*b', ['ab','b','abb','aab','ababb']).split().count('Y'))`,
  why:`The group can produce either ab or a on each repetition, and the trailing b is required in
every case. Take one copy of a and the final b for ab, zero copies for b, one copy of ab and the final
b for abb, two copies of a and the final b for aab, and two copies of ab and the final b for ababb.
All five are accepted, which is the point of the question: a union sitting inside a star covers far
more ground than it appears to at a glance.` },

{ id:"fr-08", kind:"problem", topic:"fsa-regex", level:"s",
  q:`An FSA has states S and F, with S the start state and F the only accepting state. From S,
reading a goes to F. From F, reading b stays at F. There are no other transitions. Which regular
expression describes the accepted strings?`,
  choices:["ab*","a*b","(ab)*","ab+","None of the above"], ans:0,
  check:`"ab*" if regex_match('ab*',['a','ab','abb']) == 'Y Y Y' else "unverified"`,
  why:`Every accepted string begins with the single a that carries you from S to F, followed by
any number of b characters supplied by the self loop at F, including none at all, which is exactly
ab*. The pattern a*b would accept a bare b, and this machine has no b transition out of S, so it
cannot. And ab+ would reject a bare a, which the machine does accept, since F is an accepting state
the moment you arrive there.` },

{ id:"fr-09", kind:"concept", topic:"fsa-regex", level:"s",
  q:`If the start state of an FSA is also an accepting state, what must be true of any regular
expression describing it?`,
  choices:["it must accept the empty string","it must contain a plus","it must contain a union","it must be infinite","None of the above"], ans:0,
  why:`Reaching an accepting state after reading nothing at all means the empty string belongs to
the language, so any expression describing that machine has to accept it too. In practice that usually
shows up as a star at the top level or an explicitly optional part. Testing the empty string against a
candidate expression takes about two seconds and is the fastest way to rule a wrong one out.` },

{ id:"fr-10", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string does m(no)*p? NOT match?`,
  choices:["mnp","m","mp","mnonop","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('m(no)*p?',[w]) == 'N'])`,
  why:`After the required m come whole copies of no, then at most one p. In mnp the n is stranded
without its o, so it is neither a complete copy of the group nor the optional p, and nothing else in
the pattern can account for it. The other three are legal: m is zero copies with no p, mp is zero
copies with the p, and mnonop is two copies with the p. A star repeats its whole group and never a
fragment of one.` },

{ id:"fr-11", kind:"concept", topic:"fsa-regex", level:"s",
  q:`What does [^abc] match?`,
  choices:["any single character other than a, b, or c","the literal text ^abc","zero or more of a, b, or c","a caret followed by a, b, or c","None of the above"], ans:0,
  why:`A caret in the first position inside square brackets negates the class, so the pattern
matches exactly one character that is not in the set. Anywhere else inside the brackets it is simply a
literal caret, and outside the brackets altogether it anchors the match to the start of the string.
One symbol with three meanings, decided entirely by where it sits.` },

{ id:"fr-12", kind:"problem", topic:"fsa-regex", level:"s",
  q:`How many strings of exactly two lowercase letters does (a|b)(a|b) match?`,
  choices:["4","2","3","1","None of the above"], ans:0,
  check:`str(regex_match('(a|b)(a|b)', ['aa','ab','ba','bb']).split().count('Y'))`,
  why:`Each group independently chooses a or b, so there are two choices for the first position
and two for the second, giving aa, ab, ba, and bb. The two groups are entirely separate, and nothing
in the pattern requires them to choose the same letter. Imposing that would need a backreference,
which the regular expressions in this category do not provide.` },

{ id:"wa-01", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5 at indices 1 through 5. After for i = 1 to 4 with the body
A(I) = A(I + 1), what does A hold?`,
  choices:["2 3 4 5 5","1 1 2 3 4","2 2 2 2 5","1 2 3 4 5","None of the above"], ans:0,
  check:`
A = [0,1,2,3,4,5]
for I in range(1,5):
    A[I] = A[I+1]
RESULT = " ".join(str(x) for x in A[1:])`,
  why:`Because the loop moves left to right, every read happens before the value it wants has
been overwritten, which makes this a clean left shift. A(1) takes 2, A(2) takes 3, A(3) takes 4, and
A(4) takes 5, while the last slot is never written and keeps its own 5. Run that identical body from
i equal to 4 down to 1 and you get the smeared 2 2 2 2 5 instead, which is the whole lesson.` },

{ id:"wa-02", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5 at indices 1 through 5. After for i = 4 to 1 step -1 with the
body A(I + 1) = A(I), what does A hold?`,
  choices:["1 1 2 3 4","2 3 4 5 5","1 2 3 4 5","1 1 1 1 1","None of the above"], ans:0,
  check:`
A = [0,1,2,3,4,5]
for I in range(4,0,-1):
    A[I+1] = A[I]
RESULT = " ".join(str(x) for x in A[1:])`,
  why:`Going right to left, every write lands ahead of where the next read will happen, so this
is a clean right shift. A(5) takes 4, A(4) takes 3, A(3) takes 2, and A(2) takes 1, while the first
slot is never written and keeps its 1. Direction is the entire question here, since running this same
loop upward would leave every slot holding 1.` },

{ id:"wa-03", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 4, 8, 15, 16, 23 at indices 1 through 5. What does this print?
<pre><code>M = A(1)
for I = 2 to 5
    if A(I) &gt; M then
        M = A(I)
    end if
next I
output M</code></pre>`,
  choices:["23","4","16","66","None of the above"], ans:0,
  check:`str(max([4,8,15,16,23]))`,
  why:`This is the running maximum pattern: M starts at the first element and is replaced
whenever something larger turns up, so it finishes holding the largest value in the array. Starting M
at 0 rather than at A(1) happens to work here, but it fails on an array of negative numbers, which is
why taking the first element is the safer habit.` },

{ id:"wa-04", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`A two dimensional array is filled by A(I, J) = I * 10 + J for I and J from 1 to 3. What is
A(2, 3)?`,
  choices:["23","32","6","5","None of the above"], ans:0,
  check:`str(2*10+3)`,
  why:`The first subscript is the row and the second is the column, so with I at 2 and J at 3 the
formula gives 23. Reading the subscripts the other way round gives 32, which is the value at A(3, 2).
Whenever a two dimensional problem offers you both a number and its reverse among the choices, that
reversal is precisely what it is testing.` },

{ id:"wa-05", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 5, 3, 9, 1, 7 at indices 1 through 5. What does this print?
<pre><code>C = 0
for I = 1 to 4
    if A(I) &gt; A(I + 1) then
        C = C + 1
    end if
next I
output C</code></pre>`,
  choices:["2","3","1","4","None of the above"], ans:0,
  check:`
A = [5,3,9,1,7]
RESULT = sum(1 for I in range(4) if A[I] > A[I+1])`,
  why:`The loop counts the places where a value is larger than the one immediately after it.
Comparing 5 with 3 counts, 3 with 9 does not, 9 with 1 counts, and 1 with 7 does not, giving 2. Note
that the loop stops at index 4 so that A(I + 1) stays inside the array, which is the standard bound
for any loop comparing neighbors.` },

{ id:"wa-06", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5 at indices 1 through 5. After for i = 1 to 5 with the body that
swaps A(I) and A(6 - I), what does A hold?`,
  choices:["1 2 3 4 5","5 4 3 2 1","5 2 3 4 1","1 4 3 2 5","None of the above"], ans:0,
  check:`
A = [0,1,2,3,4,5]
for I in range(1,6):
    A[I], A[6-I] = A[6-I], A[I]
RESULT = " ".join(str(x) for x in A[1:])`,
  why:`Running the swap the whole way across performs every exchange twice, once from each end,
so everything finishes exactly where it started. A correct reversal loops only as far as the middle,
which here means for i = 1 to 2. This is the classic reversal trap, and the fact that the answer is
the untouched original array is what makes it worth remembering.` },

{ id:"wa-07", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 2, 4, 6, 8 at indices 1 through 4. What does this print?
<pre><code>S = 0
for I = 1 to 4
    S = S + A(I) * I
next I
output S</code></pre>`,
  choices:["61", "20", "24", "40", "None of the above"], ans:4,
  check:`str(sum(a*(i+1) for i,a in enumerate([2,4,6,8])))`,
  why:`Each element is weighted by its own index, so the sum is 2 times 1, plus 4 times 2, plus 6
times 3, plus 8 times 4, which comes to 2 + 8 + 18 + 32, or 60. The distractor 20 is the plain
unweighted sum. Since 60 is not among the four choices offered, the answer is None of the above.` },

{ id:"wa-08", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`A three by three array is filled with A(I, J) = I + J for I and J from 1 to 3. What is the
sum of the main diagonal?`,
  choices:["12","9","15","18","None of the above"], ans:0,
  check:`str(sum(I+I for I in range(1,4)))`,
  why:`The main diagonal is the set of cells where the row subscript equals the column subscript,
so the cells are A(1, 1) equal to 2, A(2, 2) equal to 4, and A(3, 3) equal to 6, adding to 12. Drawing
the three by three grid and filling in every cell takes about fifteen seconds and removes any chance
of reaching for the wrong ones.` },

{ id:"wa-09", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 3, 1, 4, 1, 5 at indices 1 through 5. After the body A(I) = A(I) + A(I - 1)
runs for I from 2 to 5, what is A(5)?`,
  choices:["14","6","9","5","None of the above"], ans:0,
  check:`
A = [0,3,1,4,1,5]
for I in range(2,6):
    A[I] = A[I] + A[I-1]
RESULT = A[5]`,
  why:`Each slot accumulates everything before it, so the array turns into a running total of 3,
4, 8, 9, and 14. Because the loop moves left to right, A(I - 1) has already been updated by the time
it is read, and that is what turns what looks like a simple neighbor sum into a prefix sum. Running
the same loop backwards would produce a completely different array.` },

{ id:"wa-10", kind:"concept", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5, and I = 1 and J = 5 (one-based indices). What is wrong with using T = A(I), A(I) = A(J), A(J) = T to swap
two elements, compared with A(I) = A(J) followed by A(J) = A(I)?`,
  choices:["nothing, the first version is correct and the second destroys a value","the first version needs the assignments reversed","the second version is correct and the first is redundant","both versions fail when I equals J","None of the above"], ans:0,
  why:`The three line version holds the old value of A(I) safely in the temporary while A(I) is
overwritten, so both values survive the exchange. The two line version overwrites A(I) first, which
means that by the time A(J) is assigned the original A(I) is already gone and both slots end up
holding the old A(J). In a language without simultaneous assignment the temporary is not a stylistic
preference but a requirement.` }

]);

window.MCQ = window.MCQ.concat([
  {
    "id": "fr-13", kind:"problem",
    "topic": "fsa-regex",
    "level": "s",
    "q": "How many binary strings of length 4 does this machine accept?<figure class=\"diagram\"><img src=\"/assets/diagrams/dfa.svg\" width=\"500\" height=\"299\" loading=\"lazy\" alt=\"Two-state automaton. S1 is the start and only accepting state. A 0 switches between S1 and S2. A 1 loops at either state.\"><figcaption>Automaton by Cepheus, with arrow cleanup by Interiot. <a href=\"https://commons.wikimedia.org/wiki/File:DFAexample.svg\">Source and public-domain dedication</a>. Unmodified.</figcaption></figure>",
    "choices": [
      "8",
      "4",
      "6",
      "16",
      "None of the above"
    ],
    "ans": 0,
    "check": "str(sum(1 for n in range(16) if format(n,\"04b\").count(\"0\") % 2 == 0))",
    "why": "A zero switches states, so an even number of zeros returns the machine to S1. A length-4 string can have 0, 2, or 4 zeros. Those cases contribute 1, 6, and 1 strings, for a total of 8."
  },
  {
    "id": "fr-14", kind:"problem",
    "topic": "fsa-regex",
    "level": "s",
    "q": "Which string is rejected by this machine?<figure class=\"diagram\"><img src=\"/assets/diagrams/dfa.svg\" width=\"500\" height=\"299\" loading=\"lazy\" alt=\"Two-state automaton. S1 is the start and only accepting state. A 0 switches between S1 and S2. A 1 loops at either state.\"><figcaption>Automaton by Cepheus, with arrow cleanup by Interiot. <a href=\"https://commons.wikimedia.org/wiki/File:DFAexample.svg\">Source and public-domain dedication</a>. Unmodified.</figcaption></figure>",
    "choices": [
      "01010",
      "1111",
      "010",
      "001100",
      "None of the above"
    ],
    "ans": 0,
    "check": "only([w for w in CHOICES[:4] if w.count(\"0\") % 2 == 1])",
    "why": "01010 contains three zeros. Each zero changes states and each one leaves the state unchanged, so the final state is S2, which is not accepting. The other strings contain 0, 2, and 4 zeros, so they end at S1."
  }
]);

window.MCQ = (window.MCQ || []).concat([

{ id:"fr-15", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string does (a|b)*abb NOT match, where a match must cover the whole string?`,
  choices:["ab","abb","aabb","babb","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('(a|b)*abb',[w]) == 'N'])`,
  why:`Every accepted string has to end in the literal abb, and the star in front can supply any
arrangement of a and b characters before it, including none. So abb is zero copies, aabb is one a, and
babb is one b. The string ab is simply too short to contain the required abb at all, whatever the star
does.` },

{ id:"fr-16", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string does a(b|c)*d NOT match?`,
  choices:["abc","ad","abd","acbd","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('a(b|c)*d',[w]) == 'N'])`,
  why:`The pattern requires a leading a and a trailing d with any mixture of b and c characters
between them, in any order and any number including none. That covers ad, abd, and acbd. The string abc
never supplies the required d, and nothing inside the star can stand in for it, since the star produces
only b and c characters.` },

{ id:"fr-17", kind:"problem", topic:"fsa-regex", level:"s",
  q:`How many of these strings does (01)*0 match: 0, 010, 0101, 01010, and the empty string?`,
  choices:["3","2","4","5","None of the above"], ans:0,
  check:`str(regex_match('(01)*0', ['0','010','0101','01010','-']).split().count('Y'))`,
  why:`Every accepted string is some number of copies of 01 followed by a single required 0, so
the accepted strings all have odd length and end in 0. That gives 0 for zero copies, 010 for one copy,
and 01010 for two. The string 0101 ends in 1, and the empty string cannot supply the required trailing
0, so both fail. The trailing 0 is what makes the count 3 rather than 5.` },

{ id:"fr-18", kind:"concept", topic:"fsa-regex", level:"s",
  q:`How does a? differ from a*?`,
  choices:["a? allows zero or one a, a* allows any number","a? allows exactly one a, a* allows zero or one","a? requires at least one a, a* does not","they accept the same strings","None of the above"], ans:0,
  why:`The question mark caps the repetition at one while the star places no upper limit, and
both permit zero copies. So a? accepts the empty string and a but nothing longer, while a* accepts aaa
as readily as either. The plus is the third member of the family: at least one copy, no upper limit,
and no acceptance of the empty string.` },

{ id:"fr-19", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string does x*yx* NOT match?`,
  choices:["xx","y","xy","xxyxx","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('x*yx*',[w]) == 'N'])`,
  why:`The single y in the middle is required and neither star can supply one, so every accepted
string contains exactly one y. That rules out xx, which has none. The two stars are independent, so the
number of x characters before the y need not match the number after it, which is why both xy and xxyxx
are accepted.` },

{ id:"fr-20", kind:"problem", topic:"fsa-regex", level:"s",
  q:`How many of these strings does (a+b)+ match: ab, aab, abab, ba, and aabaab?`,
  choices:["3", "2", "5", "1", "None of the above"], ans:4,
  check:`str(regex_match('(a+b)+', ['ab','aab','abab','ba','aabaab']).split().count('Y'))`,
  why:`Each copy of the group is one or more a characters followed by exactly one b, so every
accepted string ends in b and begins with a. That accepts ab, aab, abab, and aabaab, and rejects ba,
which starts with the wrong letter. The plus inside the group and the plus outside it do different
jobs: the inner one repeats the letter a, the outer one repeats the whole group. Since 4 is not among
the four choices offered, the answer is None of the above.` },

{ id:"fr-21", kind:"concept", topic:"fsa-regex", level:"s",
  q:`Which list orders the regular expression operators from most tightly binding to least?`,
  choices:["repetition, then concatenation, then union","union, then concatenation, then repetition","concatenation, then repetition, then union","they all bind equally and are read left to right","None of the above"], ans:0,
  why:`A star, plus, or question mark attaches to the single item immediately in front of it,
concatenation joins whatever those produce, and the bar splits the whole expression last. That is why
ab|cd means the whole of ab or the whole of cd, and why ab* means an a followed by any number of b
characters rather than any number of copies of ab. Brackets are the only way to override this, which is
what makes them so common in these patterns.` },

{ id:"fr-22", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string does m?n+ NOT match?`,
  choices:["m","n","mn","nn","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('m?n+',[w]) == 'N'])`,
  why:`The question mark makes the m optional, but the plus insists on at least one n, so a bare
m has nothing to satisfy the second half of the pattern. The other three all supply at least one n, with
the m present or absent as the question mark permits. An optional part can never make a required part
optional.` },

{ id:"fr-23", kind:"problem", topic:"fsa-regex", level:"s",
  q:`How many distinct strings does (a|b)(a|b)(a|b) match?`,
  choices:["8","3","6","9","None of the above"], ans:0,
  check:`str(regex_match('(a|b)(a|b)(a|b)', ['aaa','aab','aba','abb','baa','bab','bba','bbb']).split().count('Y'))`,
  why:`Each of the three groups chooses a or b independently of the others, so the count is 2
times 2 times 2. Every accepted string has length exactly 3, since nothing here repeats or is optional.
Nothing in the pattern requires the three groups to agree; forcing that would need a backreference,
which the regular expressions in this category do not provide.` },

{ id:"fr-24", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string does a(a|b)*b NOT match?`,
  choices:["ba","ab","aab","aabab","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('a(a|b)*b',[w]) == 'N'])`,
  why:`The pattern pins the first character to a and the last to b, with anything at all made of
those two letters in between. The string ba has them the wrong way round, so it fails on the very first
character. Note that ab is accepted with the star taking zero copies, which is worth checking
explicitly whenever a pattern has a fixed head and tail.` },

{ id:"fr-25", kind:"problem", topic:"fsa-regex", level:"s",
  q:`An FSA has states P and Q over the alphabet {0, 1}, with P the start state and Q the only
accepting state. From P, reading 0 goes to Q and reading 1 stays at P. From Q, reading 0 stays at Q and
reading 1 goes to P. Which regular expression describes the accepted strings?`,
  choices:["(0|1)*0","0(0|1)*","(0|1)*1","(01)*","None of the above"], ans:0,
  check:`"(0|1)*0" if regex_match('(0|1)*0',['0','10','110','1000']) == 'Y Y Y Y' and regex_match('(0|1)*0',['1','01','-']) == 'N N N' else "unverified"`,
  why:`Track what the state actually records. Reading a 0 always lands you in Q and reading a 1
always lands you in P, whichever state you were in, so the state after any string depends only on its
final character. The machine therefore accepts exactly the strings that end in 0, which is (0|1)*0. The
distractor 0(0|1)* describes the strings that begin with 0 instead.` },

{ id:"fr-26", kind:"problem", topic:"fsa-regex", level:"s",
  q:`Which string does (ab|ba)* NOT match?`,
  choices:["aba","ab","ba","abba","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('(ab|ba)*',[w]) == 'N'])`,
  why:`Every repetition contributes exactly two characters, so every accepted string has even
length and aba can be ruled out on its length alone. The others break down cleanly: ab and ba are one
copy each, and abba is ab followed by ba. Counting characters before tracing is a cheap first test
whenever every branch of a starred group has the same length.` },

{ id:"fr-27", kind:"concept", topic:"fsa-regex", level:"s",
  q:`What makes a finite state automaton deterministic?`,
  choices:["each state has exactly one transition for each input symbol","it has exactly one accepting state","no state may transition to itself","every transition leads to a different state","None of the above"], ans:0,
  why:`Determinism is about having no choice and no dead ends: from any state, each symbol of the
alphabet leads to exactly one next state, so a string traces out a single path and either finishes on
an accepting state or does not. A machine with two transitions on the same symbol out of one state, or
with none, is nondeterministic. The number of accepting states and any self loops are irrelevant to
it.` },

{ id:"fr-28", kind:"concept", topic:"fsa-regex", level:"s",
  q:`In the pattern (ab)*c, what does the star apply to?`,
  choices:["the whole group ab","the letter b only","the letter c","the whole pattern","None of the above"], ans:0,
  why:`A repetition operator attaches to the single item immediately in front of it, and a
bracketed group counts as one item, so the star here repeats ab as a unit. Written without the brackets
as ab*c the star would apply to b alone, and the two patterns accept quite different sets of strings.
That is the reason ababc is accepted here while abbc is not.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"wa-11", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`A four by four array is filled by A(I, J) = I * J for I and J from 1 to 4. What is the sum of
row 3?`,
  choices:["30","24","10","12","None of the above"], ans:0,
  check:`
S = 0
for J in range(1,5):
    S = S + 3*J
RESULT = S`,
  why:`Row 3 holds the cells A(3, 1) through A(3, 4), which are 3, 6, 9, and 12, adding to 30.
Factoring is quicker than adding: every cell in the row carries a factor of 3, so the sum is 3 times
(1 + 2 + 3 + 4). The first subscript is the row and the second is the column, so fixing I at 3 and
letting J run is what walks along a row rather than down a column.` },

{ id:"wa-12", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5, 6 at indices 1 through 6. After for i = 1 to 3 with a body that
swaps A(I) and A(7 &minus; I), what does A hold?`,
  choices:["6 5 4 3 2 1","1 2 3 4 5 6","6 2 3 4 5 1","1 5 4 3 2 6","None of the above"], ans:0,
  check:`
A = [0,1,2,3,4,5,6]
for I in range(1,4):
    A[I], A[7-I] = A[7-I], A[I]
RESULT = " ".join(str(x) for x in A[1:])`,
  why:`The loop stops halfway, so each pair is exchanged exactly once: 1 with 6, 2 with 5, and 3
with 4. That reverses the array. Running the same body all the way to i equal to 6 would perform every
exchange twice and leave the array exactly as it started, which is the classic reversal trap and the
whole reason the loop stops at the middle.` },

{ id:"wa-13", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 3, 2, 3, 4, 1 at indices 1 through 5. What does this print?
<pre><code>C = 0
for I = 1 to 5
    if A(I) == I then
        C = C + 1
    end if
next I
output C</code></pre>`,
  choices:["3","2","1","5","None of the above"], ans:0,
  check:`
A = [0,3,2,3,4,1]
C = 0
for I in range(1,6):
    if A[I] == I:
        C += 1
RESULT = C`,
  why:`The loop counts the positions where the stored value happens to equal its own subscript.
Comparing down the array, A(1) is 3 rather than 1, A(2) is 2, A(3) is 3, A(4) is 4, and A(5) is 1
rather than 5, so three positions match. Writing the subscripts above the values in a second row makes
this a matter of reading rather than remembering.` },

{ id:"wa-14", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5 at indices 1 through 5. After the body A(I) = A(I) + A(I &minus; 1)
runs for I from 5 down to 2, what does A hold?`,
  choices:["1 3 5 7 9","1 3 6 10 15","1 2 3 4 5","3 5 7 9 5","None of the above"], ans:0,
  check:`
A = [0,1,2,3,4,5]
for I in range(5,1,-1):
    A[I] = A[I] + A[I-1]
RESULT = " ".join(str(x) for x in A[1:])`,
  why:`Because the loop moves right to left, every read of A(I - 1) reaches a value that has not
been touched yet, so each slot simply picks up its original left neighbor. That gives 1, 3, 5, 7, and
9. Running the same body from 2 up to 5 instead would read values that had already been updated and
produce the running totals 1, 3, 6, 10, and 15, which is the second choice.` },

{ id:"wa-15", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`A three by three array is filled by A(I, J) = I * 10 + J for I and J from 1 to 3. What is the
sum of the cells where I + J equals 4?`,
  choices:["44", "36", "72", "63", "None of the above"], ans:4,
  check:`
S = 0
for I in range(1,4):
    S = S + (I*10 + (4-I))
RESULT = S`,
  why:`The cells with I + J equal to 4 are A(1, 3), A(2, 2), and A(3, 1), which run up the
antidiagonal of the grid. Their values are 13, 22, and 31, adding to 66. Drawing the three by three
grid and filling every cell takes about fifteen seconds and removes any chance of reaching for the main
diagonal instead. Since 66 is not among the four choices offered, the answer is None of the above.` },

{ id:"wa-16", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 7, 2, 9, 2, 5 at indices 1 through 5. What does this print?
<pre><code>M = 1
for I = 2 to 5
    if A(I) &lt; A(M) then
        M = I
    end if
next I
output M</code></pre>`,
  choices:["2","4","1","7","None of the above"], ans:0,
  check:`
A = [0,7,2,9,2,5]
M = 1
for I in range(2,6):
    if A[I] < A[M]:
        M = I
RESULT = M`,
  why:`M tracks the position of the smallest value rather than the value itself, so the output is
a subscript. The 2 at position 2 replaces the initial 7, and the second 2 at position 4 does not
replace it, because the test is strictly less than rather than less than or equal to. The program
therefore reports the first of the tied minima, and changing that one comparison would make it report
the last.` },

{ id:"wa-17", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5 at indices 1 through 5. What does A hold after this?
<pre><code>T = A(5)
for I = 5 to 2 step -1
    A(I) = A(I - 1)
next I
A(1) = T</code></pre>`,
  choices:["5 1 2 3 4","2 3 4 5 1","1 2 3 4 5","5 5 5 5 5","None of the above"], ans:0,
  check:`
A = [0,1,2,3,4,5]
T = A[5]
for I in range(5,1,-1):
    A[I] = A[I-1]
A[1] = T
RESULT = " ".join(str(x) for x in A[1:])`,
  why:`The last value is saved in T before anything moves, then the loop shifts every element one
place to the right, and finally the saved value is dropped into the vacated first slot. The result is a
rotation rather than a plain shift, since nothing is lost. The direction matters: running the loop
upward instead would smear A(1) across the whole array and give the fourth choice.` },

{ id:"wa-18", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`A four by four array is filled by A(I, J) = I + J for I and J from 1 to 4. What is the sum of
the cells where I + J equals 5?`,
  choices:["20","10","16","25","None of the above"], ans:0,
  check:`
S = 0
for I in range(1,5):
    S = S + (I + (5-I))
RESULT = S`,
  why:`Every cell on that antidiagonal holds the value I + J, which the condition fixes at 5, so
all four of them hold 5 and the sum is 4 times 5. Noticing that the formula and the condition are the
same expression turns this into one multiplication. The four cells are A(1, 4), A(2, 3), A(3, 2), and
A(4, 1).` },

{ id:"wa-19", kind:"problem", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 3, 3, 1, 2, 3 at indices 1 through 6, and array C holds 0, 0, 0 at indices 1
through 3. What does C hold after this?
<pre><code>for I = 1 to 6
    C(A(I)) = C(A(I)) + 1
next I</code></pre>`,
  choices:["2 1 3","1 2 3","3 1 2","2 3 1","None of the above"], ans:0,
  check:`
A = [0,1,3,3,1,2,3]
C = [0,0,0,0]
for I in range(1,7):
    C[A[I]] = C[A[I]] + 1
RESULT = " ".join(str(x) for x in C[1:])`,
  why:`The value stored in A is used as a subscript into C, so each pass adds one to the counter
belonging to whatever value it just read. Tallying A gives two 1s, one 2, and three 3s, so C finishes
holding 2, 1, and 3. Using an array element as a subscript is the whole idea behind a counting sort,
and the giveaway in the code is a subscript that is itself a subscripted expression.` },

{ id:"wa-20", kind:"concept", topic:"wdtpd-arrays", level:"j",
  q:`A loop compares each element of a one-based array of N elements with the one after it. What
should its upper bound be?`,
  choices:["N - 1","N","N + 1","N - 2","None of the above"], ans:0,
  why:`The body reads A(I + 1), so the largest safe value of I is the one that makes I + 1 equal
to N, which is N minus 1. Going as far as N would read A(N + 1), which is past the end of the array.
Any loop that looks one place ahead has to stop one place early, and that single rule explains the
otherwise odd bounds on almost every neighbor comparison you will meet.` }

]);
