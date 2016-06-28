import { Meteor } from 'meteor/meteor';
import { Categories } from '../categories';

Meteor.publish('categories', () => {
  console.log(`inside meteor publication categories!!`)
  console.log(`count is ${Categories.find( { userId: { $in: [ 'admin', this.userId ] } } ).count()}`)
  return Categories.find( { userId: { $in: [ 'admin', this.userId ] } } );
});
