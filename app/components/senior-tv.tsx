"use client";

import { useEffect, useState } from "react";
import styles from "./senior-tv.module.scss";

type IconProps = {
  name: "tv" | "mic" | "home" | "heart" | "settings" | "volume" | "check";
};

function Icon({ name }: IconProps) {
  const paths = {
    tv: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="3" />
        <path d="m8 3 4 3 4-3M8 22h8" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    heart: (
      <path d="M20.8 5.7c-2-2.1-5.2-1.8-7 .3L12 8l-1.8-2c-1.8-2.1-5-2.4-7-.3-2 2-1.8 5.3.2 7.3L12 21l8.6-8c2-2 2.2-5.3.2-7.3Z" />
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    volume: (
      <>
        <path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z" />
        <path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Companion({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`${styles.companion} ${small ? styles.small : ""}`}
      aria-label="卡通伙伴小乐"
    >
      <span className={styles.earLeft} />
      <span className={styles.earRight} />
      <div className={styles.hair}>
        <i />
        <i />
        <i />
      </div>
      <div className={styles.face}>
        <span className={styles.browLeft} />
        <span className={styles.browRight} />
        <span className={styles.eyeLeft} />
        <span className={styles.eyeRight} />
        <span className={styles.nose} />
        <span className={styles.smile} />
        <span className={styles.cheekLeft} />
        <span className={styles.cheekRight} />
      </div>
      <div className={styles.body}>
        <span className={styles.badge}>乐</span>
      </div>
      <span className={styles.armLeft} />
      <span className={styles.armRight} />
    </div>
  );
}

export function SeniorTvApp() {
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("小乐");
  const [gender, setGender] = useState("女孩");
  const [voice, setVoice] = useState("温柔亲切");
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("王阿姨，下午好！今天想看点什么呀？");

  useEffect(() => {
    const saved = window.localStorage.getItem("leban-ready");
    if (saved) setReady(true);
  }, []);

  function finishSetup() {
    window.localStorage.setItem("leban-ready", "1");
    setReady(true);
  }

  function listen() {
    if (listening) return;
    setListening(true);
    setMessage("我在听，您慢慢说……");
    window.setTimeout(() => {
      setListening(false);
      setMessage("为您找到了《父母爱情》，是这个吗？");
    }, 1800);
  }

  if (!ready) {
    return (
      <main className={styles.setupShell}>
        <header className={styles.setupHeader}>
          <div className={styles.brand}>
            <span>
              <Icon name="tv" />
            </span>
            <div>
              <strong>乐伴</strong>
              <small>陪您安心看电视</small>
            </div>
          </div>
          <div className={styles.tvStatus}>
            <i /> 已连接客厅电视
          </div>
        </header>
        <section className={styles.setupCard}>
          <div className={styles.characterPanel}>
            <div className={styles.sparkles}>
              <i>✦</i>
              <i>✦</i>
              <i>●</i>
            </div>
            <div className={styles.hello}>您好呀！</div>
            <Companion />
            <div className={styles.syncPill}>
              <span>
                <Icon name="check" />
              </span>{" "}
              已同步显示在电视上
            </div>
          </div>
          <div className={styles.formPanel}>
            <div className={styles.step}>初次见面 · 认识一下</div>
            <h1>
              给您的新伙伴
              <br />
              取个喜欢的名字吧
            </h1>
            <p className={styles.lead}>
              以后喊一声名字，TA 就会马上来到您身边。
            </p>
            <label className={styles.fieldLabel} htmlFor="name">
              伙伴姓名
            </label>
            <div className={styles.nameField}>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>点击修改</span>
            </div>
            <div className={styles.twoCols}>
              <div>
                <span className={styles.fieldLabel}>伙伴性别</span>
                <div className={styles.segment}>
                  {["女孩", "男孩"].map((item) => (
                    <button
                      key={item}
                      className={gender === item ? styles.selected : ""}
                      onClick={() => setGender(item)}
                    >
                      {item === "女孩" ? "👧" : "👦"} {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className={styles.fieldLabel}>说话声音</span>
                <div className={styles.segment}>
                  {["温柔亲切", "清晰响亮"].map((item) => (
                    <button
                      key={item}
                      className={voice === item ? styles.selected : ""}
                      onClick={() => setVoice(item)}
                    >
                      <Icon name="volume" /> {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className={styles.startButton} onClick={finishSetup}>
              就叫你“{name || "小乐"}”吧 <span>→</span>
            </button>
            <p className={styles.hint}>
              <Icon name="mic" /> 以后这些设置，都可以直接告诉 {name || "小乐"}{" "}
              来修改
            </p>
          </div>
        </section>
        <footer className={styles.setupFooter}>
          <span>大字清晰</span>
          <span>全程语音</span>
          <span>家人可协助设置</span>
        </footer>
      </main>
    );
  }

  const choices = [
    ["📺", "看电视台", "央视、卫视、地方台"],
    ["🎞️", "找电影电视剧", "说片名、演员都可以"],
    ["🕘", "接着上次看", "父母爱情 · 第18集"],
  ];
  return (
    <main className={styles.appShell}>
      <header className={styles.appHeader}>
        <div className={styles.brand}>
          <span>
            <Icon name="tv" />
          </span>
          <div>
            <strong>乐伴</strong>
            <small>陪您安心看电视</small>
          </div>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.tvStatus}>
            <i /> 客厅电视已连接
          </span>
          <button
            onClick={() => {
              window.localStorage.removeItem("leban-ready");
              setReady(false);
            }}
          >
            <Icon name="settings" /> 设置
          </button>
        </div>
      </header>
      <section className={styles.hero}>
        <div className={styles.avatarWrap}>
          <Companion small />
          <span className={styles.online}>在线</span>
        </div>
        <div className={styles.conversation}>
          <span>{name}</span>
          <h1>{message}</h1>
          <p>您可以说电视台、节目名、演员名，我都能帮您找。</p>
        </div>
      </section>
      <section className={styles.choiceGrid}>
        {choices.map(([emoji, title, desc]) => (
          <button
            key={title}
            onClick={() =>
              setMessage(
                title === "接着上次看"
                  ? "好的，为您继续播放《父母爱情》第18集。"
                  : `您想${title}，告诉我具体名字吧。`,
              )
            }
          >
            <span>{emoji}</span>
            <div>
              <strong>{title}</strong>
              <small>{desc}</small>
            </div>
            <b>›</b>
          </button>
        ))}
      </section>
      <button
        className={`${styles.micButton} ${listening ? styles.listening : ""}`}
        onClick={listen}
      >
        <span>
          <Icon name="mic" />
        </span>
        <div>
          <strong>
            {listening ? "正在听您说…" : `按住说话，或喊“${name}”`}
          </strong>
          <small>
            {listening ? "说完后请稍等一下" : "也可以咳嗽一声唤醒我"}
          </small>
        </div>
      </button>
      <div className={styles.careNote}>
        <Icon name="heart" />
        <span>
          <strong>关怀守护已开启</strong> · {name}{" "}
          会留意您的状态，发现不舒服会主动询问
        </span>
      </div>
      <nav className={styles.nav}>
        <button className={styles.active}>
          <Icon name="home" />
          首页
        </button>
        <button>
          <Icon name="tv" />
          遥控器
        </button>
        <button>
          <Icon name="heart" />
          健康关怀
        </button>
        <button>
          <Icon name="settings" />
          设置
        </button>
      </nav>
    </main>
  );
}
