import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';

import { Businesses } from '../../api/businesses/businesses.js';

export default class BusinessSelect extends Component {
  constructor(props) {
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
      ]
    }
  }

  render() {
    const options = this.state.businesses;
    return (
      <div>
        <Select
          placeholder={this.props.placeholder}
          name={this.props.name}
          options={options}
          onChange={this.props.onChange}
          value={this.props.value}
          multi={this.props.multi}
          disabled={this.props.disabled}
          simpleValue={true}
          allowCreate={true}
        />
      </div>
    )
  }
}

BusinessSelect.defaultProps = {
  placeholder: "Add business",
  selected: '',
  name  : "business-select",
  disabled  : false,
  multi : false 
};