from rest_framework.test import APITestCase
from rest_framework import status

from ..models import Loan, Lender


class TestLoanStats(APITestCase):


    def test_get_all_lenders(self):
        response = self.client.get('/api/statistics/lenderstats')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TestLenderStats(APITestCase):


    def test_get_all_loans(self):
        response = self.client.get('/api/statistics/loanstats')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
