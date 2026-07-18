{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

let
  pkgs-playwright = import inputs.nixpkgs-playwright { system = pkgs.stdenv.system; };
  isLinux = pkgs.stdenv.isLinux;
in
{
  env = {
    PLAYWRIGHT_BROWSERS_PATH = "${pkgs-playwright.playwright.browsers}";
    PLAYWRIGHT_HOST_PLATFORM_OVERRIDE = if isLinux then "ubuntu-26.04" else null;
    PLAYWRIGHT_SKIP_DEPENDENCY_CHECK = "1";
    PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
  };

  packages = with pkgs; [
    just
    pnpm
  ];

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_26;
  };

  scripts.validate-playwright.exec = ''
    playwrightNpmVersion=$(node -p "require('@playwright/test/package.json').version" 2>/dev/null)
    nixPlaywrightBaseVersion=$(echo "${pkgs-playwright.playwright.version}" | cut -d. -f1,2)
    npmPlaywrightBaseVersion=$(echo "$playwrightNpmVersion" | cut -d. -f1,2)

    echo "❄️ Playwright nix version: ${pkgs-playwright.playwright.version}"
    echo "📦 Playwright npm version: $playwrightNpmVersion"

    if [ "$nixPlaywrightBaseVersion" != "$npmPlaywrightBaseVersion" ]; then
        echo "❌ Playwright versions (major, minor) in nix ($nixPlaywrightBaseVersion in devenv.yaml) and npm ($npmPlaywrightBaseVersion in package.json) are not the same! Please adapt the configuration."
    else
        echo "✅ Playwright versions in nix and npm are the same"
    fi

    echo
    env | grep ^PLAYWRIGHT
  '';

  enterShell = ''
    validate-playwright
  '';
}
