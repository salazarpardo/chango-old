Template.user.helpers({
  users: function () {
    return users.find();
  },
	username: function(){
    var user = Meteor.user();
    if (user){
      var username;
      username = Meteor.user().username || Meteor.user().profile.name;
      return username 
    }
    else{
            return 'User'
    }
		
    }
});

 