import { NextRequest, NextResponse } from "next/server";

import { EmailTemplate } from "@/components/Email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { from, message } = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Me <me@hasungjun.com>",
      to: ["hasungjunn@gmail.com"],
      reply_to: from,
      subject: `You have a new message from ${from}!`,
      react: EmailTemplate({ from, message }) as React.ReactNode,
      text: "",
    });
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
