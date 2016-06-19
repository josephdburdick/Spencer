import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, Alert, PageHeader } from 'react-bootstrap';
import { Expense } from './expense.js';
import { _ } from 'meteor/underscore';

export class ExpensesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    const where_props = {};
    let expenses = this.props.expenses;
    if (this.props.year) {
       where_props.year = Number.parseInt(this.props.year);
    }
    if (this.props.quarter) {
       // where_props.year = Number.parseInt(this.props.year);
    }
    if (this.props.month) {
       where_props.month = Number.parseInt(this.props.month);
    }
    if (Object.keys(where_props).length > 0) {
      expenses = _.where(this.props.expenses, where_props);
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