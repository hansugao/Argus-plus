import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import test from "node:test";

test("generated watch queries keep the history page's flat arguments", () => {
  execFileSync(process.execPath, ["scripts/native-dispatch.mjs", "--check"]);
  const adapter = readFileSync("src-gpui/src/dispatch.rs", "utf8");
  const watch = adapter.slice(adapter.indexOf('"watch_points" =>'));
  const arm = watch.slice(0, watch.indexOf('"watch_remove" =>'));
  assert.match(arm, /serde_json::from_value\(args.clone\(\)\)/);
  assert.doesNotMatch(arm, /argument::<argus_core::watch::SeriesQuery>/);
});
