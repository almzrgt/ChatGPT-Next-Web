"use client";

import { useState } from "react";
import styles from "./prospect-dashboard.module.scss";

type IconName =
  | "grid" | "users" | "portrait" | "target" | "route" | "chart" | "shield"
  | "bell" | "search" | "plus" | "upload" | "mic" | "arrow" | "pin"
  | "briefcase" | "heart" | "wallet" | "home" | "spark" | "check";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    portrait: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="M18 5l2-2m-1 5h3"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    route: <><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h3a4 4 0 0 0 4-4v-6a4 4 0 0 1 3-4"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>, upload: <><path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M5 15v5h14v-5"/></>,
    mic: <><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5"/></>,
    arrow: <><path d="M5 12h14m-5-5 5 5-5 5"/></>, pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
    wallet: <><path d="M3 6h16a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V6Z"/><path d="M3 6a3 3 0 0 1 3-3h12v3M16 12h5"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
    spark: <><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>;
}

const nav = [
  ["grid", "工作台"], ["users", "客户库"], ["portrait", "客户画像"],
  ["target", "潜客发现"], ["route", "开发策略"], ["chart", "数据洞察"],
] as const;

export function ProspectDashboard() {
  const [active, setActive] = useState("工作台");
  const [modal, setModal] = useState<"import" | "voice" | null>(null);
  const [toast, setToast] = useState("");
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2200); };

  return <main className={styles.app}>
    <aside className={styles.sidebar}>
      <div className={styles.brand}><span className={styles.logo}><Icon name="spark" size={22}/></span><span>拓客智图</span></div>
      <div className={styles.workspace}><span className={styles.avatar}>远</span><span><small>当前团队</small><b>远航保险 · 华东区</b></span><span>⌄</span></div>
      <nav>{nav.map(([icon, label]) => <button key={label} className={active === label ? styles.active : ""} onClick={() => {setActive(label); notify(`已切换至${label}`)}}><Icon name={icon}/><span>{label}</span>{label === "潜客发现" && <em>12</em>}</button>)}</nav>
      <div className={styles.sideBottom}>
        <div className={styles.privacy}><Icon name="shield"/><div><b>数据安全中心</b><small>敏感信息已加密</small></div><span>›</span></div>
        <div className={styles.profile}><span className={styles.head}>林</span><div><b>林远</b><small>高级业务经理</small></div><button>•••</button></div>
      </div>
    </aside>

    <section className={styles.content}>
      <header><div className={styles.search}><Icon name="search" size={18}/><input placeholder="搜索客户、画像或策略…"/><kbd>⌘ K</kbd></div><button className={styles.iconButton}><Icon name="bell" size={19}/><i/></button><button className={styles.help}>帮助与反馈</button></header>
      <div className={styles.body}>
        <div className={styles.welcome}><div><p>星期三，9月2日</p><h1>早上好，林远 👋</h1><span>今天有 <b>4 项</b> 客户跟进任务，AI 为你发现了 <b>12 位</b> 高匹配潜客。</span></div><button className={styles.primary} onClick={() => setModal("import")}><Icon name="plus" size={18}/> 导入客户数据</button></div>

        <section className={styles.hero}>
          <div className={styles.heroCopy}><span className={styles.aiTag}><Icon name="spark" size={14}/> AI 智能拓客引擎</span><h2>从已有客户，发现下一个<br/><strong>高价值机会</strong></h2><p>融合客户画像与行为洞察，智能推演潜客群体、触达场景与最优开发路径。</p><div className={styles.heroActions}><button onClick={() => setModal("import")}><Icon name="upload"/> 导入历史客户</button><button onClick={() => setModal("voice")}><Icon name="mic"/> 语音描述客户</button></div><small><Icon name="shield" size={13}/> 信息仅用于画像分析，联系方式不会被采集</small></div>
          <div className={styles.orbit} aria-hidden><div className={styles.orbitRing}/><span className={styles.person}>林</span><span className={styles.node + " " + styles.n1}><Icon name="briefcase" size={16}/></span><span className={styles.node + " " + styles.n2}><Icon name="heart" size={16}/></span><span className={styles.node + " " + styles.n3}><Icon name="home" size={16}/></span><span className={styles.node + " " + styles.n4}><Icon name="wallet" size={16}/></span><span className={styles.data + " " + styles.d1}>企业主</span><span className={styles.data + " " + styles.d2}>网球 · 品酒</span><span className={styles.data + " " + styles.d3}>年收入 80W+</span></div>
        </section>

        <div className={styles.sectionTitle}><div><h3>今日业务概览</h3><p>数据更新于今天 09:32</p></div><button onClick={() => notify("数据已刷新")}>刷新数据 ↻</button></div>
        <div className={styles.stats}>
          <article><span className={styles.statIcon}><Icon name="target"/></span><div><small>高匹配潜客</small><b>12 <i>+3</i></b><p>较上周同期</p></div><span className={styles.miniChart}>╱╲╱╲╱</span></article>
          <article><span className={styles.statIcon}><Icon name="users"/></span><div><small>本月新增客户</small><b>28</b><p><i>↑ 18.6%</i> 环比上月</p></div></article>
          <article><span className={styles.statIcon}><Icon name="route"/></span><div><small>进行中开发计划</small><b>7</b><p>3 项需今日跟进</p></div><span className={styles.progress}>43%</span></article>
          <article><span className={styles.statIcon}><Icon name="chart"/></span><div><small>预计转化价值</small><b>¥ 86.4万</b><p><i>↑ 12.3%</i> 本月预测</p></div></article>
        </div>

        <div className={styles.grid}>
          <section className={styles.card}><div className={styles.cardHeader}><div><h3>优先潜客推荐</h3><p>基于 36 位高价值客户特征推演</p></div><button onClick={() => {setActive("潜客发现"); notify("正在查看全部潜客")}}>查看全部 <Icon name="arrow" size={15}/></button></div>
            {[
              ["92%", "城市新中产家庭", "32–42岁 · 已婚育儿 · 企业中层", "教育规划", "家庭保障", "品质生活", "高端亲子机构 · 国际学校周边"],
              ["87%", "稳健型民营企业主", "40–52岁 · 制造/贸易 · 年收百万+", "资产配置", "企业传承", "商会活动", "行业协会 · 高端球类俱乐部"],
              ["81%", "高知自由职业者", "28–38岁 · 一线城市 · 收入波动", "健康管理", "灵活储蓄", "自我提升", "联合办公 · 精品咖啡空间"],
            ].map((x, i) => <div className={styles.lead} key={x[1]}><div className={styles.score}><b>{x[0]}</b><span>匹配度</span></div><div className={styles.leadMain}><h4>{x[1]} {i === 0 && <em>优先跟进</em>}</h4><p>{x[2]}</p><div>{x.slice(3, 6).map(t => <span key={t}>{t}</span>)}</div><small><Icon name="pin" size={14}/>{x[6]}</small></div><button aria-label="查看详情" onClick={() => notify(`已打开「${x[1]}」画像`)}>›</button></div>)}
          </section>
          <aside className={styles.rightCol}>
            <section className={styles.card}><div className={styles.cardHeader}><div><h3>今日行动建议</h3><p>AI 已按优先级排序</p></div><span className={styles.date}>9月2日</span></div>
              {[["09:30", "联系 3 位企业主潜客", "商会活动后 48 小时是黄金窗口"], ["14:00", "回访周女士家庭保障方案", "重点回应子女教育金灵活性"], ["17:30", "参加滨江网球俱乐部活动", "预计可触达 6 位高匹配潜客"]].map((x,i)=><div className={styles.task} key={x[0]}><button className={i === 0 ? styles.done : ""} onClick={(e) => {e.currentTarget.classList.toggle(styles.done); notify("任务状态已更新")}}><Icon name="check" size={13}/></button><time>{x[0]}</time><div><b>{x[1]}</b><small>{x[2]}</small></div></div>)}
              <button className={styles.plan} onClick={() => notify("正在生成今日开发计划…")}><Icon name="spark" size={16}/> 生成今日完整开发计划</button>
            </section>
            <section className={styles.insight}><span><Icon name="spark"/></span><div><small>本周洞察</small><h4>亲子教育场景的触达效率提升 23%</h4><button onClick={() => notify("已打开洞察详情")}>查看洞察 <Icon name="arrow" size={14}/></button></div></section>
          </aside>
        </div>
      </div>
    </section>

    {modal && <div className={styles.overlay} onMouseDown={() => setModal(null)}><div className={styles.modal} onMouseDown={e => e.stopPropagation()}><button className={styles.close} onClick={() => setModal(null)}>×</button>{modal === "import" ? <><span className={styles.modalIcon}><Icon name="upload"/></span><h2>导入历史客户数据</h2><p>支持 Excel、CSV 文件。系统将自动忽略姓名与联系方式，仅提取合规画像信息。</p><label className={styles.drop}><Icon name="upload" size={28}/><b>拖拽文件到这里，或点击选择</b><small>单个文件不超过 20MB</small><input type="file" accept=".csv,.xlsx,.xls" onChange={() => {setModal(null); notify("数据已安全导入，正在生成画像")}}/></label></> : <><span className={styles.modalIcon}><Icon name="mic"/></span><h2>语音描述客户</h2><p>请描述客户的职业、兴趣、家庭结构、投资偏好等，请勿说出姓名或联系方式。</p><button className={styles.record} onClick={() => {setModal(null); notify("语音记录已保存，正在分析")}}><Icon name="mic" size={28}/><span>点击开始录音</span></button></>}</div></div>}
    {toast && <div className={styles.toast}><Icon name="check" size={16}/>{toast}</div>}
  </main>;
}
