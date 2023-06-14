FROM node:16
ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir setting && \
    echo '{ "wel": "925047985736405022" }' > setting/textChannel.json && \
    echo '{
    "General": "712555939797925899",
    "sirasirasirasira": "1113560013907165224"
  }' > setting/voiceChannel.json

CMD [ "node", "index.js" ]
