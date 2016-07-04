import { composeWithTracker } from 'react-komposer';
import { Expenses } from '../../api/expenses/expenses.js';
import { ExpensesList } from '../components/expenses-list.js';
import { expensesAggregate } from '../../api/expenses/methods.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('expenses');
  if (subscription.ready()) {
    let expenses = [];
    let pipeline = [];
    let project_stage = null;
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
