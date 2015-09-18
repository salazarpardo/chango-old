Template.drawer.helpers({
      postCount: function(){
		return SpotList.find().count();
      }
});