var controllers = angular.module('loginsControllers', [])

controllers.controller('LoginsCtrl',   
  function($scope) {
    $scope.selected = null
    $scope.select = function(login) {
      $scope.selected = login
    }

    $scope.logins = [
      {
        id: 1,
        name: 'AWS',
        url: 'https://aws.amazon.com',
        notes: 'EC2 and S3 Configured, billed to company credit card.',
        secrets: [
          {label: 'Login Email', value: 'user+aws@example.com'},
          {label: 'Login Password', value: 's00pers3krit'},
          {label: 'Access Key ID', value: 'abc123'},
          {label: 'Secret Access Key', value: 'def456'}
        ]
      },
      {
        id: 2,
        name: 'Engineyard',
        url: 'https://engineyard.com',
        notes: 'Rails hosting for clients',
        secrets: [
          {label: 'Login Email', value: 'user+engineyard@example.com'},
          {label: 'Login Password', value: '2menEs33krits'},
          {label: 'SSH deployment user', value: 'deploy'},
          {label: 'SSH deployment password', value: '0hn03san0therp455word'},
          {label: 'SSH root password', value: 's00p3rs3kurep455w0rd'}
        ]
      },
      {
        id: 3,
        name: 'Linode',
        url: 'https://linode.com',
        notes: 'Legacy Rails hosting',
        secrets: [
          {label: 'Login Email', value: 'user+linode@example.com'},
          {label: 'Login Password', value: 'aaaabbbbcccc'},
          {label: 'SSH deployment user', value: 'deploy'},
          {label: 'SSH deployment password', value: 'ddddeeeeffff'},
          {label: 'SSH root password', value: 'gggghhhhiiii'}
        ]
      }
    ]

  }
)
