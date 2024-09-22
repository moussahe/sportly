package api

import (
	"github.com/gin-gonic/gin"
)

// SetupRoutes configure toutes les routes de l'API
func SetupRoutes(router *gin.Engine) {
	// Route de base pour vérifier que l'API fonctionne
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Bienvenue sur l'API Sportly",
		})
	})

	// Groupe de routes pour l'authentification
	auth := router.Group("/auth")
	{
		auth.POST("/login", loginHandler)
		auth.POST("/register", registerHandler)
		auth.POST("/forgot-password", forgotPasswordHandler)
	}

	// Autres groupes de routes (à implémenter plus tard)
	// users := router.Group("/users")
	// bookings := router.Group("/bookings")
	// facilities := router.Group("/facilities")
}

// Handlers à implémenter
func loginHandler(c *gin.Context) {
	// TODO: Implémenter la logique de connexion
}

func registerHandler(c *gin.Context) {
	// TODO: Implémenter la logique d'inscription
}

func forgotPasswordHandler(c *gin.Context) {
	// TODO: Implémenter la logique de réinitialisation de mot de passe
}
