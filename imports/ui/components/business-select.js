import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';

import { Businesses } from '../../api/businesses/businesses.js';

export default class BusinessSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      businesses: [
        {
          "value": "Joey",
          "label": "Joey"
        }, {
          "value": "AirBnB",
          "label": "AirBnB"
        }
      ],
      category: '',
      value: this.props.value,
      disabled: this.props.disabled
    }
  }

  render() {
    const options = this.state.businesses;
    return (
      <div>
        <Select
          placeholder="Business Name..."
          name="business-select"
          options={options}
          onChange={this.props.onChange}
          value={this.props.value}
          allowCreate={true}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}

BusinessSelect.defaultProps = {
  placeholder: "Add category"
};
