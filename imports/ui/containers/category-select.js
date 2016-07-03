import { composeWithTracker } from 'react-komposer';
import  CategorySelect  from '../components/category-select.js';
import { Categories } from '../../api/categories/categories.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('categories');
  if (subscription.ready()) {
    const categories = Categories.find().fetch();
    onData(null, { categories });
  }
}
export default composeWithTracker(composer, Loading)(CategorySelect);
