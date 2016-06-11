//we need to return the unique years for year button group
//import Expenses from '../api'
Expenses.aggregate([
    { "$project": {
         "year": { "$year": "$dateCreated" }
    }},
    { "$group": {
        "_id": null,
        "distinctDate": { "$addToSet": { "year": "$year"}}
    }}
]
