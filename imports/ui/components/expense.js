import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import { Row, Col, ListGroupItem, FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { updateExpense, removeExpense } from '../../api/expenses/methods.js';
import CategorySelect from './category-select';
import BusinessSelect from './business-select';

export class Expense extends Component {
  constructor(props){
    super(props);
    this.state = {
      price: this.props.price,
      description: this.props.description,
      category: this.props.category,
      business: this.props.business,
      disabled: this.props.disabled,
      isProcessing: this.props.isProcessing
    }
    // this.handleUpdateExpense = this.handleUpdateExpense.bind(this);
    // this.handleRemoveExpense = this.handleRemoveExpense.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleBusinessChange = this.handleBusinessChange.bind(this);
    this.handleToggleEditMode = this.handleToggleEditMode.bind(this);
    this.handleFormStateChange = this.handleFormStateChange.bind(this);
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
        this.handleToggleEditMode();
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
  handleFormStateChange (name, value) {
    this.setState({
      [`${name}`]: value
    });
  }
  handlePriceChange (event) {
    console.log(event);
    this.handleFormStateChange(event.target.ref, event.target.value);
  }
  handleDescriptionChange (event) {
    console.log(event);
    this.handleFormStateChange(event.target.ref, event.target.value);
  }
  handleCategoryChange (event) {
    console.log(event);
    this.handleFormStateChange(event.target.ref, event.target.value);
  }
  handleBusinessChange (event) {
    console.log(event);
    this.handleFormStateChange(event.target.ref, event.target.value);
  }
  handleToggleEditMode () {
    this.setState({ disabled: !this.state.disabled });
  }


  render() {
    const expense = this.props;
    const toggleEditorUpdateButton = (
      this.state.disabled
        ? (
          <Button
            bsStyle="default"
            className="btn-block"
            onClick={ this.handleToggleEditMode.bind(this, expense._id) }>
            Edit
          </Button>
        )
        : (
          <div>
            <Button
              bsStyle="default"
              className="btn-block"
              onClick={ this.handleToggleEditMode.bind(this, expense._id) }>
              Cancel
            </Button>
            <Button
              bsStyle="info"
              className="btn-block"
              onClick={ this.handleUpdateExpense.bind(this, expense._id) }>
              Update
            </Button>
          </div>
        )
    );
    const toggleDeleteButton = (
      !this.state.disabled
        ? (
          <Button
            bsStyle="danger"
            className="btn-block"
            onClick={ this.handleRemoveExpense.bind(this, expense._id) }>
            Remove
          </Button>
        ) : null
    );

    return (
      <ListGroupItem key={ expense._id } ref="item" data-expense-id={ expense._id }>
        <Row className="row--half-gutter">
          <Col xs={ 8 } sm={ 10 }>
            <Row className="row--half-gutter">
              <Col xs={12} sm={9}>
                <FormGroup>
                  <FormControl
                    type="text"
                    ref="description"
                    onChange={this.handleDescriptionChange}
                    defaultValue={expense.description}
                    placeholder="Type a description of expense"
                    disabled={ this.state.disabled } />
                </FormGroup>
              </Col>
              <Col xs={12} sm={3}>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>$</InputGroup.Addon>
                    <FormControl
                      type="number"
                      min="0"
                      ref="price"
                      onChange={this.handlePriceChange}
                      defaultValue={expense.price}
                      placeholder="Price" disabled={ this.state.disabled } />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row className="row--half-gutter">
              <Col xs={12} sm={6}>
                <FormGroup>
                  <CategorySelect
                    ref="category"
                    onChange={ this.handleCategoryChange }
                    value={expense.category}
                    disabled={ this.state.disabled } />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6}>
                <FormGroup>
                  <BusinessSelect
                    ref="business"
                    onChange={ this.handleBusinessChange }
                    value={expense.business}
                    disabled={ this.state.disabled } />
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
              <Col sm={ 4 }>
                <FormControl
                  type="number"
                  standalone
                  defaultValue={ this.state.price }
                  ref="price"
                  onChange = { this.handlePriceChange }
                  disabled= { !this.state.disabled }
                  />
              </Col>
              <Col sm={ 4 }>
                <FormControl
                  type="textarea"
                  standalone
                  defaultValue={ this.state.description }
                  ref="description"
                  onChange = { this.handleDescriptionChange }
                  disabled= { !this.state.disabled }
                  />
              </Col>
              <Col sm={ 4 }>
                <FormControl
                  type="text"
                  standalone
                  defaultValue={ this.state.category }
                  ref="category"
                  onChange = { this.handleCategoryChange }
                  disabled= { !this.state.disabled }
                  />
              </Col>
              <Col sm={ 4 }>
                <FormControl
                  type="text"
                  standalone
                  defaultValue={ this.state.business }
                  ref="business"
                  onChange = { this.handleBusinessChange }
                  disabled= { !this.state.disabled }
                  />
              </Col>
            </Row> */}
          </Col>
          <Col xs={ 4 } sm={ 2 }>
            { toggleEditorUpdateButton }
            { toggleDeleteButton }
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

Expense.defaultProps = {
  disabled: true,
  isProcessing: false
}
