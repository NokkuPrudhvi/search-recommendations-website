/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};

(function rideScopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    
    function requestApi(pickupLocation) {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/ride',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                PickupLocation: {
                    Latitude: pickupLocation,
                    Longitude: pickupLocation
                }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }  

    function completeRequest(result) {
        console.log('Response received from API: ', result);
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#triggerQueryapi').click(handleAPIClick);
    });


    function handleAPIClick(event) {
        console.log(event);
        event.preventDefault();
        const querytext = document.getElementById('text-search').value;
        console.log(querytext);
        requestApi(querytext);
    }

   
}(jQuery));
