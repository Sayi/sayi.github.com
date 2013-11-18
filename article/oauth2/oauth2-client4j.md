# Oauth2 client4j
OAuth2 client for Java,based on Apache Oltu and scribe-java,implements the OAuth 2.0 protocol for authentication and authorization.


## Why oauth2-client4j?
want to code easier,extend easier.  

## Download and Maven
OAuth2-client4j replace jettison with fastjson,just put `fastjson.jar,oauth2-client4j.jar` in your lib folder.
if you use Maven,add Maven dependency:  

xml
    <dependency>
        <groupId>org.oauth2.client</groupId>
        <artifactId>oauth2-client4j</artifactId>
        <version>0.0.1</version>
    </dependency>



## Usage
OAuth 2.0 is a relatively simple protocol,
you should register your application with the servers provider and request to get **access_token** which can be send to the provider's API that you want to access.This example shows how to receive an access token from Google.
#### step 1. Build OAuth2 Service  

<!--?prettify lang=java?-->
    OAuthService service = new OAuthServiceBuilder()
                    .provider(GoogleProvider.class)
                    .apiKey(KEY_ID)
                    .apiSecret(API_SECRET)
                    .callback(REDIRECT_URL)
                    .build();


#### step 2. Send an Authentication Request  

<!--?prettify lang=java?-->
    service.getAuthorizationRequest().getLocationUri();


#### step 3. Get Authorization Code from redirect URI
depend your application,native、app or web.For web,you can just get parameter like this:

<!--?prettify lang=java?-->
    String code = request.getParamert("code"); 
 
#### step 4. Exchange OAuth2 Code for Access Token
default,return the json Response:

<!--?prettify lang=java?-->
    GoogleAccessTokenResponse response = serviceGoogle.accessToken(code,
                GoogleAccessTokenResponse.class);
    response.getAccessToken();


  
  
## Additional features
* Attach additional parameters to authentication request

<!--?prettify lang=java?-->
        service.getAuthorizationRequest().addParameter(PARAM_KEY,PARAM_VAL).getLocationUri();
    
* Provide universal method to parse authorization code 

<!--?prettify lang=java?-->
        ~~~~
    
* Provide custom response readers to extract access_token or more,two ways:  

1.implement your response class,and pass parameter to get access token:  

<!--?prettify lang=java?-->
        GoogleAccessTokenResponse response = serviceGoogle.accessToken(code,
                GoogleAccessTokenResponse.class);

2.every provider class,like GoogleProvider.class,have method:  

<!--?prettify lang=java?-->
        public Class<? extends OAuthResponse> getAccessTokenResponseClass(){}  


just return the  response class and code like this: `SinaWeiboAccessTokenResponse response = (SinaWeiboAccessTokenResponse) service.accessToken(code);`,
default response is OAuthJSONAccessTokenResponse.

* Use your own HTTP client

<!--?prettify lang=java?-->
        new OAuthServiceBuilder().customHttpClinet(client);



## Extend
* add new provider class to use powerful func  

<!--?prettify lang=java?-->
        .provider(new Provider(){...}) 

use

<!--?prettify lang=java?-->
        JSONAccessTokenResponse response = service.accessJsonToken(code);



