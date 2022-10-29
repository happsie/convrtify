package convrtify

import (
	"encoding/base64"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
)

type TextBody struct {
	Text string `json:"text"`
}

type Base64Body struct {
	Base64 string `json:"base64"`
}

func Encode(c *fiber.Ctx) error {
	content, err := getContent(c)
	if err != nil {
		logrus.Errorf("error: ", err)
		return fiber.NewError(http.StatusBadRequest)
	}
	base64 := encodeText(content)
	type Response struct {
		Encoded string `json:"encoded"`
	}
	return c.JSON(Response{
		Encoded: base64,
	})
}

func Decode(c *fiber.Ctx) error {
	body := Base64Body{}
	err := c.BodyParser(&body)
	if err != nil {
		logrus.Errorf("error: ", err)
		return fiber.NewError(http.StatusBadRequest)
	}
	decode := make([]byte, len(body.Base64))
	_, err = base64.StdEncoding.Decode(decode, []byte(body.Base64))
	if err != nil {
		logrus.Errorf("error: ", err)
		return fiber.NewError(http.StatusBadRequest)
	}
	err = c.Send(decode)
	if err != nil {
		logrus.Errorf("error: ", err)
		return fiber.NewError(http.StatusBadRequest)
	}
	return nil
}

func getContent(c *fiber.Ctx) (content []byte, err error) {
	if c.Get("Content-Type") == "application/json" {
		body := TextBody{}
		err := c.BodyParser(&body)
		if err != nil {
			return nil, err
		}
		return []byte(body.Text), nil
	}
	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.Status(http.StatusBadRequest)
		return nil, err
	}
	f, err := fileHeader.Open()
	if err != nil {
		return nil, err
	}
	file := make([]byte, fileHeader.Size)
	_, err = f.Read(file)
	if err != nil {
		return nil, err
	}
	return file, nil
}

func encodeText(content []byte) string {
	return base64.StdEncoding.EncodeToString(content)
}
