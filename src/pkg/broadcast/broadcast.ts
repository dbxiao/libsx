/**
 * @author dbxiao <dbxiao@foxmail.com>
 * @description Web js broadcast lib. 
 * @copyright ©2023 libsx.com. MIT Licensed. Created by dbxiao
 */

/**
 * The BroadCast class represents a web js broadcast library.
 */
class BroadCast {
    private debug: boolean
    private channel: Map<any, any>

    constructor() {
        this.debug = false
        this.channel = new Map()
    }

    /**
     * Generates a unique listener channel ID.
     * @returns A unique string ID.
     */
    getUnid() {
        return Math.random().toString(36).slice(2)
    }

    /**
     * Sets a dynamic channel.
     * @param name - The name or ID of the channel.
     * @param listenCB - The callback function for the channel.
     */
    setChannel(name: string|number|symbol, listenCB: any): void {
        const newChannel: any = {}
        newChannel[this.getUnid()] = {
            tag: true,
            cb: listenCB
        }

        if (this.channel.has(name)) {
            this.channel.set(name, Object.assign(this.channel.get(name), newChannel))
        } else {
            this.channel.set(name, newChannel)
        }
    }

    /**
     * Gets the defined channel.
     * @param name - The name or ID of the channel.
     * @returns The defined channel object.
     */
    getChannel(name: string|number|symbol): any {
        return this.channel.get(name)
    }

    /**
     * Gets all the listened channels.
     */
    getAllChannels() {
        return this.channel
    }

    /**
     * Triggers the specified channel with given data.
     * @param name - The name or ID of the channel.
     * @param data - The data to be passed to the channel callback.
     */
    trigger(name: string, data: any) {
        const channelObj = this.getChannel(name)
        if (channelObj) {
            for(let i in channelObj) {
                const { cb } = channelObj[i]
                if (typeof cb === 'function') {
                    cb(data, i)
                }
            }
        } else {
            this.log(`channel ${name} is not be listened!`)
        }
    }

    /**
     * Listens to a channel.
     * @param name - The name or ID of the channel.
     * @param listenCallback - The callback function for the channel.
     */
    listen(name: string, listenCallback: Function) {
        this.setChannel(name, listenCallback)
        this.log(`listen channel`, this.channel)
    }

    /**
     * cancel a channel.
     * @param id - The ID of the channel to be removed.
     */
    cancel(id: string) {
        this.channel.forEach((value) => {
            delete value[id]
        })
        this.log(`channel id: ${id} is canceled. channel`, this.channel)
    }

    remove(name: string|number|symbol) {
        this.channel.delete(name)
        this.log(`channel name: ${String(name)} is remove. channel:`, this.channel )
    }

    setDebug(debug: boolean) {
        this.debug = debug
    }

    log(...msg: any) {
        if (this.debug === true) {
            console.log('@broadcast::', msg)
        }
    }
}

const _window = window as any
_window.broadcast = new BroadCast()
export default _window.broadcast