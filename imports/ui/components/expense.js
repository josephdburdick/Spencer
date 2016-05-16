import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { updateExpense, removeExpense } from '../../api/expenses/methods.js';
import $ from 'jquery';

export class Expense extends Component {
  constructor(props){
    super(props);
    this.state = {
      expense: {
        _id: this.props._id,
        price: this.props.price,
        description: this.props.description,
        category: this.props.category,
        business: this.props.business
      }
    }
    // this.handleUpdateExpense = this.handleUpdateExpense.bind(this);
    // this.handleRemoveExpense = this.handleRemoveExpense.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleBusinessChange = this.handleBusinessChange.bind(this);
  }

  handleUpdateExpense (expenseId, event){
    const price       = Number(findDOMNode(this.refs.price).value);
    const description = findDOMNode(this.refs.description).value;
    const category    = findDOMNode(this.refs.category).value;
    const business    = findDOMNode(this.refs.business).value;

    updateExpense.call({
      _id: expenseId,
      update: {
        price: price,
        description: description,
        category: category,
        business: business
      }
    }, (error) => {
      if (error) {
        console.error(error);
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Expense updated!', 'success');
      }
    });
  }

  handleRemoveExpense (expenseId, event){
    // this should be replaced with a styled solution so for now we will
    // disable the eslint `no-alert`
    // eslint-disable-next-line no-alert
    if (confirm('Sure you want to delete this expense?')) {
      removeExpense.call({
        _id: expenseId,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Expense removed!', 'success');
        }
      });
    }
  }

  handlePriceChange(event) {
    console.log(event.target.name);
    this.setState({
      expense: {
        price: event.target.value
      }
    });
  }
  handleDescriptionChange(event) {
    console.log(event.target.name);
    this.setState({
      expense: {
        description: event.target.value
      }
    });
  }
  handleCategoryChange(event) {
    console.log(event.target.name);
    this.setState({
      expense: {
        category: event.target.value
      }
    });
  }
  handleBusinessChange(event) {
    console.log(event.target.name);
    this.setState({
      expense: {
        business: event.target.value
      }
    });
  }

  render() {
    const expense = this.props.expense
    return (
      <ListGroupItem key={ expense._id } ref="item" data-expense-id={ expense._id }>
        <Row className="row--half-gutter">
          <Col xs={ 8 } sm={ 10 }>
            <FormControl
              type="number"
              standalone
              defaultValue={ expense.price }
              ref="price"
              onChange = { this.handlePriceChange }
              />
            <FormControl
              type="textarea"
              standalone
              defaultValue={ expense.description }
              ref="description"
              onChange = { this.handleDescriptionChange }
              />
            <FormControl
              type="text"
              standalone
              defaultValue={ expense.category }
              ref="category"
              onChange = { this.handleCategoryChange }
              />
            <FormControl
              type="text"
              standalone
              defaultValue={ expense.business }
              ref="business"
              onChange = { this.handleBusinessChange }
              />
          </Col>
          <Col xs={ 4 } sm={ 2 }>
            <Button
              bsStyle="danger"
              className="btn-block"
              onClick={ this.handleRemoveExpense.bind(this, expense._id) }>
              Remove
            </Button>
            <Button
              bsStyle="info"
              className="btn-block"
              onClick={ this.handleUpdateExpense.bind(this, expense._id) }>
              Update
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}
