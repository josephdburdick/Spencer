//we need to return the unique years for year button group
//import Expenses from '../api'
import Expenses from './expenses.js'
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  sortByPrice : function(sortType){
    console.log(`inside sort by price and sort type is ${sortType}`)
    return true;
  },
  sortByDate : function(sortType){
    console.log(`inside sort by date and sort type is ${sortType}`)
    return true;
  },
  sortByCategory : function(categories){
    console.log(`inside sortByCategory and categories is ${categories}`);
    return true;
  },
  getDistinctYears : function(){
    console.log(`inside getDistinctYears`)
    //this function is to get all unique years to set the years buttons.

    // Expenses.aggregate([
    //     { "$project": {
    //          "year": { "$year": "$dateCreated" }
    //     }},
    //     { "$group": {
    //         "_id": null,
    //         "distinctDate": { "$addToSet": { "year": "$year"}}
    //     }}
    // ]

  },
  groupByMonth : function(month){
    console.log(`inside groupByMonth and month is ${month}`)
    // Expenses.aggregate(
    //    { "$project": {
    //         "year":{"$year":"$createdAt"},
    //         "month":{"$month":"$createdAt"},
    //    },
    //    { "$match":{
    //         "year" :2015,
    //         "month": 3
    //      }
    //    }
    // });
  },
  groupByQuarter : function(quarter){
    console.log(`inside groupByQuarter and quarter is ${quarter}`)
    //Q1 = Jan, Feb, March         =  months  1,2,3
    //Q2 = April, May, June,       =  months  4, 5,6,
    //Q3 = July, August, September = months 7,8,9
    //Q4 = Oct, Nov, Dec           = months 10,11,12

    // Expenses.aggregate(
    //    { "$project": {
    //         "year":{"$year":"$createdAt"},
    //         "month":{"$month":"$createdAt"},
    //    },
    //    { "$match":{
    //         "year" :2015,
    //         "month": EQUALS 1,2,3 - this is wrong but needs to be a way to check array of months
    //      }
    //    }
    // });

  }

})

//search for a specific month & year - pass month and year into the function.
