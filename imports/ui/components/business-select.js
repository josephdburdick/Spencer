import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';

export default class BusinessSelect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Select
          placeholder={this.props.placeholder}
          name={this.props.name}
          options={this.props.businesses}
          onChange={this.props.onChange}
          value={this.props.value}
          multi={this.props.multi}
          disabled={this.props.disabled}
          simpleValue={true}
          allowCreate={true}
          newOptionCreator= {this.props.newOptionCreator}
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

BusinessSelect.propTypes = {
    businesses       : React.PropTypes.array,
    newOptionCreator : React.PropTypes.func,
}
