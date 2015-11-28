autoOneObject = function(){
  
  function setClassForFiels(c, v) {
    if (!_.isUndefined(c) && !isNaN(parseFloat(v)) && isFinite(v)) {  
      dataClass = c(v);

    if (!_.isUndefined(dataClass))
      return dataClass; 
    } else {
      return '';
    }
  }
    
  // Label of a button
  function buttonLabel(button, text) {
    if (!button)
      return text;

    return button;
  }
  // Edit button
  function buttonEdit(data) {
    if (_.isUndefined(rules.buttons))
      return '<a href="/cms/'+autoOne.collection+'/item/'+data+'" class="edit" target="_self">Edit</a>';

    try{
      // Set '' if not defined
      if (!rules.buttons.edit.class)
        rules.buttons.edit.class = '';
      if (!rules.buttons.edit.label)
        rules.buttons.edit.label = '';
      
      if (rules.buttons.edit.auth()) {
        return '<a href="/cms/'+autoOne.collection+'/item/'+data+'" class="edit '+rules.buttons.edit.class+'" target="_self">'+ buttonLabel(rules.buttons.edit.label, 'Edit') +'</a>';
      } else {
        return '';
      }
    }
    catch(e){
      //console.log(e); //Log the error
    }
    return '<a href="/cms/'+autoOne.collection+'/item/'+data+'" class="edit" target="_self">Edit</a>'; 
  }
  // Delete button
  function buttonDelete(data) {
    if (_.isUndefined(rules.buttons))
      return '<a href="javascript:void(0);" class="remove" data-id="'+data+'">Delete</a>';

    try{
      // Set '' if not defined
      if (!rules.buttons.delete.class)
        rules.buttons.delete.class = '';
      if (!rules.buttons.delete.label)
        rules.buttons.delete.label = '';

      if (rules.buttons.delete.auth()) {
        return '<a href="javascript:void(0);" class="remove '+rules.buttons.delete.class+'" data-id="'+data+'">'+ buttonLabel(rules.buttons.delete.label, 'Delete') +'</a>';
      } else {
        return '';
      }  
    }
    catch(e){
      //console.log(e); //Log the error
    }
    return '<a href="javascript:void(0);" class="remove" data-id="'+data+'">Delete</a>'; 
  }

  return{
    setClassForFiels: setClassForFiels,
    buttonEdit: buttonEdit,
    buttonDelete: buttonDelete
  }
}();