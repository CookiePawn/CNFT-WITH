function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    const responsePayload = parseJwt(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    sessionStorage.setItem('id', responsePayload.sub);
    sessionStorage.setItem('nickname', responsePayload.name);
    sessionStorage.setItem('icon', responsePayload.picture);
    sessionStorage.setItem('email', responsePayload.email);
    sessionStorage.setItem('social', 'google');


    location.href='/main';
}





window.onload = function () {
    google.accounts.id.initialize({
      client_id: "941458816459-s7hnjsgbkqd5d92tfa41arvhafkjj9dq.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("googleLoginBtn"),
      { theme: "outline", size: "large", width: '285' }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}







function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};