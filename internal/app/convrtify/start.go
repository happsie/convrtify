package convrtify

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func Start() error {
	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusBadRequest
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			if code >= 500 {
				code = 400
			}
			c.Status(code)
			return nil
		},
	})
	app.Use(cors.New())
	app.Use(recover.New())

	app.Post("/api/convrtify/convert-v1", ConvertFile)

	return app.Listen(":8080")
}
