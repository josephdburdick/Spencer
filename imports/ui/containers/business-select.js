import { composeWithTracker } from 'react-komposer';
import  BusinessSelect  from '../components/business-select.js';
import { Businesses }   from '../../api/businesses/businesses.js'
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('businesses');
  if (subscription.ready()) {
    const businesses = Businesses.find().fetch();
    onData(null, { businesses });
  }
}
export default composeWithTracker(composer, Loading)(BusinessSelect);
