Template.body.onRendered(function(){
//do stuff
});

Template.body.events({
  'click .add': function(event){
    //event.preventDefault();
    console.log('body')
    //$('#myModal').modal('show');
    $('#formModal').on('shown.bs.modal', function (e) {
      var map = GoogleMaps.maps.modalMap.instance;
      google.maps.event.trigger(map, 'resize');
    });
    Session.set('Edit', false);
    }
});

Template.header.helpers({
  log: function () {
    console.log(this);
  }
});

Template.header.onCreated(function() {
	if (window.navigator.standalone){
		     // $('body').addClass('standalone');
	}
});
/*
Template.header.events({
      'click .add': function(){
        console.log('alo');
      $('#myModal').on('shown.bs.modal', function (e) {
           google.maps.event.trigger(GoogleMaps.maps.modalMap.instance, 'resize');
      });
      Session.set('Edit', false);
      }
});
*/
 