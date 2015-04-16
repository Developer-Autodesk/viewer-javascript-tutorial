///////////////////////////////////////////////////////////////////////////////
// Demo Workshop Viewer Extension
// by Philippe Leefsma, April 2015
//
///////////////////////////////////////////////////////////////////////////////
AutodeskNamespace("Viewing.Extension");

Viewing.Extension.Workshop = function (viewer, options) {

  /////////////////////////////////////////////////////////////////
  //  base class constructor
  //
  /////////////////////////////////////////////////////////////////
  Autodesk.Viewing.Extension.call(this, viewer, options);

  var _self = this;

  var _viewer = viewer;

  /////////////////////////////////////////////////////////////////
  // load callback: invoked when viewer.loadExtension is called
  //
  /////////////////////////////////////////////////////////////////
  _self.load = function () {

    alert('Viewing.Extension.Workshop loaded');
    console.log('Viewing.Extension.Workshop loaded');

    return true;
  };

  /////////////////////////////////////////////////////////////////
  // unload callback: invoked when viewer.unloadExtension is called
  //
  /////////////////////////////////////////////////////////////////
  _self.unload = function () {

    console.log('Viewing.Extension.Workshop unloaded');

    return true;
  };
};

/////////////////////////////////////////////////////////////////
// sets up inheritance for extension and register
//
/////////////////////////////////////////////////////////////////
Viewing.Extension.Workshop.prototype =
  Object.create(Autodesk.Viewing.Extension.prototype);

Viewing.Extension.Workshop.prototype.constructor =
  Viewing.Extension.Workshop;

Autodesk.Viewing.theExtensionManager.registerExtension(
  'Viewing.Extension.Workshop',
  Viewing.Extension.Workshop);

