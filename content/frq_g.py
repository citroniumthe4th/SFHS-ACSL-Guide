# -*- coding: utf-8 -*-
"""ACSL style programming problems, Junior contests 1 and 2."""

PROBLEMS = [

# ---------------------------------------------------------------- Junior 1
dict(
    id="stair-hops",
    fname="countHops",
    division="Junior",
    contest=1,
    title="Stair Hops",
    blurb="Climb a staircase one or two steps at a time and count the distinct routes.",
    statement="""
<p>A staircase has N steps. You climb it by moving up either one step or two steps at a time,
and you keep going until you are standing exactly on the top step.</p>

<p>Two climbs are different if the sequence of moves differs anywhere. Count the climbs. A
staircase with no steps at all has exactly one climb, the one that makes no moves.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>4</td></tr>
<tr><th>Output</th><td>5</td></tr>
<tr><th>Explanation</th><td>
Writing each climb as its sequence of move sizes:<br>
1 1 1 1<br>
1 1 2<br>
1 2 1<br>
2 1 1<br>
2 2
</td></tr></table>
""",
    input_spec="Input a single whole number, the number of steps in the staircase.",
    output_spec="Output an integer, the number of distinct climbs.",
    constraints="The number of steps is between 0 and 45, inclusive. The answer always fits in a "
                "32 bit signed integer.",
    task="""
<ul>
<li>The function has 1 parameter: an integer, <code>steps</code>, the number of steps.</li>
<li>The function returns an integer, the number of distinct climbs.</li>
</ul>
""",
    params=[("steps", "int")],
    ret="int",
    samples=["4", "0", "10"],
    tests=["4", "0", "10", "1", "2", "3",
           "12", "20", "30", "45", "44", "7"],
    approach="""
<p>Ask what the last move was. A climb of N steps either finished with a single step, in which
case everything before it was a climb of N minus 1, or with a double step, in which case everything
before it was a climb of N minus 2. No climb is both, and every climb is one or the other, so the
count for N is the count for N minus 1 plus the count for N minus 2.</p>

<p>That is the Fibonacci recurrence, and the only thing left to settle is where it starts. A
staircase of 0 steps has one climb, the empty one, and a staircase of 1 step also has one. From there
the counts run 2, 3, 5, 8, and so on.</p>

<p>Write it as a loop rather than as a recursive function. Plain recursion recomputes the same values
over and over and becomes unusable well before 45 steps, while two variables and a loop finish in 45
additions. Keep a pair of running values, add them, and shift.</p>

<p>The count for 45 steps is 1836311903, which fits in a 32 bit signed integer with very little room to
spare, so do not be tempted to extend the range on your own.</p>
""",
    sol=dict(
        python="""
a, b = 1, 1
for _ in range(steps):
    a, b = b, a + b
return a
""",
        java="""
long a = 1, b = 1;
for (int i = 0; i < steps; i++) { long t = a + b; a = b; b = t; }
return (int) a;
""",
        cpp="""
long long a = 1, b = 1;
for (int i = 0; i < steps; i++) { long long t = a + b; a = b; b = t; }
return (int) a;
""",
    ),
),

# ---------------------------------------------------------------- Junior 2
dict(
    id="digit-persistence",
    fname="persistence",
    division="Junior",
    contest=1,
    title="Digit Persistence",
    blurb="Multiply a number's digits together, repeat, and count the rounds until one digit is left.",
    statement="""
<p>Take a whole number and replace it with the product of its digits. Do that again to the
result, and again, and keep going until what is left is a single digit.</p>

<p>Count the replacements. A number that is already a single digit needs none, so its answer is 0.
A number containing a 0 collapses to 0 in one replacement, since the product of its digits is 0.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>39</td></tr>
<tr><th>Output</th><td>3</td></tr>
<tr><th>Explanation</th><td>
3 times 9 is 27, that is replacement 1.<br>
2 times 7 is 14, that is replacement 2.<br>
1 times 4 is 4, that is replacement 3.<br>
4 is a single digit, so the answer is 3.
</td></tr></table>
""",
    input_spec="Input a single whole number.",
    output_spec="Output an integer, the number of replacements made before a single digit was "
                "reached.",
    constraints="The starting number is between 1 and 999999, inclusive.",
    task="""
<ul>
<li>The function has 1 parameter: an integer, <code>start</code>, the number to begin with.</li>
<li>The function returns an integer, the number of replacements.</li>
</ul>
""",
    params=[("start", "int")],
    ret="int",
    samples=["39", "5", "77"],
    tests=["39", "5", "77", "1", "10", "25",
           "679", "6788", "68889", "999999", "100000", "999"],
    approach="""
<p>The loop is short and the stopping rule is the whole problem. Keep replacing while the value
is 10 or more, and count each replacement as you make it. A value below 10 is already a single digit,
so the loop simply never runs and the answer is 0.</p>

<p>Take the product on the number rather than on a string, which is easier in Java and C++ and no
harder in Python. Start a running product at 1, then repeatedly take the value modulo 10, multiply it
in, and divide the value by 10, continuing while the value is above zero.</p>

<p>Do not add a special case for digits equal to 0. A 0 anywhere makes the product 0, which is a
single digit, so the loop ends on the next test and the count is right without any help. Trying to
skip zeros would answer a different question, and one whose chains never terminate for numbers like
10.</p>

<p>The chains are short. Nothing below a million takes more than seven replacements, so there is no
performance question here at all, only the boundary between one digit and two.</p>
""",
    sol=dict(
        python="""
n = start
count = 0
while n >= 10:
    total = 1
    while n > 0:
        total *= n % 10
        n //= 10
    n = total
    count += 1
return count
""",
        java="""
int n = start, count = 0;
while (n >= 10) {
    int total = 1;
    while (n > 0) { total *= n % 10; n /= 10; }
    n = total;
    count++;
}
return count;
""",
        cpp="""
int n = start, count = 0;
while (n >= 10) {
    int total = 1;
    while (n > 0) { total *= n % 10; n /= 10; }
    n = total;
    count++;
}
return count;
""",
    ),
),

# ---------------------------------------------------------------- Junior 3
dict(
    id="base-parade",
    fname="commonDigit",
    division="Junior",
    contest=1,
    title="Base Parade",
    blurb="Rewrite a number in another base and report the digit that turns up most often.",
    statement="""
<p>Write a whole number in a given base, using the digits 0 through 9 and then the letters A
through F for the values 10 through 15.</p>

<p>Report the digit that appears most often in that representation, together with how many times
it appears. If two or more digits are tied for most common, report the one with the larger value.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>255<br>16</td></tr>
<tr><th>Output</th><td>F 2</td></tr>
<tr><th>Explanation</th><td>
255 in base 16 is FF.<br>
The digit F appears twice and no other digit appears at all.
</td></tr></table>
""",
    input_spec="Input the number on the first line and the base on the second line.",
    output_spec="Output the most common digit, a single space, and the number of times it "
                "appears.",
    constraints="The number is between 1 and 999999, inclusive. The base is between 2 and 16, "
                "inclusive.",
    task="""
<ul>
<li>The function has 2 parameters: an integer, <code>value</code>, the number to convert, and an
integer, <code>base</code>, the base to write it in.</li>
<li>The function returns a string, the most common digit followed by a space and its count.</li>
</ul>
""",
    params=[("value", "int"), ("base", "int")],
    ret="str",
    samples=[["255", "16"], ["1", "2"], ["100", "10"]],
    tests=[["255", "16"], ["1", "2"], ["100", "10"],
           ["64", "8"], ["999999", "7"], ["4095", "16"],
           ["7", "2"], ["999999", "2"], ["512", "8"],
           ["43690", "16"], ["999999", "16"], ["10", "3"]],
    approach="""
<p>Two separate jobs, and neither is hard once they are kept apart. First convert, then count.</p>

<p>Convert by repeated division: take the value modulo the base to get a digit, divide the value by
the base, and repeat while the value is above zero. That produces the digits from least significant to
most significant, which is backwards, but for this problem the order never matters, since you are only
counting how often each digit appears.</p>

<p>Keep a tally of sixteen counters rather than building the string and scanning it. Index the tally by
the digit's numeric value, which is exactly what the modulo hands you, and the letters take care of
themselves: only when you print the answer do you turn a value into a character, using the digits 0
through 9 for values below 10 and the letters A through F above.</p>

<p>Sweep the tally from 15 downward and keep the first digit that beats the best count so far. Because
you are moving down from the largest value, that automatically settles ties in favor of the larger
digit without any extra comparison. Sweeping upward and using a strictly greater test would give the
smaller one instead.</p>
""",
    sol=dict(
        python="""
digits = "0123456789ABCDEF"
tally = [0] * 16
n = value
while n > 0:
    tally[n % base] += 1
    n //= base
best = 0
for d in range(15, -1, -1):
    if tally[d] > tally[best]:
        best = d
return digits[best] + " " + str(tally[best])
""",
        java="""
String digits = "0123456789ABCDEF";
int[] tally = new int[16];
int n = value;
while (n > 0) { tally[n % base]++; n /= base; }
int best = 0;
for (int d = 15; d >= 0; d--) if (tally[d] > tally[best]) best = d;
return digits.charAt(best) + " " + tally[best];
""",
        cpp="""
string digits = "0123456789ABCDEF";
vector<int> tally(16, 0);
int n = value;
while (n > 0) { tally[n % base]++; n /= base; }
int best = 0;
for (int d = 15; d >= 0; d--) if (tally[d] > tally[best]) best = d;
return string(1, digits[best]) + " " + to_string(tally[best]);
""",
    ),
),

# ---------------------------------------------------------------- Junior 4
dict(
    id="bus-route",
    fname="busiest",
    division="Junior",
    contest=2,
    title="Bus Route",
    blurb="Run a bus down its route and find the stop where it was fullest.",
    statement="""
<p>A bus begins its route empty. At each stop, everyone who is getting off leaves first, and only
then does anyone board.</p>

<p>Report the largest number of passengers the bus ever carried away from a stop, and the number of
the first stop at which that number was reached. Stops are numbered from 1.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>5:0 3:2 4:1</td></tr>
<tr><th>Output</th><td>9 3</td></tr>
<tr><th>Explanation</th><td>
Stop 1: nobody off, 5 on, leaving 5 aboard.<br>
Stop 2: 2 off and 3 on, leaving 6 aboard.<br>
Stop 3: 1 off and 4 on, leaving 9 aboard.<br>
The largest load is 9, first reached leaving stop 3.
</td></tr></table>
""",
    input_spec="Input one line holding the stops in order, separated by single spaces. Each stop "
               "is written as the number boarding, a colon, and the number getting off.",
    output_spec="Output the largest load, a single space, and the number of the first stop at "
                "which it was reached.",
    constraints="There are between 1 and 50 stops. Each count is between 0 and 99. Nobody ever "
                "gets off who is not aboard.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>route</code>, the stops in order.</li>
<li>The function returns a string, the largest load followed by a space and the stop number.</li>
</ul>
""",
    params=[("route", "str")],
    ret="str",
    samples=["5:0 3:2 4:1", "0:0", "9:0 0:9 9:0"],
    tests=["5:0 3:2 4:1", "0:0", "9:0 0:9 9:0",
           "1:0 1:0 1:0 0:3", "99:0", "10:0 0:5 5:5 5:0",
           "3:0 3:0 0:6 3:0", "0:0 0:0 7:0", "50:0 50:0",
           "2:0 2:1 2:1 2:1", "99:0 0:99 99:0 0:99", "4:0 0:4 4:0 0:4 4:0"],
    approach="""
<p>One pass, one running total, and two things to remember. Split the line into stops, then split
each stop at the colon into a boarding count and an alighting count.</p>

<p>The order of the two operations at each stop is stated in the problem and it matters: subtract the
passengers getting off first, then add the ones boarding. Doing it the other way round would let a
boarding passenger be counted among those who could get off, which changes nothing about the running
total here but would break the moment the problem let anyone do both.</p>

<p>Keep the best load seen so far and the stop it happened at. Start the best at a value below zero
rather than at 0, so that the first stop always sets it. If you start at 0 and the bus stays empty the
whole way, your recorded stop number is never written at all, and a route like the second sample would
report stop 0 rather than stop 1.</p>

<p>Use a strictly greater comparison when you update. That keeps the first stop where the maximum was
reached rather than the last, which is what the problem asks for. A greater than or equal test would
report the last one instead, and the sample with 9 on and 9 off shows the difference.</p>
""",
    sol=dict(
        python="""
aboard = 0
best = -1
where = 1
stop = 0
for token in route.split():
    stop += 1
    on, off = token.split(":")
    aboard -= int(off)
    aboard += int(on)
    if aboard > best:
        best = aboard
        where = stop
return str(best) + " " + str(where)
""",
        java="""
int aboard = 0, best = -1, where = 1, stop = 0;
for (String token : route.trim().split("\\\\s+")) {
    stop++;
    String[] parts = token.split(":");
    aboard -= Integer.parseInt(parts[1]);
    aboard += Integer.parseInt(parts[0]);
    if (aboard > best) { best = aboard; where = stop; }
}
return best + " " + where;
""",
        cpp="""
int aboard = 0, best = -1, where = 1, stop = 0;
string token;
istringstream is(route);
while (is >> token) {
    stop++;
    size_t colon = token.find(':');
    int on = stoi(token.substr(0, colon));
    int off = stoi(token.substr(colon + 1));
    aboard -= off;
    aboard += on;
    if (aboard > best) { best = aboard; where = stop; }
}
return to_string(best) + " " + to_string(where);
""",
    ),
),

# ---------------------------------------------------------------- Junior 5
dict(
    id="bracket-depth",
    fname="deepest",
    division="Junior",
    contest=2,
    title="Bracket Depth",
    blurb="Check that a run of brackets closes properly and report how deep it nests.",
    statement="""
<p>A string is made only of the six bracket characters ( ) [ ] { }. It is balanced when every
opening bracket is closed later by a bracket of the same kind, and no closing bracket appears without
a matching opening bracket still waiting for it.</p>

<p>Report the greatest number of brackets open at any one moment. If the string is not balanced,
report &minus;1 instead.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>([{}])</td></tr>
<tr><th>Output</th><td>3</td></tr>
<tr><th>Explanation</th><td>
After the round bracket, 1 is open.<br>
After the square bracket, 2 are open.<br>
After the curly bracket, 3 are open, which is the deepest it gets.<br>
The three closing brackets then match in the reverse order.
</td></tr></table>
""",
    input_spec="Input one line holding the bracket string.",
    output_spec="Output an integer, the greatest number of brackets open at once, or -1 if the "
                "string is not balanced.",
    constraints="The string holds between 1 and 200 characters, each of which is one of ( ) [ ] "
                "{ }.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>brackets</code>, the bracket string.</li>
<li>The function returns an integer, the greatest depth, or -1 if the string is not balanced.</li>
</ul>
""",
    params=[("brackets", "str")],
    ret="int",
    samples=["([{}])", "(]", "()()"],
    tests=["([{}])", "(]", "()()",
           "(", ")", "{[()]}[]",
           "((((((((((", "(()", "())(",
           "[](){}", "[({})]", "{{[[(())]]}}"],
    approach="""
<p>This is what a stack is for. Walk the string one character at a time. An opening bracket is
pushed; a closing bracket has to match whatever is on top, so pop and compare.</p>

<p>There are two separate ways for a string to fail and both need handling. A closing bracket may
arrive when the stack is empty, which means nothing was waiting for it, and a closing bracket may
arrive when the top of the stack is a different kind, which means the brackets cross rather than
nest. Either one is an immediate -1. Test for the empty stack before you look at what is on top, or
you will read past the end of it.</p>

<p>There is a third failure that only shows up at the very end. If the loop finishes with the stack
still holding something, those brackets were opened and never closed, so the answer is -1 even though
nothing went wrong along the way. A string like ( ( ) passes every test inside the loop.</p>

<p>The depth is simply the size of the stack, and the deepest it ever gets is what the problem wants.
Take that reading immediately after each push, since that is the only moment the stack grows.</p>
""",
    sol=dict(
        python="""
pairs = {")": "(", "]": "[", "}": "{"}
stack = []
best = 0
for c in brackets:
    if c in "([{":
        stack.append(c)
        if len(stack) > best:
            best = len(stack)
    else:
        if not stack or stack[-1] != pairs[c]:
            return -1
        stack.pop()
return -1 if stack else best
""",
        java="""
Deque<Character> stack = new ArrayDeque<>();
int best = 0;
for (char c : brackets.toCharArray()) {
    if (c == '(' || c == '[' || c == '{') {
        stack.push(c);
        if (stack.size() > best) best = stack.size();
    } else {
        char want = c == ')' ? '(' : c == ']' ? '[' : '{';
        if (stack.isEmpty() || stack.peek() != want) return -1;
        stack.pop();
    }
}
return stack.isEmpty() ? best : -1;
""",
        cpp="""
vector<char> stack;
int best = 0;
for (char c : brackets) {
    if (c == '(' || c == '[' || c == '{') {
        stack.push_back(c);
        if ((int) stack.size() > best) best = (int) stack.size();
    } else {
        char want = c == ')' ? '(' : c == ']' ? '[' : '{';
        if (stack.empty() || stack.back() != want) return -1;
        stack.pop_back();
    }
}
return stack.empty() ? best : -1;
""",
    ),
),

# ---------------------------------------------------------------- Junior 6
dict(
    id="skip-counting",
    fname="skipTour",
    division="Junior",
    contest=2,
    title="Skip Counting",
    blurb="Hop around a circular track by a fixed stride and see how much of it you cover.",
    statement="""
<p>A circular track has N slots, numbered 0 through N &minus; 1 in order, with slot N &minus; 1
sitting next to slot 0. You start on slot 0 and repeatedly hop forward exactly S slots, wrapping past
the end of the track as often as necessary.</p>

<p>You stop the moment you land back on slot 0. Report how many different slots you stood on,
counting slot 0 once, and the largest slot number among them.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>12<br>8</td></tr>
<tr><th>Output</th><td>3 8</td></tr>
<tr><th>Explanation</th><td>
Start on 0, hop to 8, hop to 4, hop back to 0 and stop.<br>
Three different slots were visited: 0, 4, and 8.<br>
The largest of them is 8.
</td></tr></table>
""",
    input_spec="Input the number of slots on the first line and the stride on the second line.",
    output_spec="Output the number of different slots visited, a single space, and the largest "
                "slot number visited.",
    constraints="The number of slots is between 2 and 100000, inclusive. The stride is between 1 "
                "and 100000, inclusive.",
    task="""
<ul>
<li>The function has 2 parameters: an integer, <code>slots</code>, the size of the track, and an
integer, <code>stride</code>, the size of each hop.</li>
<li>The function returns a string, the number of slots visited followed by a space and the largest
slot number visited.</li>
</ul>
""",
    params=[("slots", "int"), ("stride", "int")],
    ret="str",
    samples=[["12", "8"], ["10", "3"], ["6", "6"]],
    tests=[["12", "8"], ["10", "3"], ["6", "6"],
           ["2", "1"], ["100000", "1"], ["100000", "99999"],
           ["100", "25"], ["7", "3"], ["36", "24"],
           ["99991", "12345"], ["50", "100000"], ["1000", "500"]],
    approach="""
<p>Simulate it. Keep a current slot, and on each hop add the stride and take the result modulo
the number of slots, which is what makes the track circular. Stop when the new slot is 0 again.</p>

<p>Structure the loop so that slot 0 is recorded before the first hop and the test happens after it.
A loop that tests first would stop immediately, since you begin on slot 0. Recording, then hopping,
then testing is the shape that works.</p>

<p>You do not need a set. The visited slots are simply every multiple of the stride taken modulo the
track size, and no slot can repeat before you return to 0, so counting the hops is enough. Track the
largest slot seen with a running maximum as you go.</p>

<p>The tour always closes, and it never takes more hops than there are slots, so the loop is safe even
at the largest track size. If you want to check your answer, the number of slots visited is the track
size divided by the greatest common divisor of the track size and the stride, and the largest slot is
the track size minus that divisor. A stride that is a multiple of the track size visits slot 0 alone,
and the sixth sample is exactly that case.</p>
""",
    sol=dict(
        python="""
count = 0
biggest = 0
cur = 0
while True:
    count += 1
    if cur > biggest:
        biggest = cur
    cur = (cur + stride) % slots
    if cur == 0:
        break
return str(count) + " " + str(biggest)
""",
        java="""
int count = 0, biggest = 0, cur = 0;
while (true) {
    count++;
    if (cur > biggest) biggest = cur;
    cur = (cur + stride % slots) % slots;
    if (cur == 0) break;
}
return count + " " + biggest;
""",
        cpp="""
int count = 0, biggest = 0, cur = 0;
while (true) {
    count++;
    if (cur > biggest) biggest = cur;
    cur = (cur + stride % slots) % slots;
    if (cur == 0) break;
}
return to_string(count) + " " + to_string(biggest);
""",
    ),
),

]
