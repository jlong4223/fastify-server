// Required the framework and instantiated it
const fastify = require("fastify")({ logger: true });

fastify.get("/", async (req, apply) => {
  return "Fastify Server Instead of Express";
});

const start = async () => {
  try {
    await fastify.listen(3000);
    console.log("Fastify Server is running on port 3000");
  } catch (err) {
    fastify.log.error(err);
  }
};

start();
