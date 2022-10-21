package main

import (
	"github.com/happsie/convrtify/internal/app/convrtify"
	"github.com/sirupsen/logrus"
)

func main() {
	err := convrtify.Start()
	if err != nil {
		logrus.Fatal(err)
	}
}
