import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';

import categoriesArray from '../../api/categories/categories.json';

export default class CategorySelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: categoriesArray,
      selected: this.props.selected,
      value: this.props.value,
      disabled: this.props.disabled
    }
    // this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  // handleCategoryChange(categories, currentState = this.state) {
  //   currentState.selected = categories;
  //   return currentState;
  // }

  render() {
    // const handleCategoryChange = (categories, currentState = this.state) => {
    //   currentState.selected = categories;
    //   return currentState;
    // }
    const options = this.state.categories;
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
          allowCreate={true}
        />
      </div>
    )
  }
}

CategorySelect.defaultProps = {
  placeholder: "Add category",
  selected: '',
  name: "category-select",
  multi: true
};
