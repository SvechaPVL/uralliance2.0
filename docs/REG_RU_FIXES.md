# 🔧 Фиксы для REG.RU серверов

## MTU Settings для Docker

На серверах REG.RU необходимо установить MTU 1450 вместо стандартного 1500.

### Проблема

При использовании стандартного MTU (1500) возникают проблемы с сетевыми соединениями из Docker контейнеров.

### Решение

#### 1. Docker Daemon Configuration

**Файл:** `/etc/docker/daemon.json` на сервере

```json
{
  "mtu": 1450,
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

#### 2. Docker Compose Network

**Файл:** `docker-compose.yml`

```yaml
networks:
  uralliance-network:
    driver: bridge
    driver_opts:
      com.docker.network.driver.mtu: 1450
```

### Применение настроек

```bash
# На сервере
sudo systemctl restart docker

# Проверка
docker network inspect bridge | grep -i mtu
# Должно показать: "com.docker.network.driver.mtu": "1450"
```

---

## Husky в Production Build

### Проблема

Husky (git hooks) пытается запуститься во время `npm ci` в Docker build, но:

- Husky нужен только для development
- В Docker контейнере нет git
- Это вызывает ошибку build

### Решение

Используем `--ignore-scripts` флаг в Dockerfile:

```dockerfile
RUN npm ci --only=production --ignore-scripts
```

Это пропускает:

- `prepare` скрипт (husky)
- Другие postinstall скрипты, которые не нужны в production

### Что это не ломает

✅ Next.js build работает нормально
✅ Все production зависимости устанавливаются
✅ Application работает корректно

### Где применяется

**Файл:** `Dockerfile`, строка 10

---

## Чеклист для новых REG.RU серверов

При настройке нового сервера на REG.RU:

1. ✅ Установить Docker
2. ✅ Создать `/etc/docker/daemon.json` с MTU 1450
3. ✅ Перезапустить Docker: `systemctl restart docker`
4. ✅ Проверить MTU: `docker network inspect bridge | grep mtu`
5. ✅ Использовать docker-compose.yml с MTU настройками

---

**Статус:** ✅ Применено на сервере 89.111.153.225
