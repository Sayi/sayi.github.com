# Oauth2 client4j
OAuth2 client for Java,beased on Apache Oltu,
implements the OAuth 2.0 protocol for authentication and authorization.


## Why oauth2-client4j?
want to code easier,extend easier.  

## Download and Maven

## Usage
OAuth 2.0 is a relatively simple protocol,
you should register your application with the servers provider and request to get **access_token** 
which can be send to the provider's API that you want to access.  
This example shows how to receive an access token from Google.  
step 1. Build OAuth2 Service  

<!--?prettify lang=java?-->
    OAuthService service = new OAuthServiceBuilder()
                    .provider(GoogleProvider.class)
                    .apiKey(KEY_ID)
                    .apiSecret(API_SECRET)
                    .callback(REDIRECT_URL)
                    .build();

step 2. Send an Authentication Request  

<!--?prettify lang=java?-->
    service.getAuthorizationUrl();


step 3. Get Authorization Code from redirect URI
depend your application,native、app or web.For web,you can just get parameter like this:

<!--?prettify lang=java?-->
    String code = request.getParamert("code"); 
 
step 4. Exchange OAuth2 Code for Access Token
default,return the json Response:

<!--?prettify lang=java?-->
    OAuthJSONAccessTokenResponse oAuthResponse = service.accessToken(code);
    oAuthResponse.getAccessToken();

## Additional features
* Attach additional parameters to authentication request

<!--?prettify lang=java?-->
        service.attachAuthParam(PARAM_KEY,PARAM_VAL).getAuthorizationUrl();
    
* Provide universal method to parse authorization code 

<!--?prettify lang=java?-->
        OAuthAuthzResponse oar = OAuthAuthzResponse.oauthCodeAuthzResponse(request);
        String code = oar.getCode();
    
* Provide custom response readers to extract access_token or more
two ways:  
1. implement your response class,and pass parameter to get access token:  

<!--?prettify lang=java?-->
        GitHubTokenResponse response = service.accessToken(code, GitHubTokenResponse.class);

2. every provider class,like GoogleProvider.class,have method:  

        OAuthClientResponse getAccessTokenResponse(){}
just return the  response class and code like this: `service.accessToken(code)`,
if return null,default response is OAuthJSONAccessTokenResponse.
    
* Use your own HTTP client

<!--?prettify lang=java?-->
        service.customHttpClinet(client).accessToken(code);

## extend
* add new provider class to use powerful func  

<!--?prettify lang=java?-->
        .provider(new Provider(){...}) 

* an universal usage---do not want to add new provider class for standard oauth2 protocol

<!--?prettify lang=java?-->
        .provider(GoogleProvider.class) -----> .authorizationLocation(AUTH_URL).tokenLocation(TOKEN_URL)
use

<!--?prettify lang=java?-->
        service.accessToken(code, requestType, ResponseClass.class)` 



