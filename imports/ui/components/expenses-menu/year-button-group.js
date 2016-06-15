import React from 'react'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

export default class YearButtonGroup extends React.Component {
  render () {
    return (
      <Row className="show-grid expenses-menu-row">
        <Col xs={6}>
          <ButtonGroup>
            {this.props.years.map((year, index, array) => {
              return (<Button key={index} bsSize="sm" data-year={year._id} onClick={this.props.onYearClick}>{year._id}</Button>)
            })}
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
}

YearButtonGroup.propTypes = {
  onYearClick: React.PropTypes.func.isRequired
};