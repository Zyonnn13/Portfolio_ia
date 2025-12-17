# Etape 1: Build (compilation)
FROM golang:1.23 AS builder
WORKDIR /app

COPY main.go go.mod ./

RUN go mod download


RUN CGO_ENABLED=0 GOOS=linux go build -o portfolio main.go


FROM alpine:latest
WORKDIR /app


COPY --from=builder /app/portfolio .


COPY static ./static
COPY templates ./templates


EXPOSE 8080


CMD ["./portfolio"]