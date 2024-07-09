import MessageApp from "@/components/MessageApp";
import StoreProvider from "@/components/StoreProvider";

export default async function ContactPage() {
  return (
    <StoreProvider>
      <main className="flex h-screen justify-center pt-[5%]">
        <MessageApp />
      </main>
    </StoreProvider>
  );
}
