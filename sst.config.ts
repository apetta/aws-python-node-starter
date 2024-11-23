/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-python-container",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "local",
      providers: {
        aws: true,
      },
    };
  },
  async run() {
    const python = new sst.aws.Function("MyPythonContainer", {
      python: {
        container: true,
      },
      architecture: "arm64",
      handler: "python-functions/hello.handler",
      runtime: "python3.11",
      url: true,
    });

    const queue = new sst.aws.Queue("MyQueue", {});

    queue.subscribe({
      python: {
        container: true,
      },
      architecture: "arm64",
      handler: "python-functions/queue.handler",
      runtime: "python3.11",
    });

    const createNewMessage = new sst.aws.Function("CreateQueueMessage", {
      handler: "node-functions/create-new-message.handler",
      link: [queue],
      url: true,
    });

    return {
      python: python.url,
      queue: queue.url,
      createNewMessage: createNewMessage.url,
    };
  },
});
