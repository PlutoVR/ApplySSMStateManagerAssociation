import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

test('test runs', () => {
  process.env['INPUT_ASSOCIATIONNAME'] = 'testing'
  process.env['INPUT_REGIONS'] = '["us-west-2", "us-west-1"]'
  const np = process.execPath
  console.log(np)
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  console.log(ip)
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  let output
  try {
    output = cp.execFileSync(np, [ip], options).toString()
  } catch (e) {
    console.log(e)
  }
  console.log(output)
  expect(output).toContain('us-west-2')
  expect(output).toContain('us-west-1')
  expect(output).toContain('Running association testing')
})
