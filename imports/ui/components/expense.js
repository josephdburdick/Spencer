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
      _id: this.props._id,
      price: this.props.price,
      description: this.props.description,
      category: this.props.category,
      business: this.props.business,
      disabled: this.props.disabled,
      isProcessing: this.props.isProcessing
    }

    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleBusinessChange = this.handleBusinessChange.bind(this);
    this.handleToggleEditMode = this.handleToggleEditMode.bind(this);
    this.handleFormStateChange = this.handleFormStateChange.bind(this);
  }

  handleUpdateExpense (expenseId, event){
    const {
      price,
      description,
      category,
      business
    } = this['state'];

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
    this.setState({price: Number(event.target.value)});
  }
  handleDescriptionChange (event) {
    this.setState({description: event.target.value});
  }
  handleCategoryChange (event) {
    this.setState({category: event.value});
  }
  handleBusinessChange (event) {
    this.setState({business: event.value});
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
            onClick={ this.handleToggleEditMode.bind(this, this.state._id) }>
            Edit
          </Button>
        )
        : (
          <div>
            <Button
              bsStyle="default"
              className="btn-block"
              onClick={ this.handleToggleEditMode.bind(this, this.state._id) }>
              Cancel
            </Button>
            <Button
              bsStyle="info"
              className="btn-block"
              onClick={ this.handleUpdateExpense.bind(this, this.state._id) }>
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
            onClick={ this.handleRemoveExpense.bind(this, this.state._id) }>
            Remove
          </Button>
        ) : null
    );

    const formControlOrLabel = control => (
      this.state.disabled ?
        (
          <div>{control.props.defaultValue || control.props.value}</div>
        ) : control
    )

    return (
      <ListGroupItem key={ this.state._id } ref="item" data-expense-id={ this.state._id }>
        <Row className="row--half-gutter">
          <Col xs={ 8 } sm={ 10 }>
            <Row className="row--half-gutter">
              <Col xs={12} sm={9}>

                <FormGroup>
                  { formControlOrLabel(
                    <FormControl
                      type="text"
                      ref="description"
                      onChange={this.handleDescriptionChange}
                      defaultValue={this.state.description}
                      placeholder="Type a description of expense"
                      disabled={ this.state.disabled } />
                  ) }
                </FormGroup>

              </Col>
              <Col xs={12} sm={3}>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>$</InputGroup.Addon>
                    { formControlOrLabel(
                      <FormControl
                      type="number"
                      min="0"
                      ref="price"
                      onChange={this.handlePriceChange}
                      defaultValue={this.state.price}
                      placeholder="Price" disabled={ this.state.disabled } />
                  ) }
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row className="row--half-gutter">
              <Col xs={12} sm={6}>
                <FormGroup>
                  { formControlOrLabel(
                    <CategorySelect
                      ref="category"
                      onChange={ this.handleCategoryChange }
                      value={this.state.category}
                      disabled={ this.state.disabled } />
                  ) }
                </FormGroup>
              </Col>
              <Col xs={12} sm={6}>
                <FormGroup>
                  { formControlOrLabel(<BusinessSelect
                    ref="business"
                    onChange={ this.handleBusinessChange }
                    value={this.state.business}
                    disabled={ this.state.disabled } />
                ) }
                </FormGroup>
              </Col>
            </Row>
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
