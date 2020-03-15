from rest_framework.test import APITestCase
from rest_framework import status

from ..models import Loan, Lender


class TestLoanListApiViewFilters(APITestCase):
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

    def test_filter_by_loan_amount(self):
        response = self.client.get('/api/loan/?loan_amount_gte=100')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['count'], 1)

    def test_filter_by_funded_amount(self):
        response = self.client.get('/api/loan/?funded_amount_lte=60')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['count'], 1)

    def test_filter_by_posted_time(self):
        response = self.client.get("/api/loan/?posted_time_lte=2020-03-05+23:00:59")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['count'], 2)

    def test_filter_by_planned_expiration_time(self):
        response = self.client.get("/api/loan/?planned_expiration_time_gte=2020-03-05+23:00:59")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['count'], 1)

    def test_filter_by_disburse_time(self):
        response = self.client.get("/api/loan/?disburse_time_lte=2020-03-05+23:00:59")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['count'], 2)

    def test_filter_by_raised_time(self):
        response = self.client.get("/api/loan/?raised_time_gte=2020-03-05+23:00:59")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['count'], 0)

    def test_filter_by_num_lenders_total(self):
        response = self.client.get("/api/loan/?num_lenders_total_gte=10")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['count'], 1)


class TestLenderListApiViewFilters(APITestCase):
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

    def test_filter_by_member_since(self):
        response = self.client.get("/api/lender/?member_since_lte=2020-03-05+23:00:59")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['count'], 0)

    def test_filter_by_loan_purchase_num(self):
        response = self.client.get('/api/lender/?loan_purchase_num_gte=10')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['count'], 1)
