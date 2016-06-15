import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import GroupByMenuSection from './group-by-menu-section.js';
import SortByMenuSection from './sort-by-menu-section.js';
// import YearButtonGroup from './year-button-group.js'
import YearButtonGroup from '../../containers/year-button-group-container.js'

export default class ExpensesMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="expenses-menu">
        <YearButtonGroup onYearClick={this.props.onYearClick} />
        <GroupByMenuSection
          onQuarterClick={this.props.onQuarterClick}
          onMonthClick={this.props.onMonthClick} />
        <SortByMenuSection onSortClick={this.props.onSortClick} />
      </div>
    )
  }
}

ExpensesMenu.propTypes = {
  onYearClick: React.PropTypes.func.isRequired,
  onQuarterClick: React.PropTypes.func.isRequired,
  onMonthClick: React.PropTypes.func.isRequired,
  onSortClick: React.PropTypes.func.isRequired
};