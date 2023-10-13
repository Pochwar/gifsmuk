const { IgApiClient } = require('instagram-private-api');
const ig = new IgApiClient();
const username = 'pochwar';
const password = 'Sagsen123';

ig.state.generateDevice(username);
(async () => {
  // Execute all requests prior to authorization in the real Android application
  // Not required but recommended
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(username, password);

  const toto = ig.feed.tags('nature');
  const items = await toto.items();
  console.log(items[0].image_versions2)
})();
