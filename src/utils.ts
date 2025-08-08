import {Server} from "socket.io";

function getRandomTemperature(min = 18, max = 35): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// with garbage and missing data
export function startTemperatureEmitter(io: Server) {
    setInterval(() => {
        const temperature = getRandomTemperature();
        const timestamp = new Date().toISOString();

        io.to('temperature-room').emit('temperature', {
            temperature,
            timestamp
        });
    }, 1000);
}