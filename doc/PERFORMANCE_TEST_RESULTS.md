1. Loading the assignment page ([performance-test-visit-page.js](../k6/performance-test-visit-page.js))

```js
     data_received..................: 69 MB  6.8 MB/s
     data_sent......................: 308 kB 31 kB/s
     http_req_blocked...............: med=1.91µs  p(99)=4.57µs  
     http_req_connecting............: med=0s      p(99)=0s      
     http_req_duration..............: med=22.6ms  p(99)=38.32ms 
       { expected_response:true }...: med=22.6ms  p(99)=38.32ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 3846
     http_req_receiving.............: med=55.18µs p(99)=116.74µs
     http_req_sending...............: med=7.98µs  p(99)=17.36µs 
     http_req_tls_handshaking.......: med=0s      p(99)=0s      
     http_req_waiting...............: med=22.53ms p(99)=38.24ms 
     http_reqs......................: 3846   383.852808/s
     iteration_duration.............: med=22.65ms p(99)=38.38ms 
     iterations.....................: 3846   383.852808/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10
```

2. Assignment submission ([performance-test-submit.js](../k6/performance-test-submit.js))

2.1. Before caching and message queues

```js
     data_received..................: 6.2 MB 621 kB/s
     data_sent......................: 3.7 MB 374 kB/s
     http_req_blocked...............: med=1.82µs  p(99)=5.19µs 
     http_req_connecting............: med=0s      p(99)=0s     
     http_req_duration..............: med=3.29ms  p(99)=5.07ms 
       { expected_response:true }...: med=3.29ms  p(99)=5.07ms 
     http_req_failed................: 0.00%  ✓ 0           ✗ 19708
     http_req_receiving.............: med=27.45µs p(99)=68.59µs
     http_req_sending...............: med=10.05µs p(99)=28.73µs
     http_req_tls_handshaking.......: med=0s      p(99)=0s     
     http_req_waiting...............: med=3.25ms  p(99)=5.01ms 
     http_reqs......................: 19708  1970.163911/s
     iteration_duration.............: med=3.36ms  p(99)=5.15ms 
     iterations.....................: 19708  1970.163911/s
     vus............................: 10     min=10        max=10 
     vus_max........................: 10     min=10        max=10 
```

2.2. After caching and message queues

```js
     data_received..................: 6.1 MB 609 kB/s
     data_sent......................: 6.2 MB 622 kB/s
     http_req_blocked...............: med=2.28µs  p(99)=6.43µs
     http_req_connecting............: med=0s      p(99)=0s    
     http_req_duration..............: med=2.64ms  p(99)=7.69ms
       { expected_response:true }...: med=2.64ms  p(99)=7.69ms
     http_req_failed................: 0.00%  ✓ 0           ✗ 32762
     http_req_receiving.............: med=34.12µs p(99)=85µs  
     http_req_sending...............: med=12.12µs p(99)=29.2µs
     http_req_tls_handshaking.......: med=0s      p(99)=0s    
     http_req_waiting...............: med=2.6ms   p(99)=7.62ms
     http_reqs......................: 32762  3275.539735/s
     iteration_duration.............: med=2.72ms  p(99)=7.78ms
     iterations.....................: 32762  3275.539735/s
     vus............................: 10     min=10        max=10 
     vus_max........................: 10     min=10        max=10 
```