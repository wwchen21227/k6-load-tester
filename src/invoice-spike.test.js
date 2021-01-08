import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

const host = __ENV.HOST;
const userId = __ENV.USER_ID;
const testInvoiceId = __ENV.TEST_INVOICE_ID;

const params = {
    headers: {
        'x-api-key': __ENV.API_KEY,
    },
};

export default function() {
  let res = http.get(`${host}/users/${userId}/invoices/${testInvoiceId}`, params);
  
  sleep(1);
}