import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, Alert, PageHeader } from 'react-bootstrap';
import { Expense } from './expense.js';
import { _ } from 'meteor/underscore';

export class ExpensesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    let expenses = _.filter(this.props.expenses, (expense) => {
      const year = this.props.year;
      const quarter = this.props.quarter;
      const month = this.props.month;
      if (year) {
        if (quarter) {
          switch(Number.parseInt(quarter)) {
            case 1:
              return (expense.year == Number.parseInt(year) && (expense.month == 1 || expense.month == 2 || expense.month == 3));
            case 2:
              return (expense.year == Number.parseInt(year) && (expense.month == 4 || expense.month == 5 || expense.month == 6));
            case 3:
              return (expense.year == Number.parseInt(year) && (expense.month == 7 || expense.month == 8 || expense.month == 9));
            case 4:
              return (expense.year == Number.parseInt(year) && (expense.month == 10 || expense.month == 11 || expense.month == 12));
          }
        }
        if (month) {
          return (expense.year == Number.parseInt(year) && expense.month == Number.parseInt(month));
        }
        return (expense.year == Number.parseInt(year));
      }
      if (quarter) {
        switch(Number.parseInt(quarter)) {
          case 1:
            return (expense.month == 1 || expense.month == 2 || expense.month == 3);
          case 2:
            return (expense.month == 4 || expense.month == 5 || expense.month == 6);
          case 3:
            return (expense.month == 7 || expense.month == 8 || expense.month == 9);
          case 4:
            return (expense.month == 10 || expense.month == 11 || expense.month == 12);
        }
      }
      if (month) {
        return (expense.month == Number.parseInt(month));
      }
      return true; 
    });
    if (this.props.sort) {
      if (this.props.sort.localeCompare('category') == 0) {
      } else {
        switch(this.props.sort) {
           case "price":
             expenses = _.sortBy(expenses, 'price');
             break;
           case "date":
             expenses = _.sortBy(expenses, 'dateCreated');
             break;
        }
      }
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
  year: React.PropTypes.string,
  quarter: React.PropTypes.string,
  month: React.PropTypes.string,
  sort: React.PropTypes.string
};