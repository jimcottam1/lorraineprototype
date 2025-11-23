// Utility script to generate password hash for admin login
// Run this script to generate a password hash for your .env file

const bcrypt = require('bcrypt');

async function generatePasswordHash(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Get password from command line argument
const password = process.argv[2];

if (!password) {
  console.log('Usage: node generatePasswordHash.js YOUR_PASSWORD');
  console.log('Example: node generatePasswordHash.js mySecurePassword123');
  process.exit(1);
}

generatePasswordHash(password).then(hash => {
  console.log('\n✅ Password hash generated successfully!\n');
  console.log('Add this to your .env file:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
  console.log('Keep your password secure and don\'t commit it to git!\n');
}).catch(error => {
  console.error('Error generating hash:', error);
  process.exit(1);
});
