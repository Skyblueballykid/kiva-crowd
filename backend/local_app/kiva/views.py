from rest_framework import generics
from django_filters import rest_framework as filters
from django.core import serializers

from .models import Lender, Loan
from .serializers import LenderSerializer, LoanSerializer
from .filters import LoanFilter, LenderFilter
from .statistics import Insights_sql


class LenderList(generics.ListCreateAPIView):
    '''GET all Lenders and POST endpoint
    SQL Equivalents: 
    SELECT * from Lenders
    AND
    INSERT INTO Lenders...    
    '''
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LenderFilter


class LenderDetail(generics.RetrieveUpdateDestroyAPIView):
    '''CRUD Lenders endpoint
    SQL Equivalents:
    SELECT * FROM Lenders WHERE primary_name = ...
    AND
    UPDATE Lenders WHERE primary_name=... SET fields= ...
    AND
    DELETE * FROM Lenders WHERE primary_name = ...
    '''
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer


class LoanList(generics.ListCreateAPIView):
    '''GET all Loans and POST endpoint
    SQL Equivalents: 
    SELECT * from Loans
    AND
    INSERT INTO Loans...    
    '''
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LoanFilter


class LoanDetail(generics.RetrieveUpdateDestroyAPIView):
    '''CRUD Loan endpoint
    SQL Equivalents:
    SELECT * FROM Loans WHERE loan_id = ...
    AND
    UPDATE Loans WHERE loan_id=... SET fields= ...
    AND
    DELETE * FROM Loans WHERE loan_id = ...
    
    
    '''
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer



class Stats_1List(generics.ListAPIView):
    '''Average Loan Price per country sorted in descending order'''
    Stats = Insights_sql()
    query = Stats.get_average_loan_per_country()
    queryset = Loan.objects.raw(query)
    serializer_class = LoanSerializer


class Stats_2List(generics.ListAPIView):
    '''Most common sectors and activities for loan use'''
    Stats = Insights_sql()
    query = Stats.get_loan_sector_info()
    queryset = Loan.objects.raw(query)
    serializer_class = LoanSerializer


class Stats_3List(generics.ListAPIView):
    '''Average numbers of lenders per loan grouped by sector and activity'''
    Stats = Insights_sql()
    query = Stats.get_lenders_per_loan_by_activity()
    queryset = Loan.objects.raw(query)
    serializer_class = LoanSerializer
