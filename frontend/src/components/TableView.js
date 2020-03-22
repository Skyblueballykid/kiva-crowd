import React, { Component } from 'react';
import { Table } from 'reactstrap';
import LoanApi from '../api/LoanApi';
import Navigation from './Navigation';


class TableView extends Component {
    state = {
        loans: []
    };

    componentDidMount() {
        LoanApi.getLoans().then(
            (data) => {
                this.setState(
                    {
                        loans: data
                    }
                )
            }
        );
    }

    render() {
        return (
            <div class="container-fluid">
                <Navigation/>
                <Table size="sm" striped hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>loan_name</th>
                            <th>loan_amount</th>
                            <th>status</th>
                            <th>loan_use</th>
                            <th>sector_name</th>
                            <th>country_name</th>
                            <th>currency</th>
                            <th>posted_time</th>
                            <th>raised_time</th>
                            <th>lender_term</th>
                            <th>num_lenders_total</th>
                            <th>repayment_interval</th>
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

export default TableView;
