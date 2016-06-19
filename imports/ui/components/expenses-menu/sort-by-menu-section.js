import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

export default class SortByMenuSection extends React.Component {
  render () {
    return (
      <Row className="show-grid expenses-menu-row">
        <Col md={7}>
          <ButtonGroup >
            <Button bsSize="sm" data-sort="none" onClick={this.props.onSortClick}>None</Button >
            <Button bsSize="sm" data-sort="category" onClick={this.props.onSortClick}>Category</Button >
            <Button bsSize="sm" data-sort="price" onClick={this.props.onSortClick}>Price($)</Button>
            <Button bsSize="sm" data-sort="date" onClick={this.props.onSortClick}>Date</Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
}

SortByMenuSection.propTypes = {
  onSortClick: React.PropTypes.func.isRequired
};