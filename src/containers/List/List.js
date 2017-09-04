import React, {Component} from 'react'

export default class List extends Component {
    componentWillMount() {
        // const { loadData } = this.props;
        // loadData();
    }

    render() {
        const filteredResult = this.props.table.filteredResult;
        const tableToShow = Object.keys(filteredResult).map((keysRows, indexRow) => (
            <tr key={`row__${indexRow}`}>
                {
                    Object.keys(filteredResult[keysRows]).map((keysColls, indexColl) => (
                        <td key={`row__${indexColl}`}>
                            { filteredResult[keysRows][keysColls] }
                        </td>
                    ))
                }
            </tr>
        ));
        return (
            <div className="list">
                {
                    tableToShow.length === 0
                        ?
                        <div style={{'textAlign': 'center'}}>No table here. Create one!</div>
                        :
                        <table>
                            <tbody>
                                { tableToShow }
                            </tbody>
                        </table>
                    }
            </div>)
    }
}
