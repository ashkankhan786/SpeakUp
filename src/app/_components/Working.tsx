"use client";
import React from "react";

function Working() {
  const workingSteps = [
    {
      title: "Create Organization",
      description:
        "Admins register their organization and get a unique access code.",
    },
    {
      title: "Distribute Access Code",
      description: "Share the code with employees or students securely.",
    },
    {
      title: "Report Anonymously",
      description:
        "Users access their organization and submit incidents confidentially.",
    },
  ];
  return (
    <section className=" py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {workingSteps.map((step, index) => (
            <div
              className="p-5 bg-[#222222] rounded-xl flex items-center justify-center"
              key={index}
            >
              <div className="p-4 bg-[#1B1A1F] rounded-xl shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-[#A3AEB4]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Working;
