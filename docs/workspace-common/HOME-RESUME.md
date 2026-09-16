# 집 노트북에서 이어하기

작성일: 2026-09-16. 이 문서는 PC 이동 안내이며 과제 완주나 새 브라우저 검증을 뜻하지 않는다.

## 처음 준비

Git, Python 3, Node.js 22 이상 및 사용할 편집기/Codex를 설치한다. GitHub에 push하려면 본인 계정으로 인증한다. 필요한 플러그인과 gstack browse는 노트북에서 별도 설치한다. 학원 PC의 로그인 정보나 토큰 폴더를 복사하지 않는다.

원하는 위치에서 아래 명령으로 같은 폴더 구조를 만든다. 기존 폴더가 있다면 다시 clone하지 말고 해당 저장소에서 git pull --ff-only를 사용한다.

```sh
mkdir SKT-ALEPH
cd SKT-ALEPH
git clone https://github.com/PeterAhnn/SKT-ALEPH-Project-1-Profile.git
git clone https://github.com/PeterAhnn/SKT-ALEPH-Project-2-Game.git
```

과제 2의 docs/workspace-common 폴더에 있는 AGENTS.md, SKT-ALEPH-project-guide.md, ALEPH-SUBMISSION-TEMPLATE.md, HOME-RESUME.md를 상위 SKT-ALEPH 폴더로 복사한다. 기존 파일이 있으면 내용을 비교한 뒤 최신 내용을 유지한다. 이 폴더는 이동용 사본이며 공통 문서를 수정할 때 함께 갱신한다.

Codex에서 SKT-ALEPH 폴더를 열고 다음과 같이 요청한다.

> AGENTS.md, SKT-ALEPH-project-guide.md, HOME-RESUME.md와 작업할 과제의 HANDOFF.md를 읽고 현재 Git 상태를 확인한 뒤 남은 과제를 이어서 진행해 줘. 과제 2는 docs/ASSIGNMENT.md, docs/QA-2026-09-16.md, docs/PLAYTEST.md, docs/SUBMISSION.md도 읽어 줘.

## 실행

- 과제 1: 저장소에서 python -m http.server 8001 실행 후 http://localhost:8001 접속.
- 과제 2: 저장소에서 python -m http.server 8000 --directory dist 실행 후 http://localhost:8000 접속. 자동 검사는 npm test. 외부 패키지 설치 불필요.
- Windows에서 python 명령이 없으면 py, macOS/Linux에서는 python3를 사용한다.
- 과제 2의 dist는 원본 소스이므로 삭제하거나 생성물로 덮어쓰지 않는다.

## 매번 PC를 바꿀 때

작업 시작 전 각 저장소에서 git status와 git pull --ff-only를 확인한다. 변경 파일이 있거나 충돌하면 강제 덮어쓰기하지 말고 먼저 내용을 확인한다.
작업 종료 후 변경 파일을 검토하고 필요한 파일만 git add, git commit, git push한다. git status --short --branch가 깨끗하고 origin/main과 일치하는지 확인한다. 커밋만 하고 push하지 않으면 다른 PC에 전달되지 않는다.
상위 폴더는 Git 저장소가 아니다. 공통 문서 변경은 과제 2의 docs/workspace-common 사본에도 반영해 저장한다.

## 현재 이어 할 일

- 과제 1: index.html과 공통 가이드 저장. 상세 과제 기준, 제출 상태, 배포 관리 정보는 이 저장소에 확인 자료가 없으므로 다음 작업 전 확인한다.
- 과제 2: 기존 브라우저 QA는 docs/QA-2026-09-16.md 참고. 사용자 A/B 각 10회 실제 플레이, 최종 난이도 판단, 실제 OS 창 전환 확인이 남아 있다. 제출 문안은 docs/SUBMISSION.md.
- 현재 제출 문안의 소스 고정 커밋은 bda1dabb52f91ce2ba4a1a66c17b72172e8798be. 이번 이동 정리는 문서와 증거 보관 작업이며 게임 원본은 변경하지 않는다. 제출 직전 배포와 소스 및 공개 접근을 다시 확인한다.

## PC와 함께 자동 이동하지 않는 것

게임 localStorage는 PC·브라우저·주소별 저장이다. 필요한 실제 플레이 기록은 학원에서 사용한 정확한 주소의 플레이 기록 화면에서 CSV로 내려받아 개인 저장소나 USB로 옮긴다. 이번 저장 정리에서는 브라우저 기록을 추출하지 않았다. CSV 보관은 게임 저장 상태 복원이나 가져오기 기능을 뜻하지 않는다.
A/B 비교는 같은 PC·브라우저·주소·게임 버전·스테이지에서 한 묶음으로 진행한다. 학원과 집의 기록을 같은 조건으로 간주해 합치지 않는다. 자동 QA 기록은 사람 플레이 기록에 포함하지 않는다.
Codex 대화, 로컬 설정, 플러그인, 계정 로그인은 이 Git 저장 작업에 포함되지 않는다. 이어 할 판단과 상태는 인수인계 문서를 기준으로 복원한다.

## 연결 과제 기록

후속 과제 시작 전 선행 과제의 저장소, 제출 당시 전체 커밋 주소, 결과물 주소, 데이터/스키마, 남은 일과 본인 판단을 문서에 남긴다.
현재 공통 가이드 기준으로 T06의 contracts/pds-schema-v2.json과 기준 커밋은 T07에 필요하며, T10 연구 결과는 마지막 B 앱에 쓰고 그 앱을 마지막 A 사이트에 연결한다. 실제 작업 시 최신 과제 기준을 다시 확인한다.
비밀키나 개인정보가 있는 원자료는 공개 GitHub에 올리지 않고 별도로 보관한다.
