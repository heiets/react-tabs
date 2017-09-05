import React, {Component} from 'react';

export default class List extends Component {
    setActive = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.toggle('active');
    };
    handleChange = (e) => {
        e.preventDefault();
        const { changeTd } = this.props;
        changeTd(e.target.getAttribute('data-rowindex'), e.target.getAttribute('data-colindex') ,e.target.value);
    };
    render() {
        const filteredResult = this.props.table;
        const tableToShow = Object.keys(filteredResult).map((keysRows, indexRow) => (
            <tr key={`row__${indexRow}`}>
                {
                    Object.keys(filteredResult[keysRows]).map((keysColls, indexColl) => (
                            <td key={`row__${indexColl}`}
                                colSpan={filteredResult[keysRows][keysColls].colspan}
                                rowSpan={filteredResult[keysRows][keysColls].rowspan}
                                data-colindex={filteredResult[keysRows][keysColls].colIndex}
                                data-rowindex={filteredResult[keysRows][keysColls].rowIndex}
                                >
                                <input type="text" className="td"
                                       onChange={this.handleChange}
                                       value={ filteredResult[keysRows][keysColls].value }
                                       data-colindex={filteredResult[keysRows][keysColls].colIndex}
                                       data-rowindex={filteredResult[keysRows][keysColls].rowIndex}
                                       onClick={this.setActive}
                                />
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
