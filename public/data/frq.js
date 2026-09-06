window.FRQ = [
 {
  "id": "digit-chain",
  "division": "Junior",
  "contest": 1,
  "title": "Digit Chain",
  "blurb": "Square the digits, add them up, repeat, and count the steps before it settles.",
  "statement": "\n<p>Pick a whole number. Replace it with the sum of the squares of its digits. Do that again to\nthe result, and again, and keep going. Every starting number eventually either lands on 1 or\nfalls into a loop it has already been through, so the process always settles.</p>\n\n<p>Count each replacement, including the one that reaches 1 or repeats a value. Stop before making another replacement. If the starting number is already 1, return 0.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>19</td></tr>\n<tr><th>Output</th><td>4</td></tr>\n<tr><th>Explanation</th><td>\n1 squared plus 9 squared is 82, that is replacement 1.<br>\n8 squared plus 2 squared is 68, that is replacement 2.<br>\n6 squared plus 8 squared is 100, that is replacement 3.<br>\n1 squared plus 0 plus 0 is 1, that is replacement 4.<br>\nThe chain has reached 1, so output 4.\n</td></tr></table>\n",
  "input_spec": "Input a single whole number between 1 and 999999, inclusive.",
  "output_spec": "Output an integer, the number of replacements made before the chain reached 1 or repeated a value.",
  "constraints": "The starting number is between 1 and 999999, inclusive. Every chain settles within 40 replacements.",
  "approach": "\n<p>The loop is three lines and the stopping rule is the whole problem, because there\nare two separate ways for the chain to end and it is very easy to implement one of them and forget\nthe other.</p>\n\n<p>Keep a set of every value you have produced, and put the starting value in it before the loop\nbegins. On each pass, compute the next value, add one to the count, and then ask two questions in\nthis order: is this value 1, and have I seen it before. Either answer ends the loop.</p>\n\n<p>Record the starting value before the loop. Starting at 4 returns to 4 after eight replacements. If you omit the initial 4 from the set, the program continues to 16 and detects that repeated value after nine replacements.</p>\n\n<p>Be equally careful about what gets counted. The replacement that lands on 1 counts, but arriving at\n1 is not itself a further replacement, so a start of 1 has made no replacements at all and the answer\nis 0.</p>\n\n<p>One small implementation note: summing the squares of the digits is easier on the number than on a\nstring, particularly in Java and C++. Take n modulo 10, square it, add it to a running total, divide n\nby 10, and repeat while n is above zero.</p>\n",
  "hints": [
   "A chain can stop at 1 or at a value it has visited before. What must you remember between replacements?",
   "Store the starting value in a set. Count a replacement before testing its result, but return 0 immediately if the start is 1."
  ],
  "fname": "chainLength",
  "task": "\n<ul>\n<li>The function has 1 parameter: an integer, <code>start</code>, the number the chain begins\nwith.</li>\n<li>The function returns an integer, the number of replacements made.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "19"
    ],
    "out": "4"
   },
   {
    "in": [
     "4"
    ],
    "out": "8"
   },
   {
    "in": [
     "7"
    ],
    "out": "5"
   }
  ],
  "tests": [
   {
    "in": [
     "19"
    ],
    "out": "4"
   },
   {
    "in": [
     "4"
    ],
    "out": "8"
   },
   {
    "in": [
     "7"
    ],
    "out": "5"
   },
   {
    "in": [
     "1"
    ],
    "out": "0"
   },
   {
    "in": [
     "23"
    ],
    "out": "3"
   },
   {
    "in": [
     "100"
    ],
    "out": "1"
   },
   {
    "in": [
     "986"
    ],
    "out": "17"
   },
   {
    "in": [
     "999999"
    ],
    "out": "13"
   },
   {
    "in": [
     "44"
    ],
    "out": "4"
   },
   {
    "in": [
     "68"
    ],
    "out": "2"
   },
   {
    "in": [
     "160"
    ],
    "out": "9"
   },
   {
    "in": [
     "31331"
    ],
    "out": "11"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef chainLength(start: int) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(chainLength(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int chainLength(int start) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(chainLength(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint chainLength(int start) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << chainLength(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef chainLength(start: int) -> int:\n\n    if start == 1:\n        return 0\n    seen = {start}\n    n = start\n    count = 0\n    while True:\n        total = 0\n        m = n\n        while m > 0:\n            d = m % 10\n            total += d * d\n            m //= 10\n        n = total\n        count += 1\n        if n == 1 or n in seen:\n            return count\n        seen.add(n)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(chainLength(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int chainLength(int start) {\n\n        if (start == 1) return 0;\n        Set<Integer> seen = new HashSet<>();\n        seen.add(start);\n        int n = start, count = 0;\n        while (true) {\n            int total = 0, m = n;\n            while (m > 0) { int d = m % 10; total += d * d; m /= 10; }\n            n = total;\n            count++;\n            if (n == 1 || seen.contains(n)) return count;\n            seen.add(n);\n        }\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(chainLength(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint chainLength(int start) {\n\n    if (start == 1) return 0;\n    set<int> seen;\n    seen.insert(start);\n    int n = start, count = 0;\n    while (true) {\n        int total = 0, m = n;\n        while (m > 0) { int d = m % 10; total += d * d; m /= 10; }\n        n = total;\n        count++;\n        if (n == 1 || seen.count(n)) return count;\n        seen.insert(n);\n    }\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << chainLength(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "locker-hallway",
  "division": "Junior",
  "contest": 2,
  "title": "Locker Hallway",
  "blurb": "A hallway of lockers, a line of students, and every locker toggled more than once.",
  "statement": "\n<p>A hallway at ACSL High has N lockers in a row, numbered 1 through N, and every one of them\nstarts closed. Then N students walk the hallway one at a time.</p>\n\n<p>The first student opens every locker. The second student goes to every second locker, numbers\n2, 4, 6, and so on, and changes it: open becomes closed and closed becomes open. The third\nstudent does the same to every third locker, the fourth to every fourth, and so on through the\nNth student, who touches only locker N.</p>\n\n<p>After all N students have finished, report how many lockers are open and which open locker\nhas the highest number.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>20</td></tr>\n<tr><th>Output</th><td>4 16</td></tr>\n<tr><th>Explanation</th><td>\nLocker 12 is touched by students 1, 2, 3, 4, 6, and 12, which is six times, so it ends\nclosed.<br>\nLocker 16 is touched by students 1, 2, 4, 8, and 16, which is five times, so it ends open.<br>\nThe lockers left open are 1, 4, 9, and 16. That is four of them, and the highest is 16.\n</td></tr></table>\n",
  "input_spec": "Input a single integer N, the number of lockers.",
  "output_spec": "Output two integers separated by a single space: the number of lockers left open, then the number of the highest open locker. If no locker is open, output the word NONE.",
  "constraints": "N is between 1 and 100000, inclusive.",
  "approach": "\n<p>Simulating this is perfectly reasonable and you should write that version\nfirst if the pattern is not yet obvious to you. An array of N booleans, an outer loop over the\nstudents, an inner loop stepping by the student number, and a final scan comes to about 1.2 million\ntoggles at the largest input, which runs comfortably.</p>\n\n<p>The pattern is worth finding, though, because it collapses the whole problem into two lines. Locker\nk is touched once for every divisor of k, so it finishes open exactly when k has an odd number of\ndivisors. Divisors normally come in pairs straddling the square root, and the only time such a pair\ncollapses to a single number is when k is a perfect square, so the lockers left open are precisely 1,\n4, 9, 16, and so on. The count is therefore the integer part of the square root of N, and the highest\nopen locker is that count squared. At N of 20 the square root is about 4.47, giving a count of 4 and a\nhighest locker of 16.</p>\n\n<p>Take the integer part of the square root, then correct it with multiplication: while (r + 1)\nsquared is at most N add one to r, and while r squared is larger than N take one away. At this\nsize the square root is exact either way, so the correction is cheap insurance rather than a\nfix, but it does mean you never have to think about how your language rounded. Some languages\nship an integer square root that does the same job in one call.</p>\n\n<p>Any N of 1 or more leaves locker 1 open, so the NONE branch never actually fires. Write it anyway,\nsince the output specification asks for it and a defensive branch costs nothing.</p>\n",
  "hints": [
   "Which students touch locker 12? Relate their numbers to the divisors of 12.",
   "A locker stays open after an odd number of toggles. Divisors pair up except when a divisor is the square root of the locker number."
  ],
  "fname": "lockerReport",
  "task": "\n<ul>\n<li>The function has 1 parameter: an integer, <code>n</code>, the number of lockers in the\nhallway.</li>\n<li>The function returns a string holding the count and the highest open locker number separated\nby a single space, or NONE.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "20"
    ],
    "out": "4 16"
   },
   {
    "in": [
     "1"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "100"
    ],
    "out": "10 100"
   }
  ],
  "tests": [
   {
    "in": [
     "20"
    ],
    "out": "4 16"
   },
   {
    "in": [
     "1"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "100"
    ],
    "out": "10 100"
   },
   {
    "in": [
     "2"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "3"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "50"
    ],
    "out": "7 49"
   },
   {
    "in": [
     "99"
    ],
    "out": "9 81"
   },
   {
    "in": [
     "1000"
    ],
    "out": "31 961"
   },
   {
    "in": [
     "9999"
    ],
    "out": "99 9801"
   },
   {
    "in": [
     "10000"
    ],
    "out": "100 10000"
   },
   {
    "in": [
     "12345"
    ],
    "out": "111 12321"
   },
   {
    "in": [
     "100000"
    ],
    "out": "316 99856"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef lockerReport(n: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        print(lockerReport(n))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String lockerReport(int n) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(lockerReport(n)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring lockerReport(int n) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        cout << lockerReport(n) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef lockerReport(n: int) -> str:\n\n    r = int(n ** 0.5)\n    while (r + 1) * (r + 1) <= n:\n        r += 1\n    while r * r > n:\n        r -= 1\n    if r == 0:\n        return \"NONE\"\n    return str(r) + \" \" + str(r * r)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        print(lockerReport(n))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String lockerReport(int n) {\n\n        long r = (long) Math.sqrt((double) n);\n        while ((r + 1) * (r + 1) <= n) r++;\n        while (r * r > n) r--;\n        if (r == 0) return \"NONE\";\n        return r + \" \" + (r * r);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(lockerReport(n)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring lockerReport(int n) {\n\n    long long r = (long long) sqrt((double) n);\n    while ((r + 1) * (r + 1) <= n) r++;\n    while (r * r > n) r--;\n    if (r == 0) return \"NONE\";\n    return to_string(r) + \" \" + to_string(r * r);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        cout << lockerReport(n) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "elevator-trips",
  "division": "Junior",
  "contest": 3,
  "title": "Elevator Trips",
  "blurb": "Load the elevator from the front of the line until the next person would overload it.",
  "statement": "\n<p>A single elevator serves the lobby of an office tower, and it has a weight limit. A line of\npeople is waiting, and they are strict about their place in it: nobody lets the person behind\nthem go first.</p>\n\n<p>Loading works like this. Starting with whoever is at the front, keep adding the next person in\nline as long as the total weight on board stays at or below the limit. As soon as the next person\nwould push the total over the limit, the doors close and the elevator goes up. It comes back\nempty and loads the same way from whoever is now at the front.</p>\n\n<p>Count the trips it takes to move everybody. Every person weighs at or below the limit, so the\nline always clears.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>200<br>120 60 90 100 50</td></tr>\n<tr><th>Output</th><td>3</td></tr>\n<tr><th>Explanation</th><td>\nTrip 1 takes 120, then 60 for a total of 180. Adding 90 would make 270, over the limit, so it\ngoes up.<br>\nTrip 2 takes 90, then 100 for a total of 190. Adding 50 would make 240, over the limit, so it\ngoes up.<br>\nTrip 3 takes the last person, 50.<br>\nThree trips in all, so output 3.\n</td></tr></table>\n",
  "input_spec": "Input an integer, the weight limit, on the first line. On the second line input a string of weights, each separated by a single space.",
  "output_spec": "Output an integer, the number of trips.",
  "constraints": "The line holds between 1 and 60 people. Every weight is a positive integer no larger than the limit, and the limit is at most 5000.",
  "approach": "\n<p>A single pass carrying two running values is enough here: the weight currently\non board and the number of trips taken so far.</p>\n\n<p>Take each person in order and ask whether adding them keeps the load at or below the limit. If it\ndoes, they board. If it does not, count a trip, empty the elevator, and put that person on as the\nfirst passenger of the next one. When the queue runs out, count one final trip for whoever is still\nstanding in the car.</p>\n\n<p>That last line is the one people leave out, and it is easy to see why: the loop only counts a trip\nat the moment someone is turned away, so the final load never triggers it. If your answers are\nconsistently one too low, this is the reason.</p>\n\n<p>The comparison matters just as much. The limit is inclusive, so a load of exactly the limit is fine\nand the doors stay open, which means a strict less than breaks the second sample where every person\nweighs exactly the limit.</p>\n\n<p>Parsing the weights is the only genuinely fiddly part outside Python. In Java, trim the string and\nsplit on whitespace. In C++, feed it to an istringstream and pull integers out with the stream\noperator, which handles the spacing for you.</p>\n",
  "hints": [
   "You cannot reorder the queue. Track the current load as you read each weight.",
   "Start a new trip when adding the next person would exceed the limit. Count the last occupied trip after the loop, too."
  ],
  "fname": "countTrips",
  "task": "\n<ul>\n<li>The function has 2 parameters: an integer, <code>limit</code>, the weight the elevator can\ncarry, and a string, <code>weights</code>, holding the weight of each person in line separated by\nsingle spaces.</li>\n<li>The function returns an integer, the number of trips needed.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "200",
     "120 60 90 100 50"
    ],
    "out": "3"
   },
   {
    "in": [
     "100",
     "100 100 100"
    ],
    "out": "3"
   },
   {
    "in": [
     "500",
     "50 50 50 50 50 50 50 50 50 50"
    ],
    "out": "1"
   }
  ],
  "tests": [
   {
    "in": [
     "200",
     "120 60 90 100 50"
    ],
    "out": "3"
   },
   {
    "in": [
     "100",
     "100 100 100"
    ],
    "out": "3"
   },
   {
    "in": [
     "500",
     "50 50 50 50 50 50 50 50 50 50"
    ],
    "out": "1"
   },
   {
    "in": [
     "150",
     "150"
    ],
    "out": "1"
   },
   {
    "in": [
     "300",
     "100 100 100 100 100 100"
    ],
    "out": "2"
   },
   {
    "in": [
     "1000",
     "999 1 999 1 999 1"
    ],
    "out": "3"
   },
   {
    "in": [
     "250",
     "80 80 80 80 80 80 80 80 80"
    ],
    "out": "3"
   },
   {
    "in": [
     "5000",
     "1 2 3 4 5 6 7 8 9 10"
    ],
    "out": "1"
   },
   {
    "in": [
     "400",
     "200 200 200 200 200 200 200 200"
    ],
    "out": "4"
   },
   {
    "in": [
     "77",
     "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
    ],
    "out": "3"
   },
   {
    "in": [
     "600",
     "310 290 300 300 599 1 600"
    ],
    "out": "4"
   },
   {
    "in": [
     "999",
     "111 222 333 444 555 666 777 888 999"
    ],
    "out": "6"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef countTrips(limit: int, weights: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        limit = int(_lines[_i + 0].strip())\n        weights = _lines[_i + 1].strip()\n        print(countTrips(limit, weights))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countTrips(int limit, String weights) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int limit = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String weights = _lines.get(_i + 1);\n            _sb.append(countTrips(limit, weights)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countTrips(int limit, string weights) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int limit = stoi(_lines[_i + 0]);\n        string weights = _lines[_i + 1];\n        cout << countTrips(limit, weights) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countTrips(limit: int, weights: str) -> int:\n\n    load = 0\n    trips = 0\n    for tok in weights.split():\n        w = int(tok)\n        if load + w <= limit:\n            load += w\n        else:\n            trips += 1\n            load = w\n    if load > 0:\n        trips += 1\n    return trips\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        limit = int(_lines[_i + 0].strip())\n        weights = _lines[_i + 1].strip()\n        print(countTrips(limit, weights))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countTrips(int limit, String weights) {\n\n        int load = 0, trips = 0;\n        for (String tok : weights.trim().split(\"\\\\s+\")) {\n            int w = Integer.parseInt(tok);\n            if (load + w <= limit) {\n                load += w;\n            } else {\n                trips++;\n                load = w;\n            }\n        }\n        if (load > 0) trips++;\n        return trips;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int limit = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String weights = _lines.get(_i + 1);\n            _sb.append(countTrips(limit, weights)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countTrips(int limit, string weights) {\n\n    int load = 0, trips = 0, w;\n    istringstream is(weights);\n    while (is >> w) {\n        if (load + w <= limit) {\n            load += w;\n        } else {\n            trips++;\n            load = w;\n        }\n    }\n    if (load > 0) trips++;\n    return trips;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int limit = stoi(_lines[_i + 0]);\n        string weights = _lines[_i + 1];\n        cout << countTrips(limit, weights) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "spiral-word",
  "division": "Junior",
  "contest": 4,
  "title": "Spiral Word",
  "blurb": "Read a square grid of letters clockwise from the outside in.",
  "statement": "\n<p>A square grid of letters is given to you flattened into a single string, filled in row by row.\nA grid of 16 letters is 4 by 4, a grid of 25 letters is 5 by 5, and so on.</p>\n\n<p>Read the grid clockwise starting at the top left corner. Go all the way across the top row,\nthen down the right column, then back across the bottom row, then up the left column, which\nbrings you to the row below where you started. Then do the same thing again on what is left,\nspiralling inward until every letter has been read.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>ABCDEFGHIJKLMNOP</td></tr>\n<tr><th>Output</th><td>ABCDHLPONMIEFGKJ</td></tr>\n<tr><th>Explanation</th><td>\nThe 16 letters make this 4 by 4 grid:\n<pre><code>A B C D\nE F G H\nI J K L\nM N O P</code></pre>\nThe outer ring, clockwise from A, reads ABCD then HLP then ONM then IE.<br>\nThat leaves the inner 2 by 2 block F G, J K, whose ring reads FG then K then J.<br>\nPutting them together gives ABCDHLPONMIEFGKJ.\n</td></tr></table>\n",
  "input_spec": "Input a string of uppercase letters whose length is a perfect square.",
  "output_spec": "Output the letters of the grid in clockwise spiral order, starting at the top left corner, with no spaces.",
  "constraints": "The string holds between 1 and 100 uppercase letters and its length is always a perfect square.",
  "approach": "\n<p>Resist the urge to find a formula for where each letter ends up. Walk the ring\nboundaries instead, and let four indices carry the bookkeeping: <code>top</code>, <code>bottom</code>,\n<code>left</code>, and <code>right</code>.</p>\n\n<p>One complete ring is four passes. Go left to right along <code>top</code> and then increase it, top\nto bottom along <code>right</code> and then decrease it, right to left along <code>bottom</code> and\nthen decrease it, and bottom to top along <code>left</code> and then increase it. Repeat the whole\ncycle while <code>top</code> is at or below <code>bottom</code> and <code>left</code> is at or below\n<code>right</code>.</p>\n\n<p>Two guards are needed, both on the second half of the cycle. Once a ring has collapsed to a single\nrow, the bottom pass would walk that same row backwards and emit it twice, so run it only when\n<code>top</code> is still at or below <code>bottom</code>. The same reasoning applies to a single\ncolumn and the left pass. On a 3 by 3 grid the center letter is precisely where this bites.</p>\n\n<p>Recovering the side length from the string means a square root, so the same floating point caution\napplies as anywhere else: take the integer part and then nudge it until n times n equals the length.\nAfter that, the letter at row r and column c is <code>grid[r * n + c]</code>.</p>\n\n<p>Test the small and odd sizes rather than the big ones. A single letter, a 2 by 2, and a 3 by 3\nbetween them catch nearly every version of this bug.</p>\n",
  "hints": [
   "After reading the outside ring, the remaining letters form a smaller rectangle.",
   "Track top, bottom, left, and right boundaries. Recheck them before traversing the bottom and left sides so a center row or column is not read twice."
  ],
  "fname": "readSpiral",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>grid</code>, holding the letters of the square\ngrid row by row.</li>\n<li>The function returns a string, the letters in clockwise spiral order.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "ABCDEFGHIJKLMNOP"
    ],
    "out": "ABCDHLPONMIEFGKJ"
   },
   {
    "in": [
     "A"
    ],
    "out": "A"
   },
   {
    "in": [
     "ABCD"
    ],
    "out": "ABDC"
   }
  ],
  "tests": [
   {
    "in": [
     "ABCDEFGHIJKLMNOP"
    ],
    "out": "ABCDHLPONMIEFGKJ"
   },
   {
    "in": [
     "A"
    ],
    "out": "A"
   },
   {
    "in": [
     "ABCD"
    ],
    "out": "ABDC"
   },
   {
    "in": [
     "ABCDEFGHI"
    ],
    "out": "ABCFIHGDE"
   },
   {
    "in": [
     "ACSLACSLACSLACSLACSLACSLA"
    ],
    "out": "ACSLACSLALSCALSCSLACSCALA"
   },
   {
    "in": [
     "QWERTYUIOPASDFGHJKLZXCVBNMQWERTYUIOPASDFGHJKLZXCV"
    ],
    "out": "QWERTYUFXWOHVCXZLKJPECGIOPASDZQIGFDSARVHJKLMUYTBN"
   },
   {
    "in": [
     "AABBCCDDEEFFGGHH"
    ],
    "out": "AABBDFHHGGECCDFE"
   },
   {
    "in": [
     "ZYXWVUTSRQPONMLK"
    ],
    "out": "ZYXWSOKLMNRVUTPQ"
   },
   {
    "in": [
     "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV"
    ],
    "out": "ABCDEFGHIJTDNXHRBLVUTSRQPONMCSIYOEUKLMNOPQRSCMWGQAKJIHGFEDTJZPFVWXYZABLVFPZYXWVUKAQGHIJKUEONMLBRSTDC"
   },
   {
    "in": [
     "SQUAREONE"
    ],
    "out": "SQUEENOAR"
   },
   {
    "in": [
     "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJ"
    ],
    "out": "ABCDEFLRXDJIHGFEYSMGHIJKQWCBAZTNOPVU"
   },
   {
    "in": [
     "HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELL"
    ],
    "out": "HELLOWORWLEDRWLLEHDLROLHLOOLDHELLOLHLOOLLEHDELWRLDHEDRWOLLOORLOW"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef readSpiral(grid: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        grid = _lines[_i + 0].strip()\n        print(readSpiral(grid))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String readSpiral(String grid) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String grid = _lines.get(_i + 0);\n            _sb.append(readSpiral(grid)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring readSpiral(string grid) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string grid = _lines[_i + 0];\n        cout << readSpiral(grid) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef readSpiral(grid: str) -> str:\n\n    n = int(len(grid) ** 0.5)\n    while n * n < len(grid):\n        n += 1\n    top, bottom, left, right = 0, n - 1, 0, n - 1\n    out = []\n    while top <= bottom and left <= right:\n        for c in range(left, right + 1):\n            out.append(grid[top * n + c])\n        top += 1\n        for r in range(top, bottom + 1):\n            out.append(grid[r * n + right])\n        right -= 1\n        if top <= bottom:\n            for c in range(right, left - 1, -1):\n                out.append(grid[bottom * n + c])\n            bottom -= 1\n        if left <= right:\n            for r in range(bottom, top - 1, -1):\n                out.append(grid[r * n + left])\n            left += 1\n    return \"\".join(out)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        grid = _lines[_i + 0].strip()\n        print(readSpiral(grid))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String readSpiral(String grid) {\n\n        int n = (int) Math.sqrt((double) grid.length());\n        while (n * n < grid.length()) n++;\n        int top = 0, bottom = n - 1, left = 0, right = n - 1;\n        StringBuilder out = new StringBuilder();\n        while (top <= bottom && left <= right) {\n            for (int c = left; c <= right; c++) out.append(grid.charAt(top * n + c));\n            top++;\n            for (int r = top; r <= bottom; r++) out.append(grid.charAt(r * n + right));\n            right--;\n            if (top <= bottom) {\n                for (int c = right; c >= left; c--) out.append(grid.charAt(bottom * n + c));\n                bottom--;\n            }\n            if (left <= right) {\n                for (int r = bottom; r >= top; r--) out.append(grid.charAt(r * n + left));\n                left++;\n            }\n        }\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String grid = _lines.get(_i + 0);\n            _sb.append(readSpiral(grid)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring readSpiral(string grid) {\n\n    int n = (int) sqrt((double) grid.size());\n    while ((size_t)(n * n) < grid.size()) n++;\n    int top = 0, bottom = n - 1, left = 0, right = n - 1;\n    string out;\n    while (top <= bottom && left <= right) {\n        for (int c = left; c <= right; c++) out += grid[top * n + c];\n        top++;\n        for (int r = top; r <= bottom; r++) out += grid[r * n + right];\n        right--;\n        if (top <= bottom) {\n            for (int c = right; c >= left; c--) out += grid[bottom * n + c];\n            bottom--;\n        }\n        if (left <= right) {\n            for (int r = bottom; r >= top; r--) out += grid[r * n + left];\n            left++;\n        }\n    }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string grid = _lines[_i + 0];\n        cout << readSpiral(grid) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "roman-addition",
  "division": "Junior",
  "contest": 1,
  "title": "Roman Addition",
  "blurb": "Add two Roman numerals and write the answer back in standard form.",
  "statement": "\n<p>Roman numerals use the letters I for 1, V for 5, X for 10, L for 50, C for 100, D for 500, and\nM for 1000. A numeral is read left to right, adding as you go, except that a smaller value placed\ndirectly in front of a larger one is subtracted instead. So XL is 40 and LX is 60.</p>\n\n<p>Standard form allows exactly six subtractive pairs: IV for 4, IX for 9, XL for 40, XC for 90,\nCD for 400, and CM for 900. No other letter may be placed in front of a larger one, and no letter\nmay repeat more than three times in a row.</p>\n\n<p>Given two Roman numerals, add them and write the sum as a Roman numeral in standard form.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>XLII<br>MCMXCIX</td></tr>\n<tr><th>Output</th><td>MMXLI</td></tr>\n<tr><th>Explanation</th><td>\nXLII is XL plus I plus I, which is 40 + 1 + 1, or 42.<br>\nMCMXCIX is M plus CM plus XC plus IX, which is 1000 + 900 + 90 + 9, or 1999.<br>\nThe sum is 2041, which is written MM for 2000, XL for 40, and I for 1.\n</td></tr></table>\n",
  "input_spec": "Input a Roman numeral in standard form on the first line and a second Roman numeral in standard form on the second line.",
  "output_spec": "Output the sum as a Roman numeral in standard form.",
  "constraints": "Each input numeral has a value between 1 and 3999, inclusive, and the sum is never more than 3999.",
  "approach": "\n<p>This is two conversions with an addition in the middle, and neither conversion\nneeds a special case provided you set the tables up properly.</p>\n\n<p>Going from Roman to a number, scan left to right and compare each letter with the one after it,\nsubtracting when the current value is smaller than the next and adding otherwise. That single rule\nhandles all six subtractive pairs without your ever listing them, because a smaller value can only\nlegally sit in front of a larger one when it is one of those pairs.</p>\n\n<p>Coming back the other way is greedy, and everything depends on what goes into the table. List all\nthirteen values in descending order and give the subtractive pairs entries of their own: 1000 M, 900\nCM, 500 D, 400 CD, 100 C, 90 XC, 50 L, 40 XL, 10 X, 9 IX, 5 V, 4 IV, and 1 I. Then repeatedly take the\nlargest entry that fits and subtract it. With those six extra rows present, a plain greedy pass\nproduces standard form automatically and you never have to think about it again.</p>\n\n<p>Leave them out and the same greedy pass emits IIII for 4 and DCCCC for 900, both of which look\nreasonable enough on the page to survive a glance and fail every test case that touches them. That is\nessentially the whole difficulty of the problem.</p>\n",
  "hints": [
   "Convert both inputs to integers first. When should a Roman symbol subtract rather than add?",
   "For the output, try values from largest to smallest. Include the six subtractive pairs, such as CM for 900, in that table."
  ],
  "fname": "romanSum",
  "task": "\n<ul>\n<li>The function has 2 parameters: two strings, <code>a</code> and <code>b</code>, each a Roman\nnumeral in standard form.</li>\n<li>The function returns a string, the sum written as a Roman numeral in standard form.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "XLII",
     "MCMXCIX"
    ],
    "out": "MMXLI"
   },
   {
    "in": [
     "I",
     "I"
    ],
    "out": "II"
   },
   {
    "in": [
     "MMM",
     "CMXCIX"
    ],
    "out": "MMMCMXCIX"
   }
  ],
  "tests": [
   {
    "in": [
     "XLII",
     "MCMXCIX"
    ],
    "out": "MMXLI"
   },
   {
    "in": [
     "I",
     "I"
    ],
    "out": "II"
   },
   {
    "in": [
     "MMM",
     "CMXCIX"
    ],
    "out": "MMMCMXCIX"
   },
   {
    "in": [
     "IV",
     "VI"
    ],
    "out": "X"
   },
   {
    "in": [
     "XC",
     "X"
    ],
    "out": "C"
   },
   {
    "in": [
     "CDXLIV",
     "DLVI"
    ],
    "out": "M"
   },
   {
    "in": [
     "MCMLXXXIV",
     "XVI"
    ],
    "out": "MM"
   },
   {
    "in": [
     "III",
     "IV"
    ],
    "out": "VII"
   },
   {
    "in": [
     "MMXXV",
     "MDCCCLXXV"
    ],
    "out": "MMMCM"
   },
   {
    "in": [
     "IX",
     "I"
    ],
    "out": "X"
   },
   {
    "in": [
     "DCCCLXXXVIII",
     "MMCXI"
    ],
    "out": "MMCMXCIX"
   },
   {
    "in": [
     "XXXIX",
     "MCMLXI"
    ],
    "out": "MM"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef romanSum(a: str, b: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        a = _lines[_i + 0].strip()\n        b = _lines[_i + 1].strip()\n        print(romanSum(a, b))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String romanSum(String a, String b) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String a = _lines.get(_i + 0);\n            String b = _lines.get(_i + 1);\n            _sb.append(romanSum(a, b)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring romanSum(string a, string b) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string a = _lines[_i + 0];\n        string b = _lines[_i + 1];\n        cout << romanSum(a, b) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\n\nVALUES = [(1000, \"M\"), (900, \"CM\"), (500, \"D\"), (400, \"CD\"), (100, \"C\"), (90, \"XC\"),\n          (50, \"L\"), (40, \"XL\"), (10, \"X\"), (9, \"IX\"), (5, \"V\"), (4, \"IV\"), (1, \"I\")]\nDIGIT = {\"I\": 1, \"V\": 5, \"X\": 10, \"L\": 50, \"C\": 100, \"D\": 500, \"M\": 1000}\n\n\ndef to_int(s):\n    total = 0\n    for i, ch in enumerate(s):\n        v = DIGIT[ch]\n        if i + 1 < len(s) and v < DIGIT[s[i + 1]]:\n            total -= v\n        else:\n            total += v\n    return total\n\ndef romanSum(a: str, b: str) -> str:\n\n    n = to_int(a) + to_int(b)\n    out = \"\"\n    for value, letters in VALUES:\n        while n >= value:\n            out += letters\n            n -= value\n    return out\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        a = _lines[_i + 0].strip()\n        b = _lines[_i + 1].strip()\n        print(romanSum(a, b))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static final int[] VALS = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\n    static final String[] LETS = {\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"};\n\n    static int digit(char c) {\n        switch (c) {\n            case 'I': return 1;\n            case 'V': return 5;\n            case 'X': return 10;\n            case 'L': return 50;\n            case 'C': return 100;\n            case 'D': return 500;\n            default: return 1000;\n        }\n    }\n\n    static int toInt(String s) {\n        int total = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int v = digit(s.charAt(i));\n            if (i + 1 < s.length() && v < digit(s.charAt(i + 1))) total -= v;\n            else total += v;\n        }\n        return total;\n    }\n\n    static String romanSum(String a, String b) {\n\n        int n = toInt(a) + toInt(b);\n        StringBuilder out = new StringBuilder();\n        for (int i = 0; i < VALS.length; i++) {\n            while (n >= VALS[i]) { out.append(LETS[i]); n -= VALS[i]; }\n        }\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String a = _lines.get(_i + 0);\n            String b = _lines.get(_i + 1);\n            _sb.append(romanSum(a, b)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nstatic const int VALS[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\nstatic const char *LETS[] = {\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"};\n\nstatic int digitv(char c) {\n    switch (c) {\n        case 'I': return 1;\n        case 'V': return 5;\n        case 'X': return 10;\n        case 'L': return 50;\n        case 'C': return 100;\n        case 'D': return 500;\n        default: return 1000;\n    }\n}\n\nstatic int toInt(const string &s) {\n    int total = 0;\n    for (size_t i = 0; i < s.size(); i++) {\n        int v = digitv(s[i]);\n        if (i + 1 < s.size() && v < digitv(s[i + 1])) total -= v;\n        else total += v;\n    }\n    return total;\n}\n\nstring romanSum(string a, string b) {\n\n    int n = toInt(a) + toInt(b);\n    string out;\n    for (int i = 0; i < 13; i++) {\n        while (n >= VALS[i]) { out += LETS[i]; n -= VALS[i]; }\n    }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string a = _lines[_i + 0];\n        string b = _lines[_i + 1];\n        cout << romanSum(a, b) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "change-machine",
  "division": "Junior",
  "contest": 2,
  "title": "Change Machine",
  "blurb": "Pay out change largest coin first, and admit it when the greedy rule gets stuck.",
  "statement": "\n<p>A vending machine pays out change one coin at a time. It always reaches for the largest coin\nit still stocks that does not overshoot what it still owes, hands that out, and repeats until it\nowes nothing.</p>\n\n<p>The machine does not stock every denomination, and it does not plan ahead. If it runs out of\nchoices while it still owes money, it gives up and refuses the sale.</p>\n\n<p>Given the amount owed and the coin values the machine stocks, report how many of each coin it\npays out.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>87<br>25 10 5 1</td></tr>\n<tr><th>Output</th><td>3 1 0 2</td></tr>\n<tr><th>Explanation</th><td>\nThree 25s bring the debt from 87 down to 12.<br>\nOne 10 brings it down to 2.<br>\nA 5 would overshoot, so none are used.<br>\nTwo 1s finish it.<br>\nReporting the counts in the order the coins were listed gives 3 1 0 2.\n</td></tr></table>\n",
  "input_spec": "Input the amount owed as an integer on the first line. On the second line input the coin values the machine stocks, each separated by a single space, in descending order.",
  "output_spec": "Output the number of each coin paid out, in the same order the coin values were given, separated by single spaces. If the machine cannot pay the exact amount by this rule, output IMPOSSIBLE.",
  "constraints": "The amount owed is between 1 and 100000, inclusive. The machine stocks between 1 and 10 coin values, all positive and all distinct, given in descending order.",
  "approach": "\n<p>The loop itself is short. For each coin value in the order given, divide what\nis still owed by that value to get a count, then keep the remainder as the new amount owed. If\nanything is still owed once the values run out, the answer is IMPOSSIBLE.</p>\n\n<p>What makes this a real problem is that the greedy rule is not always optimal, and the statement\ndeliberately tells you to follow it anyway. With coins of 25, 10, 5, and 1 the greedy answer happens to\nbe optimal for every amount, which is why American change feels natural and why the flaw stays hidden.\nGive the machine only 25s and 10s and ask it for 30, and it takes the 25, is left owing 5, finds\nnothing that fits, and reports IMPOSSIBLE even though three 10s would have worked perfectly.</p>\n\n<p>Do not fix that. The machine described in the statement has no lookahead, and a solver clever enough\nto find the working combination fails the fifth test case. Implement the rule you were given rather\nthan the rule you would have written.</p>\n\n<p>One formatting trap remains. The output carries one number per coin value, including the zeros, so\nskipping a coin that was never used collapses the columns and misaligns everything after it.</p>\n",
  "hints": [
   "Follow the machine's greedy rule even when another combination of coins could work.",
   "For each denomination, integer division gives the count and the remainder gives the unpaid amount. Keep zero counts in the output."
  ],
  "fname": "makeChange",
  "task": "\n<ul>\n<li>The function has 2 parameters: an integer, <code>owed</code>, the amount to pay out, and a\nstring, <code>coins</code>, holding the coin values in descending order separated by single\nspaces.</li>\n<li>The function returns a string holding the count of each coin separated by single spaces, or\nIMPOSSIBLE.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "87",
     "25 10 5 1"
    ],
    "out": "3 1 0 2"
   },
   {
    "in": [
     "5",
     "7 3"
    ],
    "out": "IMPOSSIBLE"
   },
   {
    "in": [
     "100",
     "50 25 10 5 1"
    ],
    "out": "2 0 0 0 0"
   }
  ],
  "tests": [
   {
    "in": [
     "87",
     "25 10 5 1"
    ],
    "out": "3 1 0 2"
   },
   {
    "in": [
     "5",
     "7 3"
    ],
    "out": "IMPOSSIBLE"
   },
   {
    "in": [
     "100",
     "50 25 10 5 1"
    ],
    "out": "2 0 0 0 0"
   },
   {
    "in": [
     "1",
     "1"
    ],
    "out": "1"
   },
   {
    "in": [
     "30",
     "25 10"
    ],
    "out": "IMPOSSIBLE"
   },
   {
    "in": [
     "99",
     "25 10 5 1"
    ],
    "out": "3 2 0 4"
   },
   {
    "in": [
     "63",
     "50 20 10 5 2"
    ],
    "out": "IMPOSSIBLE"
   },
   {
    "in": [
     "6",
     "4 3 1"
    ],
    "out": "1 0 2"
   },
   {
    "in": [
     "100000",
     "10000 5000 1000 500 100 25 10 5 1"
    ],
    "out": "10 0 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "11",
     "9 6 1"
    ],
    "out": "1 0 2"
   },
   {
    "in": [
     "7",
     "5 4"
    ],
    "out": "IMPOSSIBLE"
   },
   {
    "in": [
     "4321",
     "2000 500 200 50 20 5 2"
    ],
    "out": "IMPOSSIBLE"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef makeChange(owed: int, coins: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        owed = int(_lines[_i + 0].strip())\n        coins = _lines[_i + 1].strip()\n        print(makeChange(owed, coins))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String makeChange(int owed, String coins) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int owed = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String coins = _lines.get(_i + 1);\n            _sb.append(makeChange(owed, coins)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring makeChange(int owed, string coins) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int owed = stoi(_lines[_i + 0]);\n        string coins = _lines[_i + 1];\n        cout << makeChange(owed, coins) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef makeChange(owed: int, coins: str) -> str:\n\n    left = owed\n    parts = []\n    for tok in coins.split():\n        v = int(tok)\n        parts.append(str(left // v))\n        left %= v\n    if left > 0:\n        return \"IMPOSSIBLE\"\n    return \" \".join(parts)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        owed = int(_lines[_i + 0].strip())\n        coins = _lines[_i + 1].strip()\n        print(makeChange(owed, coins))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String makeChange(int owed, String coins) {\n\n        int left = owed;\n        List<String> parts = new ArrayList<>();\n        for (String tok : coins.trim().split(\"\\\\s+\")) {\n            int v = Integer.parseInt(tok);\n            parts.add(String.valueOf(left / v));\n            left %= v;\n        }\n        if (left > 0) return \"IMPOSSIBLE\";\n        return String.join(\" \", parts);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int owed = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String coins = _lines.get(_i + 1);\n            _sb.append(makeChange(owed, coins)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring makeChange(int owed, string coins) {\n\n    int left = owed, v;\n    vector<string> parts;\n    istringstream is(coins);\n    while (is >> v) {\n        parts.push_back(to_string(left / v));\n        left %= v;\n    }\n    if (left > 0) return \"IMPOSSIBLE\";\n    string out;\n    for (size_t i = 0; i < parts.size(); i++) { if (i) out += ' '; out += parts[i]; }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int owed = stoi(_lines[_i + 0]);\n        string coins = _lines[_i + 1];\n        cout << makeChange(owed, coins) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "stamp-combinations",
  "division": "Senior",
  "contest": 1,
  "title": "Stamp Combinations",
  "blurb": "Count the ways to make exact postage when order does not matter.",
  "statement": "\n<p>A post office sells stamps in a handful of values and never runs out of any of them. A\ncustomer wants to make up an exact amount of postage on one envelope.</p>\n\n<p>Count the different ways to do it. Two ways are the same if they use the same number of each\nstamp value, so sticking a 5 and then a 2 on the envelope is the same as sticking a 2 and then a\n5. Using no stamps at all counts as the only way to make an amount of 0.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>10<br>1 2 5</td></tr>\n<tr><th>Output</th><td>10</td></tr>\n<tr><th>Explanation</th><td>\nThe ten ways, written as the count of 5s, 2s, and 1s:<br>\ntwo 5s; one 5 and two 2s and one 1; one 5 and one 2 and three 1s; one 5 and five 1s;<br>\nfive 2s; four 2s and two 1s; three 2s and four 1s; two 2s and six 1s;<br>\none 2 and eight 1s; ten 1s.\n</td></tr></table>\n",
  "input_spec": "Input the postage amount as an integer on the first line. On the second line input the stamp values, each separated by a single space.",
  "output_spec": "Output an integer, the number of distinct ways to make the exact amount.",
  "constraints": "The amount is between 0 and 300, inclusive. There are between 1 and 8 distinct stamp values, each between 1 and 300. The answer always fits in a 64 bit integer.",
  "approach": "\n<p>Recursion that tries every possible count of every stamp is correct and\nhopeless at an amount of 300. The fix is a single one dimensional table, and the order of the two loops\nis the entire problem.</p>\n\n<p>Let <code>ways[k]</code> be the number of ways to make exactly k, starting with\n<code>ways[0]</code> equal to 1 and everything else at 0. Then loop over the stamp values on the\noutside, and for each one loop k upward from that value to the amount, adding\n<code>ways[k - value]</code> into <code>ways[k]</code>.</p>\n\n<p>Putting the stamp values on the outside is what makes order irrelevant. Each value is fully absorbed\ninto the table before the next one is considered, so any given combination is built in exactly one\ncanonical order and can never be counted twice. Swap the loops so that k sits outside and you count\nordered sequences instead, which for the first sample would give 128 rather than 10.</p>\n\n<p>Running k upward rather than downward is what allows a stamp to be used more than once. Counting\ndownward would permit each value at most once, which is the answer to a genuinely different\nquestion.</p>\n\n<p>An amount of 0 has exactly one way to be made, namely the empty selection, and the initial\n<code>ways[0]</code> equal to 1 delivers that without a special case. The counts grow quickly, so keep\nthe table in 64 bit integers.</p>\n",
  "hints": [
   "Let ways[k] count combinations totaling k. There is one way to make zero: select no stamps.",
   "Process one stamp value at a time. For that value, update totals upward using ways[k - value]. This allows repeated stamps without counting different orders separately."
  ],
  "fname": "countWays",
  "task": "\n<ul>\n<li>The function has 2 parameters: an integer, <code>amount</code>, the postage to make, and a\nstring, <code>stamps</code>, holding the available stamp values separated by single spaces.</li>\n<li>The function returns an integer, the number of distinct ways.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "10",
     "1 2 5"
    ],
    "out": "10"
   },
   {
    "in": [
     "0",
     "3 7"
    ],
    "out": "1"
   },
   {
    "in": [
     "7",
     "2 4"
    ],
    "out": "0"
   }
  ],
  "tests": [
   {
    "in": [
     "10",
     "1 2 5"
    ],
    "out": "10"
   },
   {
    "in": [
     "0",
     "3 7"
    ],
    "out": "1"
   },
   {
    "in": [
     "7",
     "2 4"
    ],
    "out": "0"
   },
   {
    "in": [
     "100",
     "1 5 10 25"
    ],
    "out": "242"
   },
   {
    "in": [
     "300",
     "1 2 3"
    ],
    "out": "7651"
   },
   {
    "in": [
     "11",
     "1 2 5 10"
    ],
    "out": "12"
   },
   {
    "in": [
     "50",
     "3 7 11"
    ],
    "out": "8"
   },
   {
    "in": [
     "1",
     "2"
    ],
    "out": "0"
   },
   {
    "in": [
     "200",
     "1 2 5 10 20 50 100"
    ],
    "out": "73681"
   },
   {
    "in": [
     "17",
     "17"
    ],
    "out": "1"
   },
   {
    "in": [
     "120",
     "6 9 20"
    ],
    "out": "12"
   },
   {
    "in": [
     "250",
     "1 3 5 7 11 13 17 19"
    ],
    "out": "6578963"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef countWays(amount: int, stamps: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        amount = int(_lines[_i + 0].strip())\n        stamps = _lines[_i + 1].strip()\n        print(countWays(amount, stamps))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countWays(int amount, String stamps) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int amount = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String stamps = _lines.get(_i + 1);\n            _sb.append(countWays(amount, stamps)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countWays(int amount, string stamps) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int amount = stoi(_lines[_i + 0]);\n        string stamps = _lines[_i + 1];\n        cout << countWays(amount, stamps) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countWays(amount: int, stamps: str) -> int:\n\n    ways = [0] * (amount + 1)\n    ways[0] = 1\n    for tok in stamps.split():\n        v = int(tok)\n        for k in range(v, amount + 1):\n            ways[k] += ways[k - v]\n    return ways[amount]\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        amount = int(_lines[_i + 0].strip())\n        stamps = _lines[_i + 1].strip()\n        print(countWays(amount, stamps))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countWays(int amount, String stamps) {\n\n        long[] ways = new long[amount + 1];\n        ways[0] = 1;\n        for (String tok : stamps.trim().split(\"\\\\s+\")) {\n            int v = Integer.parseInt(tok);\n            for (int k = v; k <= amount; k++) ways[k] += ways[k - v];\n        }\n        return (int) ways[amount];\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int amount = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String stamps = _lines.get(_i + 1);\n            _sb.append(countWays(amount, stamps)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countWays(int amount, string stamps) {\n\n    vector<long long> ways(amount + 1, 0);\n    ways[0] = 1;\n    int v;\n    istringstream is(stamps);\n    while (is >> v) {\n        for (int k = v; k <= amount; k++) ways[k] += ways[k - v];\n    }\n    return (int) ways[amount];\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int amount = stoi(_lines[_i + 0]);\n        string stamps = _lines[_i + 1];\n        cout << countWays(amount, stamps) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "expression-target",
  "division": "Senior",
  "contest": 2,
  "title": "Expression Target",
  "blurb": "Wedge operators between digits, evaluate strictly left to right, and count the hits.",
  "statement": "\n<p>You are given a string of digits and a target value. Leave the digits exactly where they are\nand slot one operator into each gap between neighboring digits. The only operators allowed are\n+, &minus;, and *, and each gap must get exactly one of them.</p>\n\n<p>Evaluate the result strictly left to right, with no precedence at all. Multiplication does not\ngo first. So 1 + 2 * 3 is evaluated as 1 + 2, then times 3, which is 9.</p>\n\n<p>Count how many of the operator choices produce the target value. Two choices are different if\nany gap holds a different operator.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>6<br>123</td></tr>\n<tr><th>Output</th><td>2</td></tr>\n<tr><th>Explanation</th><td>\nThere are two gaps and three operators, so nine expressions in all:<br>\n1+2+3 is 6, 1+2&minus;3 is 0, 1+2*3 is 9, 1&minus;2+3 is 2, 1&minus;2&minus;3 is &minus;4,\n1&minus;2*3 is &minus;3, 1*2+3 is 5, 1*2&minus;3 is &minus;1, and 1*2*3 is 6.<br>\nTwo of them equal 6, so output 2.\n</td></tr></table>\n",
  "input_spec": "Input the target value as an integer on the first line and a string of digits on the second line.",
  "output_spec": "Output an integer, the number of operator choices that produce the target.",
  "constraints": "The digit string holds between 2 and 11 digits, each 0 through 9. The target is between &minus;1000000 and 1000000, inclusive.",
  "approach": "\n<p>With d digits there are d minus 1 gaps and three choices at each, giving at\nmost 3 to the tenth expressions, or 59049. That is small enough to try every one of them, and recursion\nis the cleanest way to do it.</p>\n\n<p>Write a helper taking the index of the next digit and the value accumulated so far. When the index\nreaches the end of the string, return 1 if the accumulated value equals the target and 0 otherwise.\nOtherwise return the sum of three recursive calls, one for each operator applied to the running value\nand the next digit.</p>\n\n<p>Because the evaluation is strictly left to right, that running value is the only state you need.\nThere is nothing to tokenize, no expression to build, and no precedence to worry about, which is\nexactly why the problem specifies left to right evaluation in the first place. A solver that quietly\napplies ordinary precedence gets the first sample right by luck and diverges immediately\nafterwards.</p>\n\n<p>Start the recursion at the second digit with the first digit as the running value. Starting at the\nfirst digit with a running value of 0 silently inserts a leading plus, which changes the answer the\nmoment the first operator should have been a minus.</p>\n\n<p>Intermediate values can swing far outside the target range, since a run of nines multiplied together\ngets large quickly, so keep the running value in a 64 bit integer even though the comparison at the end\nstill demands an exact match.</p>\n",
  "hints": [
   "There are only three choices in each gap. Can you try every combination while keeping a running value?",
   "Recurse on the next digit with three updated values: add, subtract, or multiply. Evaluate left to right, as the statement requires, and check the target only after the last digit."
  ],
  "fname": "countExpressions",
  "task": "\n<ul>\n<li>The function has 2 parameters: an integer, <code>target</code>, the value to hit, and a\nstring, <code>digits</code>, holding the digits in the order they must stay.</li>\n<li>The function returns an integer, the number of operator choices that reach the target.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "6",
     "123"
    ],
    "out": "2"
   },
   {
    "in": [
     "0",
     "11"
    ],
    "out": "1"
   },
   {
    "in": [
     "10",
     "2222"
    ],
    "out": "2"
   }
  ],
  "tests": [
   {
    "in": [
     "6",
     "123"
    ],
    "out": "2"
   },
   {
    "in": [
     "0",
     "11"
    ],
    "out": "1"
   },
   {
    "in": [
     "10",
     "2222"
    ],
    "out": "2"
   },
   {
    "in": [
     "100",
     "123456789"
    ],
    "out": "7"
   },
   {
    "in": [
     "0",
     "1111111111"
    ],
    "out": "2907"
   },
   {
    "in": [
     "9",
     "333"
    ],
    "out": "1"
   },
   {
    "in": [
     "-5",
     "12345"
    ],
    "out": "2"
   },
   {
    "in": [
     "720",
     "123456"
    ],
    "out": "2"
   },
   {
    "in": [
     "1",
     "10"
    ],
    "out": "2"
   },
   {
    "in": [
     "0",
     "00000"
    ],
    "out": "81"
   },
   {
    "in": [
     "45",
     "987654321"
    ],
    "out": "18"
   },
   {
    "in": [
     "24",
     "11223344"
    ],
    "out": "22"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef countExpressions(target: int, digits: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        target = int(_lines[_i + 0].strip())\n        digits = _lines[_i + 1].strip()\n        print(countExpressions(target, digits))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countExpressions(int target, String digits) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int target = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String digits = _lines.get(_i + 1);\n            _sb.append(countExpressions(target, digits)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countExpressions(int target, string digits) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int target = stoi(_lines[_i + 0]);\n        string digits = _lines[_i + 1];\n        cout << countExpressions(target, digits) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\n\ndef walk(digits, i, acc, target):\n    if i == len(digits):\n        return 1 if acc == target else 0\n    d = int(digits[i])\n    return (walk(digits, i + 1, acc + d, target)\n            + walk(digits, i + 1, acc - d, target)\n            + walk(digits, i + 1, acc * d, target))\n\ndef countExpressions(target: int, digits: str) -> int:\n\n    return walk(digits, 1, int(digits[0]), target)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        target = int(_lines[_i + 0].strip())\n        digits = _lines[_i + 1].strip()\n        print(countExpressions(target, digits))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static int walk(String digits, int i, long acc, int target) {\n        if (i == digits.length()) return acc == target ? 1 : 0;\n        long d = digits.charAt(i) - '0';\n        return walk(digits, i + 1, acc + d, target)\n             + walk(digits, i + 1, acc - d, target)\n             + walk(digits, i + 1, acc * d, target);\n    }\n\n    static int countExpressions(int target, String digits) {\n\n        return walk(digits, 1, digits.charAt(0) - '0', target);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int target = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String digits = _lines.get(_i + 1);\n            _sb.append(countExpressions(target, digits)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nstatic int walk(const string &digits, size_t i, long long acc, int target) {\n    if (i == digits.size()) return acc == target ? 1 : 0;\n    long long d = digits[i] - '0';\n    return walk(digits, i + 1, acc + d, target)\n         + walk(digits, i + 1, acc - d, target)\n         + walk(digits, i + 1, acc * d, target);\n}\n\nint countExpressions(int target, string digits) {\n\n    return walk(digits, 1, digits[0] - '0', target);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int target = stoi(_lines[_i + 0]);\n        string digits = _lines[_i + 1];\n        cout << countExpressions(target, digits) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "maze-routes",
  "division": "Senior",
  "contest": 3,
  "title": "Maze Routes",
  "blurb": "Count the ways across a blocked grid when you may only move right or down.",
  "statement": "\n<p>A delivery robot starts in the top left square of a rectangular grid and has to reach the\nbottom right square. It only ever moves one square to the right or one square down, never up and\nnever left.</p>\n\n<p>Some squares are blocked and the robot cannot enter them. Count the routes from the top left\nto the bottom right that avoid every blocked square. If the start or the finish is itself blocked,\nthere are no routes at all.</p>\n\n<p>The grid arrives as one string with the rows separated by semicolons. A period is an open\nsquare and a number sign is a blocked one. Every row has the same length.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>...;.#.;...</td></tr>\n<tr><th>Output</th><td>2</td></tr>\n<tr><th>Explanation</th><td>\nThe grid is three by three with the center blocked:\n<pre><code>. . .\n. # .\n. . .</code></pre>\nWithout the block there would be six routes. The two that survive are right, right, down, down,\nand down, down, right, right. Every other route passes through the center.\n</td></tr></table>\n",
  "input_spec": "Input one string holding the grid, with rows separated by semicolons. A period is an open square and a number sign is a blocked square.",
  "output_spec": "Output an integer, the number of routes from the top left square to the bottom right square.",
  "constraints": "The grid has between 1 and 17 rows and between 1 and 17 columns. Every row has the same length. The answer fits in a 64 bit integer.",
  "approach": "\n<p>The obvious recursion, where each square asks its right neighbor and its lower neighbor how\nmany routes they see, gives the right answer but does far too much work. It re-solves the same square\nonce for every distinct route that reaches it, so its running time grows with the number of routes\nrather than with the size of the grid, and on a 17 by 17 grid the number of routes runs into the\nbillions.</p>\n\n<p>A table fixes that. Let <code>ways[r][c]</code> hold the number of routes from the top left corner\nto that square. A blocked square gets 0, and any other square gets <code>ways[r - 1][c]</code> plus\n<code>ways[r][c - 1]</code>, treating anything off the grid as 0, since arriving from directly above\nor directly to the left are the only two possibilities. Seed <code>ways[0][0]</code> with 1 when the\nstart is open and 0 when it is blocked, fill the table row by row from the top, and the answer is the\nbottom right entry. The table fills at most 289 cells, one addition each, whatever the number of\nroutes turns out to be.</p>\n\n<p>The first row and first column are worth a moment's thought. A blocked square anywhere along the\ntop row makes every square to its right in that row unreachable, and the table produces that\nautomatically provided you set the blocked square to 0 before anything reads it. There is no need to\nspecial case the borders at all, only to guard the index.</p>\n\n<p>Splitting the input is the one piece of plumbing. Python splits on the semicolon, Java uses\n<code>split(\";\")</code>, and C++ wants <code>getline</code> on an <code>istringstream</code> with a\nsemicolon delimiter.</p>\n\n<p>A fully open 17 by 17 grid has C(32, 16) routes, which is 601,080,390: sixteen moves right and\nsixteen moves down in any order. That is the largest count the stated limits can produce and it fits\nin a signed 32 bit integer, so ordinary <code>int</code> is enough here. Reach for 64 bit storage only\nif you widen the grid, since the count grows quickly once you do.</p>\n",
  "hints": [
   "A route into an open square must come from immediately above it or immediately to its left.",
   "Add those two route counts for each open square. Blocked squares get zero. Initialize the start to one only if it is open."
  ],
  "fname": "countRoutes",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>maze</code>, holding the rows of the grid\nseparated by semicolons.</li>\n<li>The function returns an integer, the number of routes.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "...;.#.;..."
    ],
    "out": "2"
   },
   {
    "in": [
     "."
    ],
    "out": "1"
   },
   {
    "in": [
     "#.;.."
    ],
    "out": "0"
   }
  ],
  "tests": [
   {
    "in": [
     "...;.#.;..."
    ],
    "out": "2"
   },
   {
    "in": [
     "."
    ],
    "out": "1"
   },
   {
    "in": [
     "#.;.."
    ],
    "out": "0"
   },
   {
    "in": [
     "....;....;....;...."
    ],
    "out": "20"
   },
   {
    "in": [
     ".#;#."
    ],
    "out": "0"
   },
   {
    "in": [
     "..........;..........;..........;..........;.........."
    ],
    "out": "715"
   },
   {
    "in": [
     "...#...;.#...#.;...#...;.#...#.;...#..."
    ],
    "out": "4"
   },
   {
    "in": [
     "..;..;..;..;..;..;..;..;..;.."
    ],
    "out": "10"
   },
   {
    "in": [
     ".................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;.................;................."
    ],
    "out": "601080390"
   },
   {
    "in": [
     "....;.##.;.##.;...."
    ],
    "out": "2"
   },
   {
    "in": [
     "..#..;.....;#...#;.....;..#.."
    ],
    "out": "24"
   },
   {
    "in": [
     "...........;.#.#.#.#.#.;...........;.#.#.#.#.#.;...........;.#.#.#.#.#.;..........."
    ],
    "out": "56"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef countRoutes(maze: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        maze = _lines[_i + 0].strip()\n        print(countRoutes(maze))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countRoutes(String maze) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String maze = _lines.get(_i + 0);\n            _sb.append(countRoutes(maze)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countRoutes(string maze) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string maze = _lines[_i + 0];\n        cout << countRoutes(maze) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countRoutes(maze: str) -> int:\n\n    rows = maze.split(\";\")\n    h = len(rows)\n    w = len(rows[0])\n    ways = [[0] * w for _ in range(h)]\n    for r in range(h):\n        for c in range(w):\n            if rows[r][c] == \"#\":\n                ways[r][c] = 0\n            elif r == 0 and c == 0:\n                ways[r][c] = 1\n            else:\n                up = ways[r - 1][c] if r > 0 else 0\n                left = ways[r][c - 1] if c > 0 else 0\n                ways[r][c] = up + left\n    return ways[h - 1][w - 1]\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        maze = _lines[_i + 0].strip()\n        print(countRoutes(maze))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countRoutes(String maze) {\n\n        String[] rows = maze.split(\";\");\n        int h = rows.length, w = rows[0].length();\n        long[][] ways = new long[h][w];\n        for (int r = 0; r < h; r++) {\n            for (int c = 0; c < w; c++) {\n                if (rows[r].charAt(c) == '#') {\n                    ways[r][c] = 0;\n                } else if (r == 0 && c == 0) {\n                    ways[r][c] = 1;\n                } else {\n                    long up = r > 0 ? ways[r - 1][c] : 0;\n                    long left = c > 0 ? ways[r][c - 1] : 0;\n                    ways[r][c] = up + left;\n                }\n            }\n        }\n        return (int) ways[h - 1][w - 1];\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String maze = _lines.get(_i + 0);\n            _sb.append(countRoutes(maze)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countRoutes(string maze) {\n\n    vector<string> rows;\n    string row;\n    istringstream is(maze);\n    while (getline(is, row, ';')) rows.push_back(row);\n    int h = (int) rows.size(), w = (int) rows[0].size();\n    vector<vector<long long>> ways(h, vector<long long>(w, 0));\n    for (int r = 0; r < h; r++) {\n        for (int c = 0; c < w; c++) {\n            if (rows[r][c] == '#') {\n                ways[r][c] = 0;\n            } else if (r == 0 && c == 0) {\n                ways[r][c] = 1;\n            } else {\n                long long up = r > 0 ? ways[r - 1][c] : 0;\n                long long left = c > 0 ? ways[r][c - 1] : 0;\n                ways[r][c] = up + left;\n            }\n        }\n    }\n    return (int) ways[h - 1][w - 1];\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string maze = _lines[_i + 0];\n        cout << countRoutes(maze) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "number-safari",
  "division": "Senior",
  "contest": 4,
  "title": "Number Safari",
  "blurb": "Hunt five kinds of number inside the digits of a license plate.",
  "statement": "\n<p>Every summer the Ortiz family drives from Providence to Montreal, and the youngest passenger\npasses the time hunting for interesting numbers on the license plates ahead.</p>\n\n<p>You are given a license plate made of 8 digits. Consider every 2 digit, 3 digit, and 4 digit\nnumber formed by adjacent digits of the plate, reading left to right. A 2 digit number must be\nbetween 10 and 99, a 3 digit number between 100 and 999, and a 4 digit number between 1000 and\n9999, so any run that starts with a 0 is thrown out. That leaves at most 18 numbers.</p>\n\n<p>Check every one of them against these five kinds:</p>\n<ol>\n<li>A <b>Harshad</b> number is divisible by the sum of its own digits. 12 is Harshad because its\ndigits add to 3 and 12 divided by 3 is 4.</li>\n<li>A <b>palindrome</b> reads the same forwards and backwards, like 66 or 909.</li>\n<li>A <b>square</b> number is some whole number multiplied by itself, like 36 or 1024.</li>\n<li>A <b>triangular</b> number is a sum 1 + 2 + 3 + ... + k for some k. The first few are 1, 3, 6,\n10, 15, 21, 28, and 36.</li>\n<li>An <b>emirp</b> is a prime whose digits reversed give a different prime. 71 is an emirp\nbecause 71 and 17 are both prime. 101 is not, because reversing it gives 101 again.</li>\n</ol>\n\n<p>Report which kinds you found: H for Harshad, P for palindrome, S for square, T for triangular,\nand Z for emirp. List the letters in alphabetical order, once each.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>36671276</td></tr>\n<tr><th>Output</th><td>HPSTZ</td></tr>\n<tr><th>Explanation</th><td>\nThe 18 numbers are 36, 66, 67, 71, 12, 27, 76, 366, 667, 671, 712, 127, 276, 3667, 6671, 6712,\n7127, and 1276.<br>\nHarshad: 36, 12, and 27.<br>\nPalindrome: 66.<br>\nSquare: 36, which is 6 times 6.<br>\nTriangular: 36, 66, and 276.<br>\nEmirp: 71, since 17 is also prime.<br>\nAll five kinds appear, so output HPSTZ.\n</td></tr></table>\n",
  "input_spec": "Input one string of exactly 8 digits.",
  "output_spec": "Output the letters for the kinds of number found, in alphabetical order with no spaces. Output NONE if no number on the plate matches any of the five kinds.",
  "constraints": "The plate is exactly 8 characters, each a digit from 0 through 9.",
  "approach": "\n<p>This splits into two halves that never interact: build the list of candidate\nnumbers, then run five independent tests across it.</p>\n\n<p>Building the list is a double loop over the length, 2 through 4, and the starting index. Cut the\nsubstring, convert it, and keep it only if it is at or above the smallest number of that length. That\nsingle comparison is what discards any run beginning with a zero, so you never have to inspect the\nfirst character yourself. On the plate 07070707, for instance, 70 and 707 survive while 07 and 070 do\nnot.</p>\n\n<p>The tests themselves are mostly one line each. Harshad is a single modulo against the digit sum,\nand palindrome is a string compared with its own reverse. For square, take the integer square root and\nnudge it upward until r times r reaches the value, then check for equality, rather than trusting a\nfloating point square root at values near 9999. Triangular has exactly the same shape, and walking k\nupward while accumulating k times k plus 1 over 2 is easier to get right than inverting the formula,\nat this size.</p>\n\n<p>The emirp test is the only one carrying a trap, because it needs three conditions at once: the\nnumber is prime, its reversal is prime, and the reversal differs from the original. Drop that third\ncondition and every palindromic prime such as 101 or 727 qualifies, which quietly adds a Z to several\nplates. Trial division up to the square root is more than fast enough below 10000.</p>\n\n<p>Collect the letters in a set so that a kind appearing four times is still reported once, then sort\nand join. An empty set means the answer is NONE rather than an empty string.</p>\n",
  "hints": [
   "Generate each adjacent substring of length 2, 3, or 4 before testing its properties. Reject substrings that begin with zero.",
   "Write a separate predicate for each number category. A candidate can satisfy several predicates, so do not use an else-if chain between categories."
  ],
  "fname": "classifyPlate",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>plate</code>, holding the 8 digit license\nplate.</li>\n<li>The function returns a string of letters in alphabetical order, or NONE.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "36671276"
    ],
    "out": "HPSTZ"
   },
   {
    "in": [
     "68598593"
    ],
    "out": "NONE"
   },
   {
    "in": [
     "10112131"
    ],
    "out": "HPSTZ"
   }
  ],
  "tests": [
   {
    "in": [
     "36671276"
    ],
    "out": "HPSTZ"
   },
   {
    "in": [
     "68598593"
    ],
    "out": "NONE"
   },
   {
    "in": [
     "10112131"
    ],
    "out": "HPSTZ"
   },
   {
    "in": [
     "12739134"
    ],
    "out": "HTZ"
   },
   {
    "in": [
     "99999999"
    ],
    "out": "HP"
   },
   {
    "in": [
     "07070707"
    ],
    "out": "HP"
   },
   {
    "in": [
     "35895683"
    ],
    "out": "NONE"
   },
   {
    "in": [
     "31428573"
    ],
    "out": "HTZ"
   },
   {
    "in": [
     "91827364"
    ],
    "out": "HSTZ"
   },
   {
    "in": [
     "09568947"
    ],
    "out": "NONE"
   },
   {
    "in": [
     "10000001"
    ],
    "out": "HST"
   },
   {
    "in": [
     "24681012"
    ],
    "out": "HPST"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef classifyPlate(plate: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        plate = _lines[_i + 0].strip()\n        print(classifyPlate(plate))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String classifyPlate(String plate) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String plate = _lines.get(_i + 0);\n            _sb.append(classifyPlate(plate)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring classifyPlate(string plate) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string plate = _lines[_i + 0];\n        cout << classifyPlate(plate) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\n\ndef is_prime(n):\n    if n < 2:\n        return False\n    if n % 2 == 0:\n        return n == 2\n    d = 3\n    while d * d <= n:\n        if n % d == 0:\n            return False\n        d += 2\n    return True\n\ndef classifyPlate(plate: str) -> str:\n\n    nums = []\n    seen = set()\n    for length in (2, 3, 4):\n        low = 10 ** (length - 1)\n        for i in range(len(plate) - length + 1):\n            v = int(plate[i:i + length])\n            if v >= low and v not in seen:\n                seen.add(v)\n                nums.append(v)\n    found = set()\n    for v in nums:\n        s = str(v)\n        if v % sum(int(c) for c in s) == 0:\n            found.add(\"H\")\n        if s == s[::-1]:\n            found.add(\"P\")\n        r = int(v ** 0.5)\n        while r * r < v:\n            r += 1\n        if r * r == v:\n            found.add(\"S\")\n        k = 1\n        while k * (k + 1) // 2 < v:\n            k += 1\n        if k * (k + 1) // 2 == v:\n            found.add(\"T\")\n        rev = int(s[::-1])\n        if rev != v and is_prime(v) and is_prime(rev):\n            found.add(\"Z\")\n    return \"\".join(sorted(found)) if found else \"NONE\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        plate = _lines[_i + 0].strip()\n        print(classifyPlate(plate))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static boolean isPrime(int n) {\n        if (n < 2) return false;\n        if (n % 2 == 0) return n == 2;\n        for (int d = 3; d * d <= n; d += 2) if (n % d == 0) return false;\n        return true;\n    }\n\n    static String classifyPlate(String plate) {\n\n        List<Integer> nums = new ArrayList<>();\n        Set<Integer> seen = new HashSet<>();\n        for (int length = 2; length <= 4; length++) {\n            int low = (int) Math.pow(10, length - 1);\n            for (int i = 0; i + length <= plate.length(); i++) {\n                int v = Integer.parseInt(plate.substring(i, i + length));\n                if (v >= low && seen.add(v)) nums.add(v);\n            }\n        }\n        TreeSet<String> found = new TreeSet<>();\n        for (int v : nums) {\n            String s = String.valueOf(v);\n            int ds = 0;\n            for (char c : s.toCharArray()) ds += c - '0';\n            if (v % ds == 0) found.add(\"H\");\n            if (s.equals(new StringBuilder(s).reverse().toString())) found.add(\"P\");\n            int r = (int) Math.sqrt((double) v);\n            while (r * r < v) r++;\n            if (r * r == v) found.add(\"S\");\n            int k = 1;\n            while (k * (k + 1) / 2 < v) k++;\n            if (k * (k + 1) / 2 == v) found.add(\"T\");\n            int rev = Integer.parseInt(new StringBuilder(s).reverse().toString());\n            if (rev != v && isPrime(v) && isPrime(rev)) found.add(\"Z\");\n        }\n        if (found.isEmpty()) return \"NONE\";\n        return String.join(\"\", found);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String plate = _lines.get(_i + 0);\n            _sb.append(classifyPlate(plate)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nstatic bool isPrime(int n) {\n    if (n < 2) return false;\n    if (n % 2 == 0) return n == 2;\n    for (int d = 3; d * d <= n; d += 2) if (n % d == 0) return false;\n    return true;\n}\n\nstring classifyPlate(string plate) {\n\n    vector<int> nums;\n    set<int> seen;\n    for (int length = 2; length <= 4; length++) {\n        int low = 1;\n        for (int e = 1; e < length; e++) low *= 10;\n        for (size_t i = 0; i + length <= plate.size(); i++) {\n            int v = stoi(plate.substr(i, length));\n            if (v >= low && !seen.count(v)) { seen.insert(v); nums.push_back(v); }\n        }\n    }\n    set<string> found;\n    for (int v : nums) {\n        string s = to_string(v), t = s;\n        reverse(t.begin(), t.end());\n        int ds = 0;\n        for (char c : s) ds += c - '0';\n        if (v % ds == 0) found.insert(\"H\");\n        if (s == t) found.insert(\"P\");\n        int r = (int) sqrt((double) v);\n        while (r * r < v) r++;\n        if (r * r == v) found.insert(\"S\");\n        int k = 1;\n        while (k * (k + 1) / 2 < v) k++;\n        if (k * (k + 1) / 2 == v) found.insert(\"T\");\n        int rev = stoi(t);\n        if (rev != v && isPrime(v) && isPrime(rev)) found.insert(\"Z\");\n    }\n    if (found.empty()) return \"NONE\";\n    string out;\n    for (const string &f : found) out += f;\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string plate = _lines[_i + 0];\n        cout << classifyPlate(plate) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "knight-moves",
  "division": "Senior",
  "contest": 1,
  "title": "Knight Moves",
  "blurb": "Fewest knight hops between two squares of a chessboard.",
  "statement": "\n<p>A knight on a chessboard moves in an L: two squares along one direction and then one square at\na right angle to it. From the middle of the board it has eight possible destinations, and from a\ncorner only two.</p>\n\n<p>Squares are named the usual way. The file is a letter from a through h counting from the left,\nand the rank is a digit from 1 through 8 counting from the bottom, so a1 is the bottom left corner\nand h8 is the top right.</p>\n\n<p>Given a starting square and a target square, find the fewest moves a knight needs to get from\none to the other. The board is empty, so nothing blocks the way.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>a1<br>h8</td></tr>\n<tr><th>Output</th><td>6</td></tr>\n<tr><th>Explanation</th><td>\nOne shortest route is a1, b3, c5, d7, e5, f7, h8.<br>\nThat is six moves, and no route of five exists. A knight alternates square color on every move,\nand a1 and h8 are the same color, so any route between them takes an even number of moves. Four\nis not enough to cross the whole board, which leaves six.\n</td></tr></table>\n",
  "input_spec": "Input the starting square on the first line and the target square on the second line, each as a file letter from a to h followed by a rank digit from 1 to 8.",
  "output_spec": "Output an integer, the fewest knight moves from the start to the target. Output 0 if they are the same square.",
  "constraints": "Both squares are valid squares on a standard 8 by 8 board.",
  "approach": "\n<p>This is a shortest path on an unweighted graph, which means a breadth first\nsearch and nothing more sophisticated. You can attempt a formula based on the coordinate difference,\nbut the cases near the edges of the board are genuinely nasty, and a1 to b2 defeats every naive\nversion: the two squares are touching and the answer is 4.</p>\n\n<p>Set up a 64 square board, mark the starting square with a distance of 0, and push it onto a queue.\nRepeatedly pop a square, generate its eight knight destinations, and for each one that lies on the\nboard and has not been visited, record a distance one greater and push it. Stop when you pop the\ntarget. The board is tiny, so the whole search visits at most 64 squares.</p>\n\n<p>Store the eight moves as two parallel arrays of offsets, pairing plus and minus 1 with plus and\nminus 2 in both orders. Writing those out longhand is exactly where a typo hides, so generate them or\ncheck them twice.</p>\n\n<p>Converting a square name into coordinates is plain subtraction. The file is the letter minus the\nletter a, giving 0 through 7, and the rank is the digit minus the character zero, minus one more so\nthat rank 1 becomes row 0.</p>\n\n<p>Two answers are worth confirming by hand because they surprise people. The same square takes 0\nmoves rather than 1, and a1 to b2, which is a single diagonal step, takes 4, because the knight has to\nleave the corner and come back to it.</p>\n",
  "hints": [
   "All legal moves have the same cost. Explore squares one move away, then two moves away, and so on.",
   "Use a queue for breadth-first search with the eight knight offsets. Record a square's distance when first adding it, and discard destinations outside the board."
  ],
  "fname": "minMoves",
  "task": "\n<ul>\n<li>The function has 2 parameters: two strings, <code>start</code> and <code>target</code>, each\nnaming a square.</li>\n<li>The function returns an integer, the fewest moves needed.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "a1",
     "h8"
    ],
    "out": "6"
   },
   {
    "in": [
     "a1",
     "a1"
    ],
    "out": "0"
   },
   {
    "in": [
     "a1",
     "b3"
    ],
    "out": "1"
   }
  ],
  "tests": [
   {
    "in": [
     "a1",
     "h8"
    ],
    "out": "6"
   },
   {
    "in": [
     "a1",
     "a1"
    ],
    "out": "0"
   },
   {
    "in": [
     "a1",
     "b3"
    ],
    "out": "1"
   },
   {
    "in": [
     "d4",
     "e6"
    ],
    "out": "1"
   },
   {
    "in": [
     "a1",
     "b2"
    ],
    "out": "4"
   },
   {
    "in": [
     "h1",
     "a8"
    ],
    "out": "6"
   },
   {
    "in": [
     "e4",
     "e5"
    ],
    "out": "3"
   },
   {
    "in": [
     "a1",
     "c2"
    ],
    "out": "1"
   },
   {
    "in": [
     "d5",
     "d5"
    ],
    "out": "0"
   },
   {
    "in": [
     "b1",
     "g8"
    ],
    "out": "4"
   },
   {
    "in": [
     "a8",
     "h1"
    ],
    "out": "6"
   },
   {
    "in": [
     "c3",
     "f7"
    ],
    "out": "3"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef minMoves(start: str, target: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = _lines[_i + 0].strip()\n        target = _lines[_i + 1].strip()\n        print(minMoves(start, target))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int minMoves(String start, String target) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String start = _lines.get(_i + 0);\n            String target = _lines.get(_i + 1);\n            _sb.append(minMoves(start, target)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint minMoves(string start, string target) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string start = _lines[_i + 0];\n        string target = _lines[_i + 1];\n        cout << minMoves(start, target) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef minMoves(start: str, target: str) -> int:\n\n    def sq(s):\n        return (ord(s[0]) - 97, int(s[1]) - 1)\n\n    sx, sy = sq(start)\n    tx, ty = sq(target)\n    dist = [[-1] * 8 for _ in range(8)]\n    dist[sx][sy] = 0\n    queue = [(sx, sy)]\n    dx = [1, 1, -1, -1, 2, 2, -2, -2]\n    dy = [2, -2, 2, -2, 1, -1, 1, -1]\n    head = 0\n    while head < len(queue):\n        x, y = queue[head]\n        head += 1\n        if x == tx and y == ty:\n            return dist[x][y]\n        for i in range(8):\n            nx, ny = x + dx[i], y + dy[i]\n            if 0 <= nx < 8 and 0 <= ny < 8 and dist[nx][ny] < 0:\n                dist[nx][ny] = dist[x][y] + 1\n                queue.append((nx, ny))\n    return dist[tx][ty]\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = _lines[_i + 0].strip()\n        target = _lines[_i + 1].strip()\n        print(minMoves(start, target))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int minMoves(String start, String target) {\n\n        int sx = start.charAt(0) - 'a', sy = start.charAt(1) - '1';\n        int tx = target.charAt(0) - 'a', ty = target.charAt(1) - '1';\n        int[][] dist = new int[8][8];\n        for (int[] row : dist) Arrays.fill(row, -1);\n        dist[sx][sy] = 0;\n        int[] dx = {1, 1, -1, -1, 2, 2, -2, -2};\n        int[] dy = {2, -2, 2, -2, 1, -1, 1, -1};\n        Deque<int[]> queue = new ArrayDeque<>();\n        queue.add(new int[]{sx, sy});\n        while (!queue.isEmpty()) {\n            int[] cur = queue.poll();\n            int x = cur[0], y = cur[1];\n            if (x == tx && y == ty) return dist[x][y];\n            for (int i = 0; i < 8; i++) {\n                int nx = x + dx[i], ny = y + dy[i];\n                if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && dist[nx][ny] < 0) {\n                    dist[nx][ny] = dist[x][y] + 1;\n                    queue.add(new int[]{nx, ny});\n                }\n            }\n        }\n        return dist[tx][ty];\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String start = _lines.get(_i + 0);\n            String target = _lines.get(_i + 1);\n            _sb.append(minMoves(start, target)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint minMoves(string start, string target) {\n\n    int sx = start[0] - 'a', sy = start[1] - '1';\n    int tx = target[0] - 'a', ty = target[1] - '1';\n    vector<vector<int>> dist(8, vector<int>(8, -1));\n    dist[sx][sy] = 0;\n    int dx[] = {1, 1, -1, -1, 2, 2, -2, -2};\n    int dy[] = {2, -2, 2, -2, 1, -1, 1, -1};\n    deque<pair<int,int>> q;\n    q.push_back({sx, sy});\n    while (!q.empty()) {\n        auto cur = q.front();\n        q.pop_front();\n        int x = cur.first, y = cur.second;\n        if (x == tx && y == ty) return dist[x][y];\n        for (int i = 0; i < 8; i++) {\n            int nx = x + dx[i], ny = y + dy[i];\n            if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && dist[nx][ny] < 0) {\n                dist[nx][ny] = dist[x][y] + 1;\n                q.push_back({nx, ny});\n            }\n        }\n    }\n    return dist[tx][ty];\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string start = _lines[_i + 0];\n        string target = _lines[_i + 1];\n        cout << minMoves(start, target) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "shuffle-cycles",
  "division": "Senior",
  "contest": 2,
  "title": "Shuffle Cycles",
  "blurb": "Riffle a deck perfectly, over and over, until it comes back to where it started.",
  "statement": "\n<p>A perfect riffle shuffle of a deck with an even number of cards works like this. Cut the deck\nexactly in half, so the top half and the bottom half hold the same number of cards. Then rebuild\nthe deck by laying down the first card of the top half, then the first card of the bottom half,\nthen the second card of the top half, then the second card of the bottom half, and so on until\nboth halves are used up.</p>\n\n<p>The card that started on top is still on top afterwards, so the deck is scrambled but not\ncompletely. Shuffle again, and again, and eventually every card is back exactly where it began.</p>\n\n<p>Given the number of cards in the deck, report how many perfect riffle shuffles it takes to\nreturn the deck to its original order.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>8</td></tr>\n<tr><th>Output</th><td>3</td></tr>\n<tr><th>Explanation</th><td>\nNumber the cards 1 through 8 from the top.<br>\nStart: 1 2 3 4 5 6 7 8. The halves are 1 2 3 4 and 5 6 7 8.<br>\nAfter shuffle 1: 1 5 2 6 3 7 4 8.<br>\nAfter shuffle 2: 1 3 5 7 2 4 6 8.<br>\nAfter shuffle 3: 1 2 3 4 5 6 7 8, which is the original order.<br>\nThree shuffles, so output 3.\n</td></tr></table>\n",
  "input_spec": "Input a single even integer, the number of cards in the deck.",
  "output_spec": "Output an integer, the number of perfect riffle shuffles needed to restore the original order.",
  "constraints": "The deck holds between 2 and 2000 cards and the count is always even.",
  "approach": "\n<p>Simulating is the honest first answer and it is fast enough here. Build an\narray holding 0 through n minus 1, shuffle it, and compare against the original, repeating and\ncounting until the two match. Each shuffle is one pass over n cards and the number of shuffles never\ngrows large, so even a 2000 card deck finishes instantly.</p>\n\n<p>Building the shuffled deck into a second array is easier than doing it in place. Walk i from 0 to\nhalf minus 1, writing the card at position i into slot 2i and the card at position half plus i into\nslot 2i plus 1, then either copy back or swap the two arrays.</p>\n\n<p>There is a tidier fact underneath if you would rather not simulate. Under this shuffle the card at\nposition p, counting from 0, moves to position 2p modulo n minus 1, with the last card staying where\nit is. The deck therefore returns to its original order after the smallest k for which 2 to the k is\ncongruent to 1 modulo n minus 1, which for 52 cards is the multiplicative order of 2 modulo 51, or 8.\nComputing that is a short loop doubling a running value modulo n minus 1 until it reaches 1.</p>\n\n<p>Either way, check the smallest deck by hand. Two cards are unchanged by the shuffle, and since the\nquestion asks how many shuffles it takes to be back in order, doing one shuffle achieves that, so the\nanswer is 1 rather than 0.</p>\n",
  "hints": [
   "Label each card by its original position so you can recognize the original order after a shuffle.",
   "Interleave the two halves into a new deck, count that shuffle, then compare with the initial deck. The initial unshuffled state should not count as the answer."
  ],
  "fname": "shuffleCount",
  "task": "\n<ul>\n<li>The function has 1 parameter: an integer, <code>n</code>, the number of cards in the deck.</li>\n<li>The function returns an integer, the number of shuffles needed.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "8"
    ],
    "out": "3"
   },
   {
    "in": [
     "2"
    ],
    "out": "1"
   },
   {
    "in": [
     "52"
    ],
    "out": "8"
   }
  ],
  "tests": [
   {
    "in": [
     "8"
    ],
    "out": "3"
   },
   {
    "in": [
     "2"
    ],
    "out": "1"
   },
   {
    "in": [
     "52"
    ],
    "out": "8"
   },
   {
    "in": [
     "4"
    ],
    "out": "2"
   },
   {
    "in": [
     "6"
    ],
    "out": "4"
   },
   {
    "in": [
     "10"
    ],
    "out": "6"
   },
   {
    "in": [
     "24"
    ],
    "out": "11"
   },
   {
    "in": [
     "50"
    ],
    "out": "21"
   },
   {
    "in": [
     "64"
    ],
    "out": "6"
   },
   {
    "in": [
     "100"
    ],
    "out": "30"
   },
   {
    "in": [
     "1000"
    ],
    "out": "36"
   },
   {
    "in": [
     "2000"
    ],
    "out": "333"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef shuffleCount(n: int) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        print(shuffleCount(n))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int shuffleCount(int n) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(shuffleCount(n)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint shuffleCount(int n) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        cout << shuffleCount(n) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef shuffleCount(n: int) -> int:\n\n    deck = list(range(n))\n    original = list(range(n))\n    half = n // 2\n    count = 0\n    while True:\n        nxt = [0] * n\n        for i in range(half):\n            nxt[2 * i] = deck[i]\n            nxt[2 * i + 1] = deck[half + i]\n        deck = nxt\n        count += 1\n        if deck == original:\n            return count\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        print(shuffleCount(n))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int shuffleCount(int n) {\n\n        int[] deck = new int[n], original = new int[n], nxt = new int[n];\n        for (int i = 0; i < n; i++) { deck[i] = i; original[i] = i; }\n        int half = n / 2, count = 0;\n        while (true) {\n            for (int i = 0; i < half; i++) {\n                nxt[2 * i] = deck[i];\n                nxt[2 * i + 1] = deck[half + i];\n            }\n            int[] swap = deck; deck = nxt; nxt = swap;\n            count++;\n            if (Arrays.equals(deck, original)) return count;\n        }\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(shuffleCount(n)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint shuffleCount(int n) {\n\n    vector<int> deck(n), original(n), nxt(n);\n    for (int i = 0; i < n; i++) { deck[i] = i; original[i] = i; }\n    int half = n / 2, count = 0;\n    while (true) {\n        for (int i = 0; i < half; i++) {\n            nxt[2 * i] = deck[i];\n            nxt[2 * i + 1] = deck[half + i];\n        }\n        deck.swap(nxt);\n        count++;\n        if (deck == original) return count;\n    }\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        cout << shuffleCount(n) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "bowling-night",
  "division": "Junior",
  "contest": 1,
  "title": "Bowling Night",
  "blurb": "Score ten frames, where a strike is worth whatever you knock down next.",
  "statement": "\n<p>The Tuesday league at Sunset Lanes still keeps score on paper, and nobody can agree on the\narithmetic. Settle it.</p>\n\n<p>A game is ten frames. In each frame you get two rolls to knock down ten pins, and the frame is\nworth the pins you knocked down, except in two cases.</p>\n\n<p>Knock all ten down with the first roll and it is a <b>strike</b>. The frame ends immediately\nand it is worth 10 plus whatever you knock down on your next two rolls. Knock all ten down using\nboth rolls and it is a <b>spare</b>, worth 10 plus whatever you knock down on your next one\nroll.</p>\n\n<p>The tenth frame is different because there are no later frames to borrow from. Roll a strike\nor a spare there and you get extra rolls, up to three rolls in the frame, and they count only\nonce each toward the tenth frame total.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>10 7 3 9 0 10 0 8 8 2 0 6 10 10 10 8 1</td></tr>\n<tr><th>Output</th><td>167</td></tr>\n<tr><th>Explanation</th><td>\nFrame 1 is a strike, worth 10 + 7 + 3 = 20.<br>\nFrame 2 is a spare, worth 10 + 9 = 19.<br>\nFrame 3 is 9 + 0 = 9.<br>\nFrame 4 is a strike, worth 10 + 0 + 8 = 18.<br>\nFrame 5 is 0 + 8 = 8.<br>\nFrame 6 is a spare, worth 10 + 0 = 10.<br>\nFrame 7 is 0 + 6 = 6.<br>\nFrame 8 is a strike, worth 10 + 10 + 10 = 30.<br>\nFrame 9 is a strike, worth 10 + 10 + 8 = 28.<br>\nFrame 10 is a strike plus the two extra rolls, worth 10 + 8 + 1 = 19.<br>\nThose add to 167.\n</td></tr></table>\n",
  "input_spec": "Input a string of roll results, each separated by a single space. Each number is the pins knocked down by that roll.",
  "output_spec": "Output an integer, the total score for the game.",
  "constraints": "The string always describes a complete legal game of exactly ten frames, so it holds between 11 and 21 rolls.",
  "approach": "\n<p>Do not try to walk the string frame by frame, deciding as you go how many rolls\neach frame should consume. Walk it roll by roll with an index and let a frame counter do the\nwork.</p>\n\n<p>Keep an index into the list of rolls and loop exactly ten times, once per frame. On each pass, look\nat the roll sitting at the index. If it is 10 you have a strike, so add 10 plus the next two rolls and\nadvance the index by one. Otherwise look at the roll after it as well, and if the pair sums to 10 you\nhave a spare, so add 10 plus the roll after the pair and advance by two. Failing both, add the pair\nand advance by two.</p>\n\n<p>What makes this worth doing is that it handles the tenth frame with no special case whatsoever. The\nbonus rolls are already sitting in the list, so a tenth frame strike reads its two bonus rolls exactly\nas the first frame would, and the loop simply stops after ten frames without ever scoring those bonus\nrolls as frames in their own right.</p>\n\n<p>People lose this problem by writing a dedicated branch for the tenth frame and then double counting\nthe bonus rolls. If a perfect game comes out as 330 rather than 300, that is the bug you have.</p>\n\n<p>The other classic error is looking at the next two <i>frames</i> after a strike rather than the next\ntwo <i>rolls</i>. Three strikes in a row means the first borrows from two later strikes, which are\nsingle rolls sitting in different frames. Index by rolls throughout and the problem never arises.</p>\n",
  "hints": [
   "Keep a roll index separate from the frame number. A strike uses fewer rolls than an ordinary frame.",
   "For each of ten frames, add the frame's pins and any bonus from the next rolls. Bonus rolls can contribute to an earlier frame without advancing its roll index."
  ],
  "fname": "scoreGame",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>rolls</code>, holding the pins knocked down by\neach roll in order, separated by single spaces.</li>\n<li>The function returns an integer, the total score.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "10 7 3 9 0 10 0 8 8 2 0 6 10 10 10 8 1"
    ],
    "out": "167"
   },
   {
    "in": [
     "10 10 10 10 10 10 10 10 10 10 10 10"
    ],
    "out": "300"
   },
   {
    "in": [
     "9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0"
    ],
    "out": "90"
   }
  ],
  "tests": [
   {
    "in": [
     "10 7 3 9 0 10 0 8 8 2 0 6 10 10 10 8 1"
    ],
    "out": "167"
   },
   {
    "in": [
     "10 10 10 10 10 10 10 10 10 10 10 10"
    ],
    "out": "300"
   },
   {
    "in": [
     "9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0 9 0"
    ],
    "out": "90"
   },
   {
    "in": [
     "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
    ],
    "out": "0"
   },
   {
    "in": [
     "5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5"
    ],
    "out": "150"
   },
   {
    "in": [
     "10 10 10 10 10 10 10 10 10 9 1 10"
    ],
    "out": "279"
   },
   {
    "in": [
     "1 9 1 9 1 9 1 9 1 9 1 9 1 9 1 9 1 9 1 9 1"
    ],
    "out": "110"
   },
   {
    "in": [
     "10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10"
    ],
    "out": "110"
   },
   {
    "in": [
     "8 1 7 2 6 3 5 4 4 5 3 6 2 7 1 8 0 9 9 0"
    ],
    "out": "90"
   },
   {
    "in": [
     "10 10 0 0 10 10 0 0 10 10 0 0 10 10 0"
    ],
    "out": "110"
   },
   {
    "in": [
     "0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 10"
    ],
    "out": "110"
   },
   {
    "in": [
     "10 9 1 10 9 1 10 9 1 10 9 1 10 9 1 10"
    ],
    "out": "200"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef scoreGame(rolls: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        rolls = _lines[_i + 0].strip()\n        print(scoreGame(rolls))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int scoreGame(String rolls) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String rolls = _lines.get(_i + 0);\n            _sb.append(scoreGame(rolls)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint scoreGame(string rolls) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string rolls = _lines[_i + 0];\n        cout << scoreGame(rolls) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef scoreGame(rolls: str) -> int:\n\n    r = [int(x) for x in rolls.split()]\n    total = 0\n    i = 0\n    for frame in range(10):\n        if r[i] == 10:\n            total += 10 + r[i + 1] + r[i + 2]\n            i += 1\n        elif r[i] + r[i + 1] == 10:\n            total += 10 + r[i + 2]\n            i += 2\n        else:\n            total += r[i] + r[i + 1]\n            i += 2\n    return total\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        rolls = _lines[_i + 0].strip()\n        print(scoreGame(rolls))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int scoreGame(String rolls) {\n\n        String[] tok = rolls.trim().split(\"\\\\s+\");\n        int[] r = new int[tok.length];\n        for (int j = 0; j < tok.length; j++) r[j] = Integer.parseInt(tok[j]);\n        int total = 0, i = 0;\n        for (int frame = 0; frame < 10; frame++) {\n            if (r[i] == 10) {\n                total += 10 + r[i + 1] + r[i + 2];\n                i += 1;\n            } else if (r[i] + r[i + 1] == 10) {\n                total += 10 + r[i + 2];\n                i += 2;\n            } else {\n                total += r[i] + r[i + 1];\n                i += 2;\n            }\n        }\n        return total;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String rolls = _lines.get(_i + 0);\n            _sb.append(scoreGame(rolls)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint scoreGame(string rolls) {\n\n    vector<int> r;\n    int v;\n    istringstream is(rolls);\n    while (is >> v) r.push_back(v);\n    int total = 0, i = 0;\n    for (int frame = 0; frame < 10; frame++) {\n        if (r[i] == 10) {\n            total += 10 + r[i + 1] + r[i + 2];\n            i += 1;\n        } else if (r[i] + r[i + 1] == 10) {\n            total += 10 + r[i + 2];\n            i += 2;\n        } else {\n            total += r[i] + r[i + 1];\n            i += 2;\n        }\n    }\n    return total;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string rolls = _lines[_i + 0];\n        cout << scoreGame(rolls) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "hot-potato",
  "division": "Junior",
  "contest": 2,
  "title": "Hot Potato",
  "blurb": "Kids in a circle, a rhyme of a fixed length, and one survivor.",
  "statement": "\n<p>N kids sit in a circle, numbered 1 through N clockwise. Kid number 1 starts holding the\npotato.</p>\n\n<p>The counselor sings a rhyme that is K words long. The potato passes one kid clockwise on every\nword, so the kid holding it on the last word of the rhyme is out and leaves the circle. Note that\nthe kid holding the potato when the rhyme starts is counted as word one, so with a rhyme of 1 word\nthe holder is out immediately.</p>\n\n<p>The rhyme starts again with the kid clockwise from whoever just left, and it keeps going until\none kid is left. Report that kid's original number.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>7<br>3</td></tr>\n<tr><th>Output</th><td>4</td></tr>\n<tr><th>Explanation</th><td>\nCounting 1, 2, 3 from kid 1 puts the potato on kid 3, who is out.<br>\nStarting again at kid 4, the count lands on kid 6, who is out.<br>\nStarting at kid 7, the count lands on kid 2, who is out.<br>\nStarting at kid 4, the count lands on kid 7, who is out.<br>\nStarting at kid 1, the count lands on kid 5, who is out.<br>\nStarting at kid 1, the count lands on kid 1, who is out.<br>\nKid 4 is the only one left.\n</td></tr></table>\n",
  "input_spec": "Input the number of kids on the first line and the number of words in the rhyme on the second line.",
  "output_spec": "Output an integer, the original number of the last kid remaining.",
  "constraints": "There are between 1 and 5000 kids and the rhyme is between 1 and 5000 words.",
  "approach": "\n<p>Simulating with a list works and is the version to write first. Keep the children\nin a list along with an index for whoever holds the potato, and each round move that index forward by\nK minus 1 positions, wrapping with a modulo, then remove that child. After the removal the index is\nalready pointing at the next child, so no adjustment is needed except when you removed the last\nelement, where the modulo brings you back to the front.</p>\n\n<p>That minus 1 is where this goes wrong. The child holding the potato counts as word one, so a rhyme\nof three words moves the potato only two places. Get it backwards and every single answer is off.</p>\n\n<p>Removing from the middle of a list is slow, so at 5000 children the simulation performs something\nlike 12 million element shifts. It still finishes, but there is a far better way available.</p>\n\n<p>Think about it backwards. With one child, the survivor sits at position 0. If you know the surviving\nposition for a circle of size m minus 1, then adding one more child shifts that answer by K places, so\nthe position for size m is (previous + K) modulo m. Looping m from 2 up to N gives the answer in N\nsteps with no list at all, and you add 1 at the end because the children are numbered from 1 while the\npositions are numbered from 0.</p>\n\n<p>Check the edges. A single child survives without the rhyme ever finishing, and a rhyme of one word\neliminates children in the order 1, 2, 3, and so on, leaving child N.</p>\n",
  "hints": [
   "The current holder is word one. How far forward is the child eliminated after K words?",
   "With m children left, remove index (current + K - 1) modulo m. The next child now occupies that index, wrapping to zero if necessary."
  ],
  "fname": "lastPlayer",
  "task": "\n<ul>\n<li>The function has 2 parameters: an integer, <code>n</code>, the number of kids in the circle,\nand an integer, <code>k</code>, the number of words in the rhyme.</li>\n<li>The function returns an integer, the number of the surviving kid.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "7",
     "3"
    ],
    "out": "4"
   },
   {
    "in": [
     "1",
     "5"
    ],
    "out": "1"
   },
   {
    "in": [
     "5",
     "1"
    ],
    "out": "5"
   }
  ],
  "tests": [
   {
    "in": [
     "7",
     "3"
    ],
    "out": "4"
   },
   {
    "in": [
     "1",
     "5"
    ],
    "out": "1"
   },
   {
    "in": [
     "5",
     "1"
    ],
    "out": "5"
   },
   {
    "in": [
     "10",
     "2"
    ],
    "out": "5"
   },
   {
    "in": [
     "6",
     "6"
    ],
    "out": "4"
   },
   {
    "in": [
     "41",
     "3"
    ],
    "out": "31"
   },
   {
    "in": [
     "100",
     "7"
    ],
    "out": "50"
   },
   {
    "in": [
     "2",
     "1000"
    ],
    "out": "1"
   },
   {
    "in": [
     "13",
     "13"
    ],
    "out": "8"
   },
   {
    "in": [
     "1000",
     "2"
    ],
    "out": "977"
   },
   {
    "in": [
     "5000",
     "1"
    ],
    "out": "5000"
   },
   {
    "in": [
     "3125",
     "5"
    ],
    "out": "2689"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef lastPlayer(n: int, k: int) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        k = int(_lines[_i + 1].strip())\n        print(lastPlayer(n, k))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int lastPlayer(int n, int k) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int k = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(lastPlayer(n, k)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint lastPlayer(int n, int k) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        int k = stoi(_lines[_i + 1]);\n        cout << lastPlayer(n, k) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef lastPlayer(n: int, k: int) -> int:\n\n    pos = 0\n    for m in range(2, n + 1):\n        pos = (pos + k) % m\n    return pos + 1\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        k = int(_lines[_i + 1].strip())\n        print(lastPlayer(n, k))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int lastPlayer(int n, int k) {\n\n        int pos = 0;\n        for (int m = 2; m <= n; m++) pos = (pos + k) % m;\n        return pos + 1;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int k = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(lastPlayer(n, k)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint lastPlayer(int n, int k) {\n\n    int pos = 0;\n    for (int m = 2; m <= n; m++) pos = (pos + k) % m;\n    return pos + 1;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        int k = stoi(_lines[_i + 1]);\n        cout << lastPlayer(n, k) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "salvo",
  "division": "Junior",
  "contest": 3,
  "title": "Salvo",
  "blurb": "Call the shots on a hidden fleet and report hit, miss, or sunk.",
  "statement": "\n<p>Two players set up fleets on an 8 by 8 grid. Columns are lettered A through H from the left\nand rows are numbered 1 through 8 from the top, so B3 is the square in column B, row 3.</p>\n\n<p>Every ship lies in a straight line, either along one row or down one column, and is written as\nits two end squares joined by a hyphen. The ship A1-A3 fills A1, A2, and A3. The ship C5-F5 fills\nC5, D5, E5, and F5. Ships never overlap.</p>\n\n<p>Your opponent calls a sequence of squares. Report what they hear back after each one:</p>\n<ul>\n<li><b>H</b> if the shot hits a part of a ship that was still undamaged.</li>\n<li><b>S</b> if that shot was the one that finished off a ship, meaning every square of that ship\nhas now been hit.</li>\n<li><b>M</b> for anything else, including a shot at open water and a shot at a square that was\nalready hit. A wasted shot is still a miss.</li>\n</ul>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>A1-A3,C5-F5<br>A1 B1 A2 A1 A3 C5 D5 E5 F5</td></tr>\n<tr><th>Output</th><td>HMHMSHHHS</td></tr>\n<tr><th>Explanation</th><td>\nA1 hits the first ship, so H.<br>\nB1 is open water, so M.<br>\nA2 hits the first ship again, so H.<br>\nA1 was already hit, so that shot is wasted and reads M.<br>\nA3 is the last undamaged square of the first ship, so S.<br>\nC5, D5, and E5 each hit the second ship, so H, H, H.<br>\nF5 finishes the second ship, so S.\n</td></tr></table>\n",
  "input_spec": "Input the fleet on the first line as ships separated by commas, each written as two end squares joined by a hyphen. On the second line input the shots, each separated by a single space.",
  "output_spec": "Output one letter per shot, in order, with no spaces between them.",
  "constraints": "The grid is 8 by 8. There are between 1 and 5 ships, no ship overlaps another, and between 1 and 64 shots are fired.",
  "approach": "\n<p>Two halves again: turn the fleet into something you can look up by square, then walk\nthe shots.</p>\n\n<p>Give every ship an index and build a table mapping square name to ship index. Expanding a ship is\neasier than it looks, because one of the two coordinates is always fixed. Compare the two end squares:\nmatching letters mean the ship runs down a column and you loop over the digits between them, while\nmatching digits mean it runs along a row and you loop over the letters. Sort the two ends first so\nthat the loop counts upward either way, since D4-A4 describes the same ship as A4-D4.</p>\n\n<p>Alongside that, record for each ship how many of its squares are still undamaged. That number is\nwhat turns an H into an S.</p>\n\n<p>The shots are then a single pass. Look the square up. If it belongs to no ship, write M. If it\nbelongs to a ship but has already been hit, write M as well. Otherwise mark the square as hit,\nsubtract one from that ship's remaining count, and write S if the count has reached zero or H if it\nhas not.</p>\n\n<p>That already hit rule carries the whole difficulty. Without a set recording the squares you have\nfired at, a second shot at A1 reads as a fresh hit and can even sink a ship a second time, so track\nthe squares and not merely the ships.</p>\n\n<p>Converting a square name to a pair of numbers is subtraction, with the column being the letter minus\nA and the row the digit minus the character zero. You do not strictly need the numbers for the lookup,\nsince the square name works as a key, but you do need them to expand the ships.</p>\n",
  "hints": [
   "Associate each occupied square with its ship, and remember which squares have already been hit.",
   "Maintain an undamaged-square count for each ship. Decrease it only on a new hit. A hit is S when that count reaches zero, while repeated shots are M."
  ],
  "fname": "shotReport",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>fleet</code>, holding the ships separated by\ncommas, and a string, <code>shots</code>, holding the called squares separated by single\nspaces.</li>\n<li>The function returns a string of letters, one per shot.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "A1-A3,C5-F5",
     "A1 B1 A2 A1 A3 C5 D5 E5 F5"
    ],
    "out": "HMHMSHHHS"
   },
   {
    "in": [
     "D4-D4",
     "A1 D4 D4"
    ],
    "out": "MSM"
   },
   {
    "in": [
     "A1-H1",
     "A1 B1 C1 D1 E1 F1 G1 H1"
    ],
    "out": "HHHHHHHS"
   }
  ],
  "tests": [
   {
    "in": [
     "A1-A3,C5-F5",
     "A1 B1 A2 A1 A3 C5 D5 E5 F5"
    ],
    "out": "HMHMSHHHS"
   },
   {
    "in": [
     "D4-D4",
     "A1 D4 D4"
    ],
    "out": "MSM"
   },
   {
    "in": [
     "A1-H1",
     "A1 B1 C1 D1 E1 F1 G1 H1"
    ],
    "out": "HHHHHHHS"
   },
   {
    "in": [
     "B2-B5,D1-G1,H8-H8",
     "H8 B2 B3 B4 B5 D1 E1 F1 G1"
    ],
    "out": "SHHHSHHHS"
   },
   {
    "in": [
     "A1-A8",
     "A8 A7 A6 A5 A4 A3 A2 A1"
    ],
    "out": "HHHHHHHS"
   },
   {
    "in": [
     "C3-E3,C6-E6",
     "D3 D6 C3 C6 E6 E3"
    ],
    "out": "HHHHSS"
   },
   {
    "in": [
     "A1-B1,C1-D1,E1-F1,G1-H1",
     "A1 B1 C1 D1 E1 F1 G1 H1"
    ],
    "out": "HSHSHSHS"
   },
   {
    "in": [
     "F2-F7",
     "F2 F3 F4 F5 F6 A1 B2 C3 F7"
    ],
    "out": "HHHHHMMMS"
   },
   {
    "in": [
     "A4-D4",
     "E4 D4 C4 B4 A4 A4 A4"
    ],
    "out": "MHHHSMM"
   },
   {
    "in": [
     "H1-H4,A5-A8",
     "H1 A5 H2 A6 H3 A7 H4 A8"
    ],
    "out": "HHHHHHSS"
   },
   {
    "in": [
     "B7-E7",
     "B7 B7 C7 C7 D7 D7 E7 E7"
    ],
    "out": "HMHMHMSM"
   },
   {
    "in": [
     "A1-A2,C3-C4,E5-E6,G7-G8",
     "A1 C3 E5 G7 A2 C4 E6 G8"
    ],
    "out": "HHHHSSSS"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef shotReport(fleet: str, shots: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        fleet = _lines[_i + 0].strip()\n        shots = _lines[_i + 1].strip()\n        print(shotReport(fleet, shots))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String shotReport(String fleet, String shots) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String fleet = _lines.get(_i + 0);\n            String shots = _lines.get(_i + 1);\n            _sb.append(shotReport(fleet, shots)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring shotReport(string fleet, string shots) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string fleet = _lines[_i + 0];\n        string shots = _lines[_i + 1];\n        cout << shotReport(fleet, shots) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef shotReport(fleet: str, shots: str) -> str:\n\n    owner = {}\n    left = []\n    for part in fleet.split(\",\"):\n        a, b = part.split(\"-\")\n        idx = len(left)\n        squares = []\n        if a[0] == b[0]:\n            lo, hi = sorted([int(a[1]), int(b[1])])\n            for r in range(lo, hi + 1):\n                squares.append(a[0] + str(r))\n        else:\n            lo, hi = sorted([ord(a[0]), ord(b[0])])\n            for c in range(lo, hi + 1):\n                squares.append(chr(c) + a[1])\n        for sq in squares:\n            owner[sq] = idx\n        left.append(len(squares))\n    hit = set()\n    out = \"\"\n    for sq in shots.split():\n        if sq not in owner or sq in hit:\n            out += \"M\"\n        else:\n            hit.add(sq)\n            left[owner[sq]] -= 1\n            out += \"S\" if left[owner[sq]] == 0 else \"H\"\n    return out\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        fleet = _lines[_i + 0].strip()\n        shots = _lines[_i + 1].strip()\n        print(shotReport(fleet, shots))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String shotReport(String fleet, String shots) {\n\n        Map<String, Integer> owner = new HashMap<>();\n        List<Integer> left = new ArrayList<>();\n        for (String part : fleet.split(\",\")) {\n            String[] ends = part.split(\"-\");\n            String a = ends[0], b = ends[1];\n            List<String> squares = new ArrayList<>();\n            if (a.charAt(0) == b.charAt(0)) {\n                int lo = Math.min(a.charAt(1), b.charAt(1)), hi = Math.max(a.charAt(1), b.charAt(1));\n                for (int r = lo; r <= hi; r++) squares.add(\"\" + a.charAt(0) + (char) r);\n            } else {\n                int lo = Math.min(a.charAt(0), b.charAt(0)), hi = Math.max(a.charAt(0), b.charAt(0));\n                for (int c = lo; c <= hi; c++) squares.add(\"\" + (char) c + a.charAt(1));\n            }\n            for (String sq : squares) owner.put(sq, left.size());\n            left.add(squares.size());\n        }\n        Set<String> hit = new HashSet<>();\n        StringBuilder out = new StringBuilder();\n        for (String sq : shots.trim().split(\"\\s+\")) {\n            if (!owner.containsKey(sq) || hit.contains(sq)) {\n                out.append('M');\n            } else {\n                hit.add(sq);\n                int i = owner.get(sq);\n                left.set(i, left.get(i) - 1);\n                out.append(left.get(i) == 0 ? 'S' : 'H');\n            }\n        }\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String fleet = _lines.get(_i + 0);\n            String shots = _lines.get(_i + 1);\n            _sb.append(shotReport(fleet, shots)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring shotReport(string fleet, string shots) {\n\n    map<string, int> owner;\n    vector<int> left_;\n    string part;\n    istringstream fs(fleet);\n    while (getline(fs, part, ',')) {\n        size_t dash = part.find('-');\n        string a = part.substr(0, dash), b = part.substr(dash + 1);\n        vector<string> squares;\n        if (a[0] == b[0]) {\n            int lo = min(a[1], b[1]), hi = max(a[1], b[1]);\n            for (int r = lo; r <= hi; r++) squares.push_back(string(1, a[0]) + char(r));\n        } else {\n            int lo = min(a[0], b[0]), hi = max(a[0], b[0]);\n            for (int c = lo; c <= hi; c++) squares.push_back(string(1, char(c)) + a[1]);\n        }\n        for (const string &sq : squares) owner[sq] = (int) left_.size();\n        left_.push_back((int) squares.size());\n    }\n    set<string> hit;\n    string out, sq;\n    istringstream ss(shots);\n    while (ss >> sq) {\n        if (!owner.count(sq) || hit.count(sq)) {\n            out += 'M';\n        } else {\n            hit.insert(sq);\n            int i = owner[sq];\n            left_[i]--;\n            out += (left_[i] == 0 ? 'S' : 'H');\n        }\n    }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string fleet = _lines[_i + 0];\n        string shots = _lines[_i + 1];\n        cout << shotReport(fleet, shots) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "chutes-race",
  "division": "Junior",
  "contest": 4,
  "title": "The Race",
  "blurb": "Two tokens, one shared list of rolls, and a board full of ladders and slides.",
  "statement": "\n<p>The board is 100 squares in a line, numbered 1 through 100. Two players, A and B, each start\noff the board on square 0. A goes first, then B, then A again, and so on, taking rolls from a\nsingle shared list in order.</p>\n\n<p>A roll moves that player's token forward by that many squares, with three rules on top.</p>\n\n<p>If a roll would carry a token past square 100, the token does not move at all and the turn is\nwasted. A player has to land on 100 exactly.</p>\n\n<p>Some squares are the foot of a ladder or the top of a slide. Landing on one moves that token\nimmediately to the square at the other end. This happens only once per landing, so if the square\nyou are sent to is itself the start of another ladder or slide, you stay there and ignore it. The\ntwo tokens do not interact at all and may sit on the same square.</p>\n\n<p>The first player to reach square 100 wins immediately, and every remaining roll is ignored. If\nthe rolls run out with nobody on 100, the race is unfinished.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>4>14,9>31,28>84,16>6,48>26<br>4 4 6 6 5 5 2 2</td></tr>\n<tr><th>Output</th><td>NOBODY 27 27</td></tr>\n<tr><th>Explanation</th><td>\nRoll 1 goes to A, who lands on 4 and climbs the ladder to 14.<br>\nRoll 2 goes to B, who lands on 4 and climbs to 14 as well.<br>\nRoll 3 is A again, moving to 20. Roll 4 is B, moving to 20.<br>\nRolls 5 and 6 take each of them to 25, and rolls 7 and 8 take each to 27.<br>\nNeither reaches 100 and the rolls run out, so the race is unfinished and both squares are\nreported. Both tokens finish on 27.\n</td></tr></table>\n",
  "input_spec": "Input the ladders and slides on the first line, each written as the square you land on, a greater-than sign, and the square you are sent to, separated by commas. On the second line input the shared list of rolls, each separated by a single space. The first roll belongs to A.",
  "output_spec": "If a player reaches square 100, output that player's letter, a single space, and the number of the roll that did it, counting the first roll in the list as roll 1. Otherwise output NOBODY, then A's final square, then B's final square, separated by single spaces.",
  "constraints": "Squares run from 1 to 100. There are between 1 and 20 ladders and slides, no two start on the same square, and none starts on square 100. There are between 1 and 300 rolls, each from 1 to 6.",
  "approach": "\n<p>Everything the one player version needed is still here, with two positions\ninstead of one and a rule for whose turn it is.</p>\n\n<p>Keep the two squares in a two element array rather than as separate variables, because then the\nplayer taking roll number i, counting from 0, is simply <code>i % 2</code> and you index the array with\nit. Two variables and an if statement work too, but that doubles every line inside the loop and doubles\nthe chances of updating the wrong one.</p>\n\n<p>Build the jump lookup exactly as before, splitting on the comma and then on the greater-than\nsign.</p>\n\n<p>The three board rules are unchanged and still carry most of the marks. Overshooting wastes the turn\nrather than clamping, so a token on 97 rolling a 6 stays on 97. A jump happens once and is never\nchained, so a ladder that lands you on the foot of another ladder leaves you exactly where it put you.\nAnd reaching 100 ends the race immediately.</p>\n\n<p>The new trap is the roll number. The output asks for the position of the winning roll within the\nshared list, counting from 1, rather than the number of turns that player personally took, so a win on\nA's fifth turn is roll 9 and not roll 5. Break out of the loop the moment a token reaches 100 and\nreport the index you were on, converted to one based.</p>\n\n<p>When the rolls run out with nobody home, report both squares in player order with A first, whatever\ntheir sizes. A slide can leave a player behind where they started, so do not assume A's square is the\nlarger or that either token only ever moves forward.</p>\n",
  "hints": [
   "Track both positions and whose turn it is. A roll that overshoots 100 still consumes a turn.",
   "After a legal move, look up one ladder or slide destination. Apply that transfer once, then check for a win before switching players."
  ],
  "fname": "raceResult",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>jumps</code>, holding the ladders and slides\nseparated by commas, and a string, <code>rolls</code>, holding the shared rolls separated by\nsingle spaces.</li>\n<li>The function returns a string, either the winner and the roll number, or NOBODY and the two\nfinal squares.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "4>14,9>31,28>84,16>6,48>26",
     "4 4 6 6 5 5 2 2"
    ],
    "out": "NOBODY 27 27"
   },
   {
    "in": [
     "1>99",
     "1 1 1"
    ],
    "out": "A 3"
   },
   {
    "in": [
     "50>93,60>20",
     "6 1 6 1 6 1 6 1 6 1 6 1 6 1 6 1 6 1"
    ],
    "out": "NOBODY 54 9"
   }
  ],
  "tests": [
   {
    "in": [
     "4>14,9>31,28>84,16>6,48>26",
     "4 4 6 6 5 5 2 2"
    ],
    "out": "NOBODY 27 27"
   },
   {
    "in": [
     "1>99",
     "1 1 1"
    ],
    "out": "A 3"
   },
   {
    "in": [
     "50>93,60>20",
     "6 1 6 1 6 1 6 1 6 1 6 1 6 1 6 1 6 1"
    ],
    "out": "NOBODY 54 9"
   },
   {
    "in": [
     "3>21,21>42",
     "3 3 1 1 1 1"
    ],
    "out": "NOBODY 23 23"
   },
   {
    "in": [
     "98>2",
     "6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 4 4"
    ],
    "out": "A 33"
   },
   {
    "in": [
     "2>99,3>98",
     "2 3"
    ],
    "out": "NOBODY 99 98"
   },
   {
    "in": [
     "99>1,97>5",
     "6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 3 3 1 1"
    ],
    "out": "NOBODY 2 2"
   },
   {
    "in": [
     "10>90,90>10",
     "4 5 6 6 6 6"
    ],
    "out": "NOBODY 96 17"
   },
   {
    "in": [
     "16>6,47>26,49>11,56>53,62>19,64>60,87>24,93>73,95>75",
     "4 5 6 3 2 5 6 1 4 6 2 3 5 6 4 2 6 1 3 5 6 4 2 6 5 3 6 2 4 1"
    ],
    "out": "NOBODY 65 32"
   },
   {
    "in": [
     "5>25,25>45,45>65,65>85",
     "5 5 6 6 6 6 6 6"
    ],
    "out": "NOBODY 43 43"
   },
   {
    "in": [
     "1>2",
     "1"
    ],
    "out": "NOBODY 2 0"
   },
   {
    "in": [
     "70>100",
     "6 6 6 6 6 6 6 6 6 6 6 6 4 4 6 6"
    ],
    "out": "NOBODY 46 46"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef raceResult(jumps: str, rolls: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        jumps = _lines[_i + 0].strip()\n        rolls = _lines[_i + 1].strip()\n        print(raceResult(jumps, rolls))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String raceResult(String jumps, String rolls) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String jumps = _lines.get(_i + 0);\n            String rolls = _lines.get(_i + 1);\n            _sb.append(raceResult(jumps, rolls)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring raceResult(string jumps, string rolls) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string jumps = _lines[_i + 0];\n        string rolls = _lines[_i + 1];\n        cout << raceResult(jumps, rolls) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef raceResult(jumps: str, rolls: str) -> str:\n\n    dest = {}\n    for part in jumps.split(\",\"):\n        a, b = part.split(\">\")\n        dest[int(a)] = int(b)\n    pos = [0, 0]\n    tokens = rolls.split()\n    for i, tok in enumerate(tokens):\n        who = i % 2\n        step = int(tok)\n        if pos[who] + step <= 100:\n            pos[who] += step\n            if pos[who] in dest:\n                pos[who] = dest[pos[who]]\n        if pos[who] == 100:\n            return (\"A\" if who == 0 else \"B\") + \" \" + str(i + 1)\n    return \"NOBODY \" + str(pos[0]) + \" \" + str(pos[1])\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        jumps = _lines[_i + 0].strip()\n        rolls = _lines[_i + 1].strip()\n        print(raceResult(jumps, rolls))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String raceResult(String jumps, String rolls) {\n\n        Map<Integer, Integer> dest = new HashMap<>();\n        for (String part : jumps.split(\",\")) {\n            String[] ab = part.split(\">\");\n            dest.put(Integer.parseInt(ab[0]), Integer.parseInt(ab[1]));\n        }\n        int[] pos = new int[2];\n        String[] tokens = rolls.trim().split(\"\\s+\");\n        for (int i = 0; i < tokens.length; i++) {\n            int who = i % 2;\n            int step = Integer.parseInt(tokens[i]);\n            if (pos[who] + step <= 100) {\n                pos[who] += step;\n                if (dest.containsKey(pos[who])) pos[who] = dest.get(pos[who]);\n            }\n            if (pos[who] == 100) return (who == 0 ? \"A\" : \"B\") + \" \" + (i + 1);\n        }\n        return \"NOBODY \" + pos[0] + \" \" + pos[1];\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String jumps = _lines.get(_i + 0);\n            String rolls = _lines.get(_i + 1);\n            _sb.append(raceResult(jumps, rolls)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring raceResult(string jumps, string rolls) {\n\n    map<int, int> dest;\n    string part;\n    istringstream js(jumps);\n    while (getline(js, part, ',')) {\n        size_t gt = part.find('>');\n        dest[stoi(part.substr(0, gt))] = stoi(part.substr(gt + 1));\n    }\n    vector<int> pos(2, 0);\n    vector<int> tokens;\n    int step;\n    istringstream rs(rolls);\n    while (rs >> step) tokens.push_back(step);\n    for (size_t i = 0; i < tokens.size(); i++) {\n        int who = (int) (i % 2);\n        if (pos[who] + tokens[i] <= 100) {\n            pos[who] += tokens[i];\n            if (dest.count(pos[who])) pos[who] = dest[pos[who]];\n        }\n        if (pos[who] == 100) return string(who == 0 ? \"A\" : \"B\") + \" \" + to_string(i + 1);\n    }\n    return \"NOBODY \" + to_string(pos[0]) + \" \" + to_string(pos[1]);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string jumps = _lines[_i + 0];\n        string rolls = _lines[_i + 1];\n        cout << raceResult(jumps, rolls) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "yahtzee-roll",
  "division": "Junior",
  "contest": 3,
  "title": "Yahtzee Roll",
  "blurb": "Five dice, seven categories, and the highest score wins the argument.",
  "statement": "\n<p>You have rolled five dice and now you have to decide which category to claim. These are the\nseven categories and what each one pays.</p>\n\n<ol>\n<li><b>YAHTZEE</b>, all five dice showing the same number, scores 50.</li>\n<li><b>LARGESTRAIGHT</b>, five dice in a row such as 2 3 4 5 6, scores 40.</li>\n<li><b>SMALLSTRAIGHT</b>, four of the dice in a row, scores 30.</li>\n<li><b>FULLHOUSE</b>, three of one number and two of another, scores 25.</li>\n<li><b>FOUROFAKIND</b>, at least four dice showing the same number, scores the sum of all five\ndice.</li>\n<li><b>THREEOFAKIND</b>, at least three dice showing the same number, scores the sum of all five\ndice.</li>\n<li><b>CHANCE</b>, which any roll qualifies for, scores the sum of all five dice.</li>\n</ol>\n\n<p>Claim the category that pays the most. If two categories pay the same, claim whichever comes\nfirst in the list above.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>5 5 5 6 6</td></tr>\n<tr><th>Output</th><td>THREEOFAKIND 27</td></tr>\n<tr><th>Explanation</th><td>\nThe roll qualifies for FULLHOUSE, worth 25, because there are three 5s and two 6s.<br>\nIt also qualifies for THREEOFAKIND and for CHANCE, both worth the sum of the dice, which is\n27.<br>\n27 beats 25, so the full house is not the best claim. THREEOFAKIND and CHANCE tie at 27, and\nTHREEOFAKIND is listed first, so that is the answer.\n</td></tr></table>\n",
  "input_spec": "Input five dice values from 1 to 6, each separated by a single space.",
  "output_spec": "Output the name of the best category, a single space, and the score it pays.",
  "constraints": "There are always exactly five dice, each showing 1 through 6.",
  "approach": "\n<p>Count first and decide second. Build a tally of how many times each face from 1\nthrough 6 turned up, and add the five dice for the sum, because every test below reads off one or the\nother.</p>\n\n<p>Five of a kind means some face has a count of 5. Four of a kind means some count is 4 or more,\nwhich five of a kind also satisfies, and three of a kind means some count is 3 or more. A full house\nmeans one face has a count of exactly 3 while another has exactly 2.</p>\n\n<p>The straights are the only categories needing the faces in order, so take the set of distinct faces\nand look for a run. A large straight is 1 2 3 4 5 or 2 3 4 5 6, and a small straight is any four in a\nrow, meaning 1 2 3 4, or 2 3 4 5, or 3 4 5 6, appearing among the distinct faces. Checking those three\npatterns directly is both shorter and less error prone than writing a general run finder.</p>\n\n<p>Now build the list of categories you qualify for along with what each pays, walk it in the order\nthe statement gives, and keep the best. Ties resolve to the first one encountered automatically,\nprovided you only replace the current best on a strictly greater score.</p>\n\n<p>The point of the problem is that the list order is a tiebreaker rather than a priority. A full house\npays 25, but a roll of three 5s and two 6s sums to 27, so the correct claim is a category further down\nthe list. Reading the order as a priority and stopping at the first match gets the sample wrong, which\nis precisely why the sample is that roll.</p>\n\n<p>Watch the overlaps as well. Five of a kind qualifies for YAHTZEE, FOUROFAKIND, THREEOFAKIND, and\nCHANCE simultaneously, and since YAHTZEE pays 50 while five dice can never sum beyond 30, YAHTZEE\nalways wins there.</p>\n",
  "hints": [
   "Count occurrences of each face and collect the distinct faces. Those two views answer different category tests.",
   "Score every qualifying category, then keep the highest score. Process categories in the stated priority order and replace the winner only for a strictly larger score."
  ],
  "fname": "bestCategory",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>dice</code>, holding the five dice values\nseparated by single spaces.</li>\n<li>The function returns a string holding the category name and the score, separated by a single\nspace.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "5 5 5 6 6"
    ],
    "out": "THREEOFAKIND 27"
   },
   {
    "in": [
     "3 3 3 3 3"
    ],
    "out": "YAHTZEE 50"
   },
   {
    "in": [
     "1 2 3 4 6"
    ],
    "out": "SMALLSTRAIGHT 30"
   }
  ],
  "tests": [
   {
    "in": [
     "5 5 5 6 6"
    ],
    "out": "THREEOFAKIND 27"
   },
   {
    "in": [
     "3 3 3 3 3"
    ],
    "out": "YAHTZEE 50"
   },
   {
    "in": [
     "1 2 3 4 6"
    ],
    "out": "SMALLSTRAIGHT 30"
   },
   {
    "in": [
     "2 3 4 5 6"
    ],
    "out": "LARGESTRAIGHT 40"
   },
   {
    "in": [
     "6 6 6 6 2"
    ],
    "out": "FOUROFAKIND 26"
   },
   {
    "in": [
     "1 1 2 2 3"
    ],
    "out": "CHANCE 9"
   },
   {
    "in": [
     "1 1 1 2 2"
    ],
    "out": "FULLHOUSE 25"
   },
   {
    "in": [
     "6 6 6 1 1"
    ],
    "out": "FULLHOUSE 25"
   },
   {
    "in": [
     "2 3 4 5 5"
    ],
    "out": "SMALLSTRAIGHT 30"
   },
   {
    "in": [
     "1 3 5 2 4"
    ],
    "out": "LARGESTRAIGHT 40"
   },
   {
    "in": [
     "4 4 4 4 6"
    ],
    "out": "FOUROFAKIND 22"
   },
   {
    "in": [
     "1 1 1 1 2"
    ],
    "out": "FOUROFAKIND 6"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef bestCategory(dice: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        dice = _lines[_i + 0].strip()\n        print(bestCategory(dice))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String bestCategory(String dice) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String dice = _lines.get(_i + 0);\n            _sb.append(bestCategory(dice)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring bestCategory(string dice) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string dice = _lines[_i + 0];\n        cout << bestCategory(dice) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef bestCategory(dice: str) -> str:\n\n    d = [int(x) for x in dice.split()]\n    count = [0] * 7\n    for v in d:\n        count[v] += 1\n    total = sum(d)\n    faces = set(d)\n\n    cats = []\n    if 5 in count:\n        cats.append((\"YAHTZEE\", 50))\n    if faces >= {1, 2, 3, 4, 5} or faces >= {2, 3, 4, 5, 6}:\n        cats.append((\"LARGESTRAIGHT\", 40))\n    if (faces >= {1, 2, 3, 4} or faces >= {2, 3, 4, 5} or faces >= {3, 4, 5, 6}):\n        cats.append((\"SMALLSTRAIGHT\", 30))\n    if 3 in count and 2 in count:\n        cats.append((\"FULLHOUSE\", 25))\n    if max(count) >= 4:\n        cats.append((\"FOUROFAKIND\", total))\n    if max(count) >= 3:\n        cats.append((\"THREEOFAKIND\", total))\n    cats.append((\"CHANCE\", total))\n\n    best = cats[0]\n    for c in cats[1:]:\n        if c[1] > best[1]:\n            best = c\n    return best[0] + \" \" + str(best[1])\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        dice = _lines[_i + 0].strip()\n        print(bestCategory(dice))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static boolean has(Set<Integer> f, int[] want) {\n        for (int w : want) if (!f.contains(w)) return false;\n        return true;\n    }\n\n    static String bestCategory(String dice) {\n\n        String[] tok = dice.trim().split(\"\\\\s+\");\n        int[] count = new int[7];\n        int total = 0;\n        Set<Integer> faces = new HashSet<>();\n        for (String t : tok) {\n            int v = Integer.parseInt(t);\n            count[v]++;\n            total += v;\n            faces.add(v);\n        }\n        int maxCount = 0;\n        boolean hasThree = false, hasTwo = false;\n        for (int f = 1; f <= 6; f++) {\n            maxCount = Math.max(maxCount, count[f]);\n            if (count[f] == 3) hasThree = true;\n            if (count[f] == 2) hasTwo = true;\n        }\n\n        List<String> names = new ArrayList<>();\n        List<Integer> scores = new ArrayList<>();\n        if (maxCount == 5) { names.add(\"YAHTZEE\"); scores.add(50); }\n        if (has(faces, new int[]{1,2,3,4,5}) || has(faces, new int[]{2,3,4,5,6})) {\n            names.add(\"LARGESTRAIGHT\"); scores.add(40);\n        }\n        if (has(faces, new int[]{1,2,3,4}) || has(faces, new int[]{2,3,4,5})\n                || has(faces, new int[]{3,4,5,6})) {\n            names.add(\"SMALLSTRAIGHT\"); scores.add(30);\n        }\n        if (hasThree && hasTwo) { names.add(\"FULLHOUSE\"); scores.add(25); }\n        if (maxCount >= 4) { names.add(\"FOUROFAKIND\"); scores.add(total); }\n        if (maxCount >= 3) { names.add(\"THREEOFAKIND\"); scores.add(total); }\n        names.add(\"CHANCE\"); scores.add(total);\n\n        int bi = 0;\n        for (int i = 1; i < scores.size(); i++) if (scores.get(i) > scores.get(bi)) bi = i;\n        return names.get(bi) + \" \" + scores.get(bi);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String dice = _lines.get(_i + 0);\n            _sb.append(bestCategory(dice)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nstatic bool has(const set<int> &f, const vector<int> &want) {\n    for (int w : want) if (!f.count(w)) return false;\n    return true;\n}\n\nstring bestCategory(string dice) {\n\n    vector<int> count_(7, 0);\n    int total = 0, v;\n    set<int> faces;\n    istringstream is(dice);\n    while (is >> v) { count_[v]++; total += v; faces.insert(v); }\n    int maxCount = 0;\n    bool hasThree = false, hasTwo = false;\n    for (int f = 1; f <= 6; f++) {\n        maxCount = max(maxCount, count_[f]);\n        if (count_[f] == 3) hasThree = true;\n        if (count_[f] == 2) hasTwo = true;\n    }\n\n    vector<string> names;\n    vector<int> scores;\n    if (maxCount == 5) { names.push_back(\"YAHTZEE\"); scores.push_back(50); }\n    if (has(faces, {1,2,3,4,5}) || has(faces, {2,3,4,5,6})) {\n        names.push_back(\"LARGESTRAIGHT\"); scores.push_back(40);\n    }\n    if (has(faces, {1,2,3,4}) || has(faces, {2,3,4,5}) || has(faces, {3,4,5,6})) {\n        names.push_back(\"SMALLSTRAIGHT\"); scores.push_back(30);\n    }\n    if (hasThree && hasTwo) { names.push_back(\"FULLHOUSE\"); scores.push_back(25); }\n    if (maxCount >= 4) { names.push_back(\"FOUROFAKIND\"); scores.push_back(total); }\n    if (maxCount >= 3) { names.push_back(\"THREEOFAKIND\"); scores.push_back(total); }\n    names.push_back(\"CHANCE\"); scores.push_back(total);\n\n    size_t bi = 0;\n    for (size_t i = 1; i < scores.size(); i++) if (scores[i] > scores[bi]) bi = i;\n    return names[bi] + \" \" + to_string(scores[bi]);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string dice = _lines[_i + 0];\n        cout << bestCategory(dice) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "traffic-lights",
  "division": "Junior",
  "contest": 4,
  "title": "Traffic Lights",
  "blurb": "Drive a straight road and count the red lights, remembering that waiting moves you later.",
  "statement": "\n<p>A car pulls onto a straight road at position 0 at time 0 and drives at a steady speed. Every\ntraffic light on the road turns green at time 0, stays green for a set number of seconds, then\nred for a set number of seconds, and repeats that cycle all day.</p>\n\n<p>When the car reaches a light while it is green, it drives straight through without slowing\ndown. When it reaches a light while it is red, it waits at the light until the moment the light\nturns green again, then carries on at the same speed.</p>\n\n<p>Waiting matters for more than the one light. Every second spent stopped pushes the car later\nto every light after it, which changes whether those lights are green when it gets there.</p>\n\n<p>Count how many lights the car has to wait at.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>250/20/10,600/12/18,950/8/22<br>10</td></tr>\n<tr><th>Output</th><td>2</td></tr>\n<tr><th>Explanation</th><td>\nAt 10 units per second the car covers 250 units in 25 seconds. The first light runs a 30 second\ncycle, green for the first 20. At second 25 it is red, so the car waits 5 seconds and drives on\nat second 30. That is one stop.<br>\nThe second light is 600 units out, which is 60 seconds of driving, plus the 5 seconds already\nlost, so the car arrives at second 65. Its cycle is also 30 seconds, and 65 is 5 seconds into a\ncycle, which is inside the 12 second green. It drives through.<br>\nThe third light is 950 units out, so 95 seconds of driving plus 5 lost, arriving at second 100.\nThat is 10 seconds into a 30 second cycle, and this light is only green for 8, so the car waits.\nThat is the second stop.\n</td></tr></table>\n",
  "input_spec": "Input the lights on the first line, each written as its position, a slash, its green seconds, a slash, and its red seconds, with the lights separated by commas and given in increasing order of position. On the second line input the speed of the car in units per second.",
  "output_spec": "Output an integer, the number of lights the car has to wait at.",
  "constraints": "The road carries between 1 and 40 lights. Every position is a whole multiple of the speed, so the car always reaches a light on a whole second. Green and red times are between 1 and 200 seconds. The speed is between 1 and 50.",
  "approach": "\n<p>One pass over the lights, carrying a single running total of the seconds lost\nso far. That running total is the entire problem.</p>\n\n<p>For each light, the arrival time is its position divided by the speed, plus every second the car has\nalready spent waiting. The constraints promise the position divides evenly, so the arithmetic stays in\nwhole numbers and you never have to think about a car arriving half a second into a cycle.</p>\n\n<p>To read the light, take the arrival time modulo the cycle length, where the cycle is the green\nseconds plus the red seconds. Since every light turns green at time 0, that remainder tells you how far\ninto the current cycle the car has arrived. If it is less than the green time the car drives through,\nand if it is not the light is red, so count a stop and add the seconds remaining in the cycle, which is\nthe cycle length minus the remainder, to the running total.</p>\n\n<p>The mistake this problem is built around is computing every arrival time up front from the positions\nalone and then checking each light independently. That gives the right answer only for a car that never\nstops. The moment it waits at the first light, every later arrival shifts by that amount, and the sample\nis arranged so that the third light reads green if you forget and red if you do not.</p>\n\n<p>Two boundary details. Arriving at the exact second the light turns red means it is red, so compare\nwith a strict less than against the green time. Arriving at the exact second it turns green, meaning a\nremainder of 0, means it is green and the car does not stop.</p>\n\n<p>Parsing is a split on the comma and then a split on the slash, which in C++ means two nested uses of\n<code>getline</code> on an <code>istringstream</code> and in Java two calls to <code>split</code>.</p>\n",
  "hints": [
   "Arrival time includes both driving and all earlier waits. Each light repeats after green + red seconds.",
   "Take arrival time modulo the cycle length. A phase below the green duration passes through. Otherwise, wait for the remainder of the cycle and carry that delay forward."
  ],
  "fname": "countStops",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>lights</code>, describing the lights, and an\ninteger, <code>speed</code>, in units per second.</li>\n<li>The function returns an integer, the number of stops.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "250/20/10,600/12/18,950/8/22",
     "10"
    ],
    "out": "2"
   },
   {
    "in": [
     "100/10/10",
     "10"
    ],
    "out": "1"
   },
   {
    "in": [
     "100/5/5,200/5/5,300/5/5",
     "10"
    ],
    "out": "0"
   }
  ],
  "tests": [
   {
    "in": [
     "250/20/10,600/12/18,950/8/22",
     "10"
    ],
    "out": "2"
   },
   {
    "in": [
     "100/10/10",
     "10"
    ],
    "out": "1"
   },
   {
    "in": [
     "100/5/5,200/5/5,300/5/5",
     "10"
    ],
    "out": "0"
   },
   {
    "in": [
     "60/1/1,120/1/1,180/1/1,240/1/1",
     "60"
    ],
    "out": "4"
   },
   {
    "in": [
     "1000/200/1",
     "50"
    ],
    "out": "0"
   },
   {
    "in": [
     "30/2/8,60/2/8,90/2/8,120/2/8,150/2/8",
     "10"
    ],
    "out": "5"
   },
   {
    "in": [
     "25/3/7,50/3/7,75/3/7,100/3/7",
     "5"
    ],
    "out": "4"
   },
   {
    "in": [
     "500/10/20,1000/10/20,1500/10/20",
     "25"
    ],
    "out": "3"
   },
   {
    "in": [
     "10/1/199,20/1/199",
     "10"
    ],
    "out": "2"
   },
   {
    "in": [
     "120/30/30,240/30/30,360/30/30,480/30/30",
     "12"
    ],
    "out": "1"
   },
   {
    "in": [
     "45/9/6,90/9/6,135/9/6,180/9/6,225/9/6,270/9/6",
     "9"
    ],
    "out": "3"
   },
   {
    "in": [
     "200/4/16,400/4/16,600/4/16,800/4/16,1000/4/16",
     "20"
    ],
    "out": "5"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef countStops(lights: str, speed: int) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        lights = _lines[_i + 0].strip()\n        speed = int(_lines[_i + 1].strip())\n        print(countStops(lights, speed))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countStops(String lights, int speed) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String lights = _lines.get(_i + 0);\n            int speed = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(countStops(lights, speed)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countStops(string lights, int speed) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string lights = _lines[_i + 0];\n        int speed = stoi(_lines[_i + 1]);\n        cout << countStops(lights, speed) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countStops(lights: str, speed: int) -> int:\n\n    waited = 0\n    stops = 0\n    for part in lights.split(\",\"):\n        pos, green, red = [int(x) for x in part.split(\"/\")]\n        cycle = green + red\n        arrive = pos // speed + waited\n        phase = arrive % cycle\n        if phase >= green:\n            stops += 1\n            waited += cycle - phase\n    return stops\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        lights = _lines[_i + 0].strip()\n        speed = int(_lines[_i + 1].strip())\n        print(countStops(lights, speed))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countStops(String lights, int speed) {\n\n        int waited = 0, stops = 0;\n        for (String part : lights.split(\",\")) {\n            String[] f = part.split(\"/\");\n            int pos = Integer.parseInt(f[0]), green = Integer.parseInt(f[1]), red = Integer.parseInt(f[2]);\n            int cycle = green + red;\n            int arrive = pos / speed + waited;\n            int phase = arrive % cycle;\n            if (phase >= green) {\n                stops++;\n                waited += cycle - phase;\n            }\n        }\n        return stops;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String lights = _lines.get(_i + 0);\n            int speed = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(countStops(lights, speed)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countStops(string lights, int speed) {\n\n    int waited = 0, stops = 0;\n    string part;\n    istringstream ls(lights);\n    while (getline(ls, part, ',')) {\n        for (char &ch : part) if (ch == '/') ch = ' ';\n        istringstream ps(part);\n        int pos, green, red;\n        ps >> pos >> green >> red;\n        int cycle = green + red;\n        int arrive = pos / speed + waited;\n        int phase = arrive % cycle;\n        if (phase >= green) {\n            stops++;\n            waited += cycle - phase;\n        }\n    }\n    return stops;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string lights = _lines[_i + 0];\n        int speed = stoi(_lines[_i + 1]);\n        cout << countStops(lights, speed) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "card-war",
  "division": "Senior",
  "contest": 3,
  "title": "Card War",
  "blurb": "Two decks, one card each per round, and ties burn both cards.",
  "statement": "\n<p>Two players each hold a deck of cards face down. A card is a number from 2 to 14, where 11 is a\njack, 12 a queen, 13 a king, and 14 an ace.</p>\n\n<p>Every round both players turn over the card on top of their deck.</p>\n\n<p>If one card is higher, that player takes both cards and puts them on the bottom of their own\ndeck, their own card first and the loser's card second. If the two cards are equal, both cards are\nburned and leave the game entirely.</p>\n\n<p>A player loses when their deck becomes empty. Play continues until that happens to one of them,\nor until 500 rounds have been played.</p>\n\n<p>Both decks can become empty after the same round, when the two cards were equal and each player\nhad one card left. That is a draw, not a loss for either player.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>5 9 2<br>5 3 14</td></tr>\n<tr><th>Output</th><td>B 7</td></tr>\n<tr><th>Explanation</th><td>\nRound 1: both play a 5, so both cards burn. A holds 9 2, B holds 3 14.<br>\nRound 2: 9 beats 3, so A puts 9 then 3 on the bottom. A holds 2 9 3, B holds 14.<br>\nRound 3: 14 beats 2, so B puts 14 then 2 on the bottom. A holds 9 3, B holds 14 2.<br>\nRound 4: 14 beats 9. A holds 3, B holds 2 14 9.<br>\nRound 5: 3 beats 2. A holds 3 2, B holds 14 9.<br>\nRound 6: 14 beats 3. A holds 2, B holds 9 14 3.<br>\nRound 7: 9 beats 2, and A is out of cards. B wins on round 7.\n</td></tr></table>\n",
  "input_spec": "Input player A's deck on the first line and player B's deck on the second line, each as card values from top to bottom separated by single spaces.",
  "output_spec": "Output the winner's letter and the number of the round that ended the game, separated by a single space. Output DRAW and the round number if both decks empty on the same round. Output TIMEOUT if 500 rounds pass with both players still holding cards.",
  "constraints": "Each deck starts with between 1 and 26 cards, each from 2 to 14.",
  "approach": "\n<p>Two queues and a loop. Take from the front, add to the back, and everything else\nfollows from the rules as written.</p>\n\n<p>Use a structure that is cheap at both ends: an <code>ArrayDeque</code> in Java, a\n<code>deque</code> in C++, and either <code>collections.deque</code> or a plain list in Python, since\nat 26 cards and 500 rounds the cost of popping the front of a list is negligible.</p>\n\n<p>Check the stopping conditions each round after the cards have been played rather than before, and\ncount carefully, because the round that empties a deck is the round that ends the game and is therefore\nthe number to report.</p>\n\n<p>The order in which the winner returns the two cards matters, and it is what makes the game finite or\nnot: winner's card first, then the loser's. Reverse it and you have a different but equally\ndeterministic game with different answers throughout.</p>\n\n<p>The burn on a tie is what makes draws possible, since both cards leave the game entirely and the\ntotal number of cards in play shrinks. Two decks of identical cards burn down in step and empty on the\nsame round, which is exactly what the DRAW case exists for, and the tenth test is that situation.</p>\n\n<p>The cap exists because this game genuinely can run forever. Two decks that trade the same cards back\nand forth in a cycle never terminate, so count the rounds and stop at 500. Reporting TIMEOUT is a\ncorrect answer rather than an admission of failure.</p>\n",
  "hints": [
   "Each deck is a queue: cards leave from the front and won cards join the back.",
   "Append the winner's own card before the loser's card, and discard ties. Check both decks after each round so simultaneous empty decks produce a draw."
  ],
  "fname": "playWar",
  "task": "\n<ul>\n<li>The function has 2 parameters: two strings, <code>deckA</code> and <code>deckB</code>, holding\neach player's cards from top to bottom separated by single spaces.</li>\n<li>The function returns a string holding the result and the round number, or TIMEOUT.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "5 9 2",
     "5 3 14"
    ],
    "out": "B 7"
   },
   {
    "in": [
     "14",
     "2"
    ],
    "out": "A 1"
   },
   {
    "in": [
     "7",
     "7"
    ],
    "out": "DRAW 1"
   }
  ],
  "tests": [
   {
    "in": [
     "5 9 2",
     "5 3 14"
    ],
    "out": "B 7"
   },
   {
    "in": [
     "14",
     "2"
    ],
    "out": "A 1"
   },
   {
    "in": [
     "7",
     "7"
    ],
    "out": "DRAW 1"
   },
   {
    "in": [
     "2 3 4",
     "5 6 7"
    ],
    "out": "B 3"
   },
   {
    "in": [
     "14 14 14 14",
     "2 2 2 2"
    ],
    "out": "A 4"
   },
   {
    "in": [
     "10 10",
     "10 10"
    ],
    "out": "DRAW 2"
   },
   {
    "in": [
     "2 4 6 8 10 12 14",
     "3 5 7 9 11 13 2"
    ],
    "out": "A 45"
   },
   {
    "in": [
     "9 8 7 6 5",
     "5 6 7 8 9"
    ],
    "out": "DRAW 17"
   },
   {
    "in": [
     "14 13 12 11",
     "11 12 13 14"
    ],
    "out": "DRAW 16"
   },
   {
    "in": [
     "2 2 2 2 2 2 2 2 2 2 2 2 2",
     "2 2 2 2 2 2 2 2 2 2 2 2 2"
    ],
    "out": "DRAW 13"
   },
   {
    "in": [
     "6 6 6 7",
     "6 6 6 5"
    ],
    "out": "A 4"
   },
   {
    "in": [
     "3 4 5 6 7 8 9 10 11 12 13 14 2",
     "14 13 12 11 10 9 8 7 6 5 4 3 2"
    ],
    "out": "DRAW 65"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef playWar(deckA: str, deckB: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        deckA = _lines[_i + 0].strip()\n        deckB = _lines[_i + 1].strip()\n        print(playWar(deckA, deckB))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String playWar(String deckA, String deckB) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String deckA = _lines.get(_i + 0);\n            String deckB = _lines.get(_i + 1);\n            _sb.append(playWar(deckA, deckB)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring playWar(string deckA, string deckB) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string deckA = _lines[_i + 0];\n        string deckB = _lines[_i + 1];\n        cout << playWar(deckA, deckB) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef playWar(deckA: str, deckB: str) -> str:\n\n    a = [int(x) for x in deckA.split()]\n    b = [int(x) for x in deckB.split()]\n    for rnd in range(1, 501):\n        ca = a.pop(0)\n        cb = b.pop(0)\n        if ca > cb:\n            a.append(ca)\n            a.append(cb)\n        elif cb > ca:\n            b.append(cb)\n            b.append(ca)\n        if not a and not b:\n            return \"DRAW \" + str(rnd)\n        if not a:\n            return \"B \" + str(rnd)\n        if not b:\n            return \"A \" + str(rnd)\n    return \"TIMEOUT\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        deckA = _lines[_i + 0].strip()\n        deckB = _lines[_i + 1].strip()\n        print(playWar(deckA, deckB))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String playWar(String deckA, String deckB) {\n\n        Deque<Integer> a = new ArrayDeque<>(), b = new ArrayDeque<>();\n        for (String t : deckA.trim().split(\"\\s+\")) a.addLast(Integer.parseInt(t));\n        for (String t : deckB.trim().split(\"\\s+\")) b.addLast(Integer.parseInt(t));\n        for (int rnd = 1; rnd <= 500; rnd++) {\n            int ca = a.pollFirst(), cb = b.pollFirst();\n            if (ca > cb) { a.addLast(ca); a.addLast(cb); }\n            else if (cb > ca) { b.addLast(cb); b.addLast(ca); }\n            if (a.isEmpty() && b.isEmpty()) return \"DRAW \" + rnd;\n            if (a.isEmpty()) return \"B \" + rnd;\n            if (b.isEmpty()) return \"A \" + rnd;\n        }\n        return \"TIMEOUT\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String deckA = _lines.get(_i + 0);\n            String deckB = _lines.get(_i + 1);\n            _sb.append(playWar(deckA, deckB)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring playWar(string deckA, string deckB) {\n\n    deque<int> a, b;\n    int v;\n    istringstream as(deckA), bs(deckB);\n    while (as >> v) a.push_back(v);\n    while (bs >> v) b.push_back(v);\n    for (int rnd = 1; rnd <= 500; rnd++) {\n        int ca = a.front(); a.pop_front();\n        int cb = b.front(); b.pop_front();\n        if (ca > cb) { a.push_back(ca); a.push_back(cb); }\n        else if (cb > ca) { b.push_back(cb); b.push_back(ca); }\n        if (a.empty() && b.empty()) return \"DRAW \" + to_string(rnd);\n        if (a.empty()) return \"B \" + to_string(rnd);\n        if (b.empty()) return \"A \" + to_string(rnd);\n    }\n    return \"TIMEOUT\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string deckA = _lines[_i + 0];\n        string deckB = _lines[_i + 1];\n        cout << playWar(deckA, deckB) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "robot-vacuum",
  "division": "Senior",
  "contest": 4,
  "title": "Robot Vacuum",
  "blurb": "A dumb robot that only knows how to go forward or turn right.",
  "statement": "\n<p>A robot vacuum sits on a rectangular floor plan. A period is open floor, a number sign is a\nwall it cannot enter, and the letter R marks the square it starts on. It begins facing north,\nmeaning toward the top of the plan.</p>\n\n<p>The robot has exactly one behavior, and it repeats it once per step. It looks at the square\ndirectly ahead of it. If that square is inside the plan and is not a wall, it drives into that\nsquare. Otherwise it stays put and turns 90 degrees to its right, from north to east, east to\nsouth, south to west, and west back to north. Either way, that used up one step.</p>\n\n<p>Every square the robot occupies gets cleaned, including the one it starts on. Driving over a\nsquare it has already cleaned is fine and does not clean it twice.</p>\n\n<p>Run the robot for the given number of steps and report how many different squares it cleaned\nand which way it ends up facing.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>...;.R.;...<br>6</td></tr>\n<tr><th>Output</th><td>5 S</td></tr>\n<tr><th>Explanation</th><td>\nThe robot starts in the center of the 3 by 3 plan facing north. That square counts as cleaned, so\nthe tally starts at 1.<br>\nStep 1 drives north to the top middle square. Tally 2.<br>\nStep 2 finds the edge of the plan ahead, so the robot turns to face east.<br>\nStep 3 drives east to the top right corner. Tally 3.<br>\nStep 4 finds the edge ahead again, so it turns to face south.<br>\nStep 5 drives south to the middle right square. Tally 4.<br>\nStep 6 drives south again to the bottom right corner. Tally 5.<br>\nSix steps are up. Five squares were cleaned and the robot is still facing south.\n</td></tr></table>\n",
  "input_spec": "Input the floor plan on the first line, with rows separated by semicolons, where a period is floor, a number sign is a wall, and R is the robot's starting square. On the second line input the number of steps to run.",
  "output_spec": "Output the number of different squares the robot cleaned, a single space, and the direction it faces at the end, written as N, E, S, or W.",
  "constraints": "The plan has between 1 and 25 rows and between 1 and 25 columns, every row is the same length, and there is exactly one R. The robot runs for between 1 and 100000 steps.",
  "approach": "\n<p>Model the robot as a position and a facing index, then let one small table do\nall the direction work.</p>\n\n<p>Store the four directions in the order north, east, south, west, so that turning right is adding one\nand taking the remainder on 4. Put the row and column offsets in two parallel arrays in that same\norder, with north as row minus one, east as column plus one, south as row plus one, and west as column\nminus one. Once that is set up, the entire step is four lines and there is no switch statement\nanywhere in the program.</p>\n\n<p>Keep the cleaned squares in a set, or in a grid of booleans alongside a counter, and mark the\nstarting square before the loop begins. Forgetting that starting square is the most common way to\nfinish exactly one low.</p>\n\n<p>Each step, work out the square directly ahead. If its row and column both lie inside the plan and it\nis not a wall, move there and mark it, and otherwise advance the facing. Both branches consume a step,\nso the body always runs exactly once per step.</p>\n\n<p>The step count can reach 100000, which is far more than the robot needs on a plan of at most 625\nsquares, so most tests run long after it has settled into a repeating circuit. The loop is cheap enough\nthat this does not matter, but it does mean you cannot stop early merely because no new square was\ncleaned, since the final facing still depends on the exact number of steps.</p>\n\n<p>Two edge cases are worth checking by hand. A plan consisting of a single square leaves the robot\nturning on the spot forever, cleaning exactly one square, with its final facing cycling with a period\nof four, and a robot boxed in by walls behaves identically.</p>\n",
  "hints": [
   "Position and direction are separate state. A blocked step changes only the direction.",
   "Use four direction offsets in clockwise order. Track cleaned positions in a set starting with R, and count a turn as one step without moving."
  ],
  "fname": "cleanReport",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>plan</code>, holding the rows separated by\nsemicolons, and an integer, <code>steps</code>, the number of steps to run.</li>\n<li>The function returns a string holding the number of squares cleaned and the final facing,\nseparated by a single space.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "...;.R.;...",
     "6"
    ],
    "out": "5 S"
   },
   {
    "in": [
     "R",
     "10"
    ],
    "out": "1 S"
   },
   {
    "in": [
     "R#;..",
     "4"
    ],
    "out": "2 W"
   }
  ],
  "tests": [
   {
    "in": [
     "...;.R.;...",
     "6"
    ],
    "out": "5 S"
   },
   {
    "in": [
     "R",
     "10"
    ],
    "out": "1 S"
   },
   {
    "in": [
     "R#;..",
     "4"
    ],
    "out": "2 W"
   },
   {
    "in": [
     "R....;.....;.....;.....;.....",
     "20"
    ],
    "out": "16 N"
   },
   {
    "in": [
     "#####;#R.#;#..#;#####",
     "12"
    ],
    "out": "4 S"
   },
   {
    "in": [
     "R",
     "100000"
    ],
    "out": "1 N"
   },
   {
    "in": [
     "..........;..........;....R.....;..........;..........",
     "100"
    ],
    "out": "28 S"
   },
   {
    "in": [
     "R#########;##########",
     "3"
    ],
    "out": "1 W"
   },
   {
    "in": [
     ".....;.###.;.#R#.;.###.;.....",
     "8"
    ],
    "out": "1 N"
   },
   {
    "in": [
     "R.........",
     "100000"
    ],
    "out": "10 E"
   },
   {
    "in": [
     "R........;.#######.;.#.....#.;.#.###.#.;.#.#R#.#.;.#.###.#.;.#.....#.;.#######.;.........",
     "500"
    ],
    "out": "1 N"
   },
   {
    "in": [
     "####;#R.#;#.##;####",
     "100000"
    ],
    "out": "2 W"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef cleanReport(plan: str, steps: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        plan = _lines[_i + 0].strip()\n        steps = int(_lines[_i + 1].strip())\n        print(cleanReport(plan, steps))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String cleanReport(String plan, int steps) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String plan = _lines.get(_i + 0);\n            int steps = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(cleanReport(plan, steps)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring cleanReport(string plan, int steps) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string plan = _lines[_i + 0];\n        int steps = stoi(_lines[_i + 1]);\n        cout << cleanReport(plan, steps) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef cleanReport(plan: str, steps: int) -> str:\n\n    grid = plan.split(\";\")\n    h, w = len(grid), len(grid[0])\n    r = c = 0\n    for i in range(h):\n        j = grid[i].find(\"R\")\n        if j >= 0:\n            r, c = i, j\n    dr = [-1, 0, 1, 0]\n    dc = [0, 1, 0, -1]\n    face = 0\n    seen = {(r, c)}\n    for _ in range(steps):\n        nr, nc = r + dr[face], c + dc[face]\n        if 0 <= nr < h and 0 <= nc < w and grid[nr][nc] != \"#\":\n            r, c = nr, nc\n            seen.add((r, c))\n        else:\n            face = (face + 1) % 4\n    return str(len(seen)) + \" \" + \"NESW\"[face]\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        plan = _lines[_i + 0].strip()\n        steps = int(_lines[_i + 1].strip())\n        print(cleanReport(plan, steps))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String cleanReport(String plan, int steps) {\n\n        String[] grid = plan.split(\";\");\n        int h = grid.length, w = grid[0].length();\n        int r = 0, c = 0;\n        for (int i = 0; i < h; i++) {\n            int j = grid[i].indexOf('R');\n            if (j >= 0) { r = i; c = j; }\n        }\n        int[] dr = {-1, 0, 1, 0};\n        int[] dc = {0, 1, 0, -1};\n        int face = 0;\n        Set<Integer> seen = new HashSet<>();\n        seen.add(r * 100 + c);\n        for (int s = 0; s < steps; s++) {\n            int nr = r + dr[face], nc = c + dc[face];\n            if (nr >= 0 && nr < h && nc >= 0 && nc < w && grid[nr].charAt(nc) != '#') {\n                r = nr; c = nc;\n                seen.add(r * 100 + c);\n            } else {\n                face = (face + 1) % 4;\n            }\n        }\n        return seen.size() + \" \" + \"NESW\".charAt(face);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String plan = _lines.get(_i + 0);\n            int steps = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(cleanReport(plan, steps)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring cleanReport(string plan, int steps) {\n\n    vector<string> grid;\n    string row;\n    istringstream is(plan);\n    while (getline(is, row, ';')) grid.push_back(row);\n    int h = (int) grid.size(), w = (int) grid[0].size();\n    int r = 0, c = 0;\n    for (int i = 0; i < h; i++) {\n        size_t j = grid[i].find('R');\n        if (j != string::npos) { r = i; c = (int) j; }\n    }\n    int dr[] = {-1, 0, 1, 0};\n    int dc[] = {0, 1, 0, -1};\n    int face = 0;\n    set<pair<int,int>> seen;\n    seen.insert({r, c});\n    for (int s = 0; s < steps; s++) {\n        int nr = r + dr[face], nc = c + dc[face];\n        if (nr >= 0 && nr < h && nc >= 0 && nc < w && grid[nr][nc] != '#') {\n            r = nr; c = nc;\n            seen.insert({r, c});\n        } else {\n            face = (face + 1) % 4;\n        }\n    }\n    return to_string(seen.size()) + \" \" + string(1, string(\"NESW\")[face]);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string plan = _lines[_i + 0];\n        int steps = stoi(_lines[_i + 1]);\n        cout << cleanReport(plan, steps) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "mancala-move",
  "division": "Senior",
  "contest": 1,
  "title": "Mancala Move",
  "blurb": "Sow one handful of stones around the board and work out what it captures.",
  "statement": "\n<p>A mancala board is fourteen hollows in a ring. Numbering them 0 through 13 counterclockwise,\nhollows 0 through 5 are your six pits, hollow 6 is your store, hollows 7 through 12 are your\nopponent's six pits, and hollow 13 is your opponent's store. The pit opposite your pit\n<code>i</code> is hollow <code>12 - i</code>, so pit 0 faces hollow 12 and pit 5 faces hollow\n7.</p>\n\n<p>You take every stone out of one of your pits and sow them, dropping one stone into each hollow\nin turn as you travel counterclockwise, wrapping from hollow 13 back to hollow 0. You never drop a\nstone into your opponent's store, so hollow 13 is skipped and does not use up a stone.</p>\n\n<p>Where the last stone falls decides what happens next.</p>\n\n<ul>\n<li>If it falls in your store, hollow 6, you have earned another turn.</li>\n<li>If it falls in one of your own pits that was empty before that stone landed, and the pit\nopposite it is not empty, you capture. Take that single stone together with every stone in the\nopposite pit and put them all in your store.</li>\n<li>Anything else and the move simply ends.</li>\n</ul>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>4 4 4 4 4 4 0 4 4 4 4 4 4 0<br>2</td></tr>\n<tr><th>Output</th><td>4 4 0 5 5 5 1 4 4 4 4 4 4 0 AGAIN</td></tr>\n<tr><th>Explanation</th><td>\nPit 2 holds 4 stones. Lift them out, leaving pit 2 empty, and drop one stone each into hollows 3,\n4, 5, and 6.<br>\nHollows 3, 4, and 5 go from 4 to 5, and the store goes from 0 to 1.<br>\nThe last stone landed in your store, so you get another turn and the board is followed by\nAGAIN.\n</td></tr></table>\n",
  "input_spec": "Input the board on the first line as fourteen whole numbers separated by single spaces, giving the stones in hollows 0 through 13 in order. On the second line input the number of the pit you are sowing from, which is between 0 and 5.",
  "output_spec": "Output the fourteen hollows of the resulting board, separated by single spaces. If the move earned another turn, follow the board with a single space and the word AGAIN.",
  "constraints": "The chosen pit always holds at least one stone. There are at most 200 stones on the board.",
  "approach": "\n<p>The sowing loop is short, but three details inside it decide the answer and all\nthree are easy to get slightly wrong.</p>\n\n<p>First, empty the chosen pit before you start dropping. If you sow enough stones to travel all the way\nround the board, the pit you started from should receive one of them, and it can only do so if it was\nset to zero beforehand. The eighth test sows fourteen stones from pit 0 for exactly this reason.</p>\n\n<p>Second, skip hollow 13 without spending a stone on it. The natural way to write that is to advance\nthe index, check whether it landed on 13 and advance again if so, and only then drop. Writing it the\nother way round, spending a stone and discarding it, loses one stone per lap.</p>\n\n<p>Third, remember where the last stone actually landed after any skipping, because every rule below\nkeys off that hollow. Track it as you go rather than trying to reconstruct it arithmetically\nafterwards.</p>\n\n<p>The free turn is then a plain check that the last hollow is 6. The capture needs the pit to have been\nempty before the last stone arrived, which means its count is exactly 1 now, and checking the count\nafter sowing is safer than keeping a snapshot of the board, since a hollow you passed through on an\nearlier lap would confuse a snapshot. It also needs the opposite hollow, 12 minus the index, to hold at\nleast one stone. When both conditions hold, move that single stone together with everything opposite\ninto your store and zero both hollows.</p>\n\n<p>A capture and a free turn can never occur together, since one requires the last stone in a pit and\nthe other requires it in the store, so there is no ordering question to resolve between them.</p>\n",
  "hints": [
   "Empty the selected pit first. Advance around the board while skipping the opponent's store without consuming a stone.",
   "Remember the final hollow. A capture requires your own pit to contain exactly one stone after sowing and its opposite to be nonempty. Landing in your store instead earns a free turn."
  ],
  "fname": "playMove",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>board</code>, holding the fourteen hollow\ncounts separated by single spaces, and an integer, <code>pit</code>, the pit being sown from.</li>\n<li>The function returns a string holding the fourteen hollow counts of the new board, with the\nword AGAIN appended when the move earns another turn.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "4 4 4 4 4 4 0 4 4 4 4 4 4 0",
     "2"
    ],
    "out": "4 4 0 5 5 5 1 4 4 4 4 4 4 0 AGAIN"
   },
   {
    "in": [
     "1 0 0 0 0 0 0 0 0 0 0 6 0 0",
     "0"
    ],
    "out": "0 0 0 0 0 0 7 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "0 0 0 0 0 1 0 4 4 4 4 4 4 0",
     "5"
    ],
    "out": "0 0 0 0 0 0 1 4 4 4 4 4 4 0 AGAIN"
   }
  ],
  "tests": [
   {
    "in": [
     "4 4 4 4 4 4 0 4 4 4 4 4 4 0",
     "2"
    ],
    "out": "4 4 0 5 5 5 1 4 4 4 4 4 4 0 AGAIN"
   },
   {
    "in": [
     "1 0 0 0 0 0 0 0 0 0 0 6 0 0",
     "0"
    ],
    "out": "0 0 0 0 0 0 7 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "0 0 0 0 0 1 0 4 4 4 4 4 4 0",
     "5"
    ],
    "out": "0 0 0 0 0 0 1 4 4 4 4 4 4 0 AGAIN"
   },
   {
    "in": [
     "4 4 4 4 4 4 0 4 4 4 4 4 4 0",
     "5"
    ],
    "out": "4 4 4 4 4 0 1 5 5 5 4 4 4 0"
   },
   {
    "in": [
     "0 0 0 0 0 9 2 1 1 1 1 1 1 3",
     "5"
    ],
    "out": "1 0 0 0 0 0 6 2 2 2 2 0 2 3"
   },
   {
    "in": [
     "1 0 0 0 0 0 0 0 0 0 0 0 0 0",
     "0"
    ],
    "out": "0 1 0 0 0 0 0 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "0 0 3 0 0 0 5 2 2 2 2 2 2 5",
     "2"
    ],
    "out": "0 0 0 1 1 0 8 0 2 2 2 2 2 5"
   },
   {
    "in": [
     "14 0 0 0 0 0 0 0 0 0 0 0 0 0",
     "0"
    ],
    "out": "1 2 1 1 1 1 1 1 1 1 1 1 1 0"
   },
   {
    "in": [
     "0 1 0 0 0 0 0 0 0 0 0 7 0 0",
     "1"
    ],
    "out": "0 0 1 0 0 0 0 0 0 0 0 7 0 0"
   },
   {
    "in": [
     "2 2 2 2 2 2 3 3 3 3 3 3 3 4",
     "0"
    ],
    "out": "0 3 3 2 2 2 3 3 3 3 3 3 3 4"
   },
   {
    "in": [
     "0 0 0 0 0 20 1 1 1 1 1 1 1 1",
     "5"
    ],
    "out": "1 1 1 1 1 1 3 3 3 3 3 3 3 1"
   },
   {
    "in": [
     "6 0 0 0 0 0 0 0 0 0 0 0 5 0",
     "0"
    ],
    "out": "0 1 1 1 1 1 1 0 0 0 0 0 5 0 AGAIN"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef playMove(board: str, pit: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        board = _lines[_i + 0].strip()\n        pit = int(_lines[_i + 1].strip())\n        print(playMove(board, pit))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String playMove(String board, int pit) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String board = _lines.get(_i + 0);\n            int pit = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(playMove(board, pit)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring playMove(string board, int pit) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string board = _lines[_i + 0];\n        int pit = stoi(_lines[_i + 1]);\n        cout << playMove(board, pit) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef playMove(board: str, pit: int) -> str:\n\n    b = [int(x) for x in board.split()]\n    stones = b[pit]\n    b[pit] = 0\n    i = pit\n    while stones > 0:\n        i = (i + 1) % 14\n        if i == 13:\n            continue\n        b[i] += 1\n        stones -= 1\n    again = (i == 6)\n    if 0 <= i <= 5 and b[i] == 1 and b[12 - i] > 0:\n        b[6] += b[i] + b[12 - i]\n        b[i] = 0\n        b[12 - i] = 0\n    out = \" \".join(str(x) for x in b)\n    return out + \" AGAIN\" if again else out\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        board = _lines[_i + 0].strip()\n        pit = int(_lines[_i + 1].strip())\n        print(playMove(board, pit))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String playMove(String board, int pit) {\n\n        String[] tok = board.trim().split(\"\\\\s+\");\n        int[] b = new int[14];\n        for (int j = 0; j < 14; j++) b[j] = Integer.parseInt(tok[j]);\n        int stones = b[pit];\n        b[pit] = 0;\n        int i = pit;\n        while (stones > 0) {\n            i = (i + 1) % 14;\n            if (i == 13) continue;\n            b[i]++;\n            stones--;\n        }\n        boolean again = (i == 6);\n        if (i >= 0 && i <= 5 && b[i] == 1 && b[12 - i] > 0) {\n            b[6] += b[i] + b[12 - i];\n            b[i] = 0;\n            b[12 - i] = 0;\n        }\n        StringBuilder out = new StringBuilder();\n        for (int j = 0; j < 14; j++) { if (j > 0) out.append(' '); out.append(b[j]); }\n        if (again) out.append(\" AGAIN\");\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String board = _lines.get(_i + 0);\n            int pit = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(playMove(board, pit)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring playMove(string board, int pit) {\n\n    vector<int> b;\n    int v;\n    istringstream is(board);\n    while (is >> v) b.push_back(v);\n    int stones = b[pit];\n    b[pit] = 0;\n    int i = pit;\n    while (stones > 0) {\n        i = (i + 1) % 14;\n        if (i == 13) continue;\n        b[i]++;\n        stones--;\n    }\n    bool again = (i == 6);\n    if (i >= 0 && i <= 5 && b[i] == 1 && b[12 - i] > 0) {\n        b[6] += b[i] + b[12 - i];\n        b[i] = 0;\n        b[12 - i] = 0;\n    }\n    string out;\n    for (int j = 0; j < 14; j++) { if (j) out += ' '; out += to_string(b[j]); }\n    if (again) out += \" AGAIN\";\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string board = _lines[_i + 0];\n        int pit = stoi(_lines[_i + 1]);\n        cout << playMove(board, pit) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "minesweeper-click",
  "division": "Senior",
  "contest": 2,
  "title": "Minesweeper Click",
  "blurb": "One click on a minefield, and the empty ground opens up around it.",
  "statement": "\n<p>A minefield is a rectangle of squares. Some squares hide a mine and the rest are safe. Every\nsquare starts covered.</p>\n\n<p>Clicking a square that hides a mine ends the game.</p>\n\n<p>Clicking a safe square uncovers it and writes on it the number of mines among its neighbors,\ncounting all eight squares that touch it, including the four diagonals. Squares off the edge of\nthe board are not neighbors.</p>\n\n<p>If that number turns out to be zero, there is nothing nearby worth being careful about, so the\ngame uncovers all eight of its neighbors as well, and applies the same rule to each of them in\nturn. The opening spreads until it is walled in by squares that do have a mine next to them,\nwhich get uncovered and show their number but do not spread any further.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>....;.*..;....<br>0<br>3</td></tr>\n<tr><th>Output</th><td>..10;..10;..10</td></tr>\n<tr><th>Explanation</th><td>\nThe field is 3 rows of 4, with one mine at row 1, column 1:\n<pre><code>. . . .\n. * . .\n. . . .</code></pre>\nThe click is row 0, column 3. Nothing in the eight squares around it hides a mine, so it opens\nshowing 0 and spreads to its neighbors.<br>\nRow 1 column 3 and row 2 column 3 also have no mine beside them, so they open showing 0 and\nspread in turn. That is the whole rightmost column.<br>\nEvery square in column 2 touches the mine, so each opens showing 1 and stops there. They are the\nwall the opening runs into.<br>\nColumns 0 and 1 are never reached, so they stay covered and print as periods, and so does the\nmine itself.\n</td></tr></table>\n",
  "input_spec": "Input the field on the first line, with rows separated by semicolons, where a period is a safe square and an asterisk is a mine. Input the clicked row on the second line and the clicked column on the third line, both counting from 0.",
  "output_spec": "Output BOOM if the click landed on a mine. Otherwise output the visible board with rows separated by semicolons, writing a digit on every uncovered square, a 0 on an uncovered square with no mine beside it, and a period on every square still covered.",
  "constraints": "The field has between 1 and 20 rows and between 1 and 20 columns. Every row is the same length. The clicked square is always on the board.",
  "approach": "\n<p>Three parts, of which only the middle one is interesting: count the\nneighbors of a square, spread the opening, then print.</p>\n\n<p>Write the neighbor count as a function of its own. Loop the row offset and the column offset each\nfrom minus one to one, skip the pair where both are zero, discard anything falling off the board, and\nadd one for every asterisk. Getting that right once means you never have to think about the eight\ndirections again.</p>\n\n<p>For the spread, use a queue rather than recursion. Push the clicked square, then repeatedly pop one,\nskipping it if it is already uncovered and otherwise uncovering it and recording its count. Only when\nthat count is zero do you push its eight neighbors, and that single condition is the whole rule, since\na square with a mine beside it is uncovered but is a dead end. Recursion works too, but a 20 by 20 field\nof open ground goes 400 frames deep, which is comfortable in C++ and Java and close enough to Python's\ndefault limit to be worth avoiding.</p>\n\n<p>The reference solution marks squares when removing them from the queue and skips duplicate entries. Marking a square as visited when first adding it is also correct and prevents those duplicates. Either approach must ensure each square is processed only once.</p>\n\n<p>Two things about printing. A mine is never uncovered by a legal click, so it keeps whatever it looked\nlike before, which in this problem is a covered square printing as a period. And an uncovered square\nwith a count of zero prints as the digit 0 rather than as a period, since that is what distinguishes it\nfrom a square nobody ever reached. Confusing those two makes the output look almost right and score\nnothing.</p>\n",
  "hints": [
   "Separate counting neighboring mines from deciding whether the opening should spread.",
   "Use a queue and a visited set. Reveal each safe square, but add its neighbors only when its mine count is zero. Numbered boundary squares open without spreading further."
  ],
  "fname": "reveal",
  "task": "\n<ul>\n<li>The function has 3 parameters: a string, <code>field</code>, holding the rows separated by\nsemicolons, and two integers, <code>row</code> and <code>col</code>, giving the clicked\nsquare.</li>\n<li>The function returns a string, either BOOM or the visible board.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "....;.*..;....",
     "0",
     "3"
    ],
    "out": "..10;..10;..10"
   },
   {
    "in": [
     ".....;..*..;.....",
     "0",
     "0"
    ],
    "out": "01...;01...;01..."
   },
   {
    "in": [
     "*",
     "0",
     "0"
    ],
    "out": "BOOM"
   }
  ],
  "tests": [
   {
    "in": [
     "....;.*..;....",
     "0",
     "3"
    ],
    "out": "..10;..10;..10"
   },
   {
    "in": [
     "....;.*..;....",
     "1",
     "1"
    ],
    "out": "BOOM"
   },
   {
    "in": [
     "*",
     "0",
     "0"
    ],
    "out": "BOOM"
   },
   {
    "in": [
     ".....;.....;.....;.....;.....",
     "2",
     "2"
    ],
    "out": "00000;00000;00000;00000;00000"
   },
   {
    "in": [
     "*....;.....;.....;.....;....*",
     "2",
     "2"
    ],
    "out": ".1000;11000;00000;00011;0001."
   },
   {
    "in": [
     "..*..;.....;*...*;.....;..*..",
     "2",
     "2"
    ],
    "out": ".....;.212.;.101.;.212.;....."
   },
   {
    "in": [
     "....;....;....;....",
     "0",
     "0"
    ],
    "out": "0000;0000;0000;0000"
   },
   {
    "in": [
     "*.*.*;.....;*.*.*;.....;*.*.*",
     "1",
     "1"
    ],
    "out": ".....;.4...;.....;.....;....."
   },
   {
    "in": [
     "..........;..........;....*.....;..........;..........",
     "0",
     "0"
    ],
    "out": "0000000000;0001110000;0001.10000;0001110000;0000000000"
   },
   {
    "in": [
     ".*.;***;.*.",
     "0",
     "0"
    ],
    "out": "3..;...;..."
   },
   {
    "in": [
     "....*;.....;.....;.....;.....",
     "4",
     "0"
    ],
    "out": "0001.;00011;00000;00000;00000"
   },
   {
    "in": [
     "*........*;..........;..........;..........;*........*",
     "2",
     "5"
    ],
    "out": ".10000001.;1100000011;0000000000;1100000011;.10000001."
   }
  ],
  "starter": {
   "python": "import sys\n\ndef reveal(field: str, row: int, col: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 3\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        field = _lines[_i + 0].strip()\n        row = int(_lines[_i + 1].strip())\n        col = int(_lines[_i + 2].strip())\n        print(reveal(field, row, col))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String reveal(String field, int row, int col) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 3;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String field = _lines.get(_i + 0);\n            int row = Integer.parseInt((_lines.get(_i + 1)).trim());\n            int col = Integer.parseInt((_lines.get(_i + 2)).trim());\n            _sb.append(reveal(field, row, col)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring reveal(string field, int row, int col) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 3;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string field = _lines[_i + 0];\n        int row = stoi(_lines[_i + 1]);\n        int col = stoi(_lines[_i + 2]);\n        cout << reveal(field, row, col) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\n\ndef neighbors(grid, r, c):\n    total = 0\n    for dr in (-1, 0, 1):\n        for dc in (-1, 0, 1):\n            if dr == 0 and dc == 0:\n                continue\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == \"*\":\n                total += 1\n    return total\n\ndef reveal(field: str, row: int, col: int) -> str:\n\n    grid = field.split(\";\")\n    h, w = len(grid), len(grid[0])\n    if grid[row][col] == \"*\":\n        return \"BOOM\"\n    shown = [[\".\"] * w for _ in range(h)]\n    queue = [(row, col)]\n    head = 0\n    while head < len(queue):\n        r, c = queue[head]\n        head += 1\n        if shown[r][c] != \".\":\n            continue\n        n = neighbors(grid, r, c)\n        shown[r][c] = str(n)\n        if n == 0:\n            for dr in (-1, 0, 1):\n                for dc in (-1, 0, 1):\n                    nr, nc = r + dr, c + dc\n                    if 0 <= nr < h and 0 <= nc < w and shown[nr][nc] == \".\":\n                        queue.append((nr, nc))\n    return \";\".join(\"\".join(rowchars) for rowchars in shown)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 3\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        field = _lines[_i + 0].strip()\n        row = int(_lines[_i + 1].strip())\n        col = int(_lines[_i + 2].strip())\n        print(reveal(field, row, col))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static int neighbors(String[] grid, int r, int c) {\n        int total = 0;\n        for (int dr = -1; dr <= 1; dr++) {\n            for (int dc = -1; dc <= 1; dc++) {\n                if (dr == 0 && dc == 0) continue;\n                int nr = r + dr, nc = c + dc;\n                if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length()\n                        && grid[nr].charAt(nc) == '*') total++;\n            }\n        }\n        return total;\n    }\n\n    static String reveal(String field, int row, int col) {\n\n        String[] grid = field.split(\";\");\n        int h = grid.length, w = grid[0].length();\n        if (grid[row].charAt(col) == '*') return \"BOOM\";\n        char[][] shown = new char[h][w];\n        for (char[] r : shown) Arrays.fill(r, '.');\n        Deque<int[]> queue = new ArrayDeque<>();\n        queue.add(new int[]{row, col});\n        while (!queue.isEmpty()) {\n            int[] cur = queue.poll();\n            int r = cur[0], c = cur[1];\n            if (shown[r][c] != '.') continue;\n            int n = neighbors(grid, r, c);\n            shown[r][c] = (char) ('0' + n);\n            if (n == 0) {\n                for (int dr = -1; dr <= 1; dr++) {\n                    for (int dc = -1; dc <= 1; dc++) {\n                        int nr = r + dr, nc = c + dc;\n                        if (nr >= 0 && nr < h && nc >= 0 && nc < w && shown[nr][nc] == '.') {\n                            queue.add(new int[]{nr, nc});\n                        }\n                    }\n                }\n            }\n        }\n        StringBuilder out = new StringBuilder();\n        for (int r = 0; r < h; r++) {\n            if (r > 0) out.append(';');\n            out.append(shown[r]);\n        }\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 3;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String field = _lines.get(_i + 0);\n            int row = Integer.parseInt((_lines.get(_i + 1)).trim());\n            int col = Integer.parseInt((_lines.get(_i + 2)).trim());\n            _sb.append(reveal(field, row, col)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nstatic int neighbors(const vector<string> &grid, int r, int c) {\n    int total = 0;\n    for (int dr = -1; dr <= 1; dr++) {\n        for (int dc = -1; dc <= 1; dc++) {\n            if (dr == 0 && dc == 0) continue;\n            int nr = r + dr, nc = c + dc;\n            if (nr >= 0 && nr < (int) grid.size() && nc >= 0 && nc < (int) grid[0].size()\n                    && grid[nr][nc] == '*') total++;\n        }\n    }\n    return total;\n}\n\nstring reveal(string field, int row, int col) {\n\n    vector<string> grid;\n    string rowstr;\n    istringstream is(field);\n    while (getline(is, rowstr, ';')) grid.push_back(rowstr);\n    int h = (int) grid.size(), w = (int) grid[0].size();\n    if (grid[row][col] == '*') return \"BOOM\";\n    vector<string> shown(h, string(w, '.'));\n    deque<pair<int,int>> q;\n    q.push_back({row, col});\n    while (!q.empty()) {\n        auto cur = q.front();\n        q.pop_front();\n        int r = cur.first, c = cur.second;\n        if (shown[r][c] != '.') continue;\n        int n = neighbors(grid, r, c);\n        shown[r][c] = char('0' + n);\n        if (n == 0) {\n            for (int dr = -1; dr <= 1; dr++) {\n                for (int dc = -1; dc <= 1; dc++) {\n                    int nr = r + dr, nc = c + dc;\n                    if (nr >= 0 && nr < h && nc >= 0 && nc < w && shown[nr][nc] == '.') {\n                        q.push_back({nr, nc});\n                    }\n                }\n            }\n        }\n    }\n    string out;\n    for (int r = 0; r < h; r++) { if (r) out += ';'; out += shown[r]; }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 3;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string field = _lines[_i + 0];\n        int row = stoi(_lines[_i + 1]);\n        int col = stoi(_lines[_i + 2]);\n        cout << reveal(field, row, col) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "rotor-cipher",
  "division": "Senior",
  "contest": 3,
  "title": "Rotor Cipher",
  "blurb": "Three geared wheels shift each letter, and the wheels turn as you type.",
  "statement": "\n<p>The machine has three wheels in a row. Each wheel is set to one of the 26 letters, where A\nstands for 0, B for 1, and so on up to Z for 25. The machine is given a starting setting as three\nletters, one per wheel.</p>\n\n<p>Every letter of the message goes through the same two steps, in this order.</p>\n\n<p><b>First the wheels turn.</b> Wheel one advances by one. If that carries it past Z and back\nround to A, wheel two also advances by one. If wheel two in turn carries past Z back to A, wheel\nthree advances by one. Wheel three never carries anywhere.</p>\n\n<p><b>Then the letter is shifted.</b> Add the three wheel settings together, take the remainder on\ndivision by 26, and move the letter forward round the alphabet by that amount, wrapping from Z\nback to A.</p>\n\n<p>The wheels turn before the first letter is encoded, not after it. Anything in the message that\nis not a capital letter, such as a space or a digit, is copied through unchanged and does not turn\nthe wheels at all.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>HI ACSL<br>AYZ</td></tr>\n<tr><th>Output</th><td>FH ADUO</td></tr>\n<tr><th>Explanation</th><td>\nThe wheels start at A, Y, Z, which is 0, 24, 25. Only wheel one moves anywhere in this message,\nsince it never gets past Z.<br>\nH: wheel one turns to 1, so the shift is 1 + 24 + 25 = 50, and 50 mod 26 is 24. H is letter 7, and\n7 + 24 = 31 wraps round to 5, which is F.<br>\nI: wheel one turns to 2, shift 51 mod 26 = 25. I is 8, and 8 + 25 = 33 wraps to 7, which is H.<br>\nThe space is copied straight through and the wheels do not move for it.<br>\nA: wheel one turns to 3, shift 52 mod 26 = 0, so A stays A.<br>\nC: wheel one turns to 4, shift 1, giving D.<br>\nS: wheel one turns to 5, shift 2, giving U.<br>\nL: wheel one turns to 6, shift 3, giving O.\n</td></tr></table>\n",
  "input_spec": "Input the message on the first line and the three letter starting setting on the second line.",
  "output_spec": "Output the encoded message, with every character that is not a capital letter copied through unchanged.",
  "constraints": "The message is between 1 and 200 characters and contains only capital letters, spaces, and digits, with no space at either end. The setting is always three capital letters.",
  "approach": "\n<p>Keep the three wheels as three integers from 0 to 25, and write the turning as a\nstep of its own so that you can test it in isolation.</p>\n\n<p>Turning is a chain of carries. Add one to wheel one and take the remainder on 26, and if the result\nis 0 then it wrapped, so do the same to wheel two, and if that also lands on 0, add one to wheel three.\nChecking for 0 after the modulo is the cleanest way to detect a wrap, because the only way to reach 0\nby adding one is to have come from 25.</p>\n\n<p>Encoding is then a single line. The shift is the three wheels added and reduced modulo 26, and the\nletter moves forward by that much with another modulo to wrap, which in every one of the three languages\nis <code>(c - 'A' + shift) % 26 + 'A'</code>.</p>\n\n<p>Three things decide whether this works. The wheels turn before the letter is encoded rather than\nafter, and turning afterwards shifts every character of the output by one wheel position, so the whole\nmessage comes out wrong while still looking like a perfectly plausible cipher. If your first letter is\noff by exactly one, that is why.</p>\n\n<p>Characters that are not capital letters pass through untouched and do not turn the wheels at all,\nwhich means a message containing spaces encodes its letters exactly as if the spaces were not there.\nTurn the wheels on a space and every letter after the first one is wrong.</p>\n\n<p>Finally, the carry happens on a wrap rather than every 26 letters counted from the beginning. Those\ntwo are the same thing when wheel one starts at A, which is why the second sample hides the bug while\nthe first, which starts at A with wheel two already sitting at Y, exposes it.</p>\n",
  "hints": [
   "The wheels turn before encoding a capital letter. Other characters neither change nor turn the wheels.",
   "Represent wheel positions as 0 through 25. Carry to the next wheel only when a wheel wraps to zero, then use the sum of the updated positions as the letter shift."
  ],
  "fname": "encode",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>message</code>, and a string,\n<code>start</code>, holding the three starting wheel letters.</li>\n<li>The function returns a string, the encoded message.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "HI ACSL",
     "AYZ"
    ],
    "out": "FH ADUO"
   },
   {
    "in": [
     "AAAAA",
     "AAA"
    ],
    "out": "BCDEF"
   },
   {
    "in": [
     "A B 1 C",
     "ZZZ"
    ],
    "out": "A C 1 E"
   }
  ],
  "tests": [
   {
    "in": [
     "HI ACSL",
     "AYZ"
    ],
    "out": "FH ADUO"
   },
   {
    "in": [
     "AAAAA",
     "AAA"
    ],
    "out": "BCDEF"
   },
   {
    "in": [
     "A B 1 C",
     "ZZZ"
    ],
    "out": "A C 1 E"
   },
   {
    "in": [
     "ATTACK AT DAWN",
     "AAA"
    ],
    "out": "BVWEHQ HB MKHZ"
   },
   {
    "in": [
     "ZZZZZZZZZZZZZZZZZZZZZZZZZZ",
     "AAA"
    ],
    "out": "ABCDEFGHIJKLMNOPQRSTUVWXYA"
   },
   {
    "in": [
     "THE QUICK BROWN FOX",
     "MQP"
    ],
    "out": "LAY LQFAJ BSQZR LVF"
   },
   {
    "in": [
     "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
     "ZZA"
    ],
    "out": "BCDEFGHIJKLMNOPQRSTUVWXYZACDEFGHIJKLMNOPQRSTUVWXYZAB"
   },
   {
    "in": [
     "ACSL 2026 FINALS",
     "BCD"
    ],
    "out": "HKBV 2026 QUAOAI"
   },
   {
    "in": [
     "X",
     "ZZZ"
    ],
    "out": "X"
   },
   {
    "in": [
     "12345 67890",
     "ABC"
    ],
    "out": "12345 67890"
   },
   {
    "in": [
     "MEET ME AT THE OLD MILL AT MIDNIGHT ON TUESDAY",
     "QRS"
    ],
    "out": "MFGW QJ GA BRP AYR BYCD TN HEALHGIV RR YALAMLK"
   },
   {
    "in": [
     "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
     "AAA"
    ],
    "out": "BCDEFGHIJKLMNOPQRSTUVWXYZBCDEFGHIJKLMNOPQRSTUVWXYZACDEFGHIJKLMNOPQRSTUVWXYZABDEFGHIJKLMNOPQRSTUVWXYZABCEFGHIJKLMNOPQRSTUVWXYZABCDFGHIJKLMNOPQRSTUVWXYZABCDEGHIJKLMNOPQRSTUVWXYZABCDEFHIJKLMNOPQRST"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef encode(message: str, start: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        message = _lines[_i + 0].strip()\n        start = _lines[_i + 1].strip()\n        print(encode(message, start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String encode(String message, String start) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String message = _lines.get(_i + 0);\n            String start = _lines.get(_i + 1);\n            _sb.append(encode(message, start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring encode(string message, string start) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string message = _lines[_i + 0];\n        string start = _lines[_i + 1];\n        cout << encode(message, start) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef encode(message: str, start: str) -> str:\n\n    w1 = ord(start[0]) - 65\n    w2 = ord(start[1]) - 65\n    w3 = ord(start[2]) - 65\n    out = \"\"\n    for ch in message:\n        if not (\"A\" <= ch <= \"Z\"):\n            out += ch\n            continue\n        w1 = (w1 + 1) % 26\n        if w1 == 0:\n            w2 = (w2 + 1) % 26\n            if w2 == 0:\n                w3 = (w3 + 1) % 26\n        shift = (w1 + w2 + w3) % 26\n        out += chr((ord(ch) - 65 + shift) % 26 + 65)\n    return out\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        message = _lines[_i + 0].strip()\n        start = _lines[_i + 1].strip()\n        print(encode(message, start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String encode(String message, String start) {\n\n        int w1 = start.charAt(0) - 'A', w2 = start.charAt(1) - 'A', w3 = start.charAt(2) - 'A';\n        StringBuilder out = new StringBuilder();\n        for (int i = 0; i < message.length(); i++) {\n            char ch = message.charAt(i);\n            if (ch < 'A' || ch > 'Z') { out.append(ch); continue; }\n            w1 = (w1 + 1) % 26;\n            if (w1 == 0) {\n                w2 = (w2 + 1) % 26;\n                if (w2 == 0) w3 = (w3 + 1) % 26;\n            }\n            int shift = (w1 + w2 + w3) % 26;\n            out.append((char) ((ch - 'A' + shift) % 26 + 'A'));\n        }\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String message = _lines.get(_i + 0);\n            String start = _lines.get(_i + 1);\n            _sb.append(encode(message, start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring encode(string message, string start) {\n\n    int w1 = start[0] - 'A', w2 = start[1] - 'A', w3 = start[2] - 'A';\n    string out;\n    for (char ch : message) {\n        if (ch < 'A' || ch > 'Z') { out += ch; continue; }\n        w1 = (w1 + 1) % 26;\n        if (w1 == 0) {\n            w2 = (w2 + 1) % 26;\n            if (w2 == 0) w3 = (w3 + 1) % 26;\n        }\n        int shift = (w1 + w2 + w3) % 26;\n        out += char((ch - 'A' + shift) % 26 + 'A');\n    }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string message = _lines[_i + 0];\n        string start = _lines[_i + 1];\n        cout << encode(message, start) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "tetris-drop",
  "division": "Senior",
  "contest": 4,
  "title": "Tetris Drop",
  "blurb": "Drop bars into an eight column well and clear every row that fills up.",
  "statement": "\n<p>The well is 8 columns wide, numbered 0 through 7 from the left, and as tall as it needs to be.\nIt starts empty.</p>\n\n<p>Two kinds of piece fall into it. A piece written H followed by a number is a horizontal bar\nthat is one square tall and that many squares wide. A piece written V followed by a number is a\nvertical bar one square wide and that many squares tall. Each piece comes with the column its\nleftmost square occupies.</p>\n\n<p>A piece falls straight down without turning or sliding, and stops as soon as any part of it\nwould overlap something already in the well or would go below the floor. A horizontal bar\ntherefore comes to rest on top of the tallest column it spans, and it does not tip or fill the gaps\nunderneath it.</p>\n\n<p>After a piece lands, any row that now has all 8 of its squares filled disappears, and\neverything above that row drops down one row. Several rows can go at once.</p>\n\n<p>Report how tall each column is once every piece has fallen.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>H4:0 H4:4 V3:0 H2:6</td></tr>\n<tr><th>Output</th><td>3 0 0 0 0 0 1 1</td></tr>\n<tr><th>Explanation</th><td>\nH4:0 lands on the floor and fills columns 0 through 3 of the bottom row.<br>\nH4:4 lands on the floor and fills columns 4 through 7 of the bottom row. All 8 squares of that row\nare now filled, so it disappears and the well is empty again.<br>\nV3:0 falls to the floor and makes column 0 three squares tall.<br>\nH2:6 lands on the floor across columns 6 and 7, one square tall.<br>\nNo row is full, so nothing clears. Column 0 stands at 3, columns 6 and 7 at 1, and the rest are\nempty.\n</td></tr></table>\n",
  "input_spec": "Input the pieces on one line, separated by single spaces. Each piece is the letter H or V, then the length of the bar, then a colon, then the column its leftmost square occupies.",
  "output_spec": "Output the height of each of the 8 columns, from column 0 to column 7, separated by single spaces.",
  "constraints": "There are between 1 and 60 pieces. A bar is between 1 and 8 long, and a piece always fits inside the 8 columns.",
  "approach": "\n<p>Tracking only the eight column heights will not do, because clearing a row can\nleave a column with a hole underneath it. Keep the actual well as a list of rows, each holding 8\nsquares, with row 0 as the floor, and grow the list whenever a piece needs a row that does not yet\nexist.</p>\n\n<p>Write a helper returning the height of a column, meaning one more than the index of its highest\nfilled square, or 0 when the column is empty. Everything else is built on top of it.</p>\n\n<p>Landing a piece is then one line of thought apiece. A horizontal bar of width w at column c comes to\nrest on the row equal to the largest height among columns c through c + w - 1, filling those squares in\nthat single row. A vertical bar of height n at column c starts at that column's height and fills n rows\nupward in that one column.</p>\n\n<p>The clearing step is where the problem is won or lost. Walk the rows, keep only those that are not\ncompletely full, and rebuild the well from what survived. Doing it that way handles several rows going\nat once for free, and it sidesteps the classic bug of deleting row by row while iterating upward, which\nskips a row every time one is removed.</p>\n\n<p>Note too that clearing can drop material into a column that was empty below it, which is exactly why\nthe well has to be modeled square by square. A solution that adjusts the heights arithmetically after a\nclear gets the first sample right and then drifts.</p>\n\n<p>Parsing is a split on the space, then the first character for the shape, everything between it and\nthe colon for the length, and everything after the colon for the column. The stated lengths are 1 through 8.</p>\n",
  "hints": [
   "Column heights help place a bar, but they cannot represent the holes under a horizontal bar.",
   "Keep the filled cells by row. Place each piece above the tallest column it spans, then remove every full row together and rebuild the remaining rows in order."
  ],
  "fname": "finalHeights",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>pieces</code>, holding the pieces in the order\nthey fall, separated by single spaces.</li>\n<li>The function returns a string holding the 8 column heights separated by single spaces.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "H4:0 H4:4 V3:0 H2:6"
    ],
    "out": "3 0 0 0 0 0 1 1"
   },
   {
    "in": [
     "H8:0"
    ],
    "out": "0 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "H4:0 V2:5 H3:5"
    ],
    "out": "1 1 1 1 0 3 3 3"
   }
  ],
  "tests": [
   {
    "in": [
     "H4:0 H4:4 V3:0 H2:6"
    ],
    "out": "3 0 0 0 0 0 1 1"
   },
   {
    "in": [
     "H8:0"
    ],
    "out": "0 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "V1:0 V1:1 V1:2 V1:3 V1:4 V1:5 V1:6 V1:7"
    ],
    "out": "0 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "V4:3"
    ],
    "out": "0 0 0 4 0 0 0 0"
   },
   {
    "in": [
     "H8:0 H8:0 H8:0"
    ],
    "out": "0 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "V2:0 V2:1 V2:2 V2:3 V2:4 V2:5 V2:6 V2:7"
    ],
    "out": "0 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "H3:0 H3:0 H3:0 V3:7"
    ],
    "out": "3 3 3 0 0 0 0 3"
   },
   {
    "in": [
     "V5:0 H7:1 H7:1 H7:1 H7:1 H7:1"
    ],
    "out": "0 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "H1:0 H1:1 H1:2 H1:3 H1:4 H1:5 H1:6 H1:7 H1:0"
    ],
    "out": "1 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "V8:0 V8:7 H6:1 H6:1"
    ],
    "out": "6 0 0 0 0 0 0 6"
   },
   {
    "in": [
     "H2:0 H2:2 H2:4 H2:6 H2:0 H2:2 H2:4 H2:6"
    ],
    "out": "0 0 0 0 0 0 0 0"
   },
   {
    "in": [
     "V3:0 V1:1 V1:2 V1:3 V1:4 V1:5 V1:6 V1:7 H8:0"
    ],
    "out": "2 0 0 0 0 0 0 0"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef finalHeights(pieces: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        pieces = _lines[_i + 0].strip()\n        print(finalHeights(pieces))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String finalHeights(String pieces) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String pieces = _lines.get(_i + 0);\n            _sb.append(finalHeights(pieces)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring finalHeights(string pieces) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string pieces = _lines[_i + 0];\n        cout << finalHeights(pieces) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\n\ndef col_height(well, c):\n    for r in range(len(well) - 1, -1, -1):\n        if well[r][c]:\n            return r + 1\n    return 0\n\n\ndef ensure(well, rows):\n    while len(well) < rows:\n        well.append([0] * 8)\n\ndef finalHeights(pieces: str) -> str:\n\n    well = []\n    for token in pieces.split():\n        shape = token[0]\n        colon = token.index(\":\")\n        size = int(token[1:colon])\n        c = int(token[colon + 1:])\n        if shape == \"H\":\n            base = max(col_height(well, x) for x in range(c, c + size))\n            ensure(well, base + 1)\n            for x in range(c, c + size):\n                well[base][x] = 1\n        else:\n            base = col_height(well, c)\n            ensure(well, base + size)\n            for r in range(base, base + size):\n                well[r][c] = 1\n        well = [row for row in well if sum(row) < 8]\n    return \" \".join(str(col_height(well, c)) for c in range(8))\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        pieces = _lines[_i + 0].strip()\n        print(finalHeights(pieces))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static int colHeight(List<int[]> well, int c) {\n        for (int r = well.size() - 1; r >= 0; r--) if (well.get(r)[c] == 1) return r + 1;\n        return 0;\n    }\n\n    static void ensure(List<int[]> well, int rows) {\n        while (well.size() < rows) well.add(new int[8]);\n    }\n\n    static String finalHeights(String pieces) {\n\n        List<int[]> well = new ArrayList<>();\n        for (String token : pieces.trim().split(\"\\s+\")) {\n            char shape = token.charAt(0);\n            int colon = token.indexOf(':');\n            int size = Integer.parseInt(token.substring(1, colon));\n            int c = Integer.parseInt(token.substring(colon + 1));\n            if (shape == 'H') {\n                int base = 0;\n                for (int x = c; x < c + size; x++) base = Math.max(base, colHeight(well, x));\n                ensure(well, base + 1);\n                for (int x = c; x < c + size; x++) well.get(base)[x] = 1;\n            } else {\n                int base = colHeight(well, c);\n                ensure(well, base + size);\n                for (int r = base; r < base + size; r++) well.get(r)[c] = 1;\n            }\n            List<int[]> kept = new ArrayList<>();\n            for (int[] row : well) {\n                int filled = 0;\n                for (int v : row) filled += v;\n                if (filled < 8) kept.add(row);\n            }\n            well = kept;\n        }\n        StringBuilder out = new StringBuilder();\n        for (int c = 0; c < 8; c++) { if (c > 0) out.append(' '); out.append(colHeight(well, c)); }\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String pieces = _lines.get(_i + 0);\n            _sb.append(finalHeights(pieces)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nstatic int colHeight(const vector<array<int, 8>> &well, int c) {\n    for (int r = (int) well.size() - 1; r >= 0; r--) if (well[r][c]) return r + 1;\n    return 0;\n}\n\nstatic void ensure(vector<array<int, 8>> &well, int rows) {\n    while ((int) well.size() < rows) well.push_back(array<int, 8>{0, 0, 0, 0, 0, 0, 0, 0});\n}\n\nstring finalHeights(string pieces) {\n\n    vector<array<int, 8>> well;\n    string token;\n    istringstream is(pieces);\n    while (is >> token) {\n        char shape = token[0];\n        size_t colon = token.find(':');\n        int size_ = stoi(token.substr(1, colon - 1));\n        int c = stoi(token.substr(colon + 1));\n        if (shape == 'H') {\n            int base = 0;\n            for (int x = c; x < c + size_; x++) base = max(base, colHeight(well, x));\n            ensure(well, base + 1);\n            for (int x = c; x < c + size_; x++) well[base][x] = 1;\n        } else {\n            int base = colHeight(well, c);\n            ensure(well, base + size_);\n            for (int r = base; r < base + size_; r++) well[r][c] = 1;\n        }\n        vector<array<int, 8>> kept;\n        for (auto &row : well) {\n            int filled = 0;\n            for (int v : row) filled += v;\n            if (filled < 8) kept.push_back(row);\n        }\n        well = kept;\n    }\n    string out;\n    for (int c = 0; c < 8; c++) { if (c) out += ' '; out += to_string(colHeight(well, c)); }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string pieces = _lines[_i + 0];\n        cout << finalHeights(pieces) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "stair-hops",
  "division": "Junior",
  "contest": 1,
  "title": "Stair Hops",
  "blurb": "Climb a staircase one or two steps at a time and count the distinct routes.",
  "statement": "\n<p>A staircase has N steps. You climb it by moving up either one step or two steps at a time,\nand you keep going until you are standing exactly on the top step.</p>\n\n<p>Two climbs are different if the sequence of moves differs anywhere. Count the climbs. A\nstaircase with no steps at all has exactly one climb, the one that makes no moves.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>4</td></tr>\n<tr><th>Output</th><td>5</td></tr>\n<tr><th>Explanation</th><td>\nWriting each climb as its sequence of move sizes:<br>\n1 1 1 1<br>\n1 1 2<br>\n1 2 1<br>\n2 1 1<br>\n2 2\n</td></tr></table>\n",
  "input_spec": "Input a single whole number, the number of steps in the staircase.",
  "output_spec": "Output an integer, the number of distinct climbs.",
  "constraints": "The number of steps is between 0 and 45, inclusive. The answer always fits in a 32 bit signed integer.",
  "approach": "\n<p>Ask what the last move was. A climb of N steps either finished with a single step, in which\ncase everything before it was a climb of N minus 1, or with a double step, in which case everything\nbefore it was a climb of N minus 2. No climb is both, and every climb is one or the other, so the\ncount for N is the count for N minus 1 plus the count for N minus 2.</p>\n\n<p>That is the Fibonacci recurrence, and the only thing left to settle is where it starts. A\nstaircase of 0 steps has one climb, the empty one, and a staircase of 1 step also has one. From there\nthe counts run 2, 3, 5, 8, and so on.</p>\n\n<p>Write it as a loop rather than as a recursive function. Plain recursion recomputes the same values\nover and over and becomes unusable well before 45 steps, while two variables and a loop finish in 45\nadditions. Keep a pair of running values, add them, and shift.</p>\n\n<p>The count for 45 steps is 1836311903, which fits in a 32 bit signed integer with very little room to\nspare, but the running pair computes the next Fibonacci number too. That next value is 2971215073, so the Java and C++ solutions use 64 bit variables even though the returned answer fits in 32 bits.</p>\n",
  "hints": [
   "What was the very last move of a climb? There are only two possibilities.",
   "The count for N is the count for N-1 plus the count for N-2. Both 0 steps and 1 step have exactly one climb. Use a loop, not plain recursion."
  ],
  "fname": "countHops",
  "task": "\n<ul>\n<li>The function has 1 parameter: an integer, <code>steps</code>, the number of steps.</li>\n<li>The function returns an integer, the number of distinct climbs.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "4"
    ],
    "out": "5"
   },
   {
    "in": [
     "0"
    ],
    "out": "1"
   },
   {
    "in": [
     "10"
    ],
    "out": "89"
   }
  ],
  "tests": [
   {
    "in": [
     "4"
    ],
    "out": "5"
   },
   {
    "in": [
     "0"
    ],
    "out": "1"
   },
   {
    "in": [
     "10"
    ],
    "out": "89"
   },
   {
    "in": [
     "1"
    ],
    "out": "1"
   },
   {
    "in": [
     "2"
    ],
    "out": "2"
   },
   {
    "in": [
     "3"
    ],
    "out": "3"
   },
   {
    "in": [
     "12"
    ],
    "out": "233"
   },
   {
    "in": [
     "20"
    ],
    "out": "10946"
   },
   {
    "in": [
     "30"
    ],
    "out": "1346269"
   },
   {
    "in": [
     "45"
    ],
    "out": "1836311903"
   },
   {
    "in": [
     "44"
    ],
    "out": "1134903170"
   },
   {
    "in": [
     "7"
    ],
    "out": "21"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef countHops(steps: int) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        steps = int(_lines[_i + 0].strip())\n        print(countHops(steps))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countHops(int steps) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int steps = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(countHops(steps)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countHops(int steps) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int steps = stoi(_lines[_i + 0]);\n        cout << countHops(steps) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countHops(steps: int) -> int:\n\n    a, b = 1, 1\n    for _ in range(steps):\n        a, b = b, a + b\n    return a\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        steps = int(_lines[_i + 0].strip())\n        print(countHops(steps))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countHops(int steps) {\n\n        long a = 1, b = 1;\n        for (int i = 0; i < steps; i++) { long t = a + b; a = b; b = t; }\n        return (int) a;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int steps = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(countHops(steps)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countHops(int steps) {\n\n    long long a = 1, b = 1;\n    for (int i = 0; i < steps; i++) { long long t = a + b; a = b; b = t; }\n    return (int) a;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int steps = stoi(_lines[_i + 0]);\n        cout << countHops(steps) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "digit-persistence",
  "division": "Junior",
  "contest": 1,
  "title": "Digit Persistence",
  "blurb": "Multiply a number's digits together, repeat, and count the rounds until one digit is left.",
  "statement": "\n<p>Take a whole number and replace it with the product of its digits. Do that again to the\nresult, and again, and keep going until what is left is a single digit.</p>\n\n<p>Count the replacements. A number that is already a single digit needs none, so its answer is 0.\nA number containing a 0 collapses to 0 in one replacement, since the product of its digits is 0.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>39</td></tr>\n<tr><th>Output</th><td>3</td></tr>\n<tr><th>Explanation</th><td>\n3 times 9 is 27, that is replacement 1.<br>\n2 times 7 is 14, that is replacement 2.<br>\n1 times 4 is 4, that is replacement 3.<br>\n4 is a single digit, so the answer is 3.\n</td></tr></table>\n",
  "input_spec": "Input a single whole number.",
  "output_spec": "Output an integer, the number of replacements made before a single digit was reached.",
  "constraints": "The starting number is between 1 and 999999, inclusive.",
  "approach": "\n<p>The loop is short and the stopping rule is the whole problem. Keep replacing while the value\nis 10 or more, and count each replacement as you make it. A value below 10 is already a single digit,\nso the loop simply never runs and the answer is 0.</p>\n\n<p>Take the product on the number rather than on a string, which is easier in Java and C++ and no\nharder in Python. Start a running product at 1, then repeatedly take the value modulo 10, multiply it\nin, and divide the value by 10, continuing while the value is above zero.</p>\n\n<p>Do not add a special case for digits equal to 0. A 0 anywhere makes the product 0, which is a\nsingle digit, so the loop ends on the next test and the count is right without any help. Skipping zeros would give the wrong product. For example, 101 should become 0 in one replacement. Ignoring its zero would instead produce 1.</p>\n\n<p>The chains are short. Nothing below a million takes more than seven replacements, so there is no\nperformance question here at all, only the boundary between one digit and two.</p>\n",
  "hints": [
   "The loop should keep going while the value has more than one digit. What test is that?",
   "Repeat while the value is 10 or more. Take the product with modulo 10 and integer division, and do not skip zero digits."
  ],
  "fname": "persistence",
  "task": "\n<ul>\n<li>The function has 1 parameter: an integer, <code>start</code>, the number to begin with.</li>\n<li>The function returns an integer, the number of replacements.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "39"
    ],
    "out": "3"
   },
   {
    "in": [
     "5"
    ],
    "out": "0"
   },
   {
    "in": [
     "77"
    ],
    "out": "4"
   }
  ],
  "tests": [
   {
    "in": [
     "39"
    ],
    "out": "3"
   },
   {
    "in": [
     "5"
    ],
    "out": "0"
   },
   {
    "in": [
     "77"
    ],
    "out": "4"
   },
   {
    "in": [
     "1"
    ],
    "out": "0"
   },
   {
    "in": [
     "10"
    ],
    "out": "1"
   },
   {
    "in": [
     "25"
    ],
    "out": "2"
   },
   {
    "in": [
     "679"
    ],
    "out": "5"
   },
   {
    "in": [
     "6788"
    ],
    "out": "6"
   },
   {
    "in": [
     "68889"
    ],
    "out": "7"
   },
   {
    "in": [
     "999999"
    ],
    "out": "3"
   },
   {
    "in": [
     "100000"
    ],
    "out": "1"
   },
   {
    "in": [
     "999"
    ],
    "out": "4"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef persistence(start: int) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(persistence(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int persistence(int start) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(persistence(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint persistence(int start) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << persistence(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef persistence(start: int) -> int:\n\n    n = start\n    count = 0\n    while n >= 10:\n        total = 1\n        while n > 0:\n            total *= n % 10\n            n //= 10\n        n = total\n        count += 1\n    return count\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(persistence(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int persistence(int start) {\n\n        int n = start, count = 0;\n        while (n >= 10) {\n            int total = 1;\n            while (n > 0) { total *= n % 10; n /= 10; }\n            n = total;\n            count++;\n        }\n        return count;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(persistence(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint persistence(int start) {\n\n    int n = start, count = 0;\n    while (n >= 10) {\n        int total = 1;\n        while (n > 0) { total *= n % 10; n /= 10; }\n        n = total;\n        count++;\n    }\n    return count;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << persistence(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "base-parade",
  "division": "Junior",
  "contest": 1,
  "title": "Base Parade",
  "blurb": "Rewrite a number in another base and report the digit that turns up most often.",
  "statement": "\n<p>Write a whole number in a given base, using the digits 0 through 9 and then the letters A\nthrough F for the values 10 through 15.</p>\n\n<p>Report the digit that appears most often in that representation, together with how many times\nit appears. If two or more digits are tied for most common, report the one with the larger value.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>255<br>16</td></tr>\n<tr><th>Output</th><td>F 2</td></tr>\n<tr><th>Explanation</th><td>\n255 in base 16 is FF.<br>\nThe digit F appears twice and no other digit appears at all.\n</td></tr></table>\n",
  "input_spec": "Input the number on the first line and the base on the second line.",
  "output_spec": "Output the most common digit, a single space, and the number of times it appears.",
  "constraints": "The number is between 1 and 999999, inclusive. The base is between 2 and 16, inclusive.",
  "approach": "\n<p>Two separate jobs, and neither is hard once they are kept apart. First convert, then count.</p>\n\n<p>Convert by repeated division: take the value modulo the base to get a digit, divide the value by\nthe base, and repeat while the value is above zero. That produces the digits from least significant to\nmost significant, which is backwards, but for this problem the order never matters, since you are only\ncounting how often each digit appears.</p>\n\n<p>Keep a tally of sixteen counters rather than building the string and scanning it. Index the tally by\nthe digit's numeric value, which is exactly what the modulo hands you, and the letters take care of\nthemselves: only when you print the answer do you turn a value into a character, using the digits 0\nthrough 9 for values below 10 and the letters A through F above.</p>\n\n<p>Start the best digit at base minus 1, the largest digit allowed in this base. Sweep the remaining digits downward and replace the best only when a count is strictly larger. Because\nyou are moving down from the largest value, that automatically settles ties in favor of the larger\ndigit without any extra comparison. Sweeping upward and using a strictly greater test would give the\nsmaller one instead.</p>\n",
  "hints": [
   "You never need to build the converted string. What do you actually need from it?",
   "Tally sixteen counters indexed by digit value while dividing down by the base. Start with the largest allowed digit, then scan downward and replace it only for a strictly larger count."
  ],
  "fname": "commonDigit",
  "task": "\n<ul>\n<li>The function has 2 parameters: an integer, <code>value</code>, the number to convert, and an\ninteger, <code>base</code>, the base to write it in.</li>\n<li>The function returns a string, the most common digit followed by a space and its count.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "255",
     "16"
    ],
    "out": "F 2"
   },
   {
    "in": [
     "1",
     "2"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "100",
     "10"
    ],
    "out": "0 2"
   }
  ],
  "tests": [
   {
    "in": [
     "255",
     "16"
    ],
    "out": "F 2"
   },
   {
    "in": [
     "1",
     "2"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "100",
     "10"
    ],
    "out": "0 2"
   },
   {
    "in": [
     "64",
     "8"
    ],
    "out": "0 2"
   },
   {
    "in": [
     "999999",
     "7"
    ],
    "out": "3 4"
   },
   {
    "in": [
     "4095",
     "16"
    ],
    "out": "F 3"
   },
   {
    "in": [
     "7",
     "2"
    ],
    "out": "1 3"
   },
   {
    "in": [
     "999999",
     "2"
    ],
    "out": "1 12"
   },
   {
    "in": [
     "512",
     "8"
    ],
    "out": "0 3"
   },
   {
    "in": [
     "43690",
     "16"
    ],
    "out": "A 4"
   },
   {
    "in": [
     "999999",
     "16"
    ],
    "out": "F 2"
   },
   {
    "in": [
     "10",
     "2"
    ],
    "out": "1 2"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef commonDigit(value: int, base: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        value = int(_lines[_i + 0].strip())\n        base = int(_lines[_i + 1].strip())\n        print(commonDigit(value, base))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String commonDigit(int value, int base) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int value = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int base = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(commonDigit(value, base)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring commonDigit(int value, int base) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int value = stoi(_lines[_i + 0]);\n        int base = stoi(_lines[_i + 1]);\n        cout << commonDigit(value, base) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef commonDigit(value: int, base: int) -> str:\n\n    digits = \"0123456789ABCDEF\"\n    tally = [0] * 16\n    n = value\n    while n > 0:\n        tally[n % base] += 1\n        n //= base\n    best = base - 1\n    for d in range(base - 2, -1, -1):\n        if tally[d] > tally[best]:\n            best = d\n    return digits[best] + \" \" + str(tally[best])\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        value = int(_lines[_i + 0].strip())\n        base = int(_lines[_i + 1].strip())\n        print(commonDigit(value, base))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String commonDigit(int value, int base) {\n\n        String digits = \"0123456789ABCDEF\";\n        int[] tally = new int[16];\n        int n = value;\n        while (n > 0) { tally[n % base]++; n /= base; }\n        int best = base - 1;\n        for (int d = base - 2; d >= 0; d--) if (tally[d] > tally[best]) best = d;\n        return digits.charAt(best) + \" \" + tally[best];\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int value = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int base = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(commonDigit(value, base)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring commonDigit(int value, int base) {\n\n    string digits = \"0123456789ABCDEF\";\n    vector<int> tally(16, 0);\n    int n = value;\n    while (n > 0) { tally[n % base]++; n /= base; }\n    int best = base - 1;\n    for (int d = base - 2; d >= 0; d--) if (tally[d] > tally[best]) best = d;\n    return string(1, digits[best]) + \" \" + to_string(tally[best]);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int value = stoi(_lines[_i + 0]);\n        int base = stoi(_lines[_i + 1]);\n        cout << commonDigit(value, base) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "bus-route",
  "division": "Junior",
  "contest": 2,
  "title": "Bus Route",
  "blurb": "Run a bus down its route and find the stop where it was fullest.",
  "statement": "\n<p>A bus begins its route empty. At each stop, everyone who is getting off leaves first, and only\nthen does anyone board.</p>\n\n<p>Report the largest number of passengers the bus ever carried away from a stop, and the number of\nthe first stop at which that number was reached. Stops are numbered from 1.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>5:0 3:2 4:1</td></tr>\n<tr><th>Output</th><td>9 3</td></tr>\n<tr><th>Explanation</th><td>\nStop 1: nobody off, 5 on, leaving 5 aboard.<br>\nStop 2: 2 off and 3 on, leaving 6 aboard.<br>\nStop 3: 1 off and 4 on, leaving 9 aboard.<br>\nThe largest load is 9, first reached leaving stop 3.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the stops in order, separated by single spaces. Each stop is written as the number boarding, a colon, and the number getting off.",
  "output_spec": "Output the largest load, a single space, and the number of the first stop at which it was reached.",
  "constraints": "There are between 1 and 50 stops. Each count is between 0 and 99. Nobody ever gets off who is not aboard.",
  "approach": "\n<p>One pass, one running total, and two things to remember. Split the line into stops, then split\neach stop at the colon into a boarding count and an alighting count.</p>\n\n<p>The order of the two operations at each stop is stated in the problem and it matters: subtract the\npassengers getting off first, then add the ones boarding. Doing it the other way round would let a\nboarding passenger be counted among those who could get off, which changes nothing about the running\ntotal here but would break the moment the problem let anyone do both.</p>\n\n<p>Keep the best load seen so far and the stop it happened at. Start the best at a value below zero\nrather than at 0, so that the first stop always sets it. If you start at 0 and the bus stays empty the\nwhole way, your recorded stop number is never written at all, and a route like the second sample would\nreport stop 0 rather than stop 1.</p>\n\n<p>Use a strictly greater comparison when you update. That keeps the first stop where the maximum was\nreached rather than the last, which is what the problem asks for. A greater than or equal test would\nreport the last one instead, and the sample with 9 on and 9 off shows the difference.</p>\n",
  "hints": [
   "The order of the two operations at each stop is given in the statement. Which one comes first?",
   "Subtract those getting off before adding those boarding. Start the best load below zero so the first stop always sets it, and update only on a strictly larger load."
  ],
  "fname": "busiest",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>route</code>, the stops in order.</li>\n<li>The function returns a string, the largest load followed by a space and the stop number.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "5:0 3:2 4:1"
    ],
    "out": "9 3"
   },
   {
    "in": [
     "0:0"
    ],
    "out": "0 1"
   },
   {
    "in": [
     "9:0 0:9 9:0"
    ],
    "out": "9 1"
   }
  ],
  "tests": [
   {
    "in": [
     "5:0 3:2 4:1"
    ],
    "out": "9 3"
   },
   {
    "in": [
     "0:0"
    ],
    "out": "0 1"
   },
   {
    "in": [
     "9:0 0:9 9:0"
    ],
    "out": "9 1"
   },
   {
    "in": [
     "1:0 1:0 1:0 0:3"
    ],
    "out": "3 3"
   },
   {
    "in": [
     "99:0"
    ],
    "out": "99 1"
   },
   {
    "in": [
     "10:0 0:5 5:5 5:0"
    ],
    "out": "10 1"
   },
   {
    "in": [
     "3:0 3:0 0:6 3:0"
    ],
    "out": "6 2"
   },
   {
    "in": [
     "0:0 0:0 7:0"
    ],
    "out": "7 3"
   },
   {
    "in": [
     "50:0 50:0"
    ],
    "out": "100 2"
   },
   {
    "in": [
     "2:0 2:1 2:1 2:1"
    ],
    "out": "5 4"
   },
   {
    "in": [
     "99:0 0:99 99:0 0:99"
    ],
    "out": "99 1"
   },
   {
    "in": [
     "4:0 0:4 4:0 0:4 4:0"
    ],
    "out": "4 1"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef busiest(route: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        route = _lines[_i + 0].strip()\n        print(busiest(route))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String busiest(String route) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String route = _lines.get(_i + 0);\n            _sb.append(busiest(route)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring busiest(string route) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string route = _lines[_i + 0];\n        cout << busiest(route) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef busiest(route: str) -> str:\n\n    aboard = 0\n    best = -1\n    where = 1\n    stop = 0\n    for token in route.split():\n        stop += 1\n        on, off = token.split(\":\")\n        aboard -= int(off)\n        aboard += int(on)\n        if aboard > best:\n            best = aboard\n            where = stop\n    return str(best) + \" \" + str(where)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        route = _lines[_i + 0].strip()\n        print(busiest(route))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String busiest(String route) {\n\n        int aboard = 0, best = -1, where = 1, stop = 0;\n        for (String token : route.trim().split(\"\\\\s+\")) {\n            stop++;\n            String[] parts = token.split(\":\");\n            aboard -= Integer.parseInt(parts[1]);\n            aboard += Integer.parseInt(parts[0]);\n            if (aboard > best) { best = aboard; where = stop; }\n        }\n        return best + \" \" + where;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String route = _lines.get(_i + 0);\n            _sb.append(busiest(route)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring busiest(string route) {\n\n    int aboard = 0, best = -1, where = 1, stop = 0;\n    string token;\n    istringstream is(route);\n    while (is >> token) {\n        stop++;\n        size_t colon = token.find(':');\n        int on = stoi(token.substr(0, colon));\n        int off = stoi(token.substr(colon + 1));\n        aboard -= off;\n        aboard += on;\n        if (aboard > best) { best = aboard; where = stop; }\n    }\n    return to_string(best) + \" \" + to_string(where);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string route = _lines[_i + 0];\n        cout << busiest(route) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "bracket-depth",
  "division": "Junior",
  "contest": 2,
  "title": "Bracket Depth",
  "blurb": "Check that a run of brackets closes properly and report how deep it nests.",
  "statement": "\n<p>A string is made only of the six bracket characters ( ) [ ] { }. It is balanced when every\nopening bracket is closed later by a bracket of the same kind, and each closing bracket matches the most recently opened bracket that has not yet been closed. Brackets must nest, so ([)] is not balanced.</p>\n\n<p>Report the greatest number of brackets open at any one moment. If the string is not balanced,\nreport &minus;1 instead.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>([{}])</td></tr>\n<tr><th>Output</th><td>3</td></tr>\n<tr><th>Explanation</th><td>\nAfter the round bracket, 1 is open.<br>\nAfter the square bracket, 2 are open.<br>\nAfter the curly bracket, 3 are open, which is the deepest it gets.<br>\nThe three closing brackets then match in the reverse order.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the bracket string.",
  "output_spec": "Output an integer, the greatest number of brackets open at once, or -1 if the string is not balanced.",
  "constraints": "The string holds between 1 and 200 characters, each of which is one of ( ) [ ] { }.",
  "approach": "\n<p>This is what a stack is for. Walk the string one character at a time. An opening bracket is\npushed; a closing bracket has to match whatever is on top, so pop and compare.</p>\n\n<p>There are two separate ways for a string to fail and both need handling. A closing bracket may\narrive when the stack is empty, which means nothing was waiting for it, and a closing bracket may\narrive when the top of the stack is a different kind, which means the brackets cross rather than\nnest. Either one is an immediate -1. Test for the empty stack before you look at what is on top, or\nyou will read past the end of it.</p>\n\n<p>There is a third failure that only shows up at the very end. If the loop finishes with the stack\nstill holding something, those brackets were opened and never closed, so the answer is -1 even though\nnothing went wrong along the way. A string like ( ( ) passes every test inside the loop.</p>\n\n<p>The depth is simply the size of the stack, and the deepest it ever gets is what the problem wants.\nTake that reading immediately after each push, since that is the only moment the stack grows.</p>\n",
  "hints": [
   "Which bracket does a closing bracket have to match? Only one is a candidate at any moment.",
   "Push openers on a stack and pop on a closer, checking the stack is not empty first. After the loop, anything still on the stack means the string was unbalanced."
  ],
  "fname": "deepest",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>brackets</code>, the bracket string.</li>\n<li>The function returns an integer, the greatest depth, or -1 if the string is not balanced.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "([{}])"
    ],
    "out": "3"
   },
   {
    "in": [
     "(]"
    ],
    "out": "-1"
   },
   {
    "in": [
     "()()"
    ],
    "out": "1"
   }
  ],
  "tests": [
   {
    "in": [
     "([{}])"
    ],
    "out": "3"
   },
   {
    "in": [
     "(]"
    ],
    "out": "-1"
   },
   {
    "in": [
     "()()"
    ],
    "out": "1"
   },
   {
    "in": [
     "("
    ],
    "out": "-1"
   },
   {
    "in": [
     ")"
    ],
    "out": "-1"
   },
   {
    "in": [
     "{[()]}[]"
    ],
    "out": "3"
   },
   {
    "in": [
     "(((((((((("
    ],
    "out": "-1"
   },
   {
    "in": [
     "(()"
    ],
    "out": "-1"
   },
   {
    "in": [
     "())("
    ],
    "out": "-1"
   },
   {
    "in": [
     "[](){}"
    ],
    "out": "1"
   },
   {
    "in": [
     "[({})]"
    ],
    "out": "3"
   },
   {
    "in": [
     "{{[[(())]]}}"
    ],
    "out": "6"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef deepest(brackets: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        brackets = _lines[_i + 0].strip()\n        print(deepest(brackets))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int deepest(String brackets) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String brackets = _lines.get(_i + 0);\n            _sb.append(deepest(brackets)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint deepest(string brackets) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string brackets = _lines[_i + 0];\n        cout << deepest(brackets) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef deepest(brackets: str) -> int:\n\n    pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    stack = []\n    best = 0\n    for c in brackets:\n        if c in \"([{\":\n            stack.append(c)\n            if len(stack) > best:\n                best = len(stack)\n        else:\n            if not stack or stack[-1] != pairs[c]:\n                return -1\n            stack.pop()\n    return -1 if stack else best\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        brackets = _lines[_i + 0].strip()\n        print(deepest(brackets))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int deepest(String brackets) {\n\n        Deque<Character> stack = new ArrayDeque<>();\n        int best = 0;\n        for (char c : brackets.toCharArray()) {\n            if (c == '(' || c == '[' || c == '{') {\n                stack.push(c);\n                if (stack.size() > best) best = stack.size();\n            } else {\n                char want = c == ')' ? '(' : c == ']' ? '[' : '{';\n                if (stack.isEmpty() || stack.peek() != want) return -1;\n                stack.pop();\n            }\n        }\n        return stack.isEmpty() ? best : -1;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String brackets = _lines.get(_i + 0);\n            _sb.append(deepest(brackets)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint deepest(string brackets) {\n\n    vector<char> stack;\n    int best = 0;\n    for (char c : brackets) {\n        if (c == '(' || c == '[' || c == '{') {\n            stack.push_back(c);\n            if ((int) stack.size() > best) best = (int) stack.size();\n        } else {\n            char want = c == ')' ? '(' : c == ']' ? '[' : '{';\n            if (stack.empty() || stack.back() != want) return -1;\n            stack.pop_back();\n        }\n    }\n    return stack.empty() ? best : -1;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string brackets = _lines[_i + 0];\n        cout << deepest(brackets) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "skip-counting",
  "division": "Junior",
  "contest": 2,
  "title": "Skip Counting",
  "blurb": "Hop around a circular track by a fixed stride and see how much of it you cover.",
  "statement": "\n<p>A circular track has N slots, numbered 0 through N &minus; 1 in order, with slot N &minus; 1\nsitting next to slot 0. You start on slot 0 and repeatedly hop forward exactly S slots, wrapping past\nthe end of the track as often as necessary.</p>\n\n<p>You stop the moment you land back on slot 0. Report how many different slots you stood on,\ncounting slot 0 once, and the largest slot number among them.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>12<br>8</td></tr>\n<tr><th>Output</th><td>3 8</td></tr>\n<tr><th>Explanation</th><td>\nStart on 0, hop to 8, hop to 4, hop back to 0 and stop.<br>\nThree different slots were visited: 0, 4, and 8.<br>\nThe largest of them is 8.\n</td></tr></table>\n",
  "input_spec": "Input the number of slots on the first line and the stride on the second line.",
  "output_spec": "Output the number of different slots visited, a single space, and the largest slot number visited.",
  "constraints": "The number of slots is between 2 and 100000, inclusive. The stride is between 1 and 100000, inclusive.",
  "approach": "\n<p>Simulate it. Keep a current slot, and on each hop add the stride and take the result modulo\nthe number of slots, which is what makes the track circular. Stop when the new slot is 0 again.</p>\n\n<p>Structure the loop so that slot 0 is recorded before the first hop and the test happens after it.\nA loop that tests first would stop immediately, since you begin on slot 0. Recording, then hopping,\nthen testing is the shape that works.</p>\n\n<p>You do not need a set. The visited slots are simply every multiple of the stride taken modulo the\ntrack size, and no slot can repeat before you return to 0, so counting the hops is enough. Track the\nlargest slot seen with a running maximum as you go.</p>\n\n<p>The tour always closes, and it never takes more hops than there are slots, so the loop is safe even\nat the largest track size. If you want to check your answer, the number of slots visited is the track\nsize divided by the greatest common divisor of the track size and the stride, and the largest slot is\nthe track size minus that divisor. A stride that is a multiple of the track size visits slot 0 alone,\nas in the sample with 6 slots and a stride of 6.</p>\n",
  "hints": [
   "Record where you are before hopping, or the loop stops immediately.",
   "Add the stride and take the result modulo the track size. Count the slot, hop, then test for slot 0. The tour always closes within one lap of distinct slots."
  ],
  "fname": "skipTour",
  "task": "\n<ul>\n<li>The function has 2 parameters: an integer, <code>slots</code>, the size of the track, and an\ninteger, <code>stride</code>, the size of each hop.</li>\n<li>The function returns a string, the number of slots visited followed by a space and the largest\nslot number visited.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "12",
     "8"
    ],
    "out": "3 8"
   },
   {
    "in": [
     "10",
     "3"
    ],
    "out": "10 9"
   },
   {
    "in": [
     "6",
     "6"
    ],
    "out": "1 0"
   }
  ],
  "tests": [
   {
    "in": [
     "12",
     "8"
    ],
    "out": "3 8"
   },
   {
    "in": [
     "10",
     "3"
    ],
    "out": "10 9"
   },
   {
    "in": [
     "6",
     "6"
    ],
    "out": "1 0"
   },
   {
    "in": [
     "2",
     "1"
    ],
    "out": "2 1"
   },
   {
    "in": [
     "100000",
     "1"
    ],
    "out": "100000 99999"
   },
   {
    "in": [
     "100000",
     "99999"
    ],
    "out": "100000 99999"
   },
   {
    "in": [
     "100",
     "25"
    ],
    "out": "4 75"
   },
   {
    "in": [
     "7",
     "3"
    ],
    "out": "7 6"
   },
   {
    "in": [
     "36",
     "24"
    ],
    "out": "3 24"
   },
   {
    "in": [
     "99991",
     "12345"
    ],
    "out": "99991 99990"
   },
   {
    "in": [
     "50",
     "100000"
    ],
    "out": "1 0"
   },
   {
    "in": [
     "1000",
     "500"
    ],
    "out": "2 500"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef skipTour(slots: int, stride: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        slots = int(_lines[_i + 0].strip())\n        stride = int(_lines[_i + 1].strip())\n        print(skipTour(slots, stride))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String skipTour(int slots, int stride) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int slots = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int stride = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(skipTour(slots, stride)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring skipTour(int slots, int stride) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int slots = stoi(_lines[_i + 0]);\n        int stride = stoi(_lines[_i + 1]);\n        cout << skipTour(slots, stride) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef skipTour(slots: int, stride: int) -> str:\n\n    count = 0\n    biggest = 0\n    cur = 0\n    while True:\n        count += 1\n        if cur > biggest:\n            biggest = cur\n        cur = (cur + stride) % slots\n        if cur == 0:\n            break\n    return str(count) + \" \" + str(biggest)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        slots = int(_lines[_i + 0].strip())\n        stride = int(_lines[_i + 1].strip())\n        print(skipTour(slots, stride))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String skipTour(int slots, int stride) {\n\n        int count = 0, biggest = 0, cur = 0;\n        while (true) {\n            count++;\n            if (cur > biggest) biggest = cur;\n            cur = (cur + stride % slots) % slots;\n            if (cur == 0) break;\n        }\n        return count + \" \" + biggest;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int slots = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int stride = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(skipTour(slots, stride)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring skipTour(int slots, int stride) {\n\n    int count = 0, biggest = 0, cur = 0;\n    while (true) {\n        count++;\n        if (cur > biggest) biggest = cur;\n        cur = (cur + stride % slots) % slots;\n        if (cur == 0) break;\n    }\n    return to_string(count) + \" \" + to_string(biggest);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int slots = stoi(_lines[_i + 0]);\n        int stride = stoi(_lines[_i + 1]);\n        cout << skipTour(slots, stride) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "seat-map",
  "division": "Junior",
  "contest": 3,
  "title": "Seat Map",
  "blurb": "Read a theater's seating chart and find the row with the most seats still free.",
  "statement": "\n<p>A theater's seating chart is drawn one row at a time. A full stop marks a free seat and a hash\nmarks a taken one. Every row holds the same number of seats.</p>\n\n<p>Report how many free seats the emptiest row has, and the number of that row. Rows are numbered\nfrom 1 in the order they are given, and if two rows tie, report the earlier one.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>..#;#..;###</td></tr>\n<tr><th>Output</th><td>2 1</td></tr>\n<tr><th>Explanation</th><td>\nRow 1 has two free seats.<br>\nRow 2 has two free seats as well.<br>\nRow 3 has none.<br>\nRows 1 and 2 tie, so the earlier one is reported.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the rows in order, separated by semicolons. Each row is a run of full stops and hashes.",
  "output_spec": "Output the number of free seats in the emptiest row, a single space, and the number of that row.",
  "constraints": "There are between 1 and 40 rows, each holding between 1 and 40 seats. Every row holds the same number of seats.",
  "approach": "\n<p>Split the line at the semicolons and you have the rows. Everything after that is one pass with\na running best.</p>\n\n<p>For each row, count the full stops. There is no need to look at the hashes at all, since every\ncharacter is one or the other, though counting hashes and subtracting from the row's length works\nequally well.</p>\n\n<p>Keep the best count found so far along with the row it came from, and update only when a row is\nstrictly better. That is what settles ties in favor of the earlier row: a later row with the same count\nnever displaces it. Using greater than or equal instead would report the last such row, and the sample\nis built so that the two answers differ.</p>\n\n<p>Start the best count below zero rather than at 0. A chart in which every row is completely full\nwould otherwise never record a row number at all, and the second sample is exactly that chart.</p>\n",
  "hints": [
   "Splitting the line at the semicolons gives you the rows. What do you need from each one?",
   "Count the full stops per row, keeping the best count and its row number. Update only on a strictly larger count so ties go to the earlier row."
  ],
  "fname": "emptiestRow",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>chart</code>, the rows separated by\nsemicolons.</li>\n<li>The function returns a string, the free seat count followed by a space and the row number.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "..#;#..;###"
    ],
    "out": "2 1"
   },
   {
    "in": [
     "#"
    ],
    "out": "0 1"
   },
   {
    "in": [
     "#.#;.#.;#.#"
    ],
    "out": "2 2"
   }
  ],
  "tests": [
   {
    "in": [
     "..#;#..;###"
    ],
    "out": "2 1"
   },
   {
    "in": [
     "#"
    ],
    "out": "0 1"
   },
   {
    "in": [
     "#.#;.#.;#.#"
    ],
    "out": "2 2"
   },
   {
    "in": [
     "..."
    ],
    "out": "3 1"
   },
   {
    "in": [
     "###;###;..#"
    ],
    "out": "2 3"
   },
   {
    "in": [
     ".;#;.;#"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "##.#;.#.#;####"
    ],
    "out": "2 2"
   },
   {
    "in": [
     "....;...."
    ],
    "out": "4 1"
   },
   {
    "in": [
     "#.;.#"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "##########;.........#;##########"
    ],
    "out": "9 2"
   },
   {
    "in": [
     ".#.#.#;......;######"
    ],
    "out": "6 2"
   },
   {
    "in": [
     "#;#;#;#;#;#"
    ],
    "out": "0 1"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef emptiestRow(chart: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        chart = _lines[_i + 0].strip()\n        print(emptiestRow(chart))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String emptiestRow(String chart) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String chart = _lines.get(_i + 0);\n            _sb.append(emptiestRow(chart)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring emptiestRow(string chart) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string chart = _lines[_i + 0];\n        cout << emptiestRow(chart) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef emptiestRow(chart: str) -> str:\n\n    best = -1\n    where = 1\n    row = 0\n    for line in chart.split(\";\"):\n        row += 1\n        free = line.count(\".\")\n        if free > best:\n            best = free\n            where = row\n    return str(best) + \" \" + str(where)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        chart = _lines[_i + 0].strip()\n        print(emptiestRow(chart))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String emptiestRow(String chart) {\n\n        int best = -1, where = 1, row = 0;\n        for (String line : chart.split(\";\")) {\n            row++;\n            int free = 0;\n            for (char c : line.toCharArray()) if (c == '.') free++;\n            if (free > best) { best = free; where = row; }\n        }\n        return best + \" \" + where;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String chart = _lines.get(_i + 0);\n            _sb.append(emptiestRow(chart)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring emptiestRow(string chart) {\n\n    int best = -1, where = 1, row = 0;\n    string line;\n    istringstream is(chart);\n    while (getline(is, line, ';')) {\n        row++;\n        int free = 0;\n        for (char c : line) if (c == '.') free++;\n        if (free > best) { best = free; where = row; }\n    }\n    return to_string(best) + \" \" + to_string(where);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string chart = _lines[_i + 0];\n        cout << emptiestRow(chart) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "hot-streak",
  "division": "Junior",
  "contest": 3,
  "title": "Hot Streak",
  "blurb": "Find the longest stretch of strictly rising numbers and say where it ended.",
  "statement": "\n<p>A list of integers is given in order. A streak is a stretch of neighboring values in which\neach one is strictly larger than the one before it. A single value on its own is a streak of length\n1.</p>\n\n<p>Report the length of the longest streak and the value it ends on. If two streaks tie for\nlongest, report the one that ends earlier.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>1 3 5 4 6 7 8 2</td></tr>\n<tr><th>Output</th><td>4 8</td></tr>\n<tr><th>Explanation</th><td>\nThe streak 1 3 5 has length 3.<br>\nThe streak 4 6 7 8 has length 4 and is the longest.<br>\nIt ends on 8, and the 2 that follows begins a new streak of length 1.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the values in order, each separated by a single space.",
  "output_spec": "Output the length of the longest streak, a single space, and the value it ends on.",
  "constraints": "There are between 1 and 200 values, each between -9999 and 9999, inclusive.",
  "approach": "\n<p>One pass and two counters. Keep the length of the streak currently running, and separately the\nbest length seen so far together with the value it ended on.</p>\n\n<p>At each position, compare the value with the one before it. If it is strictly larger, the current\nstreak grows by one; otherwise a new streak starts and the current length resets to 1. Both the\ncurrent length and the best have to start at 1 rather than 0, because a single value is already a\nstreak.</p>\n\n<p>The comparison must be strictly greater. Equal neighbors break the streak, which is what the\nstatement means by strictly rising, and a test using greater than or equal would report 6 rather than 1\nfor a list of six equal values.</p>\n\n<p>Update the best only when the current streak is strictly longer. That keeps the earlier of two tied\nstreaks, which is what the problem asks for. Record the value at the same moment you record the length,\nsince the value you want is the one at the position you are standing on, not the largest in the\nlist.</p>\n",
  "hints": [
   "You need two lengths at once: the streak you are in and the best you have seen.",
   "Reset the current length to 1 whenever a value is not strictly larger than the one before it. Record the ending value at the same moment you record a new best."
  ],
  "fname": "longestRun",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>values</code>, the numbers separated by single\nspaces.</li>\n<li>The function returns a string, the streak length followed by a space and its final value.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "1 3 5 4 6 7 8 2"
    ],
    "out": "4 8"
   },
   {
    "in": [
     "5"
    ],
    "out": "1 5"
   },
   {
    "in": [
     "9 8 7"
    ],
    "out": "1 9"
   }
  ],
  "tests": [
   {
    "in": [
     "1 3 5 4 6 7 8 2"
    ],
    "out": "4 8"
   },
   {
    "in": [
     "5"
    ],
    "out": "1 5"
   },
   {
    "in": [
     "9 8 7"
    ],
    "out": "1 9"
   },
   {
    "in": [
     "1 2 3 1 2 3"
    ],
    "out": "3 3"
   },
   {
    "in": [
     "1 1 1 1"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "-5 -3 -1 0"
    ],
    "out": "4 0"
   },
   {
    "in": [
     "4 4 5 5 6 6"
    ],
    "out": "2 5"
   },
   {
    "in": [
     "10 20 30 40 50"
    ],
    "out": "5 50"
   },
   {
    "in": [
     "3 2 1 2 3 4"
    ],
    "out": "4 4"
   },
   {
    "in": [
     "-9999 9999"
    ],
    "out": "2 9999"
   },
   {
    "in": [
     "7 7 7 8 9 1 2 3 4"
    ],
    "out": "4 4"
   },
   {
    "in": [
     "0 -1 0 -1 0"
    ],
    "out": "2 0"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef longestRun(values: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        values = _lines[_i + 0].strip()\n        print(longestRun(values))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String longestRun(String values) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String values = _lines.get(_i + 0);\n            _sb.append(longestRun(values)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring longestRun(string values) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string values = _lines[_i + 0];\n        cout << longestRun(values) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef longestRun(values: str) -> str:\n\n    nums = [int(t) for t in values.split()]\n    best = 1\n    run = 1\n    ending = nums[0]\n    for i in range(1, len(nums)):\n        run = run + 1 if nums[i] > nums[i - 1] else 1\n        if run > best:\n            best = run\n            ending = nums[i]\n    return str(best) + \" \" + str(ending)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        values = _lines[_i + 0].strip()\n        print(longestRun(values))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String longestRun(String values) {\n\n        String[] parts = values.trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        int best = 1, run = 1, ending = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            run = nums[i] > nums[i - 1] ? run + 1 : 1;\n            if (run > best) { best = run; ending = nums[i]; }\n        }\n        return best + \" \" + ending;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String values = _lines.get(_i + 0);\n            _sb.append(longestRun(values)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring longestRun(string values) {\n\n    vector<int> nums;\n    int x;\n    istringstream is(values);\n    while (is >> x) nums.push_back(x);\n    int best = 1, run = 1, ending = nums[0];\n    for (size_t i = 1; i < nums.size(); i++) {\n        run = nums[i] > nums[i - 1] ? run + 1 : 1;\n        if (run > best) { best = run; ending = (int) nums[i]; }\n    }\n    return to_string(best) + \" \" + to_string(ending);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string values = _lines[_i + 0];\n        cout << longestRun(values) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "magic-square",
  "division": "Junior",
  "contest": 3,
  "title": "Magic Square",
  "blurb": "Check whether every row, column, and diagonal of a square grid adds to the same total.",
  "statement": "\n<p>A square grid of integers is given one row at a time. It is magic when every row, every\ncolumn, and both of the two long diagonals add up to the same total.</p>\n\n<p>Report that total if the grid is magic. Otherwise report NO. A one by one grid is always magic,\nsince its single value is at once its only row, its only column, and both diagonals.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>2 7 6;9 5 1;4 3 8</td></tr>\n<tr><th>Output</th><td>15</td></tr>\n<tr><th>Explanation</th><td>\nThe rows add to 15, 15, and 15.<br>\nThe columns add to 15, 15, and 15.<br>\nThe diagonals 2 5 8 and 6 5 4 both add to 15 as well.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the rows in order, separated by semicolons. Within a row the values are separated by single spaces.",
  "output_spec": "Output the common total, or NO if the grid is not magic.",
  "constraints": "The grid is between 1 by 1 and 12 by 12. Every value is between -999 and 999, inclusive.",
  "approach": "\n<p>Parse first, check afterwards. Split the line at the semicolons to get the rows, then split\neach row at the spaces to get its values, and store the whole thing in a two dimensional array. Trying\nto check while parsing makes the column and diagonal work far harder than it needs to be.</p>\n\n<p>Take the target total from the first row and then test everything against it. There are four\nseparate things to check and it is easy to stop after two: every row, every column, the diagonal\nrunning from the top left to the bottom right, and the diagonal running from the top right to the\nbottom left.</p>\n\n<p>The columns need the subscripts the other way round from the rows. Where a row sum fixes the row and\nruns the column subscript, a column sum fixes the column and runs the row subscript, so the loops look\nalmost identical and the two subscripts are swapped inside.</p>\n\n<p>The two diagonals are the cells where the subscripts agree and the cells where they add to one less\nthan the size of the grid. Both are single loops. The grid 1 0;0 1 has row and column totals of 1, but diagonal totals of 2 and 0. It shows why neither diagonal check can be skipped.</p>\n",
  "hints": [
   "There are four things to check, not two. Which ones are easy to forget?",
   "Take the target from the first row, then check every row, every column, and both diagonals. The columns need the two subscripts swapped relative to the rows."
  ],
  "fname": "magicSum",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>grid</code>, the rows separated by\nsemicolons.</li>\n<li>The function returns a string, the common total or the word NO.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "2 7 6;9 5 1;4 3 8"
    ],
    "out": "15"
   },
   {
    "in": [
     "1 2;3 4"
    ],
    "out": "NO"
   },
   {
    "in": [
     "5"
    ],
    "out": "5"
   }
  ],
  "tests": [
   {
    "in": [
     "2 7 6;9 5 1;4 3 8"
    ],
    "out": "15"
   },
   {
    "in": [
     "1 2;3 4"
    ],
    "out": "NO"
   },
   {
    "in": [
     "5"
    ],
    "out": "5"
   },
   {
    "in": [
     "1 1;1 1"
    ],
    "out": "2"
   },
   {
    "in": [
     "16 3 2 13;5 10 11 8;9 6 7 12;4 15 14 1"
    ],
    "out": "34"
   },
   {
    "in": [
     "2 7 6;9 5 1;4 8 3"
    ],
    "out": "NO"
   },
   {
    "in": [
     "0"
    ],
    "out": "0"
   },
   {
    "in": [
     "1 0;0 1"
    ],
    "out": "NO"
   },
   {
    "in": [
     "8 1 6;3 5 7;4 9 2"
    ],
    "out": "15"
   },
   {
    "in": [
     "-1 -1;-1 -1"
    ],
    "out": "-2"
   },
   {
    "in": [
     "3 3 3;3 3 3;3 3 3"
    ],
    "out": "9"
   },
   {
    "in": [
     "1 2 3;4 5 6;7 8 9"
    ],
    "out": "NO"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef magicSum(grid: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        grid = _lines[_i + 0].strip()\n        print(magicSum(grid))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String magicSum(String grid) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String grid = _lines.get(_i + 0);\n            _sb.append(magicSum(grid)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring magicSum(string grid) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string grid = _lines[_i + 0];\n        cout << magicSum(grid) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef magicSum(grid: str) -> str:\n\n    rows = [[int(t) for t in line.split()] for line in grid.split(\";\")]\n    n = len(rows)\n    target = sum(rows[0])\n    for r in rows:\n        if sum(r) != target:\n            return \"NO\"\n    for c in range(n):\n        if sum(rows[r][c] for r in range(n)) != target:\n            return \"NO\"\n    if sum(rows[i][i] for i in range(n)) != target:\n        return \"NO\"\n    if sum(rows[i][n - 1 - i] for i in range(n)) != target:\n        return \"NO\"\n    return str(target)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        grid = _lines[_i + 0].strip()\n        print(magicSum(grid))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String magicSum(String grid) {\n\n        String[] lines = grid.split(\";\");\n        int n = lines.length;\n        int[][] a = new int[n][n];\n        for (int i = 0; i < n; i++) {\n            String[] parts = lines[i].trim().split(\"\\\\s+\");\n            for (int j = 0; j < n; j++) a[i][j] = Integer.parseInt(parts[j]);\n        }\n        int target = 0;\n        for (int j = 0; j < n; j++) target += a[0][j];\n        for (int i = 0; i < n; i++) {\n            int s = 0;\n            for (int j = 0; j < n; j++) s += a[i][j];\n            if (s != target) return \"NO\";\n        }\n        for (int j = 0; j < n; j++) {\n            int s = 0;\n            for (int i = 0; i < n; i++) s += a[i][j];\n            if (s != target) return \"NO\";\n        }\n        int d1 = 0, d2 = 0;\n        for (int i = 0; i < n; i++) { d1 += a[i][i]; d2 += a[i][n - 1 - i]; }\n        if (d1 != target || d2 != target) return \"NO\";\n        return String.valueOf(target);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String grid = _lines.get(_i + 0);\n            _sb.append(magicSum(grid)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring magicSum(string grid) {\n\n    vector<vector<int>> a;\n    string line;\n    istringstream rowsIn(grid);\n    while (getline(rowsIn, line, ';')) {\n        vector<int> row;\n        int x;\n        istringstream is(line);\n        while (is >> x) row.push_back(x);\n        a.push_back(row);\n    }\n    int n = (int) a.size();\n    int target = 0;\n    for (int j = 0; j < n; j++) target += a[0][j];\n    for (int i = 0; i < n; i++) {\n        int s = 0;\n        for (int j = 0; j < n; j++) s += a[i][j];\n        if (s != target) return \"NO\";\n    }\n    for (int j = 0; j < n; j++) {\n        int s = 0;\n        for (int i = 0; i < n; i++) s += a[i][j];\n        if (s != target) return \"NO\";\n    }\n    int d1 = 0, d2 = 0;\n    for (int i = 0; i < n; i++) { d1 += a[i][i]; d2 += a[i][n - 1 - i]; }\n    if (d1 != target || d2 != target) return \"NO\";\n    return to_string(target);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string grid = _lines[_i + 0];\n        cout << magicSum(grid) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "run-length",
  "division": "Junior",
  "contest": 4,
  "title": "Run Length",
  "blurb": "Squash a string into letters and counts, one pair per run.",
  "statement": "\n<p>A run is a stretch of the same letter repeated. Rewrite a string by replacing each run with\nthat letter followed by the length of the run, working from left to right.</p>\n\n<p>Every run is written out, including a run of length 1, which becomes the letter followed by the\ndigit 1.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>AAABBC</td></tr>\n<tr><th>Output</th><td>A3B2C1</td></tr>\n<tr><th>Explanation</th><td>\nThree As become A3.<br>\nTwo Bs become B2.<br>\nOne C becomes C1.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the string.",
  "output_spec": "Output the encoded string.",
  "constraints": "The string holds between 1 and 200 characters, all of them capital letters from A through Z.",
  "approach": "\n<p>Walk the string with an outer index that jumps a whole run at a time. From position i, run a\nsecond index j forward while the character there still matches the one at i. When it stops, the run is\nj minus i characters long, so append the letter and that length, then set i to j and continue.</p>\n\n<p>A single index with a running counter works too, but it needs the closing run flushed after the loop\nends, and forgetting that is the usual bug: the last run is written by the code that notices a change,\nand at the end of the string there is no change left to notice. The two index version has no such tail\ncase, since the outer loop only stops when everything has already been written.</p>\n\n<p>The count is written as text, not as a character, so a run of twelve becomes the two characters 1\nand 2 rather than anything else. In Java and C++ that means converting the number rather than adding it\nto a character, and a run of length 12 in the third sample is there to catch exactly that slip.</p>\n\n<p>Build the answer in a string builder in Java rather than by repeated concatenation. At 200 characters\nit makes no practical difference, but it is the habit worth having.</p>\n",
  "hints": [
   "Advance past a whole run at a time rather than one character at a time.",
   "From position i, run j forward while the character matches, then write the letter and j minus i. Setting i to j means there is no final run left to flush."
  ],
  "fname": "encode",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>text</code>, the string to encode.</li>\n<li>The function returns a string, the encoded form.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "AAABBC"
    ],
    "out": "A3B2C1"
   },
   {
    "in": [
     "A"
    ],
    "out": "A1"
   },
   {
    "in": [
     "ZZZZZZZZZZZZ"
    ],
    "out": "Z12"
   }
  ],
  "tests": [
   {
    "in": [
     "AAABBC"
    ],
    "out": "A3B2C1"
   },
   {
    "in": [
     "A"
    ],
    "out": "A1"
   },
   {
    "in": [
     "ZZZZZZZZZZZZ"
    ],
    "out": "Z12"
   },
   {
    "in": [
     "ABCDE"
    ],
    "out": "A1B1C1D1E1"
   },
   {
    "in": [
     "AABBAABB"
    ],
    "out": "A2B2A2B2"
   },
   {
    "in": [
     "MISSISSIPPI"
    ],
    "out": "M1I1S2I1S2I1P2I1"
   },
   {
    "in": [
     "QQ"
    ],
    "out": "Q2"
   },
   {
    "in": [
     "ABABABAB"
    ],
    "out": "A1B1A1B1A1B1A1B1"
   },
   {
    "in": [
     "WWWWWWWWWWWWWWWWWWWWWWWWW"
    ],
    "out": "W25"
   },
   {
    "in": [
     "AAAAAAAAAB"
    ],
    "out": "A9B1"
   },
   {
    "in": [
     "BAAAAAAAAA"
    ],
    "out": "B1A9"
   },
   {
    "in": [
     "XYYZZZWWWW"
    ],
    "out": "X1Y2Z3W4"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef encode(text: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        text = _lines[_i + 0].strip()\n        print(encode(text))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String encode(String text) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String text = _lines.get(_i + 0);\n            _sb.append(encode(text)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring encode(string text) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string text = _lines[_i + 0];\n        cout << encode(text) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef encode(text: str) -> str:\n\n    out = \"\"\n    i = 0\n    while i < len(text):\n        j = i\n        while j < len(text) and text[j] == text[i]:\n            j += 1\n        out += text[i] + str(j - i)\n        i = j\n    return out\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        text = _lines[_i + 0].strip()\n        print(encode(text))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String encode(String text) {\n\n        StringBuilder out = new StringBuilder();\n        int i = 0;\n        while (i < text.length()) {\n            int j = i;\n            while (j < text.length() && text.charAt(j) == text.charAt(i)) j++;\n            out.append(text.charAt(i)).append(j - i);\n            i = j;\n        }\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String text = _lines.get(_i + 0);\n            _sb.append(encode(text)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring encode(string text) {\n\n    string out;\n    size_t i = 0;\n    while (i < text.size()) {\n        size_t j = i;\n        while (j < text.size() && text[j] == text[i]) j++;\n        out += text[i];\n        out += to_string(j - i);\n        i = j;\n    }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string text = _lines[_i + 0];\n        cout << encode(text) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "acronym-maker",
  "division": "Junior",
  "contest": 4,
  "title": "Acronym Maker",
  "blurb": "Build an acronym from a phrase, keeping only the words that carry weight.",
  "statement": "\n<p>An acronym is made from the first letter of each significant word in a phrase, written in\ncapitals. A word counts as significant when it holds 4 or more letters, which is what keeps short\njoining words like the, of, and and out of the result.</p>\n\n<p>Report the acronym. If no word in the phrase is long enough, report NONE instead.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>american computer science league</td></tr>\n<tr><th>Output</th><td>ACSL</td></tr>\n<tr><th>Explanation</th><td>\nAll four words hold 4 or more letters, so all four contribute.<br>\nTheir first letters are a, c, s, and l, written in capitals.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the phrase, with words separated by single spaces.",
  "output_spec": "Output the acronym in capitals, or NONE if no word qualifies.",
  "constraints": "The phrase holds between 1 and 30 words, each between 1 and 20 lowercase letters.",
  "approach": "\n<p>Split the phrase at the spaces, then walk the words and keep the first letter of every word\nwhose length is 4 or more. Turning that letter into a capital is the last step and can be done as you\ngo or once at the end; either is fine as long as it happens.</p>\n\n<p>The length test is 4 or more, not more than 4. A four letter word qualifies, and one of the tests is\nthe single word abcd for exactly that reason, with abc beside it as the case that does not.</p>\n\n<p>The NONE case is decided after the whole phrase has been read, not while reading it, so build the\nacronym first and then ask whether it came out empty. A phrase of nothing but short words is the only\nway to reach it.</p>\n\n<p>In Java, uppercasing a single character is easiest with Character.toUpperCase, and in C++ with the\ntoupper function, remembering that it returns an integer that has to be turned back into a character\nbefore it is appended.</p>\n",
  "hints": [
   "The rule is 4 or more letters. Which words in the samples sit right on that line?",
   "Take the first letter of each word of length 4 or more and uppercase it. Decide on NONE after the whole phrase has been read, not during it."
  ],
  "fname": "acronym",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>phrase</code>, the phrase to abbreviate.</li>\n<li>The function returns a string, the acronym or the word NONE.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "american computer science league"
    ],
    "out": "ACSL"
   },
   {
    "in": [
     "the cat sat"
    ],
    "out": "NONE"
   },
   {
    "in": [
     "portable network graphics"
    ],
    "out": "PNG"
   }
  ],
  "tests": [
   {
    "in": [
     "american computer science league"
    ],
    "out": "ACSL"
   },
   {
    "in": [
     "the cat sat"
    ],
    "out": "NONE"
   },
   {
    "in": [
     "portable network graphics"
    ],
    "out": "PNG"
   },
   {
    "in": [
     "a"
    ],
    "out": "NONE"
   },
   {
    "in": [
     "self contained underwater breathing apparatus"
    ],
    "out": "SCUBA"
   },
   {
    "in": [
     "read the fine manual"
    ],
    "out": "RFM"
   },
   {
    "in": [
     "light amplification by stimulated emission of radiation"
    ],
    "out": "LASER"
   },
   {
    "in": [
     "abcd"
    ],
    "out": "A"
   },
   {
    "in": [
     "abc"
    ],
    "out": "NONE"
   },
   {
    "in": [
     "one two three four five"
    ],
    "out": "TFF"
   },
   {
    "in": [
     "structured query language"
    ],
    "out": "SQL"
   },
   {
    "in": [
     "as soon as possible"
    ],
    "out": "SP"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef acronym(phrase: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        phrase = _lines[_i + 0].strip()\n        print(acronym(phrase))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String acronym(String phrase) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String phrase = _lines.get(_i + 0);\n            _sb.append(acronym(phrase)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring acronym(string phrase) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string phrase = _lines[_i + 0];\n        cout << acronym(phrase) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef acronym(phrase: str) -> str:\n\n    out = \"\"\n    for word in phrase.split():\n        if len(word) >= 4:\n            out += word[0].upper()\n    return out if out else \"NONE\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        phrase = _lines[_i + 0].strip()\n        print(acronym(phrase))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String acronym(String phrase) {\n\n        StringBuilder out = new StringBuilder();\n        for (String word : phrase.trim().split(\"\\\\s+\")) {\n            if (word.length() >= 4) out.append(Character.toUpperCase(word.charAt(0)));\n        }\n        return out.length() > 0 ? out.toString() : \"NONE\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String phrase = _lines.get(_i + 0);\n            _sb.append(acronym(phrase)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring acronym(string phrase) {\n\n    string out, word;\n    istringstream is(phrase);\n    while (is >> word) {\n        if (word.size() >= 4) out += (char) toupper(word[0]);\n    }\n    return out.empty() ? string(\"NONE\") : out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string phrase = _lines[_i + 0];\n        cout << acronym(phrase) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "word-search-row",
  "division": "Junior",
  "contest": 4,
  "title": "Word Search Row",
  "blurb": "Count how often a word sits inside a row of letters, overlaps included.",
  "statement": "\n<p>A single row of a word search puzzle is a run of capital letters. Count how many times a given\nword appears inside it, reading left to right.</p>\n\n<p>Two appearances may overlap and both are counted. In AAAA the word AA appears three times, once\nstarting at each of the first three positions.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>AAAA<br>AA</td></tr>\n<tr><th>Output</th><td>3</td></tr>\n<tr><th>Explanation</th><td>\nAA appears starting at position 0.<br>\nAA appears starting at position 1.<br>\nAA appears starting at position 2.<br>\nPositions are counted from 0, and the three appearances overlap.\n</td></tr></table>\n",
  "input_spec": "Input the row of letters on the first line and the word to look for on the second line.",
  "output_spec": "Output an integer, the number of appearances.",
  "constraints": "The row holds between 1 and 200 capital letters. The word holds between 1 and 20 capital letters. The word may be longer than the row.",
  "approach": "\n<p>Try every starting position and compare. The word can begin anywhere from position 0 up to the\nrow's length minus the word's length, and at each of those positions you check whether the next few\ncharacters match the word.</p>\n\n<p>That upper bound is the whole problem. Going further would read past the end of the row, and stopping\nshort would miss an appearance that finishes exactly at the last character. Written as a loop from 0\nwhile i plus the word's length is at most the row's length, it handles both ends correctly, and it also\nhandles a word longer than the row without any special case: the loop simply never runs and the answer\nis 0.</p>\n\n<p>Because you check every position rather than jumping past a match, overlapping appearances are\ncounted automatically. Skipping forward by the word's length after a match would count AA in AAAA twice\nrather than three times, which is the mistake this problem is built around.</p>\n\n<p>In Python the comparison is a slice against the word. In Java, substring does the same job, and in\nC++ so does compare or substr. All three are one line, and none of them needs a character by character\ninner loop unless you want to write one.</p>\n",
  "hints": [
   "Where is the last position at which the word could still start?",
   "Loop while i plus the word length is at most the row length, comparing at every position. Never skip forward past a match, or overlaps go uncounted."
  ],
  "fname": "countWord",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>row</code>, the row of letters, and a string,\n<code>word</code>, the word to look for.</li>\n<li>The function returns an integer, the number of appearances.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "AAAA",
     "AA"
    ],
    "out": "3"
   },
   {
    "in": [
     "BANANA",
     "ANA"
    ],
    "out": "2"
   },
   {
    "in": [
     "ABC",
     "D"
    ],
    "out": "0"
   }
  ],
  "tests": [
   {
    "in": [
     "AAAA",
     "AA"
    ],
    "out": "3"
   },
   {
    "in": [
     "BANANA",
     "ANA"
    ],
    "out": "2"
   },
   {
    "in": [
     "ABC",
     "D"
    ],
    "out": "0"
   },
   {
    "in": [
     "XYZXYZXYZ",
     "XYZ"
    ],
    "out": "3"
   },
   {
    "in": [
     "AB",
     "ABCDE"
    ],
    "out": "0"
   },
   {
    "in": [
     "MISSISSIPPI",
     "ISSI"
    ],
    "out": "2"
   },
   {
    "in": [
     "AAAAAAAAAA",
     "A"
    ],
    "out": "10"
   },
   {
    "in": [
     "AAAAAAAAAA",
     "AAAAAAAAAA"
    ],
    "out": "1"
   },
   {
    "in": [
     "ABABABAB",
     "ABAB"
    ],
    "out": "3"
   },
   {
    "in": [
     "QQQQQ",
     "QQQ"
    ],
    "out": "3"
   },
   {
    "in": [
     "ACSLACSL",
     "ACSL"
    ],
    "out": "2"
   },
   {
    "in": [
     "ZZZZZZZZZZZZZZZZZZZ",
     "ZZZZZZZZZZZZZZZZZZZZ"
    ],
    "out": "0"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef countWord(row: str, word: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        row = _lines[_i + 0].strip()\n        word = _lines[_i + 1].strip()\n        print(countWord(row, word))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countWord(String row, String word) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String row = _lines.get(_i + 0);\n            String word = _lines.get(_i + 1);\n            _sb.append(countWord(row, word)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countWord(string row, string word) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string row = _lines[_i + 0];\n        string word = _lines[_i + 1];\n        cout << countWord(row, word) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countWord(row: str, word: str) -> int:\n\n    count = 0\n    n = len(word)\n    for i in range(len(row) - n + 1):\n        if row[i:i + n] == word:\n            count += 1\n    return count\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        row = _lines[_i + 0].strip()\n        word = _lines[_i + 1].strip()\n        print(countWord(row, word))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countWord(String row, String word) {\n\n        int count = 0, n = word.length();\n        for (int i = 0; i + n <= row.length(); i++) {\n            if (row.substring(i, i + n).equals(word)) count++;\n        }\n        return count;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String row = _lines.get(_i + 0);\n            String word = _lines.get(_i + 1);\n            _sb.append(countWord(row, word)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countWord(string row, string word) {\n\n    int count = 0;\n    size_t n = word.size();\n    for (size_t i = 0; i + n <= row.size(); i++) {\n        if (row.compare(i, n, word) == 0) count++;\n    }\n    return count;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string row = _lines[_i + 0];\n        string word = _lines[_i + 1];\n        cout << countWord(row, word) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "collatz-peak",
  "division": "Senior",
  "contest": 1,
  "title": "Collatz Peak",
  "blurb": "Halve or triple a number by turns and report how high it climbed before it fell to 1.",
  "statement": "\n<p>Start with a whole number. If it is even, replace it with half of itself. If it is odd, replace\nit with three times itself plus one. Repeat until the value reaches 1. Every starting value in the range specified for this problem reaches 1.</p>\n\n<p>Report the largest value the chain ever held, counting the starting value itself, and the number\nof replacements made. A starting value of 1 makes no replacements at all.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>6</td></tr>\n<tr><th>Output</th><td>16 8</td></tr>\n<tr><th>Explanation</th><td>\nThe chain runs 6, 3, 10, 5, 16, 8, 4, 2, 1.<br>\nThe largest value along the way is 16.<br>\nReaching 1 took 8 replacements.\n</td></tr></table>\n",
  "input_spec": "Input a single whole number, the value the chain begins with.",
  "output_spec": "Output the largest value the chain held, a single space, and the number of replacements.",
  "constraints": "The starting value is between 1 and 999999, inclusive. The largest value reached always fits in a 64 bit integer, and may be far larger than the starting value.",
  "approach": "\n<p>The loop is four lines and everything that can go wrong is in the bookkeeping around it.</p>\n\n<p>Keep the current value, a running maximum, and a count. On each pass, apply the rule, add one to\nthe count, and raise the maximum if the new value beats it. Stop when the value equals 1.</p>\n\n<p>Start the maximum at the starting value rather than at zero or at one, because a chain that begins\nabove everything it later reaches would otherwise report the wrong peak. A start of 2 is the smallest\ncase where this matters: the chain is 2, 1, and the peak is the 2 you began with.</p>\n\n<p>The type is the real trap. The values climb far higher than the input suggests, and a start under a\nmillion can exceed two billion on the way down. Use a 64 bit integer for the running value in Java and\nC++; a 32 bit one will overflow silently on some of the longer chains and produce a wrong answer\nrather than an error.</p>\n\n<p>Do not try to be clever with a table of already computed chains. There is no need: the longest chain\nunder a million takes well under six hundred steps, so even the worst case finishes instantly.</p>\n",
  "hints": [
   "Where should the running maximum start? Think about a chain that only goes down.",
   "Seed the maximum with the starting value, and hold the running value in a 64 bit integer. Some starts below a million produce values beyond the 32 bit integer range."
  ],
  "fname": "hailstone",
  "task": "\n<ul>\n<li>The function has 1 parameter: an integer, <code>start</code>, the value the chain begins\nwith.</li>\n<li>The function returns a string, the largest value followed by a space and the number of\nreplacements.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "6"
    ],
    "out": "16 8"
   },
   {
    "in": [
     "1"
    ],
    "out": "1 0"
   },
   {
    "in": [
     "27"
    ],
    "out": "9232 111"
   }
  ],
  "tests": [
   {
    "in": [
     "6"
    ],
    "out": "16 8"
   },
   {
    "in": [
     "1"
    ],
    "out": "1 0"
   },
   {
    "in": [
     "27"
    ],
    "out": "9232 111"
   },
   {
    "in": [
     "2"
    ],
    "out": "2 1"
   },
   {
    "in": [
     "703"
    ],
    "out": "250504 170"
   },
   {
    "in": [
     "77031"
    ],
    "out": "21933016 350"
   },
   {
    "in": [
     "999999"
    ],
    "out": "22781248 258"
   },
   {
    "in": [
     "97"
    ],
    "out": "9232 118"
   },
   {
    "in": [
     "871"
    ],
    "out": "190996 178"
   },
   {
    "in": [
     "6171"
    ],
    "out": "975400 261"
   },
   {
    "in": [
     "9"
    ],
    "out": "52 19"
   },
   {
    "in": [
     "837799"
    ],
    "out": "2974984576 524"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef hailstone(start: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(hailstone(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String hailstone(int start) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(hailstone(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring hailstone(int start) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << hailstone(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef hailstone(start: int) -> str:\n\n    n = start\n    peak = start\n    steps = 0\n    while n != 1:\n        n = n // 2 if n % 2 == 0 else 3 * n + 1\n        steps += 1\n        if n > peak:\n            peak = n\n    return str(peak) + \" \" + str(steps)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(hailstone(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String hailstone(int start) {\n\n        long n = start, peak = start;\n        int steps = 0;\n        while (n != 1) {\n            n = (n % 2 == 0) ? n / 2 : 3 * n + 1;\n            steps++;\n            if (n > peak) peak = n;\n        }\n        return peak + \" \" + steps;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(hailstone(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring hailstone(int start) {\n\n    long long n = start, peak = start;\n    int steps = 0;\n    while (n != 1) {\n        n = (n % 2 == 0) ? n / 2 : 3 * n + 1;\n        steps++;\n        if (n > peak) peak = n;\n    }\n    return to_string(peak) + \" \" + to_string(steps);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << hailstone(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "divisor-champion",
  "division": "Senior",
  "contest": 1,
  "title": "Divisor Champion",
  "blurb": "Sweep a range of numbers and find the one with the most divisors.",
  "statement": "\n<p>Every whole number has some set of divisors, meaning the numbers that divide it exactly,\nincluding 1 and itself.</p>\n\n<p>Over a given range of whole numbers, report the one with the most divisors and how many divisors\nit has. If several numbers tie, report the smallest of them.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>1<br>10</td></tr>\n<tr><th>Output</th><td>6 4</td></tr>\n<tr><th>Explanation</th><td>\n6 has the divisors 1, 2, 3, and 6, which is four of them.<br>\n8 and 10 also have four divisors each, but 6 is the smallest of the three.<br>\nNothing in the range has more than four.\n</td></tr></table>\n",
  "input_spec": "Input the low end of the range on the first line and the high end on the second line. Both ends belong to the range.",
  "output_spec": "Output the winning number, a single space, and its number of divisors.",
  "constraints": "The low end is between 1 and 10000, inclusive, and the high end is at least the low end and at most 10000.",
  "approach": "\n<p>Two loops, and the inner one is where the whole problem sits. Counting divisors by testing every\nnumber from 1 up to n works and is far more effort than it needs to be. Divisors come in pairs: if d\ndivides n then so does n divided by d, and one member of every pair is at most the square root of\nn.</p>\n\n<p>So loop d from 1 while d times d is at most n, and every time d divides n, add 2 to the count, once\nfor d and once for its partner. The one exception is a perfect square, where d and its partner are the\nsame number and adding 2 would count it twice, so add 1 instead when d times d equals n.</p>\n\n<p>Compare with d times d rather than with the square root itself. Floating point square roots are the\nusual source of off by one errors here, since a value just under a whole number rounds the wrong way\nand silently drops the largest divisor pair.</p>\n\n<p>Keep the best count and the number that achieved it, updating only when a count is strictly larger.\nThat settles ties in favor of the smallest number, since the range is swept upward and a later number\nwith an equal count never displaces the earlier one. The first sample has three numbers tied at four\ndivisors, which is there to catch a greater than or equal test.</p>\n",
  "hints": [
   "Divisors come in pairs. How far do you actually have to search for one of each pair?",
   "Loop d while d*d <= n, adding 2 per divisor found and 1 when d*d equals n. Update the best only on a strictly larger count so ties go to the smallest number."
  ],
  "fname": "mostDivisors",
  "task": "\n<ul>\n<li>The function has 2 parameters: an integer, <code>low</code>, and an integer, <code>high</code>,\nthe two ends of the range.</li>\n<li>The function returns a string, the winning number followed by a space and its divisor\ncount.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "1",
     "10"
    ],
    "out": "6 4"
   },
   {
    "in": [
     "1",
     "1"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "60",
     "120"
    ],
    "out": "120 16"
   }
  ],
  "tests": [
   {
    "in": [
     "1",
     "10"
    ],
    "out": "6 4"
   },
   {
    "in": [
     "1",
     "1"
    ],
    "out": "1 1"
   },
   {
    "in": [
     "60",
     "120"
    ],
    "out": "120 16"
   },
   {
    "in": [
     "1",
     "100"
    ],
    "out": "60 12"
   },
   {
    "in": [
     "9973",
     "9973"
    ],
    "out": "9973 2"
   },
   {
    "in": [
     "1",
     "10000"
    ],
    "out": "7560 64"
   },
   {
    "in": [
     "7560",
     "7560"
    ],
    "out": "7560 64"
   },
   {
    "in": [
     "100",
     "200"
    ],
    "out": "180 18"
   },
   {
    "in": [
     "9000",
     "10000"
    ],
    "out": "9240 64"
   },
   {
    "in": [
     "2",
     "3"
    ],
    "out": "2 2"
   },
   {
    "in": [
     "5040",
     "5040"
    ],
    "out": "5040 60"
   },
   {
    "in": [
     "1",
     "2"
    ],
    "out": "2 2"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef mostDivisors(low: int, high: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        low = int(_lines[_i + 0].strip())\n        high = int(_lines[_i + 1].strip())\n        print(mostDivisors(low, high))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String mostDivisors(int low, int high) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int low = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int high = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(mostDivisors(low, high)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring mostDivisors(int low, int high) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int low = stoi(_lines[_i + 0]);\n        int high = stoi(_lines[_i + 1]);\n        cout << mostDivisors(low, high) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef mostDivisors(low: int, high: int) -> str:\n\n    bestN = low\n    bestC = -1\n    for n in range(low, high + 1):\n        count = 0\n        d = 1\n        while d * d <= n:\n            if n % d == 0:\n                count += 2 if d * d != n else 1\n            d += 1\n        if count > bestC:\n            bestC = count\n            bestN = n\n    return str(bestN) + \" \" + str(bestC)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        low = int(_lines[_i + 0].strip())\n        high = int(_lines[_i + 1].strip())\n        print(mostDivisors(low, high))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String mostDivisors(int low, int high) {\n\n        int bestN = low, bestC = -1;\n        for (int n = low; n <= high; n++) {\n            int count = 0;\n            for (int d = 1; (long) d * d <= n; d++) {\n                if (n % d == 0) count += (d * d != n) ? 2 : 1;\n            }\n            if (count > bestC) { bestC = count; bestN = n; }\n        }\n        return bestN + \" \" + bestC;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int low = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int high = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(mostDivisors(low, high)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring mostDivisors(int low, int high) {\n\n    int bestN = low, bestC = -1;\n    for (int n = low; n <= high; n++) {\n        int count = 0;\n        for (int d = 1; (long long) d * d <= n; d++) {\n            if (n % d == 0) count += (d * d != n) ? 2 : 1;\n        }\n        if (count > bestC) { bestC = count; bestN = n; }\n    }\n    return to_string(bestN) + \" \" + to_string(bestC);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int low = stoi(_lines[_i + 0]);\n        int high = stoi(_lines[_i + 1]);\n        cout << mostDivisors(low, high) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "base-palindrome",
  "division": "Senior",
  "contest": 1,
  "title": "Base Palindrome",
  "blurb": "Hunt for the next number that reads the same forwards in base 10 and in binary.",
  "statement": "\n<p>A number is a palindrome in a given base when its digits in that base read the same in either\ndirection. Leading zeros are never written, so binary representations always begin with a 1.</p>\n\n<p>Report the smallest number strictly greater than a given value that is a palindrome in base 10 and\na palindrome in base 2 at the same time.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>10</td></tr>\n<tr><th>Output</th><td>33</td></tr>\n<tr><th>Explanation</th><td>\n33 reads the same in either direction in base 10.<br>\n33 in binary is 100001, which also reads the same in either direction.<br>\nNothing between 11 and 32 manages both.\n</td></tr></table>\n",
  "input_spec": "Input a single whole number.",
  "output_spec": "Output an integer, the smallest number greater than the input that is a palindrome in both bases.",
  "constraints": "The input is between 0 and 50000, inclusive. The answer never exceeds 53235.",
  "approach": "\n<p>Search upward one number at a time and test each one. There is no useful shortcut here, and the\nanswers are close enough together that a plain scan finishes immediately.</p>\n\n<p>Write the palindrome test once and use it for both bases. Given a number and a base, peel the digits\noff with modulo and integer division to build the representation, then compare it against itself\nreversed. Building the digits into a list or a string is easiest; reversing a number arithmetically and\ncomparing works too, and avoids the string entirely.</p>\n\n<p>Note that the digits come off backwards, from least significant to most, which does not matter at\nall for a palindrome test: a sequence reads the same in either direction exactly when its reverse does.\nSo there is no need to correct the order.</p>\n\n<p>Two details decide the edge cases. The search starts strictly above the input, so an input that is\nalready a dual palindrome must not be its own answer, and an input of 9 has to move on to 33. And the\nbinary form never carries leading zeros, which is why 4, whose binary is 100, is not a palindrome even\nthough padding it to 00100 would create a palindrome.</p>\n",
  "hints": [
   "One palindrome test, used twice with a different base. What does it need as a parameter?",
   "Peel digits with modulo and integer division and compare the sequence against its reverse. The order they come off in does not matter. Start the search strictly above the input."
  ],
  "fname": "nextDual",
  "task": "\n<ul>\n<li>The function has 1 parameter: an integer, <code>start</code>, the value to search above.</li>\n<li>The function returns an integer, the next number that is a palindrome in both bases.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "10"
    ],
    "out": "33"
   },
   {
    "in": [
     "0"
    ],
    "out": "1"
   },
   {
    "in": [
     "9"
    ],
    "out": "33"
   }
  ],
  "tests": [
   {
    "in": [
     "10"
    ],
    "out": "33"
   },
   {
    "in": [
     "0"
    ],
    "out": "1"
   },
   {
    "in": [
     "9"
    ],
    "out": "33"
   },
   {
    "in": [
     "1"
    ],
    "out": "3"
   },
   {
    "in": [
     "100"
    ],
    "out": "313"
   },
   {
    "in": [
     "1000"
    ],
    "out": "7447"
   },
   {
    "in": [
     "7446"
    ],
    "out": "7447"
   },
   {
    "in": [
     "9008"
    ],
    "out": "9009"
   },
   {
    "in": [
     "15350"
    ],
    "out": "15351"
   },
   {
    "in": [
     "32222"
    ],
    "out": "32223"
   },
   {
    "in": [
     "39993"
    ],
    "out": "53235"
   },
   {
    "in": [
     "50000"
    ],
    "out": "53235"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef nextDual(start: int) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(nextDual(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int nextDual(int start) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(nextDual(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint nextDual(int start) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << nextDual(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef nextDual(start: int) -> int:\n\n    def isPal(n, base):\n        digits = []\n        while n > 0:\n            digits.append(n % base)\n            n //= base\n        return digits == digits[::-1]\n\n    n = start + 1\n    while not (isPal(n, 10) and isPal(n, 2)):\n        n += 1\n    return n\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(nextDual(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static boolean isPal(int n, int base) {\n        List<Integer> digits = new ArrayList<>();\n        while (n > 0) { digits.add(n % base); n /= base; }\n        for (int i = 0, j = digits.size() - 1; i < j; i++, j--) {\n            if (!digits.get(i).equals(digits.get(j))) return false;\n        }\n        return true;\n    }\n\n    static int nextDual(int start) {\n\n        int n = start + 1;\n        while (!(isPal(n, 10) && isPal(n, 2))) n++;\n        return n;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(nextDual(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nbool isPal(int n, int base) {\n    vector<int> digits;\n    while (n > 0) { digits.push_back(n % base); n /= base; }\n    for (int i = 0, j = (int) digits.size() - 1; i < j; i++, j--) {\n        if (digits[i] != digits[j]) return false;\n    }\n    return true;\n}\n\nint nextDual(int start) {\n\n    int n = start + 1;\n    while (!(isPal(n, 10) && isPal(n, 2))) n++;\n    return n;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << nextDual(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "postfix-machine",
  "division": "Senior",
  "contest": 2,
  "title": "Postfix Machine",
  "blurb": "Run a postfix expression whose operands are named, and refuse the ones that do not work.",
  "statement": "\n<p>A postfix expression is a sequence of tokens separated by single spaces. A token is either a\nsingle capital letter naming a value, or one of the four operators + &minus; * /. An operator pops the\ntwo most recent values, applies itself with the earlier value on the left, and pushes the result.</p>\n\n<p>Division keeps the signed integer part, discarding any fraction, so &minus;7 divided by 2 is\n&minus;3 rather than &minus;4.</p>\n\n<p>Report the value left on the stack. Report ERROR instead if an operator finds fewer than two values\nwaiting, if a letter is used that has no value, if a division by zero is attempted, or if the\nexpression does not finish with exactly one value on the stack.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>A B + C *<br>A=1 B=2 C=3</td></tr>\n<tr><th>Output</th><td>9</td></tr>\n<tr><th>Explanation</th><td>\nPush 1 and 2, then the plus pops both and pushes 3.<br>\nPush 3, then the star pops 3 and 3 and pushes 9.<br>\nOne value is left, so the answer is 9.\n</td></tr></table>\n",
  "input_spec": "Input the expression on the first line, tokens separated by single spaces. Input the bindings on the second line, each written as a letter, an equals sign, and a value, separated by single spaces.",
  "output_spec": "Output the resulting value, or the word ERROR.",
  "constraints": "The expression holds between 1 and 60 tokens. There are between 1 and 26 bindings, each value between -9999 and 9999. Every intermediate result fits in a 32 bit signed integer.",
  "approach": "\n<p>A stack and one pass. Split the bindings line first and store each letter's value in a lookup,\nthen walk the expression tokens.</p>\n\n<p>A letter is pushed after looking up its value, and an unknown letter is an immediate ERROR. An\noperator pops two values, and the order matters more than anything else here: the value popped first is\nthe right operand and the value popped second is the left one. Getting that backwards never shows up on\naddition or multiplication and always shows up on subtraction and division, which is why one of the\nsamples subtracts.</p>\n\n<p>Every failure has to be caught before it can do damage. Check that the stack holds at least two\nvalues before popping, and check the right operand against zero before dividing. Both of those, left\nunchecked, crash rather than print ERROR.</p>\n\n<p>The last check happens after the loop rather than during it. A well formed postfix expression leaves\nexactly one value behind, so anything else, whether none or several, is an ERROR. An expression of three\noperands and one operator passes every test inside the loop and still fails this one.</p>\n\n<p>Python's // rounds down, so compute the quotient on absolute values and reattach the sign there. Java and C++ integer division already truncate toward zero, so use a / b directly. Taking the absolute value of the smallest 32 bit integer is unsafe in those languages because its positive counterpart does not fit in that type.</p>\n",
  "hints": [
   "Which of the two popped values is the left operand? It matters for two of the four operators.",
   "The value popped first is the right operand. Check the stack holds two values before popping and the divisor is nonzero before dividing, and check for exactly one value left after the loop."
  ],
  "fname": "evaluate",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>expression</code>, the postfix expression, and a\nstring, <code>bindings</code>, the letter values.</li>\n<li>The function returns a string, the resulting value or the word ERROR.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "A B + C *",
     "A=1 B=2 C=3"
    ],
    "out": "9"
   },
   {
    "in": [
     "A B -",
     "A=3 B=8"
    ],
    "out": "-5"
   },
   {
    "in": [
     "A B +",
     "A=1"
    ],
    "out": "ERROR"
   }
  ],
  "tests": [
   {
    "in": [
     "A B + C *",
     "A=1 B=2 C=3"
    ],
    "out": "9"
   },
   {
    "in": [
     "A B -",
     "A=3 B=8"
    ],
    "out": "-5"
   },
   {
    "in": [
     "A B +",
     "A=1"
    ],
    "out": "ERROR"
   },
   {
    "in": [
     "A B C +",
     "A=1 B=2 C=3"
    ],
    "out": "ERROR"
   },
   {
    "in": [
     "A B /",
     "A=7 B=2"
    ],
    "out": "3"
   },
   {
    "in": [
     "A B /",
     "A=-7 B=2"
    ],
    "out": "-3"
   },
   {
    "in": [
     "A B /",
     "A=5 B=0"
    ],
    "out": "ERROR"
   },
   {
    "in": [
     "A",
     "A=42"
    ],
    "out": "42"
   },
   {
    "in": [
     "A +",
     "A=1"
    ],
    "out": "ERROR"
   },
   {
    "in": [
     "A B C * + D -",
     "A=5 B=2 C=3 D=4"
    ],
    "out": "7"
   },
   {
    "in": [
     "+ A B",
     "A=1 B=2"
    ],
    "out": "ERROR"
   },
   {
    "in": [
     "A A * A A * +",
     "A=9"
    ],
    "out": "162"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef evaluate(expression: str, bindings: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        expression = _lines[_i + 0].strip()\n        bindings = _lines[_i + 1].strip()\n        print(evaluate(expression, bindings))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String evaluate(String expression, String bindings) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String expression = _lines.get(_i + 0);\n            String bindings = _lines.get(_i + 1);\n            _sb.append(evaluate(expression, bindings)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring evaluate(string expression, string bindings) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string expression = _lines[_i + 0];\n        string bindings = _lines[_i + 1];\n        cout << evaluate(expression, bindings) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef evaluate(expression: str, bindings: str) -> str:\n\n    env = {}\n    for token in bindings.split():\n        name, value = token.split(\"=\")\n        env[name] = int(value)\n\n    stack = []\n    for token in expression.split():\n        if token in (\"+\", \"-\", \"*\", \"/\"):\n            if len(stack) < 2:\n                return \"ERROR\"\n            b = stack.pop()\n            a = stack.pop()\n            if token == \"+\":\n                stack.append(a + b)\n            elif token == \"-\":\n                stack.append(a - b)\n            elif token == \"*\":\n                stack.append(a * b)\n            else:\n                if b == 0:\n                    return \"ERROR\"\n                q = abs(a) // abs(b)\n                stack.append(q if (a < 0) == (b < 0) else -q)\n        else:\n            if token not in env:\n                return \"ERROR\"\n            stack.append(env[token])\n    return str(stack[0]) if len(stack) == 1 else \"ERROR\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        expression = _lines[_i + 0].strip()\n        bindings = _lines[_i + 1].strip()\n        print(evaluate(expression, bindings))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String evaluate(String expression, String bindings) {\n\n        Map<String, Integer> env = new HashMap<>();\n        for (String token : bindings.trim().split(\"\\\\s+\")) {\n            String[] parts = token.split(\"=\");\n            env.put(parts[0], Integer.parseInt(parts[1]));\n        }\n        Deque<Integer> stack = new ArrayDeque<>();\n        for (String token : expression.trim().split(\"\\\\s+\")) {\n            if (token.equals(\"+\") || token.equals(\"-\") || token.equals(\"*\") || token.equals(\"/\")) {\n                if (stack.size() < 2) return \"ERROR\";\n                int b = stack.pop(), a = stack.pop();\n                if (token.equals(\"+\")) stack.push(a + b);\n                else if (token.equals(\"-\")) stack.push(a - b);\n                else if (token.equals(\"*\")) stack.push(a * b);\n                else {\n                    if (b == 0) return \"ERROR\";\n                    stack.push(a / b);\n                }\n            } else {\n                if (!env.containsKey(token)) return \"ERROR\";\n                stack.push(env.get(token));\n            }\n        }\n        return stack.size() == 1 ? String.valueOf(stack.pop()) : \"ERROR\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String expression = _lines.get(_i + 0);\n            String bindings = _lines.get(_i + 1);\n            _sb.append(evaluate(expression, bindings)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring evaluate(string expression, string bindings) {\n\n    map<string, int> env;\n    string token;\n    istringstream bs(bindings);\n    while (bs >> token) {\n        size_t eq = token.find('=');\n        env[token.substr(0, eq)] = stoi(token.substr(eq + 1));\n    }\n    vector<int> stack;\n    istringstream es(expression);\n    while (es >> token) {\n        if (token == \"+\" || token == \"-\" || token == \"*\" || token == \"/\") {\n            if (stack.size() < 2) return \"ERROR\";\n            int b = stack.back(); stack.pop_back();\n            int a = stack.back(); stack.pop_back();\n            if (token == \"+\") stack.push_back(a + b);\n            else if (token == \"-\") stack.push_back(a - b);\n            else if (token == \"*\") stack.push_back(a * b);\n            else {\n                if (b == 0) return \"ERROR\";\n                stack.push_back(a / b);\n            }\n        } else {\n            if (env.find(token) == env.end()) return \"ERROR\";\n            stack.push_back(env[token]);\n        }\n    }\n    return stack.size() == 1 ? to_string(stack[0]) : string(\"ERROR\");\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string expression = _lines[_i + 0];\n        string bindings = _lines[_i + 1];\n        cout << evaluate(expression, bindings) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "gray-code",
  "division": "Senior",
  "contest": 2,
  "title": "Gray Code",
  "blurb": "Produce the bit string that sits at a given position in a reflected binary ordering.",
  "statement": "\n<p>A Gray code lists every bit string of a given length so that each entry differs from the one\nbefore it in exactly one position. The standard one starts at all zeros, and the entry at position K\nis obtained from K by exclusive-oring K with K shifted right by one place.</p>\n\n<p>Report the entry at a given position, written with leading zeros so that it is exactly N bits\nlong. Positions are counted from 0.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>3<br>5</td></tr>\n<tr><th>Output</th><td>111</td></tr>\n<tr><th>Explanation</th><td>\n5 in binary is 101, and shifting it right by one gives 010.<br>\nThe exclusive or of 101 and 010 is 111.<br>\nWritten in 3 bits, that is 111.\n</td></tr></table>\n",
  "input_spec": "Input the number of bits on the first line and the position on the second line.",
  "output_spec": "Output the bit string, exactly as many characters long as the number of bits requested.",
  "constraints": "The number of bits is between 1 and 20, inclusive. The position is between 0 and 2 raised to the number of bits, minus 1.",
  "approach": "\n<p>The rule is one line, and everything else is formatting. Shift the position right by one and\nexclusive-or the result with the position itself. In Python that is index ^ (index &gt;&gt; 1), and Java\nand C++ spell it the same way.</p>\n\n<p>If you would rather not use the shift and exclusive or, the same value can be built one bit at a\ntime: the leading bit of the answer is the leading bit of the position, and each later bit is the\nexclusive or of the position's bit at that place with the position's bit one place higher.</p>\n\n<p>Writing the answer out is where the marks go. The result has to be exactly N characters, which means\nleading zeros have to be supplied by hand: the entry at position 0 is a run of zeros, not the single\ncharacter 0. Build the string by testing each bit from the highest down to the lowest and appending a 1\nor a 0, which produces the right length automatically.</p>\n\n<p>Twenty bits fits comfortably in a 32 bit integer, so no widening is needed, but be careful with a\nright shift on a signed type if you ever extend the problem.</p>\n",
  "hints": [
   "The value is one expression. The formatting is the part that takes work.",
   "The entry is index XOR (index >> 1). Write it out bit by bit from the highest position down so the leading zeros appear and the length is right."
  ],
  "fname": "grayCode",
  "task": "\n<ul>\n<li>The function has 2 parameters: an integer, <code>bits</code>, the length of the strings, and an\ninteger, <code>index</code>, the position in the listing.</li>\n<li>The function returns a string, the bit string at that position.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "3",
     "5"
    ],
    "out": "111"
   },
   {
    "in": [
     "3",
     "0"
    ],
    "out": "000"
   },
   {
    "in": [
     "4",
     "15"
    ],
    "out": "1000"
   }
  ],
  "tests": [
   {
    "in": [
     "3",
     "5"
    ],
    "out": "111"
   },
   {
    "in": [
     "3",
     "0"
    ],
    "out": "000"
   },
   {
    "in": [
     "4",
     "15"
    ],
    "out": "1000"
   },
   {
    "in": [
     "1",
     "1"
    ],
    "out": "1"
   },
   {
    "in": [
     "1",
     "0"
    ],
    "out": "0"
   },
   {
    "in": [
     "2",
     "2"
    ],
    "out": "11"
   },
   {
    "in": [
     "20",
     "1048575"
    ],
    "out": "10000000000000000000"
   },
   {
    "in": [
     "20",
     "0"
    ],
    "out": "00000000000000000000"
   },
   {
    "in": [
     "8",
     "128"
    ],
    "out": "11000000"
   },
   {
    "in": [
     "5",
     "17"
    ],
    "out": "11001"
   },
   {
    "in": [
     "10",
     "512"
    ],
    "out": "1100000000"
   },
   {
    "in": [
     "16",
     "43690"
    ],
    "out": "1111111111111111"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef grayCode(bits: int, index: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        bits = int(_lines[_i + 0].strip())\n        index = int(_lines[_i + 1].strip())\n        print(grayCode(bits, index))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String grayCode(int bits, int index) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int bits = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int index = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(grayCode(bits, index)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring grayCode(int bits, int index) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int bits = stoi(_lines[_i + 0]);\n        int index = stoi(_lines[_i + 1]);\n        cout << grayCode(bits, index) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef grayCode(bits: int, index: int) -> str:\n\n    value = index ^ (index >> 1)\n    out = \"\"\n    for b in range(bits - 1, -1, -1):\n        out += \"1\" if (value >> b) & 1 else \"0\"\n    return out\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        bits = int(_lines[_i + 0].strip())\n        index = int(_lines[_i + 1].strip())\n        print(grayCode(bits, index))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String grayCode(int bits, int index) {\n\n        int value = index ^ (index >> 1);\n        StringBuilder out = new StringBuilder();\n        for (int b = bits - 1; b >= 0; b--) out.append(((value >> b) & 1) == 1 ? '1' : '0');\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int bits = Integer.parseInt((_lines.get(_i + 0)).trim());\n            int index = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(grayCode(bits, index)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring grayCode(int bits, int index) {\n\n    int value = index ^ (index >> 1);\n    string out;\n    for (int b = bits - 1; b >= 0; b--) out += ((value >> b) & 1) ? '1' : '0';\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int bits = stoi(_lines[_i + 0]);\n        int index = stoi(_lines[_i + 1]);\n        cout << grayCode(bits, index) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "circulate-cycle",
  "division": "Senior",
  "contest": 2,
  "title": "Circulate Cycle",
  "blurb": "Circulate a bit string over and over and see how many different strings you get.",
  "statement": "\n<p>LCIRC-K applied to a bit string moves the first K bits round to the end, leaving the length\nunchanged. Applying it repeatedly must eventually bring the original string back.</p>\n\n<p>Starting from a given string, apply LCIRC-K again and again until the original string reappears.\nReport how many different strings were seen along the way, counting the original once, and the\nsmallest of them in ordinary alphabetical order, where 0 comes before 1.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>110100<br>2</td></tr>\n<tr><th>Output</th><td>3 001101</td></tr>\n<tr><th>Explanation</th><td>\nStarting from 110100, LCIRC-2 gives 010011, then 110100 is not yet back: 001101 comes next.<br>\nApplying it once more returns 110100, so the tour is over.<br>\nThree strings were seen, and the smallest of them is 001101.\n</td></tr></table>\n",
  "input_spec": "Input the bit string on the first line and the circulate amount on the second line.",
  "output_spec": "Output the number of different strings seen, a single space, and the smallest of them.",
  "constraints": "The bit string holds between 1 and 60 characters, each a 0 or a 1. The circulate amount is between 0 and 1000, inclusive, and may exceed the length of the string.",
  "approach": "\n<p>Reduce the amount modulo the length before anything else. A circulate by the length returns the\nstring unchanged, so an amount of 1000 on a string of 6 characters is really a circulate by 4. Skipping\nthis step is what makes an amount larger than the string look impossible.</p>\n\n<p>Once reduced, one application is a single slice: take the characters from the amount onward and\nfollow them with the characters before it. Applying that repeatedly walks the tour.</p>\n\n<p>Structure the loop so the original is recorded before the first application and the return test comes\nafter it. A loop that tests first stops immediately, since you begin on the original string. Record,\napply, then test.</p>\n\n<p>Track the smallest string with a running comparison as you go, using ordinary string comparison,\nwhich on 0 and 1 characters is exactly the ordering the problem asks for. There is no need to store\nevery string seen; a count and a running minimum are enough.</p>\n\n<p>The tour always closes and never takes more applications than the length of the string, so the loop\nis safe. An amount that reduces to 0 leaves the string alone and the tour is a single string, which is\nwhat the sixth test and the seventh check.</p>\n",
  "hints": [
   "An amount larger than the string is not impossible. What does a circulate by the length do?",
   "Reduce the amount modulo the length first. Record the current string, apply the circulate, then test for the original, so the loop does not stop before it starts."
  ],
  "fname": "cycleTour",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>bits</code>, the starting bit string, and an\ninteger, <code>amount</code>, the circulate amount.</li>\n<li>The function returns a string, the count of different strings followed by a space and the\nsmallest of them.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "110100",
     "2"
    ],
    "out": "3 001101"
   },
   {
    "in": [
     "1010",
     "2"
    ],
    "out": "1 1010"
   },
   {
    "in": [
     "100",
     "1"
    ],
    "out": "3 001"
   }
  ],
  "tests": [
   {
    "in": [
     "110100",
     "2"
    ],
    "out": "3 001101"
   },
   {
    "in": [
     "1010",
     "2"
    ],
    "out": "1 1010"
   },
   {
    "in": [
     "100",
     "1"
    ],
    "out": "3 001"
   },
   {
    "in": [
     "1111",
     "1"
    ],
    "out": "1 1111"
   },
   {
    "in": [
     "10",
     "3"
    ],
    "out": "2 01"
   },
   {
    "in": [
     "110100",
     "6"
    ],
    "out": "1 110100"
   },
   {
    "in": [
     "0",
     "0"
    ],
    "out": "1 0"
   },
   {
    "in": [
     "01",
     "0"
    ],
    "out": "1 01"
   },
   {
    "in": [
     "110100",
     "3"
    ],
    "out": "2 100110"
   },
   {
    "in": [
     "100000000000",
     "4"
    ],
    "out": "3 000000001000"
   },
   {
    "in": [
     "101010101010",
     "3"
    ],
    "out": "2 010101010101"
   },
   {
    "in": [
     "011",
     "7"
    ],
    "out": "3 011"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef cycleTour(bits: str, amount: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        bits = _lines[_i + 0].strip()\n        amount = int(_lines[_i + 1].strip())\n        print(cycleTour(bits, amount))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String cycleTour(String bits, int amount) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String bits = _lines.get(_i + 0);\n            int amount = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(cycleTour(bits, amount)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring cycleTour(string bits, int amount) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string bits = _lines[_i + 0];\n        int amount = stoi(_lines[_i + 1]);\n        cout << cycleTour(bits, amount) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef cycleTour(bits: str, amount: int) -> str:\n\n    n = len(bits)\n    step = amount % n\n    count = 0\n    smallest = bits\n    cur = bits\n    while True:\n        count += 1\n        if cur < smallest:\n            smallest = cur\n        cur = cur[step:] + cur[:step]\n        if cur == bits:\n            break\n    return str(count) + \" \" + smallest\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        bits = _lines[_i + 0].strip()\n        amount = int(_lines[_i + 1].strip())\n        print(cycleTour(bits, amount))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String cycleTour(String bits, int amount) {\n\n        int n = bits.length();\n        int step = amount % n;\n        int count = 0;\n        String smallest = bits, cur = bits;\n        while (true) {\n            count++;\n            if (cur.compareTo(smallest) < 0) smallest = cur;\n            cur = cur.substring(step) + cur.substring(0, step);\n            if (cur.equals(bits)) break;\n        }\n        return count + \" \" + smallest;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String bits = _lines.get(_i + 0);\n            int amount = Integer.parseInt((_lines.get(_i + 1)).trim());\n            _sb.append(cycleTour(bits, amount)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring cycleTour(string bits, int amount) {\n\n    int n = (int) bits.size();\n    int step = amount % n;\n    int count = 0;\n    string smallest = bits, cur = bits;\n    while (true) {\n        count++;\n        if (cur < smallest) smallest = cur;\n        cur = cur.substr(step) + cur.substr(0, step);\n        if (cur == bits) break;\n    }\n    return to_string(count) + \" \" + smallest;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string bits = _lines[_i + 0];\n        int amount = stoi(_lines[_i + 1]);\n        cout << cycleTour(bits, amount) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "bst-traversal",
  "division": "Senior",
  "contest": 3,
  "title": "Tree Walk",
  "blurb": "Build a binary search tree by ACSL's rules and read it back in any of three orders.",
  "statement": "\n<p>Build a binary search tree from a list of operations applied in order to an initially empty\ntree. An operation is a plus sign followed by a value, meaning insert it, or a minus sign followed by a\nvalue, meaning delete it.</p>\n\n<p>Insertion follows ACSL's rule that a value equal to the node it is compared against goes left, so\nduplicates are kept rather than dropped. Deletion follows ACSL's rule as well: a node with no children\nsimply goes, a node with one child is replaced by that child, and a node with two children is replaced\nby its left child, with the original right subtree attached at the rightmost node of that promoted\nsubtree. Deleting a value that is not present changes nothing.</p>\n\n<p>Report the requested traversal of the finished tree, or EMPTY if nothing is left in it.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>+50 +30 +70 +20 +40 +60 +80<br>PRE</td></tr>\n<tr><th>Output</th><td>50 30 20 40 70 60 80</td></tr>\n<tr><th>Explanation</th><td>\nThe insertions build a balanced tree with 50 at the root.<br>\nPreorder writes the root, then the whole left subtree, then the whole right subtree.<br>\nThat gives 50, then 30 20 40, then 70 60 80.\n</td></tr></table>\n",
  "input_spec": "Input the operations on the first line, separated by single spaces. Input the traversal name on the second line: PRE, IN, or POST.",
  "output_spec": "Output the values in the requested order, separated by single spaces, or the word EMPTY if the tree holds nothing.",
  "constraints": "There are between 1 and 200 operations. Every value is between 1 and 9999, inclusive.",
  "approach": "\n<p>Hold the tree in three parallel arrays, one for the values and one for each child, with -1\nstanding in for a missing child. A node is an index into those arrays, and the root is an index of its\nown. That avoids pointers in C++ and object allocation in Java, and it makes the whole thing easy to\nprint while debugging.</p>\n\n<p>Insertion walks down from the root comparing values, going left when the new value is less than or\nequal to the node and right otherwise, until it finds a missing child to fill. That single comparison\nis where ACSL parts company with most textbooks, which send equal values right or refuse them, and it\nis what makes the third sample a chain of three nodes rather than one.</p>\n\n<p>Deletion needs the node and its parent, so track both as you search, along with which side of the\nparent you came down. Once found, work out the replacement: the right child if there is no left, the\nleft child if there is no right, and otherwise the left child with the whole right subtree hung on its\nrightmost descendant. Then attach the replacement to the parent, or make it the new root if the deleted\nnode was the root.</p>\n\n<p>All three traversals can be written with an explicit stack rather than recursively. Preorder pushes\nthe root, then repeatedly pops a node, writes it, and pushes its right child before its left. Inorder\nruns left as far as it can while pushing, then pops, writes, and moves right. Postorder is the neat one:\nrun the preorder loop but push left before right, collect the nodes in a second list, and read that list\nbackwards.</p>\n",
  "hints": [
   "ACSL sends a value equal to the node it is compared against to the left. What does that do to duplicates?",
   "Hold the tree in parallel arrays with -1 for a missing child. On a two child deletion, promote the left child and hang the right subtree on its rightmost descendant."
  ],
  "fname": "treeWalk",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>ops</code>, the operations in order, and a\nstring, <code>order</code>, one of PRE, IN, or POST.</li>\n<li>The function returns a string, the traversal or the word EMPTY.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "+50 +30 +70 +20 +40 +60 +80",
     "PRE"
    ],
    "out": "50 30 20 40 70 60 80"
   },
   {
    "in": [
     "+5 -5",
     "IN"
    ],
    "out": "EMPTY"
   },
   {
    "in": [
     "+5 +5 +5",
     "POST"
    ],
    "out": "5 5 5"
   }
  ],
  "tests": [
   {
    "in": [
     "+50 +30 +70 +20 +40 +60 +80",
     "PRE"
    ],
    "out": "50 30 20 40 70 60 80"
   },
   {
    "in": [
     "+5 -5",
     "IN"
    ],
    "out": "EMPTY"
   },
   {
    "in": [
     "+5 +5 +5",
     "POST"
    ],
    "out": "5 5 5"
   },
   {
    "in": [
     "+50 +30 +70 +20 +40 +60 +80",
     "IN"
    ],
    "out": "20 30 40 50 60 70 80"
   },
   {
    "in": [
     "+50 +30 +70 +20 +40 +60 +80",
     "POST"
    ],
    "out": "20 40 30 60 80 70 50"
   },
   {
    "in": [
     "+8 +3 +10 +1 +6 +14 +4 +7 +13 -3",
     "PRE"
    ],
    "out": "8 1 6 4 7 10 14 13"
   },
   {
    "in": [
     "+10 +5 +15 +3 +7 -10",
     "PRE"
    ],
    "out": "5 3 7 15"
   },
   {
    "in": [
     "+1 +2 +3 +4 +5",
     "POST"
    ],
    "out": "5 4 3 2 1"
   },
   {
    "in": [
     "+65 +77 +69 +82 +73 +67 +65 +78",
     "IN"
    ],
    "out": "65 65 67 69 73 77 78 82"
   },
   {
    "in": [
     "+50 +30 +70 -70",
     "PRE"
    ],
    "out": "50 30"
   },
   {
    "in": [
     "+9",
     "IN"
    ],
    "out": "9"
   },
   {
    "in": [
     "+3 +1 +2 -1",
     "POST"
    ],
    "out": "2 3"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef treeWalk(ops: str, order: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        ops = _lines[_i + 0].strip()\n        order = _lines[_i + 1].strip()\n        print(treeWalk(ops, order))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String treeWalk(String ops, String order) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String ops = _lines.get(_i + 0);\n            String order = _lines.get(_i + 1);\n            _sb.append(treeWalk(ops, order)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring treeWalk(string ops, string order) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string ops = _lines[_i + 0];\n        string order = _lines[_i + 1];\n        cout << treeWalk(ops, order) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef treeWalk(ops: str, order: str) -> str:\n\n    val, left, right = [], [], []\n    root = -1\n    for op in ops.split():\n        v = int(op[1:])\n        if op[0] == \"+\":\n            val.append(v)\n            left.append(-1)\n            right.append(-1)\n            node = len(val) - 1\n            if root == -1:\n                root = node\n            else:\n                cur = root\n                while True:\n                    if v <= val[cur]:\n                        if left[cur] == -1:\n                            left[cur] = node\n                            break\n                        cur = left[cur]\n                    else:\n                        if right[cur] == -1:\n                            right[cur] = node\n                            break\n                        cur = right[cur]\n        else:\n            parent, cur, isLeft = -1, root, False\n            while cur != -1 and val[cur] != v:\n                parent = cur\n                if v < val[cur]:\n                    cur = left[cur]\n                    isLeft = True\n                else:\n                    cur = right[cur]\n                    isLeft = False\n            if cur != -1:\n                l, r = left[cur], right[cur]\n                if l == -1:\n                    repl = r\n                elif r == -1:\n                    repl = l\n                else:\n                    m = l\n                    while right[m] != -1:\n                        m = right[m]\n                    right[m] = r\n                    repl = l\n                if parent == -1:\n                    root = repl\n                elif isLeft:\n                    left[parent] = repl\n                else:\n                    right[parent] = repl\n\n    out = []\n    if order == \"PRE\":\n        stack = [root]\n        while stack:\n            n = stack.pop()\n            if n == -1:\n                continue\n            out.append(val[n])\n            stack.append(right[n])\n            stack.append(left[n])\n    elif order == \"IN\":\n        stack, cur = [], root\n        while stack or cur != -1:\n            while cur != -1:\n                stack.append(cur)\n                cur = left[cur]\n            cur = stack.pop()\n            out.append(val[cur])\n            cur = right[cur]\n    else:\n        stack, seen = [root], []\n        while stack:\n            n = stack.pop()\n            if n == -1:\n                continue\n            seen.append(n)\n            stack.append(left[n])\n            stack.append(right[n])\n        out = [val[n] for n in reversed(seen)]\n\n    if not out:\n        return \"EMPTY\"\n    return \" \".join(str(x) for x in out)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        ops = _lines[_i + 0].strip()\n        order = _lines[_i + 1].strip()\n        print(treeWalk(ops, order))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String treeWalk(String ops, String order) {\n\n        int cap = 256;\n        int[] val = new int[cap], left = new int[cap], right = new int[cap];\n        int used = 0, root = -1;\n        for (String op : ops.trim().split(\"\\\\s+\")) {\n            int v = Integer.parseInt(op.substring(1));\n            if (op.charAt(0) == '+') {\n                val[used] = v; left[used] = -1; right[used] = -1;\n                int node = used++;\n                if (root == -1) root = node;\n                else {\n                    int cur = root;\n                    while (true) {\n                        if (v <= val[cur]) {\n                            if (left[cur] == -1) { left[cur] = node; break; }\n                            cur = left[cur];\n                        } else {\n                            if (right[cur] == -1) { right[cur] = node; break; }\n                            cur = right[cur];\n                        }\n                    }\n                }\n            } else {\n                int parent = -1, cur = root;\n                boolean isLeft = false;\n                while (cur != -1 && val[cur] != v) {\n                    parent = cur;\n                    if (v < val[cur]) { cur = left[cur]; isLeft = true; }\n                    else { cur = right[cur]; isLeft = false; }\n                }\n                if (cur != -1) {\n                    int l = left[cur], r = right[cur], repl;\n                    if (l == -1) repl = r;\n                    else if (r == -1) repl = l;\n                    else {\n                        int m = l;\n                        while (right[m] != -1) m = right[m];\n                        right[m] = r;\n                        repl = l;\n                    }\n                    if (parent == -1) root = repl;\n                    else if (isLeft) left[parent] = repl;\n                    else right[parent] = repl;\n                }\n            }\n        }\n        List<Integer> out = new ArrayList<>();\n        Deque<Integer> stack = new ArrayDeque<>();\n        if (order.equals(\"PRE\")) {\n            stack.push(root);\n            while (!stack.isEmpty()) {\n                int n = stack.pop();\n                if (n == -1) continue;\n                out.add(val[n]);\n                stack.push(right[n]);\n                stack.push(left[n]);\n            }\n        } else if (order.equals(\"IN\")) {\n            int cur = root;\n            while (!stack.isEmpty() || cur != -1) {\n                while (cur != -1) { stack.push(cur); cur = left[cur]; }\n                cur = stack.pop();\n                out.add(val[cur]);\n                cur = right[cur];\n            }\n        } else {\n            List<Integer> seen = new ArrayList<>();\n            stack.push(root);\n            while (!stack.isEmpty()) {\n                int n = stack.pop();\n                if (n == -1) continue;\n                seen.add(n);\n                stack.push(left[n]);\n                stack.push(right[n]);\n            }\n            for (int i = seen.size() - 1; i >= 0; i--) out.add(val[seen.get(i)]);\n        }\n        if (out.isEmpty()) return \"EMPTY\";\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < out.size(); i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(out.get(i));\n        }\n        return sb.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String ops = _lines.get(_i + 0);\n            String order = _lines.get(_i + 1);\n            _sb.append(treeWalk(ops, order)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring treeWalk(string ops, string order) {\n\n    vector<int> val, left, right;\n    int root = -1;\n    string op;\n    istringstream is(ops);\n    while (is >> op) {\n        int v = stoi(op.substr(1));\n        if (op[0] == '+') {\n            val.push_back(v); left.push_back(-1); right.push_back(-1);\n            int node = (int) val.size() - 1;\n            if (root == -1) root = node;\n            else {\n                int cur = root;\n                while (true) {\n                    if (v <= val[cur]) {\n                        if (left[cur] == -1) { left[cur] = node; break; }\n                        cur = left[cur];\n                    } else {\n                        if (right[cur] == -1) { right[cur] = node; break; }\n                        cur = right[cur];\n                    }\n                }\n            }\n        } else {\n            int parent = -1, cur = root;\n            bool isLeft = false;\n            while (cur != -1 && val[cur] != v) {\n                parent = cur;\n                if (v < val[cur]) { cur = left[cur]; isLeft = true; }\n                else { cur = right[cur]; isLeft = false; }\n            }\n            if (cur != -1) {\n                int l = left[cur], r = right[cur], repl;\n                if (l == -1) repl = r;\n                else if (r == -1) repl = l;\n                else {\n                    int m = l;\n                    while (right[m] != -1) m = right[m];\n                    right[m] = r;\n                    repl = l;\n                }\n                if (parent == -1) root = repl;\n                else if (isLeft) left[parent] = repl;\n                else right[parent] = repl;\n            }\n        }\n    }\n    vector<int> out, stack;\n    if (order == \"PRE\") {\n        stack.push_back(root);\n        while (!stack.empty()) {\n            int n = stack.back(); stack.pop_back();\n            if (n == -1) continue;\n            out.push_back(val[n]);\n            stack.push_back(right[n]);\n            stack.push_back(left[n]);\n        }\n    } else if (order == \"IN\") {\n        int cur = root;\n        while (!stack.empty() || cur != -1) {\n            while (cur != -1) { stack.push_back(cur); cur = left[cur]; }\n            cur = stack.back(); stack.pop_back();\n            out.push_back(val[cur]);\n            cur = right[cur];\n        }\n    } else {\n        vector<int> seen;\n        stack.push_back(root);\n        while (!stack.empty()) {\n            int n = stack.back(); stack.pop_back();\n            if (n == -1) continue;\n            seen.push_back(n);\n            stack.push_back(left[n]);\n            stack.push_back(right[n]);\n        }\n        for (int i = (int) seen.size() - 1; i >= 0; i--) out.push_back(val[seen[i]]);\n    }\n    if (out.empty()) return \"EMPTY\";\n    string res;\n    for (size_t i = 0; i < out.size(); i++) {\n        if (i > 0) res += ' ';\n        res += to_string(out[i]);\n    }\n    return res;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string ops = _lines[_i + 0];\n        string order = _lines[_i + 1];\n        cout << treeWalk(ops, order) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "expression-height",
  "division": "Senior",
  "contest": 3,
  "title": "Expression Height",
  "blurb": "Work out how deep the tree behind an infix expression would be.",
  "statement": "\n<p>Every infix expression has a tree behind it, with an operator at each internal node and a single\nletter at each leaf. The height of that tree is the number of edges on its longest path from the root\ndown to a leaf, so a lone letter has height 0.</p>\n\n<p>Report the height of the tree for a given expression. The operators are + &minus; * /, with the\nusual precedence and left to right grouping, and brackets may appear anywhere.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>A+B*C</td></tr>\n<tr><th>Output</th><td>2</td></tr>\n<tr><th>Explanation</th><td>\nMultiplication binds tighter, so the expression is A + (B * C).<br>\nThe root is the plus, with A on its left and the star on its right.<br>\nThe path from the plus down through the star to B has two edges.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the expression, with no spaces.",
  "output_spec": "Output an integer, the height of the expression tree.",
  "constraints": "The expression holds between 1 and 120 characters. Operands are single capital letters, operators are + - * /, the expression is valid, and parentheses are balanced.",
  "approach": "\n<p>Do not build the tree. Convert the expression to postfix and then read the height straight off\nit, which takes two short passes and no pointers at all.</p>\n\n<p>The first pass is the shunting yard algorithm. Letters go straight to the output. An opening bracket\nis pushed. A closing bracket pops operators to the output until the matching opening bracket appears,\nwhich is then discarded. An operator pops any operator of greater or equal precedence off the stack\nfirst, since all four of these group to the left, and is then pushed. At the end, everything left on\nthe stack is popped to the output.</p>\n\n<p>The second pass walks the postfix with a stack of heights rather than of values. A letter pushes 0,\nbecause a leaf has height 0. An operator pops two heights and pushes one more than the larger of them,\nbecause the new root sits one edge above whichever subtree is deeper. When the walk finishes, the single\nvalue left is the answer.</p>\n\n<p>Precedence is the only place this can go quietly wrong. Popping on greater or equal is what makes\nA+B+C+D a leaning chain of height 3; popping only on strictly greater would group it to the right and\ngive the same number here but a different one for a mixture of precedences. Redundant brackets, as in\nthe sixth test, disappear during the conversion and never affect the height.</p>\n",
  "hints": [
   "You do not need the tree itself, only how deep it would be.",
   "Convert to postfix with the shunting yard, then walk it with a stack of heights: a letter pushes 0 and an operator pushes one more than the larger of the two it pops."
  ],
  "fname": "treeHeight",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>expression</code>, the infix expression.</li>\n<li>The function returns an integer, the height of its tree.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "A+B*C"
    ],
    "out": "2"
   },
   {
    "in": [
     "A"
    ],
    "out": "0"
   },
   {
    "in": [
     "A+B+C+D"
    ],
    "out": "3"
   }
  ],
  "tests": [
   {
    "in": [
     "A+B*C"
    ],
    "out": "2"
   },
   {
    "in": [
     "A"
    ],
    "out": "0"
   },
   {
    "in": [
     "A+B+C+D"
    ],
    "out": "3"
   },
   {
    "in": [
     "(A+B)*C"
    ],
    "out": "2"
   },
   {
    "in": [
     "A*B+C*D"
    ],
    "out": "2"
   },
   {
    "in": [
     "((A))"
    ],
    "out": "0"
   },
   {
    "in": [
     "(A+B)*(C+D)"
    ],
    "out": "2"
   },
   {
    "in": [
     "A/B/C"
    ],
    "out": "2"
   },
   {
    "in": [
     "A+(B*(C-D))"
    ],
    "out": "3"
   },
   {
    "in": [
     "A+B"
    ],
    "out": "1"
   },
   {
    "in": [
     "((A+B)*(C+D))/((E-F)*(G+H))"
    ],
    "out": "3"
   },
   {
    "in": [
     "A*B*C*D*E*F"
    ],
    "out": "5"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef treeHeight(expression: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        expression = _lines[_i + 0].strip()\n        print(treeHeight(expression))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int treeHeight(String expression) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String expression = _lines.get(_i + 0);\n            _sb.append(treeHeight(expression)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint treeHeight(string expression) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string expression = _lines[_i + 0];\n        cout << treeHeight(expression) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef treeHeight(expression: str) -> int:\n\n    prec = {\"+\": 1, \"-\": 1, \"*\": 2, \"/\": 2}\n    output = []\n    ops = []\n    for ch in expression:\n        if ch.isalpha():\n            output.append(ch)\n        elif ch == \"(\":\n            ops.append(ch)\n        elif ch == \")\":\n            while ops and ops[-1] != \"(\":\n                output.append(ops.pop())\n            ops.pop()\n        else:\n            while ops and ops[-1] != \"(\" and prec[ops[-1]] >= prec[ch]:\n                output.append(ops.pop())\n            ops.append(ch)\n    while ops:\n        output.append(ops.pop())\n\n    heights = []\n    for token in output:\n        if token.isalpha():\n            heights.append(0)\n        else:\n            b = heights.pop()\n            a = heights.pop()\n            heights.append(1 + (a if a > b else b))\n    return heights[0]\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        expression = _lines[_i + 0].strip()\n        print(treeHeight(expression))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static int prec(char c) {\n        return (c == '*' || c == '/') ? 2 : 1;\n    }\n\n    static int treeHeight(String expression) {\n\n        StringBuilder output = new StringBuilder();\n        Deque<Character> ops = new ArrayDeque<>();\n        for (char ch : expression.toCharArray()) {\n            if (Character.isLetter(ch)) output.append(ch);\n            else if (ch == '(') ops.push(ch);\n            else if (ch == ')') {\n                while (!ops.isEmpty() && ops.peek() != '(') output.append(ops.pop());\n                ops.pop();\n            } else {\n                while (!ops.isEmpty() && ops.peek() != '(' && prec(ops.peek()) >= prec(ch)) {\n                    output.append(ops.pop());\n                }\n                ops.push(ch);\n            }\n        }\n        while (!ops.isEmpty()) output.append(ops.pop());\n\n        Deque<Integer> heights = new ArrayDeque<>();\n        for (char token : output.toString().toCharArray()) {\n            if (Character.isLetter(token)) heights.push(0);\n            else {\n                int b = heights.pop(), a = heights.pop();\n                heights.push(1 + Math.max(a, b));\n            }\n        }\n        return heights.pop();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String expression = _lines.get(_i + 0);\n            _sb.append(treeHeight(expression)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nint prec(char c) {\n    return (c == '*' || c == '/') ? 2 : 1;\n}\n\nint treeHeight(string expression) {\n\n    string output;\n    vector<char> ops;\n    for (char ch : expression) {\n        if (isalpha((unsigned char) ch)) output += ch;\n        else if (ch == '(') ops.push_back(ch);\n        else if (ch == ')') {\n            while (!ops.empty() && ops.back() != '(') { output += ops.back(); ops.pop_back(); }\n            ops.pop_back();\n        } else {\n            while (!ops.empty() && ops.back() != '(' && prec(ops.back()) >= prec(ch)) {\n                output += ops.back();\n                ops.pop_back();\n            }\n            ops.push_back(ch);\n        }\n    }\n    while (!ops.empty()) { output += ops.back(); ops.pop_back(); }\n\n    vector<int> heights;\n    for (char token : output) {\n        if (isalpha((unsigned char) token)) heights.push_back(0);\n        else {\n            int b = heights.back(); heights.pop_back();\n            int a = heights.back(); heights.pop_back();\n            heights.push_back(1 + max(a, b));\n        }\n    }\n    return heights[0];\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string expression = _lines[_i + 0];\n        cout << treeHeight(expression) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "priority-desk",
  "division": "Senior",
  "contest": 3,
  "title": "Priority Desk",
  "blurb": "Run a help desk where the most urgent ticket wins and arrival order breaks the ties.",
  "statement": "\n<p>A help desk processes a list of commands in order. ADD:name:priority puts a person in the\nwaiting room with that priority, where a smaller number means more urgent. NEXT calls whoever is\nwaiting with the smallest priority, removing them from the room.</p>\n\n<p>If two people share the smallest priority, the one who arrived earlier is called first. A NEXT\nissued when the room is empty writes a single hyphen instead of a name.</p>\n\n<p>Report the names written by the NEXT commands, in order. If there are no NEXT commands at all,\nreport NONE.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>ADD:ann:3 ADD:bob:1 NEXT NEXT</td></tr>\n<tr><th>Output</th><td>bob ann</td></tr>\n<tr><th>Explanation</th><td>\nann waits with priority 3 and bob waits with priority 1.<br>\nThe first NEXT calls bob, whose priority is smaller.<br>\nThe second NEXT calls ann, who is now the only one left.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the commands in order, separated by single spaces.",
  "output_spec": "Output the names called, separated by single spaces, using a hyphen for a NEXT that found nobody waiting, or NONE if there were no NEXT commands.",
  "constraints": "There are between 1 and 100 commands. Names hold between 1 and 12 lowercase letters and are not repeated. Priorities are between 1 and 999.",
  "approach": "\n<p>A list is enough. Real priority queues are faster, but with at most a hundred commands a linear\nscan for the best waiting person costs nothing and is far easier to get right.</p>\n\n<p>Store three things per person: the priority, the arrival number, and the name. The arrival number is\njust a counter you increase on every ADD, and it is what makes ties resolvable. If the list preserves arrival order when entries are removed, keeping the first minimum is enough. Recording the arrival number also makes the tie rule explicit if the storage order later changes.</p>\n\n<p>On NEXT, scan the waiting list for the smallest priority, and among those for the smallest arrival\nnumber. A single pass keeping the best index so far does both at once: replace the best when the\npriority is smaller, or when the priority is equal and the arrival number is smaller. Then remove that\nentry from the list.</p>\n\n<p>Handle an empty-room NEXT inside the loop by recording a hyphen and continuing. A run of commands with no\nNEXT at all produces no output, which is the NONE case; check for it once at the end rather than trying\nto detect it as you go.</p>\n",
  "hints": [
   "Two people can share a priority. What extra piece of information settles which one goes first?",
   "Store an arrival counter alongside each person. Scan for the smallest priority, breaking ties on the smaller arrival number, and handle an empty room and an empty output separately."
  ],
  "fname": "serveOrder",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>commands</code>, the commands in order.</li>\n<li>The function returns a string, the names called or the word NONE.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "ADD:ann:3 ADD:bob:1 NEXT NEXT"
    ],
    "out": "bob ann"
   },
   {
    "in": [
     "NEXT"
    ],
    "out": "-"
   },
   {
    "in": [
     "ADD:a:1"
    ],
    "out": "NONE"
   }
  ],
  "tests": [
   {
    "in": [
     "ADD:ann:3 ADD:bob:1 NEXT NEXT"
    ],
    "out": "bob ann"
   },
   {
    "in": [
     "NEXT"
    ],
    "out": "-"
   },
   {
    "in": [
     "ADD:a:1"
    ],
    "out": "NONE"
   },
   {
    "in": [
     "ADD:x:5 ADD:y:5 NEXT NEXT NEXT"
    ],
    "out": "x y -"
   },
   {
    "in": [
     "ADD:p:9 NEXT ADD:q:1 NEXT"
    ],
    "out": "p q"
   },
   {
    "in": [
     "ADD:a:3 ADD:b:2 ADD:c:1 NEXT NEXT NEXT"
    ],
    "out": "c b a"
   },
   {
    "in": [
     "NEXT NEXT"
    ],
    "out": "- -"
   },
   {
    "in": [
     "ADD:solo:999 NEXT"
    ],
    "out": "solo"
   },
   {
    "in": [
     "ADD:a:1 ADD:b:1 ADD:c:1 NEXT NEXT NEXT"
    ],
    "out": "a b c"
   },
   {
    "in": [
     "ADD:m:4 NEXT NEXT ADD:n:4 NEXT"
    ],
    "out": "m - n"
   },
   {
    "in": [
     "ADD:z:1 ADD:y:2 NEXT ADD:x:1 NEXT NEXT"
    ],
    "out": "z x y"
   },
   {
    "in": [
     "ADD:a:2 ADD:b:3 ADD:c:2 ADD:d:1 NEXT NEXT NEXT NEXT"
    ],
    "out": "d a c b"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef serveOrder(commands: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        commands = _lines[_i + 0].strip()\n        print(serveOrder(commands))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String serveOrder(String commands) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String commands = _lines.get(_i + 0);\n            _sb.append(serveOrder(commands)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring serveOrder(string commands) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string commands = _lines[_i + 0];\n        cout << serveOrder(commands) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef serveOrder(commands: str) -> str:\n\n    waiting = []\n    out = []\n    arrival = 0\n    for command in commands.split():\n        if command == \"NEXT\":\n            if not waiting:\n                out.append(\"-\")\n            else:\n                best = 0\n                for i in range(1, len(waiting)):\n                    if (waiting[i][0] < waiting[best][0]\n                            or (waiting[i][0] == waiting[best][0]\n                                and waiting[i][1] < waiting[best][1])):\n                        best = i\n                out.append(waiting.pop(best)[2])\n        else:\n            parts = command.split(\":\")\n            waiting.append((int(parts[2]), arrival, parts[1]))\n            arrival += 1\n    if not out:\n        return \"NONE\"\n    return \" \".join(out)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        commands = _lines[_i + 0].strip()\n        print(serveOrder(commands))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String serveOrder(String commands) {\n\n        List<int[]> keys = new ArrayList<>();\n        List<String> names = new ArrayList<>();\n        List<String> out = new ArrayList<>();\n        int arrival = 0;\n        for (String command : commands.trim().split(\"\\\\s+\")) {\n            if (command.equals(\"NEXT\")) {\n                if (keys.isEmpty()) out.add(\"-\");\n                else {\n                    int best = 0;\n                    for (int i = 1; i < keys.size(); i++) {\n                        if (keys.get(i)[0] < keys.get(best)[0]\n                                || (keys.get(i)[0] == keys.get(best)[0]\n                                    && keys.get(i)[1] < keys.get(best)[1])) best = i;\n                    }\n                    out.add(names.get(best));\n                    keys.remove(best);\n                    names.remove(best);\n                }\n            } else {\n                String[] parts = command.split(\":\");\n                keys.add(new int[]{Integer.parseInt(parts[2]), arrival++});\n                names.add(parts[1]);\n            }\n        }\n        if (out.isEmpty()) return \"NONE\";\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < out.size(); i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(out.get(i));\n        }\n        return sb.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String commands = _lines.get(_i + 0);\n            _sb.append(serveOrder(commands)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring serveOrder(string commands) {\n\n    vector<int> pri, seq;\n    vector<string> names, out;\n    int arrival = 0;\n    string command;\n    istringstream is(commands);\n    while (is >> command) {\n        if (command == \"NEXT\") {\n            if (pri.empty()) out.push_back(\"-\");\n            else {\n                size_t best = 0;\n                for (size_t i = 1; i < pri.size(); i++) {\n                    if (pri[i] < pri[best] || (pri[i] == pri[best] && seq[i] < seq[best])) best = i;\n                }\n                out.push_back(names[best]);\n                pri.erase(pri.begin() + best);\n                seq.erase(seq.begin() + best);\n                names.erase(names.begin() + best);\n            }\n        } else {\n            size_t first = command.find(':');\n            size_t second = command.find(':', first + 1);\n            names.push_back(command.substr(first + 1, second - first - 1));\n            pri.push_back(stoi(command.substr(second + 1)));\n            seq.push_back(arrival++);\n        }\n    }\n    if (out.empty()) return \"NONE\";\n    string res;\n    for (size_t i = 0; i < out.size(); i++) {\n        if (i > 0) res += ' ';\n        res += out[i];\n    }\n    return res;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string commands = _lines[_i + 0];\n        cout << serveOrder(commands) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "shortest-hops",
  "division": "Senior",
  "contest": 4,
  "title": "Shortest Hops",
  "blurb": "Find the fewest edges between two vertices of an undirected graph.",
  "statement": "\n<p>An undirected graph is given as a list of edges, each written as two vertex numbers joined by a\nhyphen. Vertices are numbered from 1, and a vertex may appear in any number of edges.</p>\n\n<p>Report the smallest number of edges on any route from one given vertex to another. A vertex\nreaches itself in 0 edges. If no route exists at all, report &minus;1.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>1-2 2-3 3-4<br>1 4</td></tr>\n<tr><th>Output</th><td>3</td></tr>\n<tr><th>Explanation</th><td>\nThe graph is a chain running 1, 2, 3, 4.<br>\nThe only route from 1 to 4 uses all three edges.<br>\nNo shorter route exists, so the answer is 3.\n</td></tr></table>\n",
  "input_spec": "Input the edges on the first line, separated by single spaces, each written as two vertex numbers joined by a hyphen. Input the two vertex numbers on the second line, separated by a single space.",
  "output_spec": "Output an integer, the fewest edges on a route between the two vertices, or -1 if there is none.",
  "constraints": "There are between 1 and 200 edges. Vertex numbers are between 1 and 100, inclusive. Both given vertices appear in at least one edge.",
  "approach": "\n<p>This is a breadth first search and nothing else. Depth first search finds a route but not\nnecessarily the shortest one, and there are no edge weights here to justify anything fancier.</p>\n\n<p>Build an adjacency structure first. A list of neighbors for each vertex is the natural shape, and\nsince the graph is undirected each edge has to be recorded in both directions. Forgetting one of the\ntwo is the single most common bug in this kind of problem, and it produces answers that are too large\nor -1 rather than an error.</p>\n\n<p>Then run the search from the starting vertex with a queue. Mark the start as being at distance 0,\nand repeatedly take a vertex off the front, look at each unvisited neighbor, mark it one further out,\nand put it on the back. Because the queue hands vertices back in the order they were reached, the first\ntime you touch the target you have touched it by a shortest route, so you can stop immediately.</p>\n\n<p>Two cases need no search at all. A start equal to the target answers 0. A queue that empties without\never reaching the target means the two vertices lie in different components, which is the -1 case. Note\nthat a duplicated edge and an edge joining a vertex to itself are both harmless as long as you check\nwhether a vertex has been visited before enqueueing it.</p>\n",
  "hints": [
   "Which search order guarantees you reach a vertex by its shortest route first?",
   "Breadth first search with a queue. Record every edge in both directions, and stop as soon as the target is first marked. An empty queue means -1."
  ],
  "fname": "shortest",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>edges</code>, the edge list, and a string,\n<code>pair</code>, the two vertex numbers.</li>\n<li>The function returns an integer, the fewest edges or -1.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "1-2 2-3 3-4",
     "1 4"
    ],
    "out": "3"
   },
   {
    "in": [
     "1-2 3-4",
     "1 4"
    ],
    "out": "-1"
   },
   {
    "in": [
     "1-2 1-3 2-4 3-4",
     "1 4"
    ],
    "out": "2"
   }
  ],
  "tests": [
   {
    "in": [
     "1-2 2-3 3-4",
     "1 4"
    ],
    "out": "3"
   },
   {
    "in": [
     "1-2 3-4",
     "1 4"
    ],
    "out": "-1"
   },
   {
    "in": [
     "1-2 1-3 2-4 3-4",
     "1 4"
    ],
    "out": "2"
   },
   {
    "in": [
     "1-2",
     "1 1"
    ],
    "out": "0"
   },
   {
    "in": [
     "1-2",
     "1 2"
    ],
    "out": "1"
   },
   {
    "in": [
     "1-2 2-3 3-4 4-5 5-1",
     "1 3"
    ],
    "out": "2"
   },
   {
    "in": [
     "1-2 2-1",
     "1 2"
    ],
    "out": "1"
   },
   {
    "in": [
     "1-2 2-3 3-1",
     "1 3"
    ],
    "out": "1"
   },
   {
    "in": [
     "1-2 2-3 3-4 4-5 5-6 6-7 7-8 8-9 9-10",
     "1 10"
    ],
    "out": "9"
   },
   {
    "in": [
     "1-100",
     "1 100"
    ],
    "out": "1"
   },
   {
    "in": [
     "1-2 3-4 5-6",
     "1 6"
    ],
    "out": "-1"
   },
   {
    "in": [
     "1-2 1-3 1-4 1-5 2-6 3-6 4-6 5-6",
     "1 6"
    ],
    "out": "2"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef shortest(edges: str, pair: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        edges = _lines[_i + 0].strip()\n        pair = _lines[_i + 1].strip()\n        print(shortest(edges, pair))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int shortest(String edges, String pair) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String edges = _lines.get(_i + 0);\n            String pair = _lines.get(_i + 1);\n            _sb.append(shortest(edges, pair)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint shortest(string edges, string pair) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string edges = _lines[_i + 0];\n        string pair = _lines[_i + 1];\n        cout << shortest(edges, pair) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef shortest(edges: str, pair: str) -> int:\n\n    adj = {}\n    for token in edges.split():\n        a, b = token.split(\"-\")\n        a, b = int(a), int(b)\n        adj.setdefault(a, []).append(b)\n        adj.setdefault(b, []).append(a)\n\n    parts = pair.split()\n    start, target = int(parts[0]), int(parts[1])\n    if start == target:\n        return 0\n\n    dist = {start: 0}\n    queue = [start]\n    head = 0\n    while head < len(queue):\n        u = queue[head]\n        head += 1\n        for v in adj.get(u, []):\n            if v not in dist:\n                dist[v] = dist[u] + 1\n                if v == target:\n                    return dist[v]\n                queue.append(v)\n    return -1\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        edges = _lines[_i + 0].strip()\n        pair = _lines[_i + 1].strip()\n        print(shortest(edges, pair))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int shortest(String edges, String pair) {\n\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i <= 100; i++) adj.add(new ArrayList<>());\n        for (String token : edges.trim().split(\"\\\\s+\")) {\n            String[] ends = token.split(\"-\");\n            int a = Integer.parseInt(ends[0]), b = Integer.parseInt(ends[1]);\n            adj.get(a).add(b);\n            adj.get(b).add(a);\n        }\n        String[] parts = pair.trim().split(\"\\\\s+\");\n        int start = Integer.parseInt(parts[0]), target = Integer.parseInt(parts[1]);\n        if (start == target) return 0;\n\n        int[] dist = new int[101];\n        Arrays.fill(dist, -1);\n        dist[start] = 0;\n        Deque<Integer> queue = new ArrayDeque<>();\n        queue.add(start);\n        while (!queue.isEmpty()) {\n            int u = queue.poll();\n            for (int v : adj.get(u)) {\n                if (dist[v] == -1) {\n                    dist[v] = dist[u] + 1;\n                    if (v == target) return dist[v];\n                    queue.add(v);\n                }\n            }\n        }\n        return -1;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String edges = _lines.get(_i + 0);\n            String pair = _lines.get(_i + 1);\n            _sb.append(shortest(edges, pair)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint shortest(string edges, string pair) {\n\n    vector<vector<int>> adj(101);\n    string token;\n    istringstream is(edges);\n    while (is >> token) {\n        size_t dash = token.find('-');\n        int a = stoi(token.substr(0, dash)), b = stoi(token.substr(dash + 1));\n        adj[a].push_back(b);\n        adj[b].push_back(a);\n    }\n    int start, target;\n    istringstream ps(pair);\n    ps >> start >> target;\n    if (start == target) return 0;\n\n    vector<int> dist(101, -1);\n    dist[start] = 0;\n    vector<int> queue;\n    queue.push_back(start);\n    size_t head = 0;\n    while (head < queue.size()) {\n        int u = queue[head++];\n        for (int v : adj[u]) {\n            if (dist[v] == -1) {\n                dist[v] = dist[u] + 1;\n                if (v == target) return dist[v];\n                queue.push_back(v);\n            }\n        }\n    }\n    return -1;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string edges = _lines[_i + 0];\n        string pair = _lines[_i + 1];\n        cout << shortest(edges, pair) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "gate-network",
  "division": "Senior",
  "contest": 4,
  "title": "Gate Network",
  "blurb": "Wire up a small logic circuit from a netlist and count the inputs that drive it high.",
  "statement": "\n<p>A circuit is described one gate at a time. Each gate is written as its own name, an equals\nsign, the kind of gate, and then its inputs, and the gates are separated by commas. A gate's input is\neither a single capital letter, which is a circuit input, or the name of an earlier gate.</p>\n\n<p>The gate kinds are AND, OR, NAND, NOR, XOR, XNOR, each taking two inputs, and NOT and BUFFER,\neach taking one. The output of the circuit is the output of the last gate listed.</p>\n\n<p>Report how many of the circuit's input combinations drive that output high.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>G1 = AND A B, G2 = NOT G1</td></tr>\n<tr><th>Output</th><td>3</td></tr>\n<tr><th>Explanation</th><td>\nThe circuit has two inputs, A and B, so there are four combinations.<br>\nG1 is high only when both are high.<br>\nG2 inverts that, so it is high on the other three combinations.\n</td></tr></table>\n",
  "input_spec": "Input one line holding the gates in order, separated by commas. Within a gate, the name, the equals sign, the kind, and the inputs are separated by single spaces.",
  "output_spec": "Output an integer, the number of input combinations that drive the output high.",
  "constraints": "There are between 1 and 20 gates and between 1 and 12 distinct circuit inputs. Every gate's inputs are circuit inputs or gates listed before it. Gate names hold two or more characters, so they are never mistaken for circuit inputs.",
  "approach": "\n<p>Parse once, then evaluate the whole circuit once for every input combination. With at most\ntwelve inputs there are at most 4096 combinations, so brute force is not merely acceptable but the\nintended approach.</p>\n\n<p>Splitting is the first job. Break the line at the commas to get the gates, then break each gate at\nthe spaces. The first piece is the gate's name, the second is the equals sign and can be discarded, the\nthird is the kind, and everything after that is an input.</p>\n\n<p>Work out the circuit inputs by collecting every input that is a single character and is not the name\nof a gate. Sort them so the enumeration is deterministic, though for a count it does not actually\nmatter which order they take.</p>\n\n<p>Enumerate the combinations with a counter from 0 up to 2 raised to the number of inputs. Bit i of\nthat counter is the value of input i, which is why the sorted list is worth having. Then walk the gates\nin order, computing each one from values already known, since every gate's inputs are either circuit\ninputs or gates listed earlier. That ordering is guaranteed by the statement, so a single pass is\nenough and no dependency sorting is needed.</p>\n\n<p>The output is whatever the last gate produced, not whatever the largest value in your table is, so\nkeep hold of the last gate's result specifically. NOT and BUFFER take one input, so guard against\nreading a second one that is not there.</p>\n",
  "hints": [
   "How do you tell a circuit input from a gate name when both appear in the same position?",
   "A circuit input is a single character that is not a gate name. Enumerate the input combinations with a counter, evaluate the gates in the order given, and take the last gate's value."
  ],
  "fname": "countHighs",
  "task": "\n<ul>\n<li>The function has 1 parameter: a string, <code>netlist</code>, the gates separated by\ncommas.</li>\n<li>The function returns an integer, the number of combinations that drive the output high.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "G1 = AND A B, G2 = NOT G1"
    ],
    "out": "3"
   },
   {
    "in": [
     "G1 = XOR A B, G2 = XOR G1 C"
    ],
    "out": "4"
   },
   {
    "in": [
     "G1 = NOR A B"
    ],
    "out": "1"
   }
  ],
  "tests": [
   {
    "in": [
     "G1 = AND A B, G2 = NOT G1"
    ],
    "out": "3"
   },
   {
    "in": [
     "G1 = XOR A B, G2 = XOR G1 C"
    ],
    "out": "4"
   },
   {
    "in": [
     "G1 = NOR A B"
    ],
    "out": "1"
   },
   {
    "in": [
     "G1 = BUFFER A"
    ],
    "out": "1"
   },
   {
    "in": [
     "G1 = AND A B, G2 = OR C D, G3 = NAND G1 G2"
    ],
    "out": "13"
   },
   {
    "in": [
     "G1 = XNOR A B"
    ],
    "out": "2"
   },
   {
    "in": [
     "G1 = OR A B, G2 = OR C D, G3 = AND G1 G2"
    ],
    "out": "9"
   },
   {
    "in": [
     "GA = AND A B, GB = AND C D, GC = OR GA GB, GD = NOT GC"
    ],
    "out": "9"
   },
   {
    "in": [
     "G1 = NOT A, G2 = NOT G1"
    ],
    "out": "1"
   },
   {
    "in": [
     "G1 = XOR A B, G2 = XOR G1 C, G3 = XOR G2 D"
    ],
    "out": "8"
   },
   {
    "in": [
     "G1 = AND A A"
    ],
    "out": "1"
   },
   {
    "in": [
     "G1 = OR A B, G2 = AND G1 C, G3 = XOR G2 D, G4 = NOR G3 E"
    ],
    "out": "8"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef countHighs(netlist: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        netlist = _lines[_i + 0].strip()\n        print(countHighs(netlist))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countHighs(String netlist) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String netlist = _lines.get(_i + 0);\n            _sb.append(countHighs(netlist)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countHighs(string netlist) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string netlist = _lines[_i + 0];\n        cout << countHighs(netlist) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countHighs(netlist: str) -> int:\n\n    gates = []\n    names = set()\n    for part in netlist.split(\",\"):\n        tokens = part.split()\n        gates.append((tokens[0], tokens[2], tokens[3:]))\n        names.add(tokens[0])\n\n    inputs = sorted({a for _, _, args in gates for a in args\n                     if len(a) == 1 and a not in names})\n\n    count = 0\n    for mask in range(1 << len(inputs)):\n        env = {}\n        for i, name in enumerate(inputs):\n            env[name] = (mask >> i) & 1 == 1\n        last = False\n        for name, kind, args in gates:\n            x = env[args[0]]\n            y = env[args[1]] if len(args) > 1 else False\n            if kind == \"AND\":\n                last = x and y\n            elif kind == \"OR\":\n                last = x or y\n            elif kind == \"NAND\":\n                last = not (x and y)\n            elif kind == \"NOR\":\n                last = not (x or y)\n            elif kind == \"XOR\":\n                last = x != y\n            elif kind == \"XNOR\":\n                last = x == y\n            elif kind == \"NOT\":\n                last = not x\n            else:\n                last = x\n            env[name] = last\n        if last:\n            count += 1\n    return count\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        netlist = _lines[_i + 0].strip()\n        print(countHighs(netlist))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countHighs(String netlist) {\n\n        List<String[]> gates = new ArrayList<>();\n        Set<String> names = new HashSet<>();\n        for (String part : netlist.split(\",\")) {\n            String[] tokens = part.trim().split(\"\\\\s+\");\n            gates.add(tokens);\n            names.add(tokens[0]);\n        }\n        TreeSet<String> inputSet = new TreeSet<>();\n        for (String[] g : gates) {\n            for (int i = 3; i < g.length; i++) {\n                if (g[i].length() == 1 && !names.contains(g[i])) inputSet.add(g[i]);\n            }\n        }\n        List<String> inputs = new ArrayList<>(inputSet);\n\n        int count = 0;\n        for (int mask = 0; mask < (1 << inputs.size()); mask++) {\n            Map<String, Boolean> env = new HashMap<>();\n            for (int i = 0; i < inputs.size(); i++) env.put(inputs.get(i), ((mask >> i) & 1) == 1);\n            boolean last = false;\n            for (String[] g : gates) {\n                boolean x = env.get(g[3]);\n                boolean y = g.length > 4 ? env.get(g[4]) : false;\n                String kind = g[2];\n                if (kind.equals(\"AND\")) last = x && y;\n                else if (kind.equals(\"OR\")) last = x || y;\n                else if (kind.equals(\"NAND\")) last = !(x && y);\n                else if (kind.equals(\"NOR\")) last = !(x || y);\n                else if (kind.equals(\"XOR\")) last = x != y;\n                else if (kind.equals(\"XNOR\")) last = x == y;\n                else if (kind.equals(\"NOT\")) last = !x;\n                else last = x;\n                env.put(g[0], last);\n            }\n            if (last) count++;\n        }\n        return count;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String netlist = _lines.get(_i + 0);\n            _sb.append(countHighs(netlist)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countHighs(string netlist) {\n\n    vector<vector<string>> gates;\n    set<string> names;\n    string part;\n    istringstream commaStream(netlist);\n    while (getline(commaStream, part, ',')) {\n        vector<string> tokens;\n        string t;\n        istringstream is(part);\n        while (is >> t) tokens.push_back(t);\n        gates.push_back(tokens);\n        names.insert(tokens[0]);\n    }\n    set<string> inputSet;\n    for (auto &g : gates) {\n        for (size_t i = 3; i < g.size(); i++) {\n            if (g[i].size() == 1 && names.find(g[i]) == names.end()) inputSet.insert(g[i]);\n        }\n    }\n    vector<string> inputs(inputSet.begin(), inputSet.end());\n\n    int count = 0;\n    for (int mask = 0; mask < (1 << (int) inputs.size()); mask++) {\n        map<string, bool> env;\n        for (size_t i = 0; i < inputs.size(); i++) env[inputs[i]] = ((mask >> i) & 1) == 1;\n        bool last = false;\n        for (auto &g : gates) {\n            bool x = env[g[3]];\n            bool y = g.size() > 4 ? env[g[4]] : false;\n            string kind = g[2];\n            if (kind == \"AND\") last = x && y;\n            else if (kind == \"OR\") last = x || y;\n            else if (kind == \"NAND\") last = !(x && y);\n            else if (kind == \"NOR\") last = !(x || y);\n            else if (kind == \"XOR\") last = x != y;\n            else if (kind == \"XNOR\") last = x == y;\n            else if (kind == \"NOT\") last = !x;\n            else last = x;\n            env[g[0]] = last;\n        }\n        if (last) count++;\n    }\n    return count;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 1;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string netlist = _lines[_i + 0];\n        cout << countHighs(netlist) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "path-counter",
  "division": "Senior",
  "contest": 4,
  "title": "Path Counter",
  "blurb": "Count the paths of an exact length between two vertices of a graph.",
  "statement": "\n<p>A directed graph is given as its adjacency matrix, one row at a time. Entry (i, j) is 1 when an edge runs from vertex i to vertex j, and 0 otherwise. Rows and columns are numbered from 1 in the order given. Loops are allowed, and the matrix need not be symmetric.</p>\n\n<p>Count the paths of exactly the requested length from one vertex to another. A path here is\nACSL's, so vertices and edges may be repeated as often as you like, and only the number of edges\ntravelled matters.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>011;101;110<br>4 1 3</td></tr>\n<tr><th>Output</th><td>5</td></tr>\n<tr><th>Explanation</th><td>\nThe matrix describes a triangle on vertices 1, 2, and 3.<br>\nThere are five ways to walk four edges from vertex 1 and finish at vertex 3.<br>\nEach one is free to revisit vertices along the way.\n</td></tr></table>\n",
  "input_spec": "Input the matrix on the first line, rows separated by semicolons, each row a run of 0 and 1 characters. Input the length, the starting vertex, and the finishing vertex on the second line, separated by single spaces.",
  "output_spec": "Output an integer, the number of paths of exactly that length.",
  "constraints": "The matrix is between 1 by 1 and 8 by 8. The length is between 0 and 10, inclusive. The two vertex numbers are within the matrix. The answer always fits in a 32 bit signed integer.",
  "approach": "\n<p>The textbook answer is the kth power of the adjacency matrix, whose entry in row u and column v\nis the number of paths of length k from u to v. That works, but multiplying whole matrices is more\narithmetic than the question needs.</p>\n\n<p>You only want one row of the result, so carry one row. Start with a vector holding a 1 in the\nstarting vertex's position and 0 everywhere else, meaning there is exactly one path of length 0 that\nends where it began. Then repeat the length times: the new value at vertex j is the sum, over every\nvertex m that has an edge to j, of the old value at m. After k rounds, read off the finishing\nvertex.</p>\n\n<p>That is one vector times one matrix per round rather than a full matrix product, so the whole thing\ncosts the length times the number of vertices squared. For an 8 by 8 matrix and a length of 10 that is\nunder a thousand multiplications.</p>\n\n<p>A length of 0 is worth checking. The loop simply never runs, and the answer is 1 when the two\nvertices are the same and 0 otherwise, which the starting vector delivers without any special case. A\ngraph with no edges at all gives 0 for every positive length, as the all-zero matrix test checks.</p>\n\n<p>Counts grow like the degree raised to the length, so use 64 bit integers for the running vector even\nthough the final answer fits in 32 bits.</p>\n",
  "hints": [
   "The kth power of the adjacency matrix is the textbook answer, but you only need one row of it.",
   "Carry a vector holding a 1 at the starting vertex and multiply it by the matrix once per unit of length. A length of 0 needs no special case."
  ],
  "fname": "countWalks",
  "task": "\n<ul>\n<li>The function has 2 parameters: a string, <code>matrix</code>, the adjacency matrix, and a\nstring, <code>spec</code>, the length and the two vertex numbers.</li>\n<li>The function returns an integer, the number of paths.</li>\n</ul>\n",
  "samples": [
   {
    "in": [
     "011;101;110",
     "4 1 3"
    ],
    "out": "5"
   },
   {
    "in": [
     "011;101;110",
     "2 1 1"
    ],
    "out": "2"
   },
   {
    "in": [
     "01;10",
     "3 1 1"
    ],
    "out": "0"
   }
  ],
  "tests": [
   {
    "in": [
     "011;101;110",
     "4 1 3"
    ],
    "out": "5"
   },
   {
    "in": [
     "011;101;110",
     "2 1 1"
    ],
    "out": "2"
   },
   {
    "in": [
     "01;10",
     "3 1 1"
    ],
    "out": "0"
   },
   {
    "in": [
     "0111;1011;1101;1110",
     "10 1 1"
    ],
    "out": "14763"
   },
   {
    "in": [
     "0",
     "0 1 1"
    ],
    "out": "1"
   },
   {
    "in": [
     "0",
     "1 1 1"
    ],
    "out": "0"
   },
   {
    "in": [
     "0100;1010;0101;0010",
     "3 1 4"
    ],
    "out": "1"
   },
   {
    "in": [
     "011;101;110",
     "0 1 2"
    ],
    "out": "0"
   },
   {
    "in": [
     "01000;10100;01010;00101;00010",
     "2 1 3"
    ],
    "out": "1"
   },
   {
    "in": [
     "0111111;1011111;1101111;1110111;1111011;1111101;1111110",
     "8 1 1"
    ],
    "out": "239946"
   },
   {
    "in": [
     "010001;101000;010100;001010;000101;100010",
     "4 1 3"
    ],
    "out": "5"
   },
   {
    "in": [
     "00;00",
     "5 1 2"
    ],
    "out": "0"
   }
  ],
  "starter": {
   "python": "import sys\n\ndef countWalks(matrix: str, spec: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        matrix = _lines[_i + 0].strip()\n        spec = _lines[_i + 1].strip()\n        print(countWalks(matrix, spec))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countWalks(String matrix, String spec) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String matrix = _lines.get(_i + 0);\n            String spec = _lines.get(_i + 1);\n            _sb.append(countWalks(matrix, spec)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countWalks(string matrix, string spec) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string matrix = _lines[_i + 0];\n        string spec = _lines[_i + 1];\n        cout << countWalks(matrix, spec) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countWalks(matrix: str, spec: str) -> int:\n\n    rows = [[1 if c == \"1\" else 0 for c in line] for line in matrix.split(\";\")]\n    n = len(rows)\n    parts = spec.split()\n    length, u, v = int(parts[0]), int(parts[1]), int(parts[2])\n\n    cur = [0] * n\n    cur[u - 1] = 1\n    for _ in range(length):\n        nxt = [0] * n\n        for j in range(n):\n            total = 0\n            for m in range(n):\n                if rows[m][j]:\n                    total += cur[m]\n            nxt[j] = total\n        cur = nxt\n    return cur[v - 1]\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    if len(_lines) % _k:\n        raise ValueError('Incomplete test case: supply one line per parameter.')\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        matrix = _lines[_i + 0].strip()\n        spec = _lines[_i + 1].strip()\n        print(countWalks(matrix, spec))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countWalks(String matrix, String spec) {\n\n        String[] lines = matrix.split(\";\");\n        int n = lines.length;\n        int[][] a = new int[n][n];\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) a[i][j] = lines[i].charAt(j) == '1' ? 1 : 0;\n        }\n        String[] parts = spec.trim().split(\"\\\\s+\");\n        int length = Integer.parseInt(parts[0]);\n        int u = Integer.parseInt(parts[1]), v = Integer.parseInt(parts[2]);\n\n        long[] cur = new long[n];\n        cur[u - 1] = 1;\n        for (int step = 0; step < length; step++) {\n            long[] nxt = new long[n];\n            for (int j = 0; j < n; j++) {\n                long total = 0;\n                for (int m = 0; m < n; m++) if (a[m][j] == 1) total += cur[m];\n                nxt[j] = total;\n            }\n            cur = nxt;\n        }\n        return (int) cur[v - 1];\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        if (_lines.size() % _k != 0) throw new IllegalArgumentException(\"Incomplete test case: supply one line per parameter.\");\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String matrix = _lines.get(_i + 0);\n            String spec = _lines.get(_i + 1);\n            _sb.append(countWalks(matrix, spec)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countWalks(string matrix, string spec) {\n\n    vector<string> lines;\n    string line;\n    istringstream rowsIn(matrix);\n    while (getline(rowsIn, line, ';')) lines.push_back(line);\n    int n = (int) lines.size();\n    vector<vector<int>> a(n, vector<int>(n, 0));\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) a[i][j] = lines[i][j] == '1' ? 1 : 0;\n    }\n    int length, u, v;\n    istringstream ss(spec);\n    ss >> length >> u >> v;\n\n    vector<long long> cur(n, 0);\n    cur[u - 1] = 1;\n    for (int step = 0; step < length; step++) {\n        vector<long long> nxt(n, 0);\n        for (int j = 0; j < n; j++) {\n            long long total = 0;\n            for (int m = 0; m < n; m++) if (a[m][j]) total += cur[m];\n            nxt[j] = total;\n        }\n        cur = nxt;\n    }\n    return (int) cur[v - 1];\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        size_t _first = _ln.find_first_not_of(\" \\t\\r\\n\\f\\v\");\n        if (_first == string::npos) continue;\n        size_t _last = _ln.find_last_not_of(\" \\t\\r\\n\\f\\v\");\n        _lines.push_back(_ln.substr(_first, _last - _first + 1));\n    }\n    size_t _k = 2;\n    if (_lines.size() % _k != 0) { cerr << \"Incomplete test case: supply one line per parameter.\"; return 1; }\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string matrix = _lines[_i + 0];\n        string spec = _lines[_i + 1];\n        cout << countWalks(matrix, spec) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 }
];
