import { motion } from 'motion/react';
import { ArrowLeft, Database, Beaker, FileText, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DatasetMethods() {
  // Sample information (replace with computed values later)
  const sampleData = [
    { timepoint: '2.5 months', samples: 8, cells: '~15,000' },
    { timepoint: '5.7 months', samples: 8, cells: '~18,000' },
    { timepoint: '13.4 months', samples: 8, cells: '~20,000' },
    { timepoint: '17.9 months', samples: 8, cells: '~22,000' },
  ];

  // Gene categories distribution
  const geneCategories = [
    { category: 'Mitochondrial', count: 1, color: '#3b82f6' },
    { category: 'Oxidative stress', count: 3, color: '#8b5cf6' },
    { category: 'Core metabolism', count: 23, color: '#10b981' },
    { category: 'Synaptic and ion signaling', count: 13, color: '#fb923c' },
    { category: 'Immune activation', count: 11, color: '#dc2626' },
    { category: 'Nutrient transport', count: 6, color: '#0ea5e9' },
    { category: 'Other genes', count: 24, color: '#565960ff' },
  ];

  const COLORS = geneCategories.map(c => c.color);

  // Quality metrics (placeholder)
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

  return (
    <div className="pt-20 min-h-screen">

      {/* HEADER SECTION */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1711409664431-4e7914ac2370"
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
              High-resolution spatial transcriptomics from the TgCRND8 Alzheimer’s mouse model,
              enabling metabolic, glial, synaptic, and spatial profiling across pathology progression.
            </p>
          </motion.div>
        </div>
      </section>

      {/* DATASET OVERVIEW SECTION */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">

          {/* Dataset Overview introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl mb-4 gradient-text">Dataset Overview</h2>

            <p className="text-slate-400 max-w-3xl">
              We analyze spatial transcriptomics data generated using the <strong>10x Xenium</strong> platform.
              The dataset covers multiple ages (2.5 to 17.9 months) in <strong>TgCRND8</strong> and
              <strong> wild-type</strong> mice, including:
              <br/><br/>
              • High-resolution <strong>cell coordinates (x/y)</strong><br/>
              • A curated <strong>panel of metabolic, glial, immune, and synaptic genes</strong><br/>
              • Segmented <strong>amyloid plaques</strong> with spatial distance annotation<br/>
              • Multiple biological replicates per age and genotype<br/>
            </p>
          </motion.div>

          {/* Sample information + Quality metrics */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* Sample Information block */}
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
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Quality Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
            >
              <h3 className="text-2xl mb-6 text-purple-400">Quality Metrics</h3>
              <p className="text-slate-400 mb-4">
                Summary of per-cell quality statistics after QC and preprocessing.
              </p>

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

                    {/* Gene categories pie chart */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
                    >
                      <h3 className="text-2xl mb-6 text-green-400">Gene Categories</h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                          <Pie
                            data={geneCategories}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ category, count }) => `${category}: ${count}`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {geneCategories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </div>
                </section>
          
                {/* PREPROCESSING SECTION */}
                <section className="py-16 bg-slate-900/50">
                  <div className="container mx-auto px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mb-12"
                    >
                      <h2 className="text-4xl mb-4 gradient-text">Data Preprocessing</h2>
                      <p className="text-slate-400 max-w-3xl">
                        Our analysis pipeline includes several critical preprocessing steps to ensure data quality and biological accuracy.
                      </p>
                    </motion.div>
          
                    <div className="grid md:grid-cols-2 gap-8">
                      {preprocessingSteps.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-colors"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="p-3 bg-blue-500/10 rounded-lg">
                                <IconComponent className="size-6 text-blue-400" />
                              </div>
                              <h3 className="text-xl text-slate-100">{item.step}</h3>
                            </div>
                            <p className="text-slate-400">{item.description}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </div>
            );
          }

