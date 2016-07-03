import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import categoriesArray from '../../api/categories/categories.json';
import { getCategories } from '../../api/categories/methods.js';

export default class CategorySelect extends Component {
  constructor(props){
    super(props);
    this.getOptions = this.getOptions.bind(this);
    //const handle = Meteor.subscribe('categories');
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
    console.log('inside category-select render')
    console.log(`categories size is ${this.props.categories.length}`)
    return (
      <div>
        <Select
          placeholder={this.props.placeholder}
          name={this.props.name}
          options={this.props.categories}
          onChange={this.props.onChange}
          newOptionCreator={this.props.newOptionCreator}
          value={this.props.value}
          disabled={this.props.disabled}
          allowCreate={true}
        />
      </div>
    )
  }
}
CategorySelect.defaultProps = {
  placeholder : "Add category",
  selected    : '',
  name        : "category-select",
  disabled    : false,
  multi       : false,
  allowCreate : true,
  clearable   : true,
  simpleValue : true,
  autoload    : true,
};

CategorySelect.propTypes = {
  categories       : React.PropTypes.array,
  newOptionCreator : React.PropTypes.func,
  placeholder      : React.PropTypes.string,
  name             : React.PropTypes.string,
  disabled         : React.PropTypes.bool,
  mutli            : React.PropTypes.bool,
}
