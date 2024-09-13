import React from 'react';
import { cn } from "@/lib/utils";

export const BentoGrid: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 max-w-7xl mx-auto md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(18rem, auto)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem: React.FC<{
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ className, title, description, header, icon }) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group hover:shadow-xl transition duration-200 shadow-input p-4 bg-white dark:bg-black border border-transparent dark:border-white/[0.2] flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="transition-transform duration-200 group-hover:translate-x-2">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
