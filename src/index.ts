import TwitterApp from './TwitterApp';
import IGApp from './IGApp';
// require('dotenv').config();

// Get keyword from command line
const client = process.argv[2];

let app;

switch (client) {
  case 'instagram':
    app = new IGApp(process.env);
    break;
  case 'twitter':
    app = new TwitterApp(process.env);
    break;
  default:
    console.log('Invalid client')
    break;
}

if (app) {
  // Get keyword from command line
  const keyword = process.argv[3];

// Send error message if keyword is undefined
  if (keyword === undefined) {
    console.log('Please provide a search keyword. Use the command "npm start <client> <keyword>"')
  } else {
    app.run(keyword);
  }
}
