# -*- coding: utf-8 -*-
"""ACSL style programming problems, Junior contests 3 and 4."""

PROBLEMS = [

# ---------------------------------------------------------------- Junior 7
dict(
    id="seat-map",
    fname="emptiestRow",
    division="Junior",
    contest=3,
    title="Seat Map",
    blurb="Read a theater's seating chart and find the row with the most seats still free.",
    statement="""
<p>A theater's seating chart is drawn one row at a time. A full stop marks a free seat and a hash
marks a taken one. Every row holds the same number of seats.</p>

<p>Report how many free seats the emptiest row has, and the number of that row. Rows are numbered
from 1 in the order they are given, and if two rows tie, report the earlier one.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>..#;#..;###</td></tr>
<tr><th>Output</th><td>2 1</td></tr>
<tr><th>Explanation</th><td>
Row 1 has two free seats.<br>
Row 2 has two free seats as well.<br>
Row 3 has none.<br>
Rows 1 and 2 tie, so the earlier one is reported.
</td></tr></table>
""",
    input_spec="Input one line holding the rows in order, separated by semicolons. Each row is a "
               "run of full stops and hashes.",
    output_spec="Output the number of free seats in the emptiest row, a single space, and the "
                "number of that row.",
    constraints="There are between 1 and 40 rows, each holding between 1 and 40 seats. Every row "
                "holds the same number of seats.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>chart</code>, the rows separated by
semicolons.</li>
<li>The function returns a string, the free seat count followed by a space and the row number.</li>
</ul>
""",
    params=[("chart", "str")],
    ret="str",
    samples=["..#;#..;###", "#", "#.#;.#.;#.#"],
    tests=["..#;#..;###", "#", "#.#;.#.;#.#",
           "...", "###;###;..#", ".;#;.;#",
           "##.#;.#.#;####", "....;....", "#.;.#",
           "##########;.........#;##########", ".#.#.#;......;######", "#;#;#;#;#;#"],
    approach="""
<p>Split the line at the semicolons and you have the rows. Everything after that is one pass with
a running best.</p>

<p>For each row, count the full stops. There is no need to look at the hashes at all, since every
character is one or the other, though counting hashes and subtracting from the row's length works
equally well.</p>

<p>Keep the best count found so far along with the row it came from, and update only when a row is
strictly better. That is what settles ties in favor of the earlier row: a later row with the same count
never displaces it. Using greater than or equal instead would report the last such row, and the sample
is built so that the two answers differ.</p>

<p>Start the best count below zero rather than at 0. A chart in which every row is completely full
would otherwise never record a row number at all, and the second sample is exactly that chart.</p>
""",
    sol=dict(
        python="""
best = -1
where = 1
row = 0
for line in chart.split(";"):
    row += 1
    free = line.count(".")
    if free > best:
        best = free
        where = row
return str(best) + " " + str(where)
""",
        java="""
int best = -1, where = 1, row = 0;
for (String line : chart.split(";")) {
    row++;
    int free = 0;
    for (char c : line.toCharArray()) if (c == '.') free++;
    if (free > best) { best = free; where = row; }
}
return best + " " + where;
""",
        cpp="""
int best = -1, where = 1, row = 0;
string line;
istringstream is(chart);
while (getline(is, line, ';')) {
    row++;
    int free = 0;
    for (char c : line) if (c == '.') free++;
    if (free > best) { best = free; where = row; }
}
return to_string(best) + " " + to_string(where);
""",
    ),
),

# ---------------------------------------------------------------- Junior 8
dict(
    id="hot-streak",
    fname="longestRun",
    division="Junior",
    contest=3,
    title="Hot Streak",
    blurb="Find the longest stretch of strictly rising numbers and say where it ended.",
    statement="""
<p>A list of integers is given in order. A streak is a stretch of neighboring values in which
each one is strictly larger than the one before it. A single value on its own is a streak of length
1.</p>

<p>Report the length of the longest streak and the value it ends on. If two streaks tie for
longest, report the one that ends earlier.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>1 3 5 4 6 7 8 2</td></tr>
<tr><th>Output</th><td>4 8</td></tr>
<tr><th>Explanation</th><td>
The streak 1 3 5 has length 3.<br>
The streak 4 6 7 8 has length 4 and is the longest.<br>
It ends on 8, and the 2 that follows begins a new streak of length 1.
</td></tr></table>
""",
    input_spec="Input one line holding the values in order, each separated by a single space.",
    output_spec="Output the length of the longest streak, a single space, and the value it ends "
                "on.",
    constraints="There are between 1 and 200 values, each between -9999 and 9999, inclusive.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>values</code>, the numbers separated by single
spaces.</li>
<li>The function returns a string, the streak length followed by a space and its final value.</li>
</ul>
""",
    params=[("values", "str")],
    ret="str",
    samples=["1 3 5 4 6 7 8 2", "5", "9 8 7"],
    tests=["1 3 5 4 6 7 8 2", "5", "9 8 7",
           "1 2 3 1 2 3", "1 1 1 1", "-5 -3 -1 0",
           "4 4 5 5 6 6", "10 20 30 40 50", "3 2 1 2 3 4",
           "-9999 9999", "7 7 7 8 9 1 2 3 4", "0 -1 0 -1 0"],
    approach="""
<p>One pass and two counters. Keep the length of the streak currently running, and separately the
best length seen so far together with the value it ended on.</p>

<p>At each position, compare the value with the one before it. If it is strictly larger, the current
streak grows by one; otherwise a new streak starts and the current length resets to 1. Both the
current length and the best have to start at 1 rather than 0, because a single value is already a
streak.</p>

<p>The comparison must be strictly greater. Equal neighbors break the streak, which is what the
statement means by strictly rising, and a test using greater than or equal would report 6 rather than 1
for a list of six equal values.</p>

<p>Update the best only when the current streak is strictly longer. That keeps the earlier of two tied
streaks, which is what the problem asks for. Record the value at the same moment you record the length,
since the value you want is the one at the position you are standing on, not the largest in the
list.</p>
""",
    sol=dict(
        python="""
nums = [int(t) for t in values.split()]
best = 1
run = 1
ending = nums[0]
for i in range(1, len(nums)):
    run = run + 1 if nums[i] > nums[i - 1] else 1
    if run > best:
        best = run
        ending = nums[i]
return str(best) + " " + str(ending)
""",
        java="""
String[] parts = values.trim().split("\\\\s+");
int[] nums = new int[parts.length];
for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
int best = 1, run = 1, ending = nums[0];
for (int i = 1; i < nums.length; i++) {
    run = nums[i] > nums[i - 1] ? run + 1 : 1;
    if (run > best) { best = run; ending = nums[i]; }
}
return best + " " + ending;
""",
        cpp="""
vector<int> nums;
int x;
istringstream is(values);
while (is >> x) nums.push_back(x);
int best = 1, run = 1, ending = nums[0];
for (size_t i = 1; i < nums.size(); i++) {
    run = nums[i] > nums[i - 1] ? run + 1 : 1;
    if (run > best) { best = run; ending = (int) nums[i]; }
}
return to_string(best) + " " + to_string(ending);
""",
    ),
),

# ---------------------------------------------------------------- Junior 9
dict(
    id="magic-square",
    fname="magicSum",
    division="Junior",
    contest=3,
    title="Magic Square",
    blurb="Check whether every row, column, and diagonal of a square grid adds to the same total.",
    statement="""
<p>A square grid of integers is given one row at a time. It is magic when every row, every
column, and both of the two long diagonals add up to the same total.</p>

<p>Report that total if the grid is magic. Otherwise report NO. A one by one grid is always magic,
since its single value is at once its only row, its only column, and both diagonals.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>2 7 6;9 5 1;4 3 8</td></tr>
<tr><th>Output</th><td>15</td></tr>
<tr><th>Explanation</th><td>
The rows add to 15, 15, and 15.<br>
The columns add to 15, 15, and 15.<br>
The diagonals 2 5 8 and 6 5 4 both add to 15 as well.
</td></tr></table>
""",
    input_spec="Input one line holding the rows in order, separated by semicolons. Within a row "
               "the values are separated by single spaces.",
    output_spec="Output the common total, or NO if the grid is not magic.",
    constraints="The grid is between 1 by 1 and 12 by 12. Every value is between -999 and 999, "
                "inclusive.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>grid</code>, the rows separated by
semicolons.</li>
<li>The function returns a string, the common total or the word NO.</li>
</ul>
""",
    params=[("grid", "str")],
    ret="str",
    samples=["2 7 6;9 5 1;4 3 8", "1 2;3 4", "5"],
    tests=["2 7 6;9 5 1;4 3 8", "1 2;3 4", "5",
           "1 1;1 1", "16 3 2 13;5 10 11 8;9 6 7 12;4 15 14 1", "2 7 6;9 5 1;4 8 3",
           "0", "1 0;0 1", "8 1 6;3 5 7;4 9 2",
           "-1 -1;-1 -1", "3 3 3;3 3 3;3 3 3", "1 2 3;4 5 6;7 8 9"],
    approach="""
<p>Parse first, check afterwards. Split the line at the semicolons to get the rows, then split
each row at the spaces to get its values, and store the whole thing in a two dimensional array. Trying
to check while parsing makes the column and diagonal work far harder than it needs to be.</p>

<p>Take the target total from the first row and then test everything against it. There are four
separate things to check and it is easy to stop after two: every row, every column, the diagonal
running from the top left to the bottom right, and the diagonal running from the top right to the
bottom left.</p>

<p>The columns need the subscripts the other way round from the rows. Where a row sum fixes the row and
runs the column subscript, a column sum fixes the column and runs the row subscript, so the loops look
almost identical and the two subscripts are swapped inside.</p>

<p>The two diagonals are the cells where the subscripts agree and the cells where they add to one less
than the size of the grid. Both are single loops. The grid 1 0;0 1 has row and column totals of 1, but diagonal totals of 2 and 0. It shows why neither diagonal check can be skipped.</p>
""",
    sol=dict(
        python="""
rows = [[int(t) for t in line.split()] for line in grid.split(";")]
n = len(rows)
target = sum(rows[0])
for r in rows:
    if sum(r) != target:
        return "NO"
for c in range(n):
    if sum(rows[r][c] for r in range(n)) != target:
        return "NO"
if sum(rows[i][i] for i in range(n)) != target:
    return "NO"
if sum(rows[i][n - 1 - i] for i in range(n)) != target:
    return "NO"
return str(target)
""",
        java="""
String[] lines = grid.split(";");
int n = lines.length;
int[][] a = new int[n][n];
for (int i = 0; i < n; i++) {
    String[] parts = lines[i].trim().split("\\\\s+");
    for (int j = 0; j < n; j++) a[i][j] = Integer.parseInt(parts[j]);
}
int target = 0;
for (int j = 0; j < n; j++) target += a[0][j];
for (int i = 0; i < n; i++) {
    int s = 0;
    for (int j = 0; j < n; j++) s += a[i][j];
    if (s != target) return "NO";
}
for (int j = 0; j < n; j++) {
    int s = 0;
    for (int i = 0; i < n; i++) s += a[i][j];
    if (s != target) return "NO";
}
int d1 = 0, d2 = 0;
for (int i = 0; i < n; i++) { d1 += a[i][i]; d2 += a[i][n - 1 - i]; }
if (d1 != target || d2 != target) return "NO";
return String.valueOf(target);
""",
        cpp="""
vector<vector<int>> a;
string line;
istringstream rowsIn(grid);
while (getline(rowsIn, line, ';')) {
    vector<int> row;
    int x;
    istringstream is(line);
    while (is >> x) row.push_back(x);
    a.push_back(row);
}
int n = (int) a.size();
int target = 0;
for (int j = 0; j < n; j++) target += a[0][j];
for (int i = 0; i < n; i++) {
    int s = 0;
    for (int j = 0; j < n; j++) s += a[i][j];
    if (s != target) return "NO";
}
for (int j = 0; j < n; j++) {
    int s = 0;
    for (int i = 0; i < n; i++) s += a[i][j];
    if (s != target) return "NO";
}
int d1 = 0, d2 = 0;
for (int i = 0; i < n; i++) { d1 += a[i][i]; d2 += a[i][n - 1 - i]; }
if (d1 != target || d2 != target) return "NO";
return to_string(target);
""",
    ),
),

# ---------------------------------------------------------------- Junior 10
dict(
    id="run-length",
    fname="encode",
    division="Junior",
    contest=4,
    title="Run Length",
    blurb="Squash a string into letters and counts, one pair per run.",
    statement="""
<p>A run is a stretch of the same letter repeated. Rewrite a string by replacing each run with
that letter followed by the length of the run, working from left to right.</p>

<p>Every run is written out, including a run of length 1, which becomes the letter followed by the
digit 1.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>AAABBC</td></tr>
<tr><th>Output</th><td>A3B2C1</td></tr>
<tr><th>Explanation</th><td>
Three As become A3.<br>
Two Bs become B2.<br>
One C becomes C1.
</td></tr></table>
""",
    input_spec="Input one line holding the string.",
    output_spec="Output the encoded string.",
    constraints="The string holds between 1 and 200 characters, all of them capital letters from "
                "A through Z.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>text</code>, the string to encode.</li>
<li>The function returns a string, the encoded form.</li>
</ul>
""",
    params=[("text", "str")],
    ret="str",
    samples=["AAABBC", "A", "ZZZZZZZZZZZZ"],
    tests=["AAABBC", "A", "ZZZZZZZZZZZZ",
           "ABCDE", "AABBAABB", "MISSISSIPPI",
           "QQ", "ABABABAB", "WWWWWWWWWWWWWWWWWWWWWWWWW",
           "AAAAAAAAAB", "BAAAAAAAAA", "XYYZZZWWWW"],
    approach="""
<p>Walk the string with an outer index that jumps a whole run at a time. From position i, run a
second index j forward while the character there still matches the one at i. When it stops, the run is
j minus i characters long, so append the letter and that length, then set i to j and continue.</p>

<p>A single index with a running counter works too, but it needs the closing run flushed after the loop
ends, and forgetting that is the usual bug: the last run is written by the code that notices a change,
and at the end of the string there is no change left to notice. The two index version has no such tail
case, since the outer loop only stops when everything has already been written.</p>

<p>The count is written as text, not as a character, so a run of twelve becomes the two characters 1
and 2 rather than anything else. In Java and C++ that means converting the number rather than adding it
to a character, and a run of length 12 in the third sample is there to catch exactly that slip.</p>

<p>Build the answer in a string builder in Java rather than by repeated concatenation. At 200 characters
it makes no practical difference, but it is the habit worth having.</p>
""",
    sol=dict(
        python="""
out = ""
i = 0
while i < len(text):
    j = i
    while j < len(text) and text[j] == text[i]:
        j += 1
    out += text[i] + str(j - i)
    i = j
return out
""",
        java="""
StringBuilder out = new StringBuilder();
int i = 0;
while (i < text.length()) {
    int j = i;
    while (j < text.length() && text.charAt(j) == text.charAt(i)) j++;
    out.append(text.charAt(i)).append(j - i);
    i = j;
}
return out.toString();
""",
        cpp="""
string out;
size_t i = 0;
while (i < text.size()) {
    size_t j = i;
    while (j < text.size() && text[j] == text[i]) j++;
    out += text[i];
    out += to_string(j - i);
    i = j;
}
return out;
""",
    ),
),

# ---------------------------------------------------------------- Junior 11
dict(
    id="acronym-maker",
    fname="acronym",
    division="Junior",
    contest=4,
    title="Acronym Maker",
    blurb="Build an acronym from a phrase, keeping only the words that carry weight.",
    statement="""
<p>An acronym is made from the first letter of each significant word in a phrase, written in
capitals. A word counts as significant when it holds 4 or more letters, which is what keeps short
joining words like the, of, and and out of the result.</p>

<p>Report the acronym. If no word in the phrase is long enough, report NONE instead.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>american computer science league</td></tr>
<tr><th>Output</th><td>ACSL</td></tr>
<tr><th>Explanation</th><td>
All four words hold 4 or more letters, so all four contribute.<br>
Their first letters are a, c, s, and l, written in capitals.
</td></tr></table>
""",
    input_spec="Input one line holding the phrase, with words separated by single spaces.",
    output_spec="Output the acronym in capitals, or NONE if no word qualifies.",
    constraints="The phrase holds between 1 and 30 words, each between 1 and 20 lowercase "
                "letters.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>phrase</code>, the phrase to abbreviate.</li>
<li>The function returns a string, the acronym or the word NONE.</li>
</ul>
""",
    params=[("phrase", "str")],
    ret="str",
    samples=["american computer science league", "the cat sat", "portable network graphics"],
    tests=["american computer science league", "the cat sat", "portable network graphics",
           "a", "self contained underwater breathing apparatus", "read the fine manual",
           "light amplification by stimulated emission of radiation", "abcd", "abc",
           "one two three four five", "structured query language", "as soon as possible"],
    approach="""
<p>Split the phrase at the spaces, then walk the words and keep the first letter of every word
whose length is 4 or more. Turning that letter into a capital is the last step and can be done as you
go or once at the end; either is fine as long as it happens.</p>

<p>The length test is 4 or more, not more than 4. A four letter word qualifies, and one of the tests is
the single word abcd for exactly that reason, with abc beside it as the case that does not.</p>

<p>The NONE case is decided after the whole phrase has been read, not while reading it, so build the
acronym first and then ask whether it came out empty. A phrase of nothing but short words is the only
way to reach it.</p>

<p>In Java, uppercasing a single character is easiest with Character.toUpperCase, and in C++ with the
toupper function, remembering that it returns an integer that has to be turned back into a character
before it is appended.</p>
""",
    sol=dict(
        python="""
out = ""
for word in phrase.split():
    if len(word) >= 4:
        out += word[0].upper()
return out if out else "NONE"
""",
        java="""
StringBuilder out = new StringBuilder();
for (String word : phrase.trim().split("\\\\s+")) {
    if (word.length() >= 4) out.append(Character.toUpperCase(word.charAt(0)));
}
return out.length() > 0 ? out.toString() : "NONE";
""",
        cpp="""
string out, word;
istringstream is(phrase);
while (is >> word) {
    if (word.size() >= 4) out += (char) toupper(word[0]);
}
return out.empty() ? string("NONE") : out;
""",
    ),
),

# ---------------------------------------------------------------- Junior 12
dict(
    id="word-search-row",
    fname="countWord",
    division="Junior",
    contest=4,
    title="Word Search Row",
    blurb="Count how often a word sits inside a row of letters, overlaps included.",
    statement="""
<p>A single row of a word search puzzle is a run of capital letters. Count how many times a given
word appears inside it, reading left to right.</p>

<p>Two appearances may overlap and both are counted. In AAAA the word AA appears three times, once
starting at each of the first three positions.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>AAAA<br>AA</td></tr>
<tr><th>Output</th><td>3</td></tr>
<tr><th>Explanation</th><td>
AA appears starting at position 0.<br>
AA appears starting at position 1.<br>
AA appears starting at position 2.<br>
Positions are counted from 0, and the three appearances overlap.
</td></tr></table>
""",
    input_spec="Input the row of letters on the first line and the word to look for on the second "
               "line.",
    output_spec="Output an integer, the number of appearances.",
    constraints="The row holds between 1 and 200 capital letters. The word holds between 1 and 20 "
                "capital letters. The word may be longer than the row.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>row</code>, the row of letters, and a string,
<code>word</code>, the word to look for.</li>
<li>The function returns an integer, the number of appearances.</li>
</ul>
""",
    params=[("row", "str"), ("word", "str")],
    ret="int",
    samples=[["AAAA", "AA"], ["BANANA", "ANA"], ["ABC", "D"]],
    tests=[["AAAA", "AA"], ["BANANA", "ANA"], ["ABC", "D"],
           ["XYZXYZXYZ", "XYZ"], ["AB", "ABCDE"], ["MISSISSIPPI", "ISSI"],
           ["AAAAAAAAAA", "A"], ["AAAAAAAAAA", "AAAAAAAAAA"], ["ABABABAB", "ABAB"],
           ["QQQQQ", "QQQ"], ["ACSLACSL", "ACSL"], ["ZZZZZZZZZZZZZZZZZZZ", "ZZZZZZZZZZZZZZZZZZZZ"]],
    approach="""
<p>Try every starting position and compare. The word can begin anywhere from position 0 up to the
row's length minus the word's length, and at each of those positions you check whether the next few
characters match the word.</p>

<p>That upper bound is the whole problem. Going further would read past the end of the row, and stopping
short would miss an appearance that finishes exactly at the last character. Written as a loop from 0
while i plus the word's length is at most the row's length, it handles both ends correctly, and it also
handles a word longer than the row without any special case: the loop simply never runs and the answer
is 0.</p>

<p>Because you check every position rather than jumping past a match, overlapping appearances are
counted automatically. Skipping forward by the word's length after a match would count AA in AAAA twice
rather than three times, which is the mistake this problem is built around.</p>

<p>In Python the comparison is a slice against the word. In Java, substring does the same job, and in
C++ so does compare or substr. All three are one line, and none of them needs a character by character
inner loop unless you want to write one.</p>
""",
    sol=dict(
        python="""
count = 0
n = len(word)
for i in range(len(row) - n + 1):
    if row[i:i + n] == word:
        count += 1
return count
""",
        java="""
int count = 0, n = word.length();
for (int i = 0; i + n <= row.length(); i++) {
    if (row.substring(i, i + n).equals(word)) count++;
}
return count;
""",
        cpp="""
int count = 0;
size_t n = word.size();
for (size_t i = 0; i + n <= row.size(); i++) {
    if (row.compare(i, n, word) == 0) count++;
}
return count;
""",
    ),
),

]
