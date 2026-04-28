"use client";
import React from "react";

export default function CompareSection() {
  const rows = [
    {
      feature: "End-to-End Ad Pipeline",
      AdMorph: "Image → Video → Storage → Tracking",
      canva: "Design only",
      adobe: "Design only",
      runway: "Partial",
      generic: "Fragmented",
    },
    {
      feature: "AI Product Image Generation",
      AdMorph: "Product-aware AI",
      canva: "Templates",
      adobe: "Templates",
      runway: "Generic AI",
      generic: "Generic",
    },
    {
      feature: "Image → Video Automation",
      AdMorph: "Built-in",
      canva: "No",
      adobe: "No",
      runway: "Yes",
      generic: "Mostly No",
    },
    {
      feature: "AI Prompt Generation",
      AdMorph: "Automatic",
      canva: "Manual",
      adobe: "Manual",
      runway: "Manual",
      generic: "Manual",
    },
    {
      feature: "Advanced Prompt Customization",
      AdMorph: "Planned",
      canva: "No",
      adobe: "No",
      runway: "Limited",
      generic: "Limited",
    },
    {
      feature: "Ready-Made Ad Templates",
      AdMorph: "Planned (Platform-specific)",
      canva: "Yes",
      adobe: "Yes",
      runway: "No",
      generic: "Limited",
    },
    {
      feature: "Background Music & Audio",
      AdMorph: "Planned",
      canva: "No",
      adobe: "No",
      runway: "Yes",
      generic: "Limited",
    },
    {
      feature: "Cost & Target Users",
      AdMorph: "Low-cost",
      canva: "Expensive",
      adobe: "Expensive",
      runway: "Expensive",
      generic: "Expensive",
    },
  ];

  return (
    <section className="mt-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            How We Compare
          </h3>
          <p className="text-gray-400 mt-2">
            See why businesses choose ADMorph over alternatives
          </p>
        </div>

        <div className="overflow-auto mt-6 rounded-2xl bg-gradient-to-r from-[#2b0b07]/80 via-gray-900/60 to-[#0b2b19]/8 border border-gray-800 p-4 ring-1 ring-[#3b0f0f]/6">
          <table
            className="min-w-full text-left border-collapse table-fixed"
            style={{
              fontFamily:
                "'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            }}
          >
            <thead>
              <tr className="text-sm text-gray-300 bg-gradient-to-r from-[#1a0b0b]/70 to-[#071018]/50">
                <th className="py-3 px-4 border-b border-gray-800 text-center">
                  Feature
                </th>
                <th className="py-3 px-4 text-green-400 border-l border-gray-800 border-b text-center">
                  AdMorph
                </th>
                <th className="py-3 px-4 border-l border-gray-800 border-b text-center">
                  Canva
                </th>
                <th className="py-3 px-4 border-l border-gray-800 border-b text-center">
                  Adobe Express
                </th>
                <th className="py-3 px-4 border-l border-gray-800 border-b text-center">
                  Runway ML
                </th>
                <th className="py-3 px-4 border-l border-gray-800 border-b text-center">
                  Generic AI Ad Tools
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={r.feature}
                  className={`bg-transparent hover:bg-gray-800/30 transition-colors duration-200 cursor-pointer`}
                >
                  <td className="py-3 px-4 align-middle text-center text-gray-200 font-bold w-1/4 border-b border-gray-800">
                    {r.feature}
                  </td>
                  <td className="py-3 px-4 text-center align-middle text-green-400 bg-gradient-to-r from-green-900/40 to-transparent font-semibold border-l border-gray-800 border-b">
                    {r.AdMorph}
                  </td>
                  <td className="py-3 px-4 text-center align-middle text-gray-300 border-l border-gray-800 border-b">
                    {r.canva === "No" ? (
                      <span
                        className="text-red-400 font-semibold"
                        title="No"
                        aria-label="No"
                      >
                        ✖
                      </span>
                    ) : r.canva === "Yes" ? (
                      <span
                        className="text-green-400 font-semibold"
                        title="Yes"
                        aria-label="Yes"
                      >
                        ✓
                      </span>
                    ) : (
                      r.canva
                    )}
                  </td>
                  <td className="py-3 px-4 text-center align-middle text-gray-300 border-l border-gray-800 border-b">
                    {r.adobe === "No" ? (
                      <span
                        className="text-red-400 font-semibold"
                        title="No"
                        aria-label="No"
                      >
                        ✖
                      </span>
                    ) : r.adobe === "Yes" ? (
                      <span
                        className="text-green-400 font-semibold"
                        title="Yes"
                        aria-label="Yes"
                      >
                        ✓
                      </span>
                    ) : (
                      r.adobe
                    )}
                  </td>
                  <td className="py-3 px-4 text-center align-middle text-gray-300 border-l border-gray-800 border-b">
                    {r.runway === "No" ? (
                      <span
                        className="text-red-400 font-semibold"
                        title="No"
                        aria-label="No"
                      >
                        ✖
                      </span>
                    ) : r.runway === "Yes" ? (
                      <span
                        className="text-green-400 font-semibold"
                        title="Yes"
                        aria-label="Yes"
                      >
                        ✓
                      </span>
                    ) : (
                      r.runway
                    )}
                  </td>
                  <td className="py-3 px-4 text-center align-middle text-gray-300 border-l border-gray-800 border-b">
                    {r.generic === "No" ? (
                      <span
                        className="text-red-400 font-semibold"
                        title="No"
                        aria-label="No"
                      >
                        ✖
                      </span>
                    ) : r.generic === "Yes" ? (
                      <span
                        className="text-green-400 font-semibold"
                        title="Yes"
                        aria-label="Yes"
                      >
                        ✓
                      </span>
                    ) : (
                      r.generic
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
