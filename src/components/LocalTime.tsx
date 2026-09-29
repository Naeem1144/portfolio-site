"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const clock = new Intl.DateTimeFormat("en-US", {
  timeZone: site.timeZone.id,
  hour: "numeric",
  minute: "2-digit",
});

const hourOf = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone.id,
  hour: "numeric",
  hourCycle: "h23",
});

/**
 * Tells someone in another time zone when to expect a reply. Rendered after
 * mount, because the server's clock is not the visitor's moment.
 */
export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!now) return <p className="localtime" aria-hidden="true">&nbsp;</p>;

  const hour = Number(hourOf.format(now));
  const awake = hour >= 9 && hour < 21;
  const [time, period = ""] = clock.format(now).split(/\s/u);

  return (
    <p className="localtime">
      <span className="localtime__dot" data-awake={awake || undefined} aria-hidden="true" />
      It&rsquo;s <span className="num">{time}</span> {period.toLowerCase()} in{" "}
      {site.timeZone.city} ({site.timeZone.label}).{" "}
      {awake ? "A reply could come today." : "Expect a reply in my morning."}
    </p>
  );
}
