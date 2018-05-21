
var mysql = require('mysql');
var config = require('../server/config/config')
var bcrypt = require('bcryptjs')
var connection;
function handleDisconnect() {
    connection = mysql.createConnection(config.mysql); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      if(err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ETIMEDOUT') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();

exports.query = (sql, callback) => {
    connection.query(sql, function (err, result) {
        if (err) callback(err, null);
        callback(null, result);
    });
}