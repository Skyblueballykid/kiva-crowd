import React, { Component } from 'react';
import { Table } from 'reactstrap';
import LenderApi from '../api/LenderApi';
import Navigation from './Navigation';


class LenderTableView extends Component {
    state = {
        lenders: []
    };

    componentDidMount() {
        LenderApi.getlenders().then(
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
                            <th>permanent name</th>
                            <th>display name</th>
                            <th>city</th>
                            <th>state</th>
                            <th>country code</th>
                            <th>member since</th>
                            <th>personal url</th>
                            <th>occupation</th>
                            <th>loan because</th>
                            <th>other info</th>
                            <th>loan purchcase number</th>
                            <th>invited by</th>
                            <th>number invited</th>
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
