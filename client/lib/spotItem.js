Template.spotItem.helpers({
      selectedClass: function(){
        var spotId = this._id;
        var selectedSpot = Session.get('selectedSpot');
        if(spotId == selectedSpot){
          return 'selected'
        }
      },
      countIconVal: function(){
        if (this.score >= 0){
          return 'glyphicon-thumbs-up';
        }
        else{
          return 'glyphicon-thumbs-down';
        }
      }

});


