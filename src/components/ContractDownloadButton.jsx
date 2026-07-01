import { useState } from "react";
import { Download, FileText, File, Loader2, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { base44 } from "@/api/base44Client";
import { buildContractBlocks } from "@/lib/contractBuilder";
import { VACANCIES_DATA } from "@/lib/vacanciesData";

export default function ContractDownloadButton({ vacancyId }) {
  const [loading, setLoading] = useState(null);

  const handlePdf = async () => {
    setLoading("pdf");
    try {
      const vacancy = VACANCIES_DATA.find((v) => v.id === vacancyId);
      if (!vacancy?.contractUrl) throw new Error("PDF не найден");
      const res = await fetch(vacancy.contractUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Договор_${vacancy.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Не удалось скачать PDF. Попробуйте позже.");
    } finally {
      setLoading(null);
    }
  };

  const handleDocx = async () => {
    setLoading("docx");
    try {
      const contractData = buildContractBlocks(vacancyId);
      if (!contractData) throw new Error("Данные договора не найдены");
      const response = await base44.functions.invoke(
        "generateContractDocx",
        contractData
      );
      const base64 = response.data.base64;
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Договор_${contractData.subtitle || ""}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Не удалось создать DOCX. Попробуйте позже.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={loading !== null}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-inter font-semibold text-xs transition-colors disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Создание документа...
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" />
              Скачать договор
              <ChevronDown className="h-3 w-3 ml-0.5" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        <DropdownMenuItem
          onClick={handlePdf}
          disabled={loading !== null}
          className="cursor-pointer"
        >
          <FileText className="h-4 w-4 mr-2" />
          Скачать PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDocx}
          disabled={loading !== null}
          className="cursor-pointer"
        >
          <File className="h-4 w-4 mr-2" />
          Скачать DOCX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}