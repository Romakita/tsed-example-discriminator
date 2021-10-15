import {Model} from "@tsed/mongoose";
import {Required} from "@tsed/schema";
import {EventModel} from "./EventModel";

@Model({discriminatorValue: "signUpEvent"})
export class SignedUpEventModel extends EventModel {
  @Required()
  user: string;
}
