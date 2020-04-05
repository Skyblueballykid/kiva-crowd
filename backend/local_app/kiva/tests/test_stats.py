from rest_framework.test import APITestCase
from rest_framework import status

from ..models import Loan, Lender


class TestLoanStats(APITestCase):
    def setUp(self):
        Loan.objects.create(
            id=12,
            loan_amount=100,
            funded_amount=50,
            posted_time='2020-03-05 22:06:49.000+0000',
            planned_expiration_time='2020-03-05 22:06:49.000+0000',
            disburse_time='2020-03-05 22:06:49.000+0000',
            raised_time='2020-03-05 22:06:49.000+0000',
            num_lenders_total=7
        )
        Loan.objects.create(
            id=11,
            loan_amount=10,
            funded_amount=75,
            posted_time='2020-03-05 22:06:49.000+0000',
            planned_expiration_time='2020-03-07 22:06:49.000+0000',
            disburse_time='2020-03-05 22:06:49.000+0000',
            raised_time='2020-03-05 22:06:49.000+0000',
            num_lenders_total=10
        )

    def test_get_all_lenders(self):
        response = self.client.get('/api/statistics/all_lenders')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestLenderStats(APITestCase):
    def setUp(self):
        Lender.objects.create(
            permanent_name='Test Testerton',
            member_since='2020-03-07 22:06:49.000+0000',
            loan_purchase_num=8,
            num_invited=10
        )
        Lender.objects.create(
            permanent_name='Test Lender',
            member_since='2020-03-07 22:06:49.000+0000',
            loan_purchase_num=10,
            num_invited=10
        )

    def test_get_all_loans(self):
        response = self.client.get('/api/statistics/all_loans')
        self.assertEqual(response.status_code, status.HTTP_200_OK)