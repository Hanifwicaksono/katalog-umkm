import assert from "node:assert/strict";
import test from "node:test";
import { temaBerikutnya } from "./tema.mjs";

test("mengganti mode terang dan gelap", () => {
  assert.equal(temaBerikutnya("terang"), "gelap");
  assert.equal(temaBerikutnya("gelap"), "terang");
});
