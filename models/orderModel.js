import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: { type: [Schema.Types.mixed],required: true },
  selectedAddress: { type: Object,required: true},
  paymentMethod: { type: String,required: true },
  items: { type: [Object],required: true },
  totalAmount: { type: Number },
  totalItems: { type: Number },
  status: { type: String, required: true, default: "pending" },
},{
    collection: 'orders'
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const orderModel = mongoose.model("order", orderSchema);
export default orderModel;


// {
//     "id": "2660",
//     "user": {
//       "id": "64a9",
//       "email": "try@gmail.com",
//       "addresses": [
//         {
//           "name": "Akash Naik",
//           "email": "test@gmail.com",
//           "phone": "7028679424",
//           "street": "Vaddem",
//           "city": "Vasco",
//           "state": "Goa",
//           "pincode": "403802"
//         },
//         {
//           "name": "Jack Marston",
//           "email": "jack@gmail.com",
//           "phone": "1234567898",
//           "street": "street",
//           "city": "city",
//           "state": "state",
//           "pincode": "123456"
//         },
//         {
//           "name": "John Marston",
//           "email": "john@gmail.com",
//           "phone": "12354598",
//           "street": "street",
//           "city": "city",
//           "state": "state",
//           "pincode": "123456"
//         },
//         {
//           "name": "Abigail Marston",
//           "email": "abi@gmail.com",
//           "phone": "987654321",
//           "street": "street",
//           "city": "city",
//           "state": "state",
//           "pincode": "123456"
//         }
//       ],
//       "role": "user",
//       "password": "try"
//     },
//     "selectedAddress": {
//       "name": "Akash Naik",
//       "email": "test@gmail.com",
//       "phone": "7028679424",
//       "street": "Vaddem",
//       "city": "Vasco",
//       "state": "Goa",
//       "pincode": "403802"
//     },
//     "paymentMethod": "cash",
//     "items": [
//       {
//         "id": "8c94",
//         "title": "Essence Mascara Lash Princess",
//         "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//         "category": "beauty",
//         "price": 21,
//         "discountPercentage": 7.17,
//         "rating": 0,
//         "stock": 5,
//         "tags": [
//           "beauty",
//           "mascara"
//         ],
//         "brand": "Essence",
//         "sku": "RCH45Q1A",
//         "weight": 2,
//         "dimensions": {
//           "width": 23.17,
//           "height": 14.43,
//           "depth": 28.01
//         },
//         "warrantyInformation": "1 month warranty",
//         "shippingInformation": "Ships in 1 month",
//         "availabilityStatus": "Low Stock",
//         "reviews": [
//           {
//             "rating": 2,
//             "comment": "Very unhappy with my purchase!",
//             "date": "2024-05-23T08:56:21.618Z",
//             "reviewerName": "John Doe",
//             "reviewerEmail": "john.doe@x.dummyjson.com"
//           },
//           {
//             "rating": 2,
//             "comment": "Not as described!",
//             "date": "2024-05-23T08:56:21.618Z",
//             "reviewerName": "Nolan Gonzalez",
//             "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
//           },
//           {
//             "rating": 5,
//             "comment": "Very satisfied!",
//             "date": "2024-05-23T08:56:21.618Z",
//             "reviewerName": "Scarlett Wright",
//             "reviewerEmail": "scarlett.wright@x.dummyjson.com"
//           }
//         ],
//         "returnPolicy": "30 days return policy",
//         "minimumOrderQuantity": 24,
//         "meta": {
//           "createdAt": "2024-05-23T08:56:21.618Z",
//           "updatedAt": "2024-05-23T08:56:21.618Z",
//           "barcode": "9164035109868",
//           "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
//         },
//         "images": [
//           "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
//         ],
//         "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
//         "discount": null,
//         "quantity": 1,
//         "productId": 1
//       }
//     ],
//     "totalAmount": 21,
//     "totalItems": 1,
//     "status": "pending"
//   }
