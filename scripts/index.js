const fs = require("fs-extra");
const path = require("path");

// eslint-disable-next-line no-undef
const scriptType = process.argv[2];

let srcDir;
if (scriptType === "web") {
  srcDir = path.join(__dirname, "..", "src", "global", "common", "components");
} else {
  srcDir = path.join(__dirname, "..", "src", "global", "mobile", "components");
}

const destDir = path.join(__dirname, "..", "src", "dev", "components");

// Check if the source directory exists
if (!fs.existsSync(srcDir)) {
  console.error("Source directory does not exist:", srcDir);
  //   process.exit(1); // Exit the script with an error code
}

fs.ensureDirSync(destDir);

// Copy all components from srcDir to destDir
fs.copy(srcDir, destDir, (err) => {
  console.log(11, srcDir, destDir);
  if (err) {
    console.error("Error copying components:", err);
  } else {
    console.log("Components copied successfully to dev folder.");
  }
});
