### 1) Checking Minikube Status 🧐

To get the status of your Minikube cluster, you can simply run:

```bash
minikube status
```

This will provide you with details about the current state of your Minikube setup. 🖥️

---

### 2) Starting Minikube Cluster 🚀

Running `minikube start` begins the process of initializing your Minikube setup. Here’s what I see when I execute this command:

```bash
PS C:\mern-app\k8s> minikube start
* minikube v1.34.0 on Microsoft Windows 11 Home Single Language 10.0.26100.3915 Build 26100.3915
* minikube 1.35.0 is available! Download it: https://github.com/kubernetes/minikube/releases/tag/v1.35.0
* To disable this notice, run: 'minikube config set WantUpdateNotification false'

* Using the docker driver based on existing profile
* Starting "minikube" primary control-plane node in "minikube" cluster
* Pulling base image v0.0.45 ...
* Restarting existing docker container for "minikube" ...
! Failing to connect to https://registry.k8s.io/ from inside the minikube container
* To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
* Preparing Kubernetes v1.31.0 on Docker 27.2.0 ...
* Verifying Kubernetes components...
  - Using image gcr.io/k8s-minikube/storage-provisioner:v5
* Enabled addons: default-storageclass, storage-provisioner
* Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

Notice that I’m using the Docker driver, and Minikube is successfully starting the cluster. 🌐🚀 The Kubernetes version, storage provisioning, and other addons are set up, and `kubectl` is configured to point to the `minikube` cluster. ✅

---

### 3) Listing Kubernetes Namespaces 🗂️

To view the namespaces in your Kubernetes cluster, use:

```bash
kubectl get namespaces
```

Output:

```bash
NAME              STATUS   AGE
default           Active   35d
kube-node-lease   Active   35d
kube-public       Active   35d
kube-system       Active   35d
```

You can see the default namespaces along with others like `kube-system`, `kube-public`, etc. 📂

---

### 4) Checking Resources in the Default Namespace 🔍

To see the resources running in the default namespace, I run:

```bash
kubectl get all -n default
```

Output:

```bash
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   35d
```

---

### 5) Applying Manifests to Create Resources 🔧

Now, I’ll apply a few manifests for setting up secrets and deploying the backend services.

```bash
kubectl apply -f .\secrets.yaml
```

This creates the secret for MongoDB:

```bash
secret/mongodb-secret created
```

Next, I apply the server deployment manifest:

```bash
kubectl apply -f .\server-deployment.yml
```

Output:

```bash
deployment.apps/server-deployment created
```

I then apply the service for the backend:

```bash
kubectl apply -f .\server-service.yaml
```

Output:

```bash
service/backend-service created
```

Now, let’s check the status of the resources:

```bash
kubectl get all -n default
```

Output:

```bash
NAME                                     READY   STATUS    RESTARTS      AGE
pod/server-deployment-845b5c6684-gx62k   1/1     Running   1 (30s ago)   109s
pod/server-deployment-845b5c6684-jkrbd   1/1     Running   1 (28s ago)   109s

NAME                     TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
service/kubernetes       ClusterIP   10.96.0.1        <none>        443/TCP    35d
service/server-service   ClusterIP   10.101.167.141   <none>        5000/TCP   27s

NAME                                READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/server-deployment   2/2     2            2           109s

NAME                                           DESIRED   CURRENT   READY   AGE
replicaset.apps/server-deployment-845b5c6684   2         2         2       109s
```

---

### 6) Enabling Ingress 🌐

To enable Ingress in Minikube, I use the following command:

```bash
minikube addons enable ingress
```

Output:

```bash
PS C:\Users\reddy\OneDrive\Desktop\devops\mern-app\k8s> minikube addons enable ingress
* ingress is an addon maintained by Kubernetes. For any concerns contact minikube on GitHub.
You can view the list of minikube maintainers at: https://github.com/kubernetes/minikube/blob/master/OWNERS
* After the addon is enabled, please run "minikube tunnel" and your ingress resources would be available at "127.0.0.1"
  - Using image registry.k8s.io/ingress-nginx/controller:v1.11.2
  - Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.4.3
  - Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.4.3
* Verifying ingress addon...
* The 'ingress' addon is enabled
```

---

### 7) Verifying Ingress Resources 📑

After enabling Ingress, I check the status of the resources created in the `ingress-nginx` namespace:

```bash
kubectl get all -n ingress-nginx
```

Output:

```bash
NAME                                           READY   STATUS      RESTARTS   AGE
pod/ingress-nginx-admission-create-hhcsq       0/1     Completed   0          3m59s
pod/ingress-nginx-admission-patch-hgsnr        0/1     Completed   1          3m59s
pod/ingress-nginx-controller-bc57996ff-4brsl   1/1     Running     0          3m59s
```

The Ingress controller pod is now running, and everything seems to be in place. ✔️

---

### 8) Checking Server API on Localhost 🌍

Finally, I run `minikube tunnel` to expose the services to my local machine:

```bash
minikube tunnel
```

This will allow me to access my server API locally, as the Ingress resources are now available at `127.0.0.1`. 🎉

---
# **But**

The real issues start here,  
anyway to be a real DevOps engineer is to debug a hell lot of things 🔥  
you'll get used to it haha 😎.

first thing, it won't work and most prolly give a 404 Not found error sponsored by nginx 😂  
if u get this na, u are learning dude 💪

okay let's think why this issue comes from 🤔.

before that here's are some bunch of crappy errors i faced, so check out if u like to 🚑

[[Errors]]

> okay, the main reason you'd likely get this is due to the rule that we've set in the ingress.yaml file 📄

we've told the ingress controller that "hey bruh when someone comes with a host name api.taskmanager" then route them to server-service 🛣️

but as we are hitting localhost in browser our request for sure goes to minikube (as we did minikube tunnel) 🚇

> but as request goes, it goes with the header `Host: localhost` which nginx controller doesn't know, that's why it gave 404. Poor thing 🥲.

okay, but how do we `hit http://api.taskmanager` in browser and expect it to work, we didn't host it anyway right 🤷‍♂️

but we can do one jugaad 🛠️,  
we can change the DNS mapping of that domain name  
for that we go to /etc/hosts file in linux 🐧  
or  
the hosts file at `C:\Windows\System32\drivers\etc` in ur windows PC (sorry mac dudes 🙏)  
and add a new mapping at the end  
like this 👇  

![[hostsfile.png]]

open your notepad in admin mode and change it ✍️  
and then come to your browser hit `http://api.taskmanager` 🌐

you can see the backend server finallyyy 🚀

![[browser.png]]

the right one is localhost in browser which says 404 not found, but on the left, this works 

if not you might get a 503 if u blindly run this without reading the yamls 🙈  
especially secrets.yaml 🗝️

if `503` then go here [[Errors]] and read the second one

if not ⭐ star the repooooo, lessgooo 🔥🔥🔥
