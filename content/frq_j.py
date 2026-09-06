# -*- coding: utf-8 -*-
"""ACSL style programming problems, Senior contests 3 and 4."""

PROBLEMS = [

# ---------------------------------------------------------------- Senior 7
dict(
    id="bst-traversal",
    fname="treeWalk",
    division="Senior",
    contest=3,
    title="Tree Walk",
    blurb="Build a binary search tree by ACSL's rules and read it back in any of three orders.",
    statement="""
<p>Build a binary search tree from a list of operations applied in order to an initially empty
tree. An operation is a plus sign followed by a value, meaning insert it, or a minus sign followed by a
value, meaning delete it.</p>

<p>Insertion follows ACSL's rule that a value equal to the node it is compared against goes left, so
duplicates are kept rather than dropped. Deletion follows ACSL's rule as well: a node with no children
simply goes, a node with one child is replaced by that child, and a node with two children is replaced
by its left child, with the original right subtree attached at the rightmost node of that promoted
subtree. Deleting a value that is not present changes nothing.</p>

<p>Report the requested traversal of the finished tree, or EMPTY if nothing is left in it.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>+50 +30 +70 +20 +40 +60 +80<br>PRE</td></tr>
<tr><th>Output</th><td>50 30 20 40 70 60 80</td></tr>
<tr><th>Explanation</th><td>
The insertions build a balanced tree with 50 at the root.<br>
Preorder writes the root, then the whole left subtree, then the whole right subtree.<br>
That gives 50, then 30 20 40, then 70 60 80.
</td></tr></table>
""",
    input_spec="Input the operations on the first line, separated by single spaces. Input the "
               "traversal name on the second line: PRE, IN, or POST.",
    output_spec="Output the values in the requested order, separated by single spaces, or the "
                "word EMPTY if the tree holds nothing.",
    constraints="There are between 1 and 200 operations. Every value is between 1 and 9999, "
                "inclusive.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>ops</code>, the operations in order, and a
string, <code>order</code>, one of PRE, IN, or POST.</li>
<li>The function returns a string, the traversal or the word EMPTY.</li>
</ul>
""",
    params=[("ops", "str"), ("order", "str")],
    ret="str",
    samples=[["+50 +30 +70 +20 +40 +60 +80", "PRE"], ["+5 -5", "IN"], ["+5 +5 +5", "POST"]],
    tests=[["+50 +30 +70 +20 +40 +60 +80", "PRE"], ["+5 -5", "IN"], ["+5 +5 +5", "POST"],
           ["+50 +30 +70 +20 +40 +60 +80", "IN"], ["+50 +30 +70 +20 +40 +60 +80", "POST"],
           ["+8 +3 +10 +1 +6 +14 +4 +7 +13 -3", "PRE"],
           ["+10 +5 +15 +3 +7 -10", "PRE"], ["+1 +2 +3 +4 +5", "POST"],
           ["+65 +77 +69 +82 +73 +67 +65 +78", "IN"], ["+50 +30 +70 -70", "PRE"],
           ["+9", "IN"], ["+3 +1 +2 -1", "POST"]],
    approach="""
<p>Hold the tree in three parallel arrays, one for the values and one for each child, with -1
standing in for a missing child. A node is an index into those arrays, and the root is an index of its
own. That avoids pointers in C++ and object allocation in Java, and it makes the whole thing easy to
print while debugging.</p>

<p>Insertion walks down from the root comparing values, going left when the new value is less than or
equal to the node and right otherwise, until it finds a missing child to fill. That single comparison
is where ACSL parts company with most textbooks, which send equal values right or refuse them, and it
is what makes the third sample a chain of three nodes rather than one.</p>

<p>Deletion needs the node and its parent, so track both as you search, along with which side of the
parent you came down. Once found, work out the replacement: the right child if there is no left, the
left child if there is no right, and otherwise the left child with the whole right subtree hung on its
rightmost descendant. Then attach the replacement to the parent, or make it the new root if the deleted
node was the root.</p>

<p>All three traversals can be written with an explicit stack rather than recursively. Preorder pushes
the root, then repeatedly pops a node, writes it, and pushes its right child before its left. Inorder
runs left as far as it can while pushing, then pops, writes, and moves right. Postorder is the neat one:
run the preorder loop but push left before right, collect the nodes in a second list, and read that list
backwards.</p>
""",
    sol=dict(
        python="""
val, left, right = [], [], []
root = -1
for op in ops.split():
    v = int(op[1:])
    if op[0] == "+":
        val.append(v)
        left.append(-1)
        right.append(-1)
        node = len(val) - 1
        if root == -1:
            root = node
        else:
            cur = root
            while True:
                if v <= val[cur]:
                    if left[cur] == -1:
                        left[cur] = node
                        break
                    cur = left[cur]
                else:
                    if right[cur] == -1:
                        right[cur] = node
                        break
                    cur = right[cur]
    else:
        parent, cur, isLeft = -1, root, False
        while cur != -1 and val[cur] != v:
            parent = cur
            if v < val[cur]:
                cur = left[cur]
                isLeft = True
            else:
                cur = right[cur]
                isLeft = False
        if cur != -1:
            l, r = left[cur], right[cur]
            if l == -1:
                repl = r
            elif r == -1:
                repl = l
            else:
                m = l
                while right[m] != -1:
                    m = right[m]
                right[m] = r
                repl = l
            if parent == -1:
                root = repl
            elif isLeft:
                left[parent] = repl
            else:
                right[parent] = repl

out = []
if order == "PRE":
    stack = [root]
    while stack:
        n = stack.pop()
        if n == -1:
            continue
        out.append(val[n])
        stack.append(right[n])
        stack.append(left[n])
elif order == "IN":
    stack, cur = [], root
    while stack or cur != -1:
        while cur != -1:
            stack.append(cur)
            cur = left[cur]
        cur = stack.pop()
        out.append(val[cur])
        cur = right[cur]
else:
    stack, seen = [root], []
    while stack:
        n = stack.pop()
        if n == -1:
            continue
        seen.append(n)
        stack.append(left[n])
        stack.append(right[n])
    out = [val[n] for n in reversed(seen)]

if not out:
    return "EMPTY"
return " ".join(str(x) for x in out)
""",
        java="""
int cap = 256;
int[] val = new int[cap], left = new int[cap], right = new int[cap];
int used = 0, root = -1;
for (String op : ops.trim().split("\\\\s+")) {
    int v = Integer.parseInt(op.substring(1));
    if (op.charAt(0) == '+') {
        val[used] = v; left[used] = -1; right[used] = -1;
        int node = used++;
        if (root == -1) root = node;
        else {
            int cur = root;
            while (true) {
                if (v <= val[cur]) {
                    if (left[cur] == -1) { left[cur] = node; break; }
                    cur = left[cur];
                } else {
                    if (right[cur] == -1) { right[cur] = node; break; }
                    cur = right[cur];
                }
            }
        }
    } else {
        int parent = -1, cur = root;
        boolean isLeft = false;
        while (cur != -1 && val[cur] != v) {
            parent = cur;
            if (v < val[cur]) { cur = left[cur]; isLeft = true; }
            else { cur = right[cur]; isLeft = false; }
        }
        if (cur != -1) {
            int l = left[cur], r = right[cur], repl;
            if (l == -1) repl = r;
            else if (r == -1) repl = l;
            else {
                int m = l;
                while (right[m] != -1) m = right[m];
                right[m] = r;
                repl = l;
            }
            if (parent == -1) root = repl;
            else if (isLeft) left[parent] = repl;
            else right[parent] = repl;
        }
    }
}
List<Integer> out = new ArrayList<>();
Deque<Integer> stack = new ArrayDeque<>();
if (order.equals("PRE")) {
    stack.push(root);
    while (!stack.isEmpty()) {
        int n = stack.pop();
        if (n == -1) continue;
        out.add(val[n]);
        stack.push(right[n]);
        stack.push(left[n]);
    }
} else if (order.equals("IN")) {
    int cur = root;
    while (!stack.isEmpty() || cur != -1) {
        while (cur != -1) { stack.push(cur); cur = left[cur]; }
        cur = stack.pop();
        out.add(val[cur]);
        cur = right[cur];
    }
} else {
    List<Integer> seen = new ArrayList<>();
    stack.push(root);
    while (!stack.isEmpty()) {
        int n = stack.pop();
        if (n == -1) continue;
        seen.add(n);
        stack.push(left[n]);
        stack.push(right[n]);
    }
    for (int i = seen.size() - 1; i >= 0; i--) out.add(val[seen.get(i)]);
}
if (out.isEmpty()) return "EMPTY";
StringBuilder sb = new StringBuilder();
for (int i = 0; i < out.size(); i++) {
    if (i > 0) sb.append(' ');
    sb.append(out.get(i));
}
return sb.toString();
""",
        cpp="""
vector<int> val, left, right;
int root = -1;
string op;
istringstream is(ops);
while (is >> op) {
    int v = stoi(op.substr(1));
    if (op[0] == '+') {
        val.push_back(v); left.push_back(-1); right.push_back(-1);
        int node = (int) val.size() - 1;
        if (root == -1) root = node;
        else {
            int cur = root;
            while (true) {
                if (v <= val[cur]) {
                    if (left[cur] == -1) { left[cur] = node; break; }
                    cur = left[cur];
                } else {
                    if (right[cur] == -1) { right[cur] = node; break; }
                    cur = right[cur];
                }
            }
        }
    } else {
        int parent = -1, cur = root;
        bool isLeft = false;
        while (cur != -1 && val[cur] != v) {
            parent = cur;
            if (v < val[cur]) { cur = left[cur]; isLeft = true; }
            else { cur = right[cur]; isLeft = false; }
        }
        if (cur != -1) {
            int l = left[cur], r = right[cur], repl;
            if (l == -1) repl = r;
            else if (r == -1) repl = l;
            else {
                int m = l;
                while (right[m] != -1) m = right[m];
                right[m] = r;
                repl = l;
            }
            if (parent == -1) root = repl;
            else if (isLeft) left[parent] = repl;
            else right[parent] = repl;
        }
    }
}
vector<int> out, stack;
if (order == "PRE") {
    stack.push_back(root);
    while (!stack.empty()) {
        int n = stack.back(); stack.pop_back();
        if (n == -1) continue;
        out.push_back(val[n]);
        stack.push_back(right[n]);
        stack.push_back(left[n]);
    }
} else if (order == "IN") {
    int cur = root;
    while (!stack.empty() || cur != -1) {
        while (cur != -1) { stack.push_back(cur); cur = left[cur]; }
        cur = stack.back(); stack.pop_back();
        out.push_back(val[cur]);
        cur = right[cur];
    }
} else {
    vector<int> seen;
    stack.push_back(root);
    while (!stack.empty()) {
        int n = stack.back(); stack.pop_back();
        if (n == -1) continue;
        seen.push_back(n);
        stack.push_back(left[n]);
        stack.push_back(right[n]);
    }
    for (int i = (int) seen.size() - 1; i >= 0; i--) out.push_back(val[seen[i]]);
}
if (out.empty()) return "EMPTY";
string res;
for (size_t i = 0; i < out.size(); i++) {
    if (i > 0) res += ' ';
    res += to_string(out[i]);
}
return res;
""",
    ),
),

# ---------------------------------------------------------------- Senior 8
dict(
    id="expression-height",
    fname="treeHeight",
    division="Senior",
    contest=3,
    title="Expression Height",
    blurb="Work out how deep the tree behind an infix expression would be.",
    statement="""
<p>Every infix expression has a tree behind it, with an operator at each internal node and a single
letter at each leaf. The height of that tree is the number of edges on its longest path from the root
down to a leaf, so a lone letter has height 0.</p>

<p>Report the height of the tree for a given expression. The operators are + &minus; * /, with the
usual precedence and left to right grouping, and brackets may appear anywhere.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>A+B*C</td></tr>
<tr><th>Output</th><td>2</td></tr>
<tr><th>Explanation</th><td>
Multiplication binds tighter, so the expression is A + (B * C).<br>
The root is the plus, with A on its left and the star on its right.<br>
The path from the plus down through the star to B has two edges.
</td></tr></table>
""",
    input_spec="Input one line holding the expression, with no spaces.",
    output_spec="Output an integer, the height of the expression tree.",
    constraints="The expression holds between 1 and 120 characters. Operands are single capital "
                "letters, operators are + - * /, and the brackets are balanced.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>expression</code>, the infix expression.</li>
<li>The function returns an integer, the height of its tree.</li>
</ul>
""",
    params=[("expression", "str")],
    ret="int",
    samples=["A+B*C", "A", "A+B+C+D"],
    tests=["A+B*C", "A", "A+B+C+D",
           "(A+B)*C", "A*B+C*D", "((A))",
           "(A+B)*(C+D)", "A/B/C", "A+(B*(C-D))",
           "A+B", "((A+B)*(C+D))/((E-F)*(G+H))", "A*B*C*D*E*F"],
    approach="""
<p>Do not build the tree. Convert the expression to postfix and then read the height straight off
it, which takes two short passes and no pointers at all.</p>

<p>The first pass is the shunting yard algorithm. Letters go straight to the output. An opening bracket
is pushed. A closing bracket pops operators to the output until the matching opening bracket appears,
which is then discarded. An operator pops any operator of greater or equal precedence off the stack
first, since all four of these group to the left, and is then pushed. At the end, everything left on
the stack is popped to the output.</p>

<p>The second pass walks the postfix with a stack of heights rather than of values. A letter pushes 0,
because a leaf has height 0. An operator pops two heights and pushes one more than the larger of them,
because the new root sits one edge above whichever subtree is deeper. When the walk finishes, the single
value left is the answer.</p>

<p>Precedence is the only place this can go quietly wrong. Popping on greater or equal is what makes
A+B+C+D a leaning chain of height 3; popping only on strictly greater would group it to the right and
give the same number here but a different one for a mixture of precedences. Redundant brackets, as in
the sixth test, disappear during the conversion and never affect the height.</p>
""",
    sol=dict(
        python="""
prec = {"+": 1, "-": 1, "*": 2, "/": 2}
output = []
ops = []
for ch in expression:
    if ch.isalpha():
        output.append(ch)
    elif ch == "(":
        ops.append(ch)
    elif ch == ")":
        while ops and ops[-1] != "(":
            output.append(ops.pop())
        ops.pop()
    else:
        while ops and ops[-1] != "(" and prec[ops[-1]] >= prec[ch]:
            output.append(ops.pop())
        ops.append(ch)
while ops:
    output.append(ops.pop())

heights = []
for token in output:
    if token.isalpha():
        heights.append(0)
    else:
        b = heights.pop()
        a = heights.pop()
        heights.append(1 + (a if a > b else b))
return heights[0]
""",
        java="""
StringBuilder output = new StringBuilder();
Deque<Character> ops = new ArrayDeque<>();
for (char ch : expression.toCharArray()) {
    if (Character.isLetter(ch)) output.append(ch);
    else if (ch == '(') ops.push(ch);
    else if (ch == ')') {
        while (!ops.isEmpty() && ops.peek() != '(') output.append(ops.pop());
        ops.pop();
    } else {
        while (!ops.isEmpty() && ops.peek() != '(' && prec(ops.peek()) >= prec(ch)) {
            output.append(ops.pop());
        }
        ops.push(ch);
    }
}
while (!ops.isEmpty()) output.append(ops.pop());

Deque<Integer> heights = new ArrayDeque<>();
for (char token : output.toString().toCharArray()) {
    if (Character.isLetter(token)) heights.push(0);
    else {
        int b = heights.pop(), a = heights.pop();
        heights.push(1 + Math.max(a, b));
    }
}
return heights.pop();
""",
        java_helpers="""
static int prec(char c) {
    return (c == '*' || c == '/') ? 2 : 1;
}
""",
        cpp="""
string output;
vector<char> ops;
for (char ch : expression) {
    if (isalpha((unsigned char) ch)) output += ch;
    else if (ch == '(') ops.push_back(ch);
    else if (ch == ')') {
        while (!ops.empty() && ops.back() != '(') { output += ops.back(); ops.pop_back(); }
        ops.pop_back();
    } else {
        while (!ops.empty() && ops.back() != '(' && prec(ops.back()) >= prec(ch)) {
            output += ops.back();
            ops.pop_back();
        }
        ops.push_back(ch);
    }
}
while (!ops.empty()) { output += ops.back(); ops.pop_back(); }

vector<int> heights;
for (char token : output) {
    if (isalpha((unsigned char) token)) heights.push_back(0);
    else {
        int b = heights.back(); heights.pop_back();
        int a = heights.back(); heights.pop_back();
        heights.push_back(1 + max(a, b));
    }
}
return heights[0];
""",
        cpp_helpers="""
int prec(char c) {
    return (c == '*' || c == '/') ? 2 : 1;
}
""",
    ),
),

# ---------------------------------------------------------------- Senior 9
dict(
    id="priority-desk",
    fname="serveOrder",
    division="Senior",
    contest=3,
    title="Priority Desk",
    blurb="Run a help desk where the most urgent ticket wins and arrival order breaks the ties.",
    statement="""
<p>A help desk processes a list of commands in order. ADD:name:priority puts a person in the
waiting room with that priority, where a smaller number means more urgent. NEXT calls whoever is
waiting with the smallest priority, removing them from the room.</p>

<p>If two people share the smallest priority, the one who arrived earlier is called first. A NEXT
issued when the room is empty writes a single hyphen instead of a name.</p>

<p>Report the names written by the NEXT commands, in order. If there are no NEXT commands at all,
report NONE.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>ADD:ann:3 ADD:bob:1 NEXT NEXT</td></tr>
<tr><th>Output</th><td>bob ann</td></tr>
<tr><th>Explanation</th><td>
ann waits with priority 3 and bob waits with priority 1.<br>
The first NEXT calls bob, whose priority is smaller.<br>
The second NEXT calls ann, who is now the only one left.
</td></tr></table>
""",
    input_spec="Input one line holding the commands in order, separated by single spaces.",
    output_spec="Output the names called, separated by single spaces, using a hyphen for a NEXT "
                "that found nobody waiting, or NONE if there were no NEXT commands.",
    constraints="There are between 1 and 100 commands. Names hold between 1 and 12 lowercase "
                "letters and are not repeated. Priorities are between 1 and 999.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>commands</code>, the commands in order.</li>
<li>The function returns a string, the names called or the word NONE.</li>
</ul>
""",
    params=[("commands", "str")],
    ret="str",
    samples=["ADD:ann:3 ADD:bob:1 NEXT NEXT", "NEXT", "ADD:a:1"],
    tests=["ADD:ann:3 ADD:bob:1 NEXT NEXT", "NEXT", "ADD:a:1",
           "ADD:x:5 ADD:y:5 NEXT NEXT NEXT", "ADD:p:9 NEXT ADD:q:1 NEXT",
           "ADD:a:3 ADD:b:2 ADD:c:1 NEXT NEXT NEXT",
           "NEXT NEXT", "ADD:solo:999 NEXT", "ADD:a:1 ADD:b:1 ADD:c:1 NEXT NEXT NEXT",
           "ADD:m:4 NEXT NEXT ADD:n:4 NEXT", "ADD:z:1 ADD:y:2 NEXT ADD:x:1 NEXT NEXT",
           "ADD:a:2 ADD:b:3 ADD:c:2 ADD:d:1 NEXT NEXT NEXT NEXT"],
    approach="""
<p>A list is enough. Real priority queues are faster, but with at most a hundred commands a linear
scan for the best waiting person costs nothing and is far easier to get right.</p>

<p>Store three things per person: the priority, the arrival number, and the name. The arrival number is
just a counter you increase on every ADD, and it is what makes ties resolvable. Without it there is no
way to tell which of two equally urgent people came first, since a list can be reordered by the removals
that happen between them.</p>

<p>On NEXT, scan the waiting list for the smallest priority, and among those for the smallest arrival
number. A single pass keeping the best index so far does both at once: replace the best when the
priority is smaller, or when the priority is equal and the arrival number is smaller. Then remove that
entry from the list.</p>

<p>Two things happen after the loop rather than during it. A NEXT on an empty room writes a hyphen and
carries on, so it must not be allowed to crash or to be silently skipped. And a run of commands with no
NEXT at all produces no output, which is the NONE case; check for it once at the end rather than trying
to detect it as you go.</p>
""",
    sol=dict(
        python="""
waiting = []
out = []
arrival = 0
for command in commands.split():
    if command == "NEXT":
        if not waiting:
            out.append("-")
        else:
            best = 0
            for i in range(1, len(waiting)):
                if (waiting[i][0] < waiting[best][0]
                        or (waiting[i][0] == waiting[best][0]
                            and waiting[i][1] < waiting[best][1])):
                    best = i
            out.append(waiting.pop(best)[2])
    else:
        parts = command.split(":")
        waiting.append((int(parts[2]), arrival, parts[1]))
        arrival += 1
if not out:
    return "NONE"
return " ".join(out)
""",
        java="""
List<int[]> keys = new ArrayList<>();
List<String> names = new ArrayList<>();
List<String> out = new ArrayList<>();
int arrival = 0;
for (String command : commands.trim().split("\\\\s+")) {
    if (command.equals("NEXT")) {
        if (keys.isEmpty()) out.add("-");
        else {
            int best = 0;
            for (int i = 1; i < keys.size(); i++) {
                if (keys.get(i)[0] < keys.get(best)[0]
                        || (keys.get(i)[0] == keys.get(best)[0]
                            && keys.get(i)[1] < keys.get(best)[1])) best = i;
            }
            out.add(names.get(best));
            keys.remove(best);
            names.remove(best);
        }
    } else {
        String[] parts = command.split(":");
        keys.add(new int[]{Integer.parseInt(parts[2]), arrival++});
        names.add(parts[1]);
    }
}
if (out.isEmpty()) return "NONE";
StringBuilder sb = new StringBuilder();
for (int i = 0; i < out.size(); i++) {
    if (i > 0) sb.append(' ');
    sb.append(out.get(i));
}
return sb.toString();
""",
        cpp="""
vector<int> pri, seq;
vector<string> names, out;
int arrival = 0;
string command;
istringstream is(commands);
while (is >> command) {
    if (command == "NEXT") {
        if (pri.empty()) out.push_back("-");
        else {
            size_t best = 0;
            for (size_t i = 1; i < pri.size(); i++) {
                if (pri[i] < pri[best] || (pri[i] == pri[best] && seq[i] < seq[best])) best = i;
            }
            out.push_back(names[best]);
            pri.erase(pri.begin() + best);
            seq.erase(seq.begin() + best);
            names.erase(names.begin() + best);
        }
    } else {
        size_t first = command.find(':');
        size_t second = command.find(':', first + 1);
        names.push_back(command.substr(first + 1, second - first - 1));
        pri.push_back(stoi(command.substr(second + 1)));
        seq.push_back(arrival++);
    }
}
if (out.empty()) return "NONE";
string res;
for (size_t i = 0; i < out.size(); i++) {
    if (i > 0) res += ' ';
    res += out[i];
}
return res;
""",
    ),
),

# ---------------------------------------------------------------- Senior 10
dict(
    id="shortest-hops",
    fname="shortest",
    division="Senior",
    contest=4,
    title="Shortest Hops",
    blurb="Find the fewest edges between two vertices of an undirected graph.",
    statement="""
<p>An undirected graph is given as a list of edges, each written as two vertex numbers joined by a
hyphen. Vertices are numbered from 1, and a vertex may appear in any number of edges.</p>

<p>Report the smallest number of edges on any route from one given vertex to another. A vertex
reaches itself in 0 edges. If no route exists at all, report &minus;1.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>1-2 2-3 3-4<br>1 4</td></tr>
<tr><th>Output</th><td>3</td></tr>
<tr><th>Explanation</th><td>
The graph is a chain running 1, 2, 3, 4.<br>
The only route from 1 to 4 uses all three edges.<br>
No shorter route exists, so the answer is 3.
</td></tr></table>
""",
    input_spec="Input the edges on the first line, separated by single spaces, each written as "
               "two vertex numbers joined by a hyphen. Input the two vertex numbers on the second "
               "line, separated by a single space.",
    output_spec="Output an integer, the fewest edges on a route between the two vertices, or -1 "
                "if there is none.",
    constraints="There are between 1 and 200 edges. Vertex numbers are between 1 and 100, "
                "inclusive. Both given vertices appear in at least one edge.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>edges</code>, the edge list, and a string,
<code>pair</code>, the two vertex numbers.</li>
<li>The function returns an integer, the fewest edges or -1.</li>
</ul>
""",
    params=[("edges", "str"), ("pair", "str")],
    ret="int",
    samples=[["1-2 2-3 3-4", "1 4"], ["1-2 3-4", "1 4"], ["1-2 1-3 2-4 3-4", "1 4"]],
    tests=[["1-2 2-3 3-4", "1 4"], ["1-2 3-4", "1 4"], ["1-2 1-3 2-4 3-4", "1 4"],
           ["1-2", "1 1"], ["1-2", "1 2"], ["1-2 2-3 3-4 4-5 5-1", "1 3"],
           ["1-2 2-1", "1 2"], ["1-2 2-3 3-1", "1 3"],
           ["1-2 2-3 3-4 4-5 5-6 6-7 7-8 8-9 9-10", "1 10"],
           ["1-100", "1 100"], ["1-2 3-4 5-6", "1 6"],
           ["1-2 1-3 1-4 1-5 2-6 3-6 4-6 5-6", "1 6"]],
    approach="""
<p>This is a breadth first search and nothing else. Depth first search finds a route but not
necessarily the shortest one, and there are no edge weights here to justify anything fancier.</p>

<p>Build an adjacency structure first. A list of neighbors for each vertex is the natural shape, and
since the graph is undirected each edge has to be recorded in both directions. Forgetting one of the
two is the single most common bug in this kind of problem, and it produces answers that are too large
or -1 rather than an error.</p>

<p>Then run the search from the starting vertex with a queue. Mark the start as being at distance 0,
and repeatedly take a vertex off the front, look at each unvisited neighbor, mark it one further out,
and put it on the back. Because the queue hands vertices back in the order they were reached, the first
time you touch the target you have touched it by a shortest route, so you can stop immediately.</p>

<p>Two cases need no search at all. A start equal to the target answers 0. A queue that empties without
ever reaching the target means the two vertices lie in different components, which is the -1 case. Note
that a duplicated edge and an edge joining a vertex to itself are both harmless as long as you check
whether a vertex has been visited before enqueueing it.</p>
""",
    sol=dict(
        python="""
adj = {}
for token in edges.split():
    a, b = token.split("-")
    a, b = int(a), int(b)
    adj.setdefault(a, []).append(b)
    adj.setdefault(b, []).append(a)

parts = pair.split()
start, target = int(parts[0]), int(parts[1])
if start == target:
    return 0

dist = {start: 0}
queue = [start]
head = 0
while head < len(queue):
    u = queue[head]
    head += 1
    for v in adj.get(u, []):
        if v not in dist:
            dist[v] = dist[u] + 1
            if v == target:
                return dist[v]
            queue.append(v)
return -1
""",
        java="""
List<List<Integer>> adj = new ArrayList<>();
for (int i = 0; i <= 100; i++) adj.add(new ArrayList<>());
for (String token : edges.trim().split("\\\\s+")) {
    String[] ends = token.split("-");
    int a = Integer.parseInt(ends[0]), b = Integer.parseInt(ends[1]);
    adj.get(a).add(b);
    adj.get(b).add(a);
}
String[] parts = pair.trim().split("\\\\s+");
int start = Integer.parseInt(parts[0]), target = Integer.parseInt(parts[1]);
if (start == target) return 0;

int[] dist = new int[101];
Arrays.fill(dist, -1);
dist[start] = 0;
Deque<Integer> queue = new ArrayDeque<>();
queue.add(start);
while (!queue.isEmpty()) {
    int u = queue.poll();
    for (int v : adj.get(u)) {
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            if (v == target) return dist[v];
            queue.add(v);
        }
    }
}
return -1;
""",
        cpp="""
vector<vector<int>> adj(101);
string token;
istringstream is(edges);
while (is >> token) {
    size_t dash = token.find('-');
    int a = stoi(token.substr(0, dash)), b = stoi(token.substr(dash + 1));
    adj[a].push_back(b);
    adj[b].push_back(a);
}
int start, target;
istringstream ps(pair);
ps >> start >> target;
if (start == target) return 0;

vector<int> dist(101, -1);
dist[start] = 0;
vector<int> queue;
queue.push_back(start);
size_t head = 0;
while (head < queue.size()) {
    int u = queue[head++];
    for (int v : adj[u]) {
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            if (v == target) return dist[v];
            queue.push_back(v);
        }
    }
}
return -1;
""",
    ),
),

# ---------------------------------------------------------------- Senior 11
dict(
    id="gate-network",
    fname="countHighs",
    division="Senior",
    contest=4,
    title="Gate Network",
    blurb="Wire up a small logic circuit from a netlist and count the inputs that drive it high.",
    statement="""
<p>A circuit is described one gate at a time. Each gate is written as its own name, an equals
sign, the kind of gate, and then its inputs, and the gates are separated by commas. A gate's input is
either a single capital letter, which is a circuit input, or the name of an earlier gate.</p>

<p>The gate kinds are AND, OR, NAND, NOR, XOR, XNOR, each taking two inputs, and NOT and BUFFER,
each taking one. The output of the circuit is the output of the last gate listed.</p>

<p>Report how many of the circuit's input combinations drive that output high.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>G1 = AND A B, G2 = NOT G1</td></tr>
<tr><th>Output</th><td>3</td></tr>
<tr><th>Explanation</th><td>
The circuit has two inputs, A and B, so there are four combinations.<br>
G1 is high only when both are high.<br>
G2 inverts that, so it is high on the other three combinations.
</td></tr></table>
""",
    input_spec="Input one line holding the gates in order, separated by commas. Within a gate, the "
               "name, the equals sign, the kind, and the inputs are separated by single spaces.",
    output_spec="Output an integer, the number of input combinations that drive the output high.",
    constraints="There are between 1 and 20 gates and between 1 and 12 distinct circuit inputs. "
                "Every gate's inputs are circuit inputs or gates listed before it. Gate names "
                "hold two or more characters, so they are never mistaken for circuit inputs.",
    task="""
<ul>
<li>The function has 1 parameter: a string, <code>netlist</code>, the gates separated by
commas.</li>
<li>The function returns an integer, the number of combinations that drive the output high.</li>
</ul>
""",
    params=[("netlist", "str")],
    ret="int",
    samples=["G1 = AND A B, G2 = NOT G1", "G1 = XOR A B, G2 = XOR G1 C", "G1 = NOR A B"],
    tests=["G1 = AND A B, G2 = NOT G1", "G1 = XOR A B, G2 = XOR G1 C", "G1 = NOR A B",
           "G1 = BUFFER A", "G1 = AND A B, G2 = OR C D, G3 = NAND G1 G2",
           "G1 = XNOR A B", "G1 = OR A B, G2 = OR C D, G3 = AND G1 G2",
           "GA = AND A B, GB = AND C D, GC = OR GA GB, GD = NOT GC",
           "G1 = NOT A, G2 = NOT G1", "G1 = XOR A B, G2 = XOR G1 C, G3 = XOR G2 D",
           "G1 = AND A A", "G1 = OR A B, G2 = AND G1 C, G3 = XOR G2 D, G4 = NOR G3 E"],
    approach="""
<p>Parse once, then evaluate the whole circuit once for every input combination. With at most
twelve inputs there are at most 4096 combinations, so brute force is not merely acceptable but the
intended approach.</p>

<p>Splitting is the first job. Break the line at the commas to get the gates, then break each gate at
the spaces. The first piece is the gate's name, the second is the equals sign and can be discarded, the
third is the kind, and everything after that is an input.</p>

<p>Work out the circuit inputs by collecting every input that is a single character and is not the name
of a gate. Sort them so the enumeration is deterministic, though for a count it does not actually
matter which order they take.</p>

<p>Enumerate the combinations with a counter from 0 up to 2 raised to the number of inputs. Bit i of
that counter is the value of input i, which is why the sorted list is worth having. Then walk the gates
in order, computing each one from values already known, since every gate's inputs are either circuit
inputs or gates listed earlier. That ordering is guaranteed by the statement, so a single pass is
enough and no dependency sorting is needed.</p>

<p>The output is whatever the last gate produced, not whatever the largest value in your table is, so
keep hold of the last gate's result specifically. NOT and BUFFER take one input, so guard against
reading a second one that is not there.</p>
""",
    sol=dict(
        python="""
gates = []
names = set()
for part in netlist.split(","):
    tokens = part.split()
    gates.append((tokens[0], tokens[2], tokens[3:]))
    names.add(tokens[0])

inputs = sorted({a for _, _, args in gates for a in args
                 if len(a) == 1 and a not in names})

count = 0
for mask in range(1 << len(inputs)):
    env = {}
    for i, name in enumerate(inputs):
        env[name] = (mask >> i) & 1 == 1
    last = False
    for name, kind, args in gates:
        x = env[args[0]]
        y = env[args[1]] if len(args) > 1 else False
        if kind == "AND":
            last = x and y
        elif kind == "OR":
            last = x or y
        elif kind == "NAND":
            last = not (x and y)
        elif kind == "NOR":
            last = not (x or y)
        elif kind == "XOR":
            last = x != y
        elif kind == "XNOR":
            last = x == y
        elif kind == "NOT":
            last = not x
        else:
            last = x
        env[name] = last
    if last:
        count += 1
return count
""",
        java="""
List<String[]> gates = new ArrayList<>();
Set<String> names = new HashSet<>();
for (String part : netlist.split(",")) {
    String[] tokens = part.trim().split("\\\\s+");
    gates.add(tokens);
    names.add(tokens[0]);
}
TreeSet<String> inputSet = new TreeSet<>();
for (String[] g : gates) {
    for (int i = 3; i < g.length; i++) {
        if (g[i].length() == 1 && !names.contains(g[i])) inputSet.add(g[i]);
    }
}
List<String> inputs = new ArrayList<>(inputSet);

int count = 0;
for (int mask = 0; mask < (1 << inputs.size()); mask++) {
    Map<String, Boolean> env = new HashMap<>();
    for (int i = 0; i < inputs.size(); i++) env.put(inputs.get(i), ((mask >> i) & 1) == 1);
    boolean last = false;
    for (String[] g : gates) {
        boolean x = env.get(g[3]);
        boolean y = g.length > 4 ? env.get(g[4]) : false;
        String kind = g[2];
        if (kind.equals("AND")) last = x && y;
        else if (kind.equals("OR")) last = x || y;
        else if (kind.equals("NAND")) last = !(x && y);
        else if (kind.equals("NOR")) last = !(x || y);
        else if (kind.equals("XOR")) last = x != y;
        else if (kind.equals("XNOR")) last = x == y;
        else if (kind.equals("NOT")) last = !x;
        else last = x;
        env.put(g[0], last);
    }
    if (last) count++;
}
return count;
""",
        cpp="""
vector<vector<string>> gates;
set<string> names;
string part;
istringstream commaStream(netlist);
while (getline(commaStream, part, ',')) {
    vector<string> tokens;
    string t;
    istringstream is(part);
    while (is >> t) tokens.push_back(t);
    gates.push_back(tokens);
    names.insert(tokens[0]);
}
set<string> inputSet;
for (auto &g : gates) {
    for (size_t i = 3; i < g.size(); i++) {
        if (g[i].size() == 1 && names.find(g[i]) == names.end()) inputSet.insert(g[i]);
    }
}
vector<string> inputs(inputSet.begin(), inputSet.end());

int count = 0;
for (int mask = 0; mask < (1 << (int) inputs.size()); mask++) {
    map<string, bool> env;
    for (size_t i = 0; i < inputs.size(); i++) env[inputs[i]] = ((mask >> i) & 1) == 1;
    bool last = false;
    for (auto &g : gates) {
        bool x = env[g[3]];
        bool y = g.size() > 4 ? env[g[4]] : false;
        string kind = g[2];
        if (kind == "AND") last = x && y;
        else if (kind == "OR") last = x || y;
        else if (kind == "NAND") last = !(x && y);
        else if (kind == "NOR") last = !(x || y);
        else if (kind == "XOR") last = x != y;
        else if (kind == "XNOR") last = x == y;
        else if (kind == "NOT") last = !x;
        else last = x;
        env[g[0]] = last;
    }
    if (last) count++;
}
return count;
""",
    ),
),

# ---------------------------------------------------------------- Senior 12
dict(
    id="path-counter",
    fname="countWalks",
    division="Senior",
    contest=4,
    title="Path Counter",
    blurb="Count the paths of an exact length between two vertices of a graph.",
    statement="""
<p>A graph is given as its adjacency matrix, one row at a time, with a 1 wherever an edge joins two
vertices and a 0 everywhere else. Rows and columns are numbered from 1 in the order given.</p>

<p>Count the paths of exactly the requested length from one vertex to another. A path here is
ACSL's, so vertices and edges may be repeated as often as you like, and only the number of edges
travelled matters.</p>
""",
    example="""
<table class="ex"><tr><th>Input</th><td>011;101;110<br>4 1 3</td></tr>
<tr><th>Output</th><td>5</td></tr>
<tr><th>Explanation</th><td>
The matrix describes a triangle on vertices 1, 2, and 3.<br>
There are five ways to walk four edges from vertex 1 and finish at vertex 3.<br>
Each one is free to revisit vertices along the way.
</td></tr></table>
""",
    input_spec="Input the matrix on the first line, rows separated by semicolons, each row a run "
               "of 0 and 1 characters. Input the length, the starting vertex, and the finishing "
               "vertex on the second line, separated by single spaces.",
    output_spec="Output an integer, the number of paths of exactly that length.",
    constraints="The matrix is between 1 by 1 and 8 by 8. The length is between 0 and 10, "
                "inclusive. The two vertex numbers are within the matrix. The answer always fits "
                "in a 32 bit signed integer.",
    task="""
<ul>
<li>The function has 2 parameters: a string, <code>matrix</code>, the adjacency matrix, and a
string, <code>spec</code>, the length and the two vertex numbers.</li>
<li>The function returns an integer, the number of paths.</li>
</ul>
""",
    params=[("matrix", "str"), ("spec", "str")],
    ret="int",
    samples=[["011;101;110", "4 1 3"], ["011;101;110", "2 1 1"], ["01;10", "3 1 1"]],
    tests=[["011;101;110", "4 1 3"], ["011;101;110", "2 1 1"], ["01;10", "3 1 1"],
           ["0111;1011;1101;1110", "10 1 1"], ["0", "0 1 1"], ["0", "1 1 1"],
           ["0100;1010;0101;0010", "3 1 4"], ["011;101;110", "0 1 2"],
           ["01000;10100;01010;00101;00010", "2 1 3"],
           ["0111111;1011111;1101111;1110111;1111011;1111101;1111110", "8 1 1"],
           ["010001;101000;010100;001010;000101;100010", "4 1 3"],
           ["00;00", "5 1 2"]],
    approach="""
<p>The textbook answer is the kth power of the adjacency matrix, whose entry in row u and column v
is the number of paths of length k from u to v. That works, but multiplying whole matrices is more
arithmetic than the question needs.</p>

<p>You only want one row of the result, so carry one row. Start with a vector holding a 1 in the
starting vertex's position and 0 everywhere else, meaning there is exactly one path of length 0 that
ends where it began. Then repeat the length times: the new value at vertex j is the sum, over every
vertex m that has an edge to j, of the old value at m. After k rounds, read off the finishing
vertex.</p>

<p>That is one vector times one matrix per round rather than a full matrix product, so the whole thing
costs the length times the number of vertices squared. For an 8 by 8 matrix and a length of 10 that is
under a thousand multiplications.</p>

<p>A length of 0 is worth checking. The loop simply never runs, and the answer is 1 when the two
vertices are the same and 0 otherwise, which the starting vector delivers without any special case. A
graph with no edges at all gives 0 for every positive length, which the eleventh test checks.</p>

<p>Counts grow like the degree raised to the length, so use 64 bit integers for the running vector even
though the final answer fits in 32 bits.</p>
""",
    sol=dict(
        python="""
rows = [[1 if c == "1" else 0 for c in line] for line in matrix.split(";")]
n = len(rows)
parts = spec.split()
length, u, v = int(parts[0]), int(parts[1]), int(parts[2])

cur = [0] * n
cur[u - 1] = 1
for _ in range(length):
    nxt = [0] * n
    for j in range(n):
        total = 0
        for m in range(n):
            if rows[m][j]:
                total += cur[m]
        nxt[j] = total
    cur = nxt
return cur[v - 1]
""",
        java="""
String[] lines = matrix.split(";");
int n = lines.length;
int[][] a = new int[n][n];
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) a[i][j] = lines[i].charAt(j) == '1' ? 1 : 0;
}
String[] parts = spec.trim().split("\\\\s+");
int length = Integer.parseInt(parts[0]);
int u = Integer.parseInt(parts[1]), v = Integer.parseInt(parts[2]);

long[] cur = new long[n];
cur[u - 1] = 1;
for (int step = 0; step < length; step++) {
    long[] nxt = new long[n];
    for (int j = 0; j < n; j++) {
        long total = 0;
        for (int m = 0; m < n; m++) if (a[m][j] == 1) total += cur[m];
        nxt[j] = total;
    }
    cur = nxt;
}
return (int) cur[v - 1];
""",
        cpp="""
vector<string> lines;
string line;
istringstream rowsIn(matrix);
while (getline(rowsIn, line, ';')) lines.push_back(line);
int n = (int) lines.size();
vector<vector<int>> a(n, vector<int>(n, 0));
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) a[i][j] = lines[i][j] == '1' ? 1 : 0;
}
int length, u, v;
istringstream ss(spec);
ss >> length >> u >> v;

vector<long long> cur(n, 0);
cur[u - 1] = 1;
for (int step = 0; step < length; step++) {
    vector<long long> nxt(n, 0);
    for (int j = 0; j < n; j++) {
        long long total = 0;
        for (int m = 0; m < n; m++) if (a[m][j]) total += cur[m];
        nxt[j] = total;
    }
    cur = nxt;
}
return (int) cur[v - 1];
""",
    ),
),

]
