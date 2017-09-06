import React, {Component} from 'react'

export default class Create extends Component {
    clearActive = () => {
        Array.prototype.forEach.call(document.querySelectorAll('.active'), function (node) {
            node.classList.remove('active');
        } );
    };
    addRow = () => {
        this.props.addRow(this.refs.addRowId.value);
        this.clearActive();
    };
    addCol = () => {
        this.props.addCol(this.refs.addColId.value);
        this.clearActive();
    };
    deleteRow = () => {
        this.props.deleteRow(this.refs.deleteRowId.value);
        this.clearActive();
    };
    deleteCol = () => {
        this.props.deleteCol(this.refs.deleteColId.value);
        this.clearActive();
    };
    merge = () => {
        let selectedArr = [];
        Array.prototype.forEach.call(document.querySelectorAll('.active'), function (node) {
            const coords = `${node.getAttribute('data-rowindex')}.${node.getAttribute('data-colindex')}`;
            selectedArr.push(coords);
        } );
        let firstCoord = selectedArr.sort()[0];
        let stepsDown = 0;
        let stepsRight = 0;
        selectedArr.map(coord => {
            if (+firstCoord.split('.').reverse()[0]+stepsRight+1 === +coord.split('.').reverse()[0] && +firstCoord.split('.')[0] === +coord.split('.')[0]) ++stepsRight;
        });
        selectedArr.map(coord => {
            if (+firstCoord.split('.')[0]+stepsDown+1 === +coord.split('.')[0] && +firstCoord.split('.').reverse()[0] === +coord.split('.').reverse()[0]) ++stepsDown;
        });
        Array.prototype.forEach.call(document.querySelectorAll('.active'), function (node) {
            if (selectedArr.sort()[0].split('.')[0] === node.getAttribute('data-rowindex')
                &&
                selectedArr.sort()[0].split('.').reverse()[0] === node.getAttribute('data-colindex')) {
                node.parentNode.setAttribute('colspan', stepsRight+1);
                node.parentNode.setAttribute('rowspan', stepsDown+1);
            }
            else {
                node.parentNode.style.display='none';
            }
        } );
        this.clearActive();
    };
    split = () => {
        Array.prototype.forEach.call(document.querySelectorAll('td'), function (node) {
            node.style.display = 'table-cell';
            node.setAttribute('colspan', 1);
            node.setAttribute('rowspan', 1);
        } );
    };
    applyTable = () => {
        const {  applyTable } = this.props;
        this.clearActive();
        applyTable(this.refs.rows.value, this.refs.cols.value);
    };
    render() {
        return (
            <div className="controls">
                <div className="controls__size">
                    <div className="inputs">
                        <input type="number" ref="rows" placeholder="Create with rows"/>
                        X
                        <input type="number" ref="cols" placeholder="Create with cols"/>
                    </div>
                    <button onClick={this.applyTable}>Apply</button>
                </div>
                <div className="controls__merge">
                    <button onClick={this.merge}>Merge</button>
                    <button onClick={this.split}>Split</button>
                </div>
                <div className="controls__add">
                    <input type="number" ref="addRowId" placeholder="Add row after"/>
                    <button onClick={this.addRow} disabled={Object.keys(this.props.table).length === 0}>Add row</button>
                    <input type="number" ref="addColId" placeholder="Add col after"/>
                    <button onClick={this.addCol} disabled={Object.keys(this.props.table).length === 0}>Add col</button>
                </div>
                <div className="controls__delete">
                    <input type="number" ref="deleteRowId" placeholder="Delete row from"/>
                    <button onClick={this.deleteRow} disabled={Object.keys(this.props.table).length === 0}>Delete row</button>
                    <input type="number" ref="deleteColId" placeholder="Delete col from"/>
                    <button onClick={this.deleteCol} disabled={Object.keys(this.props.table).length === 0}>Delete col</button>
                </div>
            </div>
        )
    }
}
