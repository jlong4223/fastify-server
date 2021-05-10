// Required the framework and instantiated it
const fastify = require("fastify")({ logger: true });

// routes
fastify.route({
  method: "GET",
  url: "/",
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      name: { type: "string" },
    },
    // the response needs to be an object with an `hello` property of type 'string' and any other properties that you want to include
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
          message: { type: "string" },
          createdBy: { type: "string" },
          nested: { type: "array" },
        },
      },
    },
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return {
      hello: "world",
      message:
        "This node.js server is running using Fastify to serve json as an alternative to Express.js",
      // below will not show up if the server is not expecting it - needs to be defined in the res object
      createdBy: "Jared Long",
      nested: ["developer", "javascript"],
    };
  },
});

fastify.route({
  method: "GET",
  url: "/jared",
  schema: {
    querystring: {
      name: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
          message: { type: "string" },
          status: { type: "number" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    return {
      hello: "Jared",
      message: "welcome to your personal route",
      status: 200,
    };
  },
});

// custom error route
fastify.route({
  method: "GET",
  url: "/*",
  schema: {
    querystring: {
      name: { type: "string" },
    },
    response: {
      404: {
        type: "object",
        properties: {
          hello: { type: "string" },
          message: { type: "string" },
          status: { type: "number" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    return {
      hello: "who ever you are",
      message: "This is not a valid route",
      status: 404,
    };
  },
});

// defining and running the server ========
const port = 3000;
const start = async () => {
  try {
    await fastify.listen(port);
    console.log(
      `⚡️⚡️⚡️ Fastify Server is running on port ${port} ⚡️⚡️⚡️`
    );
  } catch (err) {
    fastify.log.error(err);
  }
};

start();
