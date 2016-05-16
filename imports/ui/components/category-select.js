import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';

import categoriesArray from '../../api/categories/categories.json';

export class CategorySelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: categoriesArray,
      category: '',
      value: this.props.value
    }
  }

  render() {
    const options = this.state.categories;
    return (
      <div>
        <Select
          placeholder="Add Category..."
          name="categories-select"
          options={options}
          onChange={this.props.onChange}
          value={this.props.value}
          allowCreate={true}
        />
      </div>
    )
  }
}

CategorySelect.defaultProps = {
  placeholder: "Add category"
};
