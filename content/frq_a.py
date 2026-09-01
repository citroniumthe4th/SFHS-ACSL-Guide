# -*- coding: utf-8 -*-
"""ACSL style programming problems, part 1 of 3."""

PROBLEMS = [

# ---------------------------------------------------------------- Junior 1
dict(
    id="digit-chain",
    fname="chainLength",
    division="Junior",
    contest=1,
    title="DIGIT CHAIN",
    blurb="Square the digits, add them up, repeat, and count the steps before it settles.",
    statement="""
<p>Pick a whole number. Replace it with the sum of the squares of its digits. Do that again to
the result, and again, and keep going. Every starting number eventually either lands on 1 or
falls into a loop it has already been through, so the process always settles.</p>

<p>Count the replacements you make. Stop as soon as you reach 1, or as soon as you produce a
value you have already seen. The number you stop at is not counted as a replacement, only the
replacements themselves are.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>19</td></tr>
<tr><th>Output</th><td>4</td></tr>
<tr><th>Explanation</th><td>
1 squared plus 9 squared is 82, that is replacement 1.<br>
8 squared plus 2 squared is 68, that is replacement 2.<br>
6 squared plus 8 squared is 100, that is replacement 3.<br>
1 squared plus 0 plus 0 is 1, that is replacement 4.<br>
The chain has reached 1, so output 4.
</td></tr></table>
""",
    input_spec="Input a single whole number between 1 and 999999, inclusive.",
    output_spec="Output an integer, the number of replacements made before the chain reached 1 "
                "or repeated a value.",
    constraints="The starting number is between 1 and 999999, inclusive. Every chain settles "
                "within 40 replacements.",
    task="""
<ul>
<li>The function has 1 parameter: an integer, <code>start</code>, the number the chain begins
with.</li>
<li>The function returns an integer, the number of replacements made.</li>
</ul>
""",
    params=[("start", "int")],
    ret="int",
    samples=["19", "4", "7"],
    tests=["19", "4", "7", "1", "23", "100",
           "986", "999999", "44", "68", "160", "31331"],
    approach="""
<p>The loop itself is three lines. The part that decides whether you score is the stopping
rule, because there are two ways to stop and they are easy to conflate.</p>

<p>Keep a set of the values you have already produced, including the starting value. On each
pass, compute the next value, add one to the count, then ask two questions in this order: is it
1, and have I seen it before. Either answer ends the loop.</p>

<p>Putting the starting value in the seen set matters. The number 4 comes back to itself after
eight replacements, and if you only record values from the second one onward you will run
around the loop a second time before noticing.</p>

<p>Watch what gets counted. The step that lands on 1 is counted, but arriving at 1 does not
then get counted again. A start of 1 has made zero replacements and the answer is 0.</p>

<p>Summing the squares of the digits is easier on the number than on a string in Java and C++:
take n modulo 10, square it, add it, then divide n by 10 and repeat while n is above zero.</p>
""",
    sol=dict(
        python="""
seen = {start}
n = start
count = 0
while True:
    total = 0
    m = n
    while m > 0:
        d = m % 10
        total += d * d
        m //= 10
    n = total
    count += 1
    if n == 1 or n in seen:
        return count
    seen.add(n)
""",
        java="""
Set<Integer> seen = new HashSet<>();
seen.add(start);
int n = start, count = 0;
while (true) {
    int total = 0, m = n;
    while (m > 0) { int d = m % 10; total += d * d; m /= 10; }
    n = total;
    count++;
    if (n == 1 || seen.contains(n)) return count;
    seen.add(n);
}
""",
        cpp="""
set<int> seen;
seen.insert(start);
int n = start, count = 0;
while (true) {
    int total = 0, m = n;
    while (m > 0) { int d = m % 10; total += d * d; m /= 10; }
    n = total;
    count++;
    if (n == 1 || seen.count(n)) return count;
    seen.insert(n);
}
""",
    ),
),

# ---------------------------------------------------------------- Junior 2
dict(
    id="locker-hallway",
    fname="lockerReport",
    division="Junior",
    contest=2,
    title="LOCKER HALLWAY",
    blurb="A hallway of lockers, a line of students, and every locker toggled more than once.",
    statement="""
<p>A hallway at ACSL High has N lockers in a row, numbered 1 through N, and every one of them
starts closed. Then N students walk the hallway one at a time.</p>

<p>The first student opens every locker. The second student goes to every second locker, numbers
2, 4, 6, and so on, and changes it: open becomes closed and closed becomes open. The third
student does the same to every third locker, the fourth to every fourth, and so on through the
Nth student, who touches only locker N.</p>

<p>After all N students have finished, report how many lockers are open and which open locker
has the highest number.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>20</td></tr>
<tr><th>Output</th><td>4 16</td></tr>
<tr><th>Explanation</th><td>
Locker 12 is touched by students 1, 2, 3, 4, 6, and 12, which is six times, so it ends
closed.<br>
Locker 16 is touched by students 1, 2, 4, 8, and 16, which is five times, so it ends open.<br>
The lockers left open are 1, 4, 9, and 16. That is four of them, and the highest is 16.
</td></tr></table>
""",
    input_spec="Input a single integer N, the number of lockers.",
    output_spec="Output two integers separated by a single space: the number of lockers left "
                "open, then the number of the highest open locker. If no locker is open, output "
                "the word NONE.",
    constraints="N is between 1 and 100000, inclusive.",
    task="""
<ul>
<li>The function has 1 parameter: an integer, <code>n</code>, the number of lockers in the
hallway.</li>
<li>The function returns a string holding the count and the highest open locker number separated
by a single space, or NONE.</li>
</ul>
""",
    params=[("n", "int")],
    ret="str",
    samples=["20", "1", "100"],
    tests=["20", "1", "100", "2", "3", "50",
           "99", "1000", "9999", "10000", "12345", "100000"],
    approach="""
<p>You can simulate this. An array of N booleans, a loop over students, an inner loop stepping
by the student number, and a final scan. At N of 100000 that is about 1.2 million toggles, which
runs fine. Write that version first if you are unsure, because it also confirms the pattern.</p>

<p>The pattern is worth seeing, though, because it turns the whole problem into two lines.
Locker k is touched once for each divisor of k, so it ends open exactly when k has an odd number
of divisors. Divisors normally come in pairs, one on each side of the square root, and the only
time a pair collapses into a single number is when k is a perfect square. So the open lockers are
exactly 1, 4, 9, 16, and so on.</p>

<p>That makes the count the integer part of the square root of N, and the highest open locker
that count squared. For N of 20 the square root is about 4.47, so the count is 4 and the highest
is 16.</p>

<p>Be careful with the square root in floating point. For N of 10000 a value of 99.99999 rounds
down to 99 and costs you the test case. Take the integer part, then adjust: while
(r + 1) squared is at most N, add one to r, and while r squared exceeds N, subtract one.</p>

<p>N of 1 or more always leaves locker 1 open, so NONE never actually fires. Handle it anyway,
since the output spec asks for it and a defensive branch costs nothing.</p>
""",
    sol=dict(
        python="""
r = int(n ** 0.5)
while (r + 1) * (r + 1) <= n:
    r += 1
while r * r > n:
    r -= 1
if r == 0:
    return "NONE"
return str(r) + " " + str(r * r)
""",
        java="""
long r = (long) Math.sqrt((double) n);
while ((r + 1) * (r + 1) <= n) r++;
while (r * r > n) r--;
if (r == 0) return "NONE";
return r + " " + (r * r);
""",
        cpp="""
long long r = (long long) sqrt((double) n);
while ((r + 1) * (r + 1) <= n) r++;
while (r * r > n) r--;
if (r == 0) return "NONE";
return to_string(r) + " " + to_string(r * r);
""",
    ),
),

# ---------------------------------------------------------------- Junior 3
dict(
    id="elevator-trips",
    fname="countTrips",
    division="Junior",
    contest=3,
    title="ELEVATOR TRIPS",
    blurb="Load the elevator from the front of the line until the next person would overload it.",
    statement="""
<p>A single elevator serves the lobby of an office tower, and it has a weight limit. A line of
people is waiting, and they are strict about their place in it: nobody lets the person behind
them go first.</p>

<p>Loading works like this. Starting with whoever is at the front, keep adding the next person in
line as long as the total weight on board stays at or below the limit. As soon as the next person
would push the total over the limit, the doors close and the elevator goes up. It comes back
empty and loads the same way from whoever is now at the front.</p>

<p>Count the trips it takes to move everybody. Every person weighs at or below the limit, so the
line always clears.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>200<br>120 60 90 100 50</td></tr>
<tr><th>Output</th><td>3</td></tr>
<tr><th>Explanation</th><td>
Trip 1 takes 120, then 60 for a total of 180. Adding 90 would make 270, over the limit, so it
goes up.<br>
Trip 2 takes 90, then 100 for a total of 190. Adding 50 would make 240, over the limit, so it
goes up.<br>
Trip 3 takes the last person, 50.<br>
Three trips in all, so output 3.
</td></tr></table>
""",
    input_spec="Input an integer, the weight limit, on the first line. On the second line input a "
               "string of weights, each separated by a single space.",
    output_spec="Output an integer, the number of trips.",
    constraints="There are at most 60 people in line. Every weight is a positive integer no "
                "larger than the limit, and the limit is at most 5000.",
    task="""
<ul>
<li>The function has 2 parameters: an integer, <code>limit</code>, the weight the elevator can
carry, and a string, <code>weights</code>, holding the weight of each person in line separated by
single spaces.</li>
<li>The function returns an integer, the number of trips needed.</li>
</ul>
""",
    params=[("limit", "int"), ("weights", "str")],
    ret="int",
    samples=[["200", "120 60 90 100 50"],
             ["100", "100 100 100"],
             ["500", "50 50 50 50 50 50 50 50 50 50"]],
    tests=[["200", "120 60 90 100 50"],
           ["100", "100 100 100"],
           ["500", "50 50 50 50 50 50 50 50 50 50"],
           ["150", "150"],
           ["300", "100 100 100 100 100 100"],
           ["1000", "999 1 999 1 999 1"],
           ["250", "80 80 80 80 80 80 80 80 80"],
           ["5000", "1 2 3 4 5 6 7 8 9 10"],
           ["400", "200 200 200 200 200 200 200 200"],
           ["77", "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"],
           ["600", "310 290 300 300 599 1 600"],
           ["999", "111 222 333 444 555 666 777 888 999"]],
    approach="""
<p>One pass, two running values. Keep the weight currently on board and the number of trips
taken so far.</p>

<p>For each person in order, ask whether adding them keeps the load at or below the limit. If it
does, add them. If it does not, count a trip, empty the elevator, and put that person on board as
the first passenger of the next trip. When the line runs out, count one final trip for whoever is
still on board.</p>

<p>That last step is the one people forget. The loop only counts a trip when someone gets turned
away, so the final load never triggers it. If your answer is consistently one too low, this is
why.</p>

<p>The other detail is the comparison. The limit is inclusive, so a load of exactly the limit is
fine and the doors do not close. Using a strict less than instead of less than or equal to breaks
the second sample, where each person weighs exactly the limit.</p>

<p>Parsing the weights is the only fiddly part in Java and C++. In Java, trim the string and
split on whitespace. In C++, feed it to an <code>istringstream</code> and read integers out with
the stream operator, which handles the spacing for you.</p>
""",
    sol=dict(
        python="""
load = 0
trips = 0
for tok in weights.split():
    w = int(tok)
    if load + w <= limit:
        load += w
    else:
        trips += 1
        load = w
if load > 0:
    trips += 1
return trips
""",
        java="""
int load = 0, trips = 0;
for (String tok : weights.trim().split("\\\\s+")) {
    int w = Integer.parseInt(tok);
    if (load + w <= limit) {
        load += w;
    } else {
        trips++;
        load = w;
    }
}
if (load > 0) trips++;
return trips;
""",
        cpp="""
int load = 0, trips = 0, w;
istringstream is(weights);
while (is >> w) {
    if (load + w <= limit) {
        load += w;
    } else {
        trips++;
        load = w;
    }
}
if (load > 0) trips++;
return trips;
""",
    ),
),

# ---------------------------------------------------------------- Junior 4
dict(
    id="spiral-word",
    fname="readSpiral",
    division="Junior",
    contest=4,
    title="SPIRAL WORD",
    blurb="Read a square grid of letters clockwise from the outside in.",
    statement="""
<p>A square grid of letters is given to you flattened into a single string, filled in row by row.
A grid of 16 letters is 4 by 4, a grid of 25 letters is 5 by 5, and so on.</p>

<p>Read the grid clockwise starting at the top left corner. Go all the way across the top row,
then down the right column, then back across the bottom row, then up the left column, which
brings you to the row below where you started. Then do the same thing again on what is left,
spiralling inward until every letter has been read.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>ABCDEFGHIJKLMNOP</td></tr>
<tr><th>Output</th><td>ABCDHLPONMIEFGKJ</td></tr>
<tr><th>Explanation</th><td>
The 16 letters make this 4 by 4 grid:
<pre><code>A B C D
E F G H
I J K L
M N O P</code></pre>
The outer ring, clockwise from A, reads ABCD then HLP then ONM then IE.<br>
That leaves the inner 2 by 2 block F G, J K, whose ring reads FG then K then J.<br>
Putting them together gives ABCDHLPONMIEFGKJ.
</td></tr></table>
""",
    input_spec="Input a string of uppercase letters whose length is a perfect square.",
    output_spec="Output the letters of the grid in clockwise spiral order, starting at the top "
                "left corner, with no spaces.",
    constraints="The string holds between 1 and 100 uppercase letters and its length is always a "
                "perfect square.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>grid</code>, holding the letters of the square
grid row by row.</li>
<li>The function returns a string, the letters in clockwise spiral order.</li>
</ul>
""",
    params=[("grid", "str")],
    ret="str",
    samples=["ABCDEFGHIJKLMNOP", "A", "ABCD"],
    tests=[
        'ABCDEFGHIJKLMNOP',
        'A',
        'ABCD',
        'ABCDEFGHI',
        'ACSLACSLACSLACSLACSLACSLA',
        'QWERTYUIOPASDFGHJKLZXCVBNMQWERTYUIOPASDFGHJKLZXCV',
        'AABBCCDDEEFFGGHH',
        'ZYXWVUTSRQPONMLK',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV',
        'SQUAREONE',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJ',
        'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELL',
    ],
    approach="""
<p>Do not try to compute the position of each letter with a formula. Walk the ring boundaries
instead and let four indices do the bookkeeping: <code>top</code>, <code>bottom</code>,
<code>left</code>, and <code>right</code>.</p>

<p>One ring is four passes. Go left to right along <code>top</code>, then increase
<code>top</code>. Go top to bottom along <code>right</code>, then decrease <code>right</code>.
Go right to left along <code>bottom</code>, then decrease <code>bottom</code>. Go bottom to top
along <code>left</code>, then increase <code>left</code>. Repeat while <code>top</code> is at or
below <code>bottom</code> and <code>left</code> is at or below <code>right</code>.</p>

<p>The two guards you need are on the third and fourth passes. When a ring has collapsed to a
single row, the bottom pass would walk that same row backwards and print it twice, so only run it
when <code>top</code> is still at or below <code>bottom</code>. The same applies to a single
column and the left pass. On a 3 by 3 grid the center letter is exactly where this bites.</p>

<p>Getting the side length from the string is a square root, and the same floating point caution
applies as anywhere else: take the integer part, then nudge it until n times n equals the length.
Reaching the letter at row r and column c is then <code>grid[r * n + c]</code>.</p>

<p>Test the odd sizes and the trivial ones. A single letter, a 2 by 2, and a 3 by 3 catch nearly
every version of this bug.</p>
""",
    sol=dict(
        python="""
n = int(len(grid) ** 0.5)
while n * n < len(grid):
    n += 1
top, bottom, left, right = 0, n - 1, 0, n - 1
out = []
while top <= bottom and left <= right:
    for c in range(left, right + 1):
        out.append(grid[top * n + c])
    top += 1
    for r in range(top, bottom + 1):
        out.append(grid[r * n + right])
    right -= 1
    if top <= bottom:
        for c in range(right, left - 1, -1):
            out.append(grid[bottom * n + c])
        bottom -= 1
    if left <= right:
        for r in range(bottom, top - 1, -1):
            out.append(grid[r * n + left])
        left += 1
return "".join(out)
""",
        java="""
int n = (int) Math.sqrt((double) grid.length());
while (n * n < grid.length()) n++;
int top = 0, bottom = n - 1, left = 0, right = n - 1;
StringBuilder out = new StringBuilder();
while (top <= bottom && left <= right) {
    for (int c = left; c <= right; c++) out.append(grid.charAt(top * n + c));
    top++;
    for (int r = top; r <= bottom; r++) out.append(grid.charAt(r * n + right));
    right--;
    if (top <= bottom) {
        for (int c = right; c >= left; c--) out.append(grid.charAt(bottom * n + c));
        bottom--;
    }
    if (left <= right) {
        for (int r = bottom; r >= top; r--) out.append(grid.charAt(r * n + left));
        left++;
    }
}
return out.toString();
""",
        cpp="""
int n = (int) sqrt((double) grid.size());
while ((size_t)(n * n) < grid.size()) n++;
int top = 0, bottom = n - 1, left = 0, right = n - 1;
string out;
while (top <= bottom && left <= right) {
    for (int c = left; c <= right; c++) out += grid[top * n + c];
    top++;
    for (int r = top; r <= bottom; r++) out += grid[r * n + right];
    right--;
    if (top <= bottom) {
        for (int c = right; c >= left; c--) out += grid[bottom * n + c];
        bottom--;
    }
    if (left <= right) {
        for (int r = bottom; r >= top; r--) out += grid[r * n + left];
        left++;
    }
}
return out;
""",
    ),
),

]
