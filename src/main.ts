import * as core from '@actions/core'
import {
  ListAssociationsCommand,
  SSMClient,
  StartAssociationsOnceCommand
} from '@aws-sdk/client-ssm'
import type {
  ListAssociationsCommandInput,
  ListAssociationsCommandOutput,
  StartAssociationsOnceCommandInput,
  StartAssociationsOnceCommandOutput
} from '@aws-sdk/client-ssm'

const getListOfAssociations = async (
  associationName: string,
  region: string
): Promise<ListAssociationsCommandOutput> => {
  const ssm = new SSMClient({region})
  const input: ListAssociationsCommandInput = {
    AssociationFilterList: [{key: 'AssociationName', value: associationName}]
  }
  const command = new ListAssociationsCommand(input)
  return await ssm.send(command)
}

const reRunAssociation = async (
  region: string,
  assocId: string
): Promise<StartAssociationsOnceCommandOutput> => {
  const ssm = new SSMClient({region})
  const input: StartAssociationsOnceCommandInput = {
    AssociationIds: [assocId]
  }
  const command = new StartAssociationsOnceCommand(input)
  core.info(`Running association Id ${assocId} in region ${region}`)
  return ssm.send(command)
}

async function run(): Promise<void> {
  try {
    const associationName: string = core.getInput('associationName')
    const regions: string[] = JSON.parse(core.getInput('regions'))

    core.info(`Running association ${associationName}`)
    core.info(`Running in regions: ${JSON.stringify(regions)}`)

    const regionPromises = regions.map(async (region: string) => {
      const results = await getListOfAssociations(associationName, region)
      return (results.Associations ?? [])
        .flatMap(assoc => {
          return assoc.AssociationId
        })
        .map(async (id: string | undefined) => {
          if (id) {
            core.setOutput(region, 'Association has been run')
            return reRunAssociation(region, id)
          }
        })
    })

    await Promise.all(regionPromises)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
