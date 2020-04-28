import { format } from 'date-fns';

const COLUMNS = [
    {
        title: 'Permanent Name',
        dataIndex: 'permanent_name',
        width: '8%',
        editable: false,
    },
    {
        title: 'Display Name',
        dataIndex: 'display_name',
        width: '8%',
        editable: true,
    },
    {
        title: 'City',
        dataIndex: 'city',
        width: '5%',
        editable: true,
    },
    {
        title: 'State',
        dataIndex: 'state',
        width: '5%',
        editable: true,
    },
    {
        title: 'Country Code',
        dataIndex: 'country_code',
        width: '5%',
        editable: true,
    },
    {
        title: 'Member Since',
        dataIndex: 'member_since',
        width: '8%',
        editable: true,
        render: (date) => format(new Date(date), 'MM/dd/yyyy')
    },
    {
        title: 'Personal URL',
        dataIndex: 'personal_url',
        width: '8%',
        editable: true,
    },
    {
        title: 'Occupation',
        dataIndex: 'occupation',
        width: '5%',
        editable: true,
    },
    {
        title: 'Loan Reason',
        dataIndex: 'loan_because',
        width: '12%',
        editable: true,
    },
    {
        title: 'Other Info',
        dataIndex: 'other_info',
        width: '12%',
        editable: true,
    },
    {
        title: 'Loan Purchase Number',
        dataIndex: 'loan_purchase_num',
        width: '5%',
        editable: true,
    },
    {
        title: 'Invited By',
        dataIndex: 'invited_by',
        width: '5%',
        editable: true,
    },
    {
        title: 'Number Invited',
        dataIndex: 'num_invited',
        width: '5%',
        editable: true,
    }
];

export default COLUMNS;