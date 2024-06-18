"use client";

import { LinkButton, Text } from "@/ui";
import { random, round } from "lodash";
import { useCallback, useEffect, useRef } from "react";

import Image from "next/image";
import styles from "@/styles/home.module.scss";

const hellos = [
  "Hello",
  "안녕하세요",
  "你好",
  "Hola",
  "Bonjour",
  "Hallo",
  "こんにちは",
  "Привет",
  "مرحبا",
  "Ciao",
];
export default function Home() {
  const ref = useRef<HTMLDetailsElement>(null);

  const createBubble = (text: string, i: number) => {
    const bubble = document.createElement("div");
    bubble.classList.add(styles.bubble);
    bubble.innerText = text;
    const randomXTo = `${round(random(0, 1, true), 2) * 100}%`;
    const randomYTo = `${round(random(0, 1, true), 2) * 100}%`;

    bubble.style.setProperty("--random-x-to", randomXTo);
    bubble.style.setProperty("--random-y-to", randomYTo);
    ref.current?.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 4000);
  };

  const createRandomBubbles = useCallback(() => {
    for (let i = 0; i < 30; i++) {
      createBubble(hellos[i % 10], i);
    }
  }, []);

  useEffect(() => {
    createRandomBubbles();
  }, [createRandomBubbles]);

  return (
    <main className="main flex flex-col gap-[1.2rem]">
      <section className={styles.section} ref={ref} data-section-theme="light">
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
        <div className="flex gap-4 justify-center items-center px-20 md:px-4 lg:px-10">
          <div className="aspect-square relative">
            <Image
              src="/sticker-1.png"
              width={400}
              height={400}
              className="min-w-[25rem] lg:min-w-[20rem] md:min-w-[15rem]"
              alt="sticker-1"
            />
          </div>
          <div className="aspect-square relative">
            <Image
              src="/sticker-2.png"
              width={400}
              height={400}
              className="min-w-[25rem] lg:min-w-[20rem] md:min-w-[15rem]"
              alt="sticker-2"
            />
          </div>
          <div className="aspect-square relative">
            <Image
              src="/sticker-3.png"
              width={400}
              height={400}
              className="min-w-[25rem] lg:min-w-[20rem] md:min-w-[15rem]"
              alt="sticker-3"
            />
          </div>
          <div className="aspect-square relative">
            <Image
              src="/sticker-4.png"
              width={400}
              height={400}
              className="min-w-[25rem] lg:min-w-[20rem] md:min-w-[15rem]"
              alt="sticker-4"
            />
          </div>
          <div className="aspect-square relative">
            <Image
              src="/sticker-5.png"
              width={400}
              height={400}
              className="min-w-[25rem] lg:min-w-[20rem] md:min-w-[15rem]"
              alt="sticker-5"
            />
          </div>
        </div>
      </section>
      <section className={styles.section} data-section-theme="dark">
        <div>
          <Text variant="headline">Suni</Text>
          <Text variant="subhead" className="mt-[.5rem]">
            Schedule management iOS app
          </Text>
          <div className="mt-[1.5rem]">
            <LinkButton variant="fill" href="/about">
              Learn more
            </LinkButton>
          </div>
        </div>
        <div className="flex gap-8 justify-center items-center">
          <div className="aspect-[3/1] relative max-w-[120rem] min-w-[100rem] w-full">
            <Image src="/suni-hero.png" alt="suni-hero" layout="fill" />
          </div>
        </div>
      </section>
    </main>
  );
}
