const fs = require('fs');
const path = require('path');

console.log('🚀 CabShare Connect - Deployment Setup Check\n');

// Check if package.json has start script
const serverPackagePath = path.join(__dirname, 'server', 'package.json');
if (fs.existsSync(serverPackagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(serverPackagePath, 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts.start) {
    console.log('✅ Start script found in package.json');
  } else {
    console.log('❌ Start script missing in package.json');
  }
  
  console.log('📦 Dependencies found:', Object.keys(packageJson.dependencies || {}).length);
} else {
  console.log('❌ server/package.json not found');
}

// Check if index.js exists
const indexPath = path.join(__dirname, 'server', 'index.js');
if (fs.existsSync(indexPath)) {
  console.log('✅ server/index.js found');
} else {
  console.log('❌ server/index.js not found');
}

// Check if .gitignore exists
const gitignorePath = path.join(__dirname, 'server', '.gitignore');
if (fs.existsSync(gitignorePath)) {
  console.log('✅ .gitignore found');
} else {
  console.log('❌ .gitignore not found');
}

// Check if README exists
const readmePath = path.join(__dirname, 'server', 'README.md');
if (fs.existsSync(readmePath)) {
  console.log('✅ README.md found');
} else {
  console.log('❌ README.md not found');
}

console.log('\n📋 Next Steps:');
console.log('1. Create GitHub account and install Git');
console.log('2. Set up MongoDB Atlas database');
console.log('3. Push code to GitHub');
console.log('4. Deploy to Render using the DEPLOYMENT.md guide');
console.log('\n📖 See DEPLOYMENT.md for detailed instructions'); 