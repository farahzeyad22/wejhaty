"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { qubaReviews, qubaReviewStats } from "../quba-data";

const categories = ["الكل","الأماكن","المطاعم","المقاهي","المحلات","أماكن الجلوس","المواقف"];

export default function QubaPage() {
  const [category,setCategory]=useState("الكل");
  const [query,setQuery]=useState("");
  const filtered=useMemo(()=>qubaReviews.filter(r=>{
    const cat=category==="الكل" || (r.categories as readonly string[]).includes(category);
    const q=query.trim().toLowerCase();
    return cat && (!q || r.message.toLowerCase().includes(q) || r.name.toLowerCase().includes(q));
  }),[category,query]);
  return <main dir="rtl" className="quba-page">
    <style>{`
      .quba-page{min-height:100vh;background:#f8f4ec;color:#3f3941;padding:0 0 70px;font-family:inherit}
      .quba-frame{position:relative;min-height:100vh;background:#704486;padding:18px}
      .quba-edge{position:absolute;inset:0;pointer-events:none;opacity:.78;background:url("/roshan-border.svg") repeat;background-size:72px 72px}
      .quba-shell{position:relative;z-index:1;background:#fffdf8;min-height:calc(100vh - 36px);border-radius:18px;overflow:hidden}
      .quba-topbar{min-height:82px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:12px 28px;border-bottom:1px solid #ded3c4;background:#fffdf9}
      .quba-brand{display:flex;align-items:center;gap:12px;color:#3f3941;text-decoration:none}
      .quba-brand-mark{width:48px;height:48px;border:1px solid #d4b9d9;border-radius:12px;background:#f0e5f2;display:grid;place-items:center}
      .quba-brand-mark svg{width:31px;height:31px;stroke:#80618a;stroke-width:1.7}
      .quba-brand-copy{display:grid;line-height:1.05}
      .quba-brand-copy strong{font-size:21px;font-weight:850}
      .quba-brand-copy span{font-size:12px;color:#80618a;margin-top:5px}
      .quba-nav{display:flex;align-items:center;gap:22px;margin-right:auto}
      .quba-nav a{color:#6e626d;text-decoration:none;font-size:12px;font-weight:700}
      .quba-nav a.active{color:#60456a;border-bottom:2px solid #80618a;padding-bottom:8px}
      .quba-back{border:1px solid #d7c8b7;border-radius:12px;padding:10px 14px;text-decoration:none;color:#604f5e;background:#fff}
      .quba-content{max-width:1180px;margin:auto;padding:28px 34px 50px}
      .quba-hero{background:#eee4f3;color:#493b4d;border-radius:24px;padding:34px;display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,420px);align-items:center;gap:28px;box-shadow:0 10px 30px rgb(80 51 91 / 6%)}
      .quba-kicker{color:#80618a;font-size:13px;font-weight:700}
      .quba-hero h1{font-size:clamp(34px,5vw,64px);margin:4px 0 0;color:#493b4d;letter-spacing:-1px}
      .quba-hero-copy{display:grid;gap:14px}.quba-hero p{max-width:760px;line-height:1.9;margin:0;color:#6f6471}.quba-summary{border:1px solid #d8c7df;border-radius:20px;background:#fffafc;padding:18px 18px 16px}.quba-summary-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;font-size:13px}.quba-summary-title small{color:#9a8b9c;font-size:10px}.quba-bars{display:grid;gap:10px}.quba-bar-row{display:grid;grid-template-columns:78px 1fr 34px;align-items:center;gap:8px;font-size:10px}.quba-bar-track{height:7px;border-radius:999px;background:#eadff0;overflow:hidden}.quba-bar-fill{height:100%;border-radius:999px;background:#8a6692}.quba-bar-count{text-align:left;color:#766879;font-size:10px}
      .quba-stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}.quba-stat{background:#fff;border:1px solid #ded2e2;border-radius:14px;padding:11px 15px;color:#66596a}
      .quba-toolbar{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}.quba-search{flex:1;min-width:240px;border:1px solid #d8cdbf;border-radius:14px;padding:14px 16px;background:#fff;font:inherit}.quba-chip{border:1px solid #d8cdbf;background:#fff;border-radius:999px;padding:11px 15px;font:inherit;cursor:pointer;color:#66596a}.quba-chip.active{background:#80618a;color:#fff;border-color:#80618a}
      .quba-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.quba-card{background:#fff;border:1px solid #e1d8cf;border-radius:20px;padding:20px;box-shadow:0 8px 25px rgb(80 51 91 / 5%)}.quba-card-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.quba-name{font-weight:800}.quba-date{font-size:12px;color:#888}.quba-stars{color:#80618a;letter-spacing:2px;white-space:nowrap}.quba-message{line-height:1.9;margin:15px 0 13px;white-space:pre-wrap}.quba-tags{display:flex;flex-wrap:wrap;gap:6px}.quba-tag{font-size:11px;background:#f1e8f3;color:#6b596f;padding:5px 9px;border-radius:999px}.quba-empty{text-align:center;padding:50px;background:#fff;border-radius:20px}
      @media(max-width:850px){.quba-content{padding:18px 14px 40px}.quba-hero{grid-template-columns:1fr;padding:24px 20px}.quba-nav{display:none}.quba-topbar{padding:10px 14px}.quba-brand-copy strong{font-size:18px}.quba-brand-mark{width:42px;height:42px}.quba-back{font-size:11px;padding:9px 11px}.quba-hero h1{font-size:38px}.quba-hero p{font-size:12px}.quba-summary{padding:15px}.quba-bar-row{grid-template-columns:70px 1fr 30px}}
    `}</style>
    <div className="quba-frame">
      <div className="quba-edge" aria-hidden="true" />
      <div className="quba-shell">
        <header className="quba-topbar">
          <Link className="quba-brand" href="/" aria-label="وجهتك">
            <span className="quba-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none"><path d="M24 3 45 24 24 45 3 24 24 3Z"/><path d="m24 10 14 14-14 14-14-14 14-14Z"/><path d="M24 10v28M10 24h28M14 14l20 20m0-20L14 34"/></svg>
            </span>
            <span className="quba-brand-copy"><strong>وجهتك</strong><span>وش قالوا عن</span></span>
          </Link>
          <nav className="quba-nav"><Link className="active" href="/">الرئيسية</Link><Link href="/">استكشف</Link></nav>
          <Link className="quba-back" href="/">العودة للرئيسية</Link>
        </header>
        <div className="quba-content">
          <section className="quba-hero">
        <div className="quba-hero-copy">
          <span className="quba-kicker">المدينة المنورة · مقصد قباء</span>
          <h1>مقصد قباء</h1>
          <p>تجارب الزوار كما كُتبت، مع تصنيف المراجعة حسب الموضوع. المراجعة تبقى بنصها الأصلي، ويمكن أن تظهر في أكثر من تصنيف عند ارتباطها بأكثر من جانب.</p>
          <div className="quba-stats"><span className="quba-stat"><b>{qubaReviewStats.writtenReviews}</b> مراجعة مكتوبة</span><span className="quba-stat"><b>{qubaReviewStats.totalRatings}</b> تقييم إجمالي</span><span className="quba-stat"><b>{Object.keys(qubaReviewStats.categoryCounts).length}</b> تركيبة تصنيف</span></div>
        </div>
        <aside className="quba-summary" aria-label="ملخص تصنيفات تجارب الزوار">
          <div className="quba-summary-title"><strong>ملخص تجارب الزوار</strong><small>حسب التصنيف</small></div>
          <div className="quba-bars">
            {Object.entries(qubaReviewStats.categoryCounts).map(([name,count])=>{
              const max=Math.max(...Object.values(qubaReviewStats.categoryCounts));
              const width=Math.max(8,Math.round((count/max)*100));
              return <div className="quba-bar-row" key={name}><span>{name}</span><div className="quba-bar-track"><div className="quba-bar-fill" style={{width:width + "%"}} /></div><span className="quba-bar-count">{count}</span></div>;
            })}
          </div>
        </aside>
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
      </div>
    </div>
  </main>;
}
