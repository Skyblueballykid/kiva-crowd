import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Navigation from './Navigation';

class StatisticsView extends Component {
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
            </div>
        );
    }
}

export default StatisticsView;
