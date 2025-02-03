import connectDB from '@/config/database';
import Message from '@/models/Message';
import MessageCard from '@/components/MessageCard';
import '@/models/Property';
import { convertToSerializeableObjectGen } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import { IMessage } from "@/models/Message";

const MessagePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 }) // Sort read messages in asc order
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 }) // Sort read messages in asc order
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();


  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {

    const message = convertToSerializeableObjectGen(messageDoc as unknown as IMessage);
    if (message) {
      message.sender = convertToSerializeableObjectGen(messageDoc.sender);
      message.property = convertToSerializeableObjectGen(messageDoc.property);
    }
    if (message) {
      return message;
    }
  }).filter((message): message is IMessage => message !== undefined);

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (

              messages.map((message) => (
                <MessageCard key={message?._id as string} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MessagePage;
