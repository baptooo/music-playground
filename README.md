# Music Playground (v 0.2.0-1)
## A music playground tool for your local music

## Requirements

1. nodejs [http://nodejs.org/download/](http://nodejs.org/download/)
2. bower: "npm install -g bower"
3. Ruby (2.0+)
3. Sass (3.3+) "gem install sass"

## Installation

1. Node modules: "npm install"
2. Create "userConfig.json" file to configure the application

        Available options:
            1. basePath: store the basePath of your music library
            2. hostname: define the hostname used by server
            3. port: define on which port server will listen
        
    Example:
    ```js
    {
        "basePath": "Disk:/myMusic"
        "hostname": "localhost"
        "port": 9000
    }
    ```
    
4. Generate the api: "npm run api"
```
$ npm run api
```
5. Start the server with the default npm script "start" and you are ready !
```
$ npm start
```
