import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

interface ExperienceFormProps {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

export function ExperienceForm({ experiences, onAdd, onUpdate, onDelete }: ExperienceFormProps) {
  return (
    <Card className="bg-[#0D1B2A] text-white border border-[#1B263B] shadow-lg rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#1B263B] rounded-t-2xl">
        <CardTitle className="text-xl md:text-2xl font-bold text-white">
          Work Experience
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardHeader>

      <CardContent className="space-y-8 p-4">
        {experiences.map((experience) => (
          <div key={experience.id} className="space-y-4 pb-6 border-b border-[#324766] last:border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Company", field: "company", value: experience.company, placeholder: "Google" },
                { label: "Position", field: "position", value: experience.position, placeholder: "Senior Engineer" },
                { label: "Start Date", field: "startDate", value: experience.startDate, placeholder: "Jan 2020" },
                { label: "End Date", field: "endDate", value: experience.endDate, placeholder: "Present" },
                { label: "Location", field: "location", value: experience.location, placeholder: "Remote" }
              ].map(({ label, field, value, placeholder }) => (
                <div className="space-y-1" key={field}>
                  <Label htmlFor={`${field}-${experience.id}`} className="text-sm text-gray-300">
                    {label}
                  </Label>
                  <Input
                    id={`${field}-${experience.id}`}
                    value={value}
                    onChange={(e) => onUpdate(experience.id, field, e.target.value)}
                    placeholder={placeholder}
                    className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 transition rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <Label htmlFor={`description-${experience.id}`} className="text-sm text-gray-300">
                Description
              </Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => onUpdate(experience.id, "description", e.target.value)}
                placeholder="Describe your responsibilities..."
                rows={4}
                className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 transition rounded-lg"
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(experience.id)}
                className="bg-red-600 hover:bg-red-700 text-white transition flex items-center rounded-lg"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>No work experience added yet.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={onAdd}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
