# Understanding How Vite Handles Environment Variables

In a Vite app:

```js
import.meta.env.VITE_API_URL
```

==> This is replaced **at build time**.

After you run:

```bash
npm run build
```

The value becomes hardcoded inside the generated JS files.

There is no environment variable lookup at runtime in the browser.

That means:

If we pass:

```Dockerfile
ARG VITE_API_URL  
ENV VITE_API_URL=$VITE_API_URL
```
And build with:

```bash
docker build --build-arg VITE_API_URL=http://server:5000 .
```
The final static files will contain:

```
"http://server:5000"
```
Hardcoded.

---

# So Is It Fine?

###  YES — If:

- Backend URL is fixed
    
- we are building specifically for that environment
    
- we build separate images per environment (dev, staging, prod)
    

This is normal in production pipelines.

Many companies build:

- frontend:dev
    
- frontend:staging
    
- frontend:prod
    

Each with different API URL baked in.

---
# 🔴 When It Becomes a Problem

If:

- we build image once
    
- Deploy same image to multiple environments
    
- Expect runtime flexibility
    

Then build-time ARG is wrong approach.

Because we need to rebuild image every time backend URL changes.

---
# Real World Practices
---
## Pattern 1 — Build-Time Injection (Simple, Common)



```Dockerfile

ARG VITE_API_URL  
ENV VITE_API_URL=$VITE_API_URL  
RUN npm run build
```

``` docker-compose
build:  
  args:  
    VITE_API_URL: http://server:5000
```
✔ Simple  
✔ Clean  
✔ Good for CI/CD  
❌ Requires rebuild for change

Totally fine for most production setups.

---
## Pattern 2 — Reverse Proxy (Cleaner Architecture)

Instead of exposing backend URL:

Let frontend call:

```js
fetch("/api/tasks")
```

Then configure reverse proxy like NGINX to forward:

```
/api → backend:5000
```

Now frontend doesn’t need backend URL at all.

Advantages:

- No CORS issues
    
- No environment variable needed
    
- Same frontend image works everywhere
    
- Cleaner networking
    

---

## Pattern 3 — Runtime Injection (Advanced)

Inject config via:

- entrypoint script
    
- templating JS file
    
- window._env_ object
    

But this is more complex.

Used when:  
One image must work everywhere without rebuild.

---

# 🧠 In Our Current Docker Compose Setup

we already have:

```yaml
environment:
  - API_URL=http://server:5000
```

But remember:

If we're using Vite build → this environment variable will NOT affect static build.

Because Vite reads at build time, not runtime.

So unless we rebuild client container, this env does nothing.

---
