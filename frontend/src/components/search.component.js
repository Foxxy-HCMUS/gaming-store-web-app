import React, { Component } from "react";

import { withRouter } from '../common/with-router';

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            searchText: "",
        };
    }

    handleSearch(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    render() {
        return (
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.searchText}
                    onChange={this.handleSearch}
                />
                
                <button className="search-btn" title="search">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        );
    }
}

export default withRouter(Search);