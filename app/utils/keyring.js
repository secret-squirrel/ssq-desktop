var crypto = require('crypto');
var ursa = require('ursa');

var KeyRing = Ember.Object.create({

  cipher: 'aes-256-cbc',
  bits: 2048,
  publicKey: false,
  privateKey: false,

  clear: function() {
    this.set('publicKey', false);
    this.set('privateKey', false);
  },

  createKeyPair: function(password) {
    var key = ursa.generatePrivateKey(this.get('bits'));

    this.set('privateKey', key.toEncryptedPrivatePem(password, this.get('cipher')));
    this.set('publicKey', key.toPublicPem());
    return {
      privateKey: this.get('privateKey'),
      publicKey: this.get('publicKey')
    };
  },

});

export default KeyRing;