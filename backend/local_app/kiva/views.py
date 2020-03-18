from rest_framework import generics
from django_filters import rest_framework as filters

from .models import Lender, Loan
from .serializers import LenderSerializer, LoanSerializer
from .filters import LoanFilter, LenderFilter


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
