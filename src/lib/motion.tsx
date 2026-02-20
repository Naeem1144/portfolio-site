import React from "react";

type MotionOnlyProps = {
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
  whileInView?: unknown;
  whileHover?: unknown;
  whileTap?: unknown;
  viewport?: unknown;
  layoutId?: string;
  layout?: unknown;
  variants?: unknown;
  custom?: unknown;
  drag?: unknown;
  dragConstraints?: unknown;
  dragElastic?: unknown;
  dragMomentum?: unknown;
  onUpdate?: unknown;
  onAnimationStart?: unknown;
  onAnimationComplete?: unknown;
};

export type HTMLMotionProps<T extends keyof React.JSX.IntrinsicElements> =
  React.ComponentPropsWithoutRef<T> & MotionOnlyProps;

const MOTION_ONLY_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "whileInView",
  "whileHover",
  "whileTap",
  "viewport",
  "layoutId",
  "layout",
  "variants",
  "custom",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "onUpdate",
  "onAnimationStart",
  "onAnimationComplete",
]);

function stripMotionProps(props: Record<string, unknown>) {
  const cleanProps: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (!MOTION_ONLY_PROPS.has(key)) {
      cleanProps[key] = value;
    }
  }

  return cleanProps;
}

const motionElementCache = new Map<string, React.ComponentType<Record<string, unknown>>>();

function createMotionElement(tag: string) {
  const Component = React.forwardRef<Element, Record<string, unknown>>((props, ref) => {
    const { children, ...rest } = props as React.PropsWithChildren<Record<string, unknown>>;
    return React.createElement(tag, { ...stripMotionProps(rest), ref }, children as React.ReactNode);
  });

  Component.displayName = `motion.${tag}`;
  return Component;
}

type MotionFactory = {
  [K in keyof React.JSX.IntrinsicElements]: React.ComponentType<HTMLMotionProps<K>>;
};

export const motion = new Proxy({} as MotionFactory, {
  get: (_, element: string) => {
    if (!motionElementCache.has(element)) {
      motionElementCache.set(element, createMotionElement(element));
    }

    return motionElementCache.get(element);
  },
});

export const m = motion;

export function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function LazyMotion({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const domAnimation = {};
