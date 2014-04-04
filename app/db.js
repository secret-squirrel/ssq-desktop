App.Db = Ember.Object.create({

  read: function(key, value) {
    return localStorage[key];
  },

  write: function(key, value) {
    localStorage[key] = value;
    return localStorage[key];
  },

  clear: function() {
    localStorage.clear();
    return true;
  },

  hasValidSettings: function() {
    var settings = this.read('settings')
    if (!settings) {
      return false;
    }
    var hasSettings = true;
    for(var i=0; i < this.requiredSettings.length; i++) {
      var value = localStorage[this.requiredSettings[i]]
      if (value == undefined || value.length == 0) {
        hasSettings = false;
      }
    }
    return hasSettings;
  },

  requiredSettings: function() {
    return [
      'email',
      'masterPasswordSet',
      'publicKey',
      'privateKey'
    ];
  }

});