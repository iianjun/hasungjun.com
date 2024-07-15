import MessageApp from "@/components/MessageApp";
import StoreProvider from "@/components/StoreProvider";

export default async function ContactPage() {
  return (
    <StoreProvider>
      <main className="h-svh overflow-x-hidden pt-0 md:flex md:justify-center md:pt-[5%]">
        <MessageApp />
      </main>
    </StoreProvider>
  );
}
