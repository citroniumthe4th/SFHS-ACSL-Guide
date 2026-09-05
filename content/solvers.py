# -*- coding: utf-8 -*-
"""Independent implementations of the things the question bank asks about.

verify.py used to borrow these from the programming problems, which broke the moment the
problem set changed. The checker owns its own arithmetic now.
"""
import re


# ------------------------------------------------------------------ number systems

def to_base(n, b):
    d = "0123456789ABCDEF"
    s = ""
    while n:
        s = d[n % b] + s
        n //= b
    return s or "0"


def from_base(s, b):
    return int(str(s), b)


# ------------------------------------------------------------------ ACSL substrings

def substr(s, a=None, b=None):
    """ACSL substring notation, which is not Python slicing and does not read like it.

    From the official topic page, with S = "ACSL WDTPD":

        S[:3]  = "ACS"    the first 3 characters
        S[4:]  = "DTPD"   the last 4 characters
        S[2:6] = "SL WD"  positions 2 through 6, both ends included

    So the one sided forms count characters and the two sided form names positions, and the
    second position is included. Python agrees on the first of those three and disagrees on
    the other two, which is what makes it worth a solver of its own rather than a slice.
    """
    if a is None and b is None:
        return s
    if a is None:
        return s[:b]
    if b is None:
        return s[len(s) - a:] if a else ""
    return s[a:b + 1]


# ------------------------------------------------------------- prefix/infix/postfix

PREC = {"^": 3, "*": 2, "/": 2, "+": 1, "-": 1}


def to_postfix(expr):
    out, ops = [], []
    for ch in expr:
        if ch.isalpha():
            out.append(ch)
        elif ch == "(":
            ops.append(ch)
        elif ch == ")":
            while ops and ops[-1] != "(":
                out.append(ops.pop())
            if ops:
                ops.pop()
        elif ch in PREC:
            while ops and ops[-1] != "(" and (
                    PREC[ops[-1]] > PREC[ch] or (PREC[ops[-1]] == PREC[ch] and ch != "^")):
                out.append(ops.pop())
            ops.append(ch)
    while ops:
        out.append(ops.pop())
    return " ".join(out)


def to_prefix(expr):
    st = []
    for t in to_postfix(expr).split():
        if t.isalpha():
            st.append([t])
        else:
            b, a = st.pop(), st.pop()
            st.append([t] + a + b)
    return " ".join(st[-1])


def post_to_infix(post):
    st = []
    for t in post.split():
        if t.isalpha():
            st.append(t)
        else:
            b, a = st.pop(), st.pop()
            st.append("(" + a + t + b + ")")
    return st[-1]


def pre_to_infix(pre):
    st = []
    for t in reversed(pre.split()):
        if t.isalpha():
            st.append(t)
        else:
            a, b = st.pop(), st.pop()
            st.append("(" + a + t + b + ")")
    return st[-1]


def _idiv(a, b):
    q = abs(a) // abs(b)
    return q if (a < 0) == (b < 0) else -q


def postfix_eval(tokens):
    st = []
    for t in tokens:
        if len(t) == 1 and t in "+-*/":
            b, a = st.pop(), st.pop()
            st.append(a + b if t == "+" else a - b if t == "-"
                      else a * b if t == "*" else a / b)
        else:
            st.append(int(t))
    if len(st) != 1:
        raise ValueError("postfix expression must leave exactly one value")
    return _numstr(st[0])


# ------------------------------------------------------------- bit-string flicking

def _move(name, s):
    op, n = name.split("-")
    n, L = int(n), len(s)
    if op == "LCIRC":
        n %= L
        return s[n:] + s[:n]
    if op == "RCIRC":
        n = (L - n % L) % L
        return s[n:] + s[:n]
    n = min(n, L)
    return (s[n:] + "0" * n) if op == "LSHIFT" else ("0" * n + s[:L - n])


def _zip(v, w, sym):
    out = ""
    for a, b in zip(v, w):
        x, y = a == "1", b == "1"
        r = (x and y) if sym == "&" else (x != y) if sym == "^" else (x or y)
        out += "1" if r else "0"
    return out


def flick(expr):
    toks, i = [], 0
    while i < len(expr):
        c = expr[i]
        if c == " ":
            i += 1
        elif c in "01":
            j = i
            while j < len(expr) and expr[j] in "01":
                j += 1
            toks.append(expr[i:j])
            i = j
        elif c.isalpha():
            j = i
            while j < len(expr) and (expr[j].isalnum() or expr[j] == "-"):
                j += 1
            toks.append(expr[i:j])
            i = j
        else:
            toks.append(c)
            i += 1
    pos = [0]

    def peek():
        return toks[pos[0]] if pos[0] < len(toks) else None

    def unary():
        t = peek()
        if t == "~":
            pos[0] += 1
            return "".join("1" if c == "0" else "0" for c in unary())
        if t and t[0].isalpha():
            pos[0] += 1
            return _move(t, unary())
        if t == "(":
            pos[0] += 1
            v = orx()
            pos[0] += 1
            return v
        pos[0] += 1
        return t

    def level(nxt, sym):
        v = nxt()
        while peek() == sym:
            pos[0] += 1
            v = _zip(v, nxt(), sym)
        return v

    def andx():
        return level(unary, "&")

    def xorx():
        return level(andx, "^")

    def orx():
        return level(xorx, "|")

    return orx()


def mask_run(s, ops):
    cur, L = s, len(s)
    for op in ops:
        if op == "NOT":
            cur = "".join("1" if c == "0" else "0" for c in cur)
            continue
        name, _, rhs = op.partition("-")
        if name in ("AND", "OR", "XOR"):
            cur = _zip(cur, rhs, {"AND": "&", "OR": "|", "XOR": "^"}[name])
        else:
            cur = _move(op, cur)
    return cur


# -------------------------------------------------------------------------- lisp

def _split_top(body):
    out, depth, cur = [], 0, ""
    for c in body:
        if c == "(":
            depth += 1
        elif c == ")":
            depth -= 1
        if c == " " and depth == 0:
            if cur:
                out.append(cur)
            cur = ""
        else:
            cur += c
    if cur:
        out.append(cur)
    return out


def _num(t):
    """A LISP numeric literal, integer or not."""
    f = float(t)
    return int(f) if f.is_integer() else f


def _numstr(v):
    """Prints 12 rather than 12.0, and 12.5 as itself."""
    if isinstance(v, float) and v.is_integer():
        v = int(v)
    return repr(v) if isinstance(v, float) else str(v)


def lisp(expr):
    def elems(lst):
        return _split_top(lst[1:-1].strip())

    def wrap(items):
        return "(" + " ".join(items) + ")"

    def ev(e):
        e = e.strip()
        if e.startswith("'"):
            return e[1:]
        if not e.startswith("("):
            return e
        parts = _split_top(e[1:-1].strip())
        fn, args = parts[0], [ev(a) for a in parts[1:]]
        if fn in ("ADD", "SUB", "MULT", "DIV"):
            # ACSL's arities are not uniform. ADD and MULT are written (ADD x1 x2 ...) and take
            # any number; SUB and DIV are written (SUB a b) and (DIV a b) and take exactly two.
            # Accepting three here would let a question ask something the language cannot
            # express and then agree with itself about the answer.
            if fn in ("SUB", "DIV") and len(args) != 2:
                raise ValueError("%s takes exactly two arguments, got %d" % (fn, len(args)))
            if not args:
                raise ValueError("%s needs arguments" % fn)
            acc = _num(args[0])
            for a in args[1:]:
                v = _num(a)
                # DIV is ordinary division and keeps the fraction. It is not integer division.
                acc = (acc + v if fn == "ADD" else acc - v if fn == "SUB"
                       else acc * v if fn == "MULT" else acc / v)
            return _numstr(acc)
        if fn == "CAR":
            return elems(args[0])[0]
        if fn == "CDR":
            return wrap(elems(args[0])[1:])
        if fn == "CONS":
            return wrap([args[0]] + elems(args[1]))
        if fn == "REVERSE":
            return wrap(list(reversed(elems(args[0]))))
        raise ValueError("unsupported LISP function: " + fn)

    return ev(expr)


# ---------------------------------------------------------------- boolean algebra

def bool_eval(expr, env):
    pos = [0]

    def factor():
        if expr[pos[0]] == "(":
            pos[0] += 1
            v = orx()
            pos[0] += 1
        else:
            v = env.get(expr[pos[0]], False)
            pos[0] += 1
        while pos[0] < len(expr) and expr[pos[0]] == "'":
            pos[0] += 1
            v = not v
        return v

    def term():
        v = factor()
        while pos[0] < len(expr) and (expr[pos[0]].isalpha() or expr[pos[0]] == "("):
            v = factor() and v
        return v

    def orx():
        v = term()
        while pos[0] < len(expr) and expr[pos[0]] == "+":
            pos[0] += 1
            v = term() or v
        return v

    return orx()


def bool_count(expr):
    letters = sorted(set(c for c in expr if c.isalpha()))
    total = 0
    for mask in range(1 << len(letters)):
        env = {c: bool(mask >> i & 1) for i, c in enumerate(letters)}
        if bool_eval(expr, env):
            total += 1
    return total


def same(a, b):
    for mask in range(32):
        env = {c: bool(mask >> i & 1) for i, c in enumerate("ABCDE")}
        if bool_eval(a, env) != bool_eval(b, env):
            return False
    return True


# ---------------------------------------------------------------- data structures

def trav(ops, kind):
    # ACSL's convention, and it is not the usual one: a key equal to the node it is being
    # compared against goes left, so duplicates are kept rather than dropped. The official
    # page is explicit that some textbooks and libraries send them right instead.
    def ins(t, v):
        if t is None:
            return [v, None, None]
        if v <= t[0]:
            t[1] = ins(t[1], v)
        else:
            t[2] = ins(t[2], v)
        return t

    # Also ACSL's own, and also not the usual one. Where most texts copy the predecessor or
    # successor into the doomed node, ACSL promotes the left child into its place and then
    # sticks the whole right subtree onto that tree, which lands at its rightmost point.
    def dele(t, v):
        if t is None:
            return None
        if v < t[0]:
            t[1] = dele(t[1], v)
            return t
        if v > t[0]:
            t[2] = dele(t[2], v)
            return t
        l, r = t[1], t[2]
        if l is None:
            return r
        if r is None:
            return l
        m = l
        while m[2] is not None:
            m = m[2]
        m[2] = r
        return l

    def walk(t, out):
        if t is None:
            return
        if kind == "pre":
            out.append(t[0])
        walk(t[1], out)
        if kind == "in":
            out.append(t[0])
        walk(t[2], out)
        if kind == "post":
            out.append(t[0])

    def depth(t):
        return 0 if t is None else 1 + max(depth(t[1]), depth(t[2]))

    def ipl(t, d=0):
        return 0 if t is None else d + ipl(t[1], d + 1) + ipl(t[2], d + 1)

    root = None
    for op in ops:
        v = int(op[1:])
        root = ins(root, v) if op[0] == "+" else dele(root, v)
    if kind == "height":
        return max(depth(root) - 1, 0)
    if kind == "ipl":
        return ipl(root)
    out = []
    walk(root, out)
    return " ".join(str(x) for x in out) if out else "EMPTY"


def minheap(vals):
    h = []
    for v in vals:
        h.append(v)
        i = len(h) - 1
        while i > 0 and h[(i - 1) // 2] > h[i]:
            p = (i - 1) // 2
            h[i], h[p] = h[p], h[i]
            i = p
    return " ".join(str(x) for x in h)


def stack_queue(cmds):
    stack, queue, out = [], [], []
    for c in cmds:
        if c == "P":
            out.append(stack.pop() if stack else "X")
        elif c == "D":
            out.append(queue.pop(0) if queue else "X")
        elif c[0] == "S":
            stack.append(c[1:])
        else:
            queue.append(c[1:])
    return " ".join(out) if out else "NONE"


# ------------------------------------------------------------------- fsa / regex

def regex_match(pattern, words):
    def matches(pat, word):
        pos = [0]

        def prim(S):
            if pat[pos[0]] == "(":
                pos[0] += 1
                R = alt(S)
                pos[0] += 1
                return R
            c = pat[pos[0]]
            pos[0] += 1
            return set(i + 1 for i in S if i < len(word) and word[i] == c)

        def factor(S):
            save = pos[0]
            R = prim(S)
            pend = pos[0]
            op = pat[pend] if pend < len(pat) else ""
            if op not in ("*", "+", "?"):
                return R
            pos[0] = pend + 1
            if op == "?":
                return S | R
            total = set(S) if op == "*" else set(R)
            frontier = set(total)
            while frontier:
                pos[0] = save
                nxt = prim(frontier)
                pos[0] = pend + 1
                frontier = nxt - total
                total |= frontier
            return total

        def cat(S):
            T = S
            while pos[0] < len(pat) and pat[pos[0]] not in ")|":
                T = factor(T)
            return T

        def alt(S):
            R = cat(S)
            while pos[0] < len(pat) and pat[pos[0]] == "|":
                pos[0] += 1
                R |= cat(S)
            return R

        return len(word) in alt({0})

    return " ".join("Y" if matches(pattern, "" if w == "-" else w) else "N" for w in words)


def refull(pat, s):
    return "Y" if re.fullmatch(pat, s) else "N"


def research(pat, s):
    m = re.search(pat, s)
    return m.group(0) if m else "NONE"


# ----------------------------------------------------------------- graph theory

def walks(n, k, u, v, bits):
    adj = [[int(bits[r * n + c]) for c in range(n)] for r in range(n)]
    cur = [0] * n
    cur[ord(u) - 65] = 1
    for _ in range(k):
        cur = [sum(cur[m] for m in range(n) if adj[m][j]) for j in range(n)]
    return cur[ord(v) - 65]


# ------------------------------------------------------------ digital electronics

def circuit(netlist):
    gates, names = [], set()
    for part in netlist.split(","):
        tok = part.split()
        gates.append((tok[0], tok[2], tok[3:]))
        names.add(tok[0])
    inputs = sorted({a for _, _, args in gates for a in args
                     if len(a) == 1 and a not in names})

    def apply(op, x, y):
        return {"AND": x and y, "OR": x or y, "NAND": not (x and y), "NOR": not (x or y),
                "XOR": x != y, "XNOR": x == y, "NOT": not x, "BUFFER": x}[op]

    count = 0
    for mask in range(1 << len(inputs)):
        env = {c: bool(mask >> i & 1) for i, c in enumerate(inputs)}
        last = False
        for name, op, args in gates:
            vals = [env[a] for a in args]
            last = apply(op, vals[0], vals[1] if len(vals) > 1 else False)
            env[name] = last
        if last:
            count += 1
    return count


# ------------------------------------------------------------------ acsl assembly

OPS = {"LOAD", "STORE", "ADD", "SUB", "MULT", "DIV", "BG", "BE", "BL",
       "BU", "READ", "PRINT", "DC", "END"}


def machine(prog):
    body, _, datastr = prog.partition("#")
    data, di = datastr.split(), 0
    mem, code, labels = {}, [], {}
    for raw in body.split(";"):
        tok = raw.split()
        if not tok:
            continue
        if tok[0] in OPS:
            lab, op, arg = None, tok[0], (tok[1] if len(tok) > 1 else None)
        else:
            lab, op, arg = tok[0], tok[1], (tok[2] if len(tok) > 2 else None)
        if lab:
            labels[lab] = len(code)
            if op == "DC":
                mem[lab] = int(arg)
        code.append((op, arg))

    def val(a):
        return int(a[1:]) if a[0] == "=" else mem[a]

    # READ, ADD, SUB and MULT are all modulo 1,000,000 in the ACSL reference; DIV is not, and
    # stores the signed integer part of the quotient. The reference does not spell out what the
    # modulus does to a negative, and a plain Python % would map every negative to a positive,
    # which would leave BL unable to ever fire. Wrapping the magnitude and keeping the sign is
    # the only reading consistent with a signed accumulator.
    def wrap(x):
        return -(abs(x) % 1000000) if x < 0 else x % 1000000

    acc, pc, out, steps = 0, 0, [], 0
    while pc < len(code) and steps < 100000:
        steps += 1
        op, arg = code[pc]
        pc += 1
        if op == "END":
            break
        elif op == "DC":
            continue
        elif op == "LOAD":
            acc = val(arg)
        elif op == "STORE":
            mem[arg] = acc
        elif op == "ADD":
            acc = wrap(acc + val(arg))
        elif op == "SUB":
            acc = wrap(acc - val(arg))
        elif op == "MULT":
            acc = wrap(acc * val(arg))
        elif op == "DIV":
            acc = _idiv(acc, val(arg))
        elif op == "READ":
            mem[arg] = wrap(int(data[di]))
            di += 1
        elif op == "PRINT":
            out.append(str(mem[arg]))
        elif op == "BU" or (op == "BG" and acc > 0) or (op == "BE" and acc == 0) \
                or (op == "BL" and acc < 0):
            pc = labels[arg]
    return " ".join(out) if out else "NONE"


# ------------------------------------------------------------------ self check

def _selfcheck():
    """The ACSL conventions that differ from the obvious reading, pinned to the official pages.

    Every one of these was wrong here at some point, and each was wrong in a way that still
    produced a confident answer, so they are worth a check that fails out loud.
    Run with: python3 content/solvers.py
    """
    # Substrings: one bound is a count, two bounds are inclusive positions.
    S = "ACSL WDTPD"
    assert substr(S, None, 3) == "ACS", substr(S, None, 3)
    assert substr(S, 4, None) == "DTPD", substr(S, 4, None)
    assert substr(S, 2, 6) == "SL WD", substr(S, 2, 6)

    # Binary search trees: duplicates go left, and a two child deletion promotes the left
    # child. Checked against the tree the official page builds from A M E R I C A N.
    ops = ["+%d" % ord(c) for c in "AMERICAN"]
    letters = lambda r: " ".join(chr(int(x)) for x in r.split())
    assert letters(trav(ops, "in")) == "A A C E I M N R", trav(ops, "in")
    assert letters(trav(ops, "pre")) == "A A M E C I R N", trav(ops, "pre")
    assert letters(trav(ops, "post")) == "A C I E N R M A", trav(ops, "post")
    assert trav(ops, "height") == 3
    assert trav(ops, "ipl") == 15
    assert letters(trav(ops + ["-%d" % ord("M")], "in")) == "A A C E I N R"

    # Postfix and prefix arithmetic keeps the fraction, and prints 4 rather than 4.0. The
    # official page never divides inexactly, so this follows the rule ACSL does state for LISP
    # rather than the one it states for assembly. Pinned so it cannot drift back quietly.
    assert postfix_eval("8 3 - 2 /".split()) == "2.5", postfix_eval("8 3 - 2 /".split())
    assert postfix_eval("8 2 /".split()) == "4", postfix_eval("8 2 /".split())

    # LISP: DIV is ordinary division, and SUB and DIV take exactly two arguments.
    assert lisp("(DIV 100 8)") == "12.5"
    assert lisp("(DIV 6 (SUB 2 5))") == "-2"
    assert lisp("(ADD 1 2 3 4)") == "10"
    for bad in ("(SUB 20 5 3)", "(DIV 100 3 3)"):
        try:
            lisp(bad)
            raise AssertionError("%s should have been rejected" % bad)
        except ValueError:
            pass

    # Assembly: READ, ADD, SUB and MULT wrap modulo 1,000,000, keeping the sign; DIV does not.
    assert machine("READ X; LOAD X; ADD =2; STORE X; PRINT X; END # 999999") == "1"
    assert machine("LOAD =999999; MULT =999999; STORE X; PRINT X; END #") == "1"
    assert machine("READ X; LOAD X; SUB =5; STORE X; PRINT X; END # -999998") == "-3"
    assert machine("LOAD =7; DIV =2; STORE X; PRINT X; END #") == "3"

    print("solvers self check: all ACSL conventions hold")


if __name__ == "__main__":
    _selfcheck()
