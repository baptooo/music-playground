# Music Playground
## A music playground tool for your local music

## Requirements

1. nodejs [http://nodejs.org/download/](nodejs)
2. bower: "npm install -g bower"
3. Ruby (2.0+)
3. Sass (3.3+) "gem install sass"

## Installation

1. Node modules: "npm install"
2. Bower components: "bower install"
3. Create "userConfig.json" file to store the basePath of your music library

    ```{
        basePath: 'Disk:/myMusic'
    }```
    
4. Generate the api: "grunt api"
5. Start the server "grunt server" and you are ready !