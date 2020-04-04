import React, { Component } from 'react';
import { Table } from 'reactstrap';
import LenderApi from '../api/LenderApi';
import Navigation from './Navigation';


class LenderTableView extends Component {
    state = {
        lenders: []
    };

    componentDidMount() {
        LenderApi.getLenders().then(
            (data) => {
                if (data && data.length > 0) {
                    this.setState(
                        {
                            lenders: data
                        }
                    );
                }
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
                            <th>Permanent Name</th>
                            <th>Display Name</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country Code</th>
                            <th>Member Since</th>
                            <th>Personal URL</th>
                            <th>Occupation</th>
                            <th>Loan Because</th>
                            <th>Other Info</th>
                            <th>Loan Purchase Number</th>
                            <th>Invited By</th>
                            <th>Number Invited</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.lenders.map(
                                (lender) => (
                                    <tr key={lender.permanent_name}>
                                        <td>{lender.permanent_name}</td>
                                        <td>{lender.display_name}</td>
                                        <td>{lender.city}</td>
                                        <td>{lender.state}</td>
                                        <td>{lender.country_code}</td>
                                        <td>{lender.member_since}</td>
                                        <td>{lender.personal_url}</td>
                                        <td>{lender.occupation}</td>
                                        <td>{lender.loan_because}</td>
                                        <td>{lender.other_info}</td>
                                        <td>{lender.loan_purchase_num}</td>
                                        <td>{lender.invited_by}</td>
                                        <td>{lender.num_invited}</td>
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

export default LenderTableView;
