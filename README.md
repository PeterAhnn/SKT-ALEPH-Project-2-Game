# DEV SURVIVOR — 개발자 3대 금기어

SKT ALEPH 과제 2: 개발자가 IT 적의 공격 속에서 30초 동안 생존하는 브라우저 게임입니다.

게임: https://dev-survivor-three-rules.ahs3810.chatgpt.site

## 실행

외부 패키지 설치가 필요 없습니다. Python 3으로 저장소 루트에서 실행합니다.

```sh
python -m http.server 8000 --directory dist
```

브라우저에서 http://localhost:8000 을 여세요. ES modules를 사용하므로 HTML 파일 더블클릭 대신 정적 웹 서버를 사용합니다.

## 조작 및 진행

- WASD / 방향키로 이동, 가까운 적을 자동 공격합니다.
- 30초 생존 = 스테이지 성공. 체력 0 = 실패.
- 1단계 성공 → 2단계 해금 → 2단계 성공 → 3단계 해금.
- 성공 화면에서 **다음 스테이지로** 이동합니다. 다음 스테이지는 체력·레벨이 초기화됩니다.
- 해금된 스테이지는 재접속 후에도 유지되며 다시 플레이할 수 있습니다.
- P / Escape로 일시정지. 화면에서 **이어하기 / 처음으로 돌아가기**를 선택합니다.
- 강화 선택 중에도 일시정지하거나 처음으로 돌아갈 수 있습니다.
- 중도 종료한 판은 완료 플레이 기록에 넣지 않습니다.

## 스테이지

1. 별 것도 아닌 일에 “어~?” 금지 — 언어 오류 8종
2. 3인 이상 모여있기 금지 — 언어와 장비 10종
3. “한가롭네, 평화롭네” 금지 — 전체 18종

## 적 구성

프로그래밍 언어 13종: Python, C, C++, C#, JavaScript, TypeScript, Rust, Go, PHP, R, Swift, Ruby, Kotlin.

IT 적 5종: 라우터, 방화벽, CPU, AI, 스마트폰.

[TIOBE 2026년 9월 지수](https://www.tiobe.com/tiobe-index/)를 참고해 언어를 선정했습니다. 상위 20개를 그대로 재현한 목록은 아니며, 순위와 적의 강함은 연결되지 않습니다. 이동 속도와 체력은 게임을 위해 설정했습니다.

## 검사

Node.js 환경에서 실행:

```sh
node --test tests/engine.test.js
```

입력 1:1 처리, 일시정지·재개, 강화 선택 보존, 중도 종료, 재시작, 저장 복구, 기존 저장 이전, 600초 시뮬레이션을 검사합니다.
시뮬레이션은 실제 브라우저의 10분 실행 검사를 대신하지 않습니다.

## 과제 기록

플레이 기록 화면에서 동일한 게임 버전·스테이지의 A 10회 / B 10회를 비교합니다.
난이도 변경값은 적 생성 간격 A 0.8초 / B 0.6초 하나입니다. 실제 기록만 저장하며 CSV로 내보낼 수 있습니다.
기존 버전 기록은 유지하되 새 버전의 비교 계산에서 제외합니다.

저장과 복구, 효과 설정, 세부 규칙은 [게임 설명](dist/README.md)을 참고하세요.

## 이미지 출처

각 이미지의 출처·라이선스는 [기본 이미지 출처](dist/assets/SOURCES.md)와 [추가 언어 이미지 출처](dist/assets/LANGUAGE-SOURCES.md)을 참고하세요.
언어 상표는 해당 기술을 식별하기 위한 것이며 공식 제품 또는 후원 관계를 의미하지 않습니다.

## Codex에서 이어서 작업

이 저장소를 복제한 폴더를 Codex에서 열고 [인수인계](HANDOFF.md)와 [작업 지침](AGENTS.md)을 읽도록 요청하세요. 다른 PC에서도 같은 저장소를 복제해 이어서 작업할 수 있습니다.

## Vercel 이전 상태

배포 생성 주소: https://skt-aleph-project-2-game-peter-ahns-projects.vercel.app

현재 로그인 보호 화면으로 연결되므로 제출 URL로 사용하지 마세요. Vercel 프로젝트의 Settings → Deployment Protection에서 공개 게임에 적용되는 Vercel Authentication을 해제한 뒤 시크릿 창에서 확인해야 합니다. Settings → Git에서 이 GitHub 저장소를 연결하고 main을 Production Branch로 지정하세요. 현재 자동 배포 연결은 미완료입니다.

설정: Framework Other, Root Directory 저장소 최상위, Build Command npm test, Output Directory dist. 환경변수 불필요.

[과제 2 상세 기준](docs/ASSIGNMENT.md) · [이어 작업 안내](docs/HANDOFF.md) · [제출 초안](docs/SUBMISSION.md)
