import axios, { AxiosResponse } from "axios"
import { EventsStore } from "./EventsStore"

export class Collection<T> {
  models: T[] = []

  events = new EventsStore()

  constructor(public rootUrl: string, public deserialize: <K>(data: K) => T) {}

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  fetch<K>() {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((data: K) => {
        this.models.push(this.deserialize(data))
      })

      this.trigger("change")
    })
  }
}
