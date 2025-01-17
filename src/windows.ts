import { $ } from 'bun'
import { getKeyFromMessage } from './base'

const armoredMessage = await $`powershell.exe -command "Get-Clipboard"`.text()

const key = getKeyFromMessage(armoredMessage)

await $`echo ${key} | clip.exe`
