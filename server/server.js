Meteor.publish('theSpots', function(){
      var currentUserId = this.userId;
      return SpotList.find()
    });
Meteor.publish('users', function(){
  return Meteor.users.find({},{fields:{profile:1}})
})

Meteor.methods({
    // methods go here
      insertSpotData: function(titleVar, locationVar, addressVar, imageVar, descriptionVar, categoryVar, username){
        var currentUserId = Meteor.userId();
        SpotList.insert({
          title : titleVar,
          address : addressVar,
          description : descriptionVar,
          position : locationVar,
          image: imageVar,
          category : categoryVar,
          username: username, 
          createdBy: currentUserId, 
          score: 0
        });
      },
      removeSpotData: function(selectedSpot) {
        var currentUserId = Meteor.userId();
        SpotList.remove({_id: selectedSpot, createdBy: currentUserId});
      },
      editSpotData: function(titleVar, locationVar, addressVar, imageVar, descriptionVar, categoryVar, username, spotId) {
       
        SpotList.update({_id: spotId}, {$set: {  
          title : titleVar,
          address : addressVar,
          description : descriptionVar,
          position : locationVar,
          image: imageVar,
          category : categoryVar
        }
        });
      },
      modifySpotScore: function (selectedSpot, scoreValue) {
        SpotList.update(selectedSpot, {$inc: {score: scoreValue} });
      }

    });