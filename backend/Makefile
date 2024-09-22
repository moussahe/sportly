# Variables
BINARY_NAME=sportly-backend
GO=go

# Targets
.PHONY: all build run clean test

all: build

build:
	$(GO) build -o $(BINARY_NAME) ./cmd/api

run:
	$(GO) run ./cmd/api

clean:
	$(GO) clean
	rm -f $(BINARY_NAME)

test:
	$(GO) test ./...

migrate:
	# Ajoutez ici la commande pour exécuter les migrations

seed:
	$(GO) run ./scripts/seed.go
