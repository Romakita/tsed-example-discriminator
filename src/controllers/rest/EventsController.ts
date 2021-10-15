import {BodyParams, Controller, Get, Post} from "@tsed/common";
import {Groups, Returns} from "@tsed/schema";
import {ClickedLinkEventModel} from "../../models/ClickedEventModel";
import {SignedUpEventModel} from "../../models/SignedUpEventModel";
import {EventsRepository} from "../../services/EventsRepository";
import {Inject} from "@tsed/di";

const examples = {
  EventModel: {
    description: "Default event",
    value: {
      time: new Date().toISOString()
    }
  },
  EventModel: {
    description: "Default event",
    value: {
      time: new Date().toISOString()
    }
  }
};

@Controller("/events")
export class EventsController {
  @Inject()
  repository: EventsRepository;

  @Post("/clicked")
  createClicked(@BodyParams() @Groups("creation") event: ClickedLinkEventModel) {
    return this.repository.addEvent(event);
  }

  @Post("/signed")
  createSignedUp(@BodyParams() @Groups("creation") event: SignedUpEventModel) {
    return this.repository.addEvent(event);
  }

  @Get("/")
  @Returns(200, Array).ContentType('application/json')
  async getAll() {
    const result = await this.repository.find();

    console.log(result)

    return result
  }
}
