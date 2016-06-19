import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Expenses = new Mongo.Collection('Expenses');

Expenses.schema = new SimpleSchema({
  userId: {
    type: String
  },
  price: {
    type: Number,
    label: 'Price',
    decimal: true
  },
  description: {
    type: String,
    label: 'Description of expense'
  },
  business: {
    type: String,
    label: 'Name of the associated business'
  },
  category: {
    type: [String],
    label: 'Categories of expense'
  },
  dateCreated: {
    type: Date,
    label: 'Date created'
  }
});

Expenses.attachSchema(Expenses.schema);

Factory.define('expense', Expenses, {
  userId: () => faker.random.uuid(),
  price: () => faker.commerce.price(),
  description: () => faker.commerce.productName(),
  business: () => faker.company.companyName(),
  category: () => {
    const categories_array = [ "Auto & Transport",
                                "Auto Insurance",
                                "Auto Payment",
                                "Gas & Fuel",
                                "Parking",
                                "Public Transportation",
                                "Service & Parts",
                                "Bills & Utilities",
                                "Home Phone",
                                "Internet",
                                "Mobile Phone",
                                "Television",
                                "Utilities",
                                "Business Services",
                                "Advertising",
                                "Legal",
                                "Office Supplies",
                                "Printing",
                                "Shipping",
                                "Education",
                                "Books & Supplies",
                                "Student Loan",
                                "Tuition",
                                "Entertainment" ];
    const categories = [];
    const categories_count = faker.random.number({min:1, max:4});
    for (let i = 0; i < categories_count; i++) {
      const category_item = faker.random.arrayElement(categories_array);
      categories.push(category_item);
    }
    return categories;
  },
  dateCreated: () => faker.date.between('2014-01-01', '2016-12-31')
});
// for (let i = 0; i < 50; i++) {
//   Factory.create('expense');
// }
