from django.db import connection, models


class Insights_sql(object):
    '''
    1. Loan Insight: Average Loan Price per country sorted in descending order
    '''
    
    def get_average_loan_per_country(self):
        query = 'select 1 as id, trunc(avg(loan_amount)) as average_loan, country_name from loan group by country_name order by avg(loan_amount) desc'
        return query

    '''
    2. Insights on Loans and Lenders : Most common sectors and activities for loan use 
    '''
    def get_loan_sector_info(self):
        query = 'select 1 as id,sector_name, activity_name, trunc(avg(lender_term)) as average_lender_term_in_months, count(sector_name) as count_of_loans, trunc(avg(loan_amount)) as average_loan from loan group by sector_name, activity_name order by count(sector_name) desc'
        return query

    '''
    3. Insights on Loans and Lenders: Average numbers of lenders per loan grouped by sector and activity
    '''
    def get_lenders_per_loan_by_activity(self):
        query = "select 1 as id,trunc(avg(a.count_of_lenders)) as average_lenders_per_loan, b.sector_name, b.activity_name from( SELECT loan_id, LENGTH(lenders) - LENGTH(REPLACE(lenders, ' \\', '\\')) + 1 as count_of_lenders FROM loan_lender order by count_of_lenders desc) a inner join loan b on a.loan_id = b.id group by b.sector_name, b.activity_name order by average_lenders_per_loan desc"
        return query



