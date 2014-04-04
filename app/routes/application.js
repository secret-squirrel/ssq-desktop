App.ApplicationRoute = Ember.Route.extend({

  redirect: function(arg, transition) {
    if (!App.Db.hasValidSettings() && transition.targetName != 'styleguide') {
      this.transitionTo('setup');
    }
  }

});
