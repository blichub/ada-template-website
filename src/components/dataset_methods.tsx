import { motion } from 'motion/react';
import { ArrowLeft, Database, Beaker, FileText, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DatasetMethods() {
  // Sample information
  const sampleData = [
    { timepoint: '4 months', samples: 8, cells: '~15,000', plaques: 'Low' },
    { timepoint: '8 months', samples: 8, cells: '~18,000', plaques: 'Medium' },
    { timepoint: '12 months', samples: 8, cells: '~20,000', plaques: 'High' },
  ];

  // Gene categories distribution
  const geneCategories = [
    { category: 'Metabolic', count: 156, color: '#3b82f6' },
    { category: 'OXPHOS', count: 89, color: '#8b5cf6' },
    { category: 'Glycolysis', count: 42, color: '#10b981' },
    { category: 'TCA Cycle', count: 31, color: '#f59e0b' },
    { category: 'Other Energy', count: 38, color: '#ef4444' },
  ];

  const qualityMetrics = [
    { metric: 'Genes Detected', value: 15234 },
    { metric: 'Median UMI/Cell', value: 3500 },
    { metric: 'Median Genes/Cell', value: 1200 },
    { metric: 'Mitochondrial %', value: 5 },
  ];

  const preprocessingSteps = [
    {
      step: 'Quality Control',
      description: 'Filtering cells based on gene count, UMI count, and mitochondrial percentage',
      icon: Beaker,
    },
    {
      step: 'Normalization',
      description: 'Log-normalization and scaling to account for sequencing depth',
      icon: GitBranch,
    },
    {
      step: 'Cell Type Annotation',
      description: 'Marker-based annotation and semi-supervised clustering',
      icon: FileText,
    },
    {
      step: 'Spatial Registration',
      description: 'Alignment of spatial coordinates and plaque segmentation',
      icon: Database,
    },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1711409664431-4e7914ac2370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyMHRpc3N1ZSUyMHNwYXRpYWwlMjB0cmFuc2NyaXB0b21pY3N8ZW58MXx8fHwxNzY1Mzk4NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Spatial transcriptomics"
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
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                <Database className="size-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl gradient-text">Dataset & Methods</h1>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl">
              Comprehensive overview of the spatial transcriptomics dataset and analytical methods used in this study
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dataset Overview */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl mb-4 gradient-text">Dataset Overview</h2>
            <p className="text-slate-400 max-w-3xl">
              We analyze spatial transcriptomics data from the 5xFAD mouse model of Alzheimer's disease,
              capturing gene expression patterns with spatial resolution across disease progression.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
            >
              <h3 className="text-2xl mb-6 text-blue-400">Sample Information</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-3 px-4 text-slate-300">Timepoint</th>
                      <th className="py-3 px-4 text-slate-300">Samples</th>
                      <th className="py-3 px-4 text-slate-300">Cells</th>
                      <th className="py-3 px-4 text-slate-300">Plaque Load</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((row, idx) => (
                      <motion.tr
                        key={row.timepoint}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 px-4 text-slate-300">{row.timepoint}</td>
                        <td className="py-3 px-4 text-slate-400">{row.samples}</td>
                        <td className="py-3 px-4 text-slate-400">{row.cells}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            row.plaques === 'Low' ? 'bg-green-500/20 text-green-400' :
                            row.plaques === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {row.plaques}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
            >
              <h3 className="text-2xl mb-6 text-purple-400">Quality Metrics</h3>
              <div className="space-y-4">
                {qualityMetrics.map((metric, idx) => (
                  <motion.div
                    key={metric.metric}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg"
                  >
                    <span className="text-slate-300">{metric.metric}</span>
                    <span className="text-2xl gradient-text">{metric.value.toLocaleString()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Gene Categories Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
          >
            <h3 className="text-2xl mb-6 text-green-400">Gene Categories Distribution</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={geneCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {geneCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {geneCategories.map((cat, idx) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-slate-300 flex-1">{cat.category}</span>
                    <span className="text-slate-400">{cat.count} genes</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preprocessing Pipeline */}
      <section className="py-16 bg-gradient-to-b from-[#050814] to-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl mb-4 gradient-text">Data Preprocessing Pipeline</h2>
            <p className="text-slate-400 max-w-3xl">
              A rigorous multi-step pipeline ensures high-quality data for downstream analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {preprocessingSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 glow-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                      <Icon className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-2 text-blue-400">{step.step}</h3>
                      <p className="text-slate-400">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Analytical Methods */}
      <section className="py-16 bg-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl mb-4 gradient-text">Analytical Methods</h2>
            <p className="text-slate-400 max-w-3xl">
              Advanced computational approaches to extract biological insights from spatial transcriptomics data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
            >
              <h3 className="text-xl mb-4 text-blue-400">Spatial Analysis</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Distance-based proximity calculations to amyloid plaques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Spatial autocorrelation analysis (Moran's I)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Hotspot detection for metabolic genes</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
            >
              <h3 className="text-xl mb-4 text-purple-400">Temporal Modeling</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Linear mixed-effects models for trajectory analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Pseudotime ordering using Monocle3</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Gene Set Enrichment Analysis (GSEA)</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
            >
              <h3 className="text-xl mb-4 text-green-400">Statistical Testing</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Differential expression with DESeq2</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Benjamini-Hochberg FDR correction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Permutation tests for spatial patterns</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Availability */}
      <section className="py-16 bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
          >
            <h2 className="text-3xl mb-6 gradient-text">Data Availability & Code</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                The spatial transcriptomics dataset analyzed in this study is based on publicly available
                data from the 5xFAD mouse model. All analysis code and visualization scripts are available
                in our GitHub repository.
              </p>
              <p>
                We provide reproducible workflows using Python (scanpy, squidpy) and R (Seurat, Giotto)
                for spatial transcriptomics analysis. Interactive visualizations were created using modern
                web technologies including React and D3.js.
              </p>
              <div className="flex gap-4 mt-6">
                <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400">
                  GitHub Repository
                </div>
                <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400">
                  Documentation
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
