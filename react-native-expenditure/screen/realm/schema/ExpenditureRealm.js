import { ObjectId } from "bson";
import app from "../RealmApp";

import Schema from "./Schemas";


class ExpenditureRealm {
    constructor({item, amount , date, user_id}) {
        this._id = new ObjectId();
        this.transaction_type = "DEBIT";
        var dateObj = new Date(date);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var year = dateObj.getUTCFullYear();
        this.month = month
        this.year = year
        this.item = item
        this.amount = amount
        this.user_id = user_id
        this.date = dateObj
    }

    
    static schema = {
        name: Schema.Expenditure,
        properties: {
            _id: "objectId",
            transaction_type: "string", 
            user_id: "string",
            item: "string", 
            amount: "int",
            date: "date",
            year: "int",
            month: "int", 
            
        },
        primaryKey: '_id',
    };
}

export { ExpenditureRealm };

