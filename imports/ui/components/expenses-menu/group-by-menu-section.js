import React, { PropTypes } from 'react'

import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import Meteor from 'meteor/meteor';


class GroupByMenuSection extends React.Component {
  render () {
    return (
      <Row className="show-grid expenses-menu-row">
        <Col md={7}>
          <ButtonGroup>
            <Button bsSize="xs" bsStyle="success" data-month="1" onClick={this.handleMonthButtonClick}>Jan</Button >
            <Button bsSize="xs" data-month="2" onClick={this.handleMonthButtonClick.bind(this)}>Feb</Button>
            <Button bsSize="xs" data-month="3" onClick={this.handleMonthButtonClick.bind(this)}>Mar</Button>
            <Button bsSize="xs" data-month="4" onClick={this.handleMonthButtonClick.bind(this)}>Apr</Button>
            <Button bsSize="xs" data-month="5" onClick={this.handleMonthButtonClick.bind(this)}>May</Button>
            <Button bsSize="xs" data-month="6" onClick={this.handleMonthButtonClick.bind(this)}>Jun</Button>
            <Button bsSize="xs" data-month="7" onClick={this.handleMonthButtonClick.bind(this)}>Jul</Button>
            <Button bsSize="xs" data-month="8" onClick={this.handleMonthButtonClick.bind(this)}>Aug</Button>
            <Button bsSize="xs" data-month="9" onClick={this.handleMonthButtonClick.bind(this)}>Sep</Button>
            <Button bsSize="xs" data-month="10" onClick={this.handleMonthButtonClick.bind(this)}>Oct</Button>
            <Button bsSize="xs" data-month="11" onClick={this.handleMonthButtonClick.bind(this)}>Nov</Button>
            <Button bsSize="xs" data-month="12" onClick={this.handleMonthButtonClick.bind(this)}>Dec</Button>
          </ButtonGroup>
        </Col>
        <Col md={5}>
          <ButtonGroup>
            <Button bsSize="sm" bsStyle="success" data-quarter="1" onClick={this.handleQuarterButtonClick.bind(this)}>1Q</Button>
            <Button bsSize="sm" data-quarter="2" onClick={this.handleQuarterButtonClick.bind(this)}>2Q</Button>
            <Button bsSize="sm" data-quarter="3" onClick={this.handleQuarterButtonClick.bind(this)}>3Q</Button>
            <Button bsSize="sm" data-quarter="4" onClick={this.handleQuarterButtonClick.bind(this)}>4Q</Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
  handleQuarterButtonClick(event){
    event.preventDefault();
    let quarter = event.target.dataset.quarter
    console.log(`quarter is ${quarter}`);
    Meteor.call('groupByQuarter', quarter, (error,response)=>{

    })

  }
  handleMonthButtonClick(event){
    event.preventDefault();
    let month = event.target.dataset.month
    console.log(`month is ${month}`);
    Meteor.call('groupByMonth', month, (error,response)=>{

    })

  }
}

export default GroupByMenuSection;
