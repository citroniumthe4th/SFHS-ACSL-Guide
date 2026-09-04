# -*- coding: utf-8 -*-
"""ACSL style programming problems, part 5."""

PROBLEMS = [

dict(
    id="yahtzee-roll",
    fname="bestCategory",
    division="Junior",
    contest=3,
    title="YAHTZEE ROLL",
    blurb="Five dice, seven categories, and the highest score wins the argument.",
    statement="""
<p>You have rolled five dice and now you have to decide which category to claim. These are the
seven categories and what each one pays.</p>

<ol>
<li><b>YAHTZEE</b>, all five dice showing the same number, scores 50.</li>
<li><b>LARGESTRAIGHT</b>, five dice in a row such as 2 3 4 5 6, scores 40.</li>
<li><b>SMALLSTRAIGHT</b>, four of the dice in a row, scores 30.</li>
<li><b>FULLHOUSE</b>, three of one number and two of another, scores 25.</li>
<li><b>FOUROFAKIND</b>, at least four dice showing the same number, scores the sum of all five
dice.</li>
<li><b>THREEOFAKIND</b>, at least three dice showing the same number, scores the sum of all five
dice.</li>
<li><b>CHANCE</b>, which any roll qualifies for, scores the sum of all five dice.</li>
</ol>

<p>Claim the category that pays the most. If two categories pay the same, claim whichever comes
first in the list above.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>5 5 5 6 6</td></tr>
<tr><th>Output</th><td>THREEOFAKIND 27</td></tr>
<tr><th>Explanation</th><td>
The roll qualifies for FULLHOUSE, worth 25, because there are three 5s and two 6s.<br>
It also qualifies for THREEOFAKIND and for CHANCE, both worth the sum of the dice, which is
27.<br>
27 beats 25, so the full house is not the best claim. THREEOFAKIND and CHANCE tie at 27, and
THREEOFAKIND is listed first, so that is the answer.
</td></tr></table>
""",
    input_spec="Input five dice values from 1 to 6, each separated by a single space.",
    output_spec="Output the name of the best category, a single space, and the score it pays.",
    constraints="There are always exactly five dice, each showing 1 through 6.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>dice</code>, holding the five dice values
separated by single spaces.</li>
<li>The function returns a string holding the category name and the score, separated by a single
space.</li>
</ul>
""",
    params=[("dice", "str")],
    ret="str",
    samples=["5 5 5 6 6", "3 3 3 3 3", "1 2 3 4 6"],
    tests=["5 5 5 6 6", "3 3 3 3 3", "1 2 3 4 6",
           "2 3 4 5 6", "6 6 6 6 2", "1 1 2 2 3",
           "1 1 1 2 2", "6 6 6 1 1", "2 3 4 5 5",
           "1 3 5 2 4", "4 4 4 4 6", "1 1 1 1 2"],
    approach="""
<p>Count first and decide second. Build a tally of how many times each face from 1
through 6 turned up, and add the five dice for the sum, because every test below reads off one or the
other.</p>

<p>Five of a kind means some face has a count of 5. Four of a kind means some count is 4 or more,
which five of a kind also satisfies, and three of a kind means some count is 3 or more. A full house
means one face has a count of exactly 3 while another has exactly 2.</p>

<p>The straights are the only categories needing the faces in order, so take the set of distinct faces
and look for a run. A large straight is 1 2 3 4 5 or 2 3 4 5 6, and a small straight is any four in a
row, meaning 1 2 3 4, or 2 3 4 5, or 3 4 5 6, appearing among the distinct faces. Checking those three
patterns directly is both shorter and less error prone than writing a general run finder.</p>

<p>Now build the list of categories you qualify for along with what each pays, walk it in the order
the statement gives, and keep the best. Ties resolve to the first one encountered automatically,
provided you only replace the current best on a strictly greater score.</p>

<p>The point of the problem is that the list order is a tiebreaker rather than a priority. A full house
pays 25, but a roll of three 5s and two 6s sums to 27, so the correct claim is a category further down
the list. Reading the order as a priority and stopping at the first match gets the sample wrong, which
is precisely why the sample is that roll.</p>

<p>Watch the overlaps as well. Five of a kind qualifies for YAHTZEE, FOUROFAKIND, THREEOFAKIND, and
CHANCE simultaneously, and since YAHTZEE pays 50 while five dice can never sum beyond 30, YAHTZEE
always wins there.</p>
""",
    sol=dict(
        python="""
d = [int(x) for x in dice.split()]
count = [0] * 7
for v in d:
    count[v] += 1
total = sum(d)
faces = set(d)

cats = []
if 5 in count:
    cats.append(("YAHTZEE", 50))
if faces >= {1, 2, 3, 4, 5} or faces >= {2, 3, 4, 5, 6}:
    cats.append(("LARGESTRAIGHT", 40))
if (faces >= {1, 2, 3, 4} or faces >= {2, 3, 4, 5} or faces >= {3, 4, 5, 6}):
    cats.append(("SMALLSTRAIGHT", 30))
if 3 in count and 2 in count:
    cats.append(("FULLHOUSE", 25))
if max(count) >= 4:
    cats.append(("FOUROFAKIND", total))
if max(count) >= 3:
    cats.append(("THREEOFAKIND", total))
cats.append(("CHANCE", total))

best = cats[0]
for c in cats[1:]:
    if c[1] > best[1]:
        best = c
return best[0] + " " + str(best[1])
""",
        java_helpers="""
static boolean has(Set<Integer> f, int[] want) {
    for (int w : want) if (!f.contains(w)) return false;
    return true;
}
""",
        java="""
String[] tok = dice.trim().split("\\\\s+");
int[] count = new int[7];
int total = 0;
Set<Integer> faces = new HashSet<>();
for (String t : tok) {
    int v = Integer.parseInt(t);
    count[v]++;
    total += v;
    faces.add(v);
}
int maxCount = 0;
boolean hasThree = false, hasTwo = false;
for (int f = 1; f <= 6; f++) {
    maxCount = Math.max(maxCount, count[f]);
    if (count[f] == 3) hasThree = true;
    if (count[f] == 2) hasTwo = true;
}

List<String> names = new ArrayList<>();
List<Integer> scores = new ArrayList<>();
if (maxCount == 5) { names.add("YAHTZEE"); scores.add(50); }
if (has(faces, new int[]{1,2,3,4,5}) || has(faces, new int[]{2,3,4,5,6})) {
    names.add("LARGESTRAIGHT"); scores.add(40);
}
if (has(faces, new int[]{1,2,3,4}) || has(faces, new int[]{2,3,4,5})
        || has(faces, new int[]{3,4,5,6})) {
    names.add("SMALLSTRAIGHT"); scores.add(30);
}
if (hasThree && hasTwo) { names.add("FULLHOUSE"); scores.add(25); }
if (maxCount >= 4) { names.add("FOUROFAKIND"); scores.add(total); }
if (maxCount >= 3) { names.add("THREEOFAKIND"); scores.add(total); }
names.add("CHANCE"); scores.add(total);

int bi = 0;
for (int i = 1; i < scores.size(); i++) if (scores.get(i) > scores.get(bi)) bi = i;
return names.get(bi) + " " + scores.get(bi);
""",
        cpp_helpers="""
static bool has(const set<int> &f, const vector<int> &want) {
    for (int w : want) if (!f.count(w)) return false;
    return true;
}
""",
        cpp="""
vector<int> count_(7, 0);
int total = 0, v;
set<int> faces;
istringstream is(dice);
while (is >> v) { count_[v]++; total += v; faces.insert(v); }
int maxCount = 0;
bool hasThree = false, hasTwo = false;
for (int f = 1; f <= 6; f++) {
    maxCount = max(maxCount, count_[f]);
    if (count_[f] == 3) hasThree = true;
    if (count_[f] == 2) hasTwo = true;
}

vector<string> names;
vector<int> scores;
if (maxCount == 5) { names.push_back("YAHTZEE"); scores.push_back(50); }
if (has(faces, {1,2,3,4,5}) || has(faces, {2,3,4,5,6})) {
    names.push_back("LARGESTRAIGHT"); scores.push_back(40);
}
if (has(faces, {1,2,3,4}) || has(faces, {2,3,4,5}) || has(faces, {3,4,5,6})) {
    names.push_back("SMALLSTRAIGHT"); scores.push_back(30);
}
if (hasThree && hasTwo) { names.push_back("FULLHOUSE"); scores.push_back(25); }
if (maxCount >= 4) { names.push_back("FOUROFAKIND"); scores.push_back(total); }
if (maxCount >= 3) { names.push_back("THREEOFAKIND"); scores.push_back(total); }
names.push_back("CHANCE"); scores.push_back(total);

size_t bi = 0;
for (size_t i = 1; i < scores.size(); i++) if (scores[i] > scores[bi]) bi = i;
return names[bi] + " " + to_string(scores[bi]);
""",
    ),
),

dict(
    id="traffic-lights",
    fname="countStops",
    division="Junior",
    contest=4,
    title="TRAFFIC LIGHTS",
    blurb="Drive a straight road and count the red lights, remembering that waiting moves you later.",
    statement="""
<p>A car pulls onto a straight road at position 0 at time 0 and drives at a steady speed. Every
traffic light on the road turns green at time 0, stays green for a set number of seconds, then
red for a set number of seconds, and repeats that cycle all day.</p>

<p>When the car reaches a light while it is green, it drives straight through without slowing
down. When it reaches a light while it is red, it waits at the light until the moment the light
turns green again, then carries on at the same speed.</p>

<p>Waiting matters for more than the one light. Every second spent stopped pushes the car later
to every light after it, which changes whether those lights are green when it gets there.</p>

<p>Count how many lights the car has to wait at.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>250/20/10,600/12/18,950/8/22<br>10</td></tr>
<tr><th>Output</th><td>2</td></tr>
<tr><th>Explanation</th><td>
At 10 units per second the car covers 250 units in 25 seconds. The first light runs a 30 second
cycle, green for the first 20. At second 25 it is red, so the car waits 5 seconds and drives on
at second 30. That is one stop.<br>
The second light is 600 units out, which is 60 seconds of driving, plus the 5 seconds already
lost, so the car arrives at second 65. Its cycle is also 30 seconds, and 65 is 5 seconds into a
cycle, which is inside the 12 second green. It drives through.<br>
The third light is 950 units out, so 95 seconds of driving plus 5 lost, arriving at second 100.
That is 10 seconds into a 30 second cycle, and this light is only green for 8, so the car waits.
That is the second stop.
</td></tr></table>
""",
    input_spec="Input the lights on the first line, each written as its position, a slash, its "
               "green seconds, a slash, and its red seconds, with the lights separated by commas "
               "and given in increasing order of position. On the second line input the speed of "
               "the car in units per second.",
    output_spec="Output an integer, the number of lights the car has to wait at.",
    constraints="There are at most 40 lights. Every position is a whole multiple of the speed, so "
                "the car always reaches a light on a whole second. Green and red times are "
                "between 1 and 200 seconds. The speed is between 1 and 50.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>lights</code>, describing the lights, and an
integer, <code>speed</code>, in units per second.</li>
<li>The function returns an integer, the number of stops.</li>
</ul>
""",
    params=[("lights", "str"), ("speed", "int")],
    ret="int",
    samples=[["250/20/10,600/12/18,950/8/22", "10"],
             ["100/10/10", "10"],
             ["100/5/5,200/5/5,300/5/5", "10"]],
    tests=[["250/20/10,600/12/18,950/8/22", "10"],
           ["100/10/10", "10"],
           ["100/5/5,200/5/5,300/5/5", "10"],
           ["60/1/1,120/1/1,180/1/1,240/1/1", "60"],
           ["1000/200/1", "50"],
           ["30/2/8,60/2/8,90/2/8,120/2/8,150/2/8", "10"],
           ["25/3/7,50/3/7,75/3/7,100/3/7", "5"],
           ["500/10/20,1000/10/20,1500/10/20", "25"],
           ["10/1/199,20/1/199", "10"],
           ["120/30/30,240/30/30,360/30/30,480/30/30", "12"],
           ["45/9/6,90/9/6,135/9/6,180/9/6,225/9/6,270/9/6", "9"],
           ["200/4/16,400/4/16,600/4/16,800/4/16,1000/4/16", "20"]],
    approach="""
<p>One pass over the lights, carrying a single running total of the seconds lost
so far. That running total is the entire problem.</p>

<p>For each light, the arrival time is its position divided by the speed, plus every second the car has
already spent waiting. The constraints promise the position divides evenly, so the arithmetic stays in
whole numbers and you never have to think about a car arriving half a second into a cycle.</p>

<p>To read the light, take the arrival time modulo the cycle length, where the cycle is the green
seconds plus the red seconds. Since every light turns green at time 0, that remainder tells you how far
into the current cycle the car has arrived. If it is less than the green time the car drives through,
and if it is not the light is red, so count a stop and add the seconds remaining in the cycle, which is
the cycle length minus the remainder, to the running total.</p>

<p>The mistake this problem is built around is computing every arrival time up front from the positions
alone and then checking each light independently. That gives the right answer only for a car that never
stops. The moment it waits at the first light, every later arrival shifts by that amount, and the sample
is arranged so that the third light reads green if you forget and red if you do not.</p>

<p>Two boundary details. Arriving at the exact second the light turns red means it is red, so compare
with a strict less than against the green time. Arriving at the exact second it turns green, meaning a
remainder of 0, means it is green and the car does not stop.</p>

<p>Parsing is a split on the comma and then a split on the slash, which in C++ means two nested uses of
<code>getline</code> on an <code>istringstream</code> and in Java two calls to <code>split</code>.</p>
""",
    sol=dict(
        python="""
waited = 0
stops = 0
for part in lights.split(","):
    pos, green, red = [int(x) for x in part.split("/")]
    cycle = green + red
    arrive = pos // speed + waited
    phase = arrive % cycle
    if phase >= green:
        stops += 1
        waited += cycle - phase
return stops
""",
        java="""
int waited = 0, stops = 0;
for (String part : lights.split(",")) {
    String[] f = part.split("/");
    int pos = Integer.parseInt(f[0]), green = Integer.parseInt(f[1]), red = Integer.parseInt(f[2]);
    int cycle = green + red;
    int arrive = pos / speed + waited;
    int phase = arrive % cycle;
    if (phase >= green) {
        stops++;
        waited += cycle - phase;
    }
}
return stops;
""",
        cpp="""
int waited = 0, stops = 0;
string part;
istringstream ls(lights);
while (getline(ls, part, ',')) {
    for (char &ch : part) if (ch == '/') ch = ' ';
    istringstream ps(part);
    int pos, green, red;
    ps >> pos >> green >> red;
    int cycle = green + red;
    int arrive = pos / speed + waited;
    int phase = arrive % cycle;
    if (phase >= green) {
        stops++;
        waited += cycle - phase;
    }
}
return stops;
""",
    ),
),

dict(
    id="card-war",
    fname="playWar",
    division="Senior",
    contest=3,
    title="CARD WAR",
    blurb="Two decks, one card each per round, and ties burn both cards.",
    statement="""
<p>Two players each hold a deck of cards face down. A card is a number from 2 to 14, where 11 is a
jack, 12 a queen, 13 a king, and 14 an ace.</p>

<p>Every round both players turn over the card on top of their deck.</p>

<p>If one card is higher, that player takes both cards and puts them on the bottom of their own
deck, their own card first and the loser's card second. If the two cards are equal, both cards are
burned and leave the game entirely.</p>

<p>A player loses when their deck becomes empty. Play continues until that happens to one of them,
or until 500 rounds have been played.</p>

<p>Both decks can become empty after the same round, when the two cards were equal and each player
had one card left. That is a draw, not a loss for either player.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>5 9 2<br>5 3 14</td></tr>
<tr><th>Output</th><td>B 7</td></tr>
<tr><th>Explanation</th><td>
Round 1: both play a 5, so both cards burn. A holds 9 2, B holds 3 14.<br>
Round 2: 9 beats 3, so A puts 9 then 3 on the bottom. A holds 2 9 3, B holds 14.<br>
Round 3: 14 beats 2, so B puts 14 then 2 on the bottom. A holds 9 3, B holds 14 2.<br>
Round 4: 14 beats 9. A holds 3, B holds 2 14 9.<br>
Round 5: 3 beats 2. A holds 3 2, B holds 14 9.<br>
Round 6: 14 beats 3. A holds 2, B holds 9 14 3.<br>
Round 7: 9 beats 2, and A is out of cards. B wins on round 7.
</td></tr></table>
""",
    input_spec="Input player A's deck on the first line and player B's deck on the second line, "
               "each as card values from top to bottom separated by single spaces.",
    output_spec="Output the winner's letter and the number of the round that ended the game, "
                "separated by a single space. Output DRAW and the round number if both decks "
                "empty on the same round. Output TIMEOUT if 500 rounds pass with both players "
                "still holding cards.",
    constraints="Each deck starts with between 1 and 26 cards, each from 2 to 14.",
    task="""
<ul>
<li>The function has 2 parameters: two strings, <code>deckA</code> and <code>deckB</code>, holding
each player's cards from top to bottom separated by single spaces.</li>
<li>The function returns a string holding the result and the round number, or TIMEOUT.</li>
</ul>
""",
    params=[("deckA", "str"), ("deckB", "str")],
    ret="str",
    samples=[["5 9 2", "5 3 14"], ["14", "2"], ["7", "7"]],
    tests=[["5 9 2", "5 3 14"], ["14", "2"], ["7", "7"],
           ["2 3 4", "5 6 7"],
           ["14 14 14 14", "2 2 2 2"],
           ["10 10", "10 10"],
           ["2 4 6 8 10 12 14", "3 5 7 9 11 13 2"],
           ["9 8 7 6 5", "5 6 7 8 9"],
           ["14 13 12 11", "11 12 13 14"],
           ["2 2 2 2 2 2 2 2 2 2 2 2 2", "2 2 2 2 2 2 2 2 2 2 2 2 2"],
           ["6 6 6 7", "6 6 6 5"],
           ["3 4 5 6 7 8 9 10 11 12 13 14 2", "14 13 12 11 10 9 8 7 6 5 4 3 2"]],
    approach="""
<p>Two queues and a loop. Take from the front, add to the back, and everything else
follows from the rules as written.</p>

<p>Use a structure that is cheap at both ends: an <code>ArrayDeque</code> in Java, a
<code>deque</code> in C++, and either <code>collections.deque</code> or a plain list in Python, since
at 26 cards and 500 rounds the cost of popping the front of a list is negligible.</p>

<p>Check the stopping conditions each round after the cards have been played rather than before, and
count carefully, because the round that empties a deck is the round that ends the game and is therefore
the number to report.</p>

<p>The order in which the winner returns the two cards matters, and it is what makes the game finite or
not: winner's card first, then the loser's. Reverse it and you have a different but equally
deterministic game with different answers throughout.</p>

<p>The burn on a tie is what makes draws possible, since both cards leave the game entirely and the
total number of cards in play shrinks. Two decks of identical cards burn down in step and empty on the
same round, which is exactly what the DRAW case exists for, and the tenth test is that situation.</p>

<p>The cap exists because this game genuinely can run forever. Two decks that trade the same cards back
and forth in a cycle never terminate, so count the rounds and stop at 500. Reporting TIMEOUT is a
correct answer rather than an admission of failure.</p>
""",
    sol=dict(
        python="""
a = [int(x) for x in deckA.split()]
b = [int(x) for x in deckB.split()]
for rnd in range(1, 501):
    ca = a.pop(0)
    cb = b.pop(0)
    if ca > cb:
        a.append(ca)
        a.append(cb)
    elif cb > ca:
        b.append(cb)
        b.append(ca)
    if not a and not b:
        return "DRAW " + str(rnd)
    if not a:
        return "B " + str(rnd)
    if not b:
        return "A " + str(rnd)
return "TIMEOUT"
""",
        java="""
Deque<Integer> a = new ArrayDeque<>(), b = new ArrayDeque<>();
for (String t : deckA.trim().split("\s+")) a.addLast(Integer.parseInt(t));
for (String t : deckB.trim().split("\s+")) b.addLast(Integer.parseInt(t));
for (int rnd = 1; rnd <= 500; rnd++) {
    int ca = a.pollFirst(), cb = b.pollFirst();
    if (ca > cb) { a.addLast(ca); a.addLast(cb); }
    else if (cb > ca) { b.addLast(cb); b.addLast(ca); }
    if (a.isEmpty() && b.isEmpty()) return "DRAW " + rnd;
    if (a.isEmpty()) return "B " + rnd;
    if (b.isEmpty()) return "A " + rnd;
}
return "TIMEOUT";
""",
        cpp="""
deque<int> a, b;
int v;
istringstream as(deckA), bs(deckB);
while (as >> v) a.push_back(v);
while (bs >> v) b.push_back(v);
for (int rnd = 1; rnd <= 500; rnd++) {
    int ca = a.front(); a.pop_front();
    int cb = b.front(); b.pop_front();
    if (ca > cb) { a.push_back(ca); a.push_back(cb); }
    else if (cb > ca) { b.push_back(cb); b.push_back(ca); }
    if (a.empty() && b.empty()) return "DRAW " + to_string(rnd);
    if (a.empty()) return "B " + to_string(rnd);
    if (b.empty()) return "A " + to_string(rnd);
}
return "TIMEOUT";
""",
    ),
),

dict(
    id="robot-vacuum",
    fname="cleanReport",
    division="Senior",
    contest=4,
    title="ROBOT VACUUM",
    blurb="A dumb robot that only knows how to go forward or turn right.",
    statement="""
<p>A robot vacuum sits on a rectangular floor plan. A period is open floor, a number sign is a
wall it cannot enter, and the letter R marks the square it starts on. It begins facing north,
meaning toward the top of the plan.</p>

<p>The robot has exactly one behaviour, and it repeats it once per step. It looks at the square
directly ahead of it. If that square is inside the plan and is not a wall, it drives into that
square. Otherwise it stays put and turns 90 degrees to its right, from north to east, east to
south, south to west, and west back to north. Either way, that used up one step.</p>

<p>Every square the robot occupies gets cleaned, including the one it starts on. Driving over a
square it has already cleaned is fine and does not clean it twice.</p>

<p>Run the robot for the given number of steps and report how many different squares it cleaned
and which way it ends up facing.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>...;.R.;...<br>6</td></tr>
<tr><th>Output</th><td>5 S</td></tr>
<tr><th>Explanation</th><td>
The robot starts in the centre of the 3 by 3 plan facing north. That square counts as cleaned, so
the tally starts at 1.<br>
Step 1 drives north to the top middle square. Tally 2.<br>
Step 2 finds the edge of the plan ahead, so the robot turns to face east.<br>
Step 3 drives east to the top right corner. Tally 3.<br>
Step 4 finds the edge ahead again, so it turns to face south.<br>
Step 5 drives south to the middle right square. Tally 4.<br>
Step 6 drives south again to the bottom right corner. Tally 5.<br>
Six steps are up. Five squares were cleaned and the robot is still facing south.
</td></tr></table>
""",
    input_spec="Input the floor plan on the first line, with rows separated by semicolons, where a "
               "period is floor, a number sign is a wall, and R is the robot's starting square. "
               "On the second line input the number of steps to run.",
    output_spec="Output the number of different squares the robot cleaned, a single space, and "
                "the direction it faces at the end, written as N, E, S, or W.",
    constraints="The plan has between 1 and 25 rows and between 1 and 25 columns, every row is "
                "the same length, and there is exactly one R. The robot runs for between 1 and "
                "100000 steps.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>plan</code>, holding the rows separated by
semicolons, and an integer, <code>steps</code>, the number of steps to run.</li>
<li>The function returns a string holding the number of squares cleaned and the final facing,
separated by a single space.</li>
</ul>
""",
    params=[("plan", "str"), ("steps", "int")],
    ret="str",
    samples=[["...;.R.;...", "6"], ["R", "10"], ["R#;..", "4"]],
    tests=[["...;.R.;...", "6"], ["R", "10"], ["R#;..", "4"],
           ["R....;.....;.....;.....;.....", "20"],
           ["#####;#R.#;#..#;#####", "12"],
           ["R", "100000"],
           ["..........;..........;....R.....;..........;..........", "100"],
           ["R#########;##########", "3"],
           [".....;.###.;.#R#.;.###.;.....", "8"],
           ["R.........", "100000"],
           ["R........;.#######.;.#.....#.;.#.###.#.;.#.#R#.#.;.#.###.#.;.#.....#.;.#######.;.........", "500"],
           ["####;#R.#;#.##;####", "100000"]],
    approach="""
<p>Model the robot as a position and a facing index, then let one small table do
all the direction work.</p>

<p>Store the four directions in the order north, east, south, west, so that turning right is adding one
and taking the remainder on 4. Put the row and column offsets in two parallel arrays in that same
order, with north as row minus one, east as column plus one, south as row plus one, and west as column
minus one. Once that is set up, the entire step is four lines and there is no switch statement
anywhere in the program.</p>

<p>Keep the cleaned squares in a set, or in a grid of booleans alongside a counter, and mark the
starting square before the loop begins. Forgetting that starting square is the most common way to
finish exactly one low.</p>

<p>Each step, work out the square directly ahead. If its row and column both lie inside the plan and it
is not a wall, move there and mark it, and otherwise advance the facing. Both branches consume a step,
so the body always runs exactly once per step.</p>

<p>The step count can reach 100000, which is far more than the robot needs on a plan of at most 625
squares, so most tests run long after it has settled into a repeating circuit. The loop is cheap enough
that this does not matter, but it does mean you cannot stop early merely because no new square was
cleaned, since the final facing still depends on the exact number of steps.</p>

<p>Two edge cases are worth checking by hand. A plan consisting of a single square leaves the robot
turning on the spot forever, cleaning exactly one square, with its final facing cycling with a period
of four, and a robot boxed in by walls behaves identically.</p>
""",
    sol=dict(
        python="""
grid = plan.split(";")
h, w = len(grid), len(grid[0])
r = c = 0
for i in range(h):
    j = grid[i].find("R")
    if j >= 0:
        r, c = i, j
dr = [-1, 0, 1, 0]
dc = [0, 1, 0, -1]
face = 0
seen = {(r, c)}
for _ in range(steps):
    nr, nc = r + dr[face], c + dc[face]
    if 0 <= nr < h and 0 <= nc < w and grid[nr][nc] != "#":
        r, c = nr, nc
        seen.add((r, c))
    else:
        face = (face + 1) % 4
return str(len(seen)) + " " + "NESW"[face]
""",
        java="""
String[] grid = plan.split(";");
int h = grid.length, w = grid[0].length();
int r = 0, c = 0;
for (int i = 0; i < h; i++) {
    int j = grid[i].indexOf('R');
    if (j >= 0) { r = i; c = j; }
}
int[] dr = {-1, 0, 1, 0};
int[] dc = {0, 1, 0, -1};
int face = 0;
Set<Integer> seen = new HashSet<>();
seen.add(r * 100 + c);
for (int s = 0; s < steps; s++) {
    int nr = r + dr[face], nc = c + dc[face];
    if (nr >= 0 && nr < h && nc >= 0 && nc < w && grid[nr].charAt(nc) != '#') {
        r = nr; c = nc;
        seen.add(r * 100 + c);
    } else {
        face = (face + 1) % 4;
    }
}
return seen.size() + " " + "NESW".charAt(face);
""",
        cpp="""
vector<string> grid;
string row;
istringstream is(plan);
while (getline(is, row, ';')) grid.push_back(row);
int h = (int) grid.size(), w = (int) grid[0].size();
int r = 0, c = 0;
for (int i = 0; i < h; i++) {
    size_t j = grid[i].find('R');
    if (j != string::npos) { r = i; c = (int) j; }
}
int dr[] = {-1, 0, 1, 0};
int dc[] = {0, 1, 0, -1};
int face = 0;
set<pair<int,int>> seen;
seen.insert({r, c});
for (int s = 0; s < steps; s++) {
    int nr = r + dr[face], nc = c + dc[face];
    if (nr >= 0 && nr < h && nc >= 0 && nc < w && grid[nr][nc] != '#') {
        r = nr; c = nc;
        seen.insert({r, c});
    } else {
        face = (face + 1) % 4;
    }
}
return to_string(seen.size()) + " " + string(1, string("NESW")[face]);
""",
    ),
),

]
