window.MCQ = (window.MCQ || []).concat([

{ id:"ns-01", topic:"number-systems", level:"b",
  q:`Convert the following number to base 8. Which digit occurs most often?
<div class="expr">EAFBDC<sub>16</sub></div>`,
  choices:["7","3","5","6","None of the above"], ans:0,
  check:`
s = to_base(from_base('EAFBDC',16), 8)
best = max(set(s), key=lambda c: (s.count(c), -int(c)))
RESULT = best`,
  why:`Go through binary rather than through decimal. Each hex digit is four bits, so EAFBDC is
1110 1010 1111 1011 1101 1100. Regroup those twenty four bits into threes from the right:
111 010 101 111 101 111 011 100, which reads 72575734 in octal. Counting digits, 7 appears four
times and nothing else appears more than twice.` },

{ id:"ns-02", topic:"number-systems", level:"b",
  q:`Evaluate the following and express the answer in octal.
<div class="expr">21<sub>6</sub> + 20<sub>8</sub> + 202<sub>16</sub> + 2026<sub>8</sub></div>`,
  choices:["3065","2742","3052","3072","None of the above"], ans:0,
  check:`to_base(from_base('21',6)+from_base('20',8)+from_base('202',16)+from_base('2026',8), 8)`,
  why:`Convert each term to decimal first, since they are in four different bases. 21 in base 6
is 13, 20 in base 8 is 16, 202 in base 16 is 514, and 2026 in base 8 is 1046. Those add to 1589.
Now push 1589 back into octal: 1589 divided by 8 is 198 remainder 5, then 198 over 8 is 24
remainder 6, then 24 over 8 is 3 remainder 0, then 3. Reading upward gives 3065.` },

{ id:"ns-03", topic:"number-systems", level:"s",
  q:`This is our 48th year of ACSL. When counting in octal from 1979<sub>10</sub> to
2026<sub>10</sub>, inclusive, how many times is the octal digit 0 used?`,
  choices:["14","10","12","22","None of the above"], ans:0,
  check:`str(sum(to_base(n,8).count('0') for n in range(1979, 2027)))`,
  why:`In octal the range runs from 3673 to 3752. The only zeros appear in the block 3700 through
3707, where every number has a 0 in the tens place, and 3700 itself has a second one in the ones
place. That is eight numbers contributing one zero each, plus the extra zero in 3700, plus 3710
through 3750 contributing one apiece in the ones place for 3710, 3720, 3730, 3740, and 3750.
Counting carefully gives 14. Write the octal endpoints down first, because the decimal endpoints
tell you nothing about where the zeros fall.` },

{ id:"ns-04", topic:"number-systems", level:"s",
  q:`The color dark salmon is represented by #E9967A. Suppose 6<sub>16</sub> is added to each
component. What is the new hexadecimal color?`,
  choices:["#EF9C80","#EEAC7F","#F09D80","#FFAC7F","None of the above"], ans:0,
  check:`
RESULT = "#" + "".join(to_base(from_base(c,16)+6, 16).rjust(2,'0') for c in ['E9','96','7A'])`,
  why:`Split the six digits into three pairs and add 6 to each pair separately, carrying only
inside its own pair. E9 plus 6 is EF. 96 plus 6 is 9C. 7A plus 6 is 80, because A plus 6 is 16,
which is 10 in hex, so the low digit becomes 0 and the 7 becomes 8. The trap is treating the six
digits as one number and letting a carry cross from one component into the next.` },

{ id:"ns-05", topic:"number-systems", level:"b",
  q:`Convert 3676<sub>8</sub> to hexadecimal.`,
  choices:["7BE","F7E","3BE","7B6","None of the above"], ans:0,
  check:`to_base(from_base('3676',8),16)`,
  why:`Expand each octal digit into three bits: 011 110 111 110. Regroup those twelve bits into
fours from the right: 0111, 1011, 1110. Read them as hex and you get 7BE. Routing through decimal
takes three times as long and gives arithmetic mistakes three chances to happen.` },

{ id:"ns-06", topic:"number-systems", level:"b",
  q:`Evaluate the following in hexadecimal.
<div class="expr">F5AD<sub>16</sub> &minus; 69EB<sub>16</sub></div>`,
  choices:["8BC2","8CC2","9BC2","8BB2","None of the above"], ans:0,
  check:`to_base(from_base('F5AD',16)-from_base('69EB',16),16)`,
  why:`Column by column from the right. D minus B is 2. A minus E needs a borrow, so 26 minus 14
is 12, which is C, and the next column drops from 5 to 4. Then 4 minus 9 borrows again, so 20
minus 9 is 11, which is B, and F drops to E. Finally E minus 6 is 8.` },

{ id:"ns-07", topic:"number-systems", level:"j",
  q:`Convert 11011010<sub>2</sub> to octal.`,
  choices:["332","326","272","432","None of the above"], ans:0,
  check:`to_base(from_base('11011010',2),8)`,
  why:`Group the bits into threes starting from the right: 11 011 010, and pad the leftmost group
to 011. Each group is one octal digit, giving 3, 3, and 2.` },

{ id:"ns-08", topic:"number-systems", level:"j",
  q:`Convert 11011010<sub>2</sub> to hexadecimal.`,
  choices:["DA","BA","D2","AD","None of the above"], ans:0,
  check:`to_base(from_base('11011010',2),16)`,
  why:`Group into fours from the right: 1101 and 1010, which are 13 and 10, so D and A. This is
the same number as the previous question, and its octal and hex forms look nothing alike. That is
worth internalizing, because it means you can never sanity check one against the other by eye.` },

{ id:"ns-09", topic:"number-systems", level:"b",
  q:`Solve for the base b.
<div class="expr">34<sub>b</sub> = 28<sub>10</sub></div>`,
  choices:["8","7","9","6","None of the above"], ans:0,
  check:`str([b for b in range(5,17) if from_base('34',b)==28][0])`,
  why:`Write the place values out. The number 34 in base b means 3b plus 4. Setting that equal to
28 gives 3b equal to 24, so b is 8. Check that the digits are legal in the base you found, since
a digit of 4 would rule out any base of 4 or less.` },

{ id:"ns-10", topic:"number-systems", level:"j",
  q:`Evaluate the following and express the answer in binary.
<div class="expr">10110<sub>2</sub> + 1101<sub>2</sub></div>`,
  choices:["100011","100111","110011","100001","None of the above"], ans:0,
  check:`to_base(from_base('10110',2)+from_base('1101',2),2)`,
  why:`Pad the shorter operand and add columnwise, carrying when a column reaches 2 instead of
10. In decimal this is 22 plus 13, which is 35, and 35 in binary is 100011.` },

{ id:"ns-11", topic:"number-systems", level:"s",
  q:`How many integers from 1 through 100<sub>10</sub>, inclusive, end in the digit 3 when written
in base 5?`,
  choices:["20","25","19","21","None of the above"], ans:0,
  check:`str(len([n for n in range(1,101) if to_base(n,5)[-1]=='3']))`,
  why:`The last digit in base 5 is the remainder on division by 5, so you want the numbers
congruent to 3 modulo 5. Those run 3, 8, 13, and so on up to 98, which is 20 terms. No conversion
is needed at all once you see that the last digit is just the remainder.` },

{ id:"ns-12", topic:"number-systems", level:"s",
  q:`Evaluate the following and express the answer in hexadecimal.
<div class="expr">2<sup>10</sup></div>`,
  choices:["400","1000","200","800","None of the above"], ans:0,
  check:`to_base(1024,16)`,
  why:`Because 16 is 2 to the fourth, every power of two whose exponent is a multiple of 4 is a 1
followed by zeros in hex. Here 2 to the tenth is 4 times 2 to the eighth, and 2 to the eighth is
16 squared, so the answer is 4 followed by two zeros. The distractor 1000 is 2 to the twelfth.` },

{ id:"ns-13", topic:"number-systems", level:"s",
  q:`Evaluate the following binary fraction and express the answer in base 10.
<div class="expr">0.1011<sub>2</sub></div>`,
  choices:["0.6875","0.6125","0.7125","0.5875","None of the above"], ans:0,
  check:`str(11/16)`,
  why:`Digits right of the point are worth negative powers of two, so this is one half plus one
eighth plus one sixteenth. A faster route: 1011 is 11, and there are four places after the point,
so the value is 11 over 16.` },

{ id:"ns-14", topic:"number-systems", level:"b",
  q:`How many bits are needed to write 1000<sub>10</sub> in binary?`,
  choices:["8", "9", "11", "12", "None of the above"], ans:4,
  check:`str(len(to_base(1000,2)))`,
  why:`Find the largest power of two not exceeding 1000. Since 512 is 2 to the ninth and 1024 is
2 to the tenth, the highest bit that fires sits in position 9 counting from 0, and positions 0
through 9 is ten bits. The value 10 is not among the four choices offered, so the answer is None of the above.` },

{ id:"ns-15", topic:"number-systems", level:"s",
  q:`Convert 2024<sub>10</sub> to hexadecimal. What is the sum of its digits in base 10?`,
  choices:["29","22","19","25","None of the above"], ans:0,
  check:`str(sum(int(c,16) for c in to_base(2024,16)))`,
  why:`Divide repeatedly: 2024 over 16 is 126 remainder 8, then 126 over 16 is 7 remainder 14,
then 7. Reading upward gives 7E8. Now sum the digit values in base 10: 7 plus 14 plus 8, which is
29. Summing the characters as if E were a decimal digit is the mistake this asks about.` },

{ id:"ns-16", topic:"number-systems", level:"s",
  q:`In how many bases b, where 2 &le; b &le; 16, is 63<sub>10</sub> a palindrome of two or more
digits?`,
  choices:["3","2","4","1","None of the above"], ans:0,
  check:`str(len([b for b in range(2,17) if len(to_base(63,b))>1 and to_base(63,b)==to_base(63,b)[::-1]]))`,
  why:`Write 63 in each base and look. Base 2 gives 111111, base 4 gives 333, and base 8 gives 77,
all palindromes. Every other base from 2 through 16 fails, and bases larger than 63 would give a
single digit, which the question rules out. The count is 3.` },

{ id:"ns-17", topic:"number-systems", level:"j",
  q:`What is the largest number that can be written with four hexadecimal digits, expressed in
base 10?`,
  choices:["65535","65536","4095","32767","None of the above"], ans:0,
  check:`str(16**4-1)`,
  why:`Four hex digits hold 16 to the fourth values, which is 65536 of them, running from 0 through
65535. The largest is FFFF. Four hex digits is exactly sixteen bits, which is why FFFF and 65535
turn up together so often.` },

{ id:"ns-18", topic:"number-systems", level:"s",
  q:`Evaluate the following and express the answer in base 4.
<div class="expr">1F<sub>16</sub> &minus; 25<sub>8</sub></div>`,
  choices:["30","31","102","33","None of the above"], ans:4,
  check:`to_base(from_base('1F',16)-from_base('25',8),4)`,
  why:`Convert both to decimal, since they live in different bases. 1F in hex is 31 and 25 in
octal is 21, so the difference is 10. Now write 10 in base 4: 10 over 4 is 2 remainder 2, so the
answer is 22. Since 22 is not among the first four choices, the answer is None of the above.` }

]);
