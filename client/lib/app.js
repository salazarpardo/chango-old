

Meteor.subscribe('theSpots');

Meteor.subscribe('users');

Meteor.startup(function() {

    var app = new kendo.mobile.Application(document.body, { skin: "nova" });

    // reset global drawer instance, for demo purposes
    // kendo.mobile.ui.Drawer.current = null;

    GoogleMaps.load();
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});