var naverLogin = new naver.LoginWithNaverId(
   {
      clientId: "486PJdxDEgfuF5VsZOMU",
      callbackUrl: "http://localhost:3000/naverLoginCheck", // http://cookiepawn.shop/naverLoginCheck
      isPopup: false,
      callbackHandle: true
   }
);  


naverLogin.init();
