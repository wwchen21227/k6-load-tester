# k6 load tester
A project to perform smoke, load and strees testing to backend service, api or website. 

# Warning 
Please be careful with where you test, make sure you know what you are doing. 

> With great power there must also come great responsibility!

## How to run
First time, please give permission to the shell script.
```
chmod +x runTest.sh
```

Currently the test run inside a container, by running the runTest.sh, you will run docker-compose to start a container and execute the tests inside it. The container will stopped after the tests completed. 

The command in the docker compose will run the tests e.g. "k6 run ./invoice-smoke.test.js", you can change it to suit your need.
```
./runTest.sh
```

## Environment Variables
You can use .env file to pass in testing variables. e.g.
const host = __ENV.HOST;

## Testing result output:
- [x] stdout (default)
- json file
- datadog
- many more options

## k6 built-in metric

| metric        | type      | description    |
| :---          |    :----: |      :---     |
| vus           | Gauge     | Current number of active virtual users |
| vus_max       | Gauge     | Max possible number of virtual users (VU resources are preallocated to ensure performance will not be affected when scaling up the load level) |
| iterations    | Counter   | The aggregate number of times the VUs in the test have executed the JS script (the default function). Or in case the test is not using a JS script but accessing a single URL the number of times the VUs have requested that URL | 
| data_received | Counter   | The amount of received data |
| data_sent     | Counter   | The amount of data sent |
| checks        | Rate      | Number of failed checks. |

## k6 HTTP-specific built-in metrics

| metric                    | type          | description       | datatype |
| :---                      |    :----:     |    :---           |       ---: |
| http_reqs                 | Counter       | How many HTTP requests has k6 generated in total  | integer
| http_req_blocked          | Trend        | Time spent blocked (waiting for a free TCP connection slot) before initiating request | float     |
| http_req_looking_up       | Trend        | Time spent looking up remote host name in DNS | float     |
| http_req_connecting       | Trend        | Time spent establishing TCP connection to remote host | float      |
| http_req_tls_handshaking   | Trend        | Time spent handshaking TLS session with remote host | float     |
| http_req_sending          | Trend        | Time spent sending data to remote host | float      |
| http_req_waiting          | Trend        | Time spent waiting for response from remote host (a.k.a. time to first byte or TTFB) | float      |
| http_req_receiving	    | Trend        | Time spent receiving response data from remote host | float     |
| http_req_duration         | Trend        | Total time for the request. It's equal to http_req_sending + http_req_waiting + http_req_receiving (i.e. how long did the remote server take to process the request and respond (without the initial DNS lookup/connection times) | float      |

### Reference:
- [Documentation](https://k6.io/docs/)
- [Examples](https://k6.io/docs/examples)
- [Visual Studio Code Extension](https://k6.io/docs/misc/intellisense)
- [Typescript template](https://github.com/k6io/template-typescript)
- [Converters](https://k6.io/docs/integrations#converters)