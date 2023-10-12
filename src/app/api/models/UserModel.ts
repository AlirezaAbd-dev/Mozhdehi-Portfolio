import mongoose, { InferSchemaType, Model } from 'mongoose';

const courseSchema = {
   _id: {
      type: mongoose.SchemaTypes.ObjectId,
      unique: true,
      auto: true,
   },
   name: { type: String, required: true },
   price: { type: Number, required: true },
   duration: { type: String, required: true },
};

export const userSchema = new mongoose.Schema({
   username: { type: String, required: true },
   password: { type: String, required: true },
   name: { type: String, required: true },
   yearOfBirth: { type: Number, required: true },
   city: { type: String, required: true },
   email: { type: String, required: true },
   phone: { type: String, required: true },
   introductions: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         text: { type: String, required: true },
      },
   ],
   skills: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         name: { type: String, required: true },
         rate: { type: Number, require: true },
      },
   ],
   educations: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         certificate: { type: String, required: true },
         duration: { type: String, required: true },
         major: { type: String, required: true },
         university: { type: String, required: true },
      },
   ],
   projects: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         name: { type: String, required: true },
         image: { type: String, required: true },
         reference: { type: String, required: false },
      },
   ],
   works: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         company: { type: String, required: true },
         time: { type: String, required: true },
         post: { type: String, required: true },
      },
   ],
   books: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         name: { type: String, required: true },
         image: { type: String, required: true },
         reference: { type: String, required: false },
      },
   ],
   articles: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         name: { type: String, required: true },
         image: { type: String, required: true },
         reference: { type: String, required: false },
      },
   ],
   schedules: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         name: { type: String, required: true },
         time: { type: String, required: true },
         place: { type: String, required: true },
      },
   ],
   courses: [courseSchema],
   orders: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         name: { type: String, required: true },
         phone: { type: String, required: true },
         age: { type: Number, required: true },
         freeTime: { type: String, required: true },
         course: { type: courseSchema, required: true },
      },
   ],
});

export type UserSchemaType = InferSchemaType<typeof userSchema>;

const UserModel =
   (mongoose.models.Users as Model<UserSchemaType>) ||
   mongoose.model('Users', userSchema);

export default UserModel;
