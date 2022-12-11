# Lezhin front-end homework

## 개요

로맨스 장르 작품 랭킹 리스트 컴포넌트를 개발합니다.

## 요구사항

- Desktop, Mobile 모던 브라우저(Chrome, Safari, Firefox) 환경만 고려해주시면 됩니다.
- 로컬 환경에서 웹서버를 통해 작업물을 확인할 수 있도록 개발 환경을 구성, 확인 방법을 README에 작성해 주세요.
- vanilla 또는 react 중 선택해서 개발해 주세요.
- 컴포넌트 구조를 통해 재사용성을 고려하여 개발해 주세요.
- 개발환경에 라이브러리나 프레임워크를 적용시 적용한 이유를 README 파일에 작성해 주세요.
- 아래 컴포넌트 스펙사항을 구현해 주세요.

## 화면 샘플

<img src="./view_sample.png" width="430" alt="화면 샘플">

- 위 이미지는 예시 화면입니다. 스타일을 그대로 적용할 필요는 없이 구현스펙을 알아볼 수 있도록 자유롭게 스타일 및 레이아웃을 적용해 주세요.

## 구현 스펙

- 재사용성 등을 고려해서 로맨스 장르 외 다른 장르에서 재사용 가능하도록 구조를 설계해 주세요.
- 현재 뷰가 스크롤 하단에 도달 시 다음 리스트를 불러오는 형태의 무한 스크롤 기능을 구현해 주세요.
- 리스트 아이템 노출 정보를 노출해 주세요. 각 설명 상의 필드네임은 Interface를 확인해 주세요.
  - 작품 썸네일
    - `thumbnailSrc` 필드 값으로 썸네일을 노출해 주세요.
  - 작품 타이틀
    - `title` 필드 값으로 작품 제목을 노출해 주세요.
  - 작가명
    - `artists` 배열 아이템 `role`이 `writer`, `painter`, `scripter`인 경우 `name` 필드 값을 사용하여 해당 작가명들을 노출해 주세요.
  - 랭킹
    - 현재 랭킹(`currentRank`)과 이전 랭킹(`previousRank`)을 비교하여 현재 순위, 랭킹 상승, 하락, 변동없음을 표현해 주세요.
    - 현재 순위 상태는 각 상태가 다르다는 것을 확실하게 알아볼 수 있는 스타일을 적용하여 자유롭게 개발해 주세요.
  - 무료 회차
    - `freedEpisodeSize` 필드 값으로 무료 회차 수를 노출해 주세요.
  - 완결/연재 여부
    - `contentState` 필드 값을 이용하여 완결(`completed`)/연재(`scheduled`) 여부를 노출해 주세요.
    - 연재 중이라면 `요일 + 연재`의 형태로 노출해 주세요 (ex: 매주 화요일 연재)
- 필터링 영역
  - `연재중`, `완결`, `무료회차 3개 이상` 해당 3개 조건의 필터 옵션을 개발해 주세요.
  - 필터링은 중복 설정이 가능합니다.
  - 연재중, 완결 필터 옵션의 경우 모순되는 케이스이므로 각 옵션 설정 시 반대 케이스의 옵션은 off 되어야 합니다.

## 선택 구현 스펙

- typescript 사용
- redux베이스의 상태관리 환경 구성
- 필터링 조건을 해당 컴포넌트에서 추가적으로 사용할 수 있도록 옵션으로 처리

## API

- 각 아이템의 순서는 랭킹순으로 정렬되어 내려옵니다.
- 요청 URL
  - `GET /api/comics/romance?page=1`
  - page는 1~5까지 있습니다.
  - mock 데이터는 첨부파일을 확인해 주세요

## API Interface

```
// 연재 요일
type Period = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
// 작가 롤
type ArtistRole =
  | "writer"
  | "painter"
  | "scripter"
  | "original"
  | "publisher"
  | "label";

interface Artist {
  name: string; // 작가 필명
  role: ArtistRole; // 작가 롤
  id: string // 작가 id
}

interface ComicRankItem {
  id: number; // 작품 id
  alias: string; // 작품 별칭
  title: string; // 작품 타이틀
  artists: Artist[]; // 작가 정보
  schedule: {
    periods: Period[]; // 연재 요일
  };
  genres: string[]; // 작품 장르
  freedEpisodeSize: number; // 무료회차 수
  contentsState: "scheduled" | "completed"; // 연재, 완결 값
  currentRank: number; // 현재 랭킹
  previousRank: number; // 이전 랭킹
  updatedAt: number; // 업데이트 일자
  print: boolean; // 단행본 여부
  thumbnailSrc: string; // 작품 썸네일 url
}

interface ComicRankApiSuccessResponse {
  hasNext: boolean; // 다음 page 존재 여부
  count: number; // 아이템 전체 카운트
  data: ComicRankItem[]; // 아이템 리스트
}

interface ComicRankApiFailResponse {
  error: string // 에러 메세지
}
```

## 과제 제출 방법

아래 방법중 한가지를 선택해서 제출해 주세요.

- 작업물을 zip 포맷으로 압축하여 메일로 회신해 주세요.
- 깃허브 저장소에 업로드 후 url을 메일로 회신해 주세요.
