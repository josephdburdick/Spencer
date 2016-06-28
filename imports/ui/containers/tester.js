import { composeWithTracker } from 'react-komposer';
import { Tester }  from '../components/tester.js';
import { Categories } from '../../api/categories/categories.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  console.log(`INSIDE COMPOSERRRR`);
  const subscription = Meteor.subscribe('categories');
  if (subscription.ready()) {
    const categories = Categories.find().fetch();
    console.log(`CATEGORIES FROM SUB ARE ${JSON.stringify(categories)}`)
    onData(null, { categories });
  }
}
export default composeWithTracker(composer, Loading)(Tester);
