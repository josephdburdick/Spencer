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
    const year = event.target.dataset.year;
    this.setState({ year: year });
    console.log(`Expenses.onYearClick: year => ${year}`);
  }
  onQuarterClick(event) {
    event.preventDefault();
    const quarter = event.target.dataset.quarter;
    this.setState({ quarter: quarter });
    console.log(`Expenses.onQuarterClick: quarter => ${quarter}`);
    /*Meteor.call('groupByQuarter', quarter, (error,response)=>{
  
    })*/
  }
  onMonthClick(event) {
    event.preventDefault();
    const month = event.target.dataset.month;
    this.setState({ month: month });
    console.log(`Expenses.onMonthClick: month => ${month}`);
    /*Meteor.call('groupByMonth', month, (error,response)=>{
  
    })*/
  }
  onSortClick(event) {
    event.preventDefault()
    const sort = event.target.dataset.sort;
    this.setState({ sort: sort });
    console.log(`Expenses.onSortClick: sort => ${sort}`);
    /*switch(event.target.dataset.sort) {
      case "price":
        let sortType = -1 //hardcoded for now but should come from state or props - must discover which
        Meteor.call('sortByPrice', sortType, (error,response)=>{
          if(error){
            //Bert.alert()
          }else{
            if(response){
              console.log(`we got a reponse from sortByPrice`)
            }
          }
        });
      break;
      case "date":
        let dateSortType = -1 //hardcoded for now but should come from state or props - must discover which
        Meteor.call('sortByDate', dateSortType, (error,response)=>{
          if(error){
            //Bert.alert()
          }else{
            if(response){
              console.log(`we got a reponse from sortByPrice`)
            }
          }
        });
      break;
      default: //--must be sort by category
        let categories = "HARDCODED_CATEGORY_NAME" //hardcoded for now but should come from state or props - must discover which
        Meteor.call('sortByCategory', categories, (error,response)=>{
          if(error){
            //Bert.alert()
          }else{
            if(response){
              console.log(`we got a reponse from sortByPrice`)
            }
          }
        });
      break;
    }*/
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