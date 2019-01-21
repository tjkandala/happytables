const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TableSchema = new Schema({
  tableid: { type: String, required: true },
  restaurant: { type: String, required: false },
  filters: { type: Array, required: false }
});

module.exports = mongoose.model("Table", TableSchema);
