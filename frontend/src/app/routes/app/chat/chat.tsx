import { useEffect } from "react";
import ChatDrawer from "@/components/display/chat-drawer.tsx";
import { Textbox } from "@/features/textbox/components/textbox";
import { useChat } from "@/hooks/use-chat";
import { Header } from "@/components/display/header.tsx";
import { useSearchParams } from "react-router-dom";
import { Origami } from "lucide-react";
import { PulseLoader } from "react-spinners";
import useScrollToEnd from "@/hooks/use-scroll-to-end";
import { ConversationArea } from "@/features/conversation/components/conversation-area";
import Message from "@/features/message/components/message";
import { useModelStore } from "@/features/models/store/model-store";
import { useCreateMessage } from "@/features/message/hooks/use-create-message";

export function ChatRoute() {
  const {
    uuid,
    message,
    isTyping,
    messages,
    setMessage,
    handleSubmit,
    createChat,
    getChatHistory,
  } = useChat();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamString = searchParams.get("c");

  const ref = useScrollToEnd(messages);

  function updateModel(param: string) {
    setModel(param);
  }

  useEffect(() => {
    if (searchParamString) {
      getChatHistory(searchParamString);
    }
  }, [searchParamString, getChatHistory]);

  const { model, setModel } = useModelStore(state => ({
    model: state.model,
    setModel: state.setModel,
  }));

  return (
    <>
      <ChatDrawer
        updateModel={updateModel}
        createChat={createChat}
        getChatHistory={getChatHistory}
        uuid={uuid}
        updateURL={setSearchParams}
      />
      
    
      <div className="bg-[radial-gradient(at_30.8%_65.1%,_hsla(263,_100%,_50%,_10%)_0px,_transparent_10%),radial-gradient(at_61.7%_33.0%,_hsla(293,_100%,_50%,_05%)_0px,_transparent_50%),radial-gradient(at_78.3%_69.2%,_hsla(250,_100%,_50%,_20%)_0px,_transparent_50%),radial-gradient(at_7525.0%_1588.8%,_#001830_0px,_transparent_50%)] w-full max-w-full flex flex-col">
        <Header />
        <div className="relative flex flex-col flex-auto z-10">
          <ConversationArea>
            <>
              {messages.length !== 0 &&
                messages.map((message) => (
                  <Message
                    key={message.id}
                    isBot={message?.role !== "user"}
                    isTyping={false}
                    message={message?.content}
                    time={message?.time ?? ""}
                    username={
                      message?.role === "user" ? message?.role : message?.model
                    }
                  />
                ))}
              <div ref={ref} />
            </>
          </ConversationArea>
          <div className="mb-5 z-[99]">
            <div className="-mb-3.5 mx-auto inset-x-0 bg-transparent flex justify-center">
              <div className="mx-auto flex flex-col max-w-4xl justify-center px-2.5 md:px-6 w-full">
                <div className="relative flex justify-center">
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30 pointer-events-none">
                    {isTyping && (
                      <div className="mx-auto z-50 bg-primary/10 p-2 rounded-lg left-0">
                        <div className="flex gap-2 items-center">
                          <Origami className="size-5" strokeWidth="1" /> {model?.model}{" "}
                          is typing{" "}
                          <PulseLoader
                            size="3"
                            speedMultiplier={0.75}
                            color="#ffffff"
                            className="stroke-primary-foreground"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full relative"></div>
            </div>
            <Textbox
              value={message}
              setValue={setMessage}
              onSubmit={handleSubmit}
              model={model?.name || ""}
            />
          </div>
        </div>
      </div>
    </>
  );
}
