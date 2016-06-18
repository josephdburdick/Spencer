import React from 'react';
import { ListGroup, ListGroupItem, Alert, PageHeader } from 'react-bootstrap';
import { Expense } from './expense.js';

export const ExpensesList = ({ expenses }) => (
  expenses.length > 0 ? (
    <ListGroup className="expenses-list">
      {expenses.map((doc) => {
        if (doc.expenses) {
          const expenses_list = doc.expenses.map((expense) => {
            return (<Expense key={ expense._id } {...expense} />)
          })
          return (
            <div>
              <PageHeader key={doc._id}>{doc._id}</PageHeader>
              {expenses_list}
            </div>
          )
        } else {
          return (<Expense key={ doc._id } {...doc} />)
        }
      })}
    </ListGroup>
  ) : ( <Alert bsStyle="warning">No expenses yet.</Alert> )
);

ExpensesList.propTypes = {
  expenses: React.PropTypes.array,
};
