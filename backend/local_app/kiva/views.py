from rest_framework import generics
from django_filters import rest_framework as filters
from django.core import serializers

from .models import Lender, Loan
from .serializers import LenderSerializer, LoanSerializer
from .filters import LoanFilter, LenderFilter
from .statistics import LoanStats, LenderStats


class LenderList(generics.ListAPIView):
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LenderFilter


class LenderDetail(generics.RetrieveAPIView):
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer


class LoanList(generics.ListAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LoanFilter


class LoanDetail(generics.RetrieveAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

class LoanStatisticsList(generics.ListAPIView):
    LoanStats = LoanStats()
    query = LoanStats.get_all_loans()
    queryset = Loan.objects.raw(query)
    serializer_class = LoanSerializer

class LenderStatisticsList(generics.ListAPIView):
    LenderStats = LenderStats()
    query = LenderStats.get_all_lenders()
    queryset = Lender.objects.raw(query)
    serializer_class = LenderSerializer



