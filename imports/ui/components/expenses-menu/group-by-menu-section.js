import React, { PropTypes } from 'react'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export default class GroupByMenuSection extends React.Component {
  render () {
    return (
      <Row className="show-grid expenses-menu-row">
        <Col md={7}>
          <ButtonGroup>
            <Button bsSize="xs" bsStyle="success" data-month="1" onClick={this.props.onMonthClick}>Jan</Button >
            <Button bsSize="xs" data-month="2" onClick={this.props.onMonthClick}>Feb</Button>
            <Button bsSize="xs" data-month="3" onClick={this.props.onMonthClick}>Mar</Button>
            <Button bsSize="xs" data-month="4" onClick={this.props.onMonthClick}>Apr</Button>
            <Button bsSize="xs" data-month="5" onClick={this.props.onMonthClick}>May</Button>
            <Button bsSize="xs" data-month="6" onClick={this.props.onMonthClick}>Jun</Button>
            <Button bsSize="xs" data-month="7" onClick={this.props.onMonthClick}>Jul</Button>
            <Button bsSize="xs" data-month="8" onClick={this.props.onMonthClick}>Aug</Button>
            <Button bsSize="xs" data-month="9" onClick={this.props.onMonthClick}>Sep</Button>
            <Button bsSize="xs" data-month="10" onClick={this.props.onMonthClick}>Oct</Button>
            <Button bsSize="xs" data-month="11" onClick={this.props.onMonthClick}>Nov</Button>
            <Button bsSize="xs" data-month="12" onClick={this.props.onMonthClick}>Dec</Button>
          </ButtonGroup>
        </Col>
        <Col md={5}>
          <ButtonGroup>
            <Button bsSize="sm" bsStyle="success" data-quarter="1" onClick={this.props.onQuarterClick}>1Q</Button>
            <Button bsSize="sm" data-quarter="2" onClick={this.props.onQuarterClick}>2Q</Button>
            <Button bsSize="sm" data-quarter="3" onClick={this.props.onQuarterClick}>3Q</Button>
            <Button bsSize="sm" data-quarter="4" onClick={this.props.onQuarterClick}>4Q</Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
}

GroupByMenuSection.propTypes = {
  onQuarterClick: React.PropTypes.func.isRequired,
  onMonthClick: React.PropTypes.func.isRequired
};
