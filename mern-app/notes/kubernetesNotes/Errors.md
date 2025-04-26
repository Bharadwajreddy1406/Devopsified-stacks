## 🚨 **1. Nginx 404 Not Found due to Inconsistent Service Naming**

#### **⚠️ The Issue:**

I was trying to hit the app through the Nginx Ingress controller, but I kept getting a `404 Not Found` error. Nginx was routing the traffic, but it couldn’t find the correct service to forward it to.

#### **🔍 The Cause:**

It turns out the issue was due to inconsistent naming across my Kubernetes resources:

- **server-service.yml** had the `selector` set to `app:backend` and metadata set to `backend-service`.
    
- **Ingress.yml** was also referring to `backend-service`.
    
- **Deployment** had the label `app:server`.
    

So, Nginx Ingress couldn't find the service and threw a `404` error.

#### **🛠️ The Fix:**

I aligned the names across my resources:

- Changed the `server-service.yml` selector to match the deployment’s label, i.e., `app:server`.
    
- Updated the metadata name of the service to `server-service` to match the Ingress definition.
    
- In **Ingress.yml**, I changed `backend-service` to `server-service` to match the service name.
    

Applied the changes with:

```bash
kubectl apply -f server-service.yaml
kubectl apply -f ingress.yaml
```

And voilà! The `404` was gone, and traffic was routed correctly 🎉.

---

### 🚧 **2. 503 Service Temporarily Unavailable (Service Not Found)**

#### **⚠️ The Issue:**

After fixing the initial 404 issue, I encountered another error: `503 Service Temporarily Unavailable`. This was indicating that Nginx couldn’t find the service at all.

#### **🔍 The Cause:**

When I checked the pod status using:

```bash
kubectl get pods
```

I found that the containers were in a `CrashLoopBackOff` state. So, the issue wasn’t with Nginx or the Ingress, but with the pods themselves. They were crashing due to a missing environment variable for the MongoDB URI.

#### **🛠️ The Fix:**

I checked the logs of one of the crashing pods:

```bash
kubectl logs <pod-name>
```

And found that the logs showed:

```
MongoDB connection error: MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
```

The cause was that my deployment was using `MONGO_URI`, but my code was looking for `MONGODB_URI`.

I fixed this by updating the environment variable name in the deployment file:

```yaml
env:
  - name: MONGODB_URI
    valueFrom:
      secretKeyRef:
        name: mongodb-secret
        key: mongodb-uri
```

After that, I restarted the deployment with:

```bash
kubectl rollout restart deployment server-deployment
```

---

### 🧐 **3. Service Not Found (Ingress Issue)**

#### **⚠️ The Issue:**

I still got a `503` error even though the pod containers were running fine after the fix. It seemed to be related to the Ingress not routing properly.

#### **🔍 The Cause:**

The problem was that the Ingress was set to route traffic to the `api.taskmanager` hostname. However, I hadn’t configured my local machine to resolve `api.taskmanager` to Minikube’s IP address (`localhost`).

#### **🛠️ The Fix:**

1. **Start Minikube Tunnel:** First, I ran the `minikube tunnel` command, which allows Minikube to accept traffic from my local machine:
    
    ```bash
    minikube tunnel
    ```
    
2. **Update `/etc/hosts`:** I updated my `/etc/hosts` file to map `api.taskmanager` to `127.0.0.1` so that requests to `api.taskmanager` would go to Minikube’s local IP:
    
    ```bash
    sudo nano /etc/hosts
    ```
    
    Added this line:
    
    ```
    127.0.0.1 api.taskmanager
    ```
    
3. **Access the Service:** After the change, I went to `http://api.taskmanager` in my browser, and voilà! It worked perfectly 🎉.
    

---

### 📝 **Logging Commands Used:**

Here’s a quick recap of the commands I used to diagnose and resolve the issues:

1. **Check Pod Status:**
    
    To check if the pods were running:
    
    ```bash
    kubectl get pods
    ```
    
2. **Get Logs from a Pod:**
    
    To check what went wrong in the container:
    
    ```bash
    kubectl logs <pod-name>
    ```
    
    If you need logs from the previous container instance:
    
    ```bash
    kubectl logs --previous <pod-name>
    ```
    
3. **Rollout Restart for Deployment:**
    
    After making changes to the deployment, I restarted the pods:
    
    ```bash
    kubectl rollout restart deployment server-deployment
    ```
    
4. **Check Kubernetes Secrets:**
    
    To see the secret contents (in this case, the MongoDB URI):
    
    ```bash
    kubectl get secret mongodb-secret -o yaml
    ```
    

---

### 🎉 **How It Worked:**

1. **Minikube Tunnel:**  
    I started the tunnel using `minikube tunnel`, which allowed Minikube to route traffic from my browser to the Kubernetes cluster.
    
2. **Ingress Hostname Configuration:**  
    I had the `ingress.yml` file set to route traffic based on the `api.taskmanager` hostname, so all requests with the `Host: api.taskmanager` header were forwarded to the service.
    
3. **Host File Mapping:**  
    I mapped `api.taskmanager` to `127.0.0.1` in my local `/etc/hosts` file so that the request could be routed to Minikube’s local IP.
    
4. **Final Testing:**  
    After making the necessary changes, I hit `http://api.taskmanager` in the browser, and everything worked as expected 🎉🚀!
    

---
