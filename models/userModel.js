import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    addresses: { type: [Schema.Types.Mixed] },
    role: { type: String, required: true, default: "user" },
    password: { type: String, required: true },
    passwordResetToken:{type: String , default : ''}
  },
  { collection: "users" ,timestamps: true},
  
);

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const userModel = mongoose.model("user", userSchema);
export default userModel;

// {
//     "id": "64a9",
//     "email": "try@gmail.com",
//     "addresses": [
//       {
//         "name": "Akash Naik",
//         "email": "test@gmail.com",
//         "phone": "7028679424",
//         "street": "Vaddem",
//         "city": "Vasco",
//         "state": "Goa",
//         "pincode": "403802"
//       },
//       {
//         "name": "Jack Marston",
//         "email": "jack@gmail.com",
//         "phone": "1234567898",
//         "street": "street",
//         "city": "city",
//         "state": "state",
//         "pincode": "123456"
//       },
//       {
//         "name": "John Marston",
//         "email": "john@gmail.com",
//         "phone": "12354598",
//         "street": "street",
//         "city": "city",
//         "state": "state",
//         "pincode": "123456"
//       },
//       {
//         "name": "Abigail Marston",
//         "email": "abigail@gmail.com",
//         "phone": "123456876",
//         "street": "street",
//         "city": "city",
//         "state": "state",
//         "pincode": "pincode"
//       }
//     ],
//     "role": "user",
//     "password": "try"
//   }
