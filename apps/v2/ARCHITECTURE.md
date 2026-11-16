# v2 구조

v2에 앱이나 Shell 모듈을 추가할 때, 또는 상태의 소유자를 정할 때 이 문서를 읽을 것.
이 문서는 macOS 데스크톱 Shell의 모듈 경계를 정함. 외형은 [DESIGN.md](DESIGN.md)가 정함.

이 문서는 목표 구조를 적음. 현재 코드와 다른 부분은 마지막 절에 있음.

## 큰 그림

Shell은 두 층으로 나뉨. 위층은 상태를 소유함. 아래층은 상태를 화면에 표시함.

```text
macOS Shell
│
├─ 상태와 수명
│  ├─ DesktopSession          page 수명
│  │    실행 / 창 / 활성 창 / frontmost app
│  │    앱 종료 시 관련 상태를 한 번에 전이함
│  │    App runtime을 생성하고 dispose함
│  │
│  ├─ App runtime (앱마다)    run 수명
│  │    앱 데이터를 소유함
│  │
│  └─ 앱 목록                 정적 설정
│       설치할 앱과 Dock 순서
│
└─ 화면 모듈 — 각각 붙이거나 뗄 수 있음
   ├─ Workspace   ← DesktopSession
   ├─ Dock        ← DesktopSession + 앱 목록
   └─ MenuBar     ← DesktopSession + 앱 목록 + Clock
```

`←`는 그 모듈이 읽는 대상임. 화면 모듈은 서로를 읽지 않음.

## 연결

```mermaid
flowchart TB
  main["main.tsx<br/>page 수명의 합성 지점"]

  subgraph stateLayer["상태와 수명"]
    appList["앱 목록<br/>정적 설정"]
    session["DesktopSession<br/>실행 · 창 · 활성 창 · frontmost app"]
    runtime["App runtime (앱마다)<br/>앱 데이터"]
  end

  subgraph viewLayer["화면 모듈 — DesktopView가 배치하고 mount함"]
    menubar["MenuBar"]
    workspace["Workspace<br/>창 틀 · 포커스 정책"]
    dock["Dock"]
    appview["앱 View"]
  end

  main -- "생성" --> session
  appList -- "앱 정의" --> session
  session -- "생성 · dispose" --> runtime
  runtime -. "ports로 요청" .-> session

  menubar -- "구독 · 명령" --> session
  workspace -- "구독 · 명령" --> session
  dock -- "구독 · 명령" --> session
  workspace -- "창마다 mount" --> appview
  appview -- "구독 · 명령" --> runtime
```

화살표는 의존 방향임. 화면 모듈은 상태 층에 의존함. 상태 층은 화면 모듈을 모름.
앱은 `DesktopSession`을 직접 잡지 않음. 생성 때 받은 ports로만 요청함.

## 경계 원칙

- **실행과 창은 한 owner가 가짐.** `DesktopSession`이 둘을 한 transaction으로 바꿈. 앱 종료는 실행과 창을 함께 지우고 snapshot을 한 번 발행함. 중간 상태는 밖에서 보이지 않음.
- **화면 모듈은 표시(projection)임.** 상태를 구독하고 명령을 보냄. 실행이나 창의 상태를 따로 보관하지 않음. 열린 메뉴 같은 화면 상태만 컴포넌트 안에 둠.
- **실행에 딸린 표시는 실행 목록에서 유도함.** Dock의 실행 표시가 그 예임. 등록과 해제 절차가 없으므로 앱이 종료되면 같은 render에서 사라짐.
- **수명이 다른 상태만 따로 둠.** 따로 둔 상태는 `main.tsx`가 `DesktopSession` 옆에서 생성함. 화면 모듈은 필요한 소유자만 직접 구독함.
- **창 사이의 키보드 포커스는 Workspace가 옮김.** Workspace가 Shell 상태의 변화를 보고 활성 창에 포커스를 둠. 예외는 두 곳임. 메뉴는 열린 동안 자기 행에 포커스를 두고, Escape로 닫으면 연 곳에 포커스를 돌려줌. `useWindowFrame`은 pointer drag를 시작할 때 그 창에 포커스를 둠.
- **상태 층은 React를 모름.** `DesktopSession`과 App runtime은 일반 class임. React 연결은 각 모듈의 `bridge/`가 담당함.
- **화면 모듈은 `DesktopSession`과 App runtime을 직접 참조하지 않음.** 두 객체는 bridge의 context 안에 있음. 화면 모듈은 bridge hook으로 상태를 읽고 명령을 보냄.

수명은 세 가지임.

| 수명 | 뜻 | 해당하는 것 |
| ---- | -- | ----------- |
| page | 방문이 끝날 때까지 유지함. 작은 화면 안내로 전환해도 유지함. | `DesktopSession` |
| run | 앱 실행부터 종료까지 유지함. 창이 없어도 실행은 유지할 수 있음. | App runtime |
| mount | 화면에 표시하는 동안만 유지함. | 화면 모듈, 앱 View |

## 상태를 둘 곳

| 상태 | 소유자 |
| ---- | ------ |
| 실행, 창, 활성 창, frontmost app, 창 위치와 크기 | `DesktopSession` |
| 앱 데이터 | 그 앱의 App runtime |
| 설치할 앱, Dock 순서 | 앱 목록. `DesktopSession`이 생성 때 받고, 화면 모듈은 `useDesktop()`으로 읽음. |
| 메뉴바 시계의 시각 | `Clock`. `main.tsx`가 page 수명으로 생성함. 비교·검증 도구는 고정 시각 `Clock`을 넘길 수 있음. |
| 실행에 딸린 표시 | 소유자 없음. 실행 목록에서 유도함. |
| 열린 메뉴, hover | 컴포넌트 local state |

새 상태는 이 표에서 함께 바뀌는 상태의 소유자에게 둘 것.
맞는 소유자가 없고 수명도 다르면 별도 store를 만들 것.

## 앱 모듈

앱은 폴더 하나임. Shell은 앱 이름을 모름.

| 부분 | 역할 |
| ---- | ---- |
| core class | App runtime임. 앱 데이터와 창별 상태를 소유함. |
| `bridge/react.ts` | App runtime을 context로 숨김. 창 하나의 상태 선택과 명령 묶음을 hook으로 제공함. |
| `ui/` View | bridge hook으로 창 안을 그림. App runtime을 import하지 않음. |
| `application.tsx` | 등록 모듈임. 생성 의존성, 아이콘, View 연결을 조합함. |

앱과 Shell은 두 방향의 계약으로 연결함. 계약의 정의는 `desktop/core/types.ts`와 `desktop/bridge/react.tsx`에 있음.

- **앱 → Shell:** 생성 방법, 창 열림·닫힘·정리에 대한 응답, 아이콘, 창 안의 화면을 제공함.
- **Shell → 앱:** ports를 제공함. 앱은 ports로 새 창, 창 닫기, 실패 보고를 요청함.

앱을 추가할 때는 앱 폴더를 만들고 앱 목록에 한 줄을 추가함. Shell 코드는 수정하지 않음.
Shell 모듈이 앱 데이터를 표시해야 하면 그 앱의 App runtime을 구독함. 앱 데이터를 Shell snapshot에 복사하지 않음.

## 폴더와 의존 규칙

폴더는 먼저 모듈로 나누고, 모듈 안에서 층으로 나눔. 앱 하나가 함께 바뀌는 단위이므로 층을 최상위 폴더로 두지 않음.

```text
src/
├─ desktop/
│  ├─ core/      DesktopSession, Clock, 계약 타입(types.ts)
│  ├─ bridge/    React 연결: DesktopProvider, useDesktop, useWindowFrame, Application 타입
│  └─ ui/        화면 모듈과 CSS
├─ apps/<app>/
│  ├─ core/      App runtime class
│  ├─ bridge/    <App>Provider, use<App>
│  ├─ ui/        View와 CSS
│  └─ application.tsx   등록 모듈. 합성 파일임.
├─ applications.tsx      앱 목록. 합성 파일임.
└─ main.tsx              page 수명의 합성 지점
```

층은 ui → bridge → core 방향으로만 의존함. 합성 파일만 모든 층을 import함.
아래 표의 lint 규칙은 `.oxlintrc.json`의 `no-restricted-imports`가 강제함. 위반하면 `pnpm check:v2`가 실패함.

| 규칙 | 강제 방법 |
| ---- | --------- |
| core는 React, bridge, ui, CSS를 import하지 않음. | lint |
| bridge는 ui와 CSS를 import하지 않음. | lint |
| ui는 core에서 `desktop/core/types`만 import함. 다른 core 모듈은 타입 import도 금지함. | lint |
| desktop은 `apps/`와 `applications.tsx`를 import하지 않음. | lint |
| 앱은 다른 앱을 import하지 않음. | lint |
| 앱은 desktop에서 `desktop/core/types`와 `desktop/bridge/react`의 `Application` 타입만 import함. | lint |
| 화면 모듈은 `DesktopSession`과 App runtime을 직접 참조하지 않음. | lint와 type-check. ui는 두 class의 타입을 import할 수 없음. bridge는 context 객체를 export하지 않음. provider는 provider 타입으로 export하므로 `useContext`에 넘기면 type-check가 실패함. |
| bridge는 숨길 것이 있을 때만 만듦. `useSyncExternalStore` 한 줄 wrapper는 만들지 않음. | 리뷰 |

lint 설정을 바꿀 때는 아래를 지킬 것.

- 같은 파일에 override가 둘 이상 맞으면 `no-restricted-imports`는 마지막 override의 설정만 적용됨. 폴더 종류마다 override 하나에 모든 패턴을 넣을 것.
- 한 group의 `!` 부정 패턴이 import와 맞으면 다른 group도 그 import를 검사하지 않음. import 이름을 검사해야 하는 경로는 부정 패턴 대신 `paths`의 `allowImportNames`로 막을 것.
- 새 층 폴더를 만들면 그 폴더의 override를 추가할 것. lint는 override가 없는 폴더의 import를 검사하지 않음.

## 도입하지 않은 구조

모듈 연결은 JSX 합성과 직접 구독으로 함. 전제는 모든 앱이 first-party이고 빌드 시 합성한다는 것임.
아래 구조는 오른쪽 조건이 생기면 다시 검토할 것.

| 구조 | 다시 검토할 조건 |
| ---- | ---------------- |
| 실행 store와 창 store의 분리 | 실행과 창이 서로 다른 transaction으로 바뀌어야 할 때 |
| Shell 모듈 registry, DI container, 범용 event bus | 외부 plugin을 런타임에 붙여야 할 때 |
| 범용 메뉴 서비스 | 앱이 다른 앱의 메뉴에 항목을 추가해야 할 때 |

## 현재 코드와의 차이

화면 모듈은 각자 `useDesktop()`으로 `DesktopSession`을 구독하고, `DesktopView`는 배치만 함. 남은 차이는 1개임.

- 창이 없으면 Workspace가 Dock의 `data-dock` 표식을 찾아 포커스를 보냄. Dock을 떼면 이때 포커스를 옮기지 않음.
