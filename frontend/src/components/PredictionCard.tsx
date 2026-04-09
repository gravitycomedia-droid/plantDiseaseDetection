import { PredictionResult } from "@/types/api";

interface PredictionCardProps {
  prediction: PredictionResult;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const getSeverityStyle = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "none":
        return "text-emerald-700 bg-emerald-100/50 border-emerald-200";
      case "low":
        return "text-yellow-700 bg-yellow-100/50 border-yellow-200";
      case "moderate":
        return "text-orange-700 bg-orange-100/50 border-orange-200";
      case "high":
        return "text-red-700 bg-red-100/50 border-red-200";
      case "very_high":
        return "text-rose-900 bg-rose-100/50 border-rose-300";
      default:
        return "text-slate-700 bg-slate-100/50 border-slate-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "none":
        return "check_circle";
      case "low":
        return "shield";
      case "moderate":
        return "schedule";
      case "high":
        return "warning";
      case "very_high":
        return "crisis_alert";
      default:
        return "bolt";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "none": return "Healthy";
      case "low": return "Low";
      case "moderate": return "Moderate";
      case "high": return "High";
      case "very_high": return "Critical";
      default: return severity;
    }
  };

  const formatConfidence = (confidence: number) => {
    return `${(confidence * 100).toFixed(1)}%`;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="glass-panel w-full rounded-[28px] p-8 md:p-10 flex flex-col shadow-2xl relative overflow-hidden ring-1 ring-white/30 text-left">
      {/* Decorative light leak */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/20 gap-4">
          <h2 className="text-3xl font-headline font-bold text-on-surface">
            Detection Results
          </h2>
          <div className="px-4 py-1.5 bg-white/20 rounded-full text-xs font-label uppercase tracking-widest text-on-surface-variant backdrop-blur-sm shadow-sm inline-block w-max">
            {prediction.timestamp
              ? formatDate(prediction.timestamp)
              : new Date().toLocaleString()}
          </div>
        </div>

        {/* Disease Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm group hover:scale-[1.02] transition-transform">
            <h3 className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Disease</h3>
            <p className="text-xl font-headline font-semibold text-on-surface">
              {prediction.disease === "None" || prediction.disease === "healthy"
                ? `Healthy ${prediction.plant}`
                : prediction.disease}
            </p>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm group hover:scale-[1.02] transition-transform">
            <h3 className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">
              Confidence
            </h3>
            <p className="text-xl font-headline font-semibold text-on-surface">
              {formatConfidence(prediction.confidence)}
            </p>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm group hover:scale-[1.02] transition-transform">
            <h3 className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Severity</h3>
            <div
              className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm ${getSeverityStyle(prediction.severity)}`}
            >
              <span className="material-symbols-outlined text-sm">{getSeverityIcon(prediction.severity)}</span>
              <span className="capitalize">{getSeverityLabel(prediction.severity)}</span>
            </div>
          </div>
        </div>

        {/* Disease Details */}
        {(prediction.symptoms?.length ||
          prediction.causes ||
          prediction.urgency ||
          prediction.economic_impact) && (
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-headline font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">biotech</span>
              Clinical Information
            </h3>

            {/* Symptoms */}
            {prediction.symptoms && prediction.symptoms.length > 0 && (
              <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm">
                <h4 className="font-headline font-semibold text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-600">visibility</span>
                  Symptoms to Look For
                </h4>
                <ul className="text-on-surface-variant text-sm space-y-2 ml-1">
                  {prediction.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-0.5" style={{fontSize:'20px'}}>•</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Causes */}
            {prediction.causes && prediction.causes.trim().length > 0 && (
              <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm">
                <h4 className="font-headline font-semibold text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-500">coronavirus</span>
                  What Causes This Disease
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{prediction.causes}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Urgency */}
              {prediction.urgency && prediction.urgency.trim().length > 0 && (
                <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm">
                  <h4 className="font-headline font-semibold text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-500">warning</span>
                    Treatment Urgency
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{prediction.urgency}</p>
                </div>
              )}

              {/* Economic Impact */}
              {prediction.economic_impact &&
                prediction.economic_impact.trim().length > 0 && (
                  <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm">
                    <h4 className="font-headline font-semibold text-on-surface mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-purple-500">attach_money</span>
                      Economic Impact
                    </h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {prediction.economic_impact}
                    </p>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Treatment Recommendations */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-headline font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">health_and_safety</span>
            Treatment Conservatory
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {/* Chemical Treatments */}
            {prediction.treatment?.chemical &&
              prediction.treatment.chemical.trim().length > 0 && (
                <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm">
                  <h4 className="font-headline font-semibold text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">science</span>
                    Chemical Treatments
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {prediction.treatment.chemical}
                  </p>
                </div>
              )}

            {/* Cultural Treatments */}
            {prediction.treatment?.cultural &&
              prediction.treatment.cultural.trim().length > 0 && (
                <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm">
                  <h4 className="font-headline font-semibold text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500">spa</span>
                    Cultural Practices
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {prediction.treatment.cultural}
                  </p>
                </div>
              )}

            {/* Preventive Measures */}
            {prediction.treatment?.preventive &&
              prediction.treatment.preventive.trim().length > 0 && (
                <div className="bg-white/30 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm">
                  <h4 className="font-headline font-semibold text-on-surface mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-500">verified_user</span>
                    Preventive Measures
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {prediction.treatment.preventive}
                  </p>
                </div>
              )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
          <p className="text-xs font-body text-on-surface-variant leading-relaxed text-center">
            <strong className="text-on-surface font-semibold">Note:</strong> These recommendations are generated by AI analysis. For severe cases or professional farming operations, please consult with agricultural experts or local extension services for personalized advice.
          </p>
        </div>
      </div>
    </div>
  );
}
