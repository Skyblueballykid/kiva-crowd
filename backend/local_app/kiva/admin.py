from django.contrib import admin
from .models import Lender, LoanLender, Loan

# Register your models here.
admin.site.register(Lender)
admin.site.register(LoanLender)
admin.site.register(Loan)
