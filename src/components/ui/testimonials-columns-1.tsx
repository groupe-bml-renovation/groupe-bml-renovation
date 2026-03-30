"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Array<{
    text: string;
    image?: string;
    name: string;
    role: string;
  }>;
  duration?: number;
}) => {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-amber-500',
      'bg-teal-500',
      'bg-cyan-500',
      'bg-rose-500',
      'bg-indigo-500',
      'bg-emerald-500',
    ];
    const hash = name.charCodeAt(0);
    return colors[hash % colors.length];
  };

  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border border-slate-200 shadow-lg shadow-slate-400/10 max-w-xs w-full bg-white hover:shadow-xl transition-shadow duration-300"
                  key={i}
                >
                  <div className="text-slate-700 leading-relaxed mb-5">{text}</div>
                  <div className="flex items-center gap-3 mt-5">
                    <div className={`${getAvatarColor(name)} h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center`}>
                      <span className="text-white font-semibold text-sm">{getInitial(name)}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-slate-900">{name}</div>
                      <div className="leading-5 tracking-tight text-[#38bdf8] text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
