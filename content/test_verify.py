"""Checks should detect wrong answer text and equivalent duplicate choices."""
import unittest
from verify import ENV, load_bank, run_check


class VerificationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bank = {q['id']: q for q in load_bank()}

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
