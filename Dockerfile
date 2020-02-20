FROM alpine:3.10

RUN apk add tzdata --no-cache

ADD ./bin/web-show /usr/local/bin/web-show
ADD  ./web/build /build

CMD ["/usr/local/bin/web-show"]