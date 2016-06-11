import React, { PropTypes } from 'react'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

class YearButtonGroup extends React.Component {
  render () {
    return (
      <Row className="show-grid">
        <Col xs={6} xsOffset={3}>
          <ButtonGroup>
            <Button bsSize="sm" bsStyle="success" onClick={this.handleYearButtonClick}>2014</Button >
            <Button bsSize="sm" onClick={this.handleYearButtonClick}>2015</Button>
            <Button bsSize="sm" onClick={this.handleYearButtonClick}>2016</Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
  handleYearButtonClick(){
    console.log(`Yearly button has been clicked.`);
  }
}

export default YearButtonGroup;
