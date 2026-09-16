# Codex 이어 작업

## 최신 후속 상태 (2026-09-16)

아래 초기 이전 기록의 배포 차단은 해소됐다. 현재 Vercel 무로그인 공개와 GitHub CSS 수정의 자동 반영을 확인했다. 관리 API 403은 지속된다.
PC 화면 잘림 수정 및 브라우저 검사 결과는 QA-2026-09-16.md, 남은 사용자 20회 비교는 PLAYTEST.md를 따른다. 자동 QA 기록과 사용자 기록을 혼합하지 않는다.

최신 게임 소스와 11개 Node 검사를 가져왔고 이번 이전 과정에서 11개 모두 통과했습니다.
18종 적, 순차 해금/다음 단계, 일시정지/이어하기/처음으로, 저장 복구, A/B 기록, 효과 선택 기능 구현 완료.
기존 게임: https://dev-survivor-three-rules.ahs3810.chatgpt.site
소스: https://github.com/PeterAhnn/SKT-ALEPH-Project-2-Game

## 새 PC

```sh
git clone https://github.com/PeterAhnn/SKT-ALEPH-Project-2-Game.git
cd SKT-ALEPH-Project-2-Game
python -m http.server 8000 --directory dist
```

http://localhost:8000 을 엽니다. Windows는 python 대신 py를 사용할 수 있습니다.
Codex에서 저장소 폴더를 열고 AGENTS.md와 이 문서를 읽게 하세요. 다른 PC의 작업 시작 전 git pull, 완료 후 커밋과 push로 동기화합니다.

## 남은 과제

1. 1366×768와 1920×1080 실제 브라우저 검사: 잘림/가로 넘침, 1초 입력 10건, 리사이즈, 포커스, 정지/재개.
2. 실제 10분 연속 실행 및 콘솔 오류 기록. 엔진 시뮬레이션으로 완료 처리 금지.
3. 동일 스테이지·버전에서 A 10회/B 10회 실제 플레이와 CSV 보관. 중앙값/범위/실패 원인으로 최종 난이도 선택.
4. 저장 정상/빈 값/손상값, 재접속, 성공 효과 즉시 끄기 검사.
5. Vercel URL과 GitHub를 새 시크릿 창에서 확인하고 제출 문안 완성.

## Vercel

Root Directory는 저장소 최상위, Framework Other. vercel.json에 npm test 빌드와 dist 출력 설정 포함. 환경변수 불필요.
GitHub 연동을 설정하면 main push에 프로덕션 자동 배포를 사용할 수 있습니다.
도메인이 바뀌면 localStorage는 자동 이전되지 않습니다. 기존 기록은 기존 사이트에서 CSV로 먼저 내려받으세요.

## 배포 상태

배포 생성 주소: https://skt-aleph-project-2-game-peter-ahns-projects.vercel.app
배포 ID: dpl_AAti9WRpVTTGyNye2Ri5tMKjmXTz
공개 접속 시 Vercel 로그인 화면으로 연결됨을 실제 브라우저에서 확인했습니다. 현재 T02-C01 미충족이며 게임 화면 검증은 진행할 수 없었습니다. 연결 도구의 팀 조회/상태 조회는 403 권한 오류입니다.
사용자가 Vercel 프로젝트 Settings → Deployment Protection에서 공개 게임의 인증 보호 설정을 변경하고, Settings → Git에서 GitHub 저장소와 main을 연결해야 합니다. 그 후 무로그인 접근, 이미지 정상 표시 및 조작을 검사하세요. 현재 GitHub 자동 배포 연결을 완료했다고 주장하지 마세요.
