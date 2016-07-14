import { Businesses } from './businesses';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertBusiness = new ValidatedMethod({
  name: 'business.insert',
  validate: new SimpleSchema({
    value: { type: String },
    label: { type : String }
  }).validator(),
  run(document) {
    if(Businesses.findOne({value: document["value"]})){
      console.log(`found business ${document["value"]} so not inserting`)
    } else{
      document["userId"] = Meteor.userId();
      Businesses.insert(document);
    }
  }
});

export const updateBusinesse = new ValidatedMethod({
  name: 'businesses.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true }
  }).validator(),
  run({ _id, update }) {
    Businesses.update(_id, { $set: update });
  }
});

export const removeBusiness = new ValidatedMethod({
  name: 'businesses.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Businesses.remove(_id);
  }
});
