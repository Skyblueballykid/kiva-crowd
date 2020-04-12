from django.urls import path

from .views import LenderList, LenderDetail, LoanList, LoanDetail, Stats_1List,Stats_2List,Stats_3List


urlpatterns = [
    path('lender/', LenderList.as_view()),
    path('lender/<slug:pk>/', LenderDetail.as_view()),
    path('loan/', LoanList.as_view()),
    path('loan/<slug:pk>/', LoanDetail.as_view()),
    path('statistics/stats_1', Stats_1List.as_view()),
    path('statistics/stats_2', Stats_2List.as_view()),
    path('statistics/stats_3', Stats_3List.as_view())
]