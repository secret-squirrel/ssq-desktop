App.SetupController = Ember.Controller.extend({

  keyPassword: '',
  keyPasswordConfirm: '',

  actions: {
    generate: function() {
      var _this = this;
      this.set('error', false);
      var keygen = require('ssh-keygen');
      var fs = require('fs');
      var location = process.cwd() + '/secretsquirrel.key';
      if (this.get('keyPassword') == '') {
        this.set('error', 'You must provide a master password');
        return;
      }
      if (this.get('keyPassword') != this.get('keyPasswordConfirm')) {
        this.set('error', 'Your passwords did not match');
        return;
      }
      var password = 'passpass';
      keygen({
        location: location,
        password: password,
        read: true
      }, function(err, out) {
        if(err) {
          _this.set('keyError', true);
        }else{
          _this.set('key', out);
        }
      });
    }
  }
});