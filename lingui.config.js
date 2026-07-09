const { formatter } = require("@lingui/format-po");

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["vi", "en"],
  sourceLocale: "vi",
  catalogs: [
    {
      path: "<rootDir>/src/locale/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
};
