import { Meteor } from 'meteor/meteor';
import { Categories } from '../categories';

Meteor.publish('categories', function(){
  console.log(`inside meteor publication categories!!`)
  console.log(`categories publication count is ${Categories.find( { userId: { $in: [ 'admin', this.userId ] } } ).count()}`)
  return Categories.find( { userId: { $in: [ 'admin', this.userId ] } }, {fields: { userId:0 } } );
});
