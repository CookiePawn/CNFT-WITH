var naverLogin = new naver.LoginWithNaverId(
   {
      clientId: "486PJdxDEgfuF5VsZOMU",
      callbackUrl: "https://cookiepawn.shop/naverLoginCheck", // https://cookiepawn.shop/naverLoginCheck
      isPopup: false,
      callbackHandle: true
   }
);  


naverLogin.init();
