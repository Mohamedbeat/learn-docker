# FROM node:18-alpine
# WORKDIR /app
# COPY package.json ./
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi
# # RUN npm install
# COPY . .
# EXPOSE 3030
# # ENV PORT=3030
# # EXPOSE ${PORT}
# CMD ["npm","run","dev"]

# Base section: holds commun stuff between enviroments
FROM node:18-alpine as base 

# development enviroments
FROM base as development
WORKDIR /app
COPY package.json ./
RUN npm install
# RUN npm install
COPY . .
EXPOSE 3030
# ENV PORT=3030
# EXPOSE ${PORT}
CMD ["npm","run","dev"]


# production enviroments
FROM base as production
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
# RUN npm install
COPY . .
EXPOSE 3030
# ENV PORT=3030
# EXPOSE ${PORT}
CMD ["npm","run","start"]