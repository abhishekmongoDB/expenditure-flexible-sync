import Schema  from "./Schemas";

import { ObjectId } from "bson";


class SalaryRealm {

    constructor({
        year,
        month,
        amount,
        user_id
      }) {
        this._id = new ObjectId();
        this.year = year;
        this.month = month;
        this.amount = amount;
        this.user_id = user_id;
      }

      
    static schema = {
        name: Schema.Salary,
        properties: {
            _id: "objectId",
            user_id: "string",
            year: "int",
            month: "int", 
            amount: "int",
        },
        primaryKey: '_id',

    };
}

export {  SalaryRealm };

