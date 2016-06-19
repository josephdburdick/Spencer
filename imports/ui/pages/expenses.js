import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import ExpensesList from '../containers/expenses-list.js';
import AddExpense from '../components/add-expense.js';
import ExpensesMenu from '../components/expenses-menu/expenses-menu.js'

export class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      quarter: null,
      month: null,
      sort: null
    };
    this.onYearClick = this.onYearClick.bind(this);
    this.onQuarterClick = this.onQuarterClick.bind(this);
    this.onMonthClick = this.onMonthClick.bind(this);
    this.onSortClick = this.onSortClick.bind(this);
  }
  onYearClick(event) {
    console.log(`Expenses.onYearClick: target.bsStyle => ${event.target.bsStyle}`);
    event.target.bsStyle = "success";
    const year = event.target.dataset.year;
    this.setState({ year: year });
    console.log(`Expenses.onYearClick: year => ${year}, target.bsStyle => ${event.target.bsStyle}`);
  }
  onQuarterClick(event) {
    event.preventDefault();
    const quarter = event.target.dataset.quarter;
    this.setState({ quarter: quarter });
    console.log(`Expenses.onQuarterClick: quarter => ${quarter}`);
  }
  onMonthClick(event) {
    event.preventDefault();
    const month = event.target.dataset.month;
    this.setState({ month: month });
    console.log(`Expenses.onMonthClick: month => ${month}`);
  }
  onSortClick(event) {
    event.preventDefault()
    const sort = event.target.dataset.sort;
    this.setState({ sort: sort });
    console.log(`Expenses.onSortClick: sort => ${sort}`);
  }
  render () {
    return (
      <Row>
        <Col xs={ 12 } sm={8} smOffset={2}>
          <h4 className="page-header">Expenses</h4>
          <ExpensesMenu
            onYearClick={this.onYearClick}
            onQuarterClick={this.onQuarterClick}
            onMonthClick={this.onMonthClick}
            onSortClick={this.onSortClick} />
          <ExpensesList
            year={this.state.year}
            quarter={this.state.quarter}
            month={this.state.month}
            sort={this.state.sort} />
          <AddExpense />
        </Col>
      </Row>
    )
  }
}