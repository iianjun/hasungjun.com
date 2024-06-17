import { LinkButton, Text } from "@/ui";

import Image from "next/image";
import styles from "@/styles/home.module.scss";

export default function Home() {
  return (
    <main className="main">
      <section className={styles.section} data-section-theme="light">
        <div>
          <Text variant="headline">Hasung Jun</Text>
          <Text variant="subhead" className="mt-[.5rem]">
            Full stack developer
          </Text>
          <div className="mt-[1.5rem]">
            <LinkButton variant="fill" href="/about">
              Learn more
            </LinkButton>
          </div>
        </div>
        <div className="flex gap-8 justify-center items-center px-40 md:px-0 lg:px-20">
          <div className="aspect-square relative">
            <Image
              src="/sticker-1.png"
              width={400}
              height={400}
              className="min-w-[15rem]"
              alt="sticker-1"
            />
          </div>
          <div className="aspect-square relative">
            <Image
              src="/sticker-2.png"
              width={400}
              height={400}
              className="min-w-[15rem]"
              alt="sticker-2"
            />
          </div>
          <div className="aspect-square relative">
            <Image
              src="/sticker-3.png"
              width={400}
              height={400}
              className="min-w-[15rem]"
              alt="sticker-3"
            />
          </div>
          <div className="aspect-square relative">
            <Image
              src="/sticker-4.png"
              width={400}
              height={400}
              className="min-w-[15rem]"
              alt="sticker-4"
            />
          </div>
          <div className="aspect-square relative">
            <Image
              src="/sticker-5.png"
              width={400}
              height={400}
              className="min-w-[15rem]"
              alt="sticker-5"
            />
          </div>
        </div>
      </section>
      <section className={styles.section} data-section-theme="dark">
        <Text variant="headline">About me</Text>
      </section>
    </main>
  );
}
