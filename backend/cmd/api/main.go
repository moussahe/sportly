package main

import (
	"fmt"
	"log"

	"github.com/moussahe/sportly/internal/api"
	"github.com/moussahe/sportly/internal/config"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()

	router := gin.Default()
	api.SetupRoutes(router)

	addr := fmt.Sprintf(":%d", cfg.ServerPort)
	log.Printf("Server starting on %s", addr)
	if err := router.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
