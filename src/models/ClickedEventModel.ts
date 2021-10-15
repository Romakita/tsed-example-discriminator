import {Model} from "@tsed/mongoose";
import {Required, Uri} from "@tsed/schema";
import {EventModel} from "./EventModel";

@Model()
export class ClickedLinkEventModel extends EventModel {
  @Required()
  @Uri()
  url: string;
}
