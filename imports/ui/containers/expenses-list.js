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
    let sort_spec = null;
    if (props.sort) {
      switch(props.sort) {
         case "category":
           sort_spec = { $sort : { category : 1 } };
           break;
         case "price":
           sort_spec = { $sort : { price : 1 } };
           break;
         case "date":
           sort_spec = { $sort : { dateCreated : 1 } };
           break;
      }
    }
    if (sort_spec) {
       pipeline.push(sort_spec);
    }
    if (pipeline.length > 0) {
      // expenses = Expenses.aggregate(pipeline).fetch();
      /*Meteor.call('expensesAggregate', pipeline, (err, res) => {
        if (err) {
          console.log(`composer: err => ${err}`);
        } else {
          onData(null, { res });
        }
      });*/
    expensesAggregate.call({ pipeline }, (err, res) => {
        if (err) {
          console.log(`composer: err => ${err}`);
          Bert.alert(err.reason, 'danger');
        } else {
          onData(null, { res });
        }
    });
    } else {
      expenses = Expenses.find().fetch();
      onData(null, { expenses });
    }
  }
};

export default composeWithTracker(composer, Loading)(ExpensesList);