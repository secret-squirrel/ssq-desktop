Ember.Route.reopen({
  activate: function() {
    var cssClass = this.toCssClass();
    if (cssClass !== 'application') {
      Ember.$(this.rootElement()).addClass(cssClass);
    }
  },
  deactivate: function() {
    Ember.$(this.rootElement()).removeClass(this.toCssClass());
  },
  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  },
  rootElement: function() {
    return this.router.namespace.get('rootElement');
  }
});