import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  query: String,
  status: {
    type: String,
    required: true,
  }
});
const Data = mongoose.model("Data", dataSchema);

export default Data;