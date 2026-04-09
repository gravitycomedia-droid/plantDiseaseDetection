import { Leaf, Users, Target, Zap } from "lucide-react";

export function AboutPage() {
  return (
    <div className="w-full flex-grow flex flex-col items-center p-6 mb-20 animate-fade-in relative z-10 text-left">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold text-on-surface mb-4">
            About PlantScan
          </h1>
          <p className="text-xl font-body text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            An AI-powered conservatory designed to help farmers, gardeners, and
            agricultural professionals identify plant diseases instantly.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-panel p-8 md:p-10 mb-8 rounded-[28px] ring-1 ring-white/30 shadow-xl overflow-hidden relative">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-300/30 blur-[70px] rounded-full pointer-events-none"></div>
          <h2 className="text-2xl font-headline font-bold text-on-surface mb-4 relative z-10">Our Mission</h2>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed relative z-10">
            We aim to democratize access to plant disease diagnosis using
            cutting-edge machine learning. By making advanced
            agricultural precision available to everyone, we help protect crops,
            increase yields, and promote sustainable farming practices
            worldwide.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-bold text-on-surface">Key Features</h2>

            <div className="flex items-start space-x-4">
              <div className="bg-emerald-100/50 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-full p-3 flex-shrink-0">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="pt-1">
                <h3 className="font-headline font-semibold text-on-surface mb-1">
                  57 Disease Classes
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  Detects diseases across 14+ plant species including apple,
                  corn, rice, watermelon, muskmelon, grape, potato, and tomato.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-emerald-100/50 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-full p-3 flex-shrink-0">
                <Zap className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="pt-1">
                <h3 className="font-headline font-semibold text-on-surface mb-1">
                  Real-time Analysis
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  Get instant disease detection results with confidence scores
                  and severity assessments.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-emerald-100/50 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-full p-3 flex-shrink-0">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="pt-1">
                <h3 className="font-headline font-semibold text-on-surface mb-1">
                  Treatment Recommendations
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  Receive detailed chemical, cultural, and preventive treatment
                  options for identified diseases.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-emerald-100/50 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-full p-3 flex-shrink-0">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="pt-1">
                <h3 className="font-headline font-semibold text-on-surface mb-1">
                  User-Friendly Interface
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  Simple drag-and-drop interface designed for users of all
                  technical backgrounds.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-bold text-on-surface">Technology</h2>

            <div className="glass-panel p-6 rounded-2xl ring-1 ring-white/30 shadow-lg">
              <h3 className="font-headline font-semibold text-on-surface mb-3 flex items-center gap-3">
                 <span className="material-symbols-outlined text-emerald-600">memory</span>
                Machine Learning Models
              </h3>
              <ul className="space-y-2 font-body text-on-surface-variant text-sm ml-2">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> ResNet50 fine-tuned on 57-class dataset</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> PyTorch with ImageNet pre-training</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> Two-phase fine-tuning strategy</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> 94.9%+ validation accuracy</li>
              </ul>
            </div>

            <div className="glass-panel p-6 rounded-2xl ring-1 ring-white/30 shadow-lg">
              <h3 className="font-headline font-semibold text-on-surface mb-3 flex items-center gap-3">
                 <span className="material-symbols-outlined text-cyan-600">code</span>
                Modern Web Stack
              </h3>
              <ul className="space-y-2 font-body text-on-surface-variant text-sm ml-2">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div> React + TypeScript frontend</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div> FastAPI Python backend</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div> Docker containerization</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div> Redis caching</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Supported Diseases */}
        <div className="glass-panel p-8 md:p-10 mb-8 rounded-[28px] ring-1 ring-white/30 shadow-xl overflow-hidden relative">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-300/10 blur-[80px] rounded-full pointer-events-none"></div>
          <h2 className="text-2xl font-headline font-bold text-on-surface mb-6 relative z-10 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">local_florist</span>
            Supported Plant Diseases
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <div className="bg-white/30 backdrop-blur-sm p-5 rounded-2xl border border-white/40 shadow-sm hover:scale-[1.02] transition-transform">
              <h3 className="font-headline font-semibold text-on-surface mb-3">🍎 Apple</h3>
              <ul className="space-y-1.5 font-body text-on-surface-variant text-sm ml-1">
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Apple Scab</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Black Rot</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Cedar Apple Rust</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Healthy</li>
              </ul>
            </div>

            <div className="bg-white/30 backdrop-blur-sm p-5 rounded-2xl border border-white/40 shadow-sm hover:scale-[1.02] transition-transform">
              <h3 className="font-headline font-semibold text-on-surface mb-3">🌽 Corn</h3>
              <ul className="space-y-1.5 font-body text-on-surface-variant text-sm ml-1">
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Gray Leaf Spot</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Common Rust</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Northern Leaf Blight</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Blight & Healthy</li>
              </ul>
            </div>

            <div className="bg-white/30 backdrop-blur-sm p-5 rounded-2xl border border-white/40 shadow-sm hover:scale-[1.02] transition-transform">
              <h3 className="font-headline font-semibold text-on-surface mb-3">🌾 Rice <span className="text-xs text-emerald-600 font-semibold ml-1 uppercase tracking-wider">New</span></h3>
              <ul className="space-y-1.5 font-body text-on-surface-variant text-sm ml-1">
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Bacterial Blight</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Brown Spot</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Leaf Smut</li>
              </ul>
            </div>

            <div className="bg-white/30 backdrop-blur-sm p-5 rounded-2xl border border-white/40 shadow-sm hover:scale-[1.02] transition-transform">
              <h3 className="font-headline font-semibold text-on-surface mb-3">🍉 Watermelon <span className="text-xs text-emerald-600 font-semibold ml-1 uppercase tracking-wider">New</span></h3>
              <ul className="space-y-1.5 font-body text-on-surface-variant text-sm ml-1">
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Anthracnose</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Downy Mildew</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Mosaic Virus</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Healthy</li>
              </ul>
            </div>

            <div className="bg-white/30 backdrop-blur-sm p-5 rounded-2xl border border-white/40 shadow-sm hover:scale-[1.02] transition-transform">
              <h3 className="font-headline font-semibold text-on-surface mb-3">🍈 Muskmelon <span className="text-xs text-emerald-600 font-semibold ml-1 uppercase tracking-wider">New</span></h3>
              <ul className="space-y-1.5 font-body text-on-surface-variant text-sm ml-1">
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Downy Mildew</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Powdery Mildew</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Nutrient Deficiencies</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Healthy</li>
              </ul>
            </div>

            <div className="bg-white/30 backdrop-blur-sm p-5 rounded-2xl border border-white/40 shadow-sm hover:scale-[1.02] transition-transform">
              <h3 className="font-headline font-semibold text-on-surface mb-3">🍅 Tomato</h3>
              <ul className="space-y-1.5 font-body text-on-surface-variant text-sm ml-1">
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Early & Late Blight</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Mosaic & Curl Virus</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Leaf Mold & Spider Mites</li>
                <li className="flex gap-2"><span className="text-emerald-500 opacity-60">•</span> Healthy</li>
                <li className="pt-2 text-xs opacity-70 italic font-medium ml-1">+ Potato, Grape, Peach, Orange & more</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50/80 backdrop-blur-md rounded-2xl p-6 border border-yellow-200/50 shadow-sm">
          <h3 className="font-headline font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-600">info</span>
            Important Disclaimer
          </h3>
          <p className="font-body text-yellow-800 text-sm leading-relaxed">
            This AI system provides disease detection suggestions based on image
            analysis. Results should be used as a preliminary assessment only.
            For critical agricultural decisions, professional diagnosis from
            qualified agricultural experts or plant pathologists is recommended.
            The accuracy of predictions may vary based on image quality,
            lighting conditions, and disease progression stages.
          </p>
        </div>
      </div>
    </div>
  );
}
