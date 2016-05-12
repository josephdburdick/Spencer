import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Expense } from './expense.js';

export const ExpensesList = ({ expenses }) => (
  expenses.length > 0 ? (
    <ListGroup className="expenses-list">
      {expenses.map(function(doc){
        <Expense key={ doc._id } expense={ doc } />
      })}
    </ListGroup>
  ) :
  (<Alert bsStyle="warning">No expenses yet.</Alert>)
);

ExpensesList.propTypes = {
  expenses: React.PropTypes.array,
};