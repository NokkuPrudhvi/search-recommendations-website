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

        // responseJSON.results.forEach(function (result)  {
        //     html += '<h2>' + result.name + '</h2>';
        //     // html += "<h2>" + demo.biography.alter-egos + "</h2>";
        //     html += '<h2>Power Stats ' + result.powerstats.combat + '</h2>';
        //     html += '<p>Connections ' + result.connections.relatives + '</p>';
        //     html += '<p>Appearance ' + result.appearance.gender + '</p>';
        //     html += '<p>Work ' + result.work.base + '</p>';
        //     // html += ' Profile <img src ' + result.image.url + '>';
        //   });
        console.log(result.Eta)
        result_id=result.RideId
        html = '<p>Response received from API ' + result_id + '</p>';
        html += '<p> please check the immediate recommedations. you will get the additional recommendations for 3 days to your mail , when some-one answered your query</p>';
        document.getElementById('queryResult').innerHTML = html;
    }

    // Register click handler for #triggerQueryapi button
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
