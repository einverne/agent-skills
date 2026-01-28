#!/usr/bin/env node

/**
 * Domain Availability Checker for Project Names
 *
 * Usage:
 *   ./check-domains.js "projectname"
 *   ./check-domains.js "projectname" "anothername"
 *
 * Checks common TLDs: .com, .app, .io, .ai, .dev, .tech, .xyz, .net, .org
 *
 * Output format:
 *   projectname.com: ✅ Available | ❌ Registered | ⚠️ Premium | 🔍 Unknown
 */

const dns = require('dns').promises;
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Common TLDs to check (ordered by preference for tech products)
const TLDS = ['.com', '.app', '.io', '.ai', '.dev', '.tech', '.xyz', '.net', '.org'];

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
};

/**
 * Check if domain is registered using DNS lookup
 * This is fast but may have false positives/negatives
 */
async function checkDomainDNS(domain) {
  try {
    await dns.resolve4(domain);
    return { status: 'registered', method: 'dns' };
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      return { status: 'available', method: 'dns' };
    }
    return { status: 'unknown', method: 'dns', error: error.code };
  }
}

/**
 * Check domain using whois (more accurate but slower)
 * Falls back to DNS if whois is not available
 */
async function checkDomainWhois(domain) {
  try {
    const { stdout } = await execAsync(`whois ${domain}`, { timeout: 5000 });

    // Common patterns indicating domain is registered
    const registeredPatterns = [
      /registrar:/i,
      /creation date:/i,
      /registry expiry date:/i,
      /domain name:/i,
      /status: active/i
    ];

    const isRegistered = registeredPatterns.some(pattern => pattern.test(stdout));

    // Check for premium domain indicators
    const isPremium = /premium|for sale|available for purchase/i.test(stdout);

    if (isPremium) {
      return { status: 'premium', method: 'whois' };
    }

    return {
      status: isRegistered ? 'registered' : 'available',
      method: 'whois'
    };
  } catch (error) {
    // Fall back to DNS if whois fails
    return checkDomainDNS(domain);
  }
}

/**
 * Format domain check result with color
 */
function formatResult(domain, result) {
  const statusIcons = {
    available: `${colors.green}✅ Available${colors.reset}`,
    registered: `${colors.red}❌ Registered${colors.reset}`,
    premium: `${colors.yellow}⚠️ Premium${colors.reset}`,
    unknown: `${colors.blue}🔍 Unknown${colors.reset}`
  };

  const icon = statusIcons[result.status] || statusIcons.unknown;
  const method = colors.gray + `[${result.method}]` + colors.reset;

  return `  ${domain.padEnd(25)} ${icon} ${method}`;
}

/**
 * Check all TLDs for a given name
 */
async function checkName(name) {
  console.log(`\n${colors.blue}Checking: ${name}${colors.reset}`);

  const results = {};

  for (const tld of TLDS) {
    const domain = name.toLowerCase() + tld;
    const result = await checkDomainWhois(domain);
    results[tld] = result;
    console.log(formatResult(domain, result));
  }

  return results;
}

/**
 * Generate summary statistics
 */
function generateSummary(allResults) {
  console.log(`\n${colors.blue}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}Summary${colors.reset}\n`);

  for (const [name, results] of Object.entries(allResults)) {
    const available = Object.entries(results)
      .filter(([_, r]) => r.status === 'available')
      .map(([tld]) => tld);

    const premium = Object.entries(results)
      .filter(([_, r]) => r.status === 'premium')
      .map(([tld]) => tld);

    console.log(`${colors.blue}${name}${colors.reset}:`);

    if (available.length > 0) {
      console.log(`  ${colors.green}Available:${colors.reset} ${available.join(', ')}`);
    }

    if (premium.length > 0) {
      console.log(`  ${colors.yellow}Premium:${colors.reset} ${premium.join(', ')}`);
    }

    if (available.length === 0 && premium.length === 0) {
      console.log(`  ${colors.red}All checked domains registered${colors.reset}`);
    }

    console.log('');
  }

  console.log(`${colors.gray}Note: DNS checks may have false positives. Verify on registrar websites.${colors.reset}`);
  console.log(`${colors.gray}Recommended registrars: Namecheap, Cloudflare, Porkbun${colors.reset}`);
}

/**
 * Main function
 */
async function main() {
  const names = process.argv.slice(2);

  if (names.length === 0) {
    console.error(`${colors.red}Error: Please provide at least one name to check${colors.reset}`);
    console.log(`\nUsage: ./check-domains.js "projectname" "anothername"`);
    process.exit(1);
  }

  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}Domain Availability Checker${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);

  const allResults = {};

  for (const name of names) {
    allResults[name] = await checkName(name);
  }

  generateSummary(allResults);
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
});

main();
