import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  url: string;
  description: string;
}

interface ProjectsFormProps {
  projects: Project[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

export function ProjectsForm({ projects, onAdd, onUpdate, onDelete }: ProjectsFormProps) {
  return (
    <Card className="bg-[#0D1B2A] text-white border border-[#1B263B] shadow-lg rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#1B263B] rounded-t-2xl">
        <CardTitle className="text-xl md:text-2xl font-bold text-white">
          Projects
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 p-4">
        {projects.map((project) => (
          <div key={project.id} className="space-y-4 pb-6 border-b border-[#324766] last:border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor={`name-${project.id}`} className="text-gray-300">
                  Project Name
                </Label>
                <Input
                  id={`name-${project.id}`}
                  value={project.name}
                  onChange={(e) => onUpdate(project.id, "name", e.target.value)}
                  placeholder="E-commerce Website"
                  className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor={`role-${project.id}`} className="text-gray-300">
                  Your Role
                </Label>
                <Input
                  id={`role-${project.id}`}
                  value={project.role}
                  onChange={(e) => onUpdate(project.id, "role", e.target.value)}
                  placeholder="Frontend Developer"
                  className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor={`startDate-${project.id}`} className="text-gray-300">
                  Start Date
                </Label>
                <Input
                  id={`startDate-${project.id}`}
                  value={project.startDate}
                  onChange={(e) => onUpdate(project.id, "startDate", e.target.value)}
                  placeholder="Jan 2020"
                  className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor={`endDate-${project.id}`} className="text-gray-300">
                  End Date
                </Label>
                <Input
                  id={`endDate-${project.id}`}
                  value={project.endDate}
                  onChange={(e) => onUpdate(project.id, "endDate", e.target.value)}
                  placeholder="Jun 2020"
                  className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <Label htmlFor={`url-${project.id}`} className="text-gray-300">
                  Project URL (Optional)
                </Label>
                <Input
                  id={`url-${project.id}`}
                  value={project.url}
                  onChange={(e) => onUpdate(project.id, "url", e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor={`description-${project.id}`} className="text-gray-300">
                Description
              </Label>
              <Textarea
                id={`description-${project.id}`}
                value={project.description}
                onChange={(e) => onUpdate(project.id, "description", e.target.value)}
                placeholder="Describe the project, your contributions, and technologies used..."
                rows={4}
                className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 rounded-lg"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(project.id)}
                className="bg-red-600 hover:bg-red-700 text-white transition flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>No projects added yet.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={onAdd}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
