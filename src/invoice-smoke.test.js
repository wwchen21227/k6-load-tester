import http from 'k6/http';
import { sleep, check } from 'k6';

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
    'is status 200': (r) => r.status === 200,
  });
  
  sleep(1);
}

// export function setup() {
//     //setup code
// }

// export function teardown(data) {
// // teardown code
// }