import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { DesktopView } from "./desktop/ui/DesktopView";
import { DesktopProvider, type Application } from "./desktop/bridge/react";
import { applications } from "./applications";
import { DesktopSession } from "./desktop/core/DesktopSession";
import { createSystemClock } from "./desktop/core/clock";
import "./styles.css";

// Page-session ownership is deliberately outside React's display/mount lifetime.
let desktop: DesktopSession<Application> | undefined;
const clock = createSystemClock();
function ExperienceRoot() {
  const [experience, setExperience] = useState<
    "checking" | "desktop" | "mobile" | "small"
  >("checking");
  useEffect(() => {
    const pointer = matchMedia("(any-pointer: fine)");
    const update = () => {
      const next =
        innerWidth < 1024 && !pointer.matches
          ? "mobile"
          : innerWidth < 1024 || innerHeight < 640
            ? "small"
            : "desktop";
      if (next === "desktop" && !desktop)
        desktop = new DesktopSession(applications);
      // Preserve supported desktop bounds while an unsupported experience is displayed.
      desktop?.send({
        type: "environment",
        available: next === "desktop",
        width: next === "desktop" ? innerWidth : 0,
        height: next === "desktop" ? innerHeight - 128 : 0,
      });
      setExperience(next);
    };
    update();
    window.addEventListener("resize", update);
    pointer.addEventListener("change", update);
    const hide = () => desktop?.send({ type: "cancel" });
    window.addEventListener("pagehide", hide);
    return () => {
      window.removeEventListener("resize", update);
      pointer.removeEventListener("change", update);
      window.removeEventListener("pagehide", hide);
    };
  }, []);
  if (experience === "desktop" && desktop)
    return (
      <DesktopProvider value={desktop}>
        <DesktopView clock={clock} />
      </DesktopProvider>
    );
  if (experience === "mobile")
    return (
      <main className="experience-notice">
        <span>hasungjun</span>
        <h1>
          A smaller screen.
          <br />A different experience.
        </h1>
        <p>
          The mobile experience is coming later. Your desktop windows stay in
          this visit.
        </p>
      </main>
    );
  if (experience === "small")
    return (
      <main className="experience-notice">
        <span>Desktop</span>
        <h1>A little more room.</h1>
        <p>Expand this window to at least 1024 × 640 to continue.</p>
        <p>Your open apps are still here.</p>
      </main>
    );
  return (
    <main className="experience-notice">
      <p>Checking your display…</p>
    </main>
  );
}
const root = document.getElementById("root");
if (!root) throw new Error("Missing root element");
createRoot(root).render(
  <StrictMode>
    <ExperienceRoot />
  </StrictMode>,
);
