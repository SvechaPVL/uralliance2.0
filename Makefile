.PHONY: help dev storybook dev-all stop stop-dev stop-storybook install clean build lint test

# Colors for terminal output
GREEN  := \033[0;32m
YELLOW := \033[0;33m
RED    := \033[0;31m
NC     := \033[0m # No Color

help: ## Show this help message
	@echo "$(GREEN)UrAlliance 2.0 - Makefile Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

install: ## Install dependencies
	@echo "$(GREEN)Installing dependencies...$(NC)"
	npm install

dev: ## Start Next.js development server (http://localhost:3000)
	@echo "$(GREEN)Starting Next.js dev server...$(NC)"
	npm run dev

storybook: ## Start Storybook (http://localhost:6006)
	@echo "$(GREEN)Starting Storybook...$(NC)"
	npm run storybook

dev-all: ## Start both Next.js and Storybook in background
	@echo "$(GREEN)Starting Next.js dev server...$(NC)"
	@npm run dev > /dev/null 2>&1 & echo $$! > .next.pid
	@sleep 2
	@echo "$(GREEN)Starting Storybook...$(NC)"
	@npm run storybook > /dev/null 2>&1 & echo $$! > .storybook.pid
	@sleep 3
	@WSL_IP=$$(hostname -I | awk '{print $$1}'); \
	echo "$(GREEN)✓ Next.js running on:$(NC)"; \
	echo "  - http://localhost:3000"; \
	echo "  - http://$$WSL_IP:3000 $(YELLOW)(WSL IP для доступа из Windows)$(NC)"; \
	echo "$(GREEN)✓ Storybook running on:$(NC)"; \
	echo "  - http://localhost:6006"; \
	echo "  - http://$$WSL_IP:6006 $(YELLOW)(WSL IP для доступа из Windows)$(NC)"

stop: stop-dev stop-storybook ## Stop all running services

stop-dev: ## Stop Next.js dev server
	@echo "$(YELLOW)Stopping Next.js...$(NC)"
	@-lsof -ti:3000 | xargs kill -9 2>/dev/null || true
	@-rm -f .next.pid
	@echo "$(GREEN)✓ Next.js stopped$(NC)"

stop-storybook: ## Stop Storybook
	@echo "$(YELLOW)Stopping Storybook...$(NC)"
	@-lsof -ti:6006 | xargs kill -9 2>/dev/null || true
	@-rm -f .storybook.pid
	@echo "$(GREEN)✓ Storybook stopped$(NC)"

build: ## Build production bundle
	@echo "$(GREEN)Building production bundle...$(NC)"
	npm run build

build-storybook: ## Build Storybook static files
	@echo "$(GREEN)Building Storybook...$(NC)"
	npm run build-storybook

lint: ## Run ESLint
	@echo "$(GREEN)Running linter...$(NC)"
	npm run lint

lint-fix: ## Fix ESLint errors automatically
	@echo "$(GREEN)Fixing linter errors...$(NC)"
	npm run lint -- --fix

test: ## Run tests
	@echo "$(GREEN)Running tests...$(NC)"
	npm run test

clean: stop ## Clean all generated files and stop services
	@echo "$(YELLOW)Cleaning project...$(NC)"
	@rm -rf .next
	@rm -rf node_modules/.cache
	@rm -rf storybook-static
	@rm -f .next.pid .storybook.pid
	@echo "$(GREEN)✓ Cleanup complete$(NC)"

clean-all: clean ## Clean everything including node_modules
	@echo "$(RED)Removing node_modules...$(NC)"
	@rm -rf node_modules
	@echo "$(GREEN)✓ Full cleanup complete$(NC)"

restart: stop dev-all ## Restart all services

status: ## Check status of services
	@echo "$(GREEN)Service Status:$(NC)"
	@echo ""
	@WSL_IP=$$(hostname -I | awk '{print $$1}'); \
	if lsof -ti:3000 > /dev/null 2>&1; then \
		echo "  Next.js:   $(GREEN)✓ Running$(NC)"; \
		echo "             - http://localhost:3000"; \
		echo "             - http://$$WSL_IP:3000 $(YELLOW)(WSL IP)$(NC)"; \
	else \
		echo "  Next.js:   $(RED)✗ Not running$(NC)"; \
	fi; \
	if lsof -ti:6006 > /dev/null 2>&1; then \
		echo "  Storybook: $(GREEN)✓ Running$(NC)"; \
		echo "             - http://localhost:6006"; \
		echo "             - http://$$WSL_IP:6006 $(YELLOW)(WSL IP)$(NC)"; \
	else \
		echo "  Storybook: $(RED)✗ Not running$(NC)"; \
	fi
	@echo ""
