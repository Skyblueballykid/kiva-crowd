from django.db import models


# Create your models here.
class Lender(models.Model):
    permanent_name = models.CharField(max_length=50, primary_key=True)
    display_name = models.CharField(max_length=100)
    main_pic_id = models.CharField(max_length=50, blank=True, null=True)
    city = models.TextField(blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    country_code = models.CharField(max_length=2, blank=True, null=True)
    member_since = models.DateTimeField(blank=True, null=True)
    personal_url = models.CharField(max_length=300, blank=True, null=True)
    occupation = models.CharField(max_length=200, blank=True, null=True)
    loan_because = models.TextField(blank=True, null=True)
    other_info = models.TextField(blank=True, null=True)
    loan_purchase_num = models.IntegerField()
    invited_by = models.CharField(max_length=50, blank=True, null=True)
    num_invited = models.IntegerField()

    def __str__(self):
        output = "permanent_name: {}, display_name: {}".format(
            self.permanent_name, self.display_name
        )
        return output

    class Meta:
        db_table = 'lender'


class LoanLender(models.Model):
    loan_id = models.CharField(max_length=10, primary_key=True)
    lenders = models.TextField(blank=True, null=True)

    def __str__(self):
        output = "loan_id: {}".format(self.loan_id)
        return output

    class Meta:
        db_table = 'loan_lender'


class Loan(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    loan_name = models.CharField(max_length=200)
    original_language = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    description_translated = models.TextField(blank=True, null=True)
    funded_amount = models.FloatField(blank=True, null=True)
    loan_amount = models.FloatField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    image_id = models.CharField(max_length=10, blank=True, null=True)
    video_id = models.CharField(max_length=10, blank=True, null=True)
    activity_name = models.CharField(max_length=200, blank=True, null=True)
    sector_name = models.TextField(blank=True, null=True)
    loan_use = models.CharField(max_length=500, blank=True, null=True)
    country_code = models.CharField(max_length=2, blank=True, null=True)
    country_name = models.TextField(blank=True, null=True)
    town_name = models.TextField(blank=True, null=True)
    currency_policy = models.CharField(max_length=200, blank=True, null=True)
    currency_exchange_coverage_rate = models.FloatField(blank=True, null=True)
    currency = models.CharField(max_length=3, blank=True, null=True)
    partner_id = models.CharField(max_length=10, blank=True, null=True)
    posted_time = models.DateTimeField(blank=True, null=True)
    planned_expiration_time = models.DateTimeField(blank=True, null=True)
    disburse_time = models.DateTimeField(blank=True, null=True)
    raised_time = models.DateTimeField(blank=True, null=True)
    lender_term = models.IntegerField(blank=True, null=True)
    num_lenders_total = models.IntegerField(blank=True, null=True)
    num_journal_entries = models.IntegerField(blank=True, null=True)
    num_bulk_entries = models.IntegerField(blank=True, null=True)
    tags = models.TextField(blank=True, null=True)
    borrower_names = models.TextField(blank=True, null=True)
    borrower_genders = models.TextField(blank=True, null=True)
    borrower_pictured = models.TextField(blank=True, null=True)
    repayment_interval = models.CharField(max_length=50, blank=True, null=True)
    distribution_model = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        output = "id: {}, loan_name: {}".format(
            self.id, self.loan_name
        )
        return output

    class Meta:
        db_table = 'loan'
