Template.autoOne.onCreated(function(){
  // global variables & configs for autoOne
  var atts = {};

  for (var prop in this) {
    if (this.hasOwnProperty(prop) &&
        prop !== "collection" &&
        prop !== "id" &&
        prop !== "field" &&
        prop !== "type") {
      atts[prop] = this[prop];
    }
  }
  // global variable for methods
  autoOne = atts.data;
  //console.log(autoOne);

  if (!_.isUndefined(rules = window[autoOne.collection].autoOne))
    rules = window[autoOne.collection].autoOne;
  else
    rules = window[autoOne.collection].autoCms;

  // Set default options for Action buttons which are in the last td of every tr
  showActionButtons = true; 
  if (!_.isUndefined(rules.buttons)) {
     
    if (!_.isUndefined(showActionButtons)) {
      showActionButtons = rules.buttons.showActionButtons;
      
      if (typeof rules.buttons.edit.auth() != undefined && typeof rules.buttons.delete.auth() != undefined) {
        if (rules.buttons.edit.auth() == true && rules.buttons.delete.auth() == true)
          showActionButtons = true;
        else if (rules.buttons.edit.auth() == false && rules.buttons.delete.auth() == false)
          showActionButtons = false;   
      }
    }
  }
  
  // default width for images
  width = '80';  
});
Template.autoOne.helpers({
  result: function () {

    // fetch data from collection
    var data = window[this.collection].findOne(String(this.id));
    if (_.isUndefined(data))
      return '<p>DataError: Cannot find "'+this.id+'" in "'+this.collection+'"</p>';

    var keys = [];
    for (var key in rules.columns) {
        keys.push(key);
    }
    
    var autoOneData = {};

    // formatted value
    var value;
    
    // field names
    var name = keys.slice(0);

    // tempData
    var tempData = [];
    var tempDataClass = [];
          
    // for each columns setted for collection
    keys.forEach(function (item, index) {
      var prop = data[item];
      
      // If prop isset, check for relation
      if (prop) {

        // If relation isset, find data from related collection
        if (!_.isUndefined(rules.columns[item].relation)) {
          // Find the value from relatinal collection
          value = window[rules.columns[item].relation].findOne(prop);
          // clear value of v for new data
          var v = '';
          
          // There might be a display rule, check it
          for (f in rules.columns[item].display.fields) {
            
    
            if (!_.isUndefined(rules.columns[item].display.fields[f].type) && rules.columns[item].display.fields[f].type == 'image') {
              
              if (!_.isUndefined(value[rules.columns[item].display.fields[f].data])) {
                
                if (!_.isUndefined(rules.columns[item].display.fields[f].width))
                  width = rules.columns[item].display.fields[f].width;

                v += '<img src="'+location.origin+'/cfs/files/images/'+value[rules.columns[item].display.fields[f].data]+'" width="'+width+'"/>';
              }
            } else {
              v += value[rules.columns[item].display.fields[f]];
            }
          }
          value = v;          
        // If there isn't any relation with a collection show data
        } else {
          value = prop;
        }
      // If prop is undefined set value as ''
      } else {
        value = ''; 
      }
      // Change value by type, for now only images
      if (!_.isUndefined(rules.columns[item].type) && rules.columns[item].type == 'image') {
        if (value.length > 0) {
          
          // Set default width
          if (!_.isUndefined(rules.columns[item].width))
            width = rules.columns[item].width;
          
          value = '<img src="'+location.origin+'/cfs/files/images/'+value+'" width="'+width+'"/>';
        }
      }      
      // data is formated, push it! 
      tempData.push(value);  
      tempDataClass.push(autoOneObject.setClassForFiels(rules.columns[item].class, value));       
    }); 
    // end of foreach

    // at last create data set, it must be a better object which covers class & buttons in same dictionary 
    // and will use column names as keys, it will be easy to access in different situations
    var thing = {}
    
    for (var y = 0; y < tempData.length; y++) {
      thing[name[y]] = {
        value: tempData[y],
        class: tempDataClass[y]
      }
    }

    // set data into an object for direct access
    autoOneData = thing;
    
    autoOneData['edit'] = autoOneObject.buttonEdit(data._id);
    autoOneData['delete'] = autoOneObject.buttonDelete(data._id); 

    try {
      if (this.field == 'edit' || this.field == 'delete')
        return autoOneData[this.field];
      else
        return autoOneData[this.field][this.type];
    } catch(e) {
      return '<p>TypeError: Cannot read "object.'+this.field+'.'+this.type+'"</p>';
    }
  }
});