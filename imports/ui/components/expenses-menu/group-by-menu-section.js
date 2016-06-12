import React, { PropTypes } from 'react'

import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';


class GroupByMenuSection extends React.Component {
  render () {
    return (
      <Row className="show-grid">
        <Col md={7}>
          <ButtonGroup>
            <Button bsSize="xs" bsStyle="success" data-month="1" onClick={this.handleMonthButtonClick}>Jan</Button >
            <Button bsSize="xs" data-month="2" onClick={this.handleMonthButtonClick}>Feb</Button>
            <Button bsSize="xs" data-month="3" onClick={this.handleMonthButtonClick}>Mar</Button>
            <Button bsSize="xs" data-month="4" onClick={this.handleMonthButtonClick}>Apr</Button>
            <Button bsSize="xs" data-month="5" onClick={this.handleMonthButtonClick}>May</Button>
            <Button bsSize="xs" data-month="6" onClick={this.handleMonthButtonClick}>Jun</Button>
            <Button bsSize="xs" data-month="7" onClick={this.handleMonthButtonClick}>Jul</Button>
            <Button bsSize="xs" data-month="8" onClick={this.handleMonthButtonClick}>Aug</Button>
            <Button bsSize="xs" data-month="9" onClick={this.handleMonthButtonClick}>Sep</Button>
            <Button bsSize="xs" data-month="10" onClick={this.handleMonthButtonClick}>Oct</Button>
            <Button bsSize="xs" data-month="11" onClick={this.handleMonthButtonClick}>Nov</Button>
            <Button bsSize="xs" data-month="12" onClick={this.handleMonthButtonClick}>Dec</Button>
          </ButtonGroup>
        </Col>
        <Col md={5}>
          <ButtonGroup>
            <Button bsSize="sm" bsStyle="success" data-quarter="1" onClick={this.handleQuarterButtonClick}>1Q</Button>
            <Button bsSize="sm" data-quarter="2" onClick={this.handleQuarterButtonClick}>2Q</Button>
            <Button bsSize="sm" data-quarter="3" onClick={this.handleQuarterButtonClick}>3Q</Button>
            <Button bsSize="sm" data-quarter="4" onClick={this.handleQuarterButtonClick}>4Q</Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
  handleQuarterButtonClick(){
    console.log(`inside quarterly button click`);
  }
  handleMonthButtonClick(){
    console.log(`inside monthly button click`);
  }
}

export default GroupByMenuSection;
