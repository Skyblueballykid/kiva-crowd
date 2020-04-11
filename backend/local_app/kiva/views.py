from rest_framework import generics
from django_filters import rest_framework as filters
from django.core import serializers

from .models import Lender, Loan
from .serializers import LenderSerializer, LoanSerializer
from .filters import LoanFilter, LenderFilter
from .statistics import LoanStats, LenderStats


class LenderList(generics.ListCreateAPIView):
    '''GET all Lenders and POST endpoint'''
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LenderFilter


class LenderDetail(generics.RetrieveUpdateDestroyAPIView):
    '''CRUD Lender endpoint'''
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer


class LoanList(generics.ListCreateAPIView):
    '''GET all Loans and POST endpoint'''
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LoanFilter


class LoanDetail(generics.RetrieveUpdateDestroyAPIView):
    '''CRUD Loan endpoint'''
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

class LoanStatisticsList(generics.ListAPIView):
    '''Placeholder for Loan statistics endpoint'''
    LoanStats = LoanStats()
    query = LoanStats.get_all_loans()
    queryset = Loan.objects.raw(query)
    serializer_class = LoanSerializer

class LenderStatisticsList(generics.ListAPIView):
    '''Placeholder for Lender statistics endpoint'''
    LenderStats = LenderStats()
    query = LenderStats.get_all_lenders()
    queryset = Lender.objects.raw(query)
    serializer_class = LenderSerializer



