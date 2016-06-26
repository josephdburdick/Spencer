import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import categoriesArray from '../../api/categories/categories.json';

export default class CategorySelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: categoriesArray
    }
  }

  render() {
    const options = this.state.categories;
    return (
      <div>
        <Select
          placeholder={this.props.placeholder}
          name={this.props.name}
          options={options}
          onChange={this.props.onChange}
          newOptionCreator={this.props.newOptionCreator}
          value={this.props.value}
          multi={this.props.multi}
          disabled={this.props.disabled}
          simpleValue={true}
          allowCreate={true}
          clearable={false}
        />
      </div>
    )
  }
}

CategorySelect.defaultProps = {
  placeholder: "Add category",
  selected: '',
  name  : "category-select",
  disabled  : false,
  multi : false 
};