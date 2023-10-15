import * as dgram from "dgram";
import {Socket} from "dgram";
import ProducerFactory from "./producer.kafka";

export default class UdpSocket {
    private static instance: UdpSocket
    private socket: Socket

    constructor() {
        this.socket = dgram.createSocket("udp4")
        this.addListeningEvent()
        this.addErrorEvent()
        // this.addCloseEvent()
    }

    public static getInstance(): UdpSocket {
        return this.instance || (this.instance = new UdpSocket())
    }

    private addListeningEvent(): void {
        this.socket.on("listening", () => {
            const address = this.socket.address()
            console.log(`UDP Server Listening >>> ${address.address}:${address.port}`)
        })
    }

    private addErrorEvent(): void {
        this.socket.on("error", err => {
            console.log(`UDP Server Error >>> ${err}`)
        })
    }

    public async addMessageEvent(producer: ProducerFactory): Promise<void> {
        this.socket.on("message", (msg, rinfo) => {
            producer.send([`${rinfo.address}:${rinfo.port} >>> ${msg.toString()}`])
        })
    }

    public bind(port: number): void {
        this.socket.bind(port)
    }
}