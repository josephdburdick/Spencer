import { composeWithTracker } from 'react-komposer';
import YearButtonGroup from '../components/expenses-menu/year-button-group.js';
import { expensesAggregate } from '../../api/expenses/methods.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  let years = [];
  let pipeline = [];
  let project_stage = null;
  let group_stage = null;
  let sort_stage = null;
  project_stage = {
    $project: {
      year: { $year: "$dateCreated" }
    }
  };
  pipeline.push(project_stage);
  sort_stage = { $sort : { year : -1 } };
  pipeline.push(sort_stage);
  group_stage = { $group : { _id : "$year" } };
  pipeline.push(group_stage);
  expensesAggregate.call({ pipeline }, (error, result) => {
    if (error) {
      console.log(`composer: error => ${error}`);
      Bert.alert(error.reason, 'danger');
    } else {
      years = result;
      years.forEach((element, index, array) => {
        console.log(`expensesAggregate.years: years[${index}] => ${element._id}`);
      });
      onData(null, { years });
    }
  });
};

export default composeWithTracker(composer, Loading)(YearButtonGroup);