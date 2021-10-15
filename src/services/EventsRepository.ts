import {Inject, Injectable} from "@tsed/di";
import {MongooseModel} from "@tsed/mongoose";
import {EventModel} from "../models/EventModel";
import {ClickedLinkEventModel} from "../models/ClickedEventModel";
import {SignedUpEventModel} from "../models/SignedUpEventModel";
import {classOf, Type} from "@tsed/core";

@Injectable()
export class EventsRepository {
  protected instances = new Map<Type<any>, MongooseModel<any>>();

  @Inject(EventModel) private eventModel: MongooseModel<EventModel>;
  @Inject(ClickedLinkEventModel) private clickedLinkEventModelModel: MongooseModel<ClickedLinkEventModel>;
  @Inject(SignedUpEventModel) private signedUpEventModelModel: MongooseModel<SignedUpEventModel>;

  $onInit() {
    this.instances.set(EventModel, this.eventModel);
    this.instances.set(ClickedLinkEventModel, this.clickedLinkEventModelModel);
    this.instances.set(SignedUpEventModel, this.signedUpEventModelModel);
  }

  async addEvent<T = EventModel>(obj: Partial<T>) {
    const model: MongooseModel<T> = this.instances.get(classOf(obj))!;
    const doc = new model(obj as any);

    await doc.save();

    return doc;
  }

  async find(query: any = {}) {
    return this.eventModel.find(query)/*.populate("metadata")*/.exec();
  }
}
