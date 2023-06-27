
# Discord-Bot-JS

The features are
- Welcome members
- Message logging and tracking
- Track user voice channel activities
- Track and Notify users about upcoming Discord events



## Future Improvement

- Notify in LINE
- Add slash command
- Store data in database


## Deployment w/ Docker

To deploy this project with Docker, edit the dockerfile

```bash
RUN mkdir setting && \
    echo '{ "wel": "925047985736405022" }' > setting/textChannel.json && \
    echo '{ "come": "925047985736405022" }' > setting/voiceChannel.json
```

Change the key and value of JSON to the channel names and IDs, then use this command to build image 

```bash
docker build --platform=amd64 -t your_image_name .
```
Note: --platform=amd64 can be edit

Also, don't forget to insert bot TOKEN when deploying 

## Deployment w/o Docker

This repo is using 

```JS
node v16.17.1
npm 8.15.0
```

Follow this instruction ( Option 3 )

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04#option-3-installing-node-using-the-node-version-manager

and specify the Node version then you can simply run 
`node index.js`

