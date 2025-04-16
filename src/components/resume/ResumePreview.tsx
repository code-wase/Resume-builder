import React from "react";
import { ResumeData } from "./ResumeEditor";
import { SimpleTemplate } from "./templates/SimpleTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { ATSTemplate } from "./templates/ATSTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { exportResumeAsJSON } from "@/utils/localStorage";
import { toast } from "sonner";

interface ResumePreviewProps {
  resumeData: ResumeData;
  currentResumeId: string;
}

export function ResumePreview({ resumeData, currentResumeId }: ResumePreviewProps) {
  const resumeRef = React.useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!resumeRef.current) return;

    try {
      toast.info("Generating high-quality PDF...");
      const element = resumeRef.current;
      
      // Capture element with high resolution
      const canvas = await html2canvas(element, {
        scale: 3, // Increased scale for better resolution
        useCORS: true,
        logging: false,
        allowTaint: true,
        letterRendering: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate image dimensions
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Split image across pages if needed
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");

      // Add subsequent pages if content overflows
      while (heightLeft >= pageHeight) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pageHeight;
      }

      // Generate filename
      const fileName = resumeData.name 
        ? `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf` 
        : "Professional_Resume.pdf";

      pdf.save(fileName);
      toast.success("PDF generated with high quality!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("PDF generation failed. Please try again.");
    }
  };

  const exportAsJSON = () => {
    if (!currentResumeId) {
      toast.error("No resume to export");
      return;
    }

    const jsonData = exportResumeAsJSON(currentResumeId);
    if (!jsonData) {
      toast.error("Export failed");
      return;
    }

    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${resumeData.name || "resume"}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Resume backup created");
  };

  const renderTemplate = () => {
    switch (resumeData.selectedTemplate) {
      case "simple":
        return <SimpleTemplate data={resumeData} />;
      case "minimalist":
        return <MinimalistTemplate data={resumeData} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} />;
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      case "ats":
        return <ATSTemplate data={resumeData} />;
      default:
        return <SimpleTemplate data={resumeData} />;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="no-print">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Preview & Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={generatePDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={exportAsJSON}>
              <Download className="h-4 w-4 mr-2" />
              Backup (JSON)
            </Button>
          </div>
        </CardContent>
      </Card>

      <div
  ref={resumeRef}
  className="bg-white shadow-lg print:shadow-none"
  style={{
    width: "210mm",
    minHeight: "297mm",
    margin: "0 auto",
    boxSizing: "border-box",
    transform: "translateZ(0)", // Force GPU rendering
  }}
>
  {renderTemplate()}
</div>
    </div>
  );
}