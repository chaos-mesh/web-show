# SET DOCKER_REGISTRY to change the docker registry
DOCKER_REGISTRY_PREFIX := $(if $(DOCKER_REGISTRY),$(DOCKER_REGISTRY)/,ghcr.io/)
IMAGE_TAG := $(if $(IMAGE_TAG),$(IMAGE_TAG),"latest")

# Enable GO111MODULE=on explicitly, disable it with GO111MODULE=off when necessary.
export GO111MODULE := on
GOOS := $(if $(GOOS),$(GOOS),"linux")
GOARCH := $(if $(GOARCH),$(GOARCH),"amd64")
GOENV  := GO15VENDOREXPERIMENT="1" CGO_ENABLED=0 GOOS=$(GOOS) GOARCH=$(GOARCH)
CGOENV  := GO15VENDOREXPERIMENT="1" CGO_ENABLED=1 GOOS=$(GOOS) GOARCH=$(GOARCH)
GO     := $(GOENV) go

default: build image image-push

build:
	$(GO) build -o bin/web-show *.go
	cd web; npm install; npm run build

image:
	docker build -t ${DOCKER_REGISTRY_PREFIX}chaos-mesh/web-show:${IMAGE_TAG} .

image-push:
	docker push  "${DOCKER_REGISTRY_PREFIX}chaos-mesh/web-show:latest"


.PYTHON: build
