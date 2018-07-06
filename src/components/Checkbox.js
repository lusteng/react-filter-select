import React from 'react'
import PropTypes from 'prop-types'

//style
import '../assets/css/checkbox.scss'

class Checkbox extends React.Component {
    
    render(){
        return <label className="c-label">
                    <input type="checkbox" readOnly={true} checked={this.props.checked} className="c-checkbox"/>
                    <span className="c-copy-checkbox"></span>
                    <span className="c-text">
                         {this.props.children}
                    </span>
               </label>
    }
}

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired  
}

export default Checkbox