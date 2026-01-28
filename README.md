# EV's Personal Skills

Collection of Claude Code skills for enhanced productivity and automation.

## Overview

This repository contains custom skills that extend Claude Code's capabilities across various domains including project naming, SEO analysis, and more.

## Available Skills

### 🎨 [Project Name Generator](./skills/project-name-generator/)

**Description**: Intelligent project naming assistant with automated domain availability checking.

**Features**:
- 🌐 Generates creative Chinese and English names based on project description
- ✅ Automatic domain availability checking for 9 common TLDs (.com, .app, .io, .ai, .dev, .tech, .xyz, .net, .org)
- 🔍 Brand uniqueness verification via search engines
- 📊 Comprehensive scoring system: domain availability (40%) + uniqueness (30%) + fit (30%)
- 🚀 Production-ready with 100% compliance under pressure testing

**Usage**:

```bash
# Use the skill in Claude Code
# Simply ask Claude to generate names for your project:
"我想做一个帮助程序员管理代码片段的工具，支持多语言、标签分类、快速搜索。请帮我起个名字。"

# The skill will automatically:
# 1. Generate 10-15 candidate names
# 2. Run domain availability checks
# 3. Perform brand verification
# 4. Present top 5 recommendations with domain status
```

**Direct Tool Usage**:

```bash
# Check domain availability for specific names
cd skills/project-name-generator
node check-domains.js "projectname1" "projectname2"

# Example output:
# ═══════════════════════════════════════
# Domain Availability Checker
# ═══════════════════════════════════════
#
# Checking: projectname1
#   projectname1.com          ❌ Registered [whois]
#   projectname1.app          ✅ Available [whois]
#   projectname1.io           ✅ Available [whois]
#   projectname1.dev          ✅ Available [whois]
```

**When to Use**:
- Starting a new project and need a brand name
- Launching a product or service
- Building personal projects and need domain-friendly names
- Rebranding or creating new products

**Key Components**:
- `SKILL.md`: Complete workflow with red flags to prevent shortcuts
- `check-domains.js`: Node.js domain availability checker
- `README.md`: Detailed usage guide
- `TEST-RESULTS.md`: Full TDD cycle documentation

---

### 📈 [SEO Review](./skills/seo-review/)

**Description**: Comprehensive SEO analysis and optimization recommendations.

**Usage**: Ask Claude to review SEO for a website or content.

---

## Installation

### Quick Install with npx skills (Recommended)

The easiest way to install skills from this repository:

```bash
# Install a specific skill
npx skills install github:einverne/agent-skills/skills/project-name-generator

# Or install from a local path
npx skills install /path/to/agent-skills/skills/project-name-generator
```

### Manual Installation

For more control or offline usage:

```bash
npx skills i einverne/agent-skills
```

### Dependencies

Most skills require minimal dependencies:

- **Node.js** (v14+) - Required for JavaScript-based tools
  ```bash
  # Install Node.js via official website or package manager
  # macOS
  brew install node

  # Ubuntu/Debian
  sudo apt-get install nodejs npm

  # Windows
  # Download from https://nodejs.org/
  ```

- **whois** command-line tool (optional but recommended for project-name-generator)
  ```bash
  # macOS
  brew install whois

  # Ubuntu/Debian
  sudo apt-get install whois

  # Fedora/RHEL
  sudo dnf install whois

  # Windows
  # whois is available via Windows Subsystem for Linux (WSL)
  ```

### Verify Installation

```bash
# List installed skills
npx skills list

# Test the project-name-generator script
cd ~/.claude/skills/einverne/skills/project-name-generator
node check-domains.js "testproject"
```

## Skill Design Principles

1. **Mandatory Tool Usage**: Critical steps must use actual tools, not speculation
2. **Red Flag Systems**: Provide clear stop signals to prevent shortcuts
3. **Error Documentation**: Document common mistakes and how to avoid them
4. **Pressure Resistance**: Test under time pressure and urgency scenarios
5. **Evidence-Based**: All recommendations backed by actual data/checks
