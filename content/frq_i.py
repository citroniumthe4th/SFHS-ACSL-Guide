# -*- coding: utf-8 -*-
"""ACSL style programming problems, Senior contests 1 and 2."""

PROBLEMS = [

# ---------------------------------------------------------------- Senior 1
dict(
    id="collatz-peak",
    fname="hailstone",
    division="Senior",
    contest=1,
    title="Collatz Peak",
    blurb="Halve or triple a number by turns and report how high it climbed before it fell to 1.",
    statement="""
<p>Start with a whole number. If it is even, replace it with half of itself. If it is odd, replace
it with three times itself plus one. Repeat until the value reaches 1. Every starting value in the range specified for this problem reaches 1.</p>

<p>Report the largest value the chain ever held, counting the starting value itself, and the number
of replacements made. A starting value of 1 makes no replacements at all.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>6</td></tr>
<tr><th>Output</th><td>16 8</td></tr>
<tr><th>Explanation</th><td>
The chain runs 6, 3, 10, 5, 16, 8, 4, 2, 1.<br>
The largest value along the way is 16.<br>
Reaching 1 took 8 replacements.
</td></tr></table>
""",
    input_spec="Input a single whole number, the value the chain begins with.",
    output_spec="Output the largest value the chain held, a single space, and the number of "
                "replacements.",
    constraints="The starting value is between 1 and 999999, inclusive. The largest value reached "
                "always fits in a 64 bit integer, and may be far larger than the starting value.",
    task="""
<ul>
<li>The function has 1 parameter: an integer, <code>start</code>, the value the chain begins
with.</li>
<li>The function returns a string, the largest value followed by a space and the number of
replacements.</li>
</ul>
""",
    params=[("start", "int")],
    ret="str",
    samples=["6", "1", "27"],
    tests=["6", "1", "27", "2", "703", "77031",
           "999999", "97", "871", "6171", "9", "837799"],
    approach="""
<p>The loop is four lines and everything that can go wrong is in the bookkeeping around it.</p>

<p>Keep the current value, a running maximum, and a count. On each pass, apply the rule, add one to
the count, and raise the maximum if the new value beats it. Stop when the value equals 1.</p>

<p>Start the maximum at the starting value rather than at zero or at one, because a chain that begins
above everything it later reaches would otherwise report the wrong peak. A start of 2 is the smallest
case where this matters: the chain is 2, 1, and the peak is the 2 you began with.</p>

<p>The type is the real trap. The values climb far higher than the input suggests, and a start under a
million can exceed two billion on the way down. Use a 64 bit integer for the running value in Java and
C++; a 32 bit one will overflow silently on some of the longer chains and produce a wrong answer
rather than an error.</p>

<p>Do not try to be clever with a table of already computed chains. There is no need: the longest chain
under a million takes well under six hundred steps, so even the worst case finishes instantly.</p>
""",
    sol=dict(
        python="""
n = start
peak = start
steps = 0
while n != 1:
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    steps += 1
    if n > peak:
        peak = n
return str(peak) + " " + str(steps)
""",
        java="""
long n = start, peak = start;
int steps = 0;
while (n != 1) {
    n = (n % 2 == 0) ? n / 2 : 3 * n + 1;
    steps++;
    if (n > peak) peak = n;
}
return peak + " " + steps;
""",
        cpp="""
long long n = start, peak = start;
int steps = 0;
while (n != 1) {
    n = (n % 2 == 0) ? n / 2 : 3 * n + 1;
    steps++;
    if (n > peak) peak = n;
}
return to_string(peak) + " " + to_string(steps);
""",
    ),
),

# ---------------------------------------------------------------- Senior 2
dict(
    id="divisor-champion",
    fname="mostDivisors",
    division="Senior",
    contest=1,
    title="Divisor Champion",
    blurb="Sweep a range of numbers and find the one with the most divisors.",
    statement="""
<p>Every whole number has some set of divisors, meaning the numbers that divide it exactly,
including 1 and itself.</p>

<p>Over a given range of whole numbers, report the one with the most divisors and how many divisors
it has. If several numbers tie, report the smallest of them.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>1<br>10</td></tr>
<tr><th>Output</th><td>6 4</td></tr>
<tr><th>Explanation</th><td>
6 has the divisors 1, 2, 3, and 6, which is four of them.<br>
8 and 10 also have four divisors each, but 6 is the smallest of the three.<br>
Nothing in the range has more than four.
</td></tr></table>
""",
    input_spec="Input the low end of the range on the first line and the high end on the second "
               "line. Both ends belong to the range.",
    output_spec="Output the winning number, a single space, and its number of divisors.",
    constraints="The low end is between 1 and 10000, inclusive, and the high end is at least the "
                "low end and at most 10000.",
    task="""
<ul>
<li>The function has 2 parameters: an integer, <code>low</code>, and an integer, <code>high</code>,
the two ends of the range.</li>
<li>The function returns a string, the winning number followed by a space and its divisor
count.</li>
</ul>
""",
    params=[("low", "int"), ("high", "int")],
    ret="str",
    samples=[["1", "10"], ["1", "1"], ["60", "120"]],
    tests=[["1", "10"], ["1", "1"], ["60", "120"],
           ["1", "100"], ["9973", "9973"], ["1", "10000"],
           ["7560", "7560"], ["100", "200"], ["9000", "10000"],
           ["2", "3"], ["5040", "5040"], ["1", "2"]],
    approach="""
<p>Two loops, and the inner one is where the whole problem sits. Counting divisors by testing every
number from 1 up to n works and is far more effort than it needs to be. Divisors come in pairs: if d
divides n then so does n divided by d, and one member of every pair is at most the square root of
n.</p>

<p>So loop d from 1 while d times d is at most n, and every time d divides n, add 2 to the count, once
for d and once for its partner. The one exception is a perfect square, where d and its partner are the
same number and adding 2 would count it twice, so add 1 instead when d times d equals n.</p>

<p>Compare with d times d rather than with the square root itself. Floating point square roots are the
usual source of off by one errors here, since a value just under a whole number rounds the wrong way
and silently drops the largest divisor pair.</p>

<p>Keep the best count and the number that achieved it, updating only when a count is strictly larger.
That settles ties in favor of the smallest number, since the range is swept upward and a later number
with an equal count never displaces the earlier one. The first sample has three numbers tied at four
divisors, which is there to catch a greater than or equal test.</p>
""",
    sol=dict(
        python="""
bestN = low
bestC = -1
for n in range(low, high + 1):
    count = 0
    d = 1
    while d * d <= n:
        if n % d == 0:
            count += 2 if d * d != n else 1
        d += 1
    if count > bestC:
        bestC = count
        bestN = n
return str(bestN) + " " + str(bestC)
""",
        java="""
int bestN = low, bestC = -1;
for (int n = low; n <= high; n++) {
    int count = 0;
    for (int d = 1; (long) d * d <= n; d++) {
        if (n % d == 0) count += (d * d != n) ? 2 : 1;
    }
    if (count > bestC) { bestC = count; bestN = n; }
}
return bestN + " " + bestC;
""",
        cpp="""
int bestN = low, bestC = -1;
for (int n = low; n <= high; n++) {
    int count = 0;
    for (int d = 1; (long long) d * d <= n; d++) {
        if (n % d == 0) count += (d * d != n) ? 2 : 1;
    }
    if (count > bestC) { bestC = count; bestN = n; }
}
return to_string(bestN) + " " + to_string(bestC);
""",
    ),
),

# ---------------------------------------------------------------- Senior 3
dict(
    id="base-palindrome",
    fname="nextDual",
    division="Senior",
    contest=1,
    title="Base Palindrome",
    blurb="Hunt for the next number that reads the same forwards in base 10 and in binary.",
    statement="""
<p>A number is a palindrome in a given base when its digits in that base read the same in either
direction. Leading zeros are never written, so binary representations always begin with a 1.</p>

<p>Report the smallest number strictly greater than a given value that is a palindrome in base 10 and
a palindrome in base 2 at the same time.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>10</td></tr>
<tr><th>Output</th><td>33</td></tr>
<tr><th>Explanation</th><td>
33 reads the same in either direction in base 10.<br>
33 in binary is 100001, which also reads the same in either direction.<br>
Nothing between 11 and 32 manages both.
</td></tr></table>
""",
    input_spec="Input a single whole number.",
    output_spec="Output an integer, the smallest number greater than the input that is a "
                "palindrome in both bases.",
    constraints="The input is between 0 and 50000, inclusive. The answer never exceeds 53235.",
    task="""
<ul>
<li>The function has 1 parameter: an integer, <code>start</code>, the value to search above.</li>
<li>The function returns an integer, the next number that is a palindrome in both bases.</li>
</ul>
""",
    params=[("start", "int")],
    ret="int",
    samples=["10", "0", "9"],
    tests=["10", "0", "9", "1", "100", "1000",
           "7446", "9008", "15350", "32222", "39993", "50000"],
    approach="""
<p>Search upward one number at a time and test each one. There is no useful shortcut here, and the
answers are close enough together that a plain scan finishes immediately.</p>

<p>Write the palindrome test once and use it for both bases. Given a number and a base, peel the digits
off with modulo and integer division to build the representation, then compare it against itself
reversed. Building the digits into a list or a string is easiest; reversing a number arithmetically and
comparing works too, and avoids the string entirely.</p>

<p>Note that the digits come off backwards, from least significant to most, which does not matter at
all for a palindrome test: a sequence reads the same in either direction exactly when its reverse does.
So there is no need to correct the order.</p>

<p>Two details decide the edge cases. The search starts strictly above the input, so an input that is
already a dual palindrome must not be its own answer, and an input of 9 has to move on to 33. And the
binary form never carries leading zeros, which is why 4, whose binary is 100, is not a palindrome even
though padding it to 00100 would create a palindrome.</p>
""",
    sol=dict(
        python="""
def isPal(n, base):
    digits = []
    while n > 0:
        digits.append(n % base)
        n //= base
    return digits == digits[::-1]

n = start + 1
while not (isPal(n, 10) and isPal(n, 2)):
    n += 1
return n
""",
        java="""
int n = start + 1;
while (!(isPal(n, 10) && isPal(n, 2))) n++;
return n;
""",
        java_helpers="""
static boolean isPal(int n, int base) {
    List<Integer> digits = new ArrayList<>();
    while (n > 0) { digits.add(n % base); n /= base; }
    for (int i = 0, j = digits.size() - 1; i < j; i++, j--) {
        if (!digits.get(i).equals(digits.get(j))) return false;
    }
    return true;
}
""",
        cpp="""
int n = start + 1;
while (!(isPal(n, 10) && isPal(n, 2))) n++;
return n;
""",
        cpp_helpers="""
bool isPal(int n, int base) {
    vector<int> digits;
    while (n > 0) { digits.push_back(n % base); n /= base; }
    for (int i = 0, j = (int) digits.size() - 1; i < j; i++, j--) {
        if (digits[i] != digits[j]) return false;
    }
    return true;
}
""",
    ),
),

# ---------------------------------------------------------------- Senior 4
dict(
    id="postfix-machine",
    fname="evaluate",
    division="Senior",
    contest=2,
    title="Postfix Machine",
    blurb="Run a postfix expression whose operands are named, and refuse the ones that do not work.",
    statement="""
<p>A postfix expression is a sequence of tokens separated by single spaces. A token is either a
single capital letter naming a value, or one of the four operators + &minus; * /. An operator pops the
two most recent values, applies itself with the earlier value on the left, and pushes the result.</p>

<p>Division keeps the signed integer part, discarding any fraction, so &minus;7 divided by 2 is
&minus;3 rather than &minus;4.</p>

<p>Report the value left on the stack. Report ERROR instead if an operator finds fewer than two values
waiting, if a letter is used that has no value, if a division by zero is attempted, or if the
expression does not finish with exactly one value on the stack.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>A B + C *<br>A=1 B=2 C=3</td></tr>
<tr><th>Output</th><td>9</td></tr>
<tr><th>Explanation</th><td>
Push 1 and 2, then the plus pops both and pushes 3.<br>
Push 3, then the star pops 3 and 3 and pushes 9.<br>
One value is left, so the answer is 9.
</td></tr></table>
""",
    input_spec="Input the expression on the first line, tokens separated by single spaces. Input "
               "the bindings on the second line, each written as a letter, an equals sign, and a "
               "value, separated by single spaces.",
    output_spec="Output the resulting value, or the word ERROR.",
    constraints="The expression holds between 1 and 60 tokens. There are between 1 and 26 "
                "bindings, each value between -9999 and 9999. Every intermediate result fits in a "
                "32 bit signed integer.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>expression</code>, the postfix expression, and a
string, <code>bindings</code>, the letter values.</li>
<li>The function returns a string, the resulting value or the word ERROR.</li>
</ul>
""",
    params=[("expression", "str"), ("bindings", "str")],
    ret="str",
    samples=[["A B + C *", "A=1 B=2 C=3"], ["A B -", "A=3 B=8"], ["A B +", "A=1"]],
    tests=[["A B + C *", "A=1 B=2 C=3"], ["A B -", "A=3 B=8"], ["A B +", "A=1"],
           ["A B C +", "A=1 B=2 C=3"], ["A B /", "A=7 B=2"], ["A B /", "A=-7 B=2"],
           ["A B /", "A=5 B=0"], ["A", "A=42"], ["A +", "A=1"],
           ["A B C * + D -", "A=5 B=2 C=3 D=4"], ["+ A B", "A=1 B=2"], ["A A * A A * +", "A=9"]],
    approach="""
<p>A stack and one pass. Split the bindings line first and store each letter's value in a lookup,
then walk the expression tokens.</p>

<p>A letter is pushed after looking up its value, and an unknown letter is an immediate ERROR. An
operator pops two values, and the order matters more than anything else here: the value popped first is
the right operand and the value popped second is the left one. Getting that backwards never shows up on
addition or multiplication and always shows up on subtraction and division, which is why one of the
samples subtracts.</p>

<p>Every failure has to be caught before it can do damage. Check that the stack holds at least two
values before popping, and check the right operand against zero before dividing. Both of those, left
unchecked, crash rather than print ERROR.</p>

<p>The last check happens after the loop rather than during it. A well formed postfix expression leaves
exactly one value behind, so anything else, whether none or several, is an ERROR. An expression of three
operands and one operator passes every test inside the loop and still fails this one.</p>

<p>Python's // rounds down, so compute the quotient on absolute values and reattach the sign there. Java and C++ integer division already truncate toward zero, so use a / b directly. Taking the absolute value of the smallest 32 bit integer is unsafe in those languages because its positive counterpart does not fit in that type.</p>
""",
    sol=dict(
        python="""
env = {}
for token in bindings.split():
    name, value = token.split("=")
    env[name] = int(value)

stack = []
for token in expression.split():
    if token in ("+", "-", "*", "/"):
        if len(stack) < 2:
            return "ERROR"
        b = stack.pop()
        a = stack.pop()
        if token == "+":
            stack.append(a + b)
        elif token == "-":
            stack.append(a - b)
        elif token == "*":
            stack.append(a * b)
        else:
            if b == 0:
                return "ERROR"
            q = abs(a) // abs(b)
            stack.append(q if (a < 0) == (b < 0) else -q)
    else:
        if token not in env:
            return "ERROR"
        stack.append(env[token])
return str(stack[0]) if len(stack) == 1 else "ERROR"
""",
        java="""
Map<String, Integer> env = new HashMap<>();
for (String token : bindings.trim().split("\\\\s+")) {
    String[] parts = token.split("=");
    env.put(parts[0], Integer.parseInt(parts[1]));
}
Deque<Integer> stack = new ArrayDeque<>();
for (String token : expression.trim().split("\\\\s+")) {
    if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
        if (stack.size() < 2) return "ERROR";
        int b = stack.pop(), a = stack.pop();
        if (token.equals("+")) stack.push(a + b);
        else if (token.equals("-")) stack.push(a - b);
        else if (token.equals("*")) stack.push(a * b);
        else {
            if (b == 0) return "ERROR";
            stack.push(a / b);
        }
    } else {
        if (!env.containsKey(token)) return "ERROR";
        stack.push(env.get(token));
    }
}
return stack.size() == 1 ? String.valueOf(stack.pop()) : "ERROR";
""",
        cpp="""
map<string, int> env;
string token;
istringstream bs(bindings);
while (bs >> token) {
    size_t eq = token.find('=');
    env[token.substr(0, eq)] = stoi(token.substr(eq + 1));
}
vector<int> stack;
istringstream es(expression);
while (es >> token) {
    if (token == "+" || token == "-" || token == "*" || token == "/") {
        if (stack.size() < 2) return "ERROR";
        int b = stack.back(); stack.pop_back();
        int a = stack.back(); stack.pop_back();
        if (token == "+") stack.push_back(a + b);
        else if (token == "-") stack.push_back(a - b);
        else if (token == "*") stack.push_back(a * b);
        else {
            if (b == 0) return "ERROR";
            stack.push_back(a / b);
        }
    } else {
        if (env.find(token) == env.end()) return "ERROR";
        stack.push_back(env[token]);
    }
}
return stack.size() == 1 ? to_string(stack[0]) : string("ERROR");
""",
    ),
),

# ---------------------------------------------------------------- Senior 5
dict(
    id="gray-code",
    fname="grayCode",
    division="Senior",
    contest=2,
    title="Gray Code",
    blurb="Produce the bit string that sits at a given position in a reflected binary ordering.",
    statement="""
<p>A Gray code lists every bit string of a given length so that each entry differs from the one
before it in exactly one position. The standard one starts at all zeros, and the entry at position K
is obtained from K by exclusive-oring K with K shifted right by one place.</p>

<p>Report the entry at a given position, written with leading zeros so that it is exactly N bits
long. Positions are counted from 0.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>3<br>5</td></tr>
<tr><th>Output</th><td>111</td></tr>
<tr><th>Explanation</th><td>
5 in binary is 101, and shifting it right by one gives 010.<br>
The exclusive or of 101 and 010 is 111.<br>
Written in 3 bits, that is 111.
</td></tr></table>
""",
    input_spec="Input the number of bits on the first line and the position on the second line.",
    output_spec="Output the bit string, exactly as many characters long as the number of bits "
                "requested.",
    constraints="The number of bits is between 1 and 20, inclusive. The position is between 0 and "
                "2 raised to the number of bits, minus 1.",
    task="""
<ul>
<li>The function has 2 parameters: an integer, <code>bits</code>, the length of the strings, and an
integer, <code>index</code>, the position in the listing.</li>
<li>The function returns a string, the bit string at that position.</li>
</ul>
""",
    params=[("bits", "int"), ("index", "int")],
    ret="str",
    samples=[["3", "5"], ["3", "0"], ["4", "15"]],
    tests=[["3", "5"], ["3", "0"], ["4", "15"],
           ["1", "1"], ["1", "0"], ["2", "2"],
           ["20", "1048575"], ["20", "0"], ["8", "128"],
           ["5", "17"], ["10", "512"], ["16", "43690"]],
    approach="""
<p>The rule is one line, and everything else is formatting. Shift the position right by one and
exclusive-or the result with the position itself. In Python that is index ^ (index &gt;&gt; 1), and Java
and C++ spell it the same way.</p>

<p>If you would rather not use the shift and exclusive or, the same value can be built one bit at a
time: the leading bit of the answer is the leading bit of the position, and each later bit is the
exclusive or of the position's bit at that place with the position's bit one place higher.</p>

<p>Writing the answer out is where the marks go. The result has to be exactly N characters, which means
leading zeros have to be supplied by hand: the entry at position 0 is a run of zeros, not the single
character 0. Build the string by testing each bit from the highest down to the lowest and appending a 1
or a 0, which produces the right length automatically.</p>

<p>Twenty bits fits comfortably in a 32 bit integer, so no widening is needed, but be careful with a
right shift on a signed type if you ever extend the problem.</p>
""",
    sol=dict(
        python="""
value = index ^ (index >> 1)
out = ""
for b in range(bits - 1, -1, -1):
    out += "1" if (value >> b) & 1 else "0"
return out
""",
        java="""
int value = index ^ (index >> 1);
StringBuilder out = new StringBuilder();
for (int b = bits - 1; b >= 0; b--) out.append(((value >> b) & 1) == 1 ? '1' : '0');
return out.toString();
""",
        cpp="""
int value = index ^ (index >> 1);
string out;
for (int b = bits - 1; b >= 0; b--) out += ((value >> b) & 1) ? '1' : '0';
return out;
""",
    ),
),

# ---------------------------------------------------------------- Senior 6
dict(
    id="circulate-cycle",
    fname="cycleTour",
    division="Senior",
    contest=2,
    title="Circulate Cycle",
    blurb="Circulate a bit string over and over and see how many different strings you get.",
    statement="""
<p>LCIRC-K applied to a bit string moves the first K bits round to the end, leaving the length
unchanged. Applying it repeatedly must eventually bring the original string back.</p>

<p>Starting from a given string, apply LCIRC-K again and again until the original string reappears.
Report how many different strings were seen along the way, counting the original once, and the
smallest of them in ordinary alphabetical order, where 0 comes before 1.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>110100<br>2</td></tr>
<tr><th>Output</th><td>3 001101</td></tr>
<tr><th>Explanation</th><td>
Starting from 110100, LCIRC-2 gives 010011, then 110100 is not yet back: 001101 comes next.<br>
Applying it once more returns 110100, so the tour is over.<br>
Three strings were seen, and the smallest of them is 001101.
</td></tr></table>
""",
    input_spec="Input the bit string on the first line and the circulate amount on the second "
               "line.",
    output_spec="Output the number of different strings seen, a single space, and the smallest of "
                "them.",
    constraints="The bit string holds between 1 and 60 characters, each a 0 or a 1. The circulate "
                "amount is between 0 and 1000, inclusive, and may exceed the length of the "
                "string.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>bits</code>, the starting bit string, and an
integer, <code>amount</code>, the circulate amount.</li>
<li>The function returns a string, the count of different strings followed by a space and the
smallest of them.</li>
</ul>
""",
    params=[("bits", "str"), ("amount", "int")],
    ret="str",
    samples=[["110100", "2"], ["1010", "2"], ["100", "1"]],
    tests=[["110100", "2"], ["1010", "2"], ["100", "1"],
           ["1111", "1"], ["10", "3"], ["110100", "6"],
           ["0", "0"], ["01", "0"], ["110100", "3"],
           ["100000000000", "4"], ["101010101010", "3"], ["011", "7"]],
    approach="""
<p>Reduce the amount modulo the length before anything else. A circulate by the length returns the
string unchanged, so an amount of 1000 on a string of 6 characters is really a circulate by 4. Skipping
this step is what makes an amount larger than the string look impossible.</p>

<p>Once reduced, one application is a single slice: take the characters from the amount onward and
follow them with the characters before it. Applying that repeatedly walks the tour.</p>

<p>Structure the loop so the original is recorded before the first application and the return test comes
after it. A loop that tests first stops immediately, since you begin on the original string. Record,
apply, then test.</p>

<p>Track the smallest string with a running comparison as you go, using ordinary string comparison,
which on 0 and 1 characters is exactly the ordering the problem asks for. There is no need to store
every string seen; a count and a running minimum are enough.</p>

<p>The tour always closes and never takes more applications than the length of the string, so the loop
is safe. An amount that reduces to 0 leaves the string alone and the tour is a single string, which is
what the sixth test and the seventh check.</p>
""",
    sol=dict(
        python="""
n = len(bits)
step = amount % n
count = 0
smallest = bits
cur = bits
while True:
    count += 1
    if cur < smallest:
        smallest = cur
    cur = cur[step:] + cur[:step]
    if cur == bits:
        break
return str(count) + " " + smallest
""",
        java="""
int n = bits.length();
int step = amount % n;
int count = 0;
String smallest = bits, cur = bits;
while (true) {
    count++;
    if (cur.compareTo(smallest) < 0) smallest = cur;
    cur = cur.substring(step) + cur.substring(0, step);
    if (cur.equals(bits)) break;
}
return count + " " + smallest;
""",
        cpp="""
int n = (int) bits.size();
int step = amount % n;
int count = 0;
string smallest = bits, cur = bits;
while (true) {
    count++;
    if (cur < smallest) smallest = cur;
    cur = cur.substr(step) + cur.substr(0, step);
    if (cur == bits) break;
}
return to_string(count) + " " + smallest;
""",
    ),
),

]
