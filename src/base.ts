import { file } from 'bun'
import * as openpgp from 'openpgp'

export async function getKeyFromMessage(armoredMessage: string): Promise<string> {
  const message = await openpgp.readMessage({ armoredMessage })

  const armoredKey = await file('private_key.asc').text()
  const decryptionKeys = await openpgp.readPrivateKey({ armoredKey })

  const { data: decryptedMessage } = await openpgp.decrypt({ message, decryptionKeys })
  const key = /[0-9a-f]{56}/.exec(decryptedMessage)![0]
  return key
}
