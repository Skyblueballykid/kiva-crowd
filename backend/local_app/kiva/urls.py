from django.urls import path

from .views import LenderList, LenderDetail, LoanList, LoanDetail, LoanStatisticsList, LenderStatisticsList


urlpatterns = [
    path('lender/', LenderList.as_view()),
    path('lender/<slug:pk>/', LenderDetail.as_view()),
    path('loan/', LoanList.as_view()),
    path('loan/<slug:pk>/', LoanDetail.as_view()),
    path('statistics/loanstats', LoanStatisticsList.as_view()),
    path('statistics/lenderstats', LenderStatisticsList.as_view())
]