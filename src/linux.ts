import { $ } from 'bun'
import { getKeyFromMessage } from './base'

const armoredMessage = await $`xsel --clipboard`.text()

const key = getKeyFromMessage(armoredMessage)

await $`echo ${key} | xsel -ib`
