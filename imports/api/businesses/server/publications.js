import { Meteor } from 'meteor/meteor';
import { Businesses } from '../businesses';

Meteor.publish('businesses', () => Businesses.find({userId : this.userId}));
