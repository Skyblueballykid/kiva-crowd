from django.db import connection, models


class Insights_sql(object):
    '''
    1. Loan Insight: Average Loan Price per country sorted in descending order

    Note: this query uses view avg_loan_per_country created with the following query:
    create view avg_loan_per_country as
    select
        1 as id,
        trunc(avg(loan_amount)) as average_loan,
        country_code
    from loan
    group by country_code
    order by avg(loan_amount) desc;
    '''
    def get_average_loan_per_country(self):
        query = 'select * from avg_loan_per_country'
        return query

    '''
    2. Insights on Loans and Lenders : Most common sectors and activities for loan use
    Note: this query uses a stored procedure (in postgresql this is a function) created with the following query:
    create or replace function get_common_sectors_and_activities()
    returns table(
        id int,
        sector_name text,
        activity_name varchar,
        average_lender_term_in_months numeric,
        count_of_loans bigint,
        average_loan double precision
    )
    as $$
    begin
        return query
        select
            1 as id,
            l.sector_name,
            l.activity_name,
            trunc(avg(l.lender_term)) as average_lender_term_in_months,
            count(l.sector_name) as count_of_loans,
            trunc(avg(l.loan_amount)) as average_loan
        from loan l
        group by l.sector_name, l.activity_name
        order by count(l.sector_name) desc;
    end
    $$
    language 'plpgsql';
    '''
    def get_loan_sector_info(self):
        query = 'select * from get_common_sectors_and_activities()'
        return query

    '''
    3. Insights on Loans and Lenders: Average numbers of lenders per loan grouped by sector and activity
    '''
    def get_lenders_per_loan_by_activity(self):
        query = """
            select
                1 as id,
                trunc(avg(a.count_of_lenders)) as average_lenders_per_loan,
                b.sector_name,
                b.activity_name
            from (
                SELECT
                    loan_id,
                    LENGTH(lenders) - LENGTH(REPLACE(lenders, ' \\', '\\')) + 1 as count_of_lenders
                FROM loan_lender
                order by count_of_lenders desc
            ) a
            inner join loan b on a.loan_id = b.id
            group by b.sector_name, b.activity_name
            order by average_lenders_per_loan desc
        """
        return query



