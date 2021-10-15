import {Groups} from "@tsed/schema";
import {DiscriminatorKey, Model, ObjectID} from "@tsed/mongoose";

@Model()
export class EventModel {
  @Groups("!creation")
  @ObjectID()
  _id: string;

  @Groups("!creation")
  time: Date = new Date();

  @DiscriminatorKey()
  @Groups("!creation")
  type: string;
}
