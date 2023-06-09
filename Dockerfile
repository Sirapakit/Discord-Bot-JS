FROM node:16
ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ENV TOKEN="MTExMjgwMTI3ODEwODY0MzQyOQ.GnRMw4.GtXu_IB9Y9o2wGopbPeDCWC701g_ekEZ0fxavg"

CMD [ "node", "index.js" ]
