'use strict';

/**
 * availability controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::availability.availability', ({ strapi }) => ({
  // Create availability with linked user
  async create(ctx) {
    let entity;

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.benutzer = ctx.state.user.id;
      entity = await strapi.service('api::availability.availability').create(data, { files });
    } else {
      console.log(`Body: ${ctx.request.body}`);
      ctx.request.body.data.benutzer = ctx.state.user.id;
      entity = await strapi.service('api::availability.availability').create(ctx.request.body);
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
  // Delete a user availability
  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.service('api::availability.availability').delete(id);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
  // Get logged in user
  async me(ctx) {
    const { user } = ctx.state;

    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: "No authorization header was found" }] }]);
    }

    const query = {
      filters: {
        benutzer: {
          id: user.id
        }
      },
      populate: ['benutzer'],
      ...ctx.query,
    };

    const entities = await strapi.entityService.findMany('api::availability.availability', query);

    if (!entities) {
      return ctx.notFound();
    }

    const sanitizedEntity = await this.sanitizeOutput(entities, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
