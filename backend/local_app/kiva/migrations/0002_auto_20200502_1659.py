# Generated by Django 2.2.11 on 2020-05-02 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kiva', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LoanStatsAvgLendersGroupedBySectorAndActivity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('average_lenders_per_loan', models.FloatField()),
                ('sector_name', models.TextField()),
                ('activity_name', models.TextField()),
            ],
            options={
                'db_table': 'loan',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='LoanStatsAvgLoanByCountry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country_name', models.TextField()),
                ('average_loan', models.FloatField()),
            ],
            options={
                'db_table': 'loan',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='LoanStatsCommonSectorsAndActivities',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sector_name', models.TextField()),
                ('activity_name', models.TextField()),
                ('average_lender_term_in_months', models.IntegerField()),
                ('count_of_loans', models.IntegerField()),
                ('average_loan', models.FloatField()),
            ],
            options={
                'db_table': 'loan',
                'managed': False,
            },
        ),
        migrations.AlterField(
            model_name='lender',
            name='loan_purchase_num',
            field=models.IntegerField(db_index=True),
        ),
        migrations.AlterField(
            model_name='lender',
            name='member_since',
            field=models.DateTimeField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='loan',
            name='disburse_time',
            field=models.DateTimeField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='loan',
            name='funded_amount',
            field=models.FloatField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='loan',
            name='loan_amount',
            field=models.FloatField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='loan',
            name='num_lenders_total',
            field=models.IntegerField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='loan',
            name='posted_time',
            field=models.DateTimeField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='loan',
            name='raised_time',
            field=models.DateTimeField(blank=True, db_index=True, null=True),
        ),
    ]