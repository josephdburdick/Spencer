import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  Well,
  InputGroup,
  Button
} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertCategory } from '../../api/categories/methods.js';
import CategorySelect from '../containers/category-select.js';
import BusinessSelect from '../containers/business-select.js';
import { insertExpense } from '../../api/expenses/methods.js';
import { insertBusiness } from '../../api/businesses/methods.js';
import Time from 'react-time';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      price: 0,
      description: '',
      category: '',
      business: ''
    };

    this.handleInsertExpense = this.handleInsertExpense.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCategoryCreate = this.handleCategoryCreate.bind(this);
    this.handleBusinessChange = this.handleBusinessChange.bind(this);
    this.handleBusinessCreate = this.handleBusinessCreate.bind(this);
    this.handleResetForm = this.handleResetForm.bind(this);
  }
  handleResetForm() {
    this.setState({
      isProcessing: false,
      price: 0,
      description: '',
      category: '',
      business: ''
    });
  }
  handleInsertExpense (event) {
    event.preventDefault();
    this.setState({isProcessing: true});
    insertExpense.call({
      userId: Meteor.userId(),
      price: this.state.price,
      description: this.state.description,
      category: this.state.category,
      business: this.state.business,
      dateCreated: new Date()
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
        this.setState({ isProcessing: false });
      } else {
        Bert.alert('Expense added!', 'success');
        this.handleResetForm();
      }
    });
  }

  handlePriceChange (event) {
    event.preventDefault();
    this.setState({ price: parseFloat(event.target.value) });
  }

  handleDescriptionChange (event) {
    event.preventDefault()
    this.setState({ description: event.target.value });
  }
  handleCategoryChange (value) {
    if( (typeof value.valueOf() == "string") && (value.length > 0)){
      this.setState({ category: value });
      if (this.addingCategory && this.addingCategory === true) {
        this.addingCategory = false;
        insertCategory.call({ value: value, label: value }, (error, result) => {
          if (error) {
            // console.log(`addExpense.handleCategoryChange.insertCategory: error => ${error}`);
            Bert.alert(error.reason, 'danger');
          } else {
            // console.log(`addExpense.handleCategoryChange.insertCategory: result => ${result}`);
          }
        });
      }
    }
  }
  handleCategoryCreate(value) {
    this.addingCategory = true;
    return { value, label: value, create: true };
  }
  handleBusinessCreate(value) {
    this.addingBusiness = true;
    return { value, label: value, create: true };
  }

  handleBusinessChange(value) {
    if ((typeof value.valueOf() == "string") && (value.length > 0)){
      this.setState({ business: value });
      if (this.addingBusiness && this.addingBusiness === true) {
        this.addingBusiness = false;
        insertBusiness.call({ value, label: value }, (error, result) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            // console.log(`just inserted a the business ${value}`)
          }
        });
      }
    }
  }
  render() {
    let isProcessing = this.state.isProcessing;
    return (
      <form onSubmit={this.handleInsertExpense}>
        <Well bsSize="small">
          <Row className="row--half-gutter">
            <Col xs={12} sm={9}>
              <FormGroup>
                <FormControl type="text"
                  onChange={this.handleDescriptionChange}
                  value={this.state.description} placeholder="Type a description of expense"
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={3}>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl type="number" min="0"
                    onChange={this.handlePriceChange}
                    value={this.state.price} placeholder="Price"
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row className="row--half-gutter">
            <Col xs={12} sm={6}>
              <FormGroup>
                <CategorySelect
                  onChange={this.handleCategoryChange}
                  newOptionCreator={this.handleCategoryCreate}
                  value={this.state.category}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={6}>
              <FormGroup>
                <BusinessSelect
                  onChange={this.handleBusinessChange}
                  newOptionCreator={this.handleBusinessCreate}
                  value={this.state.business}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="row--half-gutter">
            <Col xs={2} sm={2}>
              <p><Time value={new Date()} format="YYYY/MM/DD" /></p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-right">
              <Button
                bsStyle={isProcessing ? 'default' : 'success'}
                type="submit"
                disabled={isProcessing}>
                  {isProcessing ? 'Adding Expense...' : 'Add Expense'}
              </Button>
            </Col>
          </Row>
        </Well>
      </form>
    )
  }
}

AddExpense.defaultProps = { initialCount: 0 };

export default AddExpense;
