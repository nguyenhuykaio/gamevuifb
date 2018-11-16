
function playGame(id) {
    FB.login(function (data) {
        console.log(data.authResponse);
        getGame(id);
    }, {
        scope: 'email,public_profile,user_friends,publish_actions,user_birthday,user_likes,read_custom_friendlists,user_photos'
    });
}

function getGame(id) {
    switch (id) {
        case 1:
            game1();
            break;
        case 2:
            game2();
            break;
        case 6:
            game6();
            break;
        case 7:
            game7();
            break;
        default:
            gameTest();
    }

}