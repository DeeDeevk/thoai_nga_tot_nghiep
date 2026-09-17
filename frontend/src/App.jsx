import { useEffect, useState } from "react";

const HeartIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 20.2s-7.6-4.6-10-9.3C.4 7.6 2.4 4 6 4c2.1 0 3.6 1.1 4.5 2.4L12 8.1l1.5-1.7C14.4 5.1 15.9 4 18 4c3.6 0 5.6 3.6 4 6.9-2.4 4.7-10 9.3-10 9.3z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 2.5l2.7 6.4 6.9.6-5.3 4.5 1.7 6.8L12 17l-6 3.8 1.7-6.8-5.3-4.5 6.9-.6L12 2.5z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const AlarmIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M12 9v4l2.6 1.6M4.5 4.5l2.3 2.3M19.5 4.5l-2.3 2.3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const CrownIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 17l1.6-9L9 12l3-7 3 7 3.4-4L20 17H4z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M4 19.5h16"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M6.6 3.5l3 3-1.8 2.4a12 12 0 005.3 5.3l2.4-1.8 3 3-1.5 2.1a2.3 2.3 0 01-2.3.9 17.4 17.4 0 01-11-11 2.3 2.3 0 01.9-2.4l2-1.5z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowHeartIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M11 19.5s-6.6-4-8.7-8.1C.5 8.1 2.2 5 5.3 5c1.8 0 3.1 1 3.9 2.1L11 9l1.3-1.9C13.1 6 14.4 5 16.2 5c1.6 0 2.9.8 3.6 2"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M3 21L21 3M21 3h-6.5M21 3v6.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparkleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const ATTENDANCE_OPTIONS = [
  "Tất nhiên, cục dàng sẽ không bỏ lỡ đâu!",
  "Không, không thể không đi :'>>",
  "Đùa, quăng lại cái lí do cho toiiii",
];

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbw0E7nAFY_MJYLPSUq7iix7Fi7-nIhf1aDmZQ7cOjdA5131bdwOchtFRD_pdgycHMyN/exec";

const RsvpFormPage = ({ defaultName, onBack }) => {
  const [name, setName] = useState(defaultName || "");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !attendance) return;
    setStatus("sending");
    try {
      if (GOOGLE_SHEET_URL) {
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            name: name.trim(),
            attendance,
            message: message.trim(),
          }),
        });
      }
    } finally {
      setStatus("done");
    }
  };

  return (
    <div className="rsvp-page">
      <button
        className="invitation-page-back"
        type="button"
        aria-label="Quay lại"
        onClick={onBack}
      >
        ×
      </button>

      <h1 className="rsvp-cursive-title">Graduation</h1>

      <section className="rsvp-card">
        {status === "done" ? (
          <>
            <h2 className="rsvp-heading">Cảm ơn cục dàng!</h2>
            <p className="rsvp-thanks-note">
              Mình đã nhận được câu trả lời của bạn rồi nè, hẹn gặp lại ở lễ
              tốt nghiệp nha!
            </p>
          </>
        ) : (
          <>
            <h2 className="rsvp-heading">Thoại Nga Tốt nghiệp!!!</h2>
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <label className="rsvp-label" htmlFor="rsvp-name">
                Tên của cục dàng !!!
              </label>
              <input
                id="rsvp-name"
                className="rsvp-input"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <p className="rsvp-question">
                Đến chúc mừng tnga thoát khỏi tư bản nhóe ?
                <br />
                (để biết còn chửn bị quà đáp lễ cho cục dàng nựa đó)
              </p>
              <div className="rsvp-options" role="radiogroup">
                {ATTENDANCE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={attendance === option}
                    className={
                      "rsvp-option" +
                      (attendance === option ? " rsvp-option--selected" : "")
                    }
                    onClick={() => setAttendance(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <label className="rsvp-label" htmlFor="rsvp-message">
                Có gì muốn nói với tuôi hum, lời chúc hay ấn tượng lần đầu gặp
                tuôi chẳng hạn hihii
              </label>
              <input
                id="rsvp-message"
                className="rsvp-input"
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />

              <button
                className="rsvp-submit"
                type="submit"
                disabled={status === "sending" || !attendance}
              >
                {status === "sending" ? "Đang gửi..." : "Xác nhận tham dự ngay"}
              </button>
              <p className="rsvp-disclaimer">
                Thông tin của bạn chỉ dùng để chuẩn bị cho buổi lễ, không được
                chia sẻ cho bên khác.
              </p>
            </form>
          </>
        )}
      </section>

      <div className="rsvp-signature" aria-label="Thoại Nga with love">
        <span className="rsvp-signature-name">Thoại Nga</span>
        <span className="rsvp-signature-love">with love</span>
      </div>
    </div>
  );
};

const InvitationPage = ({ guestName, onBack, onRsvp }) => (
  <div className="invitation-page">
    <button
      className="invitation-page-back"
      type="button"
      aria-label="Quay lại"
      onClick={onBack}
    >
      ×
    </button>

    <div className="invitation-page-rule" />

    <p className="invitation-eyebrow">
      kỉ nịm tnga từ người học thành người đi làm !!!
    </p>

    <div className="invitation-banner">
      <span className="invitation-banner-script">Happy</span>
      <div className="invitation-banner-tape">
        <span className="invitation-banner-bold">GRADUATION</span>
      </div>
    </div>

    <div className="invitation-hero">
      <div className="invitation-hero-banner-frame">
        <div className="invitation-hero-banner">
          <img
            src="/assets/uehbackground.jpg"
            alt="Khuôn viên UEH"
            onError={(event) => {
              event.currentTarget.parentElement.classList.add(
                "invitation-hero-banner--empty",
              );
            }}
          />
        </div>
      </div>

      <div className="invitation-hero-portrait">
        <CrownIcon className="invitation-hero-crown" />
        <div className="invitation-hero-portrait-frame">
          <img
            src="/assets/ngottotnghiep-nobg.png"
            alt="Thoại Nga trong ngày tốt nghiệp"
            onError={(event) => {
              event.currentTarget.parentElement.classList.add(
                "invitation-hero-portrait-frame--empty",
              );
            }}
          />
        </div>
      </div>

      <p className="invitation-tag invitation-tag--intro">
        <HeartIcon className="invitation-tag-icon" />
        Xin chào, mình là
        <em>Thoại Nga</em>
      </p>

      <p className="invitation-tag invitation-tag--invite">
        <StarIcon className="invitation-tag-icon" />
        Thân mời
        <em>{guestName}</em>
      </p>

      <HeartIcon className="invitation-doodle invitation-doodle--heart" />
      <StarIcon className="invitation-doodle invitation-doodle--star-big" />
      <StarIcon className="invitation-doodle invitation-doodle--star-small" />
    </div>

    <div className="invitation-details">
      <div className="invitation-detail">
        <p className="invitation-detail-label">Thời gian</p>
        <p className="invitation-detail-value">
          Chủ nhật
          <br />
          27.09.2026
        </p>
        <p className="invitation-meta">
          <AlarmIcon />
          10:30 - 11:30
        </p>
      </div>
      <div className="invitation-details-divider" aria-hidden="true" />
      <div className="invitation-detail">
        <p className="invitation-detail-label">Địa điểm</p>
        <p className="invitation-detail-value">
          UEH cơ sở A | Hồ Con Rùa
          <br />
          59C Nguyễn Đình Chiểu, Quận 3
        </p>
        {/* <p className="invitation-detail-note">*Xem bản đồ chỉ đường</p> */}
        <p className="invitation-meta">
          <PhoneIcon />
          0913 379 302
        </p>
      </div>
    </div>

    <div className="invitation-rsvp">
      <ArrowHeartIcon className="invitation-doodle invitation-doodle--arrow-heart" />
      <button
        className="invitation-rsvp-title"
        type="button"
        onClick={onRsvp}
      >
        Xác nhận tham dự
      </button>
      <p className="invitation-rsvp-note">
        Biết là bận gòi, nhưng mà chú ý đến em mụt chút !!!
      </p>
      <SparkleIcon className="invitation-doodle invitation-doodle--sparkle" />
      <StarIcon className="invitation-doodle invitation-doodle--star-corner" />
    </div>

    <div className="invitation-page-rule invitation-page-rule--bottom" />
  </div>
);

const App = () => {
  const [step, setStep] = useState("closed");
  const [nameDraft, setNameDraft] = useState("");
  const [guestName, setGuestName] = useState("");

  const closeAll = () => setStep("closed");

  const handleNameSubmit = (event) => {
    event.preventDefault();
    const trimmed = nameDraft.trim();
    if (!trimmed) return;
    setGuestName(trimmed);
    setStep("invitation");
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeAll();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (step === "invitation") {
    return (
      <div className="page-shell">
        <main className="mobile-canvas mobile-canvas--page">
          <InvitationPage
            guestName={guestName}
            onBack={closeAll}
            onRsvp={() => setStep("form")}
          />
        </main>
      </div>
    );
  }

  if (step === "form") {
    return (
      <div className="page-shell">
        <main className="mobile-canvas mobile-canvas--rsvp">
          <RsvpFormPage
            defaultName={guestName}
            onBack={() => setStep("invitation")}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <main className="mobile-canvas">
        <div className="blue-wash blue-wash-left" aria-hidden="true" />
        <div className="blue-wash blue-wash-right" aria-hidden="true" />

        <header className="hero-header">
          <img
            className="ueh-logo"
            src="/assets/ueh-logo.png"
            alt="UEH University"
          />
          <p className="school-name">Đại học Kinh tế TP. Hồ Chí Minh</p>
        </header>

        <h1 className="graduation-title">Graduation</h1>

        <button
          className="envelope-button"
          type="button"
          aria-label="Chạm vào phong bì để mở thiệp"
          aria-haspopup="dialog"
          onClick={() => setStep("name")}
        >
          <img
            src="/assets/watercolor-envelope.png"
            alt="Phong bì giấy màu kem với con dấu sáp đỏ"
          />
        </button>

        <button
          className="open-instruction"
          type="button"
          onClick={() => setStep("name")}
        >
          Chạm vào phong bì để mở thiệp
        </button>

        <footer className="signature" aria-label="Thoại Nga with love">
          <span>Thoại Nga</span>
          <em>with love</em>
        </footer>

        {step === "name" && (
          <div
            className="invitation-overlay"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeAll();
            }}
          >
            <section
              className="name-gate"
              role="dialog"
              aria-modal="true"
              aria-labelledby="name-gate-title"
            >
              <button
                className="close-button"
                type="button"
                aria-label="Đóng"
                onClick={closeAll}
              >
                ×
              </button>
              <p className="name-gate-kicker">Thiệp mời tốt nghiệp</p>
              <h2 id="name-gate-title">Thiệp này dành cho ai?</h2>
              <p className="name-gate-hint">
                Nhập tên của bạn để mở thiệp mời nhé!
              </p>
              <form className="name-gate-form" onSubmit={handleNameSubmit}>
                <input
                  className="name-gate-input"
                  type="text"
                  name="guestName"
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  placeholder="Nhập tên của bạn"
                  maxLength={40}
                  autoFocus
                  required
                />
                <button className="name-gate-submit" type="submit">
                  Mở thiệp mời
                </button>
              </form>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
