# -*- coding: utf-8 -*-
"""ACSL style programming problems, part 4. Junior, game and scenario simulations."""

PROBLEMS = [

# ---------------------------------------------------------------- Junior
dict(
    id="bowling-night",
    fname="scoreGame",
    division="Junior",
    contest=1,
    title="Bowling Night",
    blurb="Score ten frames, where a strike is worth whatever you knock down next.",
    statement="""
<p>The Tuesday league at Sunset Lanes still keeps score on paper, and nobody can agree on the
arithmetic. Settle it.</p>

<p>A game is ten frames. In each frame you get two rolls to knock down ten pins, and the frame is
worth the pins you knocked down, except in two cases.</p>

<p>Knock all ten down with the first roll and it is a <b>strike</b>. The frame ends immediately
and it is worth 10 plus whatever you knock down on your next two rolls. Knock all ten down using
both rolls and it is a <b>spare</b>, worth 10 plus whatever you knock down on your next one
roll.</p>

<p>The tenth frame is different because there are no later frames to borrow from. Roll a strike
or a spare there and you get extra rolls, up to three rolls in the frame, and they count only
once each toward the tenth frame total.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>10 7 3 9 0 10 0 8 8 2 0 6 10 10 10 8 1</td></tr>
<tr><th>Output</th><td>167</td></tr>
<tr><th>Explanation</th><td>
Frame 1 is a strike, worth 10 + 7 + 3 = 20.<br>
Frame 2 is a spare, worth 10 + 9 = 19.<br>
Frame 3 is 9 + 0 = 9.<br>
Frame 4 is a strike, worth 10 + 0 + 8 = 18.<br>
Frame 5 is 0 + 8 = 8.<br>
Frame 6 is a spare, worth 10 + 0 = 10.<br>
Frame 7 is 0 + 6 = 6.<br>
Frame 8 is a strike, worth 10 + 10 + 10 = 30.<br>
Frame 9 is a strike, worth 10 + 10 + 8 = 28.<br>
Frame 10 is a strike plus the two extra rolls, worth 10 + 8 + 1 = 19.<br>
Those add to 167.
</td></tr></table>
""",
    input_spec="Input a string of roll results, each separated by a single space. Each number is "
               "the pins knocked down by that roll.",
    output_spec="Output an integer, the total score for the game.",
    constraints="The string always describes a complete legal game of exactly ten frames, so it "
                "holds between 11 and 21 rolls.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>rolls</code>, holding the pins knocked down by
each roll in order, separated by single spaces.</li>
<li>The function returns an integer, the total score.</li>
</ul>
""",
    params=[("rolls", "str")],
    ret="int",
    samples=["10 7 3 9 0 10 0 8 8 2 0 6 10 10 10 8 1",
             "10 10 10 10 10 10 10 10 10 10 10 10",
             "9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0"],
    tests=["10 7 3 9 0 10 0 8 8 2 0 6 10 10 10 8 1",
           "10 10 10 10 10 10 10 10 10 10 10 10",
           "9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0",
           "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
           "5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5",
           "10 10 10 10 10 10 10 10 10 9 1 10",
           "1 9 1 9 1 9 1 9 1 9 1 9 1 9 1 9 1 9 1 9 1",
           "10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10",
           "8 1 7 2 6 3 5 4 4 5 3 6 2 7 1 8 0 9 9 0",
           "10 10 0 0 10 10 0 0 10 10 0 0 10 10 0",
           "0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 10",
           "10 9 1 10 9 1 10 9 1 10 9 1 10 9 1 10"],
    approach="""
<p>Do not try to walk the string frame by frame, deciding as you go how many rolls
each frame should consume. Walk it roll by roll with an index and let a frame counter do the
work.</p>

<p>Keep an index into the list of rolls and loop exactly ten times, once per frame. On each pass, look
at the roll sitting at the index. If it is 10 you have a strike, so add 10 plus the next two rolls and
advance the index by one. Otherwise look at the roll after it as well, and if the pair sums to 10 you
have a spare, so add 10 plus the roll after the pair and advance by two. Failing both, add the pair
and advance by two.</p>

<p>What makes this worth doing is that it handles the tenth frame with no special case whatsoever. The
bonus rolls are already sitting in the list, so a tenth frame strike reads its two bonus rolls exactly
as the first frame would, and the loop simply stops after ten frames without ever scoring those bonus
rolls as frames in their own right.</p>

<p>People lose this problem by writing a dedicated branch for the tenth frame and then double counting
the bonus rolls. If a perfect game comes out as 330 rather than 300, that is the bug you have.</p>

<p>The other classic error is looking at the next two <i>frames</i> after a strike rather than the next
two <i>rolls</i>. Three strikes in a row means the first borrows from two later strikes, which are
single rolls sitting in different frames. Index by rolls throughout and the problem never arises.</p>
""",
    sol=dict(
        python="""
r = [int(x) for x in rolls.split()]
total = 0
i = 0
for frame in range(10):
    if r[i] == 10:
        total += 10 + r[i + 1] + r[i + 2]
        i += 1
    elif r[i] + r[i + 1] == 10:
        total += 10 + r[i + 2]
        i += 2
    else:
        total += r[i] + r[i + 1]
        i += 2
return total
""",
        java="""
String[] tok = rolls.trim().split("\\\\s+");
int[] r = new int[tok.length];
for (int j = 0; j < tok.length; j++) r[j] = Integer.parseInt(tok[j]);
int total = 0, i = 0;
for (int frame = 0; frame < 10; frame++) {
    if (r[i] == 10) {
        total += 10 + r[i + 1] + r[i + 2];
        i += 1;
    } else if (r[i] + r[i + 1] == 10) {
        total += 10 + r[i + 2];
        i += 2;
    } else {
        total += r[i] + r[i + 1];
        i += 2;
    }
}
return total;
""",
        cpp="""
vector<int> r;
int v;
istringstream is(rolls);
while (is >> v) r.push_back(v);
int total = 0, i = 0;
for (int frame = 0; frame < 10; frame++) {
    if (r[i] == 10) {
        total += 10 + r[i + 1] + r[i + 2];
        i += 1;
    } else if (r[i] + r[i + 1] == 10) {
        total += 10 + r[i + 2];
        i += 2;
    } else {
        total += r[i] + r[i + 1];
        i += 2;
    }
}
return total;
""",
    ),
),

dict(
    id="hot-potato",
    fname="lastPlayer",
    division="Junior",
    contest=2,
    title="Hot Potato",
    blurb="Kids in a circle, a rhyme of a fixed length, and one survivor.",
    statement="""
<p>N kids sit in a circle, numbered 1 through N clockwise. Kid number 1 starts holding the
potato.</p>

<p>The counselor sings a rhyme that is K words long. The potato passes one kid clockwise on every
word, so the kid holding it on the last word of the rhyme is out and leaves the circle. Note that
the kid holding the potato when the rhyme starts is counted as word one, so with a rhyme of 1 word
the holder is out immediately.</p>

<p>The rhyme starts again with the kid clockwise from whoever just left, and it keeps going until
one kid is left. Report that kid's original number.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>7<br>3</td></tr>
<tr><th>Output</th><td>4</td></tr>
<tr><th>Explanation</th><td>
Counting 1, 2, 3 from kid 1 puts the potato on kid 3, who is out.<br>
Starting again at kid 4, the count lands on kid 6, who is out.<br>
Starting at kid 7, the count lands on kid 2, who is out.<br>
Starting at kid 4, the count lands on kid 7, who is out.<br>
Starting at kid 1, the count lands on kid 5, who is out.<br>
Starting at kid 1, the count lands on kid 1, who is out.<br>
Kid 4 is the only one left.
</td></tr></table>
""",
    input_spec="Input the number of kids on the first line and the number of words in the rhyme "
               "on the second line.",
    output_spec="Output an integer, the original number of the last kid remaining.",
    constraints="There are between 1 and 5000 kids and the rhyme is between 1 and 5000 words.",
    task="""
<ul>
<li>The function has 2 parameters: an integer, <code>n</code>, the number of kids in the circle,
and an integer, <code>k</code>, the number of words in the rhyme.</li>
<li>The function returns an integer, the number of the surviving kid.</li>
</ul>
""",
    params=[("n", "int"), ("k", "int")],
    ret="int",
    samples=[["7", "3"], ["1", "5"], ["5", "1"]],
    tests=[["7", "3"], ["1", "5"], ["5", "1"],
           ["10", "2"], ["6", "6"], ["41", "3"],
           ["100", "7"], ["2", "1000"], ["13", "13"],
           ["1000", "2"], ["5000", "1"], ["3125", "5"]],
    approach="""
<p>Simulating with a list works and is the version to write first. Keep the children
in a list along with an index for whoever holds the potato, and each round move that index forward by
K minus 1 positions, wrapping with a modulo, then remove that child. After the removal the index is
already pointing at the next child, so no adjustment is needed except when you removed the last
element, where the modulo brings you back to the front.</p>

<p>That minus 1 is where this goes wrong. The child holding the potato counts as word one, so a rhyme
of three words moves the potato only two places. Get it backwards and every single answer is off.</p>

<p>Removing from the middle of a list is slow, so at 5000 children the simulation performs something
like 12 million element shifts. It still finishes, but there is a far better way available.</p>

<p>Think about it backwards. With one child, the survivor sits at position 0. If you know the surviving
position for a circle of size m minus 1, then adding one more child shifts that answer by K places, so
the position for size m is (previous + K) modulo m. Looping m from 2 up to N gives the answer in N
steps with no list at all, and you add 1 at the end because the children are numbered from 1 while the
positions are numbered from 0.</p>

<p>Check the edges. A single child survives without the rhyme ever finishing, and a rhyme of one word
eliminates children in the order 1, 2, 3, and so on, leaving child N.</p>
""",
    sol=dict(
        python="""
pos = 0
for m in range(2, n + 1):
    pos = (pos + k) % m
return pos + 1
""",
        java="""
int pos = 0;
for (int m = 2; m <= n; m++) pos = (pos + k) % m;
return pos + 1;
""",
        cpp="""
int pos = 0;
for (int m = 2; m <= n; m++) pos = (pos + k) % m;
return pos + 1;
""",
    ),
),

dict(
    id="salvo",
    fname="shotReport",
    division="Junior",
    contest=3,
    title="Salvo",
    blurb="Call the shots on a hidden fleet and report hit, miss, or sunk.",
    statement="""
<p>Two players set up fleets on an 8 by 8 grid. Columns are lettered A through H from the left
and rows are numbered 1 through 8 from the top, so B3 is the square in column B, row 3.</p>

<p>Every ship lies in a straight line, either along one row or down one column, and is written as
its two end squares joined by a hyphen. The ship A1-A3 fills A1, A2, and A3. The ship C5-F5 fills
C5, D5, E5, and F5. Ships never overlap.</p>

<p>Your opponent calls a sequence of squares. Report what they hear back after each one:</p>
<ul>
<li><b>H</b> if the shot hits a part of a ship that was still undamaged.</li>
<li><b>S</b> if that shot was the one that finished off a ship, meaning every square of that ship
has now been hit.</li>
<li><b>M</b> for anything else, including a shot at open water and a shot at a square that was
already hit. A wasted shot is still a miss.</li>
</ul>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>A1-A3,C5-F5<br>A1 B1 A2 A1 A3 C5 D5 E5 F5</td></tr>
<tr><th>Output</th><td>HMHMSHHHS</td></tr>
<tr><th>Explanation</th><td>
A1 hits the first ship, so H.<br>
B1 is open water, so M.<br>
A2 hits the first ship again, so H.<br>
A1 was already hit, so that shot is wasted and reads M.<br>
A3 is the last undamaged square of the first ship, so S.<br>
C5, D5, and E5 each hit the second ship, so H, H, H.<br>
F5 finishes the second ship, so S.
</td></tr></table>
""",
    input_spec="Input the fleet on the first line as ships separated by commas, each written as "
               "two end squares joined by a hyphen. On the second line input the shots, each "
               "separated by a single space.",
    output_spec="Output one letter per shot, in order, with no spaces between them.",
    constraints="The grid is 8 by 8. There are between 1 and 5 ships, no ship overlaps another, "
                "and between 1 and 64 shots are fired.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>fleet</code>, holding the ships separated by
commas, and a string, <code>shots</code>, holding the called squares separated by single
spaces.</li>
<li>The function returns a string of letters, one per shot.</li>
</ul>
""",
    params=[("fleet", "str"), ("shots", "str")],
    ret="str",
    samples=[["A1-A3,C5-F5", "A1 B1 A2 A1 A3 C5 D5 E5 F5"],
             ["D4-D4", "A1 D4 D4"],
             ["A1-H1", "A1 B1 C1 D1 E1 F1 G1 H1"]],
    tests=[["A1-A3,C5-F5", "A1 B1 A2 A1 A3 C5 D5 E5 F5"],
           ["D4-D4", "A1 D4 D4"],
           ["A1-H1", "A1 B1 C1 D1 E1 F1 G1 H1"],
           ["B2-B5,D1-G1,H8-H8", "H8 B2 B3 B4 B5 D1 E1 F1 G1"],
           ["A1-A8", "A8 A7 A6 A5 A4 A3 A2 A1"],
           ["C3-E3,C6-E6", "D3 D6 C3 C6 E6 E3"],
           ["A1-B1,C1-D1,E1-F1,G1-H1", "A1 B1 C1 D1 E1 F1 G1 H1"],
           ["F2-F7", "F2 F3 F4 F5 F6 A1 B2 C3 F7"],
           ["A4-D4", "E4 D4 C4 B4 A4 A4 A4"],
           ["H1-H4,A5-A8", "H1 A5 H2 A6 H3 A7 H4 A8"],
           ["B7-E7", "B7 B7 C7 C7 D7 D7 E7 E7"],
           ["A1-A2,C3-C4,E5-E6,G7-G8", "A1 C3 E5 G7 A2 C4 E6 G8"]],
    approach="""
<p>Two halves again: turn the fleet into something you can look up by square, then walk
the shots.</p>

<p>Give every ship an index and build a table mapping square name to ship index. Expanding a ship is
easier than it looks, because one of the two coordinates is always fixed. Compare the two end squares:
matching letters mean the ship runs down a column and you loop over the digits between them, while
matching digits mean it runs along a row and you loop over the letters. Sort the two ends first so
that the loop counts upward either way, since D4-A4 describes the same ship as A4-D4.</p>

<p>Alongside that, record for each ship how many of its squares are still undamaged. That number is
what turns an H into an S.</p>

<p>The shots are then a single pass. Look the square up. If it belongs to no ship, write M. If it
belongs to a ship but has already been hit, write M as well. Otherwise mark the square as hit,
subtract one from that ship's remaining count, and write S if the count has reached zero or H if it
has not.</p>

<p>That already hit rule carries the whole difficulty. Without a set recording the squares you have
fired at, a second shot at A1 reads as a fresh hit and can even sink a ship a second time, so track
the squares and not merely the ships.</p>

<p>Converting a square name to a pair of numbers is subtraction, with the column being the letter minus
A and the row the digit minus the character zero. You do not strictly need the numbers for the lookup,
since the square name works as a key, but you do need them to expand the ships.</p>
""",
    sol=dict(
        python="""
owner = {}
left = []
for part in fleet.split(","):
    a, b = part.split("-")
    idx = len(left)
    squares = []
    if a[0] == b[0]:
        lo, hi = sorted([int(a[1]), int(b[1])])
        for r in range(lo, hi + 1):
            squares.append(a[0] + str(r))
    else:
        lo, hi = sorted([ord(a[0]), ord(b[0])])
        for c in range(lo, hi + 1):
            squares.append(chr(c) + a[1])
    for sq in squares:
        owner[sq] = idx
    left.append(len(squares))
hit = set()
out = ""
for sq in shots.split():
    if sq not in owner or sq in hit:
        out += "M"
    else:
        hit.add(sq)
        left[owner[sq]] -= 1
        out += "S" if left[owner[sq]] == 0 else "H"
return out
""",
        java="""
Map<String, Integer> owner = new HashMap<>();
List<Integer> left = new ArrayList<>();
for (String part : fleet.split(",")) {
    String[] ends = part.split("-");
    String a = ends[0], b = ends[1];
    List<String> squares = new ArrayList<>();
    if (a.charAt(0) == b.charAt(0)) {
        int lo = Math.min(a.charAt(1), b.charAt(1)), hi = Math.max(a.charAt(1), b.charAt(1));
        for (int r = lo; r <= hi; r++) squares.add("" + a.charAt(0) + (char) r);
    } else {
        int lo = Math.min(a.charAt(0), b.charAt(0)), hi = Math.max(a.charAt(0), b.charAt(0));
        for (int c = lo; c <= hi; c++) squares.add("" + (char) c + a.charAt(1));
    }
    for (String sq : squares) owner.put(sq, left.size());
    left.add(squares.size());
}
Set<String> hit = new HashSet<>();
StringBuilder out = new StringBuilder();
for (String sq : shots.trim().split("\\s+")) {
    if (!owner.containsKey(sq) || hit.contains(sq)) {
        out.append('M');
    } else {
        hit.add(sq);
        int i = owner.get(sq);
        left.set(i, left.get(i) - 1);
        out.append(left.get(i) == 0 ? 'S' : 'H');
    }
}
return out.toString();
""",
        cpp="""
map<string, int> owner;
vector<int> left_;
string part;
istringstream fs(fleet);
while (getline(fs, part, ',')) {
    size_t dash = part.find('-');
    string a = part.substr(0, dash), b = part.substr(dash + 1);
    vector<string> squares;
    if (a[0] == b[0]) {
        int lo = min(a[1], b[1]), hi = max(a[1], b[1]);
        for (int r = lo; r <= hi; r++) squares.push_back(string(1, a[0]) + char(r));
    } else {
        int lo = min(a[0], b[0]), hi = max(a[0], b[0]);
        for (int c = lo; c <= hi; c++) squares.push_back(string(1, char(c)) + a[1]);
    }
    for (const string &sq : squares) owner[sq] = (int) left_.size();
    left_.push_back((int) squares.size());
}
set<string> hit;
string out, sq;
istringstream ss(shots);
while (ss >> sq) {
    if (!owner.count(sq) || hit.count(sq)) {
        out += 'M';
    } else {
        hit.insert(sq);
        int i = owner[sq];
        left_[i]--;
        out += (left_[i] == 0 ? 'S' : 'H');
    }
}
return out;
""",
    ),
),

dict(
    id="chutes-race",
    fname="raceResult",
    division="Junior",
    contest=4,
    title="The Race",
    blurb="Two tokens, one shared list of rolls, and a board full of ladders and slides.",
    statement="""
<p>The board is 100 squares in a line, numbered 1 through 100. Two players, A and B, each start
off the board on square 0. A goes first, then B, then A again, and so on, taking rolls from a
single shared list in order.</p>

<p>A roll moves that player's token forward by that many squares, with three rules on top.</p>

<p>If a roll would carry a token past square 100, the token does not move at all and the turn is
wasted. A player has to land on 100 exactly.</p>

<p>Some squares are the foot of a ladder or the top of a slide. Landing on one moves that token
immediately to the square at the other end. This happens only once per landing, so if the square
you are sent to is itself the start of another ladder or slide, you stay there and ignore it. The
two tokens do not interact at all and may sit on the same square.</p>

<p>The first player to reach square 100 wins immediately, and every remaining roll is ignored. If
the rolls run out with nobody on 100, the race is unfinished.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>4>14,9>31,28>84,16>6,48>26<br>4 4 6 6 5 5 2 2</td></tr>
<tr><th>Output</th><td>NOBODY 27 27</td></tr>
<tr><th>Explanation</th><td>
Roll 1 goes to A, who lands on 4 and climbs the ladder to 14.<br>
Roll 2 goes to B, who lands on 4 and climbs to 14 as well.<br>
Roll 3 is A again, moving to 20. Roll 4 is B, moving to 20.<br>
Rolls 5 and 6 take each of them to 25, and rolls 7 and 8 take each to 27.<br>
Neither reaches 100 and the rolls run out, so the race is unfinished and both squares are
reported. Both tokens finish on 27.
</td></tr></table>
""",
    input_spec="Input the ladders and slides on the first line, each written as the square you "
               "land on, a greater-than sign, and the square you are sent to, separated by "
               "commas. On the second line input the shared list of rolls, each separated by a "
               "single space. The first roll belongs to A.",
    output_spec="If a player reaches square 100, output that player's letter, a single space, and "
                "the number of the roll that did it, counting the first roll in the list as roll "
                "1. Otherwise output NOBODY, then A's final square, then B's final square, "
                "separated by single spaces.",
    constraints="Squares run from 1 to 100. There are between 1 and 20 ladders and slides, no two "
                "start on the same square, and none starts on square 100. There are between 1 "
                "and 300 rolls, each from 1 to 6.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>jumps</code>, holding the ladders and slides
separated by commas, and a string, <code>rolls</code>, holding the shared rolls separated by
single spaces.</li>
<li>The function returns a string, either the winner and the roll number, or NOBODY and the two
final squares.</li>
</ul>
""",
    params=[("jumps", "str"), ("rolls", "str")],
    ret="str",
    samples=[["4>14,9>31,28>84,16>6,48>26", "4 4 6 6 5 5 2 2"],
             ["1>99", "1 1 1"],
             ["50>93,60>20", "6 1 6 1 6 1 6 1 6 1 6 1 6 1 6 1 6 1"]],
    tests=[["4>14,9>31,28>84,16>6,48>26", "4 4 6 6 5 5 2 2"],
           ["1>99", "1 1 1"],
           ["50>93,60>20", "6 1 6 1 6 1 6 1 6 1 6 1 6 1 6 1 6 1"],
           ["3>21,21>42", "3 3 1 1 1 1"],
           ["98>2", "6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 4 4"],
           ["2>99,3>98", "2 3"],
           ["99>1,97>5", "6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 3 3 1 1"],
           ["10>90,90>10", "4 5 6 6 6 6"],
           ["16>6,47>26,49>11,56>53,62>19,64>60,87>24,93>73,95>75",
            "4 5 6 3 2 5 6 1 4 6 2 3 5 6 4 2 6 1 3 5 6 4 2 6 5 3 6 2 4 1"],
           ["5>25,25>45,45>65,65>85", "5 5 6 6 6 6 6 6"],
           ["1>2", "1"],
           ["70>100", "6 6 6 6 6 6 6 6 6 6 6 6 4 4 6 6"]],
    approach="""
<p>Everything the one player version needed is still here, with two positions
instead of one and a rule for whose turn it is.</p>

<p>Keep the two squares in a two element array rather than as separate variables, because then the
player taking roll number i, counting from 0, is simply <code>i % 2</code> and you index the array with
it. Two variables and an if statement work too, but that doubles every line inside the loop and doubles
the chances of updating the wrong one.</p>

<p>Build the jump lookup exactly as before, splitting on the comma and then on the greater-than
sign.</p>

<p>The three board rules are unchanged and still carry most of the marks. Overshooting wastes the turn
rather than clamping, so a token on 97 rolling a 6 stays on 97. A jump happens once and is never
chained, so a ladder that lands you on the foot of another ladder leaves you exactly where it put you.
And reaching 100 ends the race immediately.</p>

<p>The new trap is the roll number. The output asks for the position of the winning roll within the
shared list, counting from 1, rather than the number of turns that player personally took, so a win on
A's fifth turn is roll 9 and not roll 5. Break out of the loop the moment a token reaches 100 and
report the index you were on, converted to one based.</p>

<p>When the rolls run out with nobody home, report both squares in player order with A first, whatever
their sizes. A slide can leave a player behind where they started, so do not assume A's square is the
larger or that either token only ever moves forward.</p>
""",
    sol=dict(
        python="""
dest = {}
for part in jumps.split(","):
    a, b = part.split(">")
    dest[int(a)] = int(b)
pos = [0, 0]
tokens = rolls.split()
for i, tok in enumerate(tokens):
    who = i % 2
    step = int(tok)
    if pos[who] + step <= 100:
        pos[who] += step
        if pos[who] in dest:
            pos[who] = dest[pos[who]]
    if pos[who] == 100:
        return ("A" if who == 0 else "B") + " " + str(i + 1)
return "NOBODY " + str(pos[0]) + " " + str(pos[1])
""",
        java="""
Map<Integer, Integer> dest = new HashMap<>();
for (String part : jumps.split(",")) {
    String[] ab = part.split(">");
    dest.put(Integer.parseInt(ab[0]), Integer.parseInt(ab[1]));
}
int[] pos = new int[2];
String[] tokens = rolls.trim().split("\s+");
for (int i = 0; i < tokens.length; i++) {
    int who = i % 2;
    int step = Integer.parseInt(tokens[i]);
    if (pos[who] + step <= 100) {
        pos[who] += step;
        if (dest.containsKey(pos[who])) pos[who] = dest.get(pos[who]);
    }
    if (pos[who] == 100) return (who == 0 ? "A" : "B") + " " + (i + 1);
}
return "NOBODY " + pos[0] + " " + pos[1];
""",
        cpp="""
map<int, int> dest;
string part;
istringstream js(jumps);
while (getline(js, part, ',')) {
    size_t gt = part.find('>');
    dest[stoi(part.substr(0, gt))] = stoi(part.substr(gt + 1));
}
vector<int> pos(2, 0);
vector<int> tokens;
int step;
istringstream rs(rolls);
while (rs >> step) tokens.push_back(step);
for (size_t i = 0; i < tokens.size(); i++) {
    int who = (int) (i % 2);
    if (pos[who] + tokens[i] <= 100) {
        pos[who] += tokens[i];
        if (dest.count(pos[who])) pos[who] = dest[pos[who]];
    }
    if (pos[who] == 100) return string(who == 0 ? "A" : "B") + " " + to_string(i + 1);
}
return "NOBODY " + to_string(pos[0]) + " " + to_string(pos[1]);
""",
    ),
),

]
