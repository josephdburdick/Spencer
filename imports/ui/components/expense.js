import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { updateExpense, removeExpense } from '../../api/expenses/methods.js';

const handleUpdateExpense = (expenseId, event) => {
  const price       = "price"; //taken from some ref
  const description = "description"; //taken from some ref
  const category    = "category";
  const business    = "business";
    updateExpense.call({
      _id: expenseId,
      expenseUpdate: { price, description, category, business },
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Expense updated!', 'success');
      }
    });
};

const handleRemoveExpense = (expenseId, event) => {
  event.preventDefault();
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
};

export const Expense = ({ expense }) => (
  <ListGroupItem key={ expense._id }>
    <Row>
      <Col xs={ 8 } sm={ 10 }>
        <FormControl
          type="number"
          standalone
          defaultValue={ expense.price }
        />
        <FormControl
          type="textarea"
          standalone
          defaultValue={ expense.description }
        />
        <FormControl
          type="text"
          standalone
          defaultValue={ expense.category }
        />
        <FormControl
          type="text"
          standalone
          defaultValue={ expense.business }
        />
      </Col>
      <Col xs={ 4 } sm={ 2 }>
        <Button
          bsStyle="danger"
          className="btn-block"
          onClick={ handleRemoveExpense.bind(this, expense._id) }>
          Remove
        </Button>
        <Button
          bsStyle="info"
          className="btn-block"
          onClick={ handleUpdateExpense.bind(this, expense._id) }>
          Update
        </Button>
      </Col>
    </Row>
  </ListGroupItem>
);
