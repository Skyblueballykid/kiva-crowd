from rest_framework import generics
from django_filters import rest_framework as filters
from django.core import serializers
from django.contrib.postgres.search import SearchVector
from django.db import transaction
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


# Adding these for Panda + Numpy analysis 
from django_pandas.io import read_frame
from rest_framework.views import APIView
from rest_framework.response import Response



from .models import Lender, Loan, LoanStatsAvgLoanByCountry, LoanStatsCommonSectorsAndActivities,\
    LoanStatsAvgLendersGroupedBySectorAndActivity
from .serializers import LenderSerializer, LoanSerializer, LoanStatsAvgLoanByCountrySerializer,\
    LoanStatsCommonSectorsAndActivitiesSerializer, LoanStatsAvgLendersGroupedBySectorAndActivitySerializer
from .filters import LoanFilter, LenderFilter, LoanSearchFilter
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
    Note: django uses transactions by default to guarantee integrity of orm operations. Using transaction.atomic() below
    guarantees that the database changes are only committed if the entire http request succeeds (see
    https://docs.djangoproject.com/en/3.0/topics/db/transactions/#tying-transactions-to-http-requests)
    '''
    with transaction.atomic():
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


class LoanListSearch(generics.ListAPIView):
    serializer_class = LoanSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LoanSearchFilter

    def get_queryset(self):
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = Loan.objects.annotate(search=SearchVector('description_translated')).filter(search=search)
        else:
            queryset = Loan.objects.all()
        return queryset


class LoanDetail(generics.RetrieveUpdateDestroyAPIView):
    '''CRUD Loan endpoint
    SQL Equivalents:
    SELECT * FROM Loans WHERE loan_id = ...
    AND
    UPDATE Loans WHERE loan_id=... SET fields= ...
    AND
    DELETE * FROM Loans WHERE loan_id = ...
    Note: django uses transactions by default to guarantee integrity of orm operations. Using transaction.atomic() below
    guarantees that the database changes are only committed if the entire http request succeeds (see
    https://docs.djangoproject.com/en/3.0/topics/db/transactions/#tying-transactions-to-http-requests)
    '''
    with transaction.atomic():
        queryset = Loan.objects.all()
        serializer_class = LoanSerializer


class Stats_1List(generics.ListAPIView):
    '''Average Loan Price per country sorted in descending order'''
    Stats = Insights_sql()
    query = Stats.get_average_loan_per_country()
    queryset = LoanStatsAvgLoanByCountry.objects.raw(query)
    serializer_class = LoanStatsAvgLoanByCountrySerializer


class Stats_2List(generics.ListAPIView):
    '''Most common sectors and activities for loan use'''
    Stats = Insights_sql()
    query = Stats.get_loan_sector_info()
    queryset = LoanStatsCommonSectorsAndActivities.objects.raw(query)
    serializer_class = LoanStatsCommonSectorsAndActivitiesSerializer


class Stats_3List(generics.ListAPIView):
    '''Average numbers of lenders per loan grouped by sector and activity'''
    Stats = Insights_sql()
    query = Stats.get_lenders_per_loan_by_activity()
    queryset = LoanStatsAvgLendersGroupedBySectorAndActivity.objects.raw(query)
    serializer_class = LoanStatsAvgLendersGroupedBySectorAndActivitySerializer


# Top 10 Countries with Loans
class Stats_4List(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = Loan.objects.all()        # Perform database query
        a = read_frame(data, fieldnames=['raised_time','country_name','loan_amount', 'sector_name'])           # Transform queryset into pandas dataframe 
        a.columns = map(lambda x: str(x).upper(), a.columns)
        #Top 5 Countries with most loans-------------- 
        df = a
        df = df[['COUNTRY_NAME','LOAN_AMOUNT']]
        df = df.dropna()
        df = df.set_index('COUNTRY_NAME')
        df = df.groupby([df.index]).sum().sort_values(by = 'LOAN_AMOUNT', ascending=False ).head(10)
        df.reset_index(level=0, inplace=True)
        return Response(df)              # Return the result in JSON via Django REST Framework
    


# Top 10 Sectors with Loans
class Stats_5List(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = Loan.objects.all()        # Perform database query
        a = read_frame(data, fieldnames=['raised_time','country_name','loan_amount', 'sector_name'])           # Transform queryset into pandas dataframe 
        a.columns = map(lambda x: str(x).upper(), a.columns)
        #Top 5 Countries with most loans-------------- 
        df = a
        df = df[['SECTOR_NAME','LOAN_AMOUNT']]
        df = df.dropna()
        df = df.set_index('SECTOR_NAME')
        df = df.groupby([df.index]).sum().sort_values(by = 'LOAN_AMOUNT', ascending=False ).head(10)
        df.reset_index(level=0, inplace=True)
        return Response(df)              # Return the result in JSON via Django REST Framework