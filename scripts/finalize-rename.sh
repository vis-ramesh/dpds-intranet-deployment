#!/usr/bin/env bash
#
# Run this ONCE after quitting Claude Code, before reopening.
# Finishes the crm-dashboard-template → dpds-intranet rename by:
#   1. Merging the post-rename tail of this conversation's transcript
#      from the orphan project dir into the migrated one
#   2. Removing the empty ghost workspace folder
#   3. Removing the orphan projects dir
#
# After running this, reopen Claude Code at /Users/ramesh/Documents/Sandbox/dpds-intranet
# and the migrated transcript will appear as a resumable session.

set -e

OLD_WORKSPACE="/Users/ramesh/Documents/Sandbox/crm-dashboard-template"
OLD_PROJ="$HOME/.claude/projects/-Users-ramesh-Documents-Sandbox-crm-dashboard-template"
NEW_PROJ="$HOME/.claude/projects/-Users-ramesh-Documents-Sandbox-dpds-intranet"

# Safety: refuse to run if Claude Code might still be writing
if pgrep -fl "Claude.app/Contents/MacOS/Claude" >/dev/null 2>&1; then
  echo "✗ Claude Code is still running. Quit it (CMD+Q) and re-run this script."
  exit 1
fi

echo "→ Merging orphan transcript tails into migrated session files..."
shopt -s nullglob 2>/dev/null || true
merged=0
if [ -d "$OLD_PROJ" ]; then
  for orphan in "$OLD_PROJ"/*.jsonl; do
    [ -f "$orphan" ] || continue
    name=$(basename "$orphan")
    target="$NEW_PROJ/$name"
    if [ -f "$target" ]; then
      # Concat orphan tail onto migrated file in-place
      cat "$orphan" >> "$target"
      merged=$((merged + 1))
      echo "  ✓ merged $name (added $(wc -l < "$orphan") lines)"
    else
      # No prior file at new location — just move the orphan over
      mv "$orphan" "$target"
      echo "  ✓ moved $name (no prior file at new location)"
    fi
  done

  # Move over any other artefacts (todos/, summaries) that might exist
  for sub in "$OLD_PROJ"/*/; do
    [ -d "$sub" ] || continue
    name=$(basename "$sub")
    if [ -d "$NEW_PROJ/$name" ]; then
      rsync -a "$sub" "$NEW_PROJ/$name/" 2>/dev/null && rm -rf "$sub"
    else
      mv "$sub" "$NEW_PROJ/$name"
    fi
    echo "  ✓ folded $name/"
  done

  rm -rf "$OLD_PROJ"
  echo "→ Removed orphan projects dir."
else
  echo "→ No orphan projects dir — nothing to merge."
fi

# Clean up the empty workspace ghost
if [ -d "$OLD_WORKSPACE" ]; then
  if [ -z "$(ls -A "$OLD_WORKSPACE" 2>/dev/null)" ]; then
    rmdir "$OLD_WORKSPACE"
    echo "→ Removed empty $OLD_WORKSPACE"
  else
    echo "⚠ $OLD_WORKSPACE is NOT empty — refusing to delete. Inspect manually:"
    ls -la "$OLD_WORKSPACE"
  fi
else
  echo "→ Old workspace path already gone — nothing to remove."
fi

echo ""
echo "✓ Done. Reopen Claude Code at:"
echo "    /Users/ramesh/Documents/Sandbox/dpds-intranet"
echo ""
echo "When the conversation list loads, pick the most recent session for this project"
echo "to resume our design system work."
