# Project Name Generator

智能项目命名助手 - 根据项目描述生成富有创意的中英文名称，并自动检查域名可用性。

## Features

- 🎨 创意命名：基于项目特性生成 5 组中英文名称建议
- 🔍 品牌查重：搜索验证避免品牌冲突
- 🌐 域名检查：自动检查常用 TLD 域名可用性
- 📊 综合评分：域名可用性 + 独特性 + 适配度

## Domain Checker Usage

### Quick Start

```bash
# Check single name
node check-domains.js "projectname"

# Check multiple names
node check-domains.js "codelexicon" "quicksnip" "codegenie"
```

### Output Example

```
═══════════════════════════════════════
Domain Availability Checker
═══════════════════════════════════════

Checking: codelexicon
  codelexicon.com           ❌ Registered [whois]
  codelexicon.app           ✅ Available [whois]
  codelexicon.io            ✅ Available [whois]
  codelexicon.dev           ✅ Available [whois]

Summary:
codelexicon:
  Available: .app, .io, .dev, .tech, .xyz, .org
```

### Checked TLDs

**Core TLDs** (recommended for tech products):
- `.com` - Commercial standard
- `.app` - Application specific
- `.io` - Tech/Startup favorite
- `.dev` - Developer tools

**Alternative TLDs**:
- `.ai` - AI products
- `.tech` - Technology
- `.xyz` - Modern generic
- `.net` - Network services
- `.org` - Organizations

### Status Indicators

- ✅ **Available**: Domain can be registered
- ❌ **Registered**: Domain already taken
- ⚠️ **Premium**: Domain available at premium pricing
- 🔍 **Unknown**: Check failed, manual verification needed

### Verification Methods

1. **WHOIS lookup** (primary): Most accurate, queries domain registries
2. **DNS resolution** (fallback): Fast but may have false positives

**Note**: Always verify on registrar websites before purchase.

### Recommended Registrars

- [Namecheap](https://www.namecheap.com/) - Affordable, user-friendly
- [Cloudflare](https://www.cloudflare.com/products/registrar/) - At-cost pricing
- [Porkbun](https://porkbun.com/) - Competitive pricing, good UX

## Dependencies

- Node.js (built-in `dns` and `child_process` modules)
- `whois` command-line tool (optional but recommended)

### Install whois

```bash
# macOS
brew install whois

# Ubuntu/Debian
sudo apt-get install whois

# Fedora/RHEL
sudo dnf install whois
```

## Skill Workflow

1. User provides project description
2. AI generates 10-15 candidate names
3. **Run domain checker** on all English names
4. Perform brand search verification
5. Calculate composite score (domain 40% + uniqueness 30% + fit 30%)
6. Present top 5 recommendations with domain availability
7. Provide registration guidance and alternatives

## Example Usage

```bash
# Generate names for a code snippet manager
# AI will automatically run:
node check-domains.js "codelexicon" "quicksnip" "codegenie" "snipbox" "codevault"
```

## Tips

- **Act fast**: Good domain names disappear quickly
- **Prioritize .com**: Best for brand recognition (if available)
- **Developer tools**: .app, .dev, .io are excellent alternatives
- **Check social media**: Also verify Twitter/GitHub handle availability
- **Trademark search**: Always check trademark databases before finalizing

## License

MIT
