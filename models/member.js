import mongoose from "mongoose";
const Schema = mongoose.Schema;
import {nanoid} from "nanoid";

/* 
VSNA.Member 
{
  {
  "_id": {
    "$oid": "65a9f41781217ade5c1841e9"
  },
  "mId": "m3",
  "address": "a3",
  "contact": 1234567890,
  "email": "e3@mail.com",
  "mExpireDate": {
    "$date": "2025-11-01T18:30:00.000Z"
  },
  "chapter": [
    "California",
    "Texas",
    "Hawaii"
  ],
  "fName": "f3",
  "lName": "l3",
  "dob": {
    "$date": "1981-05-05T18:30:00.000Z"
  },
  "living": true,
  role: "admin"
}
    */

//create member schema & model
const memberSchema = new Schema ({
    mId: { type: String, required :true, default: () => nanoid(7),
        index: { unique: true },  },
    fName: { type: String, required :true   },
    lName: { type: String  },
    address: { type: String, required :true  },
    contact: { type:Number, required : true },
    email: { type: String, required :true },
    mExpireDate: { type:Date, required :true  },
    chapter: { type:String, required : true  },
    dob: { type:Date, required :true  },
    living: { type:Boolean, required :true  },
    role:{ type:String, required : true }
    },{timestamps: true});

const Member = mongoose.model('Member', memberSchema);

export default Member;
