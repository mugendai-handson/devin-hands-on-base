import { ESLint } from "eslint";

const eslint = new ESLint();
const results = await eslint.lintFiles(["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"]);
const designResults = results
  .map((result) => {
    const messages = result.messages.filter(
      (message) => message.fatal || message.ruleId?.startsWith("shadcn/"),
    );
    return {
      ...result,
      messages,
      errorCount: messages.filter((message) => message.severity === 2).length,
      warningCount: messages.filter((message) => message.severity === 1).length,
    };
  })
  .filter((result) => result.messages.length > 0);

const formatter = await eslint.loadFormatter("stylish");
const output = formatter.format(designResults);

if (output) {
  console.log(output);
} else {
  console.log("No design-system violations found.");
}

if (designResults.some((result) => result.errorCount > 0)) {
  process.exitCode = 1;
}
