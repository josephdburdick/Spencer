import { Businesses } from './businesses';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertBusiness = new ValidatedMethod({
  name: 'businesses.insert',
  validate: new SimpleSchema({
    userId: { type: String },
    title: { type: String }
  }).validator(),
  run(document) {
    Businesses.insert(document);
  },
});

export const updateBusinesse = new ValidatedMethod({
  name: 'businesses.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    Businesses.update(_id, { $set: update });
  },
});

export const removeBusiness = new ValidatedMethod({
  name: 'businesses.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Businesses.remove(_id);
  },
});
