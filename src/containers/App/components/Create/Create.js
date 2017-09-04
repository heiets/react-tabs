import React, {Component} from 'react'

export default class Create extends Component {
    componentWillMount() {
        // const { loadData } = this.props;
        // loadData();
    }
    applyTable = () => {
        const {  applyTable } = this.props;
        applyTable(this.refs.rows.value, this.refs.cols.value)
    };
    render() {
        return (
            <div>
                <input type="text" ref="rows" placeholder="rows"/>
                X
                <input type="text" ref="cols" placeholder="cols"/>
                <button onClick={this.applyTable}>Apply</button>
            </div>
        )
    }
}
