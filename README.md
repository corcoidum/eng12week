# Eng12Week

12주 적응형 영어 회화 학습 앱입니다. 기초 문법은 알지만 듣기와 말하기가 어려운 한국어 학습자가 하루 30분씩 일상, 여행, 의료기관 행정, IT/AI 상황을 훈련할 수 있도록 설계했습니다.

## 주요 기능

- 7개 항목 초기 진단과 시작 트랙 계산
- 12주 로드맵과 Week/Day 기반 일일 세션
- 하루 30분 루틴 체크: SRS, Listening, Shadowing, Role-play, Writing, Error Log
- 주차별 핵심 표현과 역할극 시나리오
- Spaced Repetition 카드 관리와 오류 문장 재학습
- 주간 평가 기반 난이도 자동 조정
- AI 음성 대화 프롬프트와 피드백 프롬프트 복사
- 학습 기록 JSON export/import

## 실행 방법

별도 설치가 필요 없습니다.

1. `index.html` 파일을 브라우저에서 엽니다.
2. 진단 점수를 입력합니다.
3. Today 탭에서 30분 루틴을 수행합니다.
4. SRS 탭에 오류 문장을 추가하고 복습합니다.
5. Weekly 탭에서 Day 7 평가를 기록합니다.

## 개인정보 주의

- 실제 환자 이름, 전화번호, 주민등록번호, 차트번호, 검사 결과를 입력하지 마세요.
- 의료 영어는 접수, 예약, 대기, 서류 안내 같은 행정 대화에 한정합니다.
- AI 도구에 음성이나 transcript를 보낼 때는 민감정보를 제거한 뒤 사용하세요.

## 문서

- 전체 학습 설계 문서: [docs/english-conversation-12week-system.md](docs/english-conversation-12week-system.md)

## 수동 검증 체크리스트

- 브라우저에서 `index.html`이 오류 없이 열린다.
- Today 탭에서 루틴 체크 시 완료율이 변한다.
- Diagnostic 탭에서 슬라이더 변경 시 트랙이 갱신된다.
- SRS 탭에서 카드를 추가하고 성공/재학습 처리가 된다.
- Weekly 탭에서 평가 버튼을 누르면 조정 결과와 기록이 저장된다.
- Prompts 탭에서 프롬프트 복사 버튼이 동작한다.
- Export로 JSON 백업 파일을 받을 수 있다.
