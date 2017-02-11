angular.module('constants', [])

.constant('config', {api:{artists:'/api/artists.json',albums:'/api/albums/(:artistName).json',tracks:'/api/tracks/(:albumName).json'},tracks:'/track/?path=(:mediaId)'})

.value('debug', true)

;