package convrtify

import (
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
)

func ConvertFile(c *fiber.Ctx) error {
	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.Status(http.StatusBadRequest)
		return err
	}
	fileContentType := c.Get("X-FILE-CONTENT-TYPE")
	if fileContentType != "image/png" && fileContentType != "application/pdf" && fileContentType != "text/plain" {
		c.Status(http.StatusBadRequest)
		return fiber.NewError(400, "invalid input content-type")
	}
	fInput, err := os.CreateTemp("", "convrtify-input-")
	if err != nil {
		c.Status(http.StatusBadRequest)
		return err
	}
	fOutput, err := os.CreateTemp("", "convrtify-output-")
	if err != nil {
		c.Status(http.StatusBadRequest)
		return err
	}
	defer func() {
		logrus.Infof("removing file %s", fInput.Name())
		logrus.Infof("removing file %s", fOutput.Name())
		os.Remove(fInput.Name())
		os.Remove(fOutput.Name())
	}()
	// TODO: this causes bug with temp file removal, since it creates a new file.
	err = c.SaveFile(fileHeader, fInput.Name())
	if err != nil {
		c.Status(http.StatusBadRequest)
		return err
	}
	logrus.Infof("stored file %s", fInput.Name())
	b, err := os.ReadFile(fInput.Name())
	if err != nil {
		c.Status(http.StatusBadRequest)
		return err
	}
	accept := c.Get("Accept")
	err = Convert(fOutput.Name(), b, accept)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return err
	}
	exportName := c.Get("X-EXPORT-NAME")
	c.Download(fOutput.Name(), exportName)
	return nil
}
