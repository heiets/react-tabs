import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '../List/List';
import Create from './components/Create/Create';
import * as actions from './actions';
import selectors from './selectors';

class App extends Component {
    render() {
      return <div>
        <div className="body__wrap">
            <h1 style={{'textAlign': 'center'}}>Created by Oleksandr Heiets</h1>
            <Create
                applyTable={ this.props.applyTable }
                addRow={ this.props.addRow }
                addCol={ this.props.addCol }
                deleteRow={ this.props.deleteRow }
                deleteCol={ this.props.deleteCol }
                table={ this.props.table }
            />
            <List
                table={ this.props.table }
                changeTd={ this.props.changeTd }
            />
        </div>
      </div>
    }
}

export default connect(selectors, actions)(App);