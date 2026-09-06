window.MCQ = (window.MCQ || []).concat([

{ id:"ns-01", kind:"problem", topic:"number-systems", level:"b",
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

{ id:"ns-02", kind:"extension", exam:false, topic:"number-systems", level:"b",
  q:`Evaluate the following and express the answer in octal.
<div class="expr">21<sub>6</sub> + 20<sub>8</sub> + 202<sub>16</sub> + 2026<sub>8</sub></div>`,
  choices:["3065","2742","3052","3072","None of the above"], ans:0,
  check:`to_base(from_base('21',6)+from_base('20',8)+from_base('202',16)+from_base('2026',8), 8)`,
  why:`The inputs use three bases. Converting each term to decimal gives a common base for addition. Working left to right, 21 in base 6 is 13, 20 in base 8 is
16, 202 in base 16 is 514, and 2026 in base 8 is 1046, which together come to 1589. Pushing 1589
back into octal by repeated division gives remainders of 5, then 6, then 0, with a final quotient of
3, and reading those upward produces 3065.` },

{ id:"ns-03", kind:"problem", topic:"number-systems", level:"s",
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

{ id:"ns-04", kind:"problem", topic:"number-systems", level:"s",
  q:`The color dark salmon is represented by #E9967A. Suppose 6<sub>16</sub> is added to each
component. What is the new hexadecimal color?`,
  choices:["#EF9C80","#EEAC7F","#F09D80","#FFAC7F","None of the above"], ans:0,
  check:`
RESULT = "#" + "".join(to_base(from_base(c,16)+6, 16).rjust(2,'0') for c in ['E9','96','7A'])`,
  why:`A color code is three separate numbers that happen to be written side by side, so split
the six digits into pairs and add 6 to each pair on its own, never letting a carry cross from one
component into the next. E9 plus 6 is EF and 96 plus 6 is 9C, both straightforward. The third pair
is where the arithmetic bites, since 7A plus 6 needs A plus 6, which is sixteen, so the low digit
becomes 0 and the 7 carries up to 8, giving 80. Treating all six digits as one number is the mistake
this question exists to catch.` },

{ id:"ns-05", kind:"problem", topic:"number-systems", level:"b",
  q:`Convert 3676<sub>8</sub> to hexadecimal.`,
  choices:["7BE","F7E","3BE","7B6","None of the above"], ans:0,
  check:`to_base(from_base('3676',8),16)`,
  why:`Both bases are powers of two, which means binary is the bridge and decimal is a detour.
Expanding each octal digit into three bits gives 011 110 111 110, and regrouping those twelve bits
into fours from the right gives 0111, 1011, and 1110, which read as 7, B, and E. Converting through decimal also works, but grouping bits avoids that extra conversion.` },

{ id:"ns-06", kind:"problem", topic:"number-systems", level:"b",
  q:`Evaluate the following in hexadecimal.
<div class="expr">F5AD<sub>16</sub> &minus; 69EB<sub>16</sub></div>`,
  choices:["8BC2","8CC2","9BC2","8BB2","None of the above"], ans:0,
  check:`to_base(from_base('F5AD',16)-from_base('69EB',16),16)`,
  why:`Subtraction in hexadecimal works exactly as it does in decimal once you accept that a
borrow brings over sixteen rather than ten. Column by column from the right, D minus B is 2. A minus
E will not go, so borrowing makes it 26 minus 14, which is 12, or C, and the 5 above drops to 4.
Then 4 minus 9 borrows again, giving 20 minus 9, which is 11, or B, and the F drops to E. Finally E
minus 6 is 8, so the answer reads 8BC2.` },

{ id:"ns-07", kind:"problem", topic:"number-systems", level:"j",
  q:`Convert 11011010<sub>2</sub> to octal.`,
  choices:["332","326","272","432","None of the above"], ans:0,
  check:`to_base(from_base('11011010',2),8)`,
  why:`Since 8 is 2 cubed, each octal digit is exactly three bits, so this conversion is nothing
more than regrouping. Taking the bits in threes from the right gives 11, 011, and 010, and that
leftmost group pads out to 011. Reading each group as a single digit gives 3, 3, and 2.` },

{ id:"ns-08", kind:"problem", topic:"number-systems", level:"j",
  q:`Convert 11011010<sub>2</sub> to hexadecimal.`,
  choices:["DA","BA","D2","AD","None of the above"], ans:0,
  check:`to_base(from_base('11011010',2),16)`,
  why:`Sixteen is 2 to the fourth, so hexadecimal works in groups of four rather than three.
From the right those groups are 1101 and 1010, which are thirteen and ten, and therefore D and A.
The same value is 332 in octal. To compare the two representations, expand their digits back into binary.` },

{ id:"ns-09", kind:"problem", topic:"number-systems", level:"b",
  q:`Solve for the base b.
<div class="expr">34<sub>b</sub> = 28<sub>10</sub></div>`,
  choices:["8","7","9","6","None of the above"], ans:0,
  check:`str([b for b in range(5,17) if from_base('34',b)==28][0])`,
  why:`Writing the place values out turns this into ordinary algebra. The number 34 in base b
means three lots of b plus four, so setting 3b + 4 equal to 28 gives 3b equal to 24 and b equal to 8.
Having found a base, check that every digit used is legal in it, since a digit of 4 would rule out
any base of 4 or below.` },

{ id:"ns-10", kind:"problem", topic:"number-systems", level:"j",
  q:`Evaluate the following and express the answer in binary.
<div class="expr">10110<sub>2</sub> + 1101<sub>2</sub></div>`,
  choices:["100011","100111","110011","100001","None of the above"], ans:0,
  check:`to_base(from_base('10110',2)+from_base('1101',2),2)`,
  why:`Pad the shorter operand and add column by column, carrying whenever a column reaches 2
rather than waiting for it to reach 10. If you would rather check the answer than trust the carries,
the sum is 22 plus 13 in decimal, which is 35, and 35 in binary is 100011.` },

{ id:"ns-11", kind:"extension", exam:false, topic:"number-systems", level:"s",
  q:`How many integers from 1 through 100<sub>10</sub>, inclusive, end in the digit 3 when written
in base 5?`,
  choices:["20","25","19","21","None of the above"], ans:0,
  check:`str(len([n for n in range(1,101) if to_base(n,5)[-1]=='3']))`,
  why:`No conversion is needed at all once you notice that the last digit of a number written in
base 5 is simply its remainder on division by 5. The question is therefore asking how many numbers
between 1 and 100 leave a remainder of 3, and those run 3, 8, 13, and so on up to 98, which is an
arithmetic sequence of 20 terms.` },

{ id:"ns-12", kind:"problem", topic:"number-systems", level:"s",
  q:`Evaluate the following and express the answer in hexadecimal.
<div class="expr">2<sup>10</sup></div>`,
  choices:["400","1000","200","800","None of the above"], ans:0,
  check:`to_base(1024,16)`,
  why:`Because 16 is 2 to the fourth, any power of two whose exponent is a multiple of four is a
1 followed by zeros in hexadecimal, and you can work outward from there. Here 2 to the tenth is 4
times 2 to the eighth, and 2 to the eighth is 16 squared, so the answer is a 4 followed by two zeros.
The distractor 1000 is what you would get for 2 to the twelfth.` },

{ id:"ns-13", kind:"problem", topic:"number-systems", level:"s",
  q:`Evaluate the following binary fraction and express the answer in base 10.
<div class="expr">0.1011<sub>2</sub></div>`,
  choices:["0.6875","0.6125","0.7125","0.5875","None of the above"], ans:0,
  check:`str(11/16)`,
  why:`Positions to the right of the point are worth negative powers of two, so 0.1011 is one
half plus one eighth plus one sixteenth. There is a quicker route that avoids adding fractions
altogether, since the digits 1011 are 11 and there are four places after the point, making the value
simply 11 over 16.` },

{ id:"ns-14", kind:"problem", topic:"number-systems", level:"b",
  q:`How many bits are needed to write 1000<sub>10</sub> in binary?`,
  choices:["8", "9", "11", "12", "None of the above"], ans:4,
  check:`str(len(to_base(1000,2)))`,
  why:`Find the largest power of two that does not exceed 1000. Since 512 is 2 to the ninth and
1024 is 2 to the tenth, the highest bit that fires sits in position 9 counting from zero, and
positions 0 through 9 make ten bits. Because 10 is not among the four choices offered, the answer
here is None of the above.` },

{ id:"ns-15", kind:"problem", topic:"number-systems", level:"s",
  q:`Convert 2024<sub>10</sub> to hexadecimal. What is the sum of its digits in base 10?`,
  choices:["29","22","19","25","None of the above"], ans:0,
  check:`str(sum(int(c,16) for c in to_base(2024,16)))`,
  why:`Dividing repeatedly, 2024 over 16 is 126 with remainder 8, then 126 over 16 is 7 with
remainder 14, and finally 7, so reading the remainders upward gives 7E8. The second half of the
question is where the marks are, because summing the digits means summing their values in base 10,
so 7 plus 14 plus 8, which is 29. Adding the characters as though E were a decimal digit is exactly
the mistake being tested.` },

{ id:"ns-16", kind:"problem", topic:"number-systems", level:"s",
  q:`In how many bases b, where 2 &le; b &le; 16, is 63<sub>10</sub> a palindrome of two or more
digits?`,
  choices:["3","2","4","1","None of the above"], ans:0,
  check:`str(len([b for b in range(2,17) if len(to_base(63,b))>1 and to_base(63,b)==to_base(63,b)[::-1]]))`,
  why:`Write 63 out in each base and look at what you get. Base 2 gives 111111, base 4 gives
333, and base 8 gives 77, and all three read the same in either direction. No other base from 2
through 16 produces a palindrome, and although every base above 63 would give a single digit, the
question rules those out by asking for two or more digits, so the count is 3.` },

{ id:"ns-17", kind:"problem", topic:"number-systems", level:"j",
  q:`What is the largest number that can be written with four hexadecimal digits, expressed in
base 10?`,
  choices:["65535","65536","4095","32767","None of the above"], ans:0,
  check:`str(16**4-1)`,
  why:`Four hexadecimal digits hold 16 to the fourth different values, which is 65536 of them
running from 0 up to 65535, so the largest is FFFF. Four hex digits is also exactly sixteen bits,
which is why FFFF and 65535 keep turning up together in problems about storage sizes.` },

{ id:"ns-18", kind:"problem", topic:"number-systems", level:"s",
  q:`Evaluate the following and express the answer in base 4.
<div class="expr">1F<sub>16</sub> &minus; 25<sub>8</sub></div>`,
  choices:["30","31","102","33","None of the above"], ans:4,
  check:`to_base(from_base('1F',16)-from_base('25',8),4)`,
  why:`The two operands live in different bases, so both have to reach decimal before they can
be subtracted. 1F in hexadecimal is 31 and 25 in octal is 21, leaving a difference of 10. Writing 10
in base 4 gives 2 with remainder 2, so the answer is 22, and since 22 is not among the first four
choices the correct response is None of the above.` }

]);

window.MCQ = (window.MCQ || []).concat([

{ id:"ns-19", kind:"problem", topic:"number-systems", level:"b",
  q:`Convert 5A3<sub>16</sub> to binary.`,
  choices:["10110100011","1011010011","10110100111","101101011","None of the above"], ans:0,
  check:`to_base(from_base('5A3',16),2)`,
  why:`Every hexadecimal digit is exactly four bits, so this is regrouping rather than
arithmetic. 5 is 0101, A is 1010, and 3 is 0011, which written end to end gives 0101 1010 0011.
Dropping the leading zero leaves 10110100011. Count the bits when you finish: three hex digits must
produce twelve bits before any leading zeros come off, and this result has eleven significant bits because just one leading zero was removed.` },

{ id:"ns-20", kind:"problem", topic:"number-systems", level:"s",
  q:`Evaluate the following and express the answer in octal.
<div class="expr">777<sub>8</sub> + 111<sub>8</sub></div>`,
  choices:["1110","888","1000","1100","None of the above"], ans:0,
  check:`to_base(from_base('777',8)+from_base('111',8),8)`,
  why:`Add column by column and carry whenever a column reaches 8 rather than 10. The ones
column is 7 plus 1, which is 8, so it writes 0 and carries 1. Each of the next two columns is then 7
plus 1 plus the carry, which is 9, writing 1 and carrying 1 again, and the final carry becomes the
leading digit. The answer is 1110. The choice 888 is what decimal habits produce, and 888 is not even
a legal octal number, since 8 is not an octal digit.` },

{ id:"ns-21", kind:"problem", topic:"number-systems", level:"j",
  q:`How many digits does 200<sub>10</sub> have when written in binary?`,
  choices:["8","7","9","6","None of the above"], ans:0,
  check:`str(len(to_base(200,2)))`,
  why:`Find the largest power of two that fits. Since 128 is 2 to the seventh and 256 is 2 to
the eighth, the highest bit that fires sits in position 7 counting from zero, and positions 0 through
7 make eight digits. Writing it out confirms it: 200 is 128 plus 64 plus 8, or 11001000.` },

{ id:"ns-22", kind:"problem", topic:"number-systems", level:"b",
  q:`Evaluate the following and express the answer in binary.
<div class="expr">1101<sub>2</sub> &times; 101<sub>2</sub></div>`,
  choices:["1000001","1000011","110001","1000101","None of the above"], ans:0,
  check:`to_base(from_base('1101',2)*from_base('101',2),2)`,
  why:`Binary multiplication is easier than decimal multiplication, because every partial
product is either the top number or nothing at all. The multiplier 101 has ones in the first and third
positions, so the partial products are 1101 and 1101 shifted two places, giving 110100. Adding those
gives 1000001. If you would rather check than trust the carries, this is 13 times 5, or 65, and 65 is
64 plus 1.` },

{ id:"ns-23", kind:"problem", topic:"number-systems", level:"s",
  q:`What is the last digit of 2026<sub>10</sub> when it is written in base 7?`,
  choices:["3","4","2","6","None of the above"], ans:0,
  check:`to_base(2026,7)[-1]`,
  why:`No conversion is needed. The last digit of a number in base b is its remainder on
division by b, because every other place value is a multiple of b. Here 7 times 289 is 2023, so the
remainder is 3. The same shortcut answers any question about the final digit in any base, and it is
worth reaching for before writing out a full conversion.` },

{ id:"ns-24", kind:"problem", topic:"number-systems", level:"s",
  q:`How many integers from 1 through 500<sub>10</sub>, inclusive, are palindromes when written in
binary?`,
  choices:["30","40","46","62","None of the above"], ans:4,
  check:`str(len([n for n in range(1,501) if to_base(n,2)==to_base(n,2)[::-1]]))`,
  why:`Count by length rather than by number. A binary palindrome of length L begins with a 1,
which forces it to end with a 1, and the middle bits are free in mirrored pairs, so there are 2 to the
power of the ceiling of L over 2, minus 1 palindromes at each length. That gives 1, 1, 2, 2, 4, 4, 8,
and 8 for lengths 1 through 8, which is 30 through length 8, and length 9 runs from 256 to 511 where
the palindromes up to 500 add 15 more. The total is 45. Since 45 is not among the four choices
offered, the answer is None of the above.` },

{ id:"ns-25", kind:"problem", topic:"number-systems", level:"b",
  q:`Evaluate the following in hexadecimal.
<div class="expr">DEF<sub>16</sub> &minus; ABC<sub>16</sub></div>`,
  choices:["333","323","343","332","None of the above"], ans:0,
  check:`to_base(from_base('DEF',16)-from_base('ABC',16),16)`,
  why:`Take the columns from the right and remember that no borrow is needed anywhere here.
F minus C is 15 minus 12, which is 3, then E minus B is 14 minus 11, which is 3, and D minus A is 13
minus 10, which is 3 again. The answer is 333. When every column of a hexadecimal subtraction has the
larger digit on top, the arithmetic is no harder than decimal, so check for borrows first and only
slow down where one is needed.` },

{ id:"ns-26", kind:"problem", topic:"number-systems", level:"j",
  q:`Convert 1234<sub>5</sub> to base 10.`,
  choices:["194","294","1234","164","None of the above"], ans:0,
  check:`to_base(from_base('1234',5),10)`,
  why:`Write the place values above the digits and multiply. In base 5 those values are 125, 25,
5, and 1, so the number is 125 plus 2 times 25 plus 3 times 5 plus 4, which is 125 plus 50 plus 15
plus 4, or 194. Horner's method gets there with less bookkeeping: start at 1, then repeatedly multiply
by 5 and add the next digit, giving 1, 7, 38, and 194.` },

{ id:"ns-27", kind:"problem", topic:"number-systems", level:"b",
  q:`What is the sum of the digit values of BEEF<sub>16</sub>, expressed in base 10?`,
  choices:["54","48","32","20","None of the above"], ans:0,
  check:`str(sum(int(c,16) for c in 'BEEF'))`,
  why:`Each letter stands for a number, so translate before adding: B is 11, E is 14, and F is
15. The sum is 11 plus 14 plus 14 plus 15, which is 54. This has nothing to do with the value of BEEF
itself, which is 48879, and the question is only asking about the digits. Treating the letters as
though they were worth nothing gives 0, and treating them as ordinary characters gives no number at
all.` },

{ id:"ns-28", kind:"problem", topic:"number-systems", level:"s",
  q:`Evaluate the following and express the answer in hexadecimal.
<div class="expr">11001100<sub>2</sub> + AB<sub>16</sub></div>`,
  choices:["177","167","187","1077","None of the above"], ans:0,
  check:`to_base(from_base('11001100',2)+from_base('AB',16),16)`,
  why:`The operands are in different bases, so bring them together before adding. Binary and
hexadecimal share a base of two, so regroup rather than convert: 1100 1100 is CC in hexadecimal.
Adding CC and AB column by column gives C plus B, which is 23, writing 7 and carrying 1, then C plus A
plus 1, which is 23 again, writing 7 and carrying 1. The answer is 177.` },

{ id:"ns-29", kind:"problem", topic:"number-systems", level:"s",
  q:`Solve for the base b.
<div class="expr">1000<sub>b</sub> = 1728<sub>10</sub></div>`,
  choices:["12","10","8","16","None of the above"], ans:0,
  check:`str([b for b in range(2,17) if from_base('1000',b)==1728][0])`,
  why:`A 1 followed by three zeros is b cubed in any base, so the question is asking for the
cube root of 1728. That is 12, since 12 times 12 is 144 and 144 times 12 is 1728. The general shape is
worth carrying: a leading 1 followed by k zeros is always b to the power k, which turns a conversion
question into a question about powers.` },

{ id:"ns-30", kind:"problem", topic:"number-systems", level:"s",
  q:`Convert 255<sub>10</sub> to base 3.`,
  choices:["100110","100100","101110","22200","None of the above"], ans:0,
  check:`to_base(255,3)`,
  why:`Divide repeatedly by 3 and read the remainders upward. 255 gives 85 remainder 0, then 28
remainder 1, then 9 remainder 1, then 3 remainder 0, then 1 remainder 0, and finally 1. Reading those
from the last quotient back down gives 100110. Checking is quick, since the place values in play are
243, 9, and 3, and those add to 255. Base 3 has no shortcut through binary, so the division method is
the whole method.` },

{ id:"ns-31", kind:"problem", topic:"number-systems", level:"s",
  q:`How many integers from 1 through 1000<sub>10</sub>, inclusive, take exactly four digits when
written in base 4?`,
  choices:["191","256","64","128","None of the above"], ans:4,
  check:`str(len([n for n in range(1,1001) if len(to_base(n,4))==4]))`,
  why:`A number takes exactly four digits in base 4 when it is at least 4 cubed and less than 4
to the fourth, which is the range from 64 through 255. Every one of those is below 1000, so the upper
limit never comes into play, and the count is 255 minus 64 plus 1, or 192. The distractor 191 is what
you get by forgetting that both endpoints belong in the range. Since 192 is not among the four choices
offered, the answer is None of the above.` },

{ id:"ns-32", kind:"problem", topic:"number-systems", level:"b",
  q:`Evaluate the following and express the answer in octal.
<div class="expr">3F<sub>16</sub> &times; 11<sub>2</sub></div>`,
  choices:["275","375","175","77","None of the above"], ans:0,
  check:`to_base(from_base('3F',16)*from_base('11',2),8)`,
  why:`Both operands have to reach a common base before they can be multiplied, and decimal is
the easiest one to multiply in. 3F is 63 and 11 in binary is 3, so the product is 189. Pushing 189
into octal by repeated division gives remainders of 5, then 7, with a final quotient of 2, so the
answer is 275. Notice that 3F is one less than 64, which makes the multiplication easy to check.` },

{ id:"ns-33", kind:"problem", topic:"number-systems", level:"j",
  q:`Evaluate the following and express the answer in base 10.
<div class="expr">1010<sub>2</sub> + 1010<sub>8</sub> + 1010<sub>16</sub></div>`,
  choices:["4642","3030","1030","4096","None of the above"], ans:0,
  check:`str(from_base('1010',2)+from_base('1010',8)+from_base('1010',16))`,
  why:`The three terms look identical and are nothing alike, which is the whole point. In binary
1010 is 8 plus 2, or 10. In octal it is 512 plus 8, or 520. In hexadecimal it is 4096 plus 16, or
4112. Those add to 4642. The distractor 3030 comes from adding the digits as though the subscripts
were decoration.` },

{ id:"ns-34", kind:"problem", topic:"number-systems", level:"b",
  q:`Evaluate the following in hexadecimal, discarding any remainder.
<div class="expr">CAFE<sub>16</sub> &divide; 100<sub>16</sub></div>`,
  choices:["CA","FE","CAF","C","None of the above"], ans:0,
  check:`to_base(from_base('CAFE',16)//from_base('100',16),16)`,
  why:`Dividing by 100 in hexadecimal removes two digits from the right, exactly as dividing by
100 in decimal removes two digits there, because 100 in hexadecimal is 16 squared. So CAFE becomes CA
and the discarded FE is the remainder. Recognizing that a divisor is a power of the base turns the
division into shifting, which is where the digits go rather than something to compute.` },

{ id:"ns-35", kind:"problem", topic:"number-systems", level:"s",
  q:`How many integers from 1 through 100<sub>10</sub>, inclusive, have exactly three 1 bits in
their binary representation?`,
  choices:["33","21","35","30","None of the above"], ans:0,
  check:`str(sum(1 for n in range(1,101) if to_base(n,2).count('1')==3))`,
  why:`Count by the position of the highest bit. A value below 128 uses at most seven bits, and
choosing three of the seven positions gives 35 candidates in the range 1 through 127. The two that
exceed 100 are 1110000, which is 112, and 1101000, which is 104, so 35 minus 2 leaves 33. Counting the
whole range and then removing the few that overshoot is much less work than listing all 33.` },

{ id:"ns-36", kind:"problem", topic:"number-systems", level:"j",
  q:`Evaluate the following in octal.
<div class="expr">7654<sub>8</sub> &minus; 1234<sub>8</sub></div>`,
  choices:["6420","6520","5420","6410","None of the above"], ans:0,
  check:`to_base(from_base('7654',8)-from_base('1234',8),8)`,
  why:`Every column here has the larger digit on top, so no borrow is needed anywhere and the
subtraction is done digit by digit: 4 minus 4 is 0, 5 minus 3 is 2, 6 minus 2 is 4, and 7 minus 1 is
6. The answer is 6420. Octal subtraction only becomes different from decimal when a borrow appears, at
which point the borrow is worth 8 rather than 10.` }

]);
