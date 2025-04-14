import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface SkillsGroup {
  id: string;
  name: string;
  skills: string[];
}

interface SkillsFormProps {
  skillsGroups: SkillsGroup[];
  onAddGroup: () => void;
  onUpdateGroupName: (id: string, name: string) => void;
  onAddSkill: (groupId: string, skill: string) => void;
  onRemoveSkill: (groupId: string, skillIndex: number) => void;
  onDeleteGroup: (id: string) => void;
}

export function SkillsForm({
  skillsGroups,
  onAddGroup,
  onUpdateGroupName,
  onAddSkill,
  onRemoveSkill,
  onDeleteGroup,
}: SkillsFormProps) {
  const [newSkillInputs, setNewSkillInputs] = useState<{ [key: string]: string }>({});

  const handleAddSkill = (groupId: string) => {
    const skill = newSkillInputs[groupId]?.trim();
    if (skill) {
      onAddSkill(groupId, skill);
      setNewSkillInputs({ ...newSkillInputs, [groupId]: "" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, groupId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(groupId);
    }
  };

  return (
    <Card className="bg-[#0D1B2A] text-white border border-[#1B263B] shadow-lg rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-[#1B263B] rounded-t-2xl">
        <CardTitle className="text-xl md:text-2xl font-bold text-white">
          Skills
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddGroup}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
        >
          Add Skill Category
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 p-4">
        {skillsGroups.map((group) => (
          <div
            key={group.id}
            className="space-y-4 pb-6 border-b border-[#324766] last:border-0"
          >
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor={`group-name-${group.id}`} className="text-sm text-gray-300">
                  Category Name
                </Label>
                <Input
                  id={`group-name-${group.id}`}
                  value={group.name}
                  onChange={(e) => onUpdateGroupName(group.id, e.target.value)}
                  placeholder="Technical Skills"
                  className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 transition rounded-lg"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteGroup(group.id)}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Remove
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-300">Skills</Label>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#324766] text-white py-1.5 px-3 flex items-center gap-1 rounded-full transition-all hover:bg-red-600 hover:text-white"
                  >
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => onRemoveSkill(group.id, index)}
                    />
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Input
                  value={newSkillInputs[group.id] || ""}
                  onChange={(e) =>
                    setNewSkillInputs({ ...newSkillInputs, [group.id]: e.target.value })
                  }
                  onKeyPress={(e) => handleKeyPress(e, group.id)}
                  placeholder="Add a skill and press Enter"
                  className="bg-[#1B263B] border border-[#324766] text-white focus:ring-2 focus:ring-blue-500 transition rounded-lg"
                />
                <Button
                  size="sm"
                  onClick={() => handleAddSkill(group.id)}
                  type="button"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}

        {skillsGroups.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>No skill categories added yet.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={onAddGroup}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
            >
              Add Skill Category
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
