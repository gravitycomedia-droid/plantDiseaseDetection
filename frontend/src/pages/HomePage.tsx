import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { predict } from "@/services/api";
import { PredictionResult } from "@/types/api";
import { PredictionCard } from "@/components/PredictionCard";

export function HomePage() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const mutation = useMutation({
    mutationFn: predict,
    onSuccess: (data) => {
      setPrediction(data);
    },
    onError: (error) => {
      console.error("Prediction error:", error);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setPrediction(null);
        mutation.mutate(file);
      }
    },
    [mutation]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    noClick: false
  });

  return (
    <div className="w-full flex flex-col items-center space-y-12">
      <div className="glass-panel w-full max-w-[560px] rounded-[28px] p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
        {/* Decorative light leak */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-300/30 blur-[80px] rounded-full"></div>
        <div className="mb-8 p-6 bg-white/20 rounded-full inline-flex items-center justify-center ring-1 ring-white/30 shadow-inner">
          <span className="material-symbols-outlined text-7xl text-emerald-600">potted_plant</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight mb-4 leading-tight">
          Detect plant disease <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">instantly</span>
        </h1>
        <p className="text-on-surface-variant text-lg font-body max-w-md mx-auto mb-10 leading-relaxed">
          Our advanced AI conservatory analyzes leaf patterns to identify pathogens with surgical precision in seconds.
        </p>

        {/* Upload Zone */}
        <div className="w-full mb-10">
          <div
            {...getRootProps()}
            className={`group relative w-full h-[200px] border-2 border-dashed ${isDragActive ? "border-emerald-500 bg-emerald-50/50" : "border-white/40 bg-white/10"} hover:bg-white/20 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-3 rounded-lg`}
          >
            <input {...getInputProps()} className="absolute inset-0 opacity-0 cursor-pointer" />
            <div className="p-4 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-white text-3xl">cloud_upload</span>
            </div>
            <div className="space-y-1">
              <p className="text-on-surface font-semibold">{isDragActive ? "Drop the image here" : "Drag & drop a leaf image"}</p>
              <p className="text-on-surface-variant text-sm">{isDragActive ? "" : "or click to browse your library"}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {mutation.isPending && (
          <div className="w-full bg-white/40 backdrop-blur-md rounded-2xl p-4 mb-6 flex items-center justify-center space-x-3 text-emerald-700 animate-pulse-soft">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            <span className="font-medium">Analyzing botanical specimen...</span>
          </div>
        )}

        {/* Error State */}
        {mutation.isError && (
          <div className="w-full bg-red-50/80 border border-red-200 rounded-2xl p-4 mb-6 flex items-center space-x-3 text-left shadow-sm">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900">Analysis Failed</h3>
              <p className="text-sm text-red-700 mt-1">
                {(mutation.error as any)?.message || "An error occurred while analyzing the image."}
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {prediction && !mutation.isPending && (
          <div className="w-full bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center space-x-3 text-left shadow-sm">
            <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-emerald-900">Analysis Complete</h3>
              <p className="text-sm text-emerald-700 mt-1">Disease detection scan completed successfully.</p>
            </div>
          </div>
        )}

        {/* Primary Action Button */}
        <button 
          type="button"
          onClick={open}
          disabled={mutation.isPending}
          className="w-full py-5 bg-gradient-to-r from-[#4ade80] to-[#22d3ee] text-white rounded-full font-headline font-bold text-lg shadow-[0_10px_25px_rgba(74,222,128,0.3)] hover:shadow-[0_15px_35px_rgba(74,222,128,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:filter-grayscale"
        >
          {mutation.isPending ? "Detecting..." : "Detect Disease"}
          {!mutation.isPending && <span className="material-symbols-outlined">arrow_forward</span>}
        </button>

        {/* Trust Badges / Stats */}
        <div className="mt-8 pt-8 border-t border-white/10 w-full flex justify-center gap-8 opacity-70">
          <div className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">verified</span>
            94.9% Accuracy
          </div>
          <div className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">memory</span>
            GPU Powered
          </div>
        </div>
      </div>

      {/* Render the prediction card if we have a result */}
      {prediction && !mutation.isPending && (
        <div className="w-full max-w-4xl opacity-0 animate-slide-up" style={{animationFillMode: 'forwards'}}>
          <PredictionCard prediction={prediction} />
        </div>
      )}
    </div>
  );
}
