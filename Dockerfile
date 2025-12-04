FROM node:25

# Using the `node` user that has UID 1000
USER node:node
WORKDIR /home/web/llm-consultant-widget

COPY --chown=node:node . .

VOLUME [ "/home/web/llm-consultant-widget/dist" ]

RUN [ "npm", "install" ]
RUN [ "npm", "run", "build" ]
# TODO add a healthcheck that indicate that the build was finished