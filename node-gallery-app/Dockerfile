FROM node

#Create directory
WORKDIR /usr/src/app

#Install dependencies
COPY package*.json ./

RUN npm install

#Bundle source
COPY . .

ENV PORT 3000
EXPOSE 3000

CMD ["npm","start"]