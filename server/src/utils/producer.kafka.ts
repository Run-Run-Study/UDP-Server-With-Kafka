import {Kafka, Message, Partitioners, Producer, ProducerBatch, TopicMessages} from "kafkajs";

export default class ProducerFactory {
    private static instance: ProducerFactory
    private producer: Producer

    private constructor() {
        this.producer = this.createProducer()
    }

    public static getInstance(): ProducerFactory {
        return this.instance || (this.instance = new ProducerFactory())
    }

    public async start(): Promise<string> {
        return await this.producer.connect()
            .then(_ => "Success connecting the producer")
            .catch(reason => `Error connecting the producer >>> ${reason}`)
    }

    public async send(messages: Array<string>): Promise<void> {
        const kafkaMessages: Array<Message> = messages.map(message => {
            return {
                key: "log",
                value: message
            }
        })

        const topicMessages: TopicMessages = {
            topic: "test-event",
            messages: kafkaMessages
        }

        const batch: ProducerBatch = {
            topicMessages: [topicMessages]
        }

        await this.producer.sendBatch(batch)
    }

    private createProducer(): Producer {
        const kafka = new Kafka({
            clientId: "test-client",
            brokers: [process.env.KAFKA_HOST_1!!, process.env.KAFKA_HOST_2!!, process.env.KAFKA_HOST_3!!]
        })
        return kafka.producer({createPartitioner: Partitioners.DefaultPartitioner})
    }
}