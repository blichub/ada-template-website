import { motion } from 'motion/react';
import { ArrowLeft, Layers, AlertTriangle, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell, PieChart, Pie } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function RQ3CellTypes() {
  // Mock cell-type specific data
  const cellTypeMetabolic = [
    { cellType: 'Neurons', control: 95, AD: 48, decline: 49 },
    { cellType: 'Astrocytes', control: 88, AD: 62, decline: 30 },
    { cellType: 'Microglia', control: 82, AD: 71, decline: 13 },
    { cellType: 'Oligodendrocytes', control: 91, AD: 55, decline: 40 },
    { cellType: 'Endothelial', control: 85, AD: 73, decline: 14 },
  ];

  const neuronSubtypes = [
    { subtype: 'Excitatory', metabolic: 45, vulnerability: 95 },
    { subtype: 'Inhibitory', metabolic: 68, vulnerability: 65 },
    { subtype: 'Cholinergic', metabolic: 38, vulnerability: 98 },
    { subtype: 'Dopaminergic', metabolic: 52, vulnerability: 78 },
  ];

  const radarCellTypes = [
    { metric: 'OXPHOS', Neurons: 45, Astrocytes: 65, Microglia: 75, Oligos: 58 },
    { metric: 'Glycolysis', Neurons: 62, Astrocytes: 71, Microglia: 82, Oligos: 68 },
    { metric: 'TCA Cycle', Neurons: 52, Astrocytes: 68, Microglia: 78, Oligos: 61 },
    { metric: 'FAO', Neurons: 48, Astrocytes: 62, Microglia: 72, Oligos: 55 },
    { metric: 'PPP', Neurons: 58, Astrocytes: 70, Microglia: 76, Oligos: 64 },
  ];

  const cellTypeDistribution = [
    { name: 'Neurons', value: 45, color: '#ef4444' },
    { name: 'Astrocytes', value: 22, color: '#f59e0b' },
    { name: 'Microglia', value: 15, color: '#10b981' },
    { name: 'Oligodendrocytes', value: 12, color: '#8b5cf6' },
    { name: 'Other', value: 6, color: '#6b7280' },
  ];

  const cellFractionData = [
  { mouse: 'WT2.5', age: 2.5, Astrocyte: 0.41, Microglia: 0.09, Oligodendrocyte: 0.19, Neuron: 0.18 },
  { mouse: 'WT5.7', age: 5.7, Astrocyte: 0.41, Microglia: 0.07, Oligodendrocyte: 0.24, Neuron: 0.16 },
  { mouse: 'WT13', age: 13.4, Astrocyte: 0.37, Microglia: 0.11, Oligodendrocyte: 0.22, Neuron: 0.17 },
  { mouse: 'TG2.5', age: 2.5, Astrocyte: 0.44, Microglia: 0.08, Oligodendrocyte: 0.15, Neuron: 0.17 },
  { mouse: 'TG5.7', age: 5.7, Astrocyte: 0.40, Microglia: 0.08, Oligodendrocyte: 0.19, Neuron: 0.19 },
  { mouse: 'TG13+', age: 17.9, Astrocyte: 0.52, Microglia: 0.08, Oligodendrocyte: 0.19, Neuron: 0.12 },
];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#6b7280'];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1716833322990-acbeae5cc3eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyb25zJTIwYnJhaW4lMjB0aXNzdWUlMjBtaWNyb3Njb3B5fGVufDF8fHx8MTc2NTMxNTM0MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Brain neurons"
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
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center">
                <Layers className="size-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl gradient-text">Cell-Type Vulnerability</h1>
                <p className="text-slate-400 mt-2">Research Question 3</p>
              </div>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl">
              Which cell types are most affected by metabolic decline?
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
                  Neurons show the most severe metabolic vulnerability, with 49% decline in metabolic gene expression 
                  compared to controls. Within neuronal subtypes, cholinergic and excitatory neurons are most affected. 
                  Microglia and endothelial cells show relative metabolic resilience, possibly reflecting their 
                  non-neuronal energy demands.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Cell Type Fractions */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Cell Type Fractions by Age
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Fraction of different cell types across mice, sorted from youngest to oldest
            </p>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={cellFractionData.sort((a, b) => a.age - b.age)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="mouse"
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                    interval={0}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    label={{ value: 'Fraction of Cells', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
                  <Bar dataKey="Astrocyte" stackId="a" fill="#1a5c3f" name="Astrocytes" />
                  <Bar dataKey="Microglia" stackId="a" fill="#7B68EE" name="Microglia" />
                  <Bar dataKey="Oligodendrocyte" stackId="a" fill="#8B4513" name="Oligodendrocytes" />
                  <Bar dataKey="Neuron" stackId="a" fill="#FF6347" name="Neurons" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Cell Type Comparison */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Metabolic Activity by Cell Type
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Comparing metabolic gene expression between control and Alzheimer's disease models
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={cellTypeMetabolic}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="cellType" stroke="#94a3b8" />
                  <YAxis 
                    stroke="#94a3b8"
                    label={{ value: 'Metabolic Score', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Bar dataKey="control" fill="#10b981" name="Control" />
                  <Bar dataKey="AD" fill="#ef4444" name="Alzheimer's Disease" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 grid md:grid-cols-5 gap-4">
              {cellTypeMetabolic.map((cell, index) => {
                const colors = ['#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#6b7280'];
                return (
                  <div 
                    key={cell.cellType}
                    className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 text-center"
                  >
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: `${colors[index]}20`, border: `2px solid ${colors[index]}` }}
                    >
                      <span className="text-2xl" style={{ color: colors[index] }}>
                        {cell.decline}%
                      </span>
                    </div>
                    <h4 className="text-slate-300">{cell.cellType}</h4>
                    <p className="text-slate-500">Decline</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Task 4.2 */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="size-6 text-teal-300" />
              <h2 className="text-3xl md:text-4xl gradient-text">
                Cell-type specific differential expression 
              </h2>
            </div>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Subset each cell type, compare AD vs Control per category, and apply multiple testing correction.
            </p>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
              <p className="text-slate-300">
                Output results to results/rq3_celltype_DE.csv with columns: cell_type, category, mean_AD,
                mean_Control, log2FC, pval, qval.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Task 4.3 */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="size-6 text-indigo-300" />
              <h2 className="text-3xl md:text-4xl gradient-text">
                Cell-type x plaque distance interaction 
              </h2>
            </div>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Test whether spatial gradients differ between neurons and glia using a three-way comparison.
            </p>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
              <p className="text-slate-300">
                Deliverables include an interaction plot (expression vs distance, faceted by cell type) and
                an ANOVA results table.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Task 4.4 */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="size-6 text-rose-300" />
              <h2 className="text-3xl md:text-4xl gradient-text">
                Cell-type correlation networks
              </h2>
            </div>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Compute gene-gene correlations, build networks, and detect modules within each cell type.
            </p>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
              <p className="text-slate-300">
                Compare AD vs Control network topology. Output figures/rq3_network_[celltype].png and a
                module enrichment table.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Task 4.5 */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="size-6 text-amber-300" />
              <h2 className="text-3xl md:text-4xl gradient-text">
                Cell-type proportions and spatial distribution 
              </h2>
            </div>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Quantify whether cell type proportions shift near plaques and across distance bins.
            </p>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
              <p className="text-slate-300">
                Output a bar plot of cell-type composition vs plaque distance and summary density metrics.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cell Type Distribution */}
      <section className="py-16 bg-gradient-to-b from-[#050814] to-[#0a0e27]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl mb-4 gradient-text">
                Cell Type Distribution
              </h2>
              <p className="text-slate-400 mb-8">
                Proportion of different cell types in the analyzed brain regions
              </p>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={cellTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cellTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl text-purple-400 mb-4">Cell Type Characteristics</h3>
              
              <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 mb-2">Neurons (45%)</h4>
                <p className="text-slate-300">
                  Most vulnerable to metabolic dysfunction. High energy demands make them susceptible to mitochondrial impairment.
                </p>
              </div>

              <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-400 mb-2">Astrocytes (22%)</h4>
                <p className="text-slate-300">
                  Moderate vulnerability. Support neuronal metabolism but show compensatory mechanisms.
                </p>
              </div>

              <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 mb-2">Microglia (15%)</h4>
                <p className="text-slate-300">
                  Relatively resilient. Glycolytic metabolism provides adaptability under stress.
                </p>
              </div>

              <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-400 mb-2">Oligodendrocytes (12%)</h4>
                <p className="text-slate-300">
                  Significant vulnerability. Myelin synthesis requires high metabolic activity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Neuronal Subtypes */}
      <section className="py-16 bg-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Neuronal Subtype Vulnerability
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Different neuronal subtypes show varying degrees of metabolic dysfunction
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={neuronSubtypes} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis type="category" dataKey="subtype" stroke="#94a3b8" width={120} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Bar dataKey="metabolic" fill="#3b82f6" name="Metabolic Score" />
                  <Bar dataKey="vulnerability" fill="#ef4444" name="Vulnerability Index" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-red-400 mb-3">Most Vulnerable</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Cholinergic neurons</strong>: Critical for memory, severely affected (98% vulnerability)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>Excitatory neurons</strong>: High firing rates demand more ATP (95% vulnerability)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-green-400 mb-3">More Resilient</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Inhibitory neurons</strong>: Lower metabolic demands (65% vulnerability)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Dopaminergic neurons</strong>: Moderate vulnerability (78%)</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pathway Radar by Cell Type */}
      <section className="py-16 bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Metabolic Pathway Activity by Cell Type
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Different cell types rely on different metabolic pathways
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={radarCellTypes}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="metric" stroke="#94a3b8" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
                  <Radar 
                    name="Neurons" 
                    dataKey="Neurons" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar 
                    name="Astrocytes" 
                    dataKey="Astrocytes" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar 
                    name="Microglia" 
                    dataKey="Microglia" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar 
                    name="Oligodendrocytes" 
                    dataKey="Oligos" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
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
                <h3 className="text-xl text-red-400 mb-3">Neuronal Selectivity</h3>
                <p className="text-slate-300">
                  Neurons are disproportionately affected by metabolic dysfunction, with nearly 50% decline in 
                  metabolic gene expression. This aligns with their high energy demands and reliance on mitochondrial function.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-yellow-400 mb-3">Subtype Specificity</h3>
                <p className="text-slate-300">
                  Within neurons, cholinergic and excitatory subtypes are most vulnerable. These populations are 
                  critical for cognitive function, explaining the cognitive symptoms of Alzheimer's disease.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-green-400 mb-3">Cell-Type Targeted Therapies</h3>
                <p className="text-slate-300">
                  Understanding cell-type-specific vulnerabilities suggests that targeted metabolic support for 
                  neurons, particularly cholinergic and excitatory subtypes, could be therapeutically beneficial.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-purple-400 mb-3">Non-Neuronal Resilience</h3>
                <p className="text-slate-300">
                  Microglia and endothelial cells show relative metabolic resilience, likely due to their ability 
                  to shift to glycolytic metabolism. This adaptive capacity could be exploited therapeutically.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
