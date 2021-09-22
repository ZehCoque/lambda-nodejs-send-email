const aws = require("aws-sdk");
const ses = new aws.SES();

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST",
};

exports.handler = async function (event, context, callback) {
  const body = JSON.parse(event.body);

  const ToAddresses = body.ToAddresses;
  const Source = body.Source;
  const Text = { Data: body.Text };
  const Subject = { Data: body.Subject };

  const params = {
    Destination: {
      ToAddresses,
    },
    Message: {
      Body: {
        Text,
      },

      Subject,
    },
    Source,
  };

  const email = await ses.sendEmail(params).promise();

  return callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify(email),
  });
};
