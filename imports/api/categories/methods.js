import { Categories } from './categories';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';

export const insertCategory = new ValidatedMethod({
  name: 'category.insert',
  validate: new SimpleSchema({
    value: { type: String },
    label: {type : String},
  }).validator(),
  run(document) {
    console.log(`new category run, and new user id is ${Meteor.userId()}`)
    document["userId"] = Meteor.userId();
    Categories.insert(document);
  },
});

export const updateCategory = new ValidatedMethod({
  name: 'category.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.value': { type: String},
    'update.label': {type : String},
  }).validator(),
  run({ _id, update }) {
    Categories.update(_id, { $set: update });
  },
});

export const getCategories = new ValidatedMethod({
  name: 'categories.retrieve',
  validate : new SimpleSchema({}).validator(),
  run(){
    Categories.find({
      userId : {$in: ["admin", Meteor.userId()]} //admin user hardcoded on seeding - so find all global and user specific categories
    }).fetch()
  }
})

export const removeCategory = new ValidatedMethod({
  name: 'category.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Categories.remove(_id);
  },
});
