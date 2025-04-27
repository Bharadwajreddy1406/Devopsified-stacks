# 🌐 **Ingress - The Traffic Director for Your Kubernetes Cluster** 🚦

Okay, so imagine you’ve got multiple services running inside your Kubernetes cluster (like **Frontend** and **Backend**). Now, if someone tries to access your application from the outside world, **how do they know where to go**? 🧐

Enter **Ingress** – the **gatekeeper**. It listens for incoming requests and then routes them to the right service based on **rules** you define. 🌟

---

# 🧑‍💻 **The Ingress YAML Breakdown!** 👇

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress  # The name of the Ingress resource
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /  # Rewrites URL paths before sending the traffic to the service
spec:
  ingressClassName: nginx  # The ingress controller (nginx in this case)
  rules:
    - host: api.taskmanager  # Host for the backend service
      http:
        paths:
          - path: /  # Path pattern (everything starting with /)
            pathType: Prefix  # The pathType tells how to match paths (Prefix means it will match / and everything below it)
            backend:
              service:
                name: server-service  # The service to forward the traffic to (backend service)
                port:
                  number: 5000  # The port to access the service on

    - host: taskmanager  # Host for the frontend service
      http:
        paths:
          - path: /  # Path pattern (everything starting with /)
            pathType: Prefix  # Prefix match for the path
            backend:
              service:
                name: client-service  # The service to forward the traffic to (frontend service)
                port:
                  number: 80  # The port to access the frontend service
```

---

# 🎬 **Explaining This YAML:**

### **1. `metadata.name: app-ingress`**

This is the **name** of the Ingress resource. It's just a friendly identifier for Kubernetes to know which Ingress you’re talking about. In this case, it's **`app-ingress`**. 🚀

### **2. `nginx.ingress.kubernetes.io/rewrite-target: /`**

This is an **annotation**! Annotations are like **metadata** about the resource but not directly related to the resource's core function. This one tells the **Nginx Ingress Controller** to **rewrite the URL path** to just `/` before it forwards the request to the backend service. 🔄

So, if someone hits `api.taskmanager/some/path`, this annotation will strip out `/some/path` and only send the `/` to your backend service. **Neat**, huh? 😏

### **3. `ingressClassName: nginx`**

This tells Kubernetes **which Ingress controller** should manage this Ingress. In this case, it's **Nginx**. You could have other Ingress controllers, but **Nginx** is a popular choice for its robust features and flexibility. 🖥️💥

---

### **4. Rules! The Heart of the Ingress** 💓

Now, let's talk about the **rules**. This is where the magic happens. Kubernetes needs to know **how to route** the incoming traffic. Here's how the rules are set up:

#### **Rule 1 - Backend Service (API)** 🖥️:

```yaml
- host: api.taskmanager  # Matches requests to api.taskmanager
  http:
    paths:
      - path: /  # Matches everything starting with '/'
        pathType: Prefix  # 'Prefix' means it will match /, /api, /api/v1, etc.
        backend:
          service:
            name: server-service  # Routes traffic to the 'server-service' backend
            port:
              number: 5000  # The port that the backend service listens on
```

- When a request hits **`api.taskmanager`**, it’s routed to the **backend service** (`server-service`) on **port 5000**. Easy!
    

#### **Rule 2 - Frontend Service (Client)** 💻:

```yaml
- host: taskmanager  # Matches requests to taskmanager
  http:
    paths:
      - path: /  # Again, matches everything starting with '/'
        pathType: Prefix  # 'Prefix' means it will match /, /home, /login, etc.
        backend:
          service:
            name: client-service  # Routes traffic to the 'client-service' frontend
            port:
              number: 80  # The port that the frontend service listens on
```

- When a request hits **`taskmanager`**, it’s routed to the **frontend service** (`client-service`) on **port 80**.
    

---

### **5. Path Types! 🤸‍♀️**

Here’s a cool thing—**pathType**. The `pathType: Prefix` means that **all URLs that start with `/`** will match. So, `/home`, `/about`, `/admin` – all those paths will go to the right service. 💡

If you wanted **exact matches**, you could use `pathType: Exact`, but here we’re using `Prefix` to match anything under that path. **Super flexible!** 🧙‍♂️

---

# 💡 **Why is Ingress So Awesome?**

- **Centralized Routing:** You don’t need to expose multiple services directly to the outside world. Ingress is the **single entry point** for all external traffic. 🚪
    
- **Host-based Routing:** With Ingress, you can route traffic based on the **hostname** (like `api.taskmanager` for the backend and `taskmanager` for the frontend). 🏠
    
- **Path-based Routing:** And you can also route traffic based on the **path**—like `/api` going to your backend and `/home` going to your frontend. 😎
    

---

![[ingress.png]]
