package server

import (
	"go.uber.org/zap"
	"net/http"

	"github.com/chaos-mesh/web-show/pkg/queue"
	"github.com/gorilla/mux"
	"github.com/pingcap/log"
)

type Config struct {
	Port       string
	StaticPath string
	TargetIP   string
}

func SetupServer(conf *Config) Server {
	r := mux.NewRouter()

	server := Server{
		router:   r,
		pingData: queue.NewListQueue(360),
		conf:     conf,
	}

	r.PathPrefix("/api/network").HandlerFunc(server.network)

	r.PathPrefix("/").Handler(server.web("/", server.conf.StaticPath))

	return server
}

func (s *Server) Run() {
	go s.startPing()
	log.Info("Starting Server", zap.Reflect("config", s.conf))
	err := http.ListenAndServe(s.conf.Port, s.router)
	if err != nil {
		log.Error("Error while listening 0.0.0.0:8081", zap.Reflect("config", s.conf))
	}
}

type Server struct {
	router   *mux.Router
	pingData queue.Queue

	conf *Config
}
