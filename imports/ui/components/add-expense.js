import React from 'react';
import { Row, Col, FormGroup, FormControl, Well, InputGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertExpense } from '../../api/expenses/methods.js';

const state = {
  isLoading: false,
  businesses: ['AirBnB', 'Freelance Web']
}

const handleInsertExpense = (event) => {
  event.preventDefault();
  const target      = event.target;
  const price       = "price";
  const description = "description";
  const category    = "category";
  const business    = "business";
  insertExpense.call({
    expense : {price, description, category, business},
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      //%%clear entire form based on refs or what not.
      Bert.alert('Expense added!', 'success');
    }
  });
};

const handlePriceKeyUp = (event) => {
  console.log(event);
};

const handleDescriptionKeyUp = (event) => {
  console.log(event);
};

const handleCategoriesKeyUp = (event) => {
  console.log(event);
}

const renderDropdownBusinessOptions = () => {
  return (
    <MenuItem eventKey="1" active>Last: AirBnB</MenuItem>
    <MenuItem divider />
    <MenuItem eventKey="2">AirBnb</MenuItem>
    <MenuItem eventKey="3">Freelance Web</MenuItem>
  )
}

export const AddExpense = () => (
  <form onSubmit={ handleInsertExpense }>
    <Well bsSize="small">
      <Row className="row--half-gutter">
        <Col xs={4} sm={3}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>$</InputGroup.Addon>
              <FormControl
                data-role="price"
                type="number"
                onKeyUp={ handlePriceKeyUp }
                placeholder="Price" />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col xs={8} sm={9}>
          <FormGroup>
            <FormControl
              data-role="description"
              type="text"
              onKeyUp={ handleDescriptionKeyUp }
              placeholder="Type a description of expense"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="row--half-gutter">
        <Col xs={8} sm={9}>
          <FormGroup>
            <FormControl
              data-role="categories"
              type="text"
              onKeyUp={ handleCategoriesKeyUp }
              placeholder="Expense category"
            />
          </FormGroup>
        </Col>
        <Col xs={4} sm={3}>
          <FormGroup>
            <FormControl
              data-role="price"
              type="number"
              onKeyUp={ handlePriceKeyUp }
              placeholder="Price"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="row--half-gutter">
        <Col sm={6} >
          <div>
            <Button bsStyle="default" type="reset">
              Clear
            </Button>
          </div>
        </Col>
        <Col sm={6}>
          <div className="pull-right">
            <DropdownButton dropup bsStyle="link" title="Select Business" id="dropdown_select-business">
              { renderDropdownBusinessOptions() }
            </DropdownButton>
            <Button bsStyle="success" type="submit">
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Well>
  </form>
);
