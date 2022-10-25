package convrtify

import (
	"bytes"
	"encoding/base64"
	"image/png"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
)

func ConvertFileToBase64(c *fiber.Ctx) error {
	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.Status(http.StatusBadRequest)
		return err
	}
	_ = fileHeader.Header.Get("Content-Type")
	f, err := fileHeader.Open()
	if err != nil {
		return fiber.NewError(http.StatusBadRequest)
	}
	file := make([]byte, fileHeader.Size)
	_, err = f.Read(file)
	if err != nil {
		return fiber.NewError(http.StatusBadRequest)
	}
	encodedString := base64.StdEncoding.EncodeToString(file)
	c.SendString(encodedString)
	return nil
}

func ConvertBase64ToFile(c *fiber.Ctx) error {
	b64 := string(c.Body())
	unbased, err := base64.StdEncoding.DecodeString(b64)
	if err != nil {
		logrus.Error(err)
		return fiber.NewError(http.StatusBadRequest)
	}
	img, err := png.Decode(bytes.NewReader(unbased))
	if err != nil {
		logrus.Error(err)
		return fiber.NewError(http.StatusBadRequest)
	}
	buf := new(bytes.Buffer)
	err = png.Encode(buf, img)
	if err != nil {
		logrus.Error(err)
		return fiber.NewError(http.StatusBadRequest)
	}
	c.Send(buf.Bytes())
	return nil
}

func encodeText(text string) string {
	return base64.StdEncoding.EncodeToString([]byte(text))
}

type TextBody struct {
	Text string `json:"text"`
}

func Encode(c *fiber.Ctx) error {
	body := TextBody{}
	err := c.BodyParser(&body)
	if err != nil {
		return fiber.NewError(http.StatusBadRequest)
	}
	base64 := encodeText(body.Text)
	type Response struct {
		Encoded string `json:"encoded"`
	}
	return c.JSON(Response{
		Encoded: base64,
	})
}
