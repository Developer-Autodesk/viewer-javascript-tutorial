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
  // creates panel and sets up inheritance
  //
  /////////////////////////////////////////////////////////////////
  Viewing.Extension.Workshop.WorkshopPanel = function(
    parentContainer,
    id,
    title,
    options)
  {
    Autodesk.Viewing.UI.PropertyPanel.call(
      this,
      parentContainer,
      id, title);
  };

  Viewing.Extension.Workshop.WorkshopPanel.prototype = Object.create(
    Autodesk.Viewing.UI.PropertyPanel.prototype);

  Viewing.Extension.Workshop.WorkshopPanel.prototype.constructor =
    Viewing.Extension.Workshop.WorkshopPanel;

  /////////////////////////////////////////////////////////////////
  // load callback: invoked when viewer.loadExtension is called
  //
  /////////////////////////////////////////////////////////////////
  _self.load = function () {

    _viewer.addEventListener(
      Autodesk.Viewing.SELECTION_CHANGED_EVENT,
      _self.onSelectionChanged);

    _self.panel = new Viewing.Extension.Workshop.WorkshopPanel(
      _viewer.container,
      'WorkshopPanelId',
      'Workshop Panel');

    console.log('Viewing.Extension.Workshop loaded');

    return true;
  };

  /////////////////////////////////////////////////////////////////
  // unload callback: invoked when viewer.unloadExtension is called
  //
  /////////////////////////////////////////////////////////////////
  _self.unload = function () {

    _self.panel.setVisible(false);

    _self.panel.uninitialize();

    console.log('Viewing.Extension.Workshop unloaded');

    return true;
  };

  /////////////////////////////////////////////////////////////////
  // selection changed callback
  //
  /////////////////////////////////////////////////////////////////
  _self.onSelectionChanged = function (event) {

    function propertiesHandler(result) {

      if (result.properties) {

        _self.panel.setProperties(
          result.properties);

        _self.panel.setVisible(true);
      }
    }

    if(event.dbIdArray.length) {

      var dbId = event.dbIdArray[0];

      _viewer.getProperties(
        dbId,
        propertiesHandler);

      _viewer.fitToView(dbId);

      _viewer.isolateById(dbId);
    }
    else {

      _viewer.isolateById([]);

      _viewer.fitToView();

      _self.panel.setVisible(false);
    }
  }
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

