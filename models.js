module.exports = function() {
  var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'switchboard',
      charset: 'utf8'
    }
  });

  var bookshelf = require('bookshelf')(knex);

  var Location = bookshelf.Model.extend({
    tableName: 'location',
    channels: function() {
      return this.belongsToMany(Channel).through(LocationChannel);
    }
  });

  var Channel = bookshelf.Model.extend({
    tableName: 'channel',
    locations: function() {
      return this.belongsToMany(Location).through(LocationChannel);
    }
  });

  var LocationChannel = bookshelf.Model.extend({
    tableName: 'location_channel',
    locations: function() {
      return this.belongsTo(Location);
    },
    channels: function() {
      return this.belongsTo(Channel);
    }
  });

  var Content = bookshelf.Model.extend({
    tableName: 'content'
  });

  return {
    Location: Location,
    Channel: Channel,
    Content: Content
  }
}
