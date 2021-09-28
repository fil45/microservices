For set up dev environment:
1. Install docker, k8s, skaffold
2. Install NGINX Ingress Controller https://kubernetes.github.io/ingress-nginx/deploy/#provider-specific-steps
3. Add 127.0.0.1 ticketing.dev to the hosts file
4. kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
5. kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=sk_test_...
6. skaffold dev
7. Type THISISUNSAFE in the browser security warning
8. If you have error: getaddrinfo enotfound ingress-nginx-controller.kube-system.svc.cluster.local
you have to change base url in the build-client.js