# 프로젝트 작업 지침

- HANDOFF.md와 docs/SKT-ALEPH-project-guide.md를 먼저 읽는다.
- dist/는 빌드 산출물이 아니라 게임의 원본 소스이다. 삭제하거나 빌드로 덮어쓰지 않는다.
- dist/app.js: 화면·입력·그리기. dist/engine.js: 게임 로직. tests/engine.test.js: 기존 자동 검사.
- 외부 패키지 없이 정적 서버로 실행한다. 변경 후 관련 자동 검사와 브라우저 동작을 확인한다.
- 실제로 검증하지 않은 항목, 플레이 기록, 사용자의 판단을 사실처럼 쓰지 않는다.
- 이미지 출처·라이선스와 저장 데이터 호환성을 보존한다.
- 배포 대상은 사용자 요청을 따른다. GitHub 변경과 Sites 배포는 별도이다.

## Vercel 이전 추가 지침

- dist/index.html, dist/style.css, dist/app.js, dist/engine.js는 직접 관리하는 정적 원본 소스입니다. dist를 생성물로 취급해 삭제하지 마세요.
- JavaScript ES modules + Canvas. 외부 패키지 설치 불필요. 불필요한 프레임워크 전환을 피하세요.
- 실행: `python -m http.server 8000 --directory dist`
- 검증: `npm test` (Node.js 22 이상 권장). 테스트는 tests/engine.test.js.
- Vercel: Framework Other, 저장소 루트, 빌드 npm test, 출력 dist. 환경변수 불필요.
- 세 스테이지 순차 해금, 30초 생존, 자동 공격, 일시정지 메뉴, 저장 스키마 이전을 유지하세요.
- A/B 비교는 적 생성 간격 0.8/0.6초 하나만 다릅니다. 규칙 변경 시 ruleset을 관리해 이전 기록과 섞지 마세요.
- 실측하지 않은 검사를 완료로 적거나 플레이 기록을 만들어내지 마세요. 600초 엔진 시뮬레이션은 실제 브라우저 10분 검사가 아닙니다.
- 사용자 판단과 AI 제안을 구분하고 최종 난이도는 실제 20회 기록으로 사용자와 결정하세요.
- 이미지 출처/라이선스를 유지하고 비밀값·개인정보를 코드/공개 파일에 넣지 마세요.
