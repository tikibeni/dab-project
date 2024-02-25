1. Loading the assignment page ([performance-test-visit-page.js](../k6/performance-test-visit-page.js))

     data_received..................: 66 MB  6.6 MB/s
     data_sent......................: 298 kB 30 kB/s
     http_req_blocked...............: med=1.87µs  p(99)=4µs     
     http_req_connecting............: med=0s      p(99)=0s      
     http_req_duration..............: med=23.48ms p(99)=39.03ms 
       { expected_response:true }...: med=23.48ms p(99)=39.03ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 3730
     http_req_receiving.............: med=53.51µs p(99)=109.34µs
     http_req_sending...............: med=7.57µs  p(99)=15.3µs  
     http_req_tls_handshaking.......: med=0s      p(99)=0s      
     http_req_waiting...............: med=23.41ms p(99)=38.93ms 
     http_reqs......................: 3730   372.284823/s
     iteration_duration.............: med=23.53ms p(99)=39.1ms  
     iterations.....................: 3730   372.284823/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


2. Assignment submission ([performance-test-submit.js](../k6/performance-test-submit.js))

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
