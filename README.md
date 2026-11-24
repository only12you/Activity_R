# Activity 표준화 보고서

반복 업무 보고서를 모바일에서 작성하는 웹앱입니다. 재도장 단지 DB, 입찰·낙찰 이력 등록(CSV·TXT·JSON·XLSX·PDF·HWP), 공종별 법정 보수주기·가망단지 발굴, A2 재도장 현장 보고서 연동이 들어 있습니다. 서버 없이 정적 파일(HTML)만으로 동작하며, 입력한 데이터는 사용 중인 브라우저에만 저장됩니다.

## GitHub Pages로 게시하기 (5분)

1. GitHub에서 **New repository**를 만듭니다. 이름은 예를 들어 `activity-report`, 공개 범위는 Public(무료 Pages는 Public 저장소 기준)입니다.
2. 이 폴더의 파일을 저장소 맨 위(루트)에 올립니다. 웹에서 **Add file → Upload files**로 `index.html`, `apt-db.json`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `.nojekyll`을 끌어다 놓고 **Commit changes**를 누릅니다.
   - `apt-db.json`은 약 5MB라 웹 업로드로 충분합니다(한 파일 25MB 이하).
3. 저장소 **Settings → Pages**에서 *Build and deployment*의 **Source**를 `Deploy from a branch`, 브랜치를 `main`, 폴더를 `/ (root)`로 두고 **Save**합니다.
4. 1~2분 뒤 `https://<내계정>.github.io/<저장소이름>/` 주소로 열립니다.
5. 휴대폰에서 그 주소를 열고 **홈 화면에 추가**(iOS: 공유 → 홈 화면에 추가, Android: 메뉴 → 앱 설치)하면 앱처럼 실행되고, 한 번 연 뒤에는 오프라인에서도 열립니다.

## 사용 시 알아둘 점

- **데이터는 브라우저마다 따로 저장**됩니다(제품·단지·사양·이력·보고서). 기기를 바꾸거나 브라우저 데이터를 지우기 전에 앱의 **DB 관리 → 백업**에서 JSON 백업을 저장하세요. 다른 기기에서는 같은 화면에서 복원합니다.
- **Claude 연동 기능은 GitHub에서 쓸 수 없습니다.** 개요판 사진 읽기, 보고서 분석, Claude 읽기 보조는 Claude 화면 안에서만 동작합니다. 대신 입찰·낙찰 등록에서 텍스트·CSV·XLSX·HWP·텍스트 PDF는 규칙으로 읽고, **사진·스캔 PDF는 브라우저 OCR(Tesseract.js)로 글자를 인식**합니다(처음 한 번 인터넷에서 한글 데이터를 받으며, 인식 오류가 있을 수 있어 미리보기에서 확인하세요). 읽기가 오래 걸리면 **중단** 버튼으로 멈출 수 있습니다.
- 엑셀 저장은 일반 다운로드로 저장됩니다.
- PDF 읽기와 엑셀 도구는 처음 한 번 인터넷에서 라이브러리(cdnjs)를 받습니다.
- 앱을 새 버전으로 바꿔 올릴 때는 `sw.js`의 `VERSION` 값(`v6` → `v7`)을 올리면 사용자 기기의 캐시가 갱신됩니다.

## 내 컴퓨터에서 바로 실행

`index.html`만 더블클릭하면 단지 DB(`apt-db.json`)를 읽지 못합니다. 이 폴더에서 아래 명령으로 간이 서버를 켜고 `http://localhost:8000`을 여세요.

```
python3 -m http.server 8000
```
