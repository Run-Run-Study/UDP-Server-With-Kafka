import ProducerFactory from "./utils/producer.kafka";
import UdpSocket from "./utils/udp.socket";

export default () => {
    const producer = ProducerFactory.getInstance()

    producer.start()
        .then(message => {
            console.log(message)
            const socket = UdpSocket.getInstance()
            socket.addMessageEvent(producer)
                .then(_ => socket.bind(Number(process.env.KAFKA_PORT!!)))
        })
        .catch(reason => console.log(`An error occurred while connecting kafka Producer >>> ${reason}`))
}