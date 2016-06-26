import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import categoriesArray from '../../api/categories/categories.json';
import { getCategories } from '../../api/categories/methods.js';

export default class CategorySelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: categoriesArray
    }
    this.getOptions = this.getOptions.bind(this);
    const handle = Meteor.subscribe('categories');
  }

  getOptions(input, callback) {
    let categories = [];
    getCategories.call({}, (error, result) => {
      if (error) {
        console.log(`CategorySelect.getOptions.getCategories: error => ${error}`);
        Bert.alert(error.reason, 'danger');
      } else {
        categories = result;
        console.log(`CategorySelect.getOptions.getCategories: result => ${result}`);
      }
      callback(null, { options: categories, complete: true });
    });
  }

  render() {
    const options = this.state.categories;
    return (
      <div>
        <Select
          placeholder={this.props.placeholder}
          name={this.props.name}
          asyncOptions={this.getOptions}
          autoload={true}
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