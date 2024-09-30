import path from "path";
import { fileURLToPath } from "url";
const { getDefaultConfig } = require("expo/metro-config");

const { withNativeWind } = require("nativewind/metro");

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
