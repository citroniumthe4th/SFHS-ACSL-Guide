# -*- coding: utf-8 -*-
"""ACSL style programming problems, part 3 of 3."""

PROBLEMS = [

# ---------------------------------------------------------------- Senior 3
dict(
    id="maze-routes",
    fname="countRoutes",
    division="Senior",
    contest=3,
    title="MAZE ROUTES",
    blurb="Count the ways across a blocked grid when you may only move right or down.",
    statement="""
<p>A delivery robot starts in the top left square of a rectangular grid and has to reach the
bottom right square. It only ever moves one square to the right or one square down, never up and
never left.</p>

<p>Some squares are blocked and the robot cannot enter them. Count the routes from the top left
to the bottom right that avoid every blocked square. If the start or the finish is itself blocked,
there are no routes at all.</p>

<p>The grid arrives as one string with the rows separated by semicolons. A period is an open
square and a number sign is a blocked one. Every row has the same length.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>...;.#.;...</td></tr>
<tr><th>Output</th><td>2</td></tr>
<tr><th>Explanation</th><td>
The grid is three by three with the center blocked:
<pre><code>. . .
. # .
. . .</code></pre>
Without the block there would be six routes. The two that survive are right, right, down, down,
and down, down, right, right. Every other route passes through the center.
</td></tr></table>
""",
    input_spec="Input one string holding the grid, with rows separated by semicolons. A period is "
               "an open square and a number sign is a blocked square.",
    output_spec="Output an integer, the number of routes from the top left square to the bottom "
                "right square.",
    constraints="The grid has between 1 and 17 rows and between 1 and 17 columns. Every row has "
                "the same length. The answer fits in a 64 bit integer.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>maze</code>, holding the rows of the grid
separated by semicolons.</li>
<li>The function returns an integer, the number of routes.</li>
</ul>
""",
    params=[("maze", "str")],
    ret="int",
    samples=["...;.#.;...", ".", "#.;.."],
    tests=["...;.#.;...", ".", "#.;..",
           "....;....;....;....",
           ".#;#.",
           "..........;..........;..........;..........;..........",
           "...#...;.#...#.;...#...;.#...#.;...#...",
           "..;..;..;..;..;..;..;..;..;..",
           ".................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................",
           "....;.##.;.##.;....",
           "..#..;.....;#...#;.....;..#..",
           "...........;.#.#.#.#.#.;...........;.#.#.#.#.#.;...........;.#.#.#.#.#.;..........."],
    approach="""
<p>The obvious recursion, where each square asks its right neighbour and its lower neighbour how
many routes they see, gives the right answer but does far too much work. It re-solves the same square
once for every distinct route that reaches it, so its running time grows with the number of routes
rather than with the size of the grid, and on a 17 by 17 grid the number of routes runs into the
billions.</p>

<p>A table fixes that. Let <code>ways[r][c]</code> hold the number of routes from the top left corner
to that square. A blocked square gets 0, and any other square gets <code>ways[r - 1][c]</code> plus
<code>ways[r][c - 1]</code>, treating anything off the grid as 0, since arriving from directly above
or directly to the left are the only two possibilities. Seed <code>ways[0][0]</code> with 1 when the
start is open and 0 when it is blocked, fill the table row by row from the top, and the answer is the
bottom right entry. The table fills at most 289 cells, one addition each, whatever the number of
routes turns out to be.</p>

<p>The first row and first column are worth a moment's thought. A blocked square anywhere along the
top row makes every square to its right in that row unreachable, and the table produces that
automatically provided you set the blocked square to 0 before anything reads it. There is no need to
special case the borders at all, only to guard the index.</p>

<p>Splitting the input is the one piece of plumbing. Python splits on the semicolon, Java uses
<code>split(";")</code>, and C++ wants <code>getline</code> on an <code>istringstream</code> with a
semicolon delimiter.</p>

<p>A fully open 17 by 17 grid has C(32, 16) routes, which is 601,080,390: sixteen moves right and
sixteen moves down in any order. That is the largest count the stated limits can produce and it fits
in a signed 32 bit integer, so ordinary <code>int</code> is enough here. Reach for 64 bit storage only
if you widen the grid, since the count grows quickly once you do.</p>
""",
    sol=dict(
        python="""
rows = maze.split(";")
h = len(rows)
w = len(rows[0])
ways = [[0] * w for _ in range(h)]
for r in range(h):
    for c in range(w):
        if rows[r][c] == "#":
            ways[r][c] = 0
        elif r == 0 and c == 0:
            ways[r][c] = 1
        else:
            up = ways[r - 1][c] if r > 0 else 0
            left = ways[r][c - 1] if c > 0 else 0
            ways[r][c] = up + left
return ways[h - 1][w - 1]
""",
        java="""
String[] rows = maze.split(";");
int h = rows.length, w = rows[0].length();
long[][] ways = new long[h][w];
for (int r = 0; r < h; r++) {
    for (int c = 0; c < w; c++) {
        if (rows[r].charAt(c) == '#') {
            ways[r][c] = 0;
        } else if (r == 0 && c == 0) {
            ways[r][c] = 1;
        } else {
            long up = r > 0 ? ways[r - 1][c] : 0;
            long left = c > 0 ? ways[r][c - 1] : 0;
            ways[r][c] = up + left;
        }
    }
}
return (int) ways[h - 1][w - 1];
""",
        cpp="""
vector<string> rows;
string row;
istringstream is(maze);
while (getline(is, row, ';')) rows.push_back(row);
int h = (int) rows.size(), w = (int) rows[0].size();
vector<vector<long long>> ways(h, vector<long long>(w, 0));
for (int r = 0; r < h; r++) {
    for (int c = 0; c < w; c++) {
        if (rows[r][c] == '#') {
            ways[r][c] = 0;
        } else if (r == 0 && c == 0) {
            ways[r][c] = 1;
        } else {
            long long up = r > 0 ? ways[r - 1][c] : 0;
            long long left = c > 0 ? ways[r][c - 1] : 0;
            ways[r][c] = up + left;
        }
    }
}
return (int) ways[h - 1][w - 1];
""",
    ),
),

# ---------------------------------------------------------------- Senior 4
dict(
    id="number-safari",
    fname="classifyPlate",
    division="Senior",
    contest=4,
    title="NUMBER SAFARI",
    blurb="Hunt five kinds of number inside the digits of a license plate.",
    statement="""
<p>Every summer the Ortiz family drives from Providence to Montreal, and the youngest passenger
passes the time hunting for interesting numbers on the license plates ahead.</p>

<p>You are given a license plate made of 8 digits. Consider every 2 digit, 3 digit, and 4 digit
number formed by adjacent digits of the plate, reading left to right. A 2 digit number must be
between 10 and 99, a 3 digit number between 100 and 999, and a 4 digit number between 1000 and
9999, so any run that starts with a 0 is thrown out. That leaves at most 18 numbers.</p>

<p>Check every one of them against these five kinds:</p>
<ol>
<li>A <b>Harshad</b> number is divisible by the sum of its own digits. 12 is Harshad because its
digits add to 3 and 12 divided by 3 is 4.</li>
<li>A <b>palindrome</b> reads the same forwards and backwards, like 66 or 909.</li>
<li>A <b>square</b> number is some whole number multiplied by itself, like 36 or 1024.</li>
<li>A <b>triangular</b> number is a sum 1 + 2 + 3 + ... + k for some k. The first few are 1, 3, 6,
10, 15, 21, 28, and 36.</li>
<li>An <b>emirp</b> is a prime whose digits reversed give a different prime. 71 is an emirp
because 71 and 17 are both prime. 101 is not, because reversing it gives 101 again.</li>
</ol>

<p>Report which kinds you found: H for Harshad, P for palindrome, S for square, T for triangular,
and Z for emirp. List the letters in alphabetical order, once each.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>36671276</td></tr>
<tr><th>Output</th><td>HPSTZ</td></tr>
<tr><th>Explanation</th><td>
The 18 numbers are 36, 66, 67, 71, 12, 27, 76, 366, 667, 671, 712, 127, 276, 3667, 6671, 6712,
7127, and 1276.<br>
Harshad: 36, 12, and 27.<br>
Palindrome: 66.<br>
Square: 36, which is 6 times 6.<br>
Triangular: 36, 66, and 276.<br>
Emirp: 71, since 17 is also prime.<br>
All five kinds appear, so output HPSTZ.
</td></tr></table>
""",
    input_spec="Input one string of exactly 8 digits.",
    output_spec="Output the letters for the kinds of number found, in alphabetical order with no "
                "spaces. Output NONE if no number on the plate matches any of the five kinds.",
    constraints="The plate is exactly 8 characters, each a digit from 0 through 9.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>plate</code>, holding the 8 digit license
plate.</li>
<li>The function returns a string of letters in alphabetical order, or NONE.</li>
</ul>
""",
    params=[("plate", "str")],
    ret="str",
    samples=["36671276", "68598593", "10112131"],
    tests=["36671276", "68598593", "10112131",
           "12739134", "99999999", "07070707",
           "35895683", "31428573", "91827364",
           "09568947", "10000001", "24681012"],
    approach="""
<p>This splits into two halves that never interact: build the list of candidate
numbers, then run five independent tests across it.</p>

<p>Building the list is a double loop over the length, 2 through 4, and the starting index. Cut the
substring, convert it, and keep it only if it is at or above the smallest number of that length. That
single comparison is what discards any run beginning with a zero, so you never have to inspect the
first character yourself. On the plate 07070707, for instance, 70 and 707 survive while 07 and 070 do
not.</p>

<p>The tests themselves are mostly one line each. Harshad is a single modulo against the digit sum,
and palindrome is a string compared with its own reverse. For square, take the integer square root and
nudge it upward until r times r reaches the value, then check for equality, rather than trusting a
floating point square root at values near 9999. Triangular has exactly the same shape, and walking k
upward while accumulating k times k plus 1 over 2 is easier to get right than inverting the formula,
at this size.</p>

<p>The emirp test is the only one carrying a trap, because it needs three conditions at once: the
number is prime, its reversal is prime, and the reversal differs from the original. Drop that third
condition and every palindromic prime such as 101 or 727 qualifies, which quietly adds a Z to several
plates. Trial division up to the square root is more than fast enough below 10000.</p>

<p>Collect the letters in a set so that a kind appearing four times is still reported once, then sort
and join. An empty set means the answer is NONE rather than an empty string.</p>
""",
    sol=dict(
        python_helpers="""
def is_prime(n):
    if n < 2:
        return False
    if n % 2 == 0:
        return n == 2
    d = 3
    while d * d <= n:
        if n % d == 0:
            return False
        d += 2
    return True
""",
        python="""
nums = []
seen = set()
for length in (2, 3, 4):
    low = 10 ** (length - 1)
    for i in range(len(plate) - length + 1):
        v = int(plate[i:i + length])
        if v >= low and v not in seen:
            seen.add(v)
            nums.append(v)
found = set()
for v in nums:
    s = str(v)
    if v % sum(int(c) for c in s) == 0:
        found.add("H")
    if s == s[::-1]:
        found.add("P")
    r = int(v ** 0.5)
    while r * r < v:
        r += 1
    if r * r == v:
        found.add("S")
    k = 1
    while k * (k + 1) // 2 < v:
        k += 1
    if k * (k + 1) // 2 == v:
        found.add("T")
    rev = int(s[::-1])
    if rev != v and is_prime(v) and is_prime(rev):
        found.add("Z")
return "".join(sorted(found)) if found else "NONE"
""",
        java_helpers="""
static boolean isPrime(int n) {
    if (n < 2) return false;
    if (n % 2 == 0) return n == 2;
    for (int d = 3; d * d <= n; d += 2) if (n % d == 0) return false;
    return true;
}
""",
        java="""
List<Integer> nums = new ArrayList<>();
Set<Integer> seen = new HashSet<>();
for (int length = 2; length <= 4; length++) {
    int low = (int) Math.pow(10, length - 1);
    for (int i = 0; i + length <= plate.length(); i++) {
        int v = Integer.parseInt(plate.substring(i, i + length));
        if (v >= low && seen.add(v)) nums.add(v);
    }
}
TreeSet<String> found = new TreeSet<>();
for (int v : nums) {
    String s = String.valueOf(v);
    int ds = 0;
    for (char c : s.toCharArray()) ds += c - '0';
    if (v % ds == 0) found.add("H");
    if (s.equals(new StringBuilder(s).reverse().toString())) found.add("P");
    int r = (int) Math.sqrt((double) v);
    while (r * r < v) r++;
    if (r * r == v) found.add("S");
    int k = 1;
    while (k * (k + 1) / 2 < v) k++;
    if (k * (k + 1) / 2 == v) found.add("T");
    int rev = Integer.parseInt(new StringBuilder(s).reverse().toString());
    if (rev != v && isPrime(v) && isPrime(rev)) found.add("Z");
}
if (found.isEmpty()) return "NONE";
return String.join("", found);
""",
        cpp_helpers="""
static bool isPrime(int n) {
    if (n < 2) return false;
    if (n % 2 == 0) return n == 2;
    for (int d = 3; d * d <= n; d += 2) if (n % d == 0) return false;
    return true;
}
""",
        cpp="""
vector<int> nums;
set<int> seen;
for (int length = 2; length <= 4; length++) {
    int low = 1;
    for (int e = 1; e < length; e++) low *= 10;
    for (size_t i = 0; i + length <= plate.size(); i++) {
        int v = stoi(plate.substr(i, length));
        if (v >= low && !seen.count(v)) { seen.insert(v); nums.push_back(v); }
    }
}
set<string> found;
for (int v : nums) {
    string s = to_string(v), t = s;
    reverse(t.begin(), t.end());
    int ds = 0;
    for (char c : s) ds += c - '0';
    if (v % ds == 0) found.insert("H");
    if (s == t) found.insert("P");
    int r = (int) sqrt((double) v);
    while (r * r < v) r++;
    if (r * r == v) found.insert("S");
    int k = 1;
    while (k * (k + 1) / 2 < v) k++;
    if (k * (k + 1) / 2 == v) found.insert("T");
    int rev = stoi(t);
    if (rev != v && isPrime(v) && isPrime(rev)) found.insert("Z");
}
if (found.empty()) return "NONE";
string out;
for (const string &f : found) out += f;
return out;
""",
    ),
),

# ---------------------------------------------------------------- Senior 5
dict(
    id="knight-moves",
    fname="minMoves",
    division="Senior",
    contest=1,
    title="KNIGHT MOVES",
    blurb="Fewest knight hops between two squares of a chessboard.",
    statement="""
<p>A knight on a chessboard moves in an L: two squares along one direction and then one square at
a right angle to it. From the middle of the board it has eight possible destinations, and from a
corner only two.</p>

<p>Squares are named the usual way. The file is a letter from a through h counting from the left,
and the rank is a digit from 1 through 8 counting from the bottom, so a1 is the bottom left corner
and h8 is the top right.</p>

<p>Given a starting square and a target square, find the fewest moves a knight needs to get from
one to the other. The board is empty, so nothing blocks the way.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>a1<br>h8</td></tr>
<tr><th>Output</th><td>6</td></tr>
<tr><th>Explanation</th><td>
One shortest route is a1, b3, c5, d7, e5, f7, h8.<br>
That is six moves, and no route of five exists. A knight alternates square colour on every move,
and a1 and h8 are the same colour, so any route between them takes an even number of moves. Four
is not enough to cross the whole board, which leaves six.
</td></tr></table>
""",
    input_spec="Input the starting square on the first line and the target square on the second "
               "line, each as a file letter from a to h followed by a rank digit from 1 to 8.",
    output_spec="Output an integer, the fewest knight moves from the start to the target. Output "
                "0 if they are the same square.",
    constraints="Both squares are valid squares on a standard 8 by 8 board.",
    task="""
<ul>
<li>The function has 2 parameters: two strings, <code>start</code> and <code>target</code>, each
naming a square.</li>
<li>The function returns an integer, the fewest moves needed.</li>
</ul>
""",
    params=[("start", "str"), ("target", "str")],
    ret="int",
    samples=[["a1", "h8"], ["a1", "a1"], ["a1", "b3"]],
    tests=[["a1", "h8"], ["a1", "a1"], ["a1", "b3"],
           ["d4", "e6"], ["a1", "b2"], ["h1", "a8"],
           ["e4", "e5"], ["a1", "c2"], ["d5", "d5"],
           ["b1", "g8"], ["a8", "h1"], ["c3", "f7"]],
    approach="""
<p>This is a shortest path on an unweighted graph, which means a breadth first
search and nothing more sophisticated. You can attempt a formula based on the coordinate difference,
but the cases near the edges of the board are genuinely nasty, and a1 to b2 defeats every naive
version: the two squares are touching and the answer is 4.</p>

<p>Set up a 64 square board, mark the starting square with a distance of 0, and push it onto a queue.
Repeatedly pop a square, generate its eight knight destinations, and for each one that lies on the
board and has not been visited, record a distance one greater and push it. Stop when you pop the
target. The board is tiny, so the whole search visits at most 64 squares.</p>

<p>Store the eight moves as two parallel arrays of offsets, pairing plus and minus 1 with plus and
minus 2 in both orders. Writing those out longhand is exactly where a typo hides, so generate them or
check them twice.</p>

<p>Converting a square name into coordinates is plain subtraction. The file is the letter minus the
letter a, giving 0 through 7, and the rank is the digit minus the character zero, minus one more so
that rank 1 becomes row 0.</p>

<p>Two answers are worth confirming by hand because they surprise people. The same square takes 0
moves rather than 1, and a1 to b2, which is a single diagonal step, takes 4, because the knight has to
leave the corner and come back to it.</p>
""",
    sol=dict(
        python="""
def sq(s):
    return (ord(s[0]) - 97, int(s[1]) - 1)

sx, sy = sq(start)
tx, ty = sq(target)
dist = [[-1] * 8 for _ in range(8)]
dist[sx][sy] = 0
queue = [(sx, sy)]
dx = [1, 1, -1, -1, 2, 2, -2, -2]
dy = [2, -2, 2, -2, 1, -1, 1, -1]
head = 0
while head < len(queue):
    x, y = queue[head]
    head += 1
    if x == tx and y == ty:
        return dist[x][y]
    for i in range(8):
        nx, ny = x + dx[i], y + dy[i]
        if 0 <= nx < 8 and 0 <= ny < 8 and dist[nx][ny] < 0:
            dist[nx][ny] = dist[x][y] + 1
            queue.append((nx, ny))
return dist[tx][ty]
""",
        java="""
int sx = start.charAt(0) - 'a', sy = start.charAt(1) - '1';
int tx = target.charAt(0) - 'a', ty = target.charAt(1) - '1';
int[][] dist = new int[8][8];
for (int[] row : dist) Arrays.fill(row, -1);
dist[sx][sy] = 0;
int[] dx = {1, 1, -1, -1, 2, 2, -2, -2};
int[] dy = {2, -2, 2, -2, 1, -1, 1, -1};
Deque<int[]> queue = new ArrayDeque<>();
queue.add(new int[]{sx, sy});
while (!queue.isEmpty()) {
    int[] cur = queue.poll();
    int x = cur[0], y = cur[1];
    if (x == tx && y == ty) return dist[x][y];
    for (int i = 0; i < 8; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && dist[nx][ny] < 0) {
            dist[nx][ny] = dist[x][y] + 1;
            queue.add(new int[]{nx, ny});
        }
    }
}
return dist[tx][ty];
""",
        cpp="""
int sx = start[0] - 'a', sy = start[1] - '1';
int tx = target[0] - 'a', ty = target[1] - '1';
vector<vector<int>> dist(8, vector<int>(8, -1));
dist[sx][sy] = 0;
int dx[] = {1, 1, -1, -1, 2, 2, -2, -2};
int dy[] = {2, -2, 2, -2, 1, -1, 1, -1};
deque<pair<int,int>> q;
q.push_back({sx, sy});
while (!q.empty()) {
    auto cur = q.front();
    q.pop_front();
    int x = cur.first, y = cur.second;
    if (x == tx && y == ty) return dist[x][y];
    for (int i = 0; i < 8; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && dist[nx][ny] < 0) {
            dist[nx][ny] = dist[x][y] + 1;
            q.push_back({nx, ny});
        }
    }
}
return dist[tx][ty];
""",
    ),
),

# ---------------------------------------------------------------- Senior 6
dict(
    id="shuffle-cycles",
    fname="shuffleCount",
    division="Senior",
    contest=2,
    title="SHUFFLE CYCLES",
    blurb="Riffle a deck perfectly, over and over, until it comes back to where it started.",
    statement="""
<p>A perfect riffle shuffle of a deck with an even number of cards works like this. Cut the deck
exactly in half, so the top half and the bottom half hold the same number of cards. Then rebuild
the deck by laying down the first card of the top half, then the first card of the bottom half,
then the second card of the top half, then the second card of the bottom half, and so on until
both halves are used up.</p>

<p>The card that started on top is still on top afterwards, so the deck is scrambled but not
completely. Shuffle again, and again, and eventually every card is back exactly where it began.</p>

<p>Given the number of cards in the deck, report how many perfect riffle shuffles it takes to
return the deck to its original order.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>8</td></tr>
<tr><th>Output</th><td>3</td></tr>
<tr><th>Explanation</th><td>
Number the cards 1 through 8 from the top.<br>
Start: 1 2 3 4 5 6 7 8. The halves are 1 2 3 4 and 5 6 7 8.<br>
After shuffle 1: 1 5 2 6 3 7 4 8.<br>
After shuffle 2: 1 3 5 7 2 4 6 8.<br>
After shuffle 3: 1 2 3 4 5 6 7 8, which is the original order.<br>
Three shuffles, so output 3.
</td></tr></table>
""",
    input_spec="Input a single even integer, the number of cards in the deck.",
    output_spec="Output an integer, the number of perfect riffle shuffles needed to restore the "
                "original order.",
    constraints="The deck holds between 2 and 2000 cards and the count is always even.",
    task="""
<ul>
<li>The function has 1 parameter: an integer, <code>n</code>, the number of cards in the deck.</li>
<li>The function returns an integer, the number of shuffles needed.</li>
</ul>
""",
    params=[("n", "int")],
    ret="int",
    samples=["8", "2", "52"],
    tests=["8", "2", "52",
           "4", "6", "10",
           "24", "50", "64",
           "100", "1000", "2000"],
    approach="""
<p>Simulating is the honest first answer and it is fast enough here. Build an
array holding 0 through n minus 1, shuffle it, and compare against the original, repeating and
counting until the two match. Each shuffle is one pass over n cards and the number of shuffles never
grows large, so even a 2000 card deck finishes instantly.</p>

<p>Building the shuffled deck into a second array is easier than doing it in place. Walk i from 0 to
half minus 1, writing the card at position i into slot 2i and the card at position half plus i into
slot 2i plus 1, then either copy back or swap the two arrays.</p>

<p>There is a tidier fact underneath if you would rather not simulate. Under this shuffle the card at
position p, counting from 0, moves to position 2p modulo n minus 1, with the last card staying where
it is. The deck therefore returns to its original order after the smallest k for which 2 to the k is
congruent to 1 modulo n minus 1, which for 52 cards is the multiplicative order of 2 modulo 51, or 8.
Computing that is a short loop doubling a running value modulo n minus 1 until it reaches 1.</p>

<p>Either way, check the smallest deck by hand. Two cards are unchanged by the shuffle, and since the
question asks how many shuffles it takes to be back in order, doing one shuffle achieves that, so the
answer is 1 rather than 0.</p>
""",
    sol=dict(
        python="""
deck = list(range(n))
original = list(range(n))
half = n // 2
count = 0
while True:
    nxt = [0] * n
    for i in range(half):
        nxt[2 * i] = deck[i]
        nxt[2 * i + 1] = deck[half + i]
    deck = nxt
    count += 1
    if deck == original:
        return count
""",
        java="""
int[] deck = new int[n], original = new int[n], nxt = new int[n];
for (int i = 0; i < n; i++) { deck[i] = i; original[i] = i; }
int half = n / 2, count = 0;
while (true) {
    for (int i = 0; i < half; i++) {
        nxt[2 * i] = deck[i];
        nxt[2 * i + 1] = deck[half + i];
    }
    int[] swap = deck; deck = nxt; nxt = swap;
    count++;
    if (Arrays.equals(deck, original)) return count;
}
""",
        cpp="""
vector<int> deck(n), original(n), nxt(n);
for (int i = 0; i < n; i++) { deck[i] = i; original[i] = i; }
int half = n / 2, count = 0;
while (true) {
    for (int i = 0; i < half; i++) {
        nxt[2 * i] = deck[i];
        nxt[2 * i + 1] = deck[half + i];
    }
    deck.swap(nxt);
    count++;
    if (deck == original) return count;
}
""",
    ),
),

]
