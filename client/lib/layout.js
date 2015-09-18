Template.layout.helpers({
  userStatus: function() {
        if (Meteor.userId())
            return true
        else
            return false
    }
});