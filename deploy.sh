#!/usr/bin/env bash

set -e

TARGET_IP=$(kubectl get pod -n kube-system -o wide| grep kube-controller | head -n 1 | awk '{print $6}')

sed "s/TARGETIP/$TARGET_IP/g" deploy/deployment.yaml > deploy/deployment.yamlg

mv deploy/deployment.yamlg deploy/deployment.yaml

kubectl apply -f deploy/

