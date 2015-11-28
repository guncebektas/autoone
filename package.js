/** 
  autoCms is working nice with autoForm and has a huge need of it
  autoCms handles not only insert and update events but also can list and construct relations with other collections 
  in table and we are calling this extension as autoTable. 
  In conclusion, autoCms is the combination of autoForm and autoTable
  
  @category   cms
  @authors    günce ali bektas <info@guncebektas.com>, aykut aktas <aykut@aktas.me>
  @link       https://github.com/guncebektas/autocms
*/
Package.describe({
  name: 'guncebektas:autoone',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'AutoOne is a simple solution to gather data',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/guncebektas/autoone',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.imply([
    'underscorestring:underscore.string@3.2.2',
    'kadira:flow-router@2.7.0',
    'kadira:blaze-layout@2.2.0',
    'arillo:flow-router-helpers@0.4.6'
  ]);

  // set dependencies
  api.use('ecmascript');
  api.use(['templating', 'jquery'], 'client');
  
  api.use([
    'kadira:flow-router@2.7.0',
    'kadira:blaze-layout@2.2.0',
    'arillo:flow-router-helpers@0.4.6'
  ], 'client', {weak: false, unordered: false});

  api.use([
    'underscorestring:underscore.string@3.2.2',
  ], ['client','server'], {weak: false, unordered: false});
  
  //api.export('autoCms');

  // add files
  api.addFiles([
    'templates/autoOne.html',
    'methods.js',
    'helpers.js', 
    'events.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use(['templating', 'jquery'], 'client');
  api.use('tinytest');

  // add files
  //api.addFiles('tests/client/test.js', 'client');
});
