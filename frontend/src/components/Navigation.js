import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class Navigation extends Component {
    render() {
        return (
            <div class="mb-5">
              <Navbar color="light" light expand="md">
                  <NavbarBrand href="/table/">kiva-crowd</NavbarBrand>
                  <Nav className="kiva-navbar" navbar>
                    <NavItem>
                      <NavLink href="/table/loans/">Loans Table</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/table/lenders/">Lenders Table</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/search/">Search</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/statistics/">Statistics</NavLink>
                    </NavItem>
                  </Nav>
              </Navbar>
            </div>
          );
    }
}

export default Navigation;
