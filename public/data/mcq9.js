window.MCQ = (window.MCQ || []).concat([

{ id:"fr-01", kind: "problem", topic:"fsa-regex", level:"s",
  q:`Which string does the regular expression (ab)*c NOT match, where a match must cover the
whole string?`,
  choices:["abab","c","abc","ababc","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('(ab)*c',[w]) == 'N'])`,
  why:`The c at the end of the pattern is required rather than optional, so every accepted
string has to finish with one, and abab has no c anywhere in it. The other three are zero, one, and
two copies of ab followed by that required c. The bare c is the case worth pausing on, since it is a
reminder that the star permits zero copies as readily as it permits many.` },

{ id:"fr-02", kind: "problem", topic:"fsa-regex", level:"s",
  q:`How many of these strings does a*b*c* match: the empty string, abc, aabbcc, acb, and cba?`,
  choices:["3","4","2","5","None of the above"], ans:0,
  check:`str(regex_match('a*b*c*', ['-','abc','aabbcc','acb','cba']).split().count('Y'))`,
  why:`The pattern asks for some a characters, then some b characters, then some c characters, in
that order, with any count including none. The empty string qualifies because all three stars may take
zero copies, and abc and aabbcc qualify in the obvious way, while acb and cba both have letters out of
order. The contrast worth drawing is with (a|b|c)*, which would accept all five, since it imposes no
ordering at all.` },

{ id:"fr-03", kind: "problem", topic:"fsa-regex", level:"s",
  q:`Which string does x+y? match?`,
  choices:["xxx","y","xy y","yx","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('x+y?',[w.replace(' ','')]) == 'Y'])`,
  why:`The plus insists on at least one x, while the question mark permits either zero or one y
after it, so xxx matches perfectly well with no y at all. A bare y fails because nothing supplies the
required x in front of it, and yx has the two letters the wrong way round.` },

{ id:"fr-04", kind: "concept", topic:"fsa-regex", level:"s",
  q:`Does ab|cd match the string abcd?`,
  choices:["no, because the bar splits the whole expression","yes, since it contains both ab and cd","yes, because concatenation binds tighter","no, because the bar only applies to b and c","None of the above"], ans:0,
  check:`"no, because the bar splits the whole expression" if regex_match('ab|cd',['abcd']) == 'N' else "unverified"`,
  why:`Union has the loosest precedence of all the operators, so ab|cd means the whole of ab or
the whole of cd rather than a followed by b-or-c followed by d. For a full match against abcd, one of
the two branches would have to cover all four characters, and neither comes close. Getting a followed
by either b or c followed by d requires the brackets to be written explicitly, as a(b|c)d.` },

{ id:"fr-05", kind: "problem", topic:"fsa-regex", level:"s",
  q:`Which string is NOT matched by (a?b)+?`,
  choices:["a","b","ab","abab","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('(a?b)+',[w]) == 'N'])`,
  why:`Each repetition of the group is an optional a followed by a required b, so every copy ends
in a b and therefore no accepted string can end in an a. A single a is not even a legal copy of the
group. The other three break down as one copy without the a, one copy with it, and two copies.` },

{ id:"fr-06", kind: "concept", topic:"fsa-regex", level:"s",
  q:`Which of these is a true statement about regular expressions?`,
  choices:["(a|b)* accepts abab but a*b* does not","(a*)* is different from a*","a+ accepts the empty string","a*a* accepts fewer strings than a*","None of the above"], ans:0,
  why:`The pattern a*b* forces every a to come before every b, so it rejects abab, while (a|b)*
accepts any arrangement of the two letters whatever. The other three claims are all false: (a*)* is
the same language as a*, a+ insists on at least one copy, and a*a* accepts exactly what a* accepts.
The first two of those false claims look plausible enough that they turn up as distractors
regularly.` },

{ id:"fr-07", kind: "problem", topic:"fsa-regex", level:"s",
  q:`How many of these strings does (ab|a)*b match: ab, b, abb, aab, and ababb?`,
  choices:["5","4","3","2","None of the above"], ans:0,
  check:`str(regex_match('(ab|a)*b', ['ab','b','abb','aab','ababb']).split().count('Y'))`,
  why:`The group can produce either ab or a on each repetition, and the trailing b is required in
every case. Take one copy of a and the final b for ab, zero copies for b, one copy of ab and the final
b for abb, two copies of a and the final b for aab, and two copies of ab and the final b for ababb.
All five are accepted, which is the point of the question: a union sitting inside a star covers far
more ground than it appears to at a glance.` },

{ id:"fr-08", kind: "problem", topic:"fsa-regex", level:"s",
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

{ id:"fr-09", kind: "concept", topic:"fsa-regex", level:"s",
  q:`If the start state of an FSA is also an accepting state, what must be true of any regular
expression describing it?`,
  choices:["it must accept the empty string","it must contain a plus","it must contain a union","it must be infinite","None of the above"], ans:0,
  why:`Reaching an accepting state after reading nothing at all means the empty string belongs to
the language, so any expression describing that machine has to accept it too. In practice that usually
shows up as a star at the top level or an explicitly optional part. Testing the empty string against a
candidate expression takes about two seconds and is the fastest way to rule a wrong one out.` },

{ id:"fr-10", kind: "problem", topic:"fsa-regex", level:"s",
  q:`Which string does m(no)*p? NOT match?`,
  choices:["mnp","m","mp","mnonop","None of the above"], ans:0,
  check:`only([w for w in CHOICES[:4] if regex_match('m(no)*p?',[w]) == 'N'])`,
  why:`After the required m come whole copies of no, then at most one p. In mnp the n is stranded
without its o, so it is neither a complete copy of the group nor the optional p, and nothing else in
the pattern can account for it. The other three are legal: m is zero copies with no p, mp is zero
copies with the p, and mnonop is two copies with the p. A star repeats its whole group and never a
fragment of one.` },

{ id:"fr-11", kind: "concept", topic:"fsa-regex", level:"s",
  q:`What does [^abc] match?`,
  choices:["any single character other than a, b, or c","the literal text ^abc","zero or more of a, b, or c","a caret followed by a, b, or c","None of the above"], ans:0,
  why:`A caret in the first position inside square brackets negates the class, so the pattern
matches exactly one character that is not in the set. Anywhere else inside the brackets it is simply a
literal caret, and outside the brackets altogether it anchors the match to the start of the string.
One symbol with three meanings, decided entirely by where it sits.` },

{ id:"fr-12", kind: "problem", topic:"fsa-regex", level:"s",
  q:`How many strings of exactly two lowercase letters does (a|b)(a|b) match?`,
  choices:["4","2","3","1","None of the above"], ans:0,
  check:`str(regex_match('(a|b)(a|b)', ['aa','ab','ba','bb']).split().count('Y'))`,
  why:`Each group independently chooses a or b, so there are two choices for the first position
and two for the second, giving aa, ab, ba, and bb. The two groups are entirely separate, and nothing
in the pattern requires them to choose the same letter. Imposing that would need a backreference,
which the regular expressions in this category do not provide.` },

{ id:"wa-01", kind: "problem", topic:"wdtpd-arrays", level:"j",
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

{ id:"wa-02", kind: "problem", topic:"wdtpd-arrays", level:"j",
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

{ id:"wa-03", kind: "problem", topic:"wdtpd-arrays", level:"j",
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

{ id:"wa-04", kind: "problem", topic:"wdtpd-arrays", level:"j",
  q:`A two dimensional array is filled by A(I, J) = I * 10 + J for I and J from 1 to 3. What is
A(2, 3)?`,
  choices:["23","32","6","5","None of the above"], ans:0,
  check:`str(2*10+3)`,
  why:`The first subscript is the row and the second is the column, so with I at 2 and J at 3 the
formula gives 23. Reading the subscripts the other way round gives 32, which is the value at A(3, 2).
Whenever a two dimensional problem offers you both a number and its reverse among the choices, that
reversal is precisely what it is testing.` },

{ id:"wa-05", kind: "problem", topic:"wdtpd-arrays", level:"j",
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
for any loop comparing neighbours.` },

{ id:"wa-06", kind: "problem", topic:"wdtpd-arrays", level:"j",
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

{ id:"wa-07", kind: "problem", topic:"wdtpd-arrays", level:"j",
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

{ id:"wa-08", kind: "problem", topic:"wdtpd-arrays", level:"j",
  q:`A three by three array is filled with A(I, J) = I + J for I and J from 1 to 3. What is the
sum of the main diagonal?`,
  choices:["12","9","15","18","None of the above"], ans:0,
  check:`str(sum(I+I for I in range(1,4)))`,
  why:`The main diagonal is the set of cells where the row subscript equals the column subscript,
so the cells are A(1, 1) equal to 2, A(2, 2) equal to 4, and A(3, 3) equal to 6, adding to 12. Drawing
the three by three grid and filling in every cell takes about fifteen seconds and removes any chance
of reaching for the wrong ones.` },

{ id:"wa-09", kind: "problem", topic:"wdtpd-arrays", level:"j",
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
it is read, and that is what turns what looks like a simple neighbour sum into a prefix sum. Running
the same loop backwards would produce a completely different array.` },

{ id:"wa-10", kind: "concept", topic:"wdtpd-arrays", level:"j",
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
    "id": "fr-13", kind: "problem",
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
    "id": "fr-14", kind: "problem",
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
