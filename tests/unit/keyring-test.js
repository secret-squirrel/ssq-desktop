var KeyRing = require('ssq-desktop/utils/keyring')['default'];
var ursa = require('ursa');

module('util:keyring', {
  setup: function() {
    KeyRing.clear();
  }
});

test('it should initialize properly', function() {
  expect(2);
  equal('aes-256-cbc', KeyRing.get('cipher'));
  equal(2048, KeyRing.get('bits'));
});

test('it should create a keypair', function() {
  var keyPair = KeyRing.createKeyPair('passpass');

  var publicKey = ursa.coercePublicKey(keyPair.publicKey);
  ok(ursa.isPublicKey(publicKey), 'Return a ursa public key');
  var privateKey = ursa.createPrivateKey(keyPair.privateKey, 'passpass', 'utf8');
  ok(ursa.isPrivateKey(privateKey), 'Return a ursa private key');
});

test('it should start with empty public and private keys', function() {
  expect(2);
  equal(false, KeyRing.get('publicKey'));
  equal(false, KeyRing.get('privateKey'));
});