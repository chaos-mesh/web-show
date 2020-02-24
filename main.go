package main

import (
	"flag"

	"github.com/chaos-mesh/web-show/server"
	"github.com/pingcap/log"
)

func main() {
	conf := &server.Config{}

	flag.StringVar(&conf.Port, "port", ":8081", "the port of address")
	flag.StringVar(&conf.StaticPath, "static-path", "/web", "the path of static file")
	flag.StringVar(&conf.TargetIP, "target-ip", "", "the ip of target pod")
	flag.Parse()

	log.Info("Starting server")
	s := server.SetupServer(conf)
	s.Run()
}
