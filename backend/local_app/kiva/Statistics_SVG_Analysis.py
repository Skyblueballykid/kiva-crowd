from rest_framework import generics
from django_filters import rest_framework as filters
from django.core import serializers
from django.contrib.postgres.search import SearchVector
from django.db import transaction
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


# Adding these for Panda + Numpy analysis 
from django_pandas.io import read_frame
from rest_framework.views import APIView
from rest_framework.response import Response



from .models import Lender, Loan, LoanStatsAvgLoanByCountry, LoanStatsCommonSectorsAndActivities,\
    LoanStatsAvgLendersGroupedBySectorAndActivity

# ANALYSIS FOR SVG IMAGES
# Possibility for using Data Frames from Pandas in our analysis instead of only using SQL Queries
data = Loan.objects.all()        # Perform database query
a = read_frame(data, fieldnames=['raised_time','country_name','loan_amount', 'sector_name'])           # Transform queryset into pandas dataframe 
a.columns = map(lambda x: str(x).upper(), a.columns)
print(a)




df = a

df = df[['COUNTRY_NAME','LOAN_AMOUNT']]
df = df.dropna()
df = df.set_index('COUNTRY_NAME')
df = df.groupby([df.index]).sum().sort_values(by = 'LOAN_AMOUNT', ascending=False ).head(10)


objects = tuple(list(df.index))
y_pos = np.arange(len(objects))
performance = list(df['LOAN_AMOUNT'])

plt.bar(y_pos, performance, align='center', alpha=0.5)
plt.xticks(y_pos, objects, rotation = 45)
plt.ylabel('Loan Amount')
plt.xlabel('Countries')
plt.title('Countries with most loans')


plt.savefig("TOP_5_COUNTRY_LOANS_BAR.svg", format="svg")




df = df.head(5)
df = list(df.index)
top_5_countries = df


# Now get charts for loans raised over time for the top 5 countries-------------

df = a[['RAISED_TIME','COUNTRY_NAME','LOAN_AMOUNT']]
df = df.dropna()
# Group by months
df['RAISED_TIME'] = df['RAISED_TIME'].astype(str).str[0:8] + '01'
df = df.set_index('RAISED_TIME')

# Create figure and plot space
fig, ax = plt.subplots(nrows = 5, ncols = 1, figsize=(10, 10))
color_list = ['orange','blue','red','green','yellow']
flag = 0 
for i in top_5_countries:
    
    df = df[ df['COUNTRY_NAME'] == i ]
    df =  df.groupby([df.index]).sum()
    df = df.sort_index(axis =0)
    df.index = pd.to_datetime(df.index)

    ax[flag].plot(df.index.values,
        df['LOAN_AMOUNT'],
        color=color_list[flag])
    
    ax[flag].set(xlabel="Date",
       ylabel="Loan Amount",
       title="{0} loans over time".format(top_5_countries[flag]))
    
    flag = flag+1
    df = a[['RAISED_TIME','COUNTRY_NAME','LOAN_AMOUNT']].dropna()
    # Group by months
    df['RAISED_TIME'] = df['RAISED_TIME'].astype(str).str[0:8] + '01'
    df = df.set_index('RAISED_TIME')


plt.tight_layout()

plt.show()


# Plot of Top 5 Countries with most loans--------------
plt.savefig("TOP_5_COUNTRY_LOANS_DETAIL.svg", format="svg")




# Top 5 Sectors with most loans
df = a
df = df[['SECTOR_NAME','LOAN_AMOUNT']]
df = df.dropna()
df = df.set_index('SECTOR_NAME')
df = df.groupby([df.index]).sum().sort_values(by = 'LOAN_AMOUNT', ascending=False ).head(10)


objects = tuple(list(df.index))
y_pos = np.arange(len(objects))
performance = list(df['LOAN_AMOUNT'])

plt.bar(y_pos, performance, align='center', alpha=0.5)
plt.xticks(y_pos, objects, rotation = 45)
plt.ylabel('Loan Amount')
plt.xlabel('Sectors')
plt.title('Sectors with most loans')


plt.savefig("TOP_5_SECTOR_LOANS_BAR.svg", format="svg")




df = df.head(5)
df = list(df.index)
top_5_sectors = df


# Now get charts for loans raised over time for the top 5 sectors-------------

df = a[['RAISED_TIME','SECTOR_NAME','LOAN_AMOUNT']]
df = df.dropna()
# Group by months
df['RAISED_TIME'] = df['RAISED_TIME'].astype(str).str[0:8] + '01'
df = df.set_index('RAISED_TIME')

# Create figure and plot space
fig, ax = plt.subplots(nrows = 5, ncols = 1, figsize=(10, 10))
color_list = ['orange','blue','red','green','yellow']
flag = 0 
for i in top_5_sectors:
    
    df = df[ df['SECTOR_NAME'] == i ]
    df =  df.groupby([df.index]).sum()
    df = df.sort_index(axis =0)
    df.index = pd.to_datetime(df.index)

    ax[flag].plot(df.index.values,
        df['LOAN_AMOUNT'],
        color=color_list[flag])
    
    ax[flag].set(xlabel="Date",
       ylabel="Loan Amount",
       title="{0} loans over time".format(top_5_sectors[flag]))
    
    flag = flag+1
    df = a[['RAISED_TIME','SECTOR_NAME','LOAN_AMOUNT']].dropna()
    # Group by months
    df['RAISED_TIME'] = df['RAISED_TIME'].astype(str).str[0:8] + '01'
    df = df.set_index('RAISED_TIME')



plt.tight_layout()

plt.show()


# Plot of Top 5 Sectors with most loans--------------
plt.savefig("TOP_5_SECTOR_LOANS_DETAIL.svg", format="svg")