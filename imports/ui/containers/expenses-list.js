import { composeWithTracker } from 'react-komposer';
import { Expenses } from '../../api/expenses/expenses.js';
import { ExpensesList } from '../components/expenses-list.js';
import { expensesAggregate } from '../../api/expenses/methods.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('expenses');
  if (subscription.ready()) {
    console.log(`composer: year => ${props.year}, quarter => ${props.quarter}, month => ${props.month}, sort => ${props.sort}`);
    let expenses = [];
    let pipeline = [];
    let project_stage = null;
    let match_stage = null;
    let sort_stage = null;
    let group_stage = null;
    project_stage = {
      $project: {
        userId: 1,
        price: 1,
        description: 1,
        business: 1,
        category: 1,
        dateCreated: 1,
        year: { $year: "$dateCreated" },
        month: { $month: "$dateCreated" },
        day: { $dayOfMonth: "$dateCreated" }
      }
    };
    pipeline.push(project_stage);
    if (props.year || props.quarter || props.month) {
      const and_arguments = [];
      if (props.year) {
        const year_filter = { year : Number.parseInt(props.year) };
        and_arguments.push(year_filter);
      }
      if (props.quarter) {
        const or_arguments = [];
        switch(Number.parseInt(props.quarter)) {
           case 1:
             or_arguments.push({ month : 1 });
             or_arguments.push({ month : 2 });
             or_arguments.push({ month : 3 });
             break;
           case 2:
             or_arguments.push({ month : 4 });
             or_arguments.push({ month : 5 });
             or_arguments.push({ month : 6 });
             break;
           case 3:
             or_arguments.push({ month : 7 });
             or_arguments.push({ month : 8 });
             or_arguments.push({ month : 9 });
             break;
           case 4:
             or_arguments.push({ month : 10 });
             or_arguments.push({ month : 11 });
             or_arguments.push({ month : 12 });
             break;
        }
        const quarter_filter = { $or : or_arguments };
        and_arguments.push(quarter_filter);
      }
      if (props.month) {
        const month_filter = { month : Number.parseInt(props.month) };
        and_arguments.push(month_filter);
      }
      match_stage = { $match : { $and: and_arguments } };
      pipeline.push(match_stage);
    }
    if (props.sort) {
      if (props.sort.localeCompare('category') == 0) {
        group_stage = { $group : { _id : "$category", expenses: { $push: "$$ROOT" } } };
        pipeline.push(group_stage);
      } else {
        switch(props.sort) {
           case "price":
             sort_stage = { $sort : { price : 1 } };
             break;
           case "date":
             sort_stage = { $sort : { dateCreated : 1 } };
             break;
        }
        pipeline.push(sort_stage);
      }
    }
    expensesAggregate.call({ pipeline }, (error, result) => {
      if (error) {
        console.log(`composer: error => ${error}`);
        Bert.alert(error.reason, 'danger');
      } else {
        expenses = result;
        onData(null, { expenses });
      }
    });
  }
};

export default composeWithTracker(composer, Loading)(ExpensesList);