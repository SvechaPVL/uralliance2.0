#!/bin/bash

# Скрипт для создания нового story файла
# Использование: ./scripts/create-story.sh ComponentName Category

COMPONENT_NAME=$1
CATEGORY=$2

if [ -z "$COMPONENT_NAME" ] || [ -z "$CATEGORY" ]; then
  echo "Использование: ./scripts/create-story.sh ComponentName Category"
  echo "Категории: primitives, layout, animations, mockups, forms, sections, showcases"
  exit 1
fi

# Определяем путь в зависимости от категории
case $CATEGORY in
  primitives|layout|animations|mockups|forms|sections|showcases)
    STORY_DIR="src/components/$CATEGORY/stories"
    ;;
  *)
    echo "Неизвестная категория: $CATEGORY"
    echo "Доступные категории: primitives, layout, animations, mockups, forms, sections, showcases"
    exit 1
    ;;
esac

# Создаем директорию если её нет
mkdir -p "$STORY_DIR"

# Путь к файлу
STORY_FILE="$STORY_DIR/${COMPONENT_NAME}.stories.tsx"

# Проверяем существует ли файл
if [ -f "$STORY_FILE" ]; then
  echo "Story файл уже существует: $STORY_FILE"
  exit 1
fi

# Capitalize категорию для Storybook
CATEGORY_CAPITALIZED="$(tr '[:lower:]' '[:upper:]' <<< ${CATEGORY:0:1})${CATEGORY:1}"

# Создаем файл
cat > "$STORY_FILE" << EOF
import type { Meta, StoryObj } from "@storybook/react";
import { ${COMPONENT_NAME} } from "../${COMPONENT_NAME}";

/**
 * ${COMPONENT_NAME} Component
 *
 * [Добавьте описание компонента]
 */
const meta = {
  title: "${CATEGORY_CAPITALIZED}/${COMPONENT_NAME}",
  component: ${COMPONENT_NAME},
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Добавьте argTypes если нужно
  },
} satisfies Meta<typeof ${COMPONENT_NAME}>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story
 */
export const Default: Story = {
  args: {
    // Добавьте пропсы
  },
};

/**
 * Custom example
 */
export const CustomExample: Story = {
  render: () => (
    <${COMPONENT_NAME}>
      {/* Добавьте контент */}
    </${COMPONENT_NAME}>
  ),
};
EOF

echo "✅ Story файл создан: $STORY_FILE"
echo "📝 Откройте файл и настройте stories под ваш компонент"
echo "🚀 Запустите Storybook: npm run storybook"
