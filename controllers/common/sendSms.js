
    const httpRequest = require('https');
  exports.sendSms = function(userNumber, otp){

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const data =`{

      "userName":$``,
    "numbers": "966581322413",
    "userSender":"OTP",
    "apiKey":"8250abc331949440f3029bf6c05f62c8",
    "msg":"رمز التحقق: 1234"
    }`;

    const request = httpRequest.request('https://www.msegat.com/gw/sendsms.php', options, response => {

      let responseData = '';

      response.on('data', dataChunk => {

        responseData += dataChunk;
      });
      response.on('end', () => {
        console.log('Response: ', responseData)
      });
    });

    request.on('error', error => console.log('ERROR', error));

    request.write(data);
    request.end();
      }