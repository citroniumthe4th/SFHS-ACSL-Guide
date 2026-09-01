window.MCQ = (window.MCQ || []).concat([

{ id:"fr-01", topic:"fsa-regex", level:"s",
  q:`Which string does the regular expression (ab)*c NOT match, where a match must cover the
whole string?`,
  choices:["abab","c","abc","ababc","None of the above"], ans:0,
  check:`[w for w in CHOICES if regex_match('(ab)*c',[w]) == 'N'][0]`,
  why:`The c is required and is not optional, so any match has to end in one. The string abab
has no c at all. The other three are zero, one, and two copies of ab followed by the required c.
Remember that the star allows zero copies, which is why a bare c matches.` },

{ id:"fr-02", topic:"fsa-regex", level:"s",
  q:`How many of these strings does a*b*c* match: the empty string, abc, aabbcc, acb, and cba?`,
  choices:["3","4","2","5","None of the above"], ans:0,
  check:`str(regex_match('a*b*c*', ['-','abc','aabbcc','acb','cba']).split().count('Y'))`,
  why:`The pattern demands some a characters, then some b characters, then some c characters, in
that order, with any count including zero. The empty string qualifies because all three stars can
take zero copies. So do abc and aabbcc. Both acb and cba have letters out of order. This is the
difference between a*b*c* and (a|b|c)*, which would accept all five.` },

{ id:"fr-03", topic:"fsa-regex", level:"s",
  q:`Which string does x+y? match?`,
  choices:["xxx","y","xy y","yx","None of the above"], ans:0,
  check:`[w for w in CHOICES if regex_match('x+y?',[w.replace(' ','')]) == 'Y'][0]`,
  why:`The plus demands at least one x, and the question mark allows zero or one y after it. So
xxx matches with no y at all. A bare y fails because there is no x in front. The string yx has
the letters in the wrong order.` },

{ id:"fr-04", topic:"fsa-regex", level:"s",
  q:`Does ab|cd match the string abcd?`,
  choices:["no, because the bar splits the whole expression","yes, since it contains both ab and cd","yes, because concatenation binds tighter","no, because the bar only applies to b and c","None of the above"], ans:0,
  check:`CHOICES[0] if regex_match('ab|cd',['abcd']) == 'N' else "unverified"`,
  why:`Union has the loosest precedence, so ab|cd means the whole of ab or the whole of cd, not
a followed by b-or-c followed by d. A full match against abcd would need one of the two branches
to cover all four characters, and neither does. To get a followed by either b or c followed by d,
you have to write a(b|c)d.` },

{ id:"fr-05", topic:"fsa-regex", level:"s",
  q:`Which string is NOT matched by (a?b)+?`,
  choices:["a","b","ab","abab","None of the above"], ans:0,
  check:`[w for w in CHOICES if regex_match('(a?b)+',[w]) == 'N'][0]`,
  why:`Each repetition of the group is an optional a followed by a required b. Since every copy
must end in a b, no match can end in an a, and a single a is not a legal copy at all. The other
three are one copy without the a, one copy with it, and two copies.` },

{ id:"fr-06", topic:"fsa-regex", level:"s",
  q:`Which of these is a true statement about regular expressions?`,
  choices:["(a|b)* accepts abab but a*b* does not","(a*)* is different from a*","a+ accepts the empty string","a*a* accepts fewer strings than a*","None of the above"], ans:0,
  why:`The pattern a*b* forces all the a characters to come before all the b characters, so abab
is out, while (a|b)* accepts any arrangement of the two letters. The other three are all false:
(a*)* is the same as a*, a+ requires at least one copy, and a*a* accepts exactly the same set as
a*. Those first two false claims look plausible enough that they show up as wrong answers often.` },

{ id:"fr-07", topic:"fsa-regex", level:"s",
  q:`How many of these strings does (ab|a)*b match: ab, b, abb, aab, and ababb?`,
  choices:["5","4","3","2","None of the above"], ans:0,
  check:`str(regex_match('(ab|a)*b', ['ab','b','abb','aab','ababb']).split().count('Y'))`,
  why:`The group can produce ab or a on each repetition, and the trailing b is required. For ab,
take one copy of a then the final b. For b, take zero copies. For abb, take one copy of ab then
the final b. For aab, take two copies of a then the final b. For ababb, take ab and then ab, then
the final b. All five match, which is the point: a union inside a star gives far more coverage
than it first appears.` },

{ id:"fr-08", topic:"fsa-regex", level:"s",
  q:`An FSA has states S and F, with S the start state and F the only accepting state. From S,
reading a goes to F. From F, reading b stays at F. There are no other transitions. Which regular
expression describes the accepted strings?`,
  choices:["ab*","a*b","(ab)*","ab+","None of the above"], ans:0,
  check:`CHOICES[0] if regex_match('ab*',['a','ab','abb']) == 'Y Y Y' else "unverified"`,
  why:`Every accepted string starts with the single a that gets you to F, then any number of b
characters from the self loop, including none. That is ab*. The pattern a*b would accept b alone,
which this machine rejects since there is no b transition out of S. And ab+ would reject the bare
a, which this machine accepts because F is the start of nothing but is itself accepting after the
a.` },

{ id:"fr-09", topic:"fsa-regex", level:"s",
  q:`If the start state of an FSA is also an accepting state, what must be true of any regular
expression describing it?`,
  choices:["it must accept the empty string","it must contain a plus","it must contain a union","it must be infinite","None of the above"], ans:0,
  why:`Reaching an accepting state after reading nothing means the empty string is in the
language, so any correct expression has to accept it too. In practice that usually means a star
at the top level or an explicit optional part. Checking the empty string is the fastest way to
rule out a wrong candidate expression, and it costs about two seconds.` },

{ id:"fr-10", topic:"fsa-regex", level:"s",
  q:`Which string does m(no)*p? NOT match?`,
  choices:["mnp","m","mp","mnonop","None of the above"], ans:0,
  check:`[w for w in CHOICES if regex_match('m(no)*p?',[w]) == 'N'][0]`,
  why:`After the required m come whole copies of no, then at most one p. In mnp the n is stranded
without its o, so it is neither a complete copy of the group nor the optional p. The other three
are legal: m is zero copies with no p, mp is zero copies with the p, and mnonop is two copies
with the p. The star repeats the whole group, never a piece of it.` },

{ id:"fr-11", topic:"fsa-regex", level:"s",
  q:`What does [^abc] match?`,
  choices:["any single character other than a, b, or c","the literal text ^abc","zero or more of a, b, or c","a caret followed by a, b, or c","None of the above"], ans:0,
  why:`Inside square brackets a caret in the first position negates the class, so the pattern
matches exactly one character that is not in the set. Anywhere else inside the brackets, a caret
is just a literal caret, and outside the brackets it is the start of string anchor. Same symbol,
three meanings, decided entirely by position.` },

{ id:"fr-12", topic:"fsa-regex", level:"s",
  q:`How many strings of exactly two lowercase letters does (a|b)(a|b) match?`,
  choices:["4","2","3","1","None of the above"], ans:0,
  check:`str(regex_match('(a|b)(a|b)', ['aa','ab','ba','bb']).split().count('Y'))`,
  why:`Each group independently picks a or b, so there are two choices for the first position and
two for the second, giving four strings: aa, ab, ba, and bb. The two groups are separate, so
there is no requirement that they pick the same letter. That requirement would need a
backreference, which regular expressions in this category do not have.` },

{ id:"wa-01", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5 at indices 1 through 5. After for i = 1 to 4 with the body
A(I) = A(I + 1), what does A hold?`,
  choices:["2 3 4 5 5","1 1 2 3 4","2 2 2 2 5","1 2 3 4 5","None of the above"], ans:0,
  check:`
A = [0,1,2,3,4,5]
for I in range(1,5):
    A[I] = A[I+1]
RESULT = " ".join(str(x) for x in A[1:])`,
  why:`Moving left to right, each read happens before the value it wants gets overwritten, so
this is a clean left shift. A(1) takes 2, A(2) takes 3, A(3) takes 4, and A(4) takes 5. The last
slot is untouched and keeps its 5. Run the same body from I equal to 4 down to 1 and you get the
smeared 2 2 2 2 5 instead.` },

{ id:"wa-02", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5 at indices 1 through 5. After for i = 4 to 1 step -1 with the
body A(I + 1) = A(I), what does A hold?`,
  choices:["1 1 2 3 4","2 3 4 5 5","1 2 3 4 5","1 1 1 1 1","None of the above"], ans:0,
  check:`
A = [0,1,2,3,4,5]
for I in range(4,0,-1):
    A[I+1] = A[I]
RESULT = " ".join(str(x) for x in A[1:])`,
  why:`Going right to left, each write lands ahead of where the next read will happen, so this is
a clean right shift. A(5) takes 4, A(4) takes 3, A(3) takes 2, and A(2) takes 1. The first slot
is never written and keeps its 1. Direction is the whole question: run this loop upward and every
slot would end up holding 1.` },

{ id:"wa-03", topic:"wdtpd-arrays", level:"j",
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
  why:`This is the running maximum pattern. M starts at the first element and gets replaced
whenever a larger one turns up, so it ends holding the largest value. Starting M at 0 instead of
A(1) works here but breaks on an array of negative numbers, which is why the first element is the
safer starting point.` },

{ id:"wa-04", topic:"wdtpd-arrays", level:"j",
  q:`A two dimensional array is filled by A(I, J) = I * 10 + J for I and J from 1 to 3. What is
A(2, 3)?`,
  choices:["23","32","6","5","None of the above"], ans:0,
  check:`str(2*10+3)`,
  why:`The first subscript is the row and the second is the column, so I is 2 and J is 3, giving
23. Reading them the other way around gives 32, which is A(3, 2). Whenever a two dimensional
problem offers you both a number and its reverse, that is the mistake it is testing for.` },

{ id:"wa-05", topic:"wdtpd-arrays", level:"j",
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
  why:`The loop counts places where a value is bigger than the one after it. Comparing 5 with 3
counts, 3 with 9 does not, 9 with 1 counts, and 1 with 7 does not. That is 2. The loop stops at
index 4 so that A(I + 1) stays inside the array, which is the standard bound for any comparison
of neighbors.` },

{ id:"wa-06", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 1, 2, 3, 4, 5 at indices 1 through 5. After for i = 1 to 5 with the body that
swaps A(I) and A(6 - I), what does A hold?`,
  choices:["1 2 3 4 5","5 4 3 2 1","5 2 3 4 1","1 4 3 2 5","None of the above"], ans:0,
  check:`
A = [0,1,2,3,4,5]
for I in range(1,6):
    A[I], A[6-I] = A[6-I], A[I]
RESULT = " ".join(str(x) for x in A[1:])`,
  why:`Running the swap all the way across performs each exchange twice, once from each end, so
everything ends up back where it started. A correct reverse loops only to the middle, with
for i = 1 to 2 in this case. This is the classic reversal trap, and the answer being the original
array is exactly what makes it worth remembering.` },

{ id:"wa-07", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 2, 4, 6, 8 at indices 1 through 4. What does this print?
<pre><code>S = 0
for I = 1 to 4
    S = S + A(I) * I
next I
output S</code></pre>`,
  choices:["61", "20", "24", "40", "None of the above"], ans:4,
  check:`str(sum(a*(i+1) for i,a in enumerate([2,4,6,8])))`,
  why:`Each element is weighted by its own index: 2 times 1, plus 4 times 2, plus 6 times 3, plus
8 times 4. That is 2 + 8 + 18 + 32, or 60. The distractor 20 is the plain sum with no weighting. The value 60 is not among the four choices offered, so the answer is None of the above.` },

{ id:"wa-08", topic:"wdtpd-arrays", level:"j",
  q:`A three by three array is filled with A(I, J) = I + J for I and J from 1 to 3. What is the
sum of the main diagonal?`,
  choices:["12","9","15","18","None of the above"], ans:0,
  check:`str(sum(I+I for I in range(1,4)))`,
  why:`The main diagonal is where the row equals the column, so the cells are A(1, 1) = 2,
A(2, 2) = 4, and A(3, 3) = 6, adding to 12. Drawing the three by three grid and filling every
cell takes fifteen seconds and removes any chance of picking the wrong cells.` },

{ id:"wa-09", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 3, 1, 4, 1, 5 at indices 1 through 5. After the body A(I) = A(I) + A(I - 1)
runs for I from 2 to 5, what is A(5)?`,
  choices:["14","6","9","5","None of the above"], ans:0,
  check:`
A = [0,3,1,4,1,5]
for I in range(2,6):
    A[I] = A[I] + A[I-1]
RESULT = A[5]`,
  why:`Each slot accumulates everything before it, so the array becomes a running total: 3, 4, 8,
9, 14. Because the loop moves left to right, A(I - 1) has already been updated when it is read,
which is what turns a simple neighbor sum into a prefix sum. Running the loop backwards would
give a completely different array.` },

{ id:"wa-10", topic:"wdtpd-arrays", level:"j",
  q:`Array A holds 7, 7, 7, 7, 7. What is wrong with using T = A(I), A(I) = A(J), A(J) = T to swap
two elements, compared with A(I) = A(J) followed by A(J) = A(I)?`,
  choices:["nothing, the first version is correct and the second destroys a value","the first version needs the assignments reversed","the second version is correct and the first is redundant","both versions fail when I equals J","None of the above"], ans:0,
  why:`The three line version with a temporary holds the old value of A(I) safely while A(I) gets
overwritten, so both values survive. The two line version overwrites A(I) first, so by the time
A(J) is assigned, the original A(I) is gone and both slots end up holding the old A(J). The
temporary is not optional in a language without simultaneous assignment.` }

]);
