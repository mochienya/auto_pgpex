import { $, file } from 'bun'
import * as openpgp from 'openpgp'

const armoredMessage = await $`xsel --clipboard`.text()
const message = await openpgp.readMessage({ armoredMessage })

const privateKey = await openpgp.readPrivateKey({ armoredKey: await file('private_key.asc').text() })

const { data: decryptedMessage } = await openpgp.decrypt({ message, decryptionKeys: privateKey })
const key = /^[0-9a-f]+$/m.exec(decryptedMessage)![0]

await $`echo ${key} | xsel -ib`
