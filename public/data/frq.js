window.FRQ = [
 {
  "id": "digit-chain",
  "division": "Junior",
  "contest": 1,
  "title": "DIGIT CHAIN",
  "blurb": "Square the digits, add them up, repeat, and count the steps before it settles.",
  "statement": "\n<p>Pick a whole number. Replace it with the sum of the squares of its digits. Do that again to\nthe result, and again, and keep going. Every starting number eventually either lands on 1 or\nfalls into a loop it has already been through, so the process always settles.</p>\n\n<p>Count the replacements you make. Stop as soon as you reach 1, or as soon as you produce a\nvalue you have already seen. The number you stop at is not counted as a replacement, only the\nreplacements themselves are.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>19</td></tr>\n<tr><th>Output</th><td>4</td></tr>\n<tr><th>Explanation</th><td>\n1 squared plus 9 squared is 82, that is replacement 1.<br>\n8 squared plus 2 squared is 68, that is replacement 2.<br>\n6 squared plus 8 squared is 100, that is replacement 3.<br>\n1 squared plus 0 plus 0 is 1, that is replacement 4.<br>\nThe chain has reached 1, so output 4.\n</td></tr></table>\n",
  "input_spec": "Input a single whole number between 1 and 999999, inclusive.",
  "output_spec": "Output an integer, the number of replacements made before the chain reached 1 or repeated a value.",
  "constraints": "The starting number is between 1 and 999999, inclusive. Every chain settles within 40 replacements.",
  "approach": "\n<p>The loop itself is three lines. The part that decides whether you score is the stopping\nrule, because there are two ways to stop and they are easy to conflate.</p>\n\n<p>Keep a set of the values you have already produced, including the starting value. On each\npass, compute the next value, add one to the count, then ask two questions in this order: is it\n1, and have I seen it before. Either answer ends the loop.</p>\n\n<p>Putting the starting value in the seen set matters. The number 4 comes back to itself after\neight replacements, and if you only record values from the second one onward you will run\naround the loop a second time before noticing.</p>\n\n<p>Watch what gets counted. The step that lands on 1 is counted, but arriving at 1 does not\nthen get counted again. A start of 1 has made zero replacements and the answer is 0.</p>\n\n<p>Summing the squares of the digits is easier on the number than on a string in Java and C++:\ntake n modulo 10, square it, add it, then divide n by 10 and repeat while n is above zero.</p>\n",
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
    "out": "1"
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
   "python": "import sys\n\ndef chainLength(start: int) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(chainLength(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int chainLength(int start) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(chainLength(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint chainLength(int start) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << chainLength(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef chainLength(start: int) -> int:\n\n    seen = {start}\n    n = start\n    count = 0\n    while True:\n        total = 0\n        m = n\n        while m > 0:\n            d = m % 10\n            total += d * d\n            m //= 10\n        n = total\n        count += 1\n        if n == 1 or n in seen:\n            return count\n        seen.add(n)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = int(_lines[_i + 0].strip())\n        print(chainLength(start))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int chainLength(int start) {\n\n        Set<Integer> seen = new HashSet<>();\n        seen.add(start);\n        int n = start, count = 0;\n        while (true) {\n            int total = 0, m = n;\n            while (m > 0) { int d = m % 10; total += d * d; m /= 10; }\n            n = total;\n            count++;\n            if (n == 1 || seen.contains(n)) return count;\n            seen.add(n);\n        }\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int start = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(chainLength(start)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint chainLength(int start) {\n\n    set<int> seen;\n    seen.insert(start);\n    int n = start, count = 0;\n    while (true) {\n        int total = 0, m = n;\n        while (m > 0) { int d = m % 10; total += d * d; m /= 10; }\n        n = total;\n        count++;\n        if (n == 1 || seen.count(n)) return count;\n        seen.insert(n);\n    }\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int start = stoi(_lines[_i + 0]);\n        cout << chainLength(start) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "locker-hallway",
  "division": "Junior",
  "contest": 2,
  "title": "LOCKER HALLWAY",
  "blurb": "A hallway of lockers, a line of students, and every locker toggled more than once.",
  "statement": "\n<p>A hallway at ACSL High has N lockers in a row, numbered 1 through N, and every one of them\nstarts closed. Then N students walk the hallway one at a time.</p>\n\n<p>The first student opens every locker. The second student goes to every second locker, numbers\n2, 4, 6, and so on, and changes it: open becomes closed and closed becomes open. The third\nstudent does the same to every third locker, the fourth to every fourth, and so on through the\nNth student, who touches only locker N.</p>\n\n<p>After all N students have finished, report how many lockers are open and which open locker\nhas the highest number.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>20</td></tr>\n<tr><th>Output</th><td>4 16</td></tr>\n<tr><th>Explanation</th><td>\nLocker 12 is touched by students 1, 2, 3, 4, 6, and 12, which is six times, so it ends\nclosed.<br>\nLocker 16 is touched by students 1, 2, 4, 8, and 16, which is five times, so it ends open.<br>\nThe lockers left open are 1, 4, 9, and 16. That is four of them, and the highest is 16.\n</td></tr></table>\n",
  "input_spec": "Input a single integer N, the number of lockers.",
  "output_spec": "Output two integers separated by a single space: the number of lockers left open, then the number of the highest open locker. If no locker is open, output the word NONE.",
  "constraints": "N is between 1 and 100000, inclusive.",
  "approach": "\n<p>You can simulate this. An array of N booleans, a loop over students, an inner loop stepping\nby the student number, and a final scan. At N of 100000 that is about 1.2 million toggles, which\nruns fine. Write that version first if you are unsure, because it also confirms the pattern.</p>\n\n<p>The pattern is worth seeing, though, because it turns the whole problem into two lines.\nLocker k is touched once for each divisor of k, so it ends open exactly when k has an odd number\nof divisors. Divisors normally come in pairs, one on each side of the square root, and the only\ntime a pair collapses into a single number is when k is a perfect square. So the open lockers are\nexactly 1, 4, 9, 16, and so on.</p>\n\n<p>That makes the count the integer part of the square root of N, and the highest open locker\nthat count squared. For N of 20 the square root is about 4.47, so the count is 4 and the highest\nis 16.</p>\n\n<p>Be careful with the square root in floating point. For N of 10000 a value of 99.99999 rounds\ndown to 99 and costs you the test case. Take the integer part, then adjust: while\n(r + 1) squared is at most N, add one to r, and while r squared exceeds N, subtract one.</p>\n\n<p>N of 1 or more always leaves locker 1 open, so NONE never actually fires. Handle it anyway,\nsince the output spec asks for it and a defensive branch costs nothing.</p>\n",
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
   "python": "import sys\n\ndef lockerReport(n: int) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        print(lockerReport(n))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String lockerReport(int n) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(lockerReport(n)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring lockerReport(int n) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        cout << lockerReport(n) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef lockerReport(n: int) -> str:\n\n    r = int(n ** 0.5)\n    while (r + 1) * (r + 1) <= n:\n        r += 1\n    while r * r > n:\n        r -= 1\n    if r == 0:\n        return \"NONE\"\n    return str(r) + \" \" + str(r * r)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        print(lockerReport(n))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String lockerReport(int n) {\n\n        long r = (long) Math.sqrt((double) n);\n        while ((r + 1) * (r + 1) <= n) r++;\n        while (r * r > n) r--;\n        if (r == 0) return \"NONE\";\n        return r + \" \" + (r * r);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(lockerReport(n)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring lockerReport(int n) {\n\n    long long r = (long long) sqrt((double) n);\n    while ((r + 1) * (r + 1) <= n) r++;\n    while (r * r > n) r--;\n    if (r == 0) return \"NONE\";\n    return to_string(r) + \" \" + to_string(r * r);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        cout << lockerReport(n) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "elevator-trips",
  "division": "Junior",
  "contest": 3,
  "title": "ELEVATOR TRIPS",
  "blurb": "Load the elevator from the front of the line until the next person would overload it.",
  "statement": "\n<p>A single elevator serves the lobby of an office tower, and it has a weight limit. A line of\npeople is waiting, and they are strict about their place in it: nobody lets the person behind\nthem go first.</p>\n\n<p>Loading works like this. Starting with whoever is at the front, keep adding the next person in\nline as long as the total weight on board stays at or below the limit. As soon as the next person\nwould push the total over the limit, the doors close and the elevator goes up. It comes back\nempty and loads the same way from whoever is now at the front.</p>\n\n<p>Count the trips it takes to move everybody. Every person weighs at or below the limit, so the\nline always clears.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>200<br>120 60 90 100 50</td></tr>\n<tr><th>Output</th><td>3</td></tr>\n<tr><th>Explanation</th><td>\nTrip 1 takes 120, then 60 for a total of 180. Adding 90 would make 270, over the limit, so it\ngoes up.<br>\nTrip 2 takes 90, then 100 for a total of 190. Adding 50 would make 240, over the limit, so it\ngoes up.<br>\nTrip 3 takes the last person, 50.<br>\nThree trips in all, so output 3.\n</td></tr></table>\n",
  "input_spec": "Input an integer, the weight limit, on the first line. On the second line input a string of weights, each separated by a single space.",
  "output_spec": "Output an integer, the number of trips.",
  "constraints": "There are at most 60 people in line. Every weight is a positive integer no larger than the limit, and the limit is at most 5000.",
  "approach": "\n<p>One pass, two running values. Keep the weight currently on board and the number of trips\ntaken so far.</p>\n\n<p>For each person in order, ask whether adding them keeps the load at or below the limit. If it\ndoes, add them. If it does not, count a trip, empty the elevator, and put that person on board as\nthe first passenger of the next trip. When the line runs out, count one final trip for whoever is\nstill on board.</p>\n\n<p>That last step is the one people forget. The loop only counts a trip when someone gets turned\naway, so the final load never triggers it. If your answer is consistently one too low, this is\nwhy.</p>\n\n<p>The other detail is the comparison. The limit is inclusive, so a load of exactly the limit is\nfine and the doors do not close. Using a strict less than instead of less than or equal to breaks\nthe second sample, where each person weighs exactly the limit.</p>\n\n<p>Parsing the weights is the only fiddly part in Java and C++. In Java, trim the string and\nsplit on whitespace. In C++, feed it to an <code>istringstream</code> and read integers out with\nthe stream operator, which handles the spacing for you.</p>\n",
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
   "python": "import sys\n\ndef countTrips(limit: int, weights: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        limit = int(_lines[_i + 0].strip())\n        weights = _lines[_i + 1].strip()\n        print(countTrips(limit, weights))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countTrips(int limit, String weights) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int limit = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String weights = _lines.get(_i + 1);\n            _sb.append(countTrips(limit, weights)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countTrips(int limit, string weights) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int limit = stoi(_lines[_i + 0]);\n        string weights = _lines[_i + 1];\n        cout << countTrips(limit, weights) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countTrips(limit: int, weights: str) -> int:\n\n    load = 0\n    trips = 0\n    for tok in weights.split():\n        w = int(tok)\n        if load + w <= limit:\n            load += w\n        else:\n            trips += 1\n            load = w\n    if load > 0:\n        trips += 1\n    return trips\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        limit = int(_lines[_i + 0].strip())\n        weights = _lines[_i + 1].strip()\n        print(countTrips(limit, weights))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countTrips(int limit, String weights) {\n\n        int load = 0, trips = 0;\n        for (String tok : weights.trim().split(\"\\\\s+\")) {\n            int w = Integer.parseInt(tok);\n            if (load + w <= limit) {\n                load += w;\n            } else {\n                trips++;\n                load = w;\n            }\n        }\n        if (load > 0) trips++;\n        return trips;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int limit = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String weights = _lines.get(_i + 1);\n            _sb.append(countTrips(limit, weights)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countTrips(int limit, string weights) {\n\n    int load = 0, trips = 0, w;\n    istringstream is(weights);\n    while (is >> w) {\n        if (load + w <= limit) {\n            load += w;\n        } else {\n            trips++;\n            load = w;\n        }\n    }\n    if (load > 0) trips++;\n    return trips;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int limit = stoi(_lines[_i + 0]);\n        string weights = _lines[_i + 1];\n        cout << countTrips(limit, weights) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "spiral-word",
  "division": "Junior",
  "contest": 4,
  "title": "SPIRAL WORD",
  "blurb": "Read a square grid of letters clockwise from the outside in.",
  "statement": "\n<p>A square grid of letters is given to you flattened into a single string, filled in row by row.\nA grid of 16 letters is 4 by 4, a grid of 25 letters is 5 by 5, and so on.</p>\n\n<p>Read the grid clockwise starting at the top left corner. Go all the way across the top row,\nthen down the right column, then back across the bottom row, then up the left column, which\nbrings you to the row below where you started. Then do the same thing again on what is left,\nspiralling inward until every letter has been read.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>ABCDEFGHIJKLMNOP</td></tr>\n<tr><th>Output</th><td>ABCDHLPONMIEFGKJ</td></tr>\n<tr><th>Explanation</th><td>\nThe 16 letters make this 4 by 4 grid:\n<pre><code>A B C D\nE F G H\nI J K L\nM N O P</code></pre>\nThe outer ring, clockwise from A, reads ABCD then HLP then ONM then IE.<br>\nThat leaves the inner 2 by 2 block F G, J K, whose ring reads FG then K then J.<br>\nPutting them together gives ABCDHLPONMIEFGKJ.\n</td></tr></table>\n",
  "input_spec": "Input a string of uppercase letters whose length is a perfect square.",
  "output_spec": "Output the letters of the grid in clockwise spiral order, starting at the top left corner, with no spaces.",
  "constraints": "The string holds between 1 and 100 uppercase letters and its length is always a perfect square.",
  "approach": "\n<p>Do not try to compute the position of each letter with a formula. Walk the ring boundaries\ninstead and let four indices do the bookkeeping: <code>top</code>, <code>bottom</code>,\n<code>left</code>, and <code>right</code>.</p>\n\n<p>One ring is four passes. Go left to right along <code>top</code>, then increase\n<code>top</code>. Go top to bottom along <code>right</code>, then decrease <code>right</code>.\nGo right to left along <code>bottom</code>, then decrease <code>bottom</code>. Go bottom to top\nalong <code>left</code>, then increase <code>left</code>. Repeat while <code>top</code> is at or\nbelow <code>bottom</code> and <code>left</code> is at or below <code>right</code>.</p>\n\n<p>The two guards you need are on the third and fourth passes. When a ring has collapsed to a\nsingle row, the bottom pass would walk that same row backwards and print it twice, so only run it\nwhen <code>top</code> is still at or below <code>bottom</code>. The same applies to a single\ncolumn and the left pass. On a 3 by 3 grid the center letter is exactly where this bites.</p>\n\n<p>Getting the side length from the string is a square root, and the same floating point caution\napplies as anywhere else: take the integer part, then nudge it until n times n equals the length.\nReaching the letter at row r and column c is then <code>grid[r * n + c]</code>.</p>\n\n<p>Test the odd sizes and the trivial ones. A single letter, a 2 by 2, and a 3 by 3 catch nearly\nevery version of this bug.</p>\n",
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
   "python": "import sys\n\ndef readSpiral(grid: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        grid = _lines[_i + 0].strip()\n        print(readSpiral(grid))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String readSpiral(String grid) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String grid = _lines.get(_i + 0);\n            _sb.append(readSpiral(grid)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring readSpiral(string grid) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string grid = _lines[_i + 0];\n        cout << readSpiral(grid) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef readSpiral(grid: str) -> str:\n\n    n = int(len(grid) ** 0.5)\n    while n * n < len(grid):\n        n += 1\n    top, bottom, left, right = 0, n - 1, 0, n - 1\n    out = []\n    while top <= bottom and left <= right:\n        for c in range(left, right + 1):\n            out.append(grid[top * n + c])\n        top += 1\n        for r in range(top, bottom + 1):\n            out.append(grid[r * n + right])\n        right -= 1\n        if top <= bottom:\n            for c in range(right, left - 1, -1):\n                out.append(grid[bottom * n + c])\n            bottom -= 1\n        if left <= right:\n            for r in range(bottom, top - 1, -1):\n                out.append(grid[r * n + left])\n            left += 1\n    return \"\".join(out)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        grid = _lines[_i + 0].strip()\n        print(readSpiral(grid))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String readSpiral(String grid) {\n\n        int n = (int) Math.sqrt((double) grid.length());\n        while (n * n < grid.length()) n++;\n        int top = 0, bottom = n - 1, left = 0, right = n - 1;\n        StringBuilder out = new StringBuilder();\n        while (top <= bottom && left <= right) {\n            for (int c = left; c <= right; c++) out.append(grid.charAt(top * n + c));\n            top++;\n            for (int r = top; r <= bottom; r++) out.append(grid.charAt(r * n + right));\n            right--;\n            if (top <= bottom) {\n                for (int c = right; c >= left; c--) out.append(grid.charAt(bottom * n + c));\n                bottom--;\n            }\n            if (left <= right) {\n                for (int r = bottom; r >= top; r--) out.append(grid.charAt(r * n + left));\n                left++;\n            }\n        }\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String grid = _lines.get(_i + 0);\n            _sb.append(readSpiral(grid)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring readSpiral(string grid) {\n\n    int n = (int) sqrt((double) grid.size());\n    while ((size_t)(n * n) < grid.size()) n++;\n    int top = 0, bottom = n - 1, left = 0, right = n - 1;\n    string out;\n    while (top <= bottom && left <= right) {\n        for (int c = left; c <= right; c++) out += grid[top * n + c];\n        top++;\n        for (int r = top; r <= bottom; r++) out += grid[r * n + right];\n        right--;\n        if (top <= bottom) {\n            for (int c = right; c >= left; c--) out += grid[bottom * n + c];\n            bottom--;\n        }\n        if (left <= right) {\n            for (int r = bottom; r >= top; r--) out += grid[r * n + left];\n            left++;\n        }\n    }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string grid = _lines[_i + 0];\n        cout << readSpiral(grid) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "roman-addition",
  "division": "Junior",
  "contest": 1,
  "title": "ROMAN ADDITION",
  "blurb": "Add two Roman numerals and write the answer back in standard form.",
  "statement": "\n<p>Roman numerals use the letters I for 1, V for 5, X for 10, L for 50, C for 100, D for 500, and\nM for 1000. A numeral is read left to right, adding as you go, except that a smaller value placed\ndirectly in front of a larger one is subtracted instead. So XL is 40 and LX is 60.</p>\n\n<p>Standard form allows exactly six subtractive pairs: IV for 4, IX for 9, XL for 40, XC for 90,\nCD for 400, and CM for 900. No other letter may be placed in front of a larger one, and no letter\nmay repeat more than three times in a row.</p>\n\n<p>Given two Roman numerals, add them and write the sum as a Roman numeral in standard form.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>XLII<br>MCMXCIX</td></tr>\n<tr><th>Output</th><td>MMXLI</td></tr>\n<tr><th>Explanation</th><td>\nXLII is XL plus I plus I, which is 40 + 1 + 1, or 42.<br>\nMCMXCIX is M plus CM plus XC plus IX, which is 1000 + 900 + 90 + 9, or 1999.<br>\nThe sum is 2041, which is written MM for 2000, XL for 40, and I for 1.\n</td></tr></table>\n",
  "input_spec": "Input a Roman numeral in standard form on the first line and a second Roman numeral in standard form on the second line.",
  "output_spec": "Output the sum as a Roman numeral in standard form.",
  "constraints": "Each input numeral has a value between 1 and 3999, inclusive, and the sum is never more than 3999.",
  "approach": "\n<p>Two conversions with an addition in the middle. Neither conversion needs a special case if you\nset the tables up correctly.</p>\n\n<p>Going from Roman to a number, scan left to right and compare each letter with the one after\nit. If the current value is smaller than the next, subtract it. Otherwise add it. That single\nrule handles all six subtractive pairs without listing any of them, because IV is the only way a\nsmaller I can sit in front of a larger V.</p>\n\n<p>Going from a number back to Roman is greedy, and the trick is what goes in the table. List all\nthirteen values in descending order and include the subtractive pairs as entries of their own:\n1000 M, 900 CM, 500 D, 400 CD, 100 C, 90 XC, 50 L, 40 XL, 10 X, 9 IX, 5 V, 4 IV, 1 I. Then repeat\ntaking the largest entry that fits and subtracting it. With those six extra rows the greedy pass\nproduces standard form automatically.</p>\n\n<p>Leave the four out and you will emit IIII for 4 and DCCCC for 900, which look reasonable and\nfail every test that touches them. That is the whole difficulty of the problem.</p>\n",
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
   "python": "import sys\n\ndef romanSum(a: str, b: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        a = _lines[_i + 0].strip()\n        b = _lines[_i + 1].strip()\n        print(romanSum(a, b))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String romanSum(String a, String b) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String a = _lines.get(_i + 0);\n            String b = _lines.get(_i + 1);\n            _sb.append(romanSum(a, b)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring romanSum(string a, string b) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string a = _lines[_i + 0];\n        string b = _lines[_i + 1];\n        cout << romanSum(a, b) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\n\nVALUES = [(1000, \"M\"), (900, \"CM\"), (500, \"D\"), (400, \"CD\"), (100, \"C\"), (90, \"XC\"),\n          (50, \"L\"), (40, \"XL\"), (10, \"X\"), (9, \"IX\"), (5, \"V\"), (4, \"IV\"), (1, \"I\")]\nDIGIT = {\"I\": 1, \"V\": 5, \"X\": 10, \"L\": 50, \"C\": 100, \"D\": 500, \"M\": 1000}\n\n\ndef to_int(s):\n    total = 0\n    for i, ch in enumerate(s):\n        v = DIGIT[ch]\n        if i + 1 < len(s) and v < DIGIT[s[i + 1]]:\n            total -= v\n        else:\n            total += v\n    return total\n\ndef romanSum(a: str, b: str) -> str:\n\n    n = to_int(a) + to_int(b)\n    out = \"\"\n    for value, letters in VALUES:\n        while n >= value:\n            out += letters\n            n -= value\n    return out\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        a = _lines[_i + 0].strip()\n        b = _lines[_i + 1].strip()\n        print(romanSum(a, b))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static final int[] VALS = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\n    static final String[] LETS = {\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"};\n\n    static int digit(char c) {\n        switch (c) {\n            case 'I': return 1;\n            case 'V': return 5;\n            case 'X': return 10;\n            case 'L': return 50;\n            case 'C': return 100;\n            case 'D': return 500;\n            default: return 1000;\n        }\n    }\n\n    static int toInt(String s) {\n        int total = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int v = digit(s.charAt(i));\n            if (i + 1 < s.length() && v < digit(s.charAt(i + 1))) total -= v;\n            else total += v;\n        }\n        return total;\n    }\n\n    static String romanSum(String a, String b) {\n\n        int n = toInt(a) + toInt(b);\n        StringBuilder out = new StringBuilder();\n        for (int i = 0; i < VALS.length; i++) {\n            while (n >= VALS[i]) { out.append(LETS[i]); n -= VALS[i]; }\n        }\n        return out.toString();\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String a = _lines.get(_i + 0);\n            String b = _lines.get(_i + 1);\n            _sb.append(romanSum(a, b)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nstatic const int VALS[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};\nstatic const char *LETS[] = {\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"};\n\nstatic int digitv(char c) {\n    switch (c) {\n        case 'I': return 1;\n        case 'V': return 5;\n        case 'X': return 10;\n        case 'L': return 50;\n        case 'C': return 100;\n        case 'D': return 500;\n        default: return 1000;\n    }\n}\n\nstatic int toInt(const string &s) {\n    int total = 0;\n    for (size_t i = 0; i < s.size(); i++) {\n        int v = digitv(s[i]);\n        if (i + 1 < s.size() && v < digitv(s[i + 1])) total -= v;\n        else total += v;\n    }\n    return total;\n}\n\nstring romanSum(string a, string b) {\n\n    int n = toInt(a) + toInt(b);\n    string out;\n    for (int i = 0; i < 13; i++) {\n        while (n >= VALS[i]) { out += LETS[i]; n -= VALS[i]; }\n    }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string a = _lines[_i + 0];\n        string b = _lines[_i + 1];\n        cout << romanSum(a, b) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "change-machine",
  "division": "Junior",
  "contest": 2,
  "title": "CHANGE MACHINE",
  "blurb": "Pay out change largest coin first, and admit it when the greedy rule gets stuck.",
  "statement": "\n<p>A vending machine pays out change one coin at a time. It always reaches for the largest coin\nit still stocks that does not overshoot what it still owes, hands that out, and repeats until it\nowes nothing.</p>\n\n<p>The machine does not stock every denomination, and it does not plan ahead. If it runs out of\nchoices while it still owes money, it gives up and refuses the sale.</p>\n\n<p>Given the amount owed and the coin values the machine stocks, report how many of each coin it\npays out.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>87<br>25 10 5 1</td></tr>\n<tr><th>Output</th><td>3 1 0 2</td></tr>\n<tr><th>Explanation</th><td>\nThree 25s bring the debt from 87 down to 12.<br>\nOne 10 brings it down to 2.<br>\nA 5 would overshoot, so none are used.<br>\nTwo 1s finish it.<br>\nReporting the counts in the order the coins were listed gives 3 1 0 2.\n</td></tr></table>\n",
  "input_spec": "Input the amount owed as an integer on the first line. On the second line input the coin values the machine stocks, each separated by a single space, in descending order.",
  "output_spec": "Output the number of each coin paid out, in the same order the coin values were given, separated by single spaces. If the machine cannot pay the exact amount by this rule, output IMPOSSIBLE.",
  "constraints": "The amount owed is between 1 and 100000, inclusive. There are at most 10 coin values, all positive and all distinct, given in descending order.",
  "approach": "\n<p>The loop is short: for each coin value in the order given, divide what is still owed by that\nvalue to get the count, then take the remainder as the new amount owed. At the end, if anything\nis still owed, the answer is IMPOSSIBLE.</p>\n\n<p>What makes this a real problem is that greedy is not always right, and the problem statement\ndeliberately tells you to be greedy anyway. With coins of 25, 10, 5, and 1 the greedy answer\nhappens to be optimal for every amount, which is why American coins feel natural. With coins of\n25 and 10 and an amount of 30, greedy grabs the 25, is left owing 5, and has nothing that fits,\nso it reports IMPOSSIBLE even though three 10s would have worked.</p>\n\n<p>Do not fix that. The machine described in the statement has no lookahead, and a solver that\nfinds the clever combination fails the fifth test case. Read the rule you were given and\nimplement that rule.</p>\n\n<p>The output has one number per coin value, including the zeros. Skipping a coin that was never\nused collapses the columns and misaligns everything after it, which is the other way to lose this\nproblem.</p>\n",
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
   "python": "import sys\n\ndef makeChange(owed: int, coins: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        owed = int(_lines[_i + 0].strip())\n        coins = _lines[_i + 1].strip()\n        print(makeChange(owed, coins))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String makeChange(int owed, String coins) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int owed = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String coins = _lines.get(_i + 1);\n            _sb.append(makeChange(owed, coins)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring makeChange(int owed, string coins) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int owed = stoi(_lines[_i + 0]);\n        string coins = _lines[_i + 1];\n        cout << makeChange(owed, coins) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef makeChange(owed: int, coins: str) -> str:\n\n    left = owed\n    parts = []\n    for tok in coins.split():\n        v = int(tok)\n        parts.append(str(left // v))\n        left %= v\n    if left > 0:\n        return \"IMPOSSIBLE\"\n    return \" \".join(parts)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        owed = int(_lines[_i + 0].strip())\n        coins = _lines[_i + 1].strip()\n        print(makeChange(owed, coins))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String makeChange(int owed, String coins) {\n\n        int left = owed;\n        List<String> parts = new ArrayList<>();\n        for (String tok : coins.trim().split(\"\\\\s+\")) {\n            int v = Integer.parseInt(tok);\n            parts.add(String.valueOf(left / v));\n            left %= v;\n        }\n        if (left > 0) return \"IMPOSSIBLE\";\n        return String.join(\" \", parts);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int owed = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String coins = _lines.get(_i + 1);\n            _sb.append(makeChange(owed, coins)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring makeChange(int owed, string coins) {\n\n    int left = owed, v;\n    vector<string> parts;\n    istringstream is(coins);\n    while (is >> v) {\n        parts.push_back(to_string(left / v));\n        left %= v;\n    }\n    if (left > 0) return \"IMPOSSIBLE\";\n    string out;\n    for (size_t i = 0; i < parts.size(); i++) { if (i) out += ' '; out += parts[i]; }\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int owed = stoi(_lines[_i + 0]);\n        string coins = _lines[_i + 1];\n        cout << makeChange(owed, coins) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "stamp-combinations",
  "division": "Senior",
  "contest": 1,
  "title": "STAMP COMBINATIONS",
  "blurb": "Count the ways to make exact postage when order does not matter.",
  "statement": "\n<p>A post office sells stamps in a handful of values and never runs out of any of them. A\ncustomer wants to make up an exact amount of postage on one envelope.</p>\n\n<p>Count the different ways to do it. Two ways are the same if they use the same number of each\nstamp value, so sticking a 5 and then a 2 on the envelope is the same as sticking a 2 and then a\n5. Using no stamps at all counts as the only way to make an amount of 0.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>10<br>1 2 5</td></tr>\n<tr><th>Output</th><td>10</td></tr>\n<tr><th>Explanation</th><td>\nThe ten ways, written as the count of 5s, 2s, and 1s:<br>\ntwo 5s; one 5 and two 2s and one 1; one 5 and one 2 and three 1s; one 5 and five 1s;<br>\nfive 2s; four 2s and two 1s; three 2s and four 1s; two 2s and six 1s;<br>\none 2 and eight 1s; ten 1s.\n</td></tr></table>\n",
  "input_spec": "Input the postage amount as an integer on the first line. On the second line input the stamp values, each separated by a single space.",
  "output_spec": "Output an integer, the number of distinct ways to make the exact amount.",
  "constraints": "The amount is between 0 and 300, inclusive. There are at most 8 distinct stamp values, each between 1 and 300. The answer always fits in a 64 bit integer.",
  "approach": "\n<p>Recursion that tries every count of every stamp works and is far too slow at 300. The fix is a\nsingle one dimensional table, and the order of the two loops is the whole problem.</p>\n\n<p>Let <code>ways[k]</code> be the number of ways to make exactly k. Start with\n<code>ways[0]</code> equal to 1 and everything else 0. Now loop over the stamp values on the\noutside, and for each one loop k upward from that stamp value to the amount, adding\n<code>ways[k - value]</code> into <code>ways[k]</code>.</p>\n\n<p>Putting the stamps on the outside is what makes order irrelevant. Each stamp value is fully\nabsorbed into the table before the next one is considered, so a combination is only ever built in\none canonical order and never counted twice. Swap the loops so that k is on the outside and you\ncount ordered sequences instead, which for the sample would give 128 rather than 10.</p>\n\n<p>Running k upward rather than downward is what allows a stamp to be reused. Counting downward\nwould let each value be used at most once, which is the answer to a different question.</p>\n\n<p>An amount of 0 has exactly one way, the empty selection, and the initial\n<code>ways[0]</code> equal to 1 delivers that for free. Counts grow quickly, so use a 64 bit\ninteger.</p>\n",
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
   "python": "import sys\n\ndef countWays(amount: int, stamps: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        amount = int(_lines[_i + 0].strip())\n        stamps = _lines[_i + 1].strip()\n        print(countWays(amount, stamps))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countWays(int amount, String stamps) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int amount = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String stamps = _lines.get(_i + 1);\n            _sb.append(countWays(amount, stamps)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countWays(int amount, string stamps) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int amount = stoi(_lines[_i + 0]);\n        string stamps = _lines[_i + 1];\n        cout << countWays(amount, stamps) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countWays(amount: int, stamps: str) -> int:\n\n    ways = [0] * (amount + 1)\n    ways[0] = 1\n    for tok in stamps.split():\n        v = int(tok)\n        for k in range(v, amount + 1):\n            ways[k] += ways[k - v]\n    return ways[amount]\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        amount = int(_lines[_i + 0].strip())\n        stamps = _lines[_i + 1].strip()\n        print(countWays(amount, stamps))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countWays(int amount, String stamps) {\n\n        long[] ways = new long[amount + 1];\n        ways[0] = 1;\n        for (String tok : stamps.trim().split(\"\\\\s+\")) {\n            int v = Integer.parseInt(tok);\n            for (int k = v; k <= amount; k++) ways[k] += ways[k - v];\n        }\n        return (int) ways[amount];\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int amount = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String stamps = _lines.get(_i + 1);\n            _sb.append(countWays(amount, stamps)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countWays(int amount, string stamps) {\n\n    vector<long long> ways(amount + 1, 0);\n    ways[0] = 1;\n    int v;\n    istringstream is(stamps);\n    while (is >> v) {\n        for (int k = v; k <= amount; k++) ways[k] += ways[k - v];\n    }\n    return (int) ways[amount];\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int amount = stoi(_lines[_i + 0]);\n        string stamps = _lines[_i + 1];\n        cout << countWays(amount, stamps) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "expression-target",
  "division": "Senior",
  "contest": 2,
  "title": "EXPRESSION TARGET",
  "blurb": "Wedge operators between digits, evaluate strictly left to right, and count the hits.",
  "statement": "\n<p>You are given a string of digits and a target value. Leave the digits exactly where they are\nand slot one operator into each gap between neighbouring digits. The only operators allowed are\n+, &minus;, and *, and each gap must get exactly one of them.</p>\n\n<p>Evaluate the result strictly left to right, with no precedence at all. Multiplication does not\ngo first. So 1 + 2 * 3 is evaluated as 1 + 2, then times 3, which is 9.</p>\n\n<p>Count how many of the operator choices produce the target value. Two choices are different if\nany gap holds a different operator.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>6<br>123</td></tr>\n<tr><th>Output</th><td>2</td></tr>\n<tr><th>Explanation</th><td>\nThere are two gaps and three operators, so nine expressions in all:<br>\n1+2+3 is 6, 1+2&minus;3 is 0, 1+2*3 is 9, 1&minus;2+3 is 2, 1&minus;2&minus;3 is &minus;4,\n1&minus;2*3 is &minus;3, 1*2+3 is 5, 1*2&minus;3 is &minus;1, and 1*2*3 is 6.<br>\nTwo of them equal 6, so output 2.\n</td></tr></table>\n",
  "input_spec": "Input the target value as an integer on the first line and a string of digits on the second line.",
  "output_spec": "Output an integer, the number of operator choices that produce the target.",
  "constraints": "The digit string holds between 2 and 11 digits, each 0 through 9. The target is between &minus;1000000 and 1000000, inclusive.",
  "approach": "\n<p>With d digits there are d minus 1 gaps and three choices per gap, so at most 3 to the tenth\nexpressions, which is 59049. That is small enough to try every one of them, and the clean way to\ndo it is recursion.</p>\n\n<p>Write a helper that takes the index of the next digit and the value accumulated so far. At the\nend of the string, return 1 if the accumulated value equals the target and 0 otherwise. Otherwise\nreturn the sum of three recursive calls, one for each operator applied to the running value and\nthe next digit.</p>\n\n<p>Because the evaluation is strictly left to right, the running value is all the state you need.\nThere is no need to build the expression, tokenize it, or worry about precedence, and that is\nexactly why the problem specifies left to right evaluation. A solver that quietly applies normal\nprecedence gets the first sample right by luck and then diverges.</p>\n\n<p>Start the recursion at the second digit with the first digit as the running value. Starting at\nthe first digit with 0 would silently add a leading plus and change the answer, which matters as\nsoon as the first operator would have been a minus.</p>\n\n<p>Values can swing far outside the target range along the way, since a string of nines\nmultiplied together is large, so keep the running value in a 64 bit integer. The comparison at\nthe end still only accepts an exact match.</p>\n",
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
   "python": "import sys\n\ndef countExpressions(target: int, digits: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        target = int(_lines[_i + 0].strip())\n        digits = _lines[_i + 1].strip()\n        print(countExpressions(target, digits))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countExpressions(int target, String digits) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int target = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String digits = _lines.get(_i + 1);\n            _sb.append(countExpressions(target, digits)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countExpressions(int target, string digits) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int target = stoi(_lines[_i + 0]);\n        string digits = _lines[_i + 1];\n        cout << countExpressions(target, digits) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\n\ndef walk(digits, i, acc, target):\n    if i == len(digits):\n        return 1 if acc == target else 0\n    d = int(digits[i])\n    return (walk(digits, i + 1, acc + d, target)\n            + walk(digits, i + 1, acc - d, target)\n            + walk(digits, i + 1, acc * d, target))\n\ndef countExpressions(target: int, digits: str) -> int:\n\n    return walk(digits, 1, int(digits[0]), target)\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        target = int(_lines[_i + 0].strip())\n        digits = _lines[_i + 1].strip()\n        print(countExpressions(target, digits))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static int walk(String digits, int i, long acc, int target) {\n        if (i == digits.length()) return acc == target ? 1 : 0;\n        long d = digits.charAt(i) - '0';\n        return walk(digits, i + 1, acc + d, target)\n             + walk(digits, i + 1, acc - d, target)\n             + walk(digits, i + 1, acc * d, target);\n    }\n\n    static int countExpressions(int target, String digits) {\n\n        return walk(digits, 1, digits.charAt(0) - '0', target);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int target = Integer.parseInt((_lines.get(_i + 0)).trim());\n            String digits = _lines.get(_i + 1);\n            _sb.append(countExpressions(target, digits)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nstatic int walk(const string &digits, size_t i, long long acc, int target) {\n    if (i == digits.size()) return acc == target ? 1 : 0;\n    long long d = digits[i] - '0';\n    return walk(digits, i + 1, acc + d, target)\n         + walk(digits, i + 1, acc - d, target)\n         + walk(digits, i + 1, acc * d, target);\n}\n\nint countExpressions(int target, string digits) {\n\n    return walk(digits, 1, digits[0] - '0', target);\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int target = stoi(_lines[_i + 0]);\n        string digits = _lines[_i + 1];\n        cout << countExpressions(target, digits) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "maze-routes",
  "division": "Senior",
  "contest": 3,
  "title": "MAZE ROUTES",
  "blurb": "Count the ways across a blocked grid when you may only move right or down.",
  "statement": "\n<p>A delivery robot starts in the top left square of a rectangular grid and has to reach the\nbottom right square. It only ever moves one square to the right or one square down, never up and\nnever left.</p>\n\n<p>Some squares are blocked and the robot cannot enter them. Count the routes from the top left\nto the bottom right that avoid every blocked square. If the start or the finish is itself blocked,\nthere are no routes at all.</p>\n\n<p>The grid arrives as one string with the rows separated by semicolons. A period is an open\nsquare and a number sign is a blocked one. Every row has the same length.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>...;.#.;...</td></tr>\n<tr><th>Output</th><td>2</td></tr>\n<tr><th>Explanation</th><td>\nThe grid is three by three with the center blocked:\n<pre><code>. . .\n. # .\n. . .</code></pre>\nWithout the block there would be six routes. The two that survive are right, right, down, down,\nand down, down, right, right. Every other route passes through the center.\n</td></tr></table>\n",
  "input_spec": "Input one string holding the grid, with rows separated by semicolons. A period is an open square and a number sign is a blocked square.",
  "output_spec": "Output an integer, the number of routes from the top left square to the bottom right square.",
  "constraints": "The grid has between 1 and 17 rows and between 1 and 17 columns. Every row has the same length. The answer fits in a 64 bit integer.",
  "approach": "\n<p>The plain recursion, where each square asks its right neighbour and its lower neighbour, is\ncorrect and hopeless. On a 17 by 17 grid it explores about 300 million branches because it keeps\nresolving the same square from different directions.</p>\n\n<p>The fix is a table. Let <code>ways[r][c]</code> be the number of routes from the top left to\nthat square. A blocked square gets 0. Otherwise the value is <code>ways[r - 1][c]</code> plus\n<code>ways[r][c - 1]</code>, treating anything off the grid as 0, because the only way to arrive\nis from directly above or directly to the left.</p>\n\n<p>Seed <code>ways[0][0]</code> with 1 when the start is open and 0 when it is blocked. Fill the\ntable row by row from the top and the answer is the bottom right entry. That is 289 additions\ninstead of 300 million branches.</p>\n\n<p>The whole first row and the whole first column deserve a moment. A blocked square anywhere\nalong the top row means every square to its right in that row is unreachable, and the table\nproduces that automatically as long as you set the blocked square to 0 before reading it. Do not\nspecial case the borders, just guard the index.</p>\n\n<p>Splitting the input is the one piece of plumbing. In Python that is a split on the semicolon.\nIn Java it is <code>split(\";\")</code>, and in C++ it is <code>getline</code> on an\n<code>istringstream</code> with a semicolon delimiter.</p>\n\n<p>Counts on an open 17 by 17 grid reach about 10 billion, which overflows a 32 bit integer, so\nkeep the table in 64 bit values.</p>\n",
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
   "python": "import sys\n\ndef countRoutes(maze: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        maze = _lines[_i + 0].strip()\n        print(countRoutes(maze))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countRoutes(String maze) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String maze = _lines.get(_i + 0);\n            _sb.append(countRoutes(maze)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countRoutes(string maze) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string maze = _lines[_i + 0];\n        cout << countRoutes(maze) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef countRoutes(maze: str) -> int:\n\n    rows = maze.split(\";\")\n    h = len(rows)\n    w = len(rows[0])\n    ways = [[0] * w for _ in range(h)]\n    for r in range(h):\n        for c in range(w):\n            if rows[r][c] == \"#\":\n                ways[r][c] = 0\n            elif r == 0 and c == 0:\n                ways[r][c] = 1\n            else:\n                up = ways[r - 1][c] if r > 0 else 0\n                left = ways[r][c - 1] if c > 0 else 0\n                ways[r][c] = up + left\n    return ways[h - 1][w - 1]\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        maze = _lines[_i + 0].strip()\n        print(countRoutes(maze))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int countRoutes(String maze) {\n\n        String[] rows = maze.split(\";\");\n        int h = rows.length, w = rows[0].length();\n        long[][] ways = new long[h][w];\n        for (int r = 0; r < h; r++) {\n            for (int c = 0; c < w; c++) {\n                if (rows[r].charAt(c) == '#') {\n                    ways[r][c] = 0;\n                } else if (r == 0 && c == 0) {\n                    ways[r][c] = 1;\n                } else {\n                    long up = r > 0 ? ways[r - 1][c] : 0;\n                    long left = c > 0 ? ways[r][c - 1] : 0;\n                    ways[r][c] = up + left;\n                }\n            }\n        }\n        return (int) ways[h - 1][w - 1];\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String maze = _lines.get(_i + 0);\n            _sb.append(countRoutes(maze)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint countRoutes(string maze) {\n\n    vector<string> rows;\n    string row;\n    istringstream is(maze);\n    while (getline(is, row, ';')) rows.push_back(row);\n    int h = (int) rows.size(), w = (int) rows[0].size();\n    vector<vector<long long>> ways(h, vector<long long>(w, 0));\n    for (int r = 0; r < h; r++) {\n        for (int c = 0; c < w; c++) {\n            if (rows[r][c] == '#') {\n                ways[r][c] = 0;\n            } else if (r == 0 && c == 0) {\n                ways[r][c] = 1;\n            } else {\n                long long up = r > 0 ? ways[r - 1][c] : 0;\n                long long left = c > 0 ? ways[r][c - 1] : 0;\n                ways[r][c] = up + left;\n            }\n        }\n    }\n    return (int) ways[h - 1][w - 1];\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string maze = _lines[_i + 0];\n        cout << countRoutes(maze) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "number-safari",
  "division": "Senior",
  "contest": 4,
  "title": "NUMBER SAFARI",
  "blurb": "Hunt five kinds of number inside the digits of a license plate.",
  "statement": "\n<p>Every summer the Ortiz family drives from Providence to Montreal, and the youngest passenger\npasses the time hunting for interesting numbers on the license plates ahead.</p>\n\n<p>You are given a license plate made of 8 digits. Consider every 2 digit, 3 digit, and 4 digit\nnumber formed by adjacent digits of the plate, reading left to right. A 2 digit number must be\nbetween 10 and 99, a 3 digit number between 100 and 999, and a 4 digit number between 1000 and\n9999, so any run that starts with a 0 is thrown out. That leaves at most 18 numbers.</p>\n\n<p>Check every one of them against these five kinds:</p>\n<ol>\n<li>A <b>Harshad</b> number is divisible by the sum of its own digits. 12 is Harshad because its\ndigits add to 3 and 12 divided by 3 is 4.</li>\n<li>A <b>palindrome</b> reads the same forwards and backwards, like 66 or 909.</li>\n<li>A <b>square</b> number is some whole number multiplied by itself, like 36 or 1024.</li>\n<li>A <b>triangular</b> number is a sum 1 + 2 + 3 + ... + k for some k. The first few are 1, 3, 6,\n10, 15, 21, 28, and 36.</li>\n<li>An <b>emirp</b> is a prime whose digits reversed give a different prime. 71 is an emirp\nbecause 71 and 17 are both prime. 101 is not, because reversing it gives 101 again.</li>\n</ol>\n\n<p>Report which kinds you found: H for Harshad, P for palindrome, S for square, T for triangular,\nand Z for emirp. List the letters in alphabetical order, once each.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>36671276</td></tr>\n<tr><th>Output</th><td>HPSTZ</td></tr>\n<tr><th>Explanation</th><td>\nThe 18 numbers are 36, 66, 67, 71, 12, 27, 76, 366, 667, 671, 712, 127, 276, 3667, 6671, 6712,\n7127, and 1276.<br>\nHarshad: 36, 12, and 27.<br>\nPalindrome: 66.<br>\nSquare: 36, which is 6 times 6.<br>\nTriangular: 36, 66, and 276.<br>\nEmirp: 71, since 17 is also prime.<br>\nAll five kinds appear, so output HPSTZ.\n</td></tr></table>\n",
  "input_spec": "Input one string of exactly 8 digits.",
  "output_spec": "Output the letters for the kinds of number found, in alphabetical order with no spaces. Output NONE if no number on the plate matches any of the five kinds.",
  "constraints": "The plate is exactly 8 characters, each a digit from 0 through 9.",
  "approach": "\n<p>Two halves that do not interact: build the list of candidate numbers, then run five\nindependent tests over it.</p>\n\n<p>Building the list is a double loop over the length, 2 through 4, and the starting index. Cut\nthe substring, convert it, and keep it only if it is at or above the smallest number of that\nlength. That single comparison is what discards runs with a leading zero, so you never have to\ninspect the first character. On the plate 07070707 the numbers 70 and 707 survive while 07 and\n070 do not.</p>\n\n<p>Now the five tests. Harshad is one modulo against the digit sum. Palindrome is a string\ncompared with its reverse. For square, take the integer square root and nudge it until r times r\nis at or above the value, then check equality, rather than trusting a floating point square root\nat values near 9999.</p>\n\n<p>Triangular has the same shape. Either walk k upward accumulating k times k plus 1 over 2 until\nyou reach or pass the value, or invert the formula the same careful way. Both are fine at this\nsize and the loop is harder to get wrong.</p>\n\n<p>The emirp test is the only one with a trap. It needs three things at once: the number is\nprime, the reversal is prime, and the reversal is different from the original. Drop the third\ncondition and every palindromic prime such as 101 or 727 counts, which quietly adds a Z to\nseveral plates. Trial division up to the square root is plenty fast for numbers under 10000.</p>\n\n<p>Collect the letters in a set so a kind that turns up four times is still reported once, then\nsort and join. If the set is empty, the answer is NONE and not an empty string.</p>\n",
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
   "python": "import sys\n\ndef classifyPlate(plate: str) -> str:\n    # Write your solution here. You may add helper functions above this one.\n    return \"\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        plate = _lines[_i + 0].strip()\n        print(classifyPlate(plate))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static String classifyPlate(String plate) {\n        // Write your solution here. You may add helper methods above this one.\n        return \"\";\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String plate = _lines.get(_i + 0);\n            _sb.append(classifyPlate(plate)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nstring classifyPlate(string plate) {\n    // Write your solution here. You may add helper functions above this one.\n    return \"\";\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string plate = _lines[_i + 0];\n        cout << classifyPlate(plate) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\n\ndef is_prime(n):\n    if n < 2:\n        return False\n    if n % 2 == 0:\n        return n == 2\n    d = 3\n    while d * d <= n:\n        if n % d == 0:\n            return False\n        d += 2\n    return True\n\ndef classifyPlate(plate: str) -> str:\n\n    nums = []\n    seen = set()\n    for length in (2, 3, 4):\n        low = 10 ** (length - 1)\n        for i in range(len(plate) - length + 1):\n            v = int(plate[i:i + length])\n            if v >= low and v not in seen:\n                seen.add(v)\n                nums.append(v)\n    found = set()\n    for v in nums:\n        s = str(v)\n        if v % sum(int(c) for c in s) == 0:\n            found.add(\"H\")\n        if s == s[::-1]:\n            found.add(\"P\")\n        r = int(v ** 0.5)\n        while r * r < v:\n            r += 1\n        if r * r == v:\n            found.add(\"S\")\n        k = 1\n        while k * (k + 1) // 2 < v:\n            k += 1\n        if k * (k + 1) // 2 == v:\n            found.add(\"T\")\n        rev = int(s[::-1])\n        if rev != v and is_prime(v) and is_prime(rev):\n            found.add(\"Z\")\n    return \"\".join(sorted(found)) if found else \"NONE\"\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        plate = _lines[_i + 0].strip()\n        print(classifyPlate(plate))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n\n    static boolean isPrime(int n) {\n        if (n < 2) return false;\n        if (n % 2 == 0) return n == 2;\n        for (int d = 3; d * d <= n; d += 2) if (n % d == 0) return false;\n        return true;\n    }\n\n    static String classifyPlate(String plate) {\n\n        List<Integer> nums = new ArrayList<>();\n        Set<Integer> seen = new HashSet<>();\n        for (int length = 2; length <= 4; length++) {\n            int low = (int) Math.pow(10, length - 1);\n            for (int i = 0; i + length <= plate.length(); i++) {\n                int v = Integer.parseInt(plate.substring(i, i + length));\n                if (v >= low && seen.add(v)) nums.add(v);\n            }\n        }\n        TreeSet<String> found = new TreeSet<>();\n        for (int v : nums) {\n            String s = String.valueOf(v);\n            int ds = 0;\n            for (char c : s.toCharArray()) ds += c - '0';\n            if (v % ds == 0) found.add(\"H\");\n            if (s.equals(new StringBuilder(s).reverse().toString())) found.add(\"P\");\n            int r = (int) Math.sqrt((double) v);\n            while (r * r < v) r++;\n            if (r * r == v) found.add(\"S\");\n            int k = 1;\n            while (k * (k + 1) / 2 < v) k++;\n            if (k * (k + 1) / 2 == v) found.add(\"T\");\n            int rev = Integer.parseInt(new StringBuilder(s).reverse().toString());\n            if (rev != v && isPrime(v) && isPrime(rev)) found.add(\"Z\");\n        }\n        if (found.isEmpty()) return \"NONE\";\n        return String.join(\"\", found);\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String plate = _lines.get(_i + 0);\n            _sb.append(classifyPlate(plate)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n\nstatic bool isPrime(int n) {\n    if (n < 2) return false;\n    if (n % 2 == 0) return n == 2;\n    for (int d = 3; d * d <= n; d += 2) if (n % d == 0) return false;\n    return true;\n}\n\nstring classifyPlate(string plate) {\n\n    vector<int> nums;\n    set<int> seen;\n    for (int length = 2; length <= 4; length++) {\n        int low = 1;\n        for (int e = 1; e < length; e++) low *= 10;\n        for (size_t i = 0; i + length <= plate.size(); i++) {\n            int v = stoi(plate.substr(i, length));\n            if (v >= low && !seen.count(v)) { seen.insert(v); nums.push_back(v); }\n        }\n    }\n    set<string> found;\n    for (int v : nums) {\n        string s = to_string(v), t = s;\n        reverse(t.begin(), t.end());\n        int ds = 0;\n        for (char c : s) ds += c - '0';\n        if (v % ds == 0) found.insert(\"H\");\n        if (s == t) found.insert(\"P\");\n        int r = (int) sqrt((double) v);\n        while (r * r < v) r++;\n        if (r * r == v) found.insert(\"S\");\n        int k = 1;\n        while (k * (k + 1) / 2 < v) k++;\n        if (k * (k + 1) / 2 == v) found.insert(\"T\");\n        int rev = stoi(t);\n        if (rev != v && isPrime(v) && isPrime(rev)) found.insert(\"Z\");\n    }\n    if (found.empty()) return \"NONE\";\n    string out;\n    for (const string &f : found) out += f;\n    return out;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string plate = _lines[_i + 0];\n        cout << classifyPlate(plate) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "knight-moves",
  "division": "Senior",
  "contest": 3,
  "title": "KNIGHT MOVES",
  "blurb": "Fewest knight hops between two squares of a chessboard.",
  "statement": "\n<p>A knight on a chessboard moves in an L: two squares along one direction and then one square at\na right angle to it. From the middle of the board it has eight possible destinations, and from a\ncorner only two.</p>\n\n<p>Squares are named the usual way. The file is a letter from a through h counting from the left,\nand the rank is a digit from 1 through 8 counting from the bottom, so a1 is the bottom left corner\nand h8 is the top right.</p>\n\n<p>Given a starting square and a target square, find the fewest moves a knight needs to get from\none to the other. The board is empty, so nothing blocks the way.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>a1<br>h8</td></tr>\n<tr><th>Output</th><td>6</td></tr>\n<tr><th>Explanation</th><td>\nOne shortest route is a1, b3, c5, d7, e5, f7, h8.<br>\nThat is six moves, and no route of five exists. A knight alternates square colour on every move,\nand a1 and h8 are the same colour, so any route between them takes an even number of moves. Four\nis not enough to cross the whole board, which leaves six.\n</td></tr></table>\n",
  "input_spec": "Input the starting square on the first line and the target square on the second line, each as a file letter from a to h followed by a rank digit from 1 to 8.",
  "output_spec": "Output an integer, the fewest knight moves from the start to the target. Output 0 if they are the same square.",
  "constraints": "Both squares are valid squares on a standard 8 by 8 board.",
  "approach": "\n<p>This is a shortest path on an unweighted graph, so it is a breadth first search and nothing\ncleverer. Trying to compute the answer from the coordinate difference with a formula is possible\nbut the corner cases near the edges of the board are brutal, and a1 to b2 is the one that breaks\nevery naive formula: the squares are touching and the answer is 4.</p>\n\n<p>Set up a 64 square board, mark the start with a distance of 0, and push it onto a queue. Pop a\nsquare, generate its eight knight destinations, and for each one that is on the board and not yet\nvisited, record a distance one greater and push it. Stop when you pop the target. The board is\ntiny, so the whole search visits at most 64 squares.</p>\n\n<p>Store the eight moves as two parallel arrays of offsets, plus and minus 1 paired with plus and\nminus 2 in both orders. Writing them out longhand is where a typo hides, so generate or\ndouble check them.</p>\n\n<p>Converting a square name to coordinates is subtraction. The file is the letter minus the\nletter a, giving 0 through 7, and the rank is the digit minus the character zero, minus one more\nso that rank 1 becomes row 0.</p>\n\n<p>Two answers are worth checking by hand because they surprise people. The same square is 0\nmoves, not 1. And a1 to b2, a single diagonal step, takes 4 moves, because the knight has to\nleave the corner region and come back.</p>\n",
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
   "python": "import sys\n\ndef minMoves(start: str, target: str) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = _lines[_i + 0].strip()\n        target = _lines[_i + 1].strip()\n        print(minMoves(start, target))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int minMoves(String start, String target) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String start = _lines.get(_i + 0);\n            String target = _lines.get(_i + 1);\n            _sb.append(minMoves(start, target)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint minMoves(string start, string target) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string start = _lines[_i + 0];\n        string target = _lines[_i + 1];\n        cout << minMoves(start, target) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef minMoves(start: str, target: str) -> int:\n\n    def sq(s):\n        return (ord(s[0]) - 97, int(s[1]) - 1)\n\n    sx, sy = sq(start)\n    tx, ty = sq(target)\n    dist = [[-1] * 8 for _ in range(8)]\n    dist[sx][sy] = 0\n    queue = [(sx, sy)]\n    dx = [1, 1, -1, -1, 2, 2, -2, -2]\n    dy = [2, -2, 2, -2, 1, -1, 1, -1]\n    head = 0\n    while head < len(queue):\n        x, y = queue[head]\n        head += 1\n        if x == tx and y == ty:\n            return dist[x][y]\n        for i in range(8):\n            nx, ny = x + dx[i], y + dy[i]\n            if 0 <= nx < 8 and 0 <= ny < 8 and dist[nx][ny] < 0:\n                dist[nx][ny] = dist[x][y] + 1\n                queue.append((nx, ny))\n    return dist[tx][ty]\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 2\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        start = _lines[_i + 0].strip()\n        target = _lines[_i + 1].strip()\n        print(minMoves(start, target))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int minMoves(String start, String target) {\n\n        int sx = start.charAt(0) - 'a', sy = start.charAt(1) - '1';\n        int tx = target.charAt(0) - 'a', ty = target.charAt(1) - '1';\n        int[][] dist = new int[8][8];\n        for (int[] row : dist) Arrays.fill(row, -1);\n        dist[sx][sy] = 0;\n        int[] dx = {1, 1, -1, -1, 2, 2, -2, -2};\n        int[] dy = {2, -2, 2, -2, 1, -1, 1, -1};\n        Deque<int[]> queue = new ArrayDeque<>();\n        queue.add(new int[]{sx, sy});\n        while (!queue.isEmpty()) {\n            int[] cur = queue.poll();\n            int x = cur[0], y = cur[1];\n            if (x == tx && y == ty) return dist[x][y];\n            for (int i = 0; i < 8; i++) {\n                int nx = x + dx[i], ny = y + dy[i];\n                if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && dist[nx][ny] < 0) {\n                    dist[nx][ny] = dist[x][y] + 1;\n                    queue.add(new int[]{nx, ny});\n                }\n            }\n        }\n        return dist[tx][ty];\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 2;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            String start = _lines.get(_i + 0);\n            String target = _lines.get(_i + 1);\n            _sb.append(minMoves(start, target)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint minMoves(string start, string target) {\n\n    int sx = start[0] - 'a', sy = start[1] - '1';\n    int tx = target[0] - 'a', ty = target[1] - '1';\n    vector<vector<int>> dist(8, vector<int>(8, -1));\n    dist[sx][sy] = 0;\n    int dx[] = {1, 1, -1, -1, 2, 2, -2, -2};\n    int dy[] = {2, -2, 2, -2, 1, -1, 1, -1};\n    deque<pair<int,int>> q;\n    q.push_back({sx, sy});\n    while (!q.empty()) {\n        auto cur = q.front();\n        q.pop_front();\n        int x = cur.first, y = cur.second;\n        if (x == tx && y == ty) return dist[x][y];\n        for (int i = 0; i < 8; i++) {\n            int nx = x + dx[i], ny = y + dy[i];\n            if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && dist[nx][ny] < 0) {\n                dist[nx][ny] = dist[x][y] + 1;\n                q.push_back({nx, ny});\n            }\n        }\n    }\n    return dist[tx][ty];\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 2;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        string start = _lines[_i + 0];\n        string target = _lines[_i + 1];\n        cout << minMoves(start, target) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 },
 {
  "id": "shuffle-cycles",
  "division": "Senior",
  "contest": 4,
  "title": "SHUFFLE CYCLES",
  "blurb": "Riffle a deck perfectly, over and over, until it comes back to where it started.",
  "statement": "\n<p>A perfect riffle shuffle of a deck with an even number of cards works like this. Cut the deck\nexactly in half, so the top half and the bottom half hold the same number of cards. Then rebuild\nthe deck by laying down the first card of the top half, then the first card of the bottom half,\nthen the second card of the top half, then the second card of the bottom half, and so on until\nboth halves are used up.</p>\n\n<p>The card that started on top is still on top afterwards, so the deck is scrambled but not\ncompletely. Shuffle again, and again, and eventually every card is back exactly where it began.</p>\n\n<p>Given the number of cards in the deck, report how many perfect riffle shuffles it takes to\nreturn the deck to its original order.</p>\n",
  "example": "\n<table class=\"ex\"><tr><th>Input</th><td>8</td></tr>\n<tr><th>Output</th><td>3</td></tr>\n<tr><th>Explanation</th><td>\nNumber the cards 1 through 8 from the top.<br>\nStart: 1 2 3 4 5 6 7 8. The halves are 1 2 3 4 and 5 6 7 8.<br>\nAfter shuffle 1: 1 5 2 6 3 7 4 8.<br>\nAfter shuffle 2: 1 3 5 7 2 4 6 8.<br>\nAfter shuffle 3: 1 2 3 4 5 6 7 8, which is the original order.<br>\nThree shuffles, so output 3.\n</td></tr></table>\n",
  "input_spec": "Input a single even integer, the number of cards in the deck.",
  "output_spec": "Output an integer, the number of perfect riffle shuffles needed to restore the original order.",
  "constraints": "The deck holds between 2 and 2000 cards and the count is always even.",
  "approach": "\n<p>Simulating is the honest first answer and it is fast enough here. Build an array holding 0\nthrough n minus 1, shuffle it, and compare with the original. Repeat, counting, until they match.\nEach shuffle is one pass over n cards, and the number of shuffles never gets large, so even a\n2000 card deck finishes instantly.</p>\n\n<p>Building the shuffled deck is easier with a second array than in place. Walk i from 0 to\nhalf minus 1 and write the card at position i into slot 2i, then the card at position half plus i\ninto slot 2i plus 1. Then copy back, or swap the two arrays.</p>\n\n<p>If you would rather not simulate, there is a tidy fact behind the problem. Under this shuffle\nthe card at position p, counting from 0, moves to position 2p modulo n minus 1, with the last card\nstaying put. So the deck returns to its original order after the smallest k for which 2 to the k\nis congruent to 1 modulo n minus 1. For 52 cards that is the order of 2 modulo 51, which is 8.\nComputing it is a short loop that doubles a running value modulo n minus 1 until it hits 1.</p>\n\n<p>Either way, check the two smallest decks by hand. A deck of 2 cards is unchanged by the\nshuffle, so the answer is 1 and not 0, since the definition asks how many shuffles it takes to be\nback in order and doing one shuffle achieves that.</p>\n",
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
   "python": "import sys\n\ndef shuffleCount(n: int) -> int:\n    # Write your solution here. You may add helper functions above this one.\n    return 0\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        print(shuffleCount(n))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int shuffleCount(int n) {\n        // Write your solution here. You may add helper methods above this one.\n        return 0;\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(shuffleCount(n)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint shuffleCount(int n) {\n    // Write your solution here. You may add helper functions above this one.\n    return 0;\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        cout << shuffleCount(n) << \"\\n\";\n    }\n    return 0;\n}\n"
  },
  "solution": {
   "python": "import sys\n\ndef shuffleCount(n: int) -> int:\n\n    deck = list(range(n))\n    original = list(range(n))\n    half = n // 2\n    count = 0\n    while True:\n        nxt = [0] * n\n        for i in range(half):\n            nxt[2 * i] = deck[i]\n            nxt[2 * i + 1] = deck[half + i]\n        deck = nxt\n        count += 1\n        if deck == original:\n            return count\n\n\n# ----- driver code: leave this alone -----\ndef _driver():\n    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]\n    _lines = [ln for ln in _lines if ln.strip() != '']\n    _k = 1\n    for _i in range(0, len(_lines) - _k + 1, _k):\n        n = int(_lines[_i + 0].strip())\n        print(shuffleCount(n))\n\n\n_driver()\n",
   "java": "import java.util.*;\n\npublic class Solution {\n\n    static int shuffleCount(int n) {\n\n        int[] deck = new int[n], original = new int[n], nxt = new int[n];\n        for (int i = 0; i < n; i++) { deck[i] = i; original[i] = i; }\n        int half = n / 2, count = 0;\n        while (true) {\n            for (int i = 0; i < half; i++) {\n                nxt[2 * i] = deck[i];\n                nxt[2 * i + 1] = deck[half + i];\n            }\n            int[] swap = deck; deck = nxt; nxt = swap;\n            count++;\n            if (Arrays.equals(deck, original)) return count;\n        }\n    }\n\n    // ----- driver code: leave this alone -----\n    public static void main(String[] args) throws Exception {\n        Scanner _sc = new Scanner(System.in);\n        List<String> _lines = new ArrayList<>();\n        while (_sc.hasNextLine()) {\n            String _ln = _sc.nextLine();\n            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());\n        }\n        StringBuilder _sb = new StringBuilder();\n        int _k = 1;\n        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {\n            int n = Integer.parseInt((_lines.get(_i + 0)).trim());\n            _sb.append(shuffleCount(n)).append('\\n');\n        }\n        System.out.print(_sb);\n    }\n}\n",
   "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint shuffleCount(int n) {\n\n    vector<int> deck(n), original(n), nxt(n);\n    for (int i = 0; i < n; i++) { deck[i] = i; original[i] = i; }\n    int half = n / 2, count = 0;\n    while (true) {\n        for (int i = 0; i < half; i++) {\n            nxt[2 * i] = deck[i];\n            nxt[2 * i + 1] = deck[half + i];\n        }\n        deck.swap(nxt);\n        count++;\n        if (deck == original) return count;\n    }\n}\n\n// ----- driver code: leave this alone -----\nint main() {\n    vector<string> _lines;\n    string _ln;\n    while (getline(cin, _ln)) {\n        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();\n        if (!_ln.empty()) _lines.push_back(_ln);\n    }\n    size_t _k = 1;\n    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {\n        int n = stoi(_lines[_i + 0]);\n        cout << shuffleCount(n) << \"\\n\";\n    }\n    return 0;\n}\n"
  }
 }
];
