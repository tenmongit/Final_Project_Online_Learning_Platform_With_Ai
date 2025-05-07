import unittest
from backend.app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_status(self):
        res = self.app.get('/api/status')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.get_json()["status"], "ok")

if __name__ == '__main__':
    unittest.main()
