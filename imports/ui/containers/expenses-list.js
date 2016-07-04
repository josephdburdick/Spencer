import { composeWithTracker } from 'react-komposer';
import { Expenses } from '../../api/expenses/expenses.js';
import { ExpensesList } from '../components/expenses-list.js';
import { expensesFind } from '../../api/expenses/methods.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('expenses');
  if (subscription.ready()) {
    const expenses = Expenses.find().fetch();
        const updatedExpenses = _.each(expenses, (expense,key)=>{
          console.log(`the year is ${expense["dateCreated"].getFullYear() }`)
          expense["year"]  = expense["dateCreated"].getFullYear();
          console.log(`the month is ${expense["dateCreated"].getMonth() + 1}`)
          expense["month"] = expense["dateCreated"].getMonth() + 1  ;
          console.log(`the day is ${expense["dateCreated"].getDate() }`)
          expense["day"] = expense["dateCreated"].getDate();
        })
        console.log(`-------updatedExpenses is------- ${JSON.stringify(updatedExpenses)}`);
        onData(null, { expenses: updatedExpenses });
    }
  }

export default composeWithTracker(composer, Loading)(ExpensesList);
