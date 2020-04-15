#!/usr/bin/env bash

set -e

TARGET_IP=$(kubectl get pod -n kube-system -o wide| grep kube-controller | head -n 1 | awk '{print $6}')

sed "s/TARGETIP/$TARGET_IP/g" deploy/deployment.yaml > deploy/deployment.yamlg

mv deploy/deployment.yamlg deploy/deployment.yaml

kubectl apply -f deploy/

while [[ $(kubectl get pods -l app=web-show -o 'jsonpath={..status.conditions[?(@.type=="Ready")].status}') != "True" ]]; do echo "waiting for pod running" && sleep 1; done

kill $(lsof -t -i:8081) 2>&1 >/dev/null | True

nohup kubectl port-forward svc/web-show --address 0.0.0.0 8081:8081 2>&1 &
