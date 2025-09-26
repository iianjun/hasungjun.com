import * as React from "react";

interface EmailTemplateProps {
  from: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  from,
  message,
}) => (
  <div>
    <h1 style={{ fontSize: 20 }}>From: {from}</h1>
    <p style={{ fontSize: 16, whiteSpace: "pre-wrap" }}>{message}</p>
  </div>
);
