import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ExpensesList from '../containers/expenses-list.js';
import AddExpense from '../components/add-expense.js';
import ExpensesMenu from '../components/expenses-menu/expenses-menu.js'

export const Expenses = () => (
  <Row>
    <Col xs={ 12 } sm={8} smOffset={2}>
      <h4 className="page-header">Expenses</h4>
      <ExpensesMenu />
      <ExpensesList />
      <AddExpense />
    </Col>
  </Row>
);
