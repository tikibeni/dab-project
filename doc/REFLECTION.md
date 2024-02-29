# A brief reflection

The application was designed as per the requirements for passing the project. The topic of the application is a crude
and simple programming practicing website. User can complete programming assignments and progress to more difficult
tasks by completing tasks.

The UI of the project is created using Astro+Svelte on top of Node consisting of a few simple components, a layout
and a JavaScript store, which keeps track of the progression. The frontend is then run inside a Docker container.

User can use the UI to write code into a textarea and submit it. After pressing the submit button, frontend sends
the written code to the server, which grades the code and stores it into a database. Frontend then polls for an
update in a loop regarding the submitted code so that user may get results for their completed assignment. If the 
code fulfills the requirements, the user gets a point and may continue to a next assignment. If not, the user may 
try again after reading the error message.

The server of the project is implemented by simple JavaScript on top of Deno utilizing a PostgreSQL database, which
is configured by using Flyway. The server has a few endpoints used for serving assignments and handling submissions.
The server also communicates with a separate grading API, which decides if the submitted code is adequate or not.
The server is configured so that each submission request is handled by a simple message queue so that each submission
is handled one by one instead of running simultaneously. The backend is also running in a Docker container.

The backend utilizes Redis in caching data regarding assignments and submissions so that they can be served faster.
Backend service is also utilized with a load balancer 

We use NGINX to handle and redirect connections. It is also used in caching static contents and compressing traffic.

Whole project has both development and production configurations provided by Docker Compose. The production version
focuses on serving lighter build versions and maintains the data in volumes.

The project could have benefited from implementing a websocket or pub-sub-Redis pattern regarding the polling of
a submission. Now the frontend is quite heavily polling data each second and can't maintain the polling for more
than 10 seconds. I tried to implement the pub-sub and had the theoretical frame for it, but as the frontend is
running with Node and backend Deno, I somehow couldn't get the Redis to work in the frontend. Therefore I had
to implement whole polling mechanism by hand instead of utilizing Redis' built service.

The backend could also utilize indexing more when accessing the database. Also as per the "passing-
with-merits" requirements, the application could scale the grader for heavier traffic and limit the amount of
submissions one user can submit per a timespan.
