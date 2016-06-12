import React, { PropTypes } from 'react'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

class YearButtonGroup extends React.Component {
  render () {
    return (
      <Row className="show-grid expenses-menu-row">
        <Col xs={6}>
          <ButtonGroup>
            <Button bsSize="sm" data-year="2014" bsStyle="success" onClick={this.handleYearButtonClick.bind(this)}>2014</Button >
            <Button bsSize="sm" data-year="2015" onClick={this.handleYearButtonClick.bind(this)}>2015</Button>
            <Button bsSize="sm" data-year="2016" onClick={this.handleYearButtonClick.bind(this)}>2016</Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
  handleYearButtonClick(event){
    let year = event.target.dataset.year
    console.log(`year is ${year}`);
  }
}

export default YearButtonGroup;
