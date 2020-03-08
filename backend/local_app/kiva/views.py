from rest_framework import generics

from .models import Lender, Loan
from .serializers import LoanSerializer


class LoanList(generics.ListAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer


class LoanDetail(generics.RetrieveAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer