import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

interface EducationFormProps {
  educations: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

export function EducationForm({ educations, onAdd, onUpdate, onDelete }: EducationFormProps) {
  return (
    <Card className="bg-[#0D1B2A] text-white border border-[#1B263B] shadow-lg rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#1B263B] rounded-t-2xl">
        <CardTitle className="text-xl md:text-2xl font-bold text-white">
          Education
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardHeader>

      <CardContent className="space-y-8 p-4">
        {educations.map((education) => (
          <div key={education.id} className="space-y-4 pb-6 border-b border-[#324766] last:border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Institution", field: "institution", value: education.institution, placeholder: "Harvard University" },
                { label: "Degree", field: "degree", value: education.degree, placeholder: "Bachelor of Science" },
                { label: "Field of Study", field: "field", value: education.field, placeholder: "Computer Science" },
                { label: "Location", field: "location", value: education.location, placeholder: "Cambridge, MA" },
                { label: "Start Date", field: "startDate", value: education.startDate, placeholder: "Sep 2015" },
                { label: "End Date", field: "endDate", value: education.endDate, placeholder: "May 2019" },
              ].map(({ label, field, value, placeholder }) => (
                <div className="space-y-1" key={field}>
                  <Label htmlFor={`${field}-${education.id}`} className="text-sm text-gray-300">
                    {label}
                  </Label>
                  <Input
                    id={`${field}-${education.id}`}
                    value={value}
                    onChange={(e) => onUpdate(education.id, field, e.target.value)}
                    placeholder={placeholder}
                    className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 transition rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <Label htmlFor={`description-${education.id}`} className="text-sm text-gray-300">
                Description (Optional)
              </Label>
              <Textarea
                id={`description-${education.id}`}
                value={education.description}
                onChange={(e) => onUpdate(education.id, "description", e.target.value)}
                placeholder="Relevant coursework, honors, or achievements..."
                rows={3}
                className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 transition rounded-lg"
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(education.id)}
                className="bg-red-600 hover:bg-red-700 text-white transition flex items-center rounded-lg"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}

        {educations.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>No education added yet.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={onAdd}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
