# -*- coding: utf-8 -*-
"""ACSL style programming problems, part 6. Senior, heavier rule systems."""

PROBLEMS = [

dict(
    id="mancala-move",
    fname="playMove",
    division="Senior",
    contest=1,
    title="MANCALA MOVE",
    blurb="Sow one handful of stones around the board and work out what it captures.",
    statement="""
<p>A mancala board is fourteen hollows in a ring. Numbering them 0 through 13 counterclockwise,
hollows 0 through 5 are your six pits, hollow 6 is your store, hollows 7 through 12 are your
opponent's six pits, and hollow 13 is your opponent's store. The pit opposite your pit
<code>i</code> is hollow <code>12 - i</code>, so pit 0 faces hollow 12 and pit 5 faces hollow
7.</p>

<p>You take every stone out of one of your pits and sow them, dropping one stone into each hollow
in turn as you travel counterclockwise, wrapping from hollow 13 back to hollow 0. You never drop a
stone into your opponent's store, so hollow 13 is skipped and does not use up a stone.</p>

<p>Where the last stone falls decides what happens next.</p>

<ul>
<li>If it falls in your store, hollow 6, you have earned another turn.</li>
<li>If it falls in one of your own pits that was empty before that stone landed, and the pit
opposite it is not empty, you capture. Take that single stone together with every stone in the
opposite pit and put them all in your store.</li>
<li>Anything else and the move simply ends.</li>
</ul>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>4 4 4 4 4 4 0 4 4 4 4 4 4 0<br>2</td></tr>
<tr><th>Output</th><td>4 4 0 5 5 5 1 4 4 4 4 4 4 0 AGAIN</td></tr>
<tr><th>Explanation</th><td>
Pit 2 holds 4 stones. Lift them out, leaving pit 2 empty, and drop one stone each into hollows 3,
4, 5, and 6.<br>
Hollows 3, 4, and 5 go from 4 to 5, and the store goes from 0 to 1.<br>
The last stone landed in your store, so you get another turn and the board is followed by
AGAIN.
</td></tr></table>
""",
    input_spec="Input the board on the first line as fourteen whole numbers separated by single "
               "spaces, giving the stones in hollows 0 through 13 in order. On the second line "
               "input the number of the pit you are sowing from, which is between 0 and 5.",
    output_spec="Output the fourteen hollows of the resulting board, separated by single spaces. "
                "If the move earned another turn, follow the board with a single space and the "
                "word AGAIN.",
    constraints="The chosen pit always holds at least one stone. There are at most 200 stones on "
                "the board.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>board</code>, holding the fourteen hollow
counts separated by single spaces, and an integer, <code>pit</code>, the pit being sown from.</li>
<li>The function returns a string holding the fourteen hollow counts of the new board, with the
word AGAIN appended when the move earns another turn.</li>
</ul>
""",
    params=[("board", "str"), ("pit", "int")],
    ret="str",
    samples=[["4 4 4 4 4 4 0 4 4 4 4 4 4 0", "2"],
             ["1 0 0 0 0 0 0 0 0 0 0 6 0 0", "0"],
             ["0 0 0 0 0 1 0 4 4 4 4 4 4 0", "5"]],
    tests=[["4 4 4 4 4 4 0 4 4 4 4 4 4 0", "2"],
           ["1 0 0 0 0 0 0 0 0 0 0 6 0 0", "0"],
           ["0 0 0 0 0 1 0 4 4 4 4 4 4 0", "5"],
           ["4 4 4 4 4 4 0 4 4 4 4 4 4 0", "5"],
           ["0 0 0 0 0 9 2 1 1 1 1 1 1 3", "5"],
           ["1 0 0 0 0 0 0 0 0 0 0 0 0 0", "0"],
           ["0 0 3 0 0 0 5 2 2 2 2 2 2 5", "2"],
           ["14 0 0 0 0 0 0 0 0 0 0 0 0 0", "0"],
           ["0 1 0 0 0 0 0 0 0 0 0 7 0 0", "1"],
           ["2 2 2 2 2 2 3 3 3 3 3 3 3 4", "0"],
           ["0 0 0 0 0 20 1 1 1 1 1 1 1 1", "5"],
           ["6 0 0 0 0 0 0 0 0 0 0 0 5 0", "0"]],
    approach="""
<p>The sowing loop is short, but three details inside it decide the answer and all
three are easy to get slightly wrong.</p>

<p>First, empty the chosen pit before you start dropping. If you sow enough stones to travel all the way
round the board, the pit you started from should receive one of them, and it can only do so if it was
set to zero beforehand. The eighth test sows fourteen stones from pit 0 for exactly this reason.</p>

<p>Second, skip hollow 13 without spending a stone on it. The natural way to write that is to advance
the index, check whether it landed on 13 and advance again if so, and only then drop. Writing it the
other way round, spending a stone and discarding it, loses one stone per lap.</p>

<p>Third, remember where the last stone actually landed after any skipping, because every rule below
keys off that hollow. Track it as you go rather than trying to reconstruct it arithmetically
afterwards.</p>

<p>The free turn is then a plain check that the last hollow is 6. The capture needs the pit to have been
empty before the last stone arrived, which means its count is exactly 1 now, and checking the count
after sowing is safer than keeping a snapshot of the board, since a hollow you passed through on an
earlier lap would confuse a snapshot. It also needs the opposite hollow, 12 minus the index, to hold at
least one stone. When both conditions hold, move that single stone together with everything opposite
into your store and zero both hollows.</p>

<p>A capture and a free turn can never occur together, since one requires the last stone in a pit and
the other requires it in the store, so there is no ordering question to resolve between them.</p>
""",
    sol=dict(
        python="""
b = [int(x) for x in board.split()]
stones = b[pit]
b[pit] = 0
i = pit
while stones > 0:
    i = (i + 1) % 14
    if i == 13:
        continue
    b[i] += 1
    stones -= 1
again = (i == 6)
if 0 <= i <= 5 and b[i] == 1 and b[12 - i] > 0:
    b[6] += b[i] + b[12 - i]
    b[i] = 0
    b[12 - i] = 0
out = " ".join(str(x) for x in b)
return out + " AGAIN" if again else out
""",
        java="""
String[] tok = board.trim().split("\\\\s+");
int[] b = new int[14];
for (int j = 0; j < 14; j++) b[j] = Integer.parseInt(tok[j]);
int stones = b[pit];
b[pit] = 0;
int i = pit;
while (stones > 0) {
    i = (i + 1) % 14;
    if (i == 13) continue;
    b[i]++;
    stones--;
}
boolean again = (i == 6);
if (i >= 0 && i <= 5 && b[i] == 1 && b[12 - i] > 0) {
    b[6] += b[i] + b[12 - i];
    b[i] = 0;
    b[12 - i] = 0;
}
StringBuilder out = new StringBuilder();
for (int j = 0; j < 14; j++) { if (j > 0) out.append(' '); out.append(b[j]); }
if (again) out.append(" AGAIN");
return out.toString();
""",
        cpp="""
vector<int> b;
int v;
istringstream is(board);
while (is >> v) b.push_back(v);
int stones = b[pit];
b[pit] = 0;
int i = pit;
while (stones > 0) {
    i = (i + 1) % 14;
    if (i == 13) continue;
    b[i]++;
    stones--;
}
bool again = (i == 6);
if (i >= 0 && i <= 5 && b[i] == 1 && b[12 - i] > 0) {
    b[6] += b[i] + b[12 - i];
    b[i] = 0;
    b[12 - i] = 0;
}
string out;
for (int j = 0; j < 14; j++) { if (j) out += ' '; out += to_string(b[j]); }
if (again) out += " AGAIN";
return out;
""",
    ),
),

dict(
    id="minesweeper-click",
    fname="reveal",
    division="Senior",
    contest=2,
    title="MINESWEEPER CLICK",
    blurb="One click on a minefield, and the empty ground opens up around it.",
    statement="""
<p>A minefield is a rectangle of squares. Some squares hide a mine and the rest are safe. Every
square starts covered.</p>

<p>Clicking a square that hides a mine ends the game.</p>

<p>Clicking a safe square uncovers it and writes on it the number of mines among its neighbours,
counting all eight squares that touch it, including the four diagonals. Squares off the edge of
the board are not neighbours.</p>

<p>If that number turns out to be zero, there is nothing nearby worth being careful about, so the
game uncovers all eight of its neighbours as well, and applies the same rule to each of them in
turn. The opening spreads until it is walled in by squares that do have a mine next to them,
which get uncovered and show their number but do not spread any further.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>....;.*..;....<br>0<br>3</td></tr>
<tr><th>Output</th><td>..10;..10;..10</td></tr>
<tr><th>Explanation</th><td>
The field is 3 rows of 4, with one mine at row 1, column 1:
<pre><code>. . . .
. * . .
. . . .</code></pre>
The click is row 0, column 3. Nothing in the eight squares around it hides a mine, so it opens
showing 0 and spreads to its neighbours.<br>
Row 1 column 3 and row 2 column 3 also have no mine beside them, so they open showing 0 and
spread in turn. That is the whole rightmost column.<br>
Every square in column 2 touches the mine, so each opens showing 1 and stops there. They are the
wall the opening runs into.<br>
Columns 0 and 1 are never reached, so they stay covered and print as periods, and so does the
mine itself.
</td></tr></table>
""",
    input_spec="Input the field on the first line, with rows separated by semicolons, where a "
               "period is a safe square and an asterisk is a mine. Input the clicked row on the "
               "second line and the clicked column on the third line, both counting from 0.",
    output_spec="Output BOOM if the click landed on a mine. Otherwise output the visible board "
                "with rows separated by semicolons, writing a digit on every uncovered square, a "
                "0 on an uncovered square with no mine beside it, and a period on every square "
                "still covered.",
    constraints="The field has between 1 and 20 rows and between 1 and 20 columns. Every row is "
                "the same length. The clicked square is always on the board.",
    task="""
<ul>
<li>The function has 3 parameters: a string, <code>field</code>, holding the rows separated by
semicolons, and two integers, <code>row</code> and <code>col</code>, giving the clicked
square.</li>
<li>The function returns a string, either BOOM or the visible board.</li>
</ul>
""",
    params=[("field", "str"), ("row", "int"), ("col", "int")],
    ret="str",
    samples=[["....;.*..;....", "0", "3"],
             [".....;..*..;.....", "0", "0"],
             ["*", "0", "0"]],
    tests=[["....;.*..;....", "0", "3"],
           ["....;.*..;....", "1", "1"],
           ["*", "0", "0"],
           [".....;.....;.....;.....;.....", "2", "2"],
           ["*....;.....;.....;.....;....*", "2", "2"],
           ["..*..;.....;*...*;.....;..*..", "2", "2"],
           ["....;....;....;....", "0", "0"],
           ["*.*.*;.....;*.*.*;.....;*.*.*", "1", "1"],
           ["..........;..........;....*.....;..........;..........", "0", "0"],
           [".*.;***;.*.", "0", "0"],
           ["....*;.....;.....;.....;.....", "4", "0"],
           ["*........*;..........;..........;..........;*........*", "2", "5"]],
    approach="""
<p>Three parts, of which only the middle one is interesting: count the
neighbours of a square, spread the opening, then print.</p>

<p>Write the neighbour count as a function of its own. Loop the row offset and the column offset each
from minus one to one, skip the pair where both are zero, discard anything falling off the board, and
add one for every asterisk. Getting that right once means you never have to think about the eight
directions again.</p>

<p>For the spread, use a queue rather than recursion. Push the clicked square, then repeatedly pop one,
skipping it if it is already uncovered and otherwise uncovering it and recording its count. Only when
that count is zero do you push its eight neighbours, and that single condition is the whole rule, since
a square with a mine beside it is uncovered but is a dead end. Recursion works too, but a 20 by 20 field
of open ground goes 400 frames deep, which is comfortable in C++ and Java and close enough to Python's
default limit to be worth avoiding.</p>

<p>The reference solution marks squares when removing them from the queue and skips duplicate entries. Marking a square as visited when first adding it is also correct and prevents those duplicates. Either approach must ensure each square is processed only once.</p>

<p>Two things about printing. A mine is never uncovered by a legal click, so it keeps whatever it looked
like before, which in this problem is a covered square printing as a period. And an uncovered square
with a count of zero prints as the digit 0 rather than as a period, since that is what distinguishes it
from a square nobody ever reached. Confusing those two makes the output look almost right and score
nothing.</p>
""",
    sol=dict(
        python_helpers="""
def neighbours(grid, r, c):
    total = 0
    for dr in (-1, 0, 1):
        for dc in (-1, 0, 1):
            if dr == 0 and dc == 0:
                continue
            nr, nc = r + dr, c + dc
            if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == "*":
                total += 1
    return total
""",
        python="""
grid = field.split(";")
h, w = len(grid), len(grid[0])
if grid[row][col] == "*":
    return "BOOM"
shown = [["."] * w for _ in range(h)]
queue = [(row, col)]
head = 0
while head < len(queue):
    r, c = queue[head]
    head += 1
    if shown[r][c] != ".":
        continue
    n = neighbours(grid, r, c)
    shown[r][c] = str(n)
    if n == 0:
        for dr in (-1, 0, 1):
            for dc in (-1, 0, 1):
                nr, nc = r + dr, c + dc
                if 0 <= nr < h and 0 <= nc < w and shown[nr][nc] == ".":
                    queue.append((nr, nc))
return ";".join("".join(rowchars) for rowchars in shown)
""",
        java_helpers="""
static int neighbours(String[] grid, int r, int c) {
    int total = 0;
    for (int dr = -1; dr <= 1; dr++) {
        for (int dc = -1; dc <= 1; dc++) {
            if (dr == 0 && dc == 0) continue;
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length()
                    && grid[nr].charAt(nc) == '*') total++;
        }
    }
    return total;
}
""",
        java="""
String[] grid = field.split(";");
int h = grid.length, w = grid[0].length();
if (grid[row].charAt(col) == '*') return "BOOM";
char[][] shown = new char[h][w];
for (char[] r : shown) Arrays.fill(r, '.');
Deque<int[]> queue = new ArrayDeque<>();
queue.add(new int[]{row, col});
while (!queue.isEmpty()) {
    int[] cur = queue.poll();
    int r = cur[0], c = cur[1];
    if (shown[r][c] != '.') continue;
    int n = neighbours(grid, r, c);
    shown[r][c] = (char) ('0' + n);
    if (n == 0) {
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < h && nc >= 0 && nc < w && shown[nr][nc] == '.') {
                    queue.add(new int[]{nr, nc});
                }
            }
        }
    }
}
StringBuilder out = new StringBuilder();
for (int r = 0; r < h; r++) {
    if (r > 0) out.append(';');
    out.append(shown[r]);
}
return out.toString();
""",
        cpp_helpers="""
static int neighbours(const vector<string> &grid, int r, int c) {
    int total = 0;
    for (int dr = -1; dr <= 1; dr++) {
        for (int dc = -1; dc <= 1; dc++) {
            if (dr == 0 && dc == 0) continue;
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < (int) grid.size() && nc >= 0 && nc < (int) grid[0].size()
                    && grid[nr][nc] == '*') total++;
        }
    }
    return total;
}
""",
        cpp="""
vector<string> grid;
string rowstr;
istringstream is(field);
while (getline(is, rowstr, ';')) grid.push_back(rowstr);
int h = (int) grid.size(), w = (int) grid[0].size();
if (grid[row][col] == '*') return "BOOM";
vector<string> shown(h, string(w, '.'));
deque<pair<int,int>> q;
q.push_back({row, col});
while (!q.empty()) {
    auto cur = q.front();
    q.pop_front();
    int r = cur.first, c = cur.second;
    if (shown[r][c] != '.') continue;
    int n = neighbours(grid, r, c);
    shown[r][c] = char('0' + n);
    if (n == 0) {
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < h && nc >= 0 && nc < w && shown[nr][nc] == '.') {
                    q.push_back({nr, nc});
                }
            }
        }
    }
}
string out;
for (int r = 0; r < h; r++) { if (r) out += ';'; out += shown[r]; }
return out;
""",
    ),
),

dict(
    id="rotor-cipher",
    fname="encode",
    division="Senior",
    contest=3,
    title="ROTOR CIPHER",
    blurb="Three geared wheels shift each letter, and the wheels turn as you type.",
    statement="""
<p>The machine has three wheels in a row. Each wheel is set to one of the 26 letters, where A
stands for 0, B for 1, and so on up to Z for 25. The machine is given a starting setting as three
letters, one per wheel.</p>

<p>Every letter of the message goes through the same two steps, in this order.</p>

<p><b>First the wheels turn.</b> Wheel one advances by one. If that carries it past Z and back
round to A, wheel two also advances by one. If wheel two in turn carries past Z back to A, wheel
three advances by one. Wheel three never carries anywhere.</p>

<p><b>Then the letter is shifted.</b> Add the three wheel settings together, take the remainder on
division by 26, and move the letter forward round the alphabet by that amount, wrapping from Z
back to A.</p>

<p>The wheels turn before the first letter is encoded, not after it. Anything in the message that
is not a capital letter, such as a space or a digit, is copied through unchanged and does not turn
the wheels at all.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>HI ACSL<br>AYZ</td></tr>
<tr><th>Output</th><td>FH ADUO</td></tr>
<tr><th>Explanation</th><td>
The wheels start at A, Y, Z, which is 0, 24, 25. Only wheel one moves anywhere in this message,
since it never gets past Z.<br>
H: wheel one turns to 1, so the shift is 1 + 24 + 25 = 50, and 50 mod 26 is 24. H is letter 7, and
7 + 24 = 31 wraps round to 5, which is F.<br>
I: wheel one turns to 2, shift 51 mod 26 = 25. I is 8, and 8 + 25 = 33 wraps to 7, which is H.<br>
The space is copied straight through and the wheels do not move for it.<br>
A: wheel one turns to 3, shift 52 mod 26 = 0, so A stays A.<br>
C: wheel one turns to 4, shift 1, giving D.<br>
S: wheel one turns to 5, shift 2, giving U.<br>
L: wheel one turns to 6, shift 3, giving O.
</td></tr></table>
""",
    input_spec="Input the message on the first line and the three letter starting setting on the "
               "second line.",
    output_spec="Output the encoded message, with every character that is not a capital letter "
                "copied through unchanged.",
    constraints="The message is between 1 and 200 characters and contains only capital letters, "
                "spaces, and digits. The setting is always three capital letters.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>message</code>, and a string,
<code>start</code>, holding the three starting wheel letters.</li>
<li>The function returns a string, the encoded message.</li>
</ul>
""",
    params=[("message", "str"), ("start", "str")],
    ret="str",
    samples=[["HI ACSL", "AYZ"], ["AAAAA", "AAA"], ["A B 1 C", "ZZZ"]],
    tests=[["HI ACSL", "AYZ"], ["AAAAA", "AAA"], ["A B 1 C", "ZZZ"],
           ["ATTACK AT DAWN", "AAA"],
           ["ZZZZZZZZZZZZZZZZZZZZZZZZZZ", "AAA"],
           ["THE QUICK BROWN FOX", "MQP"],
           ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "ZZA"],
           ["ACSL 2026 FINALS", "BCD"],
           ["X", "ZZZ"],
           ["12345 67890", "ABC"],
           ["MEET ME AT THE OLD MILL AT MIDNIGHT ON TUESDAY", "QRS"],
           ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "AAA"]],
    approach="""
<p>Keep the three wheels as three integers from 0 to 25, and write the turning as a
step of its own so that you can test it in isolation.</p>

<p>Turning is a chain of carries. Add one to wheel one and take the remainder on 26, and if the result
is 0 then it wrapped, so do the same to wheel two, and if that also lands on 0, add one to wheel three.
Checking for 0 after the modulo is the cleanest way to detect a wrap, because the only way to reach 0
by adding one is to have come from 25.</p>

<p>Encoding is then a single line. The shift is the three wheels added and reduced modulo 26, and the
letter moves forward by that much with another modulo to wrap, which in every one of the three languages
is <code>(c - 'A' + shift) % 26 + 'A'</code>.</p>

<p>Three things decide whether this works. The wheels turn before the letter is encoded rather than
after, and turning afterwards shifts every character of the output by one wheel position, so the whole
message comes out wrong while still looking like a perfectly plausible cipher. If your first letter is
off by exactly one, that is why.</p>

<p>Characters that are not capital letters pass through untouched and do not turn the wheels at all,
which means a message containing spaces encodes its letters exactly as if the spaces were not there.
Turn the wheels on a space and every letter after the first one is wrong.</p>

<p>Finally, the carry happens on a wrap rather than every 26 letters counted from the beginning. Those
two are the same thing when wheel one starts at A, which is why the second sample hides the bug while
the first, which starts at A with wheel two already sitting at Y, exposes it.</p>
""",
    sol=dict(
        python="""
w1 = ord(start[0]) - 65
w2 = ord(start[1]) - 65
w3 = ord(start[2]) - 65
out = ""
for ch in message:
    if not ("A" <= ch <= "Z"):
        out += ch
        continue
    w1 = (w1 + 1) % 26
    if w1 == 0:
        w2 = (w2 + 1) % 26
        if w2 == 0:
            w3 = (w3 + 1) % 26
    shift = (w1 + w2 + w3) % 26
    out += chr((ord(ch) - 65 + shift) % 26 + 65)
return out
""",
        java="""
int w1 = start.charAt(0) - 'A', w2 = start.charAt(1) - 'A', w3 = start.charAt(2) - 'A';
StringBuilder out = new StringBuilder();
for (int i = 0; i < message.length(); i++) {
    char ch = message.charAt(i);
    if (ch < 'A' || ch > 'Z') { out.append(ch); continue; }
    w1 = (w1 + 1) % 26;
    if (w1 == 0) {
        w2 = (w2 + 1) % 26;
        if (w2 == 0) w3 = (w3 + 1) % 26;
    }
    int shift = (w1 + w2 + w3) % 26;
    out.append((char) ((ch - 'A' + shift) % 26 + 'A'));
}
return out.toString();
""",
        cpp="""
int w1 = start[0] - 'A', w2 = start[1] - 'A', w3 = start[2] - 'A';
string out;
for (char ch : message) {
    if (ch < 'A' || ch > 'Z') { out += ch; continue; }
    w1 = (w1 + 1) % 26;
    if (w1 == 0) {
        w2 = (w2 + 1) % 26;
        if (w2 == 0) w3 = (w3 + 1) % 26;
    }
    int shift = (w1 + w2 + w3) % 26;
    out += char((ch - 'A' + shift) % 26 + 'A');
}
return out;
""",
    ),
),

dict(
    id="tetris-drop",
    fname="finalHeights",
    division="Senior",
    contest=4,
    title="TETRIS DROP",
    blurb="Drop bars into an eight column well and clear every row that fills up.",
    statement="""
<p>The well is 8 columns wide, numbered 0 through 7 from the left, and as tall as it needs to be.
It starts empty.</p>

<p>Two kinds of piece fall into it. A piece written H followed by a number is a horizontal bar
that is one square tall and that many squares wide. A piece written V followed by a number is a
vertical bar one square wide and that many squares tall. Each piece comes with the column its
leftmost square occupies.</p>

<p>A piece falls straight down without turning or sliding, and stops as soon as any part of it
would overlap something already in the well or would go below the floor. A horizontal bar
therefore comes to rest on top of the tallest column it spans, and it does not tip or fill the gaps
underneath it.</p>

<p>After a piece lands, any row that now has all 8 of its squares filled disappears, and
everything above that row drops down one row. Several rows can go at once.</p>

<p>Report how tall each column is once every piece has fallen.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>H4:0 H4:4 V3:0 H2:6</td></tr>
<tr><th>Output</th><td>3 0 0 0 0 0 1 1</td></tr>
<tr><th>Explanation</th><td>
H4:0 lands on the floor and fills columns 0 through 3 of the bottom row.<br>
H4:4 lands on the floor and fills columns 4 through 7 of the bottom row. All 8 squares of that row
are now filled, so it disappears and the well is empty again.<br>
V3:0 falls to the floor and makes column 0 three squares tall.<br>
H2:6 lands on the floor across columns 6 and 7, one square tall.<br>
No row is full, so nothing clears. Column 0 stands at 3, columns 6 and 7 at 1, and the rest are
empty.
</td></tr></table>
""",
    input_spec="Input the pieces on one line, separated by single spaces. Each piece is the letter "
               "H or V, then the length of the bar, then a colon, then the column its leftmost "
               "square occupies.",
    output_spec="Output the height of each of the 8 columns, from column 0 to column 7, separated "
                "by single spaces.",
    constraints="There are at most 60 pieces. A bar is between 1 and 8 long, and a piece always "
                "fits inside the 8 columns.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>pieces</code>, holding the pieces in the order
they fall, separated by single spaces.</li>
<li>The function returns a string holding the 8 column heights separated by single spaces.</li>
</ul>
""",
    params=[("pieces", "str")],
    ret="str",
    samples=["H4:0 H4:4 V3:0 H2:6", "H8:0", "H4:0 V2:5 H3:5"],
    tests=["H4:0 H4:4 V3:0 H2:6", "H8:0", "V1:0 V1:1 V1:2 V1:3 V1:4 V1:5 V1:6 V1:7",
           "V4:3",
           "H8:0 H8:0 H8:0",
           "V2:0 V2:1 V2:2 V2:3 V2:4 V2:5 V2:6 V2:7",
           "H3:0 H3:0 H3:0 V3:7",
           "V5:0 H7:1 H7:1 H7:1 H7:1 H7:1",
           "H1:0 H1:1 H1:2 H1:3 H1:4 H1:5 H1:6 H1:7 H1:0",
           "V8:0 V8:7 H6:1 H6:1",
           "H2:0 H2:2 H2:4 H2:6 H2:0 H2:2 H2:4 H2:6",
           "V3:0 V1:1 V1:2 V1:3 V1:4 V1:5 V1:6 V1:7 H8:0"],
    approach="""
<p>Tracking only the eight column heights will not do, because clearing a row can
leave a column with a hole underneath it. Keep the actual well as a list of rows, each holding 8
squares, with row 0 as the floor, and grow the list whenever a piece needs a row that does not yet
exist.</p>

<p>Write a helper returning the height of a column, meaning one more than the index of its highest
filled square, or 0 when the column is empty. Everything else is built on top of it.</p>

<p>Landing a piece is then one line of thought apiece. A horizontal bar of width w at column c comes to
rest on the row equal to the largest height among columns c through c + w - 1, filling those squares in
that single row. A vertical bar of height n at column c starts at that column's height and fills n rows
upward in that one column.</p>

<p>The clearing step is where the problem is won or lost. Walk the rows, keep only those that are not
completely full, and rebuild the well from what survived. Doing it that way handles several rows going
at once for free, and it sidesteps the classic bug of deleting row by row while iterating upward, which
skips a row every time one is removed.</p>

<p>Note too that clearing can drop material into a column that was empty below it, which is exactly why
the well has to be modelled square by square. A solution that adjusts the heights arithmetically after a
clear gets the first sample right and then drifts.</p>

<p>Parsing is a split on the space, then the first character for the shape, everything between it and
the colon for the length, and everything after the colon for the column. The stated lengths are 1 through 8.</p>
""",
    sol=dict(
        python_helpers="""
def col_height(well, c):
    for r in range(len(well) - 1, -1, -1):
        if well[r][c]:
            return r + 1
    return 0


def ensure(well, rows):
    while len(well) < rows:
        well.append([0] * 8)
""",
        python="""
well = []
for token in pieces.split():
    shape = token[0]
    colon = token.index(":")
    size = int(token[1:colon])
    c = int(token[colon + 1:])
    if shape == "H":
        base = max(col_height(well, x) for x in range(c, c + size))
        ensure(well, base + 1)
        for x in range(c, c + size):
            well[base][x] = 1
    else:
        base = col_height(well, c)
        ensure(well, base + size)
        for r in range(base, base + size):
            well[r][c] = 1
    well = [row for row in well if sum(row) < 8]
return " ".join(str(col_height(well, c)) for c in range(8))
""",
        java_helpers="""
static int colHeight(List<int[]> well, int c) {
    for (int r = well.size() - 1; r >= 0; r--) if (well.get(r)[c] == 1) return r + 1;
    return 0;
}

static void ensure(List<int[]> well, int rows) {
    while (well.size() < rows) well.add(new int[8]);
}
""",
        java="""
List<int[]> well = new ArrayList<>();
for (String token : pieces.trim().split("\\s+")) {
    char shape = token.charAt(0);
    int colon = token.indexOf(':');
    int size = Integer.parseInt(token.substring(1, colon));
    int c = Integer.parseInt(token.substring(colon + 1));
    if (shape == 'H') {
        int base = 0;
        for (int x = c; x < c + size; x++) base = Math.max(base, colHeight(well, x));
        ensure(well, base + 1);
        for (int x = c; x < c + size; x++) well.get(base)[x] = 1;
    } else {
        int base = colHeight(well, c);
        ensure(well, base + size);
        for (int r = base; r < base + size; r++) well.get(r)[c] = 1;
    }
    List<int[]> kept = new ArrayList<>();
    for (int[] row : well) {
        int filled = 0;
        for (int v : row) filled += v;
        if (filled < 8) kept.add(row);
    }
    well = kept;
}
StringBuilder out = new StringBuilder();
for (int c = 0; c < 8; c++) { if (c > 0) out.append(' '); out.append(colHeight(well, c)); }
return out.toString();
""",
        cpp_helpers="""
static int colHeight(const vector<array<int, 8>> &well, int c) {
    for (int r = (int) well.size() - 1; r >= 0; r--) if (well[r][c]) return r + 1;
    return 0;
}

static void ensure(vector<array<int, 8>> &well, int rows) {
    while ((int) well.size() < rows) well.push_back(array<int, 8>{0, 0, 0, 0, 0, 0, 0, 0});
}
""",
        cpp="""
vector<array<int, 8>> well;
string token;
istringstream is(pieces);
while (is >> token) {
    char shape = token[0];
    size_t colon = token.find(':');
    int size_ = stoi(token.substr(1, colon - 1));
    int c = stoi(token.substr(colon + 1));
    if (shape == 'H') {
        int base = 0;
        for (int x = c; x < c + size_; x++) base = max(base, colHeight(well, x));
        ensure(well, base + 1);
        for (int x = c; x < c + size_; x++) well[base][x] = 1;
    } else {
        int base = colHeight(well, c);
        ensure(well, base + size_);
        for (int r = base; r < base + size_; r++) well[r][c] = 1;
    }
    vector<array<int, 8>> kept;
    for (auto &row : well) {
        int filled = 0;
        for (int v : row) filled += v;
        if (filled < 8) kept.push_back(row);
    }
    well = kept;
}
string out;
for (int c = 0; c < 8; c++) { if (c) out += ' '; out += to_string(colHeight(well, c)); }
return out;
""",
    ),
),

]
