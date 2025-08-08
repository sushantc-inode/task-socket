import Fastify from 'fastify';
import {LiveServer} from "./realtime-server";
import path from "node:path";
import fastifyStatic from "@fastify/static";

const fastify = Fastify({logger: true});

fastify.register(LiveServer)

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    list: true
})

fastify.get('/admin/test', function (req, reply) {
    reply.sendFile('test.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

fastify.listen({port: Number(process.env.PORT) || 4000, host: '0.0.0.0'}, async (err, address) => {
    if (err) {
        console.log(err);
        console.error(err);
        process.exit(1);
    }
    console.log(`Listening on ${address}`);
})
