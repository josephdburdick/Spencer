import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';

export default class BusinessSelect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(`inside business select render`);
    return (
      <div>
        <Select
          placeholder={this.props.placeholder}
          name={this.props.name}
          options={this.props.businesses}
          newOptionCreator={this.props.newOptionCreator}
          onChange={this.props.onChange}
          value={this.props.value}
          disabled={this.props.disabled}
          allowCreate
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
    placeholder      : React.PropTypes.string,
    name             : React.PropTypes.string,
    disabled         : React.PropTypes.bool,
    mutli            : React.PropTypes.bool,
}
