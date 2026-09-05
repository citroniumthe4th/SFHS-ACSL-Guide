"""Checks should detect wrong answer text and equivalent duplicate choices."""
import unittest
from verify import ENV, choice_key, load_bank, run_check
from solvers import machine, postfix_eval, lisp


class VerificationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bank = {q['id']: q for q in load_bank()}

    def test_lisp_nil_is_an_empty_list(self):
        q = self.bank['lp-05']
        self.assertEqual(choice_key(q, 'NIL'), choice_key(q, '()'))
        self.assertEqual(choice_key(q, '(A NIL)'), choice_key(q, '(A ())'))
        self.assertNotEqual(choice_key(q, '()'), choice_key(q, '(())'))
        self.assertEqual(len({choice_key(q, c) for c in q['choices']}), 5)
        with self.assertRaises(ValueError):
            lisp("(TYPO '(1 2))")

    def test_postfix_division_keeps_the_fraction(self):
        self.assertEqual(postfix_eval('8 3 - 2 /'.split()), '2.5')
        self.assertEqual(postfix_eval('3 8 - 2 /'.split()), '-2.5')
        self.assertEqual(postfix_eval('8 2 /'.split()), '4')
        with self.assertRaises(ValueError):
            postfix_eval('8 2'.split())

    def test_assembly_requires_a_value_before_reading_memory(self):
        for program in ['PRINT UNSET; END#', 'LOAD UNSET; END#']:
            with self.assertRaises(KeyError):
                machine(program)
        self.assertEqual(machine('VALUE DC 5; LOAD =0; PRINT VALUE; END#'), '5')
        self.assertEqual(machine('LOAD =7; STORE VALUE; PRINT VALUE; END#'), '7')

    def test_changed_correct_choice_is_not_self_validating(self):
        for qid in ('de-01', 'de-08', 'de-10', 'fr-04', 'fr-08', 'ws-04'):
            q = self.bank[qid]
            choices = q['choices'].copy()
            choices[q['ans']] = 'deliberately incorrect answer'
            self.assertNotEqual(run_check(q['check'], dict(ENV, CHOICES=choices)), choices[q['ans']], qid)

    def test_equivalent_boolean_choices_are_rejected(self):
        q = self.bank['ba-01']
        choices = q['choices'].copy()
        choices[1] = 'A+A'
        with self.assertRaisesRegex(ValueError, 'exactly one'):
            run_check(q['check'], dict(ENV, CHOICES=choices))

    def test_positional_check_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'independently'):
            run_check('CHOICES[0] if 2 + 2 == 4 else "bad"', dict(ENV, CHOICES=['wrong']))

    def test_reordered_choices_do_not_change_expected_answer(self):
        for q in self.bank.values():
            if 'check' not in q:
                continue
            choices = q['choices'][:4][::-1] + q['choices'][4:]
            self.assertEqual(run_check(q['check'], dict(ENV, CHOICES=choices)),
                             run_check(q['check'], dict(ENV, CHOICES=q['choices'])), q['id'])


if __name__ == '__main__':
    unittest.main()
