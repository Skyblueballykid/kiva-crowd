import { format } from 'date-fns';

const COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '5%',
    editable: false,
  },
  {
    title: 'Loan Name',
    dataIndex: 'loan_name',
    width: '12%',
    editable: true,
  },
  {
    title: 'Loan Amount',
    dataIndex: 'loan_amount',
    width: '8%',
    editable: true,
    render: (amount) => `$ ${amount}`
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '5%',
    editable: true,
  },
  {
    title: 'Loan Use',
    dataIndex: 'loan_use',
    width: '36%',
    editable: true,
  },
  {
    title: 'Sector Name',
    dataIndex: 'sector_name',
    width: '8%',
    editable: true,
  },
  {
    title: 'Country Name',
    dataIndex: 'country_name',
    width: '8%',
    editable: true,
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    width: '5%',
    editable: true,
  },
  {
    title: 'Posted Time',
    dataIndex: 'posted_time',
    width: '7%',
    editable: true,
    render: (date) => format(new Date(date), 'MM/dd/yyyy')
  },
  {
    title: 'Raised Time',
    dataIndex: 'raised_time',
    width: '7%',
    editable: true,
    render: (date) => format(new Date(date), 'MM/dd/yyyy')
  },
  {
    title: 'Lender Term',
    dataIndex: 'lender_term',
    width: '7%',
    editable: true,
  },
  {
    title: 'Total Lenders',
    dataIndex: 'num_lenders_total',
    width: '7%',
    editable: true,
  },
  {
    title: 'Repayment Interval',
    dataIndex: 'repayment_interval',
    width: '7%',
    editable: true,
  }
];

export default COLUMNS;