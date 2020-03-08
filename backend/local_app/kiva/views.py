from rest_framework import generics

from .models import Lender, Loan
from .serializers import LenderSerializer, LoanSerializer

class LenderList(generics.ListAPIView):
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer


class LenderDetail(generics.RetrieveAPIView):
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer

class LoanList(generics.ListAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

class LoanDetail(generics.RetrieveAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer