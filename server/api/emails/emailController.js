var _ = require('lodash');
var amqp = require('amqplib/callback_api');

var sendMessage = function(topic, msg, res) {
    var amqpURL;

    if (process.env.NODE_ENV === 'production') {
        amqpURL = process.env.CLOUDAMQP_URL;
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
        // setTimeout(function() { conn.close(); }, 60000);
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
            sendMessage('website_email_service', req.body, res);
        }
    } else {
        if (!validEmail(req.body.email)) {
            res.status(400).send('Invalid email!');
        } else {
            sendMessage('website_email_service', JSON.stringify(req.body), res);
        }
    }
    
};
