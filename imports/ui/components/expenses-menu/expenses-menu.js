import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import GroupByMenuSection from './group-by-menu-section.js';
import SortByMenuSection from './sort-by-menu-section.js';
import YearButtonGroup from './year-button-group.js'

// class ExpensesMenu extends Component {
//   constructor(props) {
//     super(props);
//     //perform initialization.
//   }import React, { PropTypes } from 'react'
//
//
//
// }

const ExpensesMenu = () => {
  return (
    <div className="expenses-menu">
      <YearButtonGroup />
      <GroupByMenuSection />
      <SortByMenuSection />
    </div>
  )
}

export default ExpensesMenu
