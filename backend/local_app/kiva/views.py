from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters import rest_framework as filters
from django.core import serializers

from .models import Lender, Loan
from .serializers import LenderSerializer, LoanSerializer
from .filters import LoanFilter, LenderFilter
from .statistics import LoanStats, LenderStats


class LenderList(generics.ListAPIView):
    '''GET all Lenders endpoint'''
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LenderFilter


class LenderDetail(generics.RetrieveUpdateDestroyAPIView):
    '''GET one Lender endpoint'''
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer


class LoanList(generics.ListAPIView):
    '''GET all Loans endpoint'''
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LoanFilter


class LoanDetail(generics.RetrieveUpdateDestroyAPIView):
    '''Get one Loan endpoint'''
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer


# class CreateLoan(APIView):
#     '''POST Loan endpoint'''

#     def post_loan(self, request, format=None):
#         serializer = LoanSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UpdateLoan(APIView):
#     '''PUT Loan endpoint'''

#     def put_loan(self, request, id, format=None):


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



