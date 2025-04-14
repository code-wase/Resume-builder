import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export type TemplateType =
  | "simple"
  | "minimalist"
  | "professional"
  | "creative"
  | "ats"
  | "modernpro";

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
}

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const templates = [
    {
      id: "simple",
      name: "Simple",
      description:
        "Clean and professional resume template with colored section headers.",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description:
        "Elegant minimalist design with centered headers and subtle styling.",
    },
    {
      id: "professional",
      name: "Professional",
      description:
        "Traditional resume layout optimized for formal applications.",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Modern design with bold colors and unique layout.",
    },
    {
      id: "ats",
      name: "ATS-Friendly",
      description:
        "Optimized for Applicant Tracking Systems with simple formatting.",
    },
    {
      id: "modernpro",
      name: "Modern Pro",
      description:
        "Modern, sleek layout with refined fonts and smooth sections.",
    },
  ];

  return (
    <Card className="w-full bg-[#0f172a] text-white border-none shadow-none">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-6">
          Choose a Template
        </h2>

        <div className="flex flex-col gap-5">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <div
                key={template.id}
                className={`w-full p-5 rounded-2xl bg-[#1e293b] shadow-lg transition-all duration-200
                ${isSelected ? "ring-2 ring-purple-400" : ""}
              `}
                onClick={() => onSelectTemplate(template.id as TemplateType)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  {isSelected && (
                    <CheckCircle2 className="h-5 w-5 text-purple-400" />
                  )}
                </div>

                <p className="text-sm text-slate-300 mb-4">
                  {template.description}
                </p>

                <button
                  className="px-4 py-2 mt-auto bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm rounded-lg font-medium shadow hover:opacity-90 transition"
                >
                  Select Template →
                </button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}