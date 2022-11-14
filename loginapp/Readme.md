# Twitter Login does not work on LoginApp
Apparently Firebase's TwitterAuthProvider tries to acces to Twitter API 1.1, and trying to login with twitter gives the following error

```
index.js:1 FirebaseError: Firebase: Failed to fetch resource from 
https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true, 
http status: 403, 
http response: {"errors":[
   {"message":"You currently have Essential access which includes access 
               to Twitter API v2 endpoints only. If you need access to this endpoint, 
                you’ll need to apply for Elevated access via the Developer Portal. 
                You can learn more here: 
                https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api#v2-access-leve","code":453}]}
```

Since 2021 Twitter's standart Auth endpoints use Twitter API v2, so if you want to use Twitter authentication on this app you need to apply for Twitter Elevated access, which means sending a 200 characters minimum description of the API usage for Twitter to review