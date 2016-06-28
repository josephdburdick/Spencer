import { composeWithTracker } from 'react-komposer';
import { CategorySelect } from '../components/expenses-list.js';
import categoriesArray from '../../api/categories/categories.json';
import { getCategories } from '../../api/categories/methods.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('user-categories');
  if (subscription.ready()) {
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
