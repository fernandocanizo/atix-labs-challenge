import got from 'got';
import faker from 'faker';

const msg = () => `${faker.hacker.adjective()} ${faker.hacker.noun()}`;

let payload = {
  message: msg(),
};

console.log('sent:\n', JSON.stringify(payload));

let data = await got.post('http://localhost:3000/v1/log', {
  json: payload,
  timeout: {
    request: 3000,
  },
}).json();

console.log('received:\n', data);
for (let i = 0; i < 1; i++) {
  payload = {
    message: msg(),
    prevSha256: data.sha256,
    nonce: data.nonce,
  };

  console.log('sent:\n', JSON.stringify(payload));
  // I want the delay for the time being
  /* eslint {no-await-in-loop: "off"} */
  data = await got.post('http://localhost:3000/v1/log', {
    json: payload,
    timeout: {
      request: 3000,
    },
  }).json();
  console.log('received:\n', data);
}
