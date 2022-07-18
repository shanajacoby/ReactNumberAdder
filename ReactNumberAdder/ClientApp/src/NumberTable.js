import React from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import NumberRow from './NumberRow';
import SelectedRow from './SelectedRow';


class NumberTable extends React.Component {
    state = {
        number: { id: uuidv4(), value: 0 },
        numbers: [],
        selectedNumbers: [],
        lockedNumbers: []
    }

    getRandomInt = () => {
        let min = 1;
        let max = 1000;
        min = Math.ceil(1);
        max = Math.floor(1000);
        return Math.floor(Math.random() * (max - min) + min);

    };
    onAddClick = () => {
       const number = { id:uuidv4(), value:this.getRandomInt() };
       const newState = produce(this.state, draftState => {
            draftState.numbers.push(number);
        });
        this.setState(newState);
    }
    onSelectClick = n => {
        const newState = produce(this.state, draftState => {
            draftState.selectedNumbers.push(n);
        });
        this.setState(newState);
    }
    onUnselectClick = n => {
        const selectedNumbers = this.state.selectedNumbers.filter(num => n.id !== num.id);
        this.setState({ selectedNumbers });
    }
    isSelected = n => {
        const { selectedNumbers } = this.state;
        return selectedNumbers.some(s => s.id === n.id);
    }
    onLockClick = n => {
        const newState = produce(this.state, draftState => {
            draftState.lockedNumbers.push(n);
        });
        this.setState(newState);
    }
    onUnlockClick = n => {
        const lockedNumbers = this.state.lockedNumbers.filter(num => n.id !== num.id);
        this.setState({ lockedNumbers });
    }

    isLocked = n => {
        const { lockedNumbers } = this.state;
        return lockedNumbers.some(s => s.id === n.id);
    }


    render() {
        const { numbers, selectedNumbers} = this.state;
        return (
            <><div classname='container mt-5'>
                <div classname='row'>
                    <div classname='col-md-12'>
                        <button className="btn btn-success btn-lg btn-block" onClick={this.onAddClick}>Add</button>
                    </div>
                </div>
            </div><table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Add/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {numbers.map((n, i) => {
                            return <NumberRow
                                number={n}
                                onSelectClick={() => this.onSelectClick(n)}
                                onUnselectClick={() => this.onUnselectClick(n)}
                                isLocked={this.isLocked(n)}
                                isSelected={this.isSelected(n)}
                                key={i} />
                        })
                        }
                    </tbody>
                </table>

                <div className="row jumbotron">
                    <div className="col-md-6 col-md-offset-3">
                        <h3>Selected Numbers</h3>
                        <ul className="list-group">
                            {selectedNumbers.map((n, i) => {
                                return <SelectedRow
                                    onLockClick={() => this.onLockClick(n)}
                                    onUnlockClick={() => this.onUnlockClick(n)}
                                    number={n}
                                    isLocked={this.isLocked(n)}
                                    key={i} />
                            })
                            }
                        </ul>
                    </div>
                </div>
            </>


        );
    }

    
}

export default NumberTable;