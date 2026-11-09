const esbuild = require("esbuild");
const path = require("path");

const root = path.resolve(__dirname, "..");

try {
  esbuild.buildSync({
    entryPoints: [path.join(root, "src/app.jsx")],
    bundle: true,
    minify: true,
    format: "iife",
    define: { "process.env.NODE_ENV": '"production"' },
    outfile: path.join(root, "assets/app.js"),
    logLevel: "warning"
  });
  console.log("Build successful: assets/app.js updated");
} catch (err) {
  console.error("Build failed:", err);
  process.exit(1);
}
