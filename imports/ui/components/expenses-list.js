import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, Alert, PageHeader } from 'react-bootstrap';
import { Expense } from './expense.js';
import { _ } from 'meteor/underscore';

export class ExpensesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    let expenses = this.props.expenses;
    const year = this.props.year;
    if (year) {
      expenses = _.where(this.props.expenses, {year: Number.parseInt(year)});
      // expenses = _.filter(this.props.expenses, function(expense){ return expense.year == Number.parseInt(year); });
    }
    console.log(`ExpensesList.render: year => ${this.props.year}, quarter => ${this.props.quarter}, month => ${this.props.month}, sort => ${this.props.sort}`);
    return (
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
    )
  }
}

ExpensesList.propTypes = {
  expenses: React.PropTypes.array,
};