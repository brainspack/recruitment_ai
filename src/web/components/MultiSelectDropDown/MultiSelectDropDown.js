import React, { useState } from 'react'
import { Multiselect } from 'multiselect-react-dropdown'

function MultiSelectDropDown(props) {
    const [selectedValue, setSelectedValue] = useState([]);
    return (
        <div className="formField">
            <Multiselect
                options={props.options} // Options to display in the dropdown
                onSelect={props.onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                onRemove={props.onSelect}
                showCheckbox={true}
                displayValue="full_name"
                closeOnSelect={false}
                loading={props.loading}
            />
        </div>
    )
}

export default MultiSelectDropDown
