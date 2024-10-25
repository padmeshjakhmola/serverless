- POST COMMAND
curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"test@example.com\"}" http://localhost:3000/leads

npx tsx src/cli/putSecrets.js    
<!-- linux -->
export STAGE_DB_URL=$(neonctl connection-string --branch dev)
<!-- Windows -->
$env:STAGE_DB_URL = (neonctl connection-string --branch dev)
npx tsx src/cli/putSecrets.js dev $env:STAGE_DB_URL