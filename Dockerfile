FROM centos:7

ADD ./bin/web-show /usr/local/bin/web-show
ADD  ./web/build /web

RUN setcap cap_net_raw=+ep /usr/local/bin/web-show
# RUN sysctl -w net.ipv4.ping_group_range='0 2147483647'

CMD ["/usr/local/bin/web-show"]