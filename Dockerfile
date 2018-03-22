FROM node:8.10.0-slim

WORKDIR /usr/node/preact-pwa
RUN apt-get update && apt-get install -y openssl curl sudo && \
  mkdir -p /home/node/.preact-cli /home/node/.config/devcert && \
  # adduser --disabled-password --gecos '' node && \
  # adduser sudo && \
  echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
  echo '%node ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
  chown -R node:node . /home/node/
USER node
COPY --chown=node:node ./package.json ./yarn.lock ./
COPY --chown=node:node ./packages/app ./
RUN yarn && \
  echo "Installation completed. Cleaning cache..." && \
  yarn cache clean
COPY --chown=node:node ./ ./
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}
# RUN if [ "$NODE_ENV" == "production" ]; then \
#   yarn build; \
# fi
# DEBUG
# RUN sudo rm /etc/certs/devcert.pem && rm -rf ~/.config/devcert
CMD yarn start
# CMD tail -f /dev/null