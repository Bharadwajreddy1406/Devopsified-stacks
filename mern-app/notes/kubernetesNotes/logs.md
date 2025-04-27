# Kubernetes Deployment Logs for MERN Application

## Initial Setup
Checking the current Kubernetes cluster state:

```bash
$ kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   4m57s
```

Deployment files available in the directory:
```bash
$ ls
client-deployment.yaml  client-service.yaml  ingress.yml  log.txt  secrets.yaml  server-deployment.yml  server-service.yaml
```

## Deploying Application Components

### 1. Apply Configuration for MongoDB Secrets
```bash
$ kubectl apply -f secrets.yaml
secret/mongodb-secret created
```

### 2. Deploy Server Components
```bash
$ kubectl apply -f server-deployment.yml
deployment.apps/server-deployment created

$ kubectl apply -f server-service.yaml
service/server-service created
```

### 3. Deploy Client Components
```bash
$ kubectl apply -f client-deployment.yaml
deployment.apps/client-deployment created

$ kubectl apply -f client-service.yaml
service/client-service created
```

### 4. Verify Pod Status
Checking that all pods are running properly:
```bash
$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS   AGE
client-deployment-69d7884867-mljfv   1/1     Running   0          18s
client-deployment-69d7884867-pqmbt   1/1     Running   0          18s
server-deployment-6b7469ddf8-bsdl6   1/1     Running   0          27s
server-deployment-6b7469ddf8-zl488   1/1     Running   0          27s
```

## Setting Up Ingress

### 1. Enable Ingress on Minikube
```bash
$ minikube addons enable ingress
💡  ingress is an addon maintained by Kubernetes. For any concerns contact minikube on GitHub.
You can view the list of minikube maintainers at: https://github.com/kubernetes/minikube/blob/master/OWNERS
💡  After the addon is enabled, please run "minikube tunnel" and your ingress resources would be available at "127.0.0.1"
    ▪ Using image registry.k8s.io/ingress-nginx/controller:v1.11.2
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.4.3
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.4.3
🔎  Verifying ingress addon...
🌟  The 'ingress' addon is enabled
```

### 2. Verify Ingress Namespace
```bash
$ kubectl get ns
NAME              STATUS   AGE
default           Active   35d
ingress-nginx     Active   10s
kube-node-lease   Active   35d
kube-public       Active   35d
kube-system       Active   35d
```

### 3. Apply and Verify Ingress Configuration
```bash
$ kubectl apply -f ingress.yml
ingress.networking.k8s.io/app-ingress created

$ kubectl get ingress
NAME          CLASS   HOSTS                         ADDRESS   PORTS   AGE
app-ingress   nginx   api.taskmanager,taskmanager             80      15h

$ kubectl describe ingress
Name:             app-ingress
Labels:           <none>
Namespace:        default
Address:
Ingress Class:    nginx
Default backend:  <default>
Rules:
  Host             Path  Backends
  ----             ----  --------
  api.taskmanager
                   /   server-service:5000 (10.244.0.38:5000,10.244.0.39:5000)
  taskmanager
                   /   client-service:80 (10.244.0.40:80,10.244.0.41:80)
Annotations:       nginx.ingress.kubernetes.io/rewrite-target: /
Events:
  Type    Reason  Age                From                      Message
  ----    ------  ----               ----                      -------
  Normal  Sync    44m (x4 over 45m)  nginx-ingress-controller  Scheduled for sync
  Normal  Sync    33s (x2 over 33s)  nginx-ingress-controller  Scheduled for sync
```

### 4. Start Minikube Tunnel for External Access
Once the ingress has an address:
```bash
$ kubectl get ingress
NAME          CLASS   HOSTS                         ADDRESS        PORTS   AGE
app-ingress   nginx   api.taskmanager,taskmanager   192.168.49.2   80      15h

$ minikube tunnel
✅  Tunnel successfully started
```

## Accessing the Application
The TaskManager application is now accessible at:
`http://taskmanager`

The API is available at:
`http://api.taskmanager`
