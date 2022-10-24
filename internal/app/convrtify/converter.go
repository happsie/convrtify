package convrtify
/*
import (
	"encoding/base64"
	"os"
)

func Convert(path string, file []byte, targetContentType string) error {
	var converted []byte
	if (decode) {
		converted = fromBase64(file)
		
	}

	switch targetContentType {
	case "text/plain":
		converted = b64(file)
	case "application/pdf":
		converted = pdf(file)
		path += ".pdf"
	}
	err := os.WriteFile(path, converted, os.ModePerm)
	if err != nil {
		return err
	}
	return nil
}

func fromBase64(file []byte) []byte {
	out, err := base64.StdEncoding.DecodeString(string(file))
	if err != nil {
		return []byte{}
	}
	return out
}

func Tobase64(file []byte) []byte {
	b64 := base64.StdEncoding.EncodeToString(file)
	return []byte(b64)
}
*/