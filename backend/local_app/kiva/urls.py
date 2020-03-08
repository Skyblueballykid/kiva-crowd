from django.urls import path

from .views import LenderList, LenderDetail, LoanList, LoanDetail


urlpatterns = [
    path('lender/', LenderList.as_view()),
    path('lender/<slug:pk>/', LenderDetail.as_view()),
    path('loan/', LoanList.as_view()),
    path('loan/<slug:pk>/', LoanDetail.as_view()),
]