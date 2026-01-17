"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ToolItem {
  icon: string;
  title: string;
  description: string;
}

interface Category {
  name: string;
  items: ToolItem[];
}

const categories: Category[] = [
  {
    name: "Editing Software",
    items: [
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg",
        title: "Premiere Pro",
        description: "Professional video editing",
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
        title: "After Effects",
        description: "Motion graphics and VFX",
      },
      {
        icon: "https://upload.wikimedia.org/wikipedia/en/9/9f/2015_Final_Cut_Pro_Logo.png",
        title: "Final Cut Pro",
        description: "Apple's professional NLE",
      },
    ],
  },
  {
    name: "Color & Finishing",
    items: [
      {
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
        title: "DaVinci Resolve",
        description: "Color grading and finishing",
      },
      {
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
        title: "Photoshop",
        description: "Image editing and graphics",
      },
    ],
  },
];

export default function Experience() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-12">
          <p className="text-gray-mid text-sm font-medium uppercase tracking-wider mb-3">
            TECH STACK
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            What I Use
          </h2>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-gray-mid text-base font-medium mb-6">
                {category.name}
              </h3>

              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.1 + itemIndex * 0.05,
                    }}
                    className="flex items-center gap-4"
                  >
                    {/* Icon */}
                    <div className="relative w-14 h-14 flex-shrink-0 bg-white rounded-2xl p-3 shadow-sm border border-gray-light/30">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-foreground mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-gray-mid text-sm">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
