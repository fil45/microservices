#sudo .
minikube start
skaffold dev

#kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
#kubectl expose deployment ingress-nginx-controller --target-port=80 --type=NodePort -n kube-system