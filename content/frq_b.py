# -*- coding: utf-8 -*-
"""ACSL style programming problems, part 2 of 3."""

PROBLEMS = [

# ---------------------------------------------------------------- Junior 5
dict(
    id="roman-addition",
    fname="romanSum",
    division="Junior",
    contest=1,
    title="Roman Addition",
    blurb="Add two Roman numerals and write the answer back in standard form.",
    statement="""
<p>Roman numerals use the letters I for 1, V for 5, X for 10, L for 50, C for 100, D for 500, and
M for 1000. A numeral is read left to right, adding as you go, except that a smaller value placed
directly in front of a larger one is subtracted instead. So XL is 40 and LX is 60.</p>

<p>Standard form allows exactly six subtractive pairs: IV for 4, IX for 9, XL for 40, XC for 90,
CD for 400, and CM for 900. No other letter may be placed in front of a larger one, and no letter
may repeat more than three times in a row.</p>

<p>Given two Roman numerals, add them and write the sum as a Roman numeral in standard form.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>XLII<br>MCMXCIX</td></tr>
<tr><th>Output</th><td>MMXLI</td></tr>
<tr><th>Explanation</th><td>
XLII is XL plus I plus I, which is 40 + 1 + 1, or 42.<br>
MCMXCIX is M plus CM plus XC plus IX, which is 1000 + 900 + 90 + 9, or 1999.<br>
The sum is 2041, which is written MM for 2000, XL for 40, and I for 1.
</td></tr></table>
""",
    input_spec="Input a Roman numeral in standard form on the first line and a second Roman "
               "numeral in standard form on the second line.",
    output_spec="Output the sum as a Roman numeral in standard form.",
    constraints="Each input numeral has a value between 1 and 3999, inclusive, and the sum is "
                "never more than 3999.",
    task="""
<ul>
<li>The function has 2 parameters: two strings, <code>a</code> and <code>b</code>, each a Roman
numeral in standard form.</li>
<li>The function returns a string, the sum written as a Roman numeral in standard form.</li>
</ul>
""",
    params=[("a", "str"), ("b", "str")],
    ret="str",
    samples=[["XLII", "MCMXCIX"], ["I", "I"], ["MMM", "CMXCIX"]],
    tests=[["XLII", "MCMXCIX"], ["I", "I"], ["MMM", "CMXCIX"],
           ["IV", "VI"], ["XC", "X"], ["CDXLIV", "DLVI"],
           ["MCMLXXXIV", "XVI"], ["III", "IV"], ["MMXXV", "MDCCCLXXV"],
           ["IX", "I"], ["DCCCLXXXVIII", "MMCXI"], ["XXXIX", "MCMLXI"]],
    approach="""
<p>This is two conversions with an addition in the middle, and neither conversion
needs a special case provided you set the tables up properly.</p>

<p>Going from Roman to a number, scan left to right and compare each letter with the one after it,
subtracting when the current value is smaller than the next and adding otherwise. That single rule
handles all six subtractive pairs without your ever listing them, because a smaller value can only
legally sit in front of a larger one when it is one of those pairs.</p>

<p>Coming back the other way is greedy, and everything depends on what goes into the table. List all
thirteen values in descending order and give the subtractive pairs entries of their own: 1000 M, 900
CM, 500 D, 400 CD, 100 C, 90 XC, 50 L, 40 XL, 10 X, 9 IX, 5 V, 4 IV, and 1 I. Then repeatedly take the
largest entry that fits and subtract it. With those six extra rows present, a plain greedy pass
produces standard form automatically and you never have to think about it again.</p>

<p>Leave them out and the same greedy pass emits IIII for 4 and DCCCC for 900, both of which look
reasonable enough on the page to survive a glance and fail every test case that touches them. That is
essentially the whole difficulty of the problem.</p>
""",
    sol=dict(
        python_helpers="""
VALUES = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), (100, "C"), (90, "XC"),
          (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
DIGIT = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}


def to_int(s):
    total = 0
    for i, ch in enumerate(s):
        v = DIGIT[ch]
        if i + 1 < len(s) and v < DIGIT[s[i + 1]]:
            total -= v
        else:
            total += v
    return total
""",
        python="""
n = to_int(a) + to_int(b)
out = ""
for value, letters in VALUES:
    while n >= value:
        out += letters
        n -= value
return out
""",
        java_helpers="""
static final int[] VALS = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
static final String[] LETS = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

static int digit(char c) {
    switch (c) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        default: return 1000;
    }
}

static int toInt(String s) {
    int total = 0;
    for (int i = 0; i < s.length(); i++) {
        int v = digit(s.charAt(i));
        if (i + 1 < s.length() && v < digit(s.charAt(i + 1))) total -= v;
        else total += v;
    }
    return total;
}
""",
        java="""
int n = toInt(a) + toInt(b);
StringBuilder out = new StringBuilder();
for (int i = 0; i < VALS.length; i++) {
    while (n >= VALS[i]) { out.append(LETS[i]); n -= VALS[i]; }
}
return out.toString();
""",
        cpp_helpers="""
static const int VALS[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
static const char *LETS[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

static int digitv(char c) {
    switch (c) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        default: return 1000;
    }
}

static int toInt(const string &s) {
    int total = 0;
    for (size_t i = 0; i < s.size(); i++) {
        int v = digitv(s[i]);
        if (i + 1 < s.size() && v < digitv(s[i + 1])) total -= v;
        else total += v;
    }
    return total;
}
""",
        cpp="""
int n = toInt(a) + toInt(b);
string out;
for (int i = 0; i < 13; i++) {
    while (n >= VALS[i]) { out += LETS[i]; n -= VALS[i]; }
}
return out;
""",
    ),
),

# ---------------------------------------------------------------- Junior 6
dict(
    id="change-machine",
    fname="makeChange",
    division="Junior",
    contest=2,
    title="Change Machine",
    blurb="Pay out change largest coin first, and admit it when the greedy rule gets stuck.",
    statement="""
<p>A vending machine pays out change one coin at a time. It always reaches for the largest coin
it still stocks that does not overshoot what it still owes, hands that out, and repeats until it
owes nothing.</p>

<p>The machine does not stock every denomination, and it does not plan ahead. If it runs out of
choices while it still owes money, it gives up and refuses the sale.</p>

<p>Given the amount owed and the coin values the machine stocks, report how many of each coin it
pays out.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>87<br>25 10 5 1</td></tr>
<tr><th>Output</th><td>3 1 0 2</td></tr>
<tr><th>Explanation</th><td>
Three 25s bring the debt from 87 down to 12.<br>
One 10 brings it down to 2.<br>
A 5 would overshoot, so none are used.<br>
Two 1s finish it.<br>
Reporting the counts in the order the coins were listed gives 3 1 0 2.
</td></tr></table>
""",
    input_spec="Input the amount owed as an integer on the first line. On the second line input "
               "the coin values the machine stocks, each separated by a single space, in "
               "descending order.",
    output_spec="Output the number of each coin paid out, in the same order the coin values were "
                "given, separated by single spaces. If the machine cannot pay the exact amount by "
                "this rule, output IMPOSSIBLE.",
    constraints="The amount owed is between 1 and 100000, inclusive. The machine stocks between 1 "
                "and 10 coin values, all positive and all distinct, given in descending order.",
    task="""
<ul>
<li>The function has 2 parameters: an integer, <code>owed</code>, the amount to pay out, and a
string, <code>coins</code>, holding the coin values in descending order separated by single
spaces.</li>
<li>The function returns a string holding the count of each coin separated by single spaces, or
IMPOSSIBLE.</li>
</ul>
""",
    params=[("owed", "int"), ("coins", "str")],
    ret="str",
    samples=[["87", "25 10 5 1"], ["5", "7 3"], ["100", "50 25 10 5 1"]],
    tests=[["87", "25 10 5 1"], ["5", "7 3"], ["100", "50 25 10 5 1"],
           ["1", "1"], ["30", "25 10"], ["99", "25 10 5 1"],
           ["63", "50 20 10 5 2"], ["6", "4 3 1"], ["100000", "10000 5000 1000 500 100 25 10 5 1"],
           ["11", "9 6 1"], ["7", "5 4"], ["4321", "2000 500 200 50 20 5 2"]],
    approach="""
<p>The loop itself is short. For each coin value in the order given, divide what
is still owed by that value to get a count, then keep the remainder as the new amount owed. If
anything is still owed once the values run out, the answer is IMPOSSIBLE.</p>

<p>What makes this a real problem is that the greedy rule is not always optimal, and the statement
deliberately tells you to follow it anyway. With coins of 25, 10, 5, and 1 the greedy answer happens to
be optimal for every amount, which is why American change feels natural and why the flaw stays hidden.
Give the machine only 25s and 10s and ask it for 30, and it takes the 25, is left owing 5, finds
nothing that fits, and reports IMPOSSIBLE even though three 10s would have worked perfectly.</p>

<p>Do not fix that. The machine described in the statement has no lookahead, and a solver clever enough
to find the working combination fails the fifth test case. Implement the rule you were given rather
than the rule you would have written.</p>

<p>One formatting trap remains. The output carries one number per coin value, including the zeros, so
skipping a coin that was never used collapses the columns and misaligns everything after it.</p>
""",
    sol=dict(
        python="""
left = owed
parts = []
for tok in coins.split():
    v = int(tok)
    parts.append(str(left // v))
    left %= v
if left > 0:
    return "IMPOSSIBLE"
return " ".join(parts)
""",
        java="""
int left = owed;
List<String> parts = new ArrayList<>();
for (String tok : coins.trim().split("\\\\s+")) {
    int v = Integer.parseInt(tok);
    parts.add(String.valueOf(left / v));
    left %= v;
}
if (left > 0) return "IMPOSSIBLE";
return String.join(" ", parts);
""",
        cpp="""
int left = owed, v;
vector<string> parts;
istringstream is(coins);
while (is >> v) {
    parts.push_back(to_string(left / v));
    left %= v;
}
if (left > 0) return "IMPOSSIBLE";
string out;
for (size_t i = 0; i < parts.size(); i++) { if (i) out += ' '; out += parts[i]; }
return out;
""",
    ),
),

# ---------------------------------------------------------------- Senior 1
dict(
    id="stamp-combinations",
    fname="countWays",
    division="Senior",
    contest=1,
    title="Stamp Combinations",
    blurb="Count the ways to make exact postage when order does not matter.",
    statement="""
<p>A post office sells stamps in a handful of values and never runs out of any of them. A
customer wants to make up an exact amount of postage on one envelope.</p>

<p>Count the different ways to do it. Two ways are the same if they use the same number of each
stamp value, so sticking a 5 and then a 2 on the envelope is the same as sticking a 2 and then a
5. Using no stamps at all counts as the only way to make an amount of 0.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>10<br>1 2 5</td></tr>
<tr><th>Output</th><td>10</td></tr>
<tr><th>Explanation</th><td>
The ten ways, written as the count of 5s, 2s, and 1s:<br>
two 5s; one 5 and two 2s and one 1; one 5 and one 2 and three 1s; one 5 and five 1s;<br>
five 2s; four 2s and two 1s; three 2s and four 1s; two 2s and six 1s;<br>
one 2 and eight 1s; ten 1s.
</td></tr></table>
""",
    input_spec="Input the postage amount as an integer on the first line. On the second line "
               "input the stamp values, each separated by a single space.",
    output_spec="Output an integer, the number of distinct ways to make the exact amount.",
    constraints="The amount is between 0 and 300, inclusive. There are between 1 and 8 distinct "
                "stamp values, each between 1 and 300. The answer always fits in a 64 bit "
                "integer.",
    task="""
<ul>
<li>The function has 2 parameters: an integer, <code>amount</code>, the postage to make, and a
string, <code>stamps</code>, holding the available stamp values separated by single spaces.</li>
<li>The function returns an integer, the number of distinct ways.</li>
</ul>
""",
    params=[("amount", "int"), ("stamps", "str")],
    ret="int",
    samples=[["10", "1 2 5"], ["0", "3 7"], ["7", "2 4"]],
    tests=[["10", "1 2 5"], ["0", "3 7"], ["7", "2 4"],
           ["100", "1 5 10 25"], ["300", "1 2 3"], ["11", "1 2 5 10"],
           ["50", "3 7 11"], ["1", "2"], ["200", "1 2 5 10 20 50 100"],
           ["17", "17"], ["120", "6 9 20"], ["250", "1 3 5 7 11 13 17 19"]],
    approach="""
<p>Recursion that tries every possible count of every stamp is correct and
hopeless at an amount of 300. The fix is a single one dimensional table, and the order of the two loops
is the entire problem.</p>

<p>Let <code>ways[k]</code> be the number of ways to make exactly k, starting with
<code>ways[0]</code> equal to 1 and everything else at 0. Then loop over the stamp values on the
outside, and for each one loop k upward from that value to the amount, adding
<code>ways[k - value]</code> into <code>ways[k]</code>.</p>

<p>Putting the stamp values on the outside is what makes order irrelevant. Each value is fully absorbed
into the table before the next one is considered, so any given combination is built in exactly one
canonical order and can never be counted twice. Swap the loops so that k sits outside and you count
ordered sequences instead, which for the first sample would give 128 rather than 10.</p>

<p>Running k upward rather than downward is what allows a stamp to be used more than once. Counting
downward would permit each value at most once, which is the answer to a genuinely different
question.</p>

<p>An amount of 0 has exactly one way to be made, namely the empty selection, and the initial
<code>ways[0]</code> equal to 1 delivers that without a special case. The counts grow quickly, so keep
the table in 64 bit integers.</p>
""",
    sol=dict(
        python="""
ways = [0] * (amount + 1)
ways[0] = 1
for tok in stamps.split():
    v = int(tok)
    for k in range(v, amount + 1):
        ways[k] += ways[k - v]
return ways[amount]
""",
        java="""
long[] ways = new long[amount + 1];
ways[0] = 1;
for (String tok : stamps.trim().split("\\\\s+")) {
    int v = Integer.parseInt(tok);
    for (int k = v; k <= amount; k++) ways[k] += ways[k - v];
}
return (int) ways[amount];
""",
        cpp="""
vector<long long> ways(amount + 1, 0);
ways[0] = 1;
int v;
istringstream is(stamps);
while (is >> v) {
    for (int k = v; k <= amount; k++) ways[k] += ways[k - v];
}
return (int) ways[amount];
""",
    ),
),

# ---------------------------------------------------------------- Senior 2
dict(
    id="expression-target",
    fname="countExpressions",
    division="Senior",
    contest=2,
    title="Expression Target",
    blurb="Wedge operators between digits, evaluate strictly left to right, and count the hits.",
    statement="""
<p>You are given a string of digits and a target value. Leave the digits exactly where they are
and slot one operator into each gap between neighboring digits. The only operators allowed are
+, &minus;, and *, and each gap must get exactly one of them.</p>

<p>Evaluate the result strictly left to right, with no precedence at all. Multiplication does not
go first. So 1 + 2 * 3 is evaluated as 1 + 2, then times 3, which is 9.</p>

<p>Count how many of the operator choices produce the target value. Two choices are different if
any gap holds a different operator.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>6<br>123</td></tr>
<tr><th>Output</th><td>2</td></tr>
<tr><th>Explanation</th><td>
There are two gaps and three operators, so nine expressions in all:<br>
1+2+3 is 6, 1+2&minus;3 is 0, 1+2*3 is 9, 1&minus;2+3 is 2, 1&minus;2&minus;3 is &minus;4,
1&minus;2*3 is &minus;3, 1*2+3 is 5, 1*2&minus;3 is &minus;1, and 1*2*3 is 6.<br>
Two of them equal 6, so output 2.
</td></tr></table>
""",
    input_spec="Input the target value as an integer on the first line and a string of digits on "
               "the second line.",
    output_spec="Output an integer, the number of operator choices that produce the target.",
    constraints="The digit string holds between 2 and 11 digits, each 0 through 9. The target is "
                "between &minus;1000000 and 1000000, inclusive.",
    task="""
<ul>
<li>The function has 2 parameters: an integer, <code>target</code>, the value to hit, and a
string, <code>digits</code>, holding the digits in the order they must stay.</li>
<li>The function returns an integer, the number of operator choices that reach the target.</li>
</ul>
""",
    params=[("target", "int"), ("digits", "str")],
    ret="int",
    samples=[["6", "123"], ["0", "11"], ["10", "2222"]],
    tests=[["6", "123"], ["0", "11"], ["10", "2222"],
           ["100", "123456789"], ["0", "1111111111"], ["9", "333"],
           ["-5", "12345"], ["720", "123456"], ["1", "10"],
           ["0", "00000"], ["45", "987654321"], ["24", "11223344"]],
    approach="""
<p>With d digits there are d minus 1 gaps and three choices at each, giving at
most 3 to the tenth expressions, or 59049. That is small enough to try every one of them, and recursion
is the cleanest way to do it.</p>

<p>Write a helper taking the index of the next digit and the value accumulated so far. When the index
reaches the end of the string, return 1 if the accumulated value equals the target and 0 otherwise.
Otherwise return the sum of three recursive calls, one for each operator applied to the running value
and the next digit.</p>

<p>Because the evaluation is strictly left to right, that running value is the only state you need.
There is nothing to tokenize, no expression to build, and no precedence to worry about, which is
exactly why the problem specifies left to right evaluation in the first place. A solver that quietly
applies ordinary precedence gets the first sample right by luck and diverges immediately
afterwards.</p>

<p>Start the recursion at the second digit with the first digit as the running value. Starting at the
first digit with a running value of 0 silently inserts a leading plus, which changes the answer the
moment the first operator should have been a minus.</p>

<p>Intermediate values can swing far outside the target range, since a run of nines multiplied together
gets large quickly, so keep the running value in a 64 bit integer even though the comparison at the end
still demands an exact match.</p>
""",
    sol=dict(
        python_helpers="""
def walk(digits, i, acc, target):
    if i == len(digits):
        return 1 if acc == target else 0
    d = int(digits[i])
    return (walk(digits, i + 1, acc + d, target)
            + walk(digits, i + 1, acc - d, target)
            + walk(digits, i + 1, acc * d, target))
""",
        python="""
return walk(digits, 1, int(digits[0]), target)
""",
        java_helpers="""
static int walk(String digits, int i, long acc, int target) {
    if (i == digits.length()) return acc == target ? 1 : 0;
    long d = digits.charAt(i) - '0';
    return walk(digits, i + 1, acc + d, target)
         + walk(digits, i + 1, acc - d, target)
         + walk(digits, i + 1, acc * d, target);
}
""",
        java="""
return walk(digits, 1, digits.charAt(0) - '0', target);
""",
        cpp_helpers="""
static int walk(const string &digits, size_t i, long long acc, int target) {
    if (i == digits.size()) return acc == target ? 1 : 0;
    long long d = digits[i] - '0';
    return walk(digits, i + 1, acc + d, target)
         + walk(digits, i + 1, acc - d, target)
         + walk(digits, i + 1, acc * d, target);
}
""",
        cpp="""
return walk(digits, 1, digits[0] - '0', target);
""",
    ),
),

]
