import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '../List/List';
import Create from './components/Create/Create';
import * as actions from './actions';
import selectors from './selectors';

class App extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     data: []
        // };
    }
    // setSearchValue = () => (value) => {
    //     this.setState({ searchValue: value });
    // };
    render() {
      // const {  search, loadData } = this.props;
      return <div>
        <div className="body__wrap">
            <Create applyTable={ this.props.applyTable }/>
            <List table={ this.props.table }/>
        </div>
      </div>
    }
}

export default connect(selectors, actions)(App);