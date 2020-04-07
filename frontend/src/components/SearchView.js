import React, { Component } from 'react';
import Navigation from './Navigation';

class SearchView extends Component {
    state = {
        query: '',
        results: []
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
    }

    render() {
        return (

            <div class="container-fluid">
                <Navigation />

                <form>
                    <input
                        placeholder="Search for..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                    <p>{this.state.query}</p>
                </form>

            </div>

        );
    }
}

export default SearchView;
