Template.modalForm.helpers({  
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
      initialLocation = new google.maps.LatLng(4.60063716865005, -74.08990859985352);
      var bogota = new google.maps.LatLng(4.60063716865005, -74.08990859985352);
      var browserSupportFlag = new Boolean();
      if (navigator.geolocation) {
      browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  } else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("El servicio de Localizaci\u00f3n no esta activo.");
      initialLocation = bogota;
    } else {
      alert("Su navegador no soporta el servicio de Localizaci\u00f3n.");
      initialLocation = bogota;
    }
    return initialLocation;
  }

        return {
              center: initialLocation,
              zoom: 14
        };
      }
    },

    formActionTitle: function(){
      var editSpot = Session.get('Edit');
      if (editSpot) {
        return 'Edit'
      }
      else {
        return 'Add'
      }
    }

  });

  Template.modalForm.onCreated(function() {  

    GoogleMaps.ready('modalMap', function(map) {
      var icons = {
      'Chango' : new google.maps.MarkerImage('/markers/marker-chango.svg', null, null, null, new google.maps.Size(40, 40), new google.maps.Point(0, 0), new google.maps.Point(0, 0)),
      'Usr' : new google.maps.MarkerImage('/markers/marker-usr.svg', null, null, null, new google.maps.Size(40, 40), new google.maps.Point(0, 0), new google.maps.Point(0, 0))
      }
      var marker, newLocation;
      map.instance.setCenter(initialLocation);
      var geocoder = new google.maps.Geocoder();
      function codeLatLng() {
        var input = $( "#exampleInputLocation" ).val();
        var latlngStr = input.split(',', 2);
        var latlng = new google.maps.LatLng(latlngStr[0], latlngStr[1]);
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              $( "#exampleInputAddress" ).val(results[1].formatted_address);
         
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
      google.maps.event.addListener(map.instance, 'click', function(event) {
       if (!marker) {
          marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
          map: map.instance, 
          icon : icons['Chango'],
          shadow : icons['Shadow']
          });
        }
        else { marker.setPosition( event.latLng ); }

        google.maps.event.addListener(marker, 'dragend', function(event) {
          newLocation = event.latLng.lat()+ "," + event.latLng.lng();
          $( "#exampleInputLocation" ).val( newLocation );
          codeLatLng();
        });

        newLocation = event.latLng.lat()+ "," + event.latLng.lng();
        $( "#exampleInputLocation" ).val( newLocation );
        codeLatLng();
      });
    });
/*
    $(function() {
      navigator.getUserMedia  = navigator.getUserMedia ||
                                navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia ||
                                navigator.msGetUserMedia;

      var errorCallback = function(e) {
        console.log('Reeeejected!', e);
      };
      var video = document.querySelector('.capture video');
      var localMediaStream = null;

       // Not showing vendor prefixes or code that works cross-browser.
      navigator.getUserMedia({video: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
      }, errorCallback);

    });*/

  });

  Template.modalForm.events({
    'submit form': function(event){
      event.preventDefault();
      var username;
      if(Meteor.user().username){
        username = Meteor.user().username
      }
      else if(Meteor.user().profile.name){
        username = Meteor.user().profile.name
      }
      if(Session.get('Edit')) {
        var spotId = Session.get('Edit');
      }
      
      var titleVar = event.target.exampleInputTitle.value;
      $('#exampleInputTitle').val('');
      var locationVar = event.target.exampleInputLocation.value.split(',');
      $('#exampleInputLocation').val('');
      var addressVar = event.target.exampleInputAddress.value;
      $('#exampleInputAddress').val('');
      var imageVar = event.target.exampleInputImg.value;
      $('#exampleInputImg, .form-control').val('');
      var descriptionVar = event.target.exampleInputDescription.value;
      $('#exampleInputDescription').val('');
      var categoryVar = event.target.exampleInputCategory.value;
      $('#exampleInputCategory').val('');
      var currentUserId = Meteor.userId();

    
      if(Session.get('Edit')) {
          console.log(spotId);
          Meteor.call('editSpotData', titleVar, locationVar, addressVar, imageVar, descriptionVar, categoryVar, username, spotId);
          Session.set('Edit', false);
      }
      else {
           Meteor.call('insertSpotData', titleVar, locationVar, addressVar, imageVar, descriptionVar, categoryVar, username);
      }
     
      $('#myModal').modal('hide');
    }/*, 
    'click .capture video': function(localMediaStream) { 
      var video = document.querySelector('.capture video');
      var canvas = document.querySelector('.capture canvas');
      var ctx = canvas.getContext('2d');
        if (localMediaStream) {
          ctx.drawImage(video, 0, 0);
          // "image/webp" works in Chrome.
          // Other browsers will fall back to image/png.
          document.querySelector('.capture img').src = canvas.toDataURL('image/webp');
        }
    }*/
  });