module.exports = {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/activities/me',
      handler: 'activity.me',
    }
  ]
}
