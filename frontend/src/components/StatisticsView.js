import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Toast, ToastBody, ToastHeader } from 'reactstrap';
import Navigation from './Navigation';
import StatsApi from '../api/StatsApi';

class StatisticsView extends Component {
  state = {
    loans: [],
    lenders: []
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: true
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidMount() {
    StatsApi.getAllLoans().then(
      (data) => {
        if (data && data.length > 0) {
          this.setState(
            {
              loans: data.length
            }
          );
        }
      }
    );
    StatsApi.getAllLenders().then(
      (data) => {
        if (data && data.length > 0) {
          this.setState(
            {
              lenders: data.length
            }
          );
        }
      }
    );
  }


  render() {
    return (
      <div>
        <div class="container-fluid">
          <Navigation />
        </div>
        <div>
          <Dropdown isOpen={this.state.dropdownOpen} size="lg" toggle={this.toggle}>
            <DropdownToggle caret>
              Statistics Menu
        </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select Statistic</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Statistic 1</DropdownItem>
              <DropdownItem>Statistic 2</DropdownItem>
              <DropdownItem>Statistic 3</DropdownItem>
              <DropdownItem>Statistic 4</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="p-3 my-2 rounded">
          <br></br>
          <br></br>
          <Toast>
            <ToastHeader>
              Loan Count
          </ToastHeader>
            <ToastBody>
            {
              this.state.loans
            }
          </ToastBody>
          </Toast>
        </div>

        <div className="p-3 my-2 rounded">
          <br></br>
          <br></br>
          <Toast>
            <ToastHeader>
              Lender Count
          </ToastHeader>
            <ToastBody>
              {
                this.state.lenders
              }
          </ToastBody>
          </Toast>
        </div>

      </div>
          );
        }
      }
      
      export default StatisticsView;
