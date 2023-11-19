# pull official base image
FROM node:18.16.1-alpine

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . ./

# install app dependencies
RUN yarn install --silent


# start app
CMD ["yarn", "dev"]
