const utils = require('@strapi/utils');
const { PolicyError } = utils.errors;

module.exports = async (policyContext, config, { strapi }) => {
  const ctx = strapi.requestContext.get();
  const { id } = ctx.params;

  const query = {
    populate: ['benutzer']
  };

  const entity = await strapi.entityService.findOne('api::availability.availability', id, query);

  if (entity && policyContext.state.user.id === entity.benutzer?.id) {
    // Go to next policy or will reach the controller's action.
    return true;
  }

  throw new PolicyError("You can't update this entry.", {
    policy: 'is-user',
    isUserKey: 'isUserPolicy',
  });
};
