import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  Info,
  CheckCircle2,
  Languages
} from 'lucide-react';

export const ResistivityDerivationWhatsAppView: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'te'>('en');
  const [copied, setCopied] = useState<boolean>(false);

  const copyNotebookNotes = () => {
    const textEn = `AP SSC CLASS 10 PHYSICS - NOTEBOOK DERIVATION
Condition: At constant temperature.
Derivation of ρ = R(A / l)

Resistance of an electric conductor (R) ∝ length of the conductor (l)
R ∝ l  → ①

Resistance of electric conductor (R) ∝ 1 / cross section area of the conductor (A)
R ∝ 1/A  → ②

From equation ① and ②
⇒ R ∝ l / A
⇒ R = ρ(l / A)   [ρ is proportionality constant. It is called specific resistivity]
⇒ ρ = R(A / l)

Specific resistivity = Resistance (cross section area of conductor / length of conductor)

Note: Specific resistivity depends on nature of material.
SI Unit: Ohm-metre (Ω·m)`;

    const textTe = `AP SSC 10వ తరగతి భౌతికశాస్త్రం - నోట్‌బుక్ సమీకరణం
నిబంధన: స్థిర ఉష్ణోగ్రత వద్ద.
విశిష్ట నిరోధం సమీకరణ రాబట్టుట: ρ = R(A / l)

విద్యుత్ వాహకం నిరోధం (R) ∝ వాహకం పొడవు (l)
R ∝ l  → ①

విద్యుత్ వాహకం నిరోధం (R) ∝ 1 / వాహకం మధ్యచ్ఛేద వైశాల్యం (A)
R ∝ 1/A  → ②

సమీకరణాలు ① మరియు ② ల నుండి:
⇒ R ∝ l / A
⇒ R = ρ(l / A)   [ρ అనుపాత స్థిరాంకం. దీనిని విశిష్ట నిరోధం అంటారు]
⇒ ρ = R(A / l)

విశిష్ట నిరోధం = నిరోధం × (వాహకం మధ్యచ్ఛేద వైశాల్యం / వాహకం పొడవు)

గమనిక: విశిష్ట నిరోధం పదార్థ స్వభావంపై మరియు ఉష్ణోగ్రతపై ఆధారపడి ఉంటుంది.
SI ప్రమాణం: ఓమ్-మీటర్ (Ω·m)`;

    navigator.clipboard.writeText(language === 'en' ? textEn : textTe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Language Toggle and Copy Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-300">
            {language === 'en' ? 'WhatsApp Notebook Handwritten Proof' : 'వాట్సాప్ నోట్‌బుక్ చేతిరాత సమీకరణం'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                language === 'te'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              తెలుగు (Telugu)
            </button>
          </div>

          <button
            onClick={copyNotebookNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Proof'}</span>
          </button>
        </div>
      </div>

      {/* Realistic Ruled Notebook View matching the photo */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-900/30 bg-[#faf8f0] text-slate-900 p-6 sm:p-10 font-sans">
        {/* Subtle Ruled Notebook Background Lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent 31px, #cbd5e1 32px)',
            backgroundSize: '100% 32px',
          }}
        />

        {/* Red Margin Line on the Left */}
        <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-0.5 bg-red-400/60 pointer-events-none" />

        <div className="relative z-10 pl-6 sm:pl-10 space-y-6">
          {/* Top Header: Condition */}
          <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 italic border-b border-slate-300 pb-2">
            <span>
              {language === 'en' ? (
                <>Condition: At constant temperature.</>
              ) : (
                <>నిబంధన: స్థిర ఉష్ణోగ్రత వద్ద.</>
              )}
            </span>
            <span className="font-mono text-purple-700 font-bold">
              {language === 'en' ? 'AP SSC Board Exam Derivation' : '10వ తరగతి బోర్డ్ పరీక్ష ప్రశ్న'}
            </span>
          </div>

          {/* Derivation Title */}
          <div className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight font-serif">
            {language === 'en' ? (
              <>Derivation of &nbsp;<span className="font-mono text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">ρ = R(A / l)</span></>
            ) : (
              <>విశిష్ట నిరోధం సమీకరణం &nbsp;<span className="font-mono text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">ρ = R(A / l)</span>&nbsp; రాబట్టుట</>
            )}
          </div>

          {/* Step 1: Resistance proportional to length */}
          <div className="space-y-1.5 pt-2">
            <p className="text-base sm:text-lg font-medium text-slate-800">
              {language === 'en' ? (
                <>Resistance of an electric conductor (R) ∝ length of the conductor (l)</>
              ) : (
                <>విద్యుత్ వాహకం నిరోధం (R) ∝ వాహకం పొడవు (l)</>
              )}
            </p>
            <div className="flex items-center gap-4 text-xl sm:text-2xl font-black font-mono text-blue-900 pl-4 py-1">
              <span>R ∝ l</span>
              <span className="text-base sm:text-lg font-normal text-slate-600 font-sans">
                → <strong className="w-7 h-7 rounded-full bg-blue-200 text-blue-900 inline-flex items-center justify-center text-sm font-black">①</strong>
              </span>
            </div>
          </div>

          {/* Step 2: Resistance inversely proportional to area */}
          <div className="space-y-1.5 pt-2">
            <p className="text-base sm:text-lg font-medium text-slate-800">
              {language === 'en' ? (
                <>Resistance of electric conductor (R) ∝ 1 / cross section area of the conductor (A)</>
              ) : (
                <>విద్యుత్ వాహకం నిరోధం (R) ∝ 1 / వాహకం మధ్యచ్ఛేద వైశాల్యం (A)</>
              )}
            </p>
            <div className="flex items-center gap-4 text-xl sm:text-2xl font-black font-mono text-blue-900 pl-4 py-1">
              <span>R ∝ 1 / A</span>
              <span className="text-base sm:text-lg font-normal text-slate-600 font-sans">
                → <strong className="w-7 h-7 rounded-full bg-blue-200 text-blue-900 inline-flex items-center justify-center text-sm font-black">②</strong>
              </span>
            </div>
          </div>

          {/* Step 3: Combining equations 1 and 2 */}
          <div className="space-y-3 pt-3 border-t border-slate-300">
            <p className="text-base sm:text-lg font-bold text-slate-800">
              {language === 'en' ? (
                <>From equation ① and ②</>
              ) : (
                <>సమీకరణాలు ① మరియు ② ల నుండి:</>
              )}
            </p>

            <div className="pl-4 space-y-3 font-mono">
              <div className="text-xl sm:text-2xl font-black text-blue-900">
                ⇒ R ∝ l / A
              </div>

              <div className="text-xl sm:text-2xl font-black text-blue-900 flex flex-wrap items-center gap-3">
                <span>⇒ R = ρ(l / A)</span>
                <span className="text-xs sm:text-sm font-medium text-slate-600 font-sans bg-amber-200/60 px-3 py-1 rounded-lg border border-amber-300/80">
                  {language === 'en' ? (
                    <>[ρ is proportionality constant. It is called specific resistivity]</>
                  ) : (
                    <>[ρ అనుపాత స్థిరాంకం. దీనిని విశిష్ట నిరోధం అంటారు]</>
                  )}
                </span>
              </div>

              {/* Boxed Final Equation exactly as in notebook */}
              <div className="pt-2">
                <div className="inline-block p-3 sm:p-4 rounded-xl border-4 border-slate-900 bg-white shadow-md">
                  <span className="text-2xl sm:text-3xl font-black text-purple-900 tracking-wider">
                    ⇒ ρ = R(A / l)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Word Form Formula */}
          <div className="pt-3 text-base sm:text-lg font-bold text-slate-900">
            {language === 'en' ? (
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
                Specific resistivity = Resistance × (cross section area of conductor / length of conductor)
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
                విశిష్ట నిరోధం = నిరోధం × (వాహకం మధ్యచ్ఛేద వైశాల్యం / వాహకం పొడవు)
              </div>
            )}
          </div>

          {/* Note Box */}
          <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300 text-sm sm:text-base font-bold text-amber-950">
            {language === 'en' ? (
              <>Note: Specific resistivity depends on nature of material.</>
            ) : (
              <>గమనిక: విశిష్ట నిరోధం పదార్థ స్వభావంపై మరియు ఉష్ణోగ్రతపై మాత్రమే ఆధారపడి ఉంటుంది.</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
