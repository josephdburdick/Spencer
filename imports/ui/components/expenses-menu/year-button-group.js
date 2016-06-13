import React from 'react'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

export default class YearButtonGroup extends React.Component {
  render () {
    return (
      <Row className="show-grid expenses-menu-row">
        <Col xs={6}>
          <ButtonGroup>
            <Button bsSize="sm" data-year="2014" bsStyle="success" onClick={this.props.onYearClick}>2014</Button >
            <Button bsSize="sm" data-year="2015" onClick={this.props.onYearClick}>2015</Button>
            <Button bsSize="sm" data-year="2016" onClick={this.props.onYearClick}>2016</Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
}

YearButtonGroup.propTypes = {
  onYearClick: React.PropTypes.func.isRequired
};
