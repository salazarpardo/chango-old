Template.toolBar.helpers({

      selectedClass: function(){
        var spotId = this._id;
        var selectedSpot = Session.get('selectedSpot');
        if(spotId == selectedSpot){
          return 'selected'
        }
      }

});


