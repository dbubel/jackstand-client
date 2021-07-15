import { RandomString } from "@/js/RandomString";
var crypto = require("crypto");
var algorithm = "aes-256-gcm";
//   password = "3zTvzr3p67VC61jmV54rIYu1545x4TlY"
// do not use a global iv for production,
// generate a new one for each encryption
//   import { RandomString } from "@/js/RandomString";
export function Encrypt(password, text) {
  password = password.substring(0, 32);
  const iv = RandomString(12);
  var cipher = crypto.createCipheriv(algorithm, password, iv);
  var encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  var tag = cipher.getAuthTag();

  return {
    content: encrypted,
    tag: tag,
    iv: iv,
  };
}

export function Decrypt(password, encrypted) {
  password = password.substring(0, 32);
  var decipher = crypto.createDecipheriv(algorithm, password, encrypted.iv);
  decipher.setAuthTag(encrypted.tag);
  var dec = decipher.update(encrypted.content, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}
