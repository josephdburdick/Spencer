import { Meteor } from 'meteor/meteor';
import { Categories } from '../categories';

Meteor.publish('categories', () =>  Categories.find( { userId: { $in: [ 'admin', this.userId ] } } ) );
// Meteor.publish('categories', () =>  Categories.find({ $or: [ { userId:'admin' }, { userId:this.userId } ] }));
