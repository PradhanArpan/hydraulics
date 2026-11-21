import React, { useEffect, useId, useRef, useState } from "react";

export function Sim({ title, children }) {
  return (
    <section className="sim" aria-label={title}>
      <div className="sim__h"><b>{title}</b><span>Interactive</span></div>
      <div className="sim__b">{children}</div>
    </section>
  );
}

export function Slider({ label, value, min, max, step, unit, onChange, format }) {
  const id = useId();
  return (
    <div className="sl">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} />
      <output htmlFor={id}>{format ? format(value) : value}{unit ? " " + unit : ""}</output>
    </div>
  );
}

export function Seg({ value, options, onChange, label }) {
  return (
    <div className="seg2" role="group" aria-label={label}>
      {options.map(([v, l]) => (
        <button key={v} type="button" className={v === value ? "on" : ""} aria-pressed={v === value} onClick={() => onChange(v)}>{l}</button>
      ))}
    </div>
  );
}

export function Kpi({ v, l, tone }) {
  return <div className={"k2 " + (tone || "")}><div className="k2__v">{v}</div><div className="k2__l">{l}</div></div>;
}

export function useReducedMotion() {
  const get = () => { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  const [r, setR] = useState(get);
  useEffect(() => {
    let mq; try { mq = window.matchMedia("(prefers-reduced-motion: reduce)"); } catch (e) { return; }
    const f = () => setR(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return r;
}

// true while the element is on screen (so off-screen animations stop)
export function useInView(ref) {
  const [v, setV] = useState(true);
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: 0.05 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return v;
}

// seconds since `active` became true; stops updating when inactive
export function useClock(active) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf; const t0 = performance.now();
    const tick = now => { setT((now - t0) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return t;
}

export const f1 = v => (isFinite(v) ? (+v).toFixed(1) : "-");
export const f2 = v => (isFinite(v) ? (+v).toFixed(2) : "-");
