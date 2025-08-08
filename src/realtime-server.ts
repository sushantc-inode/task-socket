import {FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction} from "fastify";
import fastifySocketIO from 'fastify-socket.io';
import {Server} from "socket.io";
import {startTemperatureEmitter} from "./utils";

declare module 'fastify' {
    interface FastifyInstance {
        io: Server;
    }
}

export const LiveServer = (
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
    done: HookHandlerDoneFunction,
) => {

    fastify.register(fastifySocketIO, {
        cors: {
            origin: '*',
        },
    });

    fastify.ready().then(() => {
        const io = fastify.io;
        io.on('connection', (socket) => {

            socket.join('temperature-room');
            console.log(`✅ User ${socket.id} joined room: temperature-room`);

            // Handle message from client
            // socket.on('message', (data) => {
            //     console.log(`📨 Message from ${socket.id} to ${room}:`, data);
            //     socket.to(room).emit('message', { userId: socket.id, message: data });
            // });


            // On disconnect
            socket.on('disconnect', () => {
                console.log(`❌ User ${socket.id} disconnected`);
            });
        })

        // Start the temperature emitter
        startTemperatureEmitter(io);
    })


    done();
};