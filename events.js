Template.autoOne.events({
  // before remove action for autoTable
  'click .remove' : function() {
  	if (confirm('Are you sure to delete?')) {
  		window[this.collection].remove(this.id);        
		}
  }
});