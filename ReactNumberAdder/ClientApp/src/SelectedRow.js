import React from 'react';

class SelectedRow extends React.Component {
    render() {
        const { id, value } = this.props.number;
        const { onLockClick, onUnlockClick, isLocked } = this.props;
        
        return (
            <li className='list-group-item'>{value}
                
                    <button className={`btn btn-primary`} onClick={isLocked ? onUnlockClick : onLockClick}>
                        {isLocked ? 'Unlock' : 'Lock'}
                    </button>
            </li>
        )

    }
}



export default SelectedRow;