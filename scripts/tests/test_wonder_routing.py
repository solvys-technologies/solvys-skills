import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from wonder_ui_routing import route_ui


class WonderRoutingTests(unittest.TestCase):
    def test_browser_fallback_without_local_export(self):
        with tempfile.TemporaryDirectory() as tmp:
            doc = Path(tmp) / 'Cabinet/Documentation/wonder-source.md'
            doc.parent.mkdir(parents=True)
            doc.write_text('Approved file: https://app.wonder.so/team/files/approved')
            blocked, message = route_ui({'cwd': tmp, 'tool_name': 'Edit', 'tool_input': {'file_path': 'Feed.tsx'}})
            self.assertFalse(blocked)
            self.assertIn('https://app.wonder.so/team/files/approved', message)
            self.assertIn('No named match', message)

    def test_local_named_match_and_css(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            doc = root / 'Cabinet/Documentation/wonder-source.md'
            doc.parent.mkdir(parents=True)
            doc.write_text('Approved export: `design.zip`')
            canon = root / 'design/payload/component-bank/canon'
            canon.mkdir(parents=True)
            (canon / 'fintheon.css').write_text(':root {}')
            source = root / 'design/canvas/assembled/you.jsx'
            source.parent.mkdir(parents=True)
            source.write_text('<div data-node-id="you.feed" data-node-label="RiskFlow Feed"/>')
            blocked, message = route_ui({'cwd': tmp, 'tool_name': 'Edit', 'tool_input': {'file_path': 'RiskFlow.tsx'}})
            self.assertFalse(blocked)
            self.assertIn('you.feed', message)
            self.assertIn('fintheon.css', message)

    def test_missing_context_does_not_invent_source(self):
        blocked, message = route_ui({'tool_name': 'Edit', 'tool_input': {'file_path': 'Feed.tsx'}})
        self.assertFalse(blocked)
        self.assertIn('resolve', message)

    def test_patch_document_body_is_not_target(self):
        self.assertEqual(route_ui({'tool_name': 'apply_patch', 'tool_input': {'patch': '*** Add File: sprint-md/plan.md\n+frontend/src/Feed.tsx'}}), (False, None))

    def test_documentation_is_not_ui_implementation(self):
        payload = {
            'tool_name': 'Write',
            'tool_input': {
                'file_path': 'sprint-md/plan.md',
                'content': 'Inventory frontend/src/components before implementation',
            },
        }
        self.assertEqual(route_ui(payload), (False, None))

    def test_read_is_not_ui_implementation(self):
        payload = {'tool_name': 'Read', 'tool_input': {'file_path': 'frontend/src/Feed.tsx'}}
        self.assertEqual(route_ui(payload), (False, None))


if __name__ == '__main__':
    unittest.main()
