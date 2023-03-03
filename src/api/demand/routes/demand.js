'use strict';

/**
 * demand router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::demand.demand');
