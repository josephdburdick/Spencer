import { Meteor } from 'meteor/meteor';
import { Businesses } from '../businesses';

Meteor.publish('businesses', function(){
  return Businesses.find({ userId : this.userId } , { fields : { userId : 0 } } )
});
