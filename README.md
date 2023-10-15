## 기술 스텍

- Docker
- Node.js
- Kafka
- Nginx

## 개발 환경

- `docker-compose` 를 활용해 로컬에서 Nginx 및 Kafka 를 활용할 수 있도록 했습니다.
- Docker 설치가 필요합니다.
    - [Docker Desktop 없이 설치](https://netmarble.engineering/docker-on-wsl2-without-docker-desktop/)
- Windows 환경에서는 `WSL` 설치 후 Linux 환경에서 아래 명령어를 입력해야 합니다.
    - [WSL 설치 방법](https://learn.microsoft.com/ko-kr/windows/wsl/install)
- 터미널에서 UDP 통신을 테스트하기 위해서는 `netcat` 설치가 필요하며 해당 문서는 `Chocolatey` 패키지 매니저를 사용해 설치를 권장합니다.
    - [Chocolatey Install](https://chocolatey.org/install)
    - 관리자 권한으로 터미널 실행 후 다음 명령어를 입력하면 `netcat` 설치가 진행됩니다.
        - `choco install netcat`

---

## 실행

- 이미지 강제 삭제 및 재생성 시, 기존 이미지는 새로운 이미지가 생성되면서 이미지명이 변경되어 쓰레기 이미지가 되니 필요에 따라 삭제하시면 됩니다.
    - `$ docker image rm ${ImageId}`

### Nginx 및 UDP 서버

> Nginx 및 UDP 서버에 대한 Docker Compose 파일은 `nginx-node-compose.yml` 로 묶여 있으며, 해당 파일은 프로젝트 루트 경로에 위치해 있습니다.

- 이미지 최초 생성 및 컨테이너 띄우기

```shell
$ docker-compose up -d
```

- 컨테이너 종료 및 삭제

```shell
$ docker-compose down
```

- 이미지 강제 재생성 및 컨테이너 띄우기

```shell
$ docker-compose --force-recreate --build -d
```

### Kafka

> Kafka 에 대한 Docker Compose 파일은 `kafka-compose.yml` 로 묶여 있으며, 해당 파일은 프로젝트 내 `/kafka` 경로에 위치해 있습니다.

- 이미지 최초 생성 및 컨테이너 띄우기

```shell
$ docker-compose -f kafka-compose.yml up -d
```

- 컨테이너 종료 및 삭제

```shell
$ docker-compose -f kafka-compose.yml down
```

- 이미지 강제 재생성 및 컨테이너 띄우기

```shell
$ docker-compose -f kafka-compose.yml --force-recreate --build -d
```

---

## 로그 출력 및 확인

### Nginx

```shell
$ docker logs nginx-proxy
```

### UDP 서버

- 1번 컨테이너

```shell
$ docker logs udp-node-server-1 -f
```

- 2번 컨테이너

```shell
$ docker logs udp-node-server-2 -f
```

### Kafka

- 1번 컨테이너

```shell
$ docker logs kafka-1 -f
```

- 2번 컨테이너

```shell
$ docker logs kafka-2 -f
```

- 3번 컨테이너

```shell
$ docker logs kafka-3 -f
```

---

### UDP 요청 명령어

> 작업 환경이 Windows 면서 Docker 환경에 올라간 서버에 테스트를 진행하고자 할 경우, Linux 환경에서 아래 명령어를 입력해야 합니다.
>
> 만약 UDP 서버만 Local 환경에서 실행한 뒤 테스트하고자 하는 경우에는 Windows 터미널 환경에서 아래 명령어를 입력해야 합니다.

```shell
$ echo -n "Hello" | nc -u -w1 localhost 162
```
