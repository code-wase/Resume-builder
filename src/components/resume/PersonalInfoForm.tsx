import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PersonalInfoFormProps {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    github?: string;
    twitter?: string;
    summary: string;
    profilePicture?: string;
    themeColor?: string;
  };
  onChange: (field: string, value: string) => void;
  togglePreview?: () => void;
}

export function PersonalInfoForm({
  personalInfo,
  onChange,
  togglePreview,
}: PersonalInfoFormProps) {
  return (
    <Card className="bg-[#1a1b2e] text-white rounded-2xl shadow-lg border border-purple-700">
      <CardHeader>
        <CardTitle className="text-purple-400 text-xl font-bold">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="John Doe"
              className="bg-[#2a2b3d] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={personalInfo.jobTitle}
              onChange={(e) => onChange("jobTitle", e.target.value)}
              placeholder="Software Engineer"
              className="bg-[#2a2b3d] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="john.doe@example.com"
              className="bg-[#2a2b3d] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="bg-[#2a2b3d] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => onChange("location", e.target.value)}
              placeholder="New York, NY"
              className="bg-[#2a2b3d] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website/LinkedIn</Label>
            <Input
              id="website"
              value={personalInfo.website}
              onChange={(e) => onChange("website", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="bg-[#2a2b3d] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub (Optional)</Label>
            <Input
              id="github"
              value={personalInfo.github || ""}
              onChange={(e) => onChange("github", e.target.value)}
              placeholder="github.com/johndoe"
              className="bg-[#2a2b3d] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter (Optional)</Label>
            <Input
              id="twitter"
              value={personalInfo.twitter || ""}
              onChange={(e) => onChange("twitter", e.target.value)}
              placeholder="twitter.com/johndoe"
              className="bg-[#2a2b3d] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="themeColor">Theme Color</Label>
            <Input
              id="themeColor"
              type="color"
              value={personalInfo.themeColor || "#6D28D9"}
              onChange={(e) => onChange("themeColor", e.target.value)}
              className="bg-[#2a2b3d] h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <Input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  onChange("profilePicture", imageUrl);
                }
              }}
              className="bg-[#2a2b3d] text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => onChange("summary", e.target.value)}
            placeholder="A brief summary of your skills and experience..."
            rows={4}
            className="bg-[#2a2b3d] text-white"
          />
        </div>

        {togglePreview && (
          <Button
            onClick={togglePreview}
            className="bg-purple-600 hover:bg-purple-700 text-white mt-4"
          >
            Preview Resume
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
