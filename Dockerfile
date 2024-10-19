# Import OS for docker [cached]
FROM node:18.0.0-alpine as base

# Add maintainer of the image
LABEL author="devaltruist@gmail.com"

# Install nodemon globally [volume use-case]
# RUN npm install -g nodemon

# Create working directory [cached]
WORKDIR /app

# Copy package.json contents [cached]
COPY package*.json .

# Install packages [cached]
RUN npm install

# Copy all contents in the project root directory into the app directory
COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build

# Expose port to external connection
EXPOSE 8000

# Install pm2 globally. This works well on other operating system other than windows. use npm install -g pm2@3.2.4 for windows
RUN npm install pm2 -g

# Install profiler to link pm2 to your app for monitoring
RUN pm2 install profiler

# Run command to start the application
# CMD [ "npm", "run", "start" ]
#Note: pm2-runtime designed for Docker container which keeps an application in the foreground which keep the container running
CMD ["pm2-runtime", "npm", "--", "start"]