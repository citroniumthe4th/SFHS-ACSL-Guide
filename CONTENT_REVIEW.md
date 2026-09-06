# Review of the doubled question bank

Reviewed the expansion through `6f621a4` on September 5, 2026. Corrections are on `double-bank-fix`.

I read the 229 added multiple-choice questions, their choices, explanations, and check expressions, plus all 35 concept questions in the combined bank. I also reviewed the 24 new programming statements, approaches, examples, hints, Python references, and test inputs. The build checks all 48 programming problems in Python, Java, and C++.

## Reference solution bugs

- **Base Parade:** All three implementations initialized the winning digit to zero. A tie involving zero therefore picked zero instead of the larger digit. Decimal 10 in base 2 is `1010`, so the result must be `1 2`, not `0 2`. The scan now starts with the largest allowed digit. The student test set includes this case, and independent boundary cases also cover hexadecimal `10` and a case where zero genuinely wins.
- **Postfix Machine:** Java and C++ took absolute values in a 32-bit signed type before dividing. The positive counterpart of `-2147483648` cannot fit in that type. With expression `A B * C * D /` and bindings `A=-8192 B=8192 C=32 D=2`, Java returned `1073741824` instead of `-1073741824`. Both implementations now use native integer division, which already truncates toward zero. Boundary tests cover positive and negative divisors.

## Questions and explanations

Corrections touch 38 multiple-choice entries. Most marked answers were already correct, but their explanations contained incorrect arithmetic, counterexamples, or generalizations.

| Entries | Correction |
| --- | --- |
| `ns-19`, `ns-24` | Corrected the significant-bit explanation and the binary-palindrome counting formula. |
| `rf-31` | Removed the contradiction between starting with one stalk and starting with three. |
| `rf-30`, `wb-18`, `wb-20`, `bs-18`, `wa-17` | Corrected claimed call counts, counterfactual outputs, or intermediate results. |
| `bs-23`, `bs-26` | Corrected the precedence table and the description of which operation is evaluated first. |
| `pp-32` | Corrected the claim about stack depth for left-grouped versus right-grouped expressions. |
| `fr-23`, `fr-27` | Removed the false need for a backreference and distinguished a complete DFA from a diagram with omitted rejecting transitions. |
| `gt-10`, `gt-34` | Equal indegree and outdegree do not imply an undirected graph. A directed cycle is a counterexample. |
| `gt-36` | Clarified the graph assumptions so the degree question has one correct choice. Previously both the odd sum and the degree exceeding four were defensible objections. |
| `ds-23`, `ds-30` | Made the prompts self-contained instead of relying on a previous question. |
| Nine explanations | Replaced references to fixed choice positions with the actual answer text, since the UI shuffles choices. |

Other edits correct tree-depth terminology, a false claim that a resulting BST is unbalanced, and overbroad claims about loops, gates, and empty lists.

## Programming content and build

- Word Search Row had a 21-character test word despite a stated maximum of 20. The replacement remains longer than its row while respecting the limit.
- Bracket Depth now explicitly requires nesting. Path Counter explicitly defines directed matrix entries. Expressions must be valid, and problems allowing negative values call them integers.
- Corrected explanations of equal-value streaks, magic-square diagonals, binary palindromes, digit persistence, and priority-queue order. Collatz termination is stated only for the allowed input range.
- Added boundary cases for crossed brackets, failed diagonals, directed edges, digit ties, and minimum-integer division.
- `stamp.py` now regenerates the sitemap after the route shells. The existing generated-file check can catch sitemap drift too.

## What the checks establish

The 423 machine checks compare a check expression's result with the marked answer. They do not parse the question's English, verify every sentence in its explanation, or prove that all distractors are false. For example, `fr-25` tests selected strings against a fixed regex, rather than independently comparing that regex with the stated automaton.

Likewise, the three programming solutions often translate the same algorithm closely. Agreement is useful evidence, but it missed the shared Base Parade bug. The independent boundary cases remain essential.

Additional review checks compared 30,000 digit counts, all 46 allowed staircase sizes, dual-palindrome answer transitions, 2,046 reflected Gray-code entries, 500 directed path counts, 500 expression heights, and 300 shortest-path graphs with separate derivations. All 999,999 allowed Collatz starts were checked for termination, with a maximum of 524 steps.

Final local validation passed: 46 desktop/mobile browser tests, 8 verifier regressions, 2,400 generated questions, runtime checks, and all 48 programming references across three languages with 101 independent boundary cases. The generated pages and 85-URL sitemap are reproducible.

The bank still contains 458 questions and 48 programming problems. The 60-character explanation floor is unchanged.

Sources checked: [ACSL study materials](https://www.acsl.org/get-started/study-materials), [bit-string operators](https://www.categories.acsl.org/wiki/index.php?title=Bit-String_Flicking), [graph terminology](https://www.categories.acsl.org/wiki/index.php?title=Graph_Theory), [FSAs and regular expressions](https://www.categories.acsl.org/wiki/index.php?title=FSAs_and_Regular_Expressions), [data structures](https://www.categories.acsl.org/wiki/index.php?title=Data_Structures), [LISP](https://www.categories.acsl.org/wiki/index.php?title=LISP), [Java division](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.17.2), and [C++ division](https://eel.is/c++draft/expr.mul).
