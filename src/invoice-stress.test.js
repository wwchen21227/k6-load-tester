import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
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