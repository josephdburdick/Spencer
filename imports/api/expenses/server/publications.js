import { Meteor } from 'meteor/meteor';
import { Expenses } from '../expenses';

Meteor.publish('expenses', function(){
  console.log(`inside expenses publication. Do we hit after insert ???`)
  return Expenses.find( { userId : this.userId }, { $fields: { price: 1, description: 1, business: 1, category: 1, dateCreated: 1 } }, { allowDiskUse: true } );
});
