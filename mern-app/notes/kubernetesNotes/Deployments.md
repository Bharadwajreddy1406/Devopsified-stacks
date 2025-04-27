## **1. `server-deployment` (Backend Deployment)** 🚀

#### apiVersion: apps/v1 📡

- Specifies the version of the Kubernetes API we're using for the Deployment resource.
    

#### kind: Deployment 🛠️

- The resource is of type **Deployment**, which ensures a specific number of replicas (pods) are always running.
    

#### metadata:

```yaml
  name: server-deployment
  labels:
    app: server  # Label here connects to the selector in the Deployment and other resources
```

- **name**: The name of the deployment is `server-deployment`.
    
- **labels**: The label `app: server` is key to connecting the Deployment with its pods and services.
    

#### spec:

```yaml
  replicas: 2
  selector:
    matchLabels:
      app: server  # Selector used to match the 'app: server' label
  template:
    metadata:
      labels:
        app: server  # Label here helps in identifying the pods belonging to this deployment
```

- **replicas**: This tells Kubernetes to run **2 replicas** (pods).
    
- **selector**: The **selector** specifies that the Deployment should manage pods that have the label `app: server`. This is how the Deployment identifies the pods to be managed.
    
- **template**: The **template** defines the pod specification:
    
    - **labels**: Every pod created by this deployment will carry the label `app: server`, allowing the Deployment to identify and manage them properly.
        

[[Secrets]] for the secrets part
#### pod template:

```yaml
    spec:
      containers:
        - name: mern-server
          image: bharadwajreddy1406/mern-server:latest
          ports:
            - containerPort: 5000
          env:
            - name: MONGODB_URI
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: mongodb-uri
          resources:
            limits:
              cpu: "100m"
              memory: "128Mi"
            requests:
              cpu: "50m"
              memory: "64Mi"
```

- **env**: The **MongoDB URI** is injected securely into the container from a secret. This secret reference (`mongodb-secret`) must exist as a Kubernetes Secret resource elsewhere in the cluster.
    

### **2. `client-deployment` (Frontend Deployment)** 🌐

#### apiVersion: apps/v1 📡

- Again, using the `apps/v1` API version.
    

#### kind: Deployment 🛠️

- This is a **Deployment** resource for the frontend.
    

#### metadata:

```yaml
  name: client-deployment
  labels:
    app: client  # Label here connects to the selector in the Deployment and other resources
```

- **name**: The deployment name is `client-deployment`.
    
- **labels**: The label `app: client` is used to connect the deployment with frontend pods and services.
    

#### spec:

```yaml
  replicas: 2
  selector:
    matchLabels:
      app: client  # Selector used to match the 'app: client' label
  template:
    metadata:
      labels:
        app: client  # Label here helps in identifying the pods belonging to this deployment
```

- **replicas**: Here too, we're running **2 replicas** of the frontend pod.
    
- **selector**: The **selector** ensures that only pods with the label `app: client` are managed by this deployment.
    
- **template**: The **template** specifies the pod configuration:
    
    - **labels**: Each pod that this deployment creates will have the `app: client` label.
        

#### pod template:

```yaml
    spec:
      containers:
        - name: mern-client
          image: bharadwajreddy1406/mern-client:latest
          ports:
            - containerPort: 80
          resources:
            limits:
              cpu: "100m"
              memory: "128Mi"
            requests:
              cpu: "50m"
              memory: "64Mi"
```

- **resources**: Specifies the CPU and memory **requests** and **limits** for the frontend container.
    

### **How These Files Connect (Selectors & Labels)** 🔗

Now, let's dive into how the **selectors** and **labels** from the two deployment files are connected and interact with each other:

#### **1. Labels** 🔖

- In both the `server-deployment` and `client-deployment`, **labels** are used to **group** resources. Labels are key-value pairs that help Kubernetes organize and identify resources.
    
- **In `server-deployment`**, we assign the label `app: server` to the Deployment and its corresponding pods. This label is critical for the **selector** to find the pods that belong to this deployment.
    
- **In `client-deployment`**, we assign the label `app: client` to the Deployment and its corresponding pods, which helps **selectors** identify the pods for this deployment.
    

#### **2. Selectors** 🧲

- **The selector** in the `server-deployment` specifies that the deployment should manage only pods with the label `app: server`. In simple terms, the **selector** ensures that the **Deployment** manages the correct pods (those that are labeled `app: server`).
    
    - In the YAML:
        
        ```yaml
        selector:
          matchLabels:
            app: server  # Connects to the pods with the label app: server
        ```
        
- **The selector** in the `client-deployment` does the same for the frontend, only selecting the pods labeled `app: client` to be managed by the deployment.
    

#### **3. Deployment and Pods Connection** 🌐

- The **Deployment** (whether for `server` or `client`) specifies a **template** for the pods. The **template** defines the **labels** that the pods will carry. So, every pod created by the deployment will have the respective label (`app: server` or `app: client`), making it easier for Kubernetes to associate pods with their respective deployments.
    
- In simple terms: The **selector** in the **Deployment** is used to **select** pods based on their **labels**. Pods created by a deployment carry the labels, and the deployment ensures that it manages these specific pods based on the **selector**.
    

---

1. **Labels**: Used to identify and categorize resources. Both the **Deployment** and the pods it creates carry labels.
    
    - `app: server` for the backend.
        
    - `app: client` for the frontend.
        
2. **Selectors**: Ensure that the **Deployment** only manages the right pods that match the label.
    
    - `matchLabels: app: server` ensures the backend Deployment only manages pods with `app: server`.
        
    - `matchLabels: app: client` ensures the frontend Deployment only manages pods with `app: client`.
        
3. **Pod Templates**: Define the pod specification (like container image, ports, and labels) for each deployment. Pods are created based on the template and are automatically labeled, making it easier for the deployment to manage them.
    
---
