import { useState } from "react";

const prompts = {
  "공감형": {
    sequence: [
      "현실 고민 공감",
      "진단의 필요성 강조",
      "치료 접근 소개",
      "환자 심리 고려한 설명",
      "마무리 (강요 없는 안내)"
    ],
    tone: "차분하고 객관적인 설명",
    banned_terms: [
      "무통 시술 100% 보장",
      "단기간 완치",
      "완벽한 결과",
      "무조건 추천"
    ]
  }
};

export default function PromptGenerator() {
  const [type, setType] = useState("공감형");
  const [clinic, setClinic] = useState("");
  const [keyword, setKeyword] = useState("");

  const data = prompts[type];
  const promptText = `당신은 대한민국 치과 전문 블로그 콘텐츠 작성자입니다.
다음 정보를 바탕으로 블로그 글을 작성하세요.

🧩 블로그 유형: ${type}
🏥 병원 이름: ${clinic}
🧠 키워드: ${keyword}
📝 어조: ${data.tone}
⛔ 금지어:
- ${data.banned_terms.join("\\n- ")}

👇 글 구성 순서 (Story Framework):
- ${data.sequence.join("\\n- ")}

🔧 SEO 규칙:
- 제목은 30자 이내로 작성
- 키워드(예: ${keyword})는 본문에 5회 이상 사용
- 각 문단은 3~4줄로 구성
- 이미지 alt 텍스트엔 키워드를 1회 이상 포함 (본문 이미지 있다고 가정)

📚 법적 유의사항:
- 과장·허위 표현 금지
- “100%”, “완치” 등 단정적 표현 지양
- 특정 비용, 이벤트, 방문 유도 표현 금지
- 진료 사례는 개인 정보 제거 필수

✍️ 최종 요청:
위의 정보와 템플릿을 바탕으로 ${clinic}의 tone에 맞게 ${type} 블로그 글을 작성해 주세요.
글 전반에 걸쳐 환자 중심의 어조를 유지하고, 신뢰감 있게 서술해 주세요.`;

  return (
    <div style={{ padding: 20 }}>
      <h2>GPT 블로그 프롬프트 생성기</h2>
      <div>
        <label>유형: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {Object.keys(prompts).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>
      <div>
        <label>병원 이름: </label>
        <input value={clinic} onChange={(e) => setClinic(e.target.value)} />
      </div>
      <div>
        <label>키워드: </label>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>
      <div>
        <h3>자동 생성된 프롬프트</h3>
        <textarea rows={30} cols={100} value={promptText} readOnly />
      </div>
    </div>
  );
}
