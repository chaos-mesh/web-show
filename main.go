package main

import (
	"github.com/chaos-mesh/web-show/server"
	"github.com/pingcap/log"
)

func main() {
	log.Info("Starting server")
	s := server.SetupServer()
	s.Run()
}
