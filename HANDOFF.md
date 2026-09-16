# Codex 인수인계

## 1. 목표
SKT ALEPH 과제 2 미니게임 DEV SURVIVOR를 GitHub에서 관리하고 Codex에서 이어 개발한다.

## 2. 현재 상태
Sites 원본 커밋 e007dece3f0728d074332021b098b3b1563b3cda에서 가져왔다.
순수 HTML/CSS/JavaScript 프로젝트이며 dist/가 편집할 원본이다. 별도의 빌드나 패키지 설치가 필요 없다.
3단계 순차 해금, IT 적 18종, 일시정지/이어하기/처음으로, 브라우저 저장과 CSV 기록 내보내기를 포함한다.
기존 공개 게임: https://dev-survivor-three-rules.ahs3810.chatgpt.site

## 3. 실행 명령
```sh
git clone https://github.com/PeterAhnn/SKT-ALEPH-Project-2-Game.git
cd SKT-ALEPH-Project-2-Game
python -m http.server 8000 --directory dist
```
macOS/Linux에서 python이 없으면 python3를 사용한다. http://localhost:8000 에 접속한다.
Node.js 설치 후 `npm test`로 기존 검사를 실행한다.

## 4. 통과 검사
2026-09-16 원본의 자동 검사 11/11 통과. 이는 실제 10분 플레이 검증을 대체하지 않는다.
브라우저에서 시작 → 일시정지 → 이어하기 → 일시정지 → 처음으로 돌아가기를 점검한다.
다음 단계 잠금과 30초 생존 후 해금도 변경 시 확인한다.

## 5. 남은 문제
T02 상세 설명·카드 1~5·완주 체크리스트는 사용자 제공 내용을 docs/ASSIGNMENT.md에 반영했다.
실제 A/B 각 10회 플레이 기록과 사용자 판단은 임의로 만들지 않는다.
Vercel 배포는 생성했으나 로그인 보호 화면으로 연결된다. 무로그인 공개 확인과 GitHub 자동 배포 연결은 미완료다. 연결 도구는 팀 범위 권한 오류(403)를 반환했다. GitHub 변경은 기존 Sites에 자동 반영되지 않는다.
기록은 브라우저/도메인별 로컬 저장이므로 다른 PC나 배포 주소로 자동 이전되지 않는다.

## 6. 다음 행동
이 문서와 AGENTS.md, docs/SKT-ALEPH-project-guide.md를 읽고 요청된 수정을 수행한다.
vercel.json에 빌드 npm test / 출력 dist 설정을 추가했다. Vercel Settings → Git에서 저장소/main 연결, Deployment Protection에서 공개 접근 설정 후 실제 시크릿 창 확인이 필요하다. 상세 상태: docs/HANDOFF.md.

## 7. 건드리지 말 것
기존 게임 규칙과 저장 데이터 호환성을 요청 없이 변경하지 않는다.
assets/ 출처 및 라이선스를 보존하고 비밀키나 개인정보를 커밋하지 않는다.
