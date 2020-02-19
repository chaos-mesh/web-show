package server

import (
	"net/http"

	"github.com/cwen0/web-show/pkg/queue"
	"github.com/gorilla/mux"
	"github.com/pingcap/log"
)

func SetupServer() Server {
	r := mux.NewRouter()

	server := Server{
		router:   r,
		pingData: queue.NewListQueue(200),
	}

	r.PathPrefix("/api/network").HandlerFunc(server.network)

	r.PathPrefix("/").Handler(server.web("/", "./web/build"))

	return server
}

func (s *Server) Run() {
	go s.startPing()
	log.Info("Starting Server on 0.0.0.0:8081")
	err := http.ListenAndServe("0.0.0.0:8081", s.router)
	if err != nil {
		log.Error("Error while listening 0.0.0.0:8081")
	}
}

type Server struct {
	router   *mux.Router
	pingData queue.Queue
}
