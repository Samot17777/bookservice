var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/book_inventory_service';

var collection = MongoClient.connect(url, {db: {bufferMaxEntries: 0}}).then(function (db) {
    return db.collection('books');
});
collection.then(function () {
    console.log("connection to DB established");
}).catch(function (err) {
    console.error(err);
    process.exit(1);
});

module.exports = {
    stockUp: function (isbn, count) {
        return collection.
            then(function (collection) {
                return collection.updateOne({isbn: isbn}, {
                    isbn: isbn,
                    count: count
                }, {upsert: true});
            });
    },
    findAll: function () {
        return collection.
            then(function (collection) {
                return collection.find({}).toArray();
            });
    }
}