

## **👩‍👩‍👧‍👦 프로젝트 소개**

성균 학생 종합 성과지수(Sungkyun Undergraduate Composite Performance
Index: **SUCPI**)의 지표산출 근거를 제시함에 그 목적을 둔다.
<br>
① 성균 학생 종합 성과지수(Sungkyun Undergraduate Composite Performance
Index: SUCPI)는 성균관대학교 소프트웨어융합대학에서 개발한 학생 역량지수로써
학생의 교육, 연구 및 교류 활동(봉사, 산학협력 등)을 지표화하여 측정한 값이다.
<br>
② 학생들의 역량을 객관적으로 평가하여, 진학지도, 장학금 지원, 비교과 과정 선발
우선권 등의 보상성 지원과 학술 동기를 촉진하는데 그 목적을 둔다.

## **👩‍👩‍👧‍👦 개발자 소개**

Team-SUCPI를 소개합니다.

|       김태형 (PM / Tech)       |       강성철 (Tech)        |       김준연 (Tech)       |
|:------------------------------:|:--------------------------:|:-------------------------:|
| ![김태형](https://github.com/user-attachments/assets/06884f38-4ad7-4afe-894f-ced30337b680) | ![강성철](https://github.com/user-attachments/assets/8d3dfb24-5d5c-468d-b726-c7baf76ef7d6) | ![김준연](https://github.com/user-attachments/assets/d5f1560c-7ee5-4257-81c4-3d207ebb07b3) |
| [GitHub](https://github.com/Taerogrammer) | [GitHub](https://github.com/2020311920) | [GitHub](https://github.com/somehowranker) |



## **개발환경**

<details>
<summary>개발환경 </summary>
<div markdown="1">
  
### 1. 프로그래밍 언어
- **JavaScript (ES6+)**

### 2. 프레임워크 및 라이브러리
- **React**: 사용자 인터페이스 구축을 위한 JavaScript 라이브러리
- **Spring Boot**: 데이터베이스 및 CRUD 구축을 위한 JavaScript 프레임워크

### 3. 패키지 관리 도구
- **Java**: Maven, Gradle
  
### 4. 버전 관리 시스템
- **Git**: 버전 관리를 위한 필수 도구
- **GitHub**: 코드 저장소 및 협업을 위한 플랫폼

### 5. 빌드 및 배포 도구
- **Docker**: 배포 시 컨테이너화 및 환경 일관성을 보장

### 6. 테스트 프레임워크
- **Java**: JUnit


### 7. 통합 개발 환경 (IDE)
- **VS Code**: Visual Studio Code를 주요 개발 도구로 사용
  - 필수 확장 프로그램: 
    - **Lombok**: Dependencies 자동화

### 8. 데이터베이스
- **H2-Console**: 유사 Mysql 데이터베이스 (Mysql로 대체 예정)

### 9. API 도구
- **Postman**: API 테스트 및 개발에 사용

### 10. 가상화 및 컨테이너 도구
- **Docker**: 개발 환경 및 배포 환경의 일관성을 위한 컨테이너 도구
  - Dockerfile을 사용하여 프로젝트를 컨테이너화하고 배포 시 사용

### 11. 운영체제
- **macOS** 또는 **Windows**: 개발 환경은 운영체제에 구애받지 않으나, 팀은 주로 macOS를 사용
- **Linux**: 배포 서버 환경 (Ubuntu 20.04 LTS)

</div>
</details>

## **커밋 컨벤션**
  
<details>
<summary>팀 협업용 깃허브 컨벤션 문서 </summary>
<div markdown="1">

<br>
 
## **Branch를 통한 협업**


개발 사항이 있다면, 이슈를 생성하고, 해당 이슈와 관련된 브랜치를 생성합니다.

<br>

해당 프로젝트에선 개발 속도 및 편의성을 위해 '**feature**'만 사용하기로 결정하였습니다. 

<br>
<br>

1. main 브랜치의 최신 버전을 pull 해줍니다.

```
git pull origin main
```
<br>

2. 본인이 생성한 이슈번호를 기준으로 브랜치를 생성해줍니다.

```bash
git branch feature/#7   // 이슈번호가 7번인 경우
```
<br>

3. 해당 브랜치로 이동해줍니다.

```bash
git switch feature/#7
```
<br>

4. 개발 후 개발이 완료되면 add를 진행해줍니다.

```bash
git add .   // 모든 변경사항을 저장할 시 '.', 특정 파일만 add하고 싶으면 해당 파일 이름 작성
```
<br>

5. commit 메세지를 작성해줍니다.
```
git commit -m "[feat](프로젝트이름)#7 - OO기능 개발"
```
<br>

6. 개발 도중 다른 이슈가 병합되었을 가능성이 있기 떄문에, main 브랜치를 한 번 더 pull 해줍니다.
```
git pull origin main
```
<br>

7. 6번을 진행했을 때 발생하는 conflict를 해결한 뒤, 다시 commit을 진행합니다. (4번 과정부터 시작)
<br>

8. 이상이 없다면 push를 진행합니다.
```
git push origin feature/#7
````
<br>

**main을 pull했을 때, 에러가 발생하면 해당 에러를 수정하는 작업을 반드시 진행해주세요!**

<br>

9. PR을 진행하고, 문제가 없다면 Reviewer가 Merge를 진행합니다.
<br>

10. main 브랜치로 이동 후 1번 과정부터 다시 반복해줍니다.
```
git switch main
```
<br>

## Git Branch Convention

- 브랜치를 생성하기 전에, 이슈를 작성해야 하는데,
**[브랜치 종류]/#<이슈번호>**의 양식에 따라 브랜치 명을 작성합니다.

하지만 개발 속도 향상 및 편리성을 위해 해당 프로젝트에선 **feature** 브랜치만 사용합니다.

ex) feature/#6

<br>
<br>

## Commit Convention

- commit은 최대한 자세히 나누어서 진행해야 하기 때문에, 하나의 이슈 안에서도 매우 많은 commit이 생성될 수 있습니다.
**[prefix] (해당 앱 이름(옵션))#이슈번호 - 이슈 내용**의 양식에 따라 커밋을 작성합니다.

- prefix 종류
  - [Feat]: 새로운 기능 구현
  - [Setting]: 기초 세팅 관련
  - [Design]: just 화면. 레이아웃 조정
  - [Fix]: 버그, 오류 해결, 코드 수정
  - [Add]: Feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 View 생성
  - [Del]: 쓸모없는 코드, 주석 삭제
  - [Refactor]: 전면 수정이 있을 때 사용합니다
  - [Remove]: 파일 삭제
  - [Chore]: 그 이외의 잡일/ 버전 코드 수정, 패키지 구조 변경, 파일 이동, 파일이름 변경
  - [Docs]: README나 WIKI 등의 문서 개정
  - [Comment]: 필요한 주석 추가 및 변경

ex) [Design] sucpi #4 - 응원 뷰 레이아웃 디자인

<br>
<br>

## Issue

### 이슈 생성 시

- [Feature] 뷰이름 이슈명
ex) [Feature] MyView - MyView 레이아웃 디자인
- 우측 상단 Assignees 자기 자신 선택 → 작업 할당된 사람을 선택하는 것
- Labels Prefix와 자기 자신 선택

<br>

## PR

### PR 요청 시

- Reviewers 자신 제외 모두 체크
- Assignees 자기 자신 추가
- Labels 이슈와 동일하게 추가
- 서로 코드리뷰 하기
- 수정 필요 시 수정하기

<br>



