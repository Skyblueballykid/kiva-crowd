import React, { Component } from 'react';
import { Table } from 'reactstrap';
import LoanApi from '../api/LoanApi';
import Navigation from './Navigation';


class LoanTableView extends Component {
    state = {
        loans: []
    };

  componentDidMount() {
    LoanApi.getLoans().then((data) => {
      if (data && data.length > 0) {
        this.setState({
          loans: data
        });
      }
    });
  }

    render() {
        return (
            <div class="container-fluid">
                <Navigation/>
                <Table size="sm" striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Loan Name</th>
                            <th>Loan Amount</th>
                            <th>Status</th>
                            <th>Loan Use</th>
                            <th>Sector Name</th>
                            <th>Country Name</th>
                            <th>Currency</th>
                            <th>Posted Time</th>
                            <th>Raised Time</th>
                            <th>Lender Term</th>
                            <th>Total Lenders</th>
                            <th>Repayment Interval</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.loans.map(
                                (loan) => (
                                    <tr key={loan.id}>
                                        <td>{loan.id}</td>
                                        <td>{loan.loan_name}</td>
                                        <td>{loan.loan_amount}</td>
                                        <td>{loan.status}</td>
                                        <td>{loan.loan_use}</td>
                                        <td>{loan.sector_name}</td>
                                        <td>{loan.country_name}</td>
                                        <td>{loan.currency}</td>
                                        <td>{loan.posted_time}</td>
                                        <td>{loan.raised_time}</td>
                                        <td>{loan.lender_term}</td>
                                        <td>{loan.num_lenders_total}</td>
                                        <td>{loan.repayment_interval}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default LoanTableView;
