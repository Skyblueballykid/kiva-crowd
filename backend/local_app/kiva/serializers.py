from rest_framework import serializers
from .models import Lender, Loan

class LenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lender
        fields = (
            'permanent_name',
            'display_name',
            'city',
            'state',
            'country_code',
            'member_since',
            'personal_url',
            'occupation',
            'loan_because',
            'other_info',
            'loan_purchase_num',
            'invited_by',
            'num_invited',
        )

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = (
            'id',
            'loan_name',
            'original_language',
            'description',
            'description_translated',
            'funded_amount',
            'loan_amount',
            'status',
            'activity_name',
            'sector_name',
            'loan_use',
            'country_name',
            'town_name',
            'currency',
            'partner_id',
            'posted_time',
            'planned_expiration_time',
            'disburse_time',
            'raised_time',
            'lender_term',
            'num_lenders_total',
            'tags',
            'borrower_names',
            'borrower_genders',
            'repayment_interval',
            'distribution_model'
        )