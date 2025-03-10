import fs from 'fs';
import path from 'path';
import { specs } from '../config/swagger';

// Ensure the directory exists
const outputDir = path.resolve(__dirname, '../../openapi');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the OpenAPI specification to a JSON file
const outputPath = path.resolve(outputDir, 'openapi.json');
fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));

console.log(`OpenAPI specification has been written to ${outputPath}`); 