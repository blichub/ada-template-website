import { motion } from 'motion/react';
import { ArrowLeft, Clock, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function RQ2Temporal() {
  // Mock temporal data
  const temporalProgression = [
    { age: '4 months', metabolicScore: 88, plaqueLoad: 12, cellDeath: 5 },
    { age: '8 months', metabolicScore: 71, plaqueLoad: 45, cellDeath: 18 },
    { age: '12 months', metabolicScore: 52, plaqueLoad: 78, cellDeath: 35 },
  ];

  const pathwayTemporal = [
    { age: '4 months', OXPHOS: 90, Glycolysis: 85, TCAcycle: 88, PPP: 87 },
    { age: '8 months', OXPHOS: 65, Glycolysis: 78, TCAcycle: 71, PPP: 75 },
    { age: '12 months', OXPHOS: 42, Glycolysis: 68, TCAcycle: 55, PPP: 62 },
  ];

  const radarData = [
    { pathway: 'OXPHOS', fourMonths: 90, eightMonths: 65, twelveMonths: 42 },
    { pathway: 'Glycolysis', fourMonths: 85, eightMonths: 78, twelveMonths: 68 },
    { pathway: 'TCA Cycle', fourMonths: 88, eightMonths: 71, twelveMonths: 55 },
    { pathway: 'PPP', fourMonths: 87, eightMonths: 75, twelveMonths: 62 },
    { pathway: 'Fatty Acid Ox.', fourMonths: 86, eightMonths: 69, twelveMonths: 48 },
  ];

  const geneTrajectories = [
    { age: 4, ATP5A1: 95, COX4I1: 92, PFKM: 88, IDH1: 90 },
    { age: 6, ATP5A1: 82, COX4I1: 85, PFKM: 84, IDH1: 83 },
    { age: 8, ATP5A1: 68, COX4I1: 71, PFKM: 79, IDH1: 72 },
    { age: 10, ATP5A1: 55, COX4I1: 58, PFKM: 72, IDH1: 62 },
    { age: 12, ATP5A1: 45, COX4I1: 48, PFKM: 68, IDH1: 55 },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1698913197660-cf8720ede320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3BlJTIwY2VsbHMlMjBwdXJwbGV8ZW58MXx8fHwxNzY1MzE1MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Microscope cells"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 group"
          >
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
                <Clock className="size-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl gradient-text">Temporal Evolution</h1>
                <p className="text-slate-400 mt-2">Research Question 2</p>
              </div>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl">
              How does metabolic dysfunction evolve with disease progression?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Finding */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <TrendingDown className="size-12 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl mb-3 text-purple-300">Key Finding</h3>
                <p className="text-slate-300">
                  Metabolic dysfunction accelerates exponentially with age, showing mild impairment at 4 months 
                  but severe depression by 12 months. OXPHOS pathways decline fastest, while glycolytic pathways 
                  show relative resilience, suggesting a metabolic shift toward less efficient energy production.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Temporal Progression */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Disease Progression Over Time
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Tracking metabolic decline, plaque accumulation, and cell death across three time points
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={temporalProgression}>
                  <defs>
                    <linearGradient id="metabolicGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="plaqueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="deathGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="age" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="metabolicScore" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#metabolicGrad)"
                    name="Metabolic Score"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="plaqueLoad" 
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill="url(#plaqueGrad)"
                    name="Plaque Load (%)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cellDeath" 
                    stroke="#f59e0b" 
                    fillOpacity={1} 
                    fill="url(#deathGrad)"
                    name="Cell Death (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pathway-Specific Changes */}
      <section className="py-16 bg-gradient-to-b from-[#050814] to-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Metabolic Pathway Trajectories
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Different metabolic pathways show distinct temporal patterns of decline
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={geneTrajectories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="age" 
                    stroke="#94a3b8"
                    label={{ value: 'Age (months)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    label={{ value: 'Expression Level', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="ATP5A1" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="ATP5A1 (OXPHOS)"
                    dot={{ fill: '#ef4444', r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="COX4I1" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    name="COX4I1 (OXPHOS)"
                    dot={{ fill: '#f59e0b', r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="PFKM" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="PFKM (Glycolysis)"
                    dot={{ fill: '#10b981', r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="IDH1" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    name="IDH1 (TCA)"
                    dot={{ fill: '#8b5cf6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Radar Chart */}
      <section className="py-16 bg-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Metabolic Pathway Radar Comparison
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Comprehensive view of pathway activity across all time points
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="pathway" stroke="#94a3b8" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
                  <Radar 
                    name="4 Months" 
                    dataKey="fourMonths" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar 
                    name="8 Months" 
                    dataKey="eightMonths" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar 
                    name="12 Months" 
                    dataKey="twelveMonths" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Legend />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-16 bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-12 text-center gradient-text">
              Disease Milestones
            </h2>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 via-yellow-500 to-red-500" />

              {/* 4 months */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative mb-16"
              >
                <div className="flex items-center justify-end md:w-1/2 md:pr-12">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                    <h3 className="text-xl text-green-400 mb-2">4 Months: Early Stage</h3>
                    <p className="text-slate-300">
                      Minimal plaque load (12%), metabolic function largely preserved (88%). 
                      Early signs of OXPHOS decline detectable.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#050814] z-10" />
              </motion.div>

              {/* 8 months */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative mb-16"
              >
                <div className="flex items-center justify-start md:w-1/2 md:ml-auto md:pl-12">
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                    <h3 className="text-xl text-yellow-400 mb-2">8 Months: Progressive Stage</h3>
                    <p className="text-slate-300">
                      Moderate plaque burden (45%), significant metabolic decline (71%). 
                      Accelerated OXPHOS dysfunction, cell death increasing.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-500 rounded-full border-4 border-[#050814] z-10" />
              </motion.div>

              {/* 12 months */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center justify-end md:w-1/2 md:pr-12">
                  <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                    <h3 className="text-xl text-red-400 mb-2">12 Months: Advanced Stage</h3>
                    <p className="text-slate-300">
                      Severe plaque pathology (78%), profound metabolic failure (52%). 
                      Widespread cell death (35%), limited compensatory mechanisms.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full border-4 border-[#050814] z-10" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conclusions */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl mb-8 text-center gradient-text">
              Conclusions
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-purple-400 mb-3">Exponential Decline</h3>
                <p className="text-slate-300">
                  Metabolic dysfunction follows an exponential trajectory, with minimal impairment in early stages 
                  but rapid deterioration after 8 months, suggesting a tipping point in disease progression.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-yellow-400 mb-3">Pathway Selectivity</h3>
                <p className="text-slate-300">
                  OXPHOS pathways decline fastest, losing 50% activity by 12 months, while glycolysis shows 
                  relative preservation, indicating a metabolic shift toward less efficient ATP production.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-green-400 mb-3">Early Intervention Window</h3>
                <p className="text-slate-300">
                  The 4-8 month window represents a critical period for therapeutic intervention, before 
                  irreversible metabolic failure occurs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
