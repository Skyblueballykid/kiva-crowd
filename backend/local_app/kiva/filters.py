import django_filters

from .models import Loan, Lender


class LoanFilter(django_filters.FilterSet):
    loan_amount_gte = django_filters.NumberFilter(field_name='loan_amount', lookup_expr='gte')
    loan_amount_lte = django_filters.NumberFilter(field_name='loan_amount', lookup_expr='lte')

    funded_amount_gte = django_filters.NumberFilter(field_name='funded_amount', lookup_expr='gte')
    funded_amount_lte = django_filters.NumberFilter(field_name='funded_amount', lookup_expr='lte')

    posted_time_gte = django_filters.DateTimeFilter(field_name='posted_time', lookup_expr='gte')
    posted_time_lte = django_filters.DateTimeFilter(field_name='posted_time', lookup_expr='lte')

    planned_expiration_time_gte = django_filters.DateTimeFilter(field_name='planned_expiration_time', lookup_expr='gte')
    planned_expiration_time_lte = django_filters.DateTimeFilter(field_name='planned_expiration_time', lookup_expr='lte')

    disburse_time_gte = django_filters.DateTimeFilter(field_name='disburse_time', lookup_expr='gte')
    disburse_time_lte = django_filters.DateTimeFilter(field_name='disburse_time', lookup_expr='lte')

    raised_time_gte = django_filters.DateTimeFilter(field_name='raised_time', lookup_expr='gte')
    raised_time_lte = django_filters.DateTimeFilter(field_name='raised_time', lookup_expr='lte')

    num_lenders_total_gte = django_filters.NumberFilter(field_name='num_lenders_total', lookup_expr='gte')
    num_lenders_total_lte = django_filters.NumberFilter(field_name='num_lenders_total', lookup_expr='lte')

    class Meta:
        model = Loan
        fields = [
            'loan_amount',
            'loan_name',
            'funded_amount',
            'status',
            'activity_name',
            'sector_name',
            'posted_time',
            'planned_expiration_time',
            'disburse_time',
            'raised_time',
            'lender_term',
            'num_lenders_total'
        ]


class LenderFilter(django_filters.FilterSet):
    member_since_gte = django_filters.DateTimeFilter(field_name='member_since', lookup_expr='gte')
    member_since_lte = django_filters.DateTimeFilter(field_name='member_since', lookup_expr='lte')

    loan_purchase_num_gte = django_filters.NumberFilter(field_name='loan_purchase_num', lookup_expr='gte')
    loan_purchase_num_lte = django_filters.NumberFilter(field_name='loan_purchase_num', lookup_expr='lte')

    class Meta:
        model = Lender
        fields = [
            'city',
            'state',
            'country_code',
            'occupation',
            'member_since',
            'loan_purchase_num'
        ]


class LoanSearchFilter(django_filters.FilterSet):
    # This is only added here so that the swagger docs will pickup the filter
    search = django_filters.CharFilter()
