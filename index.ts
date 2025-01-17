import { file } from 'bun'
import clipboard from 'clipboardy'
import * as openpgp from 'openpgp'

const armoredMessage = clipboard.readSync()

const message = await openpgp.readMessage({ armoredMessage })
  .catch(() => { throw new Error('Invalid PGP Message in clipboard') })

const armoredKey = await file('./private_key.asc').text()
const decryptionKeys = await openpgp.readPrivateKey({ armoredKey })
  .catch(() => { throw new Error('Invalid PGP Private Key') })

const { data: decryptedMessage } = await openpgp.decrypt({ message, decryptionKeys })

const key = /[0-9a-f]{56}/.exec(decryptedMessage)![0]

clipboard.writeSync(key)
