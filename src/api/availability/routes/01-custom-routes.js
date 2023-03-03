module.exports = {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/availabilities/me',
      handler: 'availability.me',
    }
  ]
}
