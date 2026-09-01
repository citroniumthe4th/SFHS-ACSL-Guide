# -*- coding: utf-8 -*-
"""Turns a task signature into starter code, a driver, and a reference program.

ACSL hands you a named function to complete, one parameter per line of input, and permission
to add helper functions. Everything the student sees and everything the checker runs is
generated from the same signature, so the three languages cannot drift apart.
"""

TYPES = {
    "int":  {"py": "int",       "java": "int",    "cpp": "int"},
    "str":  {"py": "str",       "java": "String", "cpp": "string"},
}

BANNER = "----- driver code: leave this alone -----"


def _indent(text, n):
    pad = " " * n
    return "\n".join(pad + ln if ln.strip() else "" for ln in text.rstrip("\n").split("\n"))


def _read(t, lang, var, src):
    if lang == "py":
        return "%s = %s" % (var, src if t == "str" else "int(%s)" % src)
    if lang == "java":
        return ("String %s = %s;" % (var, src) if t == "str"
                else "int %s = Integer.parseInt((%s).trim());" % (var, src))
    return ("string %s = %s;" % (var, src) if t == "str"
            else "int %s = stoi(%s);" % (var, src))


# --------------------------------------------------------------------------- python

def py_program(fname, params, ret, body, helpers=""):
    sig = ", ".join("%s: %s" % (n, TYPES[t]["py"]) for n, t in params)
    out = ["import sys", ""]
    if helpers:
        out += [helpers.rstrip("\n"), ""]
    out += ["def %s(%s) -> %s:" % (fname, sig, TYPES[ret]["py"]), _indent(body, 4), "", ""]
    out += [
        "# " + BANNER,
        "def _driver():",
        "    _lines = [ln.rstrip(chr(13)) for ln in sys.stdin.read().split(chr(10))]",
        "    _lines = [ln for ln in _lines if ln.strip() != '']",
        "    _k = %d" % len(params),
        "    for _i in range(0, len(_lines) - _k + 1, _k):",
    ]
    for j, (name, t) in enumerate(params):
        out.append("        " + _read(t, "py", name, "_lines[_i + %d].strip()" % j))
    out += [
        "        print(%s(%s))" % (fname, ", ".join(n for n, _ in params)),
        "",
        "",
        "_driver()",
    ]
    return "\n".join(out) + "\n"


# ----------------------------------------------------------------------------- java

def java_program(fname, params, ret, body, helpers=""):
    sig = ", ".join("%s %s" % (TYPES[t]["java"], n) for n, t in params)
    out = ["import java.util.*;", "", "public class Solution {", ""]
    if helpers:
        out += [_indent(helpers, 4), ""]
    out += ["    static %s %s(%s) {" % (TYPES[ret]["java"], fname, sig),
            _indent(body, 8), "    }", ""]
    reads = []
    for j, (name, t) in enumerate(params):
        reads.append(_read(t, "java", name, "_lines.get(_i + %d)" % j))
    out += [
        "    // " + BANNER,
        "    public static void main(String[] args) throws Exception {",
        "        Scanner _sc = new Scanner(System.in);",
        "        List<String> _lines = new ArrayList<>();",
        "        while (_sc.hasNextLine()) {",
        "            String _ln = _sc.nextLine();",
        "            if (!_ln.trim().isEmpty()) _lines.add(_ln.trim());",
        "        }",
        "        StringBuilder _sb = new StringBuilder();",
        "        int _k = %d;" % len(params),
        "        for (int _i = 0; _i + _k <= _lines.size(); _i += _k) {",
        _indent("\n".join(reads), 12),
        "            _sb.append(%s(%s)).append('\\n');" % (fname, ", ".join(n for n, _ in params)),
        "        }",
        "        System.out.print(_sb);",
        "    }",
        "}",
    ]
    return "\n".join(out) + "\n"


# ------------------------------------------------------------------------------- c++

def cpp_program(fname, params, ret, body, helpers=""):
    sig = ", ".join("%s %s" % (TYPES[t]["cpp"], n) for n, t in params)
    out = ["#include <bits/stdc++.h>", "using namespace std;", ""]
    if helpers:
        out += [helpers.rstrip("\n"), ""]
    out += ["%s %s(%s) {" % (TYPES[ret]["cpp"], fname, sig), _indent(body, 4), "}", ""]
    reads = []
    for j, (name, t) in enumerate(params):
        reads.append(_read(t, "cpp", name, "_lines[_i + %d]" % j))
    out += [
        "// " + BANNER,
        "int main() {",
        "    vector<string> _lines;",
        "    string _ln;",
        "    while (getline(cin, _ln)) {",
        "        while (!_ln.empty() && (_ln.back() == '\\r' || _ln.back() == ' ')) _ln.pop_back();",
        "        if (!_ln.empty()) _lines.push_back(_ln);",
        "    }",
        "    size_t _k = %d;" % len(params),
        "    for (size_t _i = 0; _i + _k <= _lines.size(); _i += _k) {",
        _indent("\n".join(reads), 8),
        "        cout << %s(%s) << \"\\n\";" % (fname, ", ".join(n for n, _ in params)),
        "    }",
        "    return 0;",
        "}",
    ]
    return "\n".join(out) + "\n"


STUB = {
    "python": "# Write your solution here. You may add helper functions above this one.\n",
    "java":   "// Write your solution here. You may add helper methods above this one.\n",
    "cpp":    "// Write your solution here. You may add helper functions above this one.\n",
}

DEFAULT_RETURN = {
    "python": {"int": "return 0", "str": 'return ""'},
    "java":   {"int": "return 0;", "str": 'return "";'},
    "cpp":    {"int": "return 0;", "str": 'return "";'},
}

BUILDERS = {"python": py_program, "java": java_program, "cpp": cpp_program}


def starter(lang, fname, params, ret):
    body = STUB[lang] + DEFAULT_RETURN[lang][ret]
    return BUILDERS[lang](fname, params, ret, body)


def reference(lang, fname, params, ret, sol):
    return BUILDERS[lang](fname, params, ret, sol[lang], sol.get(lang + "_helpers", ""))
