var _ = require('lodash');
var amqp = require('amqplib/callback_api');

var sendMessage = function(topic, msg, res) {
    var amqpURL;

    if (process.env.NODE_ENV === 'production') {
        amqpURL = process.env.RABBITMQ_BIGWIG_URL;
    } else {
        amqpURL = 'amqp://localhost';
    }
    amqp.connect(amqpURL, function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue(topic, {durable: false});
            // Note: on Node 6 Buffer.from(msg) should be used
            ch.sendToQueue(topic, new Buffer(msg));
            console.log(" [x] Sent %s", msg);
        });
    res.json({ status: 'Email Send request sent!' });
    // setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
}

var validEmail = function(email) {
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email);
}

exports.post = (req, res, next) => {

    if (_.isString(req.body)) {
        if (!validEmail(JSON.parse(req.body).email)) {
            res.status(400).send('Invalid email!');
        } else {
            sendMessage('hello_test', req.body, res);
        }
    } else {
        if (!validEmail(req.body.email)) {
            res.status(400).send('Invalid email!');
        } else {
            sendMessage('hello_test', JSON.stringify(req.body), res);
        }
    }
    
};
