
1) when you try to build the typescript project, the first error you get is the unused imports error (assuming you are not that perfect coder with no warnings at all)

the error is something like this 
 => [client build 5/6] COPY . .                                                                                                                        0.1s
 => ERROR [client build 6/6] RUN npm run build                                                                                                         4.2s
------
 > [client build 6/6] RUN npm run build:
0.581
0.581 > client@0.0.0 build
0.581 > tsc -b && vite build
0.581
3.811 src/components/TaskForm.tsx(3,1): error TS6133: 'Task' is declared but its value is never read.

saying un unused thingys


first thing i did was to add or change a line in my tsconfig.json 
` "noUnusedLocals": false` in tsconfig.app.json



and the next thing is to do this

```
// filepath: c:\Users\reddy\OneDrive\Desktop\devops\mern-app\client\tsconfig.app.json
{
  "compilerOptions": {
    // ...existing options...
    "noEmitOnError": false
  }
  // ...existing config...
}
```


.. it built fine, now


now i wrote that docker compose file 
refer it here [[for Docker compose]]


for content, go to the docker-compose.yaml

after that the default nginx configuration was messing up. like, the client side was opening up, but then it's sending the reqeust to localhost/api/tasks instead of :5000 

so i just wrote my own nginx conf with the nginx as proxy to my backend server which on getting requests to localhost/api/tasks will route it back to localhost:5000/api/v1 or some other URL

```
worker_processes auto;

  

events {

    worker_connections 1024;

}

  

http {

    include       mime.types;

    default_type  application/octet-stream;

  

    sendfile        on;

    keepalive_timeout  65;

  

    server {

        listen       80;

        server_name  localhost;

  

        location / {

            root   html;

            index  index.html index.htm;

        }

  

        location /api/tasks {

            proxy_pass http://localhost:5000/api/tasks;

            proxy_set_header Host $host;

            proxy_set_header X-Real-IP $remote_addr;

            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_set_header X-Forwarded-Proto $scheme;

        }

        try_files $uri $uri/ =404;

        # Load configuration files for the default server block.

        include /etc/nginx/default.d/*.conf;

    }

  

    # Load modular configuration files from the /etc/nginx/conf.d directory.

    include /etc/nginx/conf.d/*.conf;

}
```


and then ran the compose file that built the images and ran the containers and both were running fine.