# Apply AWS SSM State Manager Association

This github action will apply SSM State Manager associations that are pre-defined in your AWS account.

You provide the association name and the regions where they should be applied.

## Usage

```yaml
- uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: my-access-key-id
    aws-secret-access-key: my-secret-access-key
    aws-region: us-east-2
- uses: plutovr/apply-ssm-state-manager-association
  with:
    regions:
      - us-west-2
      - us-east-1
      - ap-south-1
    associationName: testing
```

## Development

Install the dependencies

```bash
$ npm ci
```

Build the typescript and package it for distribution

```bash
$ npm run build && npm run package
```

Run the tests

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```
