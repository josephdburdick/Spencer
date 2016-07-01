import faker from 'faker';
import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

import { Expenses } from '../../api/expenses/expenses.js';
import { Categories } from '../../api/categories/categories.js';
import categorySeedData from '../../api/categories/categories.json';

const users = [{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: { first: 'Carl', last: 'Winslow' },
  },
  roles: ['admin'],
}];

users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    Roles.addUsersToRoles(userId, roles);
  }
});

if (!Categories.find().count()) {
  categorySeedData.forEach((category) => {
    const result = Categories.insert(category);
  });
}

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
    const category_item = faker.random.arrayElement(categories_array);
    return category_item;
  },
  dateCreated: () => faker.date.between('2010-01-01', '2016-12-31')
});

if (!Expenses.find().count()) {
  for (let i = 0; i < 100; i++) {
    Factory.create('expense');
  }
}
