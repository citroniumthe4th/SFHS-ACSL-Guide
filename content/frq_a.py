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

<p>Count each replacement, including the one that reaches 1 or repeats a value. Stop before making another replacement. If the starting number is already 1, return 0.</p>
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
<p>The loop is three lines and the stopping rule is the whole problem, because there
are two separate ways for the chain to end and it is very easy to implement one of them and forget
the other.</p>

<p>Keep a set of every value you have produced, and put the starting value in it before the loop
begins. On each pass, compute the next value, add one to the count, and then ask two questions in
this order: is this value 1, and have I seen it before. Either answer ends the loop.</p>

<p>Record the starting value before the loop. Starting at 4 returns to 4 after eight replacements. If you omit the initial 4 from the set, the program continues to 16 and detects that repeated value after nine replacements.</p>

<p>Be equally careful about what gets counted. The replacement that lands on 1 counts, but arriving at
1 is not itself a further replacement, so a start of 1 has made no replacements at all and the answer
is 0.</p>

<p>One small implementation note: summing the squares of the digits is easier on the number than on a
string, particularly in Java and C++. Take n modulo 10, square it, add it to a running total, divide n
by 10, and repeat while n is above zero.</p>
""",
    sol=dict(
        python="""
if start == 1:
    return 0
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
if (start == 1) return 0;
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
if (start == 1) return 0;
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
<p>Simulating this is perfectly reasonable and you should write that version
first if the pattern is not yet obvious to you. An array of N booleans, an outer loop over the
students, an inner loop stepping by the student number, and a final scan comes to about 1.2 million
toggles at the largest input, which runs comfortably.</p>

<p>The pattern is worth finding, though, because it collapses the whole problem into two lines. Locker
k is touched once for every divisor of k, so it finishes open exactly when k has an odd number of
divisors. Divisors normally come in pairs straddling the square root, and the only time such a pair
collapses to a single number is when k is a perfect square, so the lockers left open are precisely 1,
4, 9, 16, and so on. The count is therefore the integer part of the square root of N, and the highest
open locker is that count squared. At N of 20 the square root is about 4.47, giving a count of 4 and a
highest locker of 16.</p>

<p>The reference solutions check the square-root estimate with integer multiplication. After correction, r must satisfy r squared at most N and (r + 1) squared greater than N. An integer square-root function can compute r directly where the language provides one.</p>

<p>Any N of 1 or more leaves locker 1 open, so the NONE branch never actually fires. Write it anyway,
since the output specification asks for it and a defensive branch costs nothing.</p>
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
    constraints="The line holds between 1 and 60 people. Every weight is a positive integer no "
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
<p>A single pass carrying two running values is enough here: the weight currently
on board and the number of trips taken so far.</p>

<p>Take each person in order and ask whether adding them keeps the load at or below the limit. If it
does, they board. If it does not, count a trip, empty the elevator, and put that person on as the
first passenger of the next one. When the queue runs out, count one final trip for whoever is still
standing in the car.</p>

<p>That last line is the one people leave out, and it is easy to see why: the loop only counts a trip
at the moment someone is turned away, so the final load never triggers it. If your answers are
consistently one too low, this is the reason.</p>

<p>The comparison matters just as much. The limit is inclusive, so a load of exactly the limit is fine
and the doors stay open, which means a strict less than breaks the second sample where every person
weighs exactly the limit.</p>

<p>Parsing the weights is the only genuinely fiddly part outside Python. In Java, trim the string and
split on whitespace. In C++, feed it to an istringstream and pull integers out with the stream
operator, which handles the spacing for you.</p>
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
<p>Resist the urge to find a formula for where each letter ends up. Walk the ring
boundaries instead, and let four indices carry the bookkeeping: <code>top</code>, <code>bottom</code>,
<code>left</code>, and <code>right</code>.</p>

<p>One complete ring is four passes. Go left to right along <code>top</code> and then increase it, top
to bottom along <code>right</code> and then decrease it, right to left along <code>bottom</code> and
then decrease it, and bottom to top along <code>left</code> and then increase it. Repeat the whole
cycle while <code>top</code> is at or below <code>bottom</code> and <code>left</code> is at or below
<code>right</code>.</p>

<p>Two guards are needed, both on the second half of the cycle. Once a ring has collapsed to a single
row, the bottom pass would walk that same row backwards and emit it twice, so run it only when
<code>top</code> is still at or below <code>bottom</code>. The same reasoning applies to a single
column and the left pass. On a 3 by 3 grid the center letter is precisely where this bites.</p>

<p>Recovering the side length from the string means a square root, so the same floating point caution
applies as anywhere else: take the integer part and then nudge it until n times n equals the length.
After that, the letter at row r and column c is <code>grid[r * n + c]</code>.</p>

<p>Test the small and odd sizes rather than the big ones. A single letter, a 2 by 2, and a 3 by 3
between them catch nearly every version of this bug.</p>
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
