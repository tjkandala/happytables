const Table = require("../models/table.model");
const shortid = require("shortid");

// simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.table_create = function(req, res) {
  // generate random string or uuid for tableid
  newtableid = shortid.generate();

  let table = new Table({
    tableid: newtableid,
    restaurant: ""
  });

  table.save(function(err) {
    if (err) {
      return next(err);
    }
    console.log(`Table ${newtableid} Created successfully`);
    res.send({ tableid: newtableid });
  });
};

exports.table_details = function(req, res) {
  Table.findOne({ tableid: req.params.tableid }, function(err, table) {
    if (err) return next(err);
    res.send(table);
  });
};
