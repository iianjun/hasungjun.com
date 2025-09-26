import {
  MessageLayout,
  MessageMain,
  MessageSidebar,
} from "@/widgets/message-panel";
export const MessagePage = () => {
  return (
    <MessageLayout>
      <MessageSidebar />
      <MessageMain />
    </MessageLayout>
  );
};
