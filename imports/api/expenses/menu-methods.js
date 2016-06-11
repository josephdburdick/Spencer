//we need to return the unique years for year button group
//import Expenses from '../api'
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
  }
})
Expenses.aggregate([
    { "$project": {
         "year": { "$year": "$dateCreated" }
    }},
    { "$group": {
        "_id": null,
        "distinctDate": { "$addToSet": { "year": "$year"}}
    }}
]
//search for a specific month & year - pass month and year into the function.

Expenses.aggregate(
 { "$project": {
      "year":{"$year":"$createdAt"},
      "month":{"$month":"$createdAt"},
 },
 { "$match":{
      "year" :2015,
      "month": 3
   }
 })
