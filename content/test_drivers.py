"""Exercise generated input drivers with an independently specified echo contract."""
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import codegen
import server


def check_drivers():
    bodies = {
        'python': 'return first + ":" + str(n) + ":" + last',
        'java': 'return first + ":" + n + ":" + last;',
        'cpp': 'return first + ":" + to_string(n) + ":" + last;',
    }
    for lang in codegen.BUILDERS:
        code = codegen.reference(lang, 'echo', [('first', 'str'), ('n', 'int'), ('last', 'str')], 'str', bodies)
        # CRLF, padding, a whitespace-only separator, interior spaces, negatives, and no final newline.
        result = server.run_code(lang, code, '  A B  \r\n\t \r\n -2 \r\n C D \r\nE\n3\nF')
        assert result['status'] == 'ok' and result['stdout'] == 'A B:-2:C D\nE:3:F\n', (lang, result)
        result = server.run_code(lang, code, 'A\n1\nB\nC\n2\n')
        assert result['status'] == 'runtime_error', (lang, 'incomplete case was silently discarded', result)
    print('input drivers: whitespace, parameter order, and incomplete cases checked in all three languages')


if __name__ == '__main__':
    check_drivers()
