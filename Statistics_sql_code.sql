
-- Loan Insight: Average Loan Price per country sorted in descending order
select
  trunc(avg(loan_amount)) as average_loan,
  country_name
from loan
group by
  country_name
order by
  avg(loan_amount) desc

-- Insights on Loans and Lenders : Most common sectors and activities for loan use 
select
  sector_name,
  activity_name,
  trunc(avg(lender_term)) as average_lender_term_in_months,
  count(sector_name) as Count_of_loans,
  trunc(avg(loan_amount)) as Average_loan
from loan
group by
  sector_name,
  activity_name
order by
  count(sector_name) desc



-- Insights on Loans and Lenders: Average numbers of lenders per loan grouped by sector and activity
select
  trunc(avg(a.count_of_lenders)) as average_lenders_per_loan,
  b.sector_name,
  b.activity_name
from (
    SELECT
      loan_id,
      LENGTH(lenders) - LENGTH(REPLACE(lenders, ' ', '')) + 1 as Count_of_lenders
    FROM loan_lender
    order by
      count_of_lenders desc
  ) a
inner join loan b on a.loan_id = b.id
group by
  b.sector_name,
  b.activity_name
  order by average_lenders_per_loan desc