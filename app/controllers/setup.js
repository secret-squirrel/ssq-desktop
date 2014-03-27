App.SetupController = Ember.Controller.extend({
  actions: {
    generate: function() {
      var _this = this;
      var keygen = require('ssh-keygen');
      var fs = require('fs');

      var location = process.cwd() + '/secretsquirrel.key';
      console.log(location);
      var password = 'passpass';
      keygen({
        location: location,
        password: password,
        read: true
      }, function(err, out) {
        if(err) {
          alert('There was a problem generating your SSH key!');
          return;
        }
        alert("Your key was generated, but I can't figure out javascript scope so you can't have it...");
      });
    }
  }
});