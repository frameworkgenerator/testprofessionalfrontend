FROM tiangolo/node-frontend:10
RUN mkdir -p ~/app
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 80
RUN npm run prd
