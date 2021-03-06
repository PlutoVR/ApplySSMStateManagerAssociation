import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

// Running this test in github assumes an aws authenticated context
// which we don't want to do on builds in this repo
test.skip('test runs', () => {
  process.env['INPUT_ASSOCIATIONNAME'] = 'testing'
  process.env['INPUT_REGIONS'] = '["us-west-2", "us-west-1"]'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  let output
  try {
    output = cp.execFileSync(np, [ip], options).toString()
  } catch (e: any) {
    console.log(e.output.toString());
  }
  console.log(output)
  expect(output).toContain('us-west-2')
  expect(output).toContain('us-west-1')
  expect(output).toContain('Running association testing')
})
