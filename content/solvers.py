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
                      else a * b if t == "*" else _idiv(a, b))
        else:
            st.append(int(t))
    return st[-1]


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
            acc = int(args[0])
            for a in args[1:]:
                v = int(a)
                acc = (acc + v if fn == "ADD" else acc - v if fn == "SUB"
                       else acc * v if fn == "MULT" else _idiv(acc, v))
            return str(acc)
        if fn == "CAR":
            return elems(args[0])[0]
        if fn == "CDR":
            return wrap(elems(args[0])[1:])
        if fn == "CONS":
            return wrap([args[0]] + elems(args[1]))
        return wrap(list(reversed(elems(args[0]))))

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
    def ins(t, v):
        if t is None:
            return [v, None, None]
        if v < t[0]:
            t[1] = ins(t[1], v)
        elif v > t[0]:
            t[2] = ins(t[2], v)
        return t

    def dele(t, v):
        if t is None:
            return None
        if v < t[0]:
            t[1] = dele(t[1], v)
        elif v > t[0]:
            t[2] = dele(t[2], v)
        else:
            if t[1] is None:
                return t[2]
            if t[2] is None:
                return t[1]
            m = t[1]
            while m[2] is not None:
                m = m[2]
            t[0] = m[0]
            t[1] = dele(t[1], m[0])
        return t

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
        return int(a[1:]) if a[0] == "=" else mem.get(a, 0)

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
            acc += val(arg)
        elif op == "SUB":
            acc -= val(arg)
        elif op == "MULT":
            acc *= val(arg)
        elif op == "DIV":
            acc = _idiv(acc, val(arg))
        elif op == "READ":
            mem[arg] = int(data[di])
            di += 1
        elif op == "PRINT":
            out.append(str(mem.get(arg, 0)))
        elif op == "BU" or (op == "BG" and acc > 0) or (op == "BE" and acc == 0) \
                or (op == "BL" and acc < 0):
            pc = labels[arg]
    return " ".join(out) if out else "NONE"
