import { motion } from 'motion/react';
import { ArrowLeft, MapPin, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function RQ1Spatial() {
  // Mock data for spatial analysis
  const distanceData = [
    { distance: '0-50', metabolicScore: 42, count: 156 },
    { distance: '50-100', metabolicScore: 58, count: 234 },
    { distance: '100-150', metabolicScore: 71, count: 298 },
    { distance: '150-200', metabolicScore: 82, count: 312 },
    { distance: '200-250', metabolicScore: 88, count: 267 },
    { distance: '250+', metabolicScore: 94, count: 189 },
  ];

  const geneExpressionData = [
    { gene: 'ATP5A1', nearPlaque: 45, farPlaque: 92, category: 'OXPHOS' },
    { gene: 'COX4I1', nearPlaque: 51, farPlaque: 88, category: 'OXPHOS' },
    { gene: 'NDUFA1', nearPlaque: 48, farPlaque: 95, category: 'OXPHOS' },
    { gene: 'PFKM', nearPlaque: 62, farPlaque: 85, category: 'Glycolysis' },
    { gene: 'LDHA', nearPlaque: 71, farPlaque: 79, category: 'Glycolysis' },
    { gene: 'IDH1', nearPlaque: 55, farPlaque: 91, category: 'TCA Cycle' },
  ];

  const spatialHeatmap = [
    { x: 20, y: 30, z: 95, type: 'far' },
    { x: 35, y: 45, z: 88, type: 'far' },
    { x: 50, y: 20, z: 45, type: 'near' },
    { x: 52, y: 22, z: 42, type: 'near' },
    { x: 48, y: 18, z: 48, type: 'near' },
    { x: 75, y: 60, z: 92, type: 'far' },
    { x: 15, y: 70, z: 90, type: 'far' },
    { x: 85, y: 35, z: 87, type: 'far' },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762279388957-c6ed514d3353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2NTI1NDIyOXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Data visualization"
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
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <MapPin className="size-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl gradient-text">Spatial Analysis</h1>
                <p className="text-slate-400 mt-2">Research Question 1</p>
              </div>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl">
              Does metabolic dysfunction in Alzheimer's follow a spatial gradient around amyloid plaques?
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
            className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <TrendingDown className="size-12 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl mb-3 text-red-300">Key Finding</h3>
                <p className="text-slate-300">
                  Metabolic gene expression is significantly reduced in cells within 100 μm of amyloid plaques, 
                  with oxidative phosphorylation genes showing the strongest suppression. This suggests a spatial gradient 
                  of metabolic dysfunction radiating from plaque sites.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Distance vs Metabolic Score */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Metabolic Activity vs. Distance from Plaques
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Cells closer to amyloid plaques show progressively lower metabolic gene expression
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={distanceData}>
                  <defs>
                    <linearGradient id="metabolicGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="distance" 
                    stroke="#94a3b8"
                    label={{ value: 'Distance from Plaque (μm)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    label={{ value: 'Metabolic Score', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="metabolicScore" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fill="url(#metabolicGradient)"
                    name="Metabolic Score"
                    dot={{ fill: '#3b82f6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gene Expression Comparison */}
      <section className="py-16 bg-gradient-to-b from-[#050814] to-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Gene Expression: Near vs. Far from Plaques
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Comparison of key metabolic genes in cells near {'(<100 μm)'} and far {'(>200 μm)'} from plaques
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={geneExpressionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="gene" stroke="#94a3b8" />
                  <YAxis 
                    stroke="#94a3b8"
                    label={{ value: 'Expression Level', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Bar dataKey="nearPlaque" fill="#ef4444" name="Near Plaque" />
                  <Bar dataKey="farPlaque" fill="#10b981" name="Far from Plaque" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 mb-2">OXPHOS Genes</h4>
                <p className="text-slate-300">
                  ATP5A1, COX4I1, NDUFA1 show &gt;40% reduction near plaques
                </p>
              </div>
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-purple-400 mb-2">Glycolysis</h4>
                <p className="text-slate-300">
                  PFKM shows moderate reduction, LDHA relatively preserved
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 mb-2">TCA Cycle</h4>
                <p className="text-slate-300">
                  IDH1 shows significant reduction near plaques
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spatial Distribution */}
      <section className="py-16 bg-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Spatial Distribution of Metabolic Activity
            </h2>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              2D spatial map showing metabolic scores across tissue sections
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="X Position" 
                    stroke="#94a3b8"
                    label={{ value: 'X Position (μm)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Y Position" 
                    stroke="#94a3b8"
                    label={{ value: 'Y Position (μm)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                  />
                  <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Metabolic Score" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Scatter 
                    name="Near Plaque" 
                    data={spatialHeatmap.filter(d => d.type === 'near')} 
                    fill="#ef4444" 
                  />
                  <Scatter 
                    name="Far from Plaque" 
                    data={spatialHeatmap.filter(d => d.type === 'far')} 
                    fill="#10b981" 
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conclusions */}
      <section className="py-16 bg-gradient-to-b from-[#0a0e27] to-[#050814]">
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
                <h3 className="text-xl text-blue-400 mb-3">Spatial Gradient of Dysfunction</h3>
                <p className="text-slate-300">
                  A clear spatial gradient exists, with metabolic gene expression declining as proximity to amyloid plaques increases. 
                  This suggests that plaques create a toxic microenvironment affecting nearby cells.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-purple-400 mb-3">OXPHOS Vulnerability</h3>
                <p className="text-slate-300">
                  Oxidative phosphorylation genes are most severely affected, indicating mitochondrial dysfunction 
                  as a primary consequence of plaque proximity.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-green-400 mb-3">Therapeutic Implications</h3>
                <p className="text-slate-300">
                  Targeting metabolic support in regions surrounding plaques could be a promising therapeutic strategy 
                  to preserve cellular function in affected brain regions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}