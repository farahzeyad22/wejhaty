"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { qubaReviews, qubaReviewStats } from "../quba-data";

const categories = ["الكل","الأماكن","المطاعم","المقاهي","المحلات","أماكن الجلوس","المواقف"];

export default function QubaPage() {
  const [category,setCategory]=useState("الكل");
  const [query,setQuery]=useState("");
  const filtered=useMemo(()=>qubaReviews.filter(r=>{
    const cat=category==="الكل" || r.categories.includes(category);
    const q=query.trim().toLowerCase();
    return cat && (!q || r.message.toLowerCase().includes(q) || r.name.toLowerCase().includes(q));
  }),[category,query]);
  return <main dir="rtl" className="quba-page">
    <style>{`
      .quba-page{min-height:100vh;background:#f5f1e8;color:#25251f;padding:32px 5vw 70px;font-family:inherit}
      .quba-wrap{max-width:1200px;margin:auto}
      .quba-top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:34px}
      .quba-brand{font-size:18px;font-weight:800;color:inherit;text-decoration:none}
      .quba-back{padding:10px 15px;border:1px solid #cfc8b9;border-radius:999px;text-decoration:none;color:inherit;background:#fff}
      .quba-hero{background:#27271f;color:#fff;border-radius:28px;padding:42px;display:grid;gap:18px;box-shadow:0 18px 50px #0001}
      .quba-kicker{opacity:.7;font-size:13px}
      .quba-hero h1{font-size:clamp(34px,5vw,64px);margin:0;letter-spacing:-1px}
      .quba-hero p{max-width:760px;line-height:1.9;margin:0;color:#ddd9cf}
      .quba-stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
      .quba-stat{background:#ffffff12;border:1px solid #ffffff20;border-radius:14px;padding:11px 15px}
      .quba-toolbar{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}
      .quba-search{flex:1;min-width:240px;border:1px solid #d8d0c1;border-radius:14px;padding:14px 16px;background:#fff;font:inherit}
      .quba-chip{border:1px solid #d8d0c1;background:#fff;border-radius:999px;padding:11px 15px;font:inherit;cursor:pointer}
      .quba-chip.active{background:#27271f;color:#fff;border-color:#27271f}
      .quba-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
      .quba-card{background:#fff;border:1px solid #e1dbcf;border-radius:20px;padding:20px;box-shadow:0 8px 25px #00000008}
      .quba-card-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
      .quba-name{font-weight:800}.quba-date{font-size:12px;color:#888}
      .quba-stars{color:#9a8b59;letter-spacing:2px;white-space:nowrap}
      .quba-message{line-height:1.9;margin:15px 0 13px;white-space:pre-wrap}
      .quba-tags{display:flex;flex-wrap:wrap;gap:6px}.quba-tag{font-size:11px;background:#f1ede4;padding:5px 9px;border-radius:999px}
      .quba-empty{text-align:center;padding:50px;background:#fff;border-radius:20px}
      @media(max-width:700px){.quba-page{padding:20px 16px 50px}.quba-hero{padding:28px 22px}.quba-top{align-items:flex-start}}
    `}</style>
    <div className="quba-wrap">
      <div className="quba-top"><Link className="quba-brand" href="/">وجهتك | من الداخل</Link><Link className="quba-back" href="/">العودة للمنطقة المركزية</Link></div>
      <section className="quba-hero">
        <span className="quba-kicker">المدينة المنورة · مقصد قباء</span>
        <h1>مقصد قباء</h1>
        <p>تجارب الزوار كما كُتبت، مع تصنيف المراجعة حسب الموضوع. المراجعة تبقى بنصها الأصلي، ويمكن أن تظهر في أكثر من تصنيف عند ارتباطها بأكثر من جانب.</p>
        <div className="quba-stats"><span className="quba-stat"><b>{qubaReviewStats.writtenReviews}</b> مراجعة مكتوبة</span><span className="quba-stat"><b>{qubaReviewStats.totalRatings}</b> تقييم إجمالي</span><span className="quba-stat"><b>{Object.keys(qubaReviewStats.categoryCounts).length}</b> تركيبة تصنيف</span></div>
      </section>
      <div className="quba-toolbar">
        <input className="quba-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث داخل تجارب الزوار..." />
        {categories.map(c=><button key={c} className={`quba-chip ${category===c?"active":""}`} onClick={()=>setCategory(c)}>{c}</button>)}
      </div>
      <div className="quba-grid">
        {filtered.map((r,i)=><article className="quba-card" key={`${r.name}-${i}`}>
          <div className="quba-card-head"><div><div className="quba-name">{r.name}</div><div className="quba-date">{r.date}</div></div><div className="quba-stars">{"★".repeat(r.rating)}<span style={{opacity:.2}}>{"★".repeat(5-r.rating)}</span></div></div>
          <p className="quba-message">{r.message}</p>
          <div className="quba-tags">{r.categories.map(c=><span className="quba-tag" key={c}>{c}</span>)}</div>
        </article>)}
      </div>
      {!filtered.length && <div className="quba-empty">لا توجد مراجعات مطابقة.</div>}
    </div>
  </main>;
}
