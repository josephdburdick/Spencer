import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertExpense } from '../../api/expenses/methods.js';

const handleInsertExpense = (event) => {
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

export const AddExpense = () => (
  // <FormGroup>
  //   <FormControl
  //     type="text"
  //     onKeyUp={ handleInsertExpense }
  //     placeholder="Type a document title and press enter..."
  //   />
  // </FormGroup>
);
