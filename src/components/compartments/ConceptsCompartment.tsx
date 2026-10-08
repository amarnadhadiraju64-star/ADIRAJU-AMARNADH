import React, { useState } from 'react';
import { CONCEPTS_DATA } from '../../data/conceptsData';
import { CONCEPTS_DATA_TE } from '../../data/conceptsTeluguData';
import { DiagramSVGs } from '../DiagramSVGs';
import { Sparkles, Table, Box } from 'lucide-react';
import { ReferenceTablesSection } from './ReferenceTablesSection';
import { ThreeDDeviceViewer } from '../ThreeDDeviceViewer';
import { PotentialDifferenceVideoViewer } from '../PotentialDifferenceVideoViewer';
import { Language } from '../../types';

interface ConceptsProps {
  searchQuery: string;
  language?: Language;
}

export const ConceptsCompartment: React.FC<ConceptsProps> = ({
  searchQuery,
  language = 'en',
}) => {
  const isTe = language === 'te';

  const localizedConcepts = CONCEPTS_DATA.map((concept) => {
    const teData = isTe ? CONCEPTS_DATA_TE[concept.id] : undefined;
    if (!teData) return concept;
    return {
      ...concept,
      title: teData.title,
      definition: teData.definition,
      symbol: teData.symbol,
      formula: teData.formula ?? concept.formula,
      siUnit: teData.siUnit,
      mksUnit: teData.mksUnit ?? concept.mksUnit,
      simpleMeaning: teData.simpleMeaning,
      practicalExample: teData.practicalExample,
      modelTitle: teData.modelTitle ?? concept.modelTitle,
      examTip: teData.examTip,
      conversionBreakdown: teData.conversionBreakdown ?? concept.conversionBreakdown,
    };
  });

  const filteredConcepts = localizedConcepts.filter((concept) => {
    const q = searchQuery.toLowerCase();
    const rawEn = CONCEPTS_DATA.find((c) => c.id === concept.id);
    return (
      concept.title.toLowerCase().includes(q) ||
      concept.definition.toLowerCase().includes(q) ||
      concept.symbol.toLowerCase().includes(q) ||
      (concept.formula && concept.formula.toLowerCase().includes(q)) ||
      concept.siUnit.toLowerCase().includes(q) ||
      (concept.mksUnit && concept.mksUnit.toLowerCase().includes(q)) ||
      (concept.cgsUnit && concept.cgsUnit.toLowerCase().includes(q)) ||
      (concept.commercialUnit && concept.commercialUnit.toLowerCase().includes(q)) ||
      (concept.conversion && concept.conversion.toLowerCase().includes(q)) ||
      concept.simpleMeaning.toLowerCase().includes(q) ||
      (rawEn && (
        rawEn.title.toLowerCase().includes(q) ||
        rawEn.definition.toLowerCase().includes(q) ||
        rawEn.simpleMeaning.toLowerCase().includes(q)
      ))
    );
  });

  const scrollToConcept = (conceptId?: string) => {
    if (!conceptId) return;
    const el = document.getElementById(`concept-${conceptId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTables = () => {
    const el = document.getElementById('reference-tables');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-10">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <span>{isTe ? 'కంపార్ట్‌మెంట్ 1' : 'COMPARTMENT 1'}</span>
            <span aria-hidden="true">·</span>
            <span>{isTe ? '20 ప్రాథమిక భావనలు (A–T)' : '20 FUNDAMENTAL TOPICS (A–T)'}</span>
            <span aria-hidden="true">·</span>
            <span>{isTe ? 'AP SSC 10వ తరగతి భౌతిక శాస్త్రం' : 'AP SSC CLASS 10 PHYSICS'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isTe
              ? 'నిర్వచనాలు, సూత్రాలు, SI & MKS ప్రమాణాలు'
              : 'Definitions, Formulas, SI & MKS Units'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            {isTe
              ? 'స్పష్టమైన శాస్త్రీయ నిర్వచనాలు, గణిత సూత్రాలు, SI మరియు MKS ప్రమాణాలు, వాణిజ్య ప్రమాణాల మార్పిడి (1 kWh = 3.6 × 10⁶ J / W·s), సులభమైన వివరణలు మరియు వలయ చిత్రాలతో విద్యుత్ అధ్యాయంలోని ప్రతి భావనను సమగ్రంగా నేర్చుకోండి.'
              : 'Master every essential building block of electricity with crystal-clear scientific definitions, mathematical formulas, SI and MKS units, commercial unit conversions (1 kWh = 3.6 × 10⁶ J / W·s), simple real-world analogies, and illustrated circuit diagrams.'}
          </p>
        </div>

        {/* Quick jump navigation for the topics + Jump to Tables button */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1">
              {isTe ? 'అంశాలు:' : 'Topics:'}
            </span>
            {localizedConcepts.map((c) => (
              <button
                key={c.id}
                onClick={() => scrollToConcept(c.id)}
                className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-md transition-colors cursor-pointer"
              >
                <span className="text-amber-400 font-bold mr-1">{c.letter}.</span>
                {c.title.split(' ')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={scrollToTables}
            className="px-3 py-1 text-xs font-bold text-amber-300 hover:text-slate-950 bg-amber-400/10 hover:bg-amber-400 border border-amber-400/30 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Table className="w-3.5 h-3.5" />
            <span>{isTe ? '⬇ ప్రమాణాల పట్టికలకు వెళ్ళండి' : '⬇ Jump to Reference Tables'}</span>
          </button>
        </div>
      </div>

      {/* DEFINITIONS SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>
              {isTe
                ? '📖 సమగ్ర అధ్యయన భావనలు & శాస్త్రీయ నిర్వచనాలు'
                : '📖 Detailed Topic Explanations & Scientific Definitions'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isTe
              ? 'నిర్వచనాలు, గణిత సూత్రాలు, ఉదాహరణలు మరియు చిత్రాలతో 20 AP SSC సిలబస్ అంశాలు.'
              : '20 Core AP SSC Syllabus topics with definitions, mathematical formulas, analogies, and diagrams.'}
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 hidden sm:inline-block">
          {filteredConcepts.length} {isTe ? 'అంశాలు' : 'Topics'}
        </span>
      </div>

      {/* Grid of Concept / Definition Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredConcepts.map((item) => (
          <div
            key={item.id}
            id={`concept-${item.id}`}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-all"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold flex items-center justify-center text-sm shrink-0">
                    {item.letter}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 mt-0.5">
                      <span>
                        {isTe ? 'సంకేతం: ' : 'Symbol: '}
                        <strong className="text-slate-200 font-mono">{item.symbol}</strong>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {isTe ? 'SI ప్రమాణం: ' : 'SI Unit: '}
                        <strong className="text-emerald-400 font-mono">{item.siUnit}</strong>
                      </span>
                      {item.mksUnit && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>
                            {isTe ? 'MKS ప్రమాణం: ' : 'MKS Unit: '}
                            <strong className="text-cyan-400 font-mono">{item.mksUnit}</strong>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* For Potential Difference: render dedicated physics video uploaded by user in place of photo/diagram */}
              {item.id === 'potential-difference' ? (
                <div className="mb-4">
                  <PotentialDifferenceVideoViewer />
                </div>
              ) : (
                <>
                  {/* Animated Interactive Diagram */}
                  {item.diagramType && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                      <DiagramSVGs type={item.diagramType} className="w-full h-auto min-h-[175px]" />
                    </div>
                  )}

                  {/* 3D Laboratory Appliance Physical Model */}
                  {item.modelType && (
                    <div className="mb-4 bg-slate-950 rounded-xl border border-cyan-500/30 overflow-hidden shadow-sm">
                      <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between text-xs">
                        <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                          <Box className="w-3.5 h-3.5 text-cyan-400" />
                          <span>
                            {item.modelTitle ||
                              (isTe
                                ? 'ప్రయోగశాల పరికరం (3D భౌతిక మోడల్)'
                                : 'Laboratory Physical Apparatus (3D Model)')}
                          </span>
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                          {isTe ? '360° ఇంటరాక్టివ్ 3D' : '360° Interactive 3D'}
                        </span>
                      </div>
                      <div className="h-44 w-full">
                        <ThreeDDeviceViewer type={item.modelType} />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Definition */}
              <div className="mb-3">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                  {isTe ? 'శాస్త్రీయ నిర్వచనం' : 'Scientific Definition'}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                  {item.definition}
                </p>
              </div>

              {/* Formula (if available) */}
              {item.formula && (
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                    <span>
                      {isTe
                        ? '⚡ ప్రామాణిక గణిత సూత్రం:'
                        : '⚡ Standard Mathematical Formula:'}
                    </span>
                  </span>
                  <div className="py-2.5 px-4 bg-slate-950 rounded-xl border-2 border-amber-400/40 text-amber-300 font-mono font-extrabold text-base sm:text-lg tracking-wide shadow-sm flex items-center justify-between">
                    <span>{item.formula}</span>
                  </div>
                </div>
              )}

              {/* Units & Measurement Systems (SI, MKS, CGS, Commercial) */}
              {(item.mksUnit || item.cgsUnit || item.commercialUnit || item.conversion) && (
                <div className="mb-4 bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <span>
                        {isTe
                          ? '📏 కొలత విధానాలు & ప్రమాణాలు:'
                          : '📏 Units & Systems of Measurement:'}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-lg p-2.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                        {isTe ? 'SI ప్రమాణం' : 'SI Unit'}
                      </span>
                      <span className="font-mono font-bold text-slate-100 text-xs sm:text-sm">{item.siUnit}</span>
                    </div>
                    {item.mksUnit && (
                      <div className="bg-slate-900/90 border border-sky-500/30 rounded-lg p-2.5">
                        <span className="text-[10px] uppercase font-bold text-sky-400 block tracking-wider">
                          {isTe ? 'MKS ప్రమాణం' : 'MKS Unit'}
                        </span>
                        <span className="font-mono font-bold text-slate-100 text-xs sm:text-sm">{item.mksUnit}</span>
                      </div>
                    )}
                    {item.cgsUnit && (
                      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-lg p-2.5">
                        <span className="text-[10px] uppercase font-bold text-indigo-400 block tracking-wider">
                          {isTe ? 'CGS ప్రమాణం' : 'CGS Unit'}
                        </span>
                        <span className="font-mono font-bold text-slate-100 text-xs sm:text-sm">{item.cgsUnit}</span>
                      </div>
                    )}
                    {item.commercialUnit && (
                      <div className="bg-slate-900/90 border border-amber-500/30 rounded-lg p-2.5">
                        <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                          {isTe ? 'వాణిజ్య ప్రమాణం' : 'Commercial Unit'}
                        </span>
                        <span className="font-mono font-bold text-slate-100 text-xs sm:text-sm">{item.commercialUnit}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step-by-Step Conversion Breakdown (1 kWh = 3.6 × 10⁶ J / Watt-seconds) */}
              {item.conversionBreakdown && (
                <div className="mb-4 bg-gradient-to-br from-amber-950/25 via-slate-950 to-indigo-950/30 border-2 border-amber-400/40 rounded-xl p-3.5 shadow-md">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {isTe
                        ? 'దశలవారీ మార్పిడి: 1 kWh ను వాట్-సెకన్లు & జౌళ్ళలోకి మార్చడం'
                        : 'Step-by-Step Conversion: 1 kWh into Watt-seconds & Joules'}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-200 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                    {item.conversionBreakdown.steps.map((st, sIdx) => (
                      <div key={sIdx} className="font-mono flex items-start gap-1.5 leading-relaxed">
                        <span className="text-amber-400 font-bold shrink-0">→</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 py-2 px-3 bg-amber-400/15 border border-amber-400/50 rounded-lg text-center font-mono font-black text-amber-300 text-xs sm:text-sm tracking-wide">
                    {item.conversionBreakdown.result}
                  </div>
                  {item.conversionBreakdown.note && (
                    <p className="mt-2 text-[11px] text-amber-200/90 leading-relaxed bg-amber-950/40 p-2.5 rounded-lg border border-amber-900/40">
                      💡 <strong>{isTe ? 'పరీక్షా భావన నోట్:' : 'Exam Concept Note:'}</strong> {item.conversionBreakdown.note}
                    </p>
                  )}
                </div>
              )}

              {/* Simple Meaning */}
              <div className="mb-3">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                  {isTe ? 'సులభార్థం & సరళ వివరణ' : 'Meaning in Simple Words'}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.simpleMeaning}
                </p>
              </div>

              {/* Practical Example */}
              <div className="mb-3">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                  {isTe ? 'నిత్యజీవిత ఉదాహరణ' : 'Practical Example'}
                </span>
                <p className="text-xs text-slate-400 italic">
                  💡 {item.practicalExample}
                </p>
              </div>
            </div>

            {/* Exam Tip Callout */}
            {item.examTip && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-amber-200/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-800/30">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-400">
                    {isTe ? 'AP SSC బోర్డు పరీక్షా చిట్కా: ' : 'AP SSC Exam Note: '}
                  </strong>
                  {item.examTip}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredConcepts.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            {isTe
              ? `"${searchQuery}" కోసం ఎటువంటి ఫలితాలు లభించలేదు.`
              : `No topics match your search query "${searchQuery}".`}
          </p>
        </div>
      )}

      {/* REFERENCE TABLES SECTION (Positioned BELOW the definitions) */}
      <ReferenceTablesSection
        searchQuery={searchQuery}
        language={language}
        onScrollToConcept={scrollToConcept}
      />
    </div>
  );
};
