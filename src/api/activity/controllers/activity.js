'use strict';

/**
 * activity controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::activity.activity', ({ strapi }) => ({
  // Get logged in user
  async me(ctx) {
    const { user } = ctx.state;

    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: "No authorization header was found" }] }]);
    }

    const query = {
      filters: {
        rollen: {
          availability: {
            benutzer: {
              id: user.id
            }
          }
        }
      },
      populate: ['demand'],
      ...ctx.query,
    };

    const entities = await strapi.entityService.findMany('api::activity.activity', query);

    if (!entities) {
      return ctx.notFound();
    }

    const sanitizedEntity = await this.sanitizeOutput(entities, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
