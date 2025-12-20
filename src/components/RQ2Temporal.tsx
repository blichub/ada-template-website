import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type HeatmapJSON = { xLabels: string[]; yLabels: string[]; values: number[][] };
type PCARecord = {
  sample_id: string;
  genotype: "WT" | "AD" | string;
  time: string | number;
  PC1: number;
  PC2: number;
};
type ClusterWideRecord = { genotype: "WT" | "AD" | string; time: string | number; [k: string]: any };
type CoefRecord = { name: string; coef: number };

async function fetchJSON<T>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} – ${url}`);
  return r.json();
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PillButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800/60 transition"
    >
      {children}
    </button>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl mb-4 gradient-text">{title}</h2>
      {subtitle && <p className="text-slate-400 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function Notes({
  observation,
  interpretation,
}: {
  observation?: React.ReactNode;
  interpretation?: React.ReactNode;
}) {
  return (
    <div className="mt-6 space-y-6">
      <div>
        <div className="text-xl text-purple-300 mb-2">Observation</div>
        <div className="text-slate-300 leading-relaxed">
          {observation ?? (
            <span className="text-slate-500">
              (Write 1–2 concrete things you see: peaks, separations, flips, etc.)
            </span>
          )}
        </div>
      </div>

      <div>
        <div className="text-xl text-purple-300 mb-2">Interpretation</div>
        <div className="text-slate-300 leading-relaxed">
          {interpretation ?? (
            <span className="text-slate-500">
              (Explain what it implies biologically: early driver vs late consequence, remodeling, compensation…)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl text-slate-100">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

/* --------------------------
   Heatmap rendering (shared controls per 3-up panel)
--------------------------- */
function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function heatColor(value: number, vmin: number, vmax: number) {
  const t = (value - vmin) / (vmax - vmin + 1e-9);
  const x = clamp(t, 0, 1);
  const neg = { r: 59, g: 130, b: 246 };
  const mid = { r: 15, g: 23, b: 42 };
  const pos = { r: 236, g: 72, b: 153 };

  if (x < 0.5) {
    const a = x / 0.5;
    const r = Math.round(lerp(neg.r, mid.r, a));
    const g = Math.round(lerp(neg.g, mid.g, a));
    const b = Math.round(lerp(neg.b, mid.b, a));
    return `rgb(${r},${g},${b})`;
  } else {
    const a = (x - 0.5) / 0.5;
    const r = Math.round(lerp(mid.r, pos.r, a));
    const g = Math.round(lerp(mid.g, pos.g, a));
    const b = Math.round(lerp(mid.b, pos.b, a));
    return `rgb(${r},${g},${b})`;
  }
}

function HeatmapLegend({ vmin, vmax }: { vmin: number; vmax: number }) {
  const steps = 9;
  const vals = Array.from({ length: steps }, (_, i) => lerp(vmin, vmax, i / (steps - 1)));
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="text-xs text-slate-400 w-16 text-right">{vmin.toFixed(2)}</div>
      <div className="flex rounded-lg overflow-hidden border border-slate-700/60">
        {vals.map((v, i) => (
          <div key={i} style={{ width: 18, height: 10, background: heatColor(v, vmin, vmax) }} />
        ))}
      </div>
      <div className="text-xs text-slate-400 w-16">{vmax.toFixed(2)}</div>

      <span className="text-xs text-slate-400">Hover to inspect • scroll both directions</span>
    </div>
  );
}

function HeatmapControls({
  rowLimit,
  setRowLimit,
  cell,
  setCell,
  safeRowOptions,
  xCount,
  yCount,
  cellMin = 14,
  cellMax = 42,
}: {
  rowLimit: number;
  setRowLimit: (n: number) => void;
  cell: number;
  setCell: (n: number) => void;
  safeRowOptions: number[];
  xCount: number;
  yCount: number;
  cellMin?: number;
  cellMax?: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-200">
        Rows shown:&nbsp;
        <select
          className="bg-transparent outline-none"
          value={rowLimit}
          onChange={(e) => setRowLimit(parseInt(e.target.value, 10))}
        >
          {safeRowOptions.map((n) => (
            <option key={n} value={n} className="bg-slate-900">
              {n}
            </option>
          ))}
        </select>
      </span>

      <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-200">
        Cell size:&nbsp;
        <input
          type="range"
          min={cellMin}
          max={cellMax}
          value={cell}
          onChange={(e) => setCell(parseInt(e.target.value, 10))}
        />
        <span className="ml-2 text-slate-300">{cell}px</span>
      </span>

      <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-200">
        X: {xCount} • Y: {yCount}
      </span>
    </div>
  );
}

function HeatmapGrid({
  data,
  title,
  valueLabel,
  rowLabel,
  cell,
  rowLimit,
  vmin,
  vmax,
  labelColWidth = 320,
}: {
  data: HeatmapJSON;
  title: React.ReactNode;
  valueLabel: string;
  rowLabel: string;
  cell: number;
  rowLimit: number;
  vmin: number;
  vmax: number;
  labelColWidth?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const xLabels = data.xLabels;
  const yLabelsAll = data.yLabels;
  const valuesAll = data.values;

  const effectiveRowLimit = clamp(rowLimit, 1, yLabelsAll.length);
  const yLabels = yLabelsAll.slice(0, effectiveRowLimit);
  const values = valuesAll.slice(0, effectiveRowLimit);

  const minGridWidth = labelColWidth + xLabels.length * cell;

  const [hover, setHover] = useState<{
    x: number;
    y: number;
    r: number;
    c: number;
    v: number;
  } | null>(null);

  return (
    <div className="max-w-full">
      <div className="text-sm text-slate-300 mb-3">{title}</div>

      {hover && (
        <div className="absolute z-20 pointer-events-none" style={{ left: hover.x + 14, top: hover.y + 14 }}>
          <div className="bg-slate-950/95 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
            <div className="text-xs text-slate-200 space-y-1">
              <div>
                <span className="text-slate-400">Y:</span>{" "}
                <span className="text-slate-100">{yLabels[hover.r]}</span>
              </div>
              <div>
                <span className="text-slate-400">X:</span>{" "}
                <span className="text-slate-100">{xLabels[hover.c]}</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-400">{valueLabel}:</span>{" "}
                <span className="text-slate-100 font-semibold">{hover.v.toFixed(3)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={wrapperRef} className="relative overflow-auto border border-slate-700/50 rounded-2xl bg-black/20">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `${labelColWidth}px repeat(${xLabels.length}, ${cell}px)`,
            minWidth: minGridWidth,
          }}
        >
          <div className="sticky left-0 z-[2] bg-slate-900/70 border-b border-slate-700/50 p-3 text-xs text-slate-300">
            {rowLabel}
          </div>

          {xLabels.map((xl) => (
            <div
              key={xl}
              className="border-b border-slate-700/50 p-3 text-[11px] text-slate-300 text-center bg-slate-900/40"
              style={{ width: cell }}
              title={xl}
            >
              {xl}
            </div>
          ))}

          {yLabels.map((yl, r) => (
            <Fragment key={`row-${yl}-${r}`}>
              <div
                className="sticky left-0 z-[1] bg-slate-900/50 border-b border-slate-800/60 p-3 text-sm text-slate-200"
                style={{ width: labelColWidth }}
                title={yl}
              >
                {yl}
              </div>

              {values[r].map((v, c) => (
                <div
                  key={`${r}-${c}`}
                  className="border-b border-slate-800/60 border-r border-slate-800/60 cursor-crosshair"
                  style={{ width: cell, height: cell, background: heatColor(v, vmin, vmax) }}
                  onMouseMove={(e) => {
                    const base = wrapperRef.current?.getBoundingClientRect();
                    if (!base) return;
                    setHover({
                      x: e.clientX - base.left,
                      y: e.clientY - base.top,
                      r,
                      c,
                      v,
                    });
                  }}
                  onMouseLeave={() => setHover(null)}
                  title={`${xLabels[c]} • ${yl} = ${v.toFixed(3)}`}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeatmapTrio({
  wt,
  ad,
  delta,
  titles,
  rowLabel,
  valueLabels,
  labelColWidth = 320,
  initialCell,
  initialRowsShown,
  rowOptions,
  cellMin,
  cellMax,
}: {
  wt: HeatmapJSON;
  ad: HeatmapJSON;
  delta: HeatmapJSON;
  titles: { wt: React.ReactNode; ad: React.ReactNode; delta: React.ReactNode };
  rowLabel: string;
  valueLabels: { wt: string; ad: string; delta: string };
  labelColWidth?: number;
  initialCell: number;
  initialRowsShown: number;
  rowOptions: number[];
  cellMin?: number;
  cellMax?: number;
}) {
  // We clamp row-limit to the minimum available rows among the 3 panels
  const availableRows = Math.min(wt.yLabels.length, ad.yLabels.length, delta.yLabels.length);
  const [cell, setCell] = useState(initialCell);
  const [rowLimitRaw, setRowLimitRaw] = useState(initialRowsShown);

  const rowLimit = clamp(rowLimitRaw, 1, availableRows);

  const safeRowOptions = useMemo(() => {
    const base = rowOptions
      .filter((n) => n >= 1)
      .filter((n) => n <= availableRows)
      .sort((a, b) => a - b);
    const set = new Set<number>(base);
    set.add(rowLimit);
    return Array.from(set).sort((a, b) => a - b);
  }, [rowOptions, availableRows, rowLimit]);

  const { vmin, vmax } = useMemo(() => {
    const slice = (hm: HeatmapJSON) => hm.values.slice(0, rowLimit).flat();
    const flat = [...slice(wt), ...slice(ad), ...slice(delta)];
    return { vmin: Math.min(...flat), vmax: Math.max(...flat) };
  }, [wt, ad, delta, rowLimit]);

  // Force “side-by-side always”: on small screens we allow horizontal scroll instead of stacking.
  return (
    <div>
      <HeatmapControls
        rowLimit={rowLimit}
        setRowLimit={setRowLimitRaw}
        cell={cell}
        setCell={setCell}
        safeRowOptions={safeRowOptions}
        xCount={wt.xLabels.length}
        yCount={availableRows}
        cellMin={cellMin}
        cellMax={cellMax}
      />

      <div className="overflow-x-auto">
        <div className="grid grid-cols-3 gap-6 min-w-[1100px]">
          <HeatmapGrid
            data={wt}
            title={titles.wt}
            valueLabel={valueLabels.wt}
            rowLabel={rowLabel}
            cell={cell}
            rowLimit={rowLimit}
            vmin={vmin}
            vmax={vmax}
            labelColWidth={labelColWidth}
          />
          <HeatmapGrid
            data={ad}
            title={titles.ad}
            valueLabel={valueLabels.ad}
            rowLabel={rowLabel}
            cell={cell}
            rowLimit={rowLimit}
            vmin={vmin}
            vmax={vmax}
            labelColWidth={labelColWidth}
          />
          <HeatmapGrid
            data={delta}
            title={titles.delta}
            valueLabel={valueLabels.delta}
            rowLabel={rowLabel}
            cell={cell}
            rowLimit={rowLimit}
            vmin={vmin}
            vmax={vmax}
            labelColWidth={labelColWidth}
          />
        </div>
      </div>

      <HeatmapLegend vmin={vmin} vmax={vmax} />
    </div>
  );
}

/* --------------------------
   PCA tooltip
--------------------------- */
function PCATooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload as PCARecord;

  return (
    <div className="bg-slate-950/95 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
      <div className="text-xs text-slate-200 space-y-1">
        <div className="text-slate-100 font-semibold">
          {p.genotype} • time {p.time}
        </div>
        <div className="text-slate-300">{p.sample_id}</div>
        <div className="pt-1">
          <span className="text-slate-400">PC1:</span>{" "}
          <span className="text-slate-100">{Number(p.PC1).toFixed(3)}</span>
        </div>
        <div>
          <span className="text-slate-400">PC2:</span>{" "}
          <span className="text-slate-100">{Number(p.PC2).toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------
   Main component
--------------------------- */
export function RQ2Temporal() {
  const base = "/data/website_rq2_temporal";

  // Helpers MUST live here (not between JSX)
  const dashForCluster = (clusterId: number) => (clusterId % 2 === 0 ? "0" : "6 6");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // Pathway heatmaps
  const [pathWT, setPathWT] = useState<HeatmapJSON | null>(null);
  const [pathAD, setPathAD] = useState<HeatmapJSON | null>(null);
  const [pathDelta, setPathDelta] = useState<HeatmapJSON | null>(null);

  // Gene heatmaps
  const [genesWT, setGenesWT] = useState<HeatmapJSON | null>(null);
  const [genesAD, setGenesAD] = useState<HeatmapJSON | null>(null);
  const [genesDelta, setGenesDelta] = useState<HeatmapJSON | null>(null);

  // PCA
  const [pcaPoints, setPcaPoints] = useState<PCARecord[] | null>(null);
  const [pcaMeta, setPcaMeta] = useState<{ explained_variance_ratio: number[] } | null>(null);

  // Clusters
  const [clusterWide, setClusterWide] = useState<ClusterWideRecord[] | null>(null);

  // Predictive
  const [logGenes, setLogGenes] = useState<CoefRecord[] | null>(null);
  const [logFuncs, setLogFuncs] = useState<CoefRecord[] | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const [wt, ad, dlt, gwt, gad, gdlt, pcaPts, pMeta, clWide, lg, lf] = await Promise.all([
          fetchJSON<HeatmapJSON>(`${base}/pathways_wt.json`),
          fetchJSON<HeatmapJSON>(`${base}/pathways_ad.json`),
          fetchJSON<HeatmapJSON>(`${base}/pathways_delta_ad_minus_wt.json`),

          fetchJSON<HeatmapJSON>(`${base}/genes_wt.json`),
          fetchJSON<HeatmapJSON>(`${base}/genes_ad.json`),
          fetchJSON<HeatmapJSON>(`${base}/genes_delta_ad_minus_wt.json`),

          fetchJSON<PCARecord[]>(`${base}/pca_points.json`),
          fetchJSON<{ explained_variance_ratio: number[] }>(`${base}/pca_meta.json`),

          fetchJSON<ClusterWideRecord[]>(`${base}/cluster_means_wide.json`),

          fetchJSON<CoefRecord[]>(`${base}/logreg_top_genes.json`),
          fetchJSON<CoefRecord[]>(`${base}/logreg_top_functions.json`),
        ]);

        if (!alive) return;

        setPathWT(wt);
        setPathAD(ad);
        setPathDelta(dlt);

        setGenesWT(gwt);
        setGenesAD(gad);
        setGenesDelta(gdlt);

        setPcaPoints(pcaPts);
        setPcaMeta(pMeta);

        setClusterWide(clWide);

        setLogGenes(lg);
        setLogFuncs(lf);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? String(e));
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // PCA split
  const pcaWT = useMemo(() => (pcaPoints ?? []).filter((d) => String(d.genotype) === "WT"), [pcaPoints]);
  const pcaAD = useMemo(() => (pcaPoints ?? []).filter((d) => String(d.genotype) === "AD"), [pcaPoints]);

  const evr = pcaMeta?.explained_variance_ratio ?? [];
  const evr1 = ((evr[0] ?? 0) * 100).toFixed(1);
  const evr2 = ((evr[1] ?? 0) * 100).toFixed(1);

  // ---- CLUSTERS: merged data WT/AD on same time points
  const mergedClusters = useMemo(() => {
    if (!clusterWide) return [];
    const wt = clusterWide.filter((d) => String(d.genotype) === "WT");
    const ad = clusterWide.filter((d) => String(d.genotype) === "AD");

    const byTimeWT = new Map<string, ClusterWideRecord>();
    wt.forEach((r) => byTimeWT.set(String(r.time), r));

    const byTimeAD = new Map<string, ClusterWideRecord>();
    ad.forEach((r) => byTimeAD.set(String(r.time), r));

    const times = Array.from(new Set([...wt.map((r) => String(r.time)), ...ad.map((r) => String(r.time))])).sort(
      (a, b) => Number(a) - Number(b)
    );

    return times.map((t) => {
      const row: any = { time: t };
      const rWT = byTimeWT.get(t);
      const rAD = byTimeAD.get(t);

      ["0", "1", "2", "3"].forEach((k) => {
        row[`WT_${k}`] = rWT ? Number((rWT as any)[k]) : null;
        row[`AD_${k}`] = rAD ? Number((rAD as any)[k]) : null;
      });

      return row;
    });
  }, [clusterWide]);

  // Predictive shorten
  const genesTop4 = useMemo(() => {
    if (!logGenes) return [];
    return [...logGenes].sort((a, b) => Math.abs(b.coef) - Math.abs(a.coef)).slice(0, 4);
  }, [logGenes]);

  const funcsTop3 = useMemo(() => {
    if (!logFuncs) return [];
    return [...logFuncs].sort((a, b) => Math.abs(b.coef) - Math.abs(a.coef)).slice(0, 3);
  }, [logFuncs]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1698913197660-cf8720ede320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
            alt="Science background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 group">
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
                <Clock className="size-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl gradient-text">Temporal Analysis</h1>
                <p className="text-slate-400 mt-2">RQ2 — energy programs over time</p>
              </div>
            </div>

            <p className="text-xl text-slate-300 max-w-3xl">
              Interactive figures (no PNGs): pathways → genes → PCA → module trajectories → predictive shortlist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Status */}
      <section className="py-8 bg-[#050814]">
        <div className="container mx-auto px-6">
          {loading && (
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 text-slate-300">
              Loading JSON files from <span className="text-slate-100">{base}</span>…
            </div>
          )}
          {err && (
            <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-6 text-slate-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="size-6 text-red-400 mt-0.5" />
                <div>
                  <div className="font-semibold text-red-300">Could not load JSON files</div>
                  <div className="text-sm text-slate-300 mt-2 break-all">{err}</div>
                  <div className="text-sm text-slate-400 mt-3">
                    Check these exist in <span className="text-slate-200">{base}</span>:
                    <br />
                    pathways_wt.json, pathways_ad.json, pathways_delta_ad_minus_wt.json
                    <br />
                    genes_wt.json, genes_ad.json, genes_delta_ad_minus_wt.json
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Key finding with scroll chips */}
      <section className="py-14 bg-[#050814]">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              <TrendingUp className="size-12 text-purple-300 flex-shrink-0" />
              <div className="space-y-3">
                <h3 className="text-2xl text-purple-200">Key finding</h3>
                <p className="text-slate-300">
                  Time is the dominant organizer, but AD doesn’t act like a constant offset. It reshapes trajectories:
                  pathway activity and gene modules follow different temporal patterns — and a small predictive shortlist
                  captures that divergence.
                </p>

                <div className="flex flex-wrap gap-2">
                  <PillButton onClick={() => scrollToId("sec-heatmaps")}>Heatmaps</PillButton>
                  <PillButton onClick={() => scrollToId("sec-pca")}>PCA</PillButton>
                  <PillButton onClick={() => scrollToId("sec-clusters")}>Clusters</PillButton>
                  <PillButton onClick={() => scrollToId("sec-predictive")}>Predictive</PillButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heatmaps */}
      <section id="sec-heatmaps" className="py-16 bg-[#050814] scroll-mt-28">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Heatmaps"
            subtitle="WT, AD, and Δ (AD − WT) are shown side-by-side for direct comparison. Controls and legend appear once per panel."
          />

          <div className="space-y-8">
            {/* Pathways */}
            {pathWT && pathAD && pathDelta && (
              <Card title="Pathway programs over time" subtitle="WT vs AD vs Δ (AD − WT), side-by-side">
                <HeatmapTrio
                  wt={pathWT}
                  ad={pathAD}
                  delta={pathDelta}
                  titles={{
                    wt: (
                      <>
                        <span className="font-semibold text-slate-100">WT</span>
                        <span className="text-slate-500"> • pathways</span>
                      </>
                    ),
                    ad: (
                      <>
                        <span className="font-semibold text-slate-100">AD</span>
                        <span className="text-slate-500"> • pathways</span>
                      </>
                    ),
                    delta: (
                      <>
                        <span className="font-semibold text-slate-100">Δ</span>
                        <span className="text-slate-500"> (AD − WT)</span>
                      </>
                    ),
                  }}
                  rowLabel="Pathway"
                  valueLabels={{ wt: "score", ad: "score", delta: "Δ score" }}
                  labelColWidth={320}
                  initialCell={34}
                  initialRowsShown={50}
                  rowOptions={[15, 25, 50, 100, 200]}
                />

                <Notes
                  observation={
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Which pathways rise/fall most strongly with time?</li>
                      <li>Do WT and AD keep the same ordering of pathway strengths across timepoints?</li>
                      <li>Where does Δ concentrate (early vs late timepoints)?</li>
                    </ul>
                  }
                  interpretation={
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Time-localized Δ hotspots suggest specific divergence windows (not a constant offset).</li>
                      <li>Flips or re-ordering across time supports temporal remodeling rather than a static shift.</li>
                    </ul>
                  }
                />
              </Card>
            )}

            {/* Genes */}
            {genesWT && genesAD && genesDelta && (
              <Card title="Gene-level patterns" subtitle="Rows are 'function | gene' • WT vs AD vs Δ, side-by-side">
                <HeatmapTrio
                  wt={genesWT}
                  ad={genesAD}
                  delta={genesDelta}
                  titles={{
                    wt: (
                      <>
                        <span className="font-semibold text-slate-100">WT</span>
                        <span className="text-slate-500"> • genes</span>
                      </>
                    ),
                    ad: (
                      <>
                        <span className="font-semibold text-slate-100">AD</span>
                        <span className="text-slate-500"> • genes</span>
                      </>
                    ),
                    delta: (
                      <>
                        <span className="font-semibold text-slate-100">Δ</span>
                        <span className="text-slate-500"> (AD − WT)</span>
                      </>
                    ),
                  }}
                  rowLabel="Function | gene"
                  valueLabels={{ wt: "score", ad: "score", delta: "Δ" }}
                  labelColWidth={360}
                  initialCell={22}
                  initialRowsShown={50}
                  // ✅ Restrict to 15–50 only
                  rowOptions={[15, 25, 50]}
                  cellMin={14}
                  cellMax={34}
                />

                <Notes
                  observation={
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Identify genes with time-specific bursts (early vs late).</li>
                      <li>Look for Δ sign flips (direction changes across time).</li>
                      <li>Do the strongest Δ genes cluster into the same functions?</li>
                    </ul>
                  }
                  interpretation={
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Early Δ shifts can suggest upstream dysregulation or compensation.</li>
                      <li>Late Δ shifts often reflect downstream consequences of progressive dysfunction.</li>
                    </ul>
                  }
                />
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* PCA */}
      <section id="sec-pca" className="py-16 bg-gradient-to-b from-[#050814] to-[#0a0e27] scroll-mt-28">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="PCA pseudobulk (energy genes)"
            subtitle="Hover points to see genotype, time, and coordinates. If AD were only a constant shift, trajectories would overlap."
          />

          <Card title="PCA (PC1 vs PC2)" subtitle={`Explained variance: PC1 ${evr1}% • PC2 ${evr2}%`}>
            <div className="w-full" style={{ height: 520, minHeight: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" dataKey="PC1" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                  <YAxis type="number" dataKey="PC2" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                  <Tooltip content={<PCATooltip />} />
                  <Legend />
                  <Scatter name="WT" data={pcaWT} fill="#10b981" />
                  <Scatter name="AD" data={pcaAD} fill="#ef4444" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <Notes
              observation="WT and AD occupy different regions; time also structures the spread."
              interpretation="AD perturbs the temporal trajectory rather than producing a constant offset in transcriptomic space."
            />
          </Card>
        </div>
      </section>

      {/* Cluster trajectories */}
      <section id="sec-clusters" className="py-16 bg-[#0a0e27] scroll-mt-28">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Cluster trajectories"
            subtitle="Two plots: clusters 0–1 and 2–3. WT vs AD shown with different colors; cluster identity uses solid vs dashed."
          />

          <div className="grid lg:grid-cols-2 gap-6 pb-10">
            <Card title="Clusters 0–1" subtitle="Color = genotype • Line style = cluster">
              <div className="w-full" style={{ height: 420, minHeight: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mergedClusters}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1220",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#e2e8f0",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="WT_0"
                      name="WT • cluster 0 (solid)"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(0)}
                    />
                    <Line
                      type="monotone"
                      dataKey="AD_0"
                      name="AD • cluster 0 (solid)"
                      stroke="#fb7185"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(0)}
                    />
                    <Line
                      type="monotone"
                      dataKey="WT_1"
                      name="WT • cluster 1 (dashed)"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(1)}
                    />
                    <Line
                      type="monotone"
                      dataKey="AD_1"
                      name="AD • cluster 1 (dashed)"
                      stroke="#fb7185"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(1)}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Clusters 2–3" subtitle="Color = genotype • Line style = cluster">
              <div className="w-full" style={{ height: 420, minHeight: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mergedClusters}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1220",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#e2e8f0",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="WT_2"
                      name="WT • cluster 2 (solid)"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(0)}
                    />
                    <Line
                      type="monotone"
                      dataKey="AD_2"
                      name="AD • cluster 2 (solid)"
                      stroke="#fb7185"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(0)}
                    />
                    <Line
                      type="monotone"
                      dataKey="WT_3"
                      name="WT • cluster 3 (dashed)"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(1)}
                    />
                    <Line
                      type="monotone"
                      dataKey="AD_3"
                      name="AD • cluster 3 (dashed)"
                      stroke="#fb7185"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(1)}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="bg-slate-800/20 border border-slate-700/40 rounded-2xl p-6">
            <Notes
              observation="Within each cluster, WT and AD trajectories diverge across timepoints, and the magnitude of divergence differs by cluster."
              interpretation="Genotype-dependent temporal remodeling: AD affects module dynamics in a cluster-specific way rather than applying one global shift to all programs."
            />
          </div>
        </div>
      </section>

      {/* Predictive */}
      <section id="sec-predictive" className="py-16 mt-10 bg-gradient-to-b from-[#0a0e27] to-[#050814] scroll-mt-28">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Predictive shortlist"
            subtitle="We keep only the non-trivial coefficients (here: top 4 genes, top 3 functions)."
          />

          <div className="grid lg:grid-cols-2 gap-6">
            <Card title="Top genes (top 4)" subtitle="+coef → AD • −coef → WT">
              <div className="w-full" style={{ height: 360, minHeight: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genesTop4} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} width={110} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1220",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#e2e8f0",
                      }}
                      formatter={(v: any) => [Number(v).toFixed(4), "coef"]}
                    />
                    <Bar dataKey="coef" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Notes
                observation="Only a few genes keep non-zero weights after L1 shrinkage."
                interpretation={
                  <div className="space-y-3">
                    <p>
                      Positive coefficients indicate features pushing the model toward AD, negative toward WT. With an L1
                      penalty, most coefficients shrink to ~0; what survives is a compact shortlist that’s easy to
                      interpret and justify.
                    </p>
                    <p>
                      Practically, these few surviving genes are the highest-leverage candidates for follow-up (they’re
                      not “the whole story”, but they are the most predictive in this modeling setup).
                    </p>
                  </div>
                }
              />
            </Card>

            <Card title="Top functions (top 3)" subtitle="Headline biology: what changes, not just which genes">
              <div className="w-full" style={{ height: 360, minHeight: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funcsTop3} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} width={190} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1220",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#e2e8f0",
                      }}
                      formatter={(v: any) => [Number(v).toFixed(4), "coef"]}
                    />
                    <Bar dataKey="coef" fill="#a855f7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Notes
                observation="A small set of functions capture most of the predictive signal (others are ~0)."
                interpretation="Function-level summaries are often more stable and biologically interpretable than single genes."
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-2xl text-slate-100 mb-3">Conclusion</h3>
            <p className="text-slate-300 leading-relaxed">
              We made temporal structure visible at multiple resolutions: pathway programs, gene-level patterns, global
              trajectory (PCA), module dynamics (clusters), and an interpretable predictive shortlist. Together, they
              support the idea that AD changes not just “how much” energy programs are expressed, but “when” and “in what
              pattern”.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
