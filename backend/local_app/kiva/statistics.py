from django.db import connection, models

from .models import Loan, Lender

class LoanStats(object):
    '''Performs the following raw SQL queries on the Loans model:
    1. get_all_loans selects all rows and columns from the Loans table 
    '''
    
    def get_all_loans(self):
        query = 'SELECT * FROM loan LIMIT 100'
        return query


class LenderStats(object):
    '''Performs the following raw SQL queries on the Lenders model:
    1. get_all_lenders selects all rows and columns from the Lenders table
    '''

    def get_all_lenders(self):
        query = 'SELECT * FROM Lender LIMIT 100'
        return query



