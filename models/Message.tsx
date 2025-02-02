import { Schema, model, models, InferSchemaType, Document } from 'mongoose';
import {IProperty} from "@/models/Property";

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export interface IMessage extends  Document {
  sender: Schema.Types.ObjectId | string;
  recipient: Schema.Types.ObjectId | string;
  property: IProperty;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read: boolean;
  createdAt: string,
}

const Message = models.Message || model('Message', MessageSchema);

export default Message;
