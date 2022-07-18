import React from 'react';

class NumberRow extends React.Component {
    render() {
        const { value, id } = this.props.number;
        const { onSelectClick, onUnselectClick, isLocked, isSelected } = this.props;
        return (
            <tr>
                <td>{value}</td>
                <td>
                    <button className={`btn btn-${isSelected ? 'danger' : 'success'}`} disabled={isLocked} onClick={isSelected ? onUnselectClick : onSelectClick}>
                        {isSelected ? 'Remove from Selected' : 'Add to Selected'} 
                    </button>
                </td>
            </tr>
        )
        
    }
}
export default NumberRow