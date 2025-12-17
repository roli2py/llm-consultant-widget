FROM node:25

# Using the `node` user that has UID 1000
USER node:node
WORKDIR /home/web/llm-consultant-widget

COPY --chown=node:node . .

# Explicit invoke of a failure. `Dockerfile` must be recreated due to the migration
RUN [ "exit", "1" ]
