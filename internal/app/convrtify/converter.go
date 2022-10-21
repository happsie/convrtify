package convrtify

import "encoding/base64"

func Convert(file []byte, targetContentType string) string {
	return base64.StdEncoding.EncodeToString(file)
}
