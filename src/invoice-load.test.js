import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
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

  check(res, {
    'is status 200': (r) => r.status === 200
  });
  
  sleep(1);
}