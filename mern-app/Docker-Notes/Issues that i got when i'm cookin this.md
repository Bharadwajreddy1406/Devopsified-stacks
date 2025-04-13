###### I've written this with GPT but, I gave it the doc of issues that I got 
## 🚀 STAGE 1: Building the React (TypeScript) Client in Docker

### 🧱 Problem

My build failed because TypeScript threw an error on unused imports:

```ts
error TS6133: 'Task' is declared but its value is never read.
```

That’s a TypeScript **compiler error** when `"noUnusedLocals": true` or by default in strict mode.

### 🛠 Fix

You relaxed the config:

- ✅ `noUnusedLocals: false` in `tsconfig.app.json`
    
- ✅ `noEmitOnError: false` to allow emitting output even with errors
    

```json
{
  "compilerOptions": {
    "noUnusedLocals": false,
    "noEmitOnError": false
  }
}
```

Now the build could proceed even if your code wasn't 100% squeaky clean.
because we just ignore the issues like , bruh this import was never used, this variable was never used, and all.

---

## 🚀 STAGE 2: Writing the Docker Setup

we nailed this:

```yaml
services:
  client: ...
  server: ...
  mongo: ...
```

The client depends on server, server depends on mongo. All good. Docker Compose gives them **internal networking** using service names as hostnames (e.g., `http://server:5000`).

---

## 🚧 STAGE 3: Nginx Default Config was a Blocker

### 😤 Problem

You used the default Nginx setup, and it was doing something like:

```nginx
location / {
  root /usr/share/nginx/html;
  index index.html;
}
```

>what it means is when the user hits localhost with / then he will be shown the html file. 
> we got the html and css, js files by build anyway and we copied them to nginx
> so nginx will serve the client side, but the client eventually hits /api/tasks as localhost:5000/api/tasks was mentioned in .env

Frontend worked, but when it tried hitting `/api/tasks`, it failed because:

- It was trying to send the request to `localhost` inside the Nginx container
    
- But `localhost:5000` inside the Nginx container doesn't have your backend server
    
- Result? ❌ `502 Bad Gateway`
    

---

## 🔧 STAGE 4: Fixing Proxy with Custom Nginx Config

we rewrote `nginx.conf`  👇

```nginx
location /api/tasks {
    proxy_pass http://server:5000/api/tasks;
}
```

> 🔑 **Key fix**: Changed `localhost` ➡️ `server`  
> This tells Nginx: “Yo, forward this request to the backend container named `server` at port 5000.”

You also added the classic proxy headers (good habit):

```nginx
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
...
```

Now Nginx can successfully route traffic from `localhost/api/tasks` ➡️ backend server ➡️ MongoDB (if needed) ➡️ response to frontend.

---

## 🧠 HOW IT ALL FLOWS INTERNALLY (REQUEST FLOW)

```bash
Browser:       http://localhost
↓
Host Machine: Port 80 is mapped to client container's port 80
↓
Nginx (client container)
- Serves index.html for /
- For /api/tasks:
    proxy_pass → http://server:5000/api/tasks
↓
Docker internal network → server container
↓
Express.js backend → fetches tasks from MongoDB
↓
Response goes back through proxy → browser
```

---

## ⚙️ DOCKER NETWORKING DEEP DIVE

- Docker Compose creates a **default network**
    
- All services (`client`, `server`, `mongo`) are connected to it
    
- Containers can resolve each other via service name (e.g., `server`, `mongo`)
    
- You should **never** use `localhost` for cross-container calls. Always use the service name!
    

---

## 📚 ISSUES WE FACED + FIXES

|Issue|Why It Happened|How We Fixed It|
|---|---|---|
|TypeScript build error|Strict unused variable rules|Relaxed `tsconfig.app.json`|
|`502 Bad Gateway`|Nginx tried hitting localhost:5000 which didn't exist inside the container|Used `server:5000` in `proxy_pass`|
|Nginx default config ignored SPA behavior|Didn't route unknown paths to `index.html`|Used `try_files $uri /index.html;`|
|Docker networking confusion|`localhost` in Docker means inside that container|Used Docker service names (`server`, `mongo`)|

---

for more, read 