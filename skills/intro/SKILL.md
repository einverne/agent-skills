---
name: intro
description: Research and write comprehensive introductory articles for Obsidian knowledge base. Use when user requests to create detailed notes about a topic, product, service, or technology. Triggers on keywords like "intro", "介绍", "调研", or when user asks to research and document a new subject. Creates structured markdown files with YAML frontmatter following Obsidian wiki conventions.
---

# Intro - Topic Research and Article Writing

## Overview

Create high-quality introductory articles for topics in the Obsidian knowledge base. Conduct deep research, structure findings comprehensively, and generate markdown files with proper YAML frontmatter and wiki-links.

## Workflow

### 1. Research Phase

Gather comprehensive information about the topic using multiple sources:

```
1. Use WebSearch for general overview and recent information
2. Use Perplexity for in-depth analysis and comparison
3. Use Exa web search for technical details and documentation
4. Cross-reference multiple sources for accuracy
```

Research should cover:
- What the topic is (definition and core concepts)
- Key features and capabilities
- Technical architecture (if applicable)
- Use cases and target audience
- Competitors and alternatives
- Community and ecosystem
- Advantages and limitations

### 2. Content Structure

Articles follow this standard structure:

```markdown
---
layout: post
title: "{{topic}}"
aliases:
- {{topic}}
tagline: "{{topic}}"
description: "{{brief description}}"
category: {{one of: 经验总结，产品体验，学习笔记，整理合集}}
tags: [ {{10-15 tags, lowercase, hyphen-separated}} ]
last_updated: {{YYYY-MM-DD}}
---

## 什么是 {{topic}}

Opening section with definition and overview.
**IMPORTANT**: Include official website link at first mention of the topic.
Example: [HelloTalk](https://www.hellotalk.com) 是一个语言交换平台...

Use wiki-links for related concepts: [[Product Name]]

## 核心功能/特性

Main features and capabilities

## 技术架构/工作原理

(If applicable) How it works

## 使用方法/实践

Practical usage guide

## 对比分析

Comparison with alternatives

## 适用场景

Best use cases and target users

## 优势与挑战

Strengths and limitations

## 总结

Summary and recommendations

## 相关链接

Additional resources (NOT official website - that goes in opening paragraph):
- Documentation links
- GitHub repository
- Community resources
- Tutorials and guides
```

### 3. Writing Guidelines

**YAML Frontmatter:**
- `title`: Topic name exactly as provided
- `aliases`: Same as title
- `tagline`: Same as title
- `description`: 1-2 sentence summary in Chinese
- `category`: Choose from: 经验总结，产品体验，学习笔记，整理合集
- `tags`: 10-15 relevant tags, lowercase English with hyphens
- `last_updated`: Current date in YYYY-MM-DD format

**Content Rules:**
- NO emojis in headings or content
- NO markdown bold syntax (`**text**`) in article body
- Use wiki-links `[[Product Name]]` for related concepts
- Write in Chinese unless topic is English-only
- Maintain neutral, informative tone
- Include concrete examples and use cases
- Add comparison sections when relevant alternatives exist

**Link Placement Rules:**
- **Official website**: Place in the opening paragraph at first mention of the topic
  - Format: [产品名称](https://example.com/)
  - Example: [HelloTalk](https://www.hellotalk.com/) 是全球最大的语言交换平台...
- **"相关链接" section**: Only for additional resources (documentation, GitHub, tutorials)
  - Do NOT repeat the official website here
  - Focus on supplementary materials

### 4. File Management

**Default location:** `Zettelkasten/` directory

**File naming:** Use topic name with `.md` extension
- Example: `Omarchy.md`, `Docker.md`

**If file exists:**
- Read existing content first
- Preserve existing YAML fields (create_time, dg-home, dg-publish)
- Supplement and enhance existing content
- Update `last_updated` field

### 5. Quality Standards

**Research depth:**
- Minimum 3 information sources
- Include official documentation links
- Cross-verify key claims
- Note any uncertainties

**Content completeness:**
- Cover all major aspects of the topic
- Provide actionable information
- Include real-world examples
- Official website link in opening paragraph
- Additional source links in "相关链接" section

**Wiki integration:**
- Add wiki-links to at least 5-10 related concepts
- Use consistent terminology
- Build knowledge graph connections

## Examples

### Example 1: Product Introduction

**User request:** "intro Omarchy"

**Actions:**
1. Research Omarchy using WebSearch and Perplexity
2. Structure findings: what it is, features, use cases, alternatives
3. Create `Zettelkasten/Omarchy.md` with complete YAML
5. Include wiki-links
6. Add comparison
7. Add documentation, GitHub, resources (NOT official website again)

### Example 2: Technology Overview

**User request:** "intro Docker 容器技术"

**Actions:**
1. Research Docker ecosystem comprehensively
2. Cover: definition, architecture, use cases, alternatives (Podman, etc.)
3. Create `Zettelkasten/Docker.md`
4. Technical depth: container runtime, images, orchestration
5. Include practical examples and commands
6. Documentation, GitHub, tutorials

### Example 3: Updating Existing File

**User request:** "intro Kubernetes 并补充到 @Zettelkasten/Kubernetes.md"

**Actions:**
1. Read existing `Zettelkasten/Kubernetes.md` content
2. Research latest Kubernetes developments
3. Preserve existing YAML metadata (create_time, etc.)
4. **Check if official link exists in opening** - if not, add it
5. Add new sections or enhance existing ones
6. Update `last_updated` field
7. Maintain consistent structure and style

## Common Patterns

**Product/Service:** Focus on features, pricing, use cases, alternatives
- Official link in opening paragraph

**Technology/Framework:** Emphasize architecture, concepts, ecosystem, best practices
- Official website/GitHub in opening paragraph

**Concept/Methodology:** Explain principles, applications, benefits, trade-offs
- May not have official website - link to authoritative source

**Tool/Software:** Cover installation, usage, integrations, tips
- Official download/homepage in opening

## Category Selection Guide

- **经验总结**: Personal insights, lessons learned, best practices
- **产品体验**: Product reviews, service comparisons, tool evaluations
- **学习笔记**: Technical concepts, educational content, study materials
- **整理合集**: Curated lists, resource collections, comprehensive guides

Choose based on the primary purpose of the article.

## Tag Best Practices

Good tags:
```
language-learning, mobile-app, ai-translation, cloud-native,
container-orchestration, developer-tools, open-source
```

Avoid:
- Generic tags: `technology`, `software`
- Single words without context: `app`, `tool`
- Non-English unless necessary for proper nouns
- Uppercase or spaces: use lowercase and hyphens

## Quality Checklist

Before finalizing:

- [ ] YAML frontmatter complete and valid
- [ ] Title, aliases, tagline consistent
- [ ] 10-15 relevant tags added
- [ ] Category selected appropriately
- [ ] No emojis in headings
- [ ] No bold syntax in body text
- [ ] Official website link in opening paragraph with markdown grammar
- [ ] 5-10 wiki-links added
- [ ] Multiple sections covering different aspects
- [ ] Practical examples included
- [ ] "相关链接" has supplementary resources (NOT official website)
- [ ] File saved to Zettelkasten/ directory
- [ ] Filename matches topic name

## Notes

- This skill does NOT create blog posts (use blog-writer skill for that)
- Focus on comprehensive, reference-style content
- Build knowledge graph through wiki-links
- Maintain consistent Obsidian conventions
- Update existing files when specified with "@" path reference
- **Always place official website link in opening paragraph, not in "相关链接"**
