var naverLogin = new naver.LoginWithNaverId(
   {
      clientId: "fF_n9MMtYWJjeyNVzYDQ",
      callbackUrl: "http://localhost:3000/naverLoginCheck", // http://cookiepawn.shop/naverLoginCheck
      isPopup: false,
      callbackHandle: true
   }
);  


naverLogin.init();
