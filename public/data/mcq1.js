window.MCQ = (window.MCQ || []).concat([

{ id:"ns-01", topic:"number-systems", level:"b",
  q:`Convert the following number to base 8. Which digit occurs most often?
<div class="expr">EAFBDC<sub>16</sub></div>`,
  choices:["7","3","5","6","None of the above"], ans:0,
  check:`
s = to_base(from_base('EAFBDC',16), 8)
best = max(set(s), key=lambda c: (s.count(c), -int(c)))
RESULT = best`,
  why:`The temptation is to convert EAFBDC to decimal and then convert the decimal to octal, and
it is worth resisting, because binary sits underneath both bases and lets you do the whole thing by
regrouping. Each hex digit expands to four bits, so EAFBDC becomes 1110 1010 1111 1011 1101 1100.
Those same twenty four bits regrouped into threes from the right read 111 010 101 111 101 111 011
100, which is 72575734 in octal. Counting through that, 7 turns up three times while nothing else
appears more than twice.` },

{ id:"ns-02", exam:false, topic:"number-systems", level:"b",
  q:`Evaluate the following and express the answer in octal.
<div class="expr">21<sub>6</sub> + 20<sub>8</sub> + 202<sub>16</sub> + 2026<sub>8</sub></div>`,
  choices:["3065","2742","3052","3072","None of the above"], ans:0,
  check:`to_base(from_base('21',6)+from_base('20',8)+from_base('202',16)+from_base('2026',8), 8)`,
  why:`The inputs use three bases. Converting each term to decimal gives a common base for addition. Working left to right, 21 in base 6 is 13, 20 in base 8 is
16, 202 in base 16 is 514, and 2026 in base 8 is 1046, which together come to 1589. Pushing 1589
back into octal by repeated division gives remainders of 5, then 6, then 0, with a final quotient of
3, and reading those upward produces 3065.` },

{ id:"ns-03", topic:"number-systems", level:"s",
  q:`This is our 48th year of ACSL. When counting in octal from 1979<sub>10</sub> to
2026<sub>10</sub>, inclusive, how many times is the octal digit 0 used?`,
  choices:["14","10","12","22","None of the above"], ans:0,
  check:`str(sum(to_base(n,8).count('0') for n in range(1979, 2027)))`,
  why:`Write the octal endpoints down before you count anything, because the decimal ones tell
you nothing about where the zeros fall. In octal the range runs from 3673 to 3752, and zeros appear
in two places. The block 3700 through 3707 is eight numbers, each carrying a zero in the tens
position, and 3700 carries a second one in the ones position, which is nine so far. After that the
only zeros left sit in the ones position of 3710, 3720, 3730, 3740, and 3750, adding five more for a
total of 14.` },

{ id:"ns-04", topic:"number-systems", level:"s",
  q:`The color dark salmon is represented by #E9967A. Suppose 6<sub>16</sub> is added to each
component. What is the new hexadecimal color?`,
  choices:["#EF9C80","#EEAC7F","#F09D80","#FFAC7F","None of the above"], ans:0,
  check:`
RESULT = "#" + "".join(to_base(from_base(c,16)+6, 16).rjust(2,'0') for c in ['E9','96','7A'])`,
  why:`A colour code is three separate numbers that happen to be written side by side, so split
the six digits into pairs and add 6 to each pair on its own, never letting a carry cross from one
component into the next. E9 plus 6 is EF and 96 plus 6 is 9C, both straightforward. The third pair
is where the arithmetic bites, since 7A plus 6 needs A plus 6, which is sixteen, so the low digit
becomes 0 and the 7 carries up to 8, giving 80. Treating all six digits as one number is the mistake
this question exists to catch.` },

{ id:"ns-05", topic:"number-systems", level:"b",
  q:`Convert 3676<sub>8</sub> to hexadecimal.`,
  choices:["7BE","F7E","3BE","7B6","None of the above"], ans:0,
  check:`to_base(from_base('3676',8),16)`,
  why:`Both bases are powers of two, which means binary is the bridge and decimal is a detour.
Expanding each octal digit into three bits gives 011 110 111 110, and regrouping those twelve bits
into fours from the right gives 0111, 1011, and 1110, which read as 7, B, and E. Converting through decimal also works, but grouping bits avoids that extra conversion.` },

{ id:"ns-06", topic:"number-systems", level:"b",
  q:`Evaluate the following in hexadecimal.
<div class="expr">F5AD<sub>16</sub> &minus; 69EB<sub>16</sub></div>`,
  choices:["8BC2","8CC2","9BC2","8BB2","None of the above"], ans:0,
  check:`to_base(from_base('F5AD',16)-from_base('69EB',16),16)`,
  why:`Subtraction in hexadecimal works exactly as it does in decimal once you accept that a
borrow brings over sixteen rather than ten. Column by column from the right, D minus B is 2. A minus
E will not go, so borrowing makes it 26 minus 14, which is 12, or C, and the 5 above drops to 4.
Then 4 minus 9 borrows again, giving 20 minus 9, which is 11, or B, and the F drops to E. Finally E
minus 6 is 8, so the answer reads 8BC2.` },

{ id:"ns-07", topic:"number-systems", level:"j",
  q:`Convert 11011010<sub>2</sub> to octal.`,
  choices:["332","326","272","432","None of the above"], ans:0,
  check:`to_base(from_base('11011010',2),8)`,
  why:`Since 8 is 2 cubed, each octal digit is exactly three bits, so this conversion is nothing
more than regrouping. Taking the bits in threes from the right gives 11, 011, and 010, and that
leftmost group pads out to 011. Reading each group as a single digit gives 3, 3, and 2.` },

{ id:"ns-08", topic:"number-systems", level:"j",
  q:`Convert 11011010<sub>2</sub> to hexadecimal.`,
  choices:["DA","BA","D2","AD","None of the above"], ans:0,
  check:`to_base(from_base('11011010',2),16)`,
  why:`Sixteen is 2 to the fourth, so hexadecimal works in groups of four rather than three.
From the right those groups are 1101 and 1010, which are thirteen and ten, and therefore D and A.
The same value is 332 in octal. To compare the two representations, expand their digits back into binary.` },

{ id:"ns-09", topic:"number-systems", level:"b",
  q:`Solve for the base b.
<div class="expr">34<sub>b</sub> = 28<sub>10</sub></div>`,
  choices:["8","7","9","6","None of the above"], ans:0,
  check:`str([b for b in range(5,17) if from_base('34',b)==28][0])`,
  why:`Writing the place values out turns this into ordinary algebra. The number 34 in base b
means three lots of b plus four, so setting 3b + 4 equal to 28 gives 3b equal to 24 and b equal to 8.
Having found a base, check that every digit used is legal in it, since a digit of 4 would rule out
any base of 4 or below.` },

{ id:"ns-10", topic:"number-systems", level:"j",
  q:`Evaluate the following and express the answer in binary.
<div class="expr">10110<sub>2</sub> + 1101<sub>2</sub></div>`,
  choices:["100011","100111","110011","100001","None of the above"], ans:0,
  check:`to_base(from_base('10110',2)+from_base('1101',2),2)`,
  why:`Pad the shorter operand and add column by column, carrying whenever a column reaches 2
rather than waiting for it to reach 10. If you would rather check the answer than trust the carries,
the sum is 22 plus 13 in decimal, which is 35, and 35 in binary is 100011.` },

{ id:"ns-11", exam:false, topic:"number-systems", level:"s",
  q:`How many integers from 1 through 100<sub>10</sub>, inclusive, end in the digit 3 when written
in base 5?`,
  choices:["20","25","19","21","None of the above"], ans:0,
  check:`str(len([n for n in range(1,101) if to_base(n,5)[-1]=='3']))`,
  why:`No conversion is needed at all once you notice that the last digit of a number written in
base 5 is simply its remainder on division by 5. The question is therefore asking how many numbers
between 1 and 100 leave a remainder of 3, and those run 3, 8, 13, and so on up to 98, which is an
arithmetic sequence of 20 terms.` },

{ id:"ns-12", topic:"number-systems", level:"s",
  q:`Evaluate the following and express the answer in hexadecimal.
<div class="expr">2<sup>10</sup></div>`,
  choices:["400","1000","200","800","None of the above"], ans:0,
  check:`to_base(1024,16)`,
  why:`Because 16 is 2 to the fourth, any power of two whose exponent is a multiple of four is a
1 followed by zeros in hexadecimal, and you can work outward from there. Here 2 to the tenth is 4
times 2 to the eighth, and 2 to the eighth is 16 squared, so the answer is a 4 followed by two zeros.
The distractor 1000 is what you would get for 2 to the twelfth.` },

{ id:"ns-13", topic:"number-systems", level:"s",
  q:`Evaluate the following binary fraction and express the answer in base 10.
<div class="expr">0.1011<sub>2</sub></div>`,
  choices:["0.6875","0.6125","0.7125","0.5875","None of the above"], ans:0,
  check:`str(11/16)`,
  why:`Positions to the right of the point are worth negative powers of two, so 0.1011 is one
half plus one eighth plus one sixteenth. There is a quicker route that avoids adding fractions
altogether, since the digits 1011 are 11 and there are four places after the point, making the value
simply 11 over 16.` },

{ id:"ns-14", topic:"number-systems", level:"b",
  q:`How many bits are needed to write 1000<sub>10</sub> in binary?`,
  choices:["8", "9", "11", "12", "None of the above"], ans:4,
  check:`str(len(to_base(1000,2)))`,
  why:`Find the largest power of two that does not exceed 1000. Since 512 is 2 to the ninth and
1024 is 2 to the tenth, the highest bit that fires sits in position 9 counting from zero, and
positions 0 through 9 make ten bits. Because 10 is not among the four choices offered, the answer
here is None of the above.` },

{ id:"ns-15", topic:"number-systems", level:"s",
  q:`Convert 2024<sub>10</sub> to hexadecimal. What is the sum of its digits in base 10?`,
  choices:["29","22","19","25","None of the above"], ans:0,
  check:`str(sum(int(c,16) for c in to_base(2024,16)))`,
  why:`Dividing repeatedly, 2024 over 16 is 126 with remainder 8, then 126 over 16 is 7 with
remainder 14, and finally 7, so reading the remainders upward gives 7E8. The second half of the
question is where the marks are, because summing the digits means summing their values in base 10,
so 7 plus 14 plus 8, which is 29. Adding the characters as though E were a decimal digit is exactly
the mistake being tested.` },

{ id:"ns-16", topic:"number-systems", level:"s",
  q:`In how many bases b, where 2 &le; b &le; 16, is 63<sub>10</sub> a palindrome of two or more
digits?`,
  choices:["3","2","4","1","None of the above"], ans:0,
  check:`str(len([b for b in range(2,17) if len(to_base(63,b))>1 and to_base(63,b)==to_base(63,b)[::-1]]))`,
  why:`Write 63 out in each base and look at what you get. Base 2 gives 111111, base 4 gives
333, and base 8 gives 77, and all three read the same in either direction. No other base from 2
through 16 produces a palindrome, and although every base above 63 would give a single digit, the
question rules those out by asking for two or more digits, so the count is 3.` },

{ id:"ns-17", topic:"number-systems", level:"j",
  q:`What is the largest number that can be written with four hexadecimal digits, expressed in
base 10?`,
  choices:["65535","65536","4095","32767","None of the above"], ans:0,
  check:`str(16**4-1)`,
  why:`Four hexadecimal digits hold 16 to the fourth different values, which is 65536 of them
running from 0 up to 65535, so the largest is FFFF. Four hex digits is also exactly sixteen bits,
which is why FFFF and 65535 keep turning up together in problems about storage sizes.` },

{ id:"ns-18", topic:"number-systems", level:"s",
  q:`Evaluate the following and express the answer in base 4.
<div class="expr">1F<sub>16</sub> &minus; 25<sub>8</sub></div>`,
  choices:["30","31","102","33","None of the above"], ans:4,
  check:`to_base(from_base('1F',16)-from_base('25',8),4)`,
  why:`The two operands live in different bases, so both have to reach decimal before they can
be subtracted. 1F in hexadecimal is 31 and 25 in octal is 21, leaving a difference of 10. Writing 10
in base 4 gives 2 with remainder 2, so the answer is 22, and since 22 is not among the first four
choices the correct response is None of the above.` }

]);
